/** @jsx JSXXML */
/* eslint-env node, jest */
import { render, JSXXML, Comment } from '../../src/index'

const commonOptions = { createOptions: { headless: true } }

describe('Comment', () => {
  test('simple Comment', () => {
    expect(
      render(
        <test>
          <Comment>this is sample comment</Comment>
        </test>,
        commonOptions,
      ),
    ).toBe(`<test><!-- this is sample comment --></test>`)
  })

  test('empty Comment', () => {
    expect(
      render(
        <test>
          <Comment />
        </test>,
        commonOptions,
      ),
    ).toBe(`<test><!--  --></test>`)
  })

  test('simple Comment with variables', () => {
    expect(
      render(
        <test>
          <Comment>
            1 + {2} = {3}
          </Comment>
        </test>,
        commonOptions,
      ),
    ).toBe(`<test><!-- 1 + 2 = 3 --></test>`)
  })

  test('comment can not use embed element', () => {
    expect(() => {
      render(
        <test>
          <Comment>
            1 + {<number>2</number>} = {3}
          </Comment>
        </test>,
        commonOptions,
      )
    }).toThrow()
  })

  test('simple Comment with variables', () => {
    const ToFixed = ({ number }) => number.toFixed(2)
    expect(
      render(
        <test>
          <Comment>
            1 + {<ToFixed number={2} />} = {3}
          </Comment>
        </test>,
        commonOptions,
      ),
    ).toBe(`<test><!-- 1 + 2.00 = 3 --></test>`)
  })
})
