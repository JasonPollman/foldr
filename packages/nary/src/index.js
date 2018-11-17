/**
 * Exports the `nary` function.
 * @since 11/10/18
 * @file
 */

import FunctionalFactory from '@foldr/internal-f-factory';

/**
 * Creates a function that wraps `fn` and invokes it with up to `n` arguments.
 *
 * @name nary
 * @param {function} fn The function to fix the arity of.
 * @param {number} n The function to fix the arity of.
 * @returns {function} The function with a fixed arity of `n`.
 *
 * @category function
 * @publishdoc
 * @since v0.0.0
 * @export
 * @example
 *
 * function foo() {
 *    return arguments;
 * }
 *
 * const fixed = nary(foo, 2);
 * fixed('a', 'b', 'c', 'd'); // => { 0: 'a', 1: 'b' }
 */
export default function nary(fn, n) {
  if (typeof fn !== 'function') throw new TypeError('Expected a function.');

  const ary = +n || 0;
  const cap = ary < 0 ? 0 : ary;

  return function fixed() {
    const args = arguments;
    if (args.length > cap) args.length = cap;
    return fn.apply(this, args);
  };
}

/**
 * Functional, autocurried version of [nary](#nary).
 *
 * @name nary.f
 * @param {number} n The function to fix the arity of.
 * @param {function} fn The function to fix the arity of.
 * @returns {function} The function with a fixed arity of `n`.
 *
 * @arity 2
 * @autocurried
 * @category function
 * @publishdoc
 * @since v0.0.0
 * @export
 * @example
 *
 * function foo() {
 *    return arguments;
 * }
 *
 * const fixed = nary.f(2)(foo);
 * fixed('a', 'b', 'c', 'd'); // => { 0: 'a', 1: 'b' }
 */
export const f = FunctionalFactory(nary, {
  arity: 2,
  signature: [1, 0],
});
