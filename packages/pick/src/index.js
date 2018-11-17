/**
 * Exports the `pick` function.
 * @since 11/10/18
 * @file
 */

import IteratorFactory from '@foldr/internal-iterator';
import FunctionalFactory from '@foldr/internal-fn-factory';

/**
 * The identity function.
 * Returns the value of the first argument provided to it.
 * @param {any} x The value to passthrough.
 * @returns {any} The value of `x`.
 */
function identity(x) {
  return x;
}

/* eslint-disable no-param-reassign */

/**
 * Gets the pick iteratee.
 * Pick iteratees can be only functions or arrays.
 * @param {any} iteratee The input iteratee value.
 * @returns {function|undefined} The *real* iteratee for the pick function.
 */
function preparePickIteratee(iteratee) {
  if (iteratee == null) return identity;

  switch (iteratee.constructor) {
    case Function: return iteratee;

    case Array: return function picker(value, key) {
      return iteratee.indexOf(key) > -1;
    };

    // Iternal Iterator will return the empty results
    // object in the case `iteratee` isn't a function.
    default: return identity;
  }
}

/**
 * Creates a new object by "picking" (or selecting) the given properties.
 *
 * Iteratee functions are called with the signature `iteratee(value, key, collection)`, where
 * `value` is the current item in the collection, `key` is the key of the current item in the
 * collection, and `collection` is collection.
 *
 * @name pick
 * @param {Object} collection The collection to pick from.
 * @param {Array|function} iteratee The iteratee function to use while picking. If given
 * an array, all of the own properties of `collection` that exist in the array will be
 * picked, all other values will be ignored.
 * @returns {Object} A new object with only the picked values.
 *
 * @category object
 * @publishdoc
 * @since v0.0.0
 * @export
 * @example
 *
 * const data = {
 *   foo: 'foo',
 *   bar: 'bar',
 *   baz: 'baz',
 * };
 *
 * // Using array shorthand
 * pick(data, ['foo', 'baz']); // => { foo: 'foo', baz: 'baz' }
 *
 * // Using function
 * pick(data, (value, key) => value[0] === 'b'); // => { bar: 'bar', baz: 'baz' }
 */
const pick = IteratorFactory({
  Empty: () => ({}),
  Results: () => ({}),
  prepare: preparePickIteratee,
  handler: (context, results, iteratee, i, value, key, collection) => {
    if (context && context.capped ? iteratee(value) : iteratee(value, key, collection)) {
      results[key] = value;
    }
  },
});

/**
 * Functional, autocurried version of [pick](#pick).
 * Creates a new object by "picking" (or selecting) the given properties.
 *
 * Iteratee functions are called with the signature `iteratee(value)`, where
 * `value` is the current item in the collection being iterated over.
 *
 * @name pick.f
 * @param {Array|function} iteratee The iteratee function to use while picking. If given
 * an array, all of the own properties of `collection` that exist in the array will be
 * picked, all other values will be ignored.
 * @param {Object} collection The collection to pick from.
 * @returns {Object} A new object with only the picked values.
 *
 * @category functional
 * @publishdoc
 * @since v0.0.0
 * @export
 * @example
 *
 * const data = {
 *   foo: 'foo',
 *   bar: 'bar',
 *   baz: 'baz',
 * };
 *
 * // Using array shorthand
 * pick.f(['foo', 'baz'], data); // => { foo: 'foo', baz: 'baz' }
 *
 * // Using function
 * pick.f((value, key) => value[0] === 'b')(data); // => { bar: 'bar', baz: 'baz' }
 */
export const f = FunctionalFactory(pick, {
  arity: 2,
  signature: [1, 0],
});

export default pick;
