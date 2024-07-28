import { createJsxXmlBuiltinElement } from './builtin';

export function Ins(props: { target: string; content?: string }) {
  const { target, content = '' } = props;
  return createJsxXmlBuiltinElement('ins', { target, content });
}
