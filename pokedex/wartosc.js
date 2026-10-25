/* POKÉPEDIA — WARTOŚĆ KART: dekoder symboli rzadkości + porównywarka dwóch kart.
   Symbole zweryfikowane u CGC i TCGplayer (X 2026). Ceny z Cardmarketu (EUR, rynek
   europejski) i TCGplayera (USD) przez data/prices.json; najnowsze sety bywają
   jeszcze nienotowane i wtedy mówimy to wprost, zamiast pokazywać zero. */
(function () {
const C = window.CONTENT, PR = (window.PRICES || {}).cards || {}, PRMETA = (window.PRICES || {}).meta || {};
const BASE = window.BASECARDS || [], REC = window.RECENTCARDS || [], FILL = window.FILLCARDS || [];
const ALL = [...BASE, ...REC, ...FILL];
const $ = id => document.getElementById(id);
let lang = 'pl';

const t = o => !o ? '' : (typeof o === 'string' ? o : (o[lang] || o.pl || o.en));
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const V = () => C.cardValue;
/* ta sama reguła ścieżek co w app.js — karty leżą w images/cards/ */
const cardImg = c => c.img ? c.img : c.fill ? `images/cards/fill-${c.id}.webp`
  : (c.set ? `images/cards/${c.set}-${String(c.number).replace(/[^A-Za-z0-9]/g, '')}.webp`
           : `images/cards/base1-${c.number}.webp`);

/* ---------- ceny ---------- */
/* Do porównań bierzemy ŚREDNIĄ SPRZEDAŻ, nie „cenę trendową": trend potrafi wystrzelić
   po jednej spektakularnej transakcji (Charizard z Base Set: trend 4185 €, średnia 1531 €,
   najtańsza oferta 799 €, a pojedyncza sprzedaż z ostatniej doby — 14 950 €). */
const eurOf = id => { const p = (PR[id] || {}).eur; if (!p) return null;
  return p.averageSellPrice || p.avg30 || p.avg7 || p.trendPrice || p.lowPrice || null; };
const usdOf = id => { const p = (PR[id] || {}).usd; if (!p) return null; return p.market || p.mid || null; };
function money(v, cur) {
  if (v == null) return null;
  const s = v.toFixed(2).replace('.', lang === 'pl' ? ',' : '.');
  if (cur === 'usd') return lang === 'pl' ? s + ' $' : '$' + s;
  return lang === 'pl' ? s + ' €' : '€' + s;
}
const median = xs => { if (!xs.length) return null; const s = xs.slice().sort((a, b) => a - b), m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

/* Kolejność rzadkości od najrzadszej — przybliżona, bo oficjalnej drabinki
   obejmującej wszystkie ery nie ma; służy tylko do zdania „ta jest rzadsza". */
const RANK = ['Mega Hyper Rare', 'Mega Attack Rare', 'Hyper Rare', 'Special Illustration Rare', 'Rare Secret', 'Rare Ultra',
  'Illustration Rare', 'Shiny Ultra Rare', 'ACE SPEC Rare', 'Radiant Rare', 'Ultra Rare', 'Rare Shiny',
  'Shiny Rare', 'Trainer Gallery Rare Holo', 'Rare Holo VMAX', 'Rare Holo GX', 'Rare Holo V',
  'Double Rare', 'Rare Holo', 'Rare', 'Promo', 'Uncommon', 'Common'];
const rank = r => { const i = RANK.indexOf(r); return i < 0 ? RANK.length : i; };

/* statystyka cen w obrębie poziomu rzadkości */
function tiers() {
  const by = {};
  ALL.forEach(c => {
    const r = c.rarity || '—';
    (by[r] = by[r] || { r: r, n: 0, eur: [] }).n++;
    const e = eurOf(c.id);
    if (e) by[r].eur.push(e);
  });
  return Object.values(by).map(x => ({
    r: x.r, n: x.n, priced: x.eur.length,
    med: median(x.eur), lo: x.eur.length ? Math.min(...x.eur) : null, hi: x.eur.length ? Math.max(...x.eur) : null
  })).sort((a, b) => (b.med || -1) - (a.med || -1) || rank(a.r) - rank(b.r));
}

/* ---------- symbole ---------- */
function glyphHTML(s) {
  const ch = s.g === 'circle' ? '●' : s.g === 'diamond' ? '◆' : s.g === 'mega' ? '✦' : '★';
  if (s.tone === 'pastel') // różowa + zielona, zweryfikowane u CGC
    return `<span class="vsym"><i class="vg vg--pink">★</i><i class="vg vg--green">★</i></span>`;
  const one = `<i class="vg vg--${s.tone}">${ch}</i>`;
  return `<span class="vsym">${one.repeat(s.n || 1)}${s.promo ? '<em class="vpromo">PROMO</em>' : ''}</span>`;
}
function symbolsHTML() {
  const st = {};
  tiers().forEach(x => { st[x.r] = x; });
  return `<div class="vsyms">${V().symbols.map(s => {
    const txt = s[lang] || s.pl, d = st[s.k];
    const price = d && d.med != null
      ? `<span class="vsym-price" title="${esc(t(V().colMed))}">~${money(d.med)}</span>` : '';
    const have = d ? d.n : 0;
    const on = S.show === s.k && S.from === 'sym';
    return `<div class="vsymcard${on ? ' on' : ''}${have ? ' vsymcard--click' : ''}"
      ${have ? `onclick="vShow('${esc(s.k)}','sym')" role="button" tabindex="0"` : ''}>
      <div class="vsym-top">${glyphHTML(s)}${price}</div>
      <h4>${esc(txt[0])}</h4>
      <p class="vsym-en">${esc(s.k)} · <span>${t(s.era)}</span></p>
      <p>${txt[1]}</p>
      ${have ? `<p class="vsym-show">${t(on ? V().hideCards : V().showCards).replace('{N}', have)}</p>` : ''}
    </div>`;
  }).join('')}</div>${cardsPanelHTML('sym')}`;
}

/* Trzy liczby, które mówią więcej niż cała tabela — wyliczane z danych, więc
   zostaną prawdziwe także po odświeżeniu cen. */
function highlightsHTML() {
  const priced = ALL.map(c => ({ c: c, e: eurOf(c.id) })).filter(x => x.e != null);
  if (!priced.length) return '';
  const top = priced.slice().sort((a, b) => b.e - a.e)[0];
  const plain = priced.filter(x => x.c.rarity === 'Common' || x.c.rarity === 'Uncommon')
    .sort((a, b) => b.e - a.e)[0];
  const tile = (val, lab, sub) => `<div class="vtile"><b>${val}</b><span>${lab}</span>${
    sub ? `<i>${esc(sub)}</i>` : ''}</div>`;
  return `<div class="vtiles">
    ${tile(money(top.e), t(V().hiTop), top.c.name + ' · ' + (top.c.rarity || ''))}
    ${plain ? tile(money(plain.e), t(V().hiPlain), plain.c.name + ' · ' + plain.c.rarity) : ''}
    ${tile(priced.length + ' / ' + ALL.length, t(V().hiPriced), t(V().hiPricedSub))}
  </div>`;
}

/* ---------- drabinka cen ---------- */
function ladderHTML() {
  const rows = tiers().filter(x => x.n >= 2);
  const date = PRMETA.date || '—';
  return `<h3 class="vh">${t(V().ladderTitle)}</h3>
   <p class="vnote">${t(V().ladderNote).replace('{CARDS}', ALL.length).replace('{DATE}', date)}</p>
   ${highlightsHTML()}
   <p class="vflip">${t(V().ladderFlip)}</p>
   <div class="vtable-wrap"><table class="vtable">
    <thead><tr><th>${lang === 'pl' ? 'Poziom rzadkości' : 'Rarity tier'}</th>
      <th>${t(V().colCount)}</th><th>${t(V().colPriced)}</th>
      <th>${t(V().colMed)}</th><th>${t(V().colRange)}</th></tr></thead>
    <tbody>${rows.map(x => `<tr class="vrow${S.show === x.r && S.from === 'tab' ? ' on' : ''}"
      onclick="vShow('${esc(x.r).replace(/'/g, "\\'")}','tab')">
      <td><b>${esc(x.r)}</b></td>
      <td class="vnum">${x.n}</td>
      <td class="vnum ${x.priced < x.n ? 'vpart' : ''}">${x.priced}</td>
      <td class="vnum">${x.med != null ? `<b>${money(x.med)}</b>` : `<span class="vdash">${t(V().noPrice)}</span>`}</td>
      <td class="vnum">${x.med != null ? `${money(x.lo)} – ${money(x.hi)}` : '—'}</td>
    </tr>`).join('')}</tbody></table></div>${cardsPanelHTML('tab')}`;
}

/* ---------- karty wybranego poziomu rzadkości ---------- */
const SHOW_MAX = 48;
window.vShow = function (r, from) {
  if (S.show === r && S.from === from) { S.show = null; S.from = null; }
  else { S.show = r; S.from = from; S.all = false; }
  render();
  if (S.show) {
    const el = $('vcards-' + S.from);
    if (el) setTimeout(() => el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 60);
  }
};
window.vAll = function () { S.all = true; render(); };

function cardsPanelHTML(where) {
  if (!S.show || S.from !== where) return '';
  const r = S.show;
  const list = ALL.filter(c => (c.rarity || '—') === r)
    .map(c => ({ c: c, e: eurOf(c.id) }))
    .sort((a, b) => (b.e || -1) - (a.e || -1) || a.c.name.localeCompare(b.c.name));
  const shown = S.all ? list : list.slice(0, SHOW_MAX);
  const sym = V().symbols.find(x => x.k === r);
  const priced = list.filter(x => x.e != null).length;
  const med = median(list.filter(x => x.e != null).map(x => x.e));
  return `<div class="vcards" id="vcards-${where}">
    <div class="vcards-head">
      <div class="vcards-t">${sym ? glyphHTML(sym) : ''}<b>${esc(r)}</b></div>
      <span class="vcards-sum">${list.length} ${t(V().colCount)} · ${priced} ${t(V().colPriced)}${
        med != null ? ` · ${t(V().colMed)} ${money(med)}` : ''}</span>
      <button class="vcards-x" onclick="vShow('${esc(r).replace(/'/g, "\\'")}','${where}')">${t(V().close)}</button>
    </div>
    <div class="vcardgrid">${shown.map(x => `
      <button class="vcard" onclick="openCard('${esc(x.c.id)}')" title="${esc(x.c.name)}">
        <img loading="lazy" src="${cardImg(x.c)}" alt="${esc(x.c.name)}">
        <span class="vcard-n">${esc(x.c.name)}</span>
        <span class="vcard-p ${x.e == null ? 'vcard-p--none' : ''}">${x.e != null ? money(x.e) : '—'}</span>
      </button>`).join('')}</div>
    ${!S.all && list.length > SHOW_MAX
      ? `<button class="vmoreall" onclick="vAll()">${t(V().showAll).replace('{N}', list.length)}</button>` : ''}
  </div>`;
}

/* ---------- porównywarka ---------- */
const S = { a: null, b: null, qa: '', qb: '', show: null, from: null, all: false };
window.vFind = function (slot, v) {
  S['q' + slot] = v;
  const box = $('vres-' + slot);
  if (box) box.innerHTML = resultsHTML(slot);
};
window.vPick = function (slot, id) { S[slot] = id; S['q' + slot] = ''; render(); };
window.vClear = function (slot) { S[slot] = null; S['q' + slot] = ''; render(); };

function resultsHTML(slot) {
  const q = (S['q' + slot] || '').trim().toLowerCase();
  if (!q) return '';
  const hit = ALL.filter(c => c.name.toLowerCase().includes(q)).slice(0, 24);
  if (!hit.length) return `<p class="vnothing">${lang === 'pl' ? 'Nic nie pasuje.' : 'Nothing matches.'}</p>`;
  return `<div class="vres">${hit.map(c => `
    <button onclick="vPick('${slot}','${esc(c.id)}')">
      <img loading="lazy" src="${cardImg(c)}" alt="${esc(c.name)}">
      <span>${esc(c.name)}<i>${esc(c.rarity || '—')}</i></span>
    </button>`).join('')}</div>`;
}
function slotHTML(slot) {
  const id = S[slot];
  if (!id) return `<div class="vslot vslot--empty">
    <input type="search" class="vfind" autocomplete="off" placeholder="${t(V().cmpPick)}"
      value="${esc(S['q' + slot])}" oninput="vFind('${slot}',this.value)">
    <div id="vres-${slot}">${resultsHTML(slot)}</div>
    <p class="vslot-hint">${t(V().cmpEmpty)}</p></div>`;
  const c = ALL.find(x => x.id === id);
  if (!c) return '';
  const sym = V().symbols.find(s => s.k === c.rarity);
  const e = eurOf(id), u = usdOf(id), p = PR[id] || {}, ep = p.eur || {};
  return `<div class="vslot">
    <button class="vslot-x" onclick="vClear('${slot}')">${t(V().cmpClear)}</button>
    <img class="vslot-img" src="${cardImg(c)}" alt="${esc(c.name)}" onclick="openCard('${esc(c.id)}')">
    <h4>${esc(c.name)}</h4>
    <p class="vslot-r">${sym ? glyphHTML(sym) : ''}<span>${esc(c.rarity || '—')}</span></p>
    <div class="vprices">
      ${e != null ? `<div class="vprice vprice--big"><b>${money(e)}</b><span>${t(V().eurAvg)}</span></div>` : ''}
      ${ep.lowPrice ? `<div class="vprice"><b>${money(ep.lowPrice)}</b><span>${t(V().eurLow)}</span></div>` : ''}
      ${ep.trendPrice ? `<div class="vprice"><b>${money(ep.trendPrice)}</b><span>${t(V().eurTrend)}</span></div>` : ''}
      ${u != null ? `<div class="vprice"><b>${money(u, 'usd')}</b><span>${t(V().usdMarket)}</span></div>` : ''}
      ${e == null && u == null ? `<p class="vnoprice">${t(V().noPrice)}</p>` : ''}
    </div></div>`;
}
function verdictHTML() {
  if (!S.a || !S.b) return '';
  const A = ALL.find(x => x.id === S.a), B = ALL.find(x => x.id === S.b);
  if (!A || !B) return '';
  const ra = rank(A.rarity), rb = rank(B.rarity);
  const ea = eurOf(S.a), eb = eurOf(S.b);
  let txt;
  if (ra === rb) txt = t(V().verdictSame);
  else {
    const rarer = ra < rb ? A : B, other = ra < rb ? B : A;
    txt = t(V().verdictRarer).replace('{A}', '<b>' + esc(rarer.name) + '</b>').replace('{B}', esc(other.name));
    if (ea != null && eb != null) {
      const rarerPrice = ra < rb ? ea : eb, otherPrice = ra < rb ? eb : ea;
      txt += ' ' + t(rarerPrice < otherPrice ? V().verdictCheaper : V().verdictMatches);
    }
  }
  return `<p class="vverdict">${txt}</p>`;
}
function compareHTML() {
  return `<h3 class="vh">${t(V().cmpTitle)}</h3>
   <p class="vnote">${t(V().cmpNote)}</p>
   <div class="vcmp">${slotHTML('a')}<span class="vvs">vs</span>${slotHTML('b')}</div>
   ${verdictHTML()}
   <p class="vnote vnote--small">${t(V().cmpPrices)}</p>`;
}

/* ---------- całość ---------- */
function render() {
  const host = $('cards-body');
  if (!host || !host.dataset || host.dataset.v !== '1') return;
  const v = V();
  host.innerHTML = `<div class="vwrap">
    <p class="vintro">${t(v.intro).replace('{CARDS}', ALL.length)}</p>
    <h3 class="vh">${t(v.symTitle)}</h3>
    <p class="vnote">${t(v.symNote)}</p>
    ${symbolsHTML()}
    <h3 class="vh">${t(v.extraTitle)}</h3>
    <div class="vextras">${v.extra.map(x => { const z = x[lang] || x.pl;
      return `<div class="vextra"><h4>${esc(z[0])}</h4><p>${z[1]}</p></div>`; }).join('')}</div>
    ${ladderHTML()}
    ${compareHTML()}
    <h3 class="vh">${t(v.factorsTitle)}</h3>
    <div class="vfactors">${v.factors.map(f => { const z = f[lang] || f.pl;
      return `<div class="vfactor"><span class="vem">${f.em}</span><div><h4>${esc(z[0])}</h4><p>${z[1]}</p></div></div>`; }).join('')}</div>
    <p class="vcaveat">${t(v.caveat)}</p>
  </div>`;
}

window.renderWartosc = function (l) { lang = l || lang; render(); };
})();
