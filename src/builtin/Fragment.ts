import { ReactNode } from 'react';
import { createJsxXmlComponentElement } from '../lib/jsx';

/**
 *
 * @public
 */
export function Fragment(props: { children?: ReactNode }) {
  return props.children;
}

export function createFragment(children: ReactNode) {
  return createJsxXmlComponentElement(Fragment, {}, children);
}
