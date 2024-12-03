export { render } from './lib/render';
export { Fragment } from './builtin/Fragment';
export { Comment } from './builtin/Comment';
export { CData } from './builtin/CData';
export { Ins } from './builtin/Ins';

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
