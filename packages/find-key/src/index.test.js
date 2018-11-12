/**
 * Tests for the `findKey` function.
 * @since 11/10/18
 * @file
 */

import findKey from '.';

const isTwo = x => x === 2;

describe('findKey', () => {
  it('Should be a function', () => {
    expect(typeof findKey).toBe('function');
  });

  it('Should findKey within an array', () => {
    expect(findKey([1, 2, 3, 4], isTwo)).toEqual(1);
  });

  it('Should work with shorthand string iteratees', () => {
    expect(findKey([{ x: true }, { x: false }], 'x')).toEqual(0);
  });

  it('Should work with shorthand array iteratees', () => {
    expect(findKey([{ value: 1 }, { value: 2 }, { value: 3 }], ['value', 2])).toEqual(1);
  });

  it('Should work with shorthand object iteratees', () => {
    const things = [
      { value: 1, name: 'a', foo: 'bar' },
      { value: 2, name: 'b', foo: 'bar' },
      { value: 2, name: 'c', foo: 'bar' },
      { value: 2, name: 'd', foo: 'bar' },
    ];

    expect(findKey(things, { value: 2, name: 'c' })).toEqual(2);
  });

  it('Should work for objects', () => {
    const collection = {
      foo: 1,
      bar: 2,
      baz: 3,
      quxx: 4,
    };

    expect(findKey(collection, isTwo)).toBe('bar');
  });

  it('Should work for Map objects', () => {
    const collection = new Map([['a', 1], ['b', 2], ['c', 3]]);
    expect(findKey(collection, isTwo)).toBe('b');
  });

  it('Should work for Set objects', () => {
    const collection = new Set([1, 2, 3, 4, 2]);
    expect(findKey(collection, isTwo)).toBe(1);
  });

  it('Should work for falsy values', () => {
    expect(findKey(null, isTwo)).toBe(undefined);
    expect(findKey(undefined, isTwo)).toBe(undefined);
    expect(findKey('', isTwo)).toBe(undefined);
    expect(findKey(0, isTwo)).toBe(undefined);
    expect(findKey(false, isTwo)).toBe(undefined);
    expect(findKey(NaN, isTwo)).toBe(undefined);
  });
});