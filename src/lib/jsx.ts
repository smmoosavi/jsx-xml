export const JsxXml = Symbol('JSXXML');

export type JsxXmlComponentElement = {
  $$typeof: Symbol;
  type: Function;
  props: any;
};

export type JsxXmlTagElement = {
  $$typeof: Symbol;
  type: string;
  attrs: any;
  children: any[];
};

export type JsxXmlElement = JsxXmlComponentElement | JsxXmlTagElement;

export function isJsxXmlElement(value: any): value is JsxXmlElement {
  return value && value.$$typeof === JsxXml;
}

export function isJsxXmlTagElement(value: any): value is JsxXmlTagElement {
  return isJsxXmlElement(value) && typeof value.type === 'string';
}

export function isJsxXmlComponentElement(
  value: any,
): value is JsxXmlComponentElement {
  return isJsxXmlElement(value) && typeof value.type === 'function';
}

export function h(type: any, attrs: any, ...children: any[]) {
  if (typeof type === 'string') {
    return {
      $$typeof: JsxXml,
      type,
      attrs,
      children,
    };
  }
  return {
    $$typeof: JsxXml,
    type,
    props: {
      ...attrs,
      children: getChildrenProps(children),
    },
  };
}

function getChildrenProps(children: any[]) {
  if (children.length === 0) {
    return null;
  }
  if (children.length === 1) {
    return children[0];
  }
  return children;
}
