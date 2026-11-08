(()=>{var E="openchamber.sdk",g=1;var Ke=`
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
`;function je(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(n)=>{let u=n.target===e?r:n.target;if(!(u instanceof Element))return;if(!u.hasAttribute("data-oc-scrolling"))u.setAttribute("data-oc-scrolling","");let S=s.get(u);if(S!==void 0)clearTimeout(S);s.set(u,setTimeout(()=>{s.delete(u),u.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var $o=`(${je.toString()})(document);`;var ze=128,Je=65536;var Re=128;var he=65536;var Zt=/^[a-z][a-z0-9-]{0,39}$/;var Jt=(e)=>Object(e)===e&&!Array.isArray(e),Qe=(e,r)=>Object.keys(e).every((s)=>r.includes(s)),Qt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Yt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,eo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let s of e){if(!Jt(s)||!Zt.test(s.id)||!Qt(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(r.has(s.id))return!1;if(r.add(s.id),s.kind==="button"){if(!Qe(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!Qe(s,["kind","id","label","value","options","disabled"]))return!1;if(!Yt(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let n=new Set;for(let u of s.options){if(!Jt(u)||!Qe(u,["value","label"])||!Yt(u.value)||!Qt(u.label)||n.has(u.value))return!1;n.add(u.value)}if(!n.has(s.value))return!1}return!0};var oo=["default","warning","error"],Ko=/^data:image\/(?:svg\+xml|png)(?:;[^,]*)?,/,ro=(e)=>String(e)===e&&e.length>0&&e.length<=65536&&!e.includes("\x00")&&Ko.test(e),jo=new Set(oo),W=(e,r,s=1)=>{let n=String(e);if(n!==e)return!1;return n.length>=s&&n.length<=r&&!n.includes("\x00")},Ye=(e,r)=>e===null||W(e,r,0),to=(e)=>{if(e===null)return!0;let r=Number(e);return r===e&&Number.isFinite(r)&&r>=0&&r<=100},so=(e)=>{if(e===null)return!0;let r=Number(e);return r===e&&Number.isInteger(r)&&r>=0},zo=(e)=>{let r=String(e);return r===e&&jo.has(r)},no=(e)=>{if(!Array.isArray(e)||e.length>32)return null;let r=[];for(let s of e){if(Object(s)!==s||s===null)return null;let n=Jo(s);if(!n)return null;r.push(n)}return r},Jo=(e)=>{let{key:r,label:s,usedPercent:n,remainingPercent:u,resetAt:S,resetLabel:T,valueLabel:_,tone:m}=e;if(!W(r,80)||!W(s,120))return null;if(!to(n)||!to(u)||!so(S))return null;if(!Ye(T,120)||!Ye(_,120))return null;if(!zo(m))return null;return{key:r,label:s,usedPercent:n,remainingPercent:u,resetAt:S,resetLabel:T,valueLabel:_,tone:m}},Qo=(e)=>{if(!Array.isArray(e)||e.length>64)return null;let r=[];for(let s of e){if(Object(s)!==s||s===null)return null;let n=Yo(s);if(!n)return null;r.push(n)}return r},Yo=(e)=>{if(!W(e.key,80)||!W(e.name,120))return null;let r=no(e.windows);if(!r)return null;return{key:e.key,name:e.name,windows:r}},Zo=(e)=>{let{id:r,name:s,icon:n,ok:u,configured:S,status:T,shown:_}=e;if(!W(r,80)||!W(s,120))return null;if(!(n===null||String(n)===n&&ro(String(n))))return null;if(u!==!0&&u!==!1)return null;if(S!==!0&&S!==!1)return null;if(_!==!0&&_!==!1)return null;if(!Ye(T,500))return null;let m=no(e.windows);if(!m)return null;let I=Qo(e.models);if(!I)return null;return{id:r,name:s,icon:n,ok:u,configured:S,status:T,shown:_,windows:m,models:I}},Ze=(e)=>{if(Object(e)!==e||e===null||e===void 0)return null;let r=e,{displayMode:s,updatedAt:n,loading:u,providers:S}=r;if(s!=="usage"&&s!=="remaining")return null;if(!so(n)||u!==!0&&u!==!1)return null;if(!Array.isArray(S)||S.length>64)return null;let T=[];for(let _ of S){if(Object(_)!==_||_===null)return null;let m=Zo(_);if(!m)return null;T.push(m)}return{displayMode:s,updatedAt:n,loading:u,providers:T}};var io=["{id}","{segment}","{segments+}"];var Pr=new Set(io);var ao=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Gr=new Set(ao);var be=20000000,ve=256;var et=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,lo=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==r.bytes[s])return!1;return!0};var uo=/^[A-Za-z0-9_-]{1,80}$/;var co=["left","right","top","bottom"];var po=(e,r=0,s={remaining:16000})=>{if(--s.remaining<0||r>=32)return!1;if(e===null)return!0;let n=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let u of n)if(!po(u,r+1,s))return!1;return!0},tt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(tt);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(tt)}return String(e)===e||Number.isFinite(e)},ot=(e)=>{try{if(String(e.id)!==e.id||!uo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!co.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!po(e.data)||!tt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var st=2000;var Eo=["file","directory","other","missing"],nt=(e)=>Boolean(e&&"sessionId"in e),it=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var go=/^[0-9a-f]{7,64}$/i,at=(e)=>go.test(e),xe=500,Oe=32000,_o=16000,To=128,mo=200,fo=2000,yo=16000,Ro=80,ho=200,bo=16000;var vo=2000;var lt=20000,Ae=1024,Ce=2000000;var ke=64000,Pe=8000,ut=4000;var ct=960000;var xo=999,Oo=1e4,ce=500,Ao=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Co=["stopped","starting","ready","failed"],tr=new Set(Ao),ko=(e)=>tr.has(e),Po=(e)=>e&&ko(e)?e:"HOST_REJECTED",Z=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Z);if(Object(e)===e)return Object.values(e).every(Z);return!1},Io=(e)=>Z(e)&&JSON.stringify(e).length<=bo,So=(e)=>e?.trim().slice(0,ho)??"",ee=(e)=>{let r=e.id.trim().slice(0,To),s=e.title.trim().slice(0,mo),n=e.url.trim().slice(0,fo),u=e.text?.trim().slice(0,yo),S=e.author?.trim().slice(0,Ro),T=e.kind==="pull"?"pull":"issue",_={providerId:e.providerId.trim(),id:r,title:s||r,url:n,kind:T};if(u)_.text=u;if(S)_.author=S;if(T==="pull"){let m=So(e.branches?.head),I=So(e.branches?.base);if(m&&I)_.branches={head:m,base:I}}if(Io(e.data))_.data=e.data;return _},pt=(e)=>{let r=ee(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},dt=(e)=>{let r={text:e.text.trim().slice(0,_o)};if(e.send)r.send=!0;return r},St=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(xo,Math.max(0,Math.round(e)))},Et=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Oo,Math.max(0,Math.ceil(e)))};var te=(e)=>e.length>0&&e.length<=Ae&&!e.includes("\x00")&&!e.includes("\\");var Ie=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>vo)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},or=new Set(Co),gt=(e)=>Boolean(e&&"status"in e&&or.has(String(e.status))&&!("body"in e)),Ge=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),_t=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Tt=(e)=>Boolean(e&&"written"in e&&e.written===!0),mt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),rr=new Set(Eo),ft=(e)=>Boolean(e&&"kind"in e&&"size"in e&&rr.has(String(e.kind))&&Number.isFinite(e.size)),yt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),sr=new Set(["workspace","shells","usage","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),nr=(e)=>Object(e)===e?e:null,rt=(e)=>String(e)===e&&e.length>0,ir=(e)=>{if(!rt(e.id))return null;if(e.ok===!0){let r={channel:E,v:g,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&rt(e.error))return{channel:E,v:g,type:"result",id:e.id,ok:!1,error:e.error,code:Po(rt(e.code)?e.code:void 0)};return null},Rt=(e)=>{let r=nr(e);if(!r||r.channel!==E||r.v!==g)return null;if(r.type==="result")return ir(r);if(!sr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var Go=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),ar=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class c extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var Mo=()=>Promise.reject(new c("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Me=()=>Promise.reject(new c("BAD_PATH",`File path must be 1 to ${Ae} characters without NUL or backslash.`)),Ue=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new c("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},d=(e)=>(e.value+=1,`oc-${e.value}`),ht=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new c("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===r.parent),n=e.requestTimeoutMs??lt,u=new Set,S=new Set,T=new Set,_=new Set,m=new Set,I=new Set,V=new Set,pe=new Set,de=new Set,Se=new Set,Ee=new Set,ge=new Set,Fe=null,wt=!1,z=new Set,Ve=[],se=null,ne=null,_e=new Set,Te=new Set,ie=null,ae=null,Xe=!1,J=new Map,Q=new Map,Y=new Map,D=!1,p={value:0},l=null,H=null,le=!1,ue=!1,Nt=null,Lt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},U=(t)=>{r.parent.postMessage(t,"*")},Dt=()=>{if(D||r.parent===r||z.size===0||l?.features?.lateGenerateResults!==!0)return;U({channel:E,v:g,type:"generate-late-listen"})},y=(t,o)=>{for(let i of t)try{i(o)}catch(a){console.error(a)}},Ht=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let o=Rt(t.data);if(!o)return;if(o.type==="workspace"){let a=Q.get(o.payload.subscriptionId);if(a)y([a],o.payload.snapshot);return}if(o.type==="shells"){let a=Y.get(o.payload.subscriptionId);if(a)y([a],o.payload.snapshot);return}if(o.type==="ready"){if(l=o.payload,H=Lt(o.payload.session),y(u,o.payload),y(S,o.payload.directory),y(T,o.payload.session),H)y(_,H);if(y(m,o.payload.connection),y(I,o.payload.settings),y(V,o.payload.item),o.payload.block)y(pe,o.payload.block);Dt(),Bt();return}if(o.type==="service-event"){y(de,o.payload);return}if(o.type==="generate-late"){if(z.size===0)Ve.push(o.payload);else y(z,o.payload);return}if(o.type==="directory"){if(l)l={...l,directory:o.payload.directory};y(S,o.payload.directory);return}if(o.type==="session"){if(l)l={...l,session:o.payload.session};if(!o.payload.session)H=null;else if(H?.sessionId!==o.payload.session.id)H=Lt(o.payload.session);y(T,o.payload.session);return}if(o.type==="session-lifecycle"){H=o.payload,y(_,o.payload);return}if(o.type==="connection"){if(l)l={...l,connection:o.payload.connection};y(m,o.payload.connection);return}if(o.type==="settings"){if(l)l={...l,settings:o.payload.settings};y(I,o.payload.settings);return}if(o.type==="item"){if(l)l={...l,item:o.payload.item};y(V,o.payload.item);return}if(o.type==="status-control-event"){y(Se,o.payload);return}if(o.type==="popover-closed"){y(Ee,o.payload);return}if(o.type==="usage"){let a=Ze(o.payload.snapshot);if(!a)return;Fe=a,y(ge,a);return}if(o.type==="action"){let a=(f)=>{if(!D)U({channel:E,v:g,type:"action-result",id:o.id,payload:f})},h=ne;if(!h){a({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>h(o.payload)).then(()=>a({ok:!0}),(f)=>{let C=(f instanceof Error?f.message:String(f)).trim();a({ok:!1,error:(C||"Action failed.").slice(0,ce)})});return}if(o.type==="file-open"){let a=o.payload;if(ae&&lo(ae,a))return;ae=a,y(_e,o.payload);return}if(o.type==="file-saved"){y(Te,o.payload.version);return}if(o.type==="file-snapshot"){let a=(C)=>{if(!D)U({channel:E,v:g,type:"file-snapshot-result",id:o.id,payload:C})},h=(C)=>a({error:(C.trim()||"Could not read the edited file.").slice(0,ce)}),f=ie;if(!f){h("This extension does not edit files.");return}Promise.resolve().then(()=>f(o.payload.purpose)).then((C)=>{if(et(C)>be){h(`The file is over ${be} ${"bytes"in C?"bytes":"characters"}.`);return}if(C.version.length>ve){h(`The snapshot version is over ${ve} characters.`);return}a({snapshot:"bytes"in C?{bytes:C.bytes,version:C.version}:{content:C.content,version:C.version}})},(C)=>h(C instanceof Error?C.message:String(C)));return}if(o.type==="resolve"){let a=(f)=>{U({channel:E,v:g,type:"resolve-result",id:o.id,payload:f})},h=se;if(!h){a({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>h(o.payload)).then((f)=>a({item:f?ee(f):null}),(f)=>{let C=(f instanceof Error?f.message:String(f)).trim();a({error:(C||"Command failed.").slice(0,ce)})});return}let i=J.get(o.id);if(!i)return;if(clearTimeout(i.timer),J.delete(o.id),o.ok){i.resolve(o.payload);return}i.reject(new c(o.code,o.error))};r.addEventListener("message",Ht),U({channel:E,v:g,type:"hello"});let G=(t,o=n)=>{if(D||r.parent===r)return Promise.reject(new c("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((i,a)=>{let h=setTimeout(()=>{J.delete(t.id),a(new c("HOST_TIMEOUT","Host did not answer in time."))},o);J.set(t.id,{resolve:i,reject:a,timer:h}),U(t)})},R=(t)=>G(t).then(()=>{return}),v={channel:E,v:g},Bt=()=>{if(wt||ge.size===0||l?.features?.usage!==!0)return;wt=!0,R({...v,type:"usage-subscribe",id:d(p)}).catch(()=>{return})},Ft=()=>l?.features?.usage!==!0?Promise.reject(new c("UNSUPPORTED","This host does not support the usage feed.")):null,We=(t)=>{if(!D&&r.parent!==r)U(t)},Vt=()=>We({...v,type:"file-save"}),Xt=(t)=>{if(!Go(t)||!ar(t))return;t.preventDefault(),Vt()},Wt=(t)=>{if(!Go(t)||t.key!=="Escape"||l?.surface!=="popover"||!l.popover)return;t.preventDefault(),jt(l.popover.id,"escape").catch(()=>{return})},me=()=>{let t=l?.surface==="popover"?l.popover:void 0;if(!t)return;let o=le||ue;if(Nt===o)return;Nt=o,zt(t.id,o).catch(()=>{return})},fe=()=>{if(l?.surface!=="popover"||le)return;le=!0,me()},qt=(t)=>{if(l?.surface!=="popover"||t.relatedTarget!==null||!le)return;le=!1,me()},$t=()=>{if(l?.surface!=="popover"||ue)return;ue=!0,me()},Kt=()=>{if(l?.surface!=="popover"||!ue)return;ue=!1,me()},L=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new c("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},qe=async(t)=>{if(t.kind!=="projects")L(t.projectId);let o=await G({...v,type:"workspace-read",id:d(p),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new c("HOST_REJECTED","Host did not return workspace data.");return o},$e=async(t,o)=>{if(t.kind!=="projects")L(t.projectId);let i=d(p);Q.set(i,o);try{await R({...v,type:"workspace-subscribe",id:d(p),payload:{subscriptionId:i,query:t}})}catch(a){if(Q.delete(i),!D)U({...v,type:"workspace-unsubscribe",id:d(p),payload:{subscriptionId:i}});throw a}return()=>{if(!Q.delete(i)||D)return;U({...v,type:"workspace-unsubscribe",id:d(p),payload:{subscriptionId:i}})}},qo=async(t,o)=>{if(t.kind==="session")L(t.sessionId);if(t.kind==="project")L(t.projectId);let i=d(p);Y.set(i,o);try{await R({...v,type:"shells-subscribe",id:d(p),payload:{subscriptionId:i,scope:t}})}catch(a){if(Y.delete(i),!D)U({...v,type:"shells-unsubscribe",id:d(p),payload:{subscriptionId:i}});throw a}return()=>{if(!Y.delete(i)||D)return;U({...v,type:"shells-unsubscribe",id:d(p),payload:{subscriptionId:i}})}},ye=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>ze))throw new c("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!Z(t.value))throw new c("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Je)throw new c("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&l?.features?.deviceStorage!==!0)throw new c("UNSUPPORTED","This host does not support device storage.");let o=await G({...v,type:"storage",id:d(p),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new c("HOST_REJECTED","Host did not return storage data.");return o},jt=(t,o)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):R({...v,type:"popover-close",id:d(p),payload:o?{id:t,reason:o}:{id:t}}),zt=(t,o)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):R({...v,type:"popover-anchor",id:d(p),payload:{id:t,active:o}});return r.addEventListener("keydown",Wt,!0),r.addEventListener("pointerover",fe),r.addEventListener("pointermove",fe),r.addEventListener("pointerout",qt),r.addEventListener("focus",$t),r.addEventListener("blur",Kt),{onAction:(t)=>(ne=t,()=>{if(ne===t)ne=null}),listProjects:async()=>{let t=await qe({kind:"projects"});if(t.kind!=="projects")throw new c("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await qe({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new c("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await qe({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new c("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>$e({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>$e({kind:"worktrees",projectId:t},(i)=>{if(i.kind==="worktrees")o(i)}),onSessions:(t,o)=>$e({kind:"sessions",projectId:t},(i)=>{if(i.kind==="sessions")o(i)}),onRunningShells:(t,o)=>qo(t,o),readShellOutput:async(t,o)=>{L(t,Re);let i=o?.cursor;if(i!==void 0&&(!Number.isInteger(i)||i<0))throw new c("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let a=o?.tailBytes;if(a!==void 0&&(!Number.isInteger(a)||a<1||a>he))throw new c("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${he}.`);let f=await G({...v,type:"shell-output",id:d(p),payload:{shellId:t,cursor:i,tailBytes:a}});if(!f||typeof f.output!=="string"||!Number.isFinite(f.cursor))throw new c("HOST_REJECTED","Host did not return shell output.");return f},stopShell:async(t)=>{if(L(t,Re),(await G({...v,type:"shell-stop",id:d(p),payload:{shellId:t}}))?.stopped!==!0)throw new c("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{L(t),await R({...v,type:"open-session",id:d(p),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let i=Ue(o),a={op:"get",key:t};if(i)a.scope=i;let h=await ye(a);return h.op==="get"&&h.found?h.value:void 0},set:async(t,o,i)=>{let a=Ue(i),h={op:"set",key:t,value:o};if(a)h.scope=a;await ye(h)},delete:async(t,o)=>{let i=Ue(o),a={op:"delete",key:t};if(i)a.scope=i;await ye(a)},keys:async(t)=>{let o=Ue(t),i={op:"keys"};if(o)i.scope=o;let a=await ye(i);if(a.op!=="keys")throw new c("HOST_REJECTED","Expected storage keys.");return a.keys}},onReady:(t)=>{if(u.add(t),l)t(l);return()=>{u.delete(t)}},onDirectory:(t)=>{if(S.add(t),l)t(l.directory);return()=>{S.delete(t)}},onSession:(t)=>{if(T.add(t),l)t(l.session);return()=>{T.delete(t)}},onSessionLifecycle:(t)=>{if(_.add(t),H)t(H);return()=>{_.delete(t)}},onConnection:(t)=>{if(m.add(t),l)t(l.connection);return()=>{m.delete(t)}},onSettings:(t)=>{if(I.add(t),l)t(l.settings);return()=>{I.delete(t)}},onItem:(t)=>{if(V.add(t),l)t(l.item);return()=>{V.delete(t)}},onBlock:(t)=>{if(pe.add(t),l?.block)t(l.block);return()=>{pe.delete(t)}},onServiceEvent:(t)=>(de.add(t),()=>{de.delete(t)}),onStatusControl:(t)=>(Se.add(t),()=>{Se.delete(t)}),onPopoverClosed:(t)=>(Ee.add(t),()=>{Ee.delete(t)}),onUsage:(t)=>{if(ge.add(t),Fe)t(Fe);return Bt(),()=>{ge.delete(t)}},refreshUsage:()=>Ft()??R({...v,type:"usage-refresh",id:d(p)}),openUsageSettings:()=>Ft()??R({...v,type:"open-usage-settings",id:d(p)}),setStatusControls:(t)=>{if(l?.features?.statusControls!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support status controls."));if(!eo(t))return Promise.reject(new c("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return R({...v,type:"status-controls",id:d(p),payload:{controls:t}})},openPopover:(t)=>{if(l?.features?.popovers!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support popovers."));if(!ot(t))return Promise.reject(new c("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return R({...v,type:"popover-open",id:d(p),payload:t})},closePopover:jt,setPopoverAnchorActive:zt,onResolve:(t)=>(se=t,()=>{if(se===t)se=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>xe)return Promise.reject(new c("HOST_REJECTED",`Toast message must contain 1 to ${xe} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Oe))return Promise.reject(new c("HOST_REJECTED",`Toast copy text must contain 1 to ${Oe} characters.`));return R({channel:E,v:g,type:"toast",id:d(p),payload:{...t,message:o}})},openUrl:(t)=>R({channel:E,v:g,type:"open-url",id:d(p),payload:{url:t}}),openCommit:(t)=>at(t)?R({channel:E,v:g,type:"open-commit",id:d(p),payload:{sha:t}}):Promise.reject(new c("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(t)=>R({channel:E,v:g,type:"block-answer",id:d(p),payload:{text:t.trim().slice(0,st)}}),openSurface:(t)=>R({channel:E,v:g,type:"open-surface",id:d(p),payload:{surfaceId:t}}),writeClipboard:(t)=>R({channel:E,v:g,type:"clipboard-write",id:d(p),payload:{text:t}}),compose:(t)=>R({channel:E,v:g,type:"compose",id:d(p),payload:t}),attach:(t)=>R({channel:E,v:g,type:"attach",id:d(p),payload:ee(t)}),startSession:async(t)=>{if(t.projectId!==void 0)L(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")L(o.directory);else{if(o.name!==void 0)L(o.name,200);if(o.baseBranch!==void 0)L(o.baseBranch,200)}let i=await G({channel:E,v:g,type:"start-session",id:d(p),payload:pt(t)},e.requestTimeoutMs??180000);if(!nt(i))throw new c("HOST_REJECTED","Host did not return a session.");return i},prompt:(t)=>G({channel:E,v:g,type:"prompt",id:d(p),payload:dt(t)}).then((o)=>{if(!it(o))throw new c("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>R({channel:E,v:g,type:"session-link",id:d(p),payload:ee(t)}),close:()=>R({channel:E,v:g,type:"close",id:d(p)}),oauthStart:()=>R({channel:E,v:g,type:"oauth-start",id:d(p)}),oauthDisconnect:()=>R({channel:E,v:g,type:"oauth-disconnect",id:d(p)}),request:(t)=>(Ie(t.path)?G({channel:E,v:g,type:"request",id:d(p),payload:t}):Mo()).then((o)=>{if(!Ge(o))throw new c("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Ie(t.path)?G({channel:E,v:g,type:"service-request",id:d(p),payload:t}):Mo()).then((o)=>{if(!Ge(o))throw new c("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>G({channel:E,v:g,type:"service-status",id:d(p)}).then((t)=>{if(!gt(t))throw new c("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(te(t)?G({channel:E,v:g,type:"file-read",id:d(p),payload:{path:t}}):Me()).then((o)=>{if(!_t(o))throw new c("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!te(t))return Me();if(o.length>Ce)return Promise.reject(new c("FILE_TOO_LARGE",`Content is over ${Ce} characters.`));return G({channel:E,v:g,type:"file-write",id:d(p),payload:{path:t,content:o}}).then((i)=>{if(!Tt(i))throw new c("HOST_REJECTED","Host did not confirm the write.");return i})},listDir:(t)=>(te(t)?G({channel:E,v:g,type:"file-list",id:d(p),payload:{path:t}}):Me()).then((o)=>{if(!mt(o))throw new c("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(te(t)?G({channel:E,v:g,type:"file-stat",id:d(p),payload:{path:t}}):Me()).then((o)=>{if(!ft(o))throw new c("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),i=t.system?.trim();if(o.length===0||o.length>ke)return Promise.reject(new c("HOST_REJECTED",`Prompt must be 1 to ${ke} characters.`));if(i!==void 0&&(i.length===0||i.length>Pe))return Promise.reject(new c("HOST_REJECTED",`System prompt must be 1 to ${Pe} characters.`));let a=t.maxOutputTokens===void 0?void 0:Math.min(ut,Math.max(1,Math.floor(t.maxOutputTokens)));if(a!==void 0&&!Number.isFinite(a))return Promise.reject(new c("HOST_REJECTED","maxOutputTokens must be a number."));let h={prompt:o};if(i!==void 0)h.system=i;if(a!==void 0)h.maxOutputTokens=a;return G({channel:E,v:g,type:"generate",id:d(p),payload:h},e.requestTimeoutMs??ct).then((f)=>{if(!yt(f))throw new c("HOST_REJECTED","Host did not return generated text.");return f})},onLateGenerateResult:(t)=>{z.add(t);for(let o of Ve.splice(0))y([t],o);return Dt(),()=>{z.delete(t)}},setBadge:(t)=>R({channel:E,v:g,type:"badge",id:d(p),payload:{count:St(t)}}),setHeight:(t)=>R({channel:E,v:g,type:"resize",id:d(p),payload:{height:Et(t)}}),onFileOpen:(t)=>{if(_e.add(t),!Xe)Xe=!0,r.addEventListener("keydown",Xt,!0);if(ae)t(ae);return()=>{_e.delete(t)}},onFileSnapshot:(t)=>(ie=t,()=>{if(ie===t)ie=null}),onFileSaved:(t)=>(Te.add(t),()=>{Te.delete(t)}),reportFileChange:(t)=>We({...v,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Vt,reportFileUnsupported:()=>We({...v,type:"file-unsupported"}),dispose:()=>{for(let t of Q.keys())U({...v,type:"workspace-unsubscribe",id:d(p),payload:{subscriptionId:t}});Q.clear();for(let t of Y.keys())U({...v,type:"shells-unsubscribe",id:d(p),payload:{subscriptionId:t}});if(Y.clear(),D=!0,se=null,ne=null,ie=null,_e.clear(),Te.clear(),Xe)r.removeEventListener("keydown",Xt,!0);r.removeEventListener("message",Ht),r.removeEventListener("keydown",Wt,!0),r.removeEventListener("pointerover",fe),r.removeEventListener("pointermove",fe),r.removeEventListener("pointerout",qt),r.removeEventListener("focus",$t),r.removeEventListener("blur",Kt);for(let t of J.values())clearTimeout(t.timer),t.reject(new c("HOST_UNAVAILABLE","Host client was disposed."));J.clear(),u.clear(),S.clear(),T.clear(),_.clear(),m.clear(),I.clear(),V.clear(),pe.clear(),de.clear(),Se.clear(),Ee.clear(),z.clear(),Ve.length=0}}};var Uo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var jr=new Set(Uo);var wo=["none","agent","user"];var Jr=new Set(wo);var lr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],ur=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],No=(e,r)=>{r.style.colorScheme=e.mode;for(let[s,n]of lr)r.style.setProperty(s,e.tokens[n]);for(let[s,n,u]of ur){let S=e.tokens[u]??"";r.style.setProperty(s,S),r.style.setProperty(n,S)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},bt=(e,r)=>{if(No(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var cr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},b=(e,r)=>`var(--${e}, var(--oc-${cr[e]}, ${r}))`,F=b("surface-background","transparent"),Ne=b("surface-elevated","transparent"),oe=b("surface-elevated-foreground","inherit"),w=b("surface-foreground","inherit"),x=b("surface-muted-foreground","gray"),pr=b("surface-muted","transparent"),q=b("interactive-border","currentColor"),M=b("interactive-hover","transparent"),K=b("interactive-active","transparent"),vt=b("interactive-selection","transparent"),xt=b("interactive-selection-foreground","inherit"),B=b("primary","currentColor"),Ot=b("primary-text","inherit"),At=b("error-text","inherit"),dr=b("font-sans","inherit"),Ct=b("font-mono","monospace"),Bo=b("radius","9px"),kt=`calc(${Bo} - 2px)`,Lo=`calc(${Bo} - 4px)`,O=(e,r,s="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${s})`,Do=`background-image: linear-gradient(${M}, ${M});`,Pt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,It="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Ho="box-shadow: var(--oc-sdk-lit);",Gt=`inset 0 0.5px 0 0 ${O(w,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Sr=`
:root {
  --oc-sdk-edge: ${O(w,16)};
  --oc-sdk-field-bg: ${Ne};
  --oc-sdk-raised-bg: ${F};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${O(w,14)};
  --oc-sdk-field-bg: ${O(F,50,Ne)};
  --oc-sdk-raised-bg: ${Ne};
  --oc-sdk-field-lift: ${Gt};
  --oc-sdk-raised-lift: ${Gt};
  --oc-sdk-lit: ${Gt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,we=(e)=>{let r=b(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${b(`${e}-text`,"inherit")}; }`},Er=`
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
`,Fo=`${Sr}
.oc-sdk { color: ${w}; font-family: ${dr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Do} }
.oc-sdk-mono { font-family: ${Ct}; }
.oc-sdk-muted { color: ${x}; }
${we("success")}${we("warning")}${we("error")}${we("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${B}; --oc-sdk-tone-text: ${Ot}; }

.oc-sdk-btn { border-radius: ${kt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Lo}; }
.oc-sdk-btn[data-variant="default"] { color: ${Ot}; background: ${O(B,10,F)}; border-color: ${O(B,12)}; ${Ho} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${O(B,16,F)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${O(B,22,F)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${pr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${K}, ${K}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${oe}; ${It} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${K}, ${K}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${M}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${K}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${b("status-error","red")}; color: ${At}; background: ${O("var(--oc-sdk-tone)",7,F)}; border-color: ${O("var(--oc-sdk-tone)",12)}; ${Ho} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${O("var(--oc-sdk-tone)",9,F)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${O("var(--oc-sdk-tone)",11,F)}; box-shadow: none; }

.oc-sdk-field-note { color: ${x}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${At}; }
.oc-sdk-input { border-radius: ${kt}; background: var(--oc-sdk-field-bg); color: ${oe}; ${Pt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${x}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Pt(O(w,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Pt(b("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Ct}; }

.oc-sdk-search-icon { color: ${x}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${B}; }
.oc-sdk-search-clear { border-radius: ${Lo}; color: ${x}; }
.oc-sdk-search-clear:hover { background: ${M}; color: ${w}; }

.oc-sdk-trigger { border-radius: ${kt}; background: var(--oc-sdk-raised-bg); color: ${oe}; ${It} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${K}, ${K}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${x}; }
.oc-sdk-trigger-chevron { color: ${x}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${oe}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ne}; background-clip: padding-box; color: ${oe}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${M}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${vt}; color: ${xt}; }
.oc-sdk-option-check { color: ${w}; }
.oc-sdk-option[data-destructive="true"] { color: ${At}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${O(b("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${x}; }
.oc-sdk-popup-empty { color: ${x}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${q}; border-radius: 4px; color: ${w}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${O(w,60,q)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${q}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${F}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${B}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Do} }
.oc-sdk-check-desc { color: ${x}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${O(w,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${x}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${w}; }
.oc-sdk-tab[aria-selected="true"] { color: ${xt}; background: ${vt}; border-color: ${q}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${oe}; background: var(--oc-sdk-raised-bg); ${It} }
.oc-sdk-tab-count { color: ${x}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${O(w,6)}; color: ${x}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${O("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${M}; }
.oc-sdk-row[aria-selected="true"] { background: ${vt}; color: ${xt}; }
.oc-sdk-row-lead { font-family: ${Ct}; color: ${x}; }
.oc-sdk-row-sub { color: ${x}; }
.oc-sdk-row-meta { color: ${x}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${x}; }

.oc-sdk-empty-body { color: ${x}; }

.oc-sdk-spinner { color: ${x}; }
.oc-sdk-spinner-ring { border-color: ${q}; border-top-color: ${B}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${O("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${x}; }

.oc-sdk-separator { color: ${x}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${O(q,40)}; }

.oc-sdk-progress-label { color: ${x}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${O(w,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${B}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${b("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${b("success-text","inherit")}; }

.oc-sdk-text a { color: ${Ot}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${O(q,60)}; }
`,k=`
${Ke}
${Er}
${Fo}`;var Vo="oc-sdk-ui-style";var P=(e)=>{let r=document.getElementById(Vo);if(r instanceof HTMLStyleElement){if(r.textContent!==e)r.textContent=e;return}je(document);let s=document.createElement("style");s.id=Vo,s.textContent=e,document.head.appendChild(s)},A=(e,r)=>{let s=document.createElement(e);if(r)s.className=r;return s},X=(e)=>{let r=A("button",e);return r.type="button",r},N=(e,r)=>{let s=r??"";if(e.textContent!==s)e.textContent=s},j=(e,r,s)=>{if(s===void 0||s===null||s==="")e.removeAttribute(r);else if(e.getAttribute(r)!==s)e.setAttribute(r,s)};var gr=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},re=(e,r)=>{P(k);let s=r,n=X("oc-sdk oc-sdk-btn"),u=gr(),S=document.createElement("span");n.append(S),e.append(n);let T=()=>{if(n.dataset.variant=s.variant??"default",n.dataset.size=s.size??"default",n.disabled=Boolean(s.disabled)||Boolean(s.loading),n.dataset.loading=s.loading?"true":"false",n.setAttribute("aria-busy",s.loading?"true":"false"),s.loading&&u.parentNode!==n)n.prepend(u);else if(!s.loading&&u.parentNode===n)u.remove();N(S,s.label)},_=()=>{if(s.disabled||s.loading)return;s.onClick()};return n.addEventListener("click",_),T(),{update:(m)=>{s={...s,...m},T()},dispose:()=>{n.removeEventListener("click",_),n.remove()}}};var Mt=(e,r)=>{P(k);let s=r,n=A("label","oc-sdk oc-sdk-field"),u=A("span","oc-sdk-field-label"),S=s.multiline?A("textarea","oc-sdk-input"):A("input","oc-sdk-input"),T=A("span","oc-sdk-field-note");n.append(u,S,T),e.append(n);let _=()=>{if(N(u,s.label),u.hidden=!s.label,S instanceof HTMLInputElement)S.type=s.password?"password":"text";else S.rows=s.rows??3;if(S.value!==s.value)S.value=s.value;S.disabled=Boolean(s.disabled),j(S,"placeholder",s.placeholder),S.dataset.mono=s.mono?"true":"false";let I=Boolean(s.error);n.dataset.invalid=I?"true":"false",S.setAttribute("aria-invalid",I?"true":"false");let V=s.error??s.helper??"";N(T,V),T.hidden=V===""},m=()=>{s.onChange(S.value)};return S.addEventListener("input",m),_(),{update:(I)=>{s={...s,...I},_()},dispose:()=>{S.removeEventListener("input",m),n.remove()}}};var Ut=ht(),Wo=document.querySelector("#root");if(!Wo)throw Error("Missing root");var Xo=!1;Ut.onReady((e)=>{if(bt(e,document.documentElement),Xo)return;Xo=!0;let r=document.createElement("div");r.style.cssText="display:flex;align-items:center;gap:8px;height:100%;padding:0 8px;box-sizing:border-box;",Wo.append(r);let s="",n=document.createElement("div");n.style.flex="1",r.append(n);let u=Mt(n,{value:s,placeholder:"https://example.com",mono:!0,onChange:(_)=>{s=_,u.update({value:_})}}),S=re(r,{label:"Go",size:"sm",onClick:()=>{if(!s.trim())return;S.update({loading:!0}),Ut.serviceRequest({method:"POST",path:"/navigate",body:JSON.stringify({url:s.trim()})}).then(()=>T()).finally(()=>S.update({loading:!1}))}}),T=async()=>{try{let _=await Ut.serviceRequest({method:"GET",path:"/state"}),m=JSON.parse(_.body);if(String(m.url)===m.url&&m.url!==s)s=m.url==="about:blank"?"":m.url,u.update({value:s})}catch{}};T(),setInterval(()=>{T()},2000)});})();
