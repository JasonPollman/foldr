/**
 * Exports the `isNaN` function.
 * @since 9/25/18
 * @file
 */

/**
 * This is based of the `Number.isNaN` polyfill from
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN#Polyfill).
 * @param {any} x The value to check.
 * @returns {boolean} True if `x` is NaN, false otherwise.
 * @export
 */
export function isNaNPolyfill(x) {
  // eslint-disable-next-line no-self-compare
  return x !== x;
}

/**
 * Determines if the given item is NaN.
 *
 * @name isNaN
 * @param {any} x The value to check.
 * @returns {boolean} True if `x` is NaN, false otherwise.
 *
 * @category types
 * @publishdoc
 * @since v0.0.0
 * @export
 * @example
 *
 * isNaN(NaN);    // => true
 * isNaN('foo');  // => false
 */
export default Number.isNaN || /* istanbul ignore next */ isNaNPolyfill;
