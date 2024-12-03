# jsx-xml

Generate xml string from jsx

[![codecov](https://codecov.io/gh/smmoosavi/jsx-xml/branch/master/graph/badge.svg)](https://codecov.io/gh/smmoosavi/jsx-xml)
[![Build Status](https://github.com/smmoosavi/jsx-xml/actions/workflows/node-ci.yml/badge.svg?branch=main)](https://github.com/smmoosavi/jsx-xml/actions/workflows/node-ci.yml)

## Install

```bash
npm install jsx-xml
# or
yarn add jsx-xml
# or
pnpm add jsx-xml
```

## Usage

```tsx
import { render } from 'jsx-xml';
import { expect } from 'vitest';

let xml = render(<test />).end({ headless: true });

expect(xml).toBe(`<test/>`);
```

## API

### `render(jsx, options): XMLBuilder`

- `jsx`: JSX.Element
- `options`: [XMLBuilderCreateOptions](https://oozcitak.github.io/xmlbuilder2/builder-functions.html#builder-options)

returns an instance of XMLBuilder. you can call [end](https://oozcitak.github.io/xmlbuilder2/conversion-functions.html#end) to get the xml string.

### `CData`

```tsx
import { CData } from 'jsx-xml';

const value = 1;

let xml = render(
  <test>
    <CData>some text and {value}</CData>
  </test>,
).end({ headless: true });

expect(xml).toBe(`<test><![CDATA[some text and 1]]></test>`);
```

### `Comment`

```tsx
import { Comment } from 'jsx-xml';

let xml = render(
  <test>
    <Comment>some comment</Comment>
  </test>,
).end({ headless: true });

expect(xml).toBe(`<test><!--some comment--></test>`);
```

### `Ins`

```tsx
import { Ins } from 'jsx-xml';

let xml = render(
  <test>
    <Ins target="target"></Ins>
  </test>,
).end({ headless: true });

expect(xml).toBe(`<test><?target?></test>`);
```

### `Fragment`

```tsx
import { Fragment } from 'jsx-xml';

let xml = render(
  <root>
    <Fragment>
      <test />
      <test />
    </Fragment>
  </root>,
).end({ headless: true });

expect(xml).toBe(`<root><test/><test/></root>`);
```
