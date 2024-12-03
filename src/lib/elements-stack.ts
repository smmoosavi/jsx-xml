import type { XMLBuilder } from 'xmlbuilder2/lib/interfaces';

export let elementsStack: XMLBuilder[] = [];

/**
 * @internal
 */
export function getCurrentElement() {
  return elementsStack[elementsStack.length - 1];
}

/**
 * @internal
 */
export function withElement(cur: XMLBuilder, fn: () => void) {
  try {
    elementsStack.push(cur);
    fn();
  } finally {
    elementsStack.pop();
  }
}
