'use strict';
/* Livegift Web (PWA) — uses the same Supabase backend as the iOS app. */
const URL_ = 'https://wqgnvqrhdpkneqfduexj.supabase.co';
const KEY = 'sb_publishable_jUYA9uX5yvEt5H48YAES7g_EZy4LlQH';
const BUCKET = 'media';
const SUPPORT = 'Morti.r@icloud.com';
const LEGAL = 'https://morti-amg.github.io/livegift-legal/';

/* ---------- i18n ---------- */
const L = {
 fa:{foryou:'برای شما',followingtab:'دنبال‌شونده‌ها',nofollowing:'هنوز کسی را دنبال نمی‌کنید یا پستی نیست.',trending:'پربازدیدها',likedtab:'لایک‌شده‌ها',dir:'rtl',home:'خانه',discover:'کشف',inbox:'پیام‌ها',me:'من',email:'ایمیل',password:'رمز عبور',signin:'ورود',signup:'ساخت حساب',forgot:'رمز را فراموش کرده‌ام',
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
 en:{foryou:'For you',followingtab:'Following',nofollowing:'You follow nobody yet, or there are no posts.',trending:'Trending',likedtab:'Liked',dir:'ltr',home:'Home',discover:'Discover',inbox:'Messages',me:'Me',email:'Email',password:'Password',signin:'Sign in',signup:'Create account',forgot:'Forgot password',
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
 de:{foryou:'Für dich',followingtab:'Folge ich',nofollowing:'Du folgst noch niemandem oder es gibt keine Beiträge.',trending:'Im Trend',likedtab:'Gefällt mir',dir:'ltr',home:'Start',discover:'Entdecken',inbox:'Nachrichten',me:'Ich',email:'E-Mail',password:'Passwort',signin:'Anmelden',signup:'Konto erstellen',forgot:'Passwort vergessen',
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

const XL = {
 fa:{online:'آنلاین‌ها',spot:'خالق ویژه',tags:'هشتگ‌های داغ',all:'همه',photos:'عکس',videos:'ویدیو',lv:['تازه‌وارد','در حال رشد','ستاره','آیکون','افسانه'],level:'سطح',appearance:'ظاهر',theme:'پوسته',auto:'خودکار',dark:'تیره',light:'روشن',accent:'رنگ اصلی',skip:'رد کردن',
  onb1t:'ویدیو بساز و شگفت‌زده کن',onb1d:'فیلتر و افکت زنده، متن و استیکر، همه در همین برنامه.',onb2t:'هدیه بده، حمایت کن',onb2d:'دکمهٔ هدیه را نگه دار تا سریع و پشت‌سرهم بفرستی.',onb3t:'گفتگو و دوستان',onb3d:'پیام بده، دنبال کن و آدم‌های تازه کشف کن.',start:'شروع',nxt:'بعدی',combo:'کمبو',noresult:'نتیجه‌ای پیدا نشد.',account:'حساب',about:'دربارهٔ برنامه',score:'امتیاز',tapgift:'ارسال سریع'},
 en:{online:'Online now',spot:'Featured creator',tags:'Trending tags',all:'All',photos:'Photos',videos:'Videos',lv:['Newcomer','Rising','Star','Icon','Legend'],level:'Level',appearance:'Appearance',theme:'Theme',auto:'Auto',dark:'Dark',light:'Light',accent:'Accent color',skip:'Skip',
  onb1t:'Make videos that wow',onb1d:'Live filters and effects, text and stickers, all in one app.',onb2t:'Send gifts, show support',onb2d:'Hold the gift button to send quickly, again and again.',onb3t:'Chat and friends',onb3d:'Message, follow and discover new people.',start:'Get started',nxt:'Next',combo:'Combo',noresult:'No results found.',account:'Account',about:'About',score:'Score',tapgift:'Quick send'},
 de:{online:'Jetzt online',spot:'Creator des Tages',tags:'Trend-Hashtags',all:'Alle',photos:'Fotos',videos:'Videos',lv:['Neuling','Aufsteiger','Star','Ikone','Legende'],level:'Level',appearance:'Darstellung',theme:'Design',auto:'Automatisch',dark:'Dunkel',light:'Hell',accent:'Akzentfarbe',skip:'Überspringen',
  onb1t:'Videos, die begeistern',onb1d:'Live-Filter und Effekte, Text und Sticker, alles in einer App.',onb2t:'Geschenke senden, unterstützen',onb2d:'Geschenk-Button gedrückt halten für schnelles, wiederholtes Senden.',onb3t:'Chat und Freunde',onb3d:'Nachrichten senden, folgen und neue Leute entdecken.',start:'Los geht’s',nxt:'Weiter',combo:'Combo',noresult:'Keine Ergebnisse gefunden.',account:'Konto',about:'Über die App',score:'Punkte',tapgift:'Schnell senden'}
};
for (const k in XL) Object.assign(L[k], XL[k]);
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
const S = {tab: 'home', overlay: [], me: null, posts: [], liked: new Set(), following: new Set(), blocked: new Set(), gifts: [], unread: 0, muted: true, installHint: store.get('lg.hint') !== '1', authMode: 'in', ftab: 'foryou', ptab: 'posts', all: null, theme: store.get('lg.theme') || 'dark', accent: store.get('lg.acc') || 'aurora', onb: store.get('lg.onb') !== '1', dtag: null, dcat: 'all'};
const ACC = {aurora: ['#ff3d81', '#8a5cff'], ocean: ['#18e0ff', '#7a5cff'], sunset: ['#ffa03d', '#ff3d81'], lime: ['#35d07f', '#18c4ff']};
function applyTheme() {
  const r = document.documentElement, dark = S.theme === 'dark' || (S.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  r.dataset.theme = dark ? 'dark' : 'light';
  const [a, b] = ACC[S.accent] || ACC.aurora; r.style.setProperty('--acc', a); r.style.setProperty('--acc2', b); r.style.setProperty('--g', `linear-gradient(135deg,${a} 0%,${b} 100%)`);
  const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = dark ? '#08060e' : '#f6f3fb';
}
applyTheme();
const AURORA = '<div class="aurora"><i></i><i></i><i></i></div>';
const hueOf = id => { let h = 0; for (const c of String(id)) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
const thumbOf = p => p.kind === 'photo' ? p.media_url : p.media_url.replace(/\.(mp4|webm|mov)$/i, '-thumb.jpg');
window.lgVid = (img, u) => { const v = document.createElement('video'); v.src = u + '#t=0.5'; v.muted = true; v.playsInline = true; v.preload = 'auto'; v.onloadeddata = () => { try { v.currentTime = .5; } catch {} }; img.replaceWith(v); };
const LEVELS = [['🌱', 0], ['🚀', 10], ['⭐', 50], ['👑', 200], ['🔥', 1000]];
const lvlOf = sc => { let i = 0; LEVELS.forEach(([, n], k) => { if (sc >= n) i = k; }); return i; };
function countUp(el, to) { const t0 = performance.now(), d = 700; const f = now => { const k = Math.min(1, (now - t0) / d); el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); }

const root = $('#app');
function toast(m) { const e = $('#toast'); e.textContent = m; e.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => e.hidden = true, 2600); }
const fail = e => toast(e && e.message ? e.message : t('error'));
function applyLang() { document.documentElement.lang = lang; document.documentElement.dir = L[lang].dir; }
const initial = n => esc((n || '?').trim().charAt(0).toUpperCase());
const avatar = (url, name, cls = '') => url ? `<img class="av ${cls}" src="${esc(url)}" alt="" loading="lazy">` : `<span class="av grad ${cls}">${initial(name)}</span>`;
const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'K' : String(n ?? 0);
const ago = d => { const s = (Date.now() - new Date(d)) / 1000; return s < 60 ? '·' : s < 3600 ? Math.floor(s / 60) + 'm' : s < 86400 ? Math.floor(s / 3600) + 'h' : Math.floor(s / 86400) + 'd'; };
const spin = '<div class="spin"></div>';
const IC = {
 home:'<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
 search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
 plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
 chat:'<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
 user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
 heart:'<svg viewBox="0 0 24 24"><path d="M12 20.5s-8-4.8-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 6.2-8 11-8 11z"/></svg>',
 comment:'<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
 gift:'<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8M12 8S10 3 7.5 4.5 9 8 12 8zm0 0s2-5 4.500-3.500S15 8 12 8z"/></svg>',
 share:'<svg viewBox="0 0 24 24"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13"/></svg>',
 more:'<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/></svg>',
 sound:'<svg viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4zM16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/></svg>',
 mute:'<svg viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4zM22 9l-6 6M16 9l6 6"/></svg>'
};

/* ---------- render: auth ---------- */
function renderOnb(n = 0) {
  applyLang();
  const sl = [['🎬', t('onb1t'), t('onb1d')], ['🎁', t('onb2t'), t('onb2d')], ['💬', t('onb3t'), t('onb3d')]], c = sl[n];
  root.innerHTML = `${AURORA}<div class="view onb"><div class="lang">${['fa', 'en', 'de'].map(l => `<button data-act="lang" data-v="${l}" class="${l === lang ? 'on' : ''}">${l === 'fa' ? 'فارسی' : l === 'en' ? 'English' : 'Deutsch'}</button>`).join('')}</div>
   <div class="onb-c"><div class="onb-ic" key="${n}">${c[0]}</div><h1>${c[1]}</h1><p class="mut">${c[2]}</p></div>
   <div class="dots">${sl.map((_, k) => `<i class="${k === n ? 'on' : ''}"></i>`).join('')}</div>
   <div class="row" style="width:100%"><button class="btn sec" data-act="onbskip" style="flex:1">${t('skip')}</button><button class="btn" data-act="onbnext" data-v="${n}" style="flex:2">${n === 2 ? t('start') : t('nxt')}</button></div></div>`;
}
function renderAuth(msg = {}) {
  applyLang();
  if (S.onb) return renderOnb(S.onbStep || 0);
  const up = S.authMode === 'up', fg = S.authMode === 'forgot';
  root.innerHTML = `${AURORA}<div class="view"><div class="auth">
   <div style="text-align:center"><div class="logo">Livegift</div><div class="mut">${t('tagline')}</div></div>
   <div class="lang">${['fa', 'en', 'de'].map(l => `<button data-act="lang" data-v="${l}" class="${l === lang ? 'on' : ''}">${l === 'fa' ? 'فارسی' : l === 'en' ? 'English' : 'Deutsch'}</button>`).join('')}</div>
   ${msg.err ? `<div class="err">${esc(msg.err)}</div>` : ''}${msg.ok ? `<div class="okmsg">${esc(msg.ok)}</div>` : ''}
   <form id="af" class="glass" style="display:flex;flex-direction:column;gap:12px;padding:16px">
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
  const tabs = [['home', IC.home, t('home')], ['discover', IC.search, t('discover')], ['upload', IC.plus, ''], ['inbox', IC.chat, t('inbox')], ['me', IC.user, t('me')]];
  root.innerHTML = `${AURORA}<div id="main"></div><nav class="tabs">${tabs.map(([k, i, n]) => `<button data-act="tab" data-v="${k}" class="${k === 'upload' ? 'plus ' : ''}${S.tab === k && !S.overlay.length ? 'on' : ''}">${i}${n ? `<span>${n}</span>` : ''}${k === 'inbox' && S.unread ? `<span class="dot">${S.unread}</span>` : ''}</button>`).join('')}</nav><div id="layer"></div>`;
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
  if (top) { const d = document.createElement('div'); d.style.cssText = 'position:absolute;inset:0;background:var(--bg);display:flex;flex-direction:column;z-index:10'; lay.append(d); ({profile: vProfile, chat: vChat, settings: vSettings, edit: vEdit, activity: vActivity, admin: (x, o) => window.vAdmin(x, o)})[top.k](d, top); }
}
const push = (k, o = {}) => { S.overlay.push({k, ...o}); render(); };
const pop = () => { S.overlay.pop(); render(); };
function stopMedia() { $$('video').forEach(v => { try { v.pause(); } catch {} }); }

/* ---------- feed ---------- */
function postHTML(p) {
  const a = p.author || {}, liked = S.liked.has(p.id), own = p.author_id === session.userID, fol = S.following.has(p.author_id);
  const media = p.kind === 'photo'
    ? `<img class="m" src="${esc(p.media_url)}" alt="" loading="lazy">`
    : `<video src="${esc(p.media_url)}" playsinline loop ${S.muted ? 'muted' : ''} preload="metadata"></video>`;
  return `<section class="post" data-id="${p.id}" data-k="${p.kind}" style="--h:${hueOf(p.id)}">${p.kind === 'photo' ? `<div class="bgblur" style="background-image:url('${esc(p.media_url)}')"></div>` : ''}${media}<div class="ov"></div><div class="pauseic">⏸</div>
   <div class="info"><div class="who" data-act="user" data-v="${p.author_id}">${avatar(a.avatar_url, a.username, 'sm')}<span>@${esc(a.username)}</span></div>${p.caption ? `<div class="cap" data-act="cap">${esc(p.caption)}</div>` : ''}</div>
   <div class="side">
    <div class="avwrap" data-act="user" data-v="${p.author_id}">${avatar(a.avatar_url, a.username, 'ring')}${!own && !fol ? `<span class="follow-plus" data-act="follow2" data-v="${p.author_id}">+</span>` : ''}</div>
    <button data-act="like" data-v="${p.id}" class="${liked ? 'liked' : ''}"><span class="ic">${IC.heart}</span><span class="c">${fmt(p.like_count)}</span></button>
    ${p.allow_comments === 'nobody' ? '' : `<button data-act="comments" data-v="${p.id}"><span class="ic">${IC.comment}</span>${fmt(p.comment_count)}</button>`}
    ${!own ? `<button class="giftb" data-act="gift" data-v="${p.id}" data-u="${p.author_id}"><span class="ic">${IC.gift}</span>${t('gift')}</button>` : ''}
    <button data-act="share" data-v="${p.id}"><span class="ic">${IC.share}</span></button>
    ${p.kind !== 'photo' ? `<button data-act="mute"><span class="ic mic">${S.muted ? IC.mute : IC.sound}</span></button>` : ''}
    <button data-act="more" data-v="${p.id}" data-u="${p.author_id}"><span class="ic">${IC.more}</span></button>
   </div><div class="prog"><i></i></div></section>`;
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
  $$('.post', box).forEach(sec => {
    io.observe(sec);
    const v = $('video', sec), bar = $('.prog i', sec);
    if (v) v.ontimeupdate = () => { if (v.duration) bar.style.width = (v.currentTime / v.duration * 100) + '%'; };
    let last = 0, timer = null;
    sec.addEventListener('click', ev => {
      if (ev.target.closest('button,[data-act]')) return;
      const now = Date.now();
      if (now - last < 320) { clearTimeout(timer); last = 0; heartBurst(sec, ev); const id = sec.dataset.id; if (!S.liked.has(id)) act({dataset: {act: 'like', v: id}}); return; }
      last = now;
      timer = setTimeout(() => { if (v) { const ic = $('.pauseic', sec); if (v.paused) { v.play().catch(() => {}); ic.textContent = '▶'; } else { v.pause(); ic.textContent = '⏸'; } ic.classList.add('show'); setTimeout(() => ic.classList.remove('show'), 500); } }, 330);
    });
  });
}
function heartBurst(sec, ev) {
  const r = sec.getBoundingClientRect(), h = document.createElement('div'); h.className = 'bigheart'; h.textContent = '❤️';
  h.style.left = (ev.clientX - r.left - 55) + 'px'; h.style.top = (ev.clientY - r.top - 70) + 'px'; sec.append(h); setTimeout(() => h.remove(), 850);
}
let _ac; function chime(big) { try { _ac = _ac || new (window.AudioContext || window.webkitAudioContext)(); const n = _ac.currentTime; (big ? [523, 659, 784, 1047, 1319] : [784, 1047]).forEach((f, i) => { const o = _ac.createOscillator(), g = _ac.createGain(); o.type = 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0, n + i * .09); g.gain.linearRampToValueAtTime(.18, n + i * .09 + .02); g.gain.exponentialRampToValueAtTime(.001, n + i * .09 + .7); o.connect(g).connect(_ac.destination); o.start(n + i * .09); o.stop(n + i * .09 + .8); }); } catch {} }
function giftHero(emoji, name) {
  const h = document.createElement('div'); h.className = 'hero3d';
  h.innerHTML = `<div class="halo"></div><div class="rays"></div><div class="obj">${esc(emoji)}</div><div class="nm">${esc(name)}</div>` + Array.from({length: 22}, (_, i) => `<i class="sp" style="--a:${i * 16.4}deg;--d:${120 + Math.random() * 140}px;animation-delay:${Math.random() * .3}s"></i>`).join('');
  ($('#live') || root).append(h); chime(true); if (navigator.vibrate) navigator.vibrate([30, 40, 60]); setTimeout(() => h.remove(), 3600);
}
function giftRain(emoji, name, big) {
  chime(false); if (big) giftHero(emoji, name);
  const r = document.createElement('div'); r.className = 'rain';
  for (let i = 0; i < 26; i++) { const e = document.createElement('span'); e.textContent = emoji; e.style.left = Math.random() * 100 + '%'; e.style.fontSize = (22 + Math.random() * 34) + 'px'; e.style.animationDuration = (1.6 + Math.random() * 1.6) + 's'; e.style.animationDelay = Math.random() * .6 + 's'; r.append(e); }
  const b = document.createElement('div'); b.className = 'giftbanner'; b.textContent = emoji + ' ' + name; r.append(b);
  ($('#live') || root).append(r); setTimeout(() => r.remove(), 4000);
}
async function vHome(m) {
  m.innerHTML = `<div class="top"><button data-act="ftab" data-v="foryou" class="${S.ftab === 'following' ? '' : 'on'}">${t('foryou')}</button><button data-act="ftab" data-v="following" class="${S.ftab === 'following' ? 'on' : ''}">${t('followingtab')}</button><button data-act="lives">🔴 ${({fa: 'لایو', en: 'Live', de: 'Live'})[lang]}</button></div><div class="feed" id="feed"><div class="post"><div class="sk" style="width:100%;height:100%;border-radius:0"></div></div></div>`;
  try {
    if (!S.all || S.reload) { S.all = (await A.feed()).filter(p => !S.blocked.has(p.author_id)); S.reload = false; }
    S.posts = S.ftab === 'following' ? S.all.filter(p => S.following.has(p.author_id) || p.author_id === session.userID) : S.all;
    const f = $('#feed'); if (!f) return;
    f.innerHTML = S.posts.length ? S.posts.map(postHTML).join('') : `<div class="empty" style="padding-top:38vh">${S.ftab === 'following' ? t('nofollowing') : t('nofeed')}</div>`;
    wireFeed(f);
  } catch (e) { const f = $('#feed'); if (f) f.innerHTML = `<div class="empty" style="padding-top:38vh">${esc(e.message)}</div>`; }
}

/* ---------- discover ---------- */
async function vDiscover(m) {
  m.innerHTML = `<div class="view"><h1>${t('discover')}</h1><input id="q" placeholder="${t('search')}" style="margin:10px 0 14px"><div id="res">${spin}</div></div>`;
  const res = $('#res');
  const rows = r => `<div class="list">${r.map(x => `<div class="it" data-act="user" data-v="${x.id}">${avatar(x.avatar_url, x.username, 'sm')}<div class="t"><b>@${esc(x.username)}</b><div class="mut small">${esc(x.display_name || '')}</div></div></div>`).join('') || `<div class="empty">${t('noresult')}</div>`}</div>`;
  let list = [];
  try {
    list = (await A.creators()).filter(c => !S.blocked.has(c.id));
    if (!S.all) S.all = (await A.feed()).filter(p => !S.blocked.has(p.author_id));
    const draw = () => {
      let ps = S.all.slice();
      if (S.dcat === 'photo') ps = ps.filter(p => p.kind === 'photo'); else if (S.dcat === 'video') ps = ps.filter(p => p.kind !== 'photo'); else if (S.dcat === 'following') ps = ps.filter(p => S.following.has(p.author_id));
      if (S.dtag) ps = ps.filter(p => (p.caption || '').toLowerCase().includes(S.dtag));
      ps.sort((a, b) => (b.like_count + b.comment_count * 2) - (a.like_count + a.comment_count * 2));
      const tags = {}; S.all.forEach(p => (p.caption || '').toLowerCase().match(/#[\p{L}\p{N}_]+/gu)?.forEach(x => tags[x] = (tags[x] || 0) + 1));
      const top = Object.entries(tags).sort((a, b) => b[1] - a[1]).slice(0, 8);
      const sp = list.filter(c => c.id !== session.userID)[0];
      S.viewPosts = ps;
      res.innerHTML = `${sp ? `<div class="spot glass" data-act="user" data-v="${sp.id}">${avatar(sp.avatar_url, sp.username, 'ring big2')}<div class="t"><div class="mut small">${t('spot')}</div><b style="font-size:18px">@${esc(sp.username)}</b><div class="mut small">${fmt(sp.followers)} ${t('followers')}</div></div><button class="btn sm" data-act="follow2" data-v="${sp.id}">${S.following.has(sp.id) ? '✓' : t('follow')}</button></div>` : ''}
       <div class="stories">${list.slice(0, 15).map(c => `<div class="story" data-act="user" data-v="${c.id}">${avatar(c.avatar_url, c.username, 'ring')}<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(c.username)}</div></div>`).join('')}</div>
       <div class="chips" style="margin-bottom:10px">${[['all', t('all')], ['video', t('videos')], ['photo', t('photos')], ['following', t('following')]].map(([k, n]) => `<button data-act="dcat" data-v="${k}" class="${S.dcat === k ? 'on' : ''}">${n}</button>`).join('')}</div>
       ${top.length ? `<div class="stories tagrow">${top.map(([k, n]) => `<button class="tag ${S.dtag === k ? 'on' : ''}" data-act="dtag" data-v="${esc(k)}">${esc(k)}<small>${n}</small></button>`).join('')}</div>` : ''}
       <h2>${t('trending')}</h2>${ps.length ? postGrid(ps, true) : `<div class="empty">${t('noresult')}</div>`}`;
    };
    S.drawDisc = draw; draw();
  } catch (e) { res.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
  let tm; $('#q').oninput = e => { clearTimeout(tm); const v = e.target.value.trim(); tm = setTimeout(async () => { if (!v) return S.drawDisc && S.drawDisc(); try { res.innerHTML = rows(await A.search(v)); } catch (x) { fail(x); } }, 300); };
}

/* ---------- upload ---------- */
function vUpload(m) {
  m.innerHTML = `<div class="view"><h1>${t('upload')}</h1><div style="display:flex;flex-direction:column;gap:14px;margin-top:12px">
   <label class="upz"><div class="big">🎬</div><div style="font-weight:700;margin-top:6px">${t('choose')}</div><input id="file" type="file" accept="image/*,video/*" hidden></label>
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
  m.innerHTML = `<div class="view"><h1>${t('inbox')}</h1><div id="onl"></div><div id="th" class="list">${spin}</div></div>`;
  rpc('online_users', {p_limit: 40}).then(o => { const b = $('#onl'); if (b && o && o.length) b.innerHTML = `<div class="mut small" style="margin:6px 0">${t('online')}</div><div class="stories">${o.filter(u => u.id !== session.userID).map(u => `<div class="story" data-act="chat" data-v="${u.id}" data-n="${esc(u.username)}"><span style="position:relative;display:block">${avatar(null, u.username, 'ring')}<i class="onl"></i></span><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(u.username)}</div></div>`).join('')}</div>`; }).catch(() => {});
  try {
    const th = await A.threads(), box = $('#th'); if (!box) return;
    box.innerHTML = th.length ? th.map(x => `<div class="it" data-act="chat" data-v="${x.other_id}" data-n="${esc(x.username)}">${avatar(null, x.username)}<div class="t"><b>@${esc(x.username)}</b><div class="mut small">${esc(x.last_body)}</div></div><div style="text-align:end"><div class="mut small">${ago(x.last_at)}</div>${x.unread ? `<span class="dot" style="position:static;display:inline-block;margin-top:2px">${x.unread}</span>` : ''}</div></div>`).join('') : `<div class="empty">${t('nomsg')}</div>`;
    S.unread = th.reduce((a, x) => a + (x.unread || 0), 0);
  } catch (e) { $('#th').innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
}
async function vChat(d, o) {
  d.innerHTML = `<div class="bar"><button class="back" data-act="back">${L[lang].dir === 'rtl' ? '→' : '←'}</button>${avatar(null, o.name, 'sm')}<b>@${esc(o.name || '')}</b></div><div class="chat"><div class="msgs" id="msgs">${spin}</div><div class="quick" id="qe">${['❤️', '😂', '🔥', '👍', '😍', '🎉'].map(e => `<button data-e="${e}">${e}</button>`).join('')}</div><div class="row" style="padding:8px 16px;padding-bottom:max(10px,env(safe-area-inset-bottom))"><input id="mi" placeholder="${t('typemsg')}" maxlength="1000"><button class="send grad" id="ms">${t('send')}</button></div></div>`;
  let last = 0; const box = $('#msgs'); let first = true;
  const draw = ms => { if (first) { box.innerHTML = ''; first = false; } ms.forEach(x => { if (x.deleted) return; last = Math.max(last, x.id); const b = document.createElement('div'); b.className = 'bubble' + (x.sender_id === session.userID ? ' me' : ''); b.textContent = x.body || (x.media_url ? '📎' : ''); box.append(b); }); box.scrollTop = box.scrollHeight; };
  const poll = async () => { if (!document.body.contains(box)) { clearInterval(iv); return; } try { const ms = await A.dmList(o.id, last); if (first || ms.length) draw(ms); if (ms.length) A.dmRead(o.id); } catch {} };
  const iv = setInterval(poll, 4000); poll();
  const send = async v => { v = (v || '').trim(); if (!v) return; try { await A.dmSend(o.id, v); poll(); } catch (e) { fail(e); } };
  $('#ms').onclick = () => { const i = $('#mi'), v = i.value; i.value = ''; send(v); }; $('#mi').onkeydown = e => { if (e.key === 'Enter') { const i = $('#mi'), v = i.value; i.value = ''; send(v); } };
  $$('#qe button').forEach(b => b.onclick = () => send(b.dataset.e));
}

/* ---------- profile (me / others) ---------- */
function postGrid(ps, bento) {
  if (!ps.length) return `<div class="empty">${t('nofeed')}</div>`;
  return `<div class="${bento ? 'bento' : 'grid'}">${ps.map(p => `<div class="g" data-act="open" data-v="${p.id}">${p.kind === 'photo' ? `<img src="${esc(p.media_url)}" loading="lazy" alt="">` : `<img src="${esc(thumbOf(p))}" loading="lazy" alt="" onerror="lgVid(this,'${esc(p.media_url)}')">`}${p.kind !== 'photo' ? '<i class="vi">▶</i>' : ''}<span>❤️ ${fmt(p.like_count)}</span></div>`).join('')}</div>`;
}
async function shareCard() {
  const me = S.me || {}, c = document.createElement('canvas'); c.width = 1080; c.height = 1350; const x = c.getContext('2d');
  const [c1, c2] = ACC[S.accent] || ACC.aurora, g = x.createLinearGradient(0, 0, 1080, 1350); g.addColorStop(0, '#120a22'); g.addColorStop(1, '#2a1250'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1350);
  [[200, 250, c1], [900, 1100, c2], [880, 300, '#18d4ff']].forEach(([px, py, col]) => { const r = x.createRadialGradient(px, py, 0, px, py, 520); r.addColorStop(0, col + '99'); r.addColorStop(1, 'transparent'); x.fillStyle = r; x.fillRect(0, 0, 1080, 1350); });
  x.fillStyle = 'rgba(255,255,255,.1)'; x.strokeStyle = 'rgba(255,255,255,.25)'; x.lineWidth = 3; x.beginPath(); x.roundRect(90, 220, 900, 900, 60); x.fill(); x.stroke();
  const ag = x.createLinearGradient(380, 300, 700, 620); ag.addColorStop(0, c1); ag.addColorStop(1, c2); x.fillStyle = ag; x.beginPath(); x.arc(540, 470, 150, 0, 7); x.fill();
  x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = '800 150px sans-serif'; x.textBaseline = 'middle'; x.fillText((me.username || '?')[0].toUpperCase(), 540, 480);
  x.font = '800 72px Vazirmatn,sans-serif'; x.fillText(me.display_name || me.username || '', 540, 720); x.fillStyle = 'rgba(255,255,255,.65)'; x.font = '500 44px sans-serif'; x.fillText('@' + (me.username || ''), 540, 790);
  let st = {followers: 0, likes: 0}; try { st = (await A.stats()) || st; } catch {} const k = lvlOf(st.followers * 5 + st.likes);
  x.fillStyle = '#fff'; x.font = '700 50px Vazirmatn,sans-serif'; x.fillText(`${LEVELS[k][0]} ${t('level')} ${k + 1} · ${t('lv')[k]}`, 540, 900);
  x.font = '800 64px sans-serif'; x.fillText(fmt(st.followers) + '   ·   ' + fmt(st.likes) + ' ❤️', 540, 1010);
  x.font = '900 70px sans-serif'; x.fillStyle = c1; x.fillText('Livegift', 540, 1240);
  const blob = await new Promise(r => c.toBlob(r, 'image/png')), f = new File([blob], 'livegift-card.png', {type: 'image/png'});
  try { if (navigator.canShare && navigator.canShare({files: [f]})) { await navigator.share({files: [f], text: 'Livegift @' + me.username}); return; } } catch (e) { if (e.name === 'AbortError') return; }
  const u = URL.createObjectURL(blob), l = document.createElement('a'); l.href = u; l.download = 'livegift-card.png'; l.click(); setTimeout(() => URL.revokeObjectURL(u), 4000);
}
async function vMe(m) {
  const me = S.me || {};
  m.innerHTML = `<div class="view" id="mev">
   <div class="cover" id="cov"></div>
   <div class="phead">${avatar(me.avatar_url, me.username, 'big')}<h2 style="margin:6px 0 0;font-size:22px">${esc(me.display_name || me.username)}</h2><div class="mut">@${esc(me.username)}</div><div class="lvl" id="lvl"></div><div class="small" style="max-width:300px">${esc(me.bio)}</div></div>
   ${S.installHint && !matchMedia('(display-mode: standalone)').matches && !navigator.standalone ? `<div class="install" style="margin-top:12px">${t('installhint')}<br><button class="link" data-act="hint">${t('dismiss')}</button></div>` : ''}
   <div class="stats glass" id="st"><div><b>…</b><span class="mut small">${t('followers')}</span></div><div><b>…</b><span class="mut small">${t('likes')}</span></div><div><b id="cn">0</b><span class="mut small">${t('coins')} 🪙</span></div></div>
   <div class="row" style="margin-bottom:6px"><button class="btn sec" data-act="edit">${t('edit')}</button><button class="btn sec" data-act="sharecard" style="width:auto;padding-inline:18px">🔗</button><button class="btn sec" data-act="games" style="width:auto;padding-inline:18px">🎮</button><button class="btn sec" data-act="activity" style="width:auto;padding-inline:18px">🔔</button><button class="btn sec" data-act="settings" style="width:auto;padding-inline:18px">⚙️</button></div>
   <div class="ptabs"><button data-act="ptab" data-v="posts" class="${S.ptab === 'liked' ? '' : 'on'}">${t('posts')}</button><button data-act="ptab" data-v="liked" class="${S.ptab === 'liked' ? 'on' : ''}">${t('likedtab')}</button></div>
   <div id="mine">${spin}</div></div>`;
  const cn = $('#cn'); if (cn) countUp(cn, Number(me.coins) || 0);
  const mev = $('#mev'), cov = $('#cov'); if (mev) mev.onscroll = () => { cov.style.transform = `translateY(${mev.scrollTop * .4}px) scale(${1 + Math.min(.3, mev.scrollTop / 900)})`; };
  A.stats().then(st => { const el = $('#st'); if (!el || !st) return; el.innerHTML = `<div><b data-c="${st.followers}">0</b><span class="mut small">${t('followers')}</span></div><div><b data-c="${st.likes}">0</b><span class="mut small">${t('likes')}</span></div><div><b data-c="${Number(me.coins) || 0}">0</b><span class="mut small">${t('coins')} 🪙</span></div>`; $$('[data-c]', el).forEach(b => countUp(b, +b.dataset.c)); const sc = st.followers * 5 + st.likes, k = lvlOf(sc), nx = LEVELS[k + 1], pct = nx ? Math.round((sc - LEVELS[k][1]) / (nx[1] - LEVELS[k][1]) * 100) : 100; const l = $('#lvl'); if (l) l.innerHTML = `<span>${LEVELS[k][0]} ${t('level')} ${k + 1} · ${t('lv')[k]}</span><i><b style="width:${pct}%"></b></i>`; }).catch(() => {});
  try {
    let ps;
    if (S.ptab === 'liked') { const ids = [...S.liked]; ps = ids.length ? await sel('posts', {select: '*,author:profiles!author_id(username,avatar_url)', id: 'in.(' + ids.slice(0, 60).join(',') + ')', is_removed: 'eq.false', order: 'created_at.desc'}) : []; }
    else ps = await A.userPosts(session.userID);
    S.mine = ps; const b = $('#mine'); if (b) b.innerHTML = postGrid(ps);
  } catch (e) { const b = $('#mine'); if (b) b.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
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
  const lb = l => l === 'fa' ? 'فارسی' : l === 'en' ? 'English' : 'Deutsch';
  d.innerHTML = `<div class="bar"><button class="back" data-act="back">${L[lang].dir === 'rtl' ? '→' : '←'}</button><b>${t('settings')}</b></div><div class="view" style="display:flex;flex-direction:column;gap:16px">
   <div class="glass grp"><div class="mut small">${t('account')}</div><div style="font-weight:700">${esc(session.email)}</div></div>
   <div class="glass grp"><div class="mut small">${t('appearance')}</div>
     <label class="k">${t('theme')}</label><div class="chips">${[['dark', t('dark')], ['light', t('light')], ['auto', t('auto')]].map(([k, n]) => `<button data-act="theme" data-v="${k}" class="${S.theme === k ? 'on' : ''}">${n}</button>`).join('')}</div>
     <label class="k" style="margin-top:10px">${t('accent')}</label><div class="sw">${Object.keys(ACC).map(k => `<button data-act="accent" data-v="${k}" class="${S.accent === k ? 'on' : ''}" style="background:linear-gradient(135deg,${ACC[k][0]},${ACC[k][1]})"></button>`).join('')}</div>
     <label class="k" style="margin-top:10px">${t('language')}</label><div class="chips">${['fa', 'en', 'de'].map(l => `<button data-act="lang" data-v="${l}" class="${l === lang ? 'on' : ''}">${lb(l)}</button>`).join('')}</div></div>
   ${S.me && S.me.is_admin ? `<button class="btn" data-act="admin">🛡 ${({fa: 'پنل مدیر', en: 'Admin panel', de: 'Admin-Bereich'})[lang]}</button>` : ''}<div class="install">${t('liveios')}</div>
   <div class="glass grp links"><a href="${LEGAL}privacy.html" target="_blank" rel="noopener">${t('privacy')}</a><a href="${LEGAL}terms.html" target="_blank" rel="noopener">${t('terms')}</a><a href="${LEGAL}support.html" target="_blank" rel="noopener">${t('support')}</a></div>
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
    try { S.me.coins = Number(await A.sendGift(user, pick.id, qty, postId)); toast(t('giftsent')); closeSheet(); giftRain(pick.emoji, lang === 'fa' ? pick.name_fa : pick.name_en, pick.price * qty >= 50); } catch (e) { fail(e); }
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
    case 'tab': if (v === 'upload') { closeSheet(); window.Studio && Studio.open(); break; } if (v === 'home' && S.tab === 'home' && !S.overlay.length) S.reload = true; S.overlay = []; S.tab = v; closeSheet(); render(); break;
    case 'back': pop(); break;
    case 'hint': S.installHint = false; store.set('lg.hint', '1'); render(); break;
    case 'mute': S.muted = !S.muted; $$('video').forEach(x => x.muted = S.muted); $$('.mic').forEach(i => i.innerHTML = S.muted ? IC.mute : IC.sound); break;
    case 'ftab': S.ftab = v; render(); break;
    case 'dcat': S.dcat = v; S.drawDisc && S.drawDisc(); break;
    case 'dtag': S.dtag = S.dtag === v ? null : v; S.drawDisc && S.drawDisc(); break;
    case 'theme': S.theme = v; store.set('lg.theme', v); applyTheme(); render(); break;
    case 'accent': S.accent = v; store.set('lg.acc', v); applyTheme(); render(); break;
    case 'onbskip': S.onb = false; store.set('lg.onb', '1'); renderAuth(); break;
    case 'onbnext': { const n = +v; if (n >= 2) { S.onb = false; store.set('lg.onb', '1'); renderAuth(); } else { S.onbStep = n + 1; renderOnb(S.onbStep); } break; }
    case 'ptab': S.ptab = v; render(); break;
    case 'cap': el.classList && el.classList.toggle('open'); break;
    case 'follow2': { S.following.add(v); $$(`.follow-plus[data-v="${v}"]`).forEach(x => x.remove()); try { await A.follow(v, true); } catch (e) { fail(e); } break; }
    case 'share': { const link = location.origin + location.pathname; try { if (navigator.share) await navigator.share({title: 'Livegift', url: link}); else { await navigator.clipboard.writeText(link); toast('✓'); } } catch {} break; }
    case 'more': {
      const own = el.dataset.u === session.userID;
      const b = sheet('', `<div class="body" style="display:flex;flex-direction:column;gap:10px">${own ? `<button class="btn danger" data-x="del">${t('delete')}</button>` : `<button class="btn sec" data-x="rep">${t('report')}</button>`}<button class="btn sec" data-act="closesheet">${t('cancel')}</button></div>`);
      const pid = v;
      $$('[data-x]', b).forEach(x => x.onclick = async () => {
        try {
          if (x.dataset.x === 'del') { await A.deletePost(pid); S.all = null; toast('✓'); closeSheet(); $('#viewer')?.remove(); render(); }
          else { await A.report('post', pid, 'post_report'); toast(t('reported')); closeSheet(); }
        } catch (e) { fail(e); }
      }); break;
    }
    case 'like': {
      const id = v, p = [...S.posts, ...(S.viewList || []), ...(S.viewPosts || []), ...(S.mine || [])].find(x => x.id === id), on = !S.liked.has(id);
      on ? S.liked.add(id) : S.liked.delete(id); if (p) p.like_count = Math.max(0, p.like_count + (on ? 1 : -1));
      $$(`[data-act=like][data-v="${id}"]`).forEach(b => { b.classList.toggle('liked', on); $('.c', b).textContent = fmt(p ? p.like_count : 0); });
      try { await A.like(id, on); } catch (e) { fail(e); } break;
    }
    case 'comments': commentsSheet(v); break;
    case 'gift': giftSheet(el.dataset.u, v); break;
    case 'closesheet': closeSheet(); break;
    case 'user': { const vw = $('#viewer'); if (vw) vw.remove(); S.overlay.push({k: 'profile', id: v}); render(); break; }
    case 'chat': S.overlay.push({k: 'chat', id: v, name: el.dataset.n}); render(); break;
    case 'open': openPostViewer(v, (S.overlay.length || S.tab === 'discover') ? S.viewPosts : S.mine); break;
    case 'closeviewer': $('#viewer')?.remove(); break;
    case 'follow': { const on = !S.following.has(v); on ? S.following.add(v) : S.following.delete(v); el.textContent = on ? t('following') : t('follow'); el.classList.toggle('sec', on); try { await A.follow(v, on); } catch (e) { fail(e); } break; }
    case 'block': { const on = !S.blocked.has(v); try { await A.block(v, on); on ? S.blocked.add(v) : S.blocked.delete(v); on && S.following.delete(v); render(); } catch (e) { fail(e); } break; }
    case 'reportu': try { await A.report('user', v, 'user_report'); toast(t('reported')); } catch (e) { fail(e); } break;
    case 'edit': push('edit'); break;
    case 'sharecard': shareCard(); break;
    case 'settings': push('settings'); break;
    case 'admin': push('admin'); break;
    case 'lives': window.Live && Live.list(); break;
    case 'games': window.Games && Games.open(); break;
    case 'activity': push('activity'); break;
    case 'logout': saveSession(null); S.me = null; renderAuth(); break;
    case 'delacc': {
      const b = sheet(t('deleteacc'), `<div class="body"><p>${t('deleteask')}</p><button class="btn danger" id="dy">${t('yes')}</button><br><button class="btn sec" data-act="closesheet">${t('cancel')}</button></div>`);
      $('#dy', b).onclick = async () => { try { await A.deleteAccount(); saveSession(null); renderAuth(); } catch (e) { fail(e); } }; break;
    }
  }
}
let lpT = null, lpDone = false, combo = {n: 0, k: '', t: 0};
async function quickGift(g, btn) {
  const u = btn.dataset.u, pid = btn.dataset.v;
  if (S.me.coins < g.price) return toast(t('nocoins'));
  try {
    S.me.coins = Number(await A.sendGift(u, g.id, 1, pid));
    const now = Date.now(); combo = {n: combo.k === g.id + pid && now - combo.t < 2500 ? combo.n + 1 : 1, k: g.id + pid, t: now};
    giftRain(g.emoji, lang === 'fa' ? g.name_fa : g.name_en, g.price >= 50);
    const sec = btn.closest('.post') || root; $$('.combo', sec).forEach(x => x.remove());
    if (combo.n > 1) { const c = document.createElement('div'); c.className = 'combo'; c.textContent = '×' + combo.n; sec.append(c); setTimeout(() => c.remove(), 1500); }
  } catch (e) { fail(e); }
}
document.addEventListener('pointerdown', e => {
  const b = e.target.closest('.giftb'); if (!b) { if (!e.target.closest('.qg')) $$('.qg').forEach(x => x.remove()); return; }
  lpDone = false; clearTimeout(lpT);
  lpT = setTimeout(() => {
    lpDone = true; $$('.qg').forEach(x => x.remove());
    const top = [...S.gifts].sort((a, c) => a.price - c.price).slice(0, 3), q = document.createElement('div'); q.className = 'qg';
    q.innerHTML = top.map(g => `<button data-g="${g.id}">${esc(g.emoji)}<small>${g.price}</small></button>`).join('');
    q.onclick = ev => { const x = ev.target.closest('button'); if (x) quickGift(S.gifts.find(g => g.id === x.dataset.g), b); };
    (b.closest('.post') || root).append(q); if (navigator.vibrate) navigator.vibrate(15);
  }, 420);
});
['pointerup', 'pointercancel', 'pointermove'].forEach(ev => document.addEventListener(ev, () => clearTimeout(lpT)));
document.addEventListener('click', e => { if (lpDone) { lpDone = false; e.preventDefault(); e.stopPropagation(); return; } const el = e.target.closest('[data-act]'); if (el) { e.preventDefault(); act(el); } }, true);

/* ---------- start ---------- */
if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
applyLang();
session ? boot() : renderAuth();
window.__lg = {S, t};
