/** @jsx JSXXML */
/* eslint-env node, jest */

import { render, JSXXML } from '../src/index'

const commonOptions = { createOptions: { headless: true } }
const prettyOptions = {
  createOptions: { headless: true },
  endOptions: { pretty: true },
}

describe('simple tags', () => {
  test('simple xml', () => {
    expect(render(<test>1</test>)).toBe('<?xml version="1.0"?><test>1</test>')
  })

  test('simple xml', () => {
    expect(render(<test>1</test>, commonOptions)).toBe('<test>1</test>')
  })

  test('simple xml with attribute', () => {
    expect(
      render(
        <test verbose min-coverage="80">
          1
        </test>,
        commonOptions,
      ),
    ).toBe('<test verbose="true" min-coverage="80">1</test>')
  })

  test('nested xml', () => {
    expect(
      render(
        <test>
          <a>1</a>
          <b>2</b>
        </test>,
        commonOptions,
      ),
    ).toBe('<test><a>1</a><b>2</b></test>')
  })

  test('uppercase xml', () => {
    const TEST = 'TEST'
    expect(
      render(
        <TEST>
          <a>1</a>
          <b>2</b>
        </TEST>,
        commonOptions,
      ),
    ).toBe('<TEST><a>1</a><b>2</b></TEST>')
  })

  test('combine text and elements xml', () => {
    const TEST = 'TEST'
    expect(
      render(
        <TEST>
          x<a>1</a>y<b>2</b>z
        </TEST>,
        commonOptions,
      ),
    ).toBe('<TEST>x<a>1</a>y<b>2</b>z</TEST>')
  })
})

describe('simple tags with variables', () => {
  test('simple xml with variables', () => {
    expect(
      render(
        <test>
          {1}
          {2}
          {3}
        </test>,
        commonOptions,
      ),
    ).toBe('<test>123</test>')
  })

  test('simple xml with variable attributes', () => {
    expect(
      render(
        <test verbose min-coverage={80}>
          1
        </test>,
        commonOptions,
      ),
    ).toBe('<test verbose="true" min-coverage="80">1</test>')
  })

  test('array children', () => {
    expect(
      render(<test>{[1, 2, 3].map(i => <i>{i}</i>)}</test>, commonOptions),
    ).toBe('<test><i>1</i><i>2</i><i>3</i></test>')
  })

  test('boolean and null children', () => {
    const t = true
    const f = false
    const n = null
    const u = undefined
    expect(
      render(
        <test>
          {t}
          {t && <true />}
          {f && <false />}
          {n && <null />}
          {u && <undefined />}
        </test>,
        commonOptions,
      ),
    ).toBe('<test><true/></test>')
  })
})

describe('reusable tags', () => {
  const BusinessCard = ({ person }) => (
    <card>
      <name>{person.name}</name>
      <title>{person.title}</title>
      <email>{person.email}</email>
      <phone>{person.phone}</phone>
      <logo url={person.logo.url} />
    </card>
  )

  test('xml component', () => {
    const person = {
      name: 'John Doe',
      title: 'CEO, Widget Inc.',
      email: 'john.doe@widget.com',
      phone: '(123) 555-1234',
      logo: { url: 'logo.png' },
    }
    expect(render(<BusinessCard person={person} />, prettyOptions)).toBe(`<card>
  <name>John Doe</name>
  <title>CEO, Widget Inc.</title>
  <email>john.doe@widget.com</email>
  <phone>(123) 555-1234</phone>
  <logo url="logo.png"/>
</card>`)
  })
})

describe('options', () => {
  test('format xml', () => {
    expect(
      render(
        <test>
          <a>1</a>
          <b>2</b>
        </test>,
        prettyOptions,
      ),
    ).toBe(`<test>
  <a>1</a>
  <b>2</b>
</test>`)
  })

  test('format xml with variables', () => {
    expect(
      render(
        <test>
          <case>a is: {3}</case>
        </test>,
        prettyOptions,
      ),
    ).toBe(`<test>
  <case>a is: 3</case>
</test>`)
  })
})

describe('children', () => {
  const T = ({ children }) => <test>{children}</test>
  test('children attr vs jsx children', () => {
    expect(render(<T>x</T>, commonOptions)).toBe('<test>x</test>')

    expect(render(<T children="y" />, commonOptions)).toBe('<test>y</test>')

    expect(render(<T children="y">x</T>, commonOptions)).toBe('<test>x</test>')
  })
})

describe('errors', () => {
  test('invalid tag', () => {
    const Bad = {}
    expect(() => {
      render(
        <test>
          <Bad>1</Bad>
          <b>2</b>
        </test>,
        prettyOptions,
      )
    }).toThrow()
  })
})
