module.exports = ({
  foldr,
  ramda,
  lodash,
}) => {
  const sum = (x, y) => x + y;

  const double = (acc, curr) => {
    acc.push(curr * 2);
    return acc;
  };

  const tests = {
    foldr: ([input, acc]) => foldr.reduceRight(input, sum, acc),
    lodash: ([input, acc]) => lodash.reduceRight(input, sum, acc),
    ramda: ([input, acc]) => ramda.reduceRight(sum, acc, input),
  };

  return [
    {
      name: 'Reduces an Array (1)',
      expect: (result, assert) => assert(result === 21),
      setup: () => [[1, 2, 3, 4, 5, 6], 0],
      tests,
    },
    {
      name: 'Reduces an Array (2)',
      expect: (result, { deepEqual }) => deepEqual(result, [12, 10, 8, 6, 4, 2]),
      setup: () => [[1, 2, 3, 4, 5, 6], () => []],
      tests: {
        foldr: ([input, acc]) => foldr.reduceRight(input, double, acc()),
        lodash: ([input, acc]) => lodash.reduceRight(input, double, acc()),
        ramda: ([input, acc]) => ramda.reduceRight(double, acc(), input),
      },
    },
    {
      name: 'Reduces Falsy',
      expect: (result, assert) => assert(result === 0),
      setup: () => [null, 0],
      tests,
    },
    {
      name: 'Reduces an Object (1)',
      expect: (result, assert) => assert(result === 6),
      setup: () => [{ foo: 1, bar: 2, baz: 3 }, 0],
      tests,
    },
  ];
};
