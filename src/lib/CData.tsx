import { createJsxXmlBuiltinElement } from './builtin';
import { joinTextChildren, TextChildren } from './join';

export function CData(props: { children: TextChildren }) {
  const children = joinTextChildren(props.children);
  return createJsxXmlBuiltinElement('cdata', { children });
}
