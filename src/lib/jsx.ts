import { JsxXML, JsxXmlComponentElement, JsxXmlTagElement } from './types';

export function createJsxXmlTagElement(
  type: string,
  attrs: any,
  children?: any,
): JsxXmlTagElement {
  return {
    $$typeof: JsxXML,
    builtin: false,
    type,
    attrs,
    children,
  };
}

export function isJsxXmlTagElement(element: any): element is JsxXmlTagElement {
  return (
    element.$$typeof === JsxXML &&
    !element.builtin &&
    typeof element.type === 'string'
  );
}

export function createJsxXmlComponentElement(
  type: (props: any) => any,
  props: any,
  children?: any,
): JsxXmlComponentElement {
  return {
    $$typeof: JsxXML,
    builtin: false,
    type,
    props: { ...props, children },
  };
}

export function isJsxXmlComponentElement(
  element: any,
): element is JsxXmlComponentElement {
  return (
    element.$$typeof === JsxXML &&
    !element.builtin &&
    typeof element.type === 'function'
  );
}

export function createJsxXmlElement(
  type: string | ((props: any) => any),
  props: any,
  children?: any,
) {
  if (typeof type === 'string') {
    return createJsxXmlTagElement(type, props, children);
  }
  return createJsxXmlComponentElement(type, props, children);
}
