/* Games (same as the iOS app): daily reward, lucky wheel, gift catcher, memory match.
   Coins are granted by the existing server function claim_reward (daily caps are enforced on the server). */
(() => {
const GT = {
 fa:{math:'آزمون ریاضی',mathd:'۱۰ سؤال چهارگزینه‌ای با جواب',right:'درست! ✅',wrong:'نادرست ❌',ans:'پاسخ درست',q:'سؤال',time:'زمان تمام شد',games:'بازی‌ها',daily:'جایزهٔ روزانه',claim:'دریافت',claimed:'دریافت شد ✓',wheel:'چرخ شانس',wheeld:'هر روز یک چرخش رایگان',catch:'گرفتن هدیه‌ها',catchd:'هدیه‌ها را بگیر، از بمب‌ها دوری کن',mem:'بازی حافظه',memd:'جفت‌ها را پیدا کن',cap:'جایزهٔ بازی‌ها روزانه حداکثر ۳۰ سکه است.',spin:'بچرخان',spun:'امروز چرخاندی. فردا برگرد!',score:'امتیاز',over:'پایان بازی',got:'جایزه',capd:'سقف امروز پر شد',again:'دوباره',close:'بستن',moves:'حرکت',won:'تبریک!',coins:'سکه'},
 en:{math:'Math quiz',mathd:'10 multiple-choice questions with answers',right:'Correct! ✅',wrong:'Wrong ❌',ans:'Correct answer',q:'Question',time:'Time is up',games:'Games',daily:'Daily reward',claim:'Claim',claimed:'Claimed ✓',wheel:'Lucky wheel',wheeld:'One free spin every day',catch:'Gift catcher',catchd:'Catch the gifts, dodge the bombs',mem:'Memory match',memd:'Find all the pairs',cap:'Game rewards are limited to 30 coins per day.',spin:'Spin',spun:'You already spun today. Come back tomorrow!',score:'Score',over:'Game over',got:'Reward',capd:'Daily limit reached',again:'Play again',close:'Close',moves:'Moves',won:'Well done!',coins:'coins'},
 de:{math:'Mathe-Quiz',mathd:'10 Fragen mit Antwortmöglichkeiten',right:'Richtig! ✅',wrong:'Falsch ❌',ans:'Richtige Antwort',q:'Frage',time:'Zeit abgelaufen',games:'Spiele',daily:'Tagesbelohnung',claim:'Abholen',claimed:'Abgeholt ✓',wheel:'Glücksrad',wheeld:'Jeden Tag ein Gratis-Dreh',catch:'Geschenke fangen',catchd:'Fang die Geschenke, weich den Bomben aus',mem:'Memory',memd:'Finde alle Paare',cap:'Spielbelohnungen sind auf 30 Coins pro Tag begrenzt.',spin:'Drehen',spun:'Heute schon gedreht. Komm morgen wieder!',score:'Punkte',over:'Spiel vorbei',got:'Belohnung',capd:'Tageslimit erreicht',again:'Nochmal',close:'Schließen',moves:'Züge',won:'Super!',coins:'Coins'}
};
const g = k => (GT[lang] || GT.en)[k] || k;
const day = () => new Date().toISOString().slice(0, 10);
const ls = {get: k => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }};
async function reward(kind, amount) {
  const before = Number(S.me.coins) || 0;
  try { const bal = Number(await rpc('claim_reward', {p_kind: kind, p_amount: amount})); S.me.coins = bal; return Math.max(0, bal - before); } catch (e) { fail(e); return 0; }
}
const css = `#games{position:absolute;inset:0;z-index:30;background:var(--bg);display:flex;flex-direction:column;overflow:hidden}
#games .gcard{display:flex;align-items:center;gap:14px;padding:14px;margin-bottom:12px;cursor:pointer}#games .gcard .e{font-size:38px}#games .gcard .t{flex:1}
#games .wrap{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:16px;position:relative;overflow:hidden}
#games canvas{touch-action:none;max-width:100%;border-radius:20px;background:linear-gradient(#33105a,#000)}
#games .wheel{position:relative;width:min(80vw,320px);aspect-ratio:1;border-radius:50%;border:10px solid #ffc94d;box-shadow:0 0 30px rgba(255,200,60,.55);transition:transform 4s cubic-bezier(.15,.7,.1,1);background:conic-gradient(var(--acc) 0 45deg,#6a3df0 0 90deg,var(--acc) 0 135deg,#6a3df0 0 180deg,var(--acc) 0 225deg,#6a3df0 0 270deg,var(--acc) 0 315deg,#6a3df0 0 360deg)}
#games .wheel b{position:absolute;left:50%;top:50%;font-size:20px;color:#fff;transform-origin:0 0}
#games .ptr{font-size:34px;margin-bottom:-26px;z-index:2;filter:drop-shadow(0 2px 6px #000)}
#games .mem{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;width:min(92vw,380px)}
#games .mc{aspect-ratio:3/4;border-radius:14px;background:var(--g);color:#fff;font-size:34px;display:flex;align-items:center;justify-content:center;transition:transform .3s;transform-style:preserve-3d}
#games .mc.up{background:#fff}#games .mc.ok{background:#d9ffe8}
#games .res{position:absolute;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(6px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;z-index:5;text-align:center;color:#fff}`;
function inject() { if (document.getElementById('games-css')) return; const s = document.createElement('style'); s.id = 'games-css'; s.textContent = css; document.head.append(s); }
let el, stop = null;
function close() { if (stop) stop(); stop = null; if (el) el.remove(); el = null; }
function frame(title, body, back) { el.innerHTML = `<div class="bar"><button class="back" data-g="${back || 'close'}">${L[lang].dir === 'rtl' ? '→' : '←'}</button><b>${title}</b><span class="coinpill">🪙 <span id="gc">${fmt(S.me.coins)}</span></span></div>${body}`; }
const upd = () => { const c = $('#gc', el); if (c) c.textContent = fmt(S.me.coins); };
function res(html) { const r = document.createElement('div'); r.className = 'res'; r.innerHTML = html; $('.wrap', el).append(r); return r; }

function open() {
  inject(); close(); el = document.createElement('div'); el.id = 'games'; root.append(el); hub();
  el.onclick = e => { const b = e.target.closest('[data-g]'); if (!b) return; const a = b.dataset.g; if (stop) { stop(); stop = null; } if (a === 'close') close(); else if (a === 'hub') hub(); else if (a === 'daily') daily(); else ({wheel, catcher, memory, math})[a](); };
}
function hub() {
  const claimed = ls.get('lg.daily') === day();
  frame(g('games'), `<div class="view"><div class="glass gcard" data-g="daily" style="${claimed ? 'opacity:.7' : ''}"><span class="e">🎁</span><div class="t"><b>${g('daily')}</b><div class="mut small">${'🔥'.repeat(Math.min(7, +ls.get('lg.streak') || 0))}</div></div><span class="btn sm" style="pointer-events:none">${claimed ? g('claimed') : g('claim')}</span></div>
   <div class="glass gcard" data-g="wheel"><span class="e">🎡</span><div class="t"><b>${g('wheel')}</b><div class="mut small">${g('wheeld')}</div></div></div>
   <div class="glass gcard" data-g="catcher"><span class="e">🧺</span><div class="t"><b>${g('catch')}</b><div class="mut small">${g('catchd')}</div></div></div>
   <div class="glass gcard" data-g="math"><span class="e">🧮</span><div class="t"><b>${g('math')}</b><div class="mut small">${g('mathd')}</div></div></div>
   <div class="glass gcard" data-g="memory"><span class="e">🃏</span><div class="t"><b>${g('mem')}</b><div class="mut small">${g('memd')}</div></div></div>
   <div class="mut small" style="text-align:center">${g('cap')}</div></div>`);
}
async function daily() {
  if (ls.get('lg.daily') === day()) return toast(g('claimed'));
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10), st = ls.get('lg.dlast') === y ? (+ls.get('lg.streak') || 0) + 1 : 1;
  const got = await reward('daily', Math.min(4 + st, 12)); ls.set('lg.daily', day()); ls.set('lg.dlast', day()); ls.set('lg.streak', String(st));
  toast(got > 0 ? '+' + got + ' 🪙' : g('capd')); if (got > 0) giftRain('🪙', '+' + got); hub();
}

