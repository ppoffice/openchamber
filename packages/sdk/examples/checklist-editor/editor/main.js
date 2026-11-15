(()=>{var T="openchamber.sdk",m=1;var it=`
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
`;function at(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(i)=>{let a=i.target===e?o:i.target;if(!(a instanceof Element))return;if(!a.hasAttribute("data-oc-scrolling"))a.setAttribute("data-oc-scrolling","");let d=s.get(a);if(d!==void 0)clearTimeout(d);s.set(a,setTimeout(()=>{s.delete(a),a.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Er=`(${at.toString()})(document);`;var lt=128,ut=65536;var Ie=128;var Pe=65536;var ct=8000,pt=192000,dt=120000;var Eo=(e)=>{let o=[],s=0,i=0;return{push:(a)=>{o.push(a),i+=a.length;while(i-s>e&&o.length>1){let d=o.shift();i-=d?.length??0,s=0}},pull:(a)=>{let d=0;while(d<a.length&&o.length>0){let _=o[0],g=Math.min(a.length-d,_.length-s);if(a.set(_.subarray(s,s+g),d),d+=g,s+=g,s>=_.length)o.shift(),i-=_.length,s=0}a.fill(0,d)},clear:()=>{o.length=0,s=0,i=0},get size(){return i-s}}};var mo=/^[a-z][a-z0-9-]{0,39}$/;var go=(e)=>Object(e)===e&&!Array.isArray(e),St=(e,o)=>Object.keys(e).every((s)=>o.includes(s)),_o=(e)=>String(e)===e&&e.length>=1&&e.length<=60,To=(e)=>String(e)===e&&e.length>=1&&e.length<=80,fo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let s of e){if(!go(s)||!mo.test(s.id)||!_o(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(o.has(s.id))return!1;if(o.add(s.id),s.kind==="button"){if(!St(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!St(s,["kind","id","label","value","options","disabled"]))return!1;if(!To(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let i=new Set;for(let a of s.options){if(!go(a)||!St(a,["value","label"])||!To(a.value)||!_o(a.label)||i.has(a.value))return!1;i.add(a.value)}if(!i.has(s.value))return!1}return!0};var yo=["usage","remaining"],Ro=["default","warning","error"],gr=/^data:image\/(?:svg\+xml|png)(?:;[^,]*)?,/,bo=(e)=>String(e)===e&&e.length>0&&e.length<=65536&&!e.includes("\x00")&&gr.test(e),_r=new Set(Ro),Tr=new Set(yo),z=(e,o,s=1)=>{let i=String(e);if(i!==e)return!1;return i.length>=s&&i.length<=o&&!i.includes("\x00")},Et=(e,o)=>e===null||z(e,o,0),ho=(e)=>{if(e===null)return!0;let o=Number(e);return o===e&&Number.isFinite(o)&&o>=0&&o<=100},vo=(e)=>{if(e===null)return!0;let o=Number(e);return o===e&&Number.isSafeInteger(o)&&o>=0},mr=(e)=>{let o=String(e);return o===e&&_r.has(o)},fr=(e)=>{let o=String(e);return o===e&&Tr.has(o)},Ao=(e)=>{if(!Array.isArray(e)||e.length>32)return null;let o=[];for(let s of e){if(Object(s)!==s||s===null)return null;let i=hr(s);if(!i)return null;o.push(i)}return o},hr=(e)=>{let{key:o,label:s,usedPercent:i,remainingPercent:a,resetAt:d,resetLabel:_,valueLabel:g,tone:y}=e;if(!z(o,80)||!z(s,120))return null;if(!ho(i)||!ho(a)||!vo(d))return null;if(!Et(_,120)||!Et(g,120))return null;if(!mr(y))return null;return{key:o,label:s,usedPercent:i,remainingPercent:a,resetAt:d,resetLabel:_,valueLabel:g,tone:y}},yr=(e)=>{if(!Array.isArray(e)||e.length>64)return null;let o=[];for(let s of e){if(Object(s)!==s||s===null)return null;let i=Rr(s);if(!i)return null;o.push(i)}return o},Rr=(e)=>{if(!z(e.key,80)||!z(e.name,120))return null;let o=Ao(e.windows);if(!o)return null;return{key:e.key,name:e.name,windows:o}},br=(e)=>{let{id:o,name:s,icon:i,ok:a,configured:d,status:_,shown:g}=e;if(!z(o,80)||!z(s,120))return null;if(!(i===null||String(i)===i&&bo(String(i))))return null;if(a!==!0&&a!==!1)return null;if(d!==!0&&d!==!1)return null;if(g!==!0&&g!==!1)return null;if(!Et(_,500))return null;let y=Ao(e.windows);if(!y)return null;let G=yr(e.models);if(!G)return null;return{id:o,name:s,icon:i,ok:a,configured:d,status:_,shown:g,windows:y,models:G}},gt=(e)=>{if(Object(e)!==e||e===null||e===void 0)return null;let o=e,{displayMode:s,updatedAt:i,loading:a,providers:d}=o;if(!fr(s))return null;if(!vo(i)||a!==!0&&a!==!1)return null;if(!Array.isArray(d)||d.length>64)return null;let _=[];for(let g of d){if(Object(g)!==g||g===null)return null;let y=br(g);if(!y)return null;_.push(y)}return{displayMode:s,updatedAt:i,loading:a,providers:_}};var Oo=["{id}","{segment}","{segments+}"];var os=new Set(Oo);var xo=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var ss=new Set(xo);var Ge=20000000,Me=256;var _t=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Co=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==o.bytes[s])return!1;return!0},Ue=(e)=>{let o=e,s=e;return{observe:(i)=>{let a=i!==s;return s=i,{edited:a,dirty:i!==o}},markSaved:(i)=>(o=i,s!==i)}};var ko=/^[A-Za-z0-9_-]{1,80}$/;var Io=["left","right","top","bottom"];var Po=(e,o=0,s={remaining:16000})=>{if(--s.remaining<0||o>=32)return!1;if(e===null)return!0;let i=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let a of i)if(!Po(a,o+1,s))return!1;return!0},Tt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(Tt);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(Tt)}return String(e)===e||Number.isFinite(e)},mt=(e)=>{try{if(String(e.id)!==e.id||!ko.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Io.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Po(e.data)||!Tt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var ht=2000;var Mo=["file","directory","other","missing"],yt=(e)=>Boolean(e&&"sessionId"in e),Rt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Uo=/^[0-9a-f]{7,64}$/i,bt=(e)=>Uo.test(e),we=500,Ne=32000,wo=16000,No=128,Lo=200,Do=2000,Ho=16000,Fo=80,Bo=200,Vo=16000;var Wo=2000;var vt=20000,Le=1024,De=2000000;var He=64000,Fe=8000,At=4000;var Ot=960000;var Xo=999,$o=1e4,Te=500,qo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Ko=["stopped","starting","ready","failed"],Ar=new Set(qo),jo=(e)=>Ar.has(e),zo=(e)=>e&&jo(e)?e:"HOST_REJECTED",ne=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ne);if(Object(e)===e)return Object.values(e).every(ne);return!1},Jo=(e)=>ne(e)&&JSON.stringify(e).length<=Vo,Go=(e)=>e?.trim().slice(0,Bo)??"",ie=(e)=>{let o=e.id.trim().slice(0,No),s=e.title.trim().slice(0,Lo),i=e.url.trim().slice(0,Do),a=e.text?.trim().slice(0,Ho),d=e.author?.trim().slice(0,Fo),_=e.kind==="pull"?"pull":"issue",g={providerId:e.providerId.trim(),id:o,title:s||o,url:i,kind:_};if(a)g.text=a;if(d)g.author=d;if(_==="pull"){let y=Go(e.branches?.head),G=Go(e.branches?.base);if(y&&G)g.branches={head:y,base:G}}if(Jo(e.data))g.data=e.data;return g},xt=(e)=>{let o=ie(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},Ct=(e)=>{let o={text:e.text.trim().slice(0,wo)};if(e.send)o.send=!0;return o},kt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Xo,Math.max(0,Math.round(e)))},It=(e)=>{if(!Number.isFinite(e))return 0;return Math.min($o,Math.max(0,Math.ceil(e)))};var ae=(e)=>e.length>0&&e.length<=Le&&!e.includes("\x00")&&!e.includes("\\");var Be=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Wo)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},Or=new Set(Ko),Pt=(e)=>Boolean(e&&"status"in e&&Or.has(String(e.status))&&!("body"in e)),Ve=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Gt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Mt=(e)=>Boolean(e&&"written"in e&&e.written===!0),Ut=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),xr=new Set(Mo),wt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&xr.has(String(e.kind))&&Number.isFinite(e.size)),Nt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Cr=new Set(["workspace","shells","usage","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),kr=(e)=>Object(e)===e?e:null,ft=(e)=>String(e)===e&&e.length>0,Ir=(e)=>{if(!ft(e.id))return null;if(e.ok===!0){let o={channel:T,v:m,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&ft(e.error))return{channel:T,v:m,type:"result",id:e.id,ok:!1,error:e.error,code:zo(ft(e.code)?e.code:void 0)};return null},Lt=(e)=>{let o=kr(e);if(!o||o.channel!==T||o.v!==m)return null;if(o.type==="result")return Ir(o);if(!Cr.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Qo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Pr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class c extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Yo=()=>Promise.reject(new c("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),We=()=>Promise.reject(new c("BAD_PATH",`File path must be 1 to ${Le} characters without NUL or backslash.`)),Xe=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new c("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},E=(e)=>(e.value+=1,`oc-${e.value}`),Dt=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new c("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===o.parent),i=e.requestTimeoutMs??vt,a=new Set,d=new Set,_=new Set,g=new Set,y=new Set,G=new Set,ce=new Set,fe=new Set,he=new Set,ye=new Set,Re=new Set,be=new Set,ve=null,Ze=!1,ee=new Set,et=[],pe=null,de=null,Ae=new Set,Oe=new Set,Se=null,Ee=null,tt=!1,te=new Map,oe=new Map,re=new Map,F=!1,S={value:0},p=null,V=null,ge=!1,_e=!1,Zt=null,N=null,eo=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},U=(t)=>{o.parent.postMessage(t,"*")},to=()=>{if(F||o.parent===o||ee.size===0||p?.features?.lateGenerateResults!==!0)return;U({channel:T,v:m,type:"generate-late-listen"})},R=(t,r)=>{for(let u of t)try{u(r)}catch(l){console.error(l)}},oo=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let r=Lt(t.data);if(!r)return;if(r.type==="workspace"){let l=oe.get(r.payload.subscriptionId);if(l)R([l],r.payload.snapshot);return}if(r.type==="shells"){let l=re.get(r.payload.subscriptionId);if(l)R([l],r.payload.snapshot);return}if(r.type==="microphone-audio"){N?.queue.push(r.payload.samples);return}if(r.type==="microphone-ended"){let l=N;if(!l)return;N=null,l.release(),R(l.endedListeners,r.payload.reason);return}if(r.type==="ready"){if(p=r.payload,ve=null,Ze=!1,V=eo(r.payload.session),R(a,r.payload),R(d,r.payload.directory),R(_,r.payload.session),V)R(g,V);if(R(y,r.payload.connection),R(G,r.payload.settings),R(ce,r.payload.item),r.payload.block)R(fe,r.payload.block);to(),ro();return}if(r.type==="service-event"){R(he,r.payload);return}if(r.type==="generate-late"){if(ee.size===0)et.push(r.payload);else R(ee,r.payload);return}if(r.type==="directory"){if(p)p={...p,directory:r.payload.directory};R(d,r.payload.directory);return}if(r.type==="session"){if(p)p={...p,session:r.payload.session};if(!r.payload.session)V=null;else if(V?.sessionId!==r.payload.session.id)V=eo(r.payload.session);R(_,r.payload.session);return}if(r.type==="session-lifecycle"){V=r.payload,R(g,r.payload);return}if(r.type==="connection"){if(p)p={...p,connection:r.payload.connection};R(y,r.payload.connection);return}if(r.type==="settings"){if(p)p={...p,settings:r.payload.settings};R(G,r.payload.settings);return}if(r.type==="item"){if(p)p={...p,item:r.payload.item};R(ce,r.payload.item);return}if(r.type==="status-control-event"){R(ye,r.payload);return}if(r.type==="popover-closed"){R(Re,r.payload);return}if(r.type==="usage"){let l=gt(r.payload.snapshot);if(!l)return;ve=l,R(be,l);return}if(r.type==="action"){let l=(h)=>{if(!F)U({channel:T,v:m,type:"action-result",id:r.id,payload:h})},f=de;if(!f){l({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>f(r.payload)).then(()=>l({ok:!0}),(h)=>{let A=(h instanceof Error?h.message:String(h)).trim();l({ok:!1,error:(A||"Action failed.").slice(0,Te)})});return}if(r.type==="file-open"){let l=r.payload;if(Ee&&Co(Ee,l))return;Ee=l,R(Ae,r.payload);return}if(r.type==="file-saved"){R(Oe,r.payload.version);return}if(r.type==="file-snapshot"){let l=(A)=>{if(!F)U({channel:T,v:m,type:"file-snapshot-result",id:r.id,payload:A})},f=(A)=>l({error:(A.trim()||"Could not read the edited file.").slice(0,Te)}),h=Se;if(!h){f("This extension does not edit files.");return}Promise.resolve().then(()=>h(r.payload.purpose)).then((A)=>{if(_t(A)>Ge){f(`The file is over ${Ge} ${"bytes"in A?"bytes":"characters"}.`);return}if(A.version.length>Me){f(`The snapshot version is over ${Me} characters.`);return}l({snapshot:"bytes"in A?{bytes:A.bytes,version:A.version}:{content:A.content,version:A.version}})},(A)=>f(A instanceof Error?A.message:String(A)));return}if(r.type==="resolve"){let l=(h)=>{U({channel:T,v:m,type:"resolve-result",id:r.id,payload:h})},f=pe;if(!f){l({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>f(r.payload)).then((h)=>l({item:h?ie(h):null}),(h)=>{let A=(h instanceof Error?h.message:String(h)).trim();l({error:(A||"Command failed.").slice(0,Te)})});return}let u=te.get(r.id);if(!u)return;if(clearTimeout(u.timer),te.delete(r.id),r.ok){u.resolve(r.payload);return}u.reject(new c(r.code,r.error))};o.addEventListener("message",oo),U({channel:T,v:m,type:"hello"});let M=(t,r=i)=>{if(F||o.parent===o)return Promise.reject(new c("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((u,l)=>{let f=setTimeout(()=>{te.delete(t.id),l(new c("HOST_TIMEOUT","Host did not answer in time."))},r);te.set(t.id,{resolve:u,reject:l,timer:f}),U(t)})},v=(t)=>M(t).then(()=>{return}),b={channel:T,v:m},ro=()=>{if(Ze||be.size===0||p?.features?.usage!==!0)return;Ze=!0,v({...b,type:"usage-subscribe",id:E(S)}).catch(()=>{return})},so=()=>p?.features?.usage!==!0?Promise.reject(new c("UNSUPPORTED","This host does not support the usage feed.")):null,ot=(t)=>{if(!F&&o.parent!==o)U(t)},no=()=>ot({...b,type:"file-save"}),rt=()=>{if(!F&&o.parent!==o)U({...b,type:"microphone-close",id:E(S)})},dr=async()=>{if(N)throw new c("HOST_REJECTED","The microphone is already open in this frame.");if(p?.features?.microphone!==!0)throw new c("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let t=globalThis.AudioContext;if(typeof t!=="function")throw new c("UNSUPPORTED","This frame has no Web Audio.");let r=new t;if(r.sampleRate<ct||r.sampleRate>pt)throw r.close().catch(()=>{return}),new c("UNSUPPORTED",`Audio at ${r.sampleRate} Hz is not supported.`);let u=r.state==="suspended"?r.resume().catch(()=>{return}):void 0,l=Eo(Math.round(r.sampleRate/4)),f=r.createScriptProcessor(1024,1,1);f.onaudioprocess=(H)=>l.pull(H.outputBuffer.getChannelData(0));let h=r.createMediaStreamDestination();f.connect(h);let A=new Set,se={queue:l,endedListeners:A,release:()=>{f.onaudioprocess=null,f.disconnect(),l.clear();for(let H of h.stream.getTracks())H.stop();r.close().catch(()=>{return})}};N=se;try{let H=await M({...b,type:"microphone-open",id:E(S),payload:{sampleRate:r.sampleRate}},dt);if(!H||!("opened"in H)||H.opened!==!0)throw new c("HOST_REJECTED","Host did not open the microphone.");if(await u,N!==se)throw new c("DISCONNECTED","The microphone closed while it was opening.")}catch(H){if(N===se)N=null;throw se.release(),rt(),H}return{stream:h.stream,close:()=>{if(N!==se)return;N=null,se.release(),rt()},onEnded:(H)=>(A.add(H),()=>{A.delete(H)})}},io=(t)=>{if(!Qo(t)||!Pr(t))return;t.preventDefault(),no()},ao=(t)=>{if(!Qo(t)||t.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;t.preventDefault(),po(p.popover.id,"escape").catch(()=>{return})},xe=()=>{let t=p?.surface==="popover"?p.popover:void 0;if(!t)return;let r=ge||_e;if(Zt===r)return;Zt=r,So(t.id,r).catch(()=>{return})},Ce=()=>{if(p?.surface!=="popover"||ge)return;ge=!0,xe()},lo=(t)=>{if(p?.surface!=="popover"||t.relatedTarget!==null||!ge)return;ge=!1,xe()},uo=()=>{if(p?.surface!=="popover"||_e)return;_e=!0,xe()},co=()=>{if(p?.surface!=="popover"||!_e)return;_e=!1,xe()},B=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new c("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},st=async(t)=>{if(t.kind!=="projects")B(t.projectId);let r=await M({...b,type:"workspace-read",id:E(S),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new c("HOST_REJECTED","Host did not return workspace data.");return r},nt=async(t,r)=>{if(t.kind!=="projects")B(t.projectId);let u=E(S);oe.set(u,r);try{await v({...b,type:"workspace-subscribe",id:E(S),payload:{subscriptionId:u,query:t}})}catch(l){if(oe.delete(u),!F)U({...b,type:"workspace-unsubscribe",id:E(S),payload:{subscriptionId:u}});throw l}return()=>{if(!oe.delete(u)||F)return;U({...b,type:"workspace-unsubscribe",id:E(S),payload:{subscriptionId:u}})}},Sr=async(t,r)=>{if(t.kind==="session")B(t.sessionId);if(t.kind==="project")B(t.projectId);let u=E(S);re.set(u,r);try{await v({...b,type:"shells-subscribe",id:E(S),payload:{subscriptionId:u,scope:t}})}catch(l){if(re.delete(u),!F)U({...b,type:"shells-unsubscribe",id:E(S),payload:{subscriptionId:u}});throw l}return()=>{if(!re.delete(u)||F)return;U({...b,type:"shells-unsubscribe",id:E(S),payload:{subscriptionId:u}})}},ke=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>lt))throw new c("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ne(t.value))throw new c("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>ut)throw new c("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&p?.features?.deviceStorage!==!0)throw new c("UNSUPPORTED","This host does not support device storage.");let r=await M({...b,type:"storage",id:E(S),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new c("HOST_REJECTED","Host did not return storage data.");return r},po=(t,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):v({...b,type:"popover-close",id:E(S),payload:r?{id:t,reason:r}:{id:t}}),So=(t,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):v({...b,type:"popover-anchor",id:E(S),payload:{id:t,active:r}});return o.addEventListener("keydown",ao,!0),o.addEventListener("pointerover",Ce),o.addEventListener("pointermove",Ce),o.addEventListener("pointerout",lo),o.addEventListener("focus",uo),o.addEventListener("blur",co),{onAction:(t)=>(de=t,()=>{if(de===t)de=null}),listProjects:async()=>{let t=await st({kind:"projects"});if(t.kind!=="projects")throw new c("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await st({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new c("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await st({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new c("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>nt({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>nt({kind:"worktrees",projectId:t},(u)=>{if(u.kind==="worktrees")r(u)}),onSessions:(t,r)=>nt({kind:"sessions",projectId:t},(u)=>{if(u.kind==="sessions")r(u)}),onRunningShells:(t,r)=>Sr(t,r),readShellOutput:async(t,r)=>{B(t,Ie);let u=r?.cursor;if(u!==void 0&&(!Number.isInteger(u)||u<0))throw new c("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let l=r?.tailBytes;if(l!==void 0&&(!Number.isInteger(l)||l<1||l>Pe))throw new c("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Pe}.`);let h=await M({...b,type:"shell-output",id:E(S),payload:{shellId:t,cursor:u,tailBytes:l}});if(!h||typeof h.output!=="string"||!Number.isFinite(h.cursor))throw new c("HOST_REJECTED","Host did not return shell output.");return h},stopShell:async(t)=>{if(B(t,Ie),(await M({...b,type:"shell-stop",id:E(S),payload:{shellId:t}}))?.stopped!==!0)throw new c("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{B(t),await v({...b,type:"open-session",id:E(S),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let u=Xe(r),l={op:"get",key:t};if(u)l.scope=u;let f=await ke(l);return f.op==="get"&&f.found?f.value:void 0},set:async(t,r,u)=>{let l=Xe(u),f={op:"set",key:t,value:r};if(l)f.scope=l;await ke(f)},delete:async(t,r)=>{let u=Xe(r),l={op:"delete",key:t};if(u)l.scope=u;await ke(l)},keys:async(t)=>{let r=Xe(t),u={op:"keys"};if(r)u.scope=r;let l=await ke(u);if(l.op!=="keys")throw new c("HOST_REJECTED","Expected storage keys.");return l.keys}},onReady:(t)=>{if(a.add(t),p)t(p);return()=>{a.delete(t)}},onDirectory:(t)=>{if(d.add(t),p)t(p.directory);return()=>{d.delete(t)}},onSession:(t)=>{if(_.add(t),p)t(p.session);return()=>{_.delete(t)}},onSessionLifecycle:(t)=>{if(g.add(t),V)t(V);return()=>{g.delete(t)}},onConnection:(t)=>{if(y.add(t),p)t(p.connection);return()=>{y.delete(t)}},onSettings:(t)=>{if(G.add(t),p)t(p.settings);return()=>{G.delete(t)}},onItem:(t)=>{if(ce.add(t),p)t(p.item);return()=>{ce.delete(t)}},onBlock:(t)=>{if(fe.add(t),p?.block)t(p.block);return()=>{fe.delete(t)}},onServiceEvent:(t)=>(he.add(t),()=>{he.delete(t)}),onStatusControl:(t)=>(ye.add(t),()=>{ye.delete(t)}),onPopoverClosed:(t)=>(Re.add(t),()=>{Re.delete(t)}),onUsage:(t)=>{if(be.add(t),ve)t(ve);return ro(),()=>{be.delete(t)}},refreshUsage:()=>so()??v({...b,type:"usage-refresh",id:E(S)}),openUsageSettings:()=>so()??v({...b,type:"open-usage-settings",id:E(S)}),setStatusControls:(t)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support status controls."));if(!fo(t))return Promise.reject(new c("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return v({...b,type:"status-controls",id:E(S),payload:{controls:t}})},openPopover:(t)=>{if(p?.features?.popovers!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support popovers."));if(!mt(t))return Promise.reject(new c("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return v({...b,type:"popover-open",id:E(S),payload:t})},closePopover:po,setPopoverAnchorActive:So,onResolve:(t)=>(pe=t,()=>{if(pe===t)pe=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>we)return Promise.reject(new c("HOST_REJECTED",`Toast message must contain 1 to ${we} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ne))return Promise.reject(new c("HOST_REJECTED",`Toast copy text must contain 1 to ${Ne} characters.`));return v({channel:T,v:m,type:"toast",id:E(S),payload:{...t,message:r}})},openUrl:(t)=>v({channel:T,v:m,type:"open-url",id:E(S),payload:{url:t}}),openCommit:(t)=>bt(t)?v({channel:T,v:m,type:"open-commit",id:E(S),payload:{sha:t}}):Promise.reject(new c("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(t)=>v({channel:T,v:m,type:"block-answer",id:E(S),payload:{text:t.trim().slice(0,ht)}}),openSurface:(t)=>v({channel:T,v:m,type:"open-surface",id:E(S),payload:{surfaceId:t}}),writeClipboard:(t)=>v({channel:T,v:m,type:"clipboard-write",id:E(S),payload:{text:t}}),compose:(t)=>v({channel:T,v:m,type:"compose",id:E(S),payload:t}),attach:(t)=>v({channel:T,v:m,type:"attach",id:E(S),payload:ie(t)}),startSession:async(t)=>{if(t.projectId!==void 0)B(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")B(r.directory);else{if(r.name!==void 0)B(r.name,200);if(r.baseBranch!==void 0)B(r.baseBranch,200)}let u=await M({channel:T,v:m,type:"start-session",id:E(S),payload:xt(t)},e.requestTimeoutMs??180000);if(!yt(u))throw new c("HOST_REJECTED","Host did not return a session.");return u},prompt:(t)=>M({channel:T,v:m,type:"prompt",id:E(S),payload:Ct(t)}).then((r)=>{if(!Rt(r))throw new c("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>v({channel:T,v:m,type:"session-link",id:E(S),payload:ie(t)}),close:()=>v({channel:T,v:m,type:"close",id:E(S)}),oauthStart:()=>v({channel:T,v:m,type:"oauth-start",id:E(S)}),oauthDisconnect:()=>v({channel:T,v:m,type:"oauth-disconnect",id:E(S)}),request:(t)=>(Be(t.path)?M({channel:T,v:m,type:"request",id:E(S),payload:t}):Yo()).then((r)=>{if(!Ve(r))throw new c("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(Be(t.path)?M({channel:T,v:m,type:"service-request",id:E(S),payload:t}):Yo()).then((r)=>{if(!Ve(r))throw new c("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>M({channel:T,v:m,type:"service-status",id:E(S)}).then((t)=>{if(!Pt(t))throw new c("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(ae(t)?M({channel:T,v:m,type:"file-read",id:E(S),payload:{path:t}}):We()).then((r)=>{if(!Gt(r))throw new c("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!ae(t))return We();if(r.length>De)return Promise.reject(new c("FILE_TOO_LARGE",`Content is over ${De} characters.`));return M({channel:T,v:m,type:"file-write",id:E(S),payload:{path:t,content:r}}).then((u)=>{if(!Mt(u))throw new c("HOST_REJECTED","Host did not confirm the write.");return u})},listDir:(t)=>(ae(t)?M({channel:T,v:m,type:"file-list",id:E(S),payload:{path:t}}):We()).then((r)=>{if(!Ut(r))throw new c("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(ae(t)?M({channel:T,v:m,type:"file-stat",id:E(S),payload:{path:t}}):We()).then((r)=>{if(!wt(r))throw new c("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),u=t.system?.trim();if(r.length===0||r.length>He)return Promise.reject(new c("HOST_REJECTED",`Prompt must be 1 to ${He} characters.`));if(u!==void 0&&(u.length===0||u.length>Fe))return Promise.reject(new c("HOST_REJECTED",`System prompt must be 1 to ${Fe} characters.`));let l=t.maxOutputTokens===void 0?void 0:Math.min(At,Math.max(1,Math.floor(t.maxOutputTokens)));if(l!==void 0&&!Number.isFinite(l))return Promise.reject(new c("HOST_REJECTED","maxOutputTokens must be a number."));let f={prompt:r};if(u!==void 0)f.system=u;if(l!==void 0)f.maxOutputTokens=l;return M({channel:T,v:m,type:"generate",id:E(S),payload:f},e.requestTimeoutMs??Ot).then((h)=>{if(!Nt(h))throw new c("HOST_REJECTED","Host did not return generated text.");return h})},onLateGenerateResult:(t)=>{ee.add(t);for(let r of et.splice(0))R([t],r);return to(),()=>{ee.delete(t)}},openMicrophone:dr,setBadge:(t)=>v({channel:T,v:m,type:"badge",id:E(S),payload:{count:kt(t)}}),setHeight:(t)=>v({channel:T,v:m,type:"resize",id:E(S),payload:{height:It(t)}}),onFileOpen:(t)=>{if(Ae.add(t),!tt)tt=!0,o.addEventListener("keydown",io,!0);if(Ee)t(Ee);return()=>{Ae.delete(t)}},onFileSnapshot:(t)=>(Se=t,()=>{if(Se===t)Se=null}),onFileSaved:(t)=>(Oe.add(t),()=>{Oe.delete(t)}),reportFileChange:(t)=>ot({...b,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:no,reportFileUnsupported:()=>ot({...b,type:"file-unsupported"}),dispose:()=>{for(let t of oe.keys())U({...b,type:"workspace-unsubscribe",id:E(S),payload:{subscriptionId:t}});oe.clear();for(let t of re.keys())U({...b,type:"shells-unsubscribe",id:E(S),payload:{subscriptionId:t}});if(re.clear(),N)rt(),N.release(),N=null;if(F=!0,pe=null,de=null,Se=null,Ae.clear(),Oe.clear(),tt)o.removeEventListener("keydown",io,!0);o.removeEventListener("message",oo),o.removeEventListener("keydown",ao,!0),o.removeEventListener("pointerover",Ce),o.removeEventListener("pointermove",Ce),o.removeEventListener("pointerout",lo),o.removeEventListener("focus",uo),o.removeEventListener("blur",co);for(let t of te.values())clearTimeout(t.timer),t.reject(new c("HOST_UNAVAILABLE","Host client was disposed."));te.clear(),a.clear(),d.clear(),_.clear(),g.clear(),y.clear(),G.clear(),ce.clear(),fe.clear(),he.clear(),ye.clear(),Re.clear(),ee.clear(),et.length=0}}};var Zo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Rs=new Set(Zo);var er=["none","agent","user"];var vs=new Set(er);var Gr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Mr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],tr=(e,o)=>{o.style.colorScheme=e.mode;for(let[s,i]of Gr)o.style.setProperty(s,e.tokens[i]);for(let[s,i,a]of Mr){let d=e.tokens[a]??"";o.style.setProperty(s,d),o.style.setProperty(i,d)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Ht=(e,o)=>{if(tr(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var Ur={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},O=(e,o)=>`var(--${e}, var(--oc-${Ur[e]}, ${o}))`,X=O("surface-background","transparent"),qe=O("surface-elevated","transparent"),le=O("surface-elevated-foreground","inherit"),L=O("surface-foreground","inherit"),x=O("surface-muted-foreground","gray"),wr=O("surface-muted","transparent"),J=O("interactive-border","currentColor"),w=O("interactive-hover","transparent"),Q=O("interactive-active","transparent"),Ft=O("interactive-selection","transparent"),Bt=O("interactive-selection-foreground","inherit"),W=O("primary","currentColor"),Vt=O("primary-text","inherit"),Wt=O("error-text","inherit"),Nr=O("font-sans","inherit"),Xt=O("font-mono","monospace"),nr=O("radius","9px"),$t=`calc(${nr} - 2px)`,or=`calc(${nr} - 4px)`,C=(e,o,s="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${s})`,rr=`background-image: linear-gradient(${w}, ${w});`,qt=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--oc-sdk-field-lift);`,Kt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",sr="box-shadow: var(--oc-sdk-lit);",jt=`inset 0 0.5px 0 0 ${C(L,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Lr=`
:root {
  --oc-sdk-edge: ${C(L,16)};
  --oc-sdk-field-bg: ${qe};
  --oc-sdk-raised-bg: ${X};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${C(L,14)};
  --oc-sdk-field-bg: ${C(X,50,qe)};
  --oc-sdk-raised-bg: ${qe};
  --oc-sdk-field-lift: ${jt};
  --oc-sdk-raised-lift: ${jt};
  --oc-sdk-lit: ${jt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,$e=(e)=>{let o=O(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${O(`${e}-text`,"inherit")}; }`},n=(e)=>`calc(${e}rem / 14)`,Dr=`
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
`,ir=`${Lr}
.oc-sdk { color: ${L}; font-family: ${Nr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${rr} }
.oc-sdk-mono { font-family: ${Xt}; }
.oc-sdk-muted { color: ${x}; }
${$e("success")}${$e("warning")}${$e("error")}${$e("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${W}; --oc-sdk-tone-text: ${Vt}; }

.oc-sdk-btn { border-radius: ${$t}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${or}; }
.oc-sdk-btn[data-variant="default"] { color: ${Vt}; background: ${C(W,10,X)}; border-color: ${C(W,12)}; ${sr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${C(W,16,X)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${C(W,22,X)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${wr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Q}, ${Q}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${le}; ${Kt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Q}, ${Q}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${w}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Q}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${O("status-error","red")}; color: ${Wt}; background: ${C("var(--oc-sdk-tone)",7,X)}; border-color: ${C("var(--oc-sdk-tone)",12)}; ${sr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${C("var(--oc-sdk-tone)",9,X)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${C("var(--oc-sdk-tone)",11,X)}; box-shadow: none; }

.oc-sdk-field-note { color: ${x}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Wt}; }
.oc-sdk-input { border-radius: ${$t}; background: var(--oc-sdk-field-bg); color: ${le}; ${qt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${x}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${qt(C(L,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${qt(O("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Xt}; }

.oc-sdk-search-icon { color: ${x}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${W}; }
.oc-sdk-search-clear { border-radius: ${or}; color: ${x}; }
.oc-sdk-search-clear:hover { background: ${w}; color: ${L}; }

.oc-sdk-trigger { border-radius: ${$t}; background: var(--oc-sdk-raised-bg); color: ${le}; ${Kt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Q}, ${Q}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${x}; }
.oc-sdk-trigger-chevron { color: ${x}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${le}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${qe}; background-clip: padding-box; color: ${le}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${w}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Ft}; color: ${Bt}; }
.oc-sdk-option-check { color: ${L}; }
.oc-sdk-option[data-destructive="true"] { color: ${Wt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${C(O("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${x}; }
.oc-sdk-popup-empty { color: ${x}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${J}; border-radius: 4px; color: ${L}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${C(L,60,J)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${J}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${X}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${W}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${rr} }
.oc-sdk-check-desc { color: ${x}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${C(L,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${x}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${L}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Bt}; background: ${Ft}; border-color: ${J}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${le}; background: var(--oc-sdk-raised-bg); ${Kt} }
.oc-sdk-tab-count { color: ${x}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${C(L,6)}; color: ${x}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${C("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${w}; }
.oc-sdk-row[aria-selected="true"] { background: ${Ft}; color: ${Bt}; }
.oc-sdk-row-lead { font-family: ${Xt}; color: ${x}; }
.oc-sdk-row-sub { color: ${x}; }
.oc-sdk-row-meta { color: ${x}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${x}; }

.oc-sdk-empty-body { color: ${x}; }

.oc-sdk-spinner { color: ${x}; }
.oc-sdk-spinner-ring { border-color: ${J}; border-top-color: ${W}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${C("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${x}; }

.oc-sdk-separator { color: ${x}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${C(J,40)}; }

.oc-sdk-progress-label { color: ${x}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${C(L,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${W}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${O("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${O("success-text","inherit")}; }

.oc-sdk-text a { color: ${Vt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${C(J,60)}; }
`,I=`
${it}
${Dr}
${ir}`;var ar="oc-sdk-ui-style";var P=(e)=>{let o=document.getElementById(ar);if(o instanceof HTMLStyleElement){if(o.textContent!==e)o.textContent=e;return}at(document);let s=document.createElement("style");s.id=ar,s.textContent=e,document.head.appendChild(s)},k=(e,o)=>{let s=document.createElement(e);if(o)s.className=o;return s},q=(e)=>{let o=k("button",e);return o.type="button",o},D=(e,o)=>{let s=o??"";if(e.textContent!==s)e.textContent=s};var Hr=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},K=(e,o)=>{P(I);let s=o,i=q("oc-sdk oc-sdk-btn"),a=Hr(),d=document.createElement("span");i.append(d),e.append(i);let _=()=>{if(i.dataset.variant=s.variant??"default",i.dataset.size=s.size??"default",i.disabled=Boolean(s.disabled)||Boolean(s.loading),i.dataset.loading=s.loading?"true":"false",i.setAttribute("aria-busy",s.loading?"true":"false"),s.loading&&a.parentNode!==i)i.prepend(a);else if(!s.loading&&a.parentNode===i)a.remove();D(d,s.label)},g=()=>{if(s.disabled||s.loading)return;s.onClick()};return i.addEventListener("click",g),_(),{update:(y)=>{s={...s,...y},_()},dispose:()=>{i.removeEventListener("click",g),i.remove()}}};var zt=(e,o)=>{P(I);let s=o,i=k("div","oc-sdk oc-sdk-empty"),a=k("h2","oc-sdk-empty-title"),d=k("p","oc-sdk-empty-body"),_=k("div","oc-sdk-empty-action");i.append(a,d,_),e.append(i);let g=null,y=()=>{if(D(a,s.title),D(d,s.body),d.hidden=!s.body,_.hidden=!s.action,!s.action){g?.dispose(),g=null;return}let G={label:s.action.label,onClick:s.action.onClick};if(g)g.update(G);else g=K(_,{...G,variant:"outline",size:"sm"})};return y(),{update:(G)=>{s={...s,...G},y()},dispose:()=>{g?.dispose(),g=null,i.remove()}}};var Xr=/^(\s*[-*+] )\[( |x|X)\] ?(.*)$/,lr=(e)=>e.split(`
`).map((o)=>{let s=Xr.exec(o);return s?{kind:"item",prefix:s[1]??"- ",done:s[2]!==" ",text:s[3]??""}:{kind:"text",text:o}}),ur=(e)=>e.map((o)=>o.kind==="text"?o.text:`${o.prefix}[${o.done?"x":" "}] ${o.text}`).join(`
`),Qe=(e)=>{let o=2166136261;for(let s=0;s<e.length;s+=1)o^=e.charCodeAt(s),o=Math.imul(o,16777619);return`${e.length}:${(o>>>0).toString(16)}`},cr=(e,o)=>{let s=-1,i="- ";e.forEach((g,y)=>{if(g.kind!=="item")return;s=y,i=g.prefix});let a={kind:"item",prefix:i,done:!1,text:o};if(s>=0)return[...e.slice(0,s+1),a,...e.slice(s+1)];return[...e.at(-1)?.kind==="text"&&e.at(-1)?.text===""?e.slice(0,-1):[...e],a,{kind:"text",text:""}]};var Z=Dt(),Y=document.querySelector("#root");if(!Y)throw Error("Missing root");var pr=document.createElement("style");pr.textContent=`
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
`;document.head.append(pr);Z.onReady((e)=>Ht(e,document.documentElement));var j=[],ue=!1,Qt=Ue(null),Yt=()=>ur(j),Ye=()=>{Z.reportFileChange(Qt.observe(Qe(Yt())))},Jt=()=>{if(Y.replaceChildren(),!j.some((o)=>o.kind==="item")&&ue){zt(Y,{title:"No items",body:"This checklist is empty."});return}if(j.forEach((o,s)=>{if(o.kind==="text"){let _=document.createElement("p");_.className="note",_.textContent=o.text,Y.append(_);return}let i=document.createElement("div");i.className=o.done?"item done":"item";let a=document.createElement("input");a.type="checkbox",a.checked=o.done,a.disabled=ue,a.addEventListener("change",()=>{o.done=a.checked,i.className=o.done?"item done":"item",Ye()});let d=document.createElement("input");if(d.type="text",d.value=o.text,d.readOnly=ue,d.setAttribute("aria-label","Item"),d.addEventListener("input",()=>{o.text=d.value,Ye()}),i.append(a,d),!ue){let _=document.createElement("span");_.className="remove",K(_,{label:"Remove",variant:"ghost",size:"xs",onClick:()=>{j=j.filter((g,y)=>y!==s),Ye(),Jt()}}),i.append(_)}Y.append(i)}),ue)return;let e=document.createElement("div");e.className="actions",K(e,{label:"Add item",variant:"secondary",size:"sm",onClick:()=>{j=cr(j,""),Ye(),Jt();let o=Y.querySelectorAll('.item input[type="text"]');o.item(o.length-1)?.focus()}}),Y.append(e)};Z.onFileOpen((e)=>{if(e.encoding!=="text"){Z.reportFileUnsupported();return}j=lr(e.content),ue=e.readOnly,Qt=Ue(Qe(Yt())),Jt()});Z.onFileSnapshot(()=>{let e=Yt();return{content:e,version:Qe(e)}});Z.onFileSaved((e)=>{Z.reportFileChange({dirty:Qt.markSaved(e),edited:!1})});})();
