import { createJsxXmlBuiltinElement } from './builtin';
import { joinTextChildren, TextChildren } from './join';

export function Comment(props: { children: TextChildren }) {
  const text = joinTextChildren(props.children);
  return createJsxXmlBuiltinElement('comment', { text });
}
