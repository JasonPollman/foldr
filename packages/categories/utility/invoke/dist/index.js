"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.default=invoke;var _toPath=_interopRequireDefault(require("@foldr/to-path"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function invoke(a,b,c){if(!a)return;var d=(0,_toPath.default)(b),e=d.length;if(!e)return;var f=0,g=a,h=a;while(f<e&&null!=g){h=g;g=g[d[f++]]}if("function"!=typeof g)return;return g.apply(h,c&&"object"==typeof c?c:void 0)}
//# sourceMappingURL=index.js.map