/* wheel */
const PR = [5, 10, 2, 20, 5, 50, 2, 10], WT = [22, 14, 28, 6, 22, 1, 28, 14];
function wheel() {
  const done = ls.get('lg.spin') === day();
  frame(g('wheel'), `<div class="wrap"><div class="ptr">🔻</div><div class="wheel" id="wh">${PR.map((p, i) => `<b style="transform:rotate(${i * 45 + 22.5 - 90}deg) translate(88px,-10px)">${p}</b>`).join('')}</div><button class="btn" id="sp" style="width:auto;padding-inline:40px" ${done ? 'disabled' : ''}>${done ? g('spun') : '🎡 ' + g('spin')}</button></div>`, 'hub');
  const wh = $('#wh', el); let rot = 0;
  $('#sp', el).onclick = async () => {
    const b = $('#sp', el); b.disabled = true; let roll = Math.random() * WT.reduce((a, c) => a + c, 0), idx = 0; for (let i = 0; i < WT.length; i++) { if (roll < WT[i]) { idx = i; break; } roll -= WT[i]; }
    rot += 360 * 6 + (360 - (idx * 45 + 22.5)) - (rot % 360); wh.style.transform = `rotate(${rot}deg)`;
    await new Promise(r => setTimeout(r, 4200)); if (!el) return; ls.set('lg.spin', day()); const got = await reward('spin', PR[idx]); upd();
    const r = res(`<div style="font-size:60px">🎉</div><h1>+${got || 0} 🪙</h1><div class="mut">${got ? '' : g('capd')}</div><button class="btn" data-g="hub" style="width:auto;padding-inline:30px">${g('close')}</button>`); if (got) giftRain('🪙', '+' + got, got >= 20);
  };
}

