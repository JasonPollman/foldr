import IteratorFactory from"@foldr/internal-iterator";import FunctionalFactory from"@foldr/internal-fmake";var foldRight=IteratorFactory({Empty:function b(a){return a},unwrap:function b(a){return a[0]},reverse:!0,Results:function b(a){return[a]},initial:!0,handler:function h(a,b,c,d,e,f,g){b[0]=a&&a.capped?c(b[0],e):c(b[0],e,f,g)}});export var f=FunctionalFactory(foldRight,{arity:3,capped:!0,context:"config",signature:[2,0,1]});export default foldRight;
//# sourceMappingURL=index.js.map
