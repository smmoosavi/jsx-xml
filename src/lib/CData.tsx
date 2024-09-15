import { createJsxXmlBuiltinElement } from './builtin';
import { joinTextChildren, TextChildren } from './join';

export function CData(props: { children: TextChildren }) {
  const text = joinTextChildren(props.children);
  return createJsxXmlBuiltinElement('cdata', { text });
}
