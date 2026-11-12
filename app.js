'use strict';
/* Livegift Web (PWA) — uses the same Supabase backend as the iOS app. */
const URL_ = 'https://wqgnvqrhdpkneqfduexj.supabase.co';
const KEY = 'sb_publishable_jUYA9uX5yvEt5H48YAES7g_EZy4LlQH';
const BUCKET = 'media';
const SUPPORT = 'Morti.r@icloud.com';
const LEGAL = 'https://morti-amg.github.io/livegift-legal/';

/* ---------- i18n ---------- */
const L = {
 fa:{dir:'rtl',home:'خانه',discover:'کشف',inbox:'پیام‌ها',me:'من',email:'ایمیل',password:'رمز عبور',signin:'ورود',signup:'ساخت حساب',forgot:'رمز را فراموش کرده‌ام',
  haveacc:'حساب دارید؟ وارد شوید',noacc:'حساب ندارید؟ بسازید',tagline:'ویدیو، هدیه و گفتگو',confirm:'ایمیل تأیید برایتان فرستاده شد. بعد از تأیید وارد شوید.',
  resetsent:'اگر این ایمیل ثبت شده باشد، لینک تغییر رمز فرستاده شد.',min6:'رمز عبور باید دست‌کم ۶ نویسه باشد.',
  nofeed:'هنوز پستی نیست.',comments:'نظرات',addcomment:'نظر بنویسید…',send:'ارسال',nocomments:'هنوز نظری نیست.',gift:'هدیه',coins:'سکه',
  sendgift:'ارسال هدیه',balance:'موجودی',nocoins:'سکه کافی نیست. خرید سکه فقط در اپ iOS انجام می‌شود.',giftsent:'هدیه ارسال شد 🎁',
  follow:'دنبال کردن',following:'دنبال می‌شود',followers:'دنبال‌کننده',followingn:'دنبال‌شونده',likes:'لایک',posts:'پست',
  search:'جستجوی نام کاربری…',popular:'خالق‌های محبوب',upload:'ارسال',choose:'انتخاب عکس یا ویدیو',caption:'توضیح…',publish:'انتشار',publishing:'در حال ارسال…',published:'منتشر شد ✅',
  vis:'چه کسی ببیند',public:'همه',followersonly:'دنبال‌کنندگان',private:'فقط من',
  profile:'پروفایل',edit:'ویرایش پروفایل',username:'نام کاربری',displayname:'نام نمایشی',bio:'درباره من',save:'ذخیره',saved:'ذخیره شد',avatar:'تغییر عکس',
  settings:'تنظیمات',language:'زبان',logout:'خروج',deleteacc:'حذف حساب',deleteask:'حذف حساب برای همیشه است. مطمئنید؟',yes:'بله، حذف شود',cancel:'انصراف',
  privacy:'حریم خصوصی',terms:'شرایط استفاده',support:'پشتیبانی',activity:'فعالیت‌ها',noactivity:'فعالیتی نیست.',
  nomsg:'گفتگویی نیست. از صفحهٔ یک کاربر پیام بدهید.',message:'پیام',typemsg:'پیام…',report:'گزارش',block:'مسدود',unblock:'رفع انسداد',reported:'گزارش ثبت شد.',
  delete:'حذف',del_ask:'این پست حذف شود؟',loading:'در حال بارگذاری…',error:'خطایی رخ داد',offline:'اینترنت قطع است',
  installhint:'برای نصب: در Safari دکمهٔ اشتراک‌گذاری ⬆️ را بزنید و «Add to Home Screen» را انتخاب کنید.',dismiss:'متوجه شدم',
  liveios:'پخش زنده و بازی‌ها فعلاً فقط در اپ iOS هستند.',mute:'صدا',admin:'مدیر',like_a:'پسندید',comment_a:'نظر داد',follow_a:'دنبالتان کرد',gift_a:'هدیه فرستاد',
  banned:'حساب شما محدود شده است.',signedas:'وارد شده با'},
 en:{dir:'ltr',home:'Home',discover:'Discover',inbox:'Messages',me:'Me',email:'Email',password:'Password',signin:'Sign in',signup:'Create account',forgot:'Forgot password',
  haveacc:'Have an account? Sign in',noacc:'No account? Create one',tagline:'Video, gifts and chat',confirm:'We sent you a confirmation e-mail. Confirm, then sign in.',
  resetsent:'If this e-mail is registered, a reset link has been sent.',min6:'Password must be at least 6 characters.',
  nofeed:'No posts yet.',comments:'Comments',addcomment:'Add a comment…',send:'Send',nocomments:'No comments yet.',gift:'Gift',coins:'Coins',
  sendgift:'Send gift',balance:'Balance',nocoins:'Not enough coins. Coins can only be bought in the iOS app.',giftsent:'Gift sent 🎁',
  follow:'Follow',following:'Following',followers:'Followers',followingn:'Following',likes:'Likes',posts:'Posts',
  search:'Search username…',popular:'Popular creators',upload:'Post',choose:'Choose photo or video',caption:'Caption…',publish:'Publish',publishing:'Uploading…',published:'Published ✅',
  vis:'Who can see it',public:'Everyone',followersonly:'Followers',private:'Only me',
  profile:'Profile',edit:'Edit profile',username:'Username',displayname:'Display name',bio:'Bio',save:'Save',saved:'Saved',avatar:'Change photo',
  settings:'Settings',language:'Language',logout:'Sign out',deleteacc:'Delete account',deleteask:'Deleting your account is permanent. Are you sure?',yes:'Yes, delete',cancel:'Cancel',
  privacy:'Privacy policy',terms:'Terms of use',support:'Support',activity:'Activity',noactivity:'No activity yet.',
  nomsg:'No conversations. Message someone from their profile.',message:'Message',typemsg:'Message…',report:'Report',block:'Block',unblock:'Unblock',reported:'Report sent.',
  delete:'Delete',del_ask:'Delete this post?',loading:'Loading…',error:'Something went wrong',offline:'You are offline',
  installhint:'To install: in Safari tap the Share button ⬆️ and choose “Add to Home Screen”.',dismiss:'Got it',
  liveios:'Live streaming and games are currently only in the iOS app.',mute:'Sound',admin:'Admin',like_a:'liked your post',comment_a:'commented',follow_a:'followed you',gift_a:'sent a gift',
  banned:'Your account is restricted.',signedas:'Signed in as'},
 de:{dir:'ltr',home:'Start',discover:'Entdecken',inbox:'Nachrichten',me:'Ich',email:'E-Mail',password:'Passwort',signin:'Anmelden',signup:'Konto erstellen',forgot:'Passwort vergessen',
  haveacc:'Schon ein Konto? Anmelden',noacc:'Noch kein Konto? Erstellen',tagline:'Video, Geschenke und Chat',confirm:'Wir haben Ihnen eine Bestätigungs-E-Mail gesendet. Bestätigen Sie und melden Sie sich dann an.',
  resetsent:'Falls diese E-Mail-Adresse registriert ist, wurde ein Link zum Zurücksetzen gesendet.',min6:'Das Passwort muss mindestens 6 Zeichen lang sein.',
  nofeed:'Noch keine Beiträge.',comments:'Kommentare',addcomment:'Kommentar schreiben…',send:'Senden',nocomments:'Noch keine Kommentare.',gift:'Geschenk',coins:'Münzen',
  sendgift:'Geschenk senden',balance:'Guthaben',nocoins:'Nicht genug Münzen. Münzen können nur in der iOS-App gekauft werden.',giftsent:'Geschenk gesendet 🎁',
  follow:'Folgen',following:'Gefolgt',followers:'Follower',followingn:'Folge ich',likes:'Likes',posts:'Beiträge',
  search:'Benutzernamen suchen…',popular:'Beliebte Creator',upload:'Posten',choose:'Foto oder Video wählen',caption:'Beschreibung…',publish:'Veröffentlichen',publishing:'Wird hochgeladen…',published:'Veröffentlicht ✅',
  vis:'Wer darf es sehen',public:'Alle',followersonly:'Follower',private:'Nur ich',
  profile:'Profil',edit:'Profil bearbeiten',username:'Benutzername',displayname:'Anzeigename',bio:'Über mich',save:'Speichern',saved:'Gespeichert',avatar:'Foto ändern',
  settings:'Einstellungen',language:'Sprache',logout:'Abmelden',deleteacc:'Konto löschen',deleteask:'Das Löschen des Kontos ist endgültig. Sind Sie sicher?',yes:'Ja, löschen',cancel:'Abbrechen',
  privacy:'Datenschutzerklärung',terms:'Nutzungsbedingungen',support:'Support',activity:'Aktivität',noactivity:'Noch keine Aktivität.',
  nomsg:'Keine Unterhaltungen. Schreiben Sie jemandem über sein Profil.',message:'Nachricht',typemsg:'Nachricht…',report:'Melden',block:'Blockieren',unblock:'Blockierung aufheben',reported:'Meldung gesendet.',
  delete:'Löschen',del_ask:'Diesen Beitrag löschen?',loading:'Wird geladen…',error:'Es ist ein Fehler aufgetreten',offline:'Keine Internetverbindung',
  installhint:'Installation: In Safari auf „Teilen“ ⬆️ tippen und „Zum Home-Bildschirm“ wählen.',dismiss:'Verstanden',
  liveios:'Live-Streams und Spiele gibt es derzeit nur in der iOS-App.',mute:'Ton',admin:'Admin',like_a:'gefiel dein Beitrag',comment_a:'hat kommentiert',follow_a:'folgt dir jetzt',gift_a:'hat ein Geschenk gesendet',
  banned:'Ihr Konto ist eingeschränkt.',signedas:'Angemeldet als'}
};
const store = {get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}},del(k){try{localStorage.removeItem(k)}catch{}}};
let lang = store.get('lg.lang') || (navigator.language||'').slice(0,2);
if (!L[lang]) lang = 'fa';
const t = k => (L[lang][k] ?? L.en[k] ?? k);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

