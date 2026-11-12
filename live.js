/* Livegift Live (web): LiveKit video+audio, chat, hearts, gifts, guests on stage, live match.
   Uses only the existing server functions (livekit-token edge function + live RPCs). No database changes. */
(() => {
const TL = {
 fa:{live:'لایو',golive:'شروع لایو',titlePh:'عنوان لایو…',start:'شروع زنده',end:'پایان',endq:'پایان لایو؟',nolive:'الان لایوی در جریان نیست.',say:'پیام بده…',send:'ارسال',join:'درخواست لایو',vid:'با تصویر',voice:'فقط صدا',waiting:'در انتظار تأیید میزبان…',onstage:'روی صحنه‌ای',requests:'درخواست‌ها',accept:'قبول',decline:'رد',remove:'حذف',match:'مچ',random:'مچ تصادفی',searching:'در حال جستجو…',nobody:'الان کسی برای مچ پیدا نشد.',cands:'میزبان‌های آنلاین',incoming:'درخواست‌های مچ',ready:'آماده‌ام',leave:'خروج از مچ',report:'گزارش لایو',reported:'گزارش ارسال شد',ended:'لایو تمام شد',noperm:'اجازهٔ دوربین و میکروفون لازم است.',flip:'چرخش',gift:'هدیه',draw:'مساوی!',won:'برنده',request:'مچ بده',mute:'بی‌صدا',unmute:'صدا',kick:'اخراج',ban:'بلاک',wait:'منتظر حریف…',viewers:'بیننده',full:'پر',follow:'دنبال کردن',summ:'خلاصهٔ لایو',dur:'مدت',peak:'بیشترین بیننده',likes:'لایک',gifts:'سکهٔ هدیه',done:'تمام',swipe:'بالا بکش: لایو بعدی',talk:'گفتگوی قبل از مچ',tapsound:'برای شنیدن صدا بزن',noreq:'درخواستی نیست.',stageoff:'خروج از صحنه',livefail:'اتصال لایو ممکن نشد',guests:'مهمان‌ها'},
 en:{live:'Live',golive:'Go live',titlePh:'Live title…',start:'Go live now',end:'End',endq:'End the live?',nolive:'Nobody is live right now.',say:'Say something…',send:'Send',join:'Ask to join',vid:'With video',voice:'Voice only',waiting:'Waiting for the host…',onstage:'You are on stage',requests:'Requests',accept:'Accept',decline:'Decline',remove:'Remove',match:'Match',random:'Random match',searching:'Searching…',nobody:'Nobody to match with right now.',cands:'Hosts online',incoming:'Match requests',ready:'I am ready',leave:'Leave match',report:'Report live',reported:'Report sent',ended:'The live has ended',noperm:'Camera and microphone access is needed.',flip:'Flip',gift:'Gift',draw:'Draw!',won:'Winner',request:'Challenge',mute:'Mute',unmute:'Unmute',kick:'Kick',ban:'Block',wait:'Waiting for the opponent…',viewers:'viewers',full:'Full',follow:'Follow',summ:'Live summary',dur:'Duration',peak:'Peak viewers',likes:'Likes',gifts:'Gift coins',done:'Done',swipe:'Swipe up: next live',talk:'Pre-match talk',tapsound:'Tap to hear sound',noreq:'No requests.',stageoff:'Leave stage',livefail:'Could not connect to the live',guests:'Guests'},
 de:{live:'Live',golive:'Live starten',titlePh:'Live-Titel…',start:'Jetzt live gehen',end:'Beenden',endq:'Live beenden?',nolive:'Gerade ist niemand live.',say:'Schreib etwas…',send:'Senden',join:'Beitritt anfragen',vid:'Mit Video',voice:'Nur Stimme',waiting:'Warte auf den Host…',onstage:'Du bist auf der Bühne',requests:'Anfragen',accept:'Annehmen',decline:'Ablehnen',remove:'Entfernen',match:'Match',random:'Zufalls-Match',searching:'Suche läuft…',nobody:'Gerade niemand für ein Match.',cands:'Hosts online',incoming:'Match-Anfragen',ready:'Ich bin bereit',leave:'Match verlassen',report:'Live melden',reported:'Meldung gesendet',ended:'Das Live ist beendet',noperm:'Kamera- und Mikrofonzugriff erforderlich.',flip:'Wenden',gift:'Geschenk',draw:'Unentschieden!',won:'Sieger',request:'Herausfordern',mute:'Stumm',unmute:'Ton an',kick:'Rauswerfen',ban:'Sperren',wait:'Warte auf Gegner…',viewers:'Zuschauer',full:'Voll',follow:'Folgen',summ:'Live-Zusammenfassung',dur:'Dauer',peak:'Max. Zuschauer',likes:'Likes',gifts:'Geschenk-Coins',done:'Fertig',swipe:'Hochwischen: nächstes Live',talk:'Gespräch vor dem Match',tapsound:'Tippen für Ton',noreq:'Keine Anfragen.',stageoff:'Bühne verlassen',livefail:'Live-Verbindung fehlgeschlagen',guests:'Gäste'}
};
const l_ = k => (TL[lang] || TL.en)[k] || k;
const LK_URLS = ['https://cdn.jsdelivr.net/npm/livekit-client@2.5.7/dist/livekit-client.umd.min.js', 'https://unpkg.com/livekit-client@2.5.7/dist/livekit-client.umd.min.js', 'https://cdn.jsdelivr.net/npm/livekit-client@2.9.1/dist/livekit-client.umd.min.js', 'https://cdn.jsdelivr.net/npm/livekit-client@2.1.5/dist/livekit-client.umd.min.js'];
let lkP = null;
const loadLK = () => lkP ||= new Promise((res, rej) => { let i = 0; const next = () => { if (window.LivekitClient) return res(window.LivekitClient); if (i >= LK_URLS.length) { lkP = null; return rej(new Error(l_('livefail'))); } const s = document.createElement('script'); s.src = LK_URLS[i++]; s.onload = () => window.LivekitClient ? res(window.LivekitClient) : next(); s.onerror = () => { s.remove(); next(); }; document.head.append(s); }; next(); });
const ticket = (liveId, extra = {}) => raw('POST', 'functions/v1/livekit-token', {body: {live_id: liveId, ...extra}});
const LC = k => window.LivekitClient;
let s = null; // current session

const css = `
#live{position:absolute;inset:0;z-index:30;background:#000;display:flex;flex-direction:column;overflow:hidden;color:#fff}
#live .lv-stage{position:absolute;inset:0;display:flex;flex-direction:column;background:#000}
#live .pane{position:relative;flex:1;min-height:0;overflow:hidden;background:#0b0814}
#live .pane video{width:100%;height:100%;object-fit:cover;display:block}
#live .pane.mirror video{transform:scaleX(-1)}
#live .pane .nm{position:absolute;bottom:8px;inset-inline-start:10px;font-weight:700;font-size:13px;text-shadow:0 1px 5px #000}
#live .off{position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:radial-gradient(circle,#2a1250,#0b0814)}
#live .pane.camoff .off{display:flex}#live .pane.camoff video{opacity:0}
#live .lv-top{position:absolute;top:0;inset-inline:0;padding:max(12px,env(safe-area-inset-top)) 14px 10px;display:flex;align-items:center;gap:10px;z-index:4;background:linear-gradient(rgba(0,0,0,.55),transparent)}
#live .pill{background:rgba(0,0,0,.45);backdrop-filter:blur(10px);border-radius:16px;padding:5px 11px;font-size:13px;font-weight:700;display:inline-flex;gap:6px;align-items:center}
#live .redot{background:#ff2d55;border-radius:6px;padding:2px 8px;font-size:12px;font-weight:800;animation:glowp 1.6s infinite}
#live .guests{position:absolute;top:calc(max(12px,env(safe-area-inset-top)) + 52px);inset-inline-end:10px;display:flex;flex-direction:column;gap:8px;z-index:4;max-height:55%;overflow-y:auto;scrollbar-width:none}
#live .guests .pane{flex:none;width:92px;height:128px;border-radius:14px;border:1.5px solid rgba(255,255,255,.35)}
#live .chatl{position:absolute;inset-inline-start:12px;bottom:calc(76px + env(safe-area-inset-bottom));width:74%;max-height:36%;overflow-y:auto;display:flex;flex-direction:column;gap:5px;z-index:4;scrollbar-width:none;-webkit-mask:linear-gradient(transparent,#000 25%);mask:linear-gradient(transparent,#000 25%)}#live .chatl::-webkit-scrollbar{display:none}#live .chatl>div:first-child{margin-top:auto}#live.host .chatl{bottom:calc(132px + env(safe-area-inset-bottom))}#live .chatl .sys{background:none;color:#d8c8ff;font-size:12.5px;padding:2px 4px}
#live .chatl div{background:rgba(0,0,0,.38);backdrop-filter:blur(6px);border-radius:14px;padding:4px 11px;font-size:13.5px;width:fit-content;max-width:100%;word-break:break-word;flex:none}
#live .chatl b{color:#ffb3d1;margin-inline-end:6px}#live .chatl .g{background:linear-gradient(135deg,rgba(255,61,129,.55),rgba(138,92,255,.55))}
#live .lv-bar{position:absolute;inset-inline:0;bottom:0;padding:10px 12px;padding-bottom:max(12px,env(safe-area-inset-bottom));display:flex;gap:8px;align-items:center;z-index:5}
#live .lv-bar input{flex:1;background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.2);border-radius:22px;padding:10px 16px;color:#fff}
#live .rb{width:44px;height:44px;border-radius:50%;background:rgba(0,0,0,.5);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:20px;flex:none;position:relative;transition:transform .2s cubic-bezier(.3,1.6,.5,1)}
#live .rb:active{transform:scale(.88)}#live .rb.on{background:var(--g)}#live .rb.red{background:#e0213f}
#live .rb i{position:absolute;top:-3px;inset-inline-end:-3px;background:var(--acc);border-radius:9px;min-width:17px;height:17px;font-size:10px;font-style:normal;display:flex;align-items:center;justify-content:center}
#live .hearts{position:absolute;inset-inline-end:14px;bottom:80px;width:60px;height:60%;pointer-events:none;z-index:3}
#live .hrt{position:absolute;bottom:0;font-size:28px;animation:hup 2.4s ease-out forwards}
@keyframes hup{to{transform:translate(var(--dx),-52vh) scale(1.3);opacity:0}}
#live .score{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);z-index:4;display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none}
#live .sbar{width:88%;height:26px;border-radius:13px;overflow:hidden;display:flex;background:#333;border:1px solid rgba(255,255,255,.3);font-size:12px;font-weight:800}
#live .sbar span{display:flex;align-items:center;padding:0 10px;transition:width .6s}#live .sbar .a{background:linear-gradient(90deg,#ff3d81,#ff7aa8)}#live .sbar .b{background:linear-gradient(90deg,#6a7bff,#18d4ff);justify-content:flex-end}
#live .clock{background:rgba(0,0,0,.7);border-radius:14px;padding:3px 14px;font-weight:900;font-size:18px}
#live .center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px;text-align:center;z-index:6;background:rgba(0,0,0,.7)}
#live .pre{position:absolute;inset:0;z-index:5;display:flex;flex-direction:column;justify-content:flex-end;gap:12px;padding:20px;padding-bottom:max(24px,env(safe-area-inset-bottom));background:linear-gradient(transparent 40%,rgba(0,0,0,.75))}
#live .pre input{background:rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.25);border-radius:16px;padding:14px;color:#fff;font-size:16px}
.lvlist{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.lvcard{position:relative;aspect-ratio:3/4;border-radius:20px;overflow:hidden;background:linear-gradient(160deg,#2a1250,#120a22);display:flex;flex-direction:column;justify-content:flex-end;padding:12px;cursor:pointer}
.lvcard .av.big2{position:absolute;top:30%;left:50%;transform:translate(-50%,-50%);width:84px;height:84px;font-size:32px}
.lvcard .redot{position:absolute;top:10px;inset-inline-start:10px;background:#ff2d55;border-radius:6px;padding:2px 8px;font-size:11px;font-weight:800;color:#fff}
.lvcard .vw{position:absolute;top:10px;inset-inline-end:10px;font-size:12px;background:rgba(0,0,0,.45);border-radius:10px;padding:2px 8px;color:#fff}
.lvrow{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--line)}.lvrow b{flex:1}

#live .lv-bar.two{flex-direction:column;align-items:stretch}#live .lv-bar .r1,#live .lv-bar .r2{display:flex;gap:6px;align-items:center}#live .lv-bar .r2{justify-content:space-between}
#live .req{position:absolute;top:calc(max(12px,env(safe-area-inset-top)) + 54px);inset-inline:12px;z-index:8;background:rgba(20,12,40,.92);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.2);border-radius:18px;padding:10px 12px;display:flex;gap:8px;align-items:center;animation:pop2 .3s cubic-bezier(.3,1.6,.5,1)}#live .req b{flex:1}
#live .lv-stage.match{top:calc(max(12px,env(safe-area-inset-top)) + 100px);bottom:auto;height:44%;flex-direction:row;gap:2px;border-radius:14px;overflow:hidden}#live .lv-stage.match .pane{min-width:0}
#live.inmatch .guests{display:none}#live.inmatch{background:radial-gradient(circle at 50% 30%,#2a1250,#05030a)}
#live .score{top:calc(max(12px,env(safe-area-inset-top)) + 52px);transform:none}
#live .vs{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:5;font-weight:900;font-size:22px;font-style:italic;background:#000;border:2px solid #fff;border-radius:50%;width:42px;height:42px;display:flex;align-items:center;justify-content:center}
`;
function injectCSS() { if (document.getElementById('live-css')) return; const st = document.createElement('style'); st.id = 'live-css'; st.textContent = css; document.head.append(st); }

/* ---------- list ---------- */
async function list() {
  injectCSS(); closeLive();
  const d = document.createElement('div'); d.id = 'live'; d.style.background = 'var(--bg)'; d.style.color = 'var(--fg)';
  d.innerHTML = `<div class="bar"><button class="back" data-lv="close">${L[lang].dir === 'rtl' ? '→' : '←'}</button><b>🔴 ${l_('live')}</b><button class="btn sm" data-lv="go">${l_('golive')}</button></div><div class="view" id="lvl">${spin}</div>`;
  root.append(d); s = {el: d, timers: [], kind: 'list'};
  d.onclick = e => { const b = e.target.closest('[data-lv]'); if (!b) return; if (b.dataset.lv === 'close') closeLive(); else if (b.dataset.lv === 'go') host(); else if (b.dataset.lv === 'watch') { const rows = s.rows, i = rows.findIndex(x => x.id === b.dataset.id); watch(rows[i], rows, i); } };
  try {
    const since = new Date(Date.now() - 120000).toISOString();
    const rows = await sel('lives', {select: 'id,host_id,title,emoji,viewers,started_at,host:profiles!host_id(username,avatar_url)', status: 'eq.live', updated_at: 'gte.' + since, order: 'viewers.desc,started_at.desc', limit: '40'});
    s.rows = rows; const box = $('#lvl', d);
    box.innerHTML = rows.length ? `<div class="lvlist">${rows.map(r => `<div class="lvcard" data-lv="watch" data-id="${r.id}"><span class="redot">LIVE</span><span class="vw">👁 ${fmt(r.viewers)}</span>${avatar(r.host && r.host.avatar_url, r.host && r.host.username, 'big2')}<b>@${esc(r.host ? r.host.username : '')}</b><div class="small" style="opacity:.8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(r.title || '')}</div></div>`).join('')}</div>` : `<div class="empty">${l_('nolive')}</div>`;
  } catch (e) { $('#lvl', d).innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
}

function closeLive() {
  if (!s) return;
  (s.timers || []).forEach(clearInterval);
  try { s.room && s.room.disconnect(); } catch {} try { s.opp && s.opp.disconnect(); } catch {}
  try { s.preview && s.preview.stop(); } catch {}
  if (s.isHost && s.liveId && s.started) rpc('end_live', {p_id: s.liveId}).catch(() => {});
  if (s.matchId && s.isHost) rpc('match_end', {p_id: s.matchId}).catch(() => {});
  s.el && s.el.remove(); closeSheet(); s = null;
}

/* ---------- shared room plumbing ---------- */
function mkPane(id, name, mirror) {
  const p = document.createElement('div'); p.className = 'pane' + (mirror ? ' mirror' : ''); p.dataset.id = id;
  p.innerHTML = `<video autoplay playsinline muted></video><div class="off">${avatar(null, name, 'big')}</div><div class="nm">${esc(name || '')}</div>`; return p;
}
function paneFor(S_, id, name) { S_.panes ||= new Map(); let p = S_.panes.get(id); if (!p) { p = mkPane(id, name, false); S_.panes.set(id, p); } return p; }
function setTrack(S_, p, track, on) {
  const pane = paneFor(S_, p.identity, p.name || 'user'), v = $('video', pane);
  if (track.kind === 'video') { if (on) { track.attach(v); pane.classList.remove('camoff'); } else { track.detach(v); } }
  else { if (on) { const a = track.attach(); a.style.display = 'none'; a.dataset.who = p.identity; S_.el.append(a); a.play && a.play().catch(() => { S_.needTap = true; showTap(); }); } else track.detach().forEach(x => x.remove()); }
  arrange();
}
function showTap() { if (!s || $('.center.tap', s.el)) return; const c = document.createElement('div'); c.className = 'center tap'; c.style.background = 'rgba(0,0,0,.4)'; c.innerHTML = `<button class="btn" style="width:auto;padding-inline:26px">🔊 ${l_('tapsound')}</button>`; c.onclick = async () => { try { await s.room.startAudio(); } catch {} $$('audio', s.el).forEach(a => a.play().catch(() => {})); if (s.oppRoom) try { await s.oppRoom.startAudio(); } catch {} c.remove(); }; s.el.append(c); }

function wire(room, S_, isOpp) {
  const {RoomEvent, Track} = LC();
  room.on(RoomEvent.TrackSubscribed, (tr, pub, p) => { if (isOpp && p.identity !== S_.oppHost) { if (tr.kind === 'audio') return; } setTrack(S_, p, tr, true); });
  room.on(RoomEvent.TrackUnsubscribed, (tr, pub, p) => setTrack(S_, p, tr, false));
  room.on(RoomEvent.TrackMuted, (pub, p) => { if (pub.kind === 'video') { const pn = S_.panes && S_.panes.get(p.identity); if (pn) pn.classList.add('camoff'); } });
  room.on(RoomEvent.TrackUnmuted, (pub, p) => { if (pub.kind === 'video') { const pn = S_.panes && S_.panes.get(p.identity); if (pn) pn.classList.remove('camoff'); } });
  if (!isOpp) room.on(RoomEvent.ParticipantConnected, p => { if (p.identity !== S_.hostId && p.name) addChat('', '👋 ' + p.name, false, true); updCount(); });
  room.on(RoomEvent.ParticipantDisconnected, p => { if (S_.panes && S_.panes.has(p.identity) && p.identity !== S_.hostId) { S_.panes.delete(p.identity); arrange(); } if (!isOpp && p.identity === S_.hostId && !S_.isHost) ended(); });
  if (isOpp) return;
  room.on(RoomEvent.DataReceived, (payload, p, kind, topic) => { if (topic && topic !== 'livegift') return; let m; try { m = JSON.parse(new TextDecoder().decode(payload)); } catch { return; } onMsg(m, p); });
  room.on(RoomEvent.LocalTrackPublished, (pub) => { if (pub.kind === 'video' && pub.track) { const pane = paneFor(S_, S_.myId, 'me'); pane.classList.add('mirror'); pane.classList.remove('camoff'); pub.track.attach($('video', pane)); arrange(); } });
  room.on(RoomEvent.ParticipantPermissionsChanged, (prev, p) => { if (p === room.localParticipant && p.permissions && p.permissions.canPublish && !S_.isHost && !S_.onStage) goStage(); if (p === room.localParticipant && p.permissions && !p.permissions.canPublish && S_.onStage) leaveStage(true); });
  room.on(RoomEvent.Disconnected, () => { if (s === S_ && !S_.closing) { if (S_.isHost) toast(l_('livefail')); else ended(); } });
}
function ended() { if (!s || s.isHost || $('.center.end', s.el)) return; const c = document.createElement('div'); c.className = 'center end'; c.innerHTML = `<div style="font-size:60px">📴</div><h2>${l_('ended')}</h2><button class="btn" data-lv="close" style="width:auto;padding-inline:30px">OK</button>`; s.el.append(c); c.onclick = e => { if (e.target.closest('button')) closeLive(); }; }
function send(m) { if (!s || !s.room) return; try { s.room.localParticipant.publishData(new TextEncoder().encode(JSON.stringify(m)), {reliable: true, topic: 'livegift'}); } catch {} }

/* ---------- layout ---------- */
function arrange() {
  if (!s) return; const st = $('.lv-stage', s.el), gs = $('.guests', s.el); if (!st) return;
  const me = s.panes && s.panes.get(s.hostId), others = [...(s.panes || new Map()).entries()].filter(([id]) => id !== s.hostId && id !== s.oppHost);
  st.innerHTML = ''; st.classList.toggle('match', !!(s.match && s.oppPane)); s.el.classList.toggle('inmatch', !!(s.match && s.oppPane));
  if (me) { me.style.flex = '1'; st.append(me); }
  if (s.match && s.oppPane) { s.oppPane.style.flex = '1'; st.append(s.oppPane); }
  gs.innerHTML = ''; others.forEach(([, p]) => { p.style.flex = ''; gs.append(p); });
  if (!me) st.innerHTML = `<div class="pane"><div class="off" style="display:flex"><div class="spin"></div></div></div>`;
  if (s.match) renderScore();
}
function heart(x) { const h = document.createElement('span'); h.className = 'hrt'; h.textContent = x || ['❤️', '💖', '💗', '🧡', '💜'][Math.random() * 5 | 0]; h.style.setProperty('--dx', (Math.random() * 60 - 40) + 'px'); h.style.insetInlineStart = Math.random() * 20 + 'px'; const hz = $('.hearts', s.el); if (hz) { hz.append(h); setTimeout(() => h.remove(), 2500); } }
function addChat(name, text, gift, sys) { const c = $('.chatl', s.el); if (!c) return; const d = document.createElement('div'); if (gift) d.className = 'g'; if (sys) d.className = 'sys'; d.innerHTML = name ? `<b>${esc(name)}</b>${esc(text)}` : esc(text); c.append(d); while (c.children.length > 120) c.firstChild.remove(); c.scrollTop = c.scrollHeight; }
function onMsg(m, p) {
  const who = m.u || (p && p.name) || '';
  if (m.t === 'chat') { addChat((p && p.identity === s.hostId ? '👑 ' : '') + who, m.m); if (s.isHost && p) { const last = $('.chatl div:last-child', s.el); if (last) last.dataset.uid = p.identity; } }
  else if (m.t === 'heart') { for (let i = 0; i < Math.min(3, m.n || 1); i++) heart(); }
  else if (m.t === 'gift') { addChat(who, '🎁 ' + m.m, true); const g = S.gifts && S.gifts.find(x => x.id === m.g); if (g) giftRain(g.emoji, who + ' · ' + (lang === 'fa' ? g.name_fa : g.name_en), g.price * (m.n || 1) >= 50); }
  else if (m.t === 'ctl' && p && (p.identity === s.hostId) && m.g && m.g.toLowerCase() === (s.myId || '').toLowerCase()) { if (m.m === 'mic-off') setMic(false); if (m.m === 'cam-off') setCam(false); toast('🎙'); }
}

/* ---------- common UI ---------- */
function shell(kind) {
  const d = document.createElement('div'); d.id = 'live';
  d.innerHTML = `<div class="lv-stage"></div><div class="guests"></div><div class="hearts"></div><div class="chatl"></div><div class="lv-top"></div><div class="lv-bar"></div>`; root.append(d); return d;
}
function topBar(S_, title, right) {
  $('.lv-top', S_.el).innerHTML = `<span class="redot">LIVE</span><span class="pill" id="vc">👁 0</span><span class="pill" id="lk">❤️ 0</span><span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:700;text-shadow:0 1px 5px #000">${esc(title || '')}</span>${right || ''}`;
}
async function pollInfo() { if (!s || !s.liveId) return; try { const r = (await sel('lives', {select: 'likes,viewers,gifts_coins,status', id: 'eq.' + s.liveId}))[0]; if (!r) return; const lk = $('#lk', s.el); if (lk) lk.textContent = '❤️ ' + fmt(r.likes); if (r.status !== 'live') { if (s.isHost) {} else ended(); } } catch {} }
function updCount() { if (!s || !s.room) return; const n = s.room.remoteParticipants.size + (s.isHost ? 0 : 1) - (s.isHost ? 0 : 1); s.viewers = n; const vc = $('#vc', s.el); if (vc) vc.textContent = '👁 ' + fmt(n); const av = $('#avs', s.el); if (av) { const ps = [...s.room.remoteParticipants.values()].filter(p => p.identity !== s.hostId && p.name).slice(0, 3); av.innerHTML = ps.map(p => `<span class="av" style="width:28px;height:28px;font-size:12px;margin-inline-end:-8px;border:2px solid #000;background:hsl(${hueOf(p.identity)},60%,45%)">${esc((p.name || '?')[0].toUpperCase())}</span>`).join(''); } }

/* ---------- watch ---------- */
async function watch(row, rows, idx) {
  injectCSS(); closeLive();
  const d = shell(); s = {el: d, timers: [], kind: 'watch', liveId: row.id, hostId: row.host_id, isHost: false, myId: session.userID, title: row.title, rows, idx, row}; const S_ = s;
  topBar(S_, '', `<span id="avs" style="display:flex"></span><button class="rb" data-lv="close" style="width:36px;height:36px;font-size:16px">✕</button>`);
  const top = $('.lv-top', d), hn = row.host ? row.host.username : '', fol = S.following && S.following.has(row.host_id);
  top.querySelector('.redot').remove(); top.insertAdjacentHTML('afterbegin', `<span class="pill" style="padding:3px 4px 3px 3px;gap:6px">${avatar(row.host && row.host.avatar_url, hn, 'sm')}<span style="max-width:84px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(hn)}</span>${row.host_id === session.userID ? '' : `<button class="btn sm" id="fl" data-lv="follow" style="padding:4px 10px;${fol ? 'display:none' : ''}">${l_('follow')}</button>`}</span>`);
  const sp = top.querySelector('span[style*="flex:1"]'); if (sp) sp.textContent = row.title || '';
  $('.lv-bar', d).innerHTML = viewerBar();
  d.insertAdjacentHTML('beforeend', `<div class="center" id="conn"><div class="spin"></div></div>`);
  bindLive(d);
  try {
    await loadLK(); const tk = await ticket(row.id), {Room} = LC();
    if (s !== S_) return;
    const room = new Room({adaptiveStream: true, dynacast: true}); S_.room = room; S_.role = tk.role; S_.muted = !!tk.muted; wire(room, S_, false);
    await room.connect(tk.url, tk.token); if (s !== S_) { room.disconnect(); return; }
    room.remoteParticipants.forEach(p => p.trackPublications.forEach(pub => { if (pub.track && pub.isSubscribed) setTrack(S_, p, pub.track, true); }));
    const cn = $('#conn', d); if (cn) cn.remove(); paneFor(S_, S_.hostId, row.host && row.host.username); arrange(); updCount();
    S_.timers.push(setInterval(() => { updCount(); pollInfo(); }, 5000), setInterval(pollMatchViewer, 4000)); pollInfo(); pollMatchViewer();
  } catch (e) { if (s === S_) { const cn = $('#conn', d); if (cn) cn.innerHTML = `<div style="font-size:44px">⚠️</div><div>${esc(e.message || l_('livefail'))}</div><button class="btn" data-lv="close" style="width:auto;padding-inline:26px">OK</button>`; } }
}
function viewerBar() { return `<input id="cin" placeholder="${l_('say')}" maxlength="200" enterkeyhint="send"><button class="rb on" data-lv="send">➤</button><button class="rb" data-lv="stage" id="stb">🎤</button><button class="rb" data-lv="gift">🎁</button><button class="rb on" data-lv="like">❤️</button>`; }

/* ---------- host ---------- */
async function host() {
  injectCSS(); closeLive();
  const d = shell(); s = {el: d, timers: [], kind: 'host', isHost: true, myId: session.userID, hostId: session.userID, facing: 'user'}; const S_ = s;
  d.insertAdjacentHTML('beforeend', `<div class="pre"><div style="display:flex;justify-content:space-between"><button class="rb" data-lv="close">✕</button><button class="rb" data-lv="flip">🔄</button></div><div style="flex:1"></div><input id="ttl" maxlength="80" placeholder="${l_('titlePh')}"><button class="btn" data-lv="start">🔴 ${l_('start')}</button></div>`);
  bindLive(d);
  try {
    await loadLK(); const lk = LC();
    S_.preview = await lk.createLocalVideoTrack({facingMode: 'user', resolution: lk.VideoPresets.h720.resolution});
    if (s !== S_) { S_.preview.stop(); return; }
    const pane = paneFor(S_, S_.myId, 'me'); pane.classList.add('mirror'); S_.panes.set(S_.hostId, pane); S_.preview.attach($('video', pane)); arrange();
  } catch (e) { d.insertAdjacentHTML('beforeend', `<div class="center"><div style="font-size:44px">📷</div><div>${esc(l_('noperm'))}</div><button class="btn" data-lv="close" style="width:auto;padding-inline:26px">OK</button></div>`); }
}
async function startLive() {
  const S_ = s, title = ($('#ttl', S_.el).value || '').trim(), go = $('[data-lv=start]', S_.el); go.disabled = true;
  try {
    const id = await rpc('start_live', {p_title: title, p_emoji: '🎥'}); S_.liveId = id;
    const tk = await ticket(id), lk = LC(), room = new lk.Room({adaptiveStream: true, dynacast: true}); S_.room = room; wire(room, S_, false);
    await room.connect(tk.url, tk.token); S_.started = true; S_.t0 = Date.now();
    await room.localParticipant.publishTrack(S_.preview, {source: lk.Track.Source.Camera}); S_.cam = true;
    try { await room.localParticipant.setMicrophoneEnabled(true); S_.mic = true; } catch { S_.mic = false; }
    $('.pre', S_.el).remove(); topBar(S_, title, ''); hostBar(); bindLive(S_.el); rpc('live_heartbeat', {p_id: id, p_viewers: 0}).catch(() => {});
    addChat('Livegift', '👋');
    S_.timers.push(setInterval(() => { updCount(); rpc('live_heartbeat', {p_id: id, p_viewers: S_.viewers || 0}).catch(() => {}); pollInfo(); }, 8000), setInterval(hostPoll, 4000), setInterval(frameCheck, 9000)); hostPoll();
    $('[data-lv=close]', S_.el)?.remove();
  } catch (e) { fail(e); if (go) go.disabled = false; if (S_.liveId && !S_.started) rpc('end_live', {p_id: S_.liveId}).catch(() => {}); }
}
function hostBar() {
  s.el.classList.add('host'); $('.lv-bar', s.el).classList.add('two');
  $('.lv-bar', s.el).innerHTML = `<div class="r1"><input id="cin" placeholder="${l_('say')}" maxlength="200" enterkeyhint="send"><button class="rb on" data-lv="send">➤</button></div><div class="r2"><button class="rb ${s.mic ? '' : 'red'}" data-lv="mic" id="mb">🎙</button><button class="rb ${s.cam ? '' : 'red'}" data-lv="cam" id="cb">📷</button><button class="rb" data-lv="flip">🔄</button><button class="rb" data-lv="stagep" id="sp">🙋</button><button class="rb" data-lv="match" id="mt">⚔️</button><button class="rb red" data-lv="endq">⏹</button></div>`;
}
async function setMic(on) { if (!s || !s.room) return; try { await s.room.localParticipant.setMicrophoneEnabled(on); s.mic = on; const b = $('#mb', s.el); if (b) b.classList.toggle('red', !on); const g = $('#gmic', s.el); if (g) g.classList.toggle('red', !on); } catch { toast(l_('noperm')); } }
async function setCam(on) { if (!s || !s.room) return; try { await s.room.localParticipant.setCameraEnabled(on, on ? {facingMode: s.facing || 'user'} : undefined); s.cam = on; const b = $('#cb', s.el) || $('#gcam', s.el); if (b) b.classList.toggle('red', !on); const pn = s.panes && s.panes.get(s.myId); if (pn) pn.classList.toggle('camoff', !on); } catch { toast(l_('noperm')); } }
async function flip() {
  if (!s) return; s.facing = s.facing === 'user' ? 'environment' : 'user'; const pane = s.panes && (s.panes.get(s.myId) || s.panes.get(s.hostId)); if (pane) pane.classList.toggle('mirror', s.facing === 'user');
  try { let tr = s.preview; if (s.room && s.room.localParticipant) { const pub = s.room.localParticipant.getTrackPublication(LC().Track.Source.Camera); if (pub && pub.videoTrack) tr = pub.videoTrack; } if (tr) await tr.restartTrack({facingMode: s.facing}); } catch (e) { toast(l_('noperm')); }
}
async function frameCheck() { // same server-side safety check as the iOS app
  if (!s || !s.isHost || !s.liveId || !s.cam) return; const v = $('video', (s.panes && s.panes.get(s.hostId)) || document.body); if (!v || !v.videoWidth) return;
  try { const c = document.createElement('canvas'); c.width = 256; c.height = Math.round(256 * v.videoHeight / v.videoWidth); c.getContext('2d').drawImage(v, 0, 0, c.width, c.height); const b64 = c.toDataURL('image/jpeg', .6).split(',')[1]; const r = await raw('POST', 'functions/v1/moderate-frame', {body: {live_id: s.liveId, image: b64, driver: false}}); if (r && (r.action === 'end' || r.ended)) toast('⚠️'); } catch {}
}

/* ---------- guests on stage ---------- */
async function goStage() {
  const S_ = s; if (S_.onStage) return; S_.onStage = true; S_.wantVideo = S_.wantVideo !== false; toast('🎤 ' + l_('onstage'));
  let bad = false;
  try { await S_.room.localParticipant.setMicrophoneEnabled(true); S_.mic = true; } catch { bad = true; }
  if (S_.wantVideo) { try { await S_.room.localParticipant.setCameraEnabled(true, {facingMode: 'user'}); S_.cam = true; } catch { bad = true; } }
  if (bad) { const c = document.createElement('div'); c.className = 'center'; c.style.background = 'rgba(0,0,0,.55)'; c.innerHTML = `<div style="font-size:44px">🎤</div><div>${l_('onstage')}</div><button class="btn" style="width:auto;padding-inline:28px">▶ ${l_('start')}</button>`; c.onclick = async e => { if (!e.target.closest('button')) return; try { await S_.room.localParticipant.setMicrophoneEnabled(true); S_.mic = true; if (S_.wantVideo) { await S_.room.localParticipant.setCameraEnabled(true, {facingMode: 'user'}); S_.cam = true; } c.remove(); } catch { toast(l_('noperm')); } }; S_.el.append(c); }
  $('.lv-bar', S_.el).innerHTML = `<input id="cin" placeholder="${l_('say')}" maxlength="200" enterkeyhint="send"><button class="rb on" data-lv="send">➤</button><button class="rb ${S_.mic ? '' : 'red'}" id="gmic" data-lv="mic">🎙</button><button class="rb ${S_.cam ? '' : 'red'}" id="gcam" data-lv="cam">📷</button><button class="rb" data-lv="gift">🎁</button><button class="rb" data-lv="stageoff">⏏️</button><button class="rb on" data-lv="like">❤️</button>`;
}
async function leaveStage(silent) { if (!s) return; try { await s.room.localParticipant.setMicrophoneEnabled(false); await s.room.localParticipant.setCameraEnabled(false); } catch {} s.onStage = false; const pn = s.panes && s.panes.get(s.myId); if (pn) { s.panes.delete(s.myId); } arrange(); $('.lv-bar', s.el).innerHTML = viewerBar(); if (!silent) toast('👋'); }
function stageAsk() {
  const bg = sheet('🎤 ' + l_('join'), `<div class="body" style="display:flex;flex-direction:column;gap:10px"><button class="btn" data-v="1">📹 ${l_('vid')}</button><button class="btn sec" data-v="0">🎙 ${l_('voice')}</button></div>`);
  $$('.btn', bg).forEach(b => b.onclick = async () => { try { s.wantVideo = b.dataset.v === '1'; await rpc('stage_request', {p_live: s.liveId, p_video: s.wantVideo}); closeSheet(); const x = $('#stb', s.el); if (x) { x.textContent = '⏳'; } toast(l_('waiting')); const S_ = s; clearInterval(S_.stT); S_.stT = setInterval(() => { if (s !== S_) return clearInterval(S_.stT); const pm = S_.room && S_.room.localParticipant && S_.room.localParticipant.permissions; if (pm && pm.canPublish && !S_.onStage) { clearInterval(S_.stT); goStage(); } }, 2500); S_.timers.push(S_.stT); } catch (e) { fail(e); } });
}
async function hostPoll() {
  if (!s || !s.isHost) return;
  try { const st = await rpc('stage_list', {p_live: s.liveId}); s.stage = st || []; const n = s.stage.filter(x => x.status === 'pending').length, b = $('#sp', s.el); if (b) { const o = $('i', b); if (o) o.remove(); if (n) b.insertAdjacentHTML('beforeend', `<i>${n}</i>`); } if (s.sheet === 'stage') drawStage(); s.seen ||= new Set(); s.stage.filter(x => x.status === 'pending' && !s.seen.has(x.user_id)).slice(0, 1).forEach(x => reqBanner(x)); } catch {}
  try { const inc = await rpc('match_incoming'); s.incoming = inc || []; const b = $('#mt', s.el); if (b) { const o = $('i', b); if (o) o.remove(); if (s.incoming.length) b.insertAdjacentHTML('beforeend', `<i>${s.incoming.length}</i>`); } if (s.sheet === 'match') drawMatch(); } catch {}
  if (s.matchId) pollMatchHost();
}
function reqBanner(r) {
  s.seen.add(r.user_id); const b = document.createElement('div'); b.className = 'req';
  b.innerHTML = `<span>${r.video ? '📹' : '🎙'}</span><b>@${esc(r.username)}</b><button class="btn sm" data-a="accept">${l_('accept')}</button><button class="btn sm sec" data-a="decline">${l_('decline')}</button>`; s.el.append(b);
  const gone = setTimeout(() => b.remove(), 12000);
  $$('[data-a]', b).forEach(x => x.onclick = async e => { e.stopPropagation(); clearTimeout(gone); const a = x.dataset.a; try { await rpc('stage_respond', {p_live: s.liveId, p_user: r.user_id, p_action: a}); if (a === 'accept') await ticket(s.liveId, {action: 'stage_on', user_id: r.user_id}); b.remove(); hostPoll(); } catch (er) { fail(er); } });
}
function stageSheet() { s.sheet = 'stage'; const bg = sheet('🙋 ' + l_('requests'), '<div class="body" id="stb2"></div>'); const o = bg.onclick; bg.onclick = e => { o(e); if (!$('#sheet')) s.sheet = null; }; drawStage(); }
function drawStage() {
  const box = $('#stb2'); if (!box) return; const rows = s.stage || [];
  box.innerHTML = rows.length ? rows.map(r => `<div class="lvrow" data-u="${r.user_id}"><b>@${esc(r.username)} ${r.video ? '📹' : '🎙'}</b>${r.status === 'pending' ? `<button class="btn sm" data-a="accept">${l_('accept')}</button><button class="btn sm sec" data-a="decline">${l_('decline')}</button>` : `<button class="btn sm danger" data-a="remove">${l_('remove')}</button>`}</div>`).join('') : `<div class="empty">${l_('noreq')}</div>`;
  $$('[data-a]', box).forEach(b => b.onclick = async () => { const u = b.closest('[data-u]').dataset.u, a = b.dataset.a; b.disabled = true; try { await rpc('stage_respond', {p_live: s.liveId, p_user: u, p_action: a}); if (a !== 'decline') await ticket(s.liveId, {action: a === 'accept' ? 'stage_on' : 'stage_off', user_id: u}); await hostPoll(); } catch (e) { fail(e); b.disabled = false; } });
}

/* ---------- gifts / likes / chat ---------- */
function giftSheet2() {
  let pick = null, qty = 1, target = 'me';
  const bg = sheet('🎁 ' + l_('gift'), `<div class="body"><div class="mut small" style="margin-bottom:10px">${t('balance')}: <b id="bal">${fmt(S.me.coins)}</b> 🪙</div><div class="gifts">${S.gifts.map(g => `<button class="gift" data-g="${g.id}"><div class="e">${esc(g.emoji)}</div>${esc(lang === 'fa' ? g.name_fa : g.name_en)}<div class="mut">${g.price} 🪙</div></button>`).join('')}</div>${s.match && s.oppLive ? `<div class="chips" style="margin:12px 0 0" id="tg"><button data-t="me" class="on">→ ${esc(s.match.aMine ? s.match.a_name : s.match.b_name)}</button><button data-t="opp">→ ${esc(s.match.aMine ? s.match.b_name : s.match.a_name)}</button></div>` : ''}<div class="chips" style="margin:14px 0" id="qs">${[1, 5, 10].map(n => `<button data-q="${n}" class="${n === 1 ? 'on' : ''}">×${n}</button>`).join('')}</div><button class="btn" id="gs" disabled>${t('sendgift')}</button></div>`);
  $$('.gift', bg).forEach(b => b.onclick = () => { pick = S.gifts.find(g => g.id === b.dataset.g); $$('.gift', bg).forEach(x => x.classList.toggle('on', x === b)); $('#gs').disabled = false; });
  $$('#tg button', bg).forEach(b => b.onclick = () => { target = b.dataset.t; $$('#tg button', bg).forEach(x => x.classList.toggle('on', x === b)); });
  $$('#qs button', bg).forEach(b => b.onclick = () => { qty = +b.dataset.q; $$('#qs button', bg).forEach(x => x.classList.toggle('on', x === b)); });
  $('#gs').onclick = async () => { if (!pick) return; if (S.me.coins < pick.price * qty) return toast(t('nocoins')); try { S.me.coins = Number(await rpc('send_live_gift', {p_live: target === 'opp' && s.oppLive ? s.oppLive : s.liveId, p_gift: pick.id, p_qty: qty})); const nm = lang === 'fa' ? pick.name_fa : pick.name_en; send({t: 'gift', u: S.me.username, m: nm, g: pick.id, n: qty}); addChat(S.me.username, '🎁 ' + nm, true); giftRain(pick.emoji, nm, pick.price * qty >= 50); closeSheet(); } catch (e) { fail(e); } };
}
let likeN = 0, likeT = 0;
function like() { if (!s) return; heart(); send({t: 'heart', u: S.me.username, n: 1}); likeN++; clearTimeout(likeT); likeT = setTimeout(() => { const n = likeN; likeN = 0; if (s && s.liveId) rpc('live_like', {p_live: s.liveId, p_n: n}).catch(() => {}); }, 1500); }
function sendChat() { const i = $('#cin', s.el), v = i.value.trim(); if (!v) return; if (s.muted) return toast('🔇'); i.value = ''; send({t: 'chat', u: S.me.username, m: v.slice(0, 200)}); addChat(S.me.username, v); }
function chatMenu(uid, name) {
  const bg = sheet('@' + esc(name), `<div class="body" style="display:flex;flex-direction:column;gap:8px">${['mute', 'unmute', 'kick', 'ban'].map(a => `<button class="btn ${a === 'ban' || a === 'kick' ? 'danger' : 'sec'}" data-a="${a}">${l_(a)}</button>`).join('')}</div>`);
  $$('[data-a]', bg).forEach(b => b.onclick = async () => { const a = b.dataset.a; try { await rpc('live_moderate', {p_live: s.liveId, p_user: uid, p_action: a}); if (['kick', 'mute', 'unmute', 'ban'].includes(a)) await ticket(s.liveId, {action: a === 'ban' ? 'kick' : a, user_id: uid}); toast('✓'); closeSheet(); } catch (e) { fail(e); } });
}

/* ---------- match (battle) ---------- */
function matchSheet() { s.sheet = 'match'; const bg = sheet('⚔️ ' + l_('match'), '<div class="body" id="mtb"></div>'); const o = bg.onclick; bg.onclick = e => { o(e); if (!$('#sheet')) s.sheet = null; }; drawMatch(); rpc('match_candidates').then(c => { s.cands = c || []; drawMatch(); }).catch(() => {}); }
function drawMatch() {
  const box = $('#mtb'); if (!box) return; const inc = s.incoming || [], c = s.cands || [];
  box.innerHTML = `<button class="btn" id="rnd">${s.searching ? '⏳ ' + l_('searching') : '🎲 ' + l_('random')}</button>
   ${inc.length ? `<h2 style="margin-top:16px">${l_('incoming')}</h2>${inc.map(x => `<div class="lvrow" data-id="${x.id}"><b>@${esc(x.from_name)}</b><button class="btn sm" data-r="1">${l_('accept')}</button><button class="btn sm sec" data-r="0">${l_('decline')}</button></div>`).join('')}` : ''}
   ${c.length ? `<h2 style="margin-top:16px">${l_('cands')}</h2>${c.map(x => `<div class="lvrow"><b>@${esc(x.username)} <span class="mut small">👁 ${x.viewers}</span></b><button class="btn sm" data-q="${x.live_id}">${l_('request')}</button></div>`).join('')}` : ''}`;
  $('#rnd', box).onclick = () => s.searching ? stopSearch() : search();
  $$('[data-r]', box).forEach(b => b.onclick = async () => { const id = b.closest('[data-id]').dataset.id, acc = b.dataset.r === '1'; try { await rpc('match_respond', {p_id: id, p_accept: acc}); if (acc) { s.matchId = id; closeSheet(); } hostPoll(); } catch (e) { fail(e); } });
  $$('[data-q]', box).forEach(b => b.onclick = async () => { try { s.matchId = await rpc('match_request', {p_to_live: b.dataset.q}); closeSheet(); toast(l_('wait')); } catch (e) { fail(e); } });
}
async function search() {
  const S_ = s; S_.searching = true; drawMatch(); let n = 0;
  while (s === S_ && S_.searching && !S_.matchId && n < 40) { try { const m = await rpc('match_find'); if (m) { S_.matchId = m; S_.searching = false; closeSheet(); return; } } catch (e) { fail(e); break; } n++; await new Promise(r => setTimeout(r, 3000)); }
  if (s === S_ && S_.searching) toast(l_('nobody')); stopSearch();
}
function stopSearch() { if (!s) return; s.searching = false; rpc('match_cancel_find').catch(() => {}); drawMatch(); }
async function pollMatchHost() {
  const S_ = s, id = S_.matchId; if (!id) return; let st; try { st = (await rpc('match_state', {p_id: id}))[0]; } catch { return; } if (s !== S_ || S_.matchId !== id || !st) return;
  if (['declined', 'cancelled', 'ended'].includes(st.status)) { S_.matchId = null; endMatchUI(); if (st.status === 'declined') toast('✗'); return; }
  const mine = S_.liveId; const oppLive = st.a_live === mine ? st.b_live : st.a_live, oppHost = st.a_live === mine ? st.b_host : st.a_host;
  applyMatch({status: st.status, a_name: st.a_name, b_name: st.b_name, a_coins: st.a_coins, b_coins: st.b_coins, seconds_left: st.seconds_left, aMine: st.a_live === mine, ready: st.a_live === mine ? st.a_ready : st.b_ready}, oppLive, oppHost);
}
async function pollMatchViewer() {
  const S_ = s; if (!S_ || S_.isHost || !S_.liveId) return; let m; try { m = ((await rpc('match_for_live', {p_live: S_.liveId})) || [])[0]; } catch { return; } if (s !== S_) return;
  if (!m) { if (S_.match) endMatchUI(); return; }
  const oppLive = m.a_live === S_.liveId ? m.b_live : m.a_live, oppHost = m.a_live === S_.liveId ? m.b_host : m.a_host;
  applyMatch({status: 'accepted', a_name: m.a_name, b_name: m.b_name, a_coins: m.a_coins, b_coins: m.b_coins, seconds_left: m.seconds_left, aMine: m.a_live === S_.liveId}, oppLive, oppHost);
}
async function applyMatch(m, oppLive, oppHost) {
  const S_ = s; S_.match = m; S_.oppHost = oppHost; S_.oppLive = oppLive;
  if (!S_.oppRoom && !S_.oppBusy && oppLive) {
    S_.oppBusy = true;
    try { await loadLK(); const tk = await ticket(oppLive), room = new (LC().Room)({adaptiveStream: true}); wire(room, S_, true); S_.oppRoom = room; await room.connect(tk.url, tk.token); S_.oppPane = mkPane(oppHost, m.aMine ? m.b_name : m.a_name, false); S_.panes.set('opp', S_.oppPane); S_.panes.delete('opp');
      room.remoteParticipants.forEach(p => p.trackPublications.forEach(pub => { if (pub.track && pub.isSubscribed) { if (pub.kind === 'video' || true) { const v = $('video', S_.oppPane); if (pub.kind === 'video') { pub.track.attach(v); } else { const a = pub.track.attach(); a.style.display = 'none'; S_.el.append(a); } } } }));
      room.on(LC().RoomEvent.TrackSubscribed, (tr, pub, p) => { if (!S_.oppPane) return; if (tr.kind === 'video') tr.attach($('video', S_.oppPane)); else { const a = tr.attach(); a.style.display = 'none'; S_.el.append(a); } });
    } catch (e) { S_.oppRoom = null; }
    S_.oppBusy = false;
  }
  arrange();
}
function renderScore() {
  const m = s.match; if (!m) return; let sc = $('.score', s.el); if (!sc) { sc = document.createElement('div'); sc.className = 'score'; s.el.append(sc); }
  const mine = m.aMine ? m.a_coins : m.b_coins, theirs = m.aMine ? m.b_coins : m.a_coins, tot = Math.max(1, mine + theirs), pct = mine + theirs ? Math.round(mine / tot * 100) : 50, myN = m.aMine ? m.a_name : m.b_name, opN = m.aMine ? m.b_name : m.a_name;
  const mm = Math.floor(m.seconds_left / 60), ss = String(m.seconds_left % 60).padStart(2, '0');
  let mid = `<span class="clock">${mm}:${ss}</span>`; if (m.status === 'talking') mid = `<span class="clock">💬 ${l_('talk')}</span>` + (s.isHost && !m.ready ? `<button class="btn sm" data-lv="ready" style="pointer-events:auto">${l_('ready')}</button>` : '');
  else if (m.status === 'accepted' && m.seconds_left === 0) mid = `<span class="clock">${mine === theirs ? l_('draw') : '🏆 ' + l_('won') + ' @' + (mine > theirs ? myN : opN)}</span>`;
  sc.innerHTML = `<div class="sbar"><span class="a" style="width:${pct}%">${esc(myN)} · ${fmt(mine)}</span><span class="b" style="width:${100 - pct}%">${fmt(theirs)} · ${esc(opN)}</span></div>${mid}${s.isHost ? `<button class="btn sm danger" data-lv="leavem" style="pointer-events:auto">${l_('leave')}</button>` : ''}`;
}
function endMatchUI() { if (!s) return; s.oppLive = null; s.el.classList.remove('inmatch'); try { s.oppRoom && s.oppRoom.disconnect(); } catch {} s.oppRoom = null; s.oppPane = null; s.match = null; s.oppHost = null; const sc = $('.score', s.el); if (sc) sc.remove(); arrange(); }

async function endSummary() {
  const S_ = s; closeSheet(); const secs = Math.round((Date.now() - (S_.t0 || Date.now())) / 1000); let info = {};
  try { info = (await sel('lives', {select: 'likes,peak_viewers,gifts_coins', id: 'eq.' + S_.liveId}))[0] || {}; } catch {}
  try { S_.closing = true; S_.room && S_.room.disconnect(); } catch {} try { S_.oppRoom && S_.oppRoom.disconnect(); } catch {}
  if (S_.matchId) { rpc('match_end', {p_id: S_.matchId}).catch(() => {}); S_.matchId = null; }
  rpc('end_live', {p_id: S_.liveId}).catch(() => {}); S_.started = false; (S_.timers || []).forEach(clearInterval);
  const m = Math.floor(secs / 60), ss = String(secs % 60).padStart(2, '0');
  $$('.req', S_.el).forEach(x => x.remove());
  const c = document.createElement('div'); c.className = 'center'; c.style.background = 'rgba(8,4,18,.94)';
  c.innerHTML = `<div style="font-size:54px">🎬</div><h2>${l_('summ')}</h2><div class="stats glass" style="width:100%;max-width:340px;flex-wrap:wrap;gap:12px;justify-content:space-around"><div><b>${m}:${ss}</b><span class="small" style="opacity:.7">${l_('dur')}</span></div><div><b>${fmt(info.peak_viewers || 0)}</b><span class="small" style="opacity:.7">${l_('peak')}</span></div><div><b>${fmt(info.likes || 0)}</b><span class="small" style="opacity:.7">${l_('likes')}</span></div><div><b>${fmt(info.gifts_coins || 0)}</b><span class="small" style="opacity:.7">${l_('gifts')}</span></div></div><button class="btn" data-lv="close" style="width:auto;padding-inline:36px">${l_('done')}</button>`;
  S_.el.append(c);
}
/* ---------- events ---------- */
function bindLive(d) {
  d.onclick = async e => {
    const b = e.target.closest('[data-lv]'); const line = e.target.closest('.chatl div');
    if (!b) { if (line && s && s.isHost && line.dataset.uid) chatMenu(line.dataset.uid, line.querySelector('b').textContent); return; }
    const a = b.dataset.lv;
    if (a === 'follow') { try { await A.follow(s.hostId, true); S.following.add(s.hostId); b.style.display = 'none'; toast('✓'); } catch (x) { fail(x); } }
    else if (a === 'close') closeLive(); else if (a === 'flip') flip(); else if (a === 'start') startLive();
    else if (a === 'mic') setMic(!s.mic); else if (a === 'cam') setCam(!s.cam);
    else if (a === 'send') sendChat(); else if (a === 'like') like(); else if (a === 'gift') giftSheet2(); else if (a === 'stage') stageAsk(); else if (a === 'stageoff') leaveStage();
    else if (a === 'stagep') stageSheet(); else if (a === 'match') matchSheet();
    else if (a === 'ready') { try { await rpc('match_ready', {p_id: s.matchId}); } catch (x) { fail(x); } }
    else if (a === 'leavem') { const id = s.matchId; s.matchId = null; endMatchUI(); if (id) rpc('match_end', {p_id: id}).catch(() => {}); }
    else if (a === 'endq') {
      s.endAsk = true; const bg = sheet(l_('endq'), `<div class="body" style="display:flex;gap:8px"><button class="btn sec" style="flex:1" data-x="0">✕</button><button class="btn danger" style="flex:2" data-x="1">${l_('end')}</button></div>`); $$('[data-x]', bg).forEach(x => x.onclick = () => x.dataset.x === '1' ? endSummary() : closeSheet()); }
    else if (a === 'more') { const bg = sheet('⋯', `<div class="body"><button class="btn sec" data-x="r">🚩 ${l_('report')}</button></div>`); $('[data-x=r]', bg).onclick = async () => { try { await rpc('report_live', {p_live: s.liveId, p_reason: 'inappropriate'}); toast(l_('reported')); closeSheet(); } catch (x) { fail(x); } }; }
  };
  if (s && !s.isHost) { let t0 = null; d.addEventListener('touchstart', e => { t0 = e.target.closest('input,button,.chatl,.guests') ? null : {x: e.touches[0].clientX, y: e.touches[0].clientY}; }, {passive: true});
    d.addEventListener('touchend', async e => { if (!t0) return; const dx = e.changedTouches[0].clientX - t0.x, dy = e.changedTouches[0].clientY - t0.y; t0 = null;
      if (Math.abs(dx) > 120 && Math.abs(dx) > Math.abs(dy) * 1.5) return closeLive();
      if (Math.abs(dy) > 110 && Math.abs(dy) > Math.abs(dx) * 1.5) { const S_ = s; let rows = S_.rows; if (!rows) { try { const since = new Date(Date.now() - 120000).toISOString(); rows = await sel('lives', {select: 'id,host_id,title,emoji,viewers,started_at,host:profiles!host_id(username,avatar_url)', status: 'eq.live', updated_at: 'gte.' + since, order: 'viewers.desc,started_at.desc', limit: '40'}); } catch { return; } }
        let i = rows.findIndex(x => x.id === S_.liveId); if (i < 0) i = 0; const n = i + (dy < 0 ? 1 : -1); if (n < 0 || n >= rows.length) return toast(dy < 0 ? '—' : '—'); if (s === S_) watch(rows[n], rows, n); } }, {passive: true}); }
  d.onkeydown = e => { if (e.key === 'Enter' && e.target.id === 'cin') sendChat(); };
  d.addEventListener('dblclick', e => { if (!e.target.closest('button,input')) like(); });
}

window.Live = {list, watch, host, close: closeLive};
})();
