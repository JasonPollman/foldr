"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.default=values;var _map=_interopRequireDefault(require("@foldr/map")),_keys=_interopRequireDefault(require("@foldr/keys")),_isMap=_interopRequireDefault(require("@foldr/is-map")),_isSet=_interopRequireDefault(require("@foldr/is-set"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var getValue=function(a){return a};function values(a){if(!a)return[];if((0,_isMap.default)(a)||(0,_isSet.default)(a))return(0,_map.default)(a,getValue);var b=[],c=(0,_keys.default)(a),d=c.length,e=0;while(e<d){b[e]=a[c[e++]]}return b}
//# sourceMappingURL=index.js.map
