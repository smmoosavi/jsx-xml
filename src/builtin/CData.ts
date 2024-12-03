import { joinTextChildren, TextChildren } from '../lib/join';
import { getCurrentElement } from '../lib/elements-stack';

/**
 *
 * @public
 */
export function CData(props: { children: TextChildren }) {
  const cur = getCurrentElement();
  const text = joinTextChildren(props.children);
  cur.dat(text);
  return null;
}
