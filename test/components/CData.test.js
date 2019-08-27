/** @jsx JSXXML */
/* eslint-env node, jest */
import { CData, JSXXML, render } from '../../src/index'

const commonOptions = { createOptions: { headless: true } }

describe('CData', () => {
  test('simple CData', () => {
    expect(
      render(
        <test>
          <CData>this is sample cdata</CData>
        </test>,
        commonOptions,
      ),
    ).toBe('<test><![CDATA[this is sample cdata]]></test>')
  })

  test('empty CData', () => {
    expect(
      render(
        <test>
          <CData />
        </test>,
        commonOptions,
      ),
    ).toBe('<test><![CDATA[]]></test>')
  })

  test('simple CData with variables', () => {
    expect(
      render(
        <test>
          <CData>
            1 + {2} = {3}
          </CData>
        </test>,
        commonOptions,
      ),
    ).toBe('<test><![CDATA[1 + 2 = 3]]></test>')
  })
})
