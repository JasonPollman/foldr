"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.default=exports.f=void 0;var _internalFmake=_interopRequireDefault(require("@foldr/internal-fmake")),_internalIterator=_interopRequireWildcard(require("@foldr/internal-iterator"));function _interopRequireWildcard(a){if(a&&a.__esModule){return a}else{var b={};if(null!=a){for(var c in a){if(Object.prototype.hasOwnProperty.call(a,c)){var d=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(a,c):{};if(d.get||d.set){Object.defineProperty(b,c,d)}else{b[c]=a[c]}}}}b.default=a;return b}}function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var every=(0,_internalIterator.default)({unwrap:function b(a){return a.x},Empty:function a(){return!0},Results:function a(){return{x:!0}},handler:function h(a,b,c,d,e,f,g){if(a&&a.capped?c(e):c(e,f,g)){return}b.x=!1;return _internalIterator.BREAK}}),f=(0,_internalFmake.default)(every,{arity:2,capped:!0,context:"config",signature:[1,0]});exports.f=f;var _default=every;exports.default=_default;
//# sourceMappingURL=index.js.map
