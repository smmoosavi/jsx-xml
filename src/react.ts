import type { ReactElement } from 'react';
import { isFragment } from 'react-is';
import type { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { isJsxXmlBuiltinElement } from './lib/builtin';

export function renderReactElement(cur: XMLBuilder, element: ReactElement) {
  renderTag(cur, element);
  return cur;
}

function renderTag(cur: XMLBuilder, element: ReactElement) {
  if (isJsxXmlBuiltinElement(element)) {
    renderBuiltinElement(cur, element);
    return;
  }
  if (typeof element?.type === 'string') {
    let el = cur.ele(element.type);
    const attrs = mergeAttrs(
      element.props,
      element.key,
      // @ts-ignore
      element.ref,
    );
    renderAttrs(el, attrs);
    renderChildren(el, element.props.children);
    return;
  }
  if (typeof element?.type === 'function') {
    if (element.type.prototype?.isReactComponent) {
      throw new Error('Class components are not supported');
    }
    const attrs = mergeAttrs(
      element.props,
      element.key,
      // @ts-ignore
      element.ref,
    );
    // @ts-ignore
    renderTag(cur, element.type(attrs));
  }
  if (isFragment(element)) {
    renderChildren(cur, element.props.children);
  }
}

function mergeAttrs(attrs: any, key: string | null, ref: string | null) {
  return { key, ref, ...attrs };
}

function renderAttrs(cur: XMLBuilder, attrs: any) {
  for (let key in attrs) {
    if (key === 'children') {
      continue;
    }
    cur.att(key, attrs[key]);
  }
}

function renderChildren(cur: XMLBuilder, children: any) {
  if (typeof children === 'string') {
    cur.txt(children);
  } else if (typeof children === 'number') {
    cur.txt(children.toString());
  } else if (Array.isArray(children)) {
    children.forEach((child) => renderChildren(cur, child));
  } else if (children) {
    renderTag(cur, children);
  }
}

export function renderBuiltinElement(cur: XMLBuilder, element: any) {
  if (element.type === 'cdata') {
    cur.dat(element.props.children);
  }
  if (element.type === 'comment') {
    cur.com(element.props.children);
  }
  if (element.type === 'ins') {
    cur.ins(element.props.target, element.props.content);
  }
  if (element.type === 'fragment') {
    return renderChildren(cur, element.props.children);
  }
  return cur;
}
