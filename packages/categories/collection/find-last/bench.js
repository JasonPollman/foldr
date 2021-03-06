module.exports = ({ foldr, lodash }) => {
  const isTwo = x => x === 2;

  const tests = {
    foldr: input => foldr.findLast(input, isTwo),
    lodash: input => lodash.findLast(input, isTwo),
  };

  return [
    {
      name: 'Finds (Bad Input)',
      expect: (result, assert) => assert(result === undefined),
      setup: () => null,
      tests,
    },
    {
      name: 'Finds (Array of Numbers)',
      expect: (result, assert) => assert(result === 2),
      setup: () => [1, 2, 3],
      tests,
    },
    {
      name: 'Finds (Array of Strings)',
      expect: (result, assert) => assert(result === undefined),
      setup: () => ['a', 'b', 'c'],
      tests,
    },
    {
      name: 'Finds (List of Objects)',
      expect: (result, { deepEqual }) => deepEqual(result, { name: 'foo', age: 30, x: 'z' }),
      setup: () => [
        { name: 'foo', age: 10, x: 'y' },
        { name: 'foo', age: 30, x: 'y' },
        { name: 'foo', age: 50, x: 'y' },
        { name: 'foo', age: 30, x: 'z' },
        { name: 'foo2', age: 30, x: 'y' },
      ],
      tests: {
        foldr: input => foldr.findLast(input, x => x.name === 'foo' && x.age === 30),
        lodash: input => lodash.findLast(input, x => x.name === 'foo' && x.age === 30),
      },
    },
    {
      name: 'Finds (Shorthand Iteratee)',
      expect: (result, { deepEqual }) => deepEqual(result, { name: 'foo', age: 30, x: 'y' }),
      setup: () => [
        { name: 'foo', age: 10, x: 'y' },
        { name: 'foo', age: 30, x: 'y' },
        { name: 'foo', age: 50, x: 'y' },
      ],
      tests: {
        foldr: input => foldr.findLast(input, { name: 'foo', age: 30 }),
        lodash: input => lodash.findLast(input, { name: 'foo', age: 30 }),
      },
    },
    {
      name: 'Finds (Object)',
      expect: (result, { deepEqual }) => deepEqual(result, { name: 'foo', age: 30, x: 'y' }),
      setup: () => ({
        a: { name: 'foo', age: 10, x: 'y' },
        b: { name: 'foo', age: 30, x: 'y' },
        c: { name: 'foo', age: 50, x: 'y' },
      }),
      tests: {
        foldr: input => foldr.findLast(input, { name: 'foo', age: 30 }),
        lodash: input => lodash.findLast(input, { name: 'foo', age: 30 }),
      },
    },
  ];
};
