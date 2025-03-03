import { Component, forwardRef } from 'react';
import { describe, expect, test } from 'vitest';
import { create } from 'xmlbuilder2';
import { CData, Comment, Fragment, Ins, render } from '../index';
import { createContext, useContext } from './context';
import { renderAsync } from './render-async';
import { createYieldTracker } from './yield-tracker';

declare global {
  namespace React {
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
        <test ref="ref" key="key" before="value" after="value" />,
      ).end({ headless: true });
      expect(xml).toBe(
        `<test key="key" ref="ref" before="value" after="value"/>`,
      );
    });
  });
  describe('fragments and text', () => {
    test('render a top level fragment with component', () => {
      const FirstItem = () => <item>First item</item>;
      const SecondItem = () => <item>Second item</item>;

      let xml = render(
        <>
          <FirstItem />
          <SecondItem />
        </>,
      ).end({ headless: true });

      expect(xml).toBe(`<item>First item</item><item>Second item</item>`);
    });

    test('render a top level fragment with mixed components and JSX', () => {
      let xml = render(
        <>
          <item>First item</item>
          <item>Second item</item>
        </>,
      ).end({ headless: true });

      expect(xml).toBe(`<item>First item</item><item>Second item</item>`);
    });

    test('render top level text', () => {
      const TextContent = () => 'Just some text';
      let xml = render(<TextContent />).end({ headless: true });

      expect(xml).toBe(`Just some text`);
    });
  });
});

