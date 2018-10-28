/**
 * This is used as a babel plugin in `babel.config.js`.
 *
 * Converts `exports.default = fn` to `module.exports = fn`.
 * This will assign all named exports to the default function export
 * and provides support for both `const x = require('y')` and
 * `const x = require('y').default`. Using this we can reduce the
 * boilerplate `interopRequire` code generated by @babel/plugin-transform-modules-commonjs
 * by enabling the `noInterop` option.
 * @since 10/27/18
 * @file
 */

const defaultExportToModuleExportsString = `
if (exports && exports.default) {
  var keys = Object.keys(exports), i = keys.length;
  while (--i >= 0) exports.default[keys[i]] = exports[keys[i]];
  module.exports = exports.default;
}
`;

module.exports = ({ template }) => {
  const fixUglyDefault = template(defaultExportToModuleExportsString)();

  return {
    visitor: {
      Program: {
        exit(path) {
          path.pushContainer('body', fixUglyDefault);
        },
      },
    },
  };
};
