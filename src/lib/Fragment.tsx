import { ReactNode } from 'react';
import { createJsxXmlBuiltinElement } from './builtin';

export function Fragment(props: { children?: ReactNode }) {
  return createJsxXmlBuiltinElement('fragment', { children: props.children });
}
