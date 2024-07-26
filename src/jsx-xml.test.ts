import { describe, expect, it } from 'vitest';
import { jsxXml } from './jsx-xml';

describe('jsxXml', () => {
  it('return jsx-xml', () => {
    expect(jsxXml()).toBe('jsx-xml');
  });
});
