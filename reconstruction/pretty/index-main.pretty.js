var Om=Object.defineProperty;
var Um=(e,t,n)=>t in e?Om(e,t,{
enumerable:!0,configurable:!0,writable:!0,value:n}
):e[t]=n;
var Je=(e,t,n)=>Um(e,typeof t!="symbol"?t+"":t,n);
function Bm(e,t){
for(var n=0;
n<t.length;
n++){
const r=t[n];
if(typeof r!="string"&&!Array.isArray(r)){
for(const o in r)if(o!=="default"&&!(o in e)){
const a=Object.getOwnPropertyDescriptor(r,o);
a&&Object.defineProperty(e,o,a.get?a:{
enumerable:!0,get:()=>r[o]}
)}
}
}
return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{
value:"Module"}
))}
(function(){
const t=document.createElement("link").relList;
if(t&&t.supports&&t.supports("modulepreload"))return;
for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);
new MutationObserver(o=>{
for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}
).observe(document,{
childList:!0,subtree:!0}
);
function n(o){
const a={
}
;
return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}
function r(o){
if(o.ep)return;
o.ep=!0;
const a=n(o);
fetch(o.href,a)}
}
)();
function Go(e){
return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}
var Mu={
exports:{
}
}
,Ho={
}
,Du={
exports:{
}
}
,D={
}
;
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Er=Symbol.for("react.element"),Fm=Symbol.for("react.portal"),Wm=Symbol.for("react.fragment"),$m=Symbol.for("react.strict_mode"),Gm=Symbol.for("react.profiler"),Hm=Symbol.for("react.provider"),Vm=Symbol.for("react.context"),Xm=Symbol.for("react.forward_ref"),Qm=Symbol.for("react.suspense"),Ym=Symbol.for("react.memo"),Km=Symbol.for("react.lazy"),Zi=Symbol.iterator;
function qm(e){
return e===null||typeof e!="object"?null:(e=Zi&&e[Zi]||e["@@iterator"],typeof e=="function"?e:null)}
var _u={
isMounted:function(){
return!1}
,enqueueForceUpdate:function(){
}
,enqueueReplaceState:function(){
}
,enqueueSetState:function(){
}
}
,Lu=Object.assign,zu={
}
;
function _n(e,t,n){
this.props=e,this.context=t,this.refs=zu,this.updater=n||_u}
_n.prototype.isReactComponent={
}
;
_n.prototype.setState=function(e,t){
if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
this.updater.enqueueSetState(this,e,t,"setState")}
;
_n.prototype.forceUpdate=function(e){
this.updater.enqueueForceUpdate(this,e,"forceUpdate")}
;
function Ou(){
}
Ou.prototype=_n.prototype;
function Yl(e,t,n){
this.props=e,this.context=t,this.refs=zu,this.updater=n||_u}
var Kl=Yl.prototype=new Ou;
Kl.constructor=Yl;
Lu(Kl,_n.prototype);
Kl.isPureReactComponent=!0;
var Ji=Array.isArray,Uu=Object.prototype.hasOwnProperty,ql={
current:null}
,Bu={
key:!0,ref:!0,__self:!0,__source:!0}
;
function Fu(e,t,n){
var r,o={
}
,a=null,i=null;
if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(a=""+t.key),t)Uu.call(t,r)&&!Bu.hasOwnProperty(r)&&(o[r]=t[r]);
var s=arguments.length-2;
if(s===1)o.children=n;
else if(1<s){
for(var u=Array(s),c=0;
c<s;
c++)u[c]=arguments[c+2];
o.children=u}
if(e&&e.defaultProps)for(r in s=e.defaultProps,s)o[r]===void 0&&(o[r]=s[r]);
return{
$$typeof:Er,type:e,key:a,ref:i,props:o,_owner:ql.current}
}
function Zm(e,t){
return{
$$typeof:Er,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}
}
function Zl(e){
return typeof e=="object"&&e!==null&&e.$$typeof===Er}
function Jm(e){
var t={
"=":"=0",":":"=2"}
;
return"$"+e.replace(/[=:]/g,function(n){
return t[n]}
)}
var es=/\/+/g;
function ma(e,t){
return typeof e=="object"&&e!==null&&e.key!=null?Jm(""+e.key):t.toString(36)}
function no(e,t,n,r,o){
var a=typeof e;
(a==="undefined"||a==="boolean")&&(e=null);
var i=!1;
if(e===null)i=!0;
else switch(a){
case"string":case"number":i=!0;
break;
case"object":switch(e.$$typeof){
case Er:case Fm:i=!0}
}
if(i)return i=e,o=o(i),e=r===""?"."+ma(i,0):r,Ji(o)?(n="",e!=null&&(n=e.replace(es,"$&/")+"/"),no(o,t,n,"",function(c){
return c}
)):o!=null&&(Zl(o)&&(o=Zm(o,n+(!o.key||i&&i.key===o.key?"":(""+o.key).replace(es,"$&/")+"/")+e)),t.push(o)),1;
if(i=0,r=r===""?".":r+":",Ji(e))for(var s=0;
s<e.length;
s++){
a=e[s];
var u=r+ma(a,s);
i+=no(a,t,n,u,o)}
else if(u=qm(e),typeof u=="function")for(e=u.call(e),s=0;
!(a=e.next()).done;
)a=a.value,u=r+ma(a,s++),i+=no(a,t,n,u,o);
else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {
"+Object.keys(e).join(", ")+"}
":t)+"). If you meant to render a collection of children, use an array instead.");
return i}
function zr(e,t,n){
if(e==null)return e;
var r=[],o=0;
return no(e,r,"","",function(a){
return t.call(n,a,o++)}
),r}
function ef(e){
if(e._status===-1){
var t=e._result;
t=t(),t.then(function(n){
(e._status===0||e._status===-1)&&(e._status=1,e._result=n)}
,function(n){
(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}
),e._status===-1&&(e._status=0,e._result=t)}
if(e._status===1)return e._result.default;
throw e._result}
var xe={
current:null}
,ro={
transition:null}
,tf={
ReactCurrentDispatcher:xe,ReactCurrentBatchConfig:ro,ReactCurrentOwner:ql}
;
function Wu(){
throw Error("act(...) is not supported in production builds of React.")}
D.Children={
map:zr,forEach:function(e,t,n){
zr(e,function(){
t.apply(this,arguments)}
,n)}
,count:function(e){
var t=0;
return zr(e,function(){
t++}
),t}
,toArray:function(e){
return zr(e,function(t){
return t}
)||[]}
,only:function(e){
if(!Zl(e))throw Error("React.Children.only expected to receive a single React element child.");
return e}
}
;
D.Component=_n;
D.Fragment=Wm;
D.Profiler=Gm;
D.PureComponent=Yl;
D.StrictMode=$m;
D.Suspense=Qm;
D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=tf;
D.act=Wu;
D.cloneElement=function(e,t,n){
if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");
var r=Lu({
}
,e.props),o=e.key,a=e.ref,i=e._owner;
if(t!=null){
if(t.ref!==void 0&&(a=t.ref,i=ql.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;
for(u in t)Uu.call(t,u)&&!Bu.hasOwnProperty(u)&&(r[u]=t[u]===void 0&&s!==void 0?s[u]:t[u])}
var u=arguments.length-2;
if(u===1)r.children=n;
else if(1<u){
s=Array(u);
for(var c=0;
c<u;
c++)s[c]=arguments[c+2];
r.children=s}
return{
$$typeof:Er,type:e.type,key:o,ref:a,props:r,_owner:i}
}
;
D.createContext=function(e){
return e={
$$typeof:Vm,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}
,e.Provider={
$$typeof:Hm,_context:e}
,e.Consumer=e}
;
D.createElement=Fu;
D.createFactory=function(e){
var t=Fu.bind(null,e);
return t.type=e,t}
;
D.createRef=function(){
return{
current:null}
}
;
D.forwardRef=function(e){
return{
$$typeof:Xm,render:e}
}
;
D.isValidElement=Zl;
D.lazy=function(e){
return{
$$typeof:Km,_payload:{
_status:-1,_result:e}
,_init:ef}
}
;
D.memo=function(e,t){
return{
$$typeof:Ym,type:e,compare:t===void 0?null:t}
}
;
D.startTransition=function(e){
var t=ro.transition;
ro.transition={
}
;
try{
e()}
finally{
ro.transition=t}
}
;
D.unstable_act=Wu;
D.useCallback=function(e,t){
return xe.current.useCallback(e,t)}
;
D.useContext=function(e){
return xe.current.useContext(e)}
;
D.useDebugValue=function(){
}
;
D.useDeferredValue=function(e){
return xe.current.useDeferredValue(e)}
;
D.useEffect=function(e,t){
return xe.current.useEffect(e,t)}
;
D.useId=function(){
return xe.current.useId()}
;
D.useImperativeHandle=function(e,t,n){
return xe.current.useImperativeHandle(e,t,n)}
;
D.useInsertionEffect=function(e,t){
return xe.current.useInsertionEffect(e,t)}
;
D.useLayoutEffect=function(e,t){
return xe.current.useLayoutEffect(e,t)}
;
D.useMemo=function(e,t){
return xe.current.useMemo(e,t)}
;
D.useReducer=function(e,t,n){
return xe.current.useReducer(e,t,n)}
;
D.useRef=function(e){
return xe.current.useRef(e)}
;
D.useState=function(e){
return xe.current.useState(e)}
;
D.useSyncExternalStore=function(e,t,n){
return xe.current.useSyncExternalStore(e,t,n)}
;
D.useTransition=function(){
return xe.current.useTransition()}
;
D.version="18.3.1";
Du.exports=D;
var v=Du.exports;
const I=Go(v),nf=Bm({
__proto__:null,default:I}
,[v]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rf=v,of=Symbol.for("react.element"),af=Symbol.for("react.fragment"),lf=Object.prototype.hasOwnProperty,sf=rf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,uf={
key:!0,ref:!0,__self:!0,__source:!0}
;
function $u(e,t,n){
var r,o={
}
,a=null,i=null;
n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(i=t.ref);
for(r in t)lf.call(t,r)&&!uf.hasOwnProperty(r)&&(o[r]=t[r]);
if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);
return{
$$typeof:of,type:e,key:a,ref:i,props:o,_owner:sf.current}
}
Ho.Fragment=af;
Ho.jsx=$u;
Ho.jsxs=$u;
Mu.exports=Ho;
var l=Mu.exports,Gu={
exports:{
}
}
,Te={
}
,Hu={
exports:{
}
}
,Vu={
}
;
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){
function t(N,R){
var A=N.length;
N.push(R);
e:for(;
0<A;
){
var G=A-1>>>1,Z=N[G];
if(0<o(Z,R))N[G]=R,N[A]=Z,A=G;
else break e}
}
function n(N){
return N.length===0?null:N[0]}
function r(N){
if(N.length===0)return null;
var R=N[0],A=N.pop();
if(A!==R){
N[0]=A;
e:for(var G=0,Z=N.length,nn=Z>>>1;
G<nn;
){
var _t=2*(G+1)-1,da=N[_t],Lt=_t+1,Lr=N[Lt];
if(0>o(da,A))Lt<Z&&0>o(Lr,da)?(N[G]=Lr,N[Lt]=A,G=Lt):(N[G]=da,N[_t]=A,G=_t);
else if(Lt<Z&&0>o(Lr,A))N[G]=Lr,N[Lt]=A,G=Lt;
else break e}
}
return R}
function o(N,R){
var A=N.sortIndex-R.sortIndex;
return A!==0?A:N.id-R.id}
if(typeof performance=="object"&&typeof performance.now=="function"){
var a=performance;
e.unstable_now=function(){
return a.now()}
}
else{
var i=Date,s=i.now();
e.unstable_now=function(){
return i.now()-s}
}
var u=[],c=[],d=1,m=null,h=3,x=!1,w=!1,k=!1,b=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;
typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);
function g(N){
for(var R=n(c);
R!==null;
){
if(R.callback===null)r(c);
else if(R.startTime<=N)r(c),R.sortIndex=R.expirationTime,t(u,R);
else break;
R=n(c)}
}
function y(N){
if(k=!1,g(N),!w)if(n(u)!==null)w=!0,Bn(j);
else{
var R=n(c);
R!==null&&tn(y,R.startTime-N)}
}
function j(N,R){
w=!1,k&&(k=!1,p(E),E=-1),x=!0;
var A=h;
try{
for(g(R),m=n(u);
m!==null&&(!(m.expirationTime>R)||N&&!pe());
){
var G=m.callback;
if(typeof G=="function"){
m.callback=null,h=m.priorityLevel;
var Z=G(m.expirationTime<=R);
R=e.unstable_now(),typeof Z=="function"?m.callback=Z:m===n(u)&&r(u),g(R)}
else r(u);
m=n(u)}
if(m!==null)var nn=!0;
else{
var _t=n(c);
_t!==null&&tn(y,_t.startTime-R),nn=!1}
return nn}
finally{
m=null,h=A,x=!1}
}
var S=!1,T=null,E=-1,B=5,M=-1;
function pe(){
return!(e.unstable_now()-M<B)}
function qe(){
if(T!==null){
var N=e.unstable_now();
M=N;
var R=!0;
try{
R=T(!0,N)}
finally{
R?Ze():(S=!1,T=null)}
}
else S=!1}
var Ze;
if(typeof f=="function")Ze=function(){
f(qe)}
;
else if(typeof MessageChannel<"u"){
var _r=new MessageChannel,ca=_r.port2;
_r.port1.onmessage=qe,Ze=function(){
ca.postMessage(null)}
}
else Ze=function(){
b(qe,0)}
;
function Bn(N){
T=N,S||(S=!0,Ze())}
function tn(N,R){
E=b(function(){
N(e.unstable_now())}
,R)}
e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(N){
N.callback=null}
,e.unstable_continueExecution=function(){
w||x||(w=!0,Bn(j))}
,e.unstable_forceFrameRate=function(N){
0>N||125<N?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<N?Math.floor(1e3/N):5}
,e.unstable_getCurrentPriorityLevel=function(){
return h}
,e.unstable_getFirstCallbackNode=function(){
return n(u)}
,e.unstable_next=function(N){
switch(h){
case 1:case 2:case 3:var R=3;
break;
default:R=h}
var A=h;
h=R;
try{
return N()}
finally{
h=A}
}
,e.unstable_pauseExecution=function(){
}
,e.unstable_requestPaint=function(){
}
,e.unstable_runWithPriority=function(N,R){
switch(N){
case 1:case 2:case 3:case 4:case 5:break;
default:N=3}
var A=h;
h=N;
try{
return R()}
finally{
h=A}
}
,e.unstable_scheduleCallback=function(N,R,A){
var G=e.unstable_now();
switch(typeof A=="object"&&A!==null?(A=A.delay,A=typeof A=="number"&&0<A?G+A:G):A=G,N){
case 1:var Z=-1;
break;
case 2:Z=250;
break;
case 5:Z=1073741823;
break;
case 4:Z=1e4;
break;
default:Z=5e3}
return Z=A+Z,N={
id:d++,callback:R,priorityLevel:N,startTime:A,expirationTime:Z,sortIndex:-1}
,A>G?(N.sortIndex=A,t(c,N),n(u)===null&&N===n(c)&&(k?(p(E),E=-1):k=!0,tn(y,A-G))):(N.sortIndex=Z,t(u,N),w||x||(w=!0,Bn(j))),N}
,e.unstable_shouldYield=pe,e.unstable_wrapCallback=function(N){
var R=h;
return function(){
var A=h;
h=R;
try{
return N.apply(this,arguments)}
finally{
h=A}
}
}
}
)(Vu);
Hu.exports=Vu;
var cf=Hu.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var df=v,Pe=cf;
function C(e){
for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;
n<arguments.length;
n++)t+="&args[]="+encodeURIComponent(arguments[n]);
return"Minified React error #"+e+";
 visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
var Xu=new Set,cr={
}
;
function Jt(e,t){
Pn(e,t),Pn(e+"Capture",t)}
function Pn(e,t){
for(cr[e]=t,e=0;
e<t.length;
e++)Xu.add(t[e])}
var at=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Va=Object.prototype.hasOwnProperty,mf=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ts={
}
,ns={
}
;
function ff(e){
return Va.call(ns,e)?!0:Va.call(ts,e)?!1:mf.test(e)?ns[e]=!0:(ts[e]=!0,!1)}
function pf(e,t,n,r){
if(n!==null&&n.type===0)return!1;
switch(typeof t){
case"function":case"symbol":return!0;
case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");
default:return!1}
}
function hf(e,t,n,r){
if(t===null||typeof t>"u"||pf(e,t,n,r))return!0;
if(r)return!1;
if(n!==null)switch(n.type){
case 3:return!t;
case 4:return t===!1;
case 5:return isNaN(t);
case 6:return isNaN(t)||1>t}
return!1}
function ye(e,t,n,r,o,a,i){
this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=i}
var se={
}
;
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){
se[e]=new ye(e,0,!1,e,null,!1,!1)}
);
[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){
var t=e[0];
se[t]=new ye(t,1,!1,e[1],null,!1,!1)}
);
["contentEditable","draggable","spellCheck","value"].forEach(function(e){
se[e]=new ye(e,2,!1,e.toLowerCase(),null,!1,!1)}
);
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){
se[e]=new ye(e,2,!1,e,null,!1,!1)}
);
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){
se[e]=new ye(e,3,!1,e.toLowerCase(),null,!1,!1)}
);
["checked","multiple","muted","selected"].forEach(function(e){
se[e]=new ye(e,3,!0,e,null,!1,!1)}
);
["capture","download"].forEach(function(e){
se[e]=new ye(e,4,!1,e,null,!1,!1)}
);
["cols","rows","size","span"].forEach(function(e){
se[e]=new ye(e,6,!1,e,null,!1,!1)}
);
["rowSpan","start"].forEach(function(e){
se[e]=new ye(e,5,!1,e.toLowerCase(),null,!1,!1)}
);
var Jl=/[\-:]([a-z])/g;
function ei(e){
return e[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){
var t=e.replace(Jl,ei);
se[t]=new ye(t,1,!1,e,null,!1,!1)}
);
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){
var t=e.replace(Jl,ei);
se[t]=new ye(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}
);
["xml:base","xml:lang","xml:space"].forEach(function(e){
var t=e.replace(Jl,ei);
se[t]=new ye(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}
);
["tabIndex","crossOrigin"].forEach(function(e){
se[e]=new ye(e,1,!1,e.toLowerCase(),null,!1,!1)}
);
se.xlinkHref=new ye("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);
["src","href","action","formAction"].forEach(function(e){
se[e]=new ye(e,1,!1,e.toLowerCase(),null,!0,!0)}
);
function ti(e,t,n,r){
var o=se.hasOwnProperty(t)?se[t]:null;
(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(hf(t,n,o,r)&&(n=null),r||o===null?ff(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}
var ut=df.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Or=Symbol.for("react.element"),ln=Symbol.for("react.portal"),sn=Symbol.for("react.fragment"),ni=Symbol.for("react.strict_mode"),Xa=Symbol.for("react.profiler"),Qu=Symbol.for("react.provider"),Yu=Symbol.for("react.context"),ri=Symbol.for("react.forward_ref"),Qa=Symbol.for("react.suspense"),Ya=Symbol.for("react.suspense_list"),oi=Symbol.for("react.memo"),mt=Symbol.for("react.lazy"),Ku=Symbol.for("react.offscreen"),rs=Symbol.iterator;
function Fn(e){
return e===null||typeof e!="object"?null:(e=rs&&e[rs]||e["@@iterator"],typeof e=="function"?e:null)}
var X=Object.assign,fa;
function qn(e){
if(fa===void 0)try{
throw Error()}
catch(n){
var t=n.stack.trim().match(/\n( *(at )?)/);
fa=t&&t[1]||""}
return`
`+fa+e}
var pa=!1;
function ha(e,t){
if(!e||pa)return"";
pa=!0;
var n=Error.prepareStackTrace;
Error.prepareStackTrace=void 0;
try{
if(t)if(t=function(){
throw Error()}
,Object.defineProperty(t.prototype,"props",{
set:function(){
throw Error()}
}
),typeof Reflect=="object"&&Reflect.construct){
try{
Reflect.construct(t,[])}
catch(c){
var r=c}
Reflect.construct(e,[],t)}
else{
try{
t.call()}
catch(c){
r=c}
e.call(t.prototype)}
else{
try{
throw Error()}
catch(c){
r=c}
e()}
}
catch(c){
if(c&&r&&typeof c.stack=="string"){
for(var o=c.stack.split(`
`),a=r.stack.split(`
`),i=o.length-1,s=a.length-1;
1<=i&&0<=s&&o[i]!==a[s];
)s--;
for(;
1<=i&&0<=s;
i--,s--)if(o[i]!==a[s]){
if(i!==1||s!==1)do if(i--,s--,0>s||o[i]!==a[s]){
var u=`
`+o[i].replace(" at new "," at ");
return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}
while(1<=i&&0<=s);
break}
}
}
finally{
pa=!1,Error.prepareStackTrace=n}
return(e=e?e.displayName||e.name:"")?qn(e):""}
function gf(e){
switch(e.tag){
case 5:return qn(e.type);
case 16:return qn("Lazy");
case 13:return qn("Suspense");
case 19:return qn("SuspenseList");
case 0:case 2:case 15:return e=ha(e.type,!1),e;
case 11:return e=ha(e.type.render,!1),e;
case 1:return e=ha(e.type,!0),e;
default:return""}
}
function Ka(e){
if(e==null)return null;
if(typeof e=="function")return e.displayName||e.name||null;
if(typeof e=="string")return e;
switch(e){
case sn:return"Fragment";
case ln:return"Portal";
case Xa:return"Profiler";
case ni:return"StrictMode";
case Qa:return"Suspense";
case Ya:return"SuspenseList"}
if(typeof e=="object")switch(e.$$typeof){
case Yu:return(e.displayName||"Context")+".Consumer";
case Qu:return(e._context.displayName||"Context")+".Provider";
case ri:var t=e.render;
return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;
case oi:return t=e.displayName||null,t!==null?t:Ka(e.type)||"Memo";
case mt:t=e._payload,e=e._init;
try{
return Ka(e(t))}
catch{
}
}
return null}
function xf(e){
var t=e.type;
switch(e.tag){
case 24:return"Cache";
case 9:return(t.displayName||"Context")+".Consumer";
case 10:return(t._context.displayName||"Context")+".Provider";
case 18:return"DehydratedFragment";
case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");
case 7:return"Fragment";
case 5:return t;
case 4:return"Portal";
case 3:return"Root";
case 6:return"Text";
case 16:return Ka(t);
case 8:return t===ni?"StrictMode":"Mode";
case 22:return"Offscreen";
case 12:return"Profiler";
case 21:return"Scope";
case 13:return"Suspense";
case 19:return"SuspenseList";
case 25:return"TracingMarker";
case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;
if(typeof t=="string")return t}
return null}
function Tt(e){
switch(typeof e){
case"boolean":case"number":case"string":case"undefined":return e;
case"object":return e;
default:return""}
}
function qu(e){
var t=e.type;
return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}
function yf(e){
var t=qu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];
if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){
var o=n.get,a=n.set;
return Object.defineProperty(e,t,{
configurable:!0,get:function(){
return o.call(this)}
,set:function(i){
r=""+i,a.call(this,i)}
}
),Object.defineProperty(e,t,{
enumerable:n.enumerable}
),{
getValue:function(){
return r}
,setValue:function(i){
r=""+i}
,stopTracking:function(){
e._valueTracker=null,delete e[t]}
}
}
}
function Ur(e){
e._valueTracker||(e._valueTracker=yf(e))}
function Zu(e){
if(!e)return!1;
var t=e._valueTracker;
if(!t)return!0;
var n=t.getValue(),r="";
return e&&(r=qu(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}
function xo(e){
if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;
try{
return e.activeElement||e.body}
catch{
return e.body}
}
function qa(e,t){
var n=t.checked;
return X({
}
,t,{
defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked}
)}
function os(e,t){
var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;
n=Tt(t.value!=null?t.value:n),e._wrapperState={
initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}
}
function Ju(e,t){
t=t.checked,t!=null&&ti(e,"checked",t,!1)}
function Za(e,t){
Ju(e,t);
var n=Tt(t.value),r=t.type;
if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);
else if(r==="submit"||r==="reset"){
e.removeAttribute("value");
return}
t.hasOwnProperty("value")?Ja(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ja(e,t.type,Tt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}
function as(e,t,n){
if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){
var r=t.type;
if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;
t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}
n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}
function Ja(e,t,n){
(t!=="number"||xo(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}
var Zn=Array.isArray;
function vn(e,t,n,r){
if(e=e.options,t){
t={
}
;
for(var o=0;
o<n.length;
o++)t["$"+n[o]]=!0;
for(n=0;
n<e.length;
n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}
else{
for(n=""+Tt(n),t=null,o=0;
o<e.length;
o++){
if(e[o].value===n){
e[o].selected=!0,r&&(e[o].defaultSelected=!0);
return}
t!==null||e[o].disabled||(t=e[o])}
t!==null&&(t.selected=!0)}
}
function el(e,t){
if(t.dangerouslySetInnerHTML!=null)throw Error(C(91));
return X({
}
,t,{
value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue}
)}
function ls(e,t){
var n=t.value;
if(n==null){
if(n=t.children,t=t.defaultValue,n!=null){
if(t!=null)throw Error(C(92));
if(Zn(n)){
if(1<n.length)throw Error(C(93));
n=n[0]}
t=n}
t==null&&(t=""),n=t}
e._wrapperState={
initialValue:Tt(n)}
}
function ec(e,t){
var n=Tt(t.value),r=Tt(t.defaultValue);
n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}
function is(e){
var t=e.textContent;
t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}
function tc(e){
switch(e){
case"svg":return"http://www.w3.org/2000/svg";
case"math":return"http://www.w3.org/1998/Math/MathML";
default:return"http://www.w3.org/1999/xhtml"}
}
function tl(e,t){
return e==null||e==="http://www.w3.org/1999/xhtml"?tc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}
var Br,nc=function(e){
return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){
MSApp.execUnsafeLocalFunction(function(){
return e(t,n,r,o)}
)}
:e}
(function(e,t){
if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;
else{
for(Br=Br||document.createElement("div"),Br.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Br.firstChild;
e.firstChild;
)e.removeChild(e.firstChild);
for(;
t.firstChild;
)e.appendChild(t.firstChild)}
}
);
function dr(e,t){
if(t){
var n=e.firstChild;
if(n&&n===e.lastChild&&n.nodeType===3){
n.nodeValue=t;
return}
}
e.textContent=t}
var tr={
animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0}
,vf=["Webkit","ms","Moz","O"];
Object.keys(tr).forEach(function(e){
vf.forEach(function(t){
t=t+e.charAt(0).toUpperCase()+e.substring(1),tr[t]=tr[e]}
)}
);
function rc(e,t,n){
return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||tr.hasOwnProperty(e)&&tr[e]?(""+t).trim():t+"px"}
function oc(e,t){
e=e.style;
for(var n in t)if(t.hasOwnProperty(n)){
var r=n.indexOf("--")===0,o=rc(n,t[n],r);
n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}
}
var wf=X({
menuitem:!0}
,{
area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}
);
function nl(e,t){
if(t){
if(wf[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(C(137,e));
if(t.dangerouslySetInnerHTML!=null){
if(t.children!=null)throw Error(C(60));
if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(C(61))}
if(t.style!=null&&typeof t.style!="object")throw Error(C(62))}
}
function rl(e,t){
if(e.indexOf("-")===-1)return typeof t.is=="string";
switch(e){
case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;
default:return!0}
}
var ol=null;
function ai(e){
return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}
var al=null,wn=null,kn=null;
function ss(e){
if(e=Ar(e)){
if(typeof al!="function")throw Error(C(280));
var t=e.stateNode;
t&&(t=Ko(t),al(e.stateNode,e.type,t))}
}
function ac(e){
wn?kn?kn.push(e):kn=[e]:wn=e}
function lc(){
if(wn){
var e=wn,t=kn;
if(kn=wn=null,ss(e),t)for(e=0;
e<t.length;
e++)ss(t[e])}
}
function ic(e,t){
return e(t)}
function sc(){
}
var ga=!1;
function uc(e,t,n){
if(ga)return e(t,n);
ga=!0;
try{
return ic(e,t,n)}
finally{
ga=!1,(wn!==null||kn!==null)&&(sc(),lc())}
}
function mr(e,t){
var n=e.stateNode;
if(n===null)return null;
var r=Ko(n);
if(r===null)return null;
n=r[t];
e:switch(t){
case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;
break e;
default:e=!1}
if(e)return null;
if(n&&typeof n!="function")throw Error(C(231,t,typeof n));
return n}
var ll=!1;
if(at)try{
var Wn={
}
;
Object.defineProperty(Wn,"passive",{
get:function(){
ll=!0}
}
),window.addEventListener("test",Wn,Wn),window.removeEventListener("test",Wn,Wn)}
catch{
ll=!1}
function kf(e,t,n,r,o,a,i,s,u){
var c=Array.prototype.slice.call(arguments,3);
try{
t.apply(n,c)}
catch(d){
this.onError(d)}
}
var nr=!1,yo=null,vo=!1,il=null,Cf={
onError:function(e){
nr=!0,yo=e}
}
;
function jf(e,t,n,r,o,a,i,s,u){
nr=!1,yo=null,kf.apply(Cf,arguments)}
function bf(e,t,n,r,o,a,i,s,u){
if(jf.apply(this,arguments),nr){
if(nr){
var c=yo;
nr=!1,yo=null}
else throw Error(C(198));
vo||(vo=!0,il=c)}
}
function en(e){
var t=e,n=e;
if(e.alternate)for(;
t.return;
)t=t.return;
else{
e=t;
do t=e,t.flags&4098&&(n=t.return),e=t.return;
while(e)}
return t.tag===3?n:null}
function cc(e){
if(e.tag===13){
var t=e.memoizedState;
if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}
return null}
function us(e){
if(en(e)!==e)throw Error(C(188))}
function Sf(e){
var t=e.alternate;
if(!t){
if(t=en(e),t===null)throw Error(C(188));
return t!==e?null:e}
for(var n=e,r=t;
;
){
var o=n.return;
if(o===null)break;
var a=o.alternate;
if(a===null){
if(r=o.return,r!==null){
n=r;
continue}
break}
if(o.child===a.child){
for(a=o.child;
a;
){
if(a===n)return us(o),e;
if(a===r)return us(o),t;
a=a.sibling}
throw Error(C(188))}
if(n.return!==r.return)n=o,r=a;
else{
for(var i=!1,s=o.child;
s;
){
if(s===n){
i=!0,n=o,r=a;
break}
if(s===r){
i=!0,r=o,n=a;
break}
s=s.sibling}
if(!i){
for(s=a.child;
s;
){
if(s===n){
i=!0,n=a,r=o;
break}
if(s===r){
i=!0,r=a,n=o;
break}
s=s.sibling}
if(!i)throw Error(C(189))}
}
if(n.alternate!==r)throw Error(C(190))}
if(n.tag!==3)throw Error(C(188));
return n.stateNode.current===n?e:t}
function dc(e){
return e=Sf(e),e!==null?mc(e):null}
function mc(e){
if(e.tag===5||e.tag===6)return e;
for(e=e.child;
e!==null;
){
var t=mc(e);
if(t!==null)return t;
e=e.sibling}
return null}
var fc=Pe.unstable_scheduleCallback,cs=Pe.unstable_cancelCallback,Nf=Pe.unstable_shouldYield,Pf=Pe.unstable_requestPaint,K=Pe.unstable_now,Tf=Pe.unstable_getCurrentPriorityLevel,li=Pe.unstable_ImmediatePriority,pc=Pe.unstable_UserBlockingPriority,wo=Pe.unstable_NormalPriority,Ef=Pe.unstable_LowPriority,hc=Pe.unstable_IdlePriority,Vo=null,Ye=null;
function If(e){
if(Ye&&typeof Ye.onCommitFiberRoot=="function")try{
Ye.onCommitFiberRoot(Vo,e,void 0,(e.current.flags&128)===128)}
catch{
}
}
var We=Math.clz32?Math.clz32:Mf,Rf=Math.log,Af=Math.LN2;
function Mf(e){
return e>>>=0,e===0?32:31-(Rf(e)/Af|0)|0}
var Fr=64,Wr=4194304;
function Jn(e){
switch(e&-e){
case 1:return 1;
case 2:return 2;
case 4:return 4;
case 8:return 8;
case 16:return 16;
case 32:return 32;
case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;
case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;
case 134217728:return 134217728;
case 268435456:return 268435456;
case 536870912:return 536870912;
case 1073741824:return 1073741824;
default:return e}
}
function ko(e,t){
var n=e.pendingLanes;
if(n===0)return 0;
var r=0,o=e.suspendedLanes,a=e.pingedLanes,i=n&268435455;
if(i!==0){
var s=i&~o;
s!==0?r=Jn(s):(a&=i,a!==0&&(r=Jn(a)))}
else i=n&~o,i!==0?r=Jn(i):a!==0&&(r=Jn(a));
if(r===0)return 0;
if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,a=t&-t,o>=a||o===16&&(a&4194240)!==0))return t;
if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;
0<t;
)n=31-We(t),o=1<<n,r|=e[n],t&=~o;
return r}
function Df(e,t){
switch(e){
case 1:case 2:case 4:return t+250;
case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;
case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;
case 134217728:case 268435456:case 536870912:case 1073741824:return-1;
default:return-1}
}
function _f(e,t){
for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,a=e.pendingLanes;
0<a;
){
var i=31-We(a),s=1<<i,u=o[i];
u===-1?(!(s&n)||s&r)&&(o[i]=Df(s,t)):u<=t&&(e.expiredLanes|=s),a&=~s}
}
function sl(e){
return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}
function gc(){
var e=Fr;
return Fr<<=1,!(Fr&4194240)&&(Fr=64),e}
function xa(e){
for(var t=[],n=0;
31>n;
n++)t.push(e);
return t}
function Ir(e,t,n){
e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-We(t),e[t]=n}
function Lf(e,t){
var n=e.pendingLanes&~t;
e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;
var r=e.eventTimes;
for(e=e.expirationTimes;
0<n;
){
var o=31-We(n),a=1<<o;
t[o]=0,r[o]=-1,e[o]=-1,n&=~a}
}
function ii(e,t){
var n=e.entangledLanes|=t;
for(e=e.entanglements;
n;
){
var r=31-We(n),o=1<<r;
o&t|e[r]&t&&(e[r]|=t),n&=~o}
}
var z=0;
function xc(e){
return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}
var yc,si,vc,wc,kc,ul=!1,$r=[],vt=null,wt=null,kt=null,fr=new Map,pr=new Map,pt=[],zf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function ds(e,t){
switch(e){
case"focusin":case"focusout":vt=null;
break;
case"dragenter":case"dragleave":wt=null;
break;
case"mouseover":case"mouseout":kt=null;
break;
case"pointerover":case"pointerout":fr.delete(t.pointerId);
break;
case"gotpointercapture":case"lostpointercapture":pr.delete(t.pointerId)}
}
function $n(e,t,n,r,o,a){
return e===null||e.nativeEvent!==a?(e={
blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[o]}
,t!==null&&(t=Ar(t),t!==null&&si(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}
function Of(e,t,n,r,o){
switch(t){
case"focusin":return vt=$n(vt,e,t,n,r,o),!0;
case"dragenter":return wt=$n(wt,e,t,n,r,o),!0;
case"mouseover":return kt=$n(kt,e,t,n,r,o),!0;
case"pointerover":var a=o.pointerId;
return fr.set(a,$n(fr.get(a)||null,e,t,n,r,o)),!0;
case"gotpointercapture":return a=o.pointerId,pr.set(a,$n(pr.get(a)||null,e,t,n,r,o)),!0}
return!1}
function Cc(e){
var t=Bt(e.target);
if(t!==null){
var n=en(t);
if(n!==null){
if(t=n.tag,t===13){
if(t=cc(n),t!==null){
e.blockedOn=t,kc(e.priority,function(){
vc(n)}
);
return}
}
else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){
e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;
return}
}
}
e.blockedOn=null}
function oo(e){
if(e.blockedOn!==null)return!1;
for(var t=e.targetContainers;
0<t.length;
){
var n=cl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);
if(n===null){
n=e.nativeEvent;
var r=new n.constructor(n.type,n);
ol=r,n.target.dispatchEvent(r),ol=null}
else return t=Ar(n),t!==null&&si(t),e.blockedOn=n,!1;
t.shift()}
return!0}
function ms(e,t,n){
oo(e)&&n.delete(t)}
function Uf(){
ul=!1,vt!==null&&oo(vt)&&(vt=null),wt!==null&&oo(wt)&&(wt=null),kt!==null&&oo(kt)&&(kt=null),fr.forEach(ms),pr.forEach(ms)}
function Gn(e,t){
e.blockedOn===t&&(e.blockedOn=null,ul||(ul=!0,Pe.unstable_scheduleCallback(Pe.unstable_NormalPriority,Uf)))}
function hr(e){
function t(o){
return Gn(o,e)}
if(0<$r.length){
Gn($r[0],e);
for(var n=1;
n<$r.length;
n++){
var r=$r[n];
r.blockedOn===e&&(r.blockedOn=null)}
}
for(vt!==null&&Gn(vt,e),wt!==null&&Gn(wt,e),kt!==null&&Gn(kt,e),fr.forEach(t),pr.forEach(t),n=0;
n<pt.length;
n++)r=pt[n],r.blockedOn===e&&(r.blockedOn=null);
for(;
0<pt.length&&(n=pt[0],n.blockedOn===null);
)Cc(n),n.blockedOn===null&&pt.shift()}
var Cn=ut.ReactCurrentBatchConfig,Co=!0;
function Bf(e,t,n,r){
var o=z,a=Cn.transition;
Cn.transition=null;
try{
z=1,ui(e,t,n,r)}
finally{
z=o,Cn.transition=a}
}
function Ff(e,t,n,r){
var o=z,a=Cn.transition;
Cn.transition=null;
try{
z=4,ui(e,t,n,r)}
finally{
z=o,Cn.transition=a}
}
function ui(e,t,n,r){
if(Co){
var o=cl(e,t,n,r);
if(o===null)Pa(e,t,r,jo,n),ds(e,r);
else if(Of(o,e,t,n,r))r.stopPropagation();
else if(ds(e,r),t&4&&-1<zf.indexOf(e)){
for(;
o!==null;
){
var a=Ar(o);
if(a!==null&&yc(a),a=cl(e,t,n,r),a===null&&Pa(e,t,r,jo,n),a===o)break;
o=a}
o!==null&&r.stopPropagation()}
else Pa(e,t,r,null,n)}
}
var jo=null;
function cl(e,t,n,r){
if(jo=null,e=ai(r),e=Bt(e),e!==null)if(t=en(e),t===null)e=null;
else if(n=t.tag,n===13){
if(e=cc(t),e!==null)return e;
e=null}
else if(n===3){
if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;
e=null}
else t!==e&&(e=null);
return jo=e,null}
function jc(e){
switch(e){
case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;
case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;
case"message":switch(Tf()){
case li:return 1;
case pc:return 4;
case wo:case Ef:return 16;
case hc:return 536870912;
default:return 16}
default:return 16}
}
var gt=null,ci=null,ao=null;
function bc(){
if(ao)return ao;
var e,t=ci,n=t.length,r,o="value"in gt?gt.value:gt.textContent,a=o.length;
for(e=0;
e<n&&t[e]===o[e];
e++);
var i=n-e;
for(r=1;
r<=i&&t[n-r]===o[a-r];
r++);
return ao=o.slice(e,1<r?1-r:void 0)}
function lo(e){
var t=e.keyCode;
return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}
function Gr(){
return!0}
function fs(){
return!1}
function Ee(e){
function t(n,r,o,a,i){
this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=a,this.target=i,this.currentTarget=null;
for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(a):a[s]);
return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Gr:fs,this.isPropagationStopped=fs,this}
return X(t.prototype,{
preventDefault:function(){
this.defaultPrevented=!0;
var n=this.nativeEvent;
n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Gr)}
,stopPropagation:function(){
var n=this.nativeEvent;
n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Gr)}
,persist:function(){
}
,isPersistent:Gr}
),t}
var Ln={
eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){
return e.timeStamp||Date.now()}
,defaultPrevented:0,isTrusted:0}
,di=Ee(Ln),Rr=X({
}
,Ln,{
view:0,detail:0}
),Wf=Ee(Rr),ya,va,Hn,Xo=X({
}
,Rr,{
screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:mi,button:0,buttons:0,relatedTarget:function(e){
return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget}
,movementX:function(e){
return"movementX"in e?e.movementX:(e!==Hn&&(Hn&&e.type==="mousemove"?(ya=e.screenX-Hn.screenX,va=e.screenY-Hn.screenY):va=ya=0,Hn=e),ya)}
,movementY:function(e){
return"movementY"in e?e.movementY:va}
}
),ps=Ee(Xo),$f=X({
}
,Xo,{
dataTransfer:0}
),Gf=Ee($f),Hf=X({
}
,Rr,{
relatedTarget:0}
),wa=Ee(Hf),Vf=X({
}
,Ln,{
animationName:0,elapsedTime:0,pseudoElement:0}
),Xf=Ee(Vf),Qf=X({
}
,Ln,{
clipboardData:function(e){
return"clipboardData"in e?e.clipboardData:window.clipboardData}
}
),Yf=Ee(Qf),Kf=X({
}
,Ln,{
data:0}
),hs=Ee(Kf),qf={
Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"}
,Zf={
8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"}
,Jf={
Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"}
;
function ep(e){
var t=this.nativeEvent;
return t.getModifierState?t.getModifierState(e):(e=Jf[e])?!!t[e]:!1}
function mi(){
return ep}
var tp=X({
}
,Rr,{
key:function(e){
if(e.key){
var t=qf[e.key]||e.key;
if(t!=="Unidentified")return t}
return e.type==="keypress"?(e=lo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Zf[e.keyCode]||"Unidentified":""}
,code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:mi,charCode:function(e){
return e.type==="keypress"?lo(e):0}
,keyCode:function(e){
return e.type==="keydown"||e.type==="keyup"?e.keyCode:0}
,which:function(e){
return e.type==="keypress"?lo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}
}
),np=Ee(tp),rp=X({
}
,Xo,{
pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}
),gs=Ee(rp),op=X({
}
,Rr,{
touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:mi}
),ap=Ee(op),lp=X({
}
,Ln,{
propertyName:0,elapsedTime:0,pseudoElement:0}
),ip=Ee(lp),sp=X({
}
,Xo,{
deltaX:function(e){
return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0}
,deltaY:function(e){
return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0}
,deltaZ:0,deltaMode:0}
),up=Ee(sp),cp=[9,13,27,32],fi=at&&"CompositionEvent"in window,rr=null;
at&&"documentMode"in document&&(rr=document.documentMode);
var dp=at&&"TextEvent"in window&&!rr,Sc=at&&(!fi||rr&&8<rr&&11>=rr),xs=" ",ys=!1;
function Nc(e,t){
switch(e){
case"keyup":return cp.indexOf(t.keyCode)!==-1;
case"keydown":return t.keyCode!==229;
case"keypress":case"mousedown":case"focusout":return!0;
default:return!1}
}
function Pc(e){
return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}
var un=!1;
function mp(e,t){
switch(e){
case"compositionend":return Pc(t);
case"keypress":return t.which!==32?null:(ys=!0,xs);
case"textInput":return e=t.data,e===xs&&ys?null:e;
default:return null}
}
function fp(e,t){
if(un)return e==="compositionend"||!fi&&Nc(e,t)?(e=bc(),ao=ci=gt=null,un=!1,e):null;
switch(e){
case"paste":return null;
case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){
if(t.char&&1<t.char.length)return t.char;
if(t.which)return String.fromCharCode(t.which)}
return null;
case"compositionend":return Sc&&t.locale!=="ko"?null:t.data;
default:return null}
}
var pp={
color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0}
;
function vs(e){
var t=e&&e.nodeName&&e.nodeName.toLowerCase();
return t==="input"?!!pp[e.type]:t==="textarea"}
function Tc(e,t,n,r){
ac(r),t=bo(t,"onChange"),0<t.length&&(n=new di("onChange","change",null,n,r),e.push({
event:n,listeners:t}
))}
var or=null,gr=null;
function hp(e){
Uc(e,0)}
function Qo(e){
var t=mn(e);
if(Zu(t))return e}
function gp(e,t){
if(e==="change")return t}
var Ec=!1;
if(at){
var ka;
if(at){
var Ca="oninput"in document;
if(!Ca){
var ws=document.createElement("div");
ws.setAttribute("oninput","return;
"),Ca=typeof ws.oninput=="function"}
ka=Ca}
else ka=!1;
Ec=ka&&(!document.documentMode||9<document.documentMode)}
function ks(){
or&&(or.detachEvent("onpropertychange",Ic),gr=or=null)}
function Ic(e){
if(e.propertyName==="value"&&Qo(gr)){
var t=[];
Tc(t,gr,e,ai(e)),uc(hp,t)}
}
function xp(e,t,n){
e==="focusin"?(ks(),or=t,gr=n,or.attachEvent("onpropertychange",Ic)):e==="focusout"&&ks()}
function yp(e){
if(e==="selectionchange"||e==="keyup"||e==="keydown")return Qo(gr)}
function vp(e,t){
if(e==="click")return Qo(t)}
function wp(e,t){
if(e==="input"||e==="change")return Qo(t)}
function kp(e,t){
return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}
var Ge=typeof Object.is=="function"?Object.is:kp;
function xr(e,t){
if(Ge(e,t))return!0;
if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;
var n=Object.keys(e),r=Object.keys(t);
if(n.length!==r.length)return!1;
for(r=0;
r<n.length;
r++){
var o=n[r];
if(!Va.call(t,o)||!Ge(e[o],t[o]))return!1}
return!0}
function Cs(e){
for(;
e&&e.firstChild;
)e=e.firstChild;
return e}
function js(e,t){
var n=Cs(e);
e=0;
for(var r;
n;
){
if(n.nodeType===3){
if(r=e+n.textContent.length,e<=t&&r>=t)return{
node:n,offset:t-e}
;
e=r}
e:{
for(;
n;
){
if(n.nextSibling){
n=n.nextSibling;
break e}
n=n.parentNode}
n=void 0}
n=Cs(n)}
}
function Rc(e,t){
return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Rc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}
function Ac(){
for(var e=window,t=xo();
t instanceof e.HTMLIFrameElement;
){
try{
var n=typeof t.contentWindow.location.href=="string"}
catch{
n=!1}
if(n)e=t.contentWindow;
else break;
t=xo(e.document)}
return t}
function pi(e){
var t=e&&e.nodeName&&e.nodeName.toLowerCase();
return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}
function Cp(e){
var t=Ac(),n=e.focusedElem,r=e.selectionRange;
if(t!==n&&n&&n.ownerDocument&&Rc(n.ownerDocument.documentElement,n)){
if(r!==null&&pi(n)){
if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);
else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){
e=e.getSelection();
var o=n.textContent.length,a=Math.min(r.start,o);
r=r.end===void 0?a:Math.min(r.end,o),!e.extend&&a>r&&(o=r,r=a,a=o),o=js(n,a);
var i=js(n,r);
o&&i&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}
}
for(t=[],e=n;
e=e.parentNode;
)e.nodeType===1&&t.push({
element:e,left:e.scrollLeft,top:e.scrollTop}
);
for(typeof n.focus=="function"&&n.focus(),n=0;
n<t.length;
n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}
}
var jp=at&&"documentMode"in document&&11>=document.documentMode,cn=null,dl=null,ar=null,ml=!1;
function bs(e,t,n){
var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;
ml||cn==null||cn!==xo(r)||(r=cn,"selectionStart"in r&&pi(r)?r={
start:r.selectionStart,end:r.selectionEnd}
:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={
anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}
),ar&&xr(ar,r)||(ar=r,r=bo(dl,"onSelect"),0<r.length&&(t=new di("onSelect","select",null,t,n),e.push({
event:t,listeners:r}
),t.target=cn)))}
function Hr(e,t){
var n={
}
;
return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}
var dn={
animationend:Hr("Animation","AnimationEnd"),animationiteration:Hr("Animation","AnimationIteration"),animationstart:Hr("Animation","AnimationStart"),transitionend:Hr("Transition","TransitionEnd")}
,ja={
}
,Mc={
}
;
at&&(Mc=document.createElement("div").style,"AnimationEvent"in window||(delete dn.animationend.animation,delete dn.animationiteration.animation,delete dn.animationstart.animation),"TransitionEvent"in window||delete dn.transitionend.transition);
function Yo(e){
if(ja[e])return ja[e];
if(!dn[e])return e;
var t=dn[e],n;
for(n in t)if(t.hasOwnProperty(n)&&n in Mc)return ja[e]=t[n];
return e}
var Dc=Yo("animationend"),_c=Yo("animationiteration"),Lc=Yo("animationstart"),zc=Yo("transitionend"),Oc=new Map,Ss="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function It(e,t){
Oc.set(e,t),Jt(t,[e])}
for(var ba=0;
ba<Ss.length;
ba++){
var Sa=Ss[ba],bp=Sa.toLowerCase(),Sp=Sa[0].toUpperCase()+Sa.slice(1);
It(bp,"on"+Sp)}
It(Dc,"onAnimationEnd");
It(_c,"onAnimationIteration");
It(Lc,"onAnimationStart");
It("dblclick","onDoubleClick");
It("focusin","onFocus");
It("focusout","onBlur");
It(zc,"onTransitionEnd");
Pn("onMouseEnter",["mouseout","mouseover"]);
Pn("onMouseLeave",["mouseout","mouseover"]);
Pn("onPointerEnter",["pointerout","pointerover"]);
Pn("onPointerLeave",["pointerout","pointerover"]);
Jt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));
Jt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Jt("onBeforeInput",["compositionend","keypress","textInput","paste"]);
Jt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));
Jt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));
Jt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var er="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Np=new Set("cancel close invalid load scroll toggle".split(" ").concat(er));
function Ns(e,t,n){
var r=e.type||"unknown-event";
e.currentTarget=n,bf(r,t,void 0,e),e.currentTarget=null}
function Uc(e,t){
t=(t&4)!==0;
for(var n=0;
n<e.length;
n++){
var r=e[n],o=r.event;
r=r.listeners;
e:{
var a=void 0;
if(t)for(var i=r.length-1;
0<=i;
i--){
var s=r[i],u=s.instance,c=s.currentTarget;
if(s=s.listener,u!==a&&o.isPropagationStopped())break e;
Ns(o,s,c),a=u}
else for(i=0;
i<r.length;
i++){
if(s=r[i],u=s.instance,c=s.currentTarget,s=s.listener,u!==a&&o.isPropagationStopped())break e;
Ns(o,s,c),a=u}
}
}
if(vo)throw e=il,vo=!1,il=null,e}
function F(e,t){
var n=t[xl];
n===void 0&&(n=t[xl]=new Set);
var r=e+"__bubble";
n.has(r)||(Bc(t,e,2,!1),n.add(r))}
function Na(e,t,n){
var r=0;
t&&(r|=4),Bc(n,e,r,t)}
var Vr="_reactListening"+Math.random().toString(36).slice(2);
function yr(e){
if(!e[Vr]){
e[Vr]=!0,Xu.forEach(function(n){
n!=="selectionchange"&&(Np.has(n)||Na(n,!1,e),Na(n,!0,e))}
);
var t=e.nodeType===9?e:e.ownerDocument;
t===null||t[Vr]||(t[Vr]=!0,Na("selectionchange",!1,t))}
}
function Bc(e,t,n,r){
switch(jc(t)){
case 1:var o=Bf;
break;
case 4:o=Ff;
break;
default:o=ui}
n=o.bind(null,t,n,e),o=void 0,!ll||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{
capture:!0,passive:o}
):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{
passive:o}
):e.addEventListener(t,n,!1)}
function Pa(e,t,n,r,o){
var a=r;
if(!(t&1)&&!(t&2)&&r!==null)e:for(;
;
){
if(r===null)return;
var i=r.tag;
if(i===3||i===4){
var s=r.stateNode.containerInfo;
if(s===o||s.nodeType===8&&s.parentNode===o)break;
if(i===4)for(i=r.return;
i!==null;
){
var u=i.tag;
if((u===3||u===4)&&(u=i.stateNode.containerInfo,u===o||u.nodeType===8&&u.parentNode===o))return;
i=i.return}
for(;
s!==null;
){
if(i=Bt(s),i===null)return;
if(u=i.tag,u===5||u===6){
r=a=i;
continue e}
s=s.parentNode}
}
r=r.return}
uc(function(){
var c=a,d=ai(n),m=[];
e:{
var h=Oc.get(e);
if(h!==void 0){
var x=di,w=e;
switch(e){
case"keypress":if(lo(n)===0)break e;
case"keydown":case"keyup":x=np;
break;
case"focusin":w="focus",x=wa;
break;
case"focusout":w="blur",x=wa;
break;
case"beforeblur":case"afterblur":x=wa;
break;
case"click":if(n.button===2)break e;
case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=ps;
break;
case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=Gf;
break;
case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=ap;
break;
case Dc:case _c:case Lc:x=Xf;
break;
case zc:x=ip;
break;
case"scroll":x=Wf;
break;
case"wheel":x=up;
break;
case"copy":case"cut":case"paste":x=Yf;
break;
case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=gs}
var k=(t&4)!==0,b=!k&&e==="scroll",p=k?h!==null?h+"Capture":null:h;
k=[];
for(var f=c,g;
f!==null;
){
g=f;
var y=g.stateNode;
if(g.tag===5&&y!==null&&(g=y,p!==null&&(y=mr(f,p),y!=null&&k.push(vr(f,y,g)))),b)break;
f=f.return}
0<k.length&&(h=new x(h,w,null,n,d),m.push({
event:h,listeners:k}
))}
}
if(!(t&7)){
e:{
if(h=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",h&&n!==ol&&(w=n.relatedTarget||n.fromElement)&&(Bt(w)||w[lt]))break e;
if((x||h)&&(h=d.window===d?d:(h=d.ownerDocument)?h.defaultView||h.parentWindow:window,x?(w=n.relatedTarget||n.toElement,x=c,w=w?Bt(w):null,w!==null&&(b=en(w),w!==b||w.tag!==5&&w.tag!==6)&&(w=null)):(x=null,w=c),x!==w)){
if(k=ps,y="onMouseLeave",p="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(k=gs,y="onPointerLeave",p="onPointerEnter",f="pointer"),b=x==null?h:mn(x),g=w==null?h:mn(w),h=new k(y,f+"leave",x,n,d),h.target=b,h.relatedTarget=g,y=null,Bt(d)===c&&(k=new k(p,f+"enter",w,n,d),k.target=g,k.relatedTarget=b,y=k),b=y,x&&w)t:{
for(k=x,p=w,f=0,g=k;
g;
g=rn(g))f++;
for(g=0,y=p;
y;
y=rn(y))g++;
for(;
0<f-g;
)k=rn(k),f--;
for(;
0<g-f;
)p=rn(p),g--;
for(;
f--;
){
if(k===p||p!==null&&k===p.alternate)break t;
k=rn(k),p=rn(p)}
k=null}
else k=null;
x!==null&&Ps(m,h,x,k,!1),w!==null&&b!==null&&Ps(m,b,w,k,!0)}
}
e:{
if(h=c?mn(c):window,x=h.nodeName&&h.nodeName.toLowerCase(),x==="select"||x==="input"&&h.type==="file")var j=gp;
else if(vs(h))if(Ec)j=wp;
else{
j=yp;
var S=xp}
else(x=h.nodeName)&&x.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(j=vp);
if(j&&(j=j(e,c))){
Tc(m,j,n,d);
break e}
S&&S(e,h,c),e==="focusout"&&(S=h._wrapperState)&&S.controlled&&h.type==="number"&&Ja(h,"number",h.value)}
switch(S=c?mn(c):window,e){
case"focusin":(vs(S)||S.contentEditable==="true")&&(cn=S,dl=c,ar=null);
break;
case"focusout":ar=dl=cn=null;
break;
case"mousedown":ml=!0;
break;
case"contextmenu":case"mouseup":case"dragend":ml=!1,bs(m,n,d);
break;
case"selectionchange":if(jp)break;
case"keydown":case"keyup":bs(m,n,d)}
var T;
if(fi)e:{
switch(e){
case"compositionstart":var E="onCompositionStart";
break e;
case"compositionend":E="onCompositionEnd";
break e;
case"compositionupdate":E="onCompositionUpdate";
break e}
E=void 0}
else un?Nc(e,n)&&(E="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(E="onCompositionStart");
E&&(Sc&&n.locale!=="ko"&&(un||E!=="onCompositionStart"?E==="onCompositionEnd"&&un&&(T=bc()):(gt=d,ci="value"in gt?gt.value:gt.textContent,un=!0)),S=bo(c,E),0<S.length&&(E=new hs(E,e,null,n,d),m.push({
event:E,listeners:S}
),T?E.data=T:(T=Pc(n),T!==null&&(E.data=T)))),(T=dp?mp(e,n):fp(e,n))&&(c=bo(c,"onBeforeInput"),0<c.length&&(d=new hs("onBeforeInput","beforeinput",null,n,d),m.push({
event:d,listeners:c}
),d.data=T))}
Uc(m,t)}
)}
function vr(e,t,n){
return{
instance:e,listener:t,currentTarget:n}
}
function bo(e,t){
for(var n=t+"Capture",r=[];
e!==null;
){
var o=e,a=o.stateNode;
o.tag===5&&a!==null&&(o=a,a=mr(e,n),a!=null&&r.unshift(vr(e,a,o)),a=mr(e,t),a!=null&&r.push(vr(e,a,o))),e=e.return}
return r}
function rn(e){
if(e===null)return null;
do e=e.return;
while(e&&e.tag!==5);
return e||null}
function Ps(e,t,n,r,o){
for(var a=t._reactName,i=[];
n!==null&&n!==r;
){
var s=n,u=s.alternate,c=s.stateNode;
if(u!==null&&u===r)break;
s.tag===5&&c!==null&&(s=c,o?(u=mr(n,a),u!=null&&i.unshift(vr(n,u,s))):o||(u=mr(n,a),u!=null&&i.push(vr(n,u,s)))),n=n.return}
i.length!==0&&e.push({
event:t,listeners:i}
)}
var Pp=/\r\n?/g,Tp=/\u0000|\uFFFD/g;
function Ts(e){
return(typeof e=="string"?e:""+e).replace(Pp,`
`).replace(Tp,"")}
function Xr(e,t,n){
if(t=Ts(t),Ts(e)!==t&&n)throw Error(C(425))}
function So(){
}
var fl=null,pl=null;
function hl(e,t){
return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}
var gl=typeof setTimeout=="function"?setTimeout:void 0,Ep=typeof clearTimeout=="function"?clearTimeout:void 0,Es=typeof Promise=="function"?Promise:void 0,Ip=typeof queueMicrotask=="function"?queueMicrotask:typeof Es<"u"?function(e){
return Es.resolve(null).then(e).catch(Rp)}
:gl;
function Rp(e){
setTimeout(function(){
throw e}
)}
function Ta(e,t){
var n=t,r=0;
do{
var o=n.nextSibling;
if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){
if(r===0){
e.removeChild(o),hr(t);
return}
r--}
else n!=="$"&&n!=="$?"&&n!=="$!"||r++;
n=o}
while(n);
hr(t)}
function Ct(e){
for(;
e!=null;
e=e.nextSibling){
var t=e.nodeType;
if(t===1||t===3)break;
if(t===8){
if(t=e.data,t==="$"||t==="$!"||t==="$?")break;
if(t==="/$")return null}
}
return e}
function Is(e){
e=e.previousSibling;
for(var t=0;
e;
){
if(e.nodeType===8){
var n=e.data;
if(n==="$"||n==="$!"||n==="$?"){
if(t===0)return e;
t--}
else n==="/$"&&t++}
e=e.previousSibling}
return null}
var zn=Math.random().toString(36).slice(2),Xe="__reactFiber$"+zn,wr="__reactProps$"+zn,lt="__reactContainer$"+zn,xl="__reactEvents$"+zn,Ap="__reactListeners$"+zn,Mp="__reactHandles$"+zn;
function Bt(e){
var t=e[Xe];
if(t)return t;
for(var n=e.parentNode;
n;
){
if(t=n[lt]||n[Xe]){
if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Is(e);
e!==null;
){
if(n=e[Xe])return n;
e=Is(e)}
return t}
e=n,n=e.parentNode}
return null}
function Ar(e){
return e=e[Xe]||e[lt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}
function mn(e){
if(e.tag===5||e.tag===6)return e.stateNode;
throw Error(C(33))}
function Ko(e){
return e[wr]||null}
var yl=[],fn=-1;
function Rt(e){
return{
current:e}
}
function W(e){
0>fn||(e.current=yl[fn],yl[fn]=null,fn--)}
function U(e,t){
fn++,yl[fn]=e.current,e.current=t}
var Et={
}
,fe=Rt(Et),ke=Rt(!1),Xt=Et;
function Tn(e,t){
var n=e.type.contextTypes;
if(!n)return Et;
var r=e.stateNode;
if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;
var o={
}
,a;
for(a in n)o[a]=t[a];
return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}
function Ce(e){
return e=e.childContextTypes,e!=null}
function No(){
W(ke),W(fe)}
function Rs(e,t,n){
if(fe.current!==Et)throw Error(C(168));
U(fe,t),U(ke,n)}
function Fc(e,t,n){
var r=e.stateNode;
if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;
r=r.getChildContext();
for(var o in r)if(!(o in t))throw Error(C(108,xf(e)||"Unknown",o));
return X({
}
,n,r)}
function Po(e){
return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Et,Xt=fe.current,U(fe,e),U(ke,ke.current),!0}
function As(e,t,n){
var r=e.stateNode;
if(!r)throw Error(C(169));
n?(e=Fc(e,t,Xt),r.__reactInternalMemoizedMergedChildContext=e,W(ke),W(fe),U(fe,e)):W(ke),U(ke,n)}
var tt=null,qo=!1,Ea=!1;
function Wc(e){
tt===null?tt=[e]:tt.push(e)}
function Dp(e){
qo=!0,Wc(e)}
function At(){
if(!Ea&&tt!==null){
Ea=!0;
var e=0,t=z;
try{
var n=tt;
for(z=1;
e<n.length;
e++){
var r=n[e];
do r=r(!0);
while(r!==null)}
tt=null,qo=!1}
catch(o){
throw tt!==null&&(tt=tt.slice(e+1)),fc(li,At),o}
finally{
z=t,Ea=!1}
}
return null}
var pn=[],hn=0,To=null,Eo=0,Re=[],Ae=0,Qt=null,nt=1,rt="";
function zt(e,t){
pn[hn++]=Eo,pn[hn++]=To,To=e,Eo=t}
function $c(e,t,n){
Re[Ae++]=nt,Re[Ae++]=rt,Re[Ae++]=Qt,Qt=e;
var r=nt;
e=rt;
var o=32-We(r)-1;
r&=~(1<<o),n+=1;
var a=32-We(t)+o;
if(30<a){
var i=o-o%5;
a=(r&(1<<i)-1).toString(32),r>>=i,o-=i,nt=1<<32-We(t)+o|n<<o|r,rt=a+e}
else nt=1<<a|n<<o|r,rt=e}
function hi(e){
e.return!==null&&(zt(e,1),$c(e,1,0))}
function gi(e){
for(;
e===To;
)To=pn[--hn],pn[hn]=null,Eo=pn[--hn],pn[hn]=null;
for(;
e===Qt;
)Qt=Re[--Ae],Re[Ae]=null,rt=Re[--Ae],Re[Ae]=null,nt=Re[--Ae],Re[Ae]=null}
var Ne=null,Se=null,$=!1,Be=null;
function Gc(e,t){
var n=Me(5,null,null,0);
n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}
function Ms(e,t){
switch(e.tag){
case 5:var n=e.type;
return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ne=e,Se=Ct(t.firstChild),!0):!1;
case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ne=e,Se=null,!0):!1;
case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Qt!==null?{
id:nt,overflow:rt}
:null,e.memoizedState={
dehydrated:t,treeContext:n,retryLane:1073741824}
,n=Me(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ne=e,Se=null,!0):!1;
default:return!1}
}
function vl(e){
return(e.mode&1)!==0&&(e.flags&128)===0}
function wl(e){
if($){
var t=Se;
if(t){
var n=t;
if(!Ms(e,t)){
if(vl(e))throw Error(C(418));
t=Ct(n.nextSibling);
var r=Ne;
t&&Ms(e,t)?Gc(r,n):(e.flags=e.flags&-4097|2,$=!1,Ne=e)}
}
else{
if(vl(e))throw Error(C(418));
e.flags=e.flags&-4097|2,$=!1,Ne=e}
}
}
function Ds(e){
for(e=e.return;
e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;
)e=e.return;
Ne=e}
function Qr(e){
if(e!==Ne)return!1;
if(!$)return Ds(e),$=!0,!1;
var t;
if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!hl(e.type,e.memoizedProps)),t&&(t=Se)){
if(vl(e))throw Hc(),Error(C(418));
for(;
t;
)Gc(e,t),t=Ct(t.nextSibling)}
if(Ds(e),e.tag===13){
if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(C(317));
e:{
for(e=e.nextSibling,t=0;
e;
){
if(e.nodeType===8){
var n=e.data;
if(n==="/$"){
if(t===0){
Se=Ct(e.nextSibling);
break e}
t--}
else n!=="$"&&n!=="$!"&&n!=="$?"||t++}
e=e.nextSibling}
Se=null}
}
else Se=Ne?Ct(e.stateNode.nextSibling):null;
return!0}
function Hc(){
for(var e=Se;
e;
)e=Ct(e.nextSibling)}
function En(){
Se=Ne=null,$=!1}
function xi(e){
Be===null?Be=[e]:Be.push(e)}
var _p=ut.ReactCurrentBatchConfig;
function Vn(e,t,n){
if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){
if(n._owner){
if(n=n._owner,n){
if(n.tag!==1)throw Error(C(309));
var r=n.stateNode}
if(!r)throw Error(C(147,e));
var o=r,a=""+e;
return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(i){
var s=o.refs;
i===null?delete s[a]:s[a]=i}
,t._stringRef=a,t)}
if(typeof e!="string")throw Error(C(284));
if(!n._owner)throw Error(C(290,e))}
return e}
function Yr(e,t){
throw e=Object.prototype.toString.call(t),Error(C(31,e==="[object Object]"?"object with keys {
"+Object.keys(t).join(", ")+"}
":e))}
function _s(e){
var t=e._init;
return t(e._payload)}
function Vc(e){
function t(p,f){
if(e){
var g=p.deletions;
g===null?(p.deletions=[f],p.flags|=16):g.push(f)}
}
function n(p,f){
if(!e)return null;
for(;
f!==null;
)t(p,f),f=f.sibling;
return null}
function r(p,f){
for(p=new Map;
f!==null;
)f.key!==null?p.set(f.key,f):p.set(f.index,f),f=f.sibling;
return p}
function o(p,f){
return p=Nt(p,f),p.index=0,p.sibling=null,p}
function a(p,f,g){
return p.index=g,e?(g=p.alternate,g!==null?(g=g.index,g<f?(p.flags|=2,f):g):(p.flags|=2,f)):(p.flags|=1048576,f)}
function i(p){
return e&&p.alternate===null&&(p.flags|=2),p}
function s(p,f,g,y){
return f===null||f.tag!==6?(f=La(g,p.mode,y),f.return=p,f):(f=o(f,g),f.return=p,f)}
function u(p,f,g,y){
var j=g.type;
return j===sn?d(p,f,g.props.children,y,g.key):f!==null&&(f.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===mt&&_s(j)===f.type)?(y=o(f,g.props),y.ref=Vn(p,f,g),y.return=p,y):(y=po(g.type,g.key,g.props,null,p.mode,y),y.ref=Vn(p,f,g),y.return=p,y)}
function c(p,f,g,y){
return f===null||f.tag!==4||f.stateNode.containerInfo!==g.containerInfo||f.stateNode.implementation!==g.implementation?(f=za(g,p.mode,y),f.return=p,f):(f=o(f,g.children||[]),f.return=p,f)}
function d(p,f,g,y,j){
return f===null||f.tag!==7?(f=Ht(g,p.mode,y,j),f.return=p,f):(f=o(f,g),f.return=p,f)}
function m(p,f,g){
if(typeof f=="string"&&f!==""||typeof f=="number")return f=La(""+f,p.mode,g),f.return=p,f;
if(typeof f=="object"&&f!==null){
switch(f.$$typeof){
case Or:return g=po(f.type,f.key,f.props,null,p.mode,g),g.ref=Vn(p,null,f),g.return=p,g;
case ln:return f=za(f,p.mode,g),f.return=p,f;
case mt:var y=f._init;
return m(p,y(f._payload),g)}
if(Zn(f)||Fn(f))return f=Ht(f,p.mode,g,null),f.return=p,f;
Yr(p,f)}
return null}
function h(p,f,g,y){
var j=f!==null?f.key:null;
if(typeof g=="string"&&g!==""||typeof g=="number")return j!==null?null:s(p,f,""+g,y);
if(typeof g=="object"&&g!==null){
switch(g.$$typeof){
case Or:return g.key===j?u(p,f,g,y):null;
case ln:return g.key===j?c(p,f,g,y):null;
case mt:return j=g._init,h(p,f,j(g._payload),y)}
if(Zn(g)||Fn(g))return j!==null?null:d(p,f,g,y,null);
Yr(p,g)}
return null}
function x(p,f,g,y,j){
if(typeof y=="string"&&y!==""||typeof y=="number")return p=p.get(g)||null,s(f,p,""+y,j);
if(typeof y=="object"&&y!==null){
switch(y.$$typeof){
case Or:return p=p.get(y.key===null?g:y.key)||null,u(f,p,y,j);
case ln:return p=p.get(y.key===null?g:y.key)||null,c(f,p,y,j);
case mt:var S=y._init;
return x(p,f,g,S(y._payload),j)}
if(Zn(y)||Fn(y))return p=p.get(g)||null,d(f,p,y,j,null);
Yr(f,y)}
return null}
function w(p,f,g,y){
for(var j=null,S=null,T=f,E=f=0,B=null;
T!==null&&E<g.length;
E++){
T.index>E?(B=T,T=null):B=T.sibling;
var M=h(p,T,g[E],y);
if(M===null){
T===null&&(T=B);
break}
e&&T&&M.alternate===null&&t(p,T),f=a(M,f,E),S===null?j=M:S.sibling=M,S=M,T=B}
if(E===g.length)return n(p,T),$&&zt(p,E),j;
if(T===null){
for(;
E<g.length;
E++)T=m(p,g[E],y),T!==null&&(f=a(T,f,E),S===null?j=T:S.sibling=T,S=T);
return $&&zt(p,E),j}
for(T=r(p,T);
E<g.length;
E++)B=x(T,p,E,g[E],y),B!==null&&(e&&B.alternate!==null&&T.delete(B.key===null?E:B.key),f=a(B,f,E),S===null?j=B:S.sibling=B,S=B);
return e&&T.forEach(function(pe){
return t(p,pe)}
),$&&zt(p,E),j}
function k(p,f,g,y){
var j=Fn(g);
if(typeof j!="function")throw Error(C(150));
if(g=j.call(g),g==null)throw Error(C(151));
for(var S=j=null,T=f,E=f=0,B=null,M=g.next();
T!==null&&!M.done;
E++,M=g.next()){
T.index>E?(B=T,T=null):B=T.sibling;
var pe=h(p,T,M.value,y);
if(pe===null){
T===null&&(T=B);
break}
e&&T&&pe.alternate===null&&t(p,T),f=a(pe,f,E),S===null?j=pe:S.sibling=pe,S=pe,T=B}
if(M.done)return n(p,T),$&&zt(p,E),j;
if(T===null){
for(;
!M.done;
E++,M=g.next())M=m(p,M.value,y),M!==null&&(f=a(M,f,E),S===null?j=M:S.sibling=M,S=M);
return $&&zt(p,E),j}
for(T=r(p,T);
!M.done;
E++,M=g.next())M=x(T,p,E,M.value,y),M!==null&&(e&&M.alternate!==null&&T.delete(M.key===null?E:M.key),f=a(M,f,E),S===null?j=M:S.sibling=M,S=M);
return e&&T.forEach(function(qe){
return t(p,qe)}
),$&&zt(p,E),j}
function b(p,f,g,y){
if(typeof g=="object"&&g!==null&&g.type===sn&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){
switch(g.$$typeof){
case Or:e:{
for(var j=g.key,S=f;
S!==null;
){
if(S.key===j){
if(j=g.type,j===sn){
if(S.tag===7){
n(p,S.sibling),f=o(S,g.props.children),f.return=p,p=f;
break e}
}
else if(S.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===mt&&_s(j)===S.type){
n(p,S.sibling),f=o(S,g.props),f.ref=Vn(p,S,g),f.return=p,p=f;
break e}
n(p,S);
break}
else t(p,S);
S=S.sibling}
g.type===sn?(f=Ht(g.props.children,p.mode,y,g.key),f.return=p,p=f):(y=po(g.type,g.key,g.props,null,p.mode,y),y.ref=Vn(p,f,g),y.return=p,p=y)}
return i(p);
case ln:e:{
for(S=g.key;
f!==null;
){
if(f.key===S)if(f.tag===4&&f.stateNode.containerInfo===g.containerInfo&&f.stateNode.implementation===g.implementation){
n(p,f.sibling),f=o(f,g.children||[]),f.return=p,p=f;
break e}
else{
n(p,f);
break}
else t(p,f);
f=f.sibling}
f=za(g,p.mode,y),f.return=p,p=f}
return i(p);
case mt:return S=g._init,b(p,f,S(g._payload),y)}
if(Zn(g))return w(p,f,g,y);
if(Fn(g))return k(p,f,g,y);
Yr(p,g)}
return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,f!==null&&f.tag===6?(n(p,f.sibling),f=o(f,g),f.return=p,p=f):(n(p,f),f=La(g,p.mode,y),f.return=p,p=f),i(p)):n(p,f)}
return b}
var In=Vc(!0),Xc=Vc(!1),Io=Rt(null),Ro=null,gn=null,yi=null;
function vi(){
yi=gn=Ro=null}
function wi(e){
var t=Io.current;
W(Io),e._currentValue=t}
function kl(e,t,n){
for(;
e!==null;
){
var r=e.alternate;
if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;
e=e.return}
}
function jn(e,t){
Ro=e,yi=gn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(we=!0),e.firstContext=null)}
function _e(e){
var t=e._currentValue;
if(yi!==e)if(e={
context:e,memoizedValue:t,next:null}
,gn===null){
if(Ro===null)throw Error(C(308));
gn=e,Ro.dependencies={
lanes:0,firstContext:e}
}
else gn=gn.next=e;
return t}
var Ft=null;
function ki(e){
Ft===null?Ft=[e]:Ft.push(e)}
function Qc(e,t,n,r){
var o=t.interleaved;
return o===null?(n.next=n,ki(t)):(n.next=o.next,o.next=n),t.interleaved=n,it(e,r)}
function it(e,t){
e.lanes|=t;
var n=e.alternate;
for(n!==null&&(n.lanes|=t),n=e,e=e.return;
e!==null;
)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;
return n.tag===3?n.stateNode:null}
var ft=!1;
function Ci(e){
e.updateQueue={
baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{
pending:null,interleaved:null,lanes:0}
,effects:null}
}
function Yc(e,t){
e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={
baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects}
)}
function ot(e,t){
return{
eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}
}
function jt(e,t,n){
var r=e.updateQueue;
if(r===null)return null;
if(r=r.shared,L&2){
var o=r.pending;
return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,it(e,n)}
return o=r.interleaved,o===null?(t.next=t,ki(r)):(t.next=o.next,o.next=t),r.interleaved=t,it(e,n)}
function io(e,t,n){
if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){
var r=t.lanes;
r&=e.pendingLanes,n|=r,t.lanes=n,ii(e,n)}
}
function Ls(e,t){
var n=e.updateQueue,r=e.alternate;
if(r!==null&&(r=r.updateQueue,n===r)){
var o=null,a=null;
if(n=n.firstBaseUpdate,n!==null){
do{
var i={
eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null}
;
a===null?o=a=i:a=a.next=i,n=n.next}
while(n!==null);
a===null?o=a=t:a=a.next=t}
else o=a=t;
n={
baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:a,shared:r.shared,effects:r.effects}
,e.updateQueue=n;
return}
e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}
function Ao(e,t,n,r){
var o=e.updateQueue;
ft=!1;
var a=o.firstBaseUpdate,i=o.lastBaseUpdate,s=o.shared.pending;
if(s!==null){
o.shared.pending=null;
var u=s,c=u.next;
u.next=null,i===null?a=c:i.next=c,i=u;
var d=e.alternate;
d!==null&&(d=d.updateQueue,s=d.lastBaseUpdate,s!==i&&(s===null?d.firstBaseUpdate=c:s.next=c,d.lastBaseUpdate=u))}
if(a!==null){
var m=o.baseState;
i=0,d=c=u=null,s=a;
do{
var h=s.lane,x=s.eventTime;
if((r&h)===h){
d!==null&&(d=d.next={
eventTime:x,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null}
);
e:{
var w=e,k=s;
switch(h=t,x=n,k.tag){
case 1:if(w=k.payload,typeof w=="function"){
m=w.call(x,m,h);
break e}
m=w;
break e;
case 3:w.flags=w.flags&-65537|128;
case 0:if(w=k.payload,h=typeof w=="function"?w.call(x,m,h):w,h==null)break e;
m=X({
}
,m,h);
break e;
case 2:ft=!0}
}
s.callback!==null&&s.lane!==0&&(e.flags|=64,h=o.effects,h===null?o.effects=[s]:h.push(s))}
else x={
eventTime:x,lane:h,tag:s.tag,payload:s.payload,callback:s.callback,next:null}
,d===null?(c=d=x,u=m):d=d.next=x,i|=h;
if(s=s.next,s===null){
if(s=o.shared.pending,s===null)break;
h=s,s=h.next,h.next=null,o.lastBaseUpdate=h,o.shared.pending=null}
}
while(!0);
if(d===null&&(u=m),o.baseState=u,o.firstBaseUpdate=c,o.lastBaseUpdate=d,t=o.shared.interleaved,t!==null){
o=t;
do i|=o.lane,o=o.next;
while(o!==t)}
else a===null&&(o.shared.lanes=0);
Kt|=i,e.lanes=i,e.memoizedState=m}
}
function zs(e,t,n){
if(e=t.effects,t.effects=null,e!==null)for(t=0;
t<e.length;
t++){
var r=e[t],o=r.callback;
if(o!==null){
if(r.callback=null,r=n,typeof o!="function")throw Error(C(191,o));
o.call(r)}
}
}
var Mr={
}
,Ke=Rt(Mr),kr=Rt(Mr),Cr=Rt(Mr);
function Wt(e){
if(e===Mr)throw Error(C(174));
return e}
function ji(e,t){
switch(U(Cr,t),U(kr,e),U(Ke,Mr),e=t.nodeType,e){
case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:tl(null,"");
break;
default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=tl(t,e)}
W(Ke),U(Ke,t)}
function Rn(){
W(Ke),W(kr),W(Cr)}
function Kc(e){
Wt(Cr.current);
var t=Wt(Ke.current),n=tl(t,e.type);
t!==n&&(U(kr,e),U(Ke,n))}
function bi(e){
kr.current===e&&(W(Ke),W(kr))}
var H=Rt(0);
function Mo(e){
for(var t=e;
t!==null;
){
if(t.tag===13){
var n=t.memoizedState;
if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}
else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){
if(t.flags&128)return t}
else if(t.child!==null){
t.child.return=t,t=t.child;
continue}
if(t===e)break;
for(;
t.sibling===null;
){
if(t.return===null||t.return===e)return null;
t=t.return}
t.sibling.return=t.return,t=t.sibling}
return null}
var Ia=[];
function Si(){
for(var e=0;
e<Ia.length;
e++)Ia[e]._workInProgressVersionPrimary=null;
Ia.length=0}
var so=ut.ReactCurrentDispatcher,Ra=ut.ReactCurrentBatchConfig,Yt=0,V=null,te=null,re=null,Do=!1,lr=!1,jr=0,Lp=0;
function ue(){
throw Error(C(321))}
function Ni(e,t){
if(t===null)return!1;
for(var n=0;
n<t.length&&n<e.length;
n++)if(!Ge(e[n],t[n]))return!1;
return!0}
function Pi(e,t,n,r,o,a){
if(Yt=a,V=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,so.current=e===null||e.memoizedState===null?Bp:Fp,e=n(r,o),lr){
a=0;
do{
if(lr=!1,jr=0,25<=a)throw Error(C(301));
a+=1,re=te=null,t.updateQueue=null,so.current=Wp,e=n(r,o)}
while(lr)}
if(so.current=_o,t=te!==null&&te.next!==null,Yt=0,re=te=V=null,Do=!1,t)throw Error(C(300));
return e}
function Ti(){
var e=jr!==0;
return jr=0,e}
function Ve(){
var e={
memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null}
;
return re===null?V.memoizedState=re=e:re=re.next=e,re}
function Le(){
if(te===null){
var e=V.alternate;
e=e!==null?e.memoizedState:null}
else e=te.next;
var t=re===null?V.memoizedState:re.next;
if(t!==null)re=t,te=e;
else{
if(e===null)throw Error(C(310));
te=e,e={
memoizedState:te.memoizedState,baseState:te.baseState,baseQueue:te.baseQueue,queue:te.queue,next:null}
,re===null?V.memoizedState=re=e:re=re.next=e}
return re}
function br(e,t){
return typeof t=="function"?t(e):t}
function Aa(e){
var t=Le(),n=t.queue;
if(n===null)throw Error(C(311));
n.lastRenderedReducer=e;
var r=te,o=r.baseQueue,a=n.pending;
if(a!==null){
if(o!==null){
var i=o.next;
o.next=a.next,a.next=i}
r.baseQueue=o=a,n.pending=null}
if(o!==null){
a=o.next,r=r.baseState;
var s=i=null,u=null,c=a;
do{
var d=c.lane;
if((Yt&d)===d)u!==null&&(u=u.next={
lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}
),r=c.hasEagerState?c.eagerState:e(r,c.action);
else{
var m={
lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}
;
u===null?(s=u=m,i=r):u=u.next=m,V.lanes|=d,Kt|=d}
c=c.next}
while(c!==null&&c!==a);
u===null?i=r:u.next=s,Ge(r,t.memoizedState)||(we=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=u,n.lastRenderedState=r}
if(e=n.interleaved,e!==null){
o=e;
do a=o.lane,V.lanes|=a,Kt|=a,o=o.next;
while(o!==e)}
else o===null&&(n.lanes=0);
return[t.memoizedState,n.dispatch]}
function Ma(e){
var t=Le(),n=t.queue;
if(n===null)throw Error(C(311));
n.lastRenderedReducer=e;
var r=n.dispatch,o=n.pending,a=t.memoizedState;
if(o!==null){
n.pending=null;
var i=o=o.next;
do a=e(a,i.action),i=i.next;
while(i!==o);
Ge(a,t.memoizedState)||(we=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}
return[a,r]}
function qc(){
}
function Zc(e,t){
var n=V,r=Le(),o=t(),a=!Ge(r.memoizedState,o);
if(a&&(r.memoizedState=o,we=!0),r=r.queue,Ei(td.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||re!==null&&re.memoizedState.tag&1){
if(n.flags|=2048,Sr(9,ed.bind(null,n,r,o,t),void 0,null),oe===null)throw Error(C(349));
Yt&30||Jc(n,t,o)}
return o}
function Jc(e,t,n){
e.flags|=16384,e={
getSnapshot:t,value:n}
,t=V.updateQueue,t===null?(t={
lastEffect:null,stores:null}
,V.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}
function ed(e,t,n,r){
t.value=n,t.getSnapshot=r,nd(t)&&rd(e)}
function td(e,t,n){
return n(function(){
nd(t)&&rd(e)}
)}
function nd(e){
var t=e.getSnapshot;
e=e.value;
try{
var n=t();
return!Ge(e,n)}
catch{
return!0}
}
function rd(e){
var t=it(e,1);
t!==null&&$e(t,e,1,-1)}
function Os(e){
var t=Ve();
return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={
pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:br,lastRenderedState:e}
,t.queue=e,e=e.dispatch=Up.bind(null,V,e),[t.memoizedState,e]}
function Sr(e,t,n,r){
return e={
tag:e,create:t,destroy:n,deps:r,next:null}
,t=V.updateQueue,t===null?(t={
lastEffect:null,stores:null}
,V.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}
function od(){
return Le().memoizedState}
function uo(e,t,n,r){
var o=Ve();
V.flags|=e,o.memoizedState=Sr(1|t,n,void 0,r===void 0?null:r)}
function Zo(e,t,n,r){
var o=Le();
r=r===void 0?null:r;
var a=void 0;
if(te!==null){
var i=te.memoizedState;
if(a=i.destroy,r!==null&&Ni(r,i.deps)){
o.memoizedState=Sr(t,n,a,r);
return}
}
V.flags|=e,o.memoizedState=Sr(1|t,n,a,r)}
function Us(e,t){
return uo(8390656,8,e,t)}
function Ei(e,t){
return Zo(2048,8,e,t)}
function ad(e,t){
return Zo(4,2,e,t)}
function ld(e,t){
return Zo(4,4,e,t)}
function id(e,t){
if(typeof t=="function")return e=e(),t(e),function(){
t(null)}
;
if(t!=null)return e=e(),t.current=e,function(){
t.current=null}
}
function sd(e,t,n){
return n=n!=null?n.concat([e]):null,Zo(4,4,id.bind(null,t,e),n)}
function Ii(){
}
function ud(e,t){
var n=Le();
t=t===void 0?null:t;
var r=n.memoizedState;
return r!==null&&t!==null&&Ni(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}
function cd(e,t){
var n=Le();
t=t===void 0?null:t;
var r=n.memoizedState;
return r!==null&&t!==null&&Ni(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}
function dd(e,t,n){
return Yt&21?(Ge(n,t)||(n=gc(),V.lanes|=n,Kt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,we=!0),e.memoizedState=n)}
function zp(e,t){
var n=z;
z=n!==0&&4>n?n:4,e(!0);
var r=Ra.transition;
Ra.transition={
}
;
try{
e(!1),t()}
finally{
z=n,Ra.transition=r}
}
function md(){
return Le().memoizedState}
function Op(e,t,n){
var r=St(e);
if(n={
lane:r,action:n,hasEagerState:!1,eagerState:null,next:null}
,fd(e))pd(t,n);
else if(n=Qc(e,t,n,r),n!==null){
var o=ge();
$e(n,e,r,o),hd(n,t,r)}
}
function Up(e,t,n){
var r=St(e),o={
lane:r,action:n,hasEagerState:!1,eagerState:null,next:null}
;
if(fd(e))pd(t,o);
else{
var a=e.alternate;
if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{
var i=t.lastRenderedState,s=a(i,n);
if(o.hasEagerState=!0,o.eagerState=s,Ge(s,i)){
var u=t.interleaved;
u===null?(o.next=o,ki(t)):(o.next=u.next,u.next=o),t.interleaved=o;
return}
}
catch{
}
finally{
}
n=Qc(e,t,o,r),n!==null&&(o=ge(),$e(n,e,r,o),hd(n,t,r))}
}
function fd(e){
var t=e.alternate;
return e===V||t!==null&&t===V}
function pd(e,t){
lr=Do=!0;
var n=e.pending;
n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}
function hd(e,t,n){
if(n&4194240){
var r=t.lanes;
r&=e.pendingLanes,n|=r,t.lanes=n,ii(e,n)}
}
var _o={
readContext:_e,useCallback:ue,useContext:ue,useEffect:ue,useImperativeHandle:ue,useInsertionEffect:ue,useLayoutEffect:ue,useMemo:ue,useReducer:ue,useRef:ue,useState:ue,useDebugValue:ue,useDeferredValue:ue,useTransition:ue,useMutableSource:ue,useSyncExternalStore:ue,useId:ue,unstable_isNewReconciler:!1}
,Bp={
readContext:_e,useCallback:function(e,t){
return Ve().memoizedState=[e,t===void 0?null:t],e}
,useContext:_e,useEffect:Us,useImperativeHandle:function(e,t,n){
return n=n!=null?n.concat([e]):null,uo(4194308,4,id.bind(null,t,e),n)}
,useLayoutEffect:function(e,t){
return uo(4194308,4,e,t)}
,useInsertionEffect:function(e,t){
return uo(4,2,e,t)}
,useMemo:function(e,t){
var n=Ve();
return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e}
,useReducer:function(e,t,n){
var r=Ve();
return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={
pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t}
,r.queue=e,e=e.dispatch=Op.bind(null,V,e),[r.memoizedState,e]}
,useRef:function(e){
var t=Ve();
return e={
current:e}
,t.memoizedState=e}
,useState:Os,useDebugValue:Ii,useDeferredValue:function(e){
return Ve().memoizedState=e}
,useTransition:function(){
var e=Os(!1),t=e[0];
return e=zp.bind(null,e[1]),Ve().memoizedState=e,[t,e]}
,useMutableSource:function(){
}
,useSyncExternalStore:function(e,t,n){
var r=V,o=Ve();
if($){
if(n===void 0)throw Error(C(407));
n=n()}
else{
if(n=t(),oe===null)throw Error(C(349));
Yt&30||Jc(r,t,n)}
o.memoizedState=n;
var a={
value:n,getSnapshot:t}
;
return o.queue=a,Us(td.bind(null,r,a,e),[e]),r.flags|=2048,Sr(9,ed.bind(null,r,a,n,t),void 0,null),n}
,useId:function(){
var e=Ve(),t=oe.identifierPrefix;
if($){
var n=rt,r=nt;
n=(r&~(1<<32-We(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=jr++,0<n&&(t+="H"+n.toString(32)),t+=":"}
else n=Lp++,t=":"+t+"r"+n.toString(32)+":";
return e.memoizedState=t}
,unstable_isNewReconciler:!1}
,Fp={
readContext:_e,useCallback:ud,useContext:_e,useEffect:Ei,useImperativeHandle:sd,useInsertionEffect:ad,useLayoutEffect:ld,useMemo:cd,useReducer:Aa,useRef:od,useState:function(){
return Aa(br)}
,useDebugValue:Ii,useDeferredValue:function(e){
var t=Le();
return dd(t,te.memoizedState,e)}
,useTransition:function(){
var e=Aa(br)[0],t=Le().memoizedState;
return[e,t]}
,useMutableSource:qc,useSyncExternalStore:Zc,useId:md,unstable_isNewReconciler:!1}
,Wp={
readContext:_e,useCallback:ud,useContext:_e,useEffect:Ei,useImperativeHandle:sd,useInsertionEffect:ad,useLayoutEffect:ld,useMemo:cd,useReducer:Ma,useRef:od,useState:function(){
return Ma(br)}
,useDebugValue:Ii,useDeferredValue:function(e){
var t=Le();
return te===null?t.memoizedState=e:dd(t,te.memoizedState,e)}
,useTransition:function(){
var e=Ma(br)[0],t=Le().memoizedState;
return[e,t]}
,useMutableSource:qc,useSyncExternalStore:Zc,useId:md,unstable_isNewReconciler:!1}
;
function Oe(e,t){
if(e&&e.defaultProps){
t=X({
}
,t),e=e.defaultProps;
for(var n in e)t[n]===void 0&&(t[n]=e[n]);
return t}
return t}
function Cl(e,t,n,r){
t=e.memoizedState,n=n(r,t),n=n==null?t:X({
}
,t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}
var Jo={
isMounted:function(e){
return(e=e._reactInternals)?en(e)===e:!1}
,enqueueSetState:function(e,t,n){
e=e._reactInternals;
var r=ge(),o=St(e),a=ot(r,o);
a.payload=t,n!=null&&(a.callback=n),t=jt(e,a,o),t!==null&&($e(t,e,o,r),io(t,e,o))}
,enqueueReplaceState:function(e,t,n){
e=e._reactInternals;
var r=ge(),o=St(e),a=ot(r,o);
a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=jt(e,a,o),t!==null&&($e(t,e,o,r),io(t,e,o))}
,enqueueForceUpdate:function(e,t){
e=e._reactInternals;
var n=ge(),r=St(e),o=ot(n,r);
o.tag=2,t!=null&&(o.callback=t),t=jt(e,o,r),t!==null&&($e(t,e,r,n),io(t,e,r))}
}
;
function Bs(e,t,n,r,o,a,i){
return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,i):t.prototype&&t.prototype.isPureReactComponent?!xr(n,r)||!xr(o,a):!0}
function gd(e,t,n){
var r=!1,o=Et,a=t.contextType;
return typeof a=="object"&&a!==null?a=_e(a):(o=Ce(t)?Xt:fe.current,r=t.contextTypes,a=(r=r!=null)?Tn(e,o):Et),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Jo,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=a),t}
function Fs(e,t,n,r){
e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Jo.enqueueReplaceState(t,t.state,null)}
function jl(e,t,n,r){
var o=e.stateNode;
o.props=n,o.state=e.memoizedState,o.refs={
}
,Ci(e);
var a=t.contextType;
typeof a=="object"&&a!==null?o.context=_e(a):(a=Ce(t)?Xt:fe.current,o.context=Tn(e,a)),o.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(Cl(e,t,a,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&Jo.enqueueReplaceState(o,o.state,null),Ao(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}
function An(e,t){
try{
var n="",r=t;
do n+=gf(r),r=r.return;
while(r);
var o=n}
catch(a){
o=`
Error generating stack: `+a.message+`
`+a.stack}
return{
value:e,source:t,stack:o,digest:null}
}
function Da(e,t,n){
return{
value:e,source:null,stack:n??null,digest:t??null}
}
function bl(e,t){
try{
console.error(t.value)}
catch(n){
setTimeout(function(){
throw n}
)}
}
var $p=typeof WeakMap=="function"?WeakMap:Map;
function xd(e,t,n){
n=ot(-1,n),n.tag=3,n.payload={
element:null}
;
var r=t.value;
return n.callback=function(){
zo||(zo=!0,Dl=r),bl(e,t)}
,n}
function yd(e,t,n){
n=ot(-1,n),n.tag=3;
var r=e.type.getDerivedStateFromError;
if(typeof r=="function"){
var o=t.value;
n.payload=function(){
return r(o)}
,n.callback=function(){
bl(e,t)}
}
var a=e.stateNode;
return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){
bl(e,t),typeof r!="function"&&(bt===null?bt=new Set([this]):bt.add(this));
var i=t.stack;
this.componentDidCatch(t.value,{
componentStack:i!==null?i:""}
)}
),n}
function Ws(e,t,n){
var r=e.pingCache;
if(r===null){
r=e.pingCache=new $p;
var o=new Set;
r.set(t,o)}
else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));
o.has(n)||(o.add(n),e=r0.bind(null,e,t,n),t.then(e,e))}
function $s(e){
do{
var t;
if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;
e=e.return}
while(e!==null);
return null}
function Gs(e,t,n,r,o){
return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=ot(-1,1),t.tag=2,jt(n,t,1))),n.lanes|=1),e)}
var Gp=ut.ReactCurrentOwner,we=!1;
function he(e,t,n,r){
t.child=e===null?Xc(t,null,n,r):In(t,e.child,n,r)}
function Hs(e,t,n,r,o){
n=n.render;
var a=t.ref;
return jn(t,o),r=Pi(e,t,n,r,a,o),n=Ti(),e!==null&&!we?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,st(e,t,o)):($&&n&&hi(t),t.flags|=1,he(e,t,r,o),t.child)}
function Vs(e,t,n,r,o){
if(e===null){
var a=n.type;
return typeof a=="function"&&!Oi(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,vd(e,t,a,r,o)):(e=po(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}
if(a=e.child,!(e.lanes&o)){
var i=a.memoizedProps;
if(n=n.compare,n=n!==null?n:xr,n(i,r)&&e.ref===t.ref)return st(e,t,o)}
return t.flags|=1,e=Nt(a,r),e.ref=t.ref,e.return=t,t.child=e}
function vd(e,t,n,r,o){
if(e!==null){
var a=e.memoizedProps;
if(xr(a,r)&&e.ref===t.ref)if(we=!1,t.pendingProps=r=a,(e.lanes&o)!==0)e.flags&131072&&(we=!0);
else return t.lanes=e.lanes,st(e,t,o)}
return Sl(e,t,n,r,o)}
function wd(e,t,n){
var r=t.pendingProps,o=r.children,a=e!==null?e.memoizedState:null;
if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={
baseLanes:0,cachePool:null,transitions:null}
,U(yn,be),be|=n;
else{
if(!(n&1073741824))return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={
baseLanes:e,cachePool:null,transitions:null}
,t.updateQueue=null,U(yn,be),be|=e,null;
t.memoizedState={
baseLanes:0,cachePool:null,transitions:null}
,r=a!==null?a.baseLanes:n,U(yn,be),be|=r}
else a!==null?(r=a.baseLanes|n,t.memoizedState=null):r=n,U(yn,be),be|=r;
return he(e,t,o,n),t.child}
function kd(e,t){
var n=t.ref;
(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}
function Sl(e,t,n,r,o){
var a=Ce(n)?Xt:fe.current;
return a=Tn(t,a),jn(t,o),n=Pi(e,t,n,r,a,o),r=Ti(),e!==null&&!we?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,st(e,t,o)):($&&r&&hi(t),t.flags|=1,he(e,t,n,o),t.child)}
function Xs(e,t,n,r,o){
if(Ce(n)){
var a=!0;
Po(t)}
else a=!1;
if(jn(t,o),t.stateNode===null)co(e,t),gd(t,n,r),jl(t,n,r,o),r=!0;
else if(e===null){
var i=t.stateNode,s=t.memoizedProps;
i.props=s;
var u=i.context,c=n.contextType;
typeof c=="object"&&c!==null?c=_e(c):(c=Ce(n)?Xt:fe.current,c=Tn(t,c));
var d=n.getDerivedStateFromProps,m=typeof d=="function"||typeof i.getSnapshotBeforeUpdate=="function";
m||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==r||u!==c)&&Fs(t,i,r,c),ft=!1;
var h=t.memoizedState;
i.state=h,Ao(t,r,i,o),u=t.memoizedState,s!==r||h!==u||ke.current||ft?(typeof d=="function"&&(Cl(t,n,d,r),u=t.memoizedState),(s=ft||Bs(t,n,s,r,h,u,c))?(m||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),i.props=r,i.state=u,i.context=c,r=s):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}
else{
i=t.stateNode,Yc(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:Oe(t.type,s),i.props=c,m=t.pendingProps,h=i.context,u=n.contextType,typeof u=="object"&&u!==null?u=_e(u):(u=Ce(n)?Xt:fe.current,u=Tn(t,u));
var x=n.getDerivedStateFromProps;
(d=typeof x=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==m||h!==u)&&Fs(t,i,r,u),ft=!1,h=t.memoizedState,i.state=h,Ao(t,r,i,o);
var w=t.memoizedState;
s!==m||h!==w||ke.current||ft?(typeof x=="function"&&(Cl(t,n,x,r),w=t.memoizedState),(c=ft||Bs(t,n,c,r,h,w,u)||!1)?(d||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,w,u),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,w,u)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=w),i.props=r,i.state=w,i.context=u,r=c):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}
return Nl(e,t,n,r,a,o)}
function Nl(e,t,n,r,o,a){
kd(e,t);
var i=(t.flags&128)!==0;
if(!r&&!i)return o&&As(t,n,!1),st(e,t,a);
r=t.stateNode,Gp.current=t;
var s=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();
return t.flags|=1,e!==null&&i?(t.child=In(t,e.child,null,a),t.child=In(t,null,s,a)):he(e,t,s,a),t.memoizedState=r.state,o&&As(t,n,!0),t.child}
function Cd(e){
var t=e.stateNode;
t.pendingContext?Rs(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Rs(e,t.context,!1),ji(e,t.containerInfo)}
function Qs(e,t,n,r,o){
return En(),xi(o),t.flags|=256,he(e,t,n,r),t.child}
var Pl={
dehydrated:null,treeContext:null,retryLane:0}
;
function Tl(e){
return{
baseLanes:e,cachePool:null,transitions:null}
}
function jd(e,t,n){
var r=t.pendingProps,o=H.current,a=!1,i=(t.flags&128)!==0,s;
if((s=i)||(s=e!==null&&e.memoizedState===null?!1:(o&2)!==0),s?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),U(H,o&1),e===null)return wl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=r.children,e=r.fallback,a?(r=t.mode,a=t.child,i={
mode:"hidden",children:i}
,!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=i):a=na(i,r,0,null),e=Ht(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=Tl(n),t.memoizedState=Pl,e):Ri(t,i));
if(o=e.memoizedState,o!==null&&(s=o.dehydrated,s!==null))return Hp(e,t,i,r,s,o,n);
if(a){
a=r.fallback,i=t.mode,o=e.child,s=o.sibling;
var u={
mode:"hidden",children:r.children}
;
return!(i&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=Nt(o,u),r.subtreeFlags=o.subtreeFlags&14680064),s!==null?a=Nt(s,a):(a=Ht(a,i,n,null),a.flags|=2),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,i=e.child.memoizedState,i=i===null?Tl(n):{
baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions}
,a.memoizedState=i,a.childLanes=e.childLanes&~n,t.memoizedState=Pl,r}
return a=e.child,e=a.sibling,r=Nt(a,{
mode:"visible",children:r.children}
),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}
function Ri(e,t){
return t=na({
mode:"visible",children:t}
,e.mode,0,null),t.return=e,e.child=t}
function Kr(e,t,n,r){
return r!==null&&xi(r),In(t,e.child,null,n),e=Ri(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}
function Hp(e,t,n,r,o,a,i){
if(n)return t.flags&256?(t.flags&=-257,r=Da(Error(C(422))),Kr(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=r.fallback,o=t.mode,r=na({
mode:"visible",children:r.children}
,o,0,null),a=Ht(a,o,i,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,t.mode&1&&In(t,e.child,null,i),t.child.memoizedState=Tl(i),t.memoizedState=Pl,a);
if(!(t.mode&1))return Kr(e,t,i,null);
if(o.data==="$!"){
if(r=o.nextSibling&&o.nextSibling.dataset,r)var s=r.dgst;
return r=s,a=Error(C(419)),r=Da(a,r,void 0),Kr(e,t,i,r)}
if(s=(i&e.childLanes)!==0,we||s){
if(r=oe,r!==null){
switch(i&-i){
case 4:o=2;
break;
case 16:o=8;
break;
case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;
break;
case 536870912:o=268435456;
break;
default:o=0}
o=o&(r.suspendedLanes|i)?0:o,o!==0&&o!==a.retryLane&&(a.retryLane=o,it(e,o),$e(r,e,o,-1))}
return zi(),r=Da(Error(C(421))),Kr(e,t,i,r)}
return o.data==="$?"?(t.flags|=128,t.child=e.child,t=o0.bind(null,e),o._reactRetry=t,null):(e=a.treeContext,Se=Ct(o.nextSibling),Ne=t,$=!0,Be=null,e!==null&&(Re[Ae++]=nt,Re[Ae++]=rt,Re[Ae++]=Qt,nt=e.id,rt=e.overflow,Qt=t),t=Ri(t,r.children),t.flags|=4096,t)}
function Ys(e,t,n){
e.lanes|=t;
var r=e.alternate;
r!==null&&(r.lanes|=t),kl(e.return,t,n)}
function _a(e,t,n,r,o){
var a=e.memoizedState;
a===null?e.memoizedState={
isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}
:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=o)}
function bd(e,t,n){
var r=t.pendingProps,o=r.revealOrder,a=r.tail;
if(he(e,t,r.children,n),r=H.current,r&2)r=r&1|2,t.flags|=128;
else{
if(e!==null&&e.flags&128)e:for(e=t.child;
e!==null;
){
if(e.tag===13)e.memoizedState!==null&&Ys(e,n,t);
else if(e.tag===19)Ys(e,n,t);
else if(e.child!==null){
e.child.return=e,e=e.child;
continue}
if(e===t)break e;
for(;
e.sibling===null;
){
if(e.return===null||e.return===t)break e;
e=e.return}
e.sibling.return=e.return,e=e.sibling}
r&=1}
if(U(H,r),!(t.mode&1))t.memoizedState=null;
else switch(o){
case"forwards":for(n=t.child,o=null;
n!==null;
)e=n.alternate,e!==null&&Mo(e)===null&&(o=n),n=n.sibling;
n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),_a(t,!1,o,n,a);
break;
case"backwards":for(n=null,o=t.child,t.child=null;
o!==null;
){
if(e=o.alternate,e!==null&&Mo(e)===null){
t.child=o;
break}
e=o.sibling,o.sibling=n,n=o,o=e}
_a(t,!0,n,null,a);
break;
case"together":_a(t,!1,null,null,void 0);
break;
default:t.memoizedState=null}
return t.child}
function co(e,t){
!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}
function st(e,t,n){
if(e!==null&&(t.dependencies=e.dependencies),Kt|=t.lanes,!(n&t.childLanes))return null;
if(e!==null&&t.child!==e.child)throw Error(C(153));
if(t.child!==null){
for(e=t.child,n=Nt(e,e.pendingProps),t.child=n,n.return=t;
e.sibling!==null;
)e=e.sibling,n=n.sibling=Nt(e,e.pendingProps),n.return=t;
n.sibling=null}
return t.child}
function Vp(e,t,n){
switch(t.tag){
case 3:Cd(t),En();
break;
case 5:Kc(t);
break;
case 1:Ce(t.type)&&Po(t);
break;
case 4:ji(t,t.stateNode.containerInfo);
break;
case 10:var r=t.type._context,o=t.memoizedProps.value;
U(Io,r._currentValue),r._currentValue=o;
break;
case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(U(H,H.current&1),t.flags|=128,null):n&t.child.childLanes?jd(e,t,n):(U(H,H.current&1),e=st(e,t,n),e!==null?e.sibling:null);
U(H,H.current&1);
break;
case 19:if(r=(n&t.childLanes)!==0,e.flags&128){
if(r)return bd(e,t,n);
t.flags|=128}
if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),U(H,H.current),r)break;
return null;
case 22:case 23:return t.lanes=0,wd(e,t,n)}
return st(e,t,n)}
var Sd,El,Nd,Pd;
Sd=function(e,t){
for(var n=t.child;
n!==null;
){
if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);
else if(n.tag!==4&&n.child!==null){
n.child.return=n,n=n.child;
continue}
if(n===t)break;
for(;
n.sibling===null;
){
if(n.return===null||n.return===t)return;
n=n.return}
n.sibling.return=n.return,n=n.sibling}
}
;
El=function(){
}
;
Nd=function(e,t,n,r){
var o=e.memoizedProps;
if(o!==r){
e=t.stateNode,Wt(Ke.current);
var a=null;
switch(n){
case"input":o=qa(e,o),r=qa(e,r),a=[];
break;
case"select":o=X({
}
,o,{
value:void 0}
),r=X({
}
,r,{
value:void 0}
),a=[];
break;
case"textarea":o=el(e,o),r=el(e,r),a=[];
break;
default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=So)}
nl(n,r);
var i;
n=null;
for(c in o)if(!r.hasOwnProperty(c)&&o.hasOwnProperty(c)&&o[c]!=null)if(c==="style"){
var s=o[c];
for(i in s)s.hasOwnProperty(i)&&(n||(n={
}
),n[i]="")}
else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(cr.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null));
for(c in r){
var u=r[c];
if(s=o!=null?o[c]:void 0,r.hasOwnProperty(c)&&u!==s&&(u!=null||s!=null))if(c==="style")if(s){
for(i in s)!s.hasOwnProperty(i)||u&&u.hasOwnProperty(i)||(n||(n={
}
),n[i]="");
for(i in u)u.hasOwnProperty(i)&&s[i]!==u[i]&&(n||(n={
}
),n[i]=u[i])}
else n||(a||(a=[]),a.push(c,n)),n=u;
else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,s=s?s.__html:void 0,u!=null&&s!==u&&(a=a||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(a=a||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(cr.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&F("scroll",e),a||s===u||(a=[])):(a=a||[]).push(c,u))}
n&&(a=a||[]).push("style",n);
var c=a;
(t.updateQueue=c)&&(t.flags|=4)}
}
;
Pd=function(e,t,n,r){
n!==r&&(t.flags|=4)}
;
function Xn(e,t){
if(!$)switch(e.tailMode){
case"hidden":t=e.tail;
for(var n=null;
t!==null;
)t.alternate!==null&&(n=t),t=t.sibling;
n===null?e.tail=null:n.sibling=null;
break;
case"collapsed":n=e.tail;
for(var r=null;
n!==null;
)n.alternate!==null&&(r=n),n=n.sibling;
r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}
}
function ce(e){
var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;
if(t)for(var o=e.child;
o!==null;
)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;
else for(o=e.child;
o!==null;
)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;
return e.subtreeFlags|=r,e.childLanes=n,t}
function Xp(e,t,n){
var r=t.pendingProps;
switch(gi(t),t.tag){
case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ce(t),null;
case 1:return Ce(t.type)&&No(),ce(t),null;
case 3:return r=t.stateNode,Rn(),W(ke),W(fe),Si(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Qr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Be!==null&&(zl(Be),Be=null))),El(e,t),ce(t),null;
case 5:bi(t);
var o=Wt(Cr.current);
if(n=t.type,e!==null&&t.stateNode!=null)Nd(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);
else{
if(!r){
if(t.stateNode===null)throw Error(C(166));
return ce(t),null}
if(e=Wt(Ke.current),Qr(t)){
r=t.stateNode,n=t.type;
var a=t.memoizedProps;
switch(r[Xe]=t,r[wr]=a,e=(t.mode&1)!==0,n){
case"dialog":F("cancel",r),F("close",r);
break;
case"iframe":case"object":case"embed":F("load",r);
break;
case"video":case"audio":for(o=0;
o<er.length;
o++)F(er[o],r);
break;
case"source":F("error",r);
break;
case"img":case"image":case"link":F("error",r),F("load",r);
break;
case"details":F("toggle",r);
break;
case"input":os(r,a),F("invalid",r);
break;
case"select":r._wrapperState={
wasMultiple:!!a.multiple}
,F("invalid",r);
break;
case"textarea":ls(r,a),F("invalid",r)}
nl(n,a),o=null;
for(var i in a)if(a.hasOwnProperty(i)){
var s=a[i];
i==="children"?typeof s=="string"?r.textContent!==s&&(a.suppressHydrationWarning!==!0&&Xr(r.textContent,s,e),o=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(a.suppressHydrationWarning!==!0&&Xr(r.textContent,s,e),o=["children",""+s]):cr.hasOwnProperty(i)&&s!=null&&i==="onScroll"&&F("scroll",r)}
switch(n){
case"input":Ur(r),as(r,a,!0);
break;
case"textarea":Ur(r),is(r);
break;
case"select":case"option":break;
default:typeof a.onClick=="function"&&(r.onclick=So)}
r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}
else{
i=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=tc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{
is:r.is}
):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[Xe]=t,e[wr]=r,Sd(e,t,!1,!1),t.stateNode=e;
e:{
switch(i=rl(n,r),n){
case"dialog":F("cancel",e),F("close",e),o=r;
break;
case"iframe":case"object":case"embed":F("load",e),o=r;
break;
case"video":case"audio":for(o=0;
o<er.length;
o++)F(er[o],e);
o=r;
break;
case"source":F("error",e),o=r;
break;
case"img":case"image":case"link":F("error",e),F("load",e),o=r;
break;
case"details":F("toggle",e),o=r;
break;
case"input":os(e,r),o=qa(e,r),F("invalid",e);
break;
case"option":o=r;
break;
case"select":e._wrapperState={
wasMultiple:!!r.multiple}
,o=X({
}
,r,{
value:void 0}
),F("invalid",e);
break;
case"textarea":ls(e,r),o=el(e,r),F("invalid",e);
break;
default:o=r}
nl(n,o),s=o;
for(a in s)if(s.hasOwnProperty(a)){
var u=s[a];
a==="style"?oc(e,u):a==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&nc(e,u)):a==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&dr(e,u):typeof u=="number"&&dr(e,""+u):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(cr.hasOwnProperty(a)?u!=null&&a==="onScroll"&&F("scroll",e):u!=null&&ti(e,a,u,i))}
switch(n){
case"input":Ur(e),as(e,r,!1);
break;
case"textarea":Ur(e),is(e);
break;
case"option":r.value!=null&&e.setAttribute("value",""+Tt(r.value));
break;
case"select":e.multiple=!!r.multiple,a=r.value,a!=null?vn(e,!!r.multiple,a,!1):r.defaultValue!=null&&vn(e,!!r.multiple,r.defaultValue,!0);
break;
default:typeof o.onClick=="function"&&(e.onclick=So)}
switch(n){
case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;
break e;
case"img":r=!0;
break e;
default:r=!1}
}
r&&(t.flags|=4)}
t.ref!==null&&(t.flags|=512,t.flags|=2097152)}
return ce(t),null;
case 6:if(e&&t.stateNode!=null)Pd(e,t,e.memoizedProps,r);
else{
if(typeof r!="string"&&t.stateNode===null)throw Error(C(166));
if(n=Wt(Cr.current),Wt(Ke.current),Qr(t)){
if(r=t.stateNode,n=t.memoizedProps,r[Xe]=t,(a=r.nodeValue!==n)&&(e=Ne,e!==null))switch(e.tag){
case 3:Xr(r.nodeValue,n,(e.mode&1)!==0);
break;
case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Xr(r.nodeValue,n,(e.mode&1)!==0)}
a&&(t.flags|=4)}
else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Xe]=t,t.stateNode=r}
return ce(t),null;
case 13:if(W(H),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){
if($&&Se!==null&&t.mode&1&&!(t.flags&128))Hc(),En(),t.flags|=98560,a=!1;
else if(a=Qr(t),r!==null&&r.dehydrated!==null){
if(e===null){
if(!a)throw Error(C(318));
if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(C(317));
a[Xe]=t}
else En(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;
ce(t),a=!1}
else Be!==null&&(zl(Be),Be=null),a=!0;
if(!a)return t.flags&65536?t:null}
return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||H.current&1?ne===0&&(ne=3):zi())),t.updateQueue!==null&&(t.flags|=4),ce(t),null);
case 4:return Rn(),El(e,t),e===null&&yr(t.stateNode.containerInfo),ce(t),null;
case 10:return wi(t.type._context),ce(t),null;
case 17:return Ce(t.type)&&No(),ce(t),null;
case 19:if(W(H),a=t.memoizedState,a===null)return ce(t),null;
if(r=(t.flags&128)!==0,i=a.rendering,i===null)if(r)Xn(a,!1);
else{
if(ne!==0||e!==null&&e.flags&128)for(e=t.child;
e!==null;
){
if(i=Mo(e),i!==null){
for(t.flags|=128,Xn(a,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;
n!==null;
)a=n,e=r,a.flags&=14680066,i=a.alternate,i===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=i.childLanes,a.lanes=i.lanes,a.child=i.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=i.memoizedProps,a.memoizedState=i.memoizedState,a.updateQueue=i.updateQueue,a.type=i.type,e=i.dependencies,a.dependencies=e===null?null:{
lanes:e.lanes,firstContext:e.firstContext}
),n=n.sibling;
return U(H,H.current&1|2),t.child}
e=e.sibling}
a.tail!==null&&K()>Mn&&(t.flags|=128,r=!0,Xn(a,!1),t.lanes=4194304)}
else{
if(!r)if(e=Mo(i),e!==null){
if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Xn(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!$)return ce(t),null}
else 2*K()-a.renderingStartTime>Mn&&n!==1073741824&&(t.flags|=128,r=!0,Xn(a,!1),t.lanes=4194304);
a.isBackwards?(i.sibling=t.child,t.child=i):(n=a.last,n!==null?n.sibling=i:t.child=i,a.last=i)}
return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=K(),t.sibling=null,n=H.current,U(H,r?n&1|2:n&1),t):(ce(t),null);
case 22:case 23:return Li(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?be&1073741824&&(ce(t),t.subtreeFlags&6&&(t.flags|=8192)):ce(t),null;
case 24:return null;
case 25:return null}
throw Error(C(156,t.tag))}
function Qp(e,t){
switch(gi(t),t.tag){
case 1:return Ce(t.type)&&No(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;
case 3:return Rn(),W(ke),W(fe),Si(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;
case 5:return bi(t),null;
case 13:if(W(H),e=t.memoizedState,e!==null&&e.dehydrated!==null){
if(t.alternate===null)throw Error(C(340));
En()}
return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;
case 19:return W(H),null;
case 4:return Rn(),null;
case 10:return wi(t.type._context),null;
case 22:case 23:return Li(),null;
case 24:return null;
default:return null}
}
var qr=!1,me=!1,Yp=typeof WeakSet=="function"?WeakSet:Set,P=null;
function xn(e,t){
var n=e.ref;
if(n!==null)if(typeof n=="function")try{
n(null)}
catch(r){
Q(e,t,r)}
else n.current=null}
function Il(e,t,n){
try{
n()}
catch(r){
Q(e,t,r)}
}
var Ks=!1;
function Kp(e,t){
if(fl=Co,e=Ac(),pi(e)){
if("selectionStart"in e)var n={
start:e.selectionStart,end:e.selectionEnd}
;
else e:{
n=(n=e.ownerDocument)&&n.defaultView||window;
var r=n.getSelection&&n.getSelection();
if(r&&r.rangeCount!==0){
n=r.anchorNode;
var o=r.anchorOffset,a=r.focusNode;
r=r.focusOffset;
try{
n.nodeType,a.nodeType}
catch{
n=null;
break e}
var i=0,s=-1,u=-1,c=0,d=0,m=e,h=null;
t:for(;
;
){
for(var x;
m!==n||o!==0&&m.nodeType!==3||(s=i+o),m!==a||r!==0&&m.nodeType!==3||(u=i+r),m.nodeType===3&&(i+=m.nodeValue.length),(x=m.firstChild)!==null;
)h=m,m=x;
for(;
;
){
if(m===e)break t;
if(h===n&&++c===o&&(s=i),h===a&&++d===r&&(u=i),(x=m.nextSibling)!==null)break;
m=h,h=m.parentNode}
m=x}
n=s===-1||u===-1?null:{
start:s,end:u}
}
else n=null}
n=n||{
start:0,end:0}
}
else n=null;
for(pl={
focusedElem:e,selectionRange:n}
,Co=!1,P=t;
P!==null;
)if(t=P,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,P=e;
else for(;
P!==null;
){
t=P;
try{
var w=t.alternate;
if(t.flags&1024)switch(t.tag){
case 0:case 11:case 15:break;
case 1:if(w!==null){
var k=w.memoizedProps,b=w.memoizedState,p=t.stateNode,f=p.getSnapshotBeforeUpdate(t.elementType===t.type?k:Oe(t.type,k),b);
p.__reactInternalSnapshotBeforeUpdate=f}
break;
case 3:var g=t.stateNode.containerInfo;
g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);
break;
case 5:case 6:case 4:case 17:break;
default:throw Error(C(163))}
}
catch(y){
Q(t,t.return,y)}
if(e=t.sibling,e!==null){
e.return=t.return,P=e;
break}
P=t.return}
return w=Ks,Ks=!1,w}
function ir(e,t,n){
var r=t.updateQueue;
if(r=r!==null?r.lastEffect:null,r!==null){
var o=r=r.next;
do{
if((o.tag&e)===e){
var a=o.destroy;
o.destroy=void 0,a!==void 0&&Il(t,n,a)}
o=o.next}
while(o!==r)}
}
function ea(e,t){
if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){
var n=t=t.next;
do{
if((n.tag&e)===e){
var r=n.create;
n.destroy=r()}
n=n.next}
while(n!==t)}
}
function Rl(e){
var t=e.ref;
if(t!==null){
var n=e.stateNode;
switch(e.tag){
case 5:e=n;
break;
default:e=n}
typeof t=="function"?t(e):t.current=e}
}
function Td(e){
var t=e.alternate;
t!==null&&(e.alternate=null,Td(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Xe],delete t[wr],delete t[xl],delete t[Ap],delete t[Mp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}
function Ed(e){
return e.tag===5||e.tag===3||e.tag===4}
function qs(e){
e:for(;
;
){
for(;
e.sibling===null;
){
if(e.return===null||Ed(e.return))return null;
e=e.return}
for(e.sibling.return=e.return,e=e.sibling;
e.tag!==5&&e.tag!==6&&e.tag!==18;
){
if(e.flags&2||e.child===null||e.tag===4)continue e;
e.child.return=e,e=e.child}
if(!(e.flags&2))return e.stateNode}
}
function Al(e,t,n){
var r=e.tag;
if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=So));
else if(r!==4&&(e=e.child,e!==null))for(Al(e,t,n),e=e.sibling;
e!==null;
)Al(e,t,n),e=e.sibling}
function Ml(e,t,n){
var r=e.tag;
if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);
else if(r!==4&&(e=e.child,e!==null))for(Ml(e,t,n),e=e.sibling;
e!==null;
)Ml(e,t,n),e=e.sibling}
var ae=null,Ue=!1;
function dt(e,t,n){
for(n=n.child;
n!==null;
)Id(e,t,n),n=n.sibling}
function Id(e,t,n){
if(Ye&&typeof Ye.onCommitFiberUnmount=="function")try{
Ye.onCommitFiberUnmount(Vo,n)}
catch{
}
switch(n.tag){
case 5:me||xn(n,t);
case 6:var r=ae,o=Ue;
ae=null,dt(e,t,n),ae=r,Ue=o,ae!==null&&(Ue?(e=ae,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ae.removeChild(n.stateNode));
break;
case 18:ae!==null&&(Ue?(e=ae,n=n.stateNode,e.nodeType===8?Ta(e.parentNode,n):e.nodeType===1&&Ta(e,n),hr(e)):Ta(ae,n.stateNode));
break;
case 4:r=ae,o=Ue,ae=n.stateNode.containerInfo,Ue=!0,dt(e,t,n),ae=r,Ue=o;
break;
case 0:case 11:case 14:case 15:if(!me&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){
o=r=r.next;
do{
var a=o,i=a.destroy;
a=a.tag,i!==void 0&&(a&2||a&4)&&Il(n,t,i),o=o.next}
while(o!==r)}
dt(e,t,n);
break;
case 1:if(!me&&(xn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{
r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}
catch(s){
Q(n,t,s)}
dt(e,t,n);
break;
case 21:dt(e,t,n);
break;
case 22:n.mode&1?(me=(r=me)||n.memoizedState!==null,dt(e,t,n),me=r):dt(e,t,n);
break;
default:dt(e,t,n)}
}
function Zs(e){
var t=e.updateQueue;
if(t!==null){
e.updateQueue=null;
var n=e.stateNode;
n===null&&(n=e.stateNode=new Yp),t.forEach(function(r){
var o=a0.bind(null,e,r);
n.has(r)||(n.add(r),r.then(o,o))}
)}
}
function ze(e,t){
var n=t.deletions;
if(n!==null)for(var r=0;
r<n.length;
r++){
var o=n[r];
try{
var a=e,i=t,s=i;
e:for(;
s!==null;
){
switch(s.tag){
case 5:ae=s.stateNode,Ue=!1;
break e;
case 3:ae=s.stateNode.containerInfo,Ue=!0;
break e;
case 4:ae=s.stateNode.containerInfo,Ue=!0;
break e}
s=s.return}
if(ae===null)throw Error(C(160));
Id(a,i,o),ae=null,Ue=!1;
var u=o.alternate;
u!==null&&(u.return=null),o.return=null}
catch(c){
Q(o,t,c)}
}
if(t.subtreeFlags&12854)for(t=t.child;
t!==null;
)Rd(t,e),t=t.sibling}
function Rd(e,t){
var n=e.alternate,r=e.flags;
switch(e.tag){
case 0:case 11:case 14:case 15:if(ze(t,e),He(e),r&4){
try{
ir(3,e,e.return),ea(3,e)}
catch(k){
Q(e,e.return,k)}
try{
ir(5,e,e.return)}
catch(k){
Q(e,e.return,k)}
}
break;
case 1:ze(t,e),He(e),r&512&&n!==null&&xn(n,n.return);
break;
case 5:if(ze(t,e),He(e),r&512&&n!==null&&xn(n,n.return),e.flags&32){
var o=e.stateNode;
try{
dr(o,"")}
catch(k){
Q(e,e.return,k)}
}
if(r&4&&(o=e.stateNode,o!=null)){
var a=e.memoizedProps,i=n!==null?n.memoizedProps:a,s=e.type,u=e.updateQueue;
if(e.updateQueue=null,u!==null)try{
s==="input"&&a.type==="radio"&&a.name!=null&&Ju(o,a),rl(s,i);
var c=rl(s,a);
for(i=0;
i<u.length;
i+=2){
var d=u[i],m=u[i+1];
d==="style"?oc(o,m):d==="dangerouslySetInnerHTML"?nc(o,m):d==="children"?dr(o,m):ti(o,d,m,c)}
switch(s){
case"input":Za(o,a);
break;
case"textarea":ec(o,a);
break;
case"select":var h=o._wrapperState.wasMultiple;
o._wrapperState.wasMultiple=!!a.multiple;
var x=a.value;
x!=null?vn(o,!!a.multiple,x,!1):h!==!!a.multiple&&(a.defaultValue!=null?vn(o,!!a.multiple,a.defaultValue,!0):vn(o,!!a.multiple,a.multiple?[]:"",!1))}
o[wr]=a}
catch(k){
Q(e,e.return,k)}
}
break;
case 6:if(ze(t,e),He(e),r&4){
if(e.stateNode===null)throw Error(C(162));
o=e.stateNode,a=e.memoizedProps;
try{
o.nodeValue=a}
catch(k){
Q(e,e.return,k)}
}
break;
case 3:if(ze(t,e),He(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{
hr(t.containerInfo)}
catch(k){
Q(e,e.return,k)}
break;
case 4:ze(t,e),He(e);
break;
case 13:ze(t,e),He(e),o=e.child,o.flags&8192&&(a=o.memoizedState!==null,o.stateNode.isHidden=a,!a||o.alternate!==null&&o.alternate.memoizedState!==null||(Di=K())),r&4&&Zs(e);
break;
case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(me=(c=me)||d,ze(t,e),me=c):ze(t,e),He(e),r&8192){
if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!d&&e.mode&1)for(P=e,d=e.child;
d!==null;
){
for(m=P=d;
P!==null;
){
switch(h=P,x=h.child,h.tag){
case 0:case 11:case 14:case 15:ir(4,h,h.return);
break;
case 1:xn(h,h.return);
var w=h.stateNode;
if(typeof w.componentWillUnmount=="function"){
r=h,n=h.return;
try{
t=r,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}
catch(k){
Q(r,n,k)}
}
break;
case 5:xn(h,h.return);
break;
case 22:if(h.memoizedState!==null){
eu(m);
continue}
}
x!==null?(x.return=h,P=x):eu(m)}
d=d.sibling}
e:for(d=null,m=e;
;
){
if(m.tag===5){
if(d===null){
d=m;
try{
o=m.stateNode,c?(a=o.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(s=m.stateNode,u=m.memoizedProps.style,i=u!=null&&u.hasOwnProperty("display")?u.display:null,s.style.display=rc("display",i))}
catch(k){
Q(e,e.return,k)}
}
}
else if(m.tag===6){
if(d===null)try{
m.stateNode.nodeValue=c?"":m.memoizedProps}
catch(k){
Q(e,e.return,k)}
}
else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){
m.child.return=m,m=m.child;
continue}
if(m===e)break e;
for(;
m.sibling===null;
){
if(m.return===null||m.return===e)break e;
d===m&&(d=null),m=m.return}
d===m&&(d=null),m.sibling.return=m.return,m=m.sibling}
}
break;
case 19:ze(t,e),He(e),r&4&&Zs(e);
break;
case 21:break;
default:ze(t,e),He(e)}
}
function He(e){
var t=e.flags;
if(t&2){
try{
e:{
for(var n=e.return;
n!==null;
){
if(Ed(n)){
var r=n;
break e}
n=n.return}
throw Error(C(160))}
switch(r.tag){
case 5:var o=r.stateNode;
r.flags&32&&(dr(o,""),r.flags&=-33);
var a=qs(e);
Ml(e,a,o);
break;
case 3:case 4:var i=r.stateNode.containerInfo,s=qs(e);
Al(e,s,i);
break;
default:throw Error(C(161))}
}
catch(u){
Q(e,e.return,u)}
e.flags&=-3}
t&4096&&(e.flags&=-4097)}
function qp(e,t,n){
P=e,Ad(e)}
function Ad(e,t,n){
for(var r=(e.mode&1)!==0;
P!==null;
){
var o=P,a=o.child;
if(o.tag===22&&r){
var i=o.memoizedState!==null||qr;
if(!i){
var s=o.alternate,u=s!==null&&s.memoizedState!==null||me;
s=qr;
var c=me;
if(qr=i,(me=u)&&!c)for(P=o;
P!==null;
)i=P,u=i.child,i.tag===22&&i.memoizedState!==null?tu(o):u!==null?(u.return=i,P=u):tu(o);
for(;
a!==null;
)P=a,Ad(a),a=a.sibling;
P=o,qr=s,me=c}
Js(e)}
else o.subtreeFlags&8772&&a!==null?(a.return=o,P=a):Js(e)}
}
function Js(e){
for(;
P!==null;
){
var t=P;
if(t.flags&8772){
var n=t.alternate;
try{
if(t.flags&8772)switch(t.tag){
case 0:case 11:case 15:me||ea(5,t);
break;
case 1:var r=t.stateNode;
if(t.flags&4&&!me)if(n===null)r.componentDidMount();
else{
var o=t.elementType===t.type?n.memoizedProps:Oe(t.type,n.memoizedProps);
r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}
var a=t.updateQueue;
a!==null&&zs(t,a,r);
break;
case 3:var i=t.updateQueue;
if(i!==null){
if(n=null,t.child!==null)switch(t.child.tag){
case 5:n=t.child.stateNode;
break;
case 1:n=t.child.stateNode}
zs(t,i,n)}
break;
case 5:var s=t.stateNode;
if(n===null&&t.flags&4){
n=s;
var u=t.memoizedProps;
switch(t.type){
case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();
break;
case"img":u.src&&(n.src=u.src)}
}
break;
case 6:break;
case 4:break;
case 12:break;
case 13:if(t.memoizedState===null){
var c=t.alternate;
if(c!==null){
var d=c.memoizedState;
if(d!==null){
var m=d.dehydrated;
m!==null&&hr(m)}
}
}
break;
case 19:case 17:case 21:case 22:case 23:case 25:break;
default:throw Error(C(163))}
me||t.flags&512&&Rl(t)}
catch(h){
Q(t,t.return,h)}
}
if(t===e){
P=null;
break}
if(n=t.sibling,n!==null){
n.return=t.return,P=n;
break}
P=t.return}
}
function eu(e){
for(;
P!==null;
){
var t=P;
if(t===e){
P=null;
break}
var n=t.sibling;
if(n!==null){
n.return=t.return,P=n;
break}
P=t.return}
}
function tu(e){
for(;
P!==null;
){
var t=P;
try{
switch(t.tag){
case 0:case 11:case 15:var n=t.return;
try{
ea(4,t)}
catch(u){
Q(t,n,u)}
break;
case 1:var r=t.stateNode;
if(typeof r.componentDidMount=="function"){
var o=t.return;
try{
r.componentDidMount()}
catch(u){
Q(t,o,u)}
}
var a=t.return;
try{
Rl(t)}
catch(u){
Q(t,a,u)}
break;
case 5:var i=t.return;
try{
Rl(t)}
catch(u){
Q(t,i,u)}
}
}
catch(u){
Q(t,t.return,u)}
if(t===e){
P=null;
break}
var s=t.sibling;
if(s!==null){
s.return=t.return,P=s;
break}
P=t.return}
}
var Zp=Math.ceil,Lo=ut.ReactCurrentDispatcher,Ai=ut.ReactCurrentOwner,De=ut.ReactCurrentBatchConfig,L=0,oe=null,J=null,ie=0,be=0,yn=Rt(0),ne=0,Nr=null,Kt=0,ta=0,Mi=0,sr=null,ve=null,Di=0,Mn=1/0,et=null,zo=!1,Dl=null,bt=null,Zr=!1,xt=null,Oo=0,ur=0,_l=null,mo=-1,fo=0;
function ge(){
return L&6?K():mo!==-1?mo:mo=K()}
function St(e){
return e.mode&1?L&2&&ie!==0?ie&-ie:_p.transition!==null?(fo===0&&(fo=gc()),fo):(e=z,e!==0||(e=window.event,e=e===void 0?16:jc(e.type)),e):1}
function $e(e,t,n,r){
if(50<ur)throw ur=0,_l=null,Error(C(185));
Ir(e,n,r),(!(L&2)||e!==oe)&&(e===oe&&(!(L&2)&&(ta|=n),ne===4&&ht(e,ie)),je(e,r),n===1&&L===0&&!(t.mode&1)&&(Mn=K()+500,qo&&At()))}
function je(e,t){
var n=e.callbackNode;
_f(e,t);
var r=ko(e,e===oe?ie:0);
if(r===0)n!==null&&cs(n),e.callbackNode=null,e.callbackPriority=0;
else if(t=r&-r,e.callbackPriority!==t){
if(n!=null&&cs(n),t===1)e.tag===0?Dp(nu.bind(null,e)):Wc(nu.bind(null,e)),Ip(function(){
!(L&6)&&At()}
),n=null;
else{
switch(xc(r)){
case 1:n=li;
break;
case 4:n=pc;
break;
case 16:n=wo;
break;
case 536870912:n=hc;
break;
default:n=wo}
n=Bd(n,Md.bind(null,e))}
e.callbackPriority=t,e.callbackNode=n}
}
function Md(e,t){
if(mo=-1,fo=0,L&6)throw Error(C(327));
var n=e.callbackNode;
if(bn()&&e.callbackNode!==n)return null;
var r=ko(e,e===oe?ie:0);
if(r===0)return null;
if(r&30||r&e.expiredLanes||t)t=Uo(e,r);
else{
t=r;
var o=L;
L|=2;
var a=_d();
(oe!==e||ie!==t)&&(et=null,Mn=K()+500,Gt(e,t));
do try{
t0();
break}
catch(s){
Dd(e,s)}
while(!0);
vi(),Lo.current=a,L=o,J!==null?t=0:(oe=null,ie=0,t=ne)}
if(t!==0){
if(t===2&&(o=sl(e),o!==0&&(r=o,t=Ll(e,o))),t===1)throw n=Nr,Gt(e,0),ht(e,r),je(e,K()),n;
if(t===6)ht(e,r);
else{
if(o=e.current.alternate,!(r&30)&&!Jp(o)&&(t=Uo(e,r),t===2&&(a=sl(e),a!==0&&(r=a,t=Ll(e,a))),t===1))throw n=Nr,Gt(e,0),ht(e,r),je(e,K()),n;
switch(e.finishedWork=o,e.finishedLanes=r,t){
case 0:case 1:throw Error(C(345));
case 2:Ot(e,ve,et);
break;
case 3:if(ht(e,r),(r&130023424)===r&&(t=Di+500-K(),10<t)){
if(ko(e,0)!==0)break;
if(o=e.suspendedLanes,(o&r)!==r){
ge(),e.pingedLanes|=e.suspendedLanes&o;
break}
e.timeoutHandle=gl(Ot.bind(null,e,ve,et),t);
break}
Ot(e,ve,et);
break;
case 4:if(ht(e,r),(r&4194240)===r)break;
for(t=e.eventTimes,o=-1;
0<r;
){
var i=31-We(r);
a=1<<i,i=t[i],i>o&&(o=i),r&=~a}
if(r=o,r=K()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Zp(r/1960))-r,10<r){
e.timeoutHandle=gl(Ot.bind(null,e,ve,et),r);
break}
Ot(e,ve,et);
break;
case 5:Ot(e,ve,et);
break;
default:throw Error(C(329))}
}
}
return je(e,K()),e.callbackNode===n?Md.bind(null,e):null}
function Ll(e,t){
var n=sr;
return e.current.memoizedState.isDehydrated&&(Gt(e,t).flags|=256),e=Uo(e,t),e!==2&&(t=ve,ve=n,t!==null&&zl(t)),e}
function zl(e){
ve===null?ve=e:ve.push.apply(ve,e)}
function Jp(e){
for(var t=e;
;
){
if(t.flags&16384){
var n=t.updateQueue;
if(n!==null&&(n=n.stores,n!==null))for(var r=0;
r<n.length;
r++){
var o=n[r],a=o.getSnapshot;
o=o.value;
try{
if(!Ge(a(),o))return!1}
catch{
return!1}
}
}
if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;
else{
if(t===e)break;
for(;
t.sibling===null;
){
if(t.return===null||t.return===e)return!0;
t=t.return}
t.sibling.return=t.return,t=t.sibling}
}
return!0}
function ht(e,t){
for(t&=~Mi,t&=~ta,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;
0<t;
){
var n=31-We(t),r=1<<n;
e[n]=-1,t&=~r}
}
function nu(e){
if(L&6)throw Error(C(327));
bn();
var t=ko(e,0);
if(!(t&1))return je(e,K()),null;
var n=Uo(e,t);
if(e.tag!==0&&n===2){
var r=sl(e);
r!==0&&(t=r,n=Ll(e,r))}
if(n===1)throw n=Nr,Gt(e,0),ht(e,t),je(e,K()),n;
if(n===6)throw Error(C(345));
return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ot(e,ve,et),je(e,K()),null}
function _i(e,t){
var n=L;
L|=1;
try{
return e(t)}
finally{
L=n,L===0&&(Mn=K()+500,qo&&At())}
}
function qt(e){
xt!==null&&xt.tag===0&&!(L&6)&&bn();
var t=L;
L|=1;
var n=De.transition,r=z;
try{
if(De.transition=null,z=1,e)return e()}
finally{
z=r,De.transition=n,L=t,!(L&6)&&At()}
}
function Li(){
be=yn.current,W(yn)}
function Gt(e,t){
e.finishedWork=null,e.finishedLanes=0;
var n=e.timeoutHandle;
if(n!==-1&&(e.timeoutHandle=-1,Ep(n)),J!==null)for(n=J.return;
n!==null;
){
var r=n;
switch(gi(r),r.tag){
case 1:r=r.type.childContextTypes,r!=null&&No();
break;
case 3:Rn(),W(ke),W(fe),Si();
break;
case 5:bi(r);
break;
case 4:Rn();
break;
case 13:W(H);
break;
case 19:W(H);
break;
case 10:wi(r.type._context);
break;
case 22:case 23:Li()}
n=n.return}
if(oe=e,J=e=Nt(e.current,null),ie=be=t,ne=0,Nr=null,Mi=ta=Kt=0,ve=sr=null,Ft!==null){
for(t=0;
t<Ft.length;
t++)if(n=Ft[t],r=n.interleaved,r!==null){
n.interleaved=null;
var o=r.next,a=n.pending;
if(a!==null){
var i=a.next;
a.next=o,r.next=i}
n.pending=r}
Ft=null}
return e}
function Dd(e,t){
do{
var n=J;
try{
if(vi(),so.current=_o,Do){
for(var r=V.memoizedState;
r!==null;
){
var o=r.queue;
o!==null&&(o.pending=null),r=r.next}
Do=!1}
if(Yt=0,re=te=V=null,lr=!1,jr=0,Ai.current=null,n===null||n.return===null){
ne=1,Nr=t,J=null;
break}
e:{
var a=e,i=n.return,s=n,u=t;
if(t=ie,s.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){
var c=u,d=s,m=d.tag;
if(!(d.mode&1)&&(m===0||m===11||m===15)){
var h=d.alternate;
h?(d.updateQueue=h.updateQueue,d.memoizedState=h.memoizedState,d.lanes=h.lanes):(d.updateQueue=null,d.memoizedState=null)}
var x=$s(i);
if(x!==null){
x.flags&=-257,Gs(x,i,s,a,t),x.mode&1&&Ws(a,c,t),t=x,u=c;
var w=t.updateQueue;
if(w===null){
var k=new Set;
k.add(u),t.updateQueue=k}
else w.add(u);
break e}
else{
if(!(t&1)){
Ws(a,c,t),zi();
break e}
u=Error(C(426))}
}
else if($&&s.mode&1){
var b=$s(i);
if(b!==null){
!(b.flags&65536)&&(b.flags|=256),Gs(b,i,s,a,t),xi(An(u,s));
break e}
}
a=u=An(u,s),ne!==4&&(ne=2),sr===null?sr=[a]:sr.push(a),a=i;
do{
switch(a.tag){
case 3:a.flags|=65536,t&=-t,a.lanes|=t;
var p=xd(a,u,t);
Ls(a,p);
break e;
case 1:s=u;
var f=a.type,g=a.stateNode;
if(!(a.flags&128)&&(typeof f.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(bt===null||!bt.has(g)))){
a.flags|=65536,t&=-t,a.lanes|=t;
var y=yd(a,s,t);
Ls(a,y);
break e}
}
a=a.return}
while(a!==null)}
zd(n)}
catch(j){
t=j,J===n&&n!==null&&(J=n=n.return);
continue}
break}
while(!0)}
function _d(){
var e=Lo.current;
return Lo.current=_o,e===null?_o:e}
function zi(){
(ne===0||ne===3||ne===2)&&(ne=4),oe===null||!(Kt&268435455)&&!(ta&268435455)||ht(oe,ie)}
function Uo(e,t){
var n=L;
L|=2;
var r=_d();
(oe!==e||ie!==t)&&(et=null,Gt(e,t));
do try{
e0();
break}
catch(o){
Dd(e,o)}
while(!0);
if(vi(),L=n,Lo.current=r,J!==null)throw Error(C(261));
return oe=null,ie=0,ne}
function e0(){
for(;
J!==null;
)Ld(J)}
function t0(){
for(;
J!==null&&!Nf();
)Ld(J)}
function Ld(e){
var t=Ud(e.alternate,e,be);
e.memoizedProps=e.pendingProps,t===null?zd(e):J=t,Ai.current=null}
function zd(e){
var t=e;
do{
var n=t.alternate;
if(e=t.return,t.flags&32768){
if(n=Qp(n,t),n!==null){
n.flags&=32767,J=n;
return}
if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;
else{
ne=6,J=null;
return}
}
else if(n=Xp(n,t,be),n!==null){
J=n;
return}
if(t=t.sibling,t!==null){
J=t;
return}
J=t=e}
while(t!==null);
ne===0&&(ne=5)}
function Ot(e,t,n){
var r=z,o=De.transition;
try{
De.transition=null,z=1,n0(e,t,n,r)}
finally{
De.transition=o,z=r}
return null}
function n0(e,t,n,r){
do bn();
while(xt!==null);
if(L&6)throw Error(C(327));
n=e.finishedWork;
var o=e.finishedLanes;
if(n===null)return null;
if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(C(177));
e.callbackNode=null,e.callbackPriority=0;
var a=n.lanes|n.childLanes;
if(Lf(e,a),e===oe&&(J=oe=null,ie=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Zr||(Zr=!0,Bd(wo,function(){
return bn(),null}
)),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){
a=De.transition,De.transition=null;
var i=z;
z=1;
var s=L;
L|=4,Ai.current=null,Kp(e,n),Rd(n,e),Cp(pl),Co=!!fl,pl=fl=null,e.current=n,qp(n),Pf(),L=s,z=i,De.transition=a}
else e.current=n;
if(Zr&&(Zr=!1,xt=e,Oo=o),a=e.pendingLanes,a===0&&(bt=null),If(n.stateNode),je(e,K()),t!==null)for(r=e.onRecoverableError,n=0;
n<t.length;
n++)o=t[n],r(o.value,{
componentStack:o.stack,digest:o.digest}
);
if(zo)throw zo=!1,e=Dl,Dl=null,e;
return Oo&1&&e.tag!==0&&bn(),a=e.pendingLanes,a&1?e===_l?ur++:(ur=0,_l=e):ur=0,At(),null}
function bn(){
if(xt!==null){
var e=xc(Oo),t=De.transition,n=z;
try{
if(De.transition=null,z=16>e?16:e,xt===null)var r=!1;
else{
if(e=xt,xt=null,Oo=0,L&6)throw Error(C(331));
var o=L;
for(L|=4,P=e.current;
P!==null;
){
var a=P,i=a.child;
if(P.flags&16){
var s=a.deletions;
if(s!==null){
for(var u=0;
u<s.length;
u++){
var c=s[u];
for(P=c;
P!==null;
){
var d=P;
switch(d.tag){
case 0:case 11:case 15:ir(8,d,a)}
var m=d.child;
if(m!==null)m.return=d,P=m;
else for(;
P!==null;
){
d=P;
var h=d.sibling,x=d.return;
if(Td(d),d===c){
P=null;
break}
if(h!==null){
h.return=x,P=h;
break}
P=x}
}
}
var w=a.alternate;
if(w!==null){
var k=w.child;
if(k!==null){
w.child=null;
do{
var b=k.sibling;
k.sibling=null,k=b}
while(k!==null)}
}
P=a}
}
if(a.subtreeFlags&2064&&i!==null)i.return=a,P=i;
else e:for(;
P!==null;
){
if(a=P,a.flags&2048)switch(a.tag){
case 0:case 11:case 15:ir(9,a,a.return)}
var p=a.sibling;
if(p!==null){
p.return=a.return,P=p;
break e}
P=a.return}
}
var f=e.current;
for(P=f;
P!==null;
){
i=P;
var g=i.child;
if(i.subtreeFlags&2064&&g!==null)g.return=i,P=g;
else e:for(i=f;
P!==null;
){
if(s=P,s.flags&2048)try{
switch(s.tag){
case 0:case 11:case 15:ea(9,s)}
}
catch(j){
Q(s,s.return,j)}
if(s===i){
P=null;
break e}
var y=s.sibling;
if(y!==null){
y.return=s.return,P=y;
break e}
P=s.return}
}
if(L=o,At(),Ye&&typeof Ye.onPostCommitFiberRoot=="function")try{
Ye.onPostCommitFiberRoot(Vo,e)}
catch{
}
r=!0}
return r}
finally{
z=n,De.transition=t}
}
return!1}
function ru(e,t,n){
t=An(n,t),t=xd(e,t,1),e=jt(e,t,1),t=ge(),e!==null&&(Ir(e,1,t),je(e,t))}
function Q(e,t,n){
if(e.tag===3)ru(e,e,n);
else for(;
t!==null;
){
if(t.tag===3){
ru(t,e,n);
break}
else if(t.tag===1){
var r=t.stateNode;
if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(bt===null||!bt.has(r))){
e=An(n,e),e=yd(t,e,1),t=jt(t,e,1),e=ge(),t!==null&&(Ir(t,1,e),je(t,e));
break}
}
t=t.return}
}
function r0(e,t,n){
var r=e.pingCache;
r!==null&&r.delete(t),t=ge(),e.pingedLanes|=e.suspendedLanes&n,oe===e&&(ie&n)===n&&(ne===4||ne===3&&(ie&130023424)===ie&&500>K()-Di?Gt(e,0):Mi|=n),je(e,t)}
function Od(e,t){
t===0&&(e.mode&1?(t=Wr,Wr<<=1,!(Wr&130023424)&&(Wr=4194304)):t=1);
var n=ge();
e=it(e,t),e!==null&&(Ir(e,t,n),je(e,n))}
function o0(e){
var t=e.memoizedState,n=0;
t!==null&&(n=t.retryLane),Od(e,n)}
function a0(e,t){
var n=0;
switch(e.tag){
case 13:var r=e.stateNode,o=e.memoizedState;
o!==null&&(n=o.retryLane);
break;
case 19:r=e.stateNode;
break;
default:throw Error(C(314))}
r!==null&&r.delete(t),Od(e,n)}
var Ud;
Ud=function(e,t,n){
if(e!==null)if(e.memoizedProps!==t.pendingProps||ke.current)we=!0;
else{
if(!(e.lanes&n)&&!(t.flags&128))return we=!1,Vp(e,t,n);
we=!!(e.flags&131072)}
else we=!1,$&&t.flags&1048576&&$c(t,Eo,t.index);
switch(t.lanes=0,t.tag){
case 2:var r=t.type;
co(e,t),e=t.pendingProps;
var o=Tn(t,fe.current);
jn(t,n),o=Pi(null,t,r,e,o,n);
var a=Ti();
return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ce(r)?(a=!0,Po(t)):a=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Ci(t),o.updater=Jo,t.stateNode=o,o._reactInternals=t,jl(t,r,e,n),t=Nl(null,t,r,!0,a,n)):(t.tag=0,$&&a&&hi(t),he(null,t,o,n),t=t.child),t;
case 16:r=t.elementType;
e:{
switch(co(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=i0(r),e=Oe(r,e),o){
case 0:t=Sl(null,t,r,e,n);
break e;
case 1:t=Xs(null,t,r,e,n);
break e;
case 11:t=Hs(null,t,r,e,n);
break e;
case 14:t=Vs(null,t,r,Oe(r.type,e),n);
break e}
throw Error(C(306,r,""))}
return t;
case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Oe(r,o),Sl(e,t,r,o,n);
case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Oe(r,o),Xs(e,t,r,o,n);
case 3:e:{
if(Cd(t),e===null)throw Error(C(387));
r=t.pendingProps,a=t.memoizedState,o=a.element,Yc(e,t),Ao(t,r,null,n);
var i=t.memoizedState;
if(r=i.element,a.isDehydrated)if(a={
element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions}
,t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){
o=An(Error(C(423)),t),t=Qs(e,t,r,n,o);
break e}
else if(r!==o){
o=An(Error(C(424)),t),t=Qs(e,t,r,n,o);
break e}
else for(Se=Ct(t.stateNode.containerInfo.firstChild),Ne=t,$=!0,Be=null,n=Xc(t,null,r,n),t.child=n;
n;
)n.flags=n.flags&-3|4096,n=n.sibling;
else{
if(En(),r===o){
t=st(e,t,n);
break e}
he(e,t,r,n)}
t=t.child}
return t;
case 5:return Kc(t),e===null&&wl(t),r=t.type,o=t.pendingProps,a=e!==null?e.memoizedProps:null,i=o.children,hl(r,o)?i=null:a!==null&&hl(r,a)&&(t.flags|=32),kd(e,t),he(e,t,i,n),t.child;
case 6:return e===null&&wl(t),null;
case 13:return jd(e,t,n);
case 4:return ji(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=In(t,null,r,n):he(e,t,r,n),t.child;
case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Oe(r,o),Hs(e,t,r,o,n);
case 7:return he(e,t,t.pendingProps,n),t.child;
case 8:return he(e,t,t.pendingProps.children,n),t.child;
case 12:return he(e,t,t.pendingProps.children,n),t.child;
case 10:e:{
if(r=t.type._context,o=t.pendingProps,a=t.memoizedProps,i=o.value,U(Io,r._currentValue),r._currentValue=i,a!==null)if(Ge(a.value,i)){
if(a.children===o.children&&!ke.current){
t=st(e,t,n);
break e}
}
else for(a=t.child,a!==null&&(a.return=t);
a!==null;
){
var s=a.dependencies;
if(s!==null){
i=a.child;
for(var u=s.firstContext;
u!==null;
){
if(u.context===r){
if(a.tag===1){
u=ot(-1,n&-n),u.tag=2;
var c=a.updateQueue;
if(c!==null){
c=c.shared;
var d=c.pending;
d===null?u.next=u:(u.next=d.next,d.next=u),c.pending=u}
}
a.lanes|=n,u=a.alternate,u!==null&&(u.lanes|=n),kl(a.return,n,t),s.lanes|=n;
break}
u=u.next}
}
else if(a.tag===10)i=a.type===t.type?null:a.child;
else if(a.tag===18){
if(i=a.return,i===null)throw Error(C(341));
i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),kl(i,n,t),i=a.sibling}
else i=a.child;
if(i!==null)i.return=a;
else for(i=a;
i!==null;
){
if(i===t){
i=null;
break}
if(a=i.sibling,a!==null){
a.return=i.return,i=a;
break}
i=i.return}
a=i}
he(e,t,o.children,n),t=t.child}
return t;
case 9:return o=t.type,r=t.pendingProps.children,jn(t,n),o=_e(o),r=r(o),t.flags|=1,he(e,t,r,n),t.child;
case 14:return r=t.type,o=Oe(r,t.pendingProps),o=Oe(r.type,o),Vs(e,t,r,o,n);
case 15:return vd(e,t,t.type,t.pendingProps,n);
case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Oe(r,o),co(e,t),t.tag=1,Ce(r)?(e=!0,Po(t)):e=!1,jn(t,n),gd(t,r,o),jl(t,r,o,n),Nl(null,t,r,!0,e,n);
case 19:return bd(e,t,n);
case 22:return wd(e,t,n)}
throw Error(C(156,t.tag))}
;
function Bd(e,t){
return fc(e,t)}
function l0(e,t,n,r){
this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}
function Me(e,t,n,r){
return new l0(e,t,n,r)}
function Oi(e){
return e=e.prototype,!(!e||!e.isReactComponent)}
function i0(e){
if(typeof e=="function")return Oi(e)?1:0;
if(e!=null){
if(e=e.$$typeof,e===ri)return 11;
if(e===oi)return 14}
return 2}
function Nt(e,t){
var n=e.alternate;
return n===null?(n=Me(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{
lanes:t.lanes,firstContext:t.firstContext}
,n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}
function po(e,t,n,r,o,a){
var i=2;
if(r=e,typeof e=="function")Oi(e)&&(i=1);
else if(typeof e=="string")i=5;
else e:switch(e){
case sn:return Ht(n.children,o,a,t);
case ni:i=8,o|=8;
break;
case Xa:return e=Me(12,n,t,o|2),e.elementType=Xa,e.lanes=a,e;
case Qa:return e=Me(13,n,t,o),e.elementType=Qa,e.lanes=a,e;
case Ya:return e=Me(19,n,t,o),e.elementType=Ya,e.lanes=a,e;
case Ku:return na(n,o,a,t);
default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){
case Qu:i=10;
break e;
case Yu:i=9;
break e;
case ri:i=11;
break e;
case oi:i=14;
break e;
case mt:i=16,r=null;
break e}
throw Error(C(130,e==null?e:typeof e,""))}
return t=Me(i,n,t,o),t.elementType=e,t.type=r,t.lanes=a,t}
function Ht(e,t,n,r){
return e=Me(7,e,r,t),e.lanes=n,e}
function na(e,t,n,r){
return e=Me(22,e,r,t),e.elementType=Ku,e.lanes=n,e.stateNode={
isHidden:!1}
,e}
function La(e,t,n){
return e=Me(6,e,null,t),e.lanes=n,e}
function za(e,t,n){
return t=Me(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={
containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation}
,t}
function s0(e,t,n,r,o){
this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=xa(0),this.expirationTimes=xa(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=xa(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}
function Ui(e,t,n,r,o,a,i,s,u){
return e=new s0(e,t,n,s,u),t===1?(t=1,a===!0&&(t|=8)):t=0,a=Me(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={
element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null}
,Ci(a),e}
function u0(e,t,n){
var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;
return{
$$typeof:ln,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}
}
function Fd(e){
if(!e)return Et;
e=e._reactInternals;
e:{
if(en(e)!==e||e.tag!==1)throw Error(C(170));
var t=e;
do{
switch(t.tag){
case 3:t=t.stateNode.context;
break e;
case 1:if(Ce(t.type)){
t=t.stateNode.__reactInternalMemoizedMergedChildContext;
break e}
}
t=t.return}
while(t!==null);
throw Error(C(171))}
if(e.tag===1){
var n=e.type;
if(Ce(n))return Fc(e,n,t)}
return t}
function Wd(e,t,n,r,o,a,i,s,u){
return e=Ui(n,r,!0,e,o,a,i,s,u),e.context=Fd(null),n=e.current,r=ge(),o=St(n),a=ot(r,o),a.callback=t??null,jt(n,a,o),e.current.lanes=o,Ir(e,o,r),je(e,r),e}
function ra(e,t,n,r){
var o=t.current,a=ge(),i=St(o);
return n=Fd(n),t.context===null?t.context=n:t.pendingContext=n,t=ot(a,i),t.payload={
element:e}
,r=r===void 0?null:r,r!==null&&(t.callback=r),e=jt(o,t,i),e!==null&&($e(e,o,i,a),io(e,o,i)),i}
function Bo(e){
if(e=e.current,!e.child)return null;
switch(e.child.tag){
case 5:return e.child.stateNode;
default:return e.child.stateNode}
}
function ou(e,t){
if(e=e.memoizedState,e!==null&&e.dehydrated!==null){
var n=e.retryLane;
e.retryLane=n!==0&&n<t?n:t}
}
function Bi(e,t){
ou(e,t),(e=e.alternate)&&ou(e,t)}
function c0(){
return null}
var $d=typeof reportError=="function"?reportError:function(e){
console.error(e)}
;
function Fi(e){
this._internalRoot=e}
oa.prototype.render=Fi.prototype.render=function(e){
var t=this._internalRoot;
if(t===null)throw Error(C(409));
ra(e,t,null,null)}
;
oa.prototype.unmount=Fi.prototype.unmount=function(){
var e=this._internalRoot;
if(e!==null){
this._internalRoot=null;
var t=e.containerInfo;
qt(function(){
ra(null,e,null,null)}
),t[lt]=null}
}
;
function oa(e){
this._internalRoot=e}
oa.prototype.unstable_scheduleHydration=function(e){
if(e){
var t=wc();
e={
blockedOn:null,target:e,priority:t}
;
for(var n=0;
n<pt.length&&t!==0&&t<pt[n].priority;
n++);
pt.splice(n,0,e),n===0&&Cc(e)}
}
;
function Wi(e){
return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}
function aa(e){
return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}
function au(){
}
function d0(e,t,n,r,o){
if(o){
if(typeof r=="function"){
var a=r;
r=function(){
var c=Bo(i);
a.call(c)}
}
var i=Wd(t,r,e,0,null,!1,!1,"",au);
return e._reactRootContainer=i,e[lt]=i.current,yr(e.nodeType===8?e.parentNode:e),qt(),i}
for(;
o=e.lastChild;
)e.removeChild(o);
if(typeof r=="function"){
var s=r;
r=function(){
var c=Bo(u);
s.call(c)}
}
var u=Ui(e,0,!1,null,null,!1,!1,"",au);
return e._reactRootContainer=u,e[lt]=u.current,yr(e.nodeType===8?e.parentNode:e),qt(function(){
ra(t,u,n,r)}
),u}
function la(e,t,n,r,o){
var a=n._reactRootContainer;
if(a){
var i=a;
if(typeof o=="function"){
var s=o;
o=function(){
var u=Bo(i);
s.call(u)}
}
ra(t,i,e,o)}
else i=d0(n,t,e,o,r);
return Bo(i)}
yc=function(e){
switch(e.tag){
case 3:var t=e.stateNode;
if(t.current.memoizedState.isDehydrated){
var n=Jn(t.pendingLanes);
n!==0&&(ii(t,n|1),je(t,K()),!(L&6)&&(Mn=K()+500,At()))}
break;
case 13:qt(function(){
var r=it(e,1);
if(r!==null){
var o=ge();
$e(r,e,1,o)}
}
),Bi(e,1)}
}
;
si=function(e){
if(e.tag===13){
var t=it(e,134217728);
if(t!==null){
var n=ge();
$e(t,e,134217728,n)}
Bi(e,134217728)}
}
;
vc=function(e){
if(e.tag===13){
var t=St(e),n=it(e,t);
if(n!==null){
var r=ge();
$e(n,e,t,r)}
Bi(e,t)}
}
;
wc=function(){
return z}
;
kc=function(e,t){
var n=z;
try{
return z=e,t()}
finally{
z=n}
}
;
al=function(e,t,n){
switch(t){
case"input":if(Za(e,n),t=n.name,n.type==="radio"&&t!=null){
for(n=e;
n.parentNode;
)n=n.parentNode;
for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;
t<n.length;
t++){
var r=n[t];
if(r!==e&&r.form===e.form){
var o=Ko(r);
if(!o)throw Error(C(90));
Zu(r),Za(r,o)}
}
}
break;
case"textarea":ec(e,n);
break;
case"select":t=n.value,t!=null&&vn(e,!!n.multiple,t,!1)}
}
;
ic=_i;
sc=qt;
var m0={
usingClientEntryPoint:!1,Events:[Ar,mn,Ko,ac,lc,_i]}
,Qn={
findFiberByHostInstance:Bt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"}
,f0={
bundleType:Qn.bundleType,version:Qn.version,rendererPackageName:Qn.rendererPackageName,rendererConfig:Qn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ut.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){
return e=dc(e),e===null?null:e.stateNode}
,findFiberByHostInstance:Qn.findFiberByHostInstance||c0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"}
;
if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){
var Jr=__REACT_DEVTOOLS_GLOBAL_HOOK__;
if(!Jr.isDisabled&&Jr.supportsFiber)try{
Vo=Jr.inject(f0),Ye=Jr}
catch{
}
}
Te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=m0;
Te.createPortal=function(e,t){
var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;
if(!Wi(t))throw Error(C(200));
return u0(e,t,null,n)}
;
Te.createRoot=function(e,t){
if(!Wi(e))throw Error(C(299));
var n=!1,r="",o=$d;
return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=Ui(e,1,!1,null,null,n,!1,r,o),e[lt]=t.current,yr(e.nodeType===8?e.parentNode:e),new Fi(t)}
;
Te.findDOMNode=function(e){
if(e==null)return null;
if(e.nodeType===1)return e;
var t=e._reactInternals;
if(t===void 0)throw typeof e.render=="function"?Error(C(188)):(e=Object.keys(e).join(","),Error(C(268,e)));
return e=dc(t),e=e===null?null:e.stateNode,e}
;
Te.flushSync=function(e){
return qt(e)}
;
Te.hydrate=function(e,t,n){
if(!aa(t))throw Error(C(200));
return la(null,e,t,!0,n)}
;
Te.hydrateRoot=function(e,t,n){
if(!Wi(e))throw Error(C(405));
var r=n!=null&&n.hydratedSources||null,o=!1,a="",i=$d;
if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=Wd(t,null,e,1,n??null,o,!1,a,i),e[lt]=t.current,yr(e),r)for(e=0;
e<r.length;
e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);
return new oa(t)}
;
Te.render=function(e,t,n){
if(!aa(t))throw Error(C(200));
return la(null,e,t,!1,n)}
;
Te.unmountComponentAtNode=function(e){
if(!aa(e))throw Error(C(40));
return e._reactRootContainer?(qt(function(){
la(null,null,e,!1,function(){
e._reactRootContainer=null,e[lt]=null}
)}
),!0):!1}
;
Te.unstable_batchedUpdates=_i;
Te.unstable_renderSubtreeIntoContainer=function(e,t,n,r){
if(!aa(n))throw Error(C(200));
if(e==null||e._reactInternals===void 0)throw Error(C(38));
return la(e,t,n,!1,r)}
;
Te.version="18.3.1-next-f1338f8080-20240426";
function Gd(){
if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{
__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Gd)}
catch(e){
console.error(e)}
}
Gd(),Gu.exports=Te;
var p0=Gu.exports,Hd,lu=p0;
Hd=lu.createRoot,lu.hydrateRoot;
var h0=typeof Element<"u",g0=typeof Map=="function",x0=typeof Set=="function",y0=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;
function ho(e,t){
if(e===t)return!0;
if(e&&t&&typeof e=="object"&&typeof t=="object"){
if(e.constructor!==t.constructor)return!1;
var n,r,o;
if(Array.isArray(e)){
if(n=e.length,n!=t.length)return!1;
for(r=n;
r--!==0;
)if(!ho(e[r],t[r]))return!1;
return!0}
var a;
if(g0&&e instanceof Map&&t instanceof Map){
if(e.size!==t.size)return!1;
for(a=e.entries();
!(r=a.next()).done;
)if(!t.has(r.value[0]))return!1;
for(a=e.entries();
!(r=a.next()).done;
)if(!ho(r.value[1],t.get(r.value[0])))return!1;
return!0}
if(x0&&e instanceof Set&&t instanceof Set){
if(e.size!==t.size)return!1;
for(a=e.entries();
!(r=a.next()).done;
)if(!t.has(r.value[0]))return!1;
return!0}
if(y0&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){
if(n=e.length,n!=t.length)return!1;
for(r=n;
r--!==0;
)if(e[r]!==t[r])return!1;
return!0}
if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;
if(e.valueOf!==Object.prototype.valueOf&&typeof e.valueOf=="function"&&typeof t.valueOf=="function")return e.valueOf()===t.valueOf();
if(e.toString!==Object.prototype.toString&&typeof e.toString=="function"&&typeof t.toString=="function")return e.toString()===t.toString();
if(o=Object.keys(e),n=o.length,n!==Object.keys(t).length)return!1;
for(r=n;
r--!==0;
)if(!Object.prototype.hasOwnProperty.call(t,o[r]))return!1;
if(h0&&e instanceof Element)return!1;
for(r=n;
r--!==0;
)if(!((o[r]==="_owner"||o[r]==="__v"||o[r]==="__o")&&e.$$typeof)&&!ho(e[o[r]],t[o[r]]))return!1;
return!0}
return e!==e&&t!==t}
var v0=function(t,n){
try{
return ho(t,n)}
catch(r){
if((r.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;
throw r}
}
;
const w0=Go(v0);
var k0=function(e,t,n,r,o,a,i,s){
if(!e){
var u;
if(t===void 0)u=new Error("Minified exception occurred;
 use the non-minified dev environment for the full error message and additional helpful warnings.");
else{
var c=[n,r,o,a,i,s],d=0;
u=new Error(t.replace(/%s/g,function(){
return c[d++]}
)),u.name="Invariant Violation"}
throw u.framesToPop=1,u}
}
,C0=k0;
const iu=Go(C0);
var j0=function(t,n,r,o){
var a=r?r.call(o,t,n):void 0;
if(a!==void 0)return!!a;
if(t===n)return!0;
if(typeof t!="object"||!t||typeof n!="object"||!n)return!1;
var i=Object.keys(t),s=Object.keys(n);
if(i.length!==s.length)return!1;
for(var u=Object.prototype.hasOwnProperty.bind(n),c=0;
c<i.length;
c++){
var d=i[c];
if(!u(d))return!1;
var m=t[d],h=n[d];
if(a=r?r.call(o,m,h,d):void 0,a===!1||a===void 0&&m!==h)return!1}
return!0}
;
const b0=Go(j0);
var Vd=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(Vd||{
}
),Oa={
link:{
rel:["amphtml","canonical","alternate"]}
,script:{
type:["application/ld+json"]}
,meta:{
charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}
}
,su=Object.values(Vd),$i={
accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"}
,S0=Object.entries($i).reduce((e,[t,n])=>(e[n]=t,e),{
}
),Fe="data-rh",Sn={
DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"}
,Nn=(e,t)=>{
for(let n=e.length-1;
n>=0;
n-=1){
const r=e[n];
if(Object.prototype.hasOwnProperty.call(r,t))return r[t]}
return null}
,N0=e=>{
let t=Nn(e,"title");
const n=Nn(e,Sn.TITLE_TEMPLATE);
if(Array.isArray(t)&&(t=t.join("")),n&&t)return n.replace(/%s/g,()=>t);
const r=Nn(e,Sn.DEFAULT_TITLE);
return t||r||void 0}
,P0=e=>Nn(e,Sn.ON_CHANGE_CLIENT_STATE)||(()=>{
}
),Ua=(e,t)=>t.filter(n=>typeof n[e]<"u").map(n=>n[e]).reduce((n,r)=>({
...n,...r}
),{
}
),T0=(e,t)=>t.filter(n=>typeof n.base<"u").map(n=>n.base).reverse().reduce((n,r)=>{
if(!n.length){
const o=Object.keys(r);
for(let a=0;
a<o.length;
a+=1){
const s=o[a].toLowerCase();
if(e.indexOf(s)!==-1&&r[s])return n.concat(r)}
}
return n}
,[]),E0=e=>console&&typeof console.warn=="function"&&console.warn(e),Yn=(e,t,n)=>{
const r={
}
;
return n.filter(o=>Array.isArray(o[e])?!0:(typeof o[e]<"u"&&E0(`Helmet: ${
e}
 should be of type "Array". Instead found type "${
typeof o[e]}
"`),!1)).map(o=>o[e]).reverse().reduce((o,a)=>{
const i={
}
;
a.filter(u=>{
let c;
const d=Object.keys(u);
for(let h=0;
h<d.length;
h+=1){
const x=d[h],w=x.toLowerCase();
t.indexOf(w)!==-1&&!(c==="rel"&&u[c].toLowerCase()==="canonical")&&!(w==="rel"&&u[w].toLowerCase()==="stylesheet")&&(c=w),t.indexOf(x)!==-1&&(x==="innerHTML"||x==="cssText"||x==="itemprop")&&(c=x)}
if(!c||!u[c])return!1;
const m=u[c].toLowerCase();
return r[c]||(r[c]={
}
),i[c]||(i[c]={
}
),r[c][m]?!1:(i[c][m]=!0,!0)}
).reverse().forEach(u=>o.push(u));
const s=Object.keys(i);
for(let u=0;
u<s.length;
u+=1){
const c=s[u],d={
...r[c],...i[c]}
;
r[c]=d}
return o}
,[]).reverse()}
,I0=(e,t)=>{
if(Array.isArray(e)&&e.length){
for(let n=0;
n<e.length;
n+=1)if(e[n][t])return!0}
return!1}
,R0=e=>({
baseTag:T0(["href"],e),bodyAttributes:Ua("bodyAttributes",e),defer:Nn(e,Sn.DEFER),encode:Nn(e,Sn.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:Ua("htmlAttributes",e),linkTags:Yn("link",["rel","href"],e),metaTags:Yn("meta",["name","charset","http-equiv","property","itemprop"],e),noscriptTags:Yn("noscript",["innerHTML"],e),onChangeClientState:P0(e),scriptTags:Yn("script",["src","innerHTML"],e),styleTags:Yn("style",["cssText"],e),title:N0(e),titleAttributes:Ua("titleAttributes",e),prioritizeSeoTags:I0(e,Sn.PRIORITIZE_SEO_TAGS)}
),Xd=e=>Array.isArray(e)?e.join(""):e,A0=(e,t)=>{
const n=Object.keys(e);
for(let r=0;
r<n.length;
r+=1)if(t[n[r]]&&t[n[r]].includes(e[n[r]]))return!0;
return!1}
,Ba=(e,t)=>Array.isArray(e)?e.reduce((n,r)=>(A0(r,t)?n.priority.push(r):n.default.push(r),n),{
priority:[],default:[]}
):{
default:e,priority:[]}
,uu=(e,t)=>({
...e,[t]:void 0}
),M0=["noscript","script","style"],Ol=(e,t=!0)=>t===!1?String(e):String(e).replace(/&/g,"&amp;
").replace(/</g,"&lt;
").replace(/>/g,"&gt;
").replace(/"/g,"&quot;
").replace(/'/g,"&#x27;
"),Qd=e=>Object.keys(e).reduce((t,n)=>{
const r=typeof e[n]<"u"?`${
n}
="${
e[n]}
"`:`${
n}
`;
return t?`${
t}
 ${
r}
`:r}
,""),D0=(e,t,n,r)=>{
const o=Qd(n),a=Xd(t);
return o?`<${
e}
 ${
Fe}
="true" ${
o}
>${
Ol(a,r)}
</${
e}
>`:`<${
e}
 ${
Fe}
="true">${
Ol(a,r)}
</${
e}
>`}
,_0=(e,t,n=!0)=>t.reduce((r,o)=>{
const a=o,i=Object.keys(a).filter(c=>!(c==="innerHTML"||c==="cssText")).reduce((c,d)=>{
const m=typeof a[d]>"u"?d:`${
d}
="${
Ol(a[d],n)}
"`;
return c?`${
c}
 ${
m}
`:m}
,""),s=a.innerHTML||a.cssText||"",u=M0.indexOf(e)===-1;
return`${
r}
<${
e}
 ${
Fe}
="true" ${
i}
${
u?"/>":`>${
s}
</${
e}
>`}
`}
,""),Yd=(e,t={
}
)=>Object.keys(e).reduce((n,r)=>{
const o=$i[r];
return n[o||r]=e[r],n}
,t),L0=(e,t,n)=>{
const r={
key:t,[Fe]:!0}
,o=Yd(n,r);
return[I.createElement("title",o,t)]}
,go=(e,t)=>t.map((n,r)=>{
const o={
key:r,[Fe]:!0}
;
return Object.keys(n).forEach(a=>{
const s=$i[a]||a;
if(s==="innerHTML"||s==="cssText"){
const u=n.innerHTML||n.cssText;
o.dangerouslySetInnerHTML={
__html:u}
}
else o[s]=n[a]}
),I.createElement(e,o)}
),Ie=(e,t,n=!0)=>{
switch(e){
case"title":return{
toComponent:()=>L0(e,t.title,t.titleAttributes),toString:()=>D0(e,t.title,t.titleAttributes,n)}
;
case"bodyAttributes":case"htmlAttributes":return{
toComponent:()=>Yd(t),toString:()=>Qd(t)}
;
default:return{
toComponent:()=>go(e,t),toString:()=>_0(e,t,n)}
}
}
,z0=({
metaTags:e,linkTags:t,scriptTags:n,encode:r}
)=>{
const o=Ba(e,Oa.meta),a=Ba(t,Oa.link),i=Ba(n,Oa.script);
return{
priorityMethods:{
toComponent:()=>[...go("meta",o.priority),...go("link",a.priority),...go("script",i.priority)],toString:()=>`${
Ie("meta",o.priority,r)}
 ${
Ie("link",a.priority,r)}
 ${
Ie("script",i.priority,r)}
`}
,metaTags:o.default,linkTags:a.default,scriptTags:i.default}
}
,O0=e=>{
const{
baseTag:t,bodyAttributes:n,encode:r=!0,htmlAttributes:o,noscriptTags:a,styleTags:i,title:s="",titleAttributes:u,prioritizeSeoTags:c}
=e;
let{
linkTags:d,metaTags:m,scriptTags:h}
=e,x={
toComponent:()=>{
}
,toString:()=>""}
;
return c&&({
priorityMethods:x,linkTags:d,metaTags:m,scriptTags:h}
=z0(e)),{
priority:x,base:Ie("base",t,r),bodyAttributes:Ie("bodyAttributes",n,r),htmlAttributes:Ie("htmlAttributes",o,r),link:Ie("link",d,r),meta:Ie("meta",m,r),noscript:Ie("noscript",a,r),script:Ie("script",h,r),style:Ie("style",i,r),title:Ie("title",{
title:s,titleAttributes:u}
,r)}
}
,Ul=O0,eo=[],Kd=!!(typeof window<"u"&&window.document&&window.document.createElement),Bl=class{
constructor(e,t){
Je(this,"instances",[]);
Je(this,"canUseDOM",Kd);
Je(this,"context");
Je(this,"value",{
setHelmet:e=>{
this.context.helmet=e}
,helmetInstances:{
get:()=>this.canUseDOM?eo:this.instances,add:e=>{
(this.canUseDOM?eo:this.instances).push(e)}
,remove:e=>{
const t=(this.canUseDOM?eo:this.instances).indexOf(e);
(this.canUseDOM?eo:this.instances).splice(t,1)}
}
}
);
this.context=e,this.canUseDOM=t||!1,t||(e.helmet=Ul({
baseTag:[],bodyAttributes:{
}
,htmlAttributes:{
}
,linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{
}
}
))}
}
,U0={
}
,qd=I.createContext(U0),$t,Zd=($t=class extends v.Component{
constructor(n){
super(n);
Je(this,"helmetData");
this.helmetData=new Bl(this.props.context||{
}
,$t.canUseDOM)}
render(){
return I.createElement(qd.Provider,{
value:this.helmetData.value}
,this.props.children)}
}
,Je($t,"canUseDOM",Kd),$t),on=(e,t)=>{
const n=document.head||document.querySelector("head"),r=n.querySelectorAll(`${
e}
[${
Fe}
]`),o=[].slice.call(r),a=[];
let i;
return t&&t.length&&t.forEach(s=>{
const u=document.createElement(e);
for(const c in s)if(Object.prototype.hasOwnProperty.call(s,c))if(c==="innerHTML")u.innerHTML=s.innerHTML;
else if(c==="cssText")u.styleSheet?u.styleSheet.cssText=s.cssText:u.appendChild(document.createTextNode(s.cssText));
else{
const d=c,m=typeof s[d]>"u"?"":s[d];
u.setAttribute(c,m)}
u.setAttribute(Fe,"true"),o.some((c,d)=>(i=d,u.isEqualNode(c)))?o.splice(i,1):a.push(u)}
),o.forEach(s=>{
var u;
return(u=s.parentNode)==null?void 0:u.removeChild(s)}
),a.forEach(s=>n.appendChild(s)),{
oldTags:o,newTags:a}
}
,Fl=(e,t)=>{
const n=document.getElementsByTagName(e)[0];
if(!n)return;
const r=n.getAttribute(Fe),o=r?r.split(","):[],a=[...o],i=Object.keys(t);
for(const s of i){
const u=t[s]||"";
n.getAttribute(s)!==u&&n.setAttribute(s,u),o.indexOf(s)===-1&&o.push(s);
const c=a.indexOf(s);
c!==-1&&a.splice(c,1)}
for(let s=a.length-1;
s>=0;
s-=1)n.removeAttribute(a[s]);
o.length===a.length?n.removeAttribute(Fe):n.getAttribute(Fe)!==i.join(",")&&n.setAttribute(Fe,i.join(","))}
,B0=(e,t)=>{
typeof e<"u"&&document.title!==e&&(document.title=Xd(e)),Fl("title",t)}
,cu=(e,t)=>{
const{
baseTag:n,bodyAttributes:r,htmlAttributes:o,linkTags:a,metaTags:i,noscriptTags:s,onChangeClientState:u,scriptTags:c,styleTags:d,title:m,titleAttributes:h}
=e;
Fl("body",r),Fl("html",o),B0(m,h);
const x={
baseTag:on("base",n),linkTags:on("link",a),metaTags:on("meta",i),noscriptTags:on("noscript",s),scriptTags:on("script",c),styleTags:on("style",d)}
,w={
}
,k={
}
;
Object.keys(x).forEach(b=>{
const{
newTags:p,oldTags:f}
=x[b];
p.length&&(w[b]=p),f.length&&(k[b]=x[b].oldTags)}
),t&&t(),u(e,w,k)}
,Kn=null,F0=e=>{
Kn&&cancelAnimationFrame(Kn),e.defer?Kn=requestAnimationFrame(()=>{
cu(e,()=>{
Kn=null}
)}
):(cu(e),Kn=null)}
,W0=F0,du=class extends v.Component{
constructor(){
super(...arguments);
Je(this,"rendered",!1)}
shouldComponentUpdate(t){
return!b0(t,this.props)}
componentDidUpdate(){
this.emitChange()}
componentWillUnmount(){
const{
helmetInstances:t}
=this.props.context;
t.remove(this),this.emitChange()}
emitChange(){
const{
helmetInstances:t,setHelmet:n}
=this.props.context;
let r=null;
const o=R0(t.get().map(a=>{
const i={
...a.props}
;
return delete i.context,i}
));
Zd.canUseDOM?W0(o):Ul&&(r=Ul(o)),n(r)}
init(){
if(this.rendered)return;
this.rendered=!0;
const{
helmetInstances:t}
=this.props.context;
t.add(this),this.emitChange()}
render(){
return this.init(),null}
}
,Ha,Gi=(Ha=class extends v.Component{
shouldComponentUpdate(e){
return!w0(uu(this.props,"helmetData"),uu(e,"helmetData"))}
mapNestedChildrenToProps(e,t){
if(!t)return null;
switch(e.type){
case"script":case"noscript":return{
innerHTML:t}
;
case"style":return{
cssText:t}
;
default:throw new Error(`<${
e.type}
 /> elements are self-closing and can not contain children. Refer to our API for more information.`)}
}
flattenArrayTypeChildren(e,t,n,r){
return{
...t,[e.type]:[...t[e.type]||[],{
...n,...this.mapNestedChildrenToProps(e,r)}
]}
}
mapObjectTypeChildren(e,t,n,r){
switch(e.type){
case"title":return{
...t,[e.type]:r,titleAttributes:{
...n}
}
;
case"body":return{
...t,bodyAttributes:{
...n}
}
;
case"html":return{
...t,htmlAttributes:{
...n}
}
;
default:return{
...t,[e.type]:{
...n}
}
}
}
mapArrayTypeChildrenToProps(e,t){
let n={
...t}
;
return Object.keys(e).forEach(r=>{
n={
...n,[r]:e[r]}
}
),n}
warnOnInvalidChildren(e,t){
return iu(su.some(n=>e.type===n),typeof e.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${
su.join(", ")}
 are allowed. Helmet does not support rendering <${
e.type}
> elements. Refer to our API for more information.`),iu(!t||typeof t=="string"||Array.isArray(t)&&!t.some(n=>typeof n!="string"),`Helmet expects a string as a child of <${
e.type}
>. Did you forget to wrap your children in braces? ( <${
e.type}
>{
\`\`}
</${
e.type}
> ) Refer to our API for more information.`),!0}
mapChildrenToProps(e,t){
let n={
}
;
return I.Children.forEach(e,r=>{
if(!r||!r.props)return;
const{
children:o,...a}
=r.props,i=Object.keys(a).reduce((u,c)=>(u[S0[c]||c]=a[c],u),{
}
);
let{
type:s}
=r;
switch(typeof s=="symbol"?s=s.toString():this.warnOnInvalidChildren(r,o),s){
case"Symbol(react.fragment)":t=this.mapChildrenToProps(o,t);
break;
case"link":case"meta":case"noscript":case"script":case"style":n=this.flattenArrayTypeChildren(r,n,i,o);
break;
default:t=this.mapObjectTypeChildren(r,t,i,o);
break}
}
),this.mapArrayTypeChildrenToProps(n,t)}
render(){
const{
children:e,...t}
=this.props;
let n={
...t}
,{
helmetData:r}
=t;
if(e&&(n=this.mapChildrenToProps(e,n)),r&&!(r instanceof Bl)){
const o=r;
r=new Bl(o.context,!0),delete n.helmetData}
return r?I.createElement(du,{
...n,context:r.value}
):I.createElement(qd.Consumer,null,o=>I.createElement(du,{
...n,context:o}
))}
}
,Je(Ha,"defaultProps",{
defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}
),Ha);
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Pr(){
return Pr=Object.assign?Object.assign.bind():function(e){
for(var t=1;
t<arguments.length;
t++){
var n=arguments[t];
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}
return e}
,Pr.apply(this,arguments)}
var yt;
(function(e){
e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"}
)(yt||(yt={
}
));
const mu="popstate";
function $0(e){
e===void 0&&(e={
}
);
function t(r,o){
let{
pathname:a,search:i,hash:s}
=r.location;
return Wl("",{
pathname:a,search:i,hash:s}
,o.state&&o.state.usr||null,o.state&&o.state.key||"default")}
function n(r,o){
return typeof o=="string"?o:Fo(o)}
return H0(t,n,null,e)}
function q(e,t){
if(e===!1||e===null||typeof e>"u")throw new Error(t)}
function Jd(e,t){
if(!e){
typeof console<"u"&&console.warn(t);
try{
throw new Error(t)}
catch{
}
}
}
function G0(){
return Math.random().toString(36).substr(2,8)}
function fu(e,t){
return{
usr:e.state,key:e.key,idx:t}
}
function Wl(e,t,n,r){
return n===void 0&&(n=null),Pr({
pathname:typeof e=="string"?e:e.pathname,search:"",hash:""}
,typeof t=="string"?On(t):t,{
state:n,key:t&&t.key||r||G0()}
)}
function Fo(e){
let{
pathname:t="/",search:n="",hash:r=""}
=e;
return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}
function On(e){
let t={
}
;
if(e){
let n=e.indexOf("#");
n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));
let r=e.indexOf("?");
r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}
return t}
function H0(e,t,n,r){
r===void 0&&(r={
}
);
let{
window:o=document.defaultView,v5Compat:a=!1}
=r,i=o.history,s=yt.Pop,u=null,c=d();
c==null&&(c=0,i.replaceState(Pr({
}
,i.state,{
idx:c}
),""));
function d(){
return(i.state||{
idx:null}
).idx}
function m(){
s=yt.Pop;
let b=d(),p=b==null?null:b-c;
c=b,u&&u({
action:s,location:k.location,delta:p}
)}
function h(b,p){
s=yt.Push;
let f=Wl(k.location,b,p);
c=d()+1;
let g=fu(f,c),y=k.createHref(f);
try{
i.pushState(g,"",y)}
catch(j){
if(j instanceof DOMException&&j.name==="DataCloneError")throw j;
o.location.assign(y)}
a&&u&&u({
action:s,location:k.location,delta:1}
)}
function x(b,p){
s=yt.Replace;
let f=Wl(k.location,b,p);
c=d();
let g=fu(f,c),y=k.createHref(f);
i.replaceState(g,"",y),a&&u&&u({
action:s,location:k.location,delta:0}
)}
function w(b){
let p=o.location.origin!=="null"?o.location.origin:o.location.href,f=typeof b=="string"?b:Fo(b);
return f=f.replace(/ $/,"%20"),q(p,"No window.location.(origin|href) available to create URL for href: "+f),new URL(f,p)}
let k={
get action(){
return s}
,get location(){
return e(o,i)}
,listen(b){
if(u)throw new Error("A history only accepts one active listener");
return o.addEventListener(mu,m),u=b,()=>{
o.removeEventListener(mu,m),u=null}
}
,createHref(b){
return t(o,b)}
,createURL:w,encodeLocation(b){
let p=w(b);
return{
pathname:p.pathname,search:p.search,hash:p.hash}
}
,push:h,replace:x,go(b){
return i.go(b)}
}
;
return k}
var pu;
(function(e){
e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"}
)(pu||(pu={
}
));
function V0(e,t,n){
return n===void 0&&(n="/"),X0(e,t,n)}
function X0(e,t,n,r){
let o=typeof t=="string"?On(t):t,a=Hi(o.pathname||"/",n);
if(a==null)return null;
let i=em(e);
Q0(i);
let s=null;
for(let u=0;
s==null&&u<i.length;
++u){
let c=lh(a);
s=rh(i[u],c)}
return s}
function em(e,t,n,r){
t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");
let o=(a,i,s)=>{
let u={
relativePath:s===void 0?a.path||"":s,caseSensitive:a.caseSensitive===!0,childrenIndex:i,route:a}
;
u.relativePath.startsWith("/")&&(q(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));
let c=Pt([r,u.relativePath]),d=n.concat(u);
a.children&&a.children.length>0&&(q(a.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),em(a.children,t,d,c)),!(a.path==null&&!a.index)&&t.push({
path:c,score:th(c,a.index),routesMeta:d}
)}
;
return e.forEach((a,i)=>{
var s;
if(a.path===""||!((s=a.path)!=null&&s.includes("?")))o(a,i);
else for(let u of tm(a.path))o(a,i,u)}
),t}
function tm(e){
let t=e.split("/");
if(t.length===0)return[];
let[n,...r]=t,o=n.endsWith("?"),a=n.replace(/\?$/,"");
if(r.length===0)return o?[a,""]:[a];
let i=tm(r.join("/")),s=[];
return s.push(...i.map(u=>u===""?a:[a,u].join("/"))),o&&s.push(...i),s.map(u=>e.startsWith("/")&&u===""?"/":u)}
function Q0(e){
e.sort((t,n)=>t.score!==n.score?n.score-t.score:nh(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}
const Y0=/^:[\w-]+$/,K0=3,q0=2,Z0=1,J0=10,eh=-2,hu=e=>e==="*";
function th(e,t){
let n=e.split("/"),r=n.length;
return n.some(hu)&&(r+=eh),t&&(r+=q0),n.filter(o=>!hu(o)).reduce((o,a)=>o+(Y0.test(a)?K0:a===""?Z0:J0),r)}
function nh(e,t){
return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}
function rh(e,t,n){
let{
routesMeta:r}
=e,o={
}
,a="/",i=[];
for(let s=0;
s<r.length;
++s){
let u=r[s],c=s===r.length-1,d=a==="/"?t:t.slice(a.length)||"/",m=oh({
path:u.relativePath,caseSensitive:u.caseSensitive,end:c}
,d),h=u.route;
if(!m)return null;
Object.assign(o,m.params),i.push({
params:o,pathname:Pt([a,m.pathname]),pathnameBase:ch(Pt([a,m.pathnameBase])),route:h}
),m.pathnameBase!=="/"&&(a=Pt([a,m.pathnameBase]))}
return i}
function oh(e,t){
typeof e=="string"&&(e={
path:e,caseSensitive:!1,end:!0}
);
let[n,r]=ah(e.path,e.caseSensitive,e.end),o=t.match(n);
if(!o)return null;
let a=o[0],i=a.replace(/(.)\/+$/,"$1"),s=o.slice(1);
return{
params:r.reduce((c,d,m)=>{
let{
paramName:h,isOptional:x}
=d;
if(h==="*"){
let k=s[m]||"";
i=a.slice(0,a.length-k.length).replace(/(.)\/+$/,"$1")}
const w=s[m];
return x&&!w?c[h]=void 0:c[h]=(w||"").replace(/%2F/g,"/"),c}
,{
}
),pathname:a,pathnameBase:i,pattern:e}
}
function ah(e,t,n){
t===void 0&&(t=!1),n===void 0&&(n=!0),Jd(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));
let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${
}
|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,s,u)=>(r.push({
paramName:s,isOptional:u!=null}
),u?"/?([^\\/]+)?":"/([^\\/]+)"));
return e.endsWith("*")?(r.push({
paramName:"*"}
),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}
function lh(e){
try{
return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}
catch(t){
return Jd(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}
}
function Hi(e,t){
if(t==="/")return e;
if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;
let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);
return r&&r!=="/"?null:e.slice(n)||"/"}
function ih(e,t){
t===void 0&&(t="/");
let{
pathname:n,search:r="",hash:o=""}
=typeof e=="string"?On(e):e;
return{
pathname:n?n.startsWith("/")?n:sh(n,t):t,search:dh(r),hash:mh(o)}
}
function sh(e,t){
let n=t.replace(/\/+$/,"").split("/");
return e.split("/").forEach(o=>{
o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}
),n.length>1?n.join("/"):"/"}
function Fa(e,t,n,r){
return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}
function uh(e){
return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}
function Vi(e,t){
let n=uh(e);
return t?n.map((r,o)=>o===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}
function Xi(e,t,n,r){
r===void 0&&(r=!1);
let o;
typeof e=="string"?o=On(e):(o=Pr({
}
,e),q(!o.pathname||!o.pathname.includes("?"),Fa("?","pathname","search",o)),q(!o.pathname||!o.pathname.includes("#"),Fa("#","pathname","hash",o)),q(!o.search||!o.search.includes("#"),Fa("#","search","hash",o)));
let a=e===""||o.pathname==="",i=a?"/":o.pathname,s;
if(i==null)s=n;
else{
let m=t.length-1;
if(!r&&i.startsWith("..")){
let h=i.split("/");
for(;
h[0]==="..";
)h.shift(),m-=1;
o.pathname=h.join("/")}
s=m>=0?t[m]:"/"}
let u=ih(o,s),c=i&&i!=="/"&&i.endsWith("/"),d=(a||i===".")&&n.endsWith("/");
return!u.pathname.endsWith("/")&&(c||d)&&(u.pathname+="/"),u}
const Pt=e=>e.join("/").replace(/\/\/+/g,"/"),ch=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),dh=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,mh=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;
function fh(e){
return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}
const nm=["post","put","patch","delete"];
new Set(nm);
const ph=["get",...nm];
new Set(ph);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Tr(){
return Tr=Object.assign?Object.assign.bind():function(e){
for(var t=1;
t<arguments.length;
t++){
var n=arguments[t];
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}
return e}
,Tr.apply(this,arguments)}
const Qi=v.createContext(null),hh=v.createContext(null),Mt=v.createContext(null),ia=v.createContext(null),ct=v.createContext({
outlet:null,matches:[],isDataRoute:!1}
),rm=v.createContext(null);
function gh(e,t){
let{
relative:n}
=t===void 0?{
}
:t;
Un()||q(!1);
let{
basename:r,navigator:o}
=v.useContext(Mt),{
hash:a,pathname:i,search:s}
=lm(e,{
relative:n}
),u=i;
return r!=="/"&&(u=i==="/"?r:Pt([r,i])),o.createHref({
pathname:u,search:s,hash:a}
)}
function Un(){
return v.useContext(ia)!=null}
function Dt(){
return Un()||q(!1),v.useContext(ia).location}
function om(e){
v.useContext(Mt).static||v.useLayoutEffect(e)}
function am(){
let{
isDataRoute:e}
=v.useContext(ct);
return e?Eh():xh()}
function xh(){
Un()||q(!1);
let e=v.useContext(Qi),{
basename:t,future:n,navigator:r}
=v.useContext(Mt),{
matches:o}
=v.useContext(ct),{
pathname:a}
=Dt(),i=JSON.stringify(Vi(o,n.v7_relativeSplatPath)),s=v.useRef(!1);
return om(()=>{
s.current=!0}
),v.useCallback(function(c,d){
if(d===void 0&&(d={
}
),!s.current)return;
if(typeof c=="number"){
r.go(c);
return}
let m=Xi(c,JSON.parse(i),a,d.relative==="path");
e==null&&t!=="/"&&(m.pathname=m.pathname==="/"?t:Pt([t,m.pathname])),(d.replace?r.replace:r.push)(m,d.state,d)}
,[t,r,i,a,e])}
function sx(){
let{
matches:e}
=v.useContext(ct),t=e[e.length-1];
return t?t.params:{
}
}
function lm(e,t){
let{
relative:n}
=t===void 0?{
}
:t,{
future:r}
=v.useContext(Mt),{
matches:o}
=v.useContext(ct),{
pathname:a}
=Dt(),i=JSON.stringify(Vi(o,r.v7_relativeSplatPath));
return v.useMemo(()=>Xi(e,JSON.parse(i),a,n==="path"),[e,i,a,n])}
function yh(e,t){
return vh(e,t)}
function vh(e,t,n,r){
Un()||q(!1);
let{
navigator:o}
=v.useContext(Mt),{
matches:a}
=v.useContext(ct),i=a[a.length-1],s=i?i.params:{
}
;
i&&i.pathname;
let u=i?i.pathnameBase:"/";
i&&i.route;
let c=Dt(),d;
if(t){
var m;
let b=typeof t=="string"?On(t):t;
u==="/"||(m=b.pathname)!=null&&m.startsWith(u)||q(!1),d=b}
else d=c;
let h=d.pathname||"/",x=h;
if(u!=="/"){
let b=u.replace(/^\//,"").split("/");
x="/"+h.replace(/^\//,"").split("/").slice(b.length).join("/")}
let w=V0(e,{
pathname:x}
),k=bh(w&&w.map(b=>Object.assign({
}
,b,{
params:Object.assign({
}
,s,b.params),pathname:Pt([u,o.encodeLocation?o.encodeLocation(b.pathname).pathname:b.pathname]),pathnameBase:b.pathnameBase==="/"?u:Pt([u,o.encodeLocation?o.encodeLocation(b.pathnameBase).pathname:b.pathnameBase])}
)),a,n,r);
return t&&k?v.createElement(ia.Provider,{
value:{
location:Tr({
pathname:"/",search:"",hash:"",state:null,key:"default"}
,d),navigationType:yt.Pop}
}
,k):k}
function wh(){
let e=Th(),t=fh(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,o={
padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"}
;
return v.createElement(v.Fragment,null,v.createElement("h2",null,"Unexpected Application Error!"),v.createElement("h3",{
style:{
fontStyle:"italic"}
}
,t),n?v.createElement("pre",{
style:o}
,n):null,null)}
const kh=v.createElement(wh,null);
class Ch extends v.Component{
constructor(t){
super(t),this.state={
location:t.location,revalidation:t.revalidation,error:t.error}
}
static getDerivedStateFromError(t){
return{
error:t}
}
static getDerivedStateFromProps(t,n){
return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{
error:t.error,location:t.location,revalidation:t.revalidation}
:{
error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}
}
componentDidCatch(t,n){
console.error("React Router caught the following error during render",t,n)}
render(){
return this.state.error!==void 0?v.createElement(ct.Provider,{
value:this.props.routeContext}
,v.createElement(rm.Provider,{
value:this.state.error,children:this.props.component}
)):this.props.children}
}
function jh(e){
let{
routeContext:t,match:n,children:r}
=e,o=v.useContext(Qi);
return o&&o.static&&o.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=n.route.id),v.createElement(ct.Provider,{
value:t}
,r)}
function bh(e,t,n,r){
var o;
if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){
var a;
if(!n)return null;
if(n.errors)e=n.matches;
else if((a=r)!=null&&a.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;
else return null}
let i=e,s=(o=n)==null?void 0:o.errors;
if(s!=null){
let d=i.findIndex(m=>m.route.id&&(s==null?void 0:s[m.route.id])!==void 0);
d>=0||q(!1),i=i.slice(0,Math.min(i.length,d+1))}
let u=!1,c=-1;
if(n&&r&&r.v7_partialHydration)for(let d=0;
d<i.length;
d++){
let m=i[d];
if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(c=d),m.route.id){
let{
loaderData:h,errors:x}
=n,w=m.route.loader&&h[m.route.id]===void 0&&(!x||x[m.route.id]===void 0);
if(m.route.lazy||w){
u=!0,c>=0?i=i.slice(0,c+1):i=[i[0]];
break}
}
}
return i.reduceRight((d,m,h)=>{
let x,w=!1,k=null,b=null;
n&&(x=s&&m.route.id?s[m.route.id]:void 0,k=m.route.errorElement||kh,u&&(c<0&&h===0?(Ih("route-fallback"),w=!0,b=null):c===h&&(w=!0,b=m.route.hydrateFallbackElement||null)));
let p=t.concat(i.slice(0,h+1)),f=()=>{
let g;
return x?g=k:w?g=b:m.route.Component?g=v.createElement(m.route.Component,null):m.route.element?g=m.route.element:g=d,v.createElement(jh,{
match:m,routeContext:{
outlet:d,matches:p,isDataRoute:n!=null}
,children:g}
)}
;
return n&&(m.route.ErrorBoundary||m.route.errorElement||h===0)?v.createElement(Ch,{
location:n.location,revalidation:n.revalidation,component:k,error:x,children:f(),routeContext:{
outlet:null,matches:p,isDataRoute:!0}
}
):f()}
,null)}
var im=function(e){
return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}
(im||{
}
),sm=function(e){
return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}
(sm||{
}
);
function Sh(e){
let t=v.useContext(Qi);
return t||q(!1),t}
function Nh(e){
let t=v.useContext(hh);
return t||q(!1),t}
function Ph(e){
let t=v.useContext(ct);
return t||q(!1),t}
function um(e){
let t=Ph(),n=t.matches[t.matches.length-1];
return n.route.id||q(!1),n.route.id}
function Th(){
var e;
let t=v.useContext(rm),n=Nh(),r=um();
return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}
function Eh(){
let{
router:e}
=Sh(im.UseNavigateStable),t=um(sm.UseNavigateStable),n=v.useRef(!1);
return om(()=>{
n.current=!0}
),v.useCallback(function(o,a){
a===void 0&&(a={
}
),n.current&&(typeof o=="number"?e.navigate(o):e.navigate(o,Tr({
fromRouteId:t}
,a)))}
,[e,t])}
const gu={
}
;
function Ih(e,t,n){
gu[e]||(gu[e]=!0)}
function Rh(e,t){
e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}
function cm(e){
let{
to:t,replace:n,state:r,relative:o}
=e;
Un()||q(!1);
let{
future:a,static:i}
=v.useContext(Mt),{
matches:s}
=v.useContext(ct),{
pathname:u}
=Dt(),c=am(),d=Xi(t,Vi(s,a.v7_relativeSplatPath),u,o==="path"),m=JSON.stringify(d);
return v.useEffect(()=>c(JSON.parse(m),{
replace:n,state:r,relative:o}
),[c,m,o,n,r]),null}
function Ut(e){
q(!1)}
function Ah(e){
let{
basename:t="/",children:n=null,location:r,navigationType:o=yt.Pop,navigator:a,static:i=!1,future:s}
=e;
Un()&&q(!1);
let u=t.replace(/^\/*/,"/"),c=v.useMemo(()=>({
basename:u,navigator:a,static:i,future:Tr({
v7_relativeSplatPath:!1}
,s)}
),[u,s,a,i]);
typeof r=="string"&&(r=On(r));
let{
pathname:d="/",search:m="",hash:h="",state:x=null,key:w="default"}
=r,k=v.useMemo(()=>{
let b=Hi(d,u);
return b==null?null:{
location:{
pathname:b,search:m,hash:h,state:x,key:w}
,navigationType:o}
}
,[u,d,m,h,x,w,o]);
return k==null?null:v.createElement(Mt.Provider,{
value:c}
,v.createElement(ia.Provider,{
children:n,value:k}
))}
function Mh(e){
let{
children:t,location:n}
=e;
return yh($l(t),n)}
new Promise(()=>{
}
);
function $l(e,t){
t===void 0&&(t=[]);
let n=[];
return v.Children.forEach(e,(r,o)=>{
if(!v.isValidElement(r))return;
let a=[...t,o];
if(r.type===v.Fragment){
n.push.apply(n,$l(r.props.children,a));
return}
r.type!==Ut&&q(!1),!r.props.index||!r.props.children||q(!1);
let i={
id:r.props.id||a.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy}
;
r.props.children&&(i.children=$l(r.props.children,a)),n.push(i)}
),n}
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Gl(){
return Gl=Object.assign?Object.assign.bind():function(e){
for(var t=1;
t<arguments.length;
t++){
var n=arguments[t];
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}
return e}
,Gl.apply(this,arguments)}
function Dh(e,t){
if(e==null)return{
}
;
var n={
}
,r=Object.keys(e),o,a;
for(a=0;
a<r.length;
a++)o=r[a],!(t.indexOf(o)>=0)&&(n[o]=e[o]);
return n}
function _h(e){
return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}
function Lh(e,t){
return e.button===0&&(!t||t==="_self")&&!_h(e)}
const zh=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Oh="6";
try{
window.__reactRouterVersion=Oh}
catch{
}
const Uh="startTransition",xu=nf[Uh];
function Bh(e){
let{
basename:t,children:n,future:r,window:o}
=e,a=v.useRef();
a.current==null&&(a.current=$0({
window:o,v5Compat:!0}
));
let i=a.current,[s,u]=v.useState({
action:i.action,location:i.location}
),{
v7_startTransition:c}
=r||{
}
,d=v.useCallback(m=>{
c&&xu?xu(()=>u(m)):u(m)}
,[u,c]);
return v.useLayoutEffect(()=>i.listen(d),[i,d]),v.useEffect(()=>Rh(r),[r]),v.createElement(Ah,{
basename:t,children:n,location:s.location,navigationType:s.action,navigator:i,future:r}
)}
const Fh=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Wh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Yi=v.forwardRef(function(t,n){
let{
onClick:r,relative:o,reloadDocument:a,replace:i,state:s,target:u,to:c,preventScrollReset:d,viewTransition:m}
=t,h=Dh(t,zh),{
basename:x}
=v.useContext(Mt),w,k=!1;
if(typeof c=="string"&&Wh.test(c)&&(w=c,Fh))try{
let g=new URL(window.location.href),y=c.startsWith("//")?new URL(g.protocol+c):new URL(c),j=Hi(y.pathname,x);
y.origin===g.origin&&j!=null?c=j+y.search+y.hash:k=!0}
catch{
}
let b=gh(c,{
relative:o}
),p=$h(c,{
replace:i,state:s,target:u,preventScrollReset:d,relative:o,viewTransition:m}
);
function f(g){
r&&r(g),g.defaultPrevented||p(g)}
return v.createElement("a",Gl({
}
,h,{
href:w||b,onClick:k||a?r:f,ref:n,target:u}
))}
);
var yu;
(function(e){
e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"}
)(yu||(yu={
}
));
var vu;
(function(e){
e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"}
)(vu||(vu={
}
));
function $h(e,t){
let{
target:n,replace:r,state:o,preventScrollReset:a,relative:i,viewTransition:s}
=t===void 0?{
}
:t,u=am(),c=Dt(),d=lm(e,{
relative:i}
);
return v.useCallback(m=>{
if(Lh(m,n)){
m.preventDefault();
let h=r!==void 0?r:Fo(c)===Fo(d);
u(e,{
replace:h,state:o,preventScrollReset:a,relative:i,viewTransition:s}
)}
}
,[c,u,d,r,o,n,e,a,i,s])}
const wu="theme",ku="language",Gh=()=>{
const[e,t]=v.useState("system"),[n,r]=v.useState(!1);
v.useEffect(()=>{
const i=localStorage.getItem(wu);
i&&["light","dark","system"].includes(i)?(t(i),o(i)):(t("system"),o("system"))}
,[]),v.useEffect(()=>{
const i=window.matchMedia("(prefers-color-scheme: dark)"),s=u=>{
if(e==="system"){
const c=u.matches;
r(c),c?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}
}
;
if(e==="system"){
const u=i.matches;
r(u)}
else r(e==="dark");
return i.addEventListener("change",s),()=>i.removeEventListener("change",s)}
,[e]);
const o=i=>{
if(i==="system"){
const s=window.matchMedia("(prefers-color-scheme: dark)").matches;
r(s),s?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}
else{
const s=i==="dark";
r(s),s?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}
}
;
return{
themeMode:e,isDarkModeActive:n,toggleDarkMode:()=>{
let i;
e==="system"?i="light":e==="light"?i="dark":i="system",t(i),o(i),localStorage.setItem(wu,i)}
}
}
,dm=v.createContext(void 0),mm=()=>{
const e=v.useContext(dm);
if(!e)throw new Error("useThemeContext must be used within a ThemeProvider");
return e}
,Hh=({
children:e}
)=>{
const t=Gh();
return l.jsx(dm.Provider,{
value:t,children:e}
)}
,Vh=()=>{
const[e,t]=v.useState(!1);
v.useEffect(()=>{
const o=localStorage.getItem(ku);
o&&t(o==="en")}
,[]);
const n=o=>{
t(o==="en"),localStorage.setItem(ku,o)}
;
return{
isEnglish:e,toggleLanguage:()=>{
n(e?"zh":"en")}
,setLanguage:n}
}
,fm=v.createContext(void 0),sa=()=>{
const e=v.useContext(fm);
if(!e)throw new Error("useLanguageContext must be used within a LanguageProvider");
return e}
,Xh=({
children:e}
)=>{
const t=Vh();
return l.jsx(fm.Provider,{
value:t,children:e}
)}
,Wa=[{
id:"eudtech",name:"EudTech",slug:"eudtech",logo:"/logo.svg",logoWhite:"/logo-white.svg",primaryColor:"#2563eb",secondaryColor:"#1e40af",description:"EudTech 專注於提供高效能工作站與運算解決方案，滿足專業用戶的各種需求。我們致力於將最新的技術與創新的設計相結合，為客戶創造卓越的工作體驗。",tagline:"專業工作站領導品牌",website:"https://eudtech.com",establishedYear:2020,country:"Taiwan",categories:["工作站","伺服器","客製化系統","高效能運算"],isActive:!0,sortOrder:1,heroImage:"/EudTech-Select-server-front.png",features:["專業技術支援與諮詢","客製化系統整合服務","完整售後保固與維護","台灣在地化服務"]}
,{
id:"comino",name:"Comino Grando",slug:"comino",logo:"/comino-grando-logo.png",logoWhite:"/comino-logo-white.png",primaryColor:"#116c3a",secondaryColor:"#059669",description:"Comino Grando 專注於打造世界頂級的液冷多GPU工作站和伺服器，為AI推論與訓練提供完美解決方案。更寧靜的運作環境，更高的可靠性，以及最強勁的計算能力。",tagline:"為嚴謹工作而設計與打造",productLineDescription:"Optimized hardware configurations to run PyTorch, TensorFlow, JAX, NVIDIA CUDA Toolkit & cuDNN, AMD ROCm, Keras, ONNX Runtime, and more.",productLineDescription_zh:"優化的硬體配置，能夠運行 PyTorch、TensorFlow、JAX、NVIDIA CUDA Toolkit、cuDNN、AMD ROCm、Keras、ONNX Runtime 等工具。",website:"https://grando.ai",establishedYear:2016,country:"Poland",categories:["液冷工作站","AI推論","AI訓練","多GPU伺服器","液冷技術"],isActive:!0,sortOrder:2,heroImage:"/comino-h100-server.jpg",features:["工程設計而非簡單組裝","以液冷技術為核心","使用如同風冷一樣簡單","AMD精英合作夥伴","創新的液冷散熱技術","AI專用硬體優化","最高支持8個GPU","三年免維護期"],partnerLogos:["/nvidia-logo.png","/amd-logo.png","/tensorflow-logo.png","/pytorch-logo.png","/keras-logo.png"],badges:[{
image:"/amd-partner-badge.jpg",alt:"AMD Elite Partner"}
]}
,{
id:"cyabra",name:"Cyabra",slug:"cyabra",logo:"/cyabra-logo.svg",logoWhite:"/cyabra-logo.svg",primaryColor:"#003daa",secondaryColor:"#0756c0",description:"Cyabra 專注於網路真實性分析，提供先進的數據分析工具，協助品牌和機構識別和抵禦假新聞、假帳號和錯誤信息。我們的解決方案能夠有效保護品牌聲譽和網路環境的安全。",tagline:"揭示網路真相，保護品牌價值",website:"https://cyabra.com",establishedYear:2017,country:"Israel",categories:["網路安全","品牌保護","數據分析","假新聞偵測","社群媒體監控"],isActive:!0,sortOrder:3,heroImage:"/cyabra-images/cyabra-activity-graph-min-300x225.png",features:["先進的假新聞偵測技術","社群媒體帳號真實性分析","品牌聲譽保護系統","即時網路威脅監控","詳細的數據分析報告","客製化安全解決方案"]}
],Qh=[{
brandId:"eudtech",productId:"1",isExclusive:!0,warrantyPeriod:24,supportLevel:"premium"}
,{
brandId:"eudtech",productId:"3",isExclusive:!0,warrantyPeriod:12,supportLevel:"premium"}
,{
brandId:"comino",productId:"5",isExclusive:!1,warrantyPeriod:36,supportLevel:"enterprise"}
,{
brandId:"comino",productId:"6",isExclusive:!1,warrantyPeriod:36,supportLevel:"enterprise"}
,{
brandId:"comino",productId:"7",isExclusive:!1,warrantyPeriod:36,supportLevel:"enterprise"}
,{
brandId:"cyabra",productId:"8",isExclusive:!0,warrantyPeriod:12,supportLevel:"premium"}
,{
brandId:"cyabra",productId:"9",isExclusive:!0,warrantyPeriod:12,supportLevel:"premium"}
,{
brandId:"cyabra",productId:"10",isExclusive:!0,warrantyPeriod:12,supportLevel:"premium"}
,{
brandId:"cyabra",productId:"11",isExclusive:!0,warrantyPeriod:12,supportLevel:"premium"}
,{
brandId:"cyabra",productId:"12",isExclusive:!0,warrantyPeriod:12,supportLevel:"premium"}
];
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Yh={
xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"}
;
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kh=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),O=(e,t)=>{
const n=v.forwardRef(({
color:r="currentColor",size:o=24,strokeWidth:a=2,absoluteStrokeWidth:i,className:s="",children:u,...c}
,d)=>v.createElement("svg",{
ref:d,...Yh,width:o,height:o,stroke:r,strokeWidth:i?Number(a)*24/Number(o):a,className:["lucide",`lucide-${
Kh(e)}
`,s].join(" "),...c}
,[...t.map(([m,h])=>v.createElement(m,h)),...Array.isArray(u)?u:[u]]));
return n.displayName=`${
e}
`,n}
;
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hl=O("AlertCircle",[["circle",{
cx:"12",cy:"12",r:"10",key:"1mglay"}
],["line",{
x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}
],["line",{
x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qh=O("AlertTriangle",[["path",{
d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"c3ski4"}
],["path",{
d:"M12 9v4",key:"juzpu7"}
],["path",{
d:"M12 17h.01",key:"p32p05"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zh=O("ArrowRight",[["path",{
d:"M5 12h14",key:"1ays0h"}
],["path",{
d:"m12 5 7 7-7 7",key:"xquz4c"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wo=O("Award",[["circle",{
cx:"12",cy:"8",r:"6",key:"1vp47v"}
],["path",{
d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",key:"em7aur"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cu=O("Briefcase",[["rect",{
width:"20",height:"14",x:"2",y:"7",rx:"2",ry:"2",key:"eto64e"}
],["path",{
d:"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"zwj3tp"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $a=O("CheckCircle",[["path",{
d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}
],["path",{
d:"m9 11 3 3L22 4",key:"1pflzl"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pm=O("ChevronDown",[["path",{
d:"m6 9 6 6 6-6",key:"qrunsl"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hm=O("ChevronRight",[["path",{
d:"m9 18 6-6-6-6",key:"mthhwq"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jh=O("Clock",[["circle",{
cx:"12",cy:"12",r:"10",key:"1mglay"}
],["polyline",{
points:"12 6 12 12 16 14",key:"68esgv"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eg=O("Cpu",[["rect",{
x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}
],["rect",{
x:"9",y:"9",width:"6",height:"6",key:"o3kz5p"}
],["path",{
d:"M15 2v2",key:"13l42r"}
],["path",{
d:"M15 20v2",key:"15mkzm"}
],["path",{
d:"M2 15h2",key:"1gxd5l"}
],["path",{
d:"M2 9h2",key:"1bbxkp"}
],["path",{
d:"M20 15h2",key:"19e6y8"}
],["path",{
d:"M20 9h2",key:"19tzq7"}
],["path",{
d:"M9 2v2",key:"165o2o"}
],["path",{
d:"M9 20v2",key:"i2bqo8"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gm=O("Droplets",[["path",{
d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",key:"1ptgy4"}
],["path",{
d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",key:"1sl1rz"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dr=O("Globe",[["circle",{
cx:"12",cy:"12",r:"10",key:"1mglay"}
],["path",{
d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}
],["path",{
d:"M2 12h20",key:"9i4pu4"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xm=O("Lock",[["rect",{
width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}
],["path",{
d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tg=O("Mail",[["rect",{
width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}
],["path",{
d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ju=O("MapPin",[["path",{
d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}
],["circle",{
cx:"12",cy:"10",r:"3",key:"ilqhr7"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ng=O("Menu",[["line",{
x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}
],["line",{
x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}
],["line",{
x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ym=O("Monitor",[["rect",{
width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}
],["line",{
x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}
],["line",{
x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bu=O("Moon",[["path",{
d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rg=O("RefreshCw",[["path",{
d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}
],["path",{
d:"M21 3v5h-5",key:"1q7to0"}
],["path",{
d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}
],["path",{
d:"M8 16H3v5",key:"1cv678"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $o=O("Search",[["circle",{
cx:"11",cy:"11",r:"8",key:"4ej97u"}
],["path",{
d:"m21 21-4.3-4.3",key:"1qie3q"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dn=O("Server",[["rect",{
width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}
],["rect",{
width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}
],["line",{
x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}
],["line",{
x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt=O("Shield",[["path",{
d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Su=O("Sun",[["circle",{
cx:"12",cy:"12",r:"4",key:"4exip2"}
],["path",{
d:"M12 2v2",key:"tus03m"}
],["path",{
d:"M12 20v2",key:"1lh1kg"}
],["path",{
d:"m4.93 4.93 1.41 1.41",key:"149t6j"}
],["path",{
d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}
],["path",{
d:"M2 12h2",key:"1t8f8n"}
],["path",{
d:"M20 12h2",key:"1q8mjw"}
],["path",{
d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}
],["path",{
d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vm=O("TrendingUp",[["polyline",{
points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}
],["polyline",{
points:"16 7 22 7 22 13",key:"kwv8wd"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nu=O("UserCheck",[["path",{
d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}
],["circle",{
cx:"9",cy:"7",r:"4",key:"nufk8"}
],["polyline",{
points:"16 11 18 13 22 9",key:"1pwet4"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pu=O("User",[["path",{
d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}
],["circle",{
cx:"12",cy:"7",r:"4",key:"17ys0d"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const og=O("X",[["path",{
d:"M18 6 6 18",key:"1bl5f8"}
],["path",{
d:"m6 6 12 12",key:"d8bk6v"}
]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tu=O("Zap",[["polygon",{
points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}
]]),Vl=e=>[{
id:3,title:e?"FinSight Financial AI System":"FinSight 金融AI系統",description:e?"FinSight: Financial language understanding and data API framework. Combine raw data with LLMs for real-time, flexible insights and decision support.":"FinSight 金融語言理解與資料API架構，結合原始數據與LLM，提供即時彈性洞察與決策輔助。",icon:I.createElement(Zt,{
className:"h-8 w-8 text-blue-800"}
),image:"https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg",features:e?["Unified financial data API","RESTful API, SaaS or on-premises","LLM demo system for finance","Explain indicators and predict trends with LLM","Highly extensible architecture","Enterprise consulting and custom GPT"]:["金融資料整合API","RESTful API，SaaS雲端或本地端","金融語言模型互動展示","指標解釋、趨勢預測","高度彈性延伸架構","企業顧問與專屬GPT助理"],specs:e?{
Model:"LLM + API Wrapper","Data Sources":"Raw financial data APIs",Integration:"Webhook + JSON/RESTful API",Deployment:"SaaS / On-Premises"}
:{
模型架構:"LLM + API 包裝器",資料來源:"原始金融數據API",整合模式:"Webhook 與 JSON/RESTful API",部署方式:"SaaS 或 私有部署"}
,comingSoon:!1,detailedDescription:{
title:e?"FinSight Financial AI System":"FinSight 金融AI系統",formFactor:e?"Software Platform":"軟體平台",introduction:e?"FinSight is a comprehensive financial AI platform that specializes in processing raw numerical financial data. Our system focuses exclusively on hard data - market prices, trading volumes, financial ratios, and quantitative metrics - providing clean, structured access to real-time financial information without secondary interpretations or news content.":"FinSight 是一個專門處理原始數字金融數據的綜合性金融AI平台。我們的系統專注於硬數據 - 市場價格、交易量、財務比率和量化指標 - 提供乾淨、結構化的即時金融資訊存取，不包含二手解讀或新聞內容。",keyFeatures:e?["Raw financial data API integration","Real-time market data processing","Quantitative metrics calculation","Multi-market data normalization","LLM-powered data interpretation","Custom financial indicators","Enterprise-grade API infrastructure","Flexible deployment options"]:["原始金融數據API整合","即時市場數據處理","量化指標計算","多市場數據標準化","LLM驅動的數據解讀","客製化金融指標","企業級API基礎架構","彈性部署選項"],technicalSpecs:e?{
"Data Sources":"Raw market data APIs, financial databases",Processing:"Real-time data normalization and calculation","API Format":"RESTful JSON, WebSocket streaming","LLM Integration":"GPT-4 for data interpretation and insights",Deployment:"Cloud SaaS or on-premises installation",Security:"Enterprise-grade encryption and access control",Scalability:"Horizontal scaling for high-frequency data",Latency:"Sub-second response time for real-time queries"}
:{
資料來源:"原始市場數據API、金融資料庫",處理方式:"即時數據標準化與計算",API格式:"RESTful JSON、WebSocket串流",LLM整合:"GPT-4用於數據解讀與洞察",部署方式:"雲端SaaS或本地端安裝",安全性:"企業級加密與存取控制",擴展性:"高頻數據的水平擴展",延遲性:"即時查詢的亞秒級回應時間"}
,applications:e?["Algorithmic trading systems","Risk management platforms","Portfolio optimization tools","Financial research and analysis","Regulatory reporting automation","Investment decision support"]:["演算法交易系統","風險管理平台","投資組合優化工具","金融研究與分析","法規報告自動化","投資決策支援"]}
}
,{
id:1,title:e?"EudTech Select AI Server":"EudTech Select AI伺服器",description:e?"Enterprise-grade AI server with optimized performance for large language models and AI workloads.":"企業級AI伺服器，為大型語言模型和AI工作負載優化效能。",icon:I.createElement(Dn,{
className:"h-8 w-8 text-blue-800"}
),image:"/EudTech-Select-server-front.png.png",features:e?["8-GPU direct-connect architecture","4 NVMe drive bays","Advanced cooling system","Dual Intel Xeon Processors","1TB DDR5 RAM Support","Redundant Power Supply"]:["8-GPU 直連架構","4個 NVMe 驅動器托架","先進散熱系統","雙Intel Xeon處理器","支援1TB DDR5 RAM","備援電源供應"],specs:e?{
Processing:"Dual Intel Xeon Gold 6330 Processors",Memory:"Up to 1TB DDR5-4800 ECC",Storage:"4x 8TB NVMe SSD",GPU:"8x NVIDIA A100 80GB",Network:"Dual 100GbE QSFP28"}
:{
處理器:"雙Intel Xeon Gold 6330處理器",記憶體:"最高1TB DDR5-4800 ECC",儲存:"4x 8TB NVMe SSD",GPU:"8x NVIDIA A100 80GB",網路:"雙100GbE QSFP28"}
,comingSoon:!1}
],Xl=e=>[{
id:5,title:e?"Comino Grando Rackable Workstation":"Comino Grando 機架式工作站",description:e?"Rackmount workstation/server with up to 8 GPUs & 2 CPUs, advanced liquid cooling, modular design, remote management, and redundant power supply.":"機架式工作站/伺服器，支援最高8顆GPU與2顆CPU，具備先進液冷、模組化設計、遠端管理及冗餘電源。",icon:I.createElement(Dn,{
className:"h-8 w-8 text-purple-700"}
),image:"/grando-8gpu-server.jpg",features:e?["Up to 8 GPUs & 2 CPUs","Engineered for versatile deployment, whether mounted in a rack or placed on a table","Redundant Power supply system up to 4x 2000W hot-swap CRPS modules (Redundancy modes: 4+0, 3+1, 2+2). Power capacity up to 8.0kW","3x Ultra High Flow fans 6200RPM each (high noise level) or 3x 140mm 3000RPM (low noise level)","Cooling Capacity up to 6.5kW","Optional installation of up to 8 hot swap SSDs (SATA or NVME)"]:["最多8顆GPU與2顆CPU","可機架安裝或桌面擺放，彈性部署","備援電源系統，最高4顆2000W熱插拔CRPS（備援模式：4+0、3+1、2+2），電力最高8.0kW","3顆超高流量6200RPM風扇（高噪音）或3顆140mm 3000RPM（低噪音）","散熱能力最高6.5kW","可選配最多8顆熱插拔SSD（SATA或NVME）"],specs:e?{
"Maximum Cooling Capacity":"6500 W @ 20°C intake air, performance mode",Motherboard:"Up to EATX & EBB",GPUs:"Up to 8;
 NVIDIA: 5090, RTX A6000, RTX 6000 ADA, RTX PRO 6000, A40, L40, L40S, A100, H100, H200;
 AMD: W7800, W7900",CPUs:"Up to 2;
 Intel Xeon W-2400/2500 & 3400/3500, Xeon Scalable 4th/5th Gen, XEON 6;
 AMD Threadripper PRO 5000WX/7000WX/9000WX, EPYC 9004/9005",RAM:"Up to 2TB *",Storage:'Back panel hot swap cages: up to 4x hot swap SSDs (4x 7mm or 2x 15mm) and up to 4 more instead of 4th PSU;
 Internal 3.5" cage up to 4x 3.5" or 4x 2.5" 15mm or 12x 2.5" 7mm;
 Internal 2.5" slots: up to 4x 2.5" SSD 7mm *',"Power Supply System":"4x 2000W CRPS modules (Redundancy: 4+0, 3+1, 2+2), up to 8.0kW @ 180-264V, up to 4kW @ 90-140V","Noise Level":"39dB - 70dB",Lan:"Up to 2x 10GbE on motherboard, up to 400GbE in PCIe",OS:"Ubuntu / Windows 11 (Pro/Home) / Windows Server","Liquid Cooling":"CPU with VRM, GPU with GDDR and VRM",Reservoir:"Comino custom 450ml with integrated pumps",Pumps:"2x Laing DDC 20W",Radiators:"1x 120x360mm core",Fans:"3x Ultra High Flow 6200RPM (high noise) or 3x High Flow 3000RPM (low noise)",Installation:'19" rack-mountable or standalone as a workstation',"Required rack space":"4U",Size:"439 x 681 x 177mm (without handles and protruding parts)",Weight:"4 GPUs: 49kg (net), 67kg (gross);
 6 GPUs: 52kg (net), 70kg (gross)","Operating & storage temperature range":"Storage: -5.5°C / 23.1°F;
 Operating: 3.4°C / 38.1°C *"}
:{
最大冷卻能力:"6500 W @ 20°C進氣，性能模式",主機板:"支援EATX & EBB",GPU:"最高8顆；NVIDIA: 5090, RTX A6000, RTX 6000 ADA, RTX PRO 6000, A40, L40, L40S, A100, H100, H200；AMD: W7800, W7900",CPU:"最高2顆；Intel Xeon W-2400/2500 & 3400/3500, Xeon Scalable 4/5代, XEON 6；AMD Threadripper PRO 5000WX/7000WX/9000WX, EPYC 9004/9005",記憶體:"最高2TB *",儲存:"背板熱插拔：最高4顆SSD（4x 7mm或2x 15mm），可再加4顆（取代第4顆電源）；內部3.5吋托架最高4顆3.5吋或4顆2.5吋15mm或12顆2.5吋7mm；內部2.5吋槽最高4顆2.5吋SSD 7mm *",電源系統:"4x 2000W CRPS（備援：4+0、3+1、2+2），180-264V最高8.0kW，90-140V最高4kW",噪音:"39dB - 70dB",網路:"主機板最高2x 10GbE，PCIe最高400GbE",作業系統:"Ubuntu / Windows 11 (Pro/Home) / Windows Server",液冷:"CPU含VRM，GPU含GDDR與VRM",水箱:"Comino客製450ml含整合式幫浦",幫浦:"2x Laing DDC 20W",散熱排:"1x 120x360mm核心",風扇:"3顆超高流量6200RPM（高噪音）或3顆140mm 3000RPM（低噪音）",安裝方式:"19吋機架或獨立工作站",機架空間:"4U",尺寸:"439 x 681 x 177mm（不含把手及突出部件）",重量:"4顆GPU時49kg（淨重），67kg（毛重）；6顆GPU時52kg（淨重），70kg（毛重）",操作與儲存溫度範圍:"儲存：-5.5°C / 23.1°F；操作：3.4°C / 38.1°C *"}
,comingSoon:!1}
,{
id:6,title:e?"Comino Grando Desktop Workstation":"Comino Grando 桌面工作站",description:e?"Desktop workstation with up to 6 GPUs & 2 CPUs, advanced liquid cooling, quick-disconnect couplings, remote management, and monitoring system.":"桌面型工作站，支援最高6顆GPU與2顆CPU，具備先進液冷、快速接頭、遠端管理與監控系統。",icon:I.createElement(ym,{
className:"h-8 w-8 text-indigo-700"}
),image:"/GRANDO WS TRP_4xA100_01.jpg",features:e?["Up to 6 GPUs & 2 CPUs","Designed to be used as a desktop or can be put in a rack","3x 140mm fans 3000 RPM (low noise level) or 3x 140mm 5000RPM (medium noise level)","Cooling Capacity up to 2.5kW","Quick Disconnect Couplings (Comino TheQ) on each GPU and CPU","Remote management: BMC chip, IPMI architecture","Comino monitoring system: cooling log, failure events, temperature statistics, web GUI"]:["最高6顆GPU與2顆CPU","桌面或機架安裝","3顆140mm風扇3000RPM（低噪音）或3顆140mm 5000RPM（中噪音）","散熱能力最高2.5kW","快速接頭（Comino TheQ）於每顆GPU與CPU","遠端管理：BMC晶片、IPMI架構","Comino監控系統：冷卻日誌、故障事件、溫度統計、Web介面"],specs:e?{
"Maximum Cooling Capacity":"2500 W @ 20°C intake air, performance mode",Motherboard:"Up to EATX & EBB",GPUs:"Up to 6;
 NVIDIA: 5090, RTX A6000, RTX 6000 ADA, A40, L40, L40S, A100, H100;
 AMD: W7800, W7900",Processors:"Up to 2;
 Intel: Core i9, Xeon-W 2400, 3400, Xeon Scalable 4th & 5th Gen;
 AMD: Ryzen 7000, Threadripper PRO 5000WX, 7000WX, EPYC 7003, 9004",RAM:"Up to 2TB *",Storage:"Up to 2x 3.5’’ HDD, up to 6x 2.5’’ SSD","Power Supply System":"Up to 3x SFX-L 1000W, up to 3kW","Noise Level":"39dB - 50dB",Lan:"Up to 2x 10GbE on motherboard, up to 400GbE in PCIe",OS:"Ubuntu / Win10 (Pro/Home) / Windows Server","Liquid Cooling":"CPU with VRM, GPU with GDDR and VRM",Reservoir:"Comino custom 450ml with integrated pumps",Pumps:"2x Laing DDC 20W",Radiators:"1x 120x360mm core",Fans:"3x Low Noise 140mm 3000RPM (low noise) or 3x High Flow 140mm 5000RPM (medium noise)",Installation:"Desktop as a Workstation or 19’’ rack-mountable","Required rack space":"4U",Size:"439 x 681 x 177mm (without handles and protruding parts)",Weight:"4 GPUs: 45kg (net), 72kg (gross)","Operating & storage temperature range":"Storage: -5.5°C / 23.1°F;
 Operating: 3.4°C / 38.1°C *"}
:{
最大冷卻能力:"2500 W @ 20°C進氣，性能模式",主機板:"支援EATX & EBB",GPU:"最高6顆；NVIDIA: 5090, RTX A6000, RTX 6000 ADA, A40, L40, L40S, A100, H100；AMD: W7800, W7900",處理器:"最高2顆；Intel: Core i9, Xeon-W 2400, 3400, Xeon Scalable 4/5代；AMD: Ryzen 7000, Threadripper PRO 5000WX, 7000WX, EPYC 7003, 9004",記憶體:"最高2TB *",儲存:"最高2顆3.5吋HDD，最高6顆2.5吋SSD",電源系統:"最高3顆SFX-L 1000W，最高3kW",噪音:"39dB - 50dB",網路:"主機板最高2x 10GbE，PCIe最高400GbE",作業系統:"Ubuntu / Win10 (Pro/Home) / Windows Server",液冷:"CPU含VRM，GPU含GDDR與VRM",水箱:"Comino客製450ml含整合式幫浦",幫浦:"2x Laing DDC 20W",散熱排:"1x 120x360mm核心",風扇:"3顆低噪音140mm 3000RPM或3顆高流量140mm 5000RPM",安裝方式:"桌面型工作站或19吋機架",機架空間:"4U",尺寸:"439 x 681 x 177mm（不含把手及突出部件）",重量:"4顆GPU時45kg（淨重），72kg（毛重）",操作與儲存溫度範圍:"儲存：-5.5°C / 23.1°F；操作：3.4°C / 38.1°C *"}
,comingSoon:!1}
,{
id:7,title:e?"Comino Grando Server":"Comino Grando 伺服器",description:e?"High-performance server with up to 8 GPUs & 2 CPUs, enterprise-grade liquid cooling, redundant power supply, hot-swappable components, and advanced monitoring system.":"高效能伺服器，支援最高8顆GPU與2顆CPU，企業級液冷、冗餘電源、熱插拔元件及先進監控系統。",icon:I.createElement(Dn,{
className:"h-8 w-8 text-red-700"}
),image:"/GRANDO_RM-M-CRPS_9004_8xGPU_21.jpg",features:e?["Up to 8 GPUs & 2 CPUs","Hot-swappable SSDs and redundant power supply modules","Engineered for rack mounting in professional server environments","Redundant Power supply system up to 4x 2000W hot-swap CRPS modules (Redundancy modes: 4+0, 3+1, 2+2). Power capacity up to 8.0kW","3x Ultra High Flow fans 6200RPM each (high noise level) or 3x 140mm 3000RPM (low noise level)","Cooling Capacity up to 6.5kW","Optional installation of up to 8 hot swap SSDs (SATA or NVME)","Enterprise-grade reliability and performance"]:["最多8顆GPU與2顆CPU","熱插拔SSD與冗餘電源模組","專業伺服器環境機架安裝設計","備援電源系統，最高4顆2000W熱插拔CRPS（備援模式：4+0、3+1、2+2），電力最高8.0kW","3顆超高流量6200RPM風扇（高噪音）或3顆140mm 3000RPM（低噪音）","散熱能力最高6.5kW","可選配最多8顆熱插拔SSD（SATA或NVME）","企業級可靠性與效能"],specs:e?{
"Maximum Cooling Capacity":"6500 W @ 20°C intake air, performance mode",Motherboard:"Up to EATX & EBB",GPUs:"Up to 8;
 NVIDIA: 5090, RTX A6000, RTX 6000 ADA, RTX PRO 6000, A40, L40, L40S, A100, H100, H200;
 AMD: W7800, W7900",CPUs:"Up to 2;
 Single socket: Intel Xeon W-2400/2500 & 3400/3500, Intel Xeon Scalable 4th Gen, 5th Gen, XEON 6, AMD Threadripper PRO 5000WX, 7000WX, 9000WX, AMD EPYC 9004/9005;
 Dual socket: Intel Xeon Scalable 4th & 5th Gen, XEON 6, AMD EPYC 9004/9005",RAM:"Up to 2TB *",Storage:'Back panel hot swap cages: up to 4x hot swap SSDs (4x 7mm or 2x 15mm) and up to 4 more (4x 7mm or 2x 15mm) instead of 4th PSU;
 Internal 3.5" cage up to 4x 3.5" or 4x 2.5" 15mm or 12x 2.5" 7mm;
 Internal 2.5" slots: up to 4x 2.5" SSD 7mm *',"Power Supply System":"4x 2000W CRPS modules (Redundancy modes: 4+0, 3+1, 2+2). Power capacity up to 8.0kW @ 180-264V, up to 4kW @ 90-140V"}
:{
最大冷卻能力:"6500 W @ 20°C進氣，性能模式",主機板:"支援EATX & EBB",GPU:"最高8顆；NVIDIA: 5090, RTX A6000, RTX 6000 ADA, RTX PRO 6000, A40, L40, L40S, A100, H100, H200；AMD: W7800, W7900",CPU:"最高2顆；單插槽：Intel Xeon W-2400/2500 & 3400/3500, Intel Xeon Scalable 4代, 5代, XEON 6, AMD Threadripper PRO 5000WX, 7000WX, 9000WX, AMD EPYC 9004/9005；雙插槽：Intel Xeon Scalable 4代 & 5代, XEON 6, AMD EPYC 9004/9005",記憶體:"最高2TB *",儲存:"背板熱插拔架：最多4顆熱插拔SSD（4x 7mm或2x 15mm）並可再加4顆（4x 7mm或2x 15mm）取代第4顆電源；內部3.5吋架最多4顆3.5吋或4顆2.5吋15mm或12顆2.5吋7mm；內部2.5吋插槽：最多4顆2.5吋SSD 7mm *",電源系統:"4顆2000W CRPS模組（備援模式：4+0、3+1、2+2）。180-264V電力容量最高8.0kW，90-140V電力容量最高4kW"}
,comingSoon:!1,detailedDescription:{
title:e?"Comino Grando Server":"Comino Grando 伺服器",formFactor:e?"4U Rackmount Server":"4U機架式伺服器",introduction:e?"The Comino Grando Server is a high-performance, enterprise-grade computing solution designed for demanding AI, machine learning, and scientific computing workloads. Featuring advanced liquid cooling technology, redundant power supplies, and hot-swappable components, it delivers unmatched reliability and performance for critical IT infrastructure.":"Comino Grando 伺服器是一款高效能企業級運算解決方案，專為AI、機器學習和科學運算等高需求工作負載而設計。配備先進液冷技術、冗餘電源和熱插拔元件，為關鍵IT基礎設施提供無與倫比的可靠性和效能。",keyFeatures:e?["Up to 8 GPUs & 2 CPUs","Hot-swappable SSDs and redundant power supply modules","Engineered for rack mounting in professional server environments","Redundant Power supply system up to 4x 2000W hot-swap CRPS modules","Cooling Capacity up to 6.5kW","Optional installation of up to 8 hot swap SSDs (SATA or NVME)","Enterprise-grade reliability and performance","Advanced liquid cooling with quick-disconnect couplings","Remote management with IPMI interface","Comino monitoring system for comprehensive device monitoring"]:["最多8顆GPU與2顆CPU","熱插拔SSD與冗餘電源模組","專業伺服器環境機架安裝設計","備援電源系統，最高4顆2000W熱插拔CRPS模組","散熱能力最高6.5kW","可選配最多8顆熱插拔SSD（SATA或NVME）","企業級可靠性與效能","先進液冷技術配備快速接頭","IPMI介面遠端管理","Comino監控系統，全面設備監控"],technicalSpecs:e?{
Motherboards:"Up to EATX & EBB",RAM:"Up to 2TB *","M2 drives":'Up to 8x NVME;
 Internal 3.5" cage up to 4x 3.5" or 4x 2.5" 15mm or 12x 2.5" 7mm;
 Internal 2.5" slots: up to 4x 2.5" SSD 7mm',"PSU and operating voltage":"4x 2000W CRPS modules (Redundancy modes: 4+0, 3+1, 2+2). Power capacity up to 8.0kW @ 180-264V, up to 4kW @ 90-140V","Cooling Capacity":"6.5kW","Noise level":"39dB - 70dB",Lan:"Up to 2x 10GbE on motherboard, up to 400GbE in PCIe",OS:"Ubuntu / Windows 11 (Pro/Home) / Windows Server","Liquid cooling":"CPU with VRM and GPU with GDDR and VRM",Reservoir:"Comino custom 450ml with integrated pumps",Pumps:"2x Laing DDC 20W",Radiators:"1x 120x360mm core",Fans:"3x Ultra High Flow 140mm 6200RPM (high noise level) or 3x High Flow 140mm 5000RPM (medium noise level)",Installation:'19" rack-mountable or standalone as a workstation',"Required rack space":"4U",Size:"439 x 681 x 177mm (without handles and protruding parts)",Weight:"4x CRPS and 4 GPUs — 49kg (net), 67kg (gross);
 4x CRPS and 6 GPUs — 52kg (net), 70kg (gross);
 4x CRPS and 8 GPUs — 55kg (net), 72kg (gross)","Operating & storage temperature range":"Storage: -5.50ºC / 23.122ºF;
 Operating: 3.38ºC / 38.100ºF *"}
:{
主機板:"最高支援EATX與EBB",記憶體:"最高2TB *",M2硬碟:"最多8顆NVME；內部3.5吋架最多4顆3.5吋或4顆2.5吋15mm或12顆2.5吋7mm；內部2.5吋插槽最多4顆2.5吋SSD 7mm",電源與電壓:"4顆2000W CRPS模組（備援模式：4+0、3+1、2+2）。180-264V電力容量最高8.0kW，90-140V電力容量最高4kW",冷卻能力:"6.5kW",噪音值:"39dB - 70dB",網路:"主機板最高2x 10GbE，PCIe最高400GbE",作業系統:"Ubuntu / Windows 11 (Pro/Home) / Windows Server",液冷範圍:"CPU含VRM、GPU含GDDR與VRM",水箱:"Comino客製450ml整合式水箱",幫浦:"2x Laing DDC 20W",散熱排:"1x 120x360mm核心",風扇:"3顆超高流量140mm 6200RPM（高噪音）或3顆高流量140mm 5000RPM（中噪音）",安裝方式:"19吋機架安裝或獨立工作站",機架空間:"4U",尺寸:"439 x 681 x 177mm（不含把手與突出部件）",重量:"4顆CRPS與4顆GPU時49kg（淨重），67kg（毛重）；4顆CRPS與6顆GPU時52kg（淨重），70kg（毛重）；4顆CRPS與8顆GPU時55kg（淨重），72kg（毛重）",操作與儲存溫度範圍:"儲存：-5.50ºC / 23.122ºF；操作：3.38ºC / 38.100ºF *"}
,relevantConfigurations:e?[{
title:"Comino Integration Kit",description:"Comino integration kit upgrades any Multi-GPU air-cooled server with a liquid-cooling system, boosting performance up to 30%, lowering facility total power consumption up to 40% and providing the capability to operate in harsh environment up to +40ºC/104ºF with no thermal throttling."}
,{
title:"Cooling System Connection",description:"Upgraded server could be connected to Comino InRack Drycooler or to an external cooling system via CDU (Cooling Distribution Unit)"}
,{
title:"Available Configurations",configurations:["DUAL EPYC or XEON / 8x NVIDIA H200 / 2TB RAM / 2TB NVME","DUAL EPYC or XEON / 8x NVIDIA H100 / 2TB RAM / 2TB NVME"]}
]:[{
title:"Comino整合套件",description:"Comino整合套件可將任何多GPU氣冷伺服器升級為液冷系統，提升效能最高30%，降低設施總功耗最高40%，並提供在惡劣環境中運行至+40ºC/104ºF而無熱節流的能力。"}
,{
title:"冷卻系統連接",description:"升級後的伺服器可連接至Comino InRack乾式冷卻器或透過CDU（冷卻分配單元）連接至外部冷卻系統"}
,{
title:"可用配置",configurations:["雙EPYC或XEON / 8x NVIDIA H200 / 2TB記憶體 / 2TB NVME","雙EPYC或XEON / 8x NVIDIA H100 / 2TB記憶體 / 2TB NVME"]}
],additionalFeatures:e?{
"LIQUID COOLED":"Comino liquid cooling system unleashes the full performance potential of modern top-tier GPUs and CPUs, allows to prolong lifespan of the hardware and ensures 24/7 operation even in harsh environment with no thermal throttling.","QUICK-DISCONNECT COUPLINGS":"Quick Disconnect Couplings (Comino TheQ) on each GPU and CPU allows to simplificate maintaining and reduce maintenance time to increase system availability.","REMOTE MANAGEMENT":"Our servers come equipped with an IPMI interface for seamless remote management. Enjoy features like remote KVM access, OS installation, and comprehensive server monitoring. Ensure peak performance and minimal downtime anytime, anywhere.","COMINO'S MONITORING SYSTEM":"allows to collect cooling system log offline to analyze device usage history, log failure events and to monitor the temperature statistic. WEB based GUI allows to inspect several devices remotely. The monitoring system increases system availability.","REDUNDANT POWER SUPPLY (CRPS)":"Designed for use in critical IT infrastructure. It provides reliable power for your system without limitation. PSU work at whole spectrum voltage 100-240VAC and 240VDC and provide N+M redundancy."}
:{
液冷系統:"Comino液冷系統可釋放現代頂級GPU和CPU的全部效能潛力，延長硬體壽命，確保即使在惡劣環境下也能24/7運行，無熱節流。",快速接頭:"每顆GPU和CPU均配備快速接頭（Comino TheQ），簡化維護並減少維護時間，提升系統可用性。",遠端管理:"我們的伺服器配備IPMI介面，實現無縫遠端管理。享受遠端KVM存取、作業系統安裝和全面伺服器監控等功能。隨時隨地確保峰值效能和最小停機時間。",Comino監控系統:"可離線收集冷卻系統日誌，分析設備使用歷史、記錄故障事件並監控溫度統計。WEB介面可遠端檢查多台設備，提升系統可用性。","備援電源供應器(CRPS)":"專為關鍵IT基礎設施使用而設計。為您的系統提供無限制的可靠電力。電源供應器在100-240VAC和240VDC全頻譜電壓下工作，並提供N+M備援。"}
}
}
],Ql=e=>[{
id:8,title:e?"Disinformation Detection Platform":"假資訊偵測平台",description:e?"Cyabra's flagship AI-powered platform that detects disinformation campaigns, fake profiles, and manipulated narratives across social media and digital content.":"Cyabra 的旗艦 AI 平台，用於偵測社群媒體和數位內容中的假資訊活動、假帳號和被操縱的敘事。",icon:I.createElement(Zt,{
className:"h-8 w-8 text-[#003daa]"}
),image:"/cyabra-images/cyabra-activity-graph-min-300x225.png",features:e?["Deep fake profile detection","Narrative manipulation tracking","Cross-platform campaign analysis","Real-time monitoring and alerts","Customized threat intelligence","Detailed attribution analysis"]:["深度假帳號偵測","敘事操縱追蹤","跨平台活動分析","即時監控與警報","客製化威脅情報","詳細歸因分析"],specs:e?{
Technology:"Proprietary AI algorithms",Coverage:"15+ social platforms","Analysis Speed":"Real-time processing",Deployment:"Cloud SaaS or private cloud",Integration:"API, dashboard, alerts"}
:{
技術:"專有 AI 演算法",覆蓋範圍:"15+ 社群平台",分析速度:"即時處理",部署模式:"雲端 SaaS 或私有雲",整合方式:"API、儀表板、警報"}
,comingSoon:!1,detailedDescription:{
title:e?"Disinformation Detection Platform":"假資訊偵測平台",formFactor:e?"Cloud Software":"雲端軟體",introduction:e?"Cyabra's Disinformation Detection Platform is an advanced solution designed to help brands, governments, and organizations identify and combat fake news, disinformation campaigns, and inauthentic behavior online. Using proprietary AI algorithms, the platform provides comprehensive analysis of content authenticity across multiple digital channels.":"Cyabra 的假資訊偵測平台是一個先進的解決方案，專為幫助品牌、政府和組織識別並抵禦假新聞、假資訊活動和網上不真實行為而設計。使用專有的 AI 演算法，該平台能對多個數位頻道中的內容真實性提供全面分析。",keyFeatures:e?["AI-powered fake profile detection with 90%+ accuracy","Cross-platform narrative tracking and connection mapping","Temporal analysis of spreading patterns and velocity","Customized alerts for emerging threats to brand reputation","Comprehensive reporting and forensic evidence collection","Regular updates to detection algorithms"]:["AI 驅動的假帳號偵測，準確率超過 90%","跨平台敘事追蹤和連接映射","傳播模式和速度的時間分析","針對品牌聲譽新興威脅的客製化警報","全面的報告和取證蒐集","偵測演算法定期更新"],technicalSpecs:e?{
"Supported Platforms":"Twitter/X, Facebook, Instagram, TikTok, YouTube, Reddit, LinkedIn, Telegram, Discord, and more","AI Technology":"Proprietary machine learning models with behavioral and content analysis","Processing Capacity":"100,000+ posts analyzed per minute","Data Retention":"Customizable, compliant with GDPR and regional privacy laws",Authentication:"SSO, MFA, role-based access control","API Access":"REST API with comprehensive documentation",Integration:"Webhooks, export to SIEM systems, BI tools compatibility","Deployment Options":"Public cloud, private cloud, or on-premises for sensitive environments",Support:"24/7 monitoring and technical support"}
:{
支援平台:"Twitter/X、Facebook、Instagram、TikTok、YouTube、Reddit、LinkedIn、Telegram、Discord 等","AI 技術":"專有機器學習模型，結合行為和內容分析",處理能力:"每分鐘分析超過 100,000 篇貼文",數據保留:"可自定義，符合 GDPR 和地區隱私法規",身份驗證:"SSO、MFA、基於角色的訪問控制","API 存取":"REST API，提供全面文件",整合:"Webhooks、匯出至 SIEM 系統、BI 工具相容性",部署選項:"公有雲、私有雲或敏感環境的本地部署",支援:"24/7 監控和技術支援"}
}
}
,{
id:9,title:e?"Brand Protection Suite":"品牌保護套件",description:e?"Comprehensive solution to monitor, detect, and mitigate reputational threats to brands across digital media and social platforms.":"全面的解決方案，用於監控、檢測和減輕數位媒體和社交平台上對品牌的聲譽威脅。",icon:I.createElement($o,{
className:"h-8 w-8 text-[#003daa]"}
),image:"/cyabra-logo.svg",features:e?["Reputation monitoring","Fake review detection","Impersonation alerts","Crisis management tools","Sentiment analysis","Competitive intelligence"]:["聲譽監控","假評論偵測","冒充警報","危機管理工具","情緒分析","競爭情報"],specs:e?{
"Monitoring Range":"Social, news, forums, reviews","Alert Speed":"Near real-time",Dashboard:"Customizable visualizations",Reports:"Automated + custom analysis",Integration:"CRM, marketing platforms"}
:{
監控範圍:"社群、新聞、論壇、評論",警報速度:"近乎即時",儀表板:"可自定義視覺化",報告:"自動化 + 客製分析",整合:"CRM、行銷平台"}
,comingSoon:!1,detailedDescription:{
title:e?"Brand Protection Suite":"品牌保護套件",formFactor:e?"Cloud Software":"雲端軟體",introduction:e?"Cyabra's Brand Protection Suite is a comprehensive digital defense system designed to safeguard brand reputation against various online threats. From coordinated disinformation campaigns to fake reviews and impersonation attempts, this suite provides the tools needed to identify, analyze, and respond to reputational risks effectively.":"Cyabra 的品牌保護套件是一個全面的數位防禦系統，旨在保護品牌聲譽免受各種網路威脅。從協調的假資訊活動到假評論和冒充嘗試，該套件提供了有效識別、分析和應對聲譽風險所需的工具。",keyFeatures:e?["Continuous brand mention monitoring across platforms","AI-powered fake review and rating detection","Account impersonation and trademark violation alerts","Crisis management workflow and response templates","Competitive landscape and threat actor analysis","Custom reporting and ROI metrics"]:["跨平台持續監控品牌提及","AI 驅動的假評論和評分偵測","帳號冒充和商標侵權警報","危機管理工作流程和回應範本","競爭格局和威脅行為者分析","客製化報告和 ROI 指標"],technicalSpecs:e?{
"Monitoring Coverage":"Social media, review sites, news outlets, forums, blogs, app stores","Detection Capabilities":"Coordinated inauthentic behavior, fake reviews, impersonation, misleading content","Alert System":"Customizable thresholds, notification channels (email, SMS, app)","Response Tools":"Guided workflows, pre-approved response templates, stakeholder collaboration",Analytics:"Trend analysis, sentiment tracking, impact measurement, share of voice",Reporting:"Scheduled reports, executive summaries, threat intelligence briefs",Integration:"Social media management platforms, CRM systems, PR tools",Security:"Enterprise-grade encryption, access controls, audit logs",Services:"Dedicated analyst support, crisis response team, regular strategy reviews"}
:{
監控覆蓋:"社群媒體、評論網站、新聞媒體、論壇、部落格、應用商店",檢測能力:"協調的不真實行為、假評論、冒充、誤導性內容",警報系統:"可自定義閾值、通知渠道（電子郵件、簡訊、應用程式）",回應工具:"引導式工作流程、預先批准的回應範本、利害關係人協作",分析:"趨勢分析、情感追蹤、影響力測量、聲量份額",報告:"定期報告、執行摘要、威脅情報簡報",整合:"社群媒體管理平台、CRM 系統、公關工具",安全:"企業級加密、存取控制、審計日誌",服務:"專屬分析師支援、危機應對團隊、定期策略檢討"}
}
}
,{
id:10,title:e?"Social Intelligence Platform":"社群智能平台",description:e?"Advanced analytics platform that provides deep insights into online conversations, trends, and authentic audience engagement metrics.":"先進的分析平台，提供對線上對話、趨勢和真實受眾參與指標的深入洞察。",icon:I.createElement(rg,{
className:"h-8 w-8 text-[#003daa]"}
),image:"/cyabra-images/cyabra-activity-graph-min-300x225.png",features:e?["Authentic engagement metrics","Trend forecasting and analysis","Audience segment insights","Conversation mapping","Content optimization","Competitive benchmarking"]:["真實參與度指標","趨勢預測和分析","受眾細分洞察","對話映射","內容優化","競爭基準"],specs:e?{
"Data Sources":"Social, forums, blogs, news",Analysis:"Authenticity-filtered metrics",Segments:"Customizable audience clusters",Reporting:"Automated + predictive",Exports:"Multiple formats, BI integration"}
:{
數據來源:"社群、論壇、部落格、新聞",分析:"真實性過濾指標",細分:"可自定義受眾集群",報告:"自動化 + 預測",匯出:"多種格式、BI 整合"}
,comingSoon:!1,detailedDescription:{
title:e?"Social Intelligence Platform":"社群智能平台",formFactor:e?"Cloud Software":"雲端軟體",introduction:e?"Cyabra's Social Intelligence Platform goes beyond traditional social listening by filtering out inauthentic activity to provide true audience insights. By distinguishing real engagement from artificial amplification, the platform enables organizations to understand genuine audience sentiment, identify emerging trends, and optimize content strategy based on authentic interaction.":"Cyabra 的社群智能平台超越傳統社群聆聽，過濾不真實活動，提供真實的受眾洞察。透過區分真實參與和人工放大，該平台使組織能夠了解真正的受眾情緒，識別新興趨勢，並根據真實互動優化內容策略。",keyFeatures:e?["Authenticity-filtered engagement metrics and audience insights","Real-time trend detection with predictive modeling","Granular audience segmentation based on verified behavior","Conversation journey mapping across platforms","Content performance analytics with optimization recommendations","Competitive intelligence with authentication factor"]:["真實性過濾的參與度指標和受眾洞察","具有預測模型的即時趨勢檢測","基於已驗證行為的精細受眾細分","跨平台對話旅程映射","含優化建議的內容表現分析","具有身份驗證因素的競爭情報"],technicalSpecs:e?{
"Data Collection":"Continuous crawling across major platforms and niche communities","Filtering Technology":"Proprietary authenticity algorithms removing bot activity and manipulation","Analysis Capabilities":"Sentiment analysis, topic clustering, influence identification, trend prediction","Audience Segmentation":"Demographic, psychographic, behavioral, and engagement-based clustering",Visualization:"Interactive dashboards, network graphs, conversation flows, geographic mapping",Reporting:"Scheduled reports, real-time alerts, custom query builder","Export Options":"CSV, Excel, PDF, API integration with major BI platforms","Historical Data":"Up to 5 years with full authenticity analysis",Processing:"Real-time streaming analytics with batch processing for deeper insights"}
:{
數據收集:"持續爬取主要平台和利基社群",過濾技術:"專有真實性算法，消除機器人活動和操縱",分析能力:"情緒分析、主題聚類、影響力識別、趨勢預測",受眾細分:"基於人口統計、心理特徵、行為和參與度的聚類",視覺化:"互動儀表板、網絡圖、對話流程、地理映射",報告:"定期報告、實時警報、自定義查詢構建器",匯出選項:"CSV、Excel、PDF、與主要 BI 平台的 API 整合",歷史數據:"具有完整真實性分析的最多 5 年數據",處理:"實時流分析與批處理，以獲得更深入洞察"}
}
}
,{
id:11,title:e?"Security Intelligence Services":"安全情報服務",description:e?"Professional services offering tailored threat intelligence, security assessments, and strategic consulting for organizations facing digital reputation and security challenges.":"專業服務，為面臨數位聲譽和安全挑戰的組織提供量身定制的威脅情報、安全評估和戰略諮詢。",icon:I.createElement(xm,{
className:"h-8 w-8 text-[#003daa]"}
),image:"/cyabra-images/soc2-type-2-compliance-badge.webp",features:e?["Threat actor profiling","Custom intelligence reports","Security vulnerability assessment","Crisis response planning","Executive team training","Long-term defense strategy"]:["威脅行為者剖析","客製情報報告","安全漏洞評估","危機應對規劃","高管團隊培訓","長期防禦策略"],specs:e?{
Delivery:"Consulting + reports",Team:"Security and intel experts",Timeline:"Project-based or retainer",Scope:"Custom to organization needs",Output:"Strategic recommendations"}
:{
交付方式:"咨詢 + 報告",團隊:"安全和情報專家",時間線:"專案型或保留型",範圍:"根據組織需求定制",產出:"戰略建議"}
,comingSoon:!1,detailedDescription:{
title:e?"Security Intelligence Services":"安全情報服務",formFactor:e?"Professional Services":"專業服務",introduction:e?"Cyabra's Security Intelligence Services combine expert analysis with advanced technology to provide organizations with tailored threat intelligence and strategic security consulting. These professional services address complex digital threats that require human expertise alongside technological solutions.":"Cyabra 的安全情報服務結合專家分析和先進技術，為組織提供量身定制的威脅情報和戰略安全諮詢。這些專業服務解決需要人類專業知識和技術解決方案的複雜數位威脅。",keyFeatures:e?["Threat actor identification and profiling","Customized intelligence briefings and reports","Digital vulnerability and exposure assessments","Crisis response planning and simulation exercises","Executive and team security awareness training","Long-term defensive strategy development"]:["威脅行為者識別和剖析","客製化情報簡報和報告","數位漏洞和暴露評估","危機應對規劃和模擬演習","高管和團隊安全意識培訓","長期防禦策略發展"],technicalSpecs:e?{
"Team Composition":"Former intelligence officers, cybersecurity experts, disinformation analysts","Assessment Methodology":"Proprietary risk framework combining technical and human factors","Intelligence Sources":"Open-source intelligence, deep/dark web monitoring, technical signal collection","Delivery Format":"Secure briefings, written reports, strategic workshops, training sessions","Project Types":"One-time assessments, ongoing monitoring, crisis response, strategic planning","Security Clearance":"Team members with appropriate government clearances when required","Global Coverage":"Analysis capabilities in multiple languages and regional contexts","Industry Expertise":"Specialized knowledge in political, corporate, financial, and public sector threats",Collaboration:"Integration with internal security teams and existing security vendors"}
:{
團隊組成:"前情報人員、網絡安全專家、假資訊分析師",評估方法:"結合技術和人為因素的專有風險框架",情報來源:"開源情報、深/暗網監控、技術信號收集",交付格式:"安全簡報、書面報告、策略工作坊、培訓課程",專案類型:"一次性評估、持續監控、危機應對、戰略規劃",安全許可:"必要時具有適當政府安全許可的團隊成員",全球覆蓋:"多語言和區域背景下的分析能力",行業專長:"政治、企業、金融和公共部門威脅的專業知識",協作:"與內部安全團隊和現有安全供應商整合"}
}
}
];
class Qe{
static getAllBrands(){
return Wa.filter(t=>t.isActive)}
static getBrandById(t){
return Wa.find(n=>n.id===t)}
static getBrandBySlug(t){
return Wa.find(n=>n.slug===t)}
static getProductsByBrand(t,n=!1){
return t==="eudtech"?Vl(n):t==="comino"?Xl(n):t==="cyabra"?Ql(n):[]}
static getBrandProduct(t,n){
return Qh.find(r=>r.brandId===t&&r.productId===n.toString())}
static getBrandColors(t){
const n=this.getBrandById(t);
return{
primary:(n==null?void 0:n.primaryColor)||"#2563eb",secondary:(n==null?void 0:n.secondaryColor)||"#1e40af"}
}
static getFeaturedProducts(t=6,n=!1){
const r=Vl(n).slice(0,2),o=Xl(n).slice(0,2),a=Ql(n).slice(0,2);
return[...r,...o,...a].slice(0,t)}
}
const wm=v.createContext(void 0),km=()=>{
const e=v.useContext(wm);
if(e===void 0)throw new Error("useBrandContext must be used within a BrandProvider");
return e}
,ag=({
children:e}
)=>{
const[t,n]=v.useState(null),[r,o]=v.useState([]),a=Dt();
v.useEffect(()=>{
const d=Qe.getAllBrands();
o(d),d.length>0&&!t&&n(d[0])}
,[]),v.useEffect(()=>{
const d=a.pathname.split("/");
if(d.includes("brands")&&d.length>2){
const m=d[d.indexOf("brands")+1];
if(m){
const h=Qe.getBrandBySlug(m);
h&&n(h)}
}
}
,[a.pathname]);
const c={
currentBrand:t,allBrands:r,setCurrentBrandBySlug:d=>{
const m=Qe.getBrandBySlug(d);
m&&n(m)}
,setCurrentBrandById:d=>{
const m=Qe.getBrandById(d);
m&&n(m)}
,getBrandColors:d=>d?Qe.getBrandColors(d):t?{
primary:t.primaryColor,secondary:t.secondaryColor}
:{
primary:"#2563eb",secondary:"#1e40af"}
}
;
return l.jsx(wm.Provider,{
value:c,children:e}
)}
;
class lg extends v.Component{
constructor(t){
super(t),this.state={
hasError:!1}
}
static getDerivedStateFromError(t){
return{
hasError:!0,error:t}
}
componentDidCatch(t,n){
console.error("ErrorBoundary caught an error:",t,n)}
render(){
return this.state.hasError?this.props.fallback?this.props.fallback:l.jsx("div",{
className:"min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900",children:l.jsxs("div",{
className:"max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6",children:[l.jsxs("div",{
className:"flex items-center space-x-3 mb-4",children:[l.jsx(qh,{
className:"h-8 w-8 text-red-500"}
),l.jsx("h2",{
className:"text-xl font-semibold text-gray-900 dark:text-white",children:"出現錯誤"}
)]}
),l.jsx("p",{
className:"text-gray-600 dark:text-gray-300 mb-4",children:"很抱歉，應用程式遇到了未預期的錯誤。"}
),l.jsx("button",{
onClick:()=>window.location.reload(),className:"w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors",children:"重新載入頁面"}
)]}
)}
):this.props.children}
}
const ig=({
children:e}
)=>l.jsx(lg,{
children:l.jsx(Hh,{
children:l.jsx(Xh,{
children:l.jsx(Bh,{
children:l.jsx(ag,{
children:e}
)}
)}
)}
)}
),sg=e=>[{
name:e?"Home":"首頁",href:"#home"}
,{
name:e?"Products":"產品",href:"#eudtech-products"}
,{
name:e?"Partner Brands":"代理品牌",href:"#",isDropdown:!0,disabled:!0,disabledText:e?"Coming Soon":"即將推出",children:[{
name:"Cyabra",href:"/brands/cyabra"}
,{
name:"Comino",href:"/brands/comino"}
]}
,{
name:e?"About":"關於我們",href:"#about"}
,{
name:e?"Careers":"職業機會",href:"/careers"}
,{
name:e?"Contact":"聯絡我們",href:"#contact"}
],ug=(e,t=100)=>{
if(window.location.pathname==="/"){
const r=document.getElementById(e);
if(r){
const a=r.getBoundingClientRect().top+window.pageYOffset-t;
window.scrollTo({
top:a,behavior:"smooth"}
)}
}
else sessionStorage.setItem("scrollToSection",e),window.location.href="/"}
,Vt=(e,t)=>{
if(t&&t.preventDefault(),e.startsWith("#")){
const n=e.substring(1);
ug(n)}
else window.location.href=e}
,Cm=()=>l.jsx(Yi,{
to:"/",className:"flex items-center",children:l.jsxs("div",{
className:"flex items-center",children:[l.jsx("div",{
className:"mr-1 relative",children:l.jsxs("svg",{
width:"60",height:"60",viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"mt-2",children:[l.jsx("defs",{
children:l.jsxs("linearGradient",{
id:"logoGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[l.jsx("stop",{
offset:"0%",stopColor:"#1e40af",stopOpacity:"1"}
),l.jsx("stop",{
offset:"100%",stopColor:"#0d9488",stopOpacity:"1"}
)]}
)}
),l.jsx("path",{
d:"M20 25h40v10H20zM20 45h40v10H20zM20 65h40v10H20z",fill:"url(#logoGradient)"}
),l.jsx("path",{
d:"M70 30h10v40H70zM80 30h20v2H80zM80 68h20v2H80z",stroke:"url(#logoGradient)",strokeWidth:"2"}
)]}
)}
),l.jsxs("div",{
className:"flex flex-col leading-none justify-center",children:[l.jsx("span",{
className:"text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-teal-600 dark:from-blue-500 dark:to-teal-400",children:"EudTech"}
),l.jsx("span",{
className:"text-xs tracking-wide opacity-80 dark:text-gray-300",children:"Eudaemonia Technology"}
)]}
)]}
)}
),Eu=({
themeMode:e,isDarkMode:t,toggleDarkMode:n,isScrolled:r,textColorClass:o,mobile:a=!1}
)=>{
const i=()=>e==="system"?l.jsxs("div",{
className:"relative",children:[t?l.jsx(bu,{
size:a?20:18,className:"hover:text-blue-400"}
):l.jsx(Su,{
size:a?20:18,className:"hover:text-yellow-400"}
),l.jsx(ym,{
size:a?10:8,className:`absolute ${
a?"-bottom-0.5 -right-0.5":"-bottom-1 -right-1"}
 bg-white dark:bg-gray-800 rounded-full p-0.5 border border-current ${
a?"opacity-80":"opacity-70"}
`}
)]}
):e==="dark"?l.jsx(Su,{
size:a?20:18,className:"hover:text-yellow-400"}
):l.jsx(bu,{
size:a?20:18,className:"hover:text-blue-400"}
),s=()=>`切換主題模式 (目前: ${
e==="system"?`跟隨系統 (${
t?"深色":"淺色"}
)`:e==="dark"?"深色模式":"淺色模式"}
)`;
return l.jsx("button",{
onClick:n,className:`flex items-center ${
a?"mr-2":"ml-2"}
 ${
o}
 ${
a?"p-1":"px-2 py-2"}
 rounded-md transition-colors duration-200 relative group`,"aria-label":s(),children:i()}
)}
,Iu=({
isEnglish:e,toggleLanguage:t,isScrolled:n,textColorClass:r,mobile:o=!1}
)=>l.jsxs("button",{
onClick:t,className:`flex items-center ${
o?"mr-2":""}
 ${
r}
 ${
o?"p-1":"px-3 py-2"}
 rounded-md text-sm font-medium transition-colors duration-200`,children:[l.jsx(Dr,{
size:o?20:18,className:"mr-1"}
),e?"中文":"EN"]}
),cg=({
link:e,textColorClass:t}
)=>{
var a;
const[n,r]=v.useState(!1),o=v.useRef(null);
return v.useEffect(()=>{
const i=s=>{
o.current&&!o.current.contains(s.target)&&r(!1)}
;
return document.addEventListener("mousedown",i),()=>{
document.removeEventListener("mousedown",i)}
}
,[]),l.jsxs("div",{
className:"relative",ref:o,children:[l.jsxs("button",{
onClick:()=>!e.disabled&&r(!n),className:`${
t}
 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out flex items-center gap-1 focus:outline-none relative group
          ${
e.disabled?"opacity-60 cursor-not-allowed":""}
`,children:[e.name,l.jsx(pm,{
className:`h-4 w-4 transform transition-transform ${
n?"rotate-180":""}
`}
),e.disabled&&l.jsx("span",{
className:"absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap",children:e.disabledText||"Coming Soon"}
)]}
),n&&!e.disabled&&l.jsx("div",{
className:"absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 transform origin-top-left",children:(a=e.children)==null?void 0:a.map(i=>l.jsx("a",{
href:i.href,onClick:s=>{
Vt(i.href,s),r(!1)}
,className:"block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700",children:i.name}
,i.name))}
)]}
)}
,dg=({
isOpen:e,navLinks:t,onClose:n}
)=>{
const[r,o]=v.useState({
}
);
if(!e)return null;
const a=i=>{
o(s=>({
...s,[i]:!s[i]}
))}
;
return l.jsx("div",{
className:"md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg border-t border-neutral-200 dark:border-gray-700",children:l.jsx("div",{
className:"px-2 pt-2 pb-3 space-y-1 sm:px-3",children:t.map(i=>l.jsx("div",{
children:i.isDropdown?l.jsxs("div",{
children:[l.jsxs("button",{
onClick:()=>!i.disabled&&a(i.name),className:`text-neutral-800 dark:text-neutral-100 hover:text-eudtech-700 dark:hover:text-eudtech-300 flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 relative
                    ${
i.disabled?"opacity-60 cursor-not-allowed":""}
`,children:[l.jsx("span",{
children:i.name}
),i.disabled?l.jsxs("span",{
className:"text-xs text-gray-500 dark:text-gray-400 ml-2",children:["(",i.disabledText||"Coming Soon",")"]}
):r[i.name]?l.jsx(pm,{
className:"h-5 w-5"}
):l.jsx(hm,{
className:"h-5 w-5"}
)]}
),!i.disabled&&r[i.name]&&i.children&&l.jsx("div",{
className:"pl-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 ml-3 mt-1",children:i.children.map(s=>l.jsx("a",{
href:s.href,onClick:u=>{
Vt(s.href,u),n()}
,className:"text-neutral-700 dark:text-neutral-200 hover:text-eudtech-700 dark:hover:text-eudtech-300 block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",children:s.name}
,s.name))}
)]}
):l.jsx("a",{
href:i.href,onClick:s=>{
Vt(i.href,s),n()}
,className:"text-neutral-800 dark:text-neutral-100 hover:text-eudtech-700 dark:hover:text-eudtech-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",children:i.name}
)}
,i.name))}
)}
)}
,jm=({
isEnglish:e,toggleLanguage:t,themeMode:n,isDarkMode:r,toggleDarkMode:o}
)=>{
const[a,i]=v.useState(!1),[s,u]=v.useState(0),c=Dt(),d=c.pathname==="/",m=c.pathname.startsWith("/products/"),h=sg(e);
v.useEffect(()=>{
const y=()=>{
u(window.scrollY)}
;
return window.addEventListener("scroll",y),()=>window.removeEventListener("scroll",y)}
,[]);
const x=Math.min(s/100,1),w=s>20,k=()=>{
if(m){
if(x<.1)return"transparent";
const y=r?"17, 24, 39":"255, 255, 255",j=Math.min(x*.9,.9);
return`rgba(${
y}
, ${
j}
)`}
else{
if(c.pathname==="/careers")return`rgba(${
r?"17, 24, 39":"255, 255, 255"}
, ${
.95}
)`;
{
const y=r?"17, 24, 39":"255, 255, 255",j=Math.max(.2,Math.min(x*.8,.8));
return`rgba(${
y}
, ${
j}
)`}
}
}
,b=()=>{
if(m&&x<.1)return"transparent";
if(c.pathname==="/careers")return`rgba(${
r?"55, 65, 81":"229, 231, 235"}
, 0.3)`;
const y=r?"55, 65, 81":"229, 231, 235",j=Math.max(.05,Math.min(x*.2,.2));
return`rgba(${
y}
, ${
j}
)`}
,p=()=>m||c.pathname==="/careers"?r?"text-gray-100 hover:text-blue-300":"text-gray-800 hover:text-blue-600":x<.3?"text-white hover:text-blue-200 font-medium text-shadow-sm tracking-wide":r?"text-gray-100 hover:text-blue-300":"text-gray-800 hover:text-blue-600",f=()=>m?x<.1?"none":x>.3?"blur(10px)":"blur(6px)":c.pathname==="/careers"?"blur(8px)":`blur(${
Math.max(4,Math.min(x*10,8))}
px)`,g=()=>m&&x<.1?"none":c.pathname==="/careers"?"0 1px 3px 0 rgba(0, 0, 0, 0.1)":`0 1px 3px 0 rgba(0, 0, 0, ${
Math.max(.03,Math.min(x*.08,.05))}
)`;
return l.jsxs("nav",{
className:"fixed w-full z-50 transition-all duration-500 ease-out",style:{
backgroundColor:k(),backdropFilter:f(),borderBottom:`1px solid ${
b()}
`,boxShadow:g()}
,children:[l.jsx("div",{
className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:l.jsxs("div",{
className:"flex items-center justify-between h-16",children:[l.jsxs("div",{
className:"flex items-center",children:[l.jsx("div",{
className:"flex-shrink-0",children:l.jsx(Cm,{
}
)}
),l.jsx("div",{
className:"hidden md:block",children:l.jsx("div",{
className:"ml-10 flex items-baseline space-x-4",children:h.map(y=>y.isDropdown?l.jsx(cg,{
link:y,textColorClass:p()}
,y.name):l.jsx("a",{
href:y.href,onClick:j=>Vt(y.href,j),className:`${
p()}
 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out ${
d&&s<30?"text-shadow-sm":""}
`,children:y.name}
,y.name))}
)}
)]}
),l.jsxs("div",{
className:"hidden md:flex items-center",children:[l.jsx(Iu,{
isEnglish:e,toggleLanguage:t,isScrolled:w,textColorClass:p()}
),l.jsx(Eu,{
themeMode:n,isDarkMode:r,toggleDarkMode:o,isScrolled:w,textColorClass:p()}
)]}
),l.jsxs("div",{
className:"md:hidden flex items-center",children:[l.jsx(Iu,{
isEnglish:e,toggleLanguage:t,isScrolled:w,textColorClass:p(),mobile:!0}
),l.jsx(Eu,{
themeMode:n,isDarkMode:r,toggleDarkMode:o,isScrolled:w,textColorClass:p(),mobile:!0}
),l.jsx("button",{
onClick:()=>i(!a),className:`${
p()}
 p-1 rounded-full transition-all duration-300 ease-out`,children:a?l.jsx(og,{
size:24}
):l.jsx(ng,{
size:24}
)}
)]}
)]}
)}
),l.jsx(dg,{
isOpen:a,navLinks:h,onClose:()=>i(!1)}
)]}
)}
,bm=(e={
}
)=>{
const{
threshold:t=.01,rootMargin:n="1000px 0px",triggerOnce:r=!0}
=e,[o,a]=v.useState(!1),[i,s]=v.useState(!1),u=v.useRef(null);
return v.useEffect(()=>{
const c=u.current;
if(!c)return;
const d=new IntersectionObserver(([m])=>{
const h=m.isIntersecting;
a(h),h&&r&&!i&&(s(!0),d.disconnect())}
,{
threshold:t,rootMargin:n}
);
return d.observe(c),()=>{
d.disconnect()}
}
,[t,n,r,i]),{
targetRef:u,isIntersecting:o,hasTriggered:i}
}
,mg=e=>({
title:{
main:e?"Empowering the Future":"賦能未來",highlight:e?"Through AI Innovation":"透過AI創新"}
,subtitle:e?"Groundbreaking AI solutions that transform industries and enhance human potential.":"開創性的AI解決方案，改變產業格局，提升人類潛能。",buttons:{
primary:e?"Explore Products":"探索產品",secondary:e?"Contact Us":"聯絡我們"}
}
),fg=()=>l.jsxs("div",{
className:"absolute inset-0 w-full h-full",children:[l.jsx("div",{
className:"absolute inset-0 bg-black/60 dark:bg-black/70 z-10"}
),l.jsx("img",{
src:"/grando-8gpu-server.jpg",alt:"AI Server Background",className:"absolute inset-0 w-full h-full object-cover transform scale-105 animate-subtle-zoom"}
)]}
),pg=({
content:e}
)=>l.jsxs("div",{
className:"relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center",children:[l.jsxs("h1",{
className:"text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6",children:[l.jsx("span",{
className:"block",children:e.title.main}
),l.jsx("span",{
className:"block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400",children:e.title.highlight}
)]}
),l.jsx("p",{
className:"mt-3 max-w-md mx-auto text-lg text-gray-300 sm:text-xl md:mt-5 md:max-w-xl",children:e.subtitle}
),l.jsxs("div",{
className:"mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4",children:[l.jsx("a",{
href:"#eudtech-products",className:"px-8 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-800 via-indigo-700 to-teal-800 hover:from-blue-700 hover:via-indigo-600 hover:to-teal-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_20px_rgba(14,165,233,0.3)] dark:shadow-[0_8px_30px_rgba(14,165,233,0.2)] transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-blue-500/30 backdrop-blur-sm",children:e.buttons.primary}
),l.jsx("a",{
href:"#contact",className:"px-8 py-3 text-base font-medium rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_8px_20px_rgba(30,41,59,0.4)] transition-all duration-300 transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm",children:e.buttons.secondary}
)]}
)]}
),hg=()=>l.jsx("div",{
className:"absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce",children:l.jsx("svg",{
className:"w-6 h-6 text-white",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",viewBox:"0 0 24 24",stroke:"currentColor",children:l.jsx("path",{
d:"M19 14l-7 7m0 0l-7-7m7 7V3"}
)}
)}
),gg=({
isEnglish:e}
)=>{
const t=mg(e),{
targetRef:n,isIntersecting:r}
=bm({
threshold:.1,triggerOnce:!1}
);
return l.jsxs("section",{
id:"home",ref:n,className:"relative h-screen flex items-center justify-center overflow-hidden",role:"banner","aria-label":e?"Hero section":"主要區塊",children:[l.jsx(fg,{
}
),l.jsx(pg,{
content:t}
),r&&l.jsx(hg,{
}
)]}
)}
,Y=(...e)=>e.filter(Boolean).join(" "),xg=({
children:e,maxWidth:t="7xl",className:n,padding:r=!0}
)=>{
const o={
sm:"max-w-sm",md:"max-w-md",lg:"max-w-lg",xl:"max-w-xl","2xl":"max-w-2xl","7xl":"max-w-7xl"}
;
return l.jsx("div",{
className:Y("mx-auto",o[t],r&&"px-4 sm:px-6 lg:px-8",n),children:e}
)}
,le=({
children:e,id:t,className:n,background:r="white",padding:o="lg",containerMaxWidth:a="7xl"}
)=>{
const i={
white:"bg-white dark:bg-gray-900",gray:"bg-gray-50 dark:bg-gray-800",gradient:"bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800",transparent:"bg-transparent"}
,s={
none:"",sm:"py-8",md:"py-12",lg:"py-16",xl:"py-20"}
;
return l.jsx("section",{
id:t,className:Y("relative",i[r],s[o],n),children:l.jsx(xg,{
maxWidth:a,children:e}
)}
)}
,Sm=v.memo(({
children:e,className:t,variant:n="default",padding:r="md",hover:o=!1,lazy:a=!1}
)=>{
const{
targetRef:i,isIntersecting:s}
=bm({
threshold:.1,triggerOnce:!0}
),u="bg-white dark:bg-gray-800 rounded-lg transition-all duration-300",c={
default:"shadow-md dark:shadow-gray-900/20",elevated:"shadow-3d-light dark:shadow-3d-dark",outlined:"border border-gray-200 dark:border-gray-700",glass:"backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 shadow-glass"}
,d={
none:"",sm:"p-4",md:"p-6",lg:"p-8"}
,m=o?"hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]":"",h=Y(u,c[n],d[r],m,t);
return a&&!s?l.jsxs("div",{
ref:i,className:Y(h,"animate-pulse"),style:{
minHeight:"200px"}
,children:[l.jsx("div",{
className:"bg-gray-200 dark:bg-gray-700 rounded h-4 mb-4"}
),l.jsx("div",{
className:"bg-gray-200 dark:bg-gray-700 rounded h-4 mb-2"}
),l.jsx("div",{
className:"bg-gray-200 dark:bg-gray-700 rounded h-4 w-3/4"}
)]}
):l.jsx("div",{
ref:i,className:h,children:e}
)}
);
Sm.displayName="OptimizedCard";
const yg=({
features:e}
)=>l.jsx("div",{
className:"grid grid-cols-2 gap-3 mb-4",children:e.map((t,n)=>l.jsxs("div",{
className:"flex items-center text-sm",children:[l.jsx("div",{
className:"h-1.5 w-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2 flex-shrink-0"}
),l.jsx("span",{
className:"text-gray-600 dark:text-gray-300",children:t}
)]}
,n))}
),Nm=e=>new Promise((t,n)=>{
const r=new Image;
r.onload=()=>t(),r.onerror=n,r.src=e}
),Pm=async e=>{
const t=e.map(Nm);
await Promise.all(t)}
,vg=()=>{
const e=document.querySelectorAll("img[data-src]"),t=new IntersectionObserver(n=>{
n.forEach(r=>{
if(r.isIntersecting){
const o=r.target,a=o.getAttribute("data-src");
a&&(Nm(a),o.removeAttribute("data-src"),t.unobserve(o))}
}
)}
,{
threshold:.1,rootMargin:"300px 0px"}
);
e.forEach(n=>t.observe(n))}
,wg=e=>e,kg=()=>{
Pm(["/grando-8gpu-server.jpg","/comino-4xa100.jpg","/comino-h100-server.jpg","/comino-workstation-front.png","/EudTech-Select-server-front.png","/GRANDO DPR 4090-FT_6_01.jpg","/comino-grando-logo.png","/comino-facility-1.jpg","/GRANDO DPR 4090-FT_6_02.jpg","/GRANDO DPR 4090-FT_6_03.jpg","/GRANDO DPR 4090-FT_6_04.jpg","/GRANDO DPR 4090-FT_6_05.jpg","/GRANDO DPR 4090-FT_6_06.jpg","/comino-facility-2.jpg","/comino-facility-3.jpg","/amd-logo.png","/amd-partner-badge.jpg"]),setTimeout(()=>{
document.querySelectorAll("img").forEach(n=>{
const r=n.getAttribute("src");
if(r&&!r.startsWith("data:")){
const o=new Image;
o.src=r}
}
),vg(),fetch("/public-images-list.json").then(n=>n.json()).catch(()=>{
console.log("找不到圖片清單，繼續使用默認預載入策略")}
)}
,500),console.log("增強型圖片預載入系統已啟動 - 將主動載入所有圖片資源")}
,Cg=({
src:e,alt:t,className:n,onLoad:r,onError:o}
)=>{
const[a,i]=v.useState(!1),s=v.useRef(null),u=()=>{
i(!0),r==null||r()}
,c=()=>{
o==null||o()}
,d=wg(e);
return I.useEffect(()=>{
const m=new Image;
m.src=e}
,[e]),l.jsxs("div",{
ref:s,className:Y("relative overflow-hidden",n),children:[l.jsx("div",{
className:Y("absolute inset-0 w-full h-full bg-center bg-cover transition-opacity duration-300 filter blur-sm transform scale-105",a?"opacity-0":"opacity-100"),style:{
backgroundImage:`url(${
d}
)`,backgroundSize:"cover",backgroundPosition:"center",backgroundColor:"rgba(15, 23, 42, 0.3)"}
}
),l.jsx("img",{
src:e,alt:t,onLoad:u,onError:c,className:Y("w-full h-full transition-all duration-500",a?"opacity-100":"opacity-0"),style:{
objectFit:n!=null&&n.includes("object-contain")?"contain":"cover",objectPosition:"center"}
}
)]}
)}
,jg=({
product:e,isEnglish:t,showDetails:n=!0}
)=>l.jsx("div",{
id:`product-card-${
e.id}
`,children:l.jsxs(Sm,{
variant:"elevated",padding:"none",hover:!0,lazy:!0,className:"overflow-hidden border border-gray-100 dark:border-gray-700/50",children:[e.comingSoon&&l.jsx("div",{
className:"bg-blue-800 dark:bg-blue-700 text-white text-center py-2 text-sm font-medium",children:t?"COMING SOON":"即將推出"}
),l.jsxs("div",{
className:"relative h-48",children:[l.jsx(Cg,{
src:e.image,alt:e.title,className:"w-full h-full object-cover"}
),l.jsx("div",{
className:"absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"}
),l.jsxs("div",{
className:"absolute bottom-4 left-4 text-white",children:[l.jsx("div",{
className:"mb-2",children:e.icon}
),l.jsx("h3",{
className:"text-xl font-bold",children:e.title}
)]}
)]}
),l.jsxs("div",{
className:"p-6",children:[l.jsx("p",{
className:"text-gray-600 dark:text-gray-300 mb-4",children:e.description}
),l.jsx(yg,{
features:e.features.slice(0,4)}
),l.jsx("div",{
className:"border-t dark:border-gray-700 pt-4",children:l.jsxs("div",{
className:"flex justify-between items-center",children:[n&&!e.comingSoon&&l.jsx(Yi,{
to:`/products/${
e.id}
`,state:{
fromSection:e.id>=5?"comino-products":"eudtech-products",fromHome:!0,productId:e.id}
,className:"inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 group cursor-pointer",children:l.jsxs("span",{
className:"relative z-10 flex items-center",children:[t?"Learn More":"了解更多",l.jsx(hm,{
className:"ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"}
)]}
)}
),l.jsx("a",{
href:"#contact",className:"text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium ml-auto",children:t?"Get Quote":"取得報價"}
)]}
)}
)]}
)]}
)}
),Tm=({
products:e,isEnglish:t,columns:n=2,showDetails:r=!0}
)=>{
const o={
1:"grid-cols-1",2:"grid-cols-1 lg:grid-cols-2",3:"grid-cols-1 md:grid-cols-2 lg:grid-cols-3",4:"grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}
;
return l.jsx("div",{
className:`grid ${
o[n]}
 gap-8`,children:e.map(a=>l.jsx(jg,{
product:a,isEnglish:t,showDetails:r}
,a.id))}
)}
,bg=({
isEnglish:e}
)=>{
const t=Vl(e);
return l.jsxs(le,{
id:"eudtech-products",background:"white",children:[l.jsxs("div",{
className:"text-center mb-16",children:[l.jsx("h2",{
className:"text-base font-semibold tracking-wide text-blue-800 dark:text-blue-400 uppercase",children:e?"EudTech Solutions":"EudTech 解決方案"}
),l.jsx("p",{
className:"mt-1 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight",children:e?"Our Proprietary Products":"我們的自有產品"}
),l.jsx("p",{
className:"max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-300",children:e?"Innovative AI solutions developed in-house to meet specific industry needs.":"為滿足特定行業需求而內部開發的創新AI解決方案。"}
)]}
),l.jsx(Tm,{
products:t,isEnglish:e,columns:2}
)]}
)}
,Sg=({
isEnglish:e}
)=>l.jsxs("div",{
className:"text-center mb-16",children:[l.jsx("div",{
className:"flex justify-center mb-8",children:l.jsx("div",{
className:"flex items-center space-x-4",children:l.jsx("a",{
href:"https://www.grando.ai/",target:"_blank",rel:"noopener noreferrer",className:"hover:opacity-80 transition-opacity",children:l.jsx("img",{
src:"/comino-grando-logo.png",alt:"Comino Grando Logo",className:"h-16 object-contain bg-gray-800 p-3 rounded shadow-md"}
)}
)}
)}
),l.jsx("h2",{
className:"text-base font-semibold tracking-wide text-blue-600 dark:text-blue-400 uppercase mb-4",children:e?"Authorized Distributor":"授權經銷商"}
),l.jsx("h3",{
className:"text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mb-6",children:l.jsx("a",{
href:"https://www.grando.ai/",target:"_blank",rel:"noopener noreferrer",className:"hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Comino Grando"}
)}
),l.jsx("p",{
className:"text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8",children:e?"EudTech is the authorized distributor of Comino, the world leader in liquid-cooled AI computing solutions. Comino Grando systems are engineered - not just assembled - delivering unprecedented performance for AI training, inference, and HPC workloads with liquid-cooled multi-GPU devices.":"EudTech是Comino的授權經銷商，Comino是液冷AI運算解決方案的全球領導者。Comino Grando系統經過工程設計而非僅僅組裝，為AI訓練、推論和HPC工作負載提供前所未有的效能。"}
),l.jsx("div",{
className:"flex justify-center mb-12",children:l.jsx("img",{
src:"/amd-partner-badge.jpg",alt:"AMD Elite Partner",className:"h-20 object-contain"}
)}
)]}
),Ki=({
features:e,brand:t,title:n}
)=>l.jsxs("div",{
className:"py-12",children:[n&&l.jsxs("div",{
className:"text-center mb-12",children:[l.jsx("h2",{
className:"text-3xl font-bold mb-4",style:{
color:t==null?void 0:t.primaryColor}
,children:n}
),l.jsx("div",{
className:"w-24 h-1 mx-auto",style:{
backgroundColor:t==null?void 0:t.primaryColor}
}
)]}
),l.jsx("div",{
className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8",children:e.map((r,o)=>l.jsxs("div",{
className:"text-center group",children:[l.jsx("div",{
className:"flex justify-center mb-4",children:l.jsx("div",{
className:"p-3 rounded-full transition-colors",style:{
backgroundColor:t?`${
t.primaryColor}
20`:"bg-gray-100 dark:bg-gray-800",color:t==null?void 0:t.primaryColor}
,children:r.icon}
)}
),l.jsx("h4",{
className:"text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3",children:r.title}
),l.jsx("p",{
className:"text-gray-600 dark:text-gray-300 text-sm",children:r.description}
)]}
,o))}
)]}
),Em=({
partners:e,isEnglish:t}
)=>l.jsxs("div",{
className:"bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 mb-20",children:[l.jsx("h4",{
className:"text-2xl font-bold text-gray-900 dark:text-white text-center mb-6 sm:mb-8",children:t?"Compatible Technologies":"相容技術"}
),l.jsx("div",{
className:"grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap justify-center items-center gap-x-6 sm:gap-x-8 gap-y-10 py-4",children:e.map((n,r)=>{
const o=["NVIDIA","Comino"].includes(n.name),a=n.name==="AMD";
return l.jsxs("div",{
className:"flex items-center group relative",children:[o&&l.jsx("div",{
className:"absolute inset-0 rounded-full blur-lg opacity-25 bg-gradient-to-r from-blue-300 to-blue-500 -z-10"}
),a&&l.jsx("div",{
className:"absolute inset-0 rounded-full blur-xl opacity-0 dark:opacity-30 bg-gradient-to-r from-red-500 to-red-600 -z-10"}
),l.jsx("div",{
className:`flex items-center justify-center ${
o?"p-3 relative bg-gray-800 dark:bg-gray-800 rounded shadow-md":a?"p-3 relative dark:p-3":""}
`,children:l.jsx("img",{
src:n.logo,alt:n.name,className:`w-auto h-14 max-w-[120px] opacity-90 ${
o?"drop-shadow-md dark:opacity-100 dark:drop-shadow-lg filter dark:invert-0":a?"drop-shadow-sm dark:drop-shadow-lg dark:opacity-100 dark:filter dark:brightness-125":"dark:opacity-90"}
 object-contain hover:opacity-100 transition-all duration-300 group-hover:scale-105`,loading:"lazy"}
)}
)]}
,r)}
)}
)]}
),Im=({
reviews:e,isEnglish:t}
)=>l.jsxs("div",{
className:"text-center mb-16",children:[l.jsx("h4",{
className:"text-2xl font-bold text-gray-900 dark:text-white mb-8",children:t?"Industry Recognition":"業界認可"}
),l.jsx("div",{
className:"grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto",children:e.map((n,r)=>l.jsxs("div",{
className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow",children:[l.jsxs("div",{
className:"flex items-center mb-4",children:[l.jsx("img",{
src:n.avatar||"/default-avatar.png",alt:n.name,className:"w-16 h-16 rounded-full object-cover mr-4"}
),l.jsxs("div",{
children:[l.jsx("h5",{
className:"font-semibold text-gray-900 dark:text-white",children:n.name}
),l.jsx("p",{
className:"text-sm text-gray-600 dark:text-gray-300",children:n.role}
),l.jsx("p",{
className:"text-xs text-gray-500 dark:text-gray-400",children:n.company}
)]}
)]}
),l.jsxs("p",{
className:"text-gray-700 dark:text-gray-200 italic",children:['"',n.content,'"']}
)]}
,r))}
)]}
),Rm={
base:"bg-gradient-to-r from-white to-gray-50 dark:from-blue-900/40 dark:to-teal-800/40 p-8 rounded-xl mb-12 max-w-3xl mx-auto shadow-lg border border-gray-200 dark:border-blue-900/20 backdrop-blur-sm"}
,Am={
container:"flex justify-center items-center gap-6 mb-6"}
,Ng={
image:"h-16 object-contain bg-white p-1 rounded-lg shadow-sm"}
,Ru={
container:"flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-white/20 backdrop-blur",symbol:"text-gray-600 dark:text-white text-xl font-bold transform"}
,Pg={
text:"text-gray-700 dark:text-white text-center text-lg font-medium"}
,Ga={
container:"flex justify-center mt-4",button:"px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white rounded-lg transition-colors duration-200 font-medium shadow-sm hover:shadow flex items-center",icon:"h-5 w-5 ml-2"}
,an={
container:"flex items-center",svgContainer:"relative",svg:"w-[72px] h-[72px]",textContainer:"flex flex-col leading-none justify-center",title:"text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-teal-600 dark:from-blue-500 dark:to-teal-400",subtitle:"text-xs tracking-wide text-gray-600 dark:text-white/80"}
,Tg=({
imageSrc:e,altText:t,className:n=""}
)=>l.jsx("div",{
className:"rounded-lg overflow-hidden bg-white shadow-sm",children:l.jsx("img",{
src:e,alt:t,className:`${
Ng.image}
 ${
n}
`}
)}
),Eg=({
className:e=""}
)=>l.jsx("div",{
className:"rounded overflow-hidden shadow-md",children:l.jsx("img",{
src:"/comino-grando-logo.png",alt:"Comino Logo",className:`h-16 object-contain bg-gray-800 p-3 rounded shadow-md ${
e}
`}
)}
),Mm=({
className:e="",gradientId:t="logoGradientDealer"}
)=>l.jsxs("div",{
className:`${
an.container}
 ${
e}
`,children:[l.jsx("div",{
className:an.svgContainer,children:l.jsxs("svg",{
width:"72",height:"72",viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:an.svg,children:[l.jsx("defs",{
children:l.jsxs("linearGradient",{
id:t,x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[l.jsx("stop",{
offset:"0%",stopColor:"#1e40af",stopOpacity:"1"}
),l.jsx("stop",{
offset:"100%",stopColor:"#0d9488",stopOpacity:"1"}
)]}
)}
),l.jsx("path",{
d:"M20 25h40v10H20zM20 45h40v10H20zM20 65h40v10H20z",fill:`url(#${
t}
)`,className:"drop-shadow-sm"}
),l.jsx("path",{
d:"M70 30h10v40H70zM80 30h20v2H80zM80 68h20v2H80z",stroke:`url(#${
t}
)`,strokeWidth:"2",className:"drop-shadow-sm"}
)]}
)}
),l.jsxs("div",{
className:an.textContainer,children:[l.jsx("span",{
className:an.title,children:"EudTech"}
),l.jsx("span",{
className:an.subtitle,children:"Eudaemonia Technology"}
)]}
)]}
),Dm=({
symbol:e="×",className:t=""}
)=>l.jsx("div",{
className:`${
Ru.container}
 ${
t}
`,children:l.jsx("span",{
className:Ru.symbol,children:e}
)}
),Ig=({
brandLogoSrc:e,className:t=""}
)=>l.jsxs("div",{
className:`${
Am.container}
 ${
t}
`,children:[l.jsx(Tg,{
imageSrc:e,altText:"Cyabra Logo"}
),l.jsx(Dm,{
}
),l.jsx(Mm,{
gradientId:`logoGradientDealer-${
Math.random().toString(36).substr(2,9)}
`}
)]}
),Rg=({
className:e=""}
)=>l.jsxs("div",{
className:`${
Am.container}
 ${
e}
`,children:[l.jsx(Eg,{
}
),l.jsx(Dm,{
}
),l.jsx(Mm,{
gradientId:`logoGradientDealer-${
Math.random().toString(36).substr(2,9)}
`}
)]}
),_m=({
infoText:e,className:t=""}
)=>l.jsx("p",{
className:`${
Pg.text}
 ${
t}
`,children:e}
),Lm=({
linkText:e,linkUrl:t,className:n=""}
)=>l.jsx("div",{
className:`${
Ga.container}
 ${
n}
`,children:l.jsxs("a",{
href:t,target:"_blank",rel:"noopener noreferrer",className:Ga.button,children:[e,l.jsx("svg",{
xmlns:"http://www.w3.org/2000/svg",className:Ga.icon,viewBox:"0 0 20 20",fill:"currentColor",children:l.jsx("path",{
fillRule:"evenodd",d:"M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z",clipRule:"evenodd"}
)}
)]}
)}
),Ag=({
isEnglish:e,className:t=""}
)=>{
const n=e?"EudTech is now the official Cyabra distributor. You can check our authorization on the official Cyabra distributor page:":"EudTech已列為Cyabra官方經銷商。您可以在Cyabra官網經銷商頁面查證我們的授權：",r=e?"Verify on Cyabra Website":"Cyabra經銷商頁面";
return l.jsxs("div",{
className:`${
Rm.base}
 ${
t}
`,children:[l.jsx(Ig,{
brandLogoSrc:"/cyabra-logo.svg"}
),l.jsx(_m,{
infoText:n}
),l.jsx(Lm,{
linkText:r,linkUrl:"https://cyabra.com/become-a-partner/"}
)]}
)}
,Mg=({
isEnglish:e,className:t=""}
)=>{
const n=e?"EudTech is now the official Comino distributor. You can check our authorization on the official Comino distributor page:":"EudTech已列為Comino官方經銷商。您可以在Comino官網經銷商頁面查證我們的授權：",r=e?"Verify on Comino Website":"Comino經銷商頁面";
return l.jsxs("div",{
className:`${
Rm.base}
 ${
t}
`,children:[l.jsx(Rg,{
}
),l.jsx(_m,{
infoText:n}
),l.jsx(Lm,{
linkText:r,linkUrl:"https://www.comino.com/en/company"}
)]}
)}
,Dg=({
isEnglish:e}
)=>{
const t=[{
icon:I.createElement(gm,{
className:"h-8 w-8 text-blue-600"}
),title:e?"Engineered Around Liquid Cooling":"以液冷技術為核心設計",description:e?"Grando is designed from scratch by the Comino team. Maximizes the benefits of liquid-cooling & minimizes its drawbacks with manufactured & tailored components.":"Grando由Comino團隊從零開始設計，最大化液冷技術優勢並最小化其缺點，採用專門製造和客製化元件。"}
,{
icon:I.createElement(Wo,{
className:"h-8 w-8 text-yellow-600"}
),title:e?"Engineered for 24/7 Operation":"24/7全天候運作設計",description:e?"Designed for continuous operation up to 40°C with zero thermal throttling. The quality assurance cycle from idea to support in single hands.":"設計可在40°C高溫環境下24小時連續運作，無熱節流。從概念到支援的品質保證循環全由單一團隊掌控。"}
,{
icon:I.createElement(Dr,{
className:"h-8 w-8 text-green-600"}
),title:e?"Storage Review Best of 2024":"2024年StorageReview最佳獎",description:e?'Comino Grando has received the "Storage Review Best of 2024" award for accommodating up to six 450W GPUs in a 4U chassis while ensuring optimal performance.':"Comino Grando榮獲「2024年StorageReview最佳獎」，在4U機箱中容納最多6個450W GPU，同時確保最佳效能。"}
,{
icon:I.createElement(vm,{
className:"h-8 w-8 text-teal-600"}
),title:e?"Extreme Performance":"極致效能",description:e?"8 GPUs, 2 CPUs - 40% faster than air-cooled systems. Cooling capacity up to 5.5kW @25°C, enough to run up to 8x 600W GPUs with 90% utilization rate.":"8個GPU，2個CPU - 比氣冷系統快40%。散熱容量在25°C下可達5.5kW，足以支援8個600W GPU在90%使用率下運作。"}
],n=[{
id:1,name:"TensorFlow",logo:"/tensorflow-logo.png",description:""}
,{
id:2,name:"PyTorch",logo:"/pytorch-logo.png",description:""}
,{
id:3,name:"Keras",logo:"/keras-logo.png",description:""}
,{
id:4,name:"NVIDIA",logo:"/nvidia-logo.png",description:""}
,{
id:5,name:"AMD",logo:"/amd-logo.png",description:""}
,{
id:6,name:"Comino",logo:"/comino-logo.png",description:""}
],r=[{
id:1,name:"Sentdex",role:e?"Harrison Kinsley, AI Researcher & YouTuber":"Harrison Kinsley，AI研究者與YouTuber",company:"",content:e?"A lot of inference power comes from this Powerhouse machine from Comino which has not one, not two, not three - it has six 4090s inside!":"Comino這台強大機器帶來大量推論能力，不是一個、不是兩個、不是三個 - 它內建6個4090！",avatar:"/sentdex-review.jpg"}
,{
id:2,name:"Linus Tech Tips",role:e?"Tech Reviewer":"技術評測者",company:"",content:e?"Our Password Recovery Machine helps to improve passwords in a Crackinator Project by Linus Tech Tips.":"我們的密碼破解機器協助Linus Tech Tips在Crackinator專案中提升密碼強度。",avatar:"/linus-review.jpg"}
,{
id:3,name:"Storage Review",role:e?"Storage Review Team":"Storage Review團隊",company:"",content:e?`StorageReview.com published an outstanding review of Comino Grando units. We're thrilled that Grando received the "Storage Review Best of 2024" award.`:"StorageReview.com發表了對Comino Grando的傑出評測。我們很高興Grando榮獲「2024年StorageReview最佳獎」。",avatar:"/sentdex-review.jpg"}
];
return l.jsxs(le,{
id:"comino-brand",background:"gradient",children:[l.jsx(Sg,{
isEnglish:e}
),l.jsx(Mg,{
isEnglish:e}
),l.jsx("div",{
className:"mb-20",children:l.jsxs("div",{
className:"relative rounded-2xl overflow-hidden shadow-2xl",children:[l.jsx("img",{
src:"/comino-4xa100.jpg",alt:"Comino Grando AI System",className:"w-full h-96 object-cover"}
),l.jsx("div",{
className:"absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center",children:l.jsxs("div",{
className:"text-white p-12",children:[l.jsx("h4",{
className:"text-3xl font-bold mb-4",children:e?"Liquid-Cooled Multi-GPU Devices":"液冷多GPU設備"}
),l.jsx("p",{
className:"text-lg font-medium",children:e?"For AI Inference & Training - Engineered around liquid cooling technology with up to 8 GPUs":"用於AI推論與訓練 - 圍繞液冷技術設計，最高支援8個GPU"}
)]}
)}
)]}
)}
),l.jsx("div",{
className:"flex justify-center mb-16",children:l.jsx("img",{
src:"/amd-partner-badge.jpg",alt:"AMD Partner Program ELITE",className:"h-24 shadow-lg rounded"}
)}
),l.jsx(Ki,{
features:t}
),l.jsx(Em,{
partners:n,isEnglish:e}
),l.jsx(Im,{
reviews:r,isEnglish:e}
),l.jsxs("div",{
className:"text-center",children:[l.jsx("p",{
className:"text-gray-600 dark:text-gray-300 mb-6",children:e?"Discover the full range of Comino Grando products available through EudTech":"探索EudTech提供的完整Comino Grando產品線"}
),l.jsx("div",{
className:"flex flex-col items-center",children:l.jsx("button",{
disabled:!0,className:"inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-400 bg-gray-300 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed transition duration-200",title:e?"Coming soon":"即將推出",children:e?"Explore Comino Products":"探索Comino產品"}
)}
)]}
)]}
)}
,_g=({
isEnglish:e}
)=>{
const t=[{
icon:I.createElement(Zt,{
className:"h-8 w-8 text-[#003daa]"}
),title:e?"Brand Protection":"品牌保護",description:e?"Protect your brand from fake profiles and disinformation campaigns that can damage your reputation and user trust.":"保護您的品牌免受可能損害您聲譽和用戶信任的假帳號和假資訊活動的影響。"}
,{
icon:I.createElement(Hl,{
className:"h-8 w-8 text-[#003daa]"}
),title:e?"Real-time Alerts":"即時警報",description:e?"Receive proactive notifications about potential threats to your brand reputation with 24/7 monitoring.":"通過24/7監控，接收有關潛在品牌聲譽威脅的主動通知。"}
,{
icon:I.createElement($o,{
className:"h-8 w-8 text-[#003daa]"}
),title:e?"Fake Profile Detection":"假帳號偵測",description:e?"AI-powered analysis identifies fake accounts and suspicious behavior across social media platforms.":"AI動力分析在社交媒體平台上識別假帳號和可疑行為。"}
,{
icon:I.createElement(Dr,{
className:"h-8 w-8 text-[#003daa]"}
),title:e?"Trend Analysis":"趨勢分析",description:e?"Understand authentic vs. artificial online trends to make better marketing and PR decisions.":"了解真實vs.人造的網路趨勢，做出更好的營銷和公關決策。"}
];
return l.jsxs(le,{
id:"cyabra-brand",background:"gradient",className:"bg-gradient-to-r from-white to-gray-100 dark:from-[#001e54] dark:to-[#003daa] text-gray-800 dark:text-white",children:[l.jsxs("div",{
className:"text-center mb-16",children:[l.jsx("div",{
className:"flex justify-center mb-8",children:l.jsx("div",{
className:"flex items-center space-x-4",children:l.jsx("a",{
href:"https://www.cyabra.com/",target:"_blank",rel:"noopener noreferrer",className:"hover:opacity-80 transition-opacity shadow-xl",children:l.jsx("img",{
src:"/cyabra-logo.svg",alt:"Cyabra",className:"w-32 h-32 object-contain bg-white rounded-xl p-4 border border-gray-200"}
)}
)}
)}
),l.jsx("h2",{
className:"text-base font-semibold tracking-wide text-blue-600 dark:text-blue-300 uppercase mb-4",children:e?"Authorized Distributor":"授權經銷商"}
),l.jsx("h3",{
className:"text-4xl font-bold text-gray-800 dark:text-white sm:text-5xl mb-6",children:l.jsx("a",{
href:"https://www.cyabra.com/",target:"_blank",rel:"noopener noreferrer",className:"hover:text-blue-600 dark:hover:text-blue-300 transition-colors",children:"Cyabra"}
)}
),l.jsx("p",{
className:"text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto mb-8",children:e?"EudTech is the authorized distributor of Cyabra, the leader in disinformation detection and brand protection solutions. Cyabra uses AI to uncover fake profiles, harmful narratives, and deepfakes that threaten corporate and public sector communications.":"EudTech是Cyabra的授權經銷商，Cyabra是虛假信息檢測和品牌保護解決方案的領導者。Cyabra使用AI技術來揭露威脅企業和公共部門通信的假帳號、有害敘事和深度偽造。"}
)]}
),l.jsx(Ag,{
isEnglish:e}
),l.jsx("div",{
className:"mb-20",children:l.jsxs("div",{
className:"relative rounded-2xl overflow-hidden shadow-2xl",children:[l.jsx("img",{
src:"/cyabra-images/cyabra-activity-graph-min-300x225.png",alt:"Cyabra Dashboard",className:"w-full h-96 object-cover"}
),l.jsx("div",{
className:"absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center",children:l.jsxs("div",{
className:"text-white p-12",children:[l.jsx("h4",{
className:"text-3xl font-bold mb-4",children:e?"Uncovering The Good, Bad, and Fake Online":"揭露網路上的真相、風險和假訊息"}
),l.jsx("p",{
className:"text-lg font-medium",children:e?"Advanced AI tools that detect disinformation campaigns, fake profiles, and protect brand reputation":"先進的AI工具，用於檢測假資訊活動、假帳號，保護品牌聲譽"}
)]}
)}
)]}
)}
),l.jsx("div",{
className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16",children:t.map((n,r)=>l.jsxs("div",{
className:"bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:bg-gray-100 dark:hover:bg-white/20 transition-colors duration-300",children:[l.jsx("div",{
className:"mb-4",children:n.icon}
),l.jsx("h3",{
className:"text-xl font-bold mb-3",children:n.title}
),l.jsx("p",{
className:"text-gray-700 dark:text-gray-200",children:n.description}
)]}
,r))}
),l.jsxs("div",{
className:"bg-gray-100 dark:bg-[#001e54]/50 rounded-xl p-8 mb-16 shadow-md",children:[l.jsx("h3",{
className:"text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white",children:e?"Why Cyabra Matters":"為何Cyabra重要"}
),l.jsxs("div",{
className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",children:[l.jsxs("div",{
className:"text-center",children:[l.jsx("div",{
className:"text-4xl font-bold mb-2 text-blue-600 dark:text-blue-300",children:"#1"}
),l.jsx("div",{
className:"text-lg text-gray-700 dark:text-white",children:e?"Disinformation - Major Global Risk":"假資訊 - 主要全球風險"}
)]}
),l.jsxs("div",{
className:"text-center",children:[l.jsx("div",{
className:"text-4xl font-bold mb-2 text-blue-600 dark:text-blue-300",children:"$500B"}
),l.jsx("div",{
className:"text-lg text-gray-700 dark:text-white",children:e?"Spent on Disinformation by 2028":"到2028年用於假資訊的支出"}
)]}
),l.jsxs("div",{
className:"text-center",children:[l.jsx("div",{
className:"text-4xl font-bold mb-2 text-blue-600 dark:text-blue-300",children:"24/7"}
),l.jsx("div",{
className:"text-lg text-gray-700 dark:text-white",children:e?"Real-time Threat Monitoring":"即時威脅監控"}
)]}
),l.jsxs("div",{
className:"text-center",children:[l.jsx("div",{
className:"text-4xl font-bold mb-2 text-blue-600 dark:text-blue-300",children:"89%"}
),l.jsx("div",{
className:"text-lg text-gray-700 dark:text-white",children:e?"Accuracy in Detecting Fake Profiles":"假帳號檢測準確率"}
)]}
)]}
)]}
),l.jsxs("div",{
className:"mb-16",children:[l.jsxs("div",{
className:"flex flex-col items-center mb-10",children:[l.jsx("h2",{
className:"text-base font-semibold tracking-wide text-blue-600 dark:text-blue-300 uppercase",children:e?"TESTIMONIALS":"客戶見證"}
),l.jsx("h3",{
className:"text-3xl font-bold mt-2 text-center text-gray-800 dark:text-white",children:e?"What Industry Leaders Say About Cyabra":"行業領導者對Cyabra的評價"}
),l.jsx("div",{
className:"h-1 w-20 bg-gradient-to-r from-blue-600 to-teal-500 mt-4 rounded-full"}
),l.jsx("p",{
className:"max-w-3xl text-center mt-6 text-gray-600 dark:text-gray-300 text-lg",children:e?"Cyabra is trusted by leading organizations across government, PR, entertainment, and cybersecurity sectors to provide actionable insights and protection against disinformation.":"Cyabra受到政府、公關、娛樂和網絡安全等各領域領先組織的信任，提供可行的洞察並抵禦假資訊的威脅。"}
)]}
),l.jsxs("div",{
className:"grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12",children:[l.jsxs("div",{
className:"bg-white dark:bg-gray-800/40 rounded-xl p-6 shadow-lg relative border border-gray-100 dark:border-blue-900/20 hover:shadow-xl transition-shadow duration-300",children:[l.jsx("div",{
className:"absolute -top-2 -right-2 w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center",children:l.jsx("svg",{
className:"w-6 h-6 text-blue-600 dark:text-blue-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:l.jsx("path",{
strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"}
)}
)}
),l.jsxs("div",{
className:"flex items-center mb-6",children:[l.jsx("div",{
className:"w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-200",children:l.jsx("img",{
src:"/cyabra-images/testimonials/jonny-bentwood.webp",alt:"Jonny Bentwood",className:"w-full h-full object-cover",onError:n=>{
n.currentTarget.src="/cyabra-logo.svg",n.currentTarget.classList.add("bg-white","p-2")}
}
)}
),l.jsxs("div",{
children:[l.jsx("h4",{
className:"font-semibold text-gray-800 dark:text-white",children:"Jonny Bentwood"}
),l.jsx("p",{
className:"text-sm text-gray-600 dark:text-gray-300",children:e?"Global President of Data & Analytics, Golin":"全球數據和分析總裁，Golin"}
),l.jsx("p",{
className:"text-xs text-blue-600 dark:text-blue-400 mt-1",children:e?"Leading global PR and communications firm":"全球領先的公關與傳播公司"}
)]}
)]}
),l.jsxs("blockquote",{
className:"text-gray-700 dark:text-white italic text-lg",children:['"',e?"To protect the reputation of a brand, making sure that we understand what is fake and what is real is critical. Now that we've got Cyabra as part of our data stack, we've got new ways to protect our clients from misinformation.":"為了保護品牌聲譽，確保我們了解什麼是假的和什麼是真的至關重要。現在我們將Cyabra作為我們數據堆疊的一部分，我們有了新的方式來保護我們的客戶免受誤導信息的影響。",'"']}
)]}
),l.jsxs("div",{
className:"bg-white dark:bg-gray-800/40 rounded-xl p-6 shadow-lg relative border border-gray-100 dark:border-blue-900/20 hover:shadow-xl transition-shadow duration-300",children:[l.jsx("div",{
className:"absolute -top-2 -right-2 w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center",children:l.jsx("svg",{
className:"w-6 h-6 text-blue-600 dark:text-blue-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:l.jsx("path",{
strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"}
)}
)}
),l.jsxs("div",{
className:"flex items-center mb-6",children:[l.jsx("div",{
className:"w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-200",children:l.jsx("img",{
src:"/cyabra-images/testimonials/todd-grossman.webp",alt:"Todd Grossman",className:"w-full h-full object-cover",onError:n=>{
n.currentTarget.src="/cyabra-logo.svg",n.currentTarget.classList.add("bg-white","p-2")}
}
)}
),l.jsxs("div",{
children:[l.jsx("h4",{
className:"font-semibold text-gray-800 dark:text-white",children:"Todd Grossman"}
),l.jsx("p",{
className:"text-sm text-gray-600 dark:text-gray-300",children:e?"Former Talkwalker CEO of Americas":"前Talkwalker美洲區CEO"}
),l.jsx("p",{
className:"text-xs text-blue-600 dark:text-blue-400 mt-1",children:e?"Leading social listening and analytics platform":"領先的社交媒體監聽與分析平台"}
)]}
)]}
),l.jsxs("blockquote",{
className:"text-gray-700 dark:text-white italic text-lg",children:['"',e?"Whereas social media listening tools address mentions and sentiment, Cyabra goes deeper, analyzing the profiles involved in the discourse, exposing bots, and uncovering fake campaigns. Cyabra's technology helps companies detect attacks against their brand, respond in real-time, and defend themselves online.":"雖然社交媒體監聽工具可以處理提及和情緒，但Cyabra更深入，分析參與討論的個人檔案，揭露機器人和假活動。Cyabra的技術幫助公司檢測針對品牌的攻擊，實時回應，並在線上進行防護。",'"']}
)]}
)]}
),l.jsxs("div",{
className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[l.jsxs("div",{
className:"bg-white dark:bg-gray-800/40 rounded-xl p-6 shadow-lg relative border border-gray-100 dark:border-blue-900/20 hover:shadow-xl transition-shadow duration-300",children:[l.jsx("div",{
className:"absolute -top-2 -right-2 w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center",children:l.jsx("svg",{
className:"w-6 h-6 text-blue-600 dark:text-blue-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:l.jsx("path",{
strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"}
)}
)}
),l.jsxs("div",{
className:"flex items-center mb-6",children:[l.jsx("div",{
className:"w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-200",children:l.jsx("img",{
src:"/cyabra-images/testimonials/vincent-obrien.webp",alt:"Vincent O'Brien",className:"w-full h-full object-cover",onError:n=>{
n.currentTarget.src="/cyabra-logo.svg",n.currentTarget.classList.add("bg-white","p-2")}
}
)}
),l.jsxs("div",{
children:[l.jsx("h4",{
className:"font-semibold text-gray-800 dark:text-white",children:"Vincent O'Brien"}
),l.jsx("p",{
className:"text-sm text-gray-600 dark:text-gray-300",children:e?"Foreign Service Officer, US State Department":"美國國務院外交官"}
),l.jsx("p",{
className:"text-xs text-blue-600 dark:text-blue-400 mt-1",children:e?"Specialist in diplomatic communication and global affairs":"外交通訊與全球事務專家"}
)]}
)]}
),l.jsxs("blockquote",{
className:"text-gray-700 dark:text-white italic text-lg",children:['"',e?"Large audiences provide a large opportunity for nefarious actors to use it as a hook to either push new types of disinformation narratives or to connect long-standing disinformation narratives to exploit this new opportunity. Cyabra has really done a good job at identifying the information and just presenting it to you in a way that you can best make a decision.":"大型受眾為不良行為者提供了機會，讓他們可以藉此推廣新型的假資訊敘事，或將長期存在的假資訊敘事與新機會連結起來。Cyabra在識別信息並以最適合您做決策的方式呈現方面做得非常好。",'"']}
)]}
),l.jsxs("div",{
className:"bg-white dark:bg-gray-800/40 rounded-xl p-6 shadow-lg relative border border-gray-100 dark:border-blue-900/20 hover:shadow-xl transition-shadow duration-300",children:[l.jsx("div",{
className:"absolute -top-2 -right-2 w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center",children:l.jsx("svg",{
className:"w-6 h-6 text-blue-600 dark:text-blue-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:l.jsx("path",{
strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"}
)}
)}
),l.jsxs("div",{
className:"flex items-center mb-6",children:[l.jsx("div",{
className:"w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-200",children:l.jsx("img",{
src:"/cyabra-images/testimonials/drew-himmelreich.webp",alt:"Drew Himmelreich",className:"w-full h-full object-cover",onError:n=>{
n.currentTarget.src="/cyabra-logo.svg",n.currentTarget.classList.add("bg-white","p-2")}
}
)}
),l.jsxs("div",{
children:[l.jsx("h4",{
className:"font-semibold text-gray-800 dark:text-white",children:"Drew Himmelreich"}
),l.jsx("p",{
className:"text-sm text-gray-600 dark:text-gray-300",children:e?"Manager of Social Insights & Technology, Warner Media":"華納媒體社交洞察與技術經理"}
),l.jsx("p",{
className:"text-xs text-blue-600 dark:text-blue-400 mt-1",children:e?"Global entertainment and media conglomerate":"全球娛樂與媒體集團"}
)]}
)]}
),l.jsxs("blockquote",{
className:"text-gray-700 dark:text-white italic text-lg",children:['"',e?"Around the launch of Wonder Woman 1984 (WW84) we wanted to map out enthusiastic conversations and voices. Cyabra helped us analyze the social discourse around the movie and DC Comics fandom online. Once we were able to identify the most passionate influencers and communities, our theatrical marketing team was better equipped to magnify our social presence.":"在《神力女超人1984》(WW84)推出期間，我們想要追蹤熱情的對話和聲音。Cyabra幫助我們分析了關於電影和DC漫畫粉絲在線上的社交對話。一旦我們能夠識別出最熱情的影響者和社群，我們的影院行銷團隊就能夠更好地擴大我們的社交媒體影響力。",'"']}
)]}
)]}
)]}
),l.jsxs("div",{
className:"text-center",children:[l.jsx("p",{
className:"text-gray-600 dark:text-gray-300 mb-6",children:e?"Discover the full range of Cyabra products and solutions available through EudTech":"探索EudTech提供的完整Cyabra產品和解決方案"}
),l.jsx("div",{
className:"flex flex-col items-center",children:l.jsx("button",{
disabled:!0,className:"inline-flex items-center px-6 py-3 border border-gray-200 text-base font-medium rounded-md shadow-sm text-gray-400 bg-gray-100 dark:bg-gray-700 dark:text-gray-500 dark:border-gray-600 cursor-not-allowed transition duration-200",title:e?"Coming soon":"即將推出",children:e?"Explore Cyabra Solutions":"探索Cyabra解決方案"}
)}
)]}
)]}
)}
,qi=({
isEnglish:e}
)=>{
const t=new Date().getFullYear(),n={
company:{
title:e?"Company":"公司",links:[{
name:e?"About":"關於我們",href:"#about",active:!0}
,{
name:e?"Careers":"職業機會",href:"/careers",active:!0}
,{
name:e?"News":"新聞",href:"#",active:!1}
,{
name:e?"Blog":"部落格",href:"#",active:!1}
]}
,products:{
title:e?"Products":"產品",links:[{
name:e?"FinSight Financial AI System":"FinSight 金融AI系統",href:"#eudtech-products",active:!0}
,{
name:"Comino Grando",href:"#comino-brand",active:!0}
]}
,legal:{
title:e?"Legal":"法律",links:[{
name:e?"Privacy Policy":"隱私政策",href:"#",active:!1}
,{
name:e?"Terms of Service":"服務條款",href:"#",active:!1}
,{
name:e?"Cookie Policy":"Cookie政策",href:"#",active:!1}
]}
}
;
return l.jsxs("footer",{
className:"bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden",children:[l.jsx("div",{
className:"absolute inset-0 bg-[url('data:image/svg+xml;
base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTYgNnY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"}
),l.jsxs("div",{
className:"max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10",children:[l.jsxs("div",{
className:"xl:grid xl:grid-cols-4 xl:gap-8",children:[l.jsxs("div",{
className:"xl:col-span-1 space-y-8",children:[l.jsx("div",{
className:"transform hover:scale-105 transition-transform duration-300",children:l.jsx(Cm,{
}
)}
),l.jsx("p",{
className:"text-gray-400 dark:text-gray-300 text-sm max-w-xs backdrop-blur-sm",children:e?"Pioneering AI infrastructure for the next generation of intelligent applications.":"為下一代智能應用開創人工智能基礎設施。"}
)]}
),l.jsxs("div",{
className:"mt-12 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0",children:[l.jsxs("div",{
className:"md:grid md:grid-cols-2 md:gap-8",children:[l.jsxs("div",{
children:[l.jsxs("h3",{
className:"text-sm font-semibold uppercase tracking-wider text-gray-300 dark:text-gray-200 relative inline-block",children:[l.jsx("span",{
className:"bg-gradient-to-r from-blue-400 to-teal-400 h-0.5 w-1/2 absolute -bottom-1 left-0 transform transition-all duration-300 group-hover:w-full"}
),n.company.title]}
),l.jsx("ul",{
className:"mt-4 space-y-4",children:n.company.links.map(r=>l.jsx("li",{
children:r.active?l.jsxs("a",{
href:r.href,target:r.target,onClick:r.target?void 0:o=>Vt(r.href,o),className:"text-base text-gray-400 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white transition-all duration-300 group relative inline-block",children:[r.name,l.jsx("span",{
className:"absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-teal-400 transition-all duration-300 group-hover:w-full"}
)]}
):l.jsx("span",{
className:"text-base text-gray-500 dark:text-gray-500 cursor-not-allowed opacity-60",children:r.name}
)}
,r.name))}
)]}
),l.jsxs("div",{
className:"mt-12 md:mt-0",children:[l.jsxs("h3",{
className:"text-sm font-semibold uppercase tracking-wider text-gray-300 dark:text-gray-200 relative inline-block",children:[l.jsx("span",{
className:"bg-gradient-to-r from-blue-400 to-teal-400 h-0.5 w-1/2 absolute -bottom-1 left-0 transform transition-all duration-300 group-hover:w-full"}
),n.products.title]}
),l.jsx("ul",{
className:"mt-4 space-y-4",children:n.products.links.map(r=>l.jsx("li",{
children:r.active?l.jsx("a",{
href:r.href,onClick:o=>Vt(r.href,o),className:"text-base text-gray-400 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white transition duration-150",children:r.name}
):l.jsx("span",{
className:"text-base text-gray-500 dark:text-gray-500 cursor-not-allowed opacity-60",children:r.name}
)}
,r.name))}
)]}
)]}
),l.jsx("div",{
children:l.jsxs("div",{
children:[l.jsxs("h3",{
className:"text-sm font-semibold uppercase tracking-wider text-gray-300 dark:text-gray-200 relative inline-block",children:[l.jsx("span",{
className:"bg-gradient-to-r from-blue-400 to-teal-400 h-0.5 w-1/2 absolute -bottom-1 left-0 transform transition-all duration-300 group-hover:w-full"}
),n.legal.title]}
),l.jsx("ul",{
className:"mt-4 space-y-4",children:n.legal.links.map(r=>l.jsx("li",{
children:r.active?l.jsx("a",{
href:r.href,onClick:o=>Vt(r.href,o),className:"text-base text-gray-400 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white transition duration-150",children:r.name}
):l.jsx("span",{
className:"text-base text-gray-500 dark:text-gray-500 cursor-not-allowed opacity-60",children:r.name}
)}
,r.name))}
)]}
)}
)]}
)]}
),l.jsxs("div",{
className:"mt-12 pt-8 relative",children:[l.jsx("div",{
className:"absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-700 dark:via-gray-600 to-transparent"}
),l.jsxs("p",{
className:"text-base text-gray-400 dark:text-gray-300 text-center",children:["© ",t," ",l.jsx("span",{
className:"bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent font-semibold",children:e?"Eudaemonia Technology Ltd.":"優達盟資訊科技有限公司"}
)," ",e?"All rights reserved.":"保留所有權利。"]}
)]}
)]}
)]}
)}
,Lg=()=>{
const{
pathname:e,state:t}
=Dt();
return v.useEffect(()=>{
if(e==="/"){
const n=sessionStorage.getItem("scrollToSection");
if(n){
sessionStorage.removeItem("scrollToSection"),setTimeout(()=>{
const r=document.getElementById(n);
if(r){
const a=r.getBoundingClientRect().top+window.pageYOffset-100;
window.scrollTo({
top:a,behavior:"smooth"}
)}
}
,300);
return}
if(t&&t.fromSection){
const r=t.fromSection,o=document.getElementById(r);
o?setTimeout(()=>{
const i=o.getBoundingClientRect().top+window.pageYOffset-100;
window.scrollTo({
top:i,behavior:"smooth"}
)}
,100):window.scrollTo({
top:0,behavior:"smooth"}
)}
else{
const r=window.location.hash;
if(r){
const o=r.substring(1);
setTimeout(()=>{
const a=document.getElementById(o);
if(a){
const s=a.getBoundingClientRect().top+window.pageYOffset-100;
window.scrollTo({
top:s,behavior:"smooth"}
)}
}
,300)}
else window.scrollTo({
top:0,behavior:"smooth"}
)}
}
else window.scrollTo({
top:0,left:0,behavior:"smooth"}
)}
,[e,t]),null}
,zg=()=>l.jsx("a",{
href:"#main-content",className:"sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200",children:"跳到主要內容"}
),to=({
size:e="md",color:t="primary",className:n}
)=>{
const r={
sm:"h-4 w-4",md:"h-6 w-6",lg:"h-8 w-8"}
,o={
primary:"text-blue-600",secondary:"text-gray-600",white:"text-white"}
;
return l.jsx("div",{
className:Y("animate-spin",r[e],o[t],n),children:l.jsxs("svg",{
className:"w-full h-full",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[l.jsx("circle",{
className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}
),l.jsx("path",{
className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}
)]}
)}
)}
,Og=({
children:e,className:t,variant:n="default",padding:r="md",hover:o=!1}
)=>{
const a="bg-white dark:bg-gray-800 rounded-lg transition-all duration-300",i={
default:"shadow-md dark:shadow-gray-900/20",elevated:"shadow-3d-light dark:shadow-3d-dark",outlined:"border border-gray-200 dark:border-gray-700",glass:"backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 shadow-glass"}
,s={
none:"",sm:"p-4",md:"p-6",lg:"p-8"}
,u=o?"hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]":"",c=Y(a,i[n],s[r],u,t);
return l.jsx("div",{
className:c,children:e}
)}
,Ug=({
variant:e="primary",size:t="md",isLoading:n=!1,fullWidth:r=!1,children:o,className:a,disabled:i,...s}
)=>{
const u="inline-flex items-center justify-center font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",c={
primary:"text-white bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",secondary:"text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 focus:ring-teal-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",outline:"text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700",ghost:"text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:ring-blue-500 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"}
,d={
sm:"px-3 py-1.5 text-sm",md:"px-4 py-2 text-base",lg:"px-6 py-3 text-lg"}
,m=Y(u,c[e],d[t],r&&"w-full",(i||n)&&"opacity-50 cursor-not-allowed",a);
return l.jsxs("button",{
className:m,disabled:i||n,...s,children:[n&&l.jsxs("svg",{
className:"animate-spin -ml-1 mr-2 h-4 w-4 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[l.jsx("circle",{
className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}
),l.jsx("path",{
className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}
)]}
),o]}
)}
,Bg=({
title:e,description:t,keywords:n,image:r="/logo.svg",url:o=window.location.href,type:a="website",isEnglish:i=!1}
)=>{
const s=i?"EudTech - Next Generation AI Solutions":"EudTech - 下一代AI解決方案",u=i?"EudTech provides cutting-edge AI infrastructure solutions including AI servers, financial AI systems, and liquid-cooled computing systems.":"EudTech提供尖端的AI基礎設施解決方案，包括AI伺服器、金融AI系統和液冷運算系統。",c=i?"AI servers, artificial intelligence, machine learning, GPU computing, liquid cooling, financial AI, EudTech":"AI伺服器, 人工智能, 機器學習, GPU運算, 液冷, 金融AI, EudTech",d=e?`${
e}
 | ${
s}
`:s;
return l.jsxs(Gi,{
children:[l.jsx("title",{
children:d}
),l.jsx("meta",{
name:"description",content:t||u}
),l.jsx("meta",{
name:"keywords",content:n||c}
),l.jsx("meta",{
property:"og:title",content:d}
),l.jsx("meta",{
property:"og:description",content:t||u}
),l.jsx("meta",{
property:"og:image",content:r}
),l.jsx("meta",{
property:"og:url",content:o}
),l.jsx("meta",{
property:"og:type",content:a}
),l.jsx("meta",{
property:"og:site_name",content:"EudTech"}
),l.jsx("meta",{
name:"twitter:card",content:"summary_large_image"}
),l.jsx("meta",{
name:"twitter:title",content:d}
),l.jsx("meta",{
name:"twitter:description",content:t||u}
),l.jsx("meta",{
name:"twitter:image",content:r}
),l.jsx("meta",{
name:"robots",content:"index, follow"}
),l.jsx("meta",{
name:"author",content:"EudTech"}
),l.jsx("link",{
rel:"canonical",href:o}
),l.jsx("html",{
lang:i?"en":"zh-TW"}
)]}
)}
,Fg=()=>{
const{
isEnglish:e,toggleLanguage:t}
=sa(),{
themeMode:n,isDarkModeActive:r,toggleDarkMode:o}
=mm(),a=[{
id:1,title:{
zh:"政府標案商務經理",en:"Public Sector Business Manager"}
,responsibilities:{
zh:["對政府機關與學校進行簡報、提案與標案推廣","撰寫標案文件、管理投標流程與競爭策略","負責中標後履約進度、業主聯繫與協調","與銀行窗口洽談履約貸款與保證金安排","準備並提交貸款相關文件（契約、財報、用途說明等）","追蹤貸款核撥、撥款與履約金流狀況"],en:["Present proposals and promote tenders to government agencies and schools","Draft tender documents, manage bidding processes and competitive strategies","Handle post-award contract execution progress, client communication and coordination","Negotiate performance loans and guarantee arrangements with bank representatives","Prepare and submit loan-related documents (contracts, financial reports, purpose statements, etc.)","Track loan approval, disbursement and contract cash flow status"]}
,requirements:{
zh:["熟悉政府採購流程，具標案經驗","有銀行貸款或授信協調經驗者佳","具備提案簡報、商務談判與自主執行能力"],en:["Familiar with government procurement processes with tender experience","Experience in bank loan or credit coordination preferred","Strong proposal presentation, business negotiation and independent execution capabilities"]}
,location:{
zh:"台灣（全遠端工作）",en:"Taiwan (Fully Remote)"}
,workTime:{
zh:"日班／一般工時（Regular time）",en:"Day Shift / Regular Hours"}
}
,{
id:2,title:{
zh:"銀行授信協調經理",en:"Banking Relationship Manager"}
,responsibilities:{
zh:["與銀行建立合作關係，處理履約貸款、授信與保證金事務","準備貸款申請所需文件（契約、財報、資金用途說明）","與授信窗口溝通利率、還款條件、擔保安排等議題","定期追蹤貸款進度，確保撥款與標案履約時程對齊","探索多元融資管道，強化公司財務靈活性"],en:["Establish banking partnerships and handle performance loans, credit facilities and guarantee arrangements","Prepare loan application documents (contracts, financial reports, fund usage statements)","Communicate with credit officers on interest rates, repayment terms, and collateral arrangements","Regularly track loan progress to ensure disbursement aligns with contract execution timeline","Explore diverse financing channels to enhance company financial flexibility"]}
,requirements:{
zh:["具銀行授信、融資申請、貸款協調實務經驗","熟悉金融文件準備與貸款流程","具良好溝通與談判能力，能獨立完成對外協商任務"],en:["Practical experience in bank credit, financing applications, and loan coordination","Familiar with financial document preparation and loan processes","Strong communication and negotiation skills, capable of independent external negotiations"]}
,location:{
zh:"台灣（遠端工作）",en:"Taiwan (Remote Work)"}
,workTime:{
zh:"日班／一般工時",en:"Day Shift / Regular Hours"}
}
,{
id:3,title:{
zh:"組織溝通經理",en:"Organizational Communication Manager"}
,responsibilities:{
zh:["作為創辦人與全體員工之間的主要溝通橋梁","傳達公司決策、價值觀與目標，確保上下訊息一致","彙整並回報員工意見、部門需求與潛在問題","協助解決跨部門誤解、推進團隊共識與協作效率","撰寫內部公告、會議摘要、組織溝通材料","支援公司制度變動、文化活動與政策說明"],en:["Serve as the primary communication channel between the founder and all staff","Convey company decisions, values, and goals to ensure consistent understanding","Gather and relay employee feedback, team needs, and organizational concerns","Mediate internal miscommunications and drive alignment across teams","Draft internal announcements, meeting summaries, and communication materials","Support internal change communications, cultural initiatives, and policy rollouts"]}
,requirements:{
zh:["擅長跨部門溝通與協調，能快速理解並整合多方觀點","具備清晰邏輯與文字表達能力，可獨立撰寫簡報與溝通稿件","熟悉常用內部溝通工具（如Slack、Notion、Google Workspace）","有高層幕僚、營運協調或溝通相關經驗尤佳"],en:["Strong cross-functional communication and coordination skills","Excellent verbal and written clarity;
 able to draft presentations and communication content","Familiar with internal tools such as Slack, Notion, and Google Workspace","Experience in executive support, operations, or organizational communication is a plus"]}
,location:{
zh:"台灣（全遠端工作）",en:"Taiwan (Fully Remote)"}
,workTime:{
zh:"日班／一般工時（Regular time）",en:"Day Shift / Regular Hours"}
}
,{
id:4,title:{
zh:"Comino 產品經理",en:"Product Manager – Comino Solutions"}
,responsibilities:{
zh:["作為公司與 Comino 原廠之間的技術與產品窗口","熟悉 Comino 液冷工作站 / 伺服器產品線，管理本地化資料與技術文檔","協助企業端客戶進行需求評估、配置規劃與選型建議","整合業務、技術與供應鏈資訊，定義導入流程與售後支援策略","規劃產品推廣內容（如配置工具教學、教育訓練、技術簡報）","支援報價、安規認證、物流進口、退換貨與保固流程"],en:["Act as the primary product and technical liaison between our company and Comino","Manage localized technical materials and stay updated with the latest Comino product lines","Assist enterprise clients with solution evaluation, configuration planning, and deployment","Coordinate with sales and operations to define product integration and support flow","Plan product marketing and enablement content (configurator usage, workshops, technical docs)","Support quoting, BSM certification tracking, logistics, RMA, and warranty-related workflows"]}
,requirements:{
zh:["熟悉伺服器架構、GPU 應用與液冷散熱者尤佳","具備硬體產品規格彙整、客戶需求訪談與技術簡報能力","能跨部門協作推進銷售、交付與安裝流程","英文讀寫佳，可溝通 Comino 原廠技術與商務團隊"],en:["Background in servers, GPU computing, or liquid cooling preferred","Skilled in technical documentation, customer-facing planning, and presentations","Able to collaborate across teams to ensure successful sales and deployment","Proficient in English for communication with Comino HQ and support teams"]}
,location:{
zh:"台灣（全遠端工作）",en:"Taiwan (Fully Remote)"}
,workTime:{
zh:"日班／一般工時",en:"Day Shift / Regular Hours"}
}
],i=s=>{
const u=encodeURIComponent(`應徵${
s}
職位`),c=encodeURIComponent("請在此附上您的履歷與期待薪資"),d=`mailto:frank.hsu@eudaemonia.tech?subject=${
u}
&body=${
c}
`,m=document.createElement("a");
m.href=d,m.target="_blank",m.rel="noopener noreferrer",document.body.appendChild(m),m.click(),document.body.removeChild(m),setTimeout(()=>{
if(!document.hasFocus())return;
const h=`請發送履歷至：frank.hsu@eudaemonia.tech
主旨：應徵${
s}
職位`;
navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText("frank.hsu@eudaemonia.tech").then(()=>{
alert(`${
h}

電子郵件地址已複製到剪貼簿！`)}
).catch(()=>{
alert(h)}
):alert(h)}
,1e3)}
;
return l.jsxs(l.Fragment,{
children:[l.jsx(Bg,{
title:e?"Careers - Join Our Team":"職業機會 - 加入我們的團隊",description:e?"Join EudTech and be part of the future of AI technology. We are looking for passionate individuals to help us build innovative solutions.":"加入EudTech，成為AI技術未來的一部分。我們正在尋找充滿熱忱的人才，協助我們打造創新解決方案。",isEnglish:e}
),l.jsxs("div",{
className:"min-h-screen bg-white dark:bg-gray-900",children:[l.jsx(jm,{
isEnglish:e,toggleLanguage:t,themeMode:n,isDarkMode:r,toggleDarkMode:o}
),l.jsxs("main",{
className:"pt-16",children:[l.jsxs("section",{
className:"relative h-96 flex items-center justify-center overflow-hidden",children:[l.jsxs("div",{
className:"absolute inset-0",children:[l.jsx("img",{
src:"https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",alt:"Team collaboration",className:"w-full h-full object-cover transform scale-105"}
),l.jsx("div",{
className:"absolute inset-0 bg-black/60 dark:bg-black/70"}
)]}
),l.jsxs("div",{
className:"relative z-20 text-center text-white px-4 sm:px-6 lg:px-8",children:[l.jsx("h1",{
className:"text-4xl md:text-5xl font-bold text-white mb-6",children:e?"Join Our Team":"加入我們的團隊"}
),l.jsx("p",{
className:"text-xl text-gray-200 max-w-3xl mx-auto",children:e?"Be part of the future of AI technology. We're looking for passionate individuals to help us build innovative solutions.":"成為AI技術未來的一部分。我們正在尋找充滿熱忱的人才，協助我們打造創新解決方案。"}
)]}
)]}
),l.jsx(le,{
background:"white",padding:"xl",children:l.jsx("div",{
className:"max-w-4xl mx-auto space-y-12",children:a.map(s=>l.jsxs(Og,{
variant:"elevated",padding:"lg",className:"border border-gray-200 dark:border-gray-700",children:[l.jsxs("div",{
className:"mb-8",children:[l.jsxs("div",{
className:"flex items-center mb-4",children:[l.jsx(Cu,{
className:"h-8 w-8 text-blue-600 dark:text-blue-400 mr-3"}
),l.jsx("h2",{
className:"text-3xl font-bold text-gray-900 dark:text-white",children:e?"Position":"職缺"}
)]}
),l.jsx("h3",{
className:"text-2xl font-semibold text-blue-800 dark:text-blue-300",children:e?s.title.en:s.title.zh}
)]}
),l.jsx("div",{
className:"mb-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4",children:l.jsx("p",{
className:"text-blue-800 dark:text-blue-300 font-medium text-center",children:e?"Internal applications welcome. This position can also be taken as a concurrent role with additional compensation.":"本職缺歡迎內部同仁申請，亦可採加給方式兼任。"}
)}
),l.jsxs("div",{
className:"mb-8",children:[l.jsxs("h3",{
className:"text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center",children:[l.jsx($a,{
className:"h-6 w-6 text-green-600 dark:text-green-400 mr-2"}
),e?"Job Responsibilities":"工作內容"]}
),l.jsx("ul",{
className:"space-y-3",children:(e?s.responsibilities.en:s.responsibilities.zh).map((u,c)=>l.jsxs("li",{
className:"flex items-start",children:[l.jsx("div",{
className:"h-2 w-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"}
),l.jsx("span",{
className:"text-gray-700 dark:text-gray-300",children:u}
)]}
,c))}
)]}
),l.jsxs("div",{
className:"mb-8",children:[l.jsxs("h3",{
className:"text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center",children:[l.jsx($a,{
className:"h-6 w-6 text-orange-600 dark:text-orange-400 mr-2"}
),e?"Requirements":"條件需求"]}
),l.jsx("ul",{
className:"space-y-3",children:(e?s.requirements.en:s.requirements.zh).map((u,c)=>l.jsxs("li",{
className:"flex items-start",children:[l.jsx("div",{
className:"h-2 w-2 bg-orange-600 dark:bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"}
),l.jsx("span",{
className:"text-gray-700 dark:text-gray-300",children:u}
)]}
,c))}
)]}
),l.jsxs("div",{
className:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-8",children:[l.jsxs("div",{
className:"bg-gray-50 dark:bg-gray-800 rounded-lg p-6",children:[l.jsxs("h4",{
className:"text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center",children:[l.jsx(ju,{
className:"h-5 w-5 text-purple-600 dark:text-purple-400 mr-2"}
),e?"Location":"工作地點"]}
),l.jsx("p",{
className:"text-gray-700 dark:text-gray-300",children:e?s.location.en:s.location.zh}
)]}
),l.jsxs("div",{
className:"bg-gray-50 dark:bg-gray-800 rounded-lg p-6",children:[l.jsxs("h4",{
className:"text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center",children:[l.jsx(Jh,{
className:"h-5 w-5 text-teal-600 dark:text-teal-400 mr-2"}
),e?"Working Hours":"工作時間"]}
),l.jsx("p",{
className:"text-gray-700 dark:text-gray-300",children:e?s.workTime.en:s.workTime.zh}
)]}
)]}
),l.jsxs("div",{
className:"text-center pt-6 border-t border-gray-200 dark:border-gray-700",children:[l.jsxs(Ug,{
onClick:()=>i(e?s.title.en:s.title.zh),variant:"primary",size:"lg",className:"inline-flex items-center",children:[l.jsx(tg,{
className:"h-5 w-5 mr-2"}
),e?"Apply Now":"立即應徵"]}
),l.jsx("p",{
className:"text-sm text-gray-500 dark:text-gray-400 mt-3",children:e?"Send Resume & Expected Salary":"提供履歷與期待薪資"}
)]}
)]}
,s.id))}
)}
),l.jsx(le,{
background:"gradient",padding:"xl",children:l.jsxs("div",{
className:"text-center max-w-4xl mx-auto",children:[l.jsx("h2",{
className:"text-3xl font-bold text-gray-900 dark:text-white mb-6",children:e?"Why Join EudTech?":"為什麼選擇 EudTech？"}
),l.jsxs("div",{
className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[l.jsxs("div",{
className:"text-center",children:[l.jsx("div",{
className:"bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4",children:l.jsx(Cu,{
className:"h-8 w-8 text-blue-600 dark:text-blue-400"}
)}
),l.jsx("h3",{
className:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:e?"Innovation Focus":"創新導向"}
),l.jsx("p",{
className:"text-gray-600 dark:text-gray-300",children:e?"Work on cutting-edge AI technologies that shape the future":"參與塑造未來的尖端AI技術工作"}
)]}
),l.jsxs("div",{
className:"text-center",children:[l.jsx("div",{
className:"bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4",children:l.jsx(ju,{
className:"h-8 w-8 text-green-600 dark:text-green-400"}
)}
),l.jsx("h3",{
className:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:e?"Remote Flexibility":"遠端彈性"}
),l.jsx("p",{
className:"text-gray-600 dark:text-gray-300",children:e?"Enjoy the freedom of fully remote work across Taiwan":"享受台灣全境完全遠端工作的自由"}
)]}
),l.jsxs("div",{
className:"text-center",children:[l.jsx("div",{
className:"bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4",children:l.jsx($a,{
className:"h-8 w-8 text-purple-600 dark:text-purple-400"}
)}
),l.jsx("h3",{
className:"text-lg font-semibold text-gray-900 dark:text-white mb-2",children:e?"Growth Opportunity":"成長機會"}
),l.jsx("p",{
className:"text-gray-600 dark:text-gray-300",children:e?"Develop your career in the rapidly expanding AI industry":"在快速發展的AI產業中發展您的職業生涯"}
)]}
)]}
)]}
)}
)]}
),l.jsx(qi,{
isEnglish:e}
)]}
)]}
)}
,ee=({
children:e,className:t,variant:n="primary",size:r="md",color:o="primary",disabled:a=!1,loading:i=!1,type:s="button",fullWidth:u=!1,leftIcon:c,rightIcon:d,onClick:m,animation:h="none","data-testid":x,...w}
)=>{
const k=["inline-flex","items-center","justify-center","border","font-medium","rounded-md","focus:outline-none","focus:ring-2","focus:ring-offset-2","transition-all","duration-200","select-none"],b={
xs:["px-2.5","py-1.5","text-xs"],sm:["px-3","py-2","text-sm"],md:["px-4","py-2","text-sm"],lg:["px-4","py-2","text-base"],xl:["px-6","py-3","text-base"]}
,p={
primary:{
default:["bg-blue-600","border-blue-600","text-white","hover:bg-blue-700","focus:ring-blue-500"],secondary:["bg-gray-600","border-gray-600","text-white","hover:bg-gray-700","focus:ring-gray-500"],success:["bg-green-600","border-green-600","text-white","hover:bg-green-700","focus:ring-green-500"],warning:["bg-yellow-600","border-yellow-600","text-white","hover:bg-yellow-700","focus:ring-yellow-500"],error:["bg-red-600","border-red-600","text-white","hover:bg-red-700","focus:ring-red-500"]}
,secondary:{
default:["bg-white","border-gray-300","text-gray-700","hover:bg-gray-50","focus:ring-blue-500"],primary:["bg-blue-50","border-blue-200","text-blue-700","hover:bg-blue-100","focus:ring-blue-500"],success:["bg-green-50","border-green-200","text-green-700","hover:bg-green-100","focus:ring-green-500"],warning:["bg-yellow-50","border-yellow-200","text-yellow-700","hover:bg-yellow-100","focus:ring-yellow-500"],error:["bg-red-50","border-red-200","text-red-700","hover:bg-red-100","focus:ring-red-500"]}
,outline:{
default:["bg-transparent","border-gray-300","text-gray-700","hover:bg-gray-50","focus:ring-blue-500"],primary:["bg-transparent","border-blue-300","text-blue-700","hover:bg-blue-50","focus:ring-blue-500"],success:["bg-transparent","border-green-300","text-green-700","hover:bg-green-50","focus:ring-green-500"],warning:["bg-transparent","border-yellow-300","text-yellow-700","hover:bg-yellow-50","focus:ring-yellow-500"],error:["bg-transparent","border-red-300","text-red-700","hover:bg-red-50","focus:ring-red-500"]}
,ghost:{
default:["bg-transparent","border-transparent","text-gray-700","hover:bg-gray-100","focus:ring-blue-500"],primary:["bg-transparent","border-transparent","text-blue-700","hover:bg-blue-50","focus:ring-blue-500"],success:["bg-transparent","border-transparent","text-green-700","hover:bg-green-50","focus:ring-green-500"],warning:["bg-transparent","border-transparent","text-yellow-700","hover:bg-yellow-50","focus:ring-yellow-500"],error:["bg-transparent","border-transparent","text-red-700","hover:bg-red-50","focus:ring-red-500"]}
,link:{
default:["bg-transparent","border-transparent","text-blue-600","hover:text-blue-700","hover:underline","focus:ring-blue-500"],primary:["bg-transparent","border-transparent","text-blue-600","hover:text-blue-700","hover:underline","focus:ring-blue-500"],success:["bg-transparent","border-transparent","text-green-600","hover:text-green-700","hover:underline","focus:ring-green-500"],warning:["bg-transparent","border-transparent","text-yellow-600","hover:text-yellow-700","hover:underline","focus:ring-yellow-500"],error:["bg-transparent","border-transparent","text-red-600","hover:text-red-700","hover:underline","focus:ring-red-500"]}
}
,f={
none:[],fade:["hover:opacity-80"],slide:["transform","hover:translate-x-1"],scale:["hover:scale-105","active:scale-95"],bounce:["hover:animate-bounce"]}
,g=()=>{
const S=p[n];
return o in S?S[o]:S.default||[]}
,y=()=>h!=="none"?f[h]:[],j=Y(...k,...b[r],...g(),...y(),u&&"w-full",a&&"opacity-50 cursor-not-allowed pointer-events-none",i&&"cursor-wait",t?[t]:[]);
return l.jsxs("button",{
type:s,className:j,disabled:a||i,onClick:m,"data-testid":x,...w,children:[i&&l.jsxs("svg",{
className:"animate-spin -ml-1 mr-2 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[l.jsx("circle",{
className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}
),l.jsx("path",{
className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}
)]}
),c&&!i&&l.jsx("span",{
className:"mr-2",children:c}
),e,d&&l.jsx("span",{
className:"ml-2",children:d}
)]}
)}
,_=({
variant:e="body",level:t,size:n="md",weight:r="normal",color:o="default",align:a="left",leading:i="normal",tracking:s="normal",decoration:u="none",transform:c="none",selectable:d=!0,truncate:m=!1,clamp:h,as:x,children:w,className:k,...b}
)=>{
const f=x||t||(e==="body"?"p":"span"),g=["transition-colors","duration-200"],y={
body:[],caption:["text-sm"],overline:["text-xs","uppercase","tracking-wide"],inherit:[]}
,j={
xs:["text-xs"],sm:["text-sm"],md:["text-base"],lg:["text-lg"],xl:["text-xl"],"2xl":["text-2xl"],"3xl":["text-3xl"],"4xl":["text-4xl"],"5xl":["text-5xl"],"6xl":["text-6xl"]}
,S={
thin:["font-thin"],light:["font-light"],normal:["font-normal"],medium:["font-medium"],semibold:["font-semibold"],bold:["font-bold"],extrabold:["font-extrabold"],black:["font-black"]}
,T={
default:["text-gray-900","dark:text-gray-100"],primary:["text-blue-600","dark:text-blue-400"],secondary:["text-gray-600","dark:text-gray-400"],success:["text-green-600","dark:text-green-400"],warning:["text-yellow-600","dark:text-yellow-400"],error:["text-red-600","dark:text-red-400"],muted:["text-gray-500","dark:text-gray-500"]}
,E={
left:["text-left"],center:["text-center"],right:["text-right"],justify:["text-justify"]}
,B={
none:["leading-none"],tight:["leading-tight"],snug:["leading-snug"],normal:["leading-normal"],relaxed:["leading-relaxed"],loose:["leading-loose"]}
,M={
tighter:["tracking-tighter"],tight:["tracking-tight"],normal:["tracking-normal"],wide:["tracking-wide"],wider:["tracking-wider"],widest:["tracking-widest"]}
,pe={
none:[],underline:["underline"],overline:["overline"],"line-through":["line-through"]}
,qe={
none:[],uppercase:["uppercase"],lowercase:["lowercase"],capitalize:["capitalize"]}
,Ze=Y(...g,...y[e],...j[n],...S[r],...T[o],...E[a],...B[i],...M[s],...pe[u],...qe[c],!d&&"select-none",m&&"truncate",h&&h>0?`line-clamp-${
h}
`:!1,k);
return l.jsx(f,{
className:Ze,...b,children:w}
)}
,de=v.forwardRef(({
variant:e="outlined",size:t="md",type:n="text",label:r,placeholder:o,helperText:a,errorMessage:i,required:s=!1,fullWidth:u=!1,startIcon:c,endIcon:d,startAdornment:m,endAdornment:h,multiline:x=!1,rows:w=3,className:k,disabled:b,id:p,"data-testid":f,...g}
,y)=>{
const j=!!i,S=p||`input-${
Math.random().toString(36).substr(2,9)}
`,T=`${
S}
-helper-text`,E=`${
S}
-error-message`,B=["transition-all","duration-200","border","rounded-md","focus:outline-none","focus:ring-2","focus:ring-offset-0"],M={
filled:["bg-gray-100","border-transparent","focus:bg-white","focus:border-blue-500","focus:ring-blue-500"],outlined:["bg-white","border-gray-300","focus:border-blue-500","focus:ring-blue-500"],ghost:["bg-transparent","border-transparent","focus:bg-gray-50","focus:border-blue-500","focus:ring-blue-500"],underlined:["bg-transparent","border-0","border-b-2","border-gray-300","rounded-none","focus:border-blue-500","focus:ring-0","focus:ring-transparent","px-0"]}
,pe={
sm:["text-sm","px-3","py-2"],md:["text-base","px-3","py-2.5"],lg:["text-lg","px-4","py-3"]}
,qe=()=>b?["bg-gray-100","text-gray-500","cursor-not-allowed","opacity-60"]:j?["border-red-500","focus:border-red-500","focus:ring-red-500"]:[],Ze=Y(...B,...M[e],...pe[t],...qe(),u&&"w-full",c||m?"pl-10":"",d||h?"pr-10":"",x&&"resize-none",k),_r=Y("relative",u&&"w-full"),ca=Y("block","text-sm","font-medium","mb-1",j?"text-red-700":"text-gray-700",b&&"text-gray-500"),Bn=Y("mt-1","text-xs",j?"text-red-600":"text-gray-500"),tn="absolute top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none",N=Y(tn,"left-3"),R=Y(tn,"right-3"),A="absolute top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none",G=Y(A,"left-3"),Z=Y(A,"right-3"),nn=x?"textarea":"input";
return l.jsxs("div",{
className:_r,children:[r&&l.jsxs("label",{
htmlFor:S,className:ca,children:[r,s&&l.jsx("span",{
className:"text-red-500 ml-1",children:"*"}
)]}
),l.jsxs("div",{
className:"relative",children:[c&&l.jsx("div",{
className:N,children:c}
),m&&l.jsx("div",{
className:G,children:m}
),l.jsx(nn,{
ref:y,id:S,type:x?void 0:n,placeholder:o,disabled:b,required:s,rows:x?w:void 0,className:Ze,"aria-describedby":Y(a&&T,i&&E)||void 0,"aria-invalid":j,"data-testid":f,...g}
),d&&l.jsx("div",{
className:R,children:d}
),h&&l.jsx("div",{
className:Z,children:h}
)]}
),(a||i)&&l.jsx("div",{
id:i?E:T,className:Bn,children:i||a}
)]}
)}
);
de.displayName="Input";
const Wg=()=>l.jsxs("div",{
className:"p-8 space-y-8 max-w-4xl mx-auto",children:[l.jsxs("div",{
className:"text-center",children:[l.jsx(_,{
as:"h1",size:"3xl",weight:"bold",color:"primary",children:"原子組件展示"}
),l.jsx(_,{
size:"lg",color:"secondary",className:"mt-2",children:"基於 Atomic Design 原則設計的基礎組件庫"}
)]}
),l.jsxs("section",{
className:"space-y-4",children:[l.jsx(_,{
as:"h2",size:"xl",weight:"semibold",children:"Button 組件"}
),l.jsxs("div",{
className:"space-y-4",children:[l.jsxs("div",{
className:"flex flex-wrap gap-4",children:[l.jsx(ee,{
variant:"primary",children:"Primary"}
),l.jsx(ee,{
variant:"secondary",children:"Secondary"}
),l.jsx(ee,{
variant:"outline",children:"Outline"}
),l.jsx(ee,{
variant:"ghost",children:"Ghost"}
),l.jsx(ee,{
variant:"link",children:"Link"}
)]}
),l.jsxs("div",{
className:"flex flex-wrap items-center gap-4",children:[l.jsx(ee,{
size:"sm",children:"Small"}
),l.jsx(ee,{
size:"md",children:"Medium"}
),l.jsx(ee,{
size:"lg",children:"Large"}
)]}
),l.jsxs("div",{
className:"flex flex-wrap gap-4",children:[l.jsx(ee,{
color:"primary",children:"Primary"}
),l.jsx(ee,{
color:"success",children:"Success"}
),l.jsx(ee,{
color:"warning",children:"Warning"}
),l.jsx(ee,{
color:"error",children:"Error"}
)]}
),l.jsxs("div",{
className:"flex flex-wrap gap-4",children:[l.jsx(ee,{
loading:!0,children:"Loading"}
),l.jsx(ee,{
disabled:!0,children:"Disabled"}
),l.jsx(ee,{
fullWidth:!0,children:"Full Width"}
)]}
),l.jsxs("div",{
className:"flex flex-wrap gap-4",children:[l.jsx(ee,{
animation:"scale",children:"Scale"}
),l.jsx(ee,{
animation:"fade",children:"Fade"}
),l.jsx(ee,{
animation:"slide",children:"Slide"}
),l.jsx(ee,{
animation:"bounce",children:"Bounce"}
)]}
)]}
)]}
),l.jsxs("section",{
className:"space-y-4",children:[l.jsx(_,{
as:"h2",size:"xl",weight:"semibold",children:"Text 組件"}
),l.jsxs("div",{
className:"space-y-4",children:[l.jsxs("div",{
className:"space-y-2",children:[l.jsx(_,{
variant:"body",children:"這是正文文字 (body)"}
),l.jsx(_,{
variant:"caption",children:"這是說明文字 (caption)"}
),l.jsx(_,{
variant:"overline",children:"這是上標文字 (overline)"}
)]}
),l.jsxs("div",{
className:"space-y-2",children:[l.jsx(_,{
size:"xs",children:"超小文字 (xs)"}
),l.jsx(_,{
size:"sm",children:"小文字 (sm)"}
),l.jsx(_,{
size:"md",children:"中等文字 (md)"}
),l.jsx(_,{
size:"lg",children:"大文字 (lg)"}
),l.jsx(_,{
size:"xl",children:"超大文字 (xl)"}
),l.jsx(_,{
size:"2xl",children:"2XL 文字"}
)]}
),l.jsxs("div",{
className:"space-y-2",children:[l.jsx(_,{
weight:"light",children:"輕字重"}
),l.jsx(_,{
weight:"normal",children:"正常字重"}
),l.jsx(_,{
weight:"medium",children:"中等字重"}
),l.jsx(_,{
weight:"semibold",children:"半粗字重"}
),l.jsx(_,{
weight:"bold",children:"粗字重"}
)]}
),l.jsxs("div",{
className:"space-y-2",children:[l.jsx(_,{
color:"default",children:"預設顏色"}
),l.jsx(_,{
color:"primary",children:"主要顏色"}
),l.jsx(_,{
color:"secondary",children:"次要顏色"}
),l.jsx(_,{
color:"success",children:"成功顏色"}
),l.jsx(_,{
color:"warning",children:"警告顏色"}
),l.jsx(_,{
color:"error",children:"錯誤顏色"}
),l.jsx(_,{
color:"muted",children:"淡化顏色"}
)]}
),l.jsxs("div",{
className:"space-y-2",children:[l.jsx(_,{
align:"left",children:"左對齊文字"}
),l.jsx(_,{
align:"center",children:"置中對齊文字"}
),l.jsx(_,{
align:"right",children:"右對齊文字"}
)]}
),l.jsxs("div",{
className:"space-y-2",children:[l.jsx(_,{
decoration:"underline",children:"底線文字"}
),l.jsx(_,{
decoration:"line-through",children:"刪除線文字"}
),l.jsx(_,{
transform:"uppercase",children:"大寫文字"}
),l.jsx(_,{
transform:"capitalize",children:"首字母大寫文字"}
),l.jsx(_,{
truncate:!0,className:"w-48",children:"這是一段很長的文字，會被截斷顯示省略號"}
)]}
)]}
)]}
),l.jsxs("section",{
className:"space-y-4",children:[l.jsx(_,{
as:"h2",size:"xl",weight:"semibold",children:"Input 組件"}
),l.jsxs("div",{
className:"space-y-4 max-w-md",children:[l.jsxs("div",{
className:"space-y-4",children:[l.jsx(de,{
label:"Filled 輸入框",variant:"filled",placeholder:"請輸入內容"}
),l.jsx(de,{
label:"Outlined 輸入框",variant:"outlined",placeholder:"請輸入內容"}
),l.jsx(de,{
label:"Ghost 輸入框",variant:"ghost",placeholder:"請輸入內容"}
),l.jsx(de,{
label:"Underlined 輸入框",variant:"underlined",placeholder:"請輸入內容"}
)]}
),l.jsxs("div",{
className:"space-y-4",children:[l.jsx(de,{
label:"小尺寸",size:"sm",placeholder:"小尺寸輸入框"}
),l.jsx(de,{
label:"中等尺寸",size:"md",placeholder:"中等尺寸輸入框"}
),l.jsx(de,{
label:"大尺寸",size:"lg",placeholder:"大尺寸輸入框"}
)]}
),l.jsxs("div",{
className:"space-y-4",children:[l.jsx(de,{
label:"文字輸入",type:"text",placeholder:"請輸入文字"}
),l.jsx(de,{
label:"電子郵件",type:"email",placeholder:"請輸入電子郵件"}
),l.jsx(de,{
label:"密碼",type:"password",placeholder:"請輸入密碼"}
),l.jsx(de,{
label:"數字",type:"number",placeholder:"請輸入數字"}
)]}
),l.jsxs("div",{
className:"space-y-4",children:[l.jsx(de,{
label:"必填欄位",required:!0,placeholder:"這是必填欄位",helperText:"請確實填寫此欄位"}
),l.jsx(de,{
label:"錯誤狀態",placeholder:"有錯誤的輸入框",errorMessage:"這個欄位有錯誤"}
),l.jsx(de,{
label:"禁用狀態",placeholder:"禁用的輸入框",disabled:!0}
)]}
),l.jsx("div",{
className:"space-y-4",children:l.jsx(de,{
label:"多行輸入",multiline:!0,rows:4,placeholder:"請輸入多行內容..."}
)}
)]}
)]}
)]}
),$g="modulepreload",Gg=function(e){
return"/"+e}
,Au={
}
,ua=function(t,n,r){
let o=Promise.resolve();
if(n&&n.length>0){
document.getElementsByTagName("link");
const i=document.querySelector("meta[property=csp-nonce]"),s=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));
o=Promise.allSettled(n.map(u=>{
if(u=Gg(u),u in Au)return;
Au[u]=!0;
const c=u.endsWith(".css"),d=c?'[rel="stylesheet"]':"";
if(document.querySelector(`link[href="${
u}
"]${
d}
`))return;
const m=document.createElement("link");
if(m.rel=c?"stylesheet":$g,c||(m.as="script"),m.crossOrigin="",m.href=u,s&&m.setAttribute("nonce",s),document.head.appendChild(m),c)return new Promise((h,x)=>{
m.addEventListener("load",h),m.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${
u}
`)))}
)}
))}
function a(i){
const s=new Event("vite:preloadError",{
cancelable:!0}
);
if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}
return o.then(i=>{
for(const s of i||[])s.status==="rejected"&&a(s.reason);
return t().catch(a)}
)}
,Hg=v.lazy(()=>ua(()=>import("./ProductDetails-c4bx2CJd.js"),[])),Vg=v.lazy(()=>ua(()=>import("./ContactSection-ByyYswRd.js"),[])),Xg=v.lazy(()=>ua(()=>import("./AboutSection-27lOSfoy.js"),[])),Qg=e=>e(),Yg=()=>{
setTimeout(()=>{
Qg(()=>ua(()=>import("./ProductDetails-c4bx2CJd.js"),[]))}
,2e3)}
,zm=()=>({
getBrands:()=>Qe.getAllBrands(),getBrandById:a=>Qe.getBrandById(a),getBrandBySlug:a=>Qe.getBrandBySlug(a),getBrandColors:a=>Qe.getBrandColors(a),getProductsByBrand:(a,i=!1)=>Qe.getProductsByBrand(a,i)}
),Kg=()=>{
const{
isEnglish:e}
=sa(),{
getBrandBySlug:t}
=zm(),{
setCurrentBrandBySlug:n}
=km(),r="comino",o=t(r);
if(v.useEffect(()=>{
n(r),window.scrollTo(0,0)}
,[n]),!o)return l.jsx(cm,{
to:"/",replace:!0}
);
const a=Xl(e),i=[{
icon:I.createElement(gm,{
className:"h-8 w-8 text-blue-600"}
),title:e?"Engineered Around Liquid Cooling":"以液冷技術為核心設計",description:e?"Grando is designed from scratch by the Comino team. Maximizes the benefits of liquid-cooling & minimizes its drawbacks with manufactured & tailored components.":"Grando由Comino團隊從零開始設計，最大化液冷技術優勢並最小化其缺點，採用專門製造和客製化元件。"}
,{
icon:I.createElement(Wo,{
className:"h-8 w-8 text-yellow-600"}
),title:e?"Engineered for 24/7 Operation":"24/7全天候運作設計",description:e?"Designed for continuous operation up to 40°C with zero thermal throttling. The quality assurance cycle from idea to support in single hands.":"設計可在40°C高溫環境下24小時連續運作，無熱節流。從概念到支援的品質保證循環全由單一團隊掌控。"}
,{
icon:I.createElement(Dr,{
className:"h-8 w-8 text-green-600"}
),title:e?"Storage Review Best of 2024":"2024年StorageReview最佳獎",description:e?'Comino Grando has received the "Storage Review Best of 2024" award for accommodating up to six 450W GPUs in a 4U chassis while ensuring optimal performance.':"Comino Grando榮獲「2024年StorageReview最佳獎」，在4U機箱中容納最多6個450W GPU，同時確保最佳效能。"}
,{
icon:I.createElement(vm,{
className:"h-8 w-8 text-teal-600"}
),title:e?"Extreme Performance":"極致效能",description:e?"8 GPUs, 2 CPUs - 40% faster than air-cooled systems. Cooling capacity up to 5.5kW @25°C, enough to run up to 8x 600W GPUs with 90% utilization rate.":"8個GPU，2個CPU - 比氣冷系統快40%。散熱容量在25°C下可達5.5kW，足以支援8個600W GPU在90%使用率下運作。"}
,{
icon:I.createElement(eg,{
className:"h-8 w-8 text-red-600"}
),title:e?"Custom Hardware Solution":"客製化硬體解決方案",description:e?"Specialized solutions for AI computing with options for different GPU configurations including NVIDIA H100, A100, RTX 4090, and AMD MI300X.":"AI運算專用解決方案，支援不同GPU配置選項，包括NVIDIA H100、A100、RTX 4090及AMD MI300X。"}
,{
icon:I.createElement(Dn,{
className:"h-8 w-8 text-indigo-600"}
),title:e?"Enterprise-grade Reliability":"企業級可靠性",description:e?"Built for mission-critical applications with redundant power supplies, enterprise SSDs, and comprehensive monitoring systems.":"專為關鍵任務應用打造，配備冗餘電源、企業級SSD和全面監控系統。"}
],s=[{
id:1,name:"TensorFlow",logo:"/tensorflow-logo.png",description:""}
,{
id:2,name:"PyTorch",logo:"/pytorch-logo.png",description:""}
,{
id:3,name:"Keras",logo:"/keras-logo.png",description:""}
,{
id:4,name:"NVIDIA",logo:"/nvidia-logo.png",description:""}
,{
id:5,name:"AMD",logo:"/amd-logo.png",description:""}
,{
id:6,name:"Comino",logo:"/comino-logo.png",description:""}
],u=[{
id:1,name:"Sentdex",role:e?"Harrison Kinsley, AI Researcher & YouTuber":"Harrison Kinsley，AI研究者與YouTuber",company:"",content:e?"A lot of inference power comes from this Powerhouse machine from Comino which has not one, not two, not three - it has six 4090s inside!":"Comino這台強大機器帶來大量推論能力，不是一個、不是兩個、不是三個 - 它內建6個4090！",avatar:"/sentdex-review.jpg"}
,{
id:2,name:"Linus Tech Tips",role:e?"Tech Reviewer":"技術評測者",company:"",content:e?"Our Password Recovery Machine helps to improve passwords in a Crackinator Project by Linus Tech Tips.":"我們的密碼破解機器協助Linus Tech Tips在Crackinator專案中提升密碼強度。",avatar:"/linus-review.jpg"}
,{
id:3,name:"Storage Review",role:e?"Storage Review Team":"Storage Review團隊",company:"",content:e?`StorageReview.com published an outstanding review of Comino Grando units. We're thrilled that Grando received the "Storage Review Best of 2024" award.`:"StorageReview.com發表了對Comino Grando的傑出評測。我們很高興Grando榮獲「2024年StorageReview最佳獎」。",avatar:"/sentdex-review.jpg"}
];
return l.jsxs(l.Fragment,{
children:[l.jsxs(Gi,{
children:[l.jsx("title",{
children:`${
o.name}
 | ${
e?"Liquid Cooled GPU Solutions":"液冷 GPU 解決方案"}
`}
),l.jsx("meta",{
name:"description",content:o.description}
),l.jsx("meta",{
property:"og:title",content:`${
o.name}
 | Liquid Cooled Solutions`}
),l.jsx("meta",{
property:"og:description",content:o.description}
),l.jsx("meta",{
property:"og:image",content:o.heroImage||o.logo}
)]}
),l.jsx(le,{
id:"comino-hero",background:"gradient",className:"pt-24",children:l.jsxs("div",{
className:"flex flex-col md:flex-row items-center gap-8",children:[l.jsxs("div",{
className:"md:w-1/2",children:[l.jsx("h1",{
className:"text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white",children:l.jsx("span",{
className:"bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent",children:o.name}
)}
),l.jsx("p",{
className:"text-xl md:text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200",children:e?"Liquid-Cooled Multi-GPU Solutions":"液冷多GPU解決方案"}
),l.jsx("p",{
className:"text-gray-600 dark:text-gray-300 text-lg mb-6",children:e?"Engineered around liquid cooling technology with up to 8x RTX 4090 or H100 GPUs for AI inference and training":"圍繞液冷技術設計，最高支援8個RTX 4090或H100 GPU，用於AI推論與訓練"}
),l.jsxs("div",{
className:"flex flex-wrap gap-4",children:[l.jsx("button",{
disabled:!0,className:"px-6 py-3 bg-gray-300 text-gray-400 dark:bg-gray-700 dark:text-gray-500 rounded-md font-medium transition-all shadow-lg cursor-not-allowed",title:e?"Coming soon":"即將推出",children:e?"Explore Products":"探索產品"}
),l.jsx("a",{
href:"#contact",className:"px-6 py-3 border border-teal-700 text-teal-700 dark:text-teal-500 dark:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-md font-medium transition-all",children:e?"Contact Sales":"聯絡銷售"}
)]}
)]}
),l.jsx("div",{
className:"md:w-1/2",children:l.jsxs("div",{
className:"relative rounded-2xl overflow-hidden shadow-2xl",children:[l.jsx("img",{
src:"/comino-4xa100.jpg",alt:"Comino Grando AI System",className:"w-full h-auto object-cover"}
),l.jsx("div",{
className:"absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6",children:l.jsx("span",{
className:"text-white font-semibold",children:e?"Comino Grando AI Server":"Comino Grando AI 伺服器"}
)}
)]}
)}
)]}
)}
),l.jsxs(le,{
id:"comino-features",background:"white",children:[l.jsxs("div",{
className:"text-center mb-12",children:[l.jsx("h2",{
className:"text-base font-semibold tracking-wide text-teal-700 dark:text-teal-500 uppercase",children:e?"Advanced Technology":"先進技術"}
),l.jsx("p",{
className:"mt-1 text-4xl font-bold text-gray-900 dark:text-white",children:e?"Engineered For Performance":"為效能而設計"}
),l.jsx("p",{
className:"max-w-2xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-300",children:e?"Comino Grando products are designed from the ground up with liquid cooling at their core":"Comino Grando產品從基礎設計即以液冷技術為核心"}
)]}
),l.jsx(Ki,{
features:i}
)]}
),l.jsxs(le,{
id:"comino-products",background:"gradient",children:[l.jsxs("div",{
className:"text-center mb-16",children:[l.jsx("h2",{
className:"text-base font-semibold tracking-wide text-teal-700 dark:text-teal-500 uppercase bg-gradient-to-r from-teal-700 to-emerald-600 dark:from-teal-500 dark:to-emerald-400 bg-clip-text text-transparent",children:e?"Comino Products":"Comino 產品"}
),l.jsx("p",{
className:"mt-1 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight",children:e?"Liquid-Cooled AI Computing":"液冷AI運算"}
),l.jsx("p",{
className:"max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-300",children:e?"Engineered - not just assembled. Grando products are built around liquid cooling technology and tailored for AI inference & training, delivering up to 40% faster performance than air-cooled systems.":"工程設計而非僅僅組裝。Grando產品圍繞液冷技術構建，專為AI推論與訓練量身打造，比氣冷系統提供高達40%的效能提升。"}
)]}
),l.jsx(Tm,{
products:a,isEnglish:e,columns:2}
),l.jsx("div",{
className:"mt-16 text-center",children:l.jsx("a",{
href:"#contact",className:"inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-800 hover:bg-teal-900 transition duration-200",children:e?"Get Custom Configuration":"獲取客製配置"}
)}
)]}
),l.jsx(le,{
id:"comino-partners",background:"gray",children:l.jsx(Em,{
partners:s,isEnglish:e}
)}
),l.jsx(le,{
id:"comino-reviews",background:"gradient",children:l.jsx(Im,{
reviews:u,isEnglish:e}
)}
),l.jsxs(le,{
id:"comino-solutions",background:"white",children:[l.jsxs("div",{
className:"text-center mb-12",children:[l.jsx("h2",{
className:"text-base font-semibold tracking-wide text-teal-700 dark:text-teal-500 uppercase",children:e?"Solutions & Applications":"解決方案與應用"}
),l.jsx("p",{
className:"mt-1 text-4xl font-bold text-gray-900 dark:text-white",children:e?"Built for AI Workloads":"為AI工作負載打造"}
)]}
),l.jsxs("div",{
className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[l.jsxs("div",{
className:"bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden",children:[l.jsx("div",{
className:"h-48 overflow-hidden",children:l.jsx("img",{
src:"/comino-h100-server.jpg",alt:"AI Training Solution",className:"w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"}
)}
),l.jsxs("div",{
className:"p-6",children:[l.jsx("h3",{
className:"text-xl font-bold text-gray-900 dark:text-white",children:e?"AI Training Solutions":"AI訓練解決方案"}
),l.jsx("p",{
className:"mt-3 text-gray-600 dark:text-gray-300",children:e?"High-density GPU servers with advanced liquid cooling for large language models and computer vision training.":"配備先進液冷技術的高密度GPU伺服器，適用於大型語言模型和電腦視覺訓練。"}
)]}
)]}
),l.jsxs("div",{
className:"bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden",children:[l.jsx("div",{
className:"h-48 overflow-hidden",children:l.jsx("img",{
src:"/container-overview.png",alt:"Edge Computing Solution",className:"w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"}
)}
),l.jsxs("div",{
className:"p-6",children:[l.jsx("h3",{
className:"text-xl font-bold text-gray-900 dark:text-white",children:e?"Edge Computing Solutions":"邊緣運算解決方案"}
),l.jsx("p",{
className:"mt-3 text-gray-600 dark:text-gray-300",children:e?"Containerized data centers with heat recovery systems for sustainable and efficient AI inference at the edge.":"帶有熱回收系統的容器化數據中心，實現邊緣環境下可持續和高效率的AI推論。"}
)]}
)]}
)]}
)]}
),l.jsx(le,{
id:"contact",background:"gradient",children:l.jsxs("div",{
className:"text-center",children:[l.jsx("h2",{
className:"text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4",children:e?"Get Custom Configuration":"獲取客製配置"}
),l.jsx("p",{
className:"text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto mb-8",children:e?"Contact our sales team to get a tailored Comino solution for your specific AI computing needs.":"聯絡我們的銷售團隊，為您的特定AI運算需求獲取客製化的Comino解決方案。"}
),l.jsxs("div",{
className:"flex flex-wrap justify-center gap-4",children:[l.jsx("a",{
href:"mailto:sales@eudtech.com",className:"px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white rounded-md font-medium transition-all shadow-lg hover:shadow-xl",children:e?"Email Sales":"郵件銷售"}
),l.jsx("a",{
href:"tel:+886912345678",className:"px-6 py-3 border border-teal-700 text-teal-700 dark:text-teal-500 dark:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-md font-medium transition-all",children:e?"Call Sales":"致電銷售"}
)]}
)]}
)}
),l.jsx(qi,{
isEnglish:e}
)]}
)}
,qg=({
brand:e,isEnglish:t}
)=>l.jsxs("section",{
className:"relative py-32 text-white overflow-hidden",style:{
background:`linear-gradient(135deg, ${
e.primaryColor}
, ${
e.secondaryColor}
)`}
,children:[l.jsx("div",{
className:"absolute inset-0 bg-black/20"}
),l.jsx("div",{
className:"relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:l.jsxs("div",{
className:"grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",children:[l.jsxs("div",{
children:[l.jsxs("div",{
className:"flex items-center mb-6",children:[l.jsx("img",{
src:e.logo,alt:e.name,className:"w-16 h-16 object-contain mr-4 bg-white p-2 rounded-xl shadow-md"}
),l.jsxs("div",{
children:[l.jsx("h1",{
className:"text-5xl md:text-6xl font-bold",children:e.name}
),l.jsx("p",{
className:"text-2xl text-white/90 mt-2",children:e.tagline}
)]}
)]}
),l.jsx("p",{
className:"text-lg text-white/80 leading-relaxed mb-8",children:e.description}
),l.jsxs("div",{
className:"mb-8",children:[l.jsx("h3",{
className:"text-xl font-semibold mb-4",children:t?"Key Features":"品牌特色"}
),l.jsx("div",{
className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:e.features.map((n,r)=>l.jsxs("div",{
className:"flex items-center space-x-3",children:[l.jsx("div",{
className:"w-2 h-2 bg-white rounded-full"}
),l.jsx("span",{
className:"text-white/90",children:n}
)]}
,r))}
)]}
),l.jsxs("div",{
className:"grid grid-cols-2 gap-6 text-sm",children:[e.establishedYear&&l.jsxs("div",{
children:[l.jsx("span",{
className:"text-white/60",children:t?"Established":"成立年份"}
),l.jsx("div",{
className:"text-white font-semibold",children:e.establishedYear}
)]}
),e.country&&l.jsxs("div",{
children:[l.jsx("span",{
className:"text-white/60",children:t?"Country":"國家"}
),l.jsx("div",{
className:"text-white font-semibold",children:e.country}
)]}
),e.website&&l.jsxs("div",{
className:"col-span-2",children:[l.jsx("span",{
className:"text-white/60",children:t?"Website":"網站"}
),l.jsx("div",{
className:"text-white font-semibold",children:l.jsx("a",{
href:e.website,target:"_blank",rel:"noopener noreferrer",className:"hover:underline",children:e.website.replace(/^https?:\/\//,"")}
)}
)]}
)]}
)]}
),e.heroImage&&l.jsx("div",{
className:"relative",children:l.jsx("img",{
src:e.heroImage,alt:e.name,className:"w-full h-96 object-cover rounded-2xl shadow-2xl"}
)}
)]}
)}
),l.jsx("div",{
className:"absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"}
),l.jsx("div",{
className:"absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"}
)]}
),Zg=({
brand:e,isEnglish:t}
)=>{
const n={
eudtech:[{
value:"1,500+",label:t?"Systems Deployed":"已部署系統",icon:l.jsx(Dn,{
className:"w-6 h-6"}
)}
,{
value:"24/7",label:t?"Customer Support":"客戶支援",icon:l.jsx(Pu,{
className:"w-6 h-6"}
)}
,{
value:"99.9%",label:t?"Uptime":"運行時間",icon:l.jsx(Zt,{
className:"w-6 h-6"}
)}
,{
value:"5+",label:t?"Years of Experience":"年資歷",icon:l.jsx(Wo,{
className:"w-6 h-6"}
)}
],comino:[{
value:"40%",label:t?"Better Performance":"更高效能",icon:l.jsx(Dn,{
className:"w-6 h-6"}
)}
,{
value:"6.5kW",label:t?"Cooling Capacity":"散熱能力",icon:l.jsx(Zt,{
className:"w-6 h-6"}
)}
,{
value:"8 GPUs",label:t?"Maximum Support":"最大支援",icon:l.jsx(Wo,{
className:"w-6 h-6"}
)}
,{
value:"30+",label:t?"Countries":"國家地區",icon:l.jsx(Pu,{
className:"w-6 h-6"}
)}
]}
,r=n[e.id]||n.eudtech;
return l.jsx("section",{
className:"py-12 bg-gray-50",children:l.jsx("div",{
className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:l.jsx("div",{
className:"grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8",children:r.map((o,a)=>l.jsxs("div",{
className:"bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300",children:[l.jsx("div",{
className:"mb-4 p-3 rounded-full",style:{
backgroundColor:`${
e.primaryColor}
20`}
,children:l.jsx("div",{
style:{
color:e.primaryColor}
,children:o.icon}
)}
),l.jsx("div",{
className:"text-3xl font-bold mb-1",style:{
color:e.primaryColor}
,children:o.value}
),l.jsx("div",{
className:"text-sm text-gray-600",children:o.label}
)]}
,a))}
)}
)}
)}
,Jg=({
brand:e,products:t,isEnglish:n}
)=>l.jsx("section",{
className:"py-20 bg-white",children:l.jsxs("div",{
className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[l.jsxs("div",{
className:"text-center mb-16",children:[l.jsxs("h2",{
className:"text-4xl font-bold text-gray-900 mb-4",children:[e.name," ",n?"Products":"產品系列"]}
),l.jsx("p",{
className:"text-xl text-gray-600 max-w-3xl mx-auto",children:n?"Explore our professional product lineup designed to meet your specific needs":"探索我們專為滿足您特定需求而設計的專業產品系列"}
)]}
),t.length>0?l.jsx("div",{
className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:t.map(r=>l.jsxs("div",{
className:"bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group",children:[l.jsxs("div",{
className:"relative overflow-hidden",children:[l.jsx("img",{
src:r.image,alt:r.title,className:"w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"}
),r.comingSoon&&l.jsx("div",{
className:"absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-white rounded-full",style:{
backgroundColor:e.primaryColor}
,children:n?"Coming Soon":"即將推出"}
)]}
),l.jsxs("div",{
className:"p-6",children:[l.jsxs("div",{
className:"flex items-center mb-3",children:[r.icon,l.jsx("h3",{
className:"text-xl font-bold text-gray-900 ml-3",children:r.title}
)]}
),l.jsx("p",{
className:"text-gray-600 mb-4 line-clamp-3",children:r.description}
),l.jsxs("div",{
className:"mb-4",children:[l.jsx("h4",{
className:"font-semibold text-gray-900 mb-2",children:n?"Features:":"主要特色："}
),l.jsx("ul",{
className:"space-y-1",children:r.features.slice(0,3).map((o,a)=>l.jsxs("li",{
className:"text-sm text-gray-600 flex items-center",children:[l.jsx("div",{
className:"w-1.5 h-1.5 rounded-full mr-2",style:{
backgroundColor:e.primaryColor}
}
),o]}
,a))}
)]}
),l.jsx(Yi,{
to:`/products/${
r.id}
`,className:"block w-full text-center text-white py-3 rounded-lg hover:opacity-90 transition-all duration-300 font-semibold",style:{
backgroundColor:e.primaryColor}
,children:n?"Learn More":"了解更多"}
)]}
)]}
,r.id))}
):l.jsxs("div",{
className:"text-center py-16",children:[l.jsx("div",{
className:"text-6xl mb-4",children:"🚀"}
),l.jsx("h3",{
className:"text-2xl font-bold text-gray-900 mb-2",children:n?"Coming Soon":"即將推出"}
),l.jsx("p",{
className:"text-gray-600",children:n?`We are preparing exciting ${
e.name}
 products`:`我們正在準備 ${
e.name}
 的精彩產品系列`}
)]}
)]}
)}
),ex=({
brand:e,isEnglish:t}
)=>{
const n={
eudtech:{
title:t?"Ready to boost your AI capabilities?":"準備好提升您的AI能力了嗎？",subtitle:t?"Contact our team for personalized recommendations and support.":"聯繫我們的團隊獲取個性化建議和支援。",buttonText:t?"Contact Sales":"聯繫銷售"}
,comino:{
title:t?"Enhance your computing with innovative cooling":"利用創新散熱技術提升您的運算效能",subtitle:t?"Discover how our liquid cooling technology can transform your data center.":"了解我們的液冷技術如何改變您的數據中心。",buttonText:t?"Request Demo":"申請演示"}
,cyabra:{
title:t?"Ready to see Cyabra in action?":"準備好體驗 Cyabra 的實際效果？",subtitle:t?"Learn how our disinformation detection technology can safeguard your brand and reputation.":"了解我們的假資訊偵測技術如何保護您的品牌和聲譽。",buttonText:t?"Get a Personalized Demo":"獲取個性化演示"}
}
,r=n[e.id]||n.eudtech;
return l.jsx("section",{
className:"py-16",style:{
backgroundColor:`${
e.primaryColor}
10`}
,children:l.jsx("div",{
className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:l.jsx("div",{
className:"bg-white rounded-2xl shadow-xl overflow-hidden",children:l.jsxs("div",{
className:"md:flex",children:[l.jsxs("div",{
className:"md:w-1/2 p-8 md:p-12 lg:p-16",children:[l.jsx("h2",{
className:"text-3xl md:text-4xl font-bold mb-4",style:{
color:e.primaryColor}
,children:r.title}
),l.jsx("p",{
className:"text-lg text-gray-600 mb-8",children:r.subtitle}
),l.jsxs("button",{
className:"flex items-center rounded-full px-6 py-3 text-white transition-transform hover:scale-105",style:{
backgroundColor:e.primaryColor}
,children:[l.jsx("span",{
className:"mr-2",children:r.buttonText}
),l.jsx(Zh,{
size:18}
)]}
)]}
),l.jsx("div",{
className:"md:w-1/2 bg-cover bg-center h-64 md:h-auto",style:{
backgroundImage:`url(/public/${
e.id}
-${
e.id==="eudtech"?"server":"facility"}
-1.jpg)`,backgroundColor:e.secondaryColor}
}
)]}
)}
)}
)}
)}
,tx=()=>{
const{
isEnglish:e}
=sa(),{
getBrandBySlug:t}
=zm(),{
setCurrentBrandBySlug:n}
=km(),r="cyabra",o=t(r);
if(v.useEffect(()=>{
n(r),window.scrollTo(0,0)}
,[n]),!o)return l.jsx(cm,{
to:"/",replace:!0}
);
const a=Ql(e),i=[{
icon:I.createElement(Zt,{
className:"h-8 w-8 text-[#003daa]"}
),title:e?"Brand Protection":"品牌保護",description:e?"Monitor your brand, analyze online conversations, and improve decision-making with actionable insights.":"監控您的品牌，分析線上對話，並通過可行的見解改善決策。"}
,{
icon:I.createElement(Hl,{
className:"h-8 w-8 text-[#003daa]"}
),title:e?"PR Crisis Management":"PR危機管理",description:e?"Protect your brand and detect any change in sentiment or conversation, using real-time always-on alerts.":"保護您的品牌並檢測情感或對話中的任何變化，使用實時永久警報系統。"}
,{
icon:I.createElement($o,{
className:"h-8 w-8 text-[#003daa]"}
),title:e?"Consumer Insights":"消費者洞察",description:e?"Stay ahead of the curve with a better understanding of what your audience thinks and feels, and identify the next trends relevant for your products or company.":"通過更好地了解您的受眾所想所感，保持領先地位，並確定與您的產品或公司相關的下一個趨勢。"}
,{
icon:I.createElement(Nu,{
className:"h-8 w-8 text-[#003daa]"}
),title:e?"Discover New Customers":"發掘新客戶",description:e?"Identify the leaders, influencers, and communities you've been missing, and detect the authentic profiles.":"識別您錯過的領導者、影響者和社群，並檢測真實的個人資料。"}
,{
icon:I.createElement(Tu,{
className:"h-8 w-8 text-[#003daa]"}
),title:e?"Competitive Analysis":"競爭分析",description:e?"Benchmark yourself against competitors' brand presence and social performance.":"將自己與競爭對手的品牌存在和社交表現進行比較。"}
],s=[{
title:e?"Track Brand Mentions, Narratives & Sentiment":"追踪品牌提及、敘事和情感",icon:I.createElement(Zt,{
className:"h-10 w-10 text-[#003daa]"}
)}
,{
title:e?"Identify Authentic Trends":"識別真實趨勢",icon:I.createElement($o,{
className:"h-10 w-10 text-[#003daa]"}
)}
,{
title:e?"Detect Crises Before They Go Viral":"在危機病毒式傳播前檢測",icon:I.createElement(Hl,{
className:"h-10 w-10 text-[#003daa]"}
)}
,{
title:e?"Understand Consumer Behavior & Real Audiences":"了解消費者行為和真實受眾",icon:I.createElement(Nu,{
className:"h-10 w-10 text-[#003daa]"}
)}
,{
title:e?"Detect Risks to Brand Loyalty":"檢測品牌忠誠度風險",icon:I.createElement(xm,{
className:"h-10 w-10 text-[#003daa]"}
)}
,{
title:e?"Identify Potential New Customers":"識別潛在新客戶",icon:I.createElement(Dr,{
className:"h-10 w-10 text-[#003daa]"}
)}
,{
title:e?"Uncover Bot Networks & Disinformation Campaigns":"揭露機器人網絡和假資訊活動",icon:I.createElement(Tu,{
className:"h-10 w-10 text-[#003daa]"}
)}
],u={
title:e?"Brand Protection & Insight Discovery":"品牌保護與洞察發現",paragraphs:e?["Disinformation spread by fake profiles on social media is damaging the <b>reputation of brands</b>.","Cyabra's AI uncovers the <strong>fake accounts</strong>, GenAI content and <strong>deepfakes</strong> that fuels dis- and misinformation campaigns.","Our proactive <b>real-time alerts</b> system defends businesses and serves as a crucial early-warning against reputation crises.",`One of Wired's "Hottest Companies", brands and agencies trust Cyabra to shield them against disinformation across <b>social media</b>.`,"Cyabra uncovers <b>the good, bad, and fake</b> online."]:["假帳號在社交媒體上散布的假資訊正在損害<b>品牌聲譽</b>。","Cyabra的AI技術揭露助長假資訊活動的<strong>假帳號</strong>、生成式AI內容和<strong>深度偽造</strong>。","我們的主動<b>即時警報</b>系統保護企業，並作為聲譽危機的關鍵早期預警。",'作為Wired評選的"最熱門公司"之一，品牌和機構信任Cyabra保護他們免受<b>社交媒體</b>上假資訊的侵害。',"Cyabra揭露網上的<b>真、惡、假</b>。"]}
;
return l.jsxs(l.Fragment,{
children:[l.jsxs(Gi,{
children:[l.jsx("title",{
children:`${
o.name}
 | ${
e?"Uncovering The Good, Bad and Fake Online":"揭露網路上的真相、風險和假訊息"}
`}
),l.jsx("meta",{
name:"description",content:o.description}
),l.jsx("meta",{
property:"og:title",content:`${
o.name}
 | Uncovering The Good, Bad and Fake Online`}
),l.jsx("meta",{
property:"og:description",content:o.description}
),l.jsx("meta",{
property:"og:image",content:o.heroImage||o.logo}
)]}
),l.jsx("div",{
className:"bg-gradient-to-r from-[#001e54] to-[#003daa] relative overflow-hidden",children:l.jsx(qg,{
brand:o,isEnglish:e}
)}
),l.jsx(le,{
className:"bg-[#003daa] text-white",children:l.jsx("div",{
className:"container mx-auto px-4 py-16",children:l.jsxs("div",{
className:"flex flex-col md:flex-row gap-8 items-center",children:[l.jsxs("div",{
className:"md:w-1/2",children:[l.jsxs("blockquote",{
className:"text-xl md:text-2xl italic mb-6",children:['"',e?"To protect the reputation of a brand, making sure that we understand what is fake and what is real is critical. Now that we've got Cyabra as part of our data stack, we've got new ways to protect our clients from misinformation.":"為了保護品牌聲譽，確保我們了解什麼是假的和什麼是真的至關重要。現在我們將Cyabra作為我們數據堆棧的一部分，我們有了新的方式來保護我們的客戶免受誤導信息的影響。",'"']}
),l.jsxs("div",{
children:[l.jsx("h3",{
className:"font-semibold text-lg",children:"Jonny Bentwood"}
),l.jsx("p",{
className:"text-gray-200",children:e?"Global President of Data & Analytics, Golin":"全球數據和分析總裁，Golin"}
)]}
)]}
),l.jsxs("div",{
className:"md:w-1/2 relative rounded-lg overflow-hidden shadow-xl h-72",children:[l.jsx("div",{
className:"w-full h-full bg-[#001e54] flex items-center justify-center",children:l.jsx("img",{
src:"/cyabra-images/cyabra-activity-graph-min-300x225.png",alt:"Cyabra Dashboard",className:"w-3/4 object-contain opacity-90"}
)}
),l.jsx("div",{
className:"absolute inset-0 flex items-center justify-center",children:l.jsx("button",{
className:"bg-[#003daa] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg",children:l.jsx("svg",{
className:"w-8 h-8",fill:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{
d:"M8 5v14l11-7z"}
)}
)}
)}
)]}
)]}
)}
)}
),l.jsx(le,{
className:"bg-white",children:l.jsx("div",{
className:"container mx-auto px-4 py-16",children:l.jsxs("div",{
className:"flex flex-col md:flex-row gap-8 items-center",children:[l.jsxs("div",{
className:"md:w-1/2",children:[l.jsx("h2",{
className:"text-2xl md:text-3xl font-bold mb-6 text-[#003daa]",children:e?"Cyabra Named Innovation Leader by Frost & Sullivan":"Cyabra被Frost & Sullivan評為創新領導者"}
),l.jsxs("p",{
className:"text-lg mb-6",children:['"',e?"By uncovering fake accounts and tracking disinformation waves, Cyabra empowers organizations to protect their brand reputation and ensure the authenticity of online discourse.":"通過揭露假帳戶和追蹤假資訊浪潮，Cyabra使組織能夠保護其品牌聲譽並確保線上對話的真實性。",'"']}
),l.jsx("p",{
className:"mb-4",children:e?"Following independent research Frost & Sullivan recognized Cyabra with the 2025 North American Technology Innovation Leadership Award.":"在獨立研究後，Frost & Sullivan授予Cyabra 2025年北美技術創新領導獎。"}
)]}
),l.jsx("div",{
className:"md:w-1/2",children:l.jsx("img",{
src:"/cyabra-images/soc2-type-2-compliance-badge.webp",alt:"Cyabra Award",className:"rounded-lg shadow-lg w-full h-auto max-w-xs mx-auto",onError:c=>{
const d=c.target;
d.src=o.logo,d.classList.add("p-10","bg-gray-100")}
}
)}
)]}
)}
)}
),l.jsx(le,{
className:"bg-gray-50",children:l.jsxs("div",{
className:"container mx-auto px-4 py-16",children:[l.jsx("h2",{
className:"text-3xl md:text-4xl font-bold mb-10 text-center text-[#003daa]",children:u.title}
),l.jsx("div",{
className:"max-w-3xl mx-auto",children:u.paragraphs.map((c,d)=>l.jsx("p",{
className:"text-lg md:text-xl mb-6 leading-relaxed",dangerouslySetInnerHTML:{
__html:c}
}
,d))}
)]}
)}
),l.jsx("div",{
className:"bg-gradient-to-r from-[#001e54] to-[#003daa] text-white",children:l.jsx(Zg,{
brand:o,isEnglish:e}
)}
),l.jsx(le,{
className:"bg-white",children:l.jsxs("div",{
className:"container mx-auto px-4 py-16",children:[l.jsx("h2",{
className:"text-3xl md:text-4xl font-bold mb-12 text-center text-[#003daa]",children:e?"Solutions":"解決方案"}
),l.jsx("div",{
className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:s.map((c,d)=>l.jsxs("div",{
className:"bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300",children:[l.jsx("div",{
className:"mb-4",children:c.icon}
),l.jsx("h3",{
className:"text-xl font-semibold mb-2",children:c.title}
)]}
,d))}
)]}
)}
),l.jsx(le,{
className:"bg-gray-50",children:l.jsx("div",{
className:"max-w-6xl mx-auto",children:l.jsx(Ki,{
features:i,brand:o,title:e?"How Cyabra Protects Your Brand":"Cyabra如何保護您的品牌"}
)}
)}
),l.jsx(Jg,{
brand:o,products:a,isEnglish:e}
),l.jsx("div",{
className:"bg-gradient-to-r from-[#001e54] to-[#003daa] text-white",children:l.jsx(ex,{
brand:o,isEnglish:e}
)}
)]}
)}
,nx=()=>{
const{
themeMode:e,isDarkModeActive:t,toggleDarkMode:n}
=mm(),{
isEnglish:r,toggleLanguage:o}
=sa();
return l.jsxs(l.Fragment,{
children:[l.jsx(zg,{
}
),l.jsx(Lg,{
}
),l.jsx(jm,{
isEnglish:r,toggleLanguage:o,themeMode:e,isDarkMode:t,toggleDarkMode:n}
),l.jsx("main",{
id:"main-content",role:"main",children:l.jsx(v.Suspense,{
fallback:l.jsx("div",{
className:"flex items-center justify-center min-h-screen",children:l.jsx(to,{
size:"lg"}
)}
),children:l.jsxs(Mh,{
children:[l.jsx(Ut,{
path:"/",element:l.jsxs(l.Fragment,{
children:[l.jsx(gg,{
isEnglish:r}
),l.jsx(bg,{
isEnglish:r}
),l.jsx(Dg,{
isEnglish:r}
),l.jsx(_g,{
isEnglish:r}
),l.jsx(v.Suspense,{
fallback:l.jsx(to,{
}
),children:l.jsx(Xg,{
isEnglish:r}
)}
),l.jsx(v.Suspense,{
fallback:l.jsx(to,{
}
),children:l.jsx(Vg,{
isEnglish:r}
)}
),l.jsx(qi,{
isEnglish:r}
)]}
)}
),l.jsx(Ut,{
path:"/careers",element:l.jsx(Fg,{
}
)}
),l.jsx(Ut,{
path:"/components-demo",element:l.jsx(Wg,{
}
)}
),l.jsx(Ut,{
path:"/products/:id",element:l.jsx(v.Suspense,{
fallback:l.jsx("div",{
className:"flex items-center justify-center min-h-screen",children:l.jsx(to,{
size:"lg"}
)}
),children:l.jsx(Hg,{
}
)}
)}
),l.jsx(Ut,{
path:"/brands/comino",element:l.jsx(Kg,{
}
)}
),l.jsx(Ut,{
path:"/brands/cyabra",element:l.jsx(tx,{
}
)}
)]}
)}
)}
)]}
)}
,rx=60*1e3;
function ox(){
const[e,t]=v.useState(!1),n=v.useRef(null),[r,o]=v.useState(!1);
v.useEffect(()=>{
var u;
const i=(u=document.querySelector('meta[name="version"]'))==null?void 0:u.content;
function s(){
fetch(`/?t=${
Date.now()}
`,{
cache:"no-store"}
).then(c=>c.text()).then(c=>{
const d=c.match(/<meta name=\"version\" content=\"(.*?)\"/);
d&&d[1]&&d[1]!==i&&t(!0)}
)}
return n.current=setInterval(s,rx),()=>n.current&&clearInterval(n.current)}
,[]);
const a=()=>{
o(!0),window.location.reload(!0)}
;
return e?l.jsxs("div",{
className:"fixed bottom-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center gap-4",children:[l.jsx("span",{
children:"有新版本可用，請重新整理頁面！"}
),l.jsx("button",{
onClick:a,className:"bg-white text-yellow-700 px-3 py-1 rounded font-bold hover:bg-yellow-100 transition",children:r?"重新整理中...":"立即更新"}
)]}
):null}
const ax=["/grando-8gpu-server.jpg","/comino-4xa100.jpg","/comino-h100-server.jpg","/comino-workstation-front.png","/comino-workstation-side.png","/EudTech-Select-server-front.png","/EudTech-Select-server-back.png","/comino-h100-front.jpg","/GRANDO DPR 4090-FT_6_01.jpg","/GRANDO DPR 4090-FT_6_02.jpg","/GRANDO DPR 4090-FT_6_03.jpg","/GRANDO DPR 4090-FT_6_04.jpg","/GRANDO DPR 4090-FT_6_05.jpg","/GRANDO DPR 4090-FT_6_06.jpg","/comino-facility-1.jpg","/comino-facility-2.jpg","/comino-facility-3.jpg","/comino-logo.png","/comino-grando-logo.png","/comino-heat-recovery.png","/container-overview.png","/amd-logo.png","/amd-partner-badge.jpg"];
kg();
Yg();
Pm(ax);
function lx(){
return l.jsx(Zd,{
children:l.jsxs(ig,{
children:[l.jsx(ox,{
}
),l.jsx("div",{
className:"min-h-screen transition-colors duration-300 dark:bg-gray-900",children:l.jsx(nx,{
}
)}
)]}
)}
)}
Hd(document.getElementById("root")).render(l.jsx(v.StrictMode,{
children:l.jsx(lx,{
}
)}
));
export{
Hl as A,Ug as B,qi as F,Cg as L,tg as M,jm as N,le as S,mm as a,sx as b,O as c,Dt as d,Xl as e,Yi as f,Vl as g,Vt as h,Y as i,l as j,v as r,sa as u}
;

