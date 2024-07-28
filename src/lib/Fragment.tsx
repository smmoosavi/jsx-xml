import { ReactNode } from 'react';
import { createJsxXmlBuiltinElement } from './builtin';

export function Fragment(props: { children?: ReactNode }) {
  const { children } = props;
  return createJsxXmlBuiltinElement('fragment', { children });
}