describe('renderAsync', () => {
  test('only sync components', async () => {
    const Component = (props: { x: number; children?: React.ReactNode }) => {
      return (
        <item x={props.x}>
          <test />
          text
          {props.children}
        </item>
      );
    };
    const tracker = createYieldTracker().start();

    let xml = (
      await renderAsync(
        <root>
          <Component x={5} />
          <Component x={10}>
            <item>Child content</item>
          </Component>
        </root>,
      )
    ).end({ headless: true, prettyPrint: true });

    const eventLoopYields = tracker.stop();
    expect(eventLoopYields).toMatchInlineSnapshot(`2`);

    expect(xml).toMatchInlineSnapshot(
      `
      "<root>
        <item x="5">
          <test/>
          text
        </item>
        <item x="10">
          <test/>
          text
          <item>Child content</item>
        </item>
      </root>"
    `,
    );
  });
  test('async components', async () => {
    const AsyncComponent = async (props: { x: number }) => {
      return (
        <item x={props.x}>
          <test />
        </item>
      );
    };

    const tracker = createYieldTracker().start();

    let xml = (
      await renderAsync(
        <root>
          <AsyncComponent x={5} />
          <AsyncComponent x={5} />
        </root>,
      )
    ).end({ headless: true });

    const eventLoopYields = tracker.stop();
    expect(eventLoopYields).toMatchInlineSnapshot(`8`);
    expect(xml).toMatchInlineSnapshot(
      `"<root><item x="5"><test/></item><item x="5"><test/></item></root>"`,
    );
  });

  test('renders complex nested XML structure', async () => {
    const AsyncCompExample1 = async () => {
      await sleep(100);
      return <test>AsyncCompExample1</test>;
    };

    const AsyncCompExample2 = async () => {
      await sleep(100);
      return <test>AsyncCompExample2</test>;
    };

    const startTime = performance.now();

    const tracker = createYieldTracker().start();

    let xml = (
      await renderAsync(
        <root version="1.0">
          <AsyncCompExample1 />
          <test count="2">
            <item id="1">
              <AsyncCompExample1 />
              <item>Middle Item</item>
              <item>
                <AsyncCompExample2 />
              </item>
            </item>
            <item id="2">
              <item>Second Item</item>
              <test>
                <test target="important" content="Important information" />
              </test>
            </item>
          </test>
          <AsyncCompExample2 />
        </root>,
      )
    ).end({ headless: true, prettyPrint: true });

    let eventLoopYields = tracker.stop();
    expect(eventLoopYields).toMatchInlineSnapshot(`38`);
    const endTime = performance.now();
    console.log(`took ${endTime - startTime}ms`);
    // Verify that components render concurrently
    // expect(endTime - startTime).toBeLessThan(120);

    expect(xml).toMatchInlineSnapshot(`
      "<root version="1.0">
        <test>AsyncCompExample1</test>
        <test count="2">
          <item id="1">
            <test>AsyncCompExample1</test>
            <item>Middle Item</item>
            <item>
              <test>AsyncCompExample2</test>
            </item>
          </item>
          <item id="2">
            <item>Second Item</item>
            <test>
              <test target="important" content="Important information"/>
            </test>
          </item>
        </test>
        <test>AsyncCompExample2</test>
      </root>"
    `);
  });

  test('renders async components in order', async () => {
    const AsyncCompWithDelay = async ({
      ms,
      id,
    }: {
      ms: number;
      id?: string;
    }) => {
      await sleep(ms);
      return <test id={id} />;
    };

    function Composition({ children }) {
      return (
        <root>
          {children}
          <item>last by Composition</item>
        </root>
      );
    }

    const PassthroughComponent = ({
      children,
    }: {
      children?: React.ReactNode;
    }) => {
      return children;
    };

    let xml = (
      await renderAsync(
        <Composition>
          <PassthroughComponent>
            <item>first sync item</item>
            <AsyncCompWithDelay ms={100} id="1" />
            <AsyncCompWithDelay ms={30} id="2" />
            <AsyncCompWithDelay ms={0} id="3" />
            <item>last sync item</item>
          </PassthroughComponent>
          <PassthroughComponent>
            <AsyncCompWithDelay ms={100} id="1" />
            <AsyncCompWithDelay ms={30} id="2" />
            <AsyncCompWithDelay ms={0} id="3" />
          </PassthroughComponent>
        </Composition>,
      )
    ).end({ headless: true, prettyPrint: true });

    expect(xml).toMatchInlineSnapshot(`
      "<root>
        <item>first sync item</item>
        <test id="1"/>
        <test id="2"/>
        <test id="3"/>
        <item>last sync item</item>
        <test id="1"/>
        <test id="2"/>
        <test id="3"/>
        <item>last by Composition</item>
      </root>"
    `);
  });

  test('should render with Comment, CData, and Ins elements', async () => {
    const xml = (
      await renderAsync(
        <root version="1.0">
          <test>
            <Comment>This is a comment</Comment>
            <CData>some text in cdata</CData>
            <Ins target="processing" content="instruction" />
            <item>
              <Comment>Nested comment</Comment>
              <CData>Nested CDATA section</CData>
            </item>
          </test>
        </root>,
      )
    ).end({ headless: true, prettyPrint: true });

    expect(xml).toMatchInlineSnapshot(`
      "<root version="1.0">
        <test>
          <!--This is a comment-->
          <![CDATA[some text in cdata]]>
          <?processing instruction?>
          <item>
            <!--Nested comment-->
            <![CDATA[Nested CDATA section]]>
          </item>
        </test>
      </root>"
    `);
  });

  test('should render with expression values', async () => {
    const value = 'expression value';
    const numberValue = 42;
    const boolValue = true;

    const xml = (
      await renderAsync(
        <root>
          <item>string: {value}</item>
          <item>number: {numberValue}</item>
          <item>bool: {boolValue.toString()}</item>
          <item>{`Template ${value}`}</item>
          <test>
            <item>{value}</item>
          </test>
        </root>,
      )
    ).end({ headless: true, prettyPrint: true });

    expect(xml).toMatchInlineSnapshot(`
      "<root>
        <item>string: expression value</item>
        <item>number: 42</item>
        <item>bool: true</item>
        <item>Template expression value</item>
        <test>
          <item>expression value</item>
        </test>
      </root>"
    `);
  });

  test('should handle circular references in array children', async () => {
    // This test checks if the renderer properly handles potential circular references
    // when processing array children, as seen in renderChildren function
    const xml = (
      await renderAsync(
        <root>
          <item>
            {[
              <item key="1">First</item>,
              <item key="2">Second</item>,
              // Adding a promise to test async resolution
              Promise.resolve(<item key="3">Async Item</item>),
            ]}
          </item>
        </root>,
      )
    ).end({ headless: true, prettyPrint: true });

    expect(xml).toMatchInlineSnapshot(`
      "<root>
        <item>
          <item key="1">First</item>
          <item key="2">Second</item>
          <item key="3">Async Item</item>
        </item>
      </root>"
    `);
  });

  test('should handle errors in async components', async () => {
    const AsyncComponentThatThrows = async () => {
      throw new Error('Async component error');
    };

    const WrapperComponent = async ({
      children,
    }: {
      children: React.ReactNode;
    }) => {
      return <div>{children}</div>;
    };

    function Component() {
      return (
        <root>
          <test>
            <WrapperComponent>
              <AsyncComponentThatThrows />
            </WrapperComponent>
          </test>
        </root>
      );
    }
    await expect(renderAsync(<Component />)).rejects.toThrow(
      'Async component error',
    );
  });
  test('should throw error for unsupported element type', async () => {
    // Attempt to render an object which is not a valid React element
    const invalidElement = {} as any;

    async function Throws() {
      return <test>{invalidElement}</test>;
    }

    // Wrap the invalid element in a Component to test error propagation
    function ComponentWrapper() {
      return (
        <root>
          <test>
            <Throws />
          </test>
        </root>
      );
    }
    await expect(renderAsync(<ComponentWrapper />)).rejects.toThrow(
      'Unsupported element type',
    );
  });

  test('should handle component returning XmlBuilder', async () => {
    // Component that returns a string without any parent tags
    const TextComponent = () => {
      return create('<text>Just a text string</text>') as any;
    };

    function WrapperComponent() {
      return (
        <root>
          <test>
            <TextComponent />
          </test>
        </root>
      );
    }

    const view = await renderAsync(<WrapperComponent />, {});
    expect(
      view.end({ headless: true, prettyPrint: true }),
    ).toMatchInlineSnapshot(
      `
      "<root>
        <test>
          <text>Just a text string</text>
        </test>
      </root>"
    `,
    );
  });

  test('should handle nested promises and potential node type issues', async () => {
    // This test verifies the renderer correctly handles node types when removing elements
    // and properly processes nested promises
    const nestedPromise = Promise.resolve(
      Promise.resolve(<item>Deeply nested promise</item>),
    );

    const xml = (
      await renderAsync(
        <root>
          <Comment>This should be preserved</Comment>
          <CData>This CDATA should be preserved</CData>
          <Ins target="proc" content="This instruction should be preserved" />
          <test>
            <item key="1">Regular item</item>
            {nestedPromise}
            <Comment key="2">Nested comment</Comment>
          </test>
        </root>,
      )
    ).end({ headless: true, prettyPrint: true });

    expect(xml).toMatchInlineSnapshot(`
      "<root>
        <!--This should be preserved-->
        <![CDATA[This CDATA should be preserved]]>
        <?proc This instruction should be preserved?>
        <test>
          <!--Nested comment-->
          <item key="1">Regular item</item>
          <item>Deeply nested promise</item>
        </test>
      </root>"
    `);
  });
});

