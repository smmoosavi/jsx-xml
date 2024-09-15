import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { isJsxXmlBuiltinElement } from './lib/builtin';
import {
  isJsxXmlComponentElement,
  isJsxXmlTagElement,
  JsxXmlElement,
} from './lib/jsx';

export function renderJsxXmlElement(cur: XMLBuilder, element: JsxXmlElement) {
  renderTag(cur, element);
  return cur;
}

function renderTag(cur: XMLBuilder, element: JsxXmlElement) {
  if (isJsxXmlBuiltinElement(element)) {
    renderBuiltinElement(cur, element);
    return;
  }
  if (isJsxXmlTagElement(element)) {
    let el = cur.ele(element.type);
    renderAttrs(el, element.attrs);
    renderChildren(el, element.children);
    return;
  }
  if (isJsxXmlComponentElement(element)) {
    if (element.type.prototype?.isReactComponent) {
      throw new Error('Class components are not supported');
    }
    renderTag(cur, element.type(element.props));
    return;
  }
  throw new Error('Not implemented');
}

function renderAttrs(cur: XMLBuilder, attrs: any) {
  for (let key in attrs) {
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
    cur.dat(element.props.text);
  }
  if (element.type === 'comment') {
    cur.com(element.props.text);
  }
  if (element.type === 'ins') {
    cur.ins(element.props.target, element.props.content);
  }
  if (element.type === 'fragment') {
    return renderChildren(cur, element.props.children);
  }
  return cur;
}
