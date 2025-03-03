import { ReactElement } from 'react';
import { isElement } from 'react-is';
import { fragment } from 'xmlbuilder2';
import type { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { XMLBuilderCreateOptions } from 'xmlbuilder2/lib/interfaces';
import * as builtin from '../builtin';
import { createBuiltins } from '../builtin';
import { defaultContexts, setGlobalContexts } from './context';
import { isJsxXmlComponentElement, isJsxXmlTagElement } from './jsx';
import { reactElementToJsxXmlElement } from './react';
import { isReactMemoOrForwardRef, isXmlBuilder, tryStringify } from './render';
import { JsxXmlElement } from './types';

export async function renderAsync(
  element: ReactElement | JsxXmlElement,
  options?: XMLBuilderCreateOptions,
) {
  let elementsStack: XMLBuilder[] = [];

  function getCurrentElement(stack = elementsStack) {
    return stack[stack.length - 1];
  }

  function renderElement(
    element: ReactElement | JsxXmlElement,
    stack = elementsStack,
  ): Promise<XMLBuilder> | XMLBuilder {
    if (element instanceof Promise) {
      return element.then((resolved) => {
        setGlobalContexts(ownContext);
        return renderElement(resolved, stack);
      });
    }

    if (isElement(element) || isReactMemoOrForwardRef(element)) {
      return renderElement(reactElementToJsxXmlElement(element), stack);
    } else if (isJsxXmlTagElement(element)) {
      return renderTagElement(element, stack);
    } else if (isJsxXmlComponentElement(element)) {
      return renderComponentElement(element, stack);
    } else if (isXmlBuilder(element)) {
      // Handle XMLBuilder2 node objects returned from components
      getCurrentElement(stack).import(element);
      return element;
    } else {
      throw new Error('Unsupported element type: ' + tryStringify(element));
    }
  }

  function renderTagElement(
    element: any,
    stack = elementsStack,
  ): Promise<XMLBuilder> | XMLBuilder {
    const parent = getCurrentElement(stack);
    const cur = parent.ele(element.type);
    renderAttrs(cur, element.attrs);

    if (element.children) {
      stack.push(cur);
      let res;

      try {
        res = renderChildren(element.children, stack);
      } finally {
        if (res instanceof Promise) {
          return res.then(() => {
            setGlobalContexts(ownContext);
            stack.pop();
            return cur;
          });
        } else {
          stack.pop();
        }
      }
    }
    return cur;
  }

  function renderAttrs(cur: XMLBuilder, attrs: any) {
    for (let key in attrs) {
      cur.att(key, attrs[key]);
    }
  }

  function renderComponentElement(
    element: any,
    stack = elementsStack,
  ): Promise<XMLBuilder> | XMLBuilder {
    const getter = () => getCurrentElement(stack);

    if (element.type === builtin.Comment) {
      const { Comment } = createBuiltins(getter);
      return renderChildren(Comment(element.props), stack);
    }
    if (element.type === builtin.CData) {
      const { CData } = createBuiltins(getter);
      return renderChildren(CData(element.props), stack);
    }
    if (element.type === builtin.Ins) {
      const { Ins } = createBuiltins(getter);
      return renderChildren(Ins(element.props), stack);
    }

    let res = element.type(element.props);
    setGlobalContexts(ownContext);

    if (res instanceof Promise) {
      return res.then((resolved) => {
        setGlobalContexts(ownContext);
        return renderChildren(resolved, stack);
      });
    }
    return renderChildren(res, stack);
  }

  function renderChildren(
    children: any,
    stack = elementsStack,
  ): Promise<XMLBuilder> | XMLBuilder {
    const cur = getCurrentElement(stack);

    if (typeof children === 'string') {
      return cur.txt(children);
    } else if (typeof children === 'number') {
      return cur.txt(children.toString());
    } else if (Array.isArray(children)) {
      const promises = children.map((child, index) => {
        const childStack = [...stack];
        let res = renderChildren(child, childStack);
        // if a component calls renderAsync, context will change synchronously and need to be reset after render
        setGlobalContexts(ownContext);
        return res;
      });

      const hasPromises = promises.some((p) => p instanceof Promise);
      if (!hasPromises) {
        return cur;
      }
      return Promise.all(promises).then((elements) => {
        setGlobalContexts(ownContext);
        // reorder elements to be same as promise.all
        cur.toArray(false).forEach((x) => {
          // Skip removing comments, CDATA sections, and processing instructions
          if (elements.map((x) => x.node).includes(x.node)) {
            x.remove();
          }
        });

        elements.forEach((element) => {
          // Skip importing if element is the same as cur to avoid circular references
          if (element !== cur) {
            cur.import(element);
          }
        });

        return cur;
      });
    } else if (children) {
      return renderElement(children, stack);
    }
    return cur;
  }

  let cur = fragment(options ?? {});
  elementsStack.push(cur);

  let ownContext = new Map(defaultContexts);
  setGlobalContexts(ownContext);
  await renderElement(element, elementsStack);
  return cur;
}
