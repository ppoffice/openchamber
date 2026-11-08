(()=>{var E="openchamber.sdk",_=1;var tt=`
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
`;function ot(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(n)=>{let i=n.target===e?o:n.target;if(!(i instanceof Element))return;if(!i.hasAttribute("data-oc-scrolling"))i.setAttribute("data-oc-scrolling","");let S=s.get(i);if(S!==void 0)clearTimeout(S);s.set(i,setTimeout(()=>{s.delete(i),i.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var sr=`(${ot.toString()})(document);`;var rt=128,st=65536;var Oe=128;var Ae=65536;var lo=/^[a-z][a-z0-9-]{0,39}$/;var no=(e)=>Object(e)===e&&!Array.isArray(e),nt=(e,o)=>Object.keys(e).every((s)=>o.includes(s)),io=(e)=>String(e)===e&&e.length>=1&&e.length<=60,ao=(e)=>String(e)===e&&e.length>=1&&e.length<=80,uo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let s of e){if(!no(s)||!lo.test(s.id)||!io(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(o.has(s.id))return!1;if(o.add(s.id),s.kind==="button"){if(!nt(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!nt(s,["kind","id","label","value","options","disabled"]))return!1;if(!ao(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let n=new Set;for(let i of s.options){if(!no(i)||!nt(i,["value","label"])||!ao(i.value)||!io(i.label)||n.has(i.value))return!1;n.add(i.value)}if(!n.has(s.value))return!1}return!0};var po=["usage","remaining"],So=["default","warning","error"],nr=/^data:image\/(?:svg\+xml|png)(?:;[^,]*)?,/,go=(e)=>String(e)===e&&e.length>0&&e.length<=65536&&!e.includes("\x00")&&nr.test(e),ir=new Set(So),ar=new Set(po),q=(e,o,s=1)=>{let n=String(e);if(n!==e)return!1;return n.length>=s&&n.length<=o&&!n.includes("\x00")},it=(e,o)=>e===null||q(e,o,0),co=(e)=>{if(e===null)return!0;let o=Number(e);return o===e&&Number.isFinite(o)&&o>=0&&o<=100},Eo=(e)=>{if(e===null)return!0;let o=Number(e);return o===e&&Number.isSafeInteger(o)&&o>=0},lr=(e)=>{let o=String(e);return o===e&&ir.has(o)},ur=(e)=>{let o=String(e);return o===e&&ar.has(o)},_o=(e)=>{if(!Array.isArray(e)||e.length>32)return null;let o=[];for(let s of e){if(Object(s)!==s||s===null)return null;let n=cr(s);if(!n)return null;o.push(n)}return o},cr=(e)=>{let{key:o,label:s,usedPercent:n,remainingPercent:i,resetAt:S,resetLabel:m,valueLabel:g,tone:T}=e;if(!q(o,80)||!q(s,120))return null;if(!co(n)||!co(i)||!Eo(S))return null;if(!it(m,120)||!it(g,120))return null;if(!lr(T))return null;return{key:o,label:s,usedPercent:n,remainingPercent:i,resetAt:S,resetLabel:m,valueLabel:g,tone:T}},pr=(e)=>{if(!Array.isArray(e)||e.length>64)return null;let o=[];for(let s of e){if(Object(s)!==s||s===null)return null;let n=dr(s);if(!n)return null;o.push(n)}return o},dr=(e)=>{if(!q(e.key,80)||!q(e.name,120))return null;let o=_o(e.windows);if(!o)return null;return{key:e.key,name:e.name,windows:o}},Sr=(e)=>{let{id:o,name:s,icon:n,ok:i,configured:S,status:m,shown:g}=e;if(!q(o,80)||!q(s,120))return null;if(!(n===null||String(n)===n&&go(String(n))))return null;if(i!==!0&&i!==!1)return null;if(S!==!0&&S!==!1)return null;if(g!==!0&&g!==!1)return null;if(!it(m,500))return null;let T=_o(e.windows);if(!T)return null;let P=pr(e.models);if(!P)return null;return{id:o,name:s,icon:n,ok:i,configured:S,status:m,shown:g,windows:T,models:P}},at=(e)=>{if(Object(e)!==e||e===null||e===void 0)return null;let o=e,{displayMode:s,updatedAt:n,loading:i,providers:S}=o;if(!ur(s))return null;if(!Eo(n)||i!==!0&&i!==!1)return null;if(!Array.isArray(S)||S.length>64)return null;let m=[];for(let g of S){if(Object(g)!==g||g===null)return null;let T=Sr(g);if(!T)return null;m.push(T)}return{displayMode:s,updatedAt:n,loading:i,providers:m}};var mo=["{id}","{segment}","{segments+}"];var qr=new Set(mo);var To=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Kr=new Set(To);var Ce=20000000,ke=256;var lt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,fo=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==o.bytes[s])return!1;return!0},Ie=(e)=>{let o=e,s=e;return{observe:(n)=>{let i=n!==s;return s=n,{edited:i,dirty:n!==o}},markSaved:(n)=>(o=n,s!==n)}};var yo=/^[A-Za-z0-9_-]{1,80}$/;var ho=["left","right","top","bottom"];var Ro=(e,o=0,s={remaining:16000})=>{if(--s.remaining<0||o>=32)return!1;if(e===null)return!0;let n=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of n)if(!Ro(i,o+1,s))return!1;return!0},ut=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(ut);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(ut)}return String(e)===e||Number.isFinite(e)},ct=(e)=>{try{if(String(e.id)!==e.id||!yo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ho.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Ro(e.data)||!ut(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var dt=2000;var vo=["file","directory","other","missing"],St=(e)=>Boolean(e&&"sessionId"in e),gt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var xo=/^[0-9a-f]{7,64}$/i,Et=(e)=>xo.test(e),Pe=500,Ge=32000,Oo=16000,Ao=128,Co=200,ko=2000,Io=16000,Po=80,Go=200,Mo=16000;var Uo=2000;var _t=20000,Me=1024,Ue=2000000;var we=64000,Ne=8000,mt=4000;var Tt=960000;var wo=999,No=1e4,Se=500,Lo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Do=["stopped","starting","ready","failed"],Er=new Set(Lo),Ho=(e)=>Er.has(e),Bo=(e)=>e&&Ho(e)?e:"HOST_REJECTED",te=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(te);if(Object(e)===e)return Object.values(e).every(te);return!1},Fo=(e)=>te(e)&&JSON.stringify(e).length<=Mo,bo=(e)=>e?.trim().slice(0,Go)??"",oe=(e)=>{let o=e.id.trim().slice(0,Ao),s=e.title.trim().slice(0,Co),n=e.url.trim().slice(0,ko),i=e.text?.trim().slice(0,Io),S=e.author?.trim().slice(0,Po),m=e.kind==="pull"?"pull":"issue",g={providerId:e.providerId.trim(),id:o,title:s||o,url:n,kind:m};if(i)g.text=i;if(S)g.author=S;if(m==="pull"){let T=bo(e.branches?.head),P=bo(e.branches?.base);if(T&&P)g.branches={head:T,base:P}}if(Fo(e.data))g.data=e.data;return g},ft=(e)=>{let o=oe(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},yt=(e)=>{let o={text:e.text.trim().slice(0,Oo)};if(e.send)o.send=!0;return o},ht=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(wo,Math.max(0,Math.round(e)))},Rt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(No,Math.max(0,Math.ceil(e)))};var re=(e)=>e.length>0&&e.length<=Me&&!e.includes("\x00")&&!e.includes("\\");var Le=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Uo)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},_r=new Set(Do),bt=(e)=>Boolean(e&&"status"in e&&_r.has(String(e.status))&&!("body"in e)),De=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),vt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),xt=(e)=>Boolean(e&&"written"in e&&e.written===!0),Ot=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),mr=new Set(vo),At=(e)=>Boolean(e&&"kind"in e&&"size"in e&&mr.has(String(e.kind))&&Number.isFinite(e.size)),Ct=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Tr=new Set(["workspace","shells","usage","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),fr=(e)=>Object(e)===e?e:null,pt=(e)=>String(e)===e&&e.length>0,yr=(e)=>{if(!pt(e.id))return null;if(e.ok===!0){let o={channel:E,v:_,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&pt(e.error))return{channel:E,v:_,type:"result",id:e.id,ok:!1,error:e.error,code:Bo(pt(e.code)?e.code:void 0)};return null},kt=(e)=>{let o=fr(e);if(!o||o.channel!==E||o.v!==_)return null;if(o.type==="result")return yr(o);if(!Tr.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Vo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),hr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class c extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Xo=()=>Promise.reject(new c("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),He=()=>Promise.reject(new c("BAD_PATH",`File path must be 1 to ${Me} characters without NUL or backslash.`)),Be=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new c("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},d=(e)=>(e.value+=1,`oc-${e.value}`),It=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new c("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===o.parent),n=e.requestTimeoutMs??_t,i=new Set,S=new Set,m=new Set,g=new Set,T=new Set,P=new Set,ie=new Set,Ee=new Set,_e=new Set,me=new Set,Te=new Set,fe=new Set,ye=null,ze=!1,J=new Set,Qe=[],ae=null,le=null,he=new Set,Re=new Set,ue=null,ce=null,Je=!1,Y=new Map,Z=new Map,ee=new Map,D=!1,p={value:0},u=null,H=null,pe=!1,de=!1,qt=null,$t=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},U=(t)=>{o.parent.postMessage(t,"*")},Kt=()=>{if(D||o.parent===o||J.size===0||u?.features?.lateGenerateResults!==!0)return;U({channel:E,v:_,type:"generate-late-listen"})},y=(t,r)=>{for(let a of t)try{a(r)}catch(l){console.error(l)}},jt=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let r=kt(t.data);if(!r)return;if(r.type==="workspace"){let l=Z.get(r.payload.subscriptionId);if(l)y([l],r.payload.snapshot);return}if(r.type==="shells"){let l=ee.get(r.payload.subscriptionId);if(l)y([l],r.payload.snapshot);return}if(r.type==="ready"){if(u=r.payload,ye=null,ze=!1,H=$t(r.payload.session),y(i,r.payload),y(S,r.payload.directory),y(m,r.payload.session),H)y(g,H);if(y(T,r.payload.connection),y(P,r.payload.settings),y(ie,r.payload.item),r.payload.block)y(Ee,r.payload.block);Kt(),zt();return}if(r.type==="service-event"){y(_e,r.payload);return}if(r.type==="generate-late"){if(J.size===0)Qe.push(r.payload);else y(J,r.payload);return}if(r.type==="directory"){if(u)u={...u,directory:r.payload.directory};y(S,r.payload.directory);return}if(r.type==="session"){if(u)u={...u,session:r.payload.session};if(!r.payload.session)H=null;else if(H?.sessionId!==r.payload.session.id)H=$t(r.payload.session);y(m,r.payload.session);return}if(r.type==="session-lifecycle"){H=r.payload,y(g,r.payload);return}if(r.type==="connection"){if(u)u={...u,connection:r.payload.connection};y(T,r.payload.connection);return}if(r.type==="settings"){if(u)u={...u,settings:r.payload.settings};y(P,r.payload.settings);return}if(r.type==="item"){if(u)u={...u,item:r.payload.item};y(ie,r.payload.item);return}if(r.type==="status-control-event"){y(me,r.payload);return}if(r.type==="popover-closed"){y(Te,r.payload);return}if(r.type==="usage"){let l=at(r.payload.snapshot);if(!l)return;ye=l,y(fe,l);return}if(r.type==="action"){let l=(f)=>{if(!D)U({channel:E,v:_,type:"action-result",id:r.id,payload:f})},R=le;if(!R){l({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>R(r.payload)).then(()=>l({ok:!0}),(f)=>{let A=(f instanceof Error?f.message:String(f)).trim();l({ok:!1,error:(A||"Action failed.").slice(0,Se)})});return}if(r.type==="file-open"){let l=r.payload;if(ce&&fo(ce,l))return;ce=l,y(he,r.payload);return}if(r.type==="file-saved"){y(Re,r.payload.version);return}if(r.type==="file-snapshot"){let l=(A)=>{if(!D)U({channel:E,v:_,type:"file-snapshot-result",id:r.id,payload:A})},R=(A)=>l({error:(A.trim()||"Could not read the edited file.").slice(0,Se)}),f=ue;if(!f){R("This extension does not edit files.");return}Promise.resolve().then(()=>f(r.payload.purpose)).then((A)=>{if(lt(A)>Ce){R(`The file is over ${Ce} ${"bytes"in A?"bytes":"characters"}.`);return}if(A.version.length>ke){R(`The snapshot version is over ${ke} characters.`);return}l({snapshot:"bytes"in A?{bytes:A.bytes,version:A.version}:{content:A.content,version:A.version}})},(A)=>R(A instanceof Error?A.message:String(A)));return}if(r.type==="resolve"){let l=(f)=>{U({channel:E,v:_,type:"resolve-result",id:r.id,payload:f})},R=ae;if(!R){l({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>R(r.payload)).then((f)=>l({item:f?oe(f):null}),(f)=>{let A=(f instanceof Error?f.message:String(f)).trim();l({error:(A||"Command failed.").slice(0,Se)})});return}let a=Y.get(r.id);if(!a)return;if(clearTimeout(a.timer),Y.delete(r.id),r.ok){a.resolve(r.payload);return}a.reject(new c(r.code,r.error))};o.addEventListener("message",jt),U({channel:E,v:_,type:"hello"});let G=(t,r=n)=>{if(D||o.parent===o)return Promise.reject(new c("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((a,l)=>{let R=setTimeout(()=>{Y.delete(t.id),l(new c("HOST_TIMEOUT","Host did not answer in time."))},r);Y.set(t.id,{resolve:a,reject:l,timer:R}),U(t)})},h=(t)=>G(t).then(()=>{return}),v={channel:E,v:_},zt=()=>{if(ze||fe.size===0||u?.features?.usage!==!0)return;ze=!0,h({...v,type:"usage-subscribe",id:d(p)}).catch(()=>{return})},Qt=()=>u?.features?.usage!==!0?Promise.reject(new c("UNSUPPORTED","This host does not support the usage feed.")):null,Ye=(t)=>{if(!D&&o.parent!==o)U(t)},Jt=()=>Ye({...v,type:"file-save"}),Yt=(t)=>{if(!Vo(t)||!hr(t))return;t.preventDefault(),Jt()},Zt=(t)=>{if(!Vo(t)||t.key!=="Escape"||u?.surface!=="popover"||!u.popover)return;t.preventDefault(),ro(u.popover.id,"escape").catch(()=>{return})},be=()=>{let t=u?.surface==="popover"?u.popover:void 0;if(!t)return;let r=pe||de;if(qt===r)return;qt=r,so(t.id,r).catch(()=>{return})},ve=()=>{if(u?.surface!=="popover"||pe)return;pe=!0,be()},eo=(t)=>{if(u?.surface!=="popover"||t.relatedTarget!==null||!pe)return;pe=!1,be()},to=()=>{if(u?.surface!=="popover"||de)return;de=!0,be()},oo=()=>{if(u?.surface!=="popover"||!de)return;de=!1,be()},L=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new c("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},Ze=async(t)=>{if(t.kind!=="projects")L(t.projectId);let r=await G({...v,type:"workspace-read",id:d(p),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new c("HOST_REJECTED","Host did not return workspace data.");return r},et=async(t,r)=>{if(t.kind!=="projects")L(t.projectId);let a=d(p);Z.set(a,r);try{await h({...v,type:"workspace-subscribe",id:d(p),payload:{subscriptionId:a,query:t}})}catch(l){if(Z.delete(a),!D)U({...v,type:"workspace-unsubscribe",id:d(p),payload:{subscriptionId:a}});throw l}return()=>{if(!Z.delete(a)||D)return;U({...v,type:"workspace-unsubscribe",id:d(p),payload:{subscriptionId:a}})}},rr=async(t,r)=>{if(t.kind==="session")L(t.sessionId);if(t.kind==="project")L(t.projectId);let a=d(p);ee.set(a,r);try{await h({...v,type:"shells-subscribe",id:d(p),payload:{subscriptionId:a,scope:t}})}catch(l){if(ee.delete(a),!D)U({...v,type:"shells-unsubscribe",id:d(p),payload:{subscriptionId:a}});throw l}return()=>{if(!ee.delete(a)||D)return;U({...v,type:"shells-unsubscribe",id:d(p),payload:{subscriptionId:a}})}},xe=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>rt))throw new c("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!te(t.value))throw new c("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>st)throw new c("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&u?.features?.deviceStorage!==!0)throw new c("UNSUPPORTED","This host does not support device storage.");let r=await G({...v,type:"storage",id:d(p),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new c("HOST_REJECTED","Host did not return storage data.");return r},ro=(t,r)=>u?.features?.popovers!==!0&&!(u?.surface==="popover"&&u.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):h({...v,type:"popover-close",id:d(p),payload:r?{id:t,reason:r}:{id:t}}),so=(t,r)=>u?.features?.popovers!==!0&&!(u?.surface==="popover"&&u.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):h({...v,type:"popover-anchor",id:d(p),payload:{id:t,active:r}});return o.addEventListener("keydown",Zt,!0),o.addEventListener("pointerover",ve),o.addEventListener("pointermove",ve),o.addEventListener("pointerout",eo),o.addEventListener("focus",to),o.addEventListener("blur",oo),{onAction:(t)=>(le=t,()=>{if(le===t)le=null}),listProjects:async()=>{let t=await Ze({kind:"projects"});if(t.kind!=="projects")throw new c("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await Ze({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new c("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await Ze({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new c("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>et({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>et({kind:"worktrees",projectId:t},(a)=>{if(a.kind==="worktrees")r(a)}),onSessions:(t,r)=>et({kind:"sessions",projectId:t},(a)=>{if(a.kind==="sessions")r(a)}),onRunningShells:(t,r)=>rr(t,r),readShellOutput:async(t,r)=>{L(t,Oe);let a=r?.cursor;if(a!==void 0&&(!Number.isInteger(a)||a<0))throw new c("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let l=r?.tailBytes;if(l!==void 0&&(!Number.isInteger(l)||l<1||l>Ae))throw new c("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ae}.`);let f=await G({...v,type:"shell-output",id:d(p),payload:{shellId:t,cursor:a,tailBytes:l}});if(!f||typeof f.output!=="string"||!Number.isFinite(f.cursor))throw new c("HOST_REJECTED","Host did not return shell output.");return f},stopShell:async(t)=>{if(L(t,Oe),(await G({...v,type:"shell-stop",id:d(p),payload:{shellId:t}}))?.stopped!==!0)throw new c("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{L(t),await h({...v,type:"open-session",id:d(p),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let a=Be(r),l={op:"get",key:t};if(a)l.scope=a;let R=await xe(l);return R.op==="get"&&R.found?R.value:void 0},set:async(t,r,a)=>{let l=Be(a),R={op:"set",key:t,value:r};if(l)R.scope=l;await xe(R)},delete:async(t,r)=>{let a=Be(r),l={op:"delete",key:t};if(a)l.scope=a;await xe(l)},keys:async(t)=>{let r=Be(t),a={op:"keys"};if(r)a.scope=r;let l=await xe(a);if(l.op!=="keys")throw new c("HOST_REJECTED","Expected storage keys.");return l.keys}},onReady:(t)=>{if(i.add(t),u)t(u);return()=>{i.delete(t)}},onDirectory:(t)=>{if(S.add(t),u)t(u.directory);return()=>{S.delete(t)}},onSession:(t)=>{if(m.add(t),u)t(u.session);return()=>{m.delete(t)}},onSessionLifecycle:(t)=>{if(g.add(t),H)t(H);return()=>{g.delete(t)}},onConnection:(t)=>{if(T.add(t),u)t(u.connection);return()=>{T.delete(t)}},onSettings:(t)=>{if(P.add(t),u)t(u.settings);return()=>{P.delete(t)}},onItem:(t)=>{if(ie.add(t),u)t(u.item);return()=>{ie.delete(t)}},onBlock:(t)=>{if(Ee.add(t),u?.block)t(u.block);return()=>{Ee.delete(t)}},onServiceEvent:(t)=>(_e.add(t),()=>{_e.delete(t)}),onStatusControl:(t)=>(me.add(t),()=>{me.delete(t)}),onPopoverClosed:(t)=>(Te.add(t),()=>{Te.delete(t)}),onUsage:(t)=>{if(fe.add(t),ye)t(ye);return zt(),()=>{fe.delete(t)}},refreshUsage:()=>Qt()??h({...v,type:"usage-refresh",id:d(p)}),openUsageSettings:()=>Qt()??h({...v,type:"open-usage-settings",id:d(p)}),setStatusControls:(t)=>{if(u?.features?.statusControls!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support status controls."));if(!uo(t))return Promise.reject(new c("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return h({...v,type:"status-controls",id:d(p),payload:{controls:t}})},openPopover:(t)=>{if(u?.features?.popovers!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support popovers."));if(!ct(t))return Promise.reject(new c("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return h({...v,type:"popover-open",id:d(p),payload:t})},closePopover:ro,setPopoverAnchorActive:so,onResolve:(t)=>(ae=t,()=>{if(ae===t)ae=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>Pe)return Promise.reject(new c("HOST_REJECTED",`Toast message must contain 1 to ${Pe} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ge))return Promise.reject(new c("HOST_REJECTED",`Toast copy text must contain 1 to ${Ge} characters.`));return h({channel:E,v:_,type:"toast",id:d(p),payload:{...t,message:r}})},openUrl:(t)=>h({channel:E,v:_,type:"open-url",id:d(p),payload:{url:t}}),openCommit:(t)=>Et(t)?h({channel:E,v:_,type:"open-commit",id:d(p),payload:{sha:t}}):Promise.reject(new c("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(t)=>h({channel:E,v:_,type:"block-answer",id:d(p),payload:{text:t.trim().slice(0,dt)}}),openSurface:(t)=>h({channel:E,v:_,type:"open-surface",id:d(p),payload:{surfaceId:t}}),writeClipboard:(t)=>h({channel:E,v:_,type:"clipboard-write",id:d(p),payload:{text:t}}),compose:(t)=>h({channel:E,v:_,type:"compose",id:d(p),payload:t}),attach:(t)=>h({channel:E,v:_,type:"attach",id:d(p),payload:oe(t)}),startSession:async(t)=>{if(t.projectId!==void 0)L(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")L(r.directory);else{if(r.name!==void 0)L(r.name,200);if(r.baseBranch!==void 0)L(r.baseBranch,200)}let a=await G({channel:E,v:_,type:"start-session",id:d(p),payload:ft(t)},e.requestTimeoutMs??180000);if(!St(a))throw new c("HOST_REJECTED","Host did not return a session.");return a},prompt:(t)=>G({channel:E,v:_,type:"prompt",id:d(p),payload:yt(t)}).then((r)=>{if(!gt(r))throw new c("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>h({channel:E,v:_,type:"session-link",id:d(p),payload:oe(t)}),close:()=>h({channel:E,v:_,type:"close",id:d(p)}),oauthStart:()=>h({channel:E,v:_,type:"oauth-start",id:d(p)}),oauthDisconnect:()=>h({channel:E,v:_,type:"oauth-disconnect",id:d(p)}),request:(t)=>(Le(t.path)?G({channel:E,v:_,type:"request",id:d(p),payload:t}):Xo()).then((r)=>{if(!De(r))throw new c("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(Le(t.path)?G({channel:E,v:_,type:"service-request",id:d(p),payload:t}):Xo()).then((r)=>{if(!De(r))throw new c("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>G({channel:E,v:_,type:"service-status",id:d(p)}).then((t)=>{if(!bt(t))throw new c("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(re(t)?G({channel:E,v:_,type:"file-read",id:d(p),payload:{path:t}}):He()).then((r)=>{if(!vt(r))throw new c("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!re(t))return He();if(r.length>Ue)return Promise.reject(new c("FILE_TOO_LARGE",`Content is over ${Ue} characters.`));return G({channel:E,v:_,type:"file-write",id:d(p),payload:{path:t,content:r}}).then((a)=>{if(!xt(a))throw new c("HOST_REJECTED","Host did not confirm the write.");return a})},listDir:(t)=>(re(t)?G({channel:E,v:_,type:"file-list",id:d(p),payload:{path:t}}):He()).then((r)=>{if(!Ot(r))throw new c("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(re(t)?G({channel:E,v:_,type:"file-stat",id:d(p),payload:{path:t}}):He()).then((r)=>{if(!At(r))throw new c("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),a=t.system?.trim();if(r.length===0||r.length>we)return Promise.reject(new c("HOST_REJECTED",`Prompt must be 1 to ${we} characters.`));if(a!==void 0&&(a.length===0||a.length>Ne))return Promise.reject(new c("HOST_REJECTED",`System prompt must be 1 to ${Ne} characters.`));let l=t.maxOutputTokens===void 0?void 0:Math.min(mt,Math.max(1,Math.floor(t.maxOutputTokens)));if(l!==void 0&&!Number.isFinite(l))return Promise.reject(new c("HOST_REJECTED","maxOutputTokens must be a number."));let R={prompt:r};if(a!==void 0)R.system=a;if(l!==void 0)R.maxOutputTokens=l;return G({channel:E,v:_,type:"generate",id:d(p),payload:R},e.requestTimeoutMs??Tt).then((f)=>{if(!Ct(f))throw new c("HOST_REJECTED","Host did not return generated text.");return f})},onLateGenerateResult:(t)=>{J.add(t);for(let r of Qe.splice(0))y([t],r);return Kt(),()=>{J.delete(t)}},setBadge:(t)=>h({channel:E,v:_,type:"badge",id:d(p),payload:{count:ht(t)}}),setHeight:(t)=>h({channel:E,v:_,type:"resize",id:d(p),payload:{height:Rt(t)}}),onFileOpen:(t)=>{if(he.add(t),!Je)Je=!0,o.addEventListener("keydown",Yt,!0);if(ce)t(ce);return()=>{he.delete(t)}},onFileSnapshot:(t)=>(ue=t,()=>{if(ue===t)ue=null}),onFileSaved:(t)=>(Re.add(t),()=>{Re.delete(t)}),reportFileChange:(t)=>Ye({...v,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Jt,reportFileUnsupported:()=>Ye({...v,type:"file-unsupported"}),dispose:()=>{for(let t of Z.keys())U({...v,type:"workspace-unsubscribe",id:d(p),payload:{subscriptionId:t}});Z.clear();for(let t of ee.keys())U({...v,type:"shells-unsubscribe",id:d(p),payload:{subscriptionId:t}});if(ee.clear(),D=!0,ae=null,le=null,ue=null,he.clear(),Re.clear(),Je)o.removeEventListener("keydown",Yt,!0);o.removeEventListener("message",jt),o.removeEventListener("keydown",Zt,!0),o.removeEventListener("pointerover",ve),o.removeEventListener("pointermove",ve),o.removeEventListener("pointerout",eo),o.removeEventListener("focus",to),o.removeEventListener("blur",oo);for(let t of Y.values())clearTimeout(t.timer),t.reject(new c("HOST_UNAVAILABLE","Host client was disposed."));Y.clear(),i.clear(),S.clear(),m.clear(),g.clear(),T.clear(),P.clear(),ie.clear(),Ee.clear(),_e.clear(),me.clear(),Te.clear(),J.clear(),Qe.length=0}}};var Wo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var us=new Set(Wo);var qo=["none","agent","user"];var ps=new Set(qo);var Rr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],br=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],$o=(e,o)=>{o.style.colorScheme=e.mode;for(let[s,n]of Rr)o.style.setProperty(s,e.tokens[n]);for(let[s,n,i]of br){let S=e.tokens[i]??"";o.style.setProperty(s,S),o.style.setProperty(n,S)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Pt=(e,o)=>{if($o(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var vr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},b=(e,o)=>`var(--${e}, var(--oc-${vr[e]}, ${o}))`,F=b("surface-background","transparent"),Ve=b("surface-elevated","transparent"),se=b("surface-elevated-foreground","inherit"),w=b("surface-foreground","inherit"),x=b("surface-muted-foreground","gray"),xr=b("surface-muted","transparent"),K=b("interactive-border","currentColor"),M=b("interactive-hover","transparent"),j=b("interactive-active","transparent"),Gt=b("interactive-selection","transparent"),Mt=b("interactive-selection-foreground","inherit"),B=b("primary","currentColor"),Ut=b("primary-text","inherit"),wt=b("error-text","inherit"),Or=b("font-sans","inherit"),Nt=b("font-mono","monospace"),Qo=b("radius","9px"),Lt=`calc(${Qo} - 2px)`,Ko=`calc(${Qo} - 4px)`,O=(e,o,s="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${s})`,jo=`background-image: linear-gradient(${M}, ${M});`,Dt=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--oc-sdk-field-lift);`,Ht="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",zo="box-shadow: var(--oc-sdk-lit);",Bt=`inset 0 0.5px 0 0 ${O(w,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Ar=`
:root {
  --oc-sdk-edge: ${O(w,16)};
  --oc-sdk-field-bg: ${Ve};
  --oc-sdk-raised-bg: ${F};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${O(w,14)};
  --oc-sdk-field-bg: ${O(F,50,Ve)};
  --oc-sdk-raised-bg: ${Ve};
  --oc-sdk-field-lift: ${Bt};
  --oc-sdk-raised-lift: ${Bt};
  --oc-sdk-lit: ${Bt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Fe=(e)=>{let o=b(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${b(`${e}-text`,"inherit")}; }`},Cr=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: 2px; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,Jo=`${Ar}
.oc-sdk { color: ${w}; font-family: ${Or}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${jo} }
.oc-sdk-mono { font-family: ${Nt}; }
.oc-sdk-muted { color: ${x}; }
${Fe("success")}${Fe("warning")}${Fe("error")}${Fe("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${B}; --oc-sdk-tone-text: ${Ut}; }

.oc-sdk-btn { border-radius: ${Lt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Ko}; }
.oc-sdk-btn[data-variant="default"] { color: ${Ut}; background: ${O(B,10,F)}; border-color: ${O(B,12)}; ${zo} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${O(B,16,F)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${O(B,22,F)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${xr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${se}; ${Ht} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${j}, ${j}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${M}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${j}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${b("status-error","red")}; color: ${wt}; background: ${O("var(--oc-sdk-tone)",7,F)}; border-color: ${O("var(--oc-sdk-tone)",12)}; ${zo} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${O("var(--oc-sdk-tone)",9,F)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${O("var(--oc-sdk-tone)",11,F)}; box-shadow: none; }

.oc-sdk-field-note { color: ${x}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${wt}; }
.oc-sdk-input { border-radius: ${Lt}; background: var(--oc-sdk-field-bg); color: ${se}; ${Dt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${x}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Dt(O(w,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Dt(b("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Nt}; }

.oc-sdk-search-icon { color: ${x}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${B}; }
.oc-sdk-search-clear { border-radius: ${Ko}; color: ${x}; }
.oc-sdk-search-clear:hover { background: ${M}; color: ${w}; }

.oc-sdk-trigger { border-radius: ${Lt}; background: var(--oc-sdk-raised-bg); color: ${se}; ${Ht} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${x}; }
.oc-sdk-trigger-chevron { color: ${x}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${se}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ve}; background-clip: padding-box; color: ${se}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${M}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Gt}; color: ${Mt}; }
.oc-sdk-option-check { color: ${w}; }
.oc-sdk-option[data-destructive="true"] { color: ${wt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${O(b("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${x}; }
.oc-sdk-popup-empty { color: ${x}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${K}; border-radius: 4px; color: ${w}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${O(w,60,K)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${K}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${F}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${B}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${jo} }
.oc-sdk-check-desc { color: ${x}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${O(w,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${x}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${w}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Mt}; background: ${Gt}; border-color: ${K}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${se}; background: var(--oc-sdk-raised-bg); ${Ht} }
.oc-sdk-tab-count { color: ${x}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${O(w,6)}; color: ${x}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${O("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${M}; }
.oc-sdk-row[aria-selected="true"] { background: ${Gt}; color: ${Mt}; }
.oc-sdk-row-lead { font-family: ${Nt}; color: ${x}; }
.oc-sdk-row-sub { color: ${x}; }
.oc-sdk-row-meta { color: ${x}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${x}; }

.oc-sdk-empty-body { color: ${x}; }

.oc-sdk-spinner { color: ${x}; }
.oc-sdk-spinner-ring { border-color: ${K}; border-top-color: ${B}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${O("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${x}; }

.oc-sdk-separator { color: ${x}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${O(K,40)}; }

.oc-sdk-progress-label { color: ${x}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${O(w,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${B}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${b("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${b("success-text","inherit")}; }

.oc-sdk-text a { color: ${Ut}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${O(K,60)}; }
`,k=`
${tt}
${Cr}
${Jo}`;var Yo="oc-sdk-ui-style";var I=(e)=>{let o=document.getElementById(Yo);if(o instanceof HTMLStyleElement){if(o.textContent!==e)o.textContent=e;return}ot(document);let s=document.createElement("style");s.id=Yo,s.textContent=e,document.head.appendChild(s)},C=(e,o)=>{let s=document.createElement(e);if(o)s.className=o;return s},V=(e)=>{let o=C("button",e);return o.type="button",o},N=(e,o)=>{let s=o??"";if(e.textContent!==s)e.textContent=s};var kr=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},X=(e,o)=>{I(k);let s=o,n=V("oc-sdk oc-sdk-btn"),i=kr(),S=document.createElement("span");n.append(S),e.append(n);let m=()=>{if(n.dataset.variant=s.variant??"default",n.dataset.size=s.size??"default",n.disabled=Boolean(s.disabled)||Boolean(s.loading),n.dataset.loading=s.loading?"true":"false",n.setAttribute("aria-busy",s.loading?"true":"false"),s.loading&&i.parentNode!==n)n.prepend(i);else if(!s.loading&&i.parentNode===n)i.remove();N(S,s.label)},g=()=>{if(s.disabled||s.loading)return;s.onClick()};return n.addEventListener("click",g),m(),{update:(T)=>{s={...s,...T},m()},dispose:()=>{n.removeEventListener("click",g),n.remove()}}};var Ft=(e,o)=>{I(k);let s=o,n=C("div","oc-sdk oc-sdk-empty"),i=C("h2","oc-sdk-empty-title"),S=C("p","oc-sdk-empty-body"),m=C("div","oc-sdk-empty-action");n.append(i,S,m),e.append(n);let g=null,T=()=>{if(N(i,s.title),N(S,s.body),S.hidden=!s.body,m.hidden=!s.action,!s.action){g?.dispose(),g=null;return}let P={label:s.action.label,onClick:s.action.onClick};if(g)g.update(P);else g=X(m,{...P,variant:"outline",size:"sm"})};return T(),{update:(P)=>{s={...s,...P},T()},dispose:()=>{g?.dispose(),g=null,n.remove()}}};var Ur=/^(\s*[-*+] )\[( |x|X)\] ?(.*)$/,Zo=(e)=>e.split(`
`).map((o)=>{let s=Ur.exec(o);return s?{kind:"item",prefix:s[1]??"- ",done:s[2]!==" ",text:s[3]??""}:{kind:"text",text:o}}),er=(e)=>e.map((o)=>o.kind==="text"?o.text:`${o.prefix}[${o.done?"x":" "}] ${o.text}`).join(`
`),Ke=(e)=>{let o=2166136261;for(let s=0;s<e.length;s+=1)o^=e.charCodeAt(s),o=Math.imul(o,16777619);return`${e.length}:${(o>>>0).toString(16)}`},tr=(e,o)=>{let s=-1,n="- ";e.forEach((g,T)=>{if(g.kind!=="item")return;s=T,n=g.prefix});let i={kind:"item",prefix:n,done:!1,text:o};if(s>=0)return[...e.slice(0,s+1),i,...e.slice(s+1)];return[...e.at(-1)?.kind==="text"&&e.at(-1)?.text===""?e.slice(0,-1):[...e],i,{kind:"text",text:""}]};var Q=It(),z=document.querySelector("#root");if(!z)throw Error("Missing root");var or=document.createElement("style");or.textContent=`
  html, body { margin: 0; height: 100%; background: var(--oc-bg); color: var(--oc-fg); font-family: var(--oc-font); font-size: 13px; }
  #root { box-sizing: border-box; height: 100%; overflow: auto; padding: 16px 20px; }
  .note { margin: 2px 0; color: var(--oc-muted); white-space: pre-wrap; min-height: 1em; }
  .item { display: flex; align-items: center; gap: 8px; margin: 2px 0; }
  .item input[type="checkbox"] { width: 16px; height: 16px; margin: 0; accent-color: var(--oc-primary); }
  .item input[type="text"] { flex: 1; min-width: 0; border: 1px solid transparent; border-radius: var(--oc-radius); padding: 4px 6px;
    background: transparent; color: inherit; font: inherit; }
  .item input[type="text"]:hover { border-color: var(--oc-border); }
  .item input[type="text"]:focus { outline: none; border-color: var(--oc-focus); background: var(--oc-elevated); }
  .item.done input[type="text"] { color: var(--oc-muted); text-decoration: line-through; }
  .item .remove { visibility: hidden; }
  .item:hover .remove, .item:focus-within .remove { visibility: visible; }
  .actions { margin-top: 12px; }
`;document.head.append(or);Q.onReady((e)=>Pt(e,document.documentElement));var W=[],ne=!1,Xt=Ie(null),Wt=()=>er(W),je=()=>{Q.reportFileChange(Xt.observe(Ke(Wt())))},Vt=()=>{if(z.replaceChildren(),!W.some((o)=>o.kind==="item")&&ne){Ft(z,{title:"No items",body:"This checklist is empty."});return}if(W.forEach((o,s)=>{if(o.kind==="text"){let m=document.createElement("p");m.className="note",m.textContent=o.text,z.append(m);return}let n=document.createElement("div");n.className=o.done?"item done":"item";let i=document.createElement("input");i.type="checkbox",i.checked=o.done,i.disabled=ne,i.addEventListener("change",()=>{o.done=i.checked,n.className=o.done?"item done":"item",je()});let S=document.createElement("input");if(S.type="text",S.value=o.text,S.readOnly=ne,S.setAttribute("aria-label","Item"),S.addEventListener("input",()=>{o.text=S.value,je()}),n.append(i,S),!ne){let m=document.createElement("span");m.className="remove",X(m,{label:"Remove",variant:"ghost",size:"xs",onClick:()=>{W=W.filter((g,T)=>T!==s),je(),Vt()}}),n.append(m)}z.append(n)}),ne)return;let e=document.createElement("div");e.className="actions",X(e,{label:"Add item",variant:"secondary",size:"sm",onClick:()=>{W=tr(W,""),je(),Vt();let o=z.querySelectorAll('.item input[type="text"]');o.item(o.length-1)?.focus()}}),z.append(e)};Q.onFileOpen((e)=>{if(e.encoding!=="text"){Q.reportFileUnsupported();return}W=Zo(e.content),ne=e.readOnly,Xt=Ie(Ke(Wt())),Vt()});Q.onFileSnapshot(()=>{let e=Wt();return{content:e,version:Ke(e)}});Q.onFileSaved((e)=>{Q.reportFileChange({dirty:Xt.markSaved(e),edited:!1})});})();
