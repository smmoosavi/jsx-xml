import { create } from 'xmlbuilder2';
import type { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { XMLBuilderCreateOptions } from 'xmlbuilder2/lib/interfaces';
import { isElement } from 'react-is';
import { reactElementToJsxXmlElement } from './react';
import { JsxXmlElement } from './types';
import { isJsxXmlComponentElement, isJsxXmlTagElement } from './jsx';
import { getCurrentElement, withElement } from './elements-stack';
import { ReactElement } from 'react';

/**
 *
 * @public
 */
export function render(
  element: ReactElement | JsxXmlElement,
  options?: XMLBuilderCreateOptions,
) {
  let cur = create(options ?? {});

  withElement(cur, () => renderElement(element));

  return cur;
}

function renderElement(element: ReactElement | JsxXmlElement) {
  if (isElement(element)) {
    renderElement(reactElementToJsxXmlElement(element));
  } else if (isJsxXmlTagElement(element)) {
    renderTagElement(element);
  } else if (isJsxXmlComponentElement(element)) {
    renderComponentElement(element);
  } else {
    throw new Error('Unsupported element type');
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
