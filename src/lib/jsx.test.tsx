/** @jsxImportSource ../ */
import { describe, expect, test } from 'vitest';
import {
  ClassComponent,
  ForwardRefComponent,
  MemoComponent,
} from './fixtures/react';
import { render } from './render';

describe('jsx', () => {
  test('react jsx memo does not use jsx xml', () => {
    const res = <MemoComponent label="test" />;
    expect(res['$$typeof']).toMatchInlineSnapshot(`Symbol(JSXXML)`);

    expect(res.type).toMatchInlineSnapshot(`
      {
        "$$typeof": Symbol(react.memo),
        "compare": null,
        "type": [Function],
      }
    `);
    expect(render(res).end({ headless: true })).toMatchInlineSnapshot(
      `"<item data-label="test"/>"`,
    );
  });
  test('react jsx forwardRef does not use jsx xml', () => {
    const res = <ForwardRefComponent text="test" />;
    expect(res['$$typeof']).toMatchInlineSnapshot(`Symbol(JSXXML)`);
    expect(res.type).toMatchInlineSnapshot(`
      {
        "$$typeof": Symbol(react.forward_ref),
        "render": [Function],
      }
    `);
    expect(render(res).end({ headless: true })).toMatchInlineSnapshot(
      `"<item data-text="test"/>"`,
    );
  });
  test.todo('react jsx ClassComponent does not use jsx xml', () => {
    const res = <ClassComponent text="test" />;
    expect(res['$$typeof']).toMatchInlineSnapshot(`Symbol(JSXXML)`);
    expect(res.type).toMatchInlineSnapshot(`[Function]`);
    expect(render(res).end({ headless: true })).toMatchInlineSnapshot(
      `"<item data-label="test"/>"`,
    );
  });
});
