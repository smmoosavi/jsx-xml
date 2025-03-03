export let globalContexts = new Map<symbol, any>();

export function setGlobalContexts(contexts: Map<symbol, any>) {
  globalContexts = contexts;
}

export type Context<T> = {
  Provider: ({ value, children }: { value: T; children: any }) => any;
  contextKey: symbol;
  defaultValue: T;
};

export const defaultContexts = new Map<symbol, any>();

export function createContext<T>(defaultValue: T): Context<T> {
  const contextKey = Symbol();

  globalContexts.set(contextKey, defaultValue);
  defaultContexts.set(contextKey, defaultValue);

  const Provider = ({ value, children }: { value: T; children: any }) => {
    globalContexts.set(contextKey, value);
    return children;
  };

  return { Provider, contextKey, defaultValue };
}

/**
 * Retrieves the current value of the specified context.
 *
 * IMPORTANT: When used in async components, this function must be called
 * before any await statements. Otherwise, the context value may be incorrect
 * during concurrent rendering, as the global context state could change
 * between await points.
 *
 * Example of correct usage in async components:
 * ```
 * async function MyComponent() {
 *   // Correct: Get context before any awaits
 *   const value = useContext(myContext);
 *
 *   // Now you can use await
 *   await someAsyncOperation();
 *
 *   return <div>{value}</div>;
 * }
 * ```
 *
 * @param context The context object returned by createContext
 * @returns The current context value
 */
export function useContext<T>(context: Context<T>): T {
  const { contextKey } = context;
  if (!globalContexts.has(contextKey)) {
    throw new Error(
      'Context not found. Make sure you are using the correct context key.',
    );
  }
  return globalContexts.get(contextKey) as T;
}