/* catcher */
function catcher() {
  frame(g('catch'), `<div class="wrap"><div class="small mut" id="hud"></div><canvas id="cv"></canvas></div>`, 'hub');
  const w = $('.wrap', el), cv = $('#cv', el), W = Math.min(w.clientWidth - 32, 380), H = Math.min(w.clientHeight - 70, 620); cv.width = W; cv.height = H; cv.style.width = W + 'px'; cv.style.height = H + 'px'; const x = cv.getContext('2d');
  let items = [], score = 0, left = 30, bx = .5, sp = 0, last = performance.now(), over = false, raf;
  const mv = e => { const r = cv.getBoundingClientRect(); bx = Math.min(.95, Math.max(.05, (e.clientX - r.left) / r.width)); }; cv.onpointerdown = cv.onpointermove = mv;
  const loop = now => {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (!over) { left -= dt; sp += dt; if (left <= 0) { left = 0; over = true; end(); }
      if (sp > .55) { sp = 0; const good = Math.random() > .22; items.push({x: .08 + Math.random() * .84, y: -.05, v: .35 + Math.random() * .35, e: good ? ['🎁', '🌹', '👑', '💎', '❤️'][Math.random() * 5 | 0] : '💣', good}); }
      items = items.filter(i => { i.y += i.v * dt; if (i.y > .84 && i.y < .95 && Math.abs(i.x - bx) < .14) { score = Math.max(0, score + (i.good ? 1 : -3)); if (navigator.vibrate) navigator.vibrate(i.good ? 8 : 40); return false; } return i.y < 1.05; }); }
    x.clearRect(0, 0, W, H); x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = '34px serif'; items.forEach(i => x.fillText(i.e, i.x * W, i.y * H)); x.font = '58px serif'; x.fillText('🧺', bx * W, H * .9);
    $('#hud', el).textContent = `${g('score')}: ${score}  ·  ${Math.ceil(left)}s`; raf = requestAnimationFrame(loop);
  };
  async function end() { const got = await reward('game', Math.floor(score / 3)); upd(); res(`<h1>${g('over')}</h1><div>${g('score')}: ${score}</div><div style="color:#ffd24d">${got > 0 ? g('got') + ' +' + got + ' 🪙' : g('capd')}</div><div class="row"><button class="btn sm" data-g="catcher">${g('again')}</button><button class="btn sm sec" data-g="hub">${g('close')}</button></div>`); }
  raf = requestAnimationFrame(loop); stop = () => { over = true; cancelAnimationFrame(raf); };
}

/* memory */
function memory() {
  const sy = ['🌹', '👑', '🚀', '🎁', '💎', '🦁', '🍩', '🏎️'], cards = [...sy, ...sy].sort(() => Math.random() - .5); let up = [], ok = new Set(), moves = 0, lock = false;
  frame(g('mem'), `<div class="wrap"><div class="small mut" id="mv">${g('moves')}: 0</div><div class="mem">${cards.map((c, i) => `<button class="mc" data-i="${i}">?</button>`).join('')}</div></div>`, 'hub');
  $$('.mc', el).forEach(b => b.onclick = async () => {
    const i = +b.dataset.i; if (lock || ok.has(i) || up.includes(i)) return; up.push(i); b.textContent = cards[i]; b.classList.add('up'); if (navigator.vibrate) navigator.vibrate(6);
    if (up.length < 2) return; moves++; $('#mv', el).textContent = g('moves') + ': ' + moves; const [a, c] = up;
    if (cards[a] === cards[c]) { ok.add(a); ok.add(c); [a, c].forEach(k => { $$('.mc', el)[k].classList.add('ok'); }); up = [];
      if (ok.size === cards.length) { const got = await reward('game', moves <= 12 ? 8 : moves <= 18 ? 5 : 2); upd(); res(`<div style="font-size:56px">🏆</div><h1>${g('won')}</h1><div>${g('moves')}: ${moves}</div><div style="color:#ffd24d">${got > 0 ? g('got') + ' +' + got + ' 🪙' : g('capd')}</div><div class="row"><button class="btn sm" data-g="memory">${g('again')}</button><button class="btn sm sec" data-g="hub">${g('close')}</button></div>`); } }
    else { lock = true; await new Promise(r => setTimeout(r, 800)); if (!el) return; [a, c].forEach(k => { const e = $$('.mc', el)[k]; e.textContent = '?'; e.classList.remove('up'); }); up = []; lock = false; }
  });
}

