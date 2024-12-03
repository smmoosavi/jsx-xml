import { describe, expect, test } from 'vitest';
import { CData, Comment, Fragment, Ins, render } from '../index';
import { Component } from 'react';

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
  describe('tag', () => {
    test('should render a tag element', () => {
      let xml = render(<test />).end({ headless: true });
      expect(xml).toBe(`<test/>`);
    });
    test('should render a tag element with attrs', () => {
      let xml = render(<test foo="bar" />).end({ headless: true });
      expect(xml).toBe(`<test foo="bar"/>`);
    });
    test('should render a tag element with a child', () => {
      let xml = render(
        <test>
          <item />
        </test>,
      ).end({ headless: true });
      expect(xml).toBe(`<test><item/></test>`);
    });
    test('should render a tag element with children', () => {
      let xml = render(
        <test>
          <item />
          <item />
        </test>,
      ).end({ headless: true });
      expect(xml).toBe(`<test><item/><item/></test>`);
    });
    test('should render a tag element with children and attrs', () => {
      let xml = render(
        <test foo="bar">
          <item x={5} />
          <item y={4} />
        </test>,
      ).end({ headless: true });
      expect(xml).toBe(`<test foo="bar"><item x="5"/><item y="4"/></test>`);
    });
    test('should render a tag element with a text child', () => {
      let xml = render(<test>text</test>).end({ headless: true });
      expect(xml).toBe(`<test>text</test>`);
    });
    test('should render a tag element with text children', () => {
      let xml = render(
        <test>
          text
          {' child'}
        </test>,
      ).end({ headless: true });
      expect(xml).toBe(`<test>text child</test>`);
    });
    test('should render a tag element with number children', () => {
      let xml = render(
        <test>
          {2}
          {3}
        </test>,
      ).end({ headless: true });
      expect(xml).toBe(`<test>23</test>`);
    });
    test('should render a tag element with a text child and a tag child', () => {
      let xml = render(
        <test>
          text
          <item />
        </test>,
      ).end({ headless: true });
      expect(xml).toBe(`<test>text<item/></test>`);
    });
  });
  describe('fragment', () => {
    test('should render a fragment element', () => {
      let xml = render(
        <root>
          <>
            <item />
            <item />
          </>
        </root>,
      ).end({ headless: true });
      expect(xml).toBe(`<root><item/><item/></root>`);
    });
  });
  describe('builtin', () => {
    describe('Fragment', () => {
      test('should render a fragment element with no child', () => {
        let xml = render(
          <root>
            <Fragment />
          </root>,
        ).end({ headless: true });
        expect(xml).toBe(`<root/>`);
      });
      test('should render a fragment element with a child', () => {
        let xml = render(
          <root>
            <Fragment>
              <item />
            </Fragment>
          </root>,
        ).end({ headless: true });
        expect(xml).toBe(`<root><item/></root>`);
      });
      test('should render a fragment element with children', () => {
        let xml = render(
          <root>
            <Fragment>
              <item />
              <item />
            </Fragment>
          </root>,
        ).end({ headless: true });
        expect(xml).toBe(`<root><item/><item/></root>`);
      });
    });

    describe('cdata', () => {
      test('should render a cdata element with a child', () => {
        let xml = render(
          <root>
            <CData>test</CData>
          </root>,
        ).end({ headless: true });
        expect(xml).toBe(`<root><![CDATA[test]]></root>`);
      });
      test('should render a cdata element with children', () => {
        let xml = render(
          <root>
            <CData>test {2}</CData>
          </root>,
        ).end({ headless: true });
        expect(xml).toBe(`<root><![CDATA[test 2]]></root>`);
      });
    });

    describe('comment', () => {
      test('should render a comment element with a child', () => {
        let xml = render(
          <root>
            <Comment>comment</Comment>
          </root>,
        ).end({ headless: true });
        expect(xml).toBe(`<root><!--comment--></root>`);
      });
      test('should render a comment element with children', () => {
        let xml = render(
          <root>
            <Comment>comment {2}</Comment>
          </root>,
        ).end({ headless: true });
        expect(xml).toBe(`<root><!--comment 2--></root>`);
      });
      test('should render a comment element at root element', () => {
        let xml = render(<Comment>comment {2}</Comment>).end({
          headless: true,
        });
        expect(xml).toBe(`<!--comment 2-->`);
      });
      test('should render a comment element at root element with other elements', () => {
        let xml = render(
          <>
            <Comment>comment {2}</Comment>
            <root />
          </>,
        ).end({ headless: true });
        expect(xml).toBe(`<!--comment 2--><root/>`);
      });
    });

    describe('ins', () => {
      test('should render an ins element without content', () => {
        let xml = render(
          <root>
            <Ins target="target"></Ins>
          </root>,
        ).end({ headless: true });
        expect(xml).toBe(`<root><?target?></root>`);
      });
      test('should render an ins element with content', () => {
        let xml = render(
          <root>
            <Ins target="target" content="content"></Ins>
          </root>,
        ).end({ headless: true });
        expect(xml).toBe(`<root><?target content?></root>`);
      });
      test('should render an ins element with multiple content', () => {
        let xml = render(
          <root>
            <Ins target="target" content={`a="b" c="x"`}></Ins>
          </root>,
        ).end({ headless: true });
        expect(xml).toBe(`<root><?target a="b" c="x"?></root>`);
      });
      test('should render an ins element at root element', () => {
        let xml = render(<Ins target="target" content={`a="b" c="x"`} />).end({
          headless: true,
        });
        expect(xml).toBe(`<?target a="b" c="x"?>`);
      });
      test('should render an ins element at root element with other elements', () => {
        let xml = render(
          <>
            <Ins target="target" content={`a="b" c="x"`} />
            <root />
          </>,
        ).end({ headless: true });
        expect(xml).toBe(`<?target a="b" c="x"?><root/>`);
      });
    });
  });
  describe('Component', () => {
    test('should render a component element', () => {
      function Test() {
        return <item />;
      }
      let xml = render(
        <root>
          <Test />
        </root>,
      ).end({ headless: true });
      expect(xml).toBe(`<root><item/></root>`);
    });
    test('should render a component element with props', () => {
      function Test(props: { x: number }) {
        return <item x={props.x} />;
      }
      let xml = render(
        <root>
          <Test x={5} />
        </root>,
      ).end({ headless: true });
      expect(xml).toBe(`<root><item x="5"/></root>`);
    });
    test('should render a component element with children', () => {
      function Test(props: { x: number }) {
        return (
          <item x={props.x}>
            <item />
          </item>
        );
      }
      let xml = render(
        <root>
          <Test x={5} />
        </root>,
      ).end({ headless: true });
      expect(xml).toBe(`<root><item x="5"><item/></item></root>`);
    });
    test('should render a component element with children prop', () => {
      function Test(props: { x: number; children: any }) {
        return <item x={props.x}>{props.children}</item>;
      }
      let xml = render(
        <root>
          <Test x={5}>
            <item />
          </Test>
        </root>,
      ).end({ headless: true });
      expect(xml).toBe(`<root><item x="5"><item/></item></root>`);
    });
    test('should render a component element with component children', () => {
      function Test(props: { x: number; children: any }) {
        return <item x={props.x}>{props.children}</item>;
      }
      function Child() {
        return <item />;
      }
      let xml = render(
        <root>
          <Test x={5}>
            <Child />
          </Test>
        </root>,
      ).end({ headless: true });
      expect(xml).toBe(`<root><item x="5"><item/></item></root>`);
    });
  });
  describe('errors', () => {
    test('class components', () => {
      class Test extends Component<any, any> {
        render() {
          return <item />;
        }
      }
      expect(() => {
        render(
          <root>
            <Test />
          </root>,
        );
      }).toThrowError('Class components are not supported');
    });
    test('unsupported element', () => {
      expect(() => {
        render(<root>{{ some: 'object' }}</root>);
      }).toThrowError('Unsupported element type');
    });
    test('unsupported element type', () => {
      const Type = { some: 'object' };
      expect(() => {
        // @ts-expect-error
        render(<Type />);
      }).toThrowError('Unsupported element type');
    });
  });
  describe('edge cases', () => {
    test('render a tag with key and ref', () => {
      let xml = render(
        <test before="value" key="key" ref="ref" after="value" />,
      ).end({ headless: true });
      expect(xml).toBe(
        `<test key="key" ref="ref" before="value" after="value"/>`,
      );
    });
  });
});
