export type TextChild = string | number | boolean | null | undefined;
export type TextChildren = TextChild | TextChildren[];

export function joinTextChildren(children: TextChildren): string {
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return children.toString();
  }
  if (typeof children === 'boolean') {
    return '';
  }
  if (children === null || children === undefined) {
    return '';
  }
  return children.map(joinTextChildren).join('');
}
