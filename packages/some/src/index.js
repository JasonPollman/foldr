/**
 * Exports the `some` function.
 * @since 11/10/18
 * @file
 */

import IteratorFactory, { BREAK } from '@foldr/internal-iterator';

export default IteratorFactory({
  unwrapResults: results => results.passed,
  ResultsConstructor: () => ({ passed: false }),
  iterateeHandler: (results, iteratee, i, value, key, collection) => {
    const passes = iteratee(value, key, collection);
    if (!passes) return undefined;

    // eslint-disable-next-line no-param-reassign
    results.passed = true;
    return BREAK;
  },
});
