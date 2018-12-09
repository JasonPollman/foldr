"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.default=partial;exports.SOURCE=exports.ARITY=exports.IS_PARTIAL=exports._=void 0;var _internalSymbol=_interopRequireDefault(require("@foldr/internal-symbol"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var _=(0,_internalSymbol.default)("placeholder");exports._=_;var IS_PARTIAL=(0,_internalSymbol.default)("is-partial-fn");exports.IS_PARTIAL=IS_PARTIAL;var ARITY=(0,_internalSymbol.default)("source-arity");exports.ARITY=ARITY;var SOURCE=(0,_internalSymbol.default)("source-fn");exports.SOURCE=SOURCE;function toStringForPartialed(){return"/* Partial Wrapped */\r\n".concat(this[SOURCE].toString())}function partialize(a,b){var c=b.length;return function(){var d=arguments,e=[],f=d.length,g=0,h=0;while(g<c){e[g]=b[g]===_?d[h++]:b[g];g++}while(h<f){e[g++]=d[h++]}return a.apply(this,e)}}function partial(a){if("function"!=typeof a){throw new TypeError("The first argument given to `partial` must be a function.")}for(var b=arguments.length,c=Array(1<b?b-1:0),d=1;d<b;d++){c[d-1]=arguments[d]}if(!c.length)return a;var e=partialize(a,c),f=c.length,g=0<=a[ARITY]?a[ARITY]:a.length;while(0<=--f){if(c[f]!==_)g--}e[ARITY]=g;e[SOURCE]=a;e[IS_PARTIAL]=!0;e.toString=toStringForPartialed;return e}partial._=_;
//# sourceMappingURL=index.js.map
