import { getCurrentElement } from '../lib/elements-stack';

/**
 *
 * @public
 */
export function Ins(props: { target: string; content?: string }) {
  const cur = getCurrentElement();
  const { target, content = '' } = props;
  cur.ins(target, content);
  return null;
}
