/**
 * Exports the flatten function.
 * @since 10/14/18
 * @file
 */

import isArray from '@foldr/is-array';
import FunctionalFactory from '@foldr/internal-fn-factory';

/**
 * Base recursive functionality for `flattenDeep`.
 * @param {Array} array The array to deeply flatten.
 * @param {number} maxDepth The maximum depth to flatten to.
 * @param {Array} results A results "collection" array.
 * @param {number} depth The current flattening depth.
 * @returns {Array} The flattened array.
 */
function flattenDeepBase(array, maxDepth, results, depth) {
  const size = array.length;
  const delta = depth + 1;

  let i = 0;
  let current;

  while (i < size) {
    current = array[i++];

    if (delta <= maxDepth && isArray(current)) {
      flattenDeepBase(current, maxDepth, results, delta);
    } else {
      results[results.length] = current; // eslint-disable-line no-param-reassign
    }
  }

  return results;
}

/**
 * Flattens an array to the specified depth (which defaults to `Infinity`).
 * This will iterate over the provided array pushing all items into a new array.
 * If the current item is an array, it's contents will also be pushed into the new array.
 *
 * @name flattenDeep
 * @param {Array} array The array to deeply flatten.
 * @param {number=} [maxDepth=Infinity] The maximum depth to flatten to.
 * @returns {Array} A newly flattened array.
 *
 * @category array
 * @publishdoc
 * @since v0.0.0
 * @export
 * @example
 *
 * flattenDeep([1, 2, 3, 4]);                 // => [1, 2, 3, 4]
 * flattenDeep([1, [2, [3, 4, [5, 6]], [7]]); // => [1, 2, 3, 4, 5, 6, 7]
 * flattenDeep([[1], [2], [3], 4]);           // => [1, 2, 3, 4]
 */
export default function flattenDeep(array, maxDepth) {
  if (!array || !array.length) return [];
  return flattenDeepBase(array, +maxDepth || Infinity, [], 0);
}

/**
 * Functional, autocurried version of [flattenDeep](#flatten-deep).
 *
 * Flattens an array to the specified depth (which defaults to `Infinity`).
 * This will iterate over the provided array pushing all items into a new array.
 * If the current item is an array, it's contents will also be pushed into the new array.
 *
 * @name flattenDeep.f
 * @param {number} maxDepth The maximum depth to flatten to.
 * @param {Array} array The array to deeply flatten.
 * @returns {Array} A newly flattened array.
 *
 * @arity 2
 * @autocurried
 * @category functional
 * @publishdoc
 * @since v0.0.0
 * @export
 * @example
 *
 * flattenDeep.f(1)([1, 2, 3, 4]);                  // => [1, 2, 3, 4]
 * flattenDeep.f(10)([1, [2, [3, 4, [5, 6]], [7]]); // => [1, 2, 3, 4, 5, 6, 7]
 * flattenDeep.f(Infinity)([[1], [2], [3], 4]);     // => [1, 2, 3, 4]
 */
export const f = FunctionalFactory(flattenDeep, {
  arity: 2,
  signature: [1, 0],
});