/* ---------- API ---------- */
let session = null;
try { session = JSON.parse(store.get('lg.session') || 'null'); } catch {}
function saveSession(s){ session = s; s ? store.set('lg.session', JSON.stringify(s)) : store.del('lg.session'); }
const errText = (d, st) => (d && (d.msg || d.message || d.error_description || d.error)) || ('HTTP ' + st);

async function raw(method, path, {query, body, headers = {}, auth = true, blob} = {}) {
  const u = new URL(URL_ + '/' + path);
  if (query) for (const [k, v] of query) u.searchParams.append(k, v);
  const h = {apikey: KEY, ...headers};
  if (auth) h.Authorization = 'Bearer ' + await token();
  let b;
  if (blob) b = blob;
  else if (body !== undefined) { b = JSON.stringify(body); h['Content-Type'] = 'application/json'; }
  let r;
  try { r = await fetch(u, {method, headers: h, body: b}); }
  catch { throw new Error(t('offline')); }
  const txt = await r.text(); let data = null;
  try { data = txt ? JSON.parse(txt) : null; } catch { data = txt; }
  if (!r.ok) { const e = new Error(errText(data, r.status)); e.status = r.status; throw e; }
  return data;
}
let refreshing = null;
async function token() {
  if (!session) throw new Error('Not signed in');
  if (Date.now() < session.expiresAt - 60000) return session.accessToken;
  refreshing ||= (async () => {
    try {
      const d = await raw('POST', 'auth/v1/token', {query: [['grant_type', 'refresh_token']], body: {refresh_token: session.refreshToken}, auth: false});
      saveSession(parse(d, session.email));
    } catch (e) { if (e.status >= 400 && e.status < 500) { saveSession(null); location.reload(); } throw e; }
    finally { refreshing = null; }
  })();
  await refreshing; return session.accessToken;
}
function parse(d, email) {
  if (!d || !d.access_token) throw new Error('No session');
  return {accessToken: d.access_token, refreshToken: d.refresh_token, expiresAt: Date.now() + (d.expires_in || 3600) * 1000, userID: d.user.id, email: d.user.email || email};
}
const sel = (table, q) => raw('GET', 'rest/v1/' + table, {query: Object.entries(q)});
const ins = (table, row, conflict) => raw('POST', 'rest/v1/' + table, {body: row, headers: {Prefer: (conflict ? 'resolution=' + conflict + ',' : '') + 'return=minimal'}});
const patch = (table, q, row) => raw('PATCH', 'rest/v1/' + table, {query: Object.entries(q), body: row, headers: {Prefer: 'return=minimal'}});
const del = (table, q) => raw('DELETE', 'rest/v1/' + table, {query: Object.entries(q)});
const rpc = (fn, p = {}) => raw('POST', 'rest/v1/rpc/' + fn, {body: p});
const pubURL = p => `${URL_}/storage/v1/object/public/${BUCKET}/${p}`;
async function upload(blob, path, type) {
  await raw('POST', `storage/v1/object/${BUCKET}/${path}`, {blob, headers: {'Content-Type': type, 'x-upsert': 'true'}});
  return pubURL(path);
}
const A = {
  signIn: async (email, password) => saveSession(parse(await raw('POST', 'auth/v1/token', {query: [['grant_type', 'password']], body: {email, password}, auth: false}), email)),
  signUp: async (email, password) => { const d = await raw('POST', 'auth/v1/signup', {body: {email, password}, auth: false}); if (d && d.access_token) { saveSession(parse(d, email)); return true; } return false; },
  recover: email => raw('POST', 'auth/v1/recover', {body: {email}, auth: false}),
  profile: async id => (await sel('profiles', {select: '*', id: 'eq.' + id}))[0],
  feed: () => sel('posts', {select: '*,author:profiles!author_id(username,avatar_url)', is_removed: 'eq.false', order: 'created_at.desc', limit: '60'}),
  userPosts: id => sel('posts', {select: '*,author:profiles!author_id(username,avatar_url)', is_removed: 'eq.false', author_id: 'eq.' + id, order: 'created_at.desc', limit: '60'}),
  liked: async () => (await sel('likes', {select: 'post_id', user_id: 'eq.' + session.userID})).map(r => r.post_id),
  following: async () => (await sel('follows', {select: 'followee_id', follower_id: 'eq.' + session.userID})).map(r => r.followee_id),
  blocked: async () => (await sel('blocks', {select: 'blocked_id', blocker_id: 'eq.' + session.userID})).map(r => r.blocked_id),
  creators: () => sel('creator_cards', {select: '*', order: 'followers.desc', limit: '100'}),
  comments: id => sel('comments', {select: '*,author:profiles!author_id(username,avatar_url)', post_id: 'eq.' + id, order: 'created_at.asc', limit: '200'}),
  like: (id, on) => on ? ins('likes', {post_id: id, user_id: session.userID}, 'ignore-duplicates') : del('likes', {post_id: 'eq.' + id, user_id: 'eq.' + session.userID}),
  comment: (id, body) => ins('comments', {post_id: id, author_id: session.userID, body}),
  follow: async (id, on) => on ? ins('follows', {follower_id: session.userID, followee_id: id}, 'ignore-duplicates') : del('follows', {follower_id: 'eq.' + session.userID, followee_id: 'eq.' + id}),
  block: async (id, on) => { if (on) { await ins('blocks', {blocker_id: session.userID, blocked_id: id}, 'ignore-duplicates'); try { await A.follow(id, false); } catch {} } else await del('blocks', {blocker_id: 'eq.' + session.userID, blocked_id: 'eq.' + id}); },
  report: (type, id, reason) => ins('reports', {reporter_id: session.userID, target_type: type, target_id: id, reason}),
  gifts: () => sel('gifts', {select: '*', order: 'sort.asc,price.asc'}),
  sendGift: (receiver, gift, qty, post) => rpc('send_gift', {p_receiver: receiver, p_gift: gift, p_qty: qty, ...(post ? {p_post: post} : {})}),
  view: id => rpc('record_post_view', {p_post: id}).catch(() => {}),
  stats: async () => (await rpc('my_stats'))[0],
  activity: () => rpc('my_activity', {p_limit: 80}),
  threads: () => rpc('dm_threads'),
  dmList: (other, after = 0) => rpc('dm_list', {p_other: other, p_after: after}),
  dmSend: (to, body) => rpc('send_dm', {p_to: to, p_body: body}),
  dmRead: other => rpc('dm_mark_read', {p_other: other}).catch(() => {}),
  search: async q => { const c = q.replace(/[^\p{L}\p{N}_.]/gu, ''); if (!c) return []; return sel('profiles', {select: 'id,username,display_name,avatar_url', username: 'ilike.' + c + '*', limit: '20'}); },
  updateProfile: (row) => patch('profiles', {id: 'eq.' + session.userID}, row),
  deleteAccount: () => rpc('delete_my_account'),
  deletePost: (id) => del('posts', {id: 'eq.' + id})
};

