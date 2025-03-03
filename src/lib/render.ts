import { ReactElement } from 'react';
import { isElement } from 'react-is';
import { fragment } from 'xmlbuilder2';
import type { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { XMLBuilderCreateOptions } from 'xmlbuilder2/lib/interfaces';
import { defaultContexts, setGlobalContexts } from './context';
import { getCurrentElement, withElement } from './elements-stack';
import { isJsxXmlComponentElement, isJsxXmlTagElement } from './jsx';
import { reactElementToJsxXmlElement } from './react';
import { JsxXmlElement } from './types';

/**
 *
 * @public
 */
export function render(
  element: ReactElement | JsxXmlElement,
  options?: XMLBuilderCreateOptions,
) {
  setGlobalContexts(new Map(defaultContexts));
  let cur = fragment(options ?? {});

  withElement(cur, () => renderElement(element));

  return cur;
}

// this happens when you render a React memo or forwardRef component with jsx-xml
export function isReactMemoOrForwardRef(element: any): element is ReactElement {
  return element?.type?.type || element?.type?.render;
}

function renderElement(element: ReactElement | JsxXmlElement) {
  if (isElement(element) || isReactMemoOrForwardRef(element)) {
    renderElement(reactElementToJsxXmlElement(element));
  } else if (isJsxXmlTagElement(element)) {
    renderTagElement(element);
  } else if (isJsxXmlComponentElement(element)) {
    renderComponentElement(element);
  } else if (isXmlBuilder(element)) {
    getCurrentElement().import(element);
  } else {
    throw new Error('Unsupported element type ' + tryStringify(element));
  }
}

export function tryStringify(element: any) {
  try {
    return JSON.stringify(element).slice(0, 300);
  } catch (e) {
    return String(element);
  }
}

function renderTagElement(element: any) {
  let cur = getCurrentElement();
  cur = cur.ele(element.type);
  renderAttrs(cur, element.attrs);
  if (element.children) {
    withElement(cur, () => renderChildren(element.children));
  }
}

function renderAttrs(cur: XMLBuilder, attrs: any) {
  for (let key in attrs) {
    cur.att(key, attrs[key]);
  }
}

function renderComponentElement(element: any) {
  renderChildren(element.type(element.props));
}

function renderChildren(children: any) {
  const cur = getCurrentElement();
  if (typeof children === 'string') {
    cur.txt(children);
  } else if (typeof children === 'number') {
    cur.txt(children.toString());
  } else if (Array.isArray(children)) {
    children.forEach((child) => renderChildren(child));
  } else if (children) {
    renderElement(children);
  }
}

export function isXmlBuilder(element: any): element is XMLBuilder {
  return typeof element === 'object' && element !== null && 'node' in element;
}
