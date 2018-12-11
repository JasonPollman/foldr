module.exports = ({ foldr, lodash }) => {
  const tests = {
    foldr: input => foldr.toInteger(input),
    lodash: input => lodash.toInteger(input),
  };

  return [
    {
      name: 'Converts to a Number: (0.111, Number)',
      expect: (result, assert) => assert(result === 0),
      setup: () => 0.111,
      tests,
    },
    {
      name: 'Converts to a Number: (0.111, String)',
      expect: (result, assert) => assert(result === 0),
      setup: () => '0.111',
      tests,
    },
    {
      name: 'Converts to a Number: Already Integer',
      expect: (result, assert) => assert(result === 5),
      setup: () => 5,
      tests,
    },
    {
      name: 'Converts to a Number: Number',
      expect: (result, assert) => assert(result === 5),
      setup: () => 5.9,
      tests,
    },
    {
      name: 'Converts to a Number: String',
      expect: (result, assert) => assert(result === 5),
      setup: () => '5.9',
      tests,
    },
    {
      name: 'Converts to a Number: Object',
      expect: (result, assert) => assert(result === 5),
      setup: () => ({
        value: 5.12,
        valueOf() {
          return this.value;
        },
      }),
      tests,
    },
    {
      name: 'Converts to a Number: `null`',
      expect: (result, assert) => assert(result === 0),
      setup: () => null,
      tests,
    },
    {
      name: 'Converts to a Number: `undefined`',
      expect: (result, assert) => assert(Number.isNaN(result)),
      setup: () => undefined,
      tests,
    },
    {
      name: 'Converts to a Number: (Octal)',
      expect: (result, assert) => assert(result === 15),
      setup: () => 0o17,
      tests,
    },
    {
      name: 'Converts to a Number: (Octal, String)',
      expect: (result, assert) => assert(result === 15),
      setup: () => '0o17',
      tests,
    },
    {
      name: 'Converts to a Number: (Hex)',
      expect: (result, assert) => assert(result === 15),
      setup: () => 0xf,
      tests,
    },
    {
      name: 'Converts to a Number: (Hex, String)',
      expect: (result, assert) => assert(result === 15),
      setup: () => '0xf',
      tests,
    },
    {
      name: 'Converts to a Number: (Binary)',
      expect: (result, assert) => assert(result === 5),
      setup: () => 0b101,
      tests,
    },
    {
      name: 'Converts to a Number: (Binary, String)',
      expect: (result, assert) => assert(result === 5),
      setup: () => '0b101',
      tests,
    },
    {
      name: 'Converts to a Number: (Exponential)',
      expect: (result, assert) => assert(result === 110.1),
      setup: () => 1.101e2,
      tests,
    },
    {
      name: 'Converts to a Number: (Exponential, String)',
      expect: (result, assert) => assert(result === 110.1),
      setup: () => '1.101e2',
      tests,
    },
  ];
};
