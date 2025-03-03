import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { XMLBuilderCreateOptions } from 'xmlbuilder2/lib/interfaces';

export declare const CData: (props: { children: TextChildren }) => null;

declare const Comment_2: (props: { children: TextChildren }) => null;
export { Comment_2 as Comment };

export declare type Context<T> = {
  Provider: ({ value, children }: { value: T; children: any }) => any;
  contextKey: symbol;
  defaultValue: T;
};

export declare function createContext<T>(defaultValue: T): Context<T>;

/**
 *
 * @public
 */
export declare function createElement(
  type: any,
  props: any,
  ...children: any[]
): JsxXmlComponentElement | JsxXmlTagElement;

/**
 * @public
 */
export declare function Fragment(props: { children?: ReactNode }): ReactNode;

/**
 * @internal
 */
export declare function _getCurrentElement(): XMLBuilder;

export declare const Ins: (props: { target: string; content?: string }) => null;

/**
 *
 * @public
 */
declare function JSXXML(
  type: any,
  props: any,
  ...children: any[]
): JsxXmlComponentElement | JsxXmlTagElement;
export { JSXXML };
export { JSXXML as h };

declare const JsxXML: unique symbol;

/**
 *
 * @public
 */
export declare type JsxXmlComponentElement = {
  $$typeof: typeof JsxXML;
  builtin: false;
  type: (props: any) => JsxXmlElement;
  props: any;
};

/**
 *
 * @public
 */
export declare type JsxXmlElement = JsxXmlComponentElement | JsxXmlTagElement;

/**
 *
 * @public
 */
export declare type JsxXmlTagElement = {
  $$typeof: typeof JsxXML;
  builtin: false;
  type: string;
  attrs: any;
  children: any;
};

/**
 *
 * @public
 */
export declare function render(
  element: ReactElement | JsxXmlElement,
  options?: XMLBuilderCreateOptions,
): XMLBuilder;

export declare function renderAsync(
  element: ReactElement | JsxXmlElement,
  options?: XMLBuilderCreateOptions,
): Promise<XMLBuilder>;

/**
 * @public
 */
export declare type TextChild = string | number | boolean | null | undefined;

/**
 * @public
 */
export declare type TextChildren = TextChild | TextChildren[];

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
export declare function useContext<T>(context: Context<T>): T;

/**
 * @internal
 */
export declare function _withElement(cur: XMLBuilder, fn: () => void): void;

export {};
