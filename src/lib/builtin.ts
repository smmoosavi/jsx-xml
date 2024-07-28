import { ReactNode } from 'react';

export const JsxXmlBuiltin = Symbol('JSXXML.Builtin');

export function isJsxXmlBuiltinElement(value: any) {
  return value && value.$$typeof === JsxXmlBuiltin;
}

export function createJsxXmlBuiltinElement(
  type: string,
  props: any,
): ReactNode {
  return {
    // @ts-ignore
    $$typeof: JsxXmlBuiltin,
    type,
    props,
    key: null,
  };
}
