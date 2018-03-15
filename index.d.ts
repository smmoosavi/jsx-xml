declare module 'jsx-xml' {

  interface DeepArray<T> extends Array<DeepArrayValue<T>> {
  }

  type DeepArrayValue<T> = T | DeepArray<T>

  type DeepStringArray = DeepArray<string>

  type Child = null | boolean | number | string | Object
  type Children = DeepArrayValue<Child>

  interface Options {
    xmldec?: any,
    doctype?: any,
    createOptions?: any,
    endOptions?: any,
  }

  function render(jsx: Children, options?: Options): string;

  function JSXXML(type: string | Function, attr: null | object, ...children: Children[]): Children;

  function Fragment(props: { children: DeepArray<any> }): Children[];

  function CData(props: { children: DeepStringArray }): Child;

  function Comment(props: { children: DeepStringArray }): Child;

  function Raw(props: { children: DeepStringArray }): Child;

  interface jsxxml {
    render,
    JSXXML,
    Fragment,
    CData,
    Comment,
    Raw,
  }

  export = jsxxml;
}
