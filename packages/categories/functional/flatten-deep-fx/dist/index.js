"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.default=flattenDeep;exports.f=void 0;var _isArray=_interopRequireDefault(require("@foldr/is-array")),_internalFmake=_interopRequireDefault(require("@foldr/internal-fmake"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function flattenDeepBase(a,b,c,d){var e=a.length,f=d+1,g=0,h;while(g<e){h=a[g++];if(f<=b&&(0,_isArray.default)(h)){flattenDeepBase(h,b,c,f)}else{c[c.length]=h}}return c}function flattenDeep(a,b){if(!a||!a.length)return[];return flattenDeepBase(a,+b||1/0,[],0)}var f=(0,_internalFmake.default)(flattenDeep,{arity:2,signature:[1,0]});exports.f=f;
//# sourceMappingURL=index.js.map
