import isArrayLike from"@foldr/is-array-like";export default function zip(){var a=arguments,b=a.length;if(!b)return[];var c=[],d=[],e=0,f=0,g=0,h;while(e<b){h=a[e++];if(isArrayLike(h)){d[g++]=h;h=h.length;if(f<h)f=h}}while(0<=--f){e=g;c[f]=[];while(0<=--e){c[f][e]=d[e][f]}}return c}
//# sourceMappingURL=index.js.map
