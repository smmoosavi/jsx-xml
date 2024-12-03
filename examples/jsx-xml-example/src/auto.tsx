// @jsxImportSource jsx-xml

import { render, Fragment, CData, Comment, Ins } from 'jsx-xml';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'x:example': any;
      'x:tag': any;
    }
  }
}

export function renderAutomatic(count: number) {
  return render(
    <x:example>
      <Ins target="style" content="style.css" />
      <x:tag before="value" key="66" ref="77" after="value">
        {count}
      </x:tag>
      <>
        <CData>some data</CData>
        <Comment>comment</Comment>
      </>
      <Fragment>
        <x:tag>another tag</x:tag>
        <CData>some data</CData>
        <Comment>comment</Comment>
      </Fragment>
    </x:example>,
  ).end({ headless: true, prettyPrint: true });
}
