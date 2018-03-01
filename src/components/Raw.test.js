/** @jsx JSXXML */
/* eslint-env node, jest */
import { render, JSXXML, Raw } from '../index'

const commonOptions = { createOptions: { headless: true } }

describe('Raw', () => {
  test('simple Raw', () => {
    const text = 'this text has < and > and  & and ;'
    expect(
      render(
        <test>
          <text>{text}</text>
          <raw>
            <Raw>{text}</Raw>
          </raw>
        </test>,
        commonOptions,
      ),
    ).toBe(
      `<test><text>this text has &lt; and &gt; and  &amp; and ;</text><raw>this text has < and > and  & and ;</raw></test>`,
    )
  })
})
