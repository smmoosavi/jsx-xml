export function ReactComponent() {
  return <item />;
}

import React, { forwardRef, memo, Suspense } from 'react';

// Basic component with memo
export const MemoComponent = memo(function MemoComponent({
  label,
}: {
  label: string;
}) {
  return <item data-label={label} />;
});
export const WithSuspense = function MemoComponent({
  label,
}: {
  label: string;
}) {
  return <Suspense fallback={<item data-label={label} />}></Suspense>;
};

// ForwardRef component
export const ForwardRefComponent = forwardRef<HTMLDivElement, { text: string }>(
  function ForwardRefComponent(props, ref) {
    return <item ref={ref} data-text={props.text} />;
  },
);

export class ClassComponent extends React.Component<{ text: string }> {
  render() {
    return <item data-text={this.props.text} />;
  }
}