describe('forwardRef', () => {
  test('should render a forwardRef element', () => {
    const ForwardRefComponent = forwardRef((props, ref) => {
      return <item ref={ref}></item>;
    });
    const xml = render(<ForwardRefComponent />).end({ headless: true });
    expect(xml).toBe('<item/>');
  });
});

function sleep(ms = 100) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const exampleContext = createContext({ key: 'default' });

describe('context', () => {
  test('synchronous useContext should work correctly', () => {
    function TestComponent() {
      const value = useContext(exampleContext);
      expect(value.key).toBe('custom-value');
      return <item>Value: {value.key}</item>;
    }

    function ParentComponent() {
      return (
        <exampleContext.Provider value={{ key: 'custom-value' }}>
          <root>
            <TestComponent />
          </root>
        </exampleContext.Provider>
      );
    }

    const view = render(<ParentComponent />).end({ headless: true });

    expect(view).toBe('<root><item>Value: custom-value</item></root>');
  });

  test('concurrent useContext should have their context scoped', async () => {
    function ParentComponent({ key }) {
      return (
        <exampleContext.Provider value={{ key }}>
          <item>
            <AsyncComponent key={key}>
              <FirstSibling key={key} />
            </AsyncComponent>
            <SecondSibling key={key} />
          </item>
        </exampleContext.Provider>
      );
    }

    async function AsyncComponent({ children, key }) {
      const value = useContext(exampleContext);
      expect(value.key).toBe(key);
      await sleep(1);
      return children;
    }

    async function FirstSibling({ key }) {
      const value = useContext(exampleContext);
      await sleep();
      expect(value.key).toBe(key);
      return <div>First: {value.key}</div>;
    }

    async function SecondSibling({ key }) {
      const value = useContext(exampleContext);
      await sleep();
      expect(value.key).toBe(key);
      return <div>Second: {value.key}</div>;
    }

    const keys = [
      'default',
      'key1',
      'key2',
      'more',
      'updated-by-first-sibling',
    ];
    const results = await Promise.all(
      keys.map(async (key) => {
        const view = await renderAsync(<ParentComponent key={key} />);
        return view.end({ headless: true, prettyPrint: true });
      }),
    );

    expect(results).toMatchInlineSnapshot(
      `
      [
        "<item>
        <div>First: default</div>
        <div>Second: default</div>
      </item>",
        "<item>
        <div>First: key1</div>
        <div>Second: key1</div>
      </item>",
        "<item>
        <div>First: key2</div>
        <div>Second: key2</div>
      </item>",
        "<item>
        <div>First: more</div>
        <div>Second: more</div>
      </item>",
        "<item>
        <div>First: updated-by-first-sibling</div>
        <div>Second: updated-by-first-sibling</div>
      </item>",
      ]
    `,
    );
  });
  test('concurrent useContext, nested renderAsync', async () => {
    function ParentComponent({ key }) {
      return (
        <exampleContext.Provider value={{ key }}>
          <item ParentComponent>
            <AsyncComponent key={key}>
              <FirstSibling key={key} />
            </AsyncComponent>
            <AsyncComponentWithNested key={key} />
            <SecondSibling key={key} />
          </item>
        </exampleContext.Provider>
      );
    }

    async function AsyncComponent({
      children,
      key,
    }: {
      children?: React.ReactNode;
      key: string;
    }) {
      const value = useContext(exampleContext);
      expect(value.key).toBe(key);
      await sleep(1);

      return <item AsyncComponent>children</item>;
    }

    async function AsyncComponentWithNested({ key }: { key?: string }) {
      const value = useContext(exampleContext);

      expect(value.key).toBe(key);
      const nestedKey = 'nestedKey';
      const view = await renderAsync(
        <exampleContext.Provider value={{ key: nestedKey }}>
          <root nested="true">
            <AsyncComponent key={nestedKey}>nested1 </AsyncComponent>
            <AsyncComponent key={nestedKey}>nested2 </AsyncComponent>
            <AsyncComponent key={nestedKey}>
              <exampleContext.Provider value={{ key: 'evenMoreNested' }}>
                <root evenMoreNested>
                  <AsyncComponent key={'evenMoreNested'}>
                    nested3{' '}
                  </AsyncComponent>{' '}
                </root>
              </exampleContext.Provider>
            </AsyncComponent>
          </root>
        </exampleContext.Provider>,
      );

      return view as any;
    }

    async function FirstSibling({ key }) {
      const value = useContext(exampleContext);
      await sleep();
      expect(value.key).toBe(key);
      return <div>First: {value.key}</div>;
    }

    async function SecondSibling({ key }) {
      const value = useContext(exampleContext);
      await sleep();
      expect(value.key).toBe(key);
      return <div>Second: {value.key}</div>;
    }

    const keys = [
      'default',
      'key1',
      'key2',
      'more',
      'updated-by-first-sibling',
    ];
    const results = await Promise.all(
      keys.map(async (key) => {
        const view = await renderAsync(<ParentComponent key={key} />);
        return view.end({ headless: true, prettyPrint: true });
      }),
    );

    expect(results).toMatchInlineSnapshot(
      `
      [
        "<item ParentComponent="true">
        <root nested="true">
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
        </root>
        <item AsyncComponent="true">children</item>
        <root nested="true">
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
        </root>
        <div>Second: default</div>
      </item>",
        "<item ParentComponent="true">
        <root nested="true">
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
        </root>
        <item AsyncComponent="true">children</item>
        <root nested="true">
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
        </root>
        <div>Second: key1</div>
      </item>",
        "<item ParentComponent="true">
        <root nested="true">
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
        </root>
        <item AsyncComponent="true">children</item>
        <root nested="true">
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
        </root>
        <div>Second: key2</div>
      </item>",
        "<item ParentComponent="true">
        <root nested="true">
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
        </root>
        <item AsyncComponent="true">children</item>
        <root nested="true">
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
        </root>
        <div>Second: more</div>
      </item>",
        "<item ParentComponent="true">
        <root nested="true">
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
        </root>
        <item AsyncComponent="true">children</item>
        <root nested="true">
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
          <item AsyncComponent="true">children</item>
        </root>
        <div>Second: updated-by-first-sibling</div>
      </item>",
      ]
    `,
    );

    const resultsSequential: string[] = [];
    for (const key of keys) {
      const view = await renderAsync(<ParentComponent key={key} />);
      resultsSequential.push(view.end({ headless: true, prettyPrint: true }));
    }

    expect(JSON.stringify(resultsSequential)).toBe(JSON.stringify(results));
  });
});
