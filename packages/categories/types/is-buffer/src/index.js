/**
 * Exports the `isBuffer` function.
 * @since 10/28/18
 * @file
 */

import is from '@foldr/is';

/**
 * Determines if the given item is an instance of Buffer.
 *
 * @name isBuffer
 * @param {any} thing The value to check.
 * @returns {boolean} True if `thing` is a Buffer object, false otherwise.
 *
 * @category types
 * @publishdoc
 * @since v0.0.0
 * @export
 * @example
 *
 * isBuffer(Buffer.from([])); // => true
 * isBuffer({});              // => false
 */
export default typeof Buffer === 'function' ? is(Buffer) : /* istanbul ignore next */ () => false;