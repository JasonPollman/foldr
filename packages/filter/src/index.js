/**
 * Exports the `filter` function.
 * @since 11/10/18
 * @file
 */

import IteratorFactory from '@foldr/internal-iterator';

/* eslint-disable no-param-reassign */

export default IteratorFactory({
  Results: Array,
  handler: (results, iteratee, i, value, key, collection) => {
    const retained = iteratee(value, key, collection);
    if (retained) results[results.length] = value;
  },
});