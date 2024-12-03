import { createJsxXmlElement } from './jsx';

/**
 *
 * @public
 */
export function createElement(type: any, props: any, ...children: any[]) {
  return createJsxXmlElement(type, props, children);
}

/**
 *
 * @public
 */
export function JSXXML(type: any, props: any, ...children: any[]) {
  return createJsxXmlElement(type, props, children);
}

/**
 *
 * @public
 */
export function jsx(type: any, props: any, key: any) {
  const { children, ...rest } = props;
  return createJsxXmlElement(type, { key, ...rest }, children);
}

/**
 *
 * @public
 */
export function jsxs(type: any, props: any, key: any) {
  const { children, ...rest } = props;
  return createJsxXmlElement(type, { key, ...rest }, children);
}

/**
 *
 * @public
 */
export function jsxDEV(
  type: any,
  props: any,
  key: any,
  isStaticChildren: any,
  source: any,
  self: any,
) {
  const { children, ...rest } = props;
  return createJsxXmlElement(type, { key, ...rest }, children);
}
