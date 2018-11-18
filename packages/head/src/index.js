/**
 * Returns the value at the first index of an array.
 *
 * @name head
 * @param {Array} array The array that will provide the first index.
 * @returns {Array} The value at the first index of an array.
 *
 * @category array
 * @publishdoc
 * @since v0.0.0
 * @export
 * @example
 *
 * head([1, 2, 3, 4]); // => 1
 * head([]);           // => undefined
 */
export default function head(array) {
  return array && array.length ? array[0] : undefined;
}
