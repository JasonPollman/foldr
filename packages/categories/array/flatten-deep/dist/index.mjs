import isArray from"@foldr/is-array";function flattenDeepBase(a,b,c,d){var e=a.length,f=d+1,g=0,h;while(g<e){h=a[g++];if(f<=b&&isArray(h)){flattenDeepBase(h,b,c,f)}else{c[c.length]=h}}return c}export default function flattenDeep(a,b){if(!a||!a.length)return[];return flattenDeepBase(a,+b||1/0,[],0)}
//# sourceMappingURL=index.js.map
