# jsx-xml
Generate xml string from jsx

## install
Add jsx-xml packages
```
yarn add jsx-xml 
```
or 
```
npm install jsx-xml --save 
```

Maybe you need to add `babel-plugin-transform-react-jsx` package if it did not installed before. 

## usage

```jsx harmony
/** @jsx JSXXML */
import {render, JSXXML} from 'jsx-xml'

const xml = render(<test x="3">1 + {2} = {3}</test>) // jsx input
console.log(xml) // xml output: <?xml version="1.0"?><test x="3">1 + 2 = 3</test> 
```

## API

You can import following functions from `jsx-xml` package:

```js
import {render, JSXXML, CData, Comment, Fragment, Raw} from 'jsx-xml'
```

- [render](#render)
- [JSXXML](#jsxxml)
- [CData](#cdata)
- [Comment](#comment)
- [Fragment](#fragment)
- [Raw](#raw)

### `render`
`render(jsx, options)` function converts jsx (JSXXML output) to xml string.

options:
- `xmldec`: directly passed to [`xmlbuilder.create`][xmlbuilder-create]
- `doctype`: directly passed to [`xmlbuilder.create`][xmlbuilder-create] 
- `createOptions`: passed to [`xmlbuilder.create`][xmlbuilder-create] with `separateArrayItems: true`
- `endOptions`: passed to [`xmlbuilder.end`][xmlbuilder-end]

My favorite options is:
```js
const options = {createOptions: {headless: true}, endOptions: {pretty: true}}
```

### `JSXXML`
`JSXXML(type, attr, ...children)` is a jsx pragma.

- `type`: string or function

If `type` is a string it will directly used in xml output. lowercase jsx element type will be string (e.g. `<test />`)

If `type` is a function will called with attr and children. function must be Capitalized.

If you need non-lowercase xml tag you can create Capitalized variable with string value. 

Examples:

The JSX code:
```jsx harmony
/** @jsx JSXXML */

const Banner = ({color, size, children}) => { /* ... */ };

<Banner color="blue" size={2}>
  Click Star
</Banner>
```
compiles into:

```js
/** @jsx JSXXML */

const Banner = ({ color, size, children }) => {/* ... */};

JSXXML(
  Banner,
  { color: "blue", size: 2 },
  "Click Star"
);
```
You can also use the self-closing form of the tag if there are no children. So:

```jsx harmony
/** @jsx JSXXML */

<user username="bob" />
```

compiles into:

```js
/** @jsx JSXXML */

JSXXML("user", { username: "bob" });
```


### `CData`
With this tag you can add cdata to your xml output.

```jsx harmony
/** @jsx JSXXML */
import { render, JSXXML, CData } from 'jsx-xml'

const xml = render(<test x="3"><CData>this is an example {'cdata'}</CData></test>, options)
```
output:
```xml
<test x="3">
  <![CDATA[this is an example cdata]]>
</test>
```

### `Comment`
With this tag you can add comments to your xml output.

```jsx harmony
/** @jsx JSXXML */
import { render, JSXXML, Comment } from 'jsx-xml'

const xml = render(<test><Comment>1 + {2} = {3}</Comment></test>, options)
```
output
```xml
<test>
  <!-- 1 + 2 = 3 -->
</test>
```

### `Fragment`
With fragment tag you can return more than one element. `Fragment` is useful in functions.

```jsx harmony
import { render, JSXXML, Fragment } from 'jsx-xml'

const Items = () => <Fragment>
  <item value="1" />
  <item value="2" />
</Fragment>

const xml = render(<items>
  <Items />
</items>, options)
```
output:
```xml
<items>
  <item value="1"/>
  <item value="2"/>
</items>
```

### `Raw`
With this tag you can add data to your xml without escaping. 

```jsx harmony
/** @jsx JSXXML */
import { render, JSXXML, Raw } from 'jsx-xml'

const data = 'this text contain < and > and & and ;'
const xml = render(<items>
  <x>{data}</x>
  <y><Raw>{data}</Raw></y>
</items>, options)
```
output:
```xml
<items>
  <x>this text contain &lt; and &gt; and &amp; and ;</x>
  <y>this text contain < and > and & and ;</y>
</items>
```

## How to config babel for jsx-xml
You can include `/** @jsx JSXXML */` in your file first line or pass it as pragma param to
`transform-react-jsx` plugin in `.babelrc`:
```json
{
  "plugins": [
    [
      "transform-react-jsx",
      {
        "pragma": "JSXXML"
      }
    ]
  ]
}
```
Also you can use `babel-plugin-jsx-pragmatic` if you don't want to import JSXXML in every pages.

```json
{
  "plugins": [
  [
    "jsx-pragmatic",
      {
        "module": "jsx-xml",
        "import": "JSXXML",
        "export": "JSXXML"
      }
    ]
  ]
}
``` 

[xmlbuilder-create]: https://github.com/oozcitak/xmlbuilder-js/wiki#create
[xmlbuilder-end]: https://github.com/oozcitak/xmlbuilder-js/wiki#converting-to-string
