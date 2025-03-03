import { ReactElement } from 'react';
import { isFragment } from 'react-is';
import { createFragment } from '../builtin';
import { createJsxXmlComponentElement, createJsxXmlTagElement } from './jsx';
import { tryStringify } from './render';

export function reactElementToJsxXmlElement(element: ReactElement) {
  const elementProps: Record<string, any> = element.props as any;
  if (typeof element.type === 'string') {
    // @ts-ignore
    const { key, ref } = element;
    const { children, ...rest } = elementProps;
    const props = { key, ref, ...rest };
    return createJsxXmlTagElement(element.type, props, children);
  }
  const elementType =
    element.type?.['render'] || element.type?.['type'] || element.type;
  if (typeof elementType === 'function') {
    // @ts-ignore
    const { key, ref } = element;
    const { children, ...rest } = elementProps;
    const props = { key, ref, ...rest };
    if (elementType.prototype?.isReactComponent) {
      throw new Error('Class components are not supported');
    }
    // @ts-ignore
    return createJsxXmlComponentElement(elementType, props, children);
  }
  if (isFragment(element)) {
    return createFragment(elementProps.children);
  }

  throw new Error('Unsupported element type: ' + tryStringify(element));
}
