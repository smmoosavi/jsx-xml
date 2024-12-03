import { joinTextChildren, TextChildren } from '../lib/join';
import { getCurrentElement } from '../lib/elements-stack';

/**
 *
 * @public
 */
export function Comment(props: { children: TextChildren }) {
  const cur = getCurrentElement();
  const text = joinTextChildren(props.children);
  cur.com(text);
  return null;
}
