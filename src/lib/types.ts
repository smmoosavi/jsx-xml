export const JsxXML = Symbol('JSXXML');

/**
 *
 * @public
 */
export type JsxXmlElement = JsxXmlComponentElement | JsxXmlTagElement;

/**
 *
 * @public
 */
export type JsxXmlTagElement = {
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
export type JsxXmlComponentElement = {
  $$typeof: typeof JsxXML;
  builtin: false;
  type: (props: any) => JsxXmlElement;
  props: any;
};
