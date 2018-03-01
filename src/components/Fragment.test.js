/** @jsx JSXXML */
/* eslint-env node, jest */
import { render, JSXXML, Fragment } from '../index'

const commonOptions = { createOptions: { headless: true } }

describe('Comment', () => {
  const Texts = () => (
    <Fragment>
      <text>1</text>
      <text>2</text>
    </Fragment>
  )
  test('simple Comment', () => {
    expect(
      render(
        <test>
          <Texts />
        </test>,
        commonOptions,
      ),
    ).toBe(`<test><text>1</text><text>2</text></test>`)
  })
})
