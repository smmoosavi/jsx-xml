interface DeepArray<T> extends Array<DeepArrayValue<T>> {}

type DeepArrayValue<T> = T | DeepArray<T>

type DeepStringArray = DeepArray<string | number>

interface XmlAttrs {
  [key: string]: string | number
}

interface JsxElement {
  [elemName: string]: Array<
    XmlAttrs | JsxElement | CommentNode | CDataNode | RawNode | TextNode
  >
}

interface FragmentNode extends Array<JSXNode> {}

interface CommentNode {
  ['#comment']: string
}

interface CDataNode {
  ['#cdata']: string
}

interface RawNode {
  ['#raw']: string
}

interface TextNode {
  ['#text']: string
}

type JSXNode =
  | JsxElement
  | FragmentNode
  | CommentNode
  | CDataNode
  | RawNode
  | null
  | boolean
  | number
  | string

interface Options {
  xmldec?: any
  doctype?: any
  createOptions?: any
  endOptions?: any
}

interface StringChildrenProps {
  children?: null | string | DeepStringArray
}

interface FragmentProps {
  children?: null | JSXNode | Array<JSXNode>
}

export function render(jsx: JSXNode, options?: Options): string

export function Fragment(props: FragmentProps): FragmentNode

export function CData(props: StringChildrenProps): CDataNode

export function Comment(props: StringChildrenProps): CommentNode

export function Raw(props: StringChildrenProps): RawNode

export function JSXXML(
  type: string,
  attr: null | object,
  ...children: JSXNode[]
): JsxElement

export function JSXXML(
  type: ((attr: null | object, children: JSXNode[]) => JSXNode),
  attr: null | object,
  ...children: JSXNode[]
): JSXNode

declare namespace JSXXML {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }

    type Element = JSXNode

    interface ElementChildrenAttribute {
      children: {}
    }
  }
}
