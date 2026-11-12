'use strict';
/* Livegift Studio — camera, live filters (WebGL), effects, stickers, recording, publish. Web only. */
(() => {
const TX = {
 fa:{studio:'استودیو',video:'ویدیو',photo:'عکس',filters:'فیلتر',effects:'افکت',adjust:'تنظیم',beauty:'زیبایی',stickers:'استیکر',text:'متن',gallery:'گالری',next:'بعدی',retake:'دوباره',
  caption:'توضیح و هشتگ…',publish:'انتشار',publishing:'در حال ارسال…',processing:'در حال ساخت ویدیو…',orig:'ارسال بدون فیلتر',camfail:'دسترسی به دوربین ممکن نشد. از گالری انتخاب کنید.',
  norec:'ضبط ویدیو در این مرورگر پشتیبانی نمی‌شود.',bright:'روشنایی',contrast:'کنتراست',sat:'رنگ',warm:'گرما',vig:'وینیت',smooth:'صافی پوست',typehere:'متن را بنویسید',add:'افزودن',
  done:'منتشر شد ✅',speed:'سرعت',reset:'بازنشانی',vis:'چه کسی ببیند',public:'همه',followers:'دنبال‌کنندگان',private:'فقط من',sound:'صدا',max:'حداکثر ۶۰ ثانیه',webm:'این مرورگر فقط webm می‌سازد؛ برای اپ iOS از Safari استفاده کنید.'},
 en:{studio:'Studio',video:'Video',photo:'Photo',filters:'Filters',effects:'Effects',adjust:'Adjust',beauty:'Beauty',stickers:'Stickers',text:'Text',gallery:'Gallery',next:'Next',retake:'Retake',
  caption:'Caption and hashtags…',publish:'Publish',publishing:'Uploading…',processing:'Creating video…',orig:'Post without filters',camfail:'Camera not available. Choose from gallery.',
  norec:'Video recording is not supported in this browser.',bright:'Brightness',contrast:'Contrast',sat:'Color',warm:'Warmth',vig:'Vignette',smooth:'Skin smoothing',typehere:'Type your text',add:'Add',
  done:'Published ✅',speed:'Speed',reset:'Reset',vis:'Who can see it',public:'Everyone',followers:'Followers',private:'Only me',sound:'Sound',max:'Max 60 seconds',webm:'This browser only makes webm; use Safari for the iOS app.'},
 de:{studio:'Studio',video:'Video',photo:'Foto',filters:'Filter',effects:'Effekte',adjust:'Anpassen',beauty:'Beauty',stickers:'Sticker',text:'Text',gallery:'Galerie',next:'Weiter',retake:'Neu',
  caption:'Beschreibung und Hashtags…',publish:'Veröffentlichen',publishing:'Wird hochgeladen…',processing:'Video wird erstellt…',orig:'Ohne Filter posten',camfail:'Kamera nicht verfügbar. Wählen Sie aus der Galerie.',
  norec:'Videoaufnahme wird in diesem Browser nicht unterstützt.',bright:'Helligkeit',contrast:'Kontrast',sat:'Farbe',warm:'Wärme',vig:'Vignette',smooth:'Hautglättung',typehere:'Text eingeben',add:'Hinzufügen',
  done:'Veröffentlicht ✅',speed:'Tempo',reset:'Zurücksetzen',vis:'Wer darf es sehen',public:'Alle',followers:'Follower',private:'Nur ich',sound:'Ton',max:'Maximal 60 Sekunden',webm:'Dieser Browser erzeugt nur webm; für die iOS-App Safari verwenden.'}
};
const T = k => (TX[lang] && TX[lang][k]) || TX.en[k] || k;
const N = (a, b, c) => ({fa: a, en: b, de: c});
const nm = o => o[lang] || o.en;

/* ---- looks ---- */
const FILTERS = [
 {id:'none', n:N('اصلی','Original','Original'), sw:'#888,#ccc', p:{}},
 {id:'cinema', n:N('سینمایی','Cinema','Kino'), sw:'#0f6e7a,#f2a15a', p:{con:1.15,sat:1.08,vig:.35,split:.32,sh:[0,.35,.42],hi:[.55,.32,.05],temp:.1}},
 {id:'noir', n:N('نوآر','Noir','Noir'), sw:'#111,#eee', p:{sat:0,con:1.4,vig:.5,grain:.45}},
 {id:'vintage', n:N('قدیمی','Vintage','Vintage'), sw:'#b88a4a,#e8d3a6', p:{fade:.28,sat:.78,temp:.45,grain:.5,vig:.38,con:.95}},
 {id:'neon', n:N('نئون','Neon','Neon'), sw:'#ff2bd6,#18e0ff', p:{sat:1.55,con:1.2,split:.4,sh:[.35,0,.55],hi:[0,.5,.55],glow:.5}},
 {id:'dream', n:N('رؤیا','Dream','Traum'), sw:'#ffc2e6,#c3b6ff', p:{expo:.05,sat:1.05,fade:.18,split:.25,sh:[.2,.1,.35],hi:[.5,.25,.3],glow:.9}},
 {id:'cyber', n:N('سایبر','Cyber','Cyber'), sw:'#2a2bff,#ff3dd0', p:{con:1.25,sat:1.35,split:.45,sh:[0,.1,.6],hi:[.6,.1,.45],scan:.6,chroma:.5}},
 {id:'sunset', n:N('غروب','Sunset','Sonnenuntergang'), sw:'#ff6a3d,#ffd36a', p:{temp:.75,sat:1.25,split:.28,sh:[.35,.05,.25],hi:[.6,.35,0],vig:.25}},
 {id:'frost', n:N('یخ','Frost','Frost'), sw:'#7ad7ff,#e6f6ff', p:{temp:-.7,sat:.92,expo:.06,con:1.05,split:.2,sh:[0,.1,.35],hi:[.1,.25,.4]}},
 {id:'rose', n:N('رُز','Rose','Rosé'), sw:'#ff8fb0,#ffe0ea', p:{fade:.15,sat:1.1,split:.3,sh:[.3,.05,.15],hi:[.55,.25,.3],expo:.04,glow:.35}},
 {id:'mint', n:N('نعنا','Mint','Minze'), sw:'#4de0b0,#d9fff0', p:{temp:-.3,sat:1.15,split:.28,sh:[0,.3,.2],hi:[.1,.5,.3],fade:.1}},
 {id:'gold', n:N('طلایی','Gold','Gold'), sw:'#c89400,#fff0a8', p:{temp:.8,sat:1.2,con:1.15,split:.35,sh:[.3,.15,0],hi:[.6,.45,0],glow:.4}},
 {id:'drama', n:N('دراما','Drama','Drama'), sw:'#220010,#ff3d5a', p:{con:1.5,sat:1.1,vig:.6,expo:-.04,split:.2,sh:[.1,0,.1],hi:[.4,.1,.0]}},
 {id:'pop', n:N('پاپ','Pop','Pop'), sw:'#ff4d6d,#ffd60a', p:{sat:1.8,con:1.18,expo:.04}},
 {id:'matte', n:N('مات','Matte','Matt'), sw:'#6b6b7a,#c9c9d6', p:{fade:.3,sat:.85,con:.92}},
 {id:'film', n:N('فیلم','Film','Film'), sw:'#4a6a4a,#d8c79a', p:{fade:.2,temp:.25,sat:.9,grain:.6,vig:.3,split:.2,sh:[0,.15,.1],hi:[.4,.3,.05]}},
 {id:'polaroid', n:N('پولاروید','Polaroid','Polaroid'), sw:'#e8c27a,#9fc5c0', p:{fade:.22,temp:.3,sat:.95,con:1.08,vig:.28,grain:.25}},
 {id:'ice', n:N('آبی تیره','Deep Blue','Tiefblau'), sw:'#031b4e,#6fb1ff', p:{temp:-.9,sat:1.25,con:1.2,vig:.4,split:.35,sh:[0,.05,.5],hi:[.1,.3,.5]}}
];
const EFFECTS = [
 {id:'glow', n:N('درخشش','Glow','Leuchten'), e:'✨', u:{glow:1}},
 {id:'glitch', n:N('گلیچ','Glitch','Glitch'), e:'📺', u:{glitch:1}},
 {id:'chroma', n:N('تفکیک رنگ','RGB Split','RGB-Split'), e:'🌈', u:{chroma:1}},
 {id:'vhs', n:N('VHS','VHS','VHS'), e:'📼', u:{vhs:1,scan:.5,grain:.5}},
 {id:'scan', n:N('خط‌های تلویزیون','Scanlines','Scanlines'), e:'▤', u:{scan:1}},
 {id:'pixel', n:N('پیکسل','Pixel','Pixel'), e:'🎮', u:{pixel:1}},
 {id:'mirror', n:N('آینه','Mirror','Spiegel'), e:'🪞', u:{mirror:1}},
 {id:'shake', n:N('تپش','Pulse','Puls'), e:'💥', u:{shake:1}},
 {id:'rainbow', n:N('رنگین‌کمان','Rainbow','Regenbogen'), e:'🦄', u:{rainbow:1}},
 {id:'grain', n:N('دانهٔ فیلم','Grain','Filmkorn'), e:'🎞️', u:{grain:.9}},
 {id:'vig', n:N('تاریکی لبه','Vignette','Vignette'), e:'⚫', u:{vig:.7}},
 {id:'stars', n:N('ستاره','Stars','Sterne'), e:'⭐', fx:'stars'},
 {id:'hearts', n:N('قلب','Hearts','Herzen'), e:'💖', fx:'hearts'},
 {id:'snow', n:N('برف','Snow','Schnee'), e:'❄️', fx:'snow'},
 {id:'confetti', n:N('کاغذ رنگی','Confetti','Konfetti'), e:'🎉', fx:'confetti'},
 {id:'fire', n:N('آتش','Fire','Feuer'), e:'🔥', fx:'fire'}
];
const EMOJI = ['😍','🔥','✨','💖','😂','😎','🥳','👑','🎁','💎','🌹','⭐','🚀','🎵','💯','🦋','🌈','👏','😈','🍀','☀️','🌙','⚡','🎬'];
const COLORS = ['#ffffff','#ff3d81','#ffd60a','#35d07f','#18e0ff','#a24dff','#111111'];

/* ---- WebGL renderer ---- */
const VS = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
const FS = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 v;
uniform sampler2D tex;
uniform vec2 res;uniform vec4 fit;
uniform float flip,time,expo,con,sat,temp,fade,vig,grain,hue,split,glow,glitch,chroma,scan,pixel,mirror,shake,vhs,rainbow,beauty;
uniform vec3 sh,hi;
float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
vec3 samp(vec2 uv){vec2 t=uv;t.x=mix(t.x,1.-t.x,flip);t=t*fit.xy+fit.zw;return texture2D(tex,clamp(t,0.001,.999)).rgb;}
void main(){
 vec2 uv=v;
 if(mirror>.5&&uv.x>.5)uv.x=1.-uv.x;
 float z=1.+shake*.06*abs(sin(time*8.));uv=(uv-.5)/z+.5;
 if(pixel>0.){vec2 g=vec2(90.,90.*res.y/res.x);uv=(floor(uv*g)+.5)/g;}
 float tt=floor(mod(time,100.)*10.);float band=floor(uv.y*28.);
 if(glitch>0.){float r=hash(vec2(band,tt));if(r>.88)uv.x+=(hash(vec2(band,tt+3.))-.5)*.2*glitch;}
 if(vhs>0.){uv.x+=sin(uv.y*220.+time*14.)*.0018*vhs;if(hash(vec2(band,floor(time*12.)))>.97)uv.x+=.012*vhs;}
 float ca=chroma*.008+glitch*.004+vhs*.004;
 vec3 c;c.r=samp(uv+vec2(ca,0.)).r;c.g=samp(uv).g;c.b=samp(uv-vec2(ca,0.)).b;
 if(beauty>0.){vec3 acc=vec3(0.);float ws=0.;vec2 px=vec2(3.2/res.x,3.2/res.y);
  for(int i=-1;i<=1;i++){for(int j=-1;j<=1;j++){vec3 s=samp(uv+vec2(float(i),float(j))*px);float d=length(s-c);float w=exp(-d*d*30.)*exp(-float(i*i+j*j)*.35);acc+=s*w;ws+=w;}}
  c=mix(c,acc/ws,beauty*.9);c+=beauty*.035;}
 if(glow>0.){vec3 b=vec3(0.);for(int i=0;i<8;i++){float a=float(i)*.785;vec2 o=vec2(cos(a),sin(a));b+=max(samp(uv+o*.012)-.55,0.);b+=max(samp(uv+o*.032)-.55,0.);}c+=b/16.*glow*2.6;}
 c+=expo;c=(c-.5)*con+.5;
 float l=dot(c,vec3(.299,.587,.114));c=mix(vec3(l),c,sat);
 c.r+=temp*.08;c.b-=temp*.08;c.g+=temp*.012;
 c=mix(c,c*.86+.11,fade);
 l=dot(c,vec3(.299,.587,.114));c+=mix(sh,hi,smoothstep(0.,1.,l))*split;
 float h=hue+rainbow*mod(time*.25,1.);
 if(abs(h)>.001){float a=h*6.28318;float cs=cos(a),sn=sin(a);
  mat3 toYIQ=mat3(.299,.596,.211,.587,-.274,-.523,.114,-.322,.312);
  mat3 toRGB=mat3(1.,1.,1.,.956,-.272,-1.106,.621,-.647,1.703);
  vec3 q=toYIQ*c;q.yz=mat2(cs,-sn,sn,cs)*q.yz;c=toRGB*q;}
 c*=1.-scan*.2*(.5+.5*sin(v.y*res.y*1.7));
 c*=1.-vig*smoothstep(.35,.95,distance(v,vec2(.5)));
 c+=(hash(v*res+mod(time,50.))-.5)*grain*.24;
 gl_FragColor=vec4(clamp(c,0.,1.),1.);
}`;
const UN = ['res','fit','flip','time','expo','con','sat','temp','fade','vig','grain','hue','split','glow','glitch','chroma','scan','pixel','mirror','shake','vhs','rainbow','beauty','sh','hi'];
function makeGL(w, h) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const gl = c.getContext('webgl', {premultipliedAlpha: false, preserveDrawingBuffer: true, antialias: false}) || c.getContext('experimental-webgl');
  if (!gl) return null;
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; };
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr));
  gl.useProgram(pr);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = {}; UN.forEach(n => U[n] = gl.getUniformLocation(pr, n)); U.tex = gl.getUniformLocation(pr, 'tex');
  const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.uniform1i(U.tex, 0);
  return {canvas: c, draw(src, sw, sh2, P, time, flip) {
    gl.viewport(0, 0, w, h);
    try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, src); } catch { return false; }
    const ao = w / h, as = sw / sh2; let sx = 1, sy = 1, ox = 0, oy = 0;
    if (as > ao) { sx = ao / as; ox = (1 - sx) / 2; } else { sy = as / ao; oy = (1 - sy) / 2; }
    const z = P.zoom || 1; sx /= z; sy /= z; ox = (1 - sx) / 2; oy = (1 - sy) / 2;
    gl.uniform2f(U.res, w, h); gl.uniform4f(U.fit, sx, sy, ox, oy); gl.uniform1f(U.flip, flip ? 1 : 0); gl.uniform1f(U.time, time);
    for (const k of ['expo','con','sat','temp','fade','vig','grain','hue','split','glow','glitch','chroma','scan','pixel','mirror','shake','vhs','rainbow','beauty']) gl.uniform1f(U[k], P[k]);
    gl.uniform3fv(U.sh, P.sh); gl.uniform3fv(U.hi, P.hi);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); return true;
  }};
}

/* ---- studio state ---- */
let R = null; // running studio
const W = 720, H = 1280;
const baseP = () => ({expo:0,con:1,sat:1,temp:0,fade:0,vig:0,grain:0,hue:0,split:0,glow:0,glitch:0,chroma:0,scan:0,pixel:0,mirror:0,shake:0,vhs:0,rainbow:0,beauty:0,sh:[0,0,0],hi:[0,0,0],zoom:1});
function params(s) {
  const P = baseP(), f = FILTERS.find(x => x.id === s.filter) || FILTERS[0];
  Object.assign(P, f.p);
  P.expo += s.adj.bright; P.con *= s.adj.contrast; P.sat *= s.adj.sat; P.temp += s.adj.warm; P.vig = Math.max(P.vig, s.adj.vig); P.beauty = s.adj.beauty;
  for (const id of s.fx) { const e = EFFECTS.find(x => x.id === id); if (e && e.u) for (const k in e.u) P[k] = Math.max(P[k], e.u[k]); }
  return P;
}
function injectCSS() {
  if (document.getElementById('studio-css')) return;
  const st = document.createElement('style'); st.id = 'studio-css'; st.textContent = `
#studio{position:absolute;inset:0;background:#000;z-index:45;display:flex;flex-direction:column;overflow:hidden;color:#fff}
#studio canvas.out{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;touch-action:none}
#studio .stop{position:absolute;top:0;inset-inline:0;padding:max(12px,env(safe-area-inset-top)) 14px 0;display:flex;justify-content:space-between;align-items:center;z-index:3}
#studio .round{width:42px;height:42px;border-radius:50%;background:rgba(0,0,0,.4);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;font-size:19px;border:1px solid rgba(255,255,255,.14);color:#fff}
#studio .rail{position:absolute;inset-inline-end:12px;top:calc(max(12px,env(safe-area-inset-top)) + 58px);display:flex;flex-direction:column;gap:14px;z-index:3}
#studio .rail button{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:10.5px;font-weight:700;text-shadow:0 1px 5px #000;color:#fff}
#studio .rail button.on .round{background:var(--g);border-color:transparent}
#studio .bot{position:absolute;bottom:0;inset-inline:0;padding-bottom:max(14px,env(safe-area-inset-bottom));z-index:3;background:linear-gradient(transparent,rgba(0,0,0,.7) 40%)}
#studio .chips2{display:flex;gap:10px;overflow-x:auto;padding:10px 16px 4px;scrollbar-width:none;scroll-snap-type:x proximity}#studio .chips2::-webkit-scrollbar{display:none}
#studio .fchip{flex:none;width:58px;text-align:center;font-size:10.5px;font-weight:700;scroll-snap-align:center;opacity:.8}
#studio .fchip i{display:block;width:50px;height:50px;border-radius:16px;margin:0 auto 3px;border:2px solid transparent;box-shadow:0 2px 10px rgba(0,0,0,.5)}
#studio .fchip.on{opacity:1}#studio .fchip.on i{border-color:#fff;transform:scale(1.08)}
#studio .ctrl{display:flex;align-items:center;justify-content:space-around;padding:8px 20px 0}
#studio .rec{width:78px;height:78px;border-radius:50%;position:relative;display:flex;align-items:center;justify-content:center}
#studio .rec svg{position:absolute;inset:0;transform:rotate(-90deg)}
#studio .rec .dotb{width:58px;height:58px;border-radius:50%;background:var(--g);box-shadow:0 0 24px rgba(255,61,129,.6);transition:.2s}
#studio .rec.on .dotb{width:30px;height:30px;border-radius:9px;background:#ff3d57}
#studio .rec.photo .dotb{background:#fff}
#studio .modes{display:flex;justify-content:center;gap:22px;font-weight:800;font-size:13px;padding-top:6px}
#studio .modes button{color:rgba(255,255,255,.55)}#studio .modes button.on{color:#fff;text-shadow:0 0 12px var(--acc)}
#studio .panel{position:absolute;bottom:0;inset-inline:0;background:rgba(14,10,22,.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:24px 24px 0 0;padding:14px 16px max(16px,env(safe-area-inset-bottom));z-index:6;max-height:60%;overflow-y:auto;animation:up .25s}
#studio .panel h3{margin:0 0 10px;font-size:15px;display:flex;justify-content:space-between;align-items:center}
#studio .egrid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
#studio .egrid button{background:rgba(255,255,255,.08);border-radius:14px;padding:10px 2px;font-size:11px;font-weight:700;border:2px solid transparent}
#studio .egrid button b{display:block;font-size:24px;font-weight:400}
#studio .egrid button.on{border-color:var(--acc);background:rgba(255,61,129,.18)}
#studio .sl{display:flex;align-items:center;gap:10px;margin:10px 0;font-size:13px}#studio .sl span{width:92px}
#studio input[type=range]{padding:0;height:28px;accent-color:#ff3d81;background:none;border:0}
#studio .cd{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:140px;font-weight:900;z-index:7;text-shadow:0 0 40px var(--acc);pointer-events:none;animation:pop .9s ease-out infinite}
#studio .toolbar{position:absolute;inset-inline:0;top:calc(max(12px,env(safe-area-inset-top)) + 56px);display:flex;justify-content:center;gap:10px;z-index:4}
#studio .toolbar button{background:rgba(0,0,0,.55);padding:8px 14px;border-radius:16px;font-weight:700;font-size:13px;border:1px solid rgba(255,255,255,.15);color:#fff}
#studio .review{position:absolute;inset:0;z-index:5;background:#000}#studio .review video,#studio .review img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
#studio .pub{position:absolute;inset:0;background:rgba(8,6,14,.94);z-index:8;padding:max(16px,env(safe-area-inset-top)) 18px 18px;display:flex;flex-direction:column;gap:14px;overflow-y:auto}
#studio .prevth{width:110px;height:196px;border-radius:16px;overflow:hidden;background:#000;flex:none}#studio .prevth video,#studio .prevth img{width:100%;height:100%;object-fit:cover}
#studio .prog2{height:8px;border-radius:4px;background:rgba(255,255,255,.12);overflow:hidden}#studio .prog2 i{display:block;height:100%;width:0;background:var(--g);transition:width .2s}
#studio .proc{position:absolute;inset:0;background:rgba(0,0,0,.7);z-index:9;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;font-weight:700}
#studio .proc .prog2{width:60%}
`; document.head.append(st);
}

function openStudio() {
  if (R) return;
  injectCSS();
  const s = R = {
    mode: 'video', facing: 'user', filter: 'none', fx: new Set(), adj: {bright: 0, contrast: 1, sat: 1, warm: 0, vig: 0, beauty: 0},
    items: [], sel: null, parts: [], timer: 0, raf: 0, stream: null, src: null, srcKind: 'cam', rec: null, recStart: 0, stage: 'cam', blob: null, blobKind: null, mime: '', t0: performance.now(), file: null, speed: 1, panel: null, imgEl: null
  };
  const el = document.createElement('div'); el.id = 'studio'; root.append(el); s.el = el;
  const out = document.createElement('canvas'); out.className = 'out'; out.width = W; out.height = H; s.out = out; s.ctx = out.getContext('2d');
  try { s.gl = makeGL(W, H); } catch (e) { s.gl = null; console.warn(e); }
  el.innerHTML = `<div class="stop"><button class="round" data-s="close">✕</button><div class="mut small" id="st-time" style="font-weight:800;font-size:15px;color:#fff;text-shadow:0 1px 5px #000"></div><button class="round" data-s="flip">🔄</button></div>
   <div class="rail" id="rail"></div><div class="toolbar" id="toolbar" hidden></div>
   <div class="bot"><div class="chips2" id="fch"></div><div class="ctrl"><label class="round" style="cursor:pointer;width:46px;height:46px;border-radius:14px">🖼️<input type="file" id="sfile" accept="image/*,video/*" hidden></label><button class="rec" id="rec"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="37" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="4"/><circle id="ring" cx="40" cy="40" r="37" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="232.5" stroke-dashoffset="232.5" stroke-linecap="round"/></svg><i class="dotb"></i></button><button class="round" id="tmr" style="width:46px;height:46px;border-radius:14px;font-size:14px;font-weight:800">⏱0</button></div><div class="modes"><button data-m="video" class="on">${T('video')}</button><button data-m="photo">${T('photo')}</button></div></div>`;
  el.prepend(out);
  buildRail(s); buildFilters(s); bindStudio(s);
  startCamera(s);
  loop(s);
}
function closeStudio() {
  const s = R; if (!s) return; cancelAnimationFrame(s.raf); stopSrc(s);
  try { if (s.rec && s.rec.state !== 'inactive') s.rec.stop(); } catch {}
  if (s.url) URL.revokeObjectURL(s.url);
  s.el.remove(); R = null;
}
function stopSrc(s) { if (s.stream) { s.stream.getTracks().forEach(t => t.stop()); s.stream = null; } if (s.vid) { try { s.vid.pause(); } catch {} } }

function buildRail(s) {
  const r = $('#rail', s.el);
  r.innerHTML = [['filters', '🎨', T('filters')], ['effects', '✨', T('effects')], ['adjust', '🎚️', T('adjust')], ['beauty', '💄', T('beauty')], ['stickers', '😊', T('stickers')], ['text', 'Aa', T('text')]].map(([k, i, n]) => `<button data-p="${k}"><span class="round">${i}</span>${n}</button>`).join('');
}
function buildFilters(s) {
  $('#fch', s.el).innerHTML = FILTERS.map(f => { const [a, b] = f.sw.split(','); return `<button class="fchip ${f.id === s.filter ? 'on' : ''}" data-f="${f.id}"><i style="background:linear-gradient(135deg,${a},${b})"></i>${esc(nm(f.n))}</button>`; }).join('');
}
function panel(s, title, inner) {
  closePanel(s);
  const p = document.createElement('div'); p.className = 'panel'; p.innerHTML = `<h3><span>${title}</span><button data-s="pclose" style="font-size:20px">✕</button></h3>${inner}`; s.el.append(p); s.panel = p; return p;
}
const closePanel = s => { if (s.panel) { s.panel.remove(); s.panel = null; } };
function openPanel(s, k) {
  if (k === 'filters') { closePanel(s); const f = $('#fch', s.el); f.scrollIntoView?.({inline: 'center'}); return; }
  if (k === 'effects') {
    const p = panel(s, T('effects'), `<div class="egrid">${EFFECTS.map(e => `<button data-e="${e.id}" class="${s.fx.has(e.id) ? 'on' : ''}"><b>${e.e}</b>${esc(nm(e.n))}</button>`).join('')}</div>`);
    $$('[data-e]', p).forEach(b => b.onclick = () => { const id = b.dataset.e; s.fx.has(id) ? s.fx.delete(id) : s.fx.add(id); b.classList.toggle('on'); });
  } else if (k === 'adjust' || k === 'beauty') {
    const defs = k === 'beauty' ? [['beauty', T('smooth'), 0, 1, .01]] : [['bright', T('bright'), -.3, .3, .01], ['contrast', T('contrast'), .7, 1.6, .01], ['sat', T('sat'), 0, 2, .01], ['warm', T('warm'), -1, 1, .01], ['vig', T('vig'), 0, 1, .01]];
    const p = panel(s, T(k), defs.map(([key, n, a, b, st]) => `<div class="sl"><span>${n}</span><input type="range" min="${a}" max="${b}" step="${st}" value="${s.adj[key]}" data-k="${key}"></div>`).join('') + `<button class="btn sec sm" data-s="resetadj">${T('reset')}</button>`);
    $$('input[type=range]', p).forEach(i => i.oninput = () => s.adj[i.dataset.k] = +i.value);
  } else if (k === 'stickers') {
    const p = panel(s, T('stickers'), `<div class="egrid">${EMOJI.map(e => `<button data-em="${e}"><b>${e}</b></button>`).join('')}</div>`);
    $$('[data-em]', p).forEach(b => b.onclick = () => { addItem(s, {type: 'emoji', v: b.dataset.em, s: 1.4}); closePanel(s); });
  } else if (k === 'text') {
    const p = panel(s, T('text'), `<div class="row"><input id="ttx" maxlength="60" placeholder="${T('typehere')}"><button class="send grad" id="tadd">${T('add')}</button></div>`);
    $('#ttx', p).focus(); $('#tadd', p).onclick = () => { const v = $('#ttx', p).value.trim(); if (v) { addItem(s, {type: 'text', v, s: 1, c: '#ffffff'}); closePanel(s); } };
  }
}
function addItem(s, o) { const it = Object.assign({id: Math.random().toString(36).slice(2), x: .5, y: .45}, o); s.items.push(it); s.sel = it.id; showToolbar(s); }
function showToolbar(s) {
  const tb = $('#toolbar', s.el), it = s.items.find(i => i.id === s.sel);
  if (!it) { tb.hidden = true; return; }
  tb.hidden = false;
  tb.innerHTML = `<button data-s="smaller">A−</button><button data-s="bigger">A+</button>${it.type === 'text' ? `<button data-s="color">🎨</button>` : ''}<button data-s="del">🗑</button>`;
}

function bindStudio(s) {
  s.el.addEventListener('click', e => {
    const b = e.target.closest('[data-s],[data-p],[data-f],[data-m]'); if (!b) return;
    if (b.dataset.f) { s.filter = b.dataset.f; $$('.fchip', s.el).forEach(x => x.classList.toggle('on', x.dataset.f === s.filter)); return; }
    if (b.dataset.p) return openPanel(s, b.dataset.p);
    if (b.dataset.m) { if (s.recording) return; s.mode = b.dataset.m; $$('.modes button', s.el).forEach(x => x.classList.toggle('on', x === b)); $('#rec', s.el).classList.toggle('photo', s.mode === 'photo'); return; }
    const a = b.dataset.s, it = s.items.find(i => i.id === s.sel);
    if (a === 'close') { if (s.stage !== 'cam') return backToCam(s); closeStudio(); }
    else if (a === 'flip') { s.facing = s.facing === 'user' ? 'environment' : 'user'; startCamera(s); }
    else if (a === 'pclose') closePanel(s);
    else if (a === 'resetadj') { Object.assign(s.adj, {bright: 0, contrast: 1, sat: 1, warm: 0, vig: 0, beauty: 0}); closePanel(s); }
    else if (a === 'smaller' && it) it.s = Math.max(.5, it.s * .85);
    else if (a === 'bigger' && it) it.s = Math.min(5, it.s * 1.18);
    else if (a === 'color' && it) it.c = COLORS[(COLORS.indexOf(it.c) + 1) % COLORS.length];
    else if (a === 'del' && it) { s.items = s.items.filter(i => i !== it); s.sel = null; showToolbar(s); }
  });
  $('#tmr', s.el).onclick = e => { s.timer = s.timer === 0 ? 3 : s.timer === 3 ? 10 : 0; e.currentTarget.textContent = '⏱' + s.timer; };
  $('#rec', s.el).onclick = () => onShutter(s);
  $('#sfile', s.el).onchange = e => { const f = e.target.files[0]; if (f) loadFile(s, f); e.target.value = ''; };
  // drag items
  let drag = null;
  const pt = ev => { const r = s.out.getBoundingClientRect(); const ar = W / H, rr = r.width / r.height; let cw = r.width, ch = r.height, ox = 0, oy = 0; if (rr > ar) { ch = r.height; cw = ch * ar; ox = (r.width - cw) / 2; } else { cw = r.width; ch = cw / ar; oy = (r.height - ch) / 2; }
    // object-fit:cover => canvas scaled to cover
    const sc = Math.max(r.width / W, r.height / H), dw = W * sc, dh = H * sc, offx = (r.width - dw) / 2, offy = (r.height - dh) / 2;
    return {x: ((ev.clientX - r.left - offx) / dw), y: ((ev.clientY - r.top - offy) / dh)}; };
  s.out.addEventListener('pointerdown', ev => { if (s.stage !== 'cam') return; const p = pt(ev); let hit = null;
    for (const it of s.items.slice().reverse()) { const rad = (it.type === 'emoji' ? .09 : .13) * it.s; if (Math.hypot((p.x - it.x), (p.y - it.y) * H / W) < rad * 1.4) { hit = it; break; } }
    if (hit) { drag = {it: hit, dx: hit.x - p.x, dy: hit.y - p.y}; s.sel = hit.id; showToolbar(s); s.out.setPointerCapture(ev.pointerId); } else { s.sel = null; showToolbar(s); } });
  s.out.addEventListener('pointermove', ev => { if (!drag) return; const p = pt(ev); drag.it.x = Math.min(1, Math.max(0, p.x + drag.dx)); drag.it.y = Math.min(1, Math.max(0, p.y + drag.dy)); });
  const up = () => drag = null; s.out.addEventListener('pointerup', up); s.out.addEventListener('pointercancel', up);
}

/* ---- sources ---- */
async function startCamera(s) {
  stopSrc(s); s.srcKind = 'cam'; s.file = null; const my = s.tok = (s.tok || 0) + 1;
  const base = {facingMode: s.facing, width: {ideal: 1280}, height: {ideal: 720}};
  let st = null;
  try { st = await navigator.mediaDevices.getUserMedia({video: base, audio: true}); }
  catch { try { st = await navigator.mediaDevices.getUserMedia({video: base, audio: false}); } catch { toast(T('camfail')); return; } }
  if (!R || s.tok !== my) { st.getTracks().forEach(t => t.stop()); return; }
  s.stream = st;
  const v = document.createElement('video'); v.playsInline = true; v.muted = true; v.autoplay = true; v.srcObject = st; await v.play().catch(() => {}); if (s.tok !== my) { st.getTracks().forEach(t => t.stop()); return; } s.vid = v; s.src = v; s.imgEl = null;
}
function loadFile(s, f) {
  stopSrc(s); s.tok = (s.tok || 0) + 1; s.file = f; s.srcKind = 'file';
  const url = URL.createObjectURL(f); s.fileUrl = url;
  if (f.type.startsWith('image')) { const im = new Image(); im.onload = () => { s.src = im; s.imgEl = im; s.mode = 'photo'; $$('.modes button', s.el).forEach(x => x.classList.toggle('on', x.dataset.m === 'photo')); $('#rec', s.el).classList.add('photo'); }; im.src = url; s.vid = null; }
  else { const v = document.createElement('video'); v.playsInline = true; v.muted = true; v.loop = true; v.src = url; v.onloadeddata = () => { v.play().catch(() => {}); }; s.vid = v; s.src = v; s.imgEl = null; s.mode = 'video'; $$('.modes button', s.el).forEach(x => x.classList.toggle('on', x.dataset.m === 'video')); $('#rec', s.el).classList.remove('photo'); }
}

/* ---- render loop ---- */
function loop(s) {
  if (!R || R !== s) return;
  s.raf = requestAnimationFrame(() => loop(s));
  if (s.stage !== 'cam' && !s.processing) return;
  const t = (performance.now() - s.t0) / 1000, src = s.src;
  const ctx = s.ctx;
  let ok = false;
  if (src && s.gl) {
    const sw = src.videoWidth || src.naturalWidth || 0, sh = src.videoHeight || src.naturalHeight || 0;
    if (sw && (src.readyState === undefined || src.readyState >= 2)) ok = s.gl.draw(src, sw, sh, params(s), t, s.srcKind === 'cam' && s.facing === 'user');
  }
  if (ok) ctx.drawImage(s.gl.canvas, 0, 0);
  else { ctx.fillStyle = '#0b0814'; ctx.fillRect(0, 0, W, H); if (!src) { ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.font = '700 40px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Livegift', W / 2, H / 2); } }
  particles(s, ctx, t); drawItems(s, ctx);
  if (s.recording) {
    const el = (performance.now() - s.recStart) / 1000, max = s.maxDur || 60;
    $('#ring', s.el).style.strokeDashoffset = 232.5 * (1 - Math.min(1, el / max)); $('#st-time', s.el).textContent = fmtT(el);
    if (el >= max) stopRec(s);
  }
}
const fmtT = x => Math.floor(x / 60) + ':' + String(Math.floor(x % 60)).padStart(2, '0');
function drawItems(s, ctx) {
  for (const it of s.items) {
    ctx.save(); ctx.translate(it.x * W, it.y * H); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (it.type === 'emoji') { ctx.font = `${Math.round(110 * it.s)}px serif`; ctx.fillText(it.v, 0, 0); }
    else { const fs = Math.round(64 * it.s); ctx.font = `800 ${fs}px Vazirmatn,system-ui,sans-serif`; ctx.lineWidth = fs / 7; ctx.strokeStyle = it.c === '#111111' ? '#fff' : 'rgba(0,0,0,.75)'; ctx.lineJoin = 'round'; ctx.strokeText(it.v, 0, 0); ctx.fillStyle = it.c; ctx.fillText(it.v, 0, 0); }
    if (it.id === s.sel && s.stage === 'cam' && !s.recording) { const m = ctx.measureText(it.type === 'emoji' ? it.v : it.v), w = (it.type === 'emoji' ? 120 * it.s : m.width + 30), h = (it.type === 'emoji' ? 130 * it.s : 80 * it.s); ctx.setLineDash([12, 10]); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.strokeRect(-w / 2, -h / 2, w, h); }
    ctx.restore();
  }
}
const FXE = {stars: ['⭐', '✨', '💫'], hearts: ['💖', '💗', '❤️', '💕'], snow: ['❄️', '❄', '✦'], confetti: ['🎉', '🎊', '🟣', '🟡', '🔴', '🔵'], fire: ['🔥', '🔥', '✨']};
function particles(s, ctx, t) {
  s.parts = s.parts || [];
  for (const id of s.fx) { const e = EFFECTS.find(x => x.id === id); if (!e || !e.fx) continue; const em = FXE[e.fx];
    const rate = e.fx === 'snow' ? .5 : .35;
    if (Math.random() < rate) {
      const up = e.fx === 'hearts' || e.fx === 'fire';
      s.parts.push({e: em[Math.floor(Math.random() * em.length)], x: Math.random() * W, y: up ? H + 40 : -40, vx: (Math.random() - .5) * (e.fx === 'confetti' ? 6 : 2), vy: up ? -(2 + Math.random() * 4) : (2 + Math.random() * 4) * (e.fx === 'stars' ? .7 : 1), r: Math.random() * 6, vr: (Math.random() - .5) * .15, sz: 24 + Math.random() * 40, life: 1, twinkle: e.fx === 'stars'});
    }
  }
  const next = [];
  for (const p of s.parts) { p.x += p.vx; p.y += p.vy; p.r += p.vr; if (p.y < -60 || p.y > H + 60) continue; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = p.twinkle ? .5 + .5 * Math.sin(t * 6 + p.x) : .95; ctx.font = `${p.sz}px serif`; ctx.textAlign = 'center'; ctx.fillText(p.e, 0, 0); ctx.restore(); next.push(p); }
  s.parts = next.slice(-160);
}

/* ---- capture ---- */
function pickMime() {
  if (!window.MediaRecorder) return null;
  for (const m of ['video/mp4;codecs=avc1.42E01E,mp4a.40.2', 'video/mp4;codecs=avc1', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm']) { try { if (MediaRecorder.isTypeSupported(m)) return m; } catch {} }
  return '';
}
async function onShutter(s) {
  if (s.stage !== 'cam' || s.processing) return;
  if (s.mode === 'photo') { return takePhoto(s); }
  if (s.recording) return stopRec(s);
  if (s.srcKind === 'file' && s.vid) { return processVideoFile(s); }
  if (!s.src) return toast(T('camfail'));
  if (s.timer) { let n = s.timer; const cd = document.createElement('div'); cd.className = 'cd'; s.el.append(cd); await new Promise(res => { const iv = setInterval(() => { cd.textContent = n; if (n-- <= 0) { clearInterval(iv); cd.remove(); res(); } }, 1000); cd.textContent = n--; }); }
  startRec(s, s.stream ? s.stream.getAudioTracks() : []);
}
function startRec(s, audioTracks, cb) {
  const mime = pickMime();
  if (mime === null || !s.out.captureStream) return toast(T('norec'));
  const vs = s.out.captureStream(30); const tracks = [...vs.getVideoTracks(), ...audioTracks];
  const ms = new MediaStream(tracks); let rec;
  try { rec = new MediaRecorder(ms, mime ? {mimeType: mime, videoBitsPerSecond: 5e6} : {videoBitsPerSecond: 5e6}); } catch { try { rec = new MediaRecorder(ms); } catch { return toast(T('norec')); } }
  const chunks = []; rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
  rec.onstop = () => { s.recording = false; $('#rec', s.el).classList.remove('on'); const type = rec.mimeType || mime || 'video/mp4'; const blob = new Blob(chunks, {type}); (cb || finishVideo)(s, blob, type); };
  s.rec = rec; s.recording = true; s.recStart = performance.now(); rec.start(400); $('#rec', s.el).classList.add('on');
}
function stopRec(s) { try { if (s.rec && s.rec.state !== 'inactive') s.rec.stop(); } catch {} }
function finishVideo(s, blob, type) {
  if (blob.size < 1000) { toast(T('norec')); return; }
  s.blob = blob; s.blobKind = 'video'; s.mime = type; reviewStage(s);
}
function takePhoto(s) {
  s.out.toBlob(b => { if (!b) return; s.blob = b; s.blobKind = 'photo'; s.mime = 'image/jpeg'; reviewStage(s); }, 'image/jpeg', .9);
}
async function processVideoFile(s) {
  const v = s.vid; const mime = pickMime();
  if (mime === null) return toast(T('norec'));
  s.processing = true; s.maxDur = Math.min(60, (v.duration || 60) / s.speed);
  const pr = document.createElement('div'); pr.className = 'proc'; pr.innerHTML = `<div>${T('processing')}</div><div class="prog2"><i></i></div><button class="btn sec sm" data-x="orig">${T('orig')}</button>`; s.el.append(pr);
  let ac = null, tracks = [];
  try { ac = new (window.AudioContext || window.webkitAudioContext)(); await ac.resume(); const sr = ac.createMediaElementSource(v), d = ac.createMediaStreamDestination(); sr.connect(d); tracks = d.stream.getAudioTracks(); } catch {}
  v.muted = false; v.loop = false; v.playbackRate = s.speed; v.currentTime = 0;
  await v.play().catch(() => {});
  const bar = $('.prog2 i', pr);
  const tick = setInterval(() => { bar.style.width = Math.min(100, v.currentTime / Math.min(v.duration, 60 * s.speed) * 100) + '%'; if (v.ended || v.currentTime >= 60 * s.speed) stopRec(s); }, 200);
  v.onended = () => stopRec(s);
  $('[data-x=orig]', pr).onclick = () => { clearInterval(tick); s.processing = false; v.pause(); try { if (s.rec) { s.rec.onstop = null; s.rec.stop(); } } catch {} s.recording = false; pr.remove(); s.blob = s.file; s.blobKind = 'video'; s.mime = 'video/mp4'; s.original = true; reviewStage(s); };
  startRec(s, tracks, (ss, blob, type) => { clearInterval(tick); s.processing = false; pr.remove(); try { ac && ac.close(); } catch {} finishVideo(ss, blob, type); });
  if (!s.recording) { clearInterval(tick); s.processing = false; pr.remove(); }
}

/* ---- review + publish ---- */
function reviewStage(s) {
  s.stage = 'review'; closePanel(s);
  if (s.url) URL.revokeObjectURL(s.url);
  s.url = URL.createObjectURL(s.blob);
  $$('.stop,.rail,.bot,#toolbar', s.el).forEach(x => x.style.display = 'none');
  const r = document.createElement('div'); r.className = 'review'; s.rv = r;
  r.innerHTML = (s.blobKind === 'photo' ? `<img src="${s.url}" alt="">` : `<video src="${s.url}" playsinline autoplay loop muted></video>`) +
   `<div class="stop"><button class="round" data-r="back">←</button>${s.blobKind === 'video' ? `<button class="round" data-r="snd">🔇</button>` : '<span></span>'}</div>
    <div style="position:absolute;bottom:0;inset-inline:0;padding:16px 18px max(18px,env(safe-area-inset-bottom));display:flex;gap:10px;background:linear-gradient(transparent,rgba(0,0,0,.8))"><button class="btn sec" data-r="back" style="flex:1">${T('retake')}</button><button class="btn" data-r="next" style="flex:2">${T('next')}</button></div>`;
  s.el.append(r);
  r.onclick = e => { const b = e.target.closest('[data-r]'); if (!b) return; const a = b.dataset.r;
    if (a === 'back') backToCam(s);
    else if (a === 'snd') { const v = $('video', r); v.muted = !v.muted; b.textContent = v.muted ? '🔇' : '🔊'; }
    else if (a === 'next') publishStage(s); };
}
function backToCam(s) {
  if (s.rv) { s.rv.remove(); s.rv = null; } const pb = $('.pub', s.el); if (pb) pb.remove();
  $$('.stop,.rail,.bot', s.el).forEach(x => x.style.display = ''); s.stage = 'cam'; s.blob = null; s.original = false; s.processing = false;
  $('#st-time', s.el).textContent = ''; $('#ring', s.el).style.strokeDashoffset = 232.5;
  if (s.srcKind === 'cam' && (!s.stream || !s.stream.active)) startCamera(s);
  else if (s.vid && s.srcKind === 'file') { s.vid.muted = true; s.vid.loop = true; s.vid.playbackRate = 1; s.vid.play().catch(() => {}); }
}
function publishStage(s) {
  s.stage = 'pub'; let vis = 'public';
  const p = document.createElement('div'); p.className = 'pub';
  const webm = s.blobKind === 'video' && /webm/.test(s.mime);
  p.innerHTML = `<div class="row" style="align-items:flex-start"><div class="prevth">${s.blobKind === 'photo' ? `<img src="${s.url}">` : `<video src="${s.url}" muted loop autoplay playsinline></video>`}</div><textarea id="pcap" rows="6" maxlength="300" placeholder="${T('caption')}" style="flex:1"></textarea></div>
   <div><label class="k">${T('vis')}</label><div class="chips" id="pvis">${[['public', T('public')], ['followers', T('followers')], ['private', T('private')]].map(([k, n], i) => `<button data-v="${k}" class="${i ? '' : 'on'}">${n}</button>`).join('')}</div></div>
   ${webm ? `<div class="err">${T('webm')}</div>` : ''}<div class="prog2" id="pp" hidden><i></i></div><div style="flex:1"></div>
   <div class="row"><button class="btn sec" id="pback" style="flex:1">←</button><button class="btn" id="pgo" style="flex:3">${T('publish')}</button></div>`;
  s.el.append(p);
  $$('#pvis button', p).forEach(b => b.onclick = () => { vis = b.dataset.v; $$('#pvis button', p).forEach(x => x.classList.toggle('on', x === b)); });
  $('#pback', p).onclick = () => { p.remove(); s.stage = 'review'; };
  $('#pgo', p).onclick = async () => {
    const go = $('#pgo', p); go.disabled = true; go.textContent = T('publishing'); $('#pp', p).hidden = false; const bar = $('#pp i', p); let w = 5; bar.style.width = w + '%'; const iv = setInterval(() => { w = Math.min(90, w + 4); bar.style.width = w + '%'; }, 400);
    try {
      const id = crypto.randomUUID(), photo = s.blobKind === 'photo', ext = photo ? 'jpg' : (/webm/.test(s.mime) ? 'webm' : 'mp4');
      const ct = photo ? 'image/jpeg' : (ext === 'webm' ? 'video/webm' : 'video/mp4');
      const url = await upload(s.blob, `${session.userID}/${id}.${ext}`, ct);
      if (!photo) { try { const v = $('.prevth video', p), c = document.createElement('canvas'), k = Math.min(1, 540 / (v.videoWidth || 720)); c.width = Math.round((v.videoWidth || 720) * k); c.height = Math.round((v.videoHeight || 1280) * k); if (v.currentTime < .1) { try { v.currentTime = .3; await new Promise(r => { v.onseeked = r; setTimeout(r, 600); }); } catch {} } c.getContext('2d').drawImage(v, 0, 0, c.width, c.height); const tb = await new Promise(r => c.toBlob(r, 'image/jpeg', .8)); if (tb) await upload(tb, `${session.userID}/${id}-thumb.jpg`, 'image/jpeg'); } catch (e) { console.warn('thumb', e); } }
      await ins('posts', {id, author_id: session.userID, kind: photo ? 'photo' : 'video', media_url: url, caption: $('#pcap', p).value.trim(), effect: 'none', visibility: vis, allow_download: 'everyone', allow_share: 'everyone', allow_comments: 'everyone'});
      clearInterval(iv); bar.style.width = '100%'; toast(T('done')); closeStudio(); S.all = null; S.tab = 'home'; S.overlay = []; shell();
    } catch (e) { clearInterval(iv); fail(e); go.disabled = false; go.textContent = T('publish'); $('#pp', p).hidden = true; }
  };
}

window.Studio = {open: openStudio, close: closeStudio, _filters: FILTERS, _s: () => R};
})();
