"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.default=exports.ARITY=void 0;var _internalSymbol=_interopRequireDefault(require("@foldr/internal-symbol"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var ARITY=(0,_internalSymbol.default)("source-arity");exports.ARITY=ARITY;var TYPE_ERROR="Expected arguments of pipe to be of type function";function pipe(){var b=arguments,c=b.length;if(!c)throw new Error(TYPE_ERROR);while(--c){if("function"!=typeof arguments[c]){throw new TypeError(TYPE_ERROR)}}var d=b.length;function a(){var a=b[0].apply(this,arguments),c=0;while(++c<d){a=b[c].call(this,a)}return a}var e=b[0];a[ARITY]=e[ARITY]!==void 0?e[ARITY]:e.length;return a}var _default=pipe;exports.default=_default;
//# sourceMappingURL=index.js.map
