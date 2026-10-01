/* POKÉPEDIA — TRENING: Dwadzieścia pytań (klucz do oznaczania)
   Silnik klucza dychotomicznego na 1025 Pokémonach. Dwa tryby:
   - ZGADUJ TY: aplikacja ma sekret, gracz zadaje pytania i zawęża pole
   - ZGADUJE APLIKACJA: gracz myśli, aplikacja pyta, wybierając pytanie o największym zysku informacji
   Licznik bitów pokazuje, ile z log2(N) niepewności ucięło każde pytanie — to on zamienia
   zgadywankę w naukę klasyfikowania. */
(function () {
const MON = window.POKEMON, C = window.CONTENT;
const $ = id => document.getElementById(id);
let lang = 'pl';

/* ---------- pomocniki ---------- */
const L2 = Math.log2;
const t = o => !o ? '' : (typeof o === 'string' ? o : (o[lang] || o.pl || o.en));
const num = (x, d) => (d === 0 ? Math.round(x) : x.toFixed(d === undefined ? 1 : d)).toString()
  .replace('.', lang === 'pl' ? ',' : '.');
// „1 Pokémon / 2 Pokémony / 5 Pokémonów" — etykieta musi się odmieniać razem z liczbą
function monWord(n) {
  if (lang !== 'pl') return n === 1 ? 'POKÉMON' : 'POKÉMON';
  const d = n % 10, h = n % 100;
  if (n === 1) return 'POKÉMON';
  return (d >= 2 && d <= 4 && !(h >= 12 && h <= 14)) ? 'POKÉMONY' : 'POKÉMONÓW';
}
// „w 1 pytaniu" / „w 4 pytaniach" — miejscownik, bo zdanie brzmi „udało mi się w…"
function qWord(n) {
  if (lang !== 'pl') return n + (n === 1 ? ' question' : ' questions');
  return n + (n === 1 ? ' pytaniu' : ' pytaniach');
}
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const img = m => `images/pokemon/${String(m.id).padStart(3, '0')}.webp`;
const kind = (dict, v) => { const o = (C.kinds[dict] || {})[v]; return o ? t(o) : String(v); };
const typeName = k => lang === 'pl' ? (C.types[k] || {}).pl || k : cap(k);
const typeColor = k => (C.types[k] || {}).color || '#888';

function sizeCls(m) { const x = m.height_m; return x <= .5 ? 'XS' : x <= 1 ? 'S' : x <= 2 ? 'M' : x <= 5 ? 'L' : 'XL'; }
function powerCls(m) { const x = m.total; return x < 300 ? 0 : x < 450 ? 1 : x < 550 ? 2 : 3; }

/* ---------- słownik ---------- */
const UI = {
  title: { pl: 'Trening', en: 'Training' },
  lead: {
    pl: 'Klucz do oznaczania — dokładnie ten sam sposób, którym w terenie rozpoznaje się rośliny i grzyby, tylko na Pokémonach. Na starcie niepewność wynosi równo 10 bitów (bo log₂ z {MON} to 10). Każde pytanie ją ucina. Cztery dobre pytania zwykle wystarczają, żeby z {MON} Pokémonów został jeden.',
    en: 'An identification key — the same method field biologists use for plants and fungi, applied to Pokémon. You start with exactly 10 bits of uncertainty (log₂ of {MON} is 10). Every question cuts into it. Four good questions are usually enough to get from {MON} Pokémon down to one.'
  },
  modeYou: { pl: 'Zgaduj ty', en: 'You guess' },
  modeYouD: { pl: 'Myślę o jednym Pokémonie. Pytaj, zawężaj i zgadnij.', en: 'I am thinking of one Pokémon. Ask, narrow down, guess.' },
  modeApp: { pl: 'Zgaduje aplikacja', en: 'The app guesses' },
  modeAppD: { pl: 'Pomyśl o Pokémonie. Zadam kilka pytań i zgadnę.', en: 'Think of a Pokémon. I will ask a few questions and name it.' },
  lvl: { pl: 'Rodzaj pytań', en: 'Question type' },
  lvlOpen: { pl: 'otwarte — „jakiego koloru?”', en: 'open — “what colour?”' },
  lvlOpenD: { pl: 'do 3–4 bitów z jednego pytania', en: 'up to 3–4 bits per question' },
  lvlBool: { pl: 'tylko tak/nie — klasyczne', en: 'yes/no only — classic' },
  lvlBoolD: { pl: 'najwyżej 1 bit z pytania, czyli ok. 10 pytań', en: 'at most 1 bit per question, so about 10 questions' },
  pool: { pl: 'Z jakiej puli', en: 'Which pool' },
  poolK: { pl: 'tylko Kanto (151)', en: 'Kanto only (151)' },
  poolAll: { pl: 'wszystkie ({MON})', en: 'all ({MON})' },
  start: { pl: 'Zaczynamy →', en: 'Start →' },
  hints: { pl: 'Pokazuj, ile bitów daje pytanie', en: 'Show how many bits each question gives' },
  statQ: { pl: 'PYTANIA', en: 'QUESTIONS' },
  statB: { pl: 'BITY INFORMACJI', en: 'BITS OF INFORMATION' },
  ask: { pl: 'Zadaj pytanie', en: 'Ask a question' },
  askBool: { pl: 'Zadaj pytanie tak/nie', en: 'Ask a yes/no question' },
  guessBtn: { pl: '🎯 Już wiem — zgaduję!', en: '🎯 I know it — let me guess!' },
  guessWho: { pl: 'Który to Pokémon?', en: 'Which Pokémon is it?' },
  backToQ: { pl: '← wracam do pytań', en: '← back to questions' },
  log: { pl: 'Co już wiemy', en: 'What we know' },
  yes: { pl: 'tak', en: 'yes' },
  no: { pl: 'nie', en: 'no' },
  dunno: { pl: 'nie wiem', en: 'I do not know' },
  win: { pl: 'Trafione!', en: 'Got it!' },
  lose: { pl: 'Koniec pytań', en: 'Out of questions' },
  itWas: { pl: 'To był', en: 'It was' },
  usedQ: { pl: 'Zadane pytania', en: 'Questions used' },
  minQ: { pl: 'Minimum teoretyczne', en: 'Theoretical minimum' },
  minQnote: {
    pl: 'Tyle pytań wystarczyłoby, gdyby każde ucinało maksimum informacji. W praktyce prawie nikomu się to nie udaje — i o to chodzi.',
    en: 'That many questions would be enough if each cut the maximum information. Almost nobody manages it — and that is the point.'
  },
  best: { pl: 'Twój rekord', en: 'Your best' },
  again: { pl: 'Jeszcze raz', en: 'Play again' },
  wrongGuess: { pl: 'Nie, to nie ten. Zostaje nam mniej możliwości.', en: 'No, not that one. Fewer options left.' },
  appThinks: { pl: 'Moje pytanie', en: 'My question' },
  appGuess: { pl: 'Myślisz o…', en: 'You are thinking of…' },
  appIsIt: { pl: 'Czy to', en: 'Is it' },
  appWin: { pl: 'Mam go! Udało mi się w {N}.', en: 'Got it! It took me {N}.' },
  appLose: { pl: 'Poddaję się — nie trafiłem.', en: 'I give up — I could not get it.' },
  appEmpty: {
    pl: 'Coś się nie zgadza: nie został ani jeden Pokémon spełniający wszystkie odpowiedzi. Albo gdzieś padła pomyłka, albo myślisz o formie, której nie mam w bazie.',
    en: 'Something does not add up: no Pokémon matches all the answers. Either an answer slipped, or you are thinking of a form I do not have.'
  },
  restart: { pl: '↺ Od nowa', en: '↺ Start over' },
  remaining: { pl: 'Zostali kandydaci', en: 'Remaining candidates' },
  narrowing: { pl: 'Jak zawężaliśmy', en: 'How we narrowed it down' },
  bitsOf: { pl: 'z 10', en: 'of 10' },
  cut: { pl: 'ucięte', en: 'cut' },
  qCount: { pl: 'pyt.', en: 'q.' },
  catAll: { pl: 'Wszystkie', en: 'All' },
  noMore: { pl: 'Nie ma już o co pytać — żadne pytanie niczego nie rozstrzygnie. Zgaduj!', en: 'Nothing left to ask — no question would tell us anything new. Go ahead and guess!' },
  noMoreCat: { pl: 'W tej grupie nie ma już pytań, które coś wnoszą. Zajrzyj do pozostałych.', en: 'No questions left in this group that would tell us anything. Try the others.' }
};
const CAT = {
  look: { pl: 'Jak wygląda', en: 'Looks' },
  body: { pl: 'Ciało i rozmiar', en: 'Body & size' },
  kin: { pl: 'Rodzina i pochodzenie', en: 'Family & origin' },
  pow: { pl: 'Moc', en: 'Power' },
  hid: { pl: 'Wiedza ukryta', en: 'Hidden knowledge' }
};

/* ---------- bank pytań ----------
   choice: pytanie otwarte o wartość cechy; z każdego robimy też warianty tak/nie.
   bool:   pytanie z natury dwudzielne. */
const Q = [
  { id: 'color', cat: 'look', kind: 'choice', q: { pl: 'Jakiego jest koloru?', en: 'What colour is it?' },
    bq: { pl: 'Czy jest {V}?', en: 'Is it {V}?' }, val: m => m.color, lab: v => kind('color', v) },
  { id: 'shape', cat: 'look', kind: 'choice', q: { pl: 'Jaki ma kształt ciała?', en: 'What body shape does it have?' },
    bq: { pl: 'Czy {V}?', en: 'Is it {V}?' }, val: m => m.shape, lab: v => kind('shape', v) },
  { id: 'type1', cat: 'look', kind: 'choice', q: { pl: 'Jaki jest jego główny typ?', en: 'What is its main type?' },
    bq: { pl: 'Czy jego główny typ to {V}?', en: 'Is its main type {V}?' }, val: m => m.types[0], lab: v => typeName(v) },
  { id: 'size', cat: 'body', kind: 'choice', q: { pl: 'Jakiej jest wielkości?', en: 'How big is it?' },
    bq: { pl: 'Czy jest {V}?', en: 'Is it {V}?' }, val: sizeCls, lab: v => kind('size', v) },
  { id: 'region', cat: 'kin', kind: 'choice', q: { pl: 'Z którego regionu pochodzi?', en: 'Which region is it from?' },
    bq: { pl: 'Czy pochodzi z regionu {V}?', en: 'Is it from {V}?' }, val: m => m.gen, lab: v => kind('region', v) },
  { id: 'stage', cat: 'kin', kind: 'choice', q: { pl: 'W którym miejscu rodziny stoi?', en: 'Where in its family does it stand?' },
    bq: { pl: 'Czy to {V}?', en: 'Is it a {V}?' }, val: m => m.stage, lab: v => kind('stage', v) },
  { id: 'power', cat: 'pow', kind: 'choice', q: { pl: 'Jak jest silny?', en: 'How strong is it?' },
    bq: { pl: 'Czy to {V}?', en: 'Is it a {V}?' }, val: powerCls, lab: v => kind('power', v) },
  { id: 'eggs', cat: 'hid', kind: 'choice', q: { pl: 'Do jakiej grupy jajowej należy?', en: 'Which egg group is it in?' },
    bq: { pl: 'Czy należy do grupy {V}?', en: 'Is it in the {V} group?' }, val: m => (m.eggs || [])[0] || '?', lab: v => kind('eggs', v) },
  { id: 'growth', cat: 'hid', kind: 'choice', q: { pl: 'Jak szybko rośnie?', en: 'How fast does it grow?' },
    bq: { pl: 'Czy rośnie {V}?', en: 'Does it grow {V}?' }, val: m => m.growth, lab: v => kind('growth', v) },

  { id: 'dual', cat: 'look', kind: 'bool', q: { pl: 'Czy ma dwa typy?', en: 'Does it have two types?' }, val: m => m.types.length > 1 },
  { id: 'legend', cat: 'kin', kind: 'bool', q: { pl: 'Czy jest legendarny albo mityczny?', en: 'Is it legendary or mythical?' }, val: m => !!(m.is_legendary || m.is_mythical) },
  { id: 'evolves', cat: 'kin', kind: 'bool', q: { pl: 'Czy może się jeszcze rozwinąć?', en: 'Can it still evolve?' }, val: m => m.stage === 'base' || m.stage === 'mid' },
  { id: 'evolved', cat: 'kin', kind: 'bool', q: { pl: 'Czy powstał z innego Pokémona?', en: 'Did it evolve from another Pokémon?' }, val: m => m.stage === 'mid' || m.stage === 'final' },
  { id: 'heavy', cat: 'body', kind: 'bool', q: { pl: 'Czy waży więcej niż 50 kg?', en: 'Does it weigh more than 50 kg?' }, val: m => m.weight_kg > 50 },
  { id: 'tall', cat: 'body', kind: 'bool', q: { pl: 'Czy jest wyższy niż metr?', en: 'Is it taller than one metre?' }, val: m => m.height_m > 1 },
  { id: 'easy', cat: 'pow', kind: 'bool', q: { pl: 'Czy łatwo go złapać?', en: 'Is it easy to catch?' }, val: m => m.capture_rate >= 120 },
  { id: 'letter', cat: 'look', kind: 'bool', q: { pl: 'Czy jego nazwa zaczyna się na literę od A do M?', en: 'Does its name start with a letter from A to M?' }, val: m => m.name[0] <= 'm' },
  { id: 'genderless', cat: 'hid', kind: 'bool', q: { pl: 'Czy jest bezpłciowy?', en: 'Is it genderless?' }, val: m => !!m.genderless }
];
const byId = Object.fromEntries(Q.map(q => [q.id, q]));

/* wariant tak/nie: pytanie o konkretną wartość cechy */
function boolVariants(q, set) {
  if (q.kind === 'bool') return [{ q: q, key: m => q.val(m), label: t(q.q) }];
  const vals = [...new Set(set.map(q.val))].filter(v => v !== undefined && v !== null);
  return vals.map(v => ({
    q: q, v: v, key: m => q.val(m) === v,
    label: t(q.bq).replace('{V}', q.lab(v))
  }));
}
/* zysk informacji w bitach: entropia rozkładu odpowiedzi na zbiorze kandydatów */
function gain(keyFn, set) {
  const g = new Map();
  for (const m of set) { const k = keyFn(m); g.set(k, (g.get(k) || 0) + 1); }
  const n = set.length; let H = 0;
  for (const v of g.values()) { const p = v / n; H -= p * L2(p); }
  return H;
}

/* ---------- stan ---------- */
const S = {
  screen: 'menu',      // menu | play | guess | over
  mode: 'you',         // you | app
  level: 'open',       // open | bool
  pool: 'all',         // kanto | all
  hints: true,
  cand: [], asked: [], used: new Set(), skipped: new Set(),
  secret: null, start: 0, result: null, pending: null, cat: 'all', note: ''
};
const LIMIT = 20;
const BEST = 'pp-20q-best';

function pool() { return S.pool === 'kanto' ? MON.filter(m => m.gen === 1) : MON.slice(); }

function begin() {
  S.cand = pool(); S.asked = []; S.used = new Set(); S.skipped = new Set();
  S.result = null; S.pending = null; S.note = ''; S.start = S.cand.length;
  S.screen = 'play'; S.cat = 'all';
  if (S.mode === 'you') S.secret = S.cand[Math.floor(Math.random() * S.cand.length)];
  else { S.secret = null; nextAppQuestion(); }
  render();
}

/* Minimum teoretyczne: ile pytań wystarczyłoby, gdyby każde ucinało maksimum informacji.
   Dolne ograniczenie, w praktyce nieosiągalne — i to jest w tej liczbie najciekawsze. */
function minQuestions() {
  const H = L2(S.start);
  if (S.level === 'bool') return Math.ceil(H);          // pytanie tak/nie daje najwyżej 1 bit
  const full = pool();
  let best = 0;
  for (const q of Q) best = Math.max(best, gain(q.val, full));
  return Math.max(1, Math.ceil(H / best));
}

/* ---------- tryb: gracz pyta ---------- */
function askAs(keyFn, label, qid, labFn) {
  const before = S.cand.length;
  const ans = keyFn(S.secret);
  S.cand = S.cand.filter(m => keyFn(m) === ans);
  S.used.add(qid);
  S.asked.push({ label: label, ans: ans, lab: labFn && typeof ans !== 'boolean' ? labFn(ans) : null, before: before, after: S.cand.length });
  if (S.asked.length >= LIMIT && S.cand.length > 1) { S.result = 'lose'; S.screen = 'over'; }
  render();
}
function answerText(a, lab) {
  if (lab) return lab;
  if (a === true) return t(UI.yes);
  if (a === false) return t(UI.no);
  return String(a);
}

window.ppGuess = function (id) {
  const m = MON.find(x => x.id === id);
  if (!m) return;
  if (m === S.secret) { S.result = 'win'; S.screen = 'over'; saveBest(); }
  else {
    S.cand = S.cand.filter(x => x !== m);
    S.asked.push({ label: t(UI.appIsIt) + ' ' + cap(m.name) + '?', ans: false, before: S.cand.length + 1, after: S.cand.length });
    S.note = t(UI.wrongGuess);
    if (S.asked.length >= LIMIT) { S.result = 'lose'; S.screen = 'over'; }
    else S.screen = 'play';
  }
  render();
};
function saveBest() {
  const n = S.asked.length, key = BEST + '-' + S.level + '-' + S.pool;
  try { const b = +localStorage.getItem(key) || 99; if (n < b) localStorage.setItem(key, n); } catch (e) { }
}
function best() { try { return +localStorage.getItem(BEST + '-' + S.level + '-' + S.pool) || null; } catch (e) { return null; } }

/* ---------- tryb: aplikacja pyta ---------- */
function nextAppQuestion() {
  if (S.cand.length === 0) { S.pending = null; return; }
  if (S.cand.length === 1 || S.asked.length >= LIMIT - 1) {
    S.pending = { identity: S.cand[0] }; return;
  }
  let pool_ = [];
  if (S.level === 'bool') {
    for (const q of Q) for (const v of boolVariants(q, S.cand)) pool_.push(v);
  } else {
    for (const q of Q) {
      if (q.kind === 'choice') pool_.push({ q: q, key: q.val, label: t(q.q), choice: true });
      else pool_.push({ q: q, key: q.val, label: t(q.q) });
    }
  }
  pool_ = pool_.filter(v => !S.skipped.has(vkey(v)));
  let bestV = null, bestG = -1;
  for (const v of pool_) {
    const g = gain(v.key, S.cand);
    if (g > bestG + 1e-9) { bestG = g; bestV = v; }
  }
  if (!bestV || bestG < 0.001) { S.pending = { identity: S.cand[0] }; return; }
  // opcje odpowiedzi: tylko wartości obecne wśród kandydatów
  const vals = [...new Set(S.cand.map(bestV.key))];
  S.pending = { v: bestV, bits: bestG, vals: vals };
}
const vkey = v => v.q.id + (v.v !== undefined ? '=' + v.v : '');

window.ppAnswer = function (raw) {
  const p = S.pending; if (!p) return;
  if (p.identity) {
    if (raw === 'yes') { S.result = 'appwin'; S.screen = 'over'; }
    else {
      S.cand = S.cand.filter(m => m !== p.identity);
      S.asked.push({ label: t(UI.appIsIt) + ' ' + cap(p.identity.name) + '?', ans: false, before: S.cand.length + 1, after: S.cand.length });
      if (!S.cand.length || S.asked.length >= LIMIT) { S.result = S.cand.length ? 'applose' : 'empty'; S.screen = 'over'; }
      else nextAppQuestion();
    }
    render(); return;
  }
  if (raw === 'skip') { S.skipped.add(vkey(p.v)); nextAppQuestion(); render(); return; }
  const want = p.vals[+raw];
  const before = S.cand.length;
  S.cand = S.cand.filter(m => p.v.key(m) === want);
  S.asked.push({ label: p.v.label, ans: want,
    lab: (p.v.choice && typeof want !== 'boolean') ? p.v.q.lab(want) : null,
    before: before, after: S.cand.length });
  if (!S.cand.length) { S.result = 'empty'; S.screen = 'over'; }
  else if (S.asked.length >= LIMIT) { S.result = 'applose'; S.screen = 'over'; }
  else nextAppQuestion();
  render();
};

/* ---------- sterowanie z UI ---------- */
window.ppSet = function (k, v) { S[k] = v; render(); };
window.ppBegin = begin;
window.ppMenu = function () { S.screen = 'menu'; S.note = ''; render(); };
window.ppToGuess = function () { S.screen = 'guess'; S.note = ''; render(); };
window.ppToPlay = function () { S.screen = 'play'; render(); };
window.ppAskOpen = function (qid) { const q = byId[qid]; askAs(q.val, t(q.q), qid, q.lab); };
window.ppAskBool = function (qid, i) {
  const q = byId[qid], vs = boolVariants(q, S.cand);
  const v = vs[i]; if (!v) return;
  askAs(v.key, v.label, vkey(v));
};
window.ppCat = function (c) { S.cat = c; render(); };

/* ---------- widok ---------- */
function bitsBar() {
  const H0 = L2(S.start), H = L2(Math.max(1, S.cand.length)), done = H0 - H;
  const pct = Math.min(100, 100 * done / H0);
  const ticks = [];
  for (let i = 1; i < Math.ceil(H0); i++) ticks.push(`<span class="qtick" style="left:${100 * i / H0}%"></span>`);
  return { pct: pct, done: done, H0: H0, html: `<div class="qbar"><i style="width:${pct}%"></i>${ticks.join('')}</div>` };
}
function statsBar() {
  const b = bitsBar(), n = S.cand.length;
  return `<div class="qstats">
    <div class="qstat qstat--big"><b>${n}</b><span>${monWord(n)}</span></div>
    <div class="qstat qstat--bar"><b>${num(b.done)} <i>${t(UI.bitsOf)}</i></b><span>${t(UI.statB)}</span>${b.html}</div>
    <div class="qstat"><b>${S.asked.length} / ${LIMIT}</b><span>${t(UI.statQ)}</span></div>
  </div>`;
}
function logHTML() {
  if (!S.asked.length) return '';
  const chips = [S.start, ...S.asked.map(a => a.after)]
    .map((n, i) => `<span class="qnarrow${i ? '' : ' first'}">${n}</span>`).join('<i>→</i>');
  return `<div class="qlog">
    <h4>${t(UI.log)}</h4>
    <ol>${S.asked.map(a => `<li><span class="ql-q">${esc(a.label)}</span>
      <b class="ql-a ${a.ans === false ? 'no' : a.ans === true ? 'yes' : ''}">${esc(answerText(a.ans, a.lab))}</b>
      <span class="ql-b">−${num(L2(a.before / Math.max(1, a.after)))} ${lang === 'pl' ? 'bitu' : 'bits'}</span></li>`).join('')}</ol>
    <div class="qnarrowing"><span class="qnl">${t(UI.narrowing)}</span>${chips}</div>
  </div>`;
}

function menuHTML() {
  const mo = (id, ttl, d) => `<button class="qmode${S.mode === id ? ' on' : ''}" onclick="ppSet('mode','${id}')">
    <b>${t(ttl)}</b><span>${t(d)}</span></button>`;
  const lv = (id, ttl, d) => `<button class="qopt${S.level === id ? ' on' : ''}" onclick="ppSet('level','${id}')">
    <b>${t(ttl)}</b><span>${t(d)}</span></button>`;
  const po = (id, ttl) => `<button class="qopt${S.pool === id ? ' on' : ''}" onclick="ppSet('pool','${id}')">
    <b>${t(ttl).replace('{MON}', MON.length)}</b></button>`;
  const b = best();
  return `<div class="qmenu">
   <div class="qmodes">${mo('you', UI.modeYou, UI.modeYouD)}${mo('app', UI.modeApp, UI.modeAppD)}</div>
   <div class="qrow"><h4>${t(UI.lvl)}</h4><div class="qopts">${lv('open', UI.lvlOpen, UI.lvlOpenD)}${lv('bool', UI.lvlBool, UI.lvlBoolD)}</div></div>
   <div class="qrow"><h4>${t(UI.pool)}</h4><div class="qopts qopts--sm">${po('kanto', UI.poolK)}${po('all', UI.poolAll)}</div></div>
   <label class="qcheck"><input type="checkbox" ${S.hints ? 'checked' : ''} onchange="ppSet('hints',this.checked)"> ${t(UI.hints)}</label>
   ${b ? `<p class="qbest">${t(UI.best)}: <b>${b}</b> ${t(UI.qCount)}</p>` : ''}
   <button class="qgo" onclick="ppBegin()">${t(UI.start)}</button>
  </div>`;
}

function questionsHTML() {
  const cats = ['all', ...Object.keys(CAT)];
  const tabs = cats.map(c => `<button class="qcat${S.cat === c ? ' on' : ''}" onclick="ppCat('${c}')">${c === 'all' ? t(UI.catAll) : t(CAT[c])}</button>`).join('');
  let body = '';
  const show = Q.filter(q => S.cat === 'all' || q.cat === S.cat);
  if (S.level === 'open') {
    body = show.map(q => {
      if (S.used.has(q.id) && q.kind === 'choice') return '';
      const g = gain(q.val, S.cand);
      if (g < 0.001) return '';
      return `<button class="qask" onclick="ppAskOpen('${q.id}')">
        <span class="qask-t">${esc(t(q.q))}</span>
        ${S.hints ? `<span class="qask-b">${num(g)}&nbsp;${lang === 'pl' ? 'bitu' : 'bits'}</span>` : ''}</button>`;
    }).join('');
  } else {
    body = show.map(q => {
      const vs = boolVariants(q, S.cand).map((v, i) => ({ v: v, i: i, g: gain(v.key, S.cand) }))
        .filter(x => x.g > 0.001 && !S.used.has(vkey(x.v)))
        .sort((a, b) => b.g - a.g);
      if (!vs.length) return '';
      return vs.map(x => `<button class="qask qask--bool" onclick="ppAskBool('${q.id}',${x.i})">
        <span class="qask-t">${esc(x.v.label)}</span>
        ${S.hints ? `<span class="qask-b">${num(x.g)}&nbsp;${lang === 'pl' ? 'bitu' : 'bits'}</span>` : ''}</button>`).join('');
    }).join('');
  }
  if (!body.trim()) {
    // wszystkie pytania dają 0 bitów (albo w tej kategorii, albo w ogóle)
    const anywhere = Q.some(q => gain(q.val, S.cand) > 0.001);
    body = `<p class="qnothing">${t(anywhere ? UI.noMoreCat : UI.noMore)}</p>`;
  }
  return `<div class="qpick"><h4>${t(S.level === 'bool' ? UI.askBool : UI.ask)}</h4>
    <div class="qcats">${tabs}</div><div class="qasks">${body}</div></div>`;
}

function candHTML(clickable) {
  const list = S.cand.slice(0, 60);
  return `<div class="qcands">${list.map(m => `
    <button class="qcand" ${clickable ? `onclick="ppGuess(${m.id})"` : 'disabled'}>
      <img loading="lazy" src="${img(m)}" alt="${esc(m.name)}">
      <span>${esc(cap(m.name))}</span>
    </button>`).join('')}
    ${S.cand.length > 60 ? `<p class="qmore">+ ${S.cand.length - 60}</p>` : ''}</div>`;
}

function appAskHTML() {
  const p = S.pending;
  if (!p) return `<p class="qempty">${t(UI.appEmpty)}</p>`;
  if (p.identity) {
    const m = p.identity;
    return `<div class="qappq qappq--id">
      <span class="qappq-lead">${t(UI.appGuess)}</span>
      <img src="${img(m)}" alt="${esc(m.name)}">
      <b>${esc(cap(m.name))}</b>
      <div class="qans"><button class="qyes" onclick="ppAnswer('yes')">${t(UI.yes)}</button>
      <button class="qno" onclick="ppAnswer('no')">${t(UI.no)}</button></div></div>`;
  }
  const opts = p.vals.map((v, i) => {
    const lab = v === true ? t(UI.yes) : v === false ? t(UI.no) : (p.v.choice ? p.v.q.lab(v) : String(v));
    const cnt = S.cand.filter(m => p.v.key(m) === v).length;
    return `<button class="qansopt" onclick="ppAnswer('${i}')">${esc(lab)}${S.hints ? `<i>${cnt}</i>` : ''}</button>`;
  }).join('');
  return `<div class="qappq">
    <span class="qappq-lead">${t(UI.appThinks)}${S.hints ? ` · ${num(p.bits)} ${lang === 'pl' ? 'bitu' : 'bits'}` : ''}</span>
    <b>${esc(p.v.label)}</b>
    <div class="qans qans--opts">${opts}<button class="qskip" onclick="ppAnswer('skip')">${t(UI.dunno)}</button></div></div>`;
}

function overHTML() {
  const m = S.secret || (S.pending && S.pending.identity) || S.cand[0];
  const win = S.result === 'win' || S.result === 'appwin';
  let head;
  if (S.result === 'win') head = t(UI.win);
  else if (S.result === 'appwin') head = t(UI.appWin).replace('{N}', qWord(S.asked.length));
  else if (S.result === 'applose') head = t(UI.appLose);
  else if (S.result === 'empty') head = '';
  else head = t(UI.lose);
  const mq = minQuestions();
  return `<div class="qover ${win ? 'win' : 'lose'}">
    ${head ? `<h3>${esc(head)}</h3>` : ''}
    ${S.result === 'empty' ? `<p class="qempty">${t(UI.appEmpty)}</p>` : m ? `
      <div class="qreveal">
        <img src="${img(m)}" alt="${esc(m.name)}">
        <div><span>${t(UI.itWas)}</span><b>${esc(cap(m.name))}</b>
        <span class="qrev-meta">#${String(m.id).padStart(3, '0')} · ${kind('region', m.gen)} · ${m.types.map(x => `<i style="background:${typeColor(x)}">${typeName(x)}</i>`).join(' ')}</span></div>
      </div>` : ''}
    <div class="qscore">
      <div><b>${S.asked.length}</b><span>${t(UI.usedQ)}</span></div>
      <div><b>${mq}</b><span>${t(UI.minQ)}</span></div>
      ${best() ? `<div><b>${best()}</b><span>${t(UI.best)}</span></div>` : ''}
    </div>
    <p class="qnote">${t(UI.minQnote)}</p>
    ${logHTML()}
    <div class="qbtns"><button class="qgo" onclick="ppBegin()">${t(UI.again)}</button>
    <button class="qalt" onclick="ppMenu()">${t(UI.restart)}</button></div>
  </div>`;
}

function render() {
  const host = $('q20'); if (!host) return;
  $('tren-title').textContent = t(UI.title);
  $('tren-desc').textContent = t(UI.lead).replace(/\{MON\}/g, MON.length);
  let h = '';
  if (S.screen === 'menu') h = menuHTML();
  else if (S.screen === 'over') h = overHTML();
  else {
    h = statsBar();
    if (S.note) h += `<p class="qnote qnote--warn">${esc(S.note)}</p>`;
    if (S.mode === 'app') h += appAskHTML();
    else if (S.screen === 'guess') h += `<div class="qpick"><h4>${t(UI.guessWho)}</h4>${candHTML(true)}
      <button class="qalt" onclick="ppToPlay()">${t(UI.backToQ)}</button></div>`;
    else {
      h += `<div class="qbtns"><button class="qgo" onclick="ppToGuess()">${t(UI.guessBtn)}</button>
        <button class="qalt" onclick="ppMenu()">${t(UI.restart)}</button></div>` + questionsHTML();
      if (S.cand.length <= 24) h += `<div class="qpick"><h4>${t(UI.remaining)}</h4>${candHTML(true)}</div>`;
    }
    h += logHTML();
  }
  host.innerHTML = h;
}

window.renderTrening = function (l) { lang = l || 'pl'; render(); };
/* uchwyt do testów automatycznych (symulacja partii w Node) — nieużywany w przeglądarce */
window.__q20 = { Q: Q, gain: gain, boolVariants: boolVariants, vkey: vkey, sizeCls: sizeCls, powerCls: powerCls };
})();
