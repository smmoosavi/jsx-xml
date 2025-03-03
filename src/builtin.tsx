import { ReactNode } from 'react';
import { createJsxXmlComponentElement } from './lib/jsx';
import { joinTextChildren, TextChildren } from './lib/join';
import { getCurrentElement as defaultGetCurrentElement } from './lib/elements-stack';

/**
 * @public
 */
export function Fragment(props: { children?: ReactNode }) {
  return props.children;
}

export function createFragment(children: ReactNode) {
  return createJsxXmlComponentElement(Fragment, {}, children);
}

/**
 * Creates built-in XML components with a custom getCurrentElement function
 */
export function createBuiltins(
  getCurrentElement: typeof defaultGetCurrentElement,
) {
  /**
   * @public
   */
  function Comment(props: { children: TextChildren }) {
    const cur = getCurrentElement();
    const text = joinTextChildren(props.children);
    cur.com(text);
    return null;
  }

  /**
   * @public
   */
  function CData(props: { children: TextChildren }) {
    const cur = getCurrentElement();
    const text = joinTextChildren(props.children);
    cur.dat(text);
    return null;
  }

  /**
   * @public
   */
  function Ins(props: { target: string; content?: string }) {
    const cur = getCurrentElement();
    const { target, content = '' } = props;
    cur.ins(target, content);
    return null;
  }

  return {
    Comment,
    CData,
    Ins,
  };
}

// Create default components using the default getCurrentElement function
const { Comment, CData, Ins } = createBuiltins(defaultGetCurrentElement);

// Export the default components
export { Comment, CData, Ins };
