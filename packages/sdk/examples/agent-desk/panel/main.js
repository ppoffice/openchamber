(()=>{var E="openchamber.sdk",g=1;var Qe=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Ye(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(u)=>{let p=u.target===e?r:u.target;if(!(p instanceof Element))return;if(!p.hasAttribute("data-oc-scrolling"))p.setAttribute("data-oc-scrolling","");let m=n.get(p);if(m!==void 0)clearTimeout(m);n.set(p,setTimeout(()=>{n.delete(p),p.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var zo=`(${Ye.toString()})(document);`;var Ze=128,et=65536;var ve=128;var Ae=65536;var tt=8000,ot=192000,rt=120000;var eo=(e)=>{let r=[],n=0,u=0;return{push:(p)=>{r.push(p),u+=p.length;while(u-n>e&&r.length>1){let m=r.shift();u-=m?.length??0,n=0}},pull:(p)=>{let m=0;while(m<p.length&&r.length>0){let T=r[0],_=Math.min(p.length-m,T.length-n);if(p.set(T.subarray(n,n+_),m),m+=_,n+=_,n>=T.length)r.shift(),u-=T.length,n=0}p.fill(0,m)},clear:()=>{r.length=0,n=0,u=0},get size(){return u-n}}};var so=/^[a-z][a-z0-9-]{0,39}$/;var to=(e)=>Object(e)===e&&!Array.isArray(e),st=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),oo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,ro=(e)=>String(e)===e&&e.length>=1&&e.length<=80,no=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!to(n)||!so.test(n.id)||!oo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!st(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!st(n,["kind","id","label","value","options","disabled"]))return!1;if(!ro(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let u=new Set;for(let p of n.options){if(!to(p)||!st(p,["value","label"])||!ro(p.value)||!oo(p.label)||u.has(p.value))return!1;u.add(p.value)}if(!u.has(n.value))return!1}return!0};var nt=24,io=480;var ao=["{id}","{segment}","{segments+}"];var Cr=new Set(ao);var Oe=(e)=>{if(!Number.isFinite(e))return nt;return Math.min(io,Math.max(nt,Math.ceil(e)))};var lo=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Ir=new Set(lo);var xe=20000000,Ce=256;var it=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,uo=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var co=/^[A-Za-z0-9_-]{1,80}$/;var po=["left","right","top","bottom"];var So=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let u=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let p of u)if(!So(p,r+1,n))return!1;return!0},at=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(at);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(at)}return String(e)===e||Number.isFinite(e)},lt=(e)=>{try{if(String(e.id)!==e.id||!co.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!po.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!So(e.data)||!at(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var ct=2000;var go=["file","directory","other","missing"],pt=(e)=>Boolean(e&&"sessionId"in e),dt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var _o=/^[0-9a-f]{7,64}$/i,St=(e)=>_o.test(e),ke=500,Ie=32000,To=16000,mo=128,Ro=200,fo=2000,ho=16000,yo=80,bo=200,vo=16000;var Ao=2000;var Et=20000,Pe=1024,Me=2000000;var Ge=64000,Ue=8000,gt=4000;var _t=960000;var Oo=999,xo=1e4,Se=500,Co=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],ko=["stopped","starting","ready","failed"],Qo=new Set(Co),Io=(e)=>Qo.has(e),Po=(e)=>e&&Io(e)?e:"HOST_REJECTED",ee=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ee);if(Object(e)===e)return Object.values(e).every(ee);return!1},Mo=(e)=>ee(e)&&JSON.stringify(e).length<=vo,Eo=(e)=>e?.trim().slice(0,bo)??"",te=(e)=>{let r=e.id.trim().slice(0,mo),n=e.title.trim().slice(0,Ro),u=e.url.trim().slice(0,fo),p=e.text?.trim().slice(0,ho),m=e.author?.trim().slice(0,yo),T=e.kind==="pull"?"pull":"issue",_={providerId:e.providerId.trim(),id:r,title:n||r,url:u,kind:T};if(p)_.text=p;if(m)_.author=m;if(T==="pull"){let F=Eo(e.branches?.head),X=Eo(e.branches?.base);if(F&&X)_.branches={head:F,base:X}}if(Mo(e.data))_.data=e.data;return _},Tt=(e)=>{let r=te(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},mt=(e)=>{let r={text:e.text.trim().slice(0,To)};if(e.send)r.send=!0;return r},Rt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Oo,Math.max(0,Math.round(e)))},ft=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(xo,Math.max(0,Math.ceil(e)))};var oe=(e)=>e.length>0&&e.length<=Pe&&!e.includes("\x00")&&!e.includes("\\");var we=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Ao)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Yo=new Set(ko),ht=(e)=>Boolean(e&&"status"in e&&Yo.has(String(e.status))&&!("body"in e)),Ne=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),yt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),bt=(e)=>Boolean(e&&"written"in e&&e.written===!0),vt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Zo=new Set(go),At=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Zo.has(String(e.kind))&&Number.isFinite(e.size)),Ot=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),er=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),tr=(e)=>Object(e)===e?e:null,ut=(e)=>String(e)===e&&e.length>0,or=(e)=>{if(!ut(e.id))return null;if(e.ok===!0){let r={channel:E,v:g,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&ut(e.error))return{channel:E,v:g,type:"result",id:e.id,ok:!1,error:e.error,code:Po(ut(e.code)?e.code:void 0)};return null},xt=(e)=>{let r=tr(e);if(!r||r.channel!==E||r.v!==g)return null;if(r.type==="result")return or(r);if(!er.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var Go=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),rr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class l extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var Uo=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Le=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${Pe} characters without NUL or backslash.`)),De=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},S=(e)=>(e.value+=1,`oc-${e.value}`),Ct=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),u=e.requestTimeoutMs??Et,p=new Set,m=new Set,T=new Set,_=new Set,F=new Set,X=new Set,ie=new Set,ge=new Set,_e=new Set,Te=new Set,me=new Set,z=new Set,$e=[],ae=null,le=null,Re=new Set,fe=new Set,ue=null,ce=null,qe=!1,J=new Map,Q=new Map,Y=new Map,L=!1,d={value:0},c=null,B=null,pe=!1,de=!1,Vt=null,U=null,Wt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},M=(t)=>{r.parent.postMessage(t,"*")},Xt=()=>{if(L||r.parent===r||z.size===0||c?.features?.lateGenerateResults!==!0)return;M({channel:E,v:g,type:"generate-late-listen"})},h=(t,o)=>{for(let i of t)try{i(o)}catch(a){console.error(a)}},$t=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=xt(t.data);if(!o)return;if(o.type==="workspace"){let a=Q.get(o.payload.subscriptionId);if(a)h([a],o.payload.snapshot);return}if(o.type==="shells"){let a=Y.get(o.payload.subscriptionId);if(a)h([a],o.payload.snapshot);return}if(o.type==="microphone-audio"){U?.queue.push(o.payload.samples);return}if(o.type==="microphone-ended"){let a=U;if(!a)return;U=null,a.release(),h(a.endedListeners,o.payload.reason);return}if(o.type==="ready"){if(c=o.payload,B=Wt(o.payload.session),h(p,o.payload),h(m,o.payload.directory),h(T,o.payload.session),B)h(_,B);if(h(F,o.payload.connection),h(X,o.payload.settings),h(ie,o.payload.item),o.payload.block)h(ge,o.payload.block);Xt();return}if(o.type==="service-event"){h(_e,o.payload);return}if(o.type==="generate-late"){if(z.size===0)$e.push(o.payload);else h(z,o.payload);return}if(o.type==="directory"){if(c)c={...c,directory:o.payload.directory};h(m,o.payload.directory);return}if(o.type==="session"){if(c)c={...c,session:o.payload.session};if(!o.payload.session)B=null;else if(B?.sessionId!==o.payload.session.id)B=Wt(o.payload.session);h(T,o.payload.session);return}if(o.type==="session-lifecycle"){B=o.payload,h(_,o.payload);return}if(o.type==="connection"){if(c)c={...c,connection:o.payload.connection};h(F,o.payload.connection);return}if(o.type==="settings"){if(c)c={...c,settings:o.payload.settings};h(X,o.payload.settings);return}if(o.type==="item"){if(c)c={...c,item:o.payload.item};h(ie,o.payload.item);return}if(o.type==="status-control-event"){h(Te,o.payload);return}if(o.type==="popover-closed"){h(me,o.payload);return}if(o.type==="action"){let a=(f)=>{if(!L)M({channel:E,v:g,type:"action-result",id:o.id,payload:f})},R=le;if(!R){a({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>R(o.payload)).then(()=>a({ok:!0}),(f)=>{let y=(f instanceof Error?f.message:String(f)).trim();a({ok:!1,error:(y||"Action failed.").slice(0,Se)})});return}if(o.type==="file-open"){let a=o.payload;if(ce&&uo(ce,a))return;ce=a,h(Re,o.payload);return}if(o.type==="file-saved"){h(fe,o.payload.version);return}if(o.type==="file-snapshot"){let a=(y)=>{if(!L)M({channel:E,v:g,type:"file-snapshot-result",id:o.id,payload:y})},R=(y)=>a({error:(y.trim()||"Could not read the edited file.").slice(0,Se)}),f=ue;if(!f){R("This extension does not edit files.");return}Promise.resolve().then(()=>f(o.payload.purpose)).then((y)=>{if(it(y)>xe){R(`The file is over ${xe} ${"bytes"in y?"bytes":"characters"}.`);return}if(y.version.length>Ce){R(`The snapshot version is over ${Ce} characters.`);return}a({snapshot:"bytes"in y?{bytes:y.bytes,version:y.version}:{content:y.content,version:y.version}})},(y)=>R(y instanceof Error?y.message:String(y)));return}if(o.type==="resolve"){let a=(f)=>{M({channel:E,v:g,type:"resolve-result",id:o.id,payload:f})},R=ae;if(!R){a({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>R(o.payload)).then((f)=>a({item:f?te(f):null}),(f)=>{let y=(f instanceof Error?f.message:String(f)).trim();a({error:(y||"Command failed.").slice(0,Se)})});return}let i=J.get(o.id);if(!i)return;if(clearTimeout(i.timer),J.delete(o.id),o.ok){i.resolve(o.payload);return}i.reject(new l(o.code,o.error))};r.addEventListener("message",$t),M({channel:E,v:g,type:"hello"});let P=(t,o=u)=>{if(L||r.parent===r)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((i,a)=>{let R=setTimeout(()=>{J.delete(t.id),a(new l("HOST_TIMEOUT","Host did not answer in time."))},o);J.set(t.id,{resolve:i,reject:a,timer:R}),M(t)})},A=(t)=>P(t).then(()=>{return}),v={channel:E,v:g},Ke=(t)=>{if(!L&&r.parent!==r)M(t)},qt=()=>Ke({...v,type:"file-save"}),je=()=>{if(!L&&r.parent!==r)M({...v,type:"microphone-close",id:S(d)})},Ko=async()=>{if(U)throw new l("HOST_REJECTED","The microphone is already open in this frame.");if(c?.features?.microphone!==!0)throw new l("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let t=globalThis.AudioContext;if(typeof t!=="function")throw new l("UNSUPPORTED","This frame has no Web Audio.");let o=new t;if(o.sampleRate<tt||o.sampleRate>ot)throw o.close().catch(()=>{return}),new l("UNSUPPORTED",`Audio at ${o.sampleRate} Hz is not supported.`);let i=o.state==="suspended"?o.resume().catch(()=>{return}):void 0,a=eo(Math.round(o.sampleRate/4)),R=o.createScriptProcessor(1024,1,1);R.onaudioprocess=(N)=>a.pull(N.outputBuffer.getChannelData(0));let f=o.createMediaStreamDestination();R.connect(f);let y=new Set,Z={queue:a,endedListeners:y,release:()=>{R.onaudioprocess=null,R.disconnect(),a.clear();for(let N of f.stream.getTracks())N.stop();o.close().catch(()=>{return})}};U=Z;try{let N=await P({...v,type:"microphone-open",id:S(d),payload:{sampleRate:o.sampleRate}},rt);if(!N||!("opened"in N)||N.opened!==!0)throw new l("HOST_REJECTED","Host did not open the microphone.");if(await i,U!==Z)throw new l("DISCONNECTED","The microphone closed while it was opening.")}catch(N){if(U===Z)U=null;throw Z.release(),je(),N}return{stream:f.stream,close:()=>{if(U!==Z)return;U=null,Z.release(),je()},onEnded:(N)=>(y.add(N),()=>{y.delete(N)})}},Kt=(t)=>{if(!Go(t)||!rr(t))return;t.preventDefault(),qt()},jt=(t)=>{if(!Go(t)||t.key!=="Escape"||c?.surface!=="popover"||!c.popover)return;t.preventDefault(),Yt(c.popover.id,"escape").catch(()=>{return})},he=()=>{let t=c?.surface==="popover"?c.popover:void 0;if(!t)return;let o=pe||de;if(Vt===o)return;Vt=o,Zt(t.id,o).catch(()=>{return})},ye=()=>{if(c?.surface!=="popover"||pe)return;pe=!0,he()},zt=(t)=>{if(c?.surface!=="popover"||t.relatedTarget!==null||!pe)return;pe=!1,he()},Jt=()=>{if(c?.surface!=="popover"||de)return;de=!0,he()},Qt=()=>{if(c?.surface!=="popover"||!de)return;de=!1,he()},D=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new l("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},ze=async(t)=>{if(t.kind!=="projects")D(t.projectId);let o=await P({...v,type:"workspace-read",id:S(d),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return o},Je=async(t,o)=>{if(t.kind!=="projects")D(t.projectId);let i=S(d);Q.set(i,o);try{await A({...v,type:"workspace-subscribe",id:S(d),payload:{subscriptionId:i,query:t}})}catch(a){if(Q.delete(i),!L)M({...v,type:"workspace-unsubscribe",id:S(d),payload:{subscriptionId:i}});throw a}return()=>{if(!Q.delete(i)||L)return;M({...v,type:"workspace-unsubscribe",id:S(d),payload:{subscriptionId:i}})}},jo=async(t,o)=>{if(t.kind==="session")D(t.sessionId);if(t.kind==="project")D(t.projectId);let i=S(d);Y.set(i,o);try{await A({...v,type:"shells-subscribe",id:S(d),payload:{subscriptionId:i,scope:t}})}catch(a){if(Y.delete(i),!L)M({...v,type:"shells-unsubscribe",id:S(d),payload:{subscriptionId:i}});throw a}return()=>{if(!Y.delete(i)||L)return;M({...v,type:"shells-unsubscribe",id:S(d),payload:{subscriptionId:i}})}},be=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Ze))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ee(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>et)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&c?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let o=await P({...v,type:"storage",id:S(d),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return o},Yt=(t,o)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):A({...v,type:"popover-close",id:S(d),payload:o?{id:t,reason:o}:{id:t}}),Zt=(t,o)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):A({...v,type:"popover-anchor",id:S(d),payload:{id:t,active:o}});return r.addEventListener("keydown",jt,!0),r.addEventListener("pointerover",ye),r.addEventListener("pointermove",ye),r.addEventListener("pointerout",zt),r.addEventListener("focus",Jt),r.addEventListener("blur",Qt),{onAction:(t)=>(le=t,()=>{if(le===t)le=null}),listProjects:async()=>{let t=await ze({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await ze({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await ze({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>Je({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>Je({kind:"worktrees",projectId:t},(i)=>{if(i.kind==="worktrees")o(i)}),onSessions:(t,o)=>Je({kind:"sessions",projectId:t},(i)=>{if(i.kind==="sessions")o(i)}),onRunningShells:(t,o)=>jo(t,o),readShellOutput:async(t,o)=>{D(t,ve);let i=o?.cursor;if(i!==void 0&&(!Number.isInteger(i)||i<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let a=o?.tailBytes;if(a!==void 0&&(!Number.isInteger(a)||a<1||a>Ae))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ae}.`);let f=await P({...v,type:"shell-output",id:S(d),payload:{shellId:t,cursor:i,tailBytes:a}});if(!f||typeof f.output!=="string"||!Number.isFinite(f.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return f},stopShell:async(t)=>{if(D(t,ve),(await P({...v,type:"shell-stop",id:S(d),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{D(t),await A({...v,type:"open-session",id:S(d),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let i=De(o),a={op:"get",key:t};if(i)a.scope=i;let R=await be(a);return R.op==="get"&&R.found?R.value:void 0},set:async(t,o,i)=>{let a=De(i),R={op:"set",key:t,value:o};if(a)R.scope=a;await be(R)},delete:async(t,o)=>{let i=De(o),a={op:"delete",key:t};if(i)a.scope=i;await be(a)},keys:async(t)=>{let o=De(t),i={op:"keys"};if(o)i.scope=o;let a=await be(i);if(a.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return a.keys}},onReady:(t)=>{if(p.add(t),c)t(c);return()=>{p.delete(t)}},onDirectory:(t)=>{if(m.add(t),c)t(c.directory);return()=>{m.delete(t)}},onSession:(t)=>{if(T.add(t),c)t(c.session);return()=>{T.delete(t)}},onSessionLifecycle:(t)=>{if(_.add(t),B)t(B);return()=>{_.delete(t)}},onConnection:(t)=>{if(F.add(t),c)t(c.connection);return()=>{F.delete(t)}},onSettings:(t)=>{if(X.add(t),c)t(c.settings);return()=>{X.delete(t)}},onItem:(t)=>{if(ie.add(t),c)t(c.item);return()=>{ie.delete(t)}},onBlock:(t)=>{if(ge.add(t),c?.block)t(c.block);return()=>{ge.delete(t)}},onServiceEvent:(t)=>(_e.add(t),()=>{_e.delete(t)}),onStatusControl:(t)=>(Te.add(t),()=>{Te.delete(t)}),onPopoverClosed:(t)=>(me.add(t),()=>{me.delete(t)}),setStatusControls:(t)=>{if(c?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!no(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return A({...v,type:"status-controls",id:S(d),payload:{controls:t}})},openPopover:(t)=>{if(c?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!lt(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return A({...v,type:"popover-open",id:S(d),payload:t})},closePopover:Yt,setPopoverAnchorActive:Zt,onResolve:(t)=>(ae=t,()=>{if(ae===t)ae=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>ke)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${ke} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ie))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${Ie} characters.`));return A({channel:E,v:g,type:"toast",id:S(d),payload:{...t,message:o}})},openUrl:(t)=>A({channel:E,v:g,type:"open-url",id:S(d),payload:{url:t}}),openCommit:(t)=>St(t)?A({channel:E,v:g,type:"open-commit",id:S(d),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(t)=>A({channel:E,v:g,type:"block-answer",id:S(d),payload:{text:t.trim().slice(0,ct)}}),openSurface:(t)=>A({channel:E,v:g,type:"open-surface",id:S(d),payload:{surfaceId:t}}),writeClipboard:(t)=>A({channel:E,v:g,type:"clipboard-write",id:S(d),payload:{text:t}}),compose:(t)=>A({channel:E,v:g,type:"compose",id:S(d),payload:t}),attach:(t)=>A({channel:E,v:g,type:"attach",id:S(d),payload:te(t)}),startSession:async(t)=>{if(t.projectId!==void 0)D(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")D(o.directory);else{if(o.name!==void 0)D(o.name,200);if(o.baseBranch!==void 0)D(o.baseBranch,200)}let i=await P({channel:E,v:g,type:"start-session",id:S(d),payload:Tt(t)},e.requestTimeoutMs??180000);if(!pt(i))throw new l("HOST_REJECTED","Host did not return a session.");return i},prompt:(t)=>P({channel:E,v:g,type:"prompt",id:S(d),payload:mt(t)}).then((o)=>{if(!dt(o))throw new l("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>A({channel:E,v:g,type:"session-link",id:S(d),payload:te(t)}),close:()=>A({channel:E,v:g,type:"close",id:S(d)}),oauthStart:()=>A({channel:E,v:g,type:"oauth-start",id:S(d)}),oauthDisconnect:()=>A({channel:E,v:g,type:"oauth-disconnect",id:S(d)}),request:(t)=>(we(t.path)?P({channel:E,v:g,type:"request",id:S(d),payload:t}):Uo()).then((o)=>{if(!Ne(o))throw new l("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(we(t.path)?P({channel:E,v:g,type:"service-request",id:S(d),payload:t}):Uo()).then((o)=>{if(!Ne(o))throw new l("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>P({channel:E,v:g,type:"service-status",id:S(d)}).then((t)=>{if(!ht(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(oe(t)?P({channel:E,v:g,type:"file-read",id:S(d),payload:{path:t}}):Le()).then((o)=>{if(!yt(o))throw new l("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!oe(t))return Le();if(o.length>Me)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Me} characters.`));return P({channel:E,v:g,type:"file-write",id:S(d),payload:{path:t,content:o}}).then((i)=>{if(!bt(i))throw new l("HOST_REJECTED","Host did not confirm the write.");return i})},listDir:(t)=>(oe(t)?P({channel:E,v:g,type:"file-list",id:S(d),payload:{path:t}}):Le()).then((o)=>{if(!vt(o))throw new l("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(oe(t)?P({channel:E,v:g,type:"file-stat",id:S(d),payload:{path:t}}):Le()).then((o)=>{if(!At(o))throw new l("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),i=t.system?.trim();if(o.length===0||o.length>Ge)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${Ge} characters.`));if(i!==void 0&&(i.length===0||i.length>Ue))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${Ue} characters.`));let a=t.maxOutputTokens===void 0?void 0:Math.min(gt,Math.max(1,Math.floor(t.maxOutputTokens)));if(a!==void 0&&!Number.isFinite(a))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let R={prompt:o};if(i!==void 0)R.system=i;if(a!==void 0)R.maxOutputTokens=a;return P({channel:E,v:g,type:"generate",id:S(d),payload:R},e.requestTimeoutMs??_t).then((f)=>{if(!Ot(f))throw new l("HOST_REJECTED","Host did not return generated text.");return f})},onLateGenerateResult:(t)=>{z.add(t);for(let o of $e.splice(0))h([t],o);return Xt(),()=>{z.delete(t)}},openMicrophone:Ko,setBadge:(t)=>A({channel:E,v:g,type:"badge",id:S(d),payload:{count:Rt(t)}}),setHeight:(t)=>A({channel:E,v:g,type:"resize",id:S(d),payload:{height:ft(t)}}),setWidth:({preferred:t,min:o})=>{if(c?.features?.headerWidth!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not size header frames."));if(!Number.isFinite(t)||!Number.isFinite(o)||o>t)return Promise.reject(new l("HOST_REJECTED","Width needs numbers with min at most preferred."));let i={preferred:Oe(t),min:Oe(o)};return A({...v,type:"width",id:S(d),payload:i})},onFileOpen:(t)=>{if(Re.add(t),!qe)qe=!0,r.addEventListener("keydown",Kt,!0);if(ce)t(ce);return()=>{Re.delete(t)}},onFileSnapshot:(t)=>(ue=t,()=>{if(ue===t)ue=null}),onFileSaved:(t)=>(fe.add(t),()=>{fe.delete(t)}),reportFileChange:(t)=>Ke({...v,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:qt,reportFileUnsupported:()=>Ke({...v,type:"file-unsupported"}),dispose:()=>{for(let t of Q.keys())M({...v,type:"workspace-unsubscribe",id:S(d),payload:{subscriptionId:t}});Q.clear();for(let t of Y.keys())M({...v,type:"shells-unsubscribe",id:S(d),payload:{subscriptionId:t}});if(Y.clear(),U)je(),U.release(),U=null;if(L=!0,ae=null,le=null,ue=null,Re.clear(),fe.clear(),qe)r.removeEventListener("keydown",Kt,!0);r.removeEventListener("message",$t),r.removeEventListener("keydown",jt,!0),r.removeEventListener("pointerover",ye),r.removeEventListener("pointermove",ye),r.removeEventListener("pointerout",zt),r.removeEventListener("focus",Jt),r.removeEventListener("blur",Qt);for(let t of J.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));J.clear(),p.clear(),m.clear(),T.clear(),_.clear(),F.clear(),X.clear(),ie.clear(),ge.clear(),_e.clear(),Te.clear(),me.clear(),z.clear(),$e.length=0}}};var wo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var jr=new Set(wo);var No=["none","agent","user"];var Jr=new Set(No);var sr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],nr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Lo=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,u]of sr)r.style.setProperty(n,e.tokens[u]);for(let[n,u,p]of nr){let m=e.tokens[p]??"";r.style.setProperty(n,m),r.style.setProperty(u,m)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},kt=(e,r)=>{if(Lo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var ir={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},b=(e,r)=>`var(--${e}, var(--oc-${ir[e]}, ${r}))`,W=b("surface-background","transparent"),Fe=b("surface-elevated","transparent"),re=b("surface-elevated-foreground","inherit"),w=b("surface-foreground","inherit"),O=b("surface-muted-foreground","gray"),ar=b("surface-muted","transparent"),K=b("interactive-border","currentColor"),G=b("interactive-hover","transparent"),j=b("interactive-active","transparent"),It=b("interactive-selection","transparent"),Pt=b("interactive-selection-foreground","inherit"),V=b("primary","currentColor"),Mt=b("primary-text","inherit"),Gt=b("error-text","inherit"),lr=b("font-sans","inherit"),Ut=b("font-mono","monospace"),Bo=b("radius","9px"),wt=`calc(${Bo} - 2px)`,Do=`calc(${Bo} - 4px)`,x=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,Ho=`background-image: linear-gradient(${G}, ${G});`,Nt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,Lt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Fo="box-shadow: var(--oc-sdk-lit);",Dt=`inset 0 0.5px 0 0 ${x(w,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,ur=`
:root {
  --oc-sdk-edge: ${x(w,16)};
  --oc-sdk-field-bg: ${Fe};
  --oc-sdk-raised-bg: ${W};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${x(w,14)};
  --oc-sdk-field-bg: ${x(W,50,Fe)};
  --oc-sdk-raised-bg: ${Fe};
  --oc-sdk-field-lift: ${Dt};
  --oc-sdk-raised-lift: ${Dt};
  --oc-sdk-lit: ${Dt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,He=(e)=>{let r=b(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${b(`${e}-text`,"inherit")}; }`},s=(e)=>`calc(${e}rem / 14)`,cr=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: ${s(8)}; height: ${s(32)}; padding: 0 ${s(12)}; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: ${s(6)}; height: ${s(28)}; padding: 0 ${s(10)}; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: ${s(4)}; height: ${s(24)}; padding: 0 ${s(8)}; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: ${s(14)}; height: ${s(14)}; }

.oc-sdk-field { display: flex; flex-direction: column; gap: ${s(4)}; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: ${s(32)}; padding: 0 ${s(10)}; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: ${s(8)} ${s(10)}; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: ${s(34)}; padding-right: ${s(34)}; }
.oc-sdk-search-icon { position: absolute; left: ${s(11)}; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: ${s(6)}; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: ${s(24)}; height: ${s(24)}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: ${s(4)}; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: ${s(6)}; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: ${s(28)}; padding: 0 ${s(10)}; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: ${s(2)}; min-width: ${s(160)}; max-width: calc(100vw - ${s(16)}); max-height: min(${s(320)}, calc(100vh - ${s(16)})); overflow: auto; padding: ${s(4)}; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: ${s(2)} ${s(2)} ${s(4)}; }
.oc-sdk-popup-search .oc-sdk-input { height: ${s(28)}; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: ${s(8)}; width: 100%; padding: ${s(6)} ${s(8)}; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: ${s(14)}; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: ${s(8)}; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: ${s(8)}; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: ${s(14)}; height: ${s(14)}; margin-top: ${s(3)}; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: ${s(36)}; height: ${s(20)}; --oc-sdk-thumb-travel: ${s(16)}; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: ${s(2)}; left: ${s(2)}; width: ${s(16)}; height: ${s(16)}; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: ${s(2)}; padding: ${s(2)}; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: ${s(6)}; height: ${s(28)}; padding: 0 ${s(10)}; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: ${s(1)} ${s(6)}; font-size: ${s(11)}; font-weight: 500; line-height: ${s(16)}; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: ${s(8)}; width: 100%; padding: ${s(6)} ${s(8)}; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: ${s(64)}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: ${s(16)} ${s(8)}; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: ${s(4)}; padding: ${s(40)} ${s(16)}; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: ${s(12)}; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: ${s(8)}; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: ${s(16)}; height: ${s(16)}; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: ${s(12)}; height: ${s(12)}; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: ${s(12)}; padding: ${s(8)} ${s(12)}; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: ${s(2)}; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: ${s(8)}; width: 100%; margin: ${s(8)} 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: ${s(4)} 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: ${s(4)}; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: ${s(6)}; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: ${s(2)}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: ${s(8)} 0; }

/* Under a finger the controls reach the app's touch sizes: rows and options 44px like its sheets, every other
   control at least 36px. Inputs keep 16px text, below which iOS zooms the page on focus. */
@media (pointer: coarse) {
  .oc-sdk-btn, .oc-sdk-input { height: ${s(40)}; }
  .oc-sdk-btn[data-size="sm"], .oc-sdk-btn[data-size="xs"], .oc-sdk-trigger, .oc-sdk-tab, .oc-sdk-popup-search .oc-sdk-input { height: ${s(36)}; }
  .oc-sdk-input, .oc-sdk-popup-search .oc-sdk-input { font-size: max(16px, 0.875rem); }
  .oc-sdk-search-clear { width: ${s(36)}; height: ${s(36)}; right: 0; }
  .oc-sdk-row, .oc-sdk-option { min-height: ${s(44)}; }
  .oc-sdk-check { min-height: ${s(36)}; padding: ${s(8)} 0; }
}
`,Vo=`${ur}
.oc-sdk { color: ${w}; font-family: ${lr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Ho} }
.oc-sdk-mono { font-family: ${Ut}; }
.oc-sdk-muted { color: ${O}; }
${He("success")}${He("warning")}${He("error")}${He("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${V}; --oc-sdk-tone-text: ${Mt}; }

.oc-sdk-btn { border-radius: ${wt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Do}; }
.oc-sdk-btn[data-variant="default"] { color: ${Mt}; background: ${x(V,10,W)}; border-color: ${x(V,12)}; ${Fo} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${x(V,16,W)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${x(V,22,W)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${ar}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${re}; ${Lt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${j}, ${j}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${G}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${j}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${b("status-error","red")}; color: ${Gt}; background: ${x("var(--oc-sdk-tone)",7,W)}; border-color: ${x("var(--oc-sdk-tone)",12)}; ${Fo} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${x("var(--oc-sdk-tone)",9,W)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${x("var(--oc-sdk-tone)",11,W)}; box-shadow: none; }

.oc-sdk-field-note { color: ${O}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Gt}; }
.oc-sdk-input { border-radius: ${wt}; background: var(--oc-sdk-field-bg); color: ${re}; ${Nt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${O}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Nt(x(w,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Nt(b("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Ut}; }

.oc-sdk-search-icon { color: ${O}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${V}; }
.oc-sdk-search-clear { border-radius: ${Do}; color: ${O}; }
.oc-sdk-search-clear:hover { background: ${G}; color: ${w}; }

.oc-sdk-trigger { border-radius: ${wt}; background: var(--oc-sdk-raised-bg); color: ${re}; ${Lt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${O}; }
.oc-sdk-trigger-chevron { color: ${O}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${re}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Fe}; background-clip: padding-box; color: ${re}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${G}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${It}; color: ${Pt}; }
.oc-sdk-option-check { color: ${w}; }
.oc-sdk-option[data-destructive="true"] { color: ${Gt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${x(b("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${O}; }
.oc-sdk-popup-empty { color: ${O}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${K}; border-radius: 4px; color: ${w}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${x(w,60,K)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${K}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${W}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${V}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Ho} }
.oc-sdk-check-desc { color: ${O}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${x(w,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${O}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${w}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Pt}; background: ${It}; border-color: ${K}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${re}; background: var(--oc-sdk-raised-bg); ${Lt} }
.oc-sdk-tab-count { color: ${O}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${x(w,6)}; color: ${O}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${x("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${G}; }
.oc-sdk-row[aria-selected="true"] { background: ${It}; color: ${Pt}; }
.oc-sdk-row-lead { font-family: ${Ut}; color: ${O}; }
.oc-sdk-row-sub { color: ${O}; }
.oc-sdk-row-meta { color: ${O}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${O}; }

.oc-sdk-empty-body { color: ${O}; }

.oc-sdk-spinner { color: ${O}; }
.oc-sdk-spinner-ring { border-color: ${K}; border-top-color: ${V}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${x("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${O}; }

.oc-sdk-separator { color: ${O}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${x(K,40)}; }

.oc-sdk-progress-label { color: ${O}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${x(w,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${V}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${b("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${b("success-text","inherit")}; }

.oc-sdk-text a { color: ${Mt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${x(K,60)}; }
`,k=`
${Qe}
${cr}
${Vo}`;var Wo="oc-sdk-ui-style",se=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},I=(e)=>{let r=document.getElementById(Wo);if(r instanceof HTMLStyleElement){if(r.textContent!==e)r.textContent=e;return}Ye(document);let n=document.createElement("style");n.id=Wo,n.textContent=e,document.head.appendChild(n)},C=(e,r)=>{let n=document.createElement(e);if(r)n.className=r;return n},q=(e)=>{let r=C("button",e);return r.type="button",r},H=(e,r)=>{let n=r??"";if(e.textContent!==n)e.textContent=n};var pr=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},ne=(e,r)=>{I(k);let n=r,u=q("oc-sdk oc-sdk-btn"),p=pr(),m=document.createElement("span");u.append(m),e.append(u);let T=()=>{if(u.dataset.variant=n.variant??"default",u.dataset.size=n.size??"default",u.disabled=Boolean(n.disabled)||Boolean(n.loading),u.dataset.loading=n.loading?"true":"false",u.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&p.parentNode!==u)u.prepend(p);else if(!n.loading&&p.parentNode===u)p.remove();H(m,n.label)},_=()=>{if(n.disabled||n.loading)return;n.onClick()};return u.addEventListener("click",_),T(),{update:(F)=>{n={...n,...F},T()},dispose:()=>{u.removeEventListener("click",_),u.remove()}}};var _r=/(!?)\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g,Tr=(e)=>{try{let r=new URL(e);return r.protocol==="http:"||r.protocol==="https:"}catch{return!1}},Xo=(e)=>{let r=[],n=0;for(let u of e.matchAll(_r)){let p=u.index??0;if(p>n)r.push({kind:"text",text:e.slice(n,p)});let m=u[1]??"",T=(u[2]??"").trim(),_=u[3]??"";if(!Tr(_))r.push({kind:"text",text:u[0]});else if(m==="!")r.push({kind:"image",src:_,alt:T});else r.push({kind:"link",href:_,label:T||_});n=p+u[0].length}if(n<e.length)r.push({kind:"text",text:e.slice(n)});return r},Ht=(e,r)=>{I(k);let n=r,u=C("div","oc-sdk oc-sdk-text");e.append(u);let p=(T)=>{if(!(T.target instanceof HTMLAnchorElement)||!n.onOpenUrl)return;T.preventDefault(),n.onOpenUrl(T.target.href)},m=()=>{se(u);for(let T of Xo(n.text))if(T.kind==="text")u.append(document.createTextNode(T.text));else if(T.kind==="link"){let _=C("a");_.href=T.href,_.rel="noopener noreferrer",_.target="_blank",_.textContent=T.label,u.append(_)}else{let _=C("img");_.src=T.src,_.alt=T.alt,_.loading="lazy",_.referrerPolicy="no-referrer",u.append(_)}};return u.addEventListener("click",p),m(),{update:(T)=>{n={...n,...T},m()},dispose:()=>{u.removeEventListener("click",p),u.remove()}}};var Ft=Ct(),Xe=document.querySelector("#root");if(!Xe)throw Error("Agent Desk: missing root");var qo=document.createElement("div"),Bt=(e)=>{let r=document.createElement("div");r.textContent=e,qo.prepend(r)},$o=!1;Ft.onReady((e)=>{if(kt(e,document.documentElement),$o)return;$o=!0,Ht(Xe,{text:"Agent Desk"}),ne(Xe,{label:"Start a session",onClick:()=>{Ft.serviceRequest({method:"POST",path:"/start",body:JSON.stringify({directory:e.directory})}).then((r)=>Bt(r.body)).catch(()=>Bt("The service did not answer."))}}),Xe.append(qo)});Ft.onServiceEvent(({topic:e,data:r})=>Bt(`${e}: ${JSON.stringify(r)}`));})();