/* ---------- state ---------- */
const S = {tab: 'home', overlay: [], me: null, posts: [], liked: new Set(), following: new Set(), blocked: new Set(), gifts: [], unread: 0, muted: true, installHint: store.get('lg.hint') !== '1', authMode: 'in'};
const root = $('#app');
function toast(m) { const e = $('#toast'); e.textContent = m; e.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => e.hidden = true, 2600); }
const fail = e => toast(e && e.message ? e.message : t('error'));
function applyLang() { document.documentElement.lang = lang; document.documentElement.dir = L[lang].dir; }
const initial = n => esc((n || '?').trim().charAt(0).toUpperCase());
const avatar = (url, name, cls = '') => url ? `<img class="av ${cls}" src="${esc(url)}" alt="" loading="lazy">` : `<span class="av grad ${cls}">${initial(name)}</span>`;
const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'K' : String(n ?? 0);
const ago = d => { const s = (Date.now() - new Date(d)) / 1000; return s < 60 ? '·' : s < 3600 ? Math.floor(s / 60) + 'm' : s < 86400 ? Math.floor(s / 3600) + 'h' : Math.floor(s / 86400) + 'd'; };
const spin = '<div class="spin"></div>';

/* ---------- render: auth ---------- */
function renderAuth(msg = {}) {
  applyLang();
  const up = S.authMode === 'up', fg = S.authMode === 'forgot';
  root.innerHTML = `<div class="view"><div class="auth">
   <div style="text-align:center"><div class="logo">Livegift</div><div class="mut">${t('tagline')}</div></div>
   <div class="lang">${['fa', 'en', 'de'].map(l => `<button data-act="lang" data-v="${l}" class="${l === lang ? 'on' : ''}">${l === 'fa' ? 'فارسی' : l === 'en' ? 'English' : 'Deutsch'}</button>`).join('')}</div>
   ${msg.err ? `<div class="err">${esc(msg.err)}</div>` : ''}${msg.ok ? `<div class="okmsg">${esc(msg.ok)}</div>` : ''}
   <form id="af" style="display:flex;flex-direction:column;gap:12px">
    <input id="em" type="email" dir="ltr" autocomplete="email" placeholder="${t('email')}" required>
    ${fg ? '' : `<input id="pw" type="password" dir="ltr" autocomplete="${up ? 'new-password' : 'current-password'}" placeholder="${t('password')}" required>`}
    <button class="btn" id="go">${fg ? t('forgot') : up ? t('signup') : t('signin')}</button>
   </form>
   ${S.authMode === 'in' ? `<button class="link" data-act="mode" data-v="forgot">${t('forgot')}</button>` : ''}
   <button class="link" data-act="mode" data-v="${S.authMode === 'in' ? 'up' : 'in'}">${S.authMode === 'in' ? t('noacc') : t('haveacc')}</button>
   <div class="small mut" style="text-align:center"><a class="mut" href="${LEGAL}privacy.html" target="_blank" rel="noopener">${t('privacy')}</a> · <a class="mut" href="${LEGAL}terms.html" target="_blank" rel="noopener">${t('terms')}</a></div>
  </div></div>`;
  $('#af').onsubmit = async ev => {
    ev.preventDefault();
    const em = $('#em').value.trim(), pw = $('#pw') ? $('#pw').value : '', go = $('#go'); go.disabled = true;
    try {
      if (fg) { await A.recover(em); renderAuth({ok: t('resetsent')}); return; }
      if (up) { if (pw.length < 6) throw new Error(t('min6')); if (!(await A.signUp(em, pw))) { S.authMode = 'in'; renderAuth({ok: t('confirm')}); return; } }
      else await A.signIn(em, pw);
      await boot();
    } catch (e) { renderAuth({err: e.message}); }
  };
}

