/**
 * Tests for the `internal-symbol` module.
 * @since 10/23/18
 * @file
 */

import getPrefixedSymbol, { getUnprefixedSymbol, MakeSafeSymbol } from '.';

describe('internal-symbol', () => {
  describe('getInternalSymbol', () => {
    it('Should return a symbol with the prefix "@@foldr/"', () => {
      const sym = getPrefixedSymbol('foo');
      expect(typeof sym).toBe('symbol');
      expect(sym.toString()).toBe('Symbol(@@foldr/foo)');
    });
  });

  describe('getSymbol', () => {
    it('Should return registered symbol', () => {
      const sym = getUnprefixedSymbol('iterator');
      expect(typeof sym).toBe('symbol');
      expect(sym).toBe(Symbol.iterator);
    });

    it('Should register an unregistered symbol', () => {
      const sym = getUnprefixedSymbol('foo');
      expect(typeof sym).toBe('symbol');
      expect(sym).toBe(Symbol.for('foo'));
    });
  });

  describe('MakeSafeSymbol', () => {
    it('Should create a SafeSymbol constructor', () => {
      const Sym = MakeSafeSymbol();
      expect(typeof Sym).toBe('function');

      const sym = Sym('foo');
      expect(sym).not.toBe(Sym('foo'));
      expect(typeof sym).toBe('object');
      expect(sym.valueOf()).toBe('@@foo');
      expect(sym.toString()).toBe('@@foo');
      expect({ [sym]: 5 }).toEqual({ '@@foo': 5 });
    });

    it('Should create a SafeSymbol constructor with a SafeSymbol.for method', () => {
      const Sym = MakeSafeSymbol();
      const sym = Sym.for('foo');

      expect(sym.valueOf()).toBe('@@foo');
      expect(sym.toString()).toBe('@@foo');
      expect({ [sym]: 5 }).toEqual({ '@@foo': 5 });

      expect(Sym.for('foo')).toBe(sym);
      expect(Sym('foo')).not.toBe(sym);
    });

    it('Should properly assign to objects', () => {
      const Sym = MakeSafeSymbol();
      const sym = Sym.for('foo');

      const x = {};
      x[sym] = 'test';

      expect(x).toEqual({
        '@@foo': 'test',
      });
    });
  });
});
