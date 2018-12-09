/**
 * Exports the `isRegExp` function.
 * @since 10/28/18
 * @file
 */

import is from '@foldr/is';

/**
 * Determines if the given item is an instance of RegExp.
 *
 * @name isRegExp
 * @param {any} thing The value to check.
 * @returns {boolean} True if `thing` is a RegExp object, false otherwise.
 *
 * @category types
 * @publishdoc
 * @since v0.0.0
 * @export
 * @example
 *
 * isRegExp(/^foo$/i);             // => true
 * isRegExp(new RegExp('.*bar$')); // => true
 * isRegExp('string');             // => false
 */
export default is(RegExp);