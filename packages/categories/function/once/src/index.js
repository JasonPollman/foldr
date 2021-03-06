import SafeSymbolFor from '@foldr/internal-symbol';

/* eslint-disable require-jsdoc */

/**
 * Used to track the arity of curried functions.
 * @type {SafeSymbol}
 */
export const ARITY = SafeSymbolFor('source-arity');

/**
 * No operation
 * @returns {void}
 */
function noop() {}

/**
 * Creates a function that wraps and limits the invocation of `fn` to one call.
 * If fn is invoked more than once, it returns the result from the first invocation.
 *
 * @name once
 * @param {function} fn The function to "once"
 * @returns {any} Whatever is returned from the first call to `fn`.
 *
 * @arity 1
 * @category function
 * @publishdoc
 * @since v0.0.0
 * @export
 * @example
 *
 * import { once } from '@foldr/all';
 *
 * const onced = once(num => num * 4);
 *
 * onced(4); // => 16
 * onced(6); // => 16
 */
export default function once(fn) {
  if (typeof fn !== 'function') return noop;

  let amt = 0;
  let res;

  function onced() {
    if (amt > 0) return res;

    amt++;
    res = fn.apply(this, arguments);

    return res;
  }

  onced[ARITY] = fn[ARITY] >= 0 ? fn[ARITY] : fn.length;
  return onced;
}
