import async_hooks from 'async_hooks';

/**
 * Creates a tracker that counts how many times the event loop yields.
 *
 * This utility uses Node.js async hooks to monitor Promise execution,
 * counting each time control returns to the event loop through a Promise.
 * It's useful for measuring the concurrency behavior of asynchronous code.
 *
 * @returns An object with methods to start tracking, stop tracking, and get the current yield count
 * @example
 * ```
 * const tracker = createYieldTracker().start();
 * // Run some async code
 * const yieldCount = tracker.stop();
 * console.log(`The event loop yielded ${yieldCount} times`);
 * ```
 */

export function createYieldTracker() {
  const resourceMap = new Map();
  let yieldCount = 0;

  const hook = async_hooks.createHook({
    init(asyncId, type, triggerAsyncId) {
      if (type === 'PROMISE') {
        resourceMap.set(asyncId, { type, triggerAsyncId });
      }
    },
    before(asyncId) {
      if (resourceMap.has(asyncId)) {
        yieldCount++;
      }
    },
    destroy(asyncId) {
      resourceMap.delete(asyncId);
    },
  });

  return {
    start() {
      hook.enable();
      yieldCount = 0;
      return this;
    },
    stop() {
      hook.disable();
      return yieldCount;
    },
    getCount() {
      return yieldCount;
    },
  };
}
