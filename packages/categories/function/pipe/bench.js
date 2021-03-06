function add(a, b) { return a + b; }

module.exports = ({ foldr, lodash, ramda }) => {
  const fPipe = foldr.pipe(add, add);
  const lFlow = lodash.flow([add, add]);
  const rPipe = ramda.pipe(add, add);

  const tests = {
    foldr: () => fPipe(1, 2),
    lodash: () => lFlow(1, 2),
    ramda: () => rPipe(1, 2),
  };

  return [
    {
      name: 'Composes 2 Functions',
      tests,
    },
  ];
};