/* math quiz */
function mkQ(n) {
  const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1)); let t, a, b, c, txt;
  const lvl = n < 3 ? 0 : n < 6 ? 1 : n < 8 ? 2 : 3;
  if (lvl === 0) { a = r(2, 20); b = r(2, 20); if (Math.random() < .5) { txt = `${a} + ${b}`; c = a + b; } else { if (b > a) [a, b] = [b, a]; txt = `${a} − ${b}`; c = a - b; } }
  else if (lvl === 1) { a = r(3, 12); b = r(3, 12); txt = `${a} × ${b}`; c = a * b; }
  else if (lvl === 2) { b = r(3, 12); c = r(3, 15); a = b * c; txt = `${a} ÷ ${b}`; }
  else { a = r(2, 9); b = r(2, 9); const k = r(5, 30); if (Math.random() < .5) { txt = `${a} × ${b} + ${k}`; c = a * b + k; } else { txt = `${k + a * b} − ${a} × ${b}`; c = k; } }
  const o = new Set([c]); while (o.size < 4) { const d = r(1, 10) * (Math.random() < .5 ? -1 : 1); if (c + d >= 0) o.add(c + d); }
  return {txt, c, o: [...o].sort(() => Math.random() - .5)};
}
function math() {
  let i = 0, ok = 0, tm, left = 15;
  const show = () => {
    const q = mkQ(i); left = 15;
    frame(g('math'), `<div class="wrap"><div class="mut small">${g('q')} ${i + 1}/10 · ✅ ${ok}</div><div style="width:min(88vw,360px);height:6px;border-radius:3px;background:var(--card2);overflow:hidden"><i id="tb" style="display:block;height:100%;width:100%;background:var(--g);transition:width 1s linear"></i></div><h1 style="font-size:46px;direction:ltr">${q.txt} = ?</h1><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;width:min(88vw,360px)">${q.o.map(v => `<button class="btn sec" style="font-size:24px;padding:18px" data-v="${v}">${v}</button>`).join('')}</div><div id="fb" style="min-height:48px;font-weight:800;font-size:18px;text-align:center"></div></div>`, 'hub');
    let done = false; const fin = (v, why) => { if (done) return; done = true; clearInterval(tm); const good = v === q.c; if (good) ok++; $$('[data-v]', el).forEach(b => { b.disabled = true; if (+b.dataset.v === q.c) b.style.background = '#1faa59', b.style.color = '#fff'; else if (b.dataset.v == v) b.style.background = '#c0243d', b.style.color = '#fff'; });
      $('#fb', el).innerHTML = (good ? g('right') : (why || g('wrong')) + `<div class="mut small">${g('ans')}: ${q.c}</div>`); if (navigator.vibrate) navigator.vibrate(good ? 10 : [30, 40, 30]); setTimeout(() => { if (!el) return; ++i < 10 ? show() : end(); }, good ? 900 : 1700); };
    $$('[data-v]', el).forEach(b => b.onclick = () => fin(+b.dataset.v));
    setTimeout(() => { const t = $('#tb', el); if (t) t.style.width = '0'; }, 30);
    tm = setInterval(() => { if (--left <= 0) fin(null, g('time')); }, 1000);
  };
  async function end() { const got = await reward('game', Math.round(ok * .8)); upd(); res(`<div style="font-size:56px">${ok >= 8 ? '🏆' : ok >= 5 ? '👏' : '💪'}</div><h1>${ok}/10</h1><div style="color:#ffd24d">${got > 0 ? g('got') + ' +' + got + ' 🪙' : g('capd')}</div><div class="row"><button class="btn sm" data-g="math">${g('again')}</button><button class="btn sm sec" data-g="hub">${g('close')}</button></div>`); }
  show(); stop = () => clearInterval(tm);
}
window.Games = {open, close};
})();
