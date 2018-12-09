import iterator from '@foldr/internal-iterator';
import FunctionalFactory from '@foldr/internal-fmake';

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
 * Gets the omit iteratee.
 * Omit iteratees can be only functions or arrays.
 * @param {any} iteratee The input iteratee value.
 * @returns {function|undefined} The *real* iteratee for the omit function.
 */
function prepareOmitIteratee(iteratee) {
  if (iteratee == null) return identity;

  switch (iteratee.constructor) {
    case Function: return iteratee;

    case Array: return function omitter(value, key) {
      return iteratee.indexOf(key) > -1;
    };

    // Iternal Iterator will return the empty results
    // object in the case `iteratee` isn't a function.
    default: return identity;
  }
}

/**
 * Creates a new object by "omitting" the given properties from `collection`.
 *
 * Iteratee functions are called with the signature `iteratee(value, key, collection)`, where
 * `value` is the current item in the collection, `key` is the key of the current item in the
 * collection, and `collection` is collection.
 *
 * @name omit
 * @param {Object} collection The collection to omit properties from.
 * @param {Array|function} iteratee The iteratee function to use while omitting. If given
 * an array, all of the own properties of `collection` that exist in the array will be
 * omitted, all other values will be included in the results object.
 * @returns {Object} A new object with all but the omitted values.
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
 * omit(data, ['foo', 'baz']); // => { bar: 'bar' }
 *
 * // Using a function
 * omit(data, (value, key) => value[0] === 'b'); // => { foo: 'foo }
 */
const omit = iterator({
  Empty: () => ({}),
  Results: () => ({}),
  prepare: prepareOmitIteratee,
  handler: (context, results, iteratee, i, value, key, collection) => {
    if (context && context.capped ? !iteratee(value, key) : !iteratee(value, key, collection)) {
      results[key] = value;
    }
  },
});


/**
 * Functional, autocurried version of [omit](#omit).
 *
 * Creates a new object by "omitting" the given properties from `collection`.
 *
 * Iteratee functions are called with the signature `iteratee(value)`, where
 * `value` is the current item in the collection being iterated over.
 *
 * @name omit.f
 * @param {Array|function} iteratee The iteratee function to use while omitting. If given
 * an array, all of the own properties of `collection` that exist in the array will be
 * omitted, all other values will be included in the results object.
 * @param {Object} collection The collection to omit properties from.
 * @returns {Object} A new object with all but the omitted values.
 *
 * @arity 2
 * @autocurried
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
 * omit.f(['foo', 'baz'], omit); // => { bar: 'bar' }
 *
 * // Using a function
 * omit.f((value, key) => value[0] === 'b')(data); // => { foo: 'foo }
 */
export const f = FunctionalFactory(omit, {
  arity: 2,
  capped: true,
  context: 'config',
  signature: [1, 0],
});

export default omit;