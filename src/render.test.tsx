import React from 'react';
import { describe, expect, test } from 'vitest';
import { CData, Comment, Fragment, Ins } from './index';
import { render } from './render';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      test: any;
      item: any;
      root: any;
      'h:test': any;
      'h:item': any;
      'x:test': any;
      'x:item': any;
    }
  }
}

describe('render', () => {
  describe('errors', () => {
    test('string as element', () => {
      expect(() => render('other')).throws();
    });
    test('class component', () => {
      class MyComponent extends React.Component<any, any> {
        render() {
          return <test />;
        }
      }
      expect(() => render(<MyComponent />)).throws(
        'Class components are not supported',
      );
    });
  });
  describe('tag', () => {
    test('render self-closing tag', () => {
      expect(render(<test />).end({ headless: true })).toBe('<test/>');
    });
    test('render tag', () => {
      expect(render(<test>item</test>).end({ headless: true })).toBe(
        '<test>item</test>',
      );
    });
    test('render multiple child', () => {
      expect(render(<test>item {2}</test>).end({ headless: true })).toBe(
        '<test>item 2</test>',
      );
    });
    test('render nested tags', () => {
      expect(
        render(
          <test>
            <item />
          </test>,
        ).end({ headless: true }),
      ).toBe('<test><item/></test>');
    });
    test('render nested tags with text', () => {
      expect(
        render(
          <test>
            <item>text</item>
          </test>,
        ).end({ headless: true }),
      ).toBe('<test><item>text</item></test>');
    });
    test('render nested tags mixed with text', () => {
      expect(
        render(
          <test>
            the <item>2</item>.
          </test>,
        ).end({ headless: true }),
      ).toBe('<test>the <item>2</item>.</test>');
    });
    test('render with children array', () => {
      expect(
        render(<test>{['item', <item />]}</test>).end({ headless: true }),
      ).toBe('<test>item<item/></test>');
    });
    test('render with nested children array', () => {
      expect(
        render(<test>{['item', <item />, ['nested', <item />]]}</test>).end({
          headless: true,
        }),
      ).toBe('<test>item<item/>nested<item/></test>');
    });
  });
  describe('render attrs', () => {
    test('render with attr', () => {
      expect(render(<test id="1" />).end({ headless: true })).toBe(
        '<test id="1"/>',
      );
    });

    test('render with attr number', () => {
      expect(render(<test id={1} />).end({ headless: true })).toBe(
        '<test id="1"/>',
      );
    });

    test('render with children', () => {
      expect(render(<test id="1">item</test>).end({ headless: true })).toBe(
        '<test id="1">item</test>',
      );
    });

    test('render with multiple attr', () => {
      expect(render(<test id="1" other="2" />).end({ headless: true })).toBe(
        '<test id="1" other="2"/>',
      );
      expect(render(<test other="2" id="1" />).end({ headless: true })).toBe(
        '<test other="2" id="1"/>',
      );
    });

    test('render with key', () => {
      expect(render(<test key="1" />).end({ headless: true })).toBe(
        '<test key="1"/>',
      );
    });
    test('render with ref', () => {
      expect(render(<test ref="1" />).end({ headless: true })).toBe(
        '<test ref="1"/>',
      );
    });
    test.skip('render with key and attr', () => {
      expect(
        render(<test key="1" ref="3" id="2" />).end({ headless: true }),
      ).toBe('<test key="1" ref="3" id="2"/>');
      expect(
        render(<test id="2" ref="3" key="1" />).end({ headless: true }),
      ).toBe('<test id="2" ref="3" key="1"/>');
    });
    test('render with attr in children', () => {
      expect(
        render(
          <test>
            <item id="1" />
          </test>,
        ).end({ headless: true }),
      ).toBe('<test><item id="1"/></test>');
    });
  });
  describe('component', () => {
    test('render component', () => {
      const Test = ({ id }: { id: string }) => <test id={id} />;
      expect(render(<Test id="1" />).end({ headless: true })).toBe(
        '<test id="1"/>',
      );
    });

    test('render component with children', () => {
      const Test = ({ id }: { id: string }) => <test id={id}>item</test>;
      expect(render(<Test id="1" />).end({ headless: true })).toBe(
        '<test id="1">item</test>',
      );
    });
    test('render component with children array', () => {
      const Test = ({ id }: { id: string }) => (
        <test id={id}>{['item', 'item2']}</test>
      );
      expect(render(<Test id="1" />).end({ headless: true })).toBe(
        '<test id="1">itemitem2</test>',
      );
    });

    test('render component with nested tags', () => {
      const Item = () => <item />;
      const Test = ({ id }: { id: string }) => (
        <test id={id}>
          <Item />
        </test>
      );
      expect(render(<Test id="1" />).end({ headless: true })).toBe(
        '<test id="1"><item/></test>',
      );
    });
    test('render component with nested component', () => {
      const Item = () => <item />;
      const Test = ({ id }: { id: string }) => (
        <test id={id}>
          <Item />
        </test>
      );
      const Outer = () => <Test id="1" />;
      expect(render(<Outer />).end({ headless: true })).toBe(
        '<test id="1"><item/></test>',
      );
    });
  });
  describe('fragment', () => {
    test('render fragment', () => {
      expect(
        render(
          <>
            <test />
          </>,
        ).end({ headless: true }),
      ).toBe('<test/>');
    });
    test('render fragment with children', () => {
      expect(
        render(
          <test>
            <>
              test
              <item />
            </>
          </test>,
        ).end({ headless: true }),
      ).toBe('<test>test<item/></test>');
    });
  });
  describe('namespace', () => {
    test('render with namespace', () => {
      expect(
        render(
          <root
            xmlns:h="http://example.com/TR/html4/"
            xmlns:x="http://example.com/TR/xml"
          >
            <h:test>
              <h:item />
            </h:test>
            <x:test>
              <x:item />
            </x:test>
          </root>,
        ).end({ headless: true }),
      ).toBe(
        '<root xmlns:h="http://example.com/TR/html4/" xmlns:x="http://example.com/TR/xml"><h:test><h:item/></h:test><x:test><x:item/></x:test></root>',
      );
    });
    test('render attr whith namespace', () => {
      expect(
        render(
          <root>
            <h:test h:width={4}>
              <h:item h:name="test" />
            </h:test>
          </root>,
        ).end({ headless: true }),
      ).toBe(
        '<root><h:test h:width="4"><h:item h:name="test"/></h:test></root>',
      );
    });
  });
  describe('builtin fragment', () => {
    test('empty', () => {
      expect(
        render(
          <test>
            <Fragment />
          </test>,
        ).end({ headless: true }),
      ).toBe('<test/>');
    });
    test('one child', () => {
      expect(
        render(
          <test>
            <Fragment>
              <item />
            </Fragment>
          </test>,
        ).end({ headless: true }),
      ).toBe('<test><item/></test>');
    });
    test('multiple children', () => {
      expect(
        render(
          <test>
            <Fragment>
              test
              <item />
            </Fragment>
          </test>,
        ).end({ headless: true }),
      ).toBe('<test>test<item/></test>');
    });
    test('at root', () => {
      expect(
        render(
          <Fragment>
            <Ins target="bold" />
            <test>
              test
              <item />
            </test>
          </Fragment>,
        ).end({ headless: true }),
      ).toBe('<?bold?><test>test<item/></test>');
    });
  });
  describe('builtin', () => {
    test('render cdata', () => {
      const data = '<test>item</test>';
      expect(
        render(
          <test>
            <CData>{data}</CData>
          </test>,
        ).end({ headless: true }),
      ).toBe('<test><![CDATA[<test>item</test>]]></test>');
    });
    test('render cdata multiple children', () => {
      const data = '<test>item</test>';
      expect(
        render(
          <test>
            <CData>data is: {data}</CData>
          </test>,
        ).end({ headless: true }),
      ).toBe('<test><![CDATA[data is: <test>item</test>]]></test>');
    });
    test('render comment', () => {
      const data = 'comment';
      expect(
        render(
          <test>
            <Comment>{data}</Comment>
          </test>,
        ).end({ headless: true }),
      ).toBe('<test><!--comment--></test>');
    });
    test('render comment multiple children', () => {
      const data = 'the comment';
      expect(
        render(
          <test>
            <Comment>comment is: {data}</Comment>
          </test>,
        ).end({ headless: true }),
      ).toBe('<test><!--comment is: the comment--></test>');
    });
    test('render ins', () => {
      expect(
        render(
          <test>
            <Ins target="color" content="red" />
            <Ins target="bold" />
            text
          </test>,
        ).end({ headless: true }),
      ).toBe('<test><?color red?><?bold?>text</test>');
    });
  });
  describe('customize', () => {
    test('default', () => {
      expect(render(<test />).end()).toBe('<?xml version="1.0"?><test/>');
    });
    test('doctype', () => {
      expect(
        render(<test />)
          .dtd()
          .end(),
      ).toBe('<?xml version="1.0"?><!DOCTYPE test><test/>');
    });
    test('declaration', () => {
      expect(
        render(<test />)
          .dec({ standalone: true })
          .end(),
      ).toBe('<?xml version="1.0" standalone="yes"?><test/>');
    });
  });
});
