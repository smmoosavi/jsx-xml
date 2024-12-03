import { ReactNode } from 'react';

/**
 *
 * @public
 */
export declare function Fragment(props: { children?: ReactNode }): ReactNode;

/**
 *
 * @public
 */
export declare function jsxDEV(
  type: any,
  props: any,
  key: any,
  isStaticChildren: any,
  source: any,
  self: any,
): JsxXmlComponentElement | JsxXmlTagElement;

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

export {};
