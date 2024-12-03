import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { XMLBuilderCreateOptions } from 'xmlbuilder2/lib/interfaces';

/**
 *
 * @public
 */
export declare function CData(props: { children: TextChildren }): null;

/**
 *
 * @public
 */
declare function Comment_2(props: { children: TextChildren }): null;
export { Comment_2 as Comment };

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
 *
 * @public
 */
export declare function Fragment(props: { children?: ReactNode }): ReactNode;

/**
 * @internal
 */
export declare function _getCurrentElement(): XMLBuilder;

/**
 *
 * @public
 */
export declare function Ins(props: { target: string; content?: string }): null;

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

/**
 * @public
 */
export declare type TextChild = string | number | boolean | null | undefined;

/**
 * @public
 */
export declare type TextChildren = TextChild | TextChildren[];

/**
 * @internal
 */
export declare function _withElement(cur: XMLBuilder, fn: () => void): void;

export {};