/* ---------- shell ---------- */
async function boot() {
  applyLang();
  root.innerHTML = `<div class="view">${spin}</div>`;
  try {
    const [me, liked, fol, blk, gifts] = await Promise.all([A.profile(session.userID), A.liked(), A.following(), A.blocked(), A.gifts()]);
    S.me = me; S.liked = new Set(liked); S.following = new Set(fol); S.blocked = new Set(blk); S.gifts = gifts.filter(g => g.active !== false);
  } catch (e) { if (e.status === 401) { saveSession(null); return renderAuth({err: e.message}); } toast(e.message); }
  S.tab = 'home'; S.overlay = [];
  shell();
  refreshUnread();
}
function shell() {
  applyLang();
  const tabs = [['home', '🏠', t('home')], ['discover', '🔎', t('discover')], ['upload', '➕', t('upload')], ['inbox', '💬', t('inbox')], ['me', '👤', t('me')]];
  root.innerHTML = `<div id="main" style="flex:1;min-height:0;display:flex;flex-direction:column"></div><nav class="tabs">${tabs.map(([k, i, n]) => `<button data-act="tab" data-v="${k}" class="${S.tab === k && !S.overlay.length ? 'on' : ''}"><span class="i">${i}</span>${n}${k === 'inbox' && S.unread ? `<span class="dot">${S.unread}</span>` : ''}</button>`).join('')}</nav><div id="layer"></div>`;
  render();
}
async function refreshUnread() { try { const th = await A.threads(); S.unread = th.reduce((a, x) => a + (x.unread || 0), 0); const b = $('.tabs [data-v=inbox]'); if (b) { let d = $('.dot', b); if (S.unread) { if (!d) { d = document.createElement('span'); d.className = 'dot'; b.append(d); } d.textContent = S.unread; } else if (d) d.remove(); } } catch {} }
function render() {
  $$('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.v === S.tab && !S.overlay.length));
  const m = $('#main');
  stopMedia();
  ({home: vHome, discover: vDiscover, upload: vUpload, inbox: vInbox, me: vMe})[S.tab](m);
  const lay = $('#layer'); lay.innerHTML = '';
  const top = S.overlay[S.overlay.length - 1];
  if (top) { const d = document.createElement('div'); d.style.cssText = 'position:absolute;inset:0;background:var(--bg);display:flex;flex-direction:column;z-index:10'; lay.append(d); ({profile: vProfile, chat: vChat, settings: vSettings, edit: vEdit, activity: vActivity})[top.k](d, top); }
}
const push = (k, o = {}) => { S.overlay.push({k, ...o}); render(); };
const pop = () => { S.overlay.pop(); render(); };
function stopMedia() { $$('video').forEach(v => { try { v.pause(); } catch {} }); }

/* ---------- feed ---------- */
function postHTML(p) {
  const a = p.author || {}, liked = S.liked.has(p.id), media = p.kind === 'photo'
    ? `<img class="m" src="${esc(p.media_url)}" alt="" loading="lazy">`
    : `<video src="${esc(p.media_url)}" playsinline loop ${S.muted ? 'muted' : ''} preload="metadata"></video>`;
  return `<section class="post" data-id="${p.id}">${media}<div class="ov"></div>
   <div class="info"><div class="who" data-act="user" data-v="${p.author_id}">${avatar(a.avatar_url, a.username)}<span>@${esc(a.username)}</span></div>${p.caption ? `<div class="small" style="margin-top:6px">${esc(p.caption)}</div>` : ''}</div>
   <div class="side">
    <button data-act="like" data-v="${p.id}" class="${liked ? 'liked' : ''}"><span class="i">${liked ? '❤️' : '🤍'}</span><span class="c">${fmt(p.like_count)}</span></button>
    ${p.allow_comments === 'nobody' ? '' : `<button data-act="comments" data-v="${p.id}"><span class="i">💬</span>${fmt(p.comment_count)}</button>`}
    ${p.author_id !== session.userID ? `<button data-act="gift" data-v="${p.id}" data-u="${p.author_id}"><span class="i">🎁</span>${t('gift')}</button>` : ''}
    ${p.kind !== 'photo' ? `<button data-act="mute"><span class="i">${S.muted ? '🔇' : '🔊'}</span></button>` : ''}
   </div></section>`;
}
function wireFeed(box) {
  const seen = new Set();
  const io = new IntersectionObserver(es => es.forEach(e => {
    const v = $('video', e.target);
    if (e.isIntersecting && e.intersectionRatio > .6) {
      if (v) { v.muted = S.muted; v.play().catch(() => {}); }
      const id = e.target.dataset.id; if (!seen.has(id)) { seen.add(id); A.view(id); }
    } else if (v) v.pause();
  }), {root: box, threshold: [0, .6, 1]});
  $$('.post', box).forEach(s => io.observe(s));
}
async function vHome(m) {
  m.innerHTML = `<div class="top"><span class="logo" style="font-size:18px;background:none;color:#fff;-webkit-text-fill-color:#fff">Livegift</span></div><div class="feed" id="feed">${spin}</div>`;
  try {
    const all = await A.feed();
    S.posts = all.filter(p => !S.blocked.has(p.author_id));
    const f = $('#feed'); if (!f) return;
    f.innerHTML = S.posts.length ? S.posts.map(postHTML).join('') : `<div class="empty" style="padding-top:40vh">${t('nofeed')}</div>`;
    wireFeed(f);
  } catch (e) { const f = $('#feed'); if (f) f.innerHTML = `<div class="empty" style="padding-top:40vh">${esc(e.message)}</div>`; }
}

/* ---------- discover ---------- */
async function vDiscover(m) {
  m.innerHTML = `<div class="view"><h1>${t('discover')}</h1><input id="q" placeholder="${t('search')}" style="margin:8px 0 14px"><div id="res" class="list">${spin}</div></div>`;
  const res = $('#res');
  const show = rows => { res.innerHTML = rows.length ? rows.map(r => `<div class="it" data-act="user" data-v="${r.id}">${avatar(r.avatar_url, r.username)}<div class="t"><b>@${esc(r.username)}</b><div class="mut small">${esc(r.display_name || '')}${r.followers != null ? ' · ' + fmt(r.followers) + ' ' + t('followers') : ''}</div></div></div>`).join('') : `<div class="empty">—</div>`; };
  let list = []; try { list = (await A.creators()).filter(c => !S.blocked.has(c.id)); show(list); } catch (e) { res.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
  let tm; $('#q').oninput = e => { clearTimeout(tm); const v = e.target.value.trim(); tm = setTimeout(async () => { if (!v) return show(list); try { show(await A.search(v)); } catch (x) { fail(x); } }, 300); };
}

/* ---------- upload ---------- */
function vUpload(m) {
  m.innerHTML = `<div class="view"><h1>${t('upload')}</h1><div style="display:flex;flex-direction:column;gap:14px;margin-top:12px">
   <label class="btn sec" style="cursor:pointer">${t('choose')}<input id="file" type="file" accept="image/*,video/*" hidden></label>
   <div id="prev"></div>
   <textarea id="cap" rows="3" maxlength="300" placeholder="${t('caption')}"></textarea>
   <div><label class="k">${t('vis')}</label><div class="chips" id="vis">${[['public', t('public')], ['followers', t('followersonly')], ['private', t('private')]].map(([k, n], i) => `<button data-v="${k}" class="${i ? '' : 'on'}">${n}</button>`).join('')}</div></div>
   <button class="btn" id="pub" disabled>${t('publish')}</button></div></div>`;
  let file = null, vis = 'public';
  $('#file').onchange = e => { file = e.target.files[0]; if (!file) return; const u = URL.createObjectURL(file); $('#prev').innerHTML = file.type.startsWith('video') ? `<video src="${u}" controls playsinline style="width:100%;max-height:44vh;border-radius:14px;background:#000"></video>` : `<img src="${u}" style="width:100%;max-height:44vh;object-fit:contain;border-radius:14px;background:#000">`; $('#pub').disabled = false; };
  $$('#vis button').forEach(b => b.onclick = () => { vis = b.dataset.v; $$('#vis button').forEach(x => x.classList.toggle('on', x === b)); });
  $('#pub').onclick = async () => {
    if (!file) return; const b = $('#pub'); b.disabled = true; b.textContent = t('publishing');
    try {
      const photo = file.type.startsWith('image'), id = crypto.randomUUID(), path = `${session.userID}/${id}.${photo ? 'jpg' : 'mp4'}`;
      const blob = photo ? await shrink(file, 1600) : file;
      const url = await upload(blob, path, photo ? 'image/jpeg' : 'video/mp4');
      await ins('posts', {id, author_id: session.userID, kind: photo ? 'photo' : 'video', media_url: url, caption: $('#cap').value.trim(), effect: 'none', visibility: vis, allow_download: 'everyone', allow_share: 'everyone', allow_comments: 'everyone'});
      toast(t('published')); S.tab = 'home'; shell();
    } catch (e) { fail(e); b.disabled = false; b.textContent = t('publish'); }
  };
}
function shrink(file, max) {
  return new Promise((ok, no) => { const img = new Image(); img.onload = () => { const r = Math.min(1, max / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width * r); c.height = Math.round(img.height * r); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); c.toBlob(b => b ? ok(b) : no(new Error(t('error'))), 'image/jpeg', .88); }; img.onerror = () => no(new Error(t('error'))); img.src = URL.createObjectURL(file); });
}

/* ---------- inbox & chat ---------- */
async function vInbox(m) {
  m.innerHTML = `<div class="view"><h1>${t('inbox')}</h1><div id="th" class="list">${spin}</div></div>`;
  try {
    const th = await A.threads(), box = $('#th'); if (!box) return;
    box.innerHTML = th.length ? th.map(x => `<div class="it" data-act="chat" data-v="${x.other_id}" data-n="${esc(x.username)}">${avatar(null, x.username)}<div class="t"><b>@${esc(x.username)}</b><div class="mut small">${esc(x.last_body)}</div></div>${x.unread ? `<span class="dot" style="position:static">${x.unread}</span>` : ''}</div>`).join('') : `<div class="empty">${t('nomsg')}</div>`;
    S.unread = th.reduce((a, x) => a + (x.unread || 0), 0);
  } catch (e) { $('#th').innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
}
async function vChat(d, o) {
  d.innerHTML = `<div class="bar"><button class="back" data-act="back">${L[lang].dir === 'rtl' ? '→' : '←'}</button><b>@${esc(o.name || '')}</b></div><div class="chat"><div class="msgs" id="msgs">${spin}</div><div class="row" style="padding:10px 16px;padding-bottom:max(10px,env(safe-area-inset-bottom))"><input id="mi" placeholder="${t('typemsg')}" maxlength="1000"><button class="send grad" id="ms">${t('send')}</button></div></div>`;
  let last = 0; const box = $('#msgs'); let first = true;
  const draw = ms => { if (first) { box.innerHTML = ''; first = false; } ms.forEach(x => { if (x.deleted) return; last = Math.max(last, x.id); const b = document.createElement('div'); b.className = 'bubble' + (x.sender_id === session.userID ? ' me' : ''); b.textContent = x.body || (x.media_url ? '📎' : ''); box.append(b); }); box.scrollTop = box.scrollHeight; };
  const poll = async () => { if (!document.body.contains(box)) { clearInterval(iv); return; } try { const ms = await A.dmList(o.id, last); if (first || ms.length) draw(ms); if (ms.length) A.dmRead(o.id); } catch {} };
  const iv = setInterval(poll, 4000); poll();
  const sendIt = async () => { const i = $('#mi'), v = i.value.trim(); if (!v) return; i.value = ''; try { await A.dmSend(o.id, v); poll(); } catch (e) { fail(e); i.value = v; } };
  $('#ms').onclick = sendIt; $('#mi').onkeydown = e => { if (e.key === 'Enter') sendIt(); };
}

/* ---------- profile (me / others) ---------- */
function postGrid(ps) { return ps.length ? `<div class="grid">${ps.map(p => `<div class="g" data-act="open" data-v="${p.id}">${p.kind === 'photo' ? `<img src="${esc(p.media_url)}" loading="lazy" alt="">` : `<video src="${esc(p.media_url)}#t=0.1" preload="metadata" muted playsinline></video>`}<span>❤️ ${fmt(p.like_count)}</span></div>`).join('')}</div>` : `<div class="empty">${t('nofeed')}</div>`; }
async function vMe(m) {
  const me = S.me || {};
  m.innerHTML = `<div class="view">
   ${S.installHint && !matchMedia('(display-mode: standalone)').matches && !navigator.standalone ? `<div class="install">${t('installhint')}<br><button class="link" data-act="hint">${t('dismiss')}</button></div>` : ''}
   <div style="display:flex;flex-direction:column;align-items:center;gap:6px">${avatar(me.avatar_url, me.username, 'big')}<h2 style="margin:6px 0 0">${esc(me.display_name || me.username)}</h2><div class="mut">@${esc(me.username)}</div><div class="small" style="text-align:center">${esc(me.bio)}</div></div>
   <div class="stats" id="st"><div><b>…</b><span class="mut small">${t('followers')}</span></div><div><b>…</b><span class="mut small">${t('likes')}</span></div><div><b>${fmt(me.coins)}</b><span class="mut small">${t('coins')} 🪙</span></div></div>
   <div class="row" style="margin-bottom:10px"><button class="btn sec" data-act="edit">${t('edit')}</button><button class="btn sec" data-act="activity" style="width:auto;padding-inline:18px">🔔</button><button class="btn sec" data-act="settings" style="width:auto;padding-inline:18px">⚙️</button></div>
   <div id="mine">${spin}</div></div>`;
  A.stats().then(s => { const st = $('#st'); if (st && s) st.innerHTML = `<div><b>${fmt(s.followers)}</b><span class="mut small">${t('followers')}</span></div><div><b>${fmt(s.likes)}</b><span class="mut small">${t('likes')}</span></div><div><b>${fmt(me.coins)}</b><span class="mut small">${t('coins')} 🪙</span></div>`; }).catch(() => {});
  try { const ps = await A.userPosts(session.userID); S.mine = ps; const b = $('#mine'); if (b) b.innerHTML = postGrid(ps); } catch (e) { const b = $('#mine'); if (b) b.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
}
async function vProfile(d, o) {
  d.innerHTML = `<div class="bar"><button class="back" data-act="back">${L[lang].dir === 'rtl' ? '→' : '←'}</button><b>${t('profile')}</b></div><div class="view" id="pv">${spin}</div>`;
  try {
    const [p, ps] = await Promise.all([A.profile(o.id), A.userPosts(o.id)]);
    if (!p) throw new Error('—');
    const self = o.id === session.userID, fol = S.following.has(o.id), blk = S.blocked.has(o.id);
    $('#pv').innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:6px">${avatar(p.avatar_url, p.username, 'big')}<h2 style="margin:6px 0 0">${esc(p.display_name || p.username)}</h2><div class="mut">@${esc(p.username)}</div><div class="small" style="text-align:center">${esc(p.bio)}</div></div>
     ${self ? '' : `<div class="row" style="margin:14px 0"><button class="btn ${fol ? 'sec' : ''}" data-act="follow" data-v="${o.id}">${fol ? t('following') : t('follow')}</button><button class="btn sec" data-act="chat" data-v="${o.id}" data-n="${esc(p.username)}" style="width:auto">💬</button></div>
     <div class="row small" style="justify-content:center;margin-bottom:10px"><button class="link" data-act="block" data-v="${o.id}">${blk ? t('unblock') : t('block')}</button><button class="link" data-act="reportu" data-v="${o.id}">${t('report')}</button></div>`}
     <div style="margin-top:12px">${postGrid(ps)}</div>`;
    S.viewPosts = ps;
  } catch (e) { $('#pv').innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
}
function vEdit(d) {
  const me = S.me;
  d.innerHTML = `<div class="bar"><button class="back" data-act="back">${L[lang].dir === 'rtl' ? '→' : '←'}</button><b>${t('edit')}</b></div><div class="view" style="display:flex;flex-direction:column;gap:12px">
   <div style="text-align:center">${avatar(me.avatar_url, me.username, 'big')}<br><label class="link" style="cursor:pointer">${t('avatar')}<input id="avf" type="file" accept="image/*" hidden></label></div>
   <div><label class="k">${t('username')}</label><input id="un" dir="ltr" value="${esc(me.username)}" maxlength="24"></div>
   <div><label class="k">${t('displayname')}</label><input id="dn" value="${esc(me.display_name)}" maxlength="40"></div>
   <div><label class="k">${t('bio')}</label><textarea id="bi" rows="3" maxlength="160">${esc(me.bio)}</textarea></div>
   <button class="btn" id="sv">${t('save')}</button></div>`;
  let avUrl = null;
  $('#avf').onchange = async e => { const f = e.target.files[0]; if (!f) return; try { const b = await shrink(f, 512); avUrl = await upload(b, `${session.userID}/avatar-${Date.now()}.jpg`, 'image/jpeg'); toast(t('saved')); } catch (x) { fail(x); } };
  $('#sv').onclick = async () => { const row = {username: $('#un').value.trim(), display_name: $('#dn').value.trim(), bio: $('#bi').value.trim()}; if (avUrl) row.avatar_url = avUrl; try { await A.updateProfile(row); S.me = await A.profile(session.userID); toast(t('saved')); pop(); } catch (e) { fail(e); } };
}
function vSettings(d) {
  d.innerHTML = `<div class="bar"><button class="back" data-act="back">${L[lang].dir === 'rtl' ? '→' : '←'}</button><b>${t('settings')}</b></div><div class="view" style="display:flex;flex-direction:column;gap:14px">
   <div class="mut small">${t('signedas')} ${esc(session.email)}</div>
   <div><label class="k">${t('language')}</label><div class="lang" style="justify-content:flex-start">${['fa', 'en', 'de'].map(l => `<button data-act="lang" data-v="${l}" class="${l === lang ? 'on' : ''}">${l === 'fa' ? 'فارسی' : l === 'en' ? 'English' : 'Deutsch'}</button>`).join('')}</div></div>
   <div class="install">${t('liveios')}</div>
   <a class="btn sec" href="${LEGAL}privacy.html" target="_blank" rel="noopener">${t('privacy')}</a>
   <a class="btn sec" href="${LEGAL}terms.html" target="_blank" rel="noopener">${t('terms')}</a>
   <a class="btn sec" href="${LEGAL}support.html" target="_blank" rel="noopener">${t('support')}</a>
   <button class="btn sec" data-act="logout">${t('logout')}</button>
   <button class="btn danger" data-act="delacc">${t('deleteacc')}</button></div>`;
}
async function vActivity(d) {
  d.innerHTML = `<div class="bar"><button class="back" data-act="back">${L[lang].dir === 'rtl' ? '→' : '←'}</button><b>${t('activity')}</b></div><div class="view list" id="ac">${spin}</div>`;
  try {
    const rows = await A.activity(), ids = [...new Set(rows.map(r => r.actor))];
    const names = {}; if (ids.length) (await sel('profiles', {select: 'id,username', id: 'in.(' + ids.join(',') + ')'})).forEach(n => names[n.id] = n.username);
    const txt = r => ({like: t('like_a'), comment: t('comment_a'), follow: t('follow_a'), gift: t('gift_a')}[r.kind] || r.kind);
    $('#ac').innerHTML = rows.length ? rows.map(r => `<div class="it" data-act="user" data-v="${r.actor}">${avatar(null, names[r.actor])}<div class="t"><div><b>@${esc(names[r.actor] || '?')}</b> ${esc(txt(r))}${r.coins ? ' · ' + r.coins + ' 🪙' : ''}</div></div><span class="mut small">${ago(r.created_at)}</span></div>`).join('') : `<div class="empty">${t('noactivity')}</div>`;
    rpc('mark_activity_seen').catch(() => {});
  } catch (e) { $('#ac').innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
}

/* ---------- sheets ---------- */
function sheet(title, inner) {
  closeSheet();
  const bg = document.createElement('div'); bg.className = 'sheet-bg'; bg.id = 'sheet';
  bg.innerHTML = `<div class="sheet"><header><span>${title}</span><button data-act="closesheet" style="font-size:20px">✕</button></header>${inner}</div>`;
  bg.onclick = e => { if (e.target === bg) closeSheet(); };
  root.append(bg); return bg;
}
const closeSheet = () => { const s = $('#sheet'); if (s) s.remove(); };
async function commentsSheet(id) {
  const post = [...S.posts, ...(S.viewPosts || []), ...(S.mine || [])].find(p => p.id === id);
  const bg = sheet(t('comments'), `<div class="body" id="cl">${spin}</div><div class="row" style="padding:10px 16px"><input id="ci" placeholder="${t('addcomment')}" maxlength="300"><button class="send grad" id="cs">${t('send')}</button></div>`);
  const load = async () => { try { const cs = await A.comments(id); $('#cl').innerHTML = cs.length ? cs.map(c => `<div class="cm">${avatar(c.author?.avatar_url, c.author?.username)}<div><b>@${esc(c.author?.username)}</b> <span class="mut small">${ago(c.created_at)}</span><div>${esc(c.body)}</div></div></div>`).join('') : `<div class="empty">${t('nocomments')}</div>`; $('#cl').scrollTop = 1e6; } catch (e) { $('#cl').innerHTML = `<div class="empty">${esc(e.message)}</div>`; } };
  load();
  const go = async () => { const i = $('#ci'), v = i.value.trim(); if (!v) return; i.value = ''; try { await A.comment(id, v); if (post) post.comment_count++; load(); } catch (e) { fail(e); i.value = v; } };
  $('#cs').onclick = go; $('#ci').onkeydown = e => { if (e.key === 'Enter') go(); };
}
function giftSheet(user, postId) {
  let pick = null, qty = 1;
  const bg = sheet(t('gift'), `<div class="body"><div class="mut small" style="margin-bottom:10px">${t('balance')}: <b id="bal">${fmt(S.me.coins)}</b> 🪙</div><div class="gifts">${S.gifts.map(g => `<button class="gift" data-g="${g.id}"><div class="e">${esc(g.emoji)}</div>${esc(lang === 'fa' ? g.name_fa : g.name_en)}<div class="mut">${g.price} 🪙</div></button>`).join('')}</div>
   <div class="chips" style="margin:14px 0" id="qs">${[1, 5, 10].map(n => `<button data-q="${n}" class="${n === 1 ? 'on' : ''}">×${n}</button>`).join('')}</div><button class="btn" id="gs" disabled>${t('sendgift')}</button></div>`);
  $$('.gift', bg).forEach(b => b.onclick = () => { pick = S.gifts.find(g => g.id === b.dataset.g); $$('.gift', bg).forEach(x => x.classList.toggle('on', x === b)); $('#gs').disabled = false; });
  $$('#qs button', bg).forEach(b => b.onclick = () => { qty = +b.dataset.q; $$('#qs button', bg).forEach(x => x.classList.toggle('on', x === b)); });
  $('#gs').onclick = async () => {
    if (!pick) return;
    if (S.me.coins < pick.price * qty) return toast(t('nocoins'));
    try { S.me.coins = Number(await A.sendGift(user, pick.id, qty, postId)); toast(t('giftsent')); closeSheet(); } catch (e) { fail(e); }
  };
}
function openPostViewer(id, list) {
  const idx = list.findIndex(p => p.id === id);
  const d = document.createElement('div'); d.id = 'viewer'; d.style.cssText = 'position:absolute;inset:0;background:#000;z-index:15;display:flex;flex-direction:column';
  d.innerHTML = `<button data-act="closeviewer" style="position:absolute;top:max(10px,env(safe-area-inset-top));inset-inline-start:12px;z-index:5;font-size:26px;text-shadow:0 1px 4px #000">✕</button><div class="feed" id="vf">${list.map(postHTML).join('')}</div>`;
  root.append(d); const f = $('#vf'); f.children[idx].scrollIntoView(); wireFeed(f);
  S.viewList = list;
}

/* ---------- events ---------- */
async function act(el) {
  const a = el.dataset.act, v = el.dataset.v;
  switch (a) {
    case 'lang': lang = v; store.set('lg.lang', v); if (session) { applyLang(); shell(); if (S.overlay.length) {} } else renderAuth(); break;
    case 'mode': S.authMode = v; renderAuth(); break;
    case 'tab': S.overlay = []; S.tab = v; closeSheet(); render(); break;
    case 'back': pop(); break;
    case 'hint': S.installHint = false; store.set('lg.hint', '1'); render(); break;
    case 'mute': S.muted = !S.muted; $$('video').forEach(x => x.muted = S.muted); $$('[data-act=mute] .i').forEach(i => i.textContent = S.muted ? '🔇' : '🔊'); break;
    case 'like': {
      const id = v, p = [...S.posts, ...(S.viewList || []), ...(S.viewPosts || []), ...(S.mine || [])].find(x => x.id === id), on = !S.liked.has(id);
      on ? S.liked.add(id) : S.liked.delete(id); if (p) p.like_count = Math.max(0, p.like_count + (on ? 1 : -1));
      $$(`[data-act=like][data-v="${id}"]`).forEach(b => { b.classList.toggle('liked', on); $('.i', b).textContent = on ? '❤️' : '🤍'; $('.c', b).textContent = fmt(p ? p.like_count : 0); });
      try { await A.like(id, on); } catch (e) { fail(e); } break;
    }
    case 'comments': commentsSheet(v); break;
    case 'gift': giftSheet(el.dataset.u, v); break;
    case 'closesheet': closeSheet(); break;
    case 'user': { const vw = $('#viewer'); if (vw) vw.remove(); S.overlay.push({k: 'profile', id: v}); render(); break; }
    case 'chat': S.overlay.push({k: 'chat', id: v, name: el.dataset.n}); render(); break;
    case 'open': openPostViewer(v, S.overlay.length ? S.viewPosts : S.mine); break;
    case 'closeviewer': $('#viewer')?.remove(); break;
    case 'follow': { const on = !S.following.has(v); on ? S.following.add(v) : S.following.delete(v); el.textContent = on ? t('following') : t('follow'); el.classList.toggle('sec', on); try { await A.follow(v, on); } catch (e) { fail(e); } break; }
    case 'block': { const on = !S.blocked.has(v); try { await A.block(v, on); on ? S.blocked.add(v) : S.blocked.delete(v); on && S.following.delete(v); render(); } catch (e) { fail(e); } break; }
    case 'reportu': try { await A.report('user', v, 'user_report'); toast(t('reported')); } catch (e) { fail(e); } break;
    case 'edit': push('edit'); break;
    case 'settings': push('settings'); break;
    case 'activity': push('activity'); break;
    case 'logout': saveSession(null); S.me = null; renderAuth(); break;
    case 'delacc': {
      const b = sheet(t('deleteacc'), `<div class="body"><p>${t('deleteask')}</p><button class="btn danger" id="dy">${t('yes')}</button><br><button class="btn sec" data-act="closesheet">${t('cancel')}</button></div>`);
      $('#dy', b).onclick = async () => { try { await A.deleteAccount(); saveSession(null); renderAuth(); } catch (e) { fail(e); } }; break;
    }
  }
}
document.addEventListener('click', e => { const el = e.target.closest('[data-act]'); if (el) { e.preventDefault(); act(el); } });

/* ---------- start ---------- */
if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
applyLang();
session ? boot() : renderAuth();
window.__lg = {S, t};
