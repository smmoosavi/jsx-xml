import { describe, expect, test } from 'vitest';
import { joinTextChildren } from './join';

describe('join text children', () => {
  test('join text children', () => {
    expect(joinTextChildren('item')).toBe('item');
    expect(joinTextChildren(2)).toBe('2');
    expect(joinTextChildren(true)).toBe('');
    expect(joinTextChildren(false)).toBe('');
    expect(joinTextChildren(null)).toBe('');
    expect(joinTextChildren(undefined)).toBe('');
    expect(joinTextChildren(['item', 2, true, false, null, undefined])).toBe(
      'item2',
    );
    expect(joinTextChildren(['item', 2, ['nested']])).toBe('item2nested');
  });
});
