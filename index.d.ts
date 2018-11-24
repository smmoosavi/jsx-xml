declare module 'jsx-xml' {

  interface DeepArray<T> extends Array<DeepArrayValue<T>> {
  }

  type DeepArrayValue<T> = T | DeepArray<T>

  type DeepStringArray = DeepArray<string>

  type Child = null | boolean | number | string | object
  type Children = DeepArrayValue<Child>

  interface Options {
    xmldec?: any
    doctype?: any
    createOptions?: any
    endOptions?: any
  }

  interface Jsxxml {
    render(jsx: Children, options?: Options): string

    JSXXML(
      type:
        | string
        | ((attr: null | object, children: Children[]) => Children),
      attr: null | object,
      ...children: Children[]
    ): Children

    Fragment(props: { children: DeepArray<any> }): Children[]

    CData(props: { children: DeepStringArray }): Child

    Comment(props: { children: DeepStringArray }): Child

    Raw(props: { children: DeepStringArray }): Child
  }

  const jsxxml: Jsxxml

  export = jsxxml;
}
