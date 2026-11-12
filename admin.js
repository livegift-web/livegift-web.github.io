/* Admin panel — uses only existing server-checked RPCs (no database changes). */
(() => {
const AT = {
 fa:{title:'پنل مدیر',cases:'گزارش‌ها',users:'کاربران',posts:'پست‌ها',lives:'لایوها',pay:'برداشت',sets:'تنظیمات',log:'لاگ',open:'باز',all:'همه',resolved:'حل‌شده',dismissed:'ردشده',none:'موردی نیست.',search:'جستجوی کاربر…',ban:'بلاک',unban:'رفع بلاک',sure:'مطمئنی؟ دوباره بزن',resolve:'حل شد',dismiss:'رد کردن',reply:'پاسخ',note:'یادداشت مدیر',send:'ارسال',remove:'حذف',restore:'بازگردانی',end:'پایان لایو',paid:'پرداخت شد',unpaid:'برگشت',save:'ذخیره',done:'انجام شد',coins:'سکه',vip30:'VIP ۳۰ روز',vipoff:'لغو VIP',livoban:'بن لایو ۶۰د',liveunban:'رفع بن لایو',banned:'بلاک‌شده',reporter:'گزارش‌دهنده',target:'هدف',urgent:'فوری',grant:'افزودن سکه',amount:'تعداد',viewers:'بیننده',gross:'کل سکه',platform:'سهم پلتفرم',pending:'در انتظار پرداخت',hint:'فقط حساب مدیر مجاز است.'},
 en:{title:'Admin panel',cases:'Reports',users:'Users',posts:'Posts',lives:'Lives',pay:'Payouts',sets:'Settings',log:'Log',open:'Open',all:'All',resolved:'Resolved',dismissed:'Dismissed',none:'Nothing here.',search:'Search user…',ban:'Block',unban:'Unblock',sure:'Sure? Tap again',resolve:'Resolve',dismiss:'Dismiss',reply:'Reply',note:'Admin note',send:'Send',remove:'Remove',restore:'Restore',end:'End live',paid:'Mark paid',unpaid:'Undo',save:'Save',done:'Done',coins:'coins',vip30:'VIP 30 days',vipoff:'Remove VIP',livoban:'Live ban 60m',liveunban:'Lift live ban',banned:'Blocked',reporter:'Reporter',target:'Target',urgent:'Urgent',grant:'Add coins',amount:'Amount',viewers:'viewers',gross:'Gross coins',platform:'Platform share',pending:'Pending payout',hint:'Only the admin account is allowed.'},
 de:{title:'Admin-Bereich',cases:'Meldungen',users:'Nutzer',posts:'Beiträge',lives:'Lives',pay:'Auszahlungen',sets:'Einstellungen',log:'Protokoll',open:'Offen',all:'Alle',resolved:'Erledigt',dismissed:'Abgelehnt',none:'Nichts vorhanden.',search:'Nutzer suchen…',ban:'Sperren',unban:'Entsperren',sure:'Sicher? Nochmal tippen',resolve:'Erledigt',dismiss:'Ablehnen',reply:'Antwort',note:'Admin-Notiz',send:'Senden',remove:'Entfernen',restore:'Wiederherstellen',end:'Live beenden',paid:'Bezahlt',unpaid:'Zurück',save:'Speichern',done:'Erledigt',coins:'Coins',vip30:'VIP 30 Tage',vipoff:'VIP entfernen',livoban:'Live-Sperre 60 Min',liveunban:'Live-Sperre aufheben',banned:'Gesperrt',reporter:'Melder',target:'Ziel',urgent:'Dringend',grant:'Coins hinzufügen',amount:'Anzahl',viewers:'Zuschauer',gross:'Coins gesamt',platform:'Plattform-Anteil',pending:'Offene Auszahlung',hint:'Nur das Admin-Konto ist berechtigt.'}
};
const a = k => (AT[lang] || AT.en)[k] || k;
const st = {tab: 'cases', cs: 'open', q: ''};
const dt = d => new Date(d).toLocaleString(lang === 'fa' ? 'fa-IR' : lang === 'de' ? 'de-DE' : 'en-GB', {dateStyle: 'short', timeStyle: 'short'});
const sure = (b, fn) => { b.onclick = () => { if (b.dataset.arm) return fn(); b.dataset.arm = 1; const o = b.textContent; b.textContent = a('sure'); setTimeout(() => { delete b.dataset.arm; b.textContent = o; }, 3000); }; };
const ok = () => toast(a('done'));

window.vAdmin = function (d) {
  const tabs = ['cases', 'users', 'posts', 'lives', 'pay', 'sets', 'log'];
  d.innerHTML = `<div class="bar"><button class="back" data-act="back">${L[lang].dir === 'rtl' ? '→' : '←'}</button><b>${a('title')}</b></div>
   <div class="chips adm-tabs">${tabs.map(k => `<button data-t="${k}" class="${st.tab === k ? 'on' : ''}">${a(k)}</button>`).join('')}</div><div class="view adm" id="adm">${spin}</div>`;
  $$('.adm-tabs button', d).forEach(b => b.onclick = () => { st.tab = b.dataset.t; $$('.adm-tabs button', d).forEach(x => x.classList.toggle('on', x === b)); load(d); });
  load(d);
};
function load(d) {
  const box = $('#adm', d); box.innerHTML = spin;
  const f = {cases, users, posts, lives, pay, sets, log}[st.tab];
  f(box).catch(e => { box.innerHTML = `<div class="empty">${esc(e.message || a('hint'))}</div>`; });
}
const reload = box => load(box.closest('.view').parentElement);

async function cases(box) {
  const rows = await rpc('admin_cases', {p_status: st.cs});
  box.innerHTML = `<div class="chips" style="margin-bottom:10px">${[['open', 'open'], ['resolved', 'resolved'], ['dismissed', 'dismissed'], ['all', 'all']].map(([k, n]) => `<button data-s="${k}" class="${st.cs === k ? 'on' : ''}">${a(n)}</button>`).join('')}</div>` +
   (rows.length ? rows.map(c => `<div class="glass adm-c" data-id="${c.id}">
    <div class="row" style="justify-content:space-between"><b>${c.severity === 'urgent' ? '🚨 ' + a('urgent') + ' · ' : ''}${esc(c.category || c.kind)}</b><span class="mut small">${dt(c.created_at)}</span></div>
    <div class="small mut">${a('reporter')}: @${esc(c.reporter)}${c.target ? ` · ${a('target')}: @${esc(c.target)}${c.target_banned ? ' 🚫' : ''}` : ''}</div>
    <div>${esc(c.message || '')}</div>
    ${(c.replies || []).map(r => `<div class="small ${r.admin ? 'adm-r' : 'mut'}">${r.admin ? '🛡 ' : '👤 '}${esc(r.body)}</div>`).join('')}
    <input class="n" placeholder="${a('note')}" value="${esc(c.admin_note || '')}">
    <div class="row adm-b"><input class="rp" placeholder="${a('reply')}"><button class="btn sm sec" data-x="reply">${a('send')}</button></div>
    <div class="adm-acts"><button class="btn sm" data-x="resolved">${a('resolve')}</button><button class="btn sm sec" data-x="dismissed">${a('dismiss')}</button>${c.target_id ? (c.target_banned ? `<button class="btn sm sec" data-x="unban">${a('unban')}</button>` : `<button class="btn sm danger" data-x="ban">${a('ban')}</button>`) : ''}</div></div>`).join('') : `<div class="empty">${a('none')}</div>`);
  $$('[data-s]', box).forEach(b => b.onclick = () => { st.cs = b.dataset.s; load(box.closest('.view').parentElement); });
  $$('.adm-c', box).forEach(el => { const id = el.dataset.id, note = () => $('.n', el).value;
    $('[data-x=reply]', el).onclick = async () => { const v = $('.rp', el).value.trim(); if (!v) return; try { await rpc('case_reply', {p_case: id, p_body: v}); ok(); reload(box); } catch (e) { fail(e); } };
    const up = (status, action) => async () => { try { await rpc('admin_case_update', {p_case: id, p_status: status, p_note: note(), p_action: action || 'none'}); ok(); reload(box); } catch (e) { fail(e); } };
    $('[data-x=resolved]', el).onclick = up('resolved'); $('[data-x=dismissed]', el).onclick = up('dismissed');
    const bb = $('[data-x=ban]', el); if (bb) sure(bb, up('resolved', 'ban')); const ub = $('[data-x=unban]', el); if (ub) ub.onclick = up('reviewing', 'unban');
  });
}
async function users(box) {
  box.innerHTML = `<input id="aq" placeholder="${a('search')}" value="${esc(st.q)}" style="margin-bottom:10px"><div id="ar">${spin}</div>`;
  const draw = async () => {
    const rows = await rpc('admin_search_users', {p_query: st.q}), r = $('#ar', box); if (!r) return;
    r.innerHTML = rows.length ? rows.map(u => `<div class="glass adm-c" data-id="${u.id}"><div class="row" style="justify-content:space-between"><b>@${esc(u.username)} ${u.is_vip ? '👑' : ''}</b>${u.is_banned ? `<span class="tag on">${a('banned')}</span>` : ''}</div>
     <div class="small mut">${esc(u.display_name || '')} · 🪙 ${fmt(u.coins)} · ${fmt(u.earned)} · ${u.posts} ${a('posts')} · ${dt(u.created_at)}</div>
     <div class="adm-acts">${u.is_banned ? `<button class="btn sm sec" data-x="unban">${a('unban')}</button>` : `<button class="btn sm danger" data-x="ban">${a('ban')}</button>`}<button class="btn sm sec" data-x="vip">${u.is_vip ? a('vipoff') : a('vip30')}</button><button class="btn sm sec" data-x="lban">${a('livoban')}</button><button class="btn sm sec" data-x="lun">${a('liveunban')}</button></div>
     <div class="row adm-b"><input class="am" type="number" inputmode="numeric" placeholder="${a('amount')}"><button class="btn sm sec" data-x="grant">${a('grant')}</button></div></div>`).join('') : `<div class="empty">${a('none')}</div>`;
    $$('.adm-c', r).forEach((el, i) => { const u = rows[i], run = (fn, ...p) => async () => { try { await rpc(fn, p[0]); ok(); draw(); } catch (e) { fail(e); } };
      const bb = $('[data-x=ban]', el); if (bb) sure(bb, run('admin_set_ban', {p_user: u.id, p_banned: true})); const ub = $('[data-x=unban]', el); if (ub) ub.onclick = run('admin_set_ban', {p_user: u.id, p_banned: false});
      $('[data-x=vip]', el).onclick = run('admin_set_vip', {p_user: u.id, p_days: u.is_vip ? 0 : 30});
      $('[data-x=lban]', el).onclick = run('admin_set_live_ban', {p_user: u.id, p_minutes: 60, p_reason: 'owner'}); $('[data-x=lun]', el).onclick = run('admin_set_live_ban', {p_user: u.id, p_minutes: 0, p_reason: 'owner'});
      $('[data-x=grant]', el).onclick = async () => { const n = parseInt($('.am', el).value, 10); if (!n) return; try { await rpc('admin_grant_coins', {p_user: u.id, p_amount: n}); ok(); draw(); } catch (e) { fail(e); } };
    });
  };
  let tm; $('#aq', box).oninput = e => { st.q = e.target.value.trim(); clearTimeout(tm); tm = setTimeout(() => draw().catch(fail), 300); };
  await draw();
}
async function posts(box) {
  const rows = await rpc('admin_recent_posts', {});
  box.innerHTML = rows.length ? `<div class="adm-grid">${rows.map(p => `<div class="glass adm-p ${p.is_removed ? 'rm' : ''}" data-id="${p.id}"><div class="th">${p.kind === 'photo' ? `<img src="${esc(p.media_url)}" loading="lazy" alt="">` : `<video src="${esc(p.media_url)}#t=0.5" preload="metadata" muted playsinline></video>`}</div><div class="small"><b>@${esc(p.author)}</b><div class="mut" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(p.caption || '')}</div></div><button class="btn sm ${p.is_removed ? 'sec' : 'danger'}" data-x="t">${p.is_removed ? a('restore') : a('remove')}</button></div>`).join('')}</div>` : `<div class="empty">${a('none')}</div>`;
  $$('.adm-p', box).forEach((el, i) => { const p = rows[i], b = $('[data-x=t]', el), fn = async () => { try { await rpc('admin_set_post_removed', {p_post: p.id, p_removed: !p.is_removed}); ok(); reload(box); } catch (e) { fail(e); } }; p.is_removed ? b.onclick = fn : sure(b, fn); });
}
async function lives(box) {
  const rows = await rpc('admin_live_list');
  box.innerHTML = rows.length ? rows.map(l => `<div class="glass adm-c" data-id="${l.live_id}"><b>@${esc(l.host)}</b> · ${esc(l.title || '')}<div class="small mut">👁 ${l.viewers} ${a('viewers')} · ${dt(l.started_at)}</div><div class="adm-acts"><button class="btn sm danger" data-x="end">${a('end')}</button></div></div>`).join('') : `<div class="empty">${a('none')}</div>`;
  $$('.adm-c', box).forEach(el => sure($('[data-x=end]', el), async () => { try { await rpc('admin_end_live', {p_live: el.dataset.id}); ok(); reload(box); } catch (e) { fail(e); } }));
}
async function pay(box) {
  let rev = null; try { const r = await rpc('admin_revenue'); rev = Array.isArray(r) ? r[0] : r; } catch {}
  const rows = await rpc('admin_payouts');
  box.innerHTML = (rev ? `<div class="stats glass" style="margin:0 0 12px"><div><b>${fmt(rev.gross_coins)}</b><span class="mut small">${a('gross')}</span></div><div><b>${fmt(rev.platform_coins)}</b><span class="mut small">${a('platform')}</span></div><div><b>€${Number(rev.pending_payout_eur || 0).toFixed(2)}</b><span class="mut small">${a('pending')}</span></div></div>` : '') +
   (rows.length ? rows.map(r => `<div class="glass adm-c" data-id="${r.id}"><div class="row" style="justify-content:space-between"><b>@${esc(r.username)}</b><span class="tag ${r.status === 'pending' ? 'on' : ''}">${esc(r.status)}</span></div><div class="small mut" dir="ltr" style="text-align:start">${esc(r.paypal_email || '')}</div><div>🪙 ${fmt(r.coins)} · <b>€${Number(r.eur).toFixed(2)}</b> <span class="mut small">${dt(r.created_at)}</span></div><div class="adm-acts"><button class="btn sm ${r.status === 'paid' ? 'sec' : ''}" data-x="p">${r.status === 'paid' ? a('unpaid') : a('paid')}</button></div></div>`).join('') : `<div class="empty">${a('none')}</div>`);
  $$('.adm-c', box).forEach((el, i) => { const r = rows[i], b = $('[data-x=p]', el), fn = async () => { try { await rpc('admin_mark_paid', {p_id: r.id, p_paid: r.status !== 'paid'}); ok(); reload(box); } catch (e) { fail(e); } }; sure(b, fn); });
}
async function sets(box) {
  const rows = await rpc('admin_settings_list');
  box.innerHTML = rows.length ? rows.map(s => `<div class="glass adm-c"><div class="small mut" dir="ltr" style="text-align:start">${esc(s.key)}</div><div class="row"><input data-k="${esc(s.key)}" value="${esc(s.value)}" dir="ltr"><button class="btn sm sec" data-x="s">${a('save')}</button></div></div>`).join('') : `<div class="empty">${a('none')}</div>`;
  $$('.adm-c', box).forEach(el => { const i = $('input', el); $('[data-x=s]', el).onclick = async () => { try { await rpc('admin_set_setting', {p_key: i.dataset.k, p_value: i.value}); ok(); } catch (e) { fail(e); } }; });
}
async function log(box) {
  const rows = await rpc('admin_log_list', {p_limit: 120});
  box.innerHTML = rows.length ? `<div class="list">${rows.map(r => `<div class="it" style="cursor:default"><div class="t"><b>${esc(r.action)}</b> <span class="mut small" dir="ltr">${esc(String(r.target || '').slice(0, 36))}</span><div class="mut small">${esc(r.detail || '')}</div></div><div class="mut small">${dt(r.created_at)}</div></div>`).join('')}</div>` : `<div class="empty">${a('none')}</div>`;
}
})();
