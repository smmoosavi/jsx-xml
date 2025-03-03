export { render } from './lib/render';
export { Fragment, Comment, CData, Ins } from './builtin';

export { createElement } from './lib/runtime';
export { JSXXML, JSXXML as h } from './lib/runtime';
export {
  getCurrentElement as _getCurrentElement,
  withElement as _withElement,
} from './lib/elements-stack';

export type { TextChildren, TextChild } from './lib/join';
export type {
  JsxXmlElement,
  JsxXmlComponentElement,
  JsxXmlTagElement,
} from './lib/types';

export { renderAsync } from './lib/render-async';
export { createContext, useContext } from './lib/context';
export type { Context } from './lib/context';
