(()=>{var g="openchamber.sdk",_=1;var tt=`
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
`;function ot(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(a)=>{let c=a.target===e?r:a.target;if(!(c instanceof Element))return;if(!c.hasAttribute("data-oc-scrolling"))c.setAttribute("data-oc-scrolling","");let E=s.get(c);if(E!==void 0)clearTimeout(E);s.set(c,setTimeout(()=>{s.delete(c),c.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var tr=`(${ot.toString()})(document);`;var rt=128,st=65536;var xe=128;var Ce=65536;var nt=8000,it=192000,at=120000;var so=(e)=>{let r=[],s=0,a=0;return{push:(c)=>{r.push(c),a+=c.length;while(a-s>e&&r.length>1){let E=r.shift();a-=E?.length??0,s=0}},pull:(c)=>{let E=0;while(E<c.length&&r.length>0){let m=r[0],T=Math.min(c.length-E,m.length-s);if(c.set(m.subarray(s,s+T),E),E+=T,s+=T,s>=m.length)r.shift(),a-=m.length,s=0}c.fill(0,E)},clear:()=>{r.length=0,s=0,a=0},get size(){return a-s}}};var uo=/^[a-z][a-z0-9-]{0,39}$/;var no=(e)=>Object(e)===e&&!Array.isArray(e),ut=(e,r)=>Object.keys(e).every((s)=>r.includes(s)),io=(e)=>String(e)===e&&e.length>=1&&e.length<=60,ao=(e)=>String(e)===e&&e.length>=1&&e.length<=80,lo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let s of e){if(!no(s)||!uo.test(s.id)||!io(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(r.has(s.id))return!1;if(r.add(s.id),s.kind==="button"){if(!ut(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!ut(s,["kind","id","label","value","options","disabled"]))return!1;if(!ao(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let a=new Set;for(let c of s.options){if(!no(c)||!ut(c,["value","label"])||!ao(c.value)||!io(c.label)||a.has(c.value))return!1;a.add(c.value)}if(!a.has(s.value))return!1}return!0};var po=["usage","remaining"],So=["default","warning","error"],or=/^data:image\/(?:svg\+xml|png)(?:;[^,]*)?,/,Eo=(e)=>String(e)===e&&e.length>0&&e.length<=65536&&!e.includes("\x00")&&or.test(e),rr=new Set(So),sr=new Set(po),K=(e,r,s=1)=>{let a=String(e);if(a!==e)return!1;return a.length>=s&&a.length<=r&&!a.includes("\x00")},lt=(e,r)=>e===null||K(e,r,0),co=(e)=>{if(e===null)return!0;let r=Number(e);return r===e&&Number.isFinite(r)&&r>=0&&r<=100},go=(e)=>{if(e===null)return!0;let r=Number(e);return r===e&&Number.isSafeInteger(r)&&r>=0},nr=(e)=>{let r=String(e);return r===e&&rr.has(r)},ir=(e)=>{let r=String(e);return r===e&&sr.has(r)},_o=(e)=>{if(!Array.isArray(e)||e.length>32)return null;let r=[];for(let s of e){if(Object(s)!==s||s===null)return null;let a=ar(s);if(!a)return null;r.push(a)}return r},ar=(e)=>{let{key:r,label:s,usedPercent:a,remainingPercent:c,resetAt:E,resetLabel:m,valueLabel:T,tone:O}=e;if(!K(r,80)||!K(s,120))return null;if(!co(a)||!co(c)||!go(E))return null;if(!lt(m,120)||!lt(T,120))return null;if(!nr(O))return null;return{key:r,label:s,usedPercent:a,remainingPercent:c,resetAt:E,resetLabel:m,valueLabel:T,tone:O}},ur=(e)=>{if(!Array.isArray(e)||e.length>64)return null;let r=[];for(let s of e){if(Object(s)!==s||s===null)return null;let a=lr(s);if(!a)return null;r.push(a)}return r},lr=(e)=>{if(!K(e.key,80)||!K(e.name,120))return null;let r=_o(e.windows);if(!r)return null;return{key:e.key,name:e.name,windows:r}},cr=(e)=>{let{id:r,name:s,icon:a,ok:c,configured:E,status:m,shown:T}=e;if(!K(r,80)||!K(s,120))return null;if(!(a===null||String(a)===a&&Eo(String(a))))return null;if(c!==!0&&c!==!1)return null;if(E!==!0&&E!==!1)return null;if(T!==!0&&T!==!1)return null;if(!lt(m,500))return null;let O=_o(e.windows);if(!O)return null;let D=ur(e.models);if(!D)return null;return{id:r,name:s,icon:a,ok:c,configured:E,status:m,shown:T,windows:O,models:D}},ct=(e)=>{if(Object(e)!==e||e===null||e===void 0)return null;let r=e,{displayMode:s,updatedAt:a,loading:c,providers:E}=r;if(!ir(s))return null;if(!go(a)||c!==!0&&c!==!1)return null;if(!Array.isArray(E)||E.length>64)return null;let m=[];for(let T of E){if(Object(T)!==T||T===null)return null;let O=cr(T);if(!O)return null;m.push(O)}return{displayMode:s,updatedAt:a,loading:c,providers:m}};var To=["{id}","{segment}","{segments+}"];var Vr=new Set(To);var mo=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Xr=new Set(mo);var ke=20000000,Ie=256;var pt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,fo=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==r.bytes[s])return!1;return!0};var Ro=/^[A-Za-z0-9_-]{1,80}$/;var yo=["left","right","top","bottom"];var ho=(e,r=0,s={remaining:16000})=>{if(--s.remaining<0||r>=32)return!1;if(e===null)return!0;let a=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let c of a)if(!ho(c,r+1,s))return!1;return!0},dt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(dt);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(dt)}return String(e)===e||Number.isFinite(e)},St=(e)=>{try{if(String(e.id)!==e.id||!Ro.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!yo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!ho(e.data)||!dt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var gt=2000;var Ao=["file","directory","other","missing"],_t=(e)=>Boolean(e&&"sessionId"in e),Tt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var vo=/^[0-9a-f]{7,64}$/i,mt=(e)=>vo.test(e),Pe=500,Ge=32000,Oo=16000,xo=128,Co=200,ko=2000,Io=16000,Po=80,Go=200,Mo=16000;var Uo=2000;var ft=20000,Me=1024,Ue=2000000;var we=64000,Ne=8000,Rt=4000;var yt=960000;var wo=999,No=1e4,Ee=500,Lo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Do=["stopped","starting","ready","failed"],dr=new Set(Lo),Ho=(e)=>dr.has(e),Fo=(e)=>e&&Ho(e)?e:"HOST_REJECTED",oe=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(oe);if(Object(e)===e)return Object.values(e).every(oe);return!1},Bo=(e)=>oe(e)&&JSON.stringify(e).length<=Mo,bo=(e)=>e?.trim().slice(0,Go)??"",re=(e)=>{let r=e.id.trim().slice(0,xo),s=e.title.trim().slice(0,Co),a=e.url.trim().slice(0,ko),c=e.text?.trim().slice(0,Io),E=e.author?.trim().slice(0,Po),m=e.kind==="pull"?"pull":"issue",T={providerId:e.providerId.trim(),id:r,title:s||r,url:a,kind:m};if(c)T.text=c;if(E)T.author=E;if(m==="pull"){let O=bo(e.branches?.head),D=bo(e.branches?.base);if(O&&D)T.branches={head:O,base:D}}if(Bo(e.data))T.data=e.data;return T},ht=(e)=>{let r=re(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},bt=(e)=>{let r={text:e.text.trim().slice(0,Oo)};if(e.send)r.send=!0;return r},At=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(wo,Math.max(0,Math.round(e)))},vt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(No,Math.max(0,Math.ceil(e)))};var se=(e)=>e.length>0&&e.length<=Me&&!e.includes("\x00")&&!e.includes("\\");var Le=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Uo)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},Sr=new Set(Do),Ot=(e)=>Boolean(e&&"status"in e&&Sr.has(String(e.status))&&!("body"in e)),De=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),xt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Ct=(e)=>Boolean(e&&"written"in e&&e.written===!0),kt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Er=new Set(Ao),It=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Er.has(String(e.kind))&&Number.isFinite(e.size)),Pt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),gr=new Set(["workspace","shells","usage","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),_r=(e)=>Object(e)===e?e:null,Et=(e)=>String(e)===e&&e.length>0,Tr=(e)=>{if(!Et(e.id))return null;if(e.ok===!0){let r={channel:g,v:_,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&Et(e.error))return{channel:g,v:_,type:"result",id:e.id,ok:!1,error:e.error,code:Fo(Et(e.code)?e.code:void 0)};return null},Gt=(e)=>{let r=_r(e);if(!r||r.channel!==g||r.v!==_)return null;if(r.type==="result")return Tr(r);if(!gr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var Vo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),mr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class l extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var Wo=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),He=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${Me} characters without NUL or backslash.`)),Fe=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},S=(e)=>(e.value+=1,`oc-${e.value}`),Mt=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===r.parent),a=e.requestTimeoutMs??ft,c=new Set,E=new Set,m=new Set,T=new Set,O=new Set,D=new Set,ae=new Set,_e=new Set,Te=new Set,me=new Set,fe=new Set,Re=new Set,ye=null,je=!1,Q=new Set,ze=[],ue=null,le=null,he=new Set,be=new Set,ce=null,pe=null,Je=!1,Y=new Map,Z=new Map,ee=new Map,H=!1,d={value:0},p=null,V=null,de=!1,Se=!1,Xt=null,w=null,$t=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},M=(t)=>{r.parent.postMessage(t,"*")},qt=()=>{if(H||r.parent===r||Q.size===0||p?.features?.lateGenerateResults!==!0)return;M({channel:g,v:_,type:"generate-late-listen"})},y=(t,o)=>{for(let u of t)try{u(o)}catch(i){console.error(i)}},Kt=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let o=Gt(t.data);if(!o)return;if(o.type==="workspace"){let i=Z.get(o.payload.subscriptionId);if(i)y([i],o.payload.snapshot);return}if(o.type==="shells"){let i=ee.get(o.payload.subscriptionId);if(i)y([i],o.payload.snapshot);return}if(o.type==="microphone-audio"){w?.queue.push(o.payload.samples);return}if(o.type==="microphone-ended"){let i=w;if(!i)return;w=null,i.release(),y(i.endedListeners,o.payload.reason);return}if(o.type==="ready"){if(p=o.payload,ye=null,je=!1,V=$t(o.payload.session),y(c,o.payload),y(E,o.payload.directory),y(m,o.payload.session),V)y(T,V);if(y(O,o.payload.connection),y(D,o.payload.settings),y(ae,o.payload.item),o.payload.block)y(_e,o.payload.block);qt(),jt();return}if(o.type==="service-event"){y(Te,o.payload);return}if(o.type==="generate-late"){if(Q.size===0)ze.push(o.payload);else y(Q,o.payload);return}if(o.type==="directory"){if(p)p={...p,directory:o.payload.directory};y(E,o.payload.directory);return}if(o.type==="session"){if(p)p={...p,session:o.payload.session};if(!o.payload.session)V=null;else if(V?.sessionId!==o.payload.session.id)V=$t(o.payload.session);y(m,o.payload.session);return}if(o.type==="session-lifecycle"){V=o.payload,y(T,o.payload);return}if(o.type==="connection"){if(p)p={...p,connection:o.payload.connection};y(O,o.payload.connection);return}if(o.type==="settings"){if(p)p={...p,settings:o.payload.settings};y(D,o.payload.settings);return}if(o.type==="item"){if(p)p={...p,item:o.payload.item};y(ae,o.payload.item);return}if(o.type==="status-control-event"){y(me,o.payload);return}if(o.type==="popover-closed"){y(fe,o.payload);return}if(o.type==="usage"){let i=ct(o.payload.snapshot);if(!i)return;ye=i,y(Re,i);return}if(o.type==="action"){let i=(R)=>{if(!H)M({channel:g,v:_,type:"action-result",id:o.id,payload:R})},f=le;if(!f){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>f(o.payload)).then(()=>i({ok:!0}),(R)=>{let A=(R instanceof Error?R.message:String(R)).trim();i({ok:!1,error:(A||"Action failed.").slice(0,Ee)})});return}if(o.type==="file-open"){let i=o.payload;if(pe&&fo(pe,i))return;pe=i,y(he,o.payload);return}if(o.type==="file-saved"){y(be,o.payload.version);return}if(o.type==="file-snapshot"){let i=(A)=>{if(!H)M({channel:g,v:_,type:"file-snapshot-result",id:o.id,payload:A})},f=(A)=>i({error:(A.trim()||"Could not read the edited file.").slice(0,Ee)}),R=ce;if(!R){f("This extension does not edit files.");return}Promise.resolve().then(()=>R(o.payload.purpose)).then((A)=>{if(pt(A)>ke){f(`The file is over ${ke} ${"bytes"in A?"bytes":"characters"}.`);return}if(A.version.length>Ie){f(`The snapshot version is over ${Ie} characters.`);return}i({snapshot:"bytes"in A?{bytes:A.bytes,version:A.version}:{content:A.content,version:A.version}})},(A)=>f(A instanceof Error?A.message:String(A)));return}if(o.type==="resolve"){let i=(R)=>{M({channel:g,v:_,type:"resolve-result",id:o.id,payload:R})},f=ue;if(!f){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>f(o.payload)).then((R)=>i({item:R?re(R):null}),(R)=>{let A=(R instanceof Error?R.message:String(R)).trim();i({error:(A||"Command failed.").slice(0,Ee)})});return}let u=Y.get(o.id);if(!u)return;if(clearTimeout(u.timer),Y.delete(o.id),o.ok){u.resolve(o.payload);return}u.reject(new l(o.code,o.error))};r.addEventListener("message",Kt),M({channel:g,v:_,type:"hello"});let k=(t,o=a)=>{if(H||r.parent===r)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((u,i)=>{let f=setTimeout(()=>{Y.delete(t.id),i(new l("HOST_TIMEOUT","Host did not answer in time."))},o);Y.set(t.id,{resolve:u,reject:i,timer:f}),M(t)})},b=(t)=>k(t).then(()=>{return}),h={channel:g,v:_},jt=()=>{if(je||Re.size===0||p?.features?.usage!==!0)return;je=!0,b({...h,type:"usage-subscribe",id:S(d)}).catch(()=>{return})},zt=()=>p?.features?.usage!==!0?Promise.reject(new l("UNSUPPORTED","This host does not support the usage feed.")):null,Qe=(t)=>{if(!H&&r.parent!==r)M(t)},Jt=()=>Qe({...h,type:"file-save"}),Ye=()=>{if(!H&&r.parent!==r)M({...h,type:"microphone-close",id:S(d)})},Zo=async()=>{if(w)throw new l("HOST_REJECTED","The microphone is already open in this frame.");if(p?.features?.microphone!==!0)throw new l("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let t=globalThis.AudioContext;if(typeof t!=="function")throw new l("UNSUPPORTED","This frame has no Web Audio.");let o=new t;if(o.sampleRate<nt||o.sampleRate>it)throw o.close().catch(()=>{return}),new l("UNSUPPORTED",`Audio at ${o.sampleRate} Hz is not supported.`);let u=o.state==="suspended"?o.resume().catch(()=>{return}):void 0,i=so(Math.round(o.sampleRate/4)),f=o.createScriptProcessor(1024,1,1);f.onaudioprocess=(L)=>i.pull(L.outputBuffer.getChannelData(0));let R=o.createMediaStreamDestination();f.connect(R);let A=new Set,te={queue:i,endedListeners:A,release:()=>{f.onaudioprocess=null,f.disconnect(),i.clear();for(let L of R.stream.getTracks())L.stop();o.close().catch(()=>{return})}};w=te;try{let L=await k({...h,type:"microphone-open",id:S(d),payload:{sampleRate:o.sampleRate}},at);if(!L||!("opened"in L)||L.opened!==!0)throw new l("HOST_REJECTED","Host did not open the microphone.");if(await u,w!==te)throw new l("DISCONNECTED","The microphone closed while it was opening.")}catch(L){if(w===te)w=null;throw te.release(),Ye(),L}return{stream:R.stream,close:()=>{if(w!==te)return;w=null,te.release(),Ye()},onEnded:(L)=>(A.add(L),()=>{A.delete(L)})}},Qt=(t)=>{if(!Vo(t)||!mr(t))return;t.preventDefault(),Jt()},Yt=(t)=>{if(!Vo(t)||t.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;t.preventDefault(),oo(p.popover.id,"escape").catch(()=>{return})},Ae=()=>{let t=p?.surface==="popover"?p.popover:void 0;if(!t)return;let o=de||Se;if(Xt===o)return;Xt=o,ro(t.id,o).catch(()=>{return})},ve=()=>{if(p?.surface!=="popover"||de)return;de=!0,Ae()},Zt=(t)=>{if(p?.surface!=="popover"||t.relatedTarget!==null||!de)return;de=!1,Ae()},eo=()=>{if(p?.surface!=="popover"||Se)return;Se=!0,Ae()},to=()=>{if(p?.surface!=="popover"||!Se)return;Se=!1,Ae()},F=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new l("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},Ze=async(t)=>{if(t.kind!=="projects")F(t.projectId);let o=await k({...h,type:"workspace-read",id:S(d),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return o},et=async(t,o)=>{if(t.kind!=="projects")F(t.projectId);let u=S(d);Z.set(u,o);try{await b({...h,type:"workspace-subscribe",id:S(d),payload:{subscriptionId:u,query:t}})}catch(i){if(Z.delete(u),!H)M({...h,type:"workspace-unsubscribe",id:S(d),payload:{subscriptionId:u}});throw i}return()=>{if(!Z.delete(u)||H)return;M({...h,type:"workspace-unsubscribe",id:S(d),payload:{subscriptionId:u}})}},er=async(t,o)=>{if(t.kind==="session")F(t.sessionId);if(t.kind==="project")F(t.projectId);let u=S(d);ee.set(u,o);try{await b({...h,type:"shells-subscribe",id:S(d),payload:{subscriptionId:u,scope:t}})}catch(i){if(ee.delete(u),!H)M({...h,type:"shells-unsubscribe",id:S(d),payload:{subscriptionId:u}});throw i}return()=>{if(!ee.delete(u)||H)return;M({...h,type:"shells-unsubscribe",id:S(d),payload:{subscriptionId:u}})}},Oe=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>rt))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!oe(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>st)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&p?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let o=await k({...h,type:"storage",id:S(d),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return o},oo=(t,o)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):b({...h,type:"popover-close",id:S(d),payload:o?{id:t,reason:o}:{id:t}}),ro=(t,o)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):b({...h,type:"popover-anchor",id:S(d),payload:{id:t,active:o}});return r.addEventListener("keydown",Yt,!0),r.addEventListener("pointerover",ve),r.addEventListener("pointermove",ve),r.addEventListener("pointerout",Zt),r.addEventListener("focus",eo),r.addEventListener("blur",to),{onAction:(t)=>(le=t,()=>{if(le===t)le=null}),listProjects:async()=>{let t=await Ze({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await Ze({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await Ze({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>et({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>et({kind:"worktrees",projectId:t},(u)=>{if(u.kind==="worktrees")o(u)}),onSessions:(t,o)=>et({kind:"sessions",projectId:t},(u)=>{if(u.kind==="sessions")o(u)}),onRunningShells:(t,o)=>er(t,o),readShellOutput:async(t,o)=>{F(t,xe);let u=o?.cursor;if(u!==void 0&&(!Number.isInteger(u)||u<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=o?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>Ce))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ce}.`);let R=await k({...h,type:"shell-output",id:S(d),payload:{shellId:t,cursor:u,tailBytes:i}});if(!R||typeof R.output!=="string"||!Number.isFinite(R.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return R},stopShell:async(t)=>{if(F(t,xe),(await k({...h,type:"shell-stop",id:S(d),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{F(t),await b({...h,type:"open-session",id:S(d),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let u=Fe(o),i={op:"get",key:t};if(u)i.scope=u;let f=await Oe(i);return f.op==="get"&&f.found?f.value:void 0},set:async(t,o,u)=>{let i=Fe(u),f={op:"set",key:t,value:o};if(i)f.scope=i;await Oe(f)},delete:async(t,o)=>{let u=Fe(o),i={op:"delete",key:t};if(u)i.scope=u;await Oe(i)},keys:async(t)=>{let o=Fe(t),u={op:"keys"};if(o)u.scope=o;let i=await Oe(u);if(i.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(c.add(t),p)t(p);return()=>{c.delete(t)}},onDirectory:(t)=>{if(E.add(t),p)t(p.directory);return()=>{E.delete(t)}},onSession:(t)=>{if(m.add(t),p)t(p.session);return()=>{m.delete(t)}},onSessionLifecycle:(t)=>{if(T.add(t),V)t(V);return()=>{T.delete(t)}},onConnection:(t)=>{if(O.add(t),p)t(p.connection);return()=>{O.delete(t)}},onSettings:(t)=>{if(D.add(t),p)t(p.settings);return()=>{D.delete(t)}},onItem:(t)=>{if(ae.add(t),p)t(p.item);return()=>{ae.delete(t)}},onBlock:(t)=>{if(_e.add(t),p?.block)t(p.block);return()=>{_e.delete(t)}},onServiceEvent:(t)=>(Te.add(t),()=>{Te.delete(t)}),onStatusControl:(t)=>(me.add(t),()=>{me.delete(t)}),onPopoverClosed:(t)=>(fe.add(t),()=>{fe.delete(t)}),onUsage:(t)=>{if(Re.add(t),ye)t(ye);return jt(),()=>{Re.delete(t)}},refreshUsage:()=>zt()??b({...h,type:"usage-refresh",id:S(d)}),openUsageSettings:()=>zt()??b({...h,type:"open-usage-settings",id:S(d)}),setStatusControls:(t)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!lo(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return b({...h,type:"status-controls",id:S(d),payload:{controls:t}})},openPopover:(t)=>{if(p?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!St(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return b({...h,type:"popover-open",id:S(d),payload:t})},closePopover:oo,setPopoverAnchorActive:ro,onResolve:(t)=>(ue=t,()=>{if(ue===t)ue=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>Pe)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${Pe} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ge))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${Ge} characters.`));return b({channel:g,v:_,type:"toast",id:S(d),payload:{...t,message:o}})},openUrl:(t)=>b({channel:g,v:_,type:"open-url",id:S(d),payload:{url:t}}),openCommit:(t)=>mt(t)?b({channel:g,v:_,type:"open-commit",id:S(d),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(t)=>b({channel:g,v:_,type:"block-answer",id:S(d),payload:{text:t.trim().slice(0,gt)}}),openSurface:(t)=>b({channel:g,v:_,type:"open-surface",id:S(d),payload:{surfaceId:t}}),writeClipboard:(t)=>b({channel:g,v:_,type:"clipboard-write",id:S(d),payload:{text:t}}),compose:(t)=>b({channel:g,v:_,type:"compose",id:S(d),payload:t}),attach:(t)=>b({channel:g,v:_,type:"attach",id:S(d),payload:re(t)}),startSession:async(t)=>{if(t.projectId!==void 0)F(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")F(o.directory);else{if(o.name!==void 0)F(o.name,200);if(o.baseBranch!==void 0)F(o.baseBranch,200)}let u=await k({channel:g,v:_,type:"start-session",id:S(d),payload:ht(t)},e.requestTimeoutMs??180000);if(!_t(u))throw new l("HOST_REJECTED","Host did not return a session.");return u},prompt:(t)=>k({channel:g,v:_,type:"prompt",id:S(d),payload:bt(t)}).then((o)=>{if(!Tt(o))throw new l("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>b({channel:g,v:_,type:"session-link",id:S(d),payload:re(t)}),close:()=>b({channel:g,v:_,type:"close",id:S(d)}),oauthStart:()=>b({channel:g,v:_,type:"oauth-start",id:S(d)}),oauthDisconnect:()=>b({channel:g,v:_,type:"oauth-disconnect",id:S(d)}),request:(t)=>(Le(t.path)?k({channel:g,v:_,type:"request",id:S(d),payload:t}):Wo()).then((o)=>{if(!De(o))throw new l("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Le(t.path)?k({channel:g,v:_,type:"service-request",id:S(d),payload:t}):Wo()).then((o)=>{if(!De(o))throw new l("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>k({channel:g,v:_,type:"service-status",id:S(d)}).then((t)=>{if(!Ot(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(se(t)?k({channel:g,v:_,type:"file-read",id:S(d),payload:{path:t}}):He()).then((o)=>{if(!xt(o))throw new l("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!se(t))return He();if(o.length>Ue)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Ue} characters.`));return k({channel:g,v:_,type:"file-write",id:S(d),payload:{path:t,content:o}}).then((u)=>{if(!Ct(u))throw new l("HOST_REJECTED","Host did not confirm the write.");return u})},listDir:(t)=>(se(t)?k({channel:g,v:_,type:"file-list",id:S(d),payload:{path:t}}):He()).then((o)=>{if(!kt(o))throw new l("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(se(t)?k({channel:g,v:_,type:"file-stat",id:S(d),payload:{path:t}}):He()).then((o)=>{if(!It(o))throw new l("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),u=t.system?.trim();if(o.length===0||o.length>we)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${we} characters.`));if(u!==void 0&&(u.length===0||u.length>Ne))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${Ne} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(Rt,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let f={prompt:o};if(u!==void 0)f.system=u;if(i!==void 0)f.maxOutputTokens=i;return k({channel:g,v:_,type:"generate",id:S(d),payload:f},e.requestTimeoutMs??yt).then((R)=>{if(!Pt(R))throw new l("HOST_REJECTED","Host did not return generated text.");return R})},onLateGenerateResult:(t)=>{Q.add(t);for(let o of ze.splice(0))y([t],o);return qt(),()=>{Q.delete(t)}},openMicrophone:Zo,setBadge:(t)=>b({channel:g,v:_,type:"badge",id:S(d),payload:{count:At(t)}}),setHeight:(t)=>b({channel:g,v:_,type:"resize",id:S(d),payload:{height:vt(t)}}),onFileOpen:(t)=>{if(he.add(t),!Je)Je=!0,r.addEventListener("keydown",Qt,!0);if(pe)t(pe);return()=>{he.delete(t)}},onFileSnapshot:(t)=>(ce=t,()=>{if(ce===t)ce=null}),onFileSaved:(t)=>(be.add(t),()=>{be.delete(t)}),reportFileChange:(t)=>Qe({...h,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Jt,reportFileUnsupported:()=>Qe({...h,type:"file-unsupported"}),dispose:()=>{for(let t of Z.keys())M({...h,type:"workspace-unsubscribe",id:S(d),payload:{subscriptionId:t}});Z.clear();for(let t of ee.keys())M({...h,type:"shells-unsubscribe",id:S(d),payload:{subscriptionId:t}});if(ee.clear(),w)Ye(),w.release(),w=null;if(H=!0,ue=null,le=null,ce=null,he.clear(),be.clear(),Je)r.removeEventListener("keydown",Qt,!0);r.removeEventListener("message",Kt),r.removeEventListener("keydown",Yt,!0),r.removeEventListener("pointerover",ve),r.removeEventListener("pointermove",ve),r.removeEventListener("pointerout",Zt),r.removeEventListener("focus",eo),r.removeEventListener("blur",to);for(let t of Y.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));Y.clear(),c.clear(),E.clear(),m.clear(),T.clear(),O.clear(),D.clear(),ae.clear(),_e.clear(),Te.clear(),me.clear(),fe.clear(),Q.clear(),ze.length=0}}};var Xo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var us=new Set(Xo);var $o=["none","agent","user"];var cs=new Set($o);var fr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Rr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],qo=(e,r)=>{r.style.colorScheme=e.mode;for(let[s,a]of fr)r.style.setProperty(s,e.tokens[a]);for(let[s,a,c]of Rr){let E=e.tokens[c]??"";r.style.setProperty(s,E),r.style.setProperty(a,E)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},Ut=(e,r)=>{if(qo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var yr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},v=(e,r)=>`var(--${e}, var(--oc-${yr[e]}, ${r}))`,X=v("surface-background","transparent"),Ve=v("surface-elevated","transparent"),ne=v("surface-elevated-foreground","inherit"),N=v("surface-foreground","inherit"),x=v("surface-muted-foreground","gray"),hr=v("surface-muted","transparent"),j=v("interactive-border","currentColor"),U=v("interactive-hover","transparent"),z=v("interactive-active","transparent"),wt=v("interactive-selection","transparent"),Nt=v("interactive-selection-foreground","inherit"),W=v("primary","currentColor"),Lt=v("primary-text","inherit"),Dt=v("error-text","inherit"),br=v("font-sans","inherit"),Ht=v("font-mono","monospace"),Jo=v("radius","9px"),Ft=`calc(${Jo} - 2px)`,Ko=`calc(${Jo} - 4px)`,C=(e,r,s="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${s})`,jo=`background-image: linear-gradient(${U}, ${U});`,Bt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,Vt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",zo="box-shadow: var(--oc-sdk-lit);",Wt=`inset 0 0.5px 0 0 ${C(N,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Ar=`
:root {
  --oc-sdk-edge: ${C(N,16)};
  --oc-sdk-field-bg: ${Ve};
  --oc-sdk-raised-bg: ${X};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${C(N,14)};
  --oc-sdk-field-bg: ${C(X,50,Ve)};
  --oc-sdk-raised-bg: ${Ve};
  --oc-sdk-field-lift: ${Wt};
  --oc-sdk-raised-lift: ${Wt};
  --oc-sdk-lit: ${Wt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Be=(e)=>{let r=v(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${v(`${e}-text`,"inherit")}; }`},n=(e)=>`calc(${e}rem / 14)`,vr=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: ${n(8)}; height: ${n(32)}; padding: 0 ${n(12)}; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: ${n(6)}; height: ${n(28)}; padding: 0 ${n(10)}; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: ${n(4)}; height: ${n(24)}; padding: 0 ${n(8)}; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: ${n(14)}; height: ${n(14)}; }

.oc-sdk-field { display: flex; flex-direction: column; gap: ${n(4)}; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: ${n(32)}; padding: 0 ${n(10)}; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: ${n(8)} ${n(10)}; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: ${n(34)}; padding-right: ${n(34)}; }
.oc-sdk-search-icon { position: absolute; left: ${n(11)}; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: ${n(6)}; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: ${n(24)}; height: ${n(24)}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: ${n(4)}; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: ${n(6)}; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: ${n(28)}; padding: 0 ${n(10)}; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: ${n(2)}; min-width: ${n(160)}; max-width: calc(100vw - ${n(16)}); max-height: min(${n(320)}, calc(100vh - ${n(16)})); overflow: auto; padding: ${n(4)}; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: ${n(2)} ${n(2)} ${n(4)}; }
.oc-sdk-popup-search .oc-sdk-input { height: ${n(28)}; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: ${n(8)}; width: 100%; padding: ${n(6)} ${n(8)}; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: ${n(14)}; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: ${n(8)}; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: ${n(8)}; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: ${n(14)}; height: ${n(14)}; margin-top: ${n(3)}; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: ${n(36)}; height: ${n(20)}; --oc-sdk-thumb-travel: ${n(16)}; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: ${n(2)}; left: ${n(2)}; width: ${n(16)}; height: ${n(16)}; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: ${n(2)}; padding: ${n(2)}; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: ${n(6)}; height: ${n(28)}; padding: 0 ${n(10)}; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: ${n(1)} ${n(6)}; font-size: ${n(11)}; font-weight: 500; line-height: ${n(16)}; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: ${n(8)}; width: 100%; padding: ${n(6)} ${n(8)}; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: ${n(64)}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: ${n(16)} ${n(8)}; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: ${n(4)}; padding: ${n(40)} ${n(16)}; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: ${n(12)}; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: ${n(8)}; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: ${n(16)}; height: ${n(16)}; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: ${n(12)}; height: ${n(12)}; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: ${n(12)}; padding: ${n(8)} ${n(12)}; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: ${n(2)}; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: ${n(8)}; width: 100%; margin: ${n(8)} 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: ${n(4)} 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: ${n(4)}; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: ${n(6)}; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: ${n(2)}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: ${n(8)} 0; }

/* Under a finger the controls reach the app's touch sizes: rows and options 44px like its sheets, every other
   control at least 36px. Inputs keep 16px text, below which iOS zooms the page on focus. */
@media (pointer: coarse) {
  .oc-sdk-btn, .oc-sdk-input { height: ${n(40)}; }
  .oc-sdk-btn[data-size="sm"], .oc-sdk-btn[data-size="xs"], .oc-sdk-trigger, .oc-sdk-tab, .oc-sdk-popup-search .oc-sdk-input { height: ${n(36)}; }
  .oc-sdk-input, .oc-sdk-popup-search .oc-sdk-input { font-size: max(16px, 0.875rem); }
  .oc-sdk-search-clear { width: ${n(36)}; height: ${n(36)}; right: 0; }
  .oc-sdk-row, .oc-sdk-option { min-height: ${n(44)}; }
  .oc-sdk-check { min-height: ${n(36)}; padding: ${n(8)} 0; }
}
`,Qo=`${Ar}
.oc-sdk { color: ${N}; font-family: ${br}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${jo} }
.oc-sdk-mono { font-family: ${Ht}; }
.oc-sdk-muted { color: ${x}; }
${Be("success")}${Be("warning")}${Be("error")}${Be("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${W}; --oc-sdk-tone-text: ${Lt}; }

.oc-sdk-btn { border-radius: ${Ft}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Ko}; }
.oc-sdk-btn[data-variant="default"] { color: ${Lt}; background: ${C(W,10,X)}; border-color: ${C(W,12)}; ${zo} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${C(W,16,X)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${C(W,22,X)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${hr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${z}, ${z}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${ne}; ${Vt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${z}, ${z}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${U}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${z}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${v("status-error","red")}; color: ${Dt}; background: ${C("var(--oc-sdk-tone)",7,X)}; border-color: ${C("var(--oc-sdk-tone)",12)}; ${zo} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${C("var(--oc-sdk-tone)",9,X)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${C("var(--oc-sdk-tone)",11,X)}; box-shadow: none; }

.oc-sdk-field-note { color: ${x}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Dt}; }
.oc-sdk-input { border-radius: ${Ft}; background: var(--oc-sdk-field-bg); color: ${ne}; ${Bt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${x}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Bt(C(N,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Bt(v("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Ht}; }

.oc-sdk-search-icon { color: ${x}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${W}; }
.oc-sdk-search-clear { border-radius: ${Ko}; color: ${x}; }
.oc-sdk-search-clear:hover { background: ${U}; color: ${N}; }

.oc-sdk-trigger { border-radius: ${Ft}; background: var(--oc-sdk-raised-bg); color: ${ne}; ${Vt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${z}, ${z}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${x}; }
.oc-sdk-trigger-chevron { color: ${x}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${ne}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ve}; background-clip: padding-box; color: ${ne}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${U}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${wt}; color: ${Nt}; }
.oc-sdk-option-check { color: ${N}; }
.oc-sdk-option[data-destructive="true"] { color: ${Dt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${C(v("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${x}; }
.oc-sdk-popup-empty { color: ${x}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${j}; border-radius: 4px; color: ${N}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${C(N,60,j)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${j}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${X}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${W}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${jo} }
.oc-sdk-check-desc { color: ${x}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${C(N,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${x}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${N}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Nt}; background: ${wt}; border-color: ${j}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${ne}; background: var(--oc-sdk-raised-bg); ${Vt} }
.oc-sdk-tab-count { color: ${x}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${C(N,6)}; color: ${x}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${C("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${U}; }
.oc-sdk-row[aria-selected="true"] { background: ${wt}; color: ${Nt}; }
.oc-sdk-row-lead { font-family: ${Ht}; color: ${x}; }
.oc-sdk-row-sub { color: ${x}; }
.oc-sdk-row-meta { color: ${x}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${x}; }

.oc-sdk-empty-body { color: ${x}; }

.oc-sdk-spinner { color: ${x}; }
.oc-sdk-spinner-ring { border-color: ${j}; border-top-color: ${W}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${C("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${x}; }

.oc-sdk-separator { color: ${x}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${C(j,40)}; }

.oc-sdk-progress-label { color: ${x}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${C(N,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${W}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${v("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${v("success-text","inherit")}; }

.oc-sdk-text a { color: ${Lt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${C(j,60)}; }
`,I=`
${tt}
${vr}
${Qo}`;var Yo="oc-sdk-ui-style";var P=(e)=>{let r=document.getElementById(Yo);if(r instanceof HTMLStyleElement){if(r.textContent!==e)r.textContent=e;return}ot(document);let s=document.createElement("style");s.id=Yo,s.textContent=e,document.head.appendChild(s)},G=(e,r)=>{let s=document.createElement(e);if(r)s.className=r;return s},q=(e)=>{let r=G("button",e);return r.type="button",r},B=(e,r)=>{let s=r??"";if(e.textContent!==s)e.textContent=s};var Or=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},ie=(e,r)=>{P(I);let s=r,a=q("oc-sdk oc-sdk-btn"),c=Or(),E=document.createElement("span");a.append(E),e.append(a);let m=()=>{if(a.dataset.variant=s.variant??"default",a.dataset.size=s.size??"default",a.disabled=Boolean(s.disabled)||Boolean(s.loading),a.dataset.loading=s.loading?"true":"false",a.setAttribute("aria-busy",s.loading?"true":"false"),s.loading&&c.parentNode!==a)a.prepend(c);else if(!s.loading&&c.parentNode===a)c.remove();B(E,s.label)},T=()=>{if(s.disabled||s.loading)return;s.onClick()};return a.addEventListener("click",T),m(),{update:(O)=>{s={...s,...O},m()},dispose:()=>{a.removeEventListener("click",T),a.remove()}}};var Ke=Mt(),J=document.querySelector("#root");if(!J)throw Error("DeskChart: missing root");J.style.padding="12px";Ke.onReady((e)=>Ut(e,document.documentElement));Ke.onBlock(({args:e,answered:r})=>{let s=(e.values??"").split(",").map(Number).filter(Number.isFinite),a=Math.max(1,...s);J.replaceChildren();let c=document.createElement("div");c.textContent=e.title??"",c.style.font="600 13px var(--oc-font, system-ui)";let E=document.createElement("div");E.style.cssText="display:flex;align-items:flex-end;gap:6px;height:96px;margin-top:8px";for(let T of s){let O=document.createElement("div");O.style.cssText=`flex:1;height:${T/a*100}%;background:currentColor;opacity:.6;border-radius:3px 3px 0 0`,O.title=String(T),E.append(O)}J.append(c,E);let m=document.createElement("div");m.style.marginTop="10px",J.append(m),ie(m,{label:r??"Explain this",variant:"outline",size:"sm",disabled:r!==null,onClick:()=>{Ke.answerBlock("Explain this chart")}})});new ResizeObserver(()=>{Ke.setHeight(Math.ceil(J.getBoundingClientRect().height))}).observe(J);})();
