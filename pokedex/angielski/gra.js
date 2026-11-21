/* POKÉ ENGLISH — angielski z Pokémonami dla dzieci 7–8 lat.

   Metody, na których stoi gra:
   1. Najpierw słuchanie (comprehensible input): każde zadanie zaczyna się od zdania po
      angielsku, a znaczenie wynika z obrazka — bez tłumaczenia słówek na polski.
   2. Słowo + obraz + dźwięk naraz (dual coding).
   3. Ruch (TPR): polecenie „Pikachu, jump!" wykonuje Pokémon na ekranie.
   4. Małe porcje: 2–4 nowe słowa na etap.
   5. Powtórki w odstępach (pudełka Leitnera: 0, 1, 2, 4, 7 dni) i mieszanie tematów.
   6. Błąd nie karze: zła odpowiedź też coś uczy („That is blue!"), po dwóch próbach
      gra podświetla właściwą. Bez zegarów i bez tracenia żyć.
   Polski pojawia się tylko w pomocy (co trzeba zrobić), nigdy jako tłumaczenie słowa. */
(function () {
'use strict';
const D = window.PE_DATA;
const app = document.getElementById('app');
const $ = (s, el) => (el || document).querySelector(s);
const IMG = id => '../images/pokemon/' + String(id).padStart(3, '0') + '.webp';
const rnd = n => Math.floor(Math.random() * n);
const pick = a => a[rnd(a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const wait = ms => new Promise(r => setTimeout(r, ms));
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const art = w => (/^[aeiou]/i.test(w) ? 'an ' : 'a ') + w;

/* ======================================================================
   SŁOWNICTWO I WYSPY
   ====================================================================== */
const COLHEX = { red: '#e8483f', orange: '#ff9a2e', yellow: '#ffd94a', green: '#5bbf4a', blue: '#4d8fe0',
  pink: '#ff8fc0', purple: '#9b5fc9', brown: '#9a6a42', black: '#2b2b33', white: '#ffffff', grey: '#9aa0a6' };
const TYPEIC = { fire: '🔥', water: '💧', grass: '🌿', electric: '⚡', ice: '❄️', rock: '🪨', ghost: '👻', dragon: '🐉' };
const NUMS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
const ACT = { jump: ['🦘', 'jumping'], run: ['🏃', 'running'], sleep: ['😴', 'sleeping'], fly: ['🕊️', 'flying'],
  swim: ['🏊', 'swimming'], eat: ['🍎', 'eating'], dance: ['💃', 'dancing'], spin: ['🌀', 'spinning'] };
const SIZEIC = { big: '🐘', small: '🐭', long: '🐍', round: '⚽' };
/* świat 2 */
const WX = { sunny: '☀️', rainy: '🌧️', snowy: '❄️', windy: '💨', cloudy: '☁️', stormy: '⛈️' };
const FEEL = { happy: '😊', sad: '😢', angry: '😠', scared: '😱', tired: '🥱', hungry: '🤤' };
const FOOD = { apple: '🍎', banana: '🍌', cake: '🍰', cookie: '🍪', pizza: '🍕', carrot: '🥕', 'ice cream': '🍦', egg: '🥚' };
const WHERE = { on: 1, under: 1, in: 1, 'next to': 1 };
const obj = w => w === 'in' ? 'box' : 'table';
/* świat 3 */
const ANIMAL = { cat: '🐱', dog: '🐶', bird: '🐦', fish: '🐟', frog: '🐸', duck: '🦆', mouse: '🐭', bee: '🐝', horse: '🐴', snake: '🐍' };
const TOY = { ball: '⚽', kite: '🪁', car: '🚗', robot: '🤖', teddy: '🧸', balloon: '🎈', drum: '🥁', book: '📖' };
/* światy 3–8 */
const PLURAL = new Set(['glasses', 'shoes', 'scissors']);
const PH = w => PLURAL.has(w) ? w : art(w);                 // „a hat", „an apple", ale „glasses"
const WEAR = { hat: ['🎩', 'head'], glasses: ['👓', 'face'], scarf: ['🧣', 'neck'], shoes: ['👟', 'feet'], bow: ['🎀', 'head'], crown: ['👑', 'head'] };
const OPP = { hot: '🥵', cold: '🥶', fast: '💨', slow: '🐌', up: '⬆️', down: '⬇️' };
const BODY = { head: '🙂', eyes: '👀', ears: '👂', nose: '👃', mouth: '👄', hands: '👐', feet: '🦶', tail: '', wings: '' };
const PL_BODY = new Set(['eyes', 'ears', 'hands', 'feet', 'wings']);
const SEA = { crab: '🦀', shark: '🦈', whale: '🐋', octopus: '🐙', dolphin: '🐬', turtle: '🐢', seal: '🦭', shell: '🐚' };
const ROOM = { kitchen: '🍽️', bathroom: '🛁', bedroom: '🛏️', 'living room': '🛋️', garden: '🌷' };
const ROOMS = Object.keys(ROOM);
const SCHOOL = { pen: '🖊️', pencil: '✏️', bag: '🎒', ruler: '📏', scissors: '✂️', crayon: '🖍️' };
const JOB = { doctor: '🩺', teacher: '📚', cook: '🍲', farmer: '🚜', firefighter: '🚒', 'police officer': '🚓' };
const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAYCOL = ['#ff8fa3', '#ffb86b', '#ffe06b', '#8fe08a', '#7cc7ff', '#b79cff', '#ff9ad5'];
const RT = { 'wake up': ['⏰', 'wakes up', 'morning', 'waking up'], 'eat breakfast': ['🥣', 'eats breakfast', 'morning', 'eating breakfast'],
  'go to school': ['🏫', 'goes to school', 'day', 'going to school'], play: ['⚽', 'plays', 'day', 'playing'],
  'eat dinner': ['🍝', 'eats dinner', 'evening', 'eating dinner'], 'go to bed': ['🌙', 'goes to bed', 'night', 'going to bed'] };
const RT_ORDER = Object.keys(RT);
const SEASON = { spring: '🌸', summer: '🌻', autumn: '🍂', winter: '⛄' };
const SEASON_ORDER = Object.keys(SEASON);
const SPACE = { sun: '🌞', moon: '🌙', star: '⭐', planet: '🪐', rocket: '🚀', astronaut: '🧑‍🚀' };
const FOODPL = { apple: 'apples', banana: 'bananas', cake: 'cake', cookie: 'cookies', pizza: 'pizza', carrot: 'carrots', 'ice cream': 'ice cream', egg: 'eggs' };
const COUNTPL = { apple: 'apples', banana: 'bananas', cake: 'cakes', cookie: 'cookies', pizza: 'pizzas', carrot: 'carrots', 'ice cream': 'ice creams', egg: 'eggs' };
const ITEM = w => FOOD[w] || TOY[w] || SCHOOL[w];

const ISLANDS = [
  { id: 'colours', ic: '🎨', en: 'Colours', pl: 'Kolory',
    stages: [['red', 'blue', 'yellow', 'green'], ['orange', 'pink', 'purple'], ['brown', 'black', 'white', 'grey']] },
  { id: 'numbers', ic: '🔢', en: 'Numbers', pl: 'Liczby',
    stages: [['one', 'two', 'three'], ['four', 'five', 'six'], ['seven', 'eight', 'nine', 'ten']] },
  { id: 'size', ic: '📏', en: 'Big & small', pl: 'Duże i małe', stages: [['big', 'small'], ['long', 'round']] },
  { id: 'types', ic: '🔥', en: 'Types', pl: 'Żywioły',
    stages: [['fire', 'water', 'grass'], ['electric', 'ice', 'rock'], ['ghost', 'dragon']] },
  { id: 'actions', ic: '🏃', en: 'Actions', pl: 'Ruchy',
    stages: [['jump', 'run', 'sleep'], ['fly', 'swim', 'eat'], ['dance', 'spin']] },
  { id: 'champion', ic: '🏆', en: 'Champion', pl: 'Mistrz', stages: [], final: true },
  // świat 2 — otwiera się po odznace Mistrza
  { id: 'weather', ic: '🌦️', en: 'Weather', pl: 'Pogoda', world: 2,
    stages: [['sunny', 'rainy'], ['snowy', 'windy'], ['cloudy', 'stormy']] },
  { id: 'feelings', ic: '😊', en: 'Feelings', pl: 'Uczucia', world: 2,
    stages: [['happy', 'sad'], ['angry', 'scared'], ['tired', 'hungry']] },
  { id: 'food', ic: '🍰', en: 'Food', pl: 'Jedzenie', world: 2,
    stages: [['apple', 'banana', 'cake'], ['cookie', 'pizza', 'carrot'], ['ice cream', 'egg']] },
  { id: 'where', ic: '📦', en: 'Where is it?', pl: 'Gdzie jest?', world: 2, stages: [['on', 'under'], ['in', 'next to']] },
  { id: 'master', ic: '👑', en: 'Master', pl: 'Arcymistrz', world: 2, stages: [], final: true },
  // świat 3 — otwiera się po odznace Arcymistrza
  { id: 'animals', ic: '🐾', en: 'Animals', pl: 'Zwierzęta', world: 3,
    stages: [['cat', 'dog', 'bird'], ['fish', 'frog', 'duck'], ['mouse', 'bee', 'horse', 'snake']] },
  { id: 'toys', ic: '🧸', en: 'Toys', pl: 'Zabawki', world: 3,
    stages: [['ball', 'kite', 'car'], ['robot', 'teddy', 'balloon'], ['drum', 'book']] },
  { id: 'clothes', ic: '👒', en: 'Clothes', pl: 'Ubrania', world: 3, stages: [['hat', 'glasses', 'scarf'], ['shoes', 'bow', 'crown']] },
  { id: 'opposites', ic: '↕️', en: 'Opposites', pl: 'Przeciwieństwa', world: 3, stages: [['hot', 'cold'], ['fast', 'slow'], ['up', 'down']] },
  { id: 'ranger', ic: '🌟', en: 'Ranger', pl: 'Strażnik dżungli', world: 3, stages: [], final: true },
  // świat 4 — pytania „tak/nie"
  { id: 'body', ic: '👀', en: 'My body', pl: 'Ciało', world: 4, stages: [['head', 'eyes', 'ears'], ['nose', 'mouth', 'hands'], ['feet', 'tail', 'wings']] },
  { id: 'sea', ic: '🐙', en: 'Sea animals', pl: 'Morze', world: 4, stages: [['crab', 'shark', 'whale'], ['octopus', 'dolphin', 'turtle'], ['seal', 'shell']] },
  { id: 'bignums', ic: '🔟', en: 'Numbers 11–20', pl: 'Liczby 11–20', world: 4,
    stages: [['eleven', 'twelve', 'thirteen'], ['fourteen', 'fifteen', 'sixteen'], ['seventeen', 'eighteen', 'nineteen', 'twenty']] },
  { id: 'captain', ic: '⚓', en: 'Captain', pl: 'Kapitan', world: 4, stages: [], final: true },
  // świat 5 — miejsca i polecenia
  { id: 'house', ic: '🏠', en: 'My house', pl: 'Dom', world: 5, stages: [['kitchen', 'bathroom', 'bedroom'], ['living room', 'garden']] },
  { id: 'school', ic: '🎒', en: 'School', pl: 'Szkoła', world: 5, stages: [['pen', 'pencil', 'bag'], ['ruler', 'scissors', 'crayon']] },
  { id: 'jobs', ic: '🚒', en: 'Jobs', pl: 'Zawody', world: 5, stages: [['doctor', 'teacher', 'cook'], ['farmer', 'firefighter', 'police officer']] },
  { id: 'hero', ic: '🦸', en: 'Hero', pl: 'Bohater', world: 5, stages: [], final: true },
  // świat 6 — czas i kolejność
  { id: 'days', ic: '📅', en: 'Days', pl: 'Dni tygodnia', world: 6, stages: [['monday', 'tuesday', 'wednesday'], ['thursday', 'friday'], ['saturday', 'sunday']] },
  { id: 'routine', ic: '⏰', en: 'My day', pl: 'Mój dzień', world: 6, stages: [['wake up', 'eat breakfast', 'go to school'], ['play', 'eat dinner', 'go to bed']] },
  { id: 'seasons', ic: '🍂', en: 'Seasons', pl: 'Pory roku', world: 6, stages: [['spring', 'summer'], ['autumn', 'winter']] },
  { id: 'timemaster', ic: '🕰️', en: 'Time Master', pl: 'Pan Czasu', world: 6, stages: [], final: true },
  // świat 7 — całe zdania
  { id: 'likes', ic: '💗', en: 'I like', pl: 'Lubię', world: 7, stages: [['like', "don't like"]] },
  { id: 'build', ic: '🧱', en: 'Sentences', pl: 'Zdania', world: 7, stages: [['is'], ['has got'], ['can', "can't"]] },
  { id: 'quest', ic: '❓', en: 'Questions', pl: 'Pytania', world: 7, stages: [['who', 'what'], ['where', 'how many']] },
  { id: 'wizard', ic: '🔮', en: 'Wizard', pl: 'Czarodziej', world: 7, stages: [], final: true },
  // świat 8 — rozmowa i historyjki
  { id: 'space', ic: '🪐', en: 'Space', pl: 'Kosmos', world: 8, stages: [['sun', 'moon', 'star'], ['planet', 'rocket', 'astronaut']] },
  { id: 'hello', ic: '👋', en: 'Hello!', pl: 'Rozmowa', world: 8, stages: [['hello', 'goodbye'], ['name', 'age'], ['how are you', 'thank you']] },
  { id: 'story', ic: '📖', en: 'Stories', pl: 'Historyjki', world: 8, stages: [['story1', 'story2'], ['story3', 'story4'], ['story5', 'story6']] },
  { id: 'legend', ic: '🌠', en: 'Legend', pl: 'Legenda', world: 8, stages: [], final: true },
  // świat 9 — litery i czytanie (od słuchania do czytania)
  { id: 'abc', ic: '🔤', en: 'ABC', pl: 'Litery', world: 9, stages: [['L-a', 'L-b', 'L-c', 'L-d', 'L-e'], ['L-f', 'L-g', 'L-h', 'L-i', 'L-j'], ['L-k', 'L-l', 'L-m', 'L-n', 'L-o'], ['L-p', 'L-q', 'L-r', 'L-s', 'L-t'], ['L-u', 'L-v', 'L-w', 'L-x', 'L-y', 'L-z']] },
  { id: 'spell', ic: '✏️', en: 'Spelling', pl: 'Literowanie', world: 9, stages: [['s-cat', 's-dog', 's-sun'], ['s-hat', 's-bee', 's-egg'], ['s-car', 's-bag', 's-pen'], ['s-six', 's-ten', 's-red']] },
  { id: 'read', ic: '📚', en: 'Reading', pl: 'Czytanie', world: 9, stages: [['r-cat', 'r-dog', 'r-fish'], ['r-sun', 'r-moon', 'r-star'], ['r-ball', 'r-car', 'r-kite'], ['r-apple', 'r-cake', 'r-egg']] },
  { id: 'professor', ic: '🎓', en: 'Professor', pl: 'Profesor', world: 9, stages: [], final: true },
  // świat 10 — targowisko: prośby w sklepie, pieniądze, grzeczne słowa
  { id: 'shop', ic: '🛒', en: 'Shop', pl: 'Sklep', world: 10, stages: [['b-apple', 'b-banana', 'b-cake'], ['b-ball', 'b-kite', 'b-teddy'], ['b-hat', 'b-book', 'b-robot']] },
  { id: 'money', ic: '🪙', en: 'Money', pl: 'Pieniądze', world: 10, stages: [['p-1', 'p-2', 'p-3'], ['p-4', 'p-5', 'p-6'], ['p-7', 'p-8', 'p-9', 'p-10']] },
  { id: 'manners', ic: '🙏', en: 'Magic words', pl: 'Grzeczne słowa', world: 10, stages: [['m-sorry', 'm-bless'], ['m-excuse', 'm-here'], ['m-welcome', 'm-please']] },
  { id: 'shopkeeper', ic: '🏪', en: 'Shopkeeper', pl: 'Sprzedawca', world: 10, stages: [], final: true },
  // świat 11 — przygoda: kierunki, porównania, zegar
  { id: 'way', ic: '🧭', en: 'Which way?', pl: 'Kierunki', world: 11, stages: [['d-left', 'd-right'], ['d-straight', 'd-back']] },
  { id: 'compare', ic: '🐘', en: 'Bigger & faster', pl: 'Porównania', world: 11, stages: [['c-bigger', 'c-smaller'], ['c-faster', 'c-slower']] },
  { id: 'clock', ic: '🕒', en: "O'clock", pl: 'Zegar', world: 11, stages: [['t-1', 't-2', 't-3'], ['t-4', 't-5', 't-6'], ['t-7', 't-8', 't-9'], ['t-10', 't-11', 't-12']] },
  { id: 'explorer', ic: '🗺️', en: 'Explorer', pl: 'Odkrywca', world: 11, stages: [], final: true },
  // świat 12 — historyjki: czas przeszły, bajki, mówienie do mikrofonu
  { id: 'yesterday', ic: '📅', en: 'Yesterday', pl: 'Wczoraj', world: 12, stages: [['y-jump', 'y-run', 'y-sleep'], ['y-eat', 'y-swim', 'y-fly'], ['y-dance', 'y-spin']] },
  { id: 'storytime', ic: '🌙', en: 'Story time', pl: 'Bajki', world: 12, stages: [['past1', 'past2'], ['past3', 'past4']] },
  { id: 'sayit', ic: '🎤', en: 'Say it!', pl: 'Mówienie', world: 12, stages: [['v-hello', 'v-apple', 'v-red'], ['v-dog', 'v-sun', 'v-ball'], ['v-thank you', 'v-cat', 'v-pizza']] },
  { id: 'storyteller', ic: '📜', en: 'Storyteller', pl: 'Bajarz', world: 12, stages: [], final: true },
  // świat 13 — podróże: pojazdy, rodzina, liczba mnoga
  { id: 'travel', ic: '🚌', en: 'Transport', pl: 'Pojazdy', world: 13, stages: [['g-bus', 'g-train', 'g-plane'], ['g-boat', 'g-bike', 'g-helicopter']] },
  { id: 'family', ic: '👪', en: 'Family', pl: 'Rodzina', world: 13, stages: [['f-mum', 'f-dad', 'f-baby'], ['f-sister', 'f-brother'], ['f-grandma', 'f-grandpa']] },
  { id: 'many', ic: '🐾', en: 'One and many', pl: 'Jeden czy wiele', world: 13, stages: [['n-cat', 'n-dog', 'n-bird'], ['n-apple', 'n-ball', 'n-star'], ['n-car', 'n-egg', 'n-duck']] },
  { id: 'traveller', ic: '🧳', en: 'Traveller', pl: 'Podróżnik', world: 13, stages: [], final: true },
  // świat 14 — gdzie mieszkają Pokémony, hobby, kształty z opisem
  { id: 'home', ic: '🏕️', en: 'Pokémon homes', pl: 'Gdzie mieszkają', world: 14, stages: [['e-forest', 'e-sea', 'e-mountains'], ['e-volcano', 'e-sky', 'e-snow']] },
  { id: 'hobby', ic: '🎨', en: 'Hobbies', pl: 'Co lubię robić', world: 14, stages: [['h-drawing', 'h-singing', 'h-reading'], ['h-football', 'h-swimming', 'h-cooking']] },
  { id: 'shapes', ic: '🔷', en: 'Shapes', pl: 'Kształty', world: 14, stages: [['a-circle', 'a-square', 'a-triangle'], ['a-star', 'a-heart', 'a-diamond']] },
  { id: 'sage', ic: '🦉', en: 'Sage', pl: 'Mędrzec', world: 14, stages: [], final: true }
];
ISLANDS.forEach(i => { i.world = i.world || 1; });
const WORD_ISLE = {};
ISLANDS.forEach(i => i.stages.flat().forEach(w => { WORD_ISLE[w] = i.id; }));
const isleOf = id => ISLANDS.find(i => i.id === id);
const WORLDS = [[1, 'Sunny Islands'], [2, 'Sky Islands'], [3, 'Jungle Islands'], [4, 'Ocean Islands'],
  [5, 'Town Islands'], [6, 'Snow Islands'], [7, 'Volcano Islands'], [8, 'Space Islands'], [9, 'Letter Islands'], [10, 'Market Islands'], [11, 'Adventure Islands'], [12, 'Story Islands'],
  [13, 'Travel Islands'], [14, 'Wonder Islands']];
const finalOf = wn => ISLANDS.find(I => I.world === wn && I.final);
/* nazwy do wyświetlania: dni wielką literą, historyjki tytułem */
const DISP = {};
const disp = w => DISP[w] || w;
const BADGE = id => isleOf(id).ic;

/* ---------- cały Pokédex: albumy regionów i legendy (nagrody bez powtórek) ---------- */
const DEX = {};
D.dex.forEach(r => { DEX[r[0]] = { id: r[0], name: r[1], gen: r[2], types: r[3].split('/'), h: r[4], leg: r[5] }; });
const REGIONS = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Paldea'];
const ALBUM = {};                                  // generacja → zwykłe Pokémony (bez legend)
D.dex.forEach(r => { if (!r[5]) (ALBUM[r[2]] = ALBUM[r[2]] || []).push(r[0]); });
const FIRST_LEGENDS = [150, 249, 250, 384, 493, 1007];
const LEGEND_IDS = FIRST_LEGENDS.concat(D.dex.filter(r => r[5] && !FIRST_LEGENDS.includes(r[0])).map(r => r[0]));
const KEY_OF = {}; Object.keys(D.pool).forEach(k => { KEY_OF[D.pool[k].id] = k; });

/* Pokémony ilustrujące dane słowo — ręcznie dobrane w build_angielski.py; MONSX: listy z bloków nowych światów */
const MONSX = {};
function monsFor(w) {
  if (MONSX[w]) return MONSX[w];
  if (D.colours[w]) return D.colours[w];
  if (D.elements[w]) return D.elements[w];
  if (w === 'big') return D.big;
  if (w === 'small') return D.small;
  if (w === 'long') return D.long;
  if (w === 'round') return D.round;
  if (WX[w]) return D.weather[w];
  if (FOOD[w] || TOY[w]) return D.eaters;
  if (ANIMAL[w]) return D.animals[w];
  if (WHERE[w]) return D.stars.filter(k => D.pool[k].h <= 1.2);
  const opp = { hot: D.elements.fire, cold: D.elements.ice, fast: D.sets.fast, slow: D.sets.slow, up: D.flyers, down: D.sets.down }[w];
  if (opp) return opp;
  if (D.sea[w]) return D.sea[w];
  if (w === 'tail') return D.sets.tails;
  if (w === 'wings') return D.flyers;
  if (WEAR[w]) return D.stars.filter(k => D.pool[k].h <= 1.2);
  return D.stars;
}
const P = k => D.pool[k];

/* ======================================================================
   STAN GRY (localStorage, z zabezpieczeniem na tryb prywatny)
   ====================================================================== */
const KEY = 'pe-state-v1';
/* Automatyczny zapis na dysk Maca (serwer_gry.py: POST /zapis) — tylko w grze syna na localhost:8165;
   testy chodzą na 127.0.0.1, wersja w internecie nie ma serwera. Gdy przeglądarka ma pusty
   magazyn (np. po restarcie aplikacji), gra sama wczytuje ostatni zapis z dysku. */
const AUTO = location.hostname === 'localhost' && location.port === '8165';      // jest serwer na Macu (zapis, mikrofon)
const AUTOSAVE = AUTO && !/[?&]test\b/.test(location.search);                     // ?test = próby bez ruszania zapisu syna
let RESTORING = false;
if (AUTOSAVE) {
  let empty = true; try { empty = !localStorage.getItem(KEY); } catch (e) { }
  if (empty) {
    RESTORING = true;
    fetch('/zapis/ostatni', { cache: 'no-store' }).then(r => r.ok ? r.text() : null).then(t => {
      if (t && JSON.parse(t).stars >= 0) { localStorage.setItem(KEY, t); location.reload(); } else RESTORING = false;
    }).catch(() => { RESTORING = false; });
  }
}
let autoT = 0;
function autoSave() {
  if (!AUTOSAVE || RESTORING) return;
  clearTimeout(autoT);
  // bez keepalive: panel przeglądarki w aplikacji Claude odrzuca takie żądania („Failed to fetch") — 16.11
  autoT = setTimeout(() => { try { fetch('/zapis', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(S) }).catch(() => { }); } catch (e) { } }, 1200);
}
const S = (function () {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(KEY)); } catch (e) { }
  return Object.assign({ stars: 0, caught: [], badges: [], words: {}, stage: {}, seenMap: false,
    settings: { rate: 0.85, voice: '', plHelp: true, sfx: true, all: false } }, s || {});
})();
S.settings = Object.assign({ rate: 0.85, voice: '', plHelp: true, sfx: true, all: false, mic: false }, S.settings);
/* Migracja zapisu z wersji 1: złapane Pokémony jako numery z Pokédexu (dex).
   Stara lista `caught` zostaje nietknięta — nic z dotychczasowego wyniku nie ginie. */
if (!Array.isArray(S.dex)) {
  S.dex = [];
  (S.caught || []).forEach(k => {
    const id = k[0] === 'L' ? +k.slice(1) : (D.pool[k] && D.pool[k].id);
    if (id && DEX[id] && !S.dex.includes(id)) S.dex.push(id);
  });
}
S.fresh = S.fresh || [];                    // złapane, ale jeszcze nieobejrzane w albumie („NEW!")
S.album = S.album || 1;                     // album, z którego przychodzą nagrody
S.team = S.team || [];                      // drużyna: do 3 ulubionych Pokémonów (numery z Pokédexu), towarzyszą na wyspach
S.txp = S.txp || {};                        // doświadczenie drużyny: +1 za każdą dobrą odpowiedź
S.log = S.log || {};                        // dzień → [dobre, złe, nowe słowa] — do raportu dla rodzica (od 18.11.2026)
const has = id => S.dex.includes(id);
function save() { if (RESTORING) return; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } autoSave(); }

/* ---------- powtórki rozłożone w czasie: pudełka Leitnera ----------
   Awans o jedno pudełko najwyżej raz dziennie — opanowanie słowa wymaga poprawnych
   odpowiedzi w różne dni, a nie trzech kliknięć pod rząd. */
const INTERVAL = [0, 1, 2, 4, 7];
const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
function rec(w) { return S.words[w] || (S.words[w] = { box: 0, due: today(), seen: 0, ok: 0, bad: 0, last: -1 }); }
function grade(w, ok) {
  const r = rec(w);
  r.seen++;
  if (ok) {
    r.ok++;
    if (r.last !== today()) { r.box = Math.min(4, r.box + 1); r.last = today(); }
  } else { r.bad++; r.box = Math.max(0, r.box - 1); }
  r.due = today() + INTERVAL[r.box];
  const L = S.log[today()] || (S.log[today()] = [0, 0, 0]);
  if (ok) L[0]++; else L[1]++;
  if (r.seen === 1) L[2]++;
  if (ok) teamXp();
  save();
}
/* ---------- drużyna: poziom co 20 dobrych odpowiedzi (najwyżej 100) ---------- */
const TEAMLV = id => Math.min(100, 1 + Math.floor((S.txp[id] || 0) / 20));
let TEAMUP = [];                                  // awanse do ogłoszenia po lekcji
function teamXp() {
  S.team.forEach(id => {
    const b = TEAMLV(id); S.txp[id] = (S.txp[id] || 0) + 1;
    if (TEAMLV(id) > b) { TEAMUP.push(id); toast('⬆️ ' + DEX[id].name + ' · Lv ' + TEAMLV(id), 2500); }
  });
}
/* ---------- ewolucja drużyny (dane z Poképedii: build_evo.py → evo.js) ----------
   Pokémon z drużyny ewoluuje, gdy dojdzie do poziomu z gier (kamień/przyjaźń/wymiana → poziom 20–25).
   Kilka możliwych form (Eevee) → dziecko wybiera. Nowa forma trafia do albumu, stara w nim zostaje. */
const EVO = window.PE_EVO || {};
function evoInfo(id) {
  const e = (EVO[id] || []).filter(x => DEX[x[0]]); if (!e.length) return null;
  return { lv: Math.min(...e.map(x => x[1])), to: e.map(x => x[0]) };
}
async function evolveTeam(tok) {
  for (let j = 0; j < S.team.length; j++) {
    const id = S.team[j], ev = evoInfo(id);
    if (!ev || TEAMLV(id) < ev.lv || !alive(tok)) continue;
    const from = DEX[id].name;
    PLHELP = 'Twój Pokémon ewoluuje — zmienia się w silniejszą formę!';
    app.innerHTML = hud() + `<div class="play" style="justify-content:center"><div class="banner">What?</div>
      <div class="evo"><img id="evoimg" src="${IMG(id)}" alt=""></div><div id="evochoice" class="options"></div></div>`;
    wireHud(); FX.pop();
    await SP.say('What? ' + from + ' is evolving!'); if (!alive(tok)) return;
    let to = ev.to[0];
    if (ev.to.length > 1) {                                  // Eevee i spółka: dziecko wybiera formę
      $('#evochoice').innerHTML = ev.to.map(t => `<button class="opt evochoice" data-id="${t}" aria-label="${DEX[t].name}"><img src="${IMG(t)}" alt=""><small>${DEX[t].name}</small></button>`).join('');
      SP.say('Choose!');
      to = await new Promise(r => document.querySelectorAll('.evochoice').forEach(b => b.onclick = () => { FX.tap(); SP.stop(); r(+b.dataset.id); }));
      $('#evochoice').innerHTML = '';
    }
    const im = $('#evoimg'); im.classList.add('evolving');
    for (const ms of [420, 360, 300, 240, 180, 140, 110, 90]) { im.src = IMG(im.src.includes(String(id).padStart(3, '0') + '.webp') ? to : id); FX.click(); await wait(ms); }
    im.src = IMG(to); im.classList.remove('evolving'); im.classList.add('evolved');
    confetti(90); FX.fanfare(); sparks(center(im).x, center(im).y, 24);
    S.team[j] = to; S.txp[to] = Math.max(S.txp[to] || 0, S.txp[id] || 0);
    const isNew = !has(to); if (isNew) { S.dex.push(to); S.fresh.push(to); }
    save();
    $('.banner').textContent = 'Congratulations!';
    $('#evochoice').innerHTML = `<p class="learn sentence">${from} ➜ <b>${DEX[to].name}</b>${isNew ? ' · NEW!' : ''}</p><button class="next" id="nx">▶</button>`;
    await SP.say('Congratulations! ' + from + ' evolved into ' + DEX[to].name + '!'); if (!alive(tok)) return;
    await new Promise(r => { $('#nx').onclick = () => { FX.tap(); r(); }; });
  }
}
function buddyHTML() {
  if (!S.team.length) return '';
  return `<div class="buddies">${S.team.map(id => `<span class="buddy"><img src="${IMG(id)}" alt="${DEX[id].name}"><b>Lv ${TEAMLV(id)}</b></span>`).join('')}</div>`;
}
function cheer() { document.querySelectorAll('.buddies .buddy').forEach((b, j) => { b.classList.remove('cheer'); void b.offsetWidth; setTimeout(() => b.classList.add('cheer'), j * 90); }); }
const isDue = w => S.words[w] && S.words[w].seen > 0 && S.words[w].due <= today();
const mastered = w => S.words[w] && S.words[w].box >= 3;
function knownWords(isle) {
  const I = isleOf(isle); const st = Math.min(S.stage[isle] || 0, I.stages.length - 1);
  return I.stages.slice(0, st + 1).flat();
}
function unlocked(idx) {
  if (S.settings.all || idx === 0) return true;
  const I = ISLANDS[idx];
  // wyspa mistrzowska: wszystkie odznaki swojego świata
  if (I.final) return ISLANDS.filter(x => x.world === I.world && !x.final).every(x => S.badges.includes(x.id));
  return S.badges.includes(ISLANDS[idx - 1].id);
}

/* ======================================================================
   MOWA: angielski głos z przeglądarki (bez plików), polski do pomocy
   ====================================================================== */
/* ---------- NAGRANIA: zdania nagrane z góry głosem Zoe (glos/*.mp3, spis w glos.js) ----------
   Najpierw szukamy całego zdania; gdy go nie ma — składamy je z kawałków: imiona Pokémonów,
   nazwy regionów i liczby są nagrane osobno, a reszta zdania jako „kawałki" wokół nich. */
function h64(s) {
  let a = 0x811c9dc5, b = 0x050c5d1f;
  for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); a ^= c; a = Math.imul(a, 0x01000193); b ^= c; b = Math.imul(b, 0x01000193); }
  return (a >>> 0).toString(16).padStart(8, '0') + (b >>> 0).toString(16).padStart(8, '0');
}
const GL = {
  set: null, rx: null, bufs: new Map(),
  init() {
    const g = window.PE_GLOS; if (!g || !g.h) return;
    this.set = new Set(g.h.split(' '));
    const esc = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const toks = [...new Set(D.dex.map(r => r[1]).concat(Object.values(D.pool).map(m => m.name), REGIONS))].sort((x, y) => y.length - x.length);
    this.rx = new RegExp('(?<![A-Za-z\\u00C0-\\u024F])(' + toks.map(esc).join('|') + '|\\d+)(?![A-Za-z\\u00C0-\\u024F\\d])');
  },
  key: (lang, t) => h64(lang + '|' + t.trim().replace(/\s+/g, ' ')),
  has(lang, t) { return this.set.has(this.key(lang, t)); },
  plan(text, lang) {
    if (!this.set) return null;
    const t = text.trim(); if (this.has(lang, t)) return [[this.key(lang, t), 0]];
    const out = [];
    for (const s0 of t.match(/(?:Mr\. |Jr\. |[^.!?…])+[.!?…]*/g) || [t]) {
      const s = s0.trim(); if (!s) continue;
      if (this.has(lang, s)) { out.push([this.key(lang, s), 240]); continue; }
      if (lang !== 'en') return null;
      const parts = s.split(this.rx).map(p => p.replace(/^[\s,—–-]+/, '').trim()).filter(p => p && !/^[.,!?…]+$/.test(p));
      for (const p of parts) { if (!this.has(lang, p)) return null; out.push([this.key(lang, p), 60]); }
      if (out.length) out[out.length - 1][1] = 240;
    }
    return out.length ? out : null;
  },
  buf(h, ctx) {
    if (this.bufs.has(h)) return this.bufs.get(h);
    const p = fetch('glos/' + h.slice(0, 2) + '/' + h + '.mp3').then(r => { if (!r.ok) throw new Error('404'); return r.arrayBuffer(); })
      .then(a => new Promise((ok, no) => ctx.decodeAudioData(a, ok, no)));
    p.catch(() => this.bufs.delete(h));
    this.bufs.set(h, p);
    if (this.bufs.size > 400) this.bufs.delete(this.bufs.keys().next().value);
    return p;
  }
};
const SP = {
  en: null, pl: null, us: null,
  // macOS ma „głosy-zabawki" (śpiewające, bulgoczące) — dziecko nie może się od nich uczyć wymowy
  BAD: /^(Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Good News|Jester|Organ|Pipe Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Fred|Junior|Kathy|Ralph|Deranged|Hysterical|Princess|Grandma|Grandpa|Rocko|Shelley|Flo|Eddy|Reed|Sandy)\b/i,
  // Zoe (Premium, US) — żeński, wyraźny, pobrany w systemie. NIE Samantha: na tym Macu to atrapa,
  // która po cichu czyta polskim głosem Zosi (sprawdzone przy graniu 12.11.2026)
  PREF: ['Zoe', 'Ava', 'Daniel', 'Serena', 'Kate', 'Google UK English Female', 'Martha', 'Arthur', 'Allison',
    'Susan', 'Karen', 'Moira', 'Google US English', 'Microsoft Sonia', 'Microsoft Libby', 'Microsoft Aria', 'Microsoft Jenny'],
  list() {
    if (!('speechSynthesis' in window)) return [];
    return speechSynthesis.getVoices().filter(v => /^en[-_]/i.test(v.lang) && !this.BAD.test(v.name));
  },
  pick() {
    if (!('speechSynthesis' in window)) return;
    const all = speechSynthesis.getVoices(), en = this.list();
    this.en = en.find(v => v.name === S.settings.voice)
      || this.PREF.map(p => en.find(v => v.name.indexOf(p) === 0)).find(Boolean)
      || en.find(v => /en[-_]GB/i.test(v.lang)) || en[0] || null;
    this.pl = all.find(v => /^pl/i.test(v.lang)) || null;
    const usv = en.filter(v => /en[-_]US/i.test(v.lang));
    this.us = ['Zoe', 'Ava', 'Allison', 'Google US English'].map(p => usv.find(v => v.name.indexOf(p) === 0)).find(Boolean) || usv[0] || null;
  },
  // srv: mowa z serwera gry (systemowy głos macOS, plik WAV) — pewniejsza niż mowa przeglądarki,
  // która w aplikacji potrafi zaciąć się na całą sesję (13.11.2026). null = jeszcze nie wiadomo.
  srv: null, cur: null, curEnd: null, n: 0, stat: { rec: 0, srv: 0, dev: 0 },   // skąd szły zdania w tej sesji (panel rodzica)
  ping() {
    return fetch('/tts/ping', { cache: 'no-store' }).then(r => r.ok ? r.text() : '').then(t => { this.srv = t === 'ok'; })
      .catch(() => { this.srv = false; });
  },
  fix(text, pl) {
    // poprawki wymowy (zgłoszone przy graniu): w „cloudy" ma być wyraźne D
    return pl ? text : text.replace(/\bcloudy\b/gi, 'cloud-dee');
  },
  say(text, o) {
    o = o || {};
    const pl = o.lang === 'pl';
    const rate = (o.rate || 1) * (pl ? 1 : S.settings.rate);
    text = this.fix(text, pl);
    this.stop(true);
    const id = ++this.n;
    return new Promise(res => {
      let done = false;
      const end = () => { if (!done) { done = true; if (this.curEnd === end) this.curEnd = null; if (id === this.n) setSay(false); res(); } };
      this.curEnd = end;
      setSay(true);
      const other = () => { if (id !== this.n) return end(); if (this.srv !== false) this.sayFile(text, pl, rate, id, end); else this.sayWeb(text, pl, rate, id, end, true); };
      const plan = GL.plan(text, pl ? 'pl' : 'en');
      if (plan) this.sayParts(plan, id, end, other); else other();
    });
  },
  sayParts(plan, id, end, other) {
    const ctx = FX.init(); if (!ctx) return other();
    if (ctx.state === 'suspended') { try { ctx.resume(); } catch (e) { } }
    Promise.all(plan.map(([h]) => GL.buf(h, ctx))).then(bufs => {
      if (id !== this.n) return end();
      if (!this.vg) { this.vg = ctx.createGain(); this.vg.gain.value = 1; this.vg.connect(ctx.destination); }
      let t = ctx.currentTime + 0.03; const srcs = [];
      bufs.forEach((b, j) => { const s = ctx.createBufferSource(); s.buffer = b; s.connect(this.vg); s.start(t); srcs.push(s); t += b.duration + plan[j][1] / 1000; });
      this.cur = { pause: () => srcs.forEach(s => { try { s.stop(); } catch (e) { } }) };
      srcs[srcs.length - 1].onended = end; this.stat.rec++;
      setTimeout(end, (t - ctx.currentTime) * 1000 + 900);
    }).catch(() => other());
  },
  sayFile(text, pl, rate, id, end) {
    const a = new Audio('/tts?l=' + (pl ? 'pl' : 'en') + '&r=' + Math.round(175 * rate) + '&t=' + encodeURIComponent(text));
    this.cur = a;
    let ok = false;
    const fail = () => {
      if (ok || id !== this.n) return end();
      // serwer nie odpowiada — awaryjnie mowa przeglądarki
      this.srv = false; this.sayWeb(text, pl, rate, id, end, false);
    };
    a.onplaying = () => {
      if (ok) return; ok = true; this.srv = true; this.stat.srv++;
      setTimeout(end, (isFinite(a.duration) && a.duration > 0 ? a.duration * 1000 : 1500 + text.length * 110 / rate) + 1500);
    };
    a.onended = end; a.onerror = fail;
    const p = a.play(); if (p && p.catch) p.catch(e => { if (e && e.name === 'NotAllowedError') end(); else fail(); });
    setTimeout(() => { if (!ok && id === this.n) { a.pause(); fail(); } }, 4000);
  },
  sayWeb(text, pl, rate, id, end, canFile) {
    if (!('speechSynthesis' in window)) return end();
    // w „stormy" słychać R — to zdanie mówi głos amerykański
    const us = !pl && /\bstormy\b/i.test(text) && this.us;
    const u = new SpeechSynthesisUtterance(text);
    const v = pl ? this.pl : (us || this.en);
    if (v) u.voice = v;
    u.lang = pl ? 'pl-PL' : (v ? v.lang : 'en-GB');
    u.rate = rate; u.pitch = 1.05;
    this.cur = u; // trzymamy referencję — inaczej Chrome gubi onend
    let started = false;
    u.onstart = () => { started = true; this.stat.dev++; };
    u.onend = end; u.onerror = end;
    try { speechSynthesis.resume(); } catch (e) { }
    speechSynthesis.speak(u);
    // zacięta mowa przeglądarki: nie ruszyła w 1,5 s → odblokuj i spróbuj z pliku z serwera
    setTimeout(() => {
      if (started || id !== this.n) return;
      try { speechSynthesis.cancel(); } catch (e) { }
      if (canFile !== false) this.ping().then(() => { if (this.srv && id === this.n) this.sayFile(text, pl, rate, id, end); else end(); });
      else end();
    }, 1500);
    setTimeout(end, 2500 + text.length * 95 / rate);
  },
  stop(keep) {
    if (this.cur && this.cur.pause) { try { this.cur.pause(); } catch (e) { } }
    this.cur = null;
    const e = this.curEnd; this.curEnd = null; if (e) e();
    if ('speechSynthesis' in window && (speechSynthesis.speaking || speechSynthesis.pending)) { try { speechSynthesis.cancel(); } catch (e) { } }
    if (!keep) { this.n++; setSay(false); }
  }
};
if ('speechSynthesis' in window) { SP.pick(); speechSynthesis.onvoiceschanged = () => SP.pick(); }
SP.ping(); GL.init();
function setSay(on) { const b = $('.say'); if (b) b.classList.toggle('talking', on); }
const PRAISE = ['Great job!', 'Awesome!', 'Well done!', 'Super!', 'You got it!', 'Fantastic!', 'Yes! Good job!', 'Brilliant!'];

/* ======================================================================
   DŹWIĘKI: syntezowane w Web Audio — bez plików i bez kłopotu z prawami
   ====================================================================== */
const FX = {
  ctx: null, out: null,
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return this.ctx; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    this.ctx = new AC(); this.out = this.ctx.createGain(); this.out.gain.value = 0.45; this.out.connect(this.ctx.destination);
    return this.ctx;
  },
  tone(f, at, dur, o) {
    o = o || {};
    const c = this.ctx, t = c.currentTime + at, osc = c.createOscillator(), g = c.createGain();
    osc.type = o.type || 'triangle'; osc.frequency.setValueAtTime(f, t);
    if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(o.vol || 0.3, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g); g.connect(this.out); osc.start(t); osc.stop(t + dur + 0.05);
  },
  noise(at, dur, f1, f2, vol) {
    const c = this.ctx, t = c.currentTime + at, len = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource(), bp = c.createBiquadFilter(), g = c.createGain();
    src.buffer = buf; bp.type = 'bandpass'; bp.Q.value = 2;
    bp.frequency.setValueAtTime(f1, t); bp.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(vol || 0.4, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(bp); bp.connect(g); g.connect(this.out); src.start(t);
  },
  play(fn) { if (!S.settings.sfx) return; try { if (this.init()) fn(this); } catch (e) { } },
  tap() { this.play(f => f.tone(880, 0, 0.07, { type: 'sine', vol: 0.15 })); },
  good() { this.play(f => { f.tone(659, 0, 0.12); f.tone(988, 0.09, 0.22); }); },
  bad() { this.play(f => f.tone(220, 0, 0.25, { type: 'sine', to: 170, vol: 0.2 })); },
  whoosh() { this.play(f => f.noise(0, 0.45, 400, 3000, 0.35)); },
  click() { this.play(f => { f.tone(1400, 0, 0.04, { type: 'square', vol: 0.08 }); f.noise(0, 0.05, 2000, 1500, 0.15); }); },
  coin() { this.play(f => { f.tone(1318, 0, 0.08, { type: 'square', vol: 0.06 }); f.tone(1975, 0.07, 0.3, { type: 'sine', vol: 0.18 }); }); },
  pop() { this.play(f => f.tone(500, 0, 0.12, { type: 'sine', to: 1100, vol: 0.2 })); },
  catch() { this.play(f => { [523, 659, 784, 1047].forEach((n, i) => f.tone(n, i * 0.07, 0.25)); f.tone(1568, 0.32, 0.4, { type: 'sine', vol: 0.12 }); }); },
  fanfare() {
    this.play(f => {
      [392, 523, 659, 784, 1047].forEach((n, i) => f.tone(n, i * 0.1, 0.3, { vol: 0.25 }));
      [523, 659, 784].forEach(n => f.tone(n, 0.55, 1.0, { type: 'sine', vol: 0.12 }));
      [1047, 1319, 1568, 2093].forEach((n, i) => f.tone(n, 0.7 + i * 0.09, 0.3, { type: 'sine', vol: 0.06 }));
    });
  }
};

/* ======================================================================
   EFEKTY: rzut Poké Ballem, iskry, konfetti
   ====================================================================== */
function center(el) { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
function sparks(x, y, n) {
  for (let i = 0; i < (n || 10); i++) {
    const s = document.createElement('div'); s.className = 'spark'; s.textContent = pick(['⭐', '✨', '🌟']);
    const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 90;
    s.style.left = x - 13 + 'px'; s.style.top = y - 13 + 'px';
    s.style.setProperty('--dx', Math.cos(a) * d + 'px'); s.style.setProperty('--dy', Math.sin(a) * d + 'px');
    document.body.appendChild(s); setTimeout(() => s.remove(), 950);
  }
}
function confetti(n) {
  const cols = ['#ff6fae', '#ffd94a', '#5fa8e8', '#5bbf4a', '#9b5fc9', '#ff9a2e'];
  for (let i = 0; i < (n || 70); i++) {
    const c = document.createElement('div'); c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw'; c.style.background = pick(cols);
    c.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px'); c.style.setProperty('--rot', (Math.random() * 900 - 450) + 'deg');
    c.style.animationDuration = 2 + Math.random() * 1.8 + 's'; c.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.appendChild(c); setTimeout(() => c.remove(), 4500);
  }
}
/* Poké Ball leci łukiem do Pokémona, wciąga go i się zamyka.
   full=true: pełne łapanie z trzema potrząśnięciami (nagroda); false: szybka wersja na dobrą odpowiedź */
async function throwBall(target, full) {
  const to = center(target), from = { x: window.innerWidth / 2, y: window.innerHeight + 40 };
  const b = document.createElement('div'); b.className = 'ball'; document.body.appendChild(b);
  FX.whoosh();
  const T = 620, t0 = performance.now(), peak = Math.min(from.y, to.y) - 180;
  await new Promise(res => {
    let done = false;
    const fin = () => { if (done) return; done = true; b.style.left = to.x - 32 + 'px'; b.style.top = to.y - 32 + 'px'; res(); };
    // zabezpieczenie: gdy przeglądarka wstrzyma klatki (karta w tle, oszczędzanie baterii),
    // rzut i tak się kończy — inaczej dziecko zostałoby z zawieszoną grą
    setTimeout(fin, T + 250);
    (function step(now) {
      if (done) return;
      const k = Math.min(1, (now - t0) / T), x = from.x + (to.x - from.x) * k;
      const y = (1 - k) * (1 - k) * from.y + 2 * (1 - k) * k * peak + k * k * to.y;
      b.style.left = x - 32 + 'px'; b.style.top = y - 32 + 'px'; b.style.transform = 'rotate(' + k * 720 + 'deg)';
      k < 1 ? requestAnimationFrame(step) : fin();
    })(t0);
  });
  sparks(to.x, to.y, 6);
  target.classList.add('gone');
  FX.pop();
  await wait(380);
  b.style.transition = 'top .25s ease-in'; b.style.transform = 'none'; b.style.top = to.y - 10 + 'px';
  await wait(300);
  const shakes = full ? 3 : 1;
  for (let i = 0; i < shakes; i++) {
    b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); FX.click();
    await wait(full ? 620 : 420);
  }
  b.classList.add('clicked'); FX.catch(); sparks(to.x, to.y + 22, full ? 18 : 10);
  await wait(full ? 700 : 420);
  b.style.transition = 'opacity .3s'; b.style.opacity = '0'; setTimeout(() => b.remove(), 320);
}
/* tło ekranów gry pasuje do świata wyspy (0 = mapa: zwykłe niebo) */
function setWorld(n) { if (n) document.body.dataset.w = n; else delete document.body.dataset.w; }
/* za dobrą odpowiedź gwiazdka leci z miejsca dotknięcia do licznika ⭐ */
let LASTPT = null;
addEventListener('pointerdown', e => { LASTPT = { x: e.clientX, y: e.clientY }; }, true);
function flyStar() {
  const chip = $('.starchip'); if (!chip) return;
  const a = LASTPT || { x: innerWidth / 2, y: innerHeight / 2 }, b = center(chip);
  const st = document.createElement('div'); st.className = 'flystar'; st.textContent = '⭐';
  st.style.left = a.x - 22 + 'px'; st.style.top = a.y - 22 + 'px'; document.body.appendChild(st);
  void st.offsetWidth;
  st.style.transform = `translate(${b.x - a.x}px,${b.y - a.y}px) scale(.6) rotate(360deg)`;
  setTimeout(() => {
    st.remove(); const c = $('.starchip'); if (!c) return;
    const v = c.querySelector('b'); if (v) v.textContent = S.stars;
    c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); FX.coin();
  }, 650);
}
function toast(txt, ms) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = txt; document.body.appendChild(t);
  setTimeout(() => t.remove(), ms || 3200);
}

/* ======================================================================
   EKRANY I NAWIGACJA
   Każde przejście podbija numer sesji — przerwane zadanie nie może grać dalej w tle.
   ====================================================================== */
let SESSION = 0, PLHELP = '';
const alive = tok => tok === SESSION;
function go(fn) { SESSION++; SP.stop(); document.querySelectorAll('.ball,.spark').forEach(e => e.remove()); fn(); window.scrollTo(0, 0); }
function plHelp(txt) {
  PLHELP = txt;
  const b = $('.iconbtn.pl'); if (b) b.style.display = S.settings.plHelp ? '' : 'none';
}
async function sayPl() {
  FX.tap(); SP.stop(); toast('🇵🇱 ' + PLHELP, 5200);
  if (SP.pl) await SP.say(PLHELP, { lang: 'pl' });
}
window.PE = { sayPl: sayPl,
  // podgląd jednego ekranu (zrzuty kontrolne): PE.demo('pickpic', 'hat'), PE.demoLearn('clothes', 'hat')
  demo: (g, w) => { setWorld(isleOf(WORD_ISLE[w]).world); go(() => GAMES[g](w, 0, 8, SESSION)); },
  demoLearn: (id, w) => { setWorld(isleOf(id).world); go(() => learn(isleOf(id), [w], SESSION)); }, setWorld: n => setWorld(n),
  nextReward: () => nextLegend(),
  demoParent: () => showParent(), demoCollection: () => go(showCollection),
  demoStar: (x, y) => { LASTPT = { x, y }; flyStar(); } };

const level = () => 1 + Math.floor(S.stars / 15);
async function levelUp(tok) {
  const b = document.createElement('div'); b.className = 'banner levelup'; b.textContent = 'Level up! Lv ' + level();
  document.body.appendChild(b); confetti(40); FX.fanfare();
  await SP.say('Level up! You are level ' + level() + '!');
  b.remove();
}
function hud(extra) {
  const lvl = level();
  return `<div class="hud">
    <button class="iconbtn" data-act="home" aria-label="Mapa">🏠</button>
    ${extra || ''}<span class="grow"></span>
    <span class="chip starchip">⭐ <b>${S.stars}</b></span><span class="chip">Lv ${lvl}</span>
    <button class="iconbtn pl" data-act="pl" aria-label="Pomoc po polsku">PL</button>
  </div>`;
}
function wireHud() {
  const h = $('[data-act=home]'); if (h) h.onclick = () => { FX.tap(); go(showMap); };
  const p = $('[data-act=pl]'); if (p) p.onclick = sayPl;
  plHelp(PLHELP);
}

/* ---------- ekran tytułowy ---------- */
function showTitle() {
  setWorld(0);
  app.innerHTML = `<div class="title">
    <div class="logo">Poké English<small>angielski z Pokémonami</small></div>
    <img class="hero" src="${IMG(25)}" alt="Pikachu">
    <button class="bigplay" id="play">▶ PLAY</button>
  </div>
  <div class="parentlink">${holdBtn('👪', 'Dla rodzica')}</div>
  <p class="legal">Projekt fanowski, niekomercyjny. Pokémon i nazwy Pokémonów to znaki towarowe Nintendo, Creatures Inc. i GAME FREAK.
    Gra nie jest związana z The Pokémon Company. · <a href="https://futureshow.pl/" target="_blank" rel="noopener">Z pracowni FutureShow</a></p>`;
  $('#play').onclick = async () => {
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) { }
    FX.init(); FX.fanfare(); SP.pick();
    try { speechSynthesis.cancel(); speechSynthesis.resume(); } catch (e) { }
    go(showMap);
    if (!S.seenMap) { await SP.say('Hello, trainer! Let\'s learn English with Pokémon! Tap an island!'); S.seenMap = true; save(); }
  };
  wireHold();
}
/* bramka dla rodzica: przytrzymaj 1,5 s — dziecko zwykle stuka, nie trzyma */
function holdBtn(ic, label) { return `<button class="iconbtn hold" data-hold aria-label="${label}">${ic}<span class="ring"></span></button>`; }
function wireHold() {
  document.querySelectorAll('[data-hold]').forEach(b => {
    let t0 = 0, raf = 0;
    const ring = $('.ring', b);
    const stop = () => { cancelAnimationFrame(raf); ring.style.setProperty('--p', '0%'); t0 = 0; };
    const loop = now => {
      const p = Math.min(1, (now - t0) / 1500); ring.style.setProperty('--p', p * 100 + '%');
      if (p >= 1) { stop(); FX.pop(); showParent(); } else raf = requestAnimationFrame(loop);
    };
    b.onpointerdown = e => { e.preventDefault(); FX.init(); t0 = performance.now(); raf = requestAnimationFrame(loop); };
    b.onpointerup = b.onpointerleave = b.onpointercancel = stop;
    b.onclick = () => { if (!t0) toast('Rodzicu: przytrzymaj przycisk 👪 przez chwilę.'); };
  });
}

/* ---------- mapa wysp ---------- */
function showMap() {
  setWorld(0);
  PLHELP = 'Wybierz wyspę. Każda wyspa uczy innych angielskich słówek. Kolejne wyspy otwierają się, gdy zdobędziesz odznakę.';
  const nextIdx = ISLANDS.findIndex((I, i) => unlocked(i) && !S.badges.includes(I.id));
  const isle = (I, i) => {
    const op = unlocked(i), have = S.badges.includes(I.id);
    const due = I.stages.flat().filter(isDue).length;
    const st = S.stage[I.id] || 0, total = I.stages.length;
    const stars = I.final ? '' : '⭐'.repeat(Math.min(st, total)) + '☆'.repeat(Math.max(0, total - st));
    return `<button class="isle w${I.world} ${op ? '' : 'locked'}" data-i="${i}" aria-label="${I.en}">
      ${i === nextIdx ? '<span class="here">👇</span>' : ''}
      <span class="ic">${I.ic}</span><b>${I.en}</b><span class="pl">${I.pl}</span>
      <span class="stars">${stars}</span>
      ${have ? `<span class="badge">${BADGE(I.id)}</span>` : ''}
      ${op && due ? `<span class="due">🔁 ${due}</span>` : ''}
    </button>`;
  };
  const open = wn => wn === 1 || S.settings.all || S.badges.includes(finalOf(wn - 1).id);
  const showDaily = !dailyDone() && S.badges.length >= 1 && dueWords().length >= 3;
  // zamknięte światy: pokazujemy tylko najbliższy — dalsze to niespodzianka (inaczej mapa przytłacza)
  const shown = WORLDS.filter(([wn]) => wn === 1 || open(wn) || open(wn - 1));
  app.innerHTML = hud(`<button class="iconbtn" data-act="col" aria-label="Moje Pokémony">📕</button>
      <span class="chip">🏅 ${S.badges.length}/${ISLANDS.length}</span>${S.team.length ? `<button class="teamchip" data-act="team" aria-label="Moja drużyna">${S.team.map(id => `<img src="${IMG(id)}" alt="">`).join('')}</button>` : ''}${S.daily && S.daily.streak > 1 && S.daily.day >= today() - 1 ? `<span class="chip">🔥 ${S.daily.streak}</span>` : ''}`) +
    (!S.team.length && S.dex.length >= 3 ? `<button class="daily teamcall" data-act="pickteam"><span class="ic">⭐</span><b>Choose your team!</b><small>Wybierz drużynę: do 3 ulubionych Pokémonów, które będą Ci kibicować i rosnąć razem z Tobą</small></button>` : '') +
    (showDaily ? `<button class="daily" data-act="daily"><span class="ic">🔁</span><b>Daily training</b><small>Trening dnia · ${(n => n + (n >= 2 && n <= 4 ? ' słowa' : ' słów'))(Math.min(dueWords().length > 40 ? 12 : 8, dueWords().length))} do powtórki · nagroda: Pokémon</small></button>` : '') +
    shown.map(([wn, sub]) => `<section class="world world${wn} ${open(wn) ? '' : 'closed'}">
      <h2 class="wtitle" ${wn > 1 ? `data-lock="Get the ${finalOf(wn - 1).en} badge!"` : ''}><span>World ${wn}</span><small>${sub} · Świat ${wn}</small></h2>
      <div class="map">${ISLANDS.map((I, i) => I.world === wn ? isle(I, i) : '').join('')}</div></section>`).join('') +
    (shown.length < WORLDS.length ? `<p class="more">❔ ${WORLDS.length - shown.length} more ${WORLDS.length - shown.length > 1 ? 'worlds' : 'world'}…</p>` : '') +
    `<div class="parentlink">${holdBtn('👪', 'Dla rodzica')}</div>`;
  wireHud(); wireHold();
  // pierwsze wejście po odznace mistrzowskiej: świętujemy nowy świat i przewijamy do niego
  let newWorld = 0;
  WORLDS.forEach(([wn]) => { if (wn > 1 && open(wn) && !S['seenW' + wn]) { if (!S.settings.all) newWorld = wn; S['seenW' + wn] = true; } });
  if (newWorld) {
    save();
    setTimeout(() => {
      const w = $('.world' + newWorld); if (w) w.scrollIntoView({ behavior: 'smooth', block: 'start' });
      confetti(80); FX.fanfare();
      SP.say('Wow! A new world is open! World ' + NUMS[newWorld - 1] + '! ' + WORLDS[newWorld - 1][1] + '!');
    }, 500);
  } else if (nextIdx >= 0 && ISLANDS[nextIdx].world > 1) {
    setTimeout(() => { const w = $('.world' + ISLANDS[nextIdx].world); if (w) w.scrollIntoView({ block: 'start' }); }, 60);
  }
  $('[data-act=col]').onclick = () => { FX.tap(); go(showCollection); };
  const tc = $('[data-act=team]'); if (tc) tc.onclick = () => { FX.tap(); go(showCollection); };
  const pt = $('[data-act=pickteam]'); if (pt) pt.onclick = () => { FX.tap(); go(showCollection); SP.say('Choose your team! Tap a Pokémon.'); };
  const db = $('[data-act=daily]'); if (db) db.onclick = () => { FX.tap(); go(() => dailyRun(SESSION)); };
  document.querySelectorAll('.isle').forEach(b => b.onclick = () => {
    const i = +b.dataset.i;
    if (!unlocked(i)) { FX.bad(); SP.say('This island is locked. Get the badge first!'); return; }
    FX.tap(); go(() => enterIsland(ISLANDS[i]));
  });
}

/* ---------- wejście na wyspę: kolejny etap, odznaka albo powtórka ---------- */
async function enterIsland(I) {
  const tok = SESSION; setWorld(I.world);
  if (I.final) return championRun(I, tok);
  const st = S.stage[I.id] || 0;
  if (st < I.stages.length) {
    const words = I.stages[st];
    await learn(I, words, tok); if (!alive(tok)) return;
    await practice(I, words, 8, tok, 'Let\'s play!'); if (!alive(tok)) return;
    S.stage[I.id] = st + 1; save();
    await wildCatch(words.flatMap(monsFor), tok);
  } else if (!S.badges.includes(I.id) && S.retry && S.retry[I.id]) {
    // po przegranej bitwie: najpierw spokojny trening najsłabszych słów, bitwa dopiero przy następnej wizycie
    const words = weakest(I, 4);
    await practice(I, words, 8, tok, 'Practice time!'); if (!alive(tok)) return;
    delete S.retry[I.id]; save();
    await wildCatch(words.flatMap(monsFor), tok);
  } else if (!S.badges.includes(I.id)) {
    const ok = await practice(I, I.stages.flat(), 10, tok, 'Badge battle!'); if (!alive(tok)) return;
    if (ok >= 7) { await badge(I, tok); if (!alive(tok)) return; await wildCatch(I.stages.flat().flatMap(monsFor), tok); }
    else {
      (S.retry = S.retry || {})[I.id] = true; save();
      // bez liczenia porażek: blisko celu mówimy, ile brakuje; daleko — tylko zachęta
      await bannerScreen(ok >= 4 ? 'So close!' : 'Good try!',
        ok >= 4 ? 'You got ' + ok + ' stars. You need 7. Let\'s practise and try again!' : 'Let\'s practise a little more and try again!', tok);
      go(showMap);
    }
  } else {
    // wyspa ukończona: powtórka — najpierw słowa najsłabsze i te, które czekają na powtórkę
    const words = weakest(I, 4);
    await practice(I, words, 8, tok, 'Review time!'); if (!alive(tok)) return;
    await wildCatch(D.stars, tok);
  }
}

/* najsłabsze słowa wyspy: najniższe pudełko, potem te, które najdłużej czekają */
function weakest(I, n) {
  return I.stages.flat().slice().sort((a, b) => (rec(a).box - rec(b).box) || (rec(a).due - rec(b).due)).slice(0, n);
}

/* ---------- nauka nowych słów (input przed sprawdzaniem) ---------- */
async function learn(I, words, tok) {
  for (let i = 0; i < words.length; i++) {
    if (!alive(tok)) return;
    const w = words[i]; rec(w); save();
    PLHELP = 'Posłuchaj nowego słowa i powtórz je na głos. Potem dotknij strzałki.';
    const ex = shuffle(monsFor(w)).slice(0, 2);
    const T = TH[I.id];
    if (T && T.teach) { await T.teach(w, i, words.length, tok); continue; }
    let vis = '', sentence = '', turn = disp(w), thAct = null;
    if (COLHEX[w]) {
      vis = `<span class="sw" style="background:${COLHEX[w]}"></span>` + ex.map(k => `<img src="${IMG(P(k).id)}" alt="">`).join('');
      sentence = `${P(ex[0]).name} is ${w}.`;
    } else if (NUMS.includes(w)) {
      const n = NUMS.indexOf(w) + 1;
      vis = `<span class="digit">${n}</span><span class="balls">${'<i></i>'.repeat(n)}</span>`;
      sentence = `${cap(w)} Poké Ball${n > 1 ? 's' : ''}.`;
    } else if (SIZEIC[w]) {
      vis = `<img src="${IMG(P(ex[0]).id)}" alt="" style="width:${w === 'big' ? 'clamp(170px,32vw,230px)' : w === 'small' ? '90px' : ''}">`;
      sentence = `${P(ex[0]).name} is ${w}.`;
    } else if (TYPEIC[w]) {
      vis = `<span class="big-ic">${TYPEIC[w]}</span><img src="${IMG(P(ex[0]).id)}" alt="">`;
      sentence = `${P(ex[0]).name} is ${art(w)} Pokémon.`;
    } else if (ACT[w]) {
      vis = `<div class="mon" id="actmon"><img src="${IMG(P(ex[0]).id)}" alt=""></div>`;
      sentence = `${P(ex[0]).name} is ${ACT[w][1]}.`;
    } else if (WX[w]) {
      vis = sceneHTML(w, ex[0], 'big');
      sentence = `It is ${w}!`;
    } else if (FEEL[w]) {
      vis = `<div class="mon loop feel-${w}" id="actmon"><span class="facebub">${FEEL[w]}</span><img src="${IMG(P(ex[0]).id)}" alt=""></div>`;
      sentence = `${P(ex[0]).name} is ${w}.`;
    } else if (FOOD[w]) {
      vis = `<span class="food-big" id="food">${FOOD[w]}</span><div class="mon" id="actmon"><img src="${IMG(P(ex[0]).id)}" alt=""></div>`;
      sentence = `${P(ex[0]).name} eats ${art(w)}.`;
    } else if (ANIMAL[w]) {
      vis = `<span class="big-ic">${ANIMAL[w]}</span><span class="like">=</span><div class="mon" id="actmon"><img src="${IMG(P(ex[0]).id)}" alt=""></div>`;
      sentence = `${P(ex[0]).name} looks like ${art(w)}.`;
    } else if (TOY[w]) {
      vis = `<span class="food-big" id="food">${TOY[w]}</span><div class="mon" id="actmon"><img src="${IMG(P(ex[0]).id)}" alt=""></div>`;
      sentence = `${P(ex[0]).name} plays with ${art(w)}.`;
    } else if (WHERE[w]) {
      vis = whereHTML(ex[0], w, 'big');
      sentence = `${P(ex[0]).name} is ${w} the ${obj(w)}.`;
    } else if (T) {
      const L = T.learn ? T.learn(w, ex) : { vis: T.pic(w, ex[0], 'big'), s: T.sent(w, P(ex[0]).name) };
      vis = L.vis; sentence = L.s; turn = L.turn || turn; thAct = L.act || null;
    }
    app.innerHTML = hud(`<span class="chip">✨ ${i + 1}/${words.length}</span>`) + `<div class="play">
      <div class="learn">
        <div class="word">${disp(w)}</div>
        <div class="vis">${vis}</div>
        <div class="sentence">${sentence}</div>
        <div class="yourturn" id="yt" style="visibility:hidden"><span class="mic">🎤</span><span>Your turn! Say: <b>${turn}</b></span></div>
        <div style="display:flex;gap:14px;align-items:center">
          <button class="say" id="again" aria-label="Posłuchaj jeszcze raz">🔊</button>
          <button class="next" id="nx" style="visibility:hidden">▶</button>
        </div>
      </div></div>`;
    wireHud();
    const doAct = () => {
      const m = $('#actmon'); if (!m) return;
      if (w === 'swim') { m.classList.add('loop', 'act-swim'); wet(m, 0); fxOn(m, 'swim'); }   // na karcie nauki pływa cały czas
      else if (ACT[w]) actOn(m, w);
      else if (FEEL[w]) fxOn(m, w);
      else if (FOOD[w]) { const f = $('#food'); if (f) flyFood(f, m, FOOD[w]).then(() => actOn(m, 'eat', true)); }
      else if (TOY[w]) { const f = $('#food'); if (f) flyFood(f, m, TOY[w]).then(() => { actOn(m, 'dance', true); fxOn(m, 'happy'); }); }
      if (thAct) thAct();
    };
    const teach = async () => {
      doAct();
      await SP.say(cap(disp(w)) + '!', { rate: 0.8 }); if (!alive(tok)) return;
      await wait(250); await SP.say(sentence); if (!alive(tok)) return;
      await wait(300);
      const yt = $('#yt'); if (yt) yt.style.visibility = 'visible';
      await SP.say('Your turn! Say: ' + turn.replace(/[.!]$/, '') + '!'); if (!alive(tok)) return;
      await yourTurn(turn.replace(/[.!]$/, ''), tok); if (!alive(tok)) return;
      const n = $('#nx'); if (n) { n.style.visibility = 'visible'; sparks(center(n).x, center(n).y, 6); }
    };
    $('#again').onclick = () => { FX.tap(); SP.stop(); SP.say(cap(disp(w)) + '! ' + sentence); doAct(); };
    teach();
    await new Promise(res => { $('#nx').onclick = () => { FX.tap(); SP.stop(); res(); }; });
  }
}

/* ---------- seria zadań ---------- */
function buildQueue(words, n) {
  // przeplatanie: do dwóch słów z innych wysp, które właśnie czekają na powtórkę
  // ile powtórek wpleść: zwykle 2, a gdy zaległości rosną (dziecko pędzi przez nowe wyspy) — 3 albu 4
  // w lekcji (8 zadań); w bitwie o odznakę i lidze zostają 2. Najpierw słowa z najniższych pudełek.
  const pool = Object.keys(S.words).filter(w => isDue(w) && !words.includes(w) && WORD_ISLE[w]);
  const k = n === 8 ? (pool.length > 60 ? 4 : pool.length > 20 ? 3 : 2) : n >= 8 ? 2 : 0;
  const due = shuffle(shuffle(pool).sort((a, b) => rec(a).box - rec(b).box).slice(0, k * 2)).slice(0, k);
  let q = [];
  while (q.length < n - due.length) q = q.concat(shuffle(words));
  q = shuffle(q.slice(0, n - due.length).concat(due));
  // powtórki z innych wysp nie na początku — lekcja zaczyna się od tego, czego właśnie się uczymy
  for (let i = 0; i < Math.min(2, q.length); i++) {
    if (!words.includes(q[i])) { const j = q.findIndex((x, k) => k >= 2 && words.includes(x)); if (j > 0) [q[i], q[j]] = [q[j], q[i]]; }
  }
  // bez tego samego słowa dwa razy pod rząd — ale przy dwóch słowach to dawałoby stałe
  // „big, small, big, small", które dziecko szybko rozgryzie; wtedy zostawiamy losowość
  if (words.length > 2) for (let i = 1; i < q.length; i++) {
    if (q[i] === q[i - 1]) { const j = q.findIndex((x, k) => k > i && x !== q[i] && x !== q[i - 1]); if (j > 0) [q[i], q[j]] = [q[j], q[i]]; }
  }
  return q;
}
const GAMESET = { colours: ['find', 'find', 'match'], types: ['find', 'match'], size: ['find'],
  numbers: ['count', 'tapnum'], actions: ['do', 'who'],
  weather: ['scene', 'wxwhat'], feelings: ['feelwho', 'feelwhat'], food: ['feed', 'feed', 'tapfood'],
  where: ['place', 'wherefind'], animals: ['find', 'find', 'match'], toys: ['feed', 'tapfood'],
  clothes: ['dress', 'dress', 'pickpic', 'yesno'], opposites: ['pickpic', 'yesno', 'pickopt'],
  body: w => BODY[w] ? ['touch', 'touch', 'bodywhat'] : ['haswho', 'yesno'],
  sea: ['pickpic', 'pickopt', 'yesno'], bignums: ['count20', 'count20', 'tapnum', 'yesno'],
  house: ['roomput', 'roomwhere', 'yesno'], school: ['feed', 'tapfood', 'yesno'], jobs: ['pickpic', 'pickpic', 'yesno'],
  days: ['dayfind', 'dayafter', 'order'], routine: ['order', 'pickpic', 'yesno'], seasons: ['pickpic', 'order', 'yesno'],
  likes: ['taste', 'likesay'], build: w => w === 'can' || w === "can't" ? ['build', 'cansay'] : ['build'],
  quest: w => ({ who: ['askwho'], what: ['askwhat'], where: ['roomwhere'], 'how many': ['askhowmany'] })[w],
  space: ['pickpic', 'pickpic', 'yesno'], hello: ['chat'], story: ['storyq'],
  abc: w => rec(w).box >= 1 ? ['abchear', 'abcfirst', 'abcfirst'] : ['abchear', 'abchear', 'abcfirst'],
  spell: w => rec(w).box >= 1 ? ['spell', 'spell', 'spell1'] : ['spell1', 'spell1', 'spell'],
  read: w => rec(w).box >= 1 ? ['readpick', 'readsent'] : ['readpick'],
  shop: w => rec(w).box >= 1 ? ['shopbuy', 'shopask', 'shopask'] : ['shopbuy', 'shopbuy', 'shopask'],
  money: w => rec(w).box >= 1 ? ['pay', 'howmuch', 'howmuch'] : ['pay', 'pay', 'howmuch'], manners: ['manners'],
  way: w => rec(w).box >= 1 ? ['dirgo', 'dirsay', 'dirsay'] : ['dirgo', 'dirgo', 'dirsay'],
  compare: w => rec(w).box >= 1 ? ['cmpwho', 'cmpyes', 'cmpyes'] : ['cmpwho', 'cmpwho', 'cmpyes'],
  clock: w => rec(w).box >= 1 ? ['clockwhat', 'clockpick', 'clockwhat'] : ['clockpick', 'clockpick', 'clockwhat'],
  yesterday: w => rec(w).box >= 1 ? ['pastpick', 'pastwhat', 'pastwhat'] : ['pastpick', 'pastpick', 'pastwhat'],
  storytime: ['storyq'], sayit: ['saymic'],
  travel: w => rec(w).box >= 1 ? ['howgo', 'pickpic', 'yesno'] : ['ride', 'ride', 'howgo'],
  family: w => rec(w).box >= 1 ? ['famwho', 'famphoto', 'yesno'] : ['famphoto', 'famphoto', 'yesno'],
  many: w => rec(w).box >= 1 ? ['manysay', 'manypick', 'manyyes'] : ['manypick', 'manypick', 'manysay'],
  home: w => rec(w).box >= 1 ? ['habgo', 'yesno', 'pickpic'] : ['pickpic', 'pickpic', 'habgo'],
  hobby: w => rec(w).box >= 1 ? ['pickopt', 'yesno', 'pickpic'] : ['pickpic', 'pickpic', 'pickopt'],
  shapes: w => rec(w).box >= 1 ? ['descpick', 'descsay', 'descpick'] : ['shapefind', 'shapefind', 'descpick'] };
async function practice(I, words, n, tok, intro) {
  const q = buildQueue(words, n); let ok = 0;
  if (intro) { await bannerScreen(intro, '', tok, 1200); if (!alive(tok)) return 0; }
  for (let i = 0; i < q.length; i++) {
    if (!alive(tok)) return ok;
    const w = q[i], isle = WORD_ISLE[w];
    let games = GAMESET[isle]; if (typeof games === 'function') games = games(w);
    const r = await GAMES[pick(games)](w, i, q.length, tok);
    if (!alive(tok)) return ok;
    grade(w, r);
    if (r) {
      ok++; const lvBefore = level(); S.stars++; save(); flyStar(); cheer();
      if (level() > lvBefore) await levelUp(tok);        // awans świętujemy od razu — to darmowa motywacja
    }
    await wait(350);
  }
  // awanse drużyny ogłaszamy po lekcji (w trakcie zadania głos jest zajęty)
  const up = [...new Set(TEAMUP)]; TEAMUP = [];
  for (const id of up) {
    if (!alive(tok)) break;
    app.innerHTML = hud() + `<div class="play" style="justify-content:center"><div class="banner">Level up!</div>
      <div class="learn cardmon"><img src="${IMG(id)}" alt=""><p class="desc"><b>${DEX[id].name}</b> · Lv ${TEAMLV(id)}</p></div></div>`;
    wireHud(); confetti(50); FX.fanfare();
    await SP.say(DEX[id].name + ' is now level ' + TEAMLV(id) + '!'); await wait(600);
  }
  if (alive(tok)) await evolveTeam(tok);
  return ok;
}
function shell(i, n) {
  app.innerHTML = hud(`<div class="progress">${Array.from({ length: n }, (_, k) => `<i class="${k < i ? 'done' : ''}"></i>`).join('')}</div>`) +
    `<div class="play"><div class="prompt"><button class="say" id="again" aria-label="Posłuchaj jeszcze raz">🔊</button><div class="txt" id="txt"></div></div>
     <div class="arena" id="arena"></div><div class="options" id="opts"></div></div>${buddyHTML()}`;
  wireHud();
}
function monEl(k, cls) {
  return `<button class="mon ${cls || ''}" data-k="${k}"><img src="${IMG(P(k).id)}" alt="${P(k).name}"><span class="shadow"></span></button>`;
}
/* inne poznane słowa tego samego typu — dystraktory z tego, co dziecko już zna */
function others(w, n) {
  const isle = WORD_ISLE[w];
  let pool = knownWords(isle).filter(x => x !== w);
  if (pool.length < n) pool = pool.concat(isleOf(isle).stages.flat().filter(x => x !== w && !pool.includes(x)));
  return shuffle(pool).slice(0, n);
}
function monFrom(w, avoid) { return pick(monsFor(w).filter(k => !(avoid || []).includes(k))) || pick(monsFor(w)); }

/* Wspólna obsługa wyboru: dobra odpowiedź kończy zadanie, zła uczy i po dwóch próbach
   gra podświetla właściwą (uczenie bez porażki). */
function choose(els, isRight, onRight, onWrong, hintEl) {
  return new Promise(res => {
    let miss = 0, busy = false;
    els.forEach(el => el.onclick = async () => {
      if (busy) return;
      if (isRight(el)) { busy = true; els.forEach(e => e.onclick = null); await onRight(el); res(miss === 0); }
      else {
        busy = true; miss++; FX.bad();
        el.classList.remove('wrong'); void el.offsetWidth; el.classList.add('wrong');
        await onWrong(el, miss); busy = false;
        if (miss >= 2 && hintEl) hintEl.classList.add('hint');
      }
    });
  });
}
async function prompt(html, speech, tok) {
  $('#txt').innerHTML = html;
  $('#again').onclick = () => { FX.tap(); SP.stop(); SP.say(speech.join(' ')); };
  for (const s of speech) { if (!alive(tok)) return; await SP.say(s, s.length < 12 ? { rate: 0.8 } : null); await wait(150); }
}

/* ======================================================================
   ZADANIA
   ====================================================================== */
const GAMES = {
  /* „Find the red Pokémon!" — kolory, żywioły, wielkość */
  async find(w, i, n, tok) {
    shell(i, n);
    PLHELP = 'Posłuchaj słowa i dotknij właściwego Pokémona. Głośnik powtarza zdanie.';
    const isle = WORD_ISLE[w];
    let opp, cls = {};
    if (isle === 'size') {
      opp = { big: 'small', small: 'big', long: 'round', round: 'long' }[w];
      cls = w === 'big' || w === 'small' ? { big: 'big', small: 'small' } : {};
    }
    const distr = isle === 'size' ? [opp] : others(w, 2);
    const tgt = monFrom(w);
    const set = shuffle([[tgt, w]].concat(distr.map(d => [monFrom(d, [tgt]), d])));
    $('#arena').innerHTML = set.map(([k, d]) => monEl(k, cls[d] || '')).join('');
    const els = [...document.querySelectorAll('#arena .mon')];
    const target = els[set.findIndex(s => s[1] === w)];
    const name = d => isle === 'types' || isle === 'animals' ? art(d) + ' Pokémon' : d;
    const speech = isle === 'types' ? ['Find the ' + w + ' Pokémon!', cap(w) + '!'] : ['Find the ' + w + ' Pokémon!', cap(w) + '!'];
    prompt(`Find the <em>${w}</em> Pokémon!`, speech, tok);
    return choose(els, el => el === target,
      async el => { SP.stop(); FX.good(); await throwBall(el); await SP.say(pick(PRAISE)); },
      async el => { SP.stop(); const d = set[els.indexOf(el)][1]; await SP.say('That is ' + name(d) + '. Find ' + w + '!', { rate: 0.85 }); },
      target);
  },

  /* „What colour is it?" — kierunek odwrotny: od obrazka do słowa */
  async match(w, i, n, tok) {
    shell(i, n);
    const isle = WORD_ISLE[w];
    PLHELP = isle === 'colours' ? 'Jakiego koloru jest ten Pokémon? Dotknij kółka — usłyszysz jego nazwę po angielsku.'
      : isle === 'animals' ? 'Do jakiego zwierzęcia podobny jest ten Pokémon? Dotknij zwierzątka — usłyszysz jego nazwę po angielsku.'
      : 'Jaki żywioł ma ten Pokémon? Dotknij znaczka — usłyszysz jego nazwę po angielsku.';
    const k = monFrom(w);
    $('#arena').innerHTML = monEl(k, 'solo');
    const opts = shuffle([w].concat(others(w, 2)));
    $('#opts').innerHTML = opts.map(o => isle === 'colours'
      ? `<button class="opt swatch" data-w="${o}" style="background:${COLHEX[o]}" aria-label="${o}"></button>`
      : `<button class="opt" data-w="${o}" aria-label="${o}">${TYPEIC[o] || ANIMAL[o]}</button>`).join('');
    const q = isle === 'colours' ? 'What colour is it?' : isle === 'animals' ? 'What does it look like?' : 'What type is it?';
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.w) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.w === w,
      async el => {
        el.classList.add('right'); FX.good(); await wait(700);
        await throwBall($('#arena .mon'));
        await SP.say(isle === 'animals' ? 'Yes! It looks like ' + art(w) + '!' : 'Yes! It is ' + (isle === 'colours' ? w : art(w) + ' Pokémon') + '!');
      },
      async () => { await wait(700); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.w === w));
  },

  /* „How many Pikachu?" — liczenie */
  async count(w, i, n, tok) {
    shell(i, n);
    PLHELP = 'Policz Pokémony i dotknij właściwej liczby. Każda cyfra mówi swoją nazwę po angielsku.';
    const num = NUMS.indexOf(w) + 1, k = pick(D.stars.filter(x => P(x).h <= 1.2));
    $('#arena').innerHTML = `<div class="counting">${Array.from({ length: num }, (_, j) =>
      `<div class="mon" style="animation-delay:${j * 0.08}s"><img src="${IMG(P(k).id)}" alt=""></div>`).join('')}</div>`;
    const known = knownWords('numbers').map(x => NUMS.indexOf(x) + 1);
    const opts = shuffle([num].concat(shuffle(known.filter(x => x !== num)).slice(0, 2)));
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-n="${o}">${o}</button>`).join('');
    const nm = P(k).name;
    prompt(`How many <em>${nm}</em>?`, ['How many ' + nm + '?'], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(NUMS[e.dataset.n - 1]) + '!', { rate: 0.85 }); }));
    return choose(els, el => +el.dataset.n === num,
      async el => {
        el.classList.add('right'); FX.good(); await wait(600);
        const mons = [...document.querySelectorAll('.counting .mon')];
        for (let j = 0; j < mons.length; j++) {                // liczymy razem na głos, Pokémony podskakują
          mons[j].classList.add('counted'); FX.pop();
          await SP.say(NUMS[j], { rate: 1.1 });
        }
        await SP.say(cap(w) + ' ' + nm + '! ' + pick(PRAISE));
      },
      async () => { await wait(600); await SP.say('Count again! How many ' + nm + '?', { rate: 0.9 }); },
      els.find(e => +e.dataset.n === num));
  },

  /* „Tap number five!" — rozpoznawanie liczby ze słuchu */
  async tapnum(w, i, n, tok) {
    shell(i, n);
    PLHELP = 'Posłuchaj liczby po angielsku i dotknij właściwej cyfry.';
    const num = NUMS.indexOf(w) + 1;
    const known = knownWords(WORD_ISLE[w]).map(x => NUMS.indexOf(x) + 1);
    const opts = shuffle([num].concat(shuffle(known.filter(x => x !== num)).slice(0, Math.min(3, known.length - 1))));
    $('#arena').innerHTML = monEl(pick(D.stars), 'solo');
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-n="${o}">${o}</button>`).join('');
    prompt(`Tap number <em>${w}</em>!`, ['Tap number ' + w + '!', cap(w) + '!'], tok);
    const els = [...document.querySelectorAll('.opt')];
    return choose(els, el => +el.dataset.n === num,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await throwBall($('#arena .mon')); await SP.say(cap(w) + '! ' + pick(PRAISE)); },
      async el => { SP.stop(); await SP.say('That is ' + NUMS[el.dataset.n - 1] + '. Tap ' + w + '!', { rate: 0.85 }); },
      els.find(e => +e.dataset.n === num));
  },

  /* „Pikachu, jump!" — TPR: dziecko wydaje polecenie, Pokémon je wykonuje.
     Zły wybór też jest lekcją: Pokémon robi to, co kliknięto, a głos to nazywa. */
  async do(w, i, n, tok) {
    shell(i, n);
    PLHELP = 'Posłuchaj polecenia i dotknij ruchu, który ma zrobić Pokémon.';
    const k = pick(D.stars), nm = P(k).name;
    $('#arena').innerHTML = monEl(k, 'solo');
    const opts = shuffle([w].concat(others(w, 2)));
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-w="${o}" aria-label="${o}">${ACT[o][0]}</button>`).join('');
    prompt(`${nm}, <em>${w}</em>!`, [nm + ', ' + w + '!', cap(w) + '!'], tok);
    const mon = $('#arena .mon'), els = [...document.querySelectorAll('.opt')];
    return choose(els, el => el.dataset.w === w,
      async el => {
        SP.stop(); el.classList.add('right'); FX.good();
        actOn(mon, w); SP.say(cap(w) + '!'); await wait(1900);
        await SP.say('Yes! ' + nm + ' is ' + ACT[w][1] + '!');
      },
      async el => {
        SP.stop(); const d = el.dataset.w; actOn(mon, d); SP.say(cap(d) + '!'); await wait(1900);
        await SP.say('That was ' + d + '. Now… ' + w + '!', { rate: 0.85 });
      },
      els.find(e => e.dataset.w === w));
  },

  /* „Who is sleeping?" — trzy Pokémony robią różne rzeczy, który robi to, o co pyta głos */
  async who(w, i, n, tok) {
    shell(i, n);
    PLHELP = 'Posłuchaj i dotknij Pokémona, który robi to, o co pyta głos.';
    const acts = shuffle([w].concat(others(w, 2)));
    const ks = shuffle(D.stars).slice(0, acts.length);
    $('#arena').innerHTML = ks.map(k => monEl(k)).join('');
    const els = [...document.querySelectorAll('#arena .mon')];
    els.forEach((el, j) => { el.classList.add('loop', 'act-' + acts[j]); if (acts[j] === 'swim') wet(el, 0); });
    // symbole czynności (💤, 🍎, bąbelki) wracają w pętli — pokazują znaczenie, nie podpowiadają słowa
    const fxTimer = setInterval(() => {
      if (!alive(tok) || !document.body.contains(els[0])) return clearInterval(fxTimer);
      els.forEach((el, j) => { if (!el.classList.contains('gone') && ['sleep', 'eat', 'swim'].includes(acts[j])) fxOn(el, acts[j]); });
    }, 1900);
    setTimeout(() => els.forEach((el, j) => { if (['sleep', 'eat', 'swim'].includes(acts[j])) fxOn(el, acts[j]); }), 300);
    const target = els[acts.indexOf(w)];
    prompt(`Who is <em>${ACT[w][1]}</em>?`, ['Who is ' + ACT[w][1] + '?'], tok);
    return choose(els, el => el === target,
      async el => { SP.stop(); FX.good(); const nm = P(el.dataset.k).name; await throwBall(el); await SP.say('Yes! ' + nm + ' is ' + ACT[w][1] + '!'); },
      async el => { SP.stop(); const j = els.indexOf(el); await SP.say('No, ' + P(el.dataset.k).name + ' is ' + ACT[acts[j]][1] + '. Who is ' + ACT[w][1] + '?', { rate: 0.85 }); },
      target);
  },
  /* ---------- ŚWIAT 2 ---------- */
  /* „Where is it snowy?" — trzy sceny z pogodą, dziecko wybiera właściwą */
  async scene(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj, jaka ma być pogoda, i dotknij właściwego obrazka.';
    const opts = shuffle([w].concat(others(w, 2)));
    $('#arena').innerHTML = `<div class="scenes">${opts.map(o => `<button class="scenebtn" data-w="${o}" aria-label="${o}">${sceneHTML(o, monFrom(o), 'small')}</button>`).join('')}</div>`;
    const els = [...document.querySelectorAll('.scenebtn')], target = els.find(e => e.dataset.w === w);
    prompt(`Where is it <em>${w}</em>?`, ['Where is it ' + w + '?', cap(w) + '!'], tok);
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await throwBall($('.mon', el)); await SP.say('Yes! It is ' + w + '!'); },
      async el => { SP.stop(); await SP.say('That is ' + el.dataset.w + '. Where is it ' + w + '?', { rate: 0.85 }); },
      target);
  },
  /* „What's the weather like?" — jedna duża scena, dziecko nazywa pogodę */
  async wxwhat(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Jaka jest pogoda na obrazku? Dotknij znaczka — usłyszysz jego nazwę po angielsku.';
    $('#arena').innerHTML = sceneHTML(w, monFrom(w), 'big');
    const opts = shuffle([w].concat(others(w, 2)));
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-w="${o}" aria-label="${o}">${WX[o]}</button>`).join('');
    const q = 'What\'s the weather like?';
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.w) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.w === w,
      async el => { el.classList.add('right'); FX.good(); await wait(700); await throwBall($('#arena .mon')); await SP.say('Yes! It is ' + w + '!'); },
      async () => { await wait(700); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.w === w));
  },
  /* „Who is sad?" — trzy Pokémony pokazują różne uczucia */
  async feelwho(w, i, n, tok) {
    shell(i, n);
    PLHELP = 'Posłuchaj i dotknij Pokémona, który czuje to, o co pyta głos.';
    const fs = shuffle([w].concat(others(w, 2)));
    const ks = shuffle(D.stars.filter(k => P(k).h <= 1.6)).slice(0, fs.length);
    $('#arena').innerHTML = ks.map(k => monEl(k)).join('');
    const els = [...document.querySelectorAll('#arena .mon')];
    els.forEach((el, j) => { el.classList.add('loop', 'feel-' + fs[j]); el.insertAdjacentHTML('afterbegin', `<span class="facebub">${FEEL[fs[j]]}</span>`); });
    loopFx(els, fs, tok);
    const target = els[fs.indexOf(w)];
    prompt(`Who is <em>${w}</em>?`, ['Who is ' + w + '?'], tok);
    return choose(els, el => el === target,
      async el => { SP.stop(); FX.good(); const nm = P(el.dataset.k).name; await throwBall(el); await SP.say('Yes! ' + nm + ' is ' + w + '!'); },
      async el => { SP.stop(); const j = els.indexOf(el); await SP.say('No, ' + P(el.dataset.k).name + ' is ' + fs[j] + '. Who is ' + w + '?', { rate: 0.85 }); },
      target);
  },
  /* „How does Pikachu feel?" — od obrazka do słowa */
  async feelwhat(w, i, n, tok) {
    shell(i, n);
    PLHELP = 'Jak czuje się ten Pokémon? Dotknij buźki — usłyszysz nazwę uczucia po angielsku.';
    const k = pick(D.stars.filter(x => P(x).h <= 1.6)), nm = P(k).name;
    $('#arena').innerHTML = monEl(k, 'solo');
    const mon = $('#arena .mon'); mon.classList.add('loop', 'feel-' + w); loopFx([mon], [w], tok);
    const opts = shuffle([w].concat(others(w, 2)));
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-w="${o}" aria-label="${o}">${FEEL[o]}</button>`).join('');
    prompt(`How does <em>${nm}</em> feel?`, ['How does ' + nm + ' feel?'], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.w) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.w === w,
      async el => { el.classList.add('right'); FX.good(); await wait(700); await throwBall(mon); await SP.say('Yes! ' + nm + ' is ' + w + '!'); },
      async () => { await wait(700); await SP.say('Look again! How does ' + nm + ' feel?', { rate: 0.9 }); },
      els.find(e => e.dataset.w === w));
  },
  /* „I want a banana!" — głodny Pokémon prosi o jedzenie, dziecko go karmi */
  async feed(w, i, n, tok) {
    shell(i, n);
    const toy = !!TOY[w], sch = !!SCHOOL[w];
    PLHELP = sch ? 'Pokémon mówi, czego potrzebuje w szkole. Dotknij tej rzeczy, żeby mu ją dać.' : toy ? 'Pokémon mówi, czym chce się bawić. Dotknij tej zabawki, żeby mu ją dać.'
      : 'Pokémon jest głodny i mówi, co chce zjeść. Dotknij tego jedzenia, żeby go nakarmić.';
    const k = pick(D.eaters), nm = P(k).name;
    $('#arena').innerHTML = monEl(k, 'solo') + `<span class="thought">${sch ? '🎒' : toy ? '💭' : '🍽️'}</span>`;
    const mon = $('#arena .mon');
    const opts = shuffle([w].concat(others(w, 2)));
    $('#opts').innerHTML = opts.map(o => `<button class="opt food" data-w="${o}" aria-label="${o}">${ITEM(o)}</button>`).join('');
    if (sch) prompt(`${nm}: “I need <em>${PH(w)}</em>!”`, [nm + ' is at school!', 'I need ' + PH(w) + '!', cap(w) + '!'], tok);
    else prompt(`${nm}: “I want <em>${art(w)}</em>!”`, [nm + (toy ? ' wants to play!' : ' is hungry!'), 'I want ' + art(w) + '!', cap(w) + '!'], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.w) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.w === w,
      async el => {
        el.classList.add('right'); FX.good();
        await flyFood(el, mon, ITEM(w)); actOn(mon, toy || sch ? 'dance' : 'eat', true); fxOn(mon, 'happy');
        await SP.say(sch ? 'Thank you! ' + cap(PH(w)) + '!' : (toy ? 'Yay! ' : 'Yummy! ') + cap(art(w)) + '! Thank you!', { pitch: 1.3 });
        await wait(400);
      },
      async el => {
        const d = el.dataset.w; await flyFood(el, mon, ITEM(d), true);
        mon.classList.remove('wrong'); void mon.offsetWidth; mon.classList.add('wrong');
        await SP.say(sch ? 'No, that is ' + PH(d) + '. I need ' + PH(w) + '!' : 'No, that is ' + art(d) + '. I want ' + art(w) + '!', { rate: 0.85, pitch: 1.3 });
      },
      els.find(e => e.dataset.w === w));
  },
  /* „Tap the cookie!" — piknik, dziecko szuka jedzenia ze słuchu */
  async tapfood(w, i, n, tok) {
    shell(i, n); bare();
    const toy = !!TOY[w], sch = !!SCHOOL[w];
    PLHELP = sch ? 'Posłuchaj nazwy rzeczy do szkoły po angielsku i dotknij jej w piórniku.' : toy ? 'Posłuchaj nazwy zabawki po angielsku i dotknij jej w skrzyni.' : 'Posłuchaj nazwy jedzenia po angielsku i dotknij go na kocu.';
    const fs = shuffle([w].concat(others(w, 3)));
    const k = pick(D.eaters);
    $('#arena').innerHTML = `<div class="picnic ${toy ? 'toybox' : sch ? 'pencilcase' : ''}">${fs.map(f => `<button class="foodbtn" data-w="${f}" aria-label="${f}">${ITEM(f)}</button>`).join('')}</div>
      <div class="mon picnicmon"><img src="${IMG(P(k).id)}" alt=""></div>`;
    const els = [...document.querySelectorAll('.foodbtn')], target = els.find(e => e.dataset.w === w);
    prompt(`Tap the <em>${w}</em>!`, ['Tap the ' + w + '!', cap(w) + '!'], tok);
    return choose(els, el => el === target,
      async el => {
        SP.stop(); el.classList.add('right'); FX.good(); sparks(center(el).x, center(el).y, 10);
        const m = $('.picnicmon'); await flyFood(el, m, ITEM(w)); actOn(m, toy || sch ? 'dance' : 'eat', true);
        await SP.say(cap(PH(w)) + '! ' + pick(PRAISE));
      },
      async el => { SP.stop(); await SP.say('That is ' + PH(el.dataset.w) + '. Tap the ' + w + '!', { rate: 0.85 }); },
      target);
  },
  /* „Put Pikachu under the table!" — TPR: dziecko przestawia Pokémona */
  async place(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj, gdzie ma stanąć Pokémon, i dotknij tego miejsca.';
    const k = monFrom(w), nm = P(k).name;
    $('#arena').innerHTML = whereHTML(k, 'start', 'big', true);
    const wm = $('.wmon'), els = [...document.querySelectorAll('.spot')];
    const moveTo = async p => { wm.dataset.at = p; wm.classList.remove('hop'); void wm.offsetWidth; wm.classList.add('hop'); FX.whoosh(); await wait(700); };
    prompt(`Put ${nm} <em>${w}</em> the ${obj(w)}!`, ['Put ' + nm + ' ' + w + ' the ' + obj(w) + '!', cap(w) + '!'], tok);
    return choose(els, el => el.dataset.w === w,
      async el => {
        SP.stop(); els.forEach(e => e.classList.add('used')); await moveTo(w); FX.good(); sparks(center(wm).x, center(wm).y, 12);
        await SP.say('Yes! ' + nm + ' is ' + w + ' the ' + obj(w) + '!');
      },
      async el => {
        SP.stop(); const d = el.dataset.w; await moveTo(d);
        await SP.say(nm + ' is ' + d + ' the ' + obj(d) + '. Now put ' + nm + ' ' + w + ' the ' + obj(w) + '!', { rate: 0.85 });
        await moveTo('start');
      },
      els.find(e => e.dataset.w === w));
  },
  /* „Pikachu is in the box. Find it!" — trzy sceny, Pokémon w różnych miejscach */
  async wherefind(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj zdania i dotknij obrazka, na którym Pokémon jest we właściwym miejscu.';
    const k = monFrom(w), nm = P(k).name;
    const opts = shuffle([w].concat(others(w, 2)));
    $('#arena').innerHTML = `<div class="scenes">${opts.map(o => `<button class="scenebtn" data-w="${o}" aria-label="${o}">${whereHTML(k, o, 'small')}</button>`).join('')}</div>`;
    const els = [...document.querySelectorAll('.scenebtn')], target = els.find(e => e.dataset.w === w);
    prompt(`${nm} is <em>${w}</em> the ${obj(w)}. Find it!`, [nm + ' is ' + w + ' the ' + obj(w) + '.', 'Find it!'], tok);
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await throwBall($('.wmon', el)); await SP.say('Yes! ' + nm + ' is ' + w + ' the ' + obj(w) + '!'); },
      async el => { SP.stop(); const d = el.dataset.w; await SP.say('Here ' + nm + ' is ' + d + ' the ' + obj(d) + '. Find: ' + w + ' the ' + obj(w) + '!', { rate: 0.85 }); },
      target);
  }
};
/* ======================================================================
   ŚWIATY 3–8 — obrazki, motywy wysp i nowe rodzaje zadań.
   Każdy świat dokłada jedną nową umiejętność językową:
   3 opis (wearing, przeciwieństwa) · 4 pytania tak/nie · 5 miejsca i polecenia ·
   6 kolejność i czas · 7 całe zdania · 8 rozmowa i historyjki.
   ====================================================================== */
const imgOf = k => `<img src="${IMG(P(k).id)}" alt="${P(k).name}">`;
const hl = (q, w) => {
  const t = disp(w), i = q.toLowerCase().indexOf(t.toLowerCase());
  return i < 0 ? q : q.slice(0, i) + '<em>' + q.slice(i, i + t.length) + '</em>' + q.slice(i + t.length);
};
function ecardHTML(emo, k, sz) {
  return `<div class="ecard ${sz || ''}"><span class="emo">${emo}</span>${k ? `<div class="mon">${imgOf(k)}</div>` : ''}</div>`;
}
function wearHTML(k, w, sz) {
  return `<div class="ecard wearcard ${sz || ''}"><div class="mon wear">${imgOf(k)}${w ? `<span class="item at-${WEAR[w][1]}">${WEAR[w][0]}</span>` : ''}</div></div>`;
}
function oppHTML(w, k, sz) {
  const deco = {
    hot: '<i class="o-sun">☀️</i><i class="o-fx">💦</i>',
    cold: '<i class="o-snow">❄️</i><i class="o-snow s2">❄️</i><i class="o-snow s3">❄️</i><i class="o-fx">🧊</i>',
    fast: '<i class="o-lines"></i><i class="o-fx">💨</i>', slow: '<i class="o-fx">🐌</i>',
    up: '<i class="o-tree"></i><i class="o-fx">🎈</i>', down: '<i class="o-tree"></i>' }[w];
  return `<div class="scene opp opp-${w} ${sz || ''}">${deco}<i class="ground"></i><div class="mon">${imgOf(k)}</div></div>`;
}
function jobHTML(k, w, sz) { return `<div class="ecard ${sz || ''}"><div class="mon">${imgOf(k)}</div><span class="prop">${JOB[w]}</span></div>`; }
function seasonHTML(w, k, sz) {
  const deco = {
    spring: '<i class="s-fl">🌸</i><i class="s-fl f2">🌷</i><i class="s-fl f3">🌼</i><i class="s-sky">🐝</i>',
    summer: '<i class="s-sun">☀️</i><i class="s-fl f2">🌻</i><i class="s-fl f3">🌻</i><i class="s-sky">🦋</i>',
    autumn: '<i class="s-leaf">🍂</i><i class="s-leaf l2">🍁</i><i class="s-leaf l3">🍂</i><i class="s-fl f3">🍄</i>',
    winter: '<i class="s-snow">❄️</i><i class="s-snow n2">❄️</i><i class="s-snow n3">❄️</i><i class="s-fl f2">⛄</i>' }[w];
  return `<div class="scene season ss-${w} ${sz || ''}">${deco}<i class="ground"></i><div class="mon">${imgOf(k)}</div></div>`;
}
function routineHTML(w, k, sz) {
  return `<div class="scene rt rt-${RT[w][2]} ${sz || ''}"><i class="rt-sky"></i><i class="ground"></i><span class="rt-ic">${RT[w][0]}</span><div class="mon">${imgOf(k)}</div></div>`;
}
function houseHTML(k, at, sz, spots) {
  return `<div class="house ${sz || ''}"><i class="roof"></i>
    ${ROOMS.map(r => `<${spots ? 'button' : 'div'} class="room rm-${r.replace(' ', '-')}" data-w="${r}" aria-label="${r}"><span class="furn">${ROOM[r]}</span></${spots ? 'button' : 'div'}>`).join('')}
    ${k ? `<div class="hmon" data-at="${at}">${imgOf(k)}</div>` : ''}</div>`;
}
function framesHTML(n) {
  return `<div class="frames">${[0, 1].map(f => `<div class="frame">${Array.from({ length: 10 }, (_, j) => `<i class="${f * 10 + j < n ? 'on' : ''}"></i>`).join('')}</div>`).join('')}</div>`;
}
function daysHTML(hi, blank, btn) {
  const tag = btn ? 'button' : 'div';
  return `<div class="days">${DAYS.map((d, j) => `<${tag} class="day ${d === hi ? 'on' : ''}" data-w="${d}" style="--c:${DAYCOL[j]}" aria-label="${disp(d)}">${blank === d ? '?' : disp(d).slice(0, 2)}</${tag}>`).join('')}</div>`;
}
function feelPic(k, f) { return `<div class="mon loop feel-${f}" id="actmon"><span class="facebub">${FEEL[f]}</span>${imgOf(k)}</div>`; }
function monPlus(k, emo, cls) { return `<div class="monplus"><div class="mon ${cls || ''}" id="actmon">${imgOf(k)}</div><span class="plus">${emo}</span></div>`; }
/* postać trenera do nauki części ciała (SVG, każda część klikalna) */
function bodyHTML(sz, glow) {
  const g = p => `class="part${glow === p ? ' glow' : ''}" data-w="${p}"`;
  const hit = (p, shape) => `<${shape} class="hit" data-w="${p}" fill="transparent"/>`.replace('<' + shape, '<' + shape);
  return `<svg class="kid ${sz || ''}" viewBox="0 0 200 300" role="img" aria-label="body">
    <rect x="72" y="200" width="22" height="70" rx="10" fill="#4d6fd1"/><rect x="106" y="200" width="22" height="70" rx="10" fill="#4d6fd1"/>
    <rect x="36" y="128" width="22" height="70" rx="11" fill="#ff6fae" transform="rotate(14 47 128)"/>
    <rect x="142" y="128" width="22" height="70" rx="11" fill="#ff6fae" transform="rotate(-14 153 128)"/>
    <rect x="60" y="118" width="80" height="94" rx="26" fill="#ff6fae"/><circle cx="100" cy="150" r="10" fill="#fff" opacity=".8"/>
    <ellipse ${g('feet')} cx="81" cy="279" rx="21" ry="12" fill="#e8483f"/><ellipse ${g('feet')} cx="119" cy="279" rx="21" ry="12" fill="#e8483f"/>
    <circle ${g('hands')} cx="32" cy="196" r="14" fill="#ffd2b0"/><circle ${g('hands')} cx="168" cy="196" r="14" fill="#ffd2b0"/>
    <circle ${g('ears')} cx="55" cy="76" r="12" fill="#ffc29b"/><circle ${g('ears')} cx="145" cy="76" r="12" fill="#ffc29b"/>
    <circle ${g('head')} cx="100" cy="74" r="46" fill="#ffd9b8"/>
    <path d="M53 62 Q56 20 100 20 Q144 20 147 62 Z" fill="#e8483f" pointer-events="none"/>
    <path d="M60 62 L170 62 Q168 70 150 70 L60 70 Z" fill="#c93a33" pointer-events="none"/>
    <circle cx="100" cy="42" r="8" fill="#fff" pointer-events="none"/>
    <g ${g('eyes')}><circle cx="82" cy="84" r="7" fill="#2b2b33"/><circle cx="118" cy="84" r="7" fill="#2b2b33"/>
      <circle cx="84" cy="82" r="2.2" fill="#fff"/><circle cx="120" cy="82" r="2.2" fill="#fff"/>
      <circle cx="82" cy="84" r="14" fill="transparent"/><circle cx="118" cy="84" r="14" fill="transparent"/></g>
    <g ${g('nose')}><ellipse cx="100" cy="98" rx="6" ry="5" fill="#f2a98a"/><circle cx="100" cy="98" r="9" fill="transparent"/></g>
    <g ${g('mouth')}><path d="M86 108 Q100 122 114 108 Q100 114 86 108 Z" fill="#c93a33"/><ellipse cx="100" cy="112" rx="17" ry="8" fill="transparent"/></g>
  </svg>`;
}
const bodySay = w => (PL_BODY.has(w) ? 'These are the ' : 'This is the ') + w;
const bodyThat = w => (PL_BODY.has(w) ? 'Those are the ' : 'That is the ') + w;
const hasThing = w => w === 'tail' ? 'a tail' : 'wings';

/* ---------- historyjki i rozmowy ---------- */
const STORIES = {
  story1: { t: "Pikachu's picnic", k: 'pikachu',
    f: [['🧺', 'This is Pikachu. Pikachu is hungry.'], ['🍎', 'Pikachu eats an apple.'], ['🍰', 'Then Pikachu eats a cake.'], ['😊', 'Now Pikachu is happy!']],
    q: [['What does Pikachu eat first?', '🍎', ['🍕', '🥕'], 'Pikachu eats an apple first.'], ['How is Pikachu at the end?', '😊', ['😢', '😠'], 'Pikachu is happy at the end.']] },
  story2: { t: 'Snorlax and the rain', k: 'snorlax',
    f: [['🌧️', 'It is rainy. Snorlax is sad.'], ['☀️', 'Then it is sunny!'], ['😊', 'Snorlax is happy.'], ['😴', 'Snorlax sleeps under a tree.']],
    q: [['What is the weather at the start?', '🌧️', ['☀️', '❄️'], 'It is rainy at the start.'], ['What does Snorlax do at the end?', '😴', ['🏃', '💃'], 'Snorlax sleeps at the end.']] },
  story3: { t: "Eevee's ball", k: 'eevee',
    f: [['🔴', 'Eevee has got a red ball.'], ['❓', 'Oh no! Where is the ball?'], ['⬇️', 'The ball is under the table.'], ['⚽', 'Eevee finds the ball and plays!']],
    q: [['What colour is the ball?', 'red', ['blue', 'green'], 'The ball is red.'], ['Where is the ball?', '⬇️', ['⬆️', '📦'], 'The ball is under the table.']] },
  story4: { t: 'Squirtle in the sea', k: 'squirtle',
    f: [['🌊', 'Squirtle can swim.'], ['🐋', 'Squirtle swims with a big whale.'], ['🦀', 'Then Squirtle sees a crab.'], ['🤏', 'The crab is small.']],
    q: [['Who swims with Squirtle?', '🐋', ['🦈', '🐙'], 'A big whale swims with Squirtle.'], ['Is the crab big or small?', '🐭', ['🐘'], 'The crab is small.']] },
  story5: { t: "Charmander's day", k: 'charmander',
    f: [['⏰', 'Charmander wakes up.'], ['🥣', 'Charmander eats breakfast.'], ['🏫', 'Charmander goes to school.'], ['🌙', 'At night Charmander goes to bed.']],
    q: [['What does Charmander do first?', '⏰', ['🏫', '🌙'], 'First Charmander wakes up.'], ['Where does Charmander go?', '🏫', ['🌷', '🛁'], 'Charmander goes to school.']] },
  story6: { t: "Jigglypuff's birthday", k: 'jigglypuff',
    f: [['📅', 'It is Monday.'], ['🎂', "It is Jigglypuff's birthday! Jigglypuff is seven."], ['🎈', 'Jigglypuff gets a balloon.'], ['💃', 'Jigglypuff sings and dances!']],
    q: [['How old is Jigglypuff?', '7', ['5', '9'], 'Jigglypuff is seven.'], ['What does Jigglypuff get?', '🎈', ['🚗', '🥁'], 'Jigglypuff gets a balloon.']] }
};
Object.keys(STORIES).forEach(k => { DISP[k] = STORIES[k].t; });
DAYS.forEach(d => { DISP[d] = cap(d); });
function storyHTML(st, on) {
  return `<div class="story"><div class="stitle">📖 ${st.t}</div><div class="panels">${st.f.map((f, j) =>
    `<div class="panel ${on === j ? 'on' : ''} ${on !== undefined && j > on ? 'later' : ''}"><span class="pemo">${f[0]}</span><div class="mon">${imgOf(st.k)}</div></div>`).join('')}</div></div>`;
}
async function tellStory(st, tok, slow) {
  for (let j = 0; j < st.f.length; j++) {
    if (!alive(tok)) return;
    document.querySelectorAll('.panel').forEach((p, x) => { p.classList.toggle('on', x === j); p.classList.toggle('later', x > j); });
    FX.pop(); await SP.say(st.f[j][1], slow ? { rate: 0.9 } : null); await wait(250);
  }
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('on', 'later'));
}
/* rozmowa: Pokémon A pyta, dziecko wybiera odpowiedź Pokémona B */
function chatItem(w, kB) {
  const B = P(kB).name, age = 3 + rnd(7), f = pick(['happy', 'sad', 'tired', 'hungry']);
  const other = shuffle(D.stars.filter(k => k !== kB)).slice(0, 2);
  return ({
    hello: { q: 'Hello!', a: ['🙋', 'Hello!'], x: [['👋', 'Goodbye!'], ['🙏', 'Thank you!']], end: "Let's play!" },
    goodbye: { q: 'Goodbye! See you!', a: ['👋', 'Goodbye!'], x: [['🙋', 'Hello!'], ['😋', 'Yummy!']], end: '' },
    name: { q: "What's your name?", a: [imgOf(kB), 'My name is ' + B + '.'], x: other.map(k => [imgOf(k), 'My name is ' + P(k).name + '.']), end: 'Nice to meet you, ' + B + '!' },
    age: { q: 'How old are you?', a: ['🎂' + age, 'I am ' + NUMS[age - 1] + '.'], x: shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10].filter(n => n !== age)).slice(0, 2).map(n => ['🎂' + n, 'I am ' + NUMS[n - 1] + '.']), cake: age, end: 'Wow!' },
    'how are you': { q: 'How are you?', a: [FEEL[f], 'I am ' + f + '.'], x: shuffle(['happy', 'sad', 'tired', 'hungry', 'scared', 'angry'].filter(x => x !== f)).slice(0, 2).map(x => [FEEL[x], 'I am ' + x + '.']), feel: f, end: f === 'happy' ? 'Great!' : 'Oh! Come here!' },
    'thank you': { q: 'Here you are!', a: ['🙏', 'Thank you!'], x: [['🙋', 'Hello!'], ['👋', 'Goodbye!']], gift: TOY[pick(Object.keys(TOY))], end: "You're welcome!" }
  })[w];
}
function chatHTML(kA, kB, it, showA) {
  return `<div class="chat">
    <div class="cmon a"><span class="bub q">${it.q}</span>${imgOf(kA)}</div>
    <div class="cmon b ${it.feel ? 'loop feel-' + it.feel : ''}">${it.feel ? `<span class="facebub">${FEEL[it.feel]}</span>` : ''}${it.cake ? `<span class="cake">🎂<b>${it.cake}</b></span>` : ''}
      ${it.gift ? `<span class="gift">${it.gift}</span>` : ''}<span class="bub ans" ${showA ? '' : 'style="visibility:hidden"'}>${it.a[1]}</span>${imgOf(kB)}</div></div>`;
}
/* zdania do układania z klocków */
function buildFor(w) {
  if (w === 'is') {
    const k = pick(D.stars.filter(x => P(x).h <= 1.6)), f = pick(Object.keys(FEEL));
    return { toks: [[P(k).name, imgOf(k)], ['is', ''], [f, FEEL[f]]], vis: feelPic(k, f) };
  }
  if (w === 'has got') {
    const k = pick(D.eaters), t = pick(Object.keys(TOY));
    return { toks: [[P(k).name, imgOf(k)], ['has got', ''], [art(t), TOY[t]]], vis: monPlus(k, TOY[t]) };
  }
  const fly = Math.random() < 0.5, v = fly ? 'fly' : 'swim';
  if (w === 'can') {
    const k = pick(fly ? D.flyers : D.swimmers);
    return { toks: [[P(k).name, imgOf(k)], ['can', '✅'], [v, ACT[v][0]]], vis: monPlus(k, ACT[v][0] + '✅'), act: v };
  }
  const k = pick(fly ? D.sets.nowings : D.sets.cantswim);
  return { toks: [[P(k).name, imgOf(k)], ["can't", '🚫'], [v, ACT[v][0]]], vis: monPlus(k, ACT[v][0] + '🚫') };
}
const sentOf = b => b.toks.map(t => t[0]).join(' ') + '.';

/* ---------- motywy wysp: obrazek, zdanie z nauki i zdania zadań ---------- */
function cardTheme(EM, o) {
  return Object.assign({
    pic: (w, k, sz) => ecardHTML(EM[w], k, sz), ic: w => EM[w],
    findQ: w => 'Find the ' + w + '!', whatQ: () => 'What is it?',
    ok: w => 'Yes! It is ' + o.a(w) + '!', no: (d, w) => 'No, that is ' + o.a(d) + '. Find the ' + w + '!',
    yn: w => 'Is it ' + o.a(w) + '?', yes: w => 'Yes, it is! It is ' + o.a(w) + '!', nope: (w, s) => 'No, it isn\'t! It is ' + o.a(s) + '.',
    pl: ['Posłuchaj słowa i dotknij właściwego obrazka.', 'Co to jest? Dotknij znaczka — usłyszysz nazwę po angielsku.']
  }, o);
}
const TH = {
  clothes: {
    pic: (w, k, sz) => wearHTML(k, w, sz), ic: w => WEAR[w][0],
    sent: (w, nm) => `${nm} is wearing ${PH(w)}.`,
    findQ: w => `Who is wearing ${PH(w)}?`,
    ok: (w, nm) => `Yes! ${nm} is wearing ${PH(w)}!`, no: (d, w, nm) => `No, ${nm} is wearing ${PH(d)}. Who is wearing ${PH(w)}?`,
    yn: (w, nm) => `Is ${nm} wearing ${PH(w)}?`, yes: (w, nm) => `Yes, it is! ${nm} is wearing ${PH(w)}!`,
    nope: (w, s, nm) => `No, it isn't! ${nm} is wearing ${PH(s)}.`,
    pl: ['Posłuchaj i dotknij Pokémona, który ma na sobie to, o co pyta głos.']
  },
  opposites: {
    pic: (w, k, sz) => oppHTML(w, k, sz), ic: w => OPP[w],
    sent: (w, nm) => `${nm} is ${w}.`,
    findQ: w => `Who is ${w}?`, whatQ: nm => `Look at ${nm}! Is it…`,
    ok: (w, nm) => `Yes! ${nm} is ${w}!`, no: (d, w, nm) => `No, ${nm} is ${d}. Who is ${w}?`,
    yn: (w, nm) => `Is ${nm} ${w}?`, yes: (w, nm) => `Yes, it is! ${nm} is ${w}!`, nope: (w, s, nm) => `No, it isn't! ${nm} is ${s}.`,
    pl: ['Posłuchaj i dotknij obrazka, który pasuje do słowa.', 'Co widać na obrazku? Dotknij znaczka — usłyszysz słowo po angielsku.']
  },
  body: {
    learn: (w, ex) => BODY[w]
      ? { vis: bodyHTML('big', w), s: (PL_BODY.has(w) ? 'These are my ' : 'This is my ') + w + '.' }
      : { vis: `<div class="mon" id="actmon">${imgOf(ex[0])}</div>`, s: `${P(ex[0]).name} has got ${hasThing(w)}.` },
    ynMon: (w, truth) => pick(truth ? monsFor(w) : (w === 'tail' ? D.sets.notails : D.sets.nowings)),
    ynPic: (w, s, k) => `<div class="mon solo">${imgOf(k)}</div>`,
    yn: (w, nm) => `Has ${nm} got ${hasThing(w)}?`, yes: (w, nm) => `Yes, it has! ${nm} has got ${hasThing(w)}!`,
    nope: (w, s, nm) => `No, it hasn't! ${nm} hasn't got ${hasThing(w)}.`
  },
  sea: cardTheme(SEA, {
    a: art, sent: (w, nm) => `${nm} looks like ${art(w)}.`, findQ: w => `Who looks like ${art(w)}?`,
    ok: (w, nm) => `Yes! ${nm} looks like ${art(w)}!`, no: (d, w, nm) => `No, ${nm} looks like ${art(d)}. Who looks like ${art(w)}?`,
    optPic: (w, k) => `<div class="mon solo">${imgOf(k)}</div>`, whatQ: () => 'What does it look like?',
    pl: ['Posłuchaj i dotknij Pokémona, który przypomina to morskie zwierzę.', 'Do jakiego morskiego zwierzęcia podobny jest ten Pokémon? Dotknij znaczka.']
  }),
  bignums: {
    ynPic: (w, s) => framesHTML(NUMS.indexOf(s) + 1),
    yn: w => `Are there ${w} Poké Balls?`, yes: w => `Yes, there are! ${cap(w)} Poké Balls!`,
    nope: (w, s) => `No, there aren't! There are ${s}.`
  },
  house: {
    pic: (w, k, sz) => houseHTML(k, w, sz), sent: (w, nm) => `${nm} is in the ${w}.`,
    yn: (w, nm) => `Is ${nm} in the ${w}?`, yes: (w, nm) => `Yes, it is! ${nm} is in the ${w}!`,
    nope: (w, s, nm) => `No, it isn't! ${nm} is in the ${s}.`
  },
  school: cardTheme(SCHOOL, {
    a: PH, sent: (w, nm) => `${nm} has got ${PH(w)}.`,
    yn: w => w === 'scissors' ? 'Are they scissors?' : `Is it ${art(w)}?`,
    yes: w => w === 'scissors' ? 'Yes, they are! Scissors!' : `Yes, it is! It is ${art(w)}!`
  }),
  jobs: {
    pic: (w, k, sz) => jobHTML(k, w, sz), ic: w => JOB[w],
    sent: (w, nm) => `${nm} is ${art(w)}.`, findQ: w => `Who is ${art(w)}?`,
    ok: (w, nm) => `Yes! ${nm} is ${art(w)}!`, no: (d, w, nm) => `No, ${nm} is ${art(d)}. Who is ${art(w)}?`,
    yn: (w, nm) => `Is ${nm} ${art(w)}?`, yes: (w, nm) => `Yes! ${nm} is ${art(w)}!`, nope: (w, s, nm) => `No! ${nm} is ${art(s)}.`,
    pl: ['Posłuchaj i dotknij Pokémona, który wykonuje ten zawód.']
  },
  days: { learn: w => ({ vis: daysHTML(w), s: `Today is ${disp(w)}!` }) },
  routine: {
    pic: (w, k, sz) => routineHTML(w, k, sz), ic: w => RT[w][0],
    sent: (w, nm) => `${nm} ${RT[w][1]}.`, findQ: w => `Who is ${RT[w][3]}?`,
    ok: (w, nm) => `Yes! ${nm} is ${RT[w][3]}!`, no: (d, w, nm) => `No, ${nm} is ${RT[d][3]}. Who is ${RT[w][3]}?`,
    yn: (w, nm) => `Is ${nm} ${RT[w][3]}?`, yes: (w, nm) => `Yes, it is! ${nm} is ${RT[w][3]}!`,
    nope: (w, s, nm) => `No, it isn't! ${nm} is ${RT[s][3]}.`,
    pl: ['Posłuchaj i dotknij Pokémona, który robi to, o co pyta głos.']
  },
  seasons: {
    pic: (w, k, sz) => seasonHTML(w, k, sz), ic: w => SEASON[w],
    sent: w => `It is ${w}!`, findQ: w => `Where is it ${w}?`,
    ok: w => `Yes! It is ${w}!`, no: (d, w) => `No, that is ${d}. Where is it ${w}?`,
    yn: w => `Is it ${w}?`, yes: w => `Yes, it is! It is ${w}!`, nope: (w, s) => `No, it isn't! It is ${s}.`,
    pl: ['Posłuchaj nazwy pory roku i dotknij właściwego obrazka.']
  },
  likes: {
    learn: (w, ex) => {
      const k = pick(D.eaters), f = pick(Object.keys(FOOD)), nm = P(k).name, yes = w === 'like';
      return { vis: monPlus(k, FOOD[f] + (yes ? '😋' : '🤢'), yes ? 'loop feel-happy' : 'loop feel-angry'),
        s: yes ? `${nm} likes ${FOODPL[f]}.` : `${nm} doesn't like ${FOODPL[f]}.`,
        turn: yes ? `I like ${FOODPL[f]}` : `I don't like ${FOODPL[f]}` };
    }
  },
  build: {
    learn: w => {
      const b = buildFor(w);
      return { vis: b.vis + `<div class="tiles done">${b.toks.map(t => `<span class="tile">${t[1] ? `<i>${t[1]}</i>` : ''}${t[0]}</span>`).join('')}</div>`,
        s: sentOf(b), turn: sentOf(b),
        act: b.act ? () => { const m = $('#actmon'); if (m) actOn(m, b.act); } : null };
    }
  },
  quest: {
    learn: w => {
      const k = pick(D.eaters), nm = P(k).name, f = pick(Object.keys(FOOD)), a = pick(['jump', 'sleep', 'dance']), r = pick(ROOMS), n = 3 + rnd(4);
      return ({
        who: { vis: `<div class="mon loop act-${a}" id="actmon">${imgOf(k)}</div><span class="qmark">❓</span>`, s: `Who is ${ACT[a][1]}? ${nm} is ${ACT[a][1]}!` },
        what: { vis: monPlus(k, FOOD[f], 'loop act-eat') + '<span class="qmark">❓</span>', s: `What is ${nm} eating? ${nm} is eating ${art(f)}!` },
        where: { vis: houseHTML(k, r, 'big'), s: `Where is ${nm}? ${nm} is in the ${r}!` },
        'how many': { vis: `<div class="picnic">${(FOOD[f] + ' ').repeat(n)}</div>`, s: `How many ${COUNTPL[f]}? ${cap(NUMS[n - 1])} ${COUNTPL[f]}!` }
      })[w];
    }
  },
  space: cardTheme(SPACE, {
    a: w => ({ sun: 'the sun', moon: 'the moon' })[w] || art(w),
    sent: (w, nm) => ({ rocket: nm + ' has got a rocket!', astronaut: nm + ' is an astronaut!' })[w] || 'Look at the ' + w + '!'
  }),
  hello: {
    learn: w => {
      const kA = pick(D.stars), kB = pick(D.stars.filter(x => x !== kA)), it = chatItem(w, kB);
      return { vis: chatHTML(kA, kB, it, true), s: it.q + ' — ' + it.a[1], turn: it.a[1] };
    }
  },
  story: {
    async teach(w, i, n, tok) {
      const st = STORIES[w];
      PLHELP = 'Posłuchaj historyjki. Potem będą pytania — patrz uważnie na obrazki!';
      app.innerHTML = hud(`<span class="chip">✨ ${i + 1}/${n}</span>`) + `<div class="play"><div class="learn">
        ${storyHTML(st, 0)}
        <div style="display:flex;gap:14px;align-items:center">
          <button class="say" id="again" aria-label="Posłuchaj jeszcze raz">🔊</button>
          <button class="next" id="nx" style="visibility:hidden">▶</button></div></div></div>`;
      wireHud();
      $('#again').onclick = () => { FX.tap(); SP.stop(); tellStory(st, tok, true); };
      (async () => {
        await SP.say(st.t + '!'); await wait(300);
        await tellStory(st, tok, true); if (!alive(tok)) return;
        FX.good(); const nx = $('#nx'); if (nx) { nx.style.visibility = 'visible'; sparks(center(nx).x, center(nx).y, 6); }
      })();
      await new Promise(res => { $('#nx').onclick = () => { FX.tap(); SP.stop(); res(); }; });
    }
  }
};

/* ---------- nowe rodzaje zadań ---------- */
Object.assign(GAMES, {
  /* trzy obrazki, głos pyta o jeden („Who is wearing a hat?") */
  async pickpic(w, i, n, tok) {
    shell(i, n); bare(); const T = TH[WORD_ISLE[w]];
    PLHELP = (T.pl && T.pl[0]) || 'Posłuchaj i dotknij właściwego obrazka.';
    const opts = shuffle([w].concat(others(w, 2))), used = [];
    const ks = opts.map(o => { const k = monFrom(o, used); used.push(k); return k; });
    $('#arena').innerHTML = `<div class="scenes">${opts.map((o, j) => `<button class="scenebtn" data-w="${o}" data-k="${ks[j]}" aria-label="${o}">${T.pic(o, ks[j], 'small')}</button>`).join('')}</div>`;
    const els = [...document.querySelectorAll('.scenebtn')], target = els.find(e => e.dataset.w === w);
    const q = T.findQ(w);
    prompt(hl(q, w), [q], tok);
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); const m = $('.mon', el); if (m) await throwBall(m); await SP.say(T.ok(w, P(el.dataset.k).name)); },
      async el => { SP.stop(); await SP.say(T.no(el.dataset.w, w, P(el.dataset.k).name), { rate: 0.85 }); },
      target);
  },
  /* jeden duży obrazek, dziecko wybiera słowo-znaczek */
  async pickopt(w, i, n, tok) {
    shell(i, n); bare(); const T = TH[WORD_ISLE[w]];
    PLHELP = (T.pl && T.pl[1]) || 'Co widać na obrazku? Dotknij znaczka — usłyszysz słowo po angielsku.';
    const k = monFrom(w), nm = P(k).name;
    $('#arena').innerHTML = T.optPic ? T.optPic(w, k) : T.pic(w, k, 'big');
    const opts = shuffle([w].concat(others(w, 2)));
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-w="${o}" aria-label="${o}">${T.ic(o)}</button>`).join('');
    const q = T.whatQ(nm, w);
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(disp(e.dataset.w)) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.w === w,
      async el => { el.classList.add('right'); FX.good(); await wait(700); const m = $('#arena .mon'); if (m) await throwBall(m); await SP.say(T.ok(w, nm)); },
      async () => { await wait(700); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.w === w));
  },
  /* pytanie „tak/nie": Is it a crab? Has Pikachu got a tail? */
  async yesno(w, i, n, tok) {
    shell(i, n); bare(); const T = TH[WORD_ISLE[w]];
    PLHELP = 'Posłuchaj pytania i popatrz na obrazek. Tak — dotknij 👍. Nie — dotknij 👎.';
    const alt = others(w, 1)[0];
    const truth = !alt || Math.random() < 0.5, shown = truth ? w : alt;
    const k = T.ynMon ? T.ynMon(w, truth) : monFrom(shown), nm = P(k).name;
    $('#arena').innerHTML = T.ynPic ? T.ynPic(w, shown, k) : T.pic(shown, k, 'big');
    $('#opts').innerHTML = '<button class="opt yn" data-a="yes" aria-label="yes">👍<small>Yes</small></button><button class="opt yn" data-a="no" aria-label="no">👎<small>No</small></button>';
    const q = T.yn(w, nm), right = truth ? 'yes' : 'no';
    prompt(hl(q, w), [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(e.dataset.a === 'yes' ? 'Yes!' : 'No!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.a === right,
      async el => { el.classList.add('right'); FX.good(); await wait(500); const m = $('#arena .mon'); if (m) await throwBall(m); await SP.say(truth ? T.yes(w, nm) : T.nope(w, shown, nm)); },
      async () => { await wait(600); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.a === right));
  },
  /* „Put the hat on Pikachu!" — ubieranie Pokémona */
  async dress(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj, co ma założyć Pokémon, i dotknij tej rzeczy.';
    const k = monFrom(w), nm = P(k).name;
    $('#arena').innerHTML = wearHTML(k, null, 'big');
    const mon = $('#arena .wear'), opts = shuffle([w].concat(others(w, 2)));
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-w="${o}" aria-label="${o}">${WEAR[o][0]}</button>`).join('');
    const q = `Put the ${w} on ${nm}!`;
    prompt(hl(q, w), [q, cap(w) + '!'], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.w) + '!', { rate: 0.85 }); }));
    const put = d => { mon.querySelectorAll('.item').forEach(x => x.remove()); mon.insertAdjacentHTML('beforeend', `<span class="item at-${WEAR[d][1]} pop">${WEAR[d][0]}</span>`); };
    return choose(els, el => el.dataset.w === w,
      async el => { el.classList.add('right'); await flyFood(el, mon, WEAR[w][0]); put(w); FX.good(); fxOn(mon, 'happy'); await SP.say(`Yes! ${nm} is wearing ${PH(w)}!`); await wait(400); },
      async el => { const d = el.dataset.w; await flyFood(el, mon, WEAR[d][0], true); await SP.say(`That is ${PH(d)}. Put the ${w} on ${nm}!`, { rate: 0.85 }); },
      els.find(e => e.dataset.w === w));
  },
  /* „Touch the nose!" — części ciała na postaci trenera */
  async touch(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj i dotknij tej części ciała na obrazku. Możesz też pokazać ją na sobie!';
    $('#arena').innerHTML = bodyHTML('big');
    const svg = $('#arena svg'), q = `Touch the ${w}!`;
    prompt(hl(q, w), [q, cap(w) + '!'], tok);
    $('#again').onclick = () => { FX.tap(); SP.stop(); SP.say(q); };
    return new Promise(res => {
      let miss = 0, busy = false;
      svg.addEventListener('click', async e => {
        const p = e.target.closest('[data-w]'); if (!p || busy) return;
        const d = p.dataset.w; busy = true;
        svg.querySelectorAll('.glow').forEach(x => x.classList.remove('glow'));
        svg.querySelectorAll(`[data-w="${d}"]`).forEach(x => x.classList.add('glow'));
        if (d === w) { SP.stop(); FX.good(); sparks(e.clientX, e.clientY, 12); await SP.say('Yes! ' + bodySay(w) + '!'); res(miss === 0); return; }
        miss++; FX.bad(); SP.stop(); await SP.say(bodyThat(d) + '. Touch the ' + w + '!', { rate: 0.85 }); busy = false;
        if (miss >= 2) svg.querySelectorAll(`[data-w="${w}"]`).forEach(x => x.classList.add('hint'));
      });
    });
  },
  /* część ciała świeci — dziecko ją nazywa */
  async bodywhat(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Która część ciała świeci? Dotknij znaczka — usłyszysz jej nazwę po angielsku.';
    $('#arena').innerHTML = bodyHTML('big', w);
    const pool = [...new Set(knownWords('body').concat(['head', 'eyes', 'ears', 'nose']))].filter(x => x !== w && BODY[x]);
    const opts = shuffle([w].concat(shuffle(pool).slice(0, 2)));
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-w="${o}" aria-label="${o}">${BODY[o]}</button>`).join('');
    const q = 'What is it?';
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.w) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.w === w,
      async el => { el.classList.add('right'); FX.good(); await wait(600); await SP.say('Yes! ' + bodySay(w) + '!'); },
      async () => { await wait(700); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.w === w));
  },
  /* „Who has got wings?" */
  async haswho(w, i, n, tok) {
    shell(i, n);
    PLHELP = 'Posłuchaj i dotknij Pokémona, który ma to, o co pyta głos.';
    const has = shuffle(monsFor(w)), hasnt = shuffle(w === 'tail' ? D.sets.notails : D.sets.nowings);
    const set = shuffle([[has[0], true], [hasnt[0], false], [hasnt[1], false]]);
    $('#arena').innerHTML = set.map(([k]) => monEl(k)).join('');
    const els = [...document.querySelectorAll('#arena .mon')], target = els[set.findIndex(s => s[1])];
    const q = `Who has got ${hasThing(w)}?`;
    prompt(hl(q, w), [q], tok);
    return choose(els, el => el === target,
      async el => { SP.stop(); FX.good(); const nm = P(el.dataset.k).name; await throwBall(el); await SP.say(`Yes! ${nm} has got ${hasThing(w)}!`); },
      async el => { SP.stop(); await SP.say(`No, ${P(el.dataset.k).name} hasn't got ${hasThing(w)}. Who has got ${hasThing(w)}?`, { rate: 0.85 }); },
      target);
  },
  /* liczenie 11–20: pełna ramka to dziesięć, dalej liczymy od dziesięciu */
  async count20(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Policz Poké Balle i dotknij właściwej liczby. Pełna ramka to dziesięć — licz dalej od dziesięciu.';
    const num = NUMS.indexOf(w) + 1;
    $('#arena').innerHTML = framesHTML(num);
    const known = knownWords('bignums').map(x => NUMS.indexOf(x) + 1);
    let pool = known.filter(x => x !== num); if (pool.length < 2) pool = pool.concat([10, num + 1, num - 1].filter(x => x !== num && x >= 10 && x <= 20));
    const opts = shuffle([num].concat(shuffle([...new Set(pool)]).slice(0, 2)));
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-n="${o}">${o}</button>`).join('');
    prompt('How many <em>Poké Balls</em>?', ['How many Poké Balls?'], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(NUMS[e.dataset.n - 1]) + '!', { rate: 0.85 }); }));
    return choose(els, el => +el.dataset.n === num,
      async el => {
        el.classList.add('right'); FX.good(); await wait(500);
        const fr = document.querySelectorAll('.frame'); fr[0].classList.add('counted'); FX.pop(); await SP.say('Ten!', { rate: 1.1 });
        const extra = [...fr[1].querySelectorAll('i.on')];
        for (let j = 0; j < extra.length; j++) { extra[j].classList.add('counted'); FX.pop(); await SP.say(NUMS[10 + j], { rate: 1.1 }); }
        await SP.say(cap(w) + ' Poké Balls! ' + pick(PRAISE));
      },
      async () => { await wait(600); await SP.say('Count again! A full frame is ten.', { rate: 0.9 }); },
      els.find(e => +e.dataset.n === num));
  },
  /* „Put Pikachu in the kitchen!" */
  async roomput(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj, do którego pokoju ma pójść Pokémon, i dotknij tego pokoju.';
    const k = pick(D.eaters), nm = P(k).name;
    $('#arena').innerHTML = houseHTML(k, pick(ROOMS.filter(r => r !== w)), 'big', true);
    const hm = $('.hmon'), els = [...document.querySelectorAll('.room')];
    const moveTo = async r => { hm.dataset.at = r; FX.whoosh(); await wait(650); };
    const q = `Put ${nm} in the ${w}!`;
    prompt(hl(q, w), [q, cap(w) + '!'], tok);
    return choose(els, el => el.dataset.w === w,
      async el => { SP.stop(); el.classList.add('right'); await moveTo(w); FX.good(); sparks(center(hm).x, center(hm).y, 12); await SP.say(`Yes! ${nm} is in the ${w}!`); },
      async el => { SP.stop(); const d = el.dataset.w; await moveTo(d); await SP.say(`${nm} is in the ${d}. Now put ${nm} in the ${w}!`, { rate: 0.85 }); },
      els.find(e => e.dataset.w === w));
  },
  /* „Where is Pikachu?" — dom, odpowiedź znaczkiem pokoju (też pytanie „where" w świecie 7) */
  async roomwhere(w, i, n, tok) {
    shell(i, n); bare();
    const room = ROOM[w] ? w : pick(ROOMS);
    PLHELP = 'Gdzie jest Pokémon? Dotknij znaczka pokoju — usłyszysz jego nazwę po angielsku.';
    const k = pick(D.eaters), nm = P(k).name;
    $('#arena').innerHTML = houseHTML(k, room, 'big');
    const pool = ROOM[w] ? others(w, 2) : shuffle(ROOMS.filter(r => r !== room)).slice(0, 2);
    const opts = shuffle([room].concat(pool));
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-w="${o}" aria-label="${o}">${ROOM[o]}</button>`).join('');
    const q = `Where is ${nm}?`;
    prompt(ROOM[w] ? q : `<em>Where</em> is ${nm}?`, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say('In the ' + e.dataset.w + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.w === room,
      async el => { el.classList.add('right'); FX.good(); await wait(600); await SP.say(`Yes! ${nm} is in the ${room}!`); },
      async () => { await wait(700); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.w === room));
  },
  /* „Tap Friday!" — kalendarz tygodnia */
  async dayfind(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj nazwy dnia i dotknij go w kalendarzu. Tydzień zaczyna się od poniedziałku.';
    $('#arena').innerHTML = daysHTML(null, null, true);
    const els = [...document.querySelectorAll('.day')], target = els.find(e => e.dataset.w === w);
    const q = `Tap ${disp(w)}!`;
    prompt(hl(q, w), [q], tok);
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); sparks(center(el).x, center(el).y, 10); await SP.say(`Yes! ${disp(w)}!`); },
      async el => { SP.stop(); await SP.say(`That is ${disp(el.dataset.w)}. Tap ${disp(w)}!`, { rate: 0.85 }); },
      target);
  },
  /* „What day comes after Monday?" */
  async dayafter(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Jaki dzień jest po tym dniu? Dotknij odpowiedzi — każdy przycisk mówi nazwę dnia.';
    const j = DAYS.indexOf(w), prev = DAYS[(j + 6) % 7];
    $('#arena').innerHTML = daysHTML(prev, w);
    const pool = shuffle(DAYS.filter(d => d !== w && d !== prev)).slice(0, 2);
    const opts = shuffle([w].concat(pool));
    $('#opts').innerHTML = opts.map(o => `<button class="opt dayopt" data-w="${o}" style="--c:${DAYCOL[DAYS.indexOf(o)]}" aria-label="${disp(o)}">${disp(o).slice(0, 2)}</button>`).join('');
    const q = `What day comes after ${disp(prev)}?`;
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(disp(e.dataset.w) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.w === w,
      async el => { el.classList.add('right'); FX.good(); const b = $('.day[data-w="' + w + '"]'); if (b) b.textContent = disp(w).slice(0, 2); await wait(500); await SP.say(`Yes! After ${disp(prev)} comes ${disp(w)}!`); },
      async () => { await wait(700); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.w === w));
  },
  /* układanie po kolei: dni, mój dzień, pory roku */
  async order(w, i, n, tok) {
    shell(i, n); bare();
    const isle = WORD_ISLE[w];
    const seq = isle === 'days' ? DAYS : isle === 'routine' ? RT_ORDER : SEASON_ORDER;
    const j = seq.indexOf(w), s0 = Math.max(0, Math.min(j - 1, seq.length - 3)), part = seq.slice(s0, s0 + 3);
    PLHELP = 'Ułóż obrazki po kolei: co jest pierwsze, co potem? Dotykaj ich w dobrej kolejności.';
    const icon = x => isle === 'days' ? `<b class="dl" style="--c:${DAYCOL[DAYS.indexOf(x)]}">${disp(x).slice(0, 2)}</b>` : isle === 'routine' ? RT[x][0] : SEASON[x];
    $('#arena').innerHTML = `<div class="order"><div class="slots">${part.map(() => '<span class="slot2"></span>').join('<i class="arr">➜</i>')}</div>
      <div class="otiles">${shuffle(part).map(x => `<button class="otile" data-w="${x}" aria-label="${x}">${icon(x)}</button>`).join('')}</div></div>`;
    const q = isle === 'days' ? 'Put the days in order!' : isle === 'routine' ? 'What comes first? Put them in order!' : 'Put the seasons in order!';
    prompt(q, [q], tok);
    const say1 = x => isle === 'routine' ? cap(x) : cap(disp(x));
    return new Promise(res => {
      let at = 0, miss = 0, busy = false;
      document.querySelectorAll('.otile').forEach(b => b.onclick = async () => {
        if (busy || b.classList.contains('used')) return;
        busy = true; SP.stop();
        if (b.dataset.w === part[at]) {
          FX.good(); b.classList.add('used'); b.classList.remove('hint');
          const sl = document.querySelectorAll('.slot2')[at]; sl.innerHTML = icon(b.dataset.w); sl.classList.add('full');
          at++; await SP.say(say1(b.dataset.w) + '!', { rate: 0.9 });
          if (at === part.length) {
            sparks(center($('.slots')).x, center($('.slots')).y, 14);
            await SP.say((isle === 'routine' ? 'First ' + part[0] + ', then ' + part[1] + ', then ' + part[2] : part.map(disp).join(', ')) + '! ' + pick(PRAISE));
            return res(miss === 0);
          }
        } else {
          miss++; FX.bad(); b.classList.remove('wrong'); void b.offsetWidth; b.classList.add('wrong');
          await SP.say(say1(b.dataset.w) + '? Not yet! ' + (at ? 'What comes next?' : 'What comes first?'), { rate: 0.85 });
          if (miss >= 2) { const h = [...document.querySelectorAll('.otile')].find(x => x.dataset.w === part[at]); if (h) h.classList.add('hint'); }
        }
        busy = false;
      });
    });
  },
  /* „Does Snorlax like carrots?" — Pokémon próbuje jedzenia, dziecko odpowiada po reakcji */
  async taste(w, i, n, tok) {
    shell(i, n);
    PLHELP = 'Popatrz, jak Pokémon reaguje na jedzenie. Lubi — dotknij 👍. Nie lubi — dotknij 👎.';
    const yes = w === 'like', k = pick(D.eaters), nm = P(k).name, f = pick(Object.keys(FOOD));
    $('#arena').innerHTML = monEl(k, 'solo') + `<span class="thought">${FOOD[f]}</span>`;
    const mon = $('#arena .mon'), th = $('.thought');
    const react = async () => {
      await flyFood(th, mon, FOOD[f]);
      mon.classList.remove('loop', 'feel-happy', 'feel-angry'); mon.querySelectorAll('.facebub').forEach(x => x.remove());
      mon.classList.add('loop', yes ? 'feel-happy' : 'feel-angry');
      mon.insertAdjacentHTML('afterbegin', `<span class="facebub">${yes ? '😋' : '🤢'}</span>`);
      if (yes) { actOn(mon, 'eat', true); fxOn(mon, 'happy'); } else fxOn(mon, 'angry');
    };
    $('#opts').innerHTML = '<button class="opt yn" data-a="yes" aria-label="yes">👍<small>Yes</small></button><button class="opt yn" data-a="no" aria-label="no">👎<small>No</small></button>';
    const q = `Does ${nm} like ${FOODPL[f]}?`;
    $('#txt').innerHTML = q;
    $('#again').onclick = () => { FX.tap(); SP.stop(); react(); SP.say(q); };
    await SP.say(`${nm} tries ${FOODPL[f]}…`); if (!alive(tok)) return false;
    await react(); await wait(900); if (!alive(tok)) return false;
    SP.say(q);
    const els = [...document.querySelectorAll('.opt')], right = yes ? 'yes' : 'no';
    return choose(els, el => el.dataset.a === right,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await SP.say(yes ? `Yes, it does! ${nm} likes ${FOODPL[f]}!` : `No, it doesn't! ${nm} doesn't like ${FOODPL[f]}!`); },
      async () => { SP.stop(); await SP.say('Look at ' + nm + '! ' + q, { rate: 0.9 }); },
      els.find(e => e.dataset.a === right));
  },
  /* które zdanie pasuje do obrazka: „likes" czy „doesn't like" */
  async likesay(w, i, n, tok) {
    shell(i, n);
    PLHELP = 'Dotknij zdania, żeby je usłyszeć. Wybierz to, które pasuje do obrazka.';
    const yes = w === 'like', k = pick(D.eaters), nm = P(k).name, f = pick(Object.keys(FOOD));
    $('#arena').innerHTML = monPlus(k, FOOD[f] + (yes ? '😋' : '🤢'), yes ? 'loop feel-happy' : 'loop feel-angry');
    const s1 = `${nm} likes ${FOODPL[f]}.`, s2 = `${nm} doesn't like ${FOODPL[f]}.`;
    $('#opts').innerHTML = shuffle([['like', '👍', s1], ["don't like", '👎', s2]]).map(([a, ic, s]) =>
      `<button class="opt sent" data-w="${a}" data-s="${s}" aria-label="${s}"><i>${ic}</i>${s}</button>`).join('');
    const q = 'Which one is right?';
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(e.dataset.s); }));
    return choose(els, el => el.dataset.w === w,
      async el => { el.classList.add('right'); FX.good(); await wait(1600); await SP.say('Yes! ' + (yes ? s1 : s2)); },
      async () => { await wait(1600); await SP.say('Look at ' + nm + ' again!', { rate: 0.9 }); },
      els.find(e => e.dataset.w === w));
  },
  /* układanie zdania z klocków w kolejności, którą słychać */
  async build(w, i, n, tok) {
    shell(i, n);
    PLHELP = 'Posłuchaj zdania i ułóż je z klocków: dotykaj ich po kolei, tak jak słyszysz.';
    const b = buildFor(w), s = sentOf(b);
    $('#arena').innerHTML = b.vis + `<div class="tiles slots3">${b.toks.map(() => '<span class="tile empty"></span>').join('')}</div>`;
    $('#opts').innerHTML = shuffle(b.toks.map((t, j) => [t, j])).map(([t, j]) =>
      `<button class="opt tile" data-j="${j}" aria-label="${t[0]}">${t[1] ? `<i>${t[1]}</i>` : ''}${t[0]}</button>`).join('');
    prompt('Make the sentence!', ['Make the sentence!', s], tok);
    if (b.act) setTimeout(() => { const m = $('#actmon'); if (m) actOn(m, b.act); }, 400);
    return new Promise(res => {
      let at = 0, miss = 0, busy = false;
      document.querySelectorAll('#opts .tile').forEach(t => t.onclick = async () => {
        if (busy || t.classList.contains('used')) return;
        busy = true; SP.stop();
        const j = +t.dataset.j;
        if (j === at) {
          FX.good(); t.classList.add('used'); t.classList.remove('hint');
          const sl = document.querySelectorAll('.slots3 .tile')[at]; sl.innerHTML = t.innerHTML; sl.classList.remove('empty');
          at++; await SP.say(b.toks[j][0], { rate: 0.9 });
          if (at === b.toks.length) { sparks(center($('.slots3')).x, center($('.slots3')).y, 14); await SP.say(s + ' ' + pick(PRAISE)); return res(miss === 0); }
        } else {
          miss++; FX.bad(); t.classList.remove('wrong'); void t.offsetWidth; t.classList.add('wrong');
          await SP.say('Listen! ' + s, { rate: 0.85 });
          if (miss >= 2) { const h = document.querySelector(`#opts .tile[data-j="${at}"]`); if (h) h.classList.add('hint'); }
        }
        busy = false;
      });
    });
  },
  /* „Can Snorlax fly?" */
  async cansay(w, i, n, tok) {
    shell(i, n);
    PLHELP = 'Czy ten Pokémon to potrafi? Tak — dotknij 👍. Nie — dotknij 👎.';
    const can = w === 'can', fly = Math.random() < 0.5, v = fly ? 'fly' : 'swim';
    const k = pick(can ? (fly ? D.flyers : D.swimmers) : (fly ? D.sets.nowings : D.sets.cantswim)), nm = P(k).name;
    $('#arena').innerHTML = monEl(k, 'solo') + `<span class="thought">${ACT[v][0]}</span>`;
    const mon = $('#arena .mon');
    $('#opts').innerHTML = '<button class="opt yn" data-a="yes" aria-label="yes">👍<small>Yes</small></button><button class="opt yn" data-a="no" aria-label="no">👎<small>No</small></button>';
    const q = `Can ${nm} ${v}?`;
    prompt(hl(q, v), [q], tok);
    const els = [...document.querySelectorAll('.opt')], right = can ? 'yes' : 'no';
    return choose(els, el => el.dataset.a === right,
      async el => {
        el.classList.add('right'); FX.good();
        if (can) actOn(mon, v); else { mon.classList.remove('wrong'); void mon.offsetWidth; mon.classList.add('wrong'); }
        await SP.say(can ? `Yes, it can! ${nm} can ${v}!` : `No, it can't! ${nm} can't ${v}!`); await wait(500);
      },
      async () => { await wait(500); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.a === right));
  },
  /* pytania świata 7 */
  async askwho(w, i, n, tok) { return GAMES.who(pick(Object.keys(ACT)), i, n, tok); },
  async askwhat(w, i, n, tok) {
    shell(i, n);
    PLHELP = 'Co je ten Pokémon? Dotknij jedzenia — usłyszysz jego nazwę po angielsku.';
    const k = pick(D.eaters), nm = P(k).name, f = pick(Object.keys(FOOD));
    $('#arena').innerHTML = monPlus(k, FOOD[f], 'loop act-eat');
    const opts = shuffle([f].concat(shuffle(Object.keys(FOOD).filter(x => x !== f)).slice(0, 2)));
    $('#opts').innerHTML = opts.map(o => `<button class="opt food" data-w="${o}" aria-label="${o}">${FOOD[o]}</button>`).join('');
    const q = `What is ${nm} eating?`;
    prompt(`<em>What</em> is ${nm} eating?`, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.w) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.w === f,
      async el => { el.classList.add('right'); FX.good(); await wait(600); await SP.say(`Yes! ${nm} is eating ${art(f)}!`); },
      async () => { await wait(700); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.w === f));
  },
  async askhowmany(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Policz jedzenie na kocu i dotknij właściwej liczby.';
    const f = pick(Object.keys(FOOD)), num = 3 + rnd(8);
    $('#arena').innerHTML = `<div class="picnic many">${Array.from({ length: num }, (_, j) => `<span class="fitem" style="animation-delay:${j * 0.06}s">${FOOD[f]}</span>`).join('')}</div>`;
    const opts = shuffle([num].concat(shuffle([num - 2, num - 1, num + 1, num + 2].filter(x => x >= 1 && x <= 12)).slice(0, 2)));
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-n="${o}">${o}</button>`).join('');
    const q = `How many ${COUNTPL[f]}?`;
    prompt(`<em>How many</em> ${COUNTPL[f]}?`, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(NUMS[e.dataset.n - 1]) + '!', { rate: 0.85 }); }));
    return choose(els, el => +el.dataset.n === num,
      async el => {
        el.classList.add('right'); FX.good(); await wait(400);
        const it = [...document.querySelectorAll('.fitem')];
        for (let j = 0; j < it.length; j++) { it[j].classList.add('counted'); FX.pop(); await SP.say(NUMS[j], { rate: 1.1 }); }
        await SP.say(`${cap(NUMS[num - 1])} ${COUNTPL[f]}! ${pick(PRAISE)}`);
      },
      async () => { await wait(600); await SP.say('Count again! ' + q, { rate: 0.9 }); },
      els.find(e => +e.dataset.n === num));
  },
  /* rozmowa: dziecko wybiera, co odpowiada Pokémon */
  async chat(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Pokémon zadaje pytanie. Dotykaj dymków, żeby usłyszeć odpowiedzi, i wybierz tę, która pasuje.';
    const kA = pick(D.stars), kB = pick(D.stars.filter(x => x !== kA)), it = chatItem(w, kB);
    $('#arena').innerHTML = chatHTML(kA, kB, it, false);
    const opts = shuffle([[it.a, true]].concat(it.x.map(x => [x, false])));
    $('#opts').innerHTML = opts.map(([o, r], j) => `<button class="opt sent" data-r="${r ? 1 : 0}" data-s="${o[1]}" aria-label="${o[1]}"><i>${o[0]}</i>${o[1]}</button>`).join('');
    prompt(`“${it.q}”`, [it.q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(e.dataset.s); }));
    return choose(els, el => el.dataset.r === '1',
      async el => {
        el.classList.add('right'); FX.good(); await wait(1500);
        const ans = $('.bub.ans'); if (ans) ans.style.visibility = 'visible';
        const b = $('.cmon.b'); if (b) { b.classList.remove('wrong'); void b.offsetWidth; b.classList.add('hop'); }
        if (it.end) await SP.say(it.end);
      },
      async () => { await wait(1500); const a = $('.cmon.a'); if (a) { a.classList.remove('wrong'); void a.offsetWidth; a.classList.add('wrong'); } await SP.say('Hmm? ' + it.q, { rate: 0.9 }); },
      els.find(e => e.dataset.r === '1'));
  },
  /* historyjka: słuchamy jeszcze raz, potem pytanie */
  async storyq(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj historyjki i odpowiedz na pytanie — dotknij właściwego obrazka.';
    const st = STORIES[w], qq = pick(st.q);
    $('#arena').innerHTML = storyHTML(st);
    $('#txt').innerHTML = '📖 ' + st.t;
    $('#again').onclick = () => { FX.tap(); SP.stop(); tellStory(st, tok); };
    await SP.say(st.t + '!'); if (!alive(tok)) return false;
    await tellStory(st, tok); if (!alive(tok)) return false;
    const opts = shuffle([qq[1]].concat(qq[2]));
    $('#opts').innerHTML = opts.map(o => COLHEX[o]
      ? `<button class="opt swatch" data-w="${o}" style="background:${COLHEX[o]}" aria-label="${o}"></button>`
      : `<button class="opt" data-w="${o}" aria-label="${o}">${o}</button>`).join('');
    $('#txt').innerHTML = qq[0];
    $('#again').onclick = () => { FX.tap(); SP.stop(); SP.say(qq[0]); };
    SP.say(qq[0]);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { if (COLHEX[e.dataset.w]) { SP.stop(); SP.say(cap(e.dataset.w) + '!', { rate: 0.85 }); } }));
    return choose(els, el => el.dataset.w === qq[1],
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await wait(500); await SP.say('Yes! ' + qq[3]); },
      async () => { await wait(600); await SP.say(qq[0], { rate: 0.9 }); },
      els.find(e => e.dataset.w === qq[1]));
  }
});

/* ======================================================================
   ŚWIAT 9: LITERY, LITEROWANIE, CZYTANIE — od słuchania do czytania
   Litery mówimy samą wielką literą („B."), bo „A is for apple" Zoe czyta jak „As for apple";
   wzór „Apple starts with A." brzmi czysto (sprawdzone rozpoznawaniem mowy).
   ====================================================================== */
const DEXN = {}; D.dex.forEach(r => { DEXN[r[1]] = r[0]; });
const ABC = { a: ['apple', '🍎', 'Abra'], b: ['ball', '⚽', 'Bulbasaur'], c: ['cat', '🐱', 'Charmander'], d: ['dog', '🐶', 'Dragonite'],
  e: ['egg', '🥚', 'Eevee'], f: ['fish', '🐟', 'Froakie'], g: ['ghost', '👻', 'Gengar'], h: ['hat', '🎩', 'Haunter'],
  i: ['ice cream', '🍦', 'Igglybuff'], j: ['jump', '🦘', 'Jigglypuff'], k: ['kite', '🪁', 'Krabby'], l: ['lion', '🦁', 'Lapras'],
  m: ['moon', '🌙', 'Magikarp'], n: ['nose', '👃', 'Noctowl'], o: ['octopus', '🐙', 'Oddish'], p: ['pizza', '🍕', 'Pikachu'],
  q: ['queen', '👸', 'Quaxly'], r: ['robot', '🤖', 'Raichu'], s: ['sun', '🌞', 'Squirtle'], t: ['teddy', '🧸', 'Togepi'],
  u: ['umbrella', '☂️', 'Umbreon'], v: ['violin', '🎻', 'Vulpix'], w: ['whale', '🐋', 'Wartortle'], x: ['box', '📦', 'Xatu'],
  y: ['yellow', '🟡', 'Yamper'], z: ['zebra', '🦓', 'Zubat'] };
const LETTERS = Object.keys(ABC);
const LN = c => c.toUpperCase();
const SPW = { cat: '🐱', dog: '🐶', sun: '🌞', hat: '🎩', bee: '🐝', egg: '🥚', car: '🚗', bag: '🎒', pen: '🖊️', six: '6️⃣', ten: '🔟', red: '🔴' };
const RDW = { cat: ['🐱', 'cats'], dog: ['🐶', 'dogs'], fish: ['🐟', 'fish'], sun: ['🌞', 'suns'], moon: ['🌙', 'moons'], star: ['⭐', 'stars'],
  ball: ['⚽', 'balls'], car: ['🚗', 'cars'], kite: ['🪁', 'kites'], apple: ['🍎', 'apples'], cake: ['🍰', 'cakes'], egg: ['🥚', 'eggs'] };
const lt = w => w.slice(2);                         // „L-b" → „b", „s-cat" → „cat", „r-cat" → „cat"
LETTERS.forEach(c => { DISP['L-' + c] = LN(c) + c; });
Object.keys(SPW).forEach(w => { DISP['s-' + w] = w; });
Object.keys(RDW).forEach(w => { DISP['r-' + w] = w; });
const letterHTML = (c, cls) => `<span class="lbig ${cls || ''}">${LN(c)}<small>${c}</small></span>`;
const letterMon = c => `<div class="mon lmon" id="actmon"><img src="${IMG(DEXN[ABC[c][2]])}" alt="${ABC[c][2]}"></div>`;
/* zdanie „Ball starts with B." — X wyjątkowo: słychać go w środku słowa „box" */
const startsWith = (c, word) => c === 'x' && word === 'box' ? 'You can hear X in box.' : cap(word) + ' starts with ' + LN(c) + '.';
/* litery spoza słowa — do podpowiedzi „która pierwsza?" */
const otherLetters = (not, n) => shuffle(LETTERS.filter(c => !not.includes(c))).slice(0, n);
/* przeliterowanie z podświetlaniem kolejnych kafelków */
async function spellOut(word, tiles, tok) {
  for (let j = 0; j < word.length; j++) {
    if (!alive(tok)) return;
    const t = tiles[j]; if (t) { t.classList.remove('lit'); void t.offsetWidth; t.classList.add('lit'); }
    await SP.say(LN(word[j]) + '.', { rate: 0.85 }); await wait(120);
  }
  if (alive(tok)) await SP.say(cap(word) + '!');
}
/* „Your turn!" — uczciwie: bez mikrofonu gra NIE udaje, że słyszała (19.11.2026: Jan zauważył,
   że chwali, choć nikt nic nie powiedział). Czas na powtórzenie, potem wzór jeszcze raz — bez pochwały.
   Z mikrofonem (w domu na Macu, gdy rodzic włączył) gra naprawdę słucha i chwali tylko, gdy usłyszy. */
async function yourTurn(say, tok) {
  const model = cap(say.replace(/[.!?]$/, '')) + '!', yt = $('#yt');
  if (MIC.ok()) {
    if (yt) yt.classList.add('listening');
    let heard = ''; try { heard = await recordSay(2600); } catch (e) { heard = ''; }
    if (yt) yt.classList.remove('listening');
    if (!alive(tok)) return;
    if (saidOk(heard, say)) { FX.good(); if (yt) { sparks(center(yt).x, center(yt).y, 10); yt.classList.add('heard'); } await SP.say(pick(['Great!', 'Super!', 'Well done!'])); }
    else await SP.say(model, { rate: 0.85 });
    return;
  }
  await wait(2400); if (!alive(tok)) return;          // czas na powtórzenie na głos
  await SP.say(model, { rate: 0.85 });                 // wzór jeszcze raz — dziecko porównuje samo
}
/* karta nauki dla świata 9 (własne zdania, bo litery mówimy inaczej niż słowa) */
async function teachCard(i, n, tok, o) {
  app.innerHTML = hud(`<span class="chip">✨ ${i + 1}/${n}</span>`) + `<div class="play">
    <div class="learn">
      <div class="word">${o.word}</div>
      <div class="vis">${o.vis}</div>
      <div class="sentence">${o.text}</div>
      <div class="yourturn" id="yt" style="visibility:hidden"><span class="mic">🎤</span><span>Your turn! Say: <b>${o.turnShow}</b></span></div>
      <div style="display:flex;gap:14px;align-items:center">
        <button class="say" id="again" aria-label="Posłuchaj jeszcze raz">🔊</button>
        <button class="next" id="nx" style="visibility:hidden">▶</button>
      </div>
    </div></div>`;
  wireHud();
  const run = async () => { for (const s of o.lines) { if (!alive(tok)) return; if (typeof s === 'function') await s(); else { await SP.say(s); await wait(250); } } };
  $('#again').onclick = () => { FX.tap(); SP.stop(); run(); };
  (async () => {
    await run(); if (!alive(tok)) return;
    await wait(300);
    const yt = $('#yt'); if (yt) yt.style.visibility = 'visible';
    await SP.say('Your turn! Say: ' + o.turnSay + '!'); if (!alive(tok)) return;
    await yourTurn(o.turnSay, tok); if (!alive(tok)) return;
    const nx = $('#nx'); if (nx) { nx.style.visibility = 'visible'; sparks(center(nx).x, center(nx).y, 6); }
  })();
  await new Promise(res => { $('#nx').onclick = () => { FX.tap(); SP.stop(); res(); }; });
}
Object.assign(TH, {
  abc: {
    async teach(w, i, n, tok) {
      const c = lt(w), [word, emo, mon] = ABC[c];
      PLHELP = 'To jest litera po angielsku. Posłuchaj, jak się nazywa, i powtórz na głos.';
      await teachCard(i, n, tok, {
        word: letterHTML(c), vis: `<span class="big-ic">${emo}</span>${letterMon(c)}`,
        text: `${startsWith(c, word)}<br>${mon} starts with ${LN(c)}!`,
        lines: [LN(c) + '!', startsWith(c, word), mon + ' starts with ' + LN(c) + '!'],
        turnShow: LN(c), turnSay: LN(c)
      });
    }
  },
  spell: {
    async teach(w, i, n, tok) {
      const word = lt(w);
      PLHELP = 'Posłuchaj, jak się literuje to słowo po angielsku: litera po literze. Potem powtórz.';
      await teachCard(i, n, tok, {
        word: word, vis: `<span class="big-ic">${SPW[word]}</span><div class="spellw">${[...word].map(x => `<span class="ltile">${x}</span>`).join('')}</div>`,
        text: [...word].map(LN).join(' – ') + '. ' + cap(word) + '!',
        lines: [cap(word) + '!', () => spellOut(word, [...document.querySelectorAll('.ltile')], tok)],
        turnShow: [...word].map(LN).join('-'), turnSay: [...word].map(LN).join(', ') + '. ' + cap(word)
      });
    }
  },
  read: {
    async teach(w, i, n, tok) {
      const word = lt(w);
      PLHELP = 'Tak się pisze to słowo po angielsku. Popatrz na litery, posłuchaj i przeczytaj na głos.';
      await teachCard(i, n, tok, {
        word: `<span class="readw">${word}</span>`, vis: `<span class="big-ic">${RDW[word][0]}</span>`,
        text: 'This word is <b>' + word + '</b>.',
        lines: [cap(word) + '!', 'This word is ' + word + '.'],
        turnShow: word, turnSay: 'Read: ' + word
      });
    }
  }
});
function letterOpts(cs, cls) {
  return cs.map(c => `<button class="opt letter ${cls || ''}" data-c="${c}" aria-label="${LN(c)}">${LN(c)}<small>${c}</small></button>`).join('');
}
Object.assign(GAMES, {
  /* „Find the letter B!" */
  async abchear(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj, jaką literę mówi głos, i dotknij jej.';
    const c = lt(w), cs = shuffle([c].concat(others(w, 2).map(lt)));
    $('#arena').innerHTML = `<div class="abcwait">🔤</div>`;
    $('#opts').innerHTML = letterOpts(cs);
    const q = 'Find the letter ' + LN(c) + '!';
    prompt('Find the letter… 👂', [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    return choose(els, el => el.dataset.c === c,
      async el => {
        SP.stop(); el.classList.add('right'); FX.good();
        $('#arena').innerHTML = `<span class="big-ic">${ABC[c][1]}</span>${letterMon(c)}`;
        await SP.say('Yes! ' + startsWith(c, ABC[c][0]));
        await throwBall($('#actmon'));
      },
      async el => { SP.stop(); await SP.say('That is the letter ' + LN(el.dataset.c) + '. ' + q, { rate: 0.85 }); },
      els.find(e => e.dataset.c === c));
  },
  /* obrazek albo Pokémon: „Bulbasaur! What is the first letter?" */
  async abcfirst(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj nazwy. Jaką literą się zaczyna? Dotknij litery — usłyszysz jej nazwę.';
    const c = lt(w), useMon = c === 'x' || Math.random() < 0.5, name = useMon ? ABC[c][2] : ABC[c][0];
    const cs = shuffle([c].concat(others(w, 2).map(lt)));
    $('#arena').innerHTML = useMon ? letterMon(c) : `<span class="food-big">${ABC[c][1]}</span>`;
    $('#opts').innerHTML = letterOpts(cs);
    const q = 'What is the first letter?';
    prompt(q + ' 👂', [cap(name) + '!', q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(LN(e.dataset.c) + '.', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.c === c,
      async el => {
        el.classList.add('right'); FX.good(); await wait(600);
        await SP.say('Yes! ' + cap(name) + ' starts with ' + LN(c) + '!');
        const m = $('#actmon'); if (m) await throwBall(m);
      },
      async () => { await wait(600); await SP.say(cap(name) + '! ' + q, { rate: 0.9 }); },
      els.find(e => e.dataset.c === c));
  },
  /* „_at" — brakuje pierwszej litery */
  async spell1(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Jaka litera jest pierwsza? Posłuchaj słowa i dotknij litery, której brakuje.';
    const word = lt(w), c = word[0], cs = shuffle([c].concat(otherLetters([...word], 2)));
    $('#arena').innerHTML = `<div class="spellbox"><span class="food-big">${SPW[word]}</span>
      <div class="spellw">${[...word].map((x, j) => j ? `<span class="ltile">${x}</span>` : '<span class="ltile blank" id="gap">?</span>').join('')}</div></div>`;
    $('#opts').innerHTML = letterOpts(cs);
    const q = 'What is the first letter?';
    prompt(q + ' 👂', [cap(word) + '!', q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(LN(e.dataset.c) + '.', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.c === c,
      async el => {
        el.classList.add('right'); FX.good(); await wait(500);
        const g = $('#gap'); g.textContent = c; g.classList.remove('blank');
        await spellOut(word, [...document.querySelectorAll('#arena .ltile')], tok);
        await SP.say(pick(PRAISE));
      },
      async () => { await wait(600); await SP.say(cap(word) + '! ' + q, { rate: 0.9 }); },
      els.find(e => e.dataset.c === c));
  },
  /* całe słowo z kafelków: dotykaj liter po kolei */
  async spell(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Ułóż słowo z liter. Dotykaj liter po kolei — od pierwszej do ostatniej.';
    const word = lt(w), letters = [...word], extra = otherLetters(letters, 1);
    $('#arena').innerHTML = `<div class="spellbox"><span class="food-big">${SPW[word]}</span>
      <div class="spellw">${letters.map(() => '<span class="ltile blank">&nbsp;</span>').join('')}</div></div>`;
    $('#opts').innerHTML = shuffle(letters.concat(extra)).map(x => `<button class="opt letter otile" data-c="${x}" aria-label="${LN(x)}">${x}</button>`).join('');
    prompt('Spell it! 👂', [cap(word) + '!', 'Spell it!'], tok);
    return new Promise(res => {
      let at = 0, miss = 0, busy = false;
      document.querySelectorAll('#opts .otile').forEach(b => b.onclick = async () => {
        if (busy || b.classList.contains('used')) return;
        busy = true; SP.stop();
        if (b.dataset.c === letters[at]) {
          FX.good(); b.classList.add('used'); document.querySelectorAll('#opts .otile').forEach(x => x.classList.remove('hint'));
          const sl = document.querySelectorAll('#arena .ltile')[at]; sl.textContent = b.dataset.c; sl.classList.remove('blank'); sl.classList.add('lit');
          at++; await SP.say(LN(b.dataset.c) + '.', { rate: 0.85 });
          if (at === letters.length) {
            const box = $('.spellw'); sparks(center(box).x, center(box).y, 14);
            await spellOut(word, [...document.querySelectorAll('#arena .ltile')], tok); await SP.say(pick(PRAISE));
            return res(miss === 0);
          }
        } else {
          miss++; FX.bad(); b.classList.remove('wrong'); void b.offsetWidth; b.classList.add('wrong');
          await SP.say('Not yet! Try again!', { rate: 0.9 });
          if (miss >= 2) { const h = [...document.querySelectorAll('#opts .otile:not(.used)')].find(x => x.dataset.c === letters[at]); if (h) h.classList.add('hint'); }
        }
        busy = false;
      });
    });
  },
  /* czytanie bez głosu: słowo napisane, dziecko wybiera obrazek */
  async readpick(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Przeczytaj słowo i dotknij obrazka, który do niego pasuje. Głos nie podpowiada — to zadanie na czytanie!';
    const word = lt(w), opts = shuffle([w].concat(others(w, 2)));
    $('#arena').innerHTML = `<div class="readw big">${word}</div>`;
    $('#opts').innerHTML = opts.map(o => `<button class="opt food" data-w="${o}" aria-label="obrazek">${RDW[lt(o)][0]}</button>`).join('');
    const q = 'Read the word!';
    prompt('Read the word! 👀', [q], tok);
    const els = [...document.querySelectorAll('.opt')], target = els.find(e => e.dataset.w === w);
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await SP.say(cap(word) + '! ' + pick(PRAISE)); },
      async (el, miss) => { SP.stop(); await SP.say(miss >= 2 ? cap(word) + '! ' + cap(word) + '!' : 'No! Read again!', { rate: 0.85 }); },
      target);
  },
  /* „two cats" — czytanie wyrażenia z liczbą */
  async readsent(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Przeczytaj: ile i czego? Dotknij obrazka, który pasuje.';
    const word = lt(w), num = 1 + rnd(4), other = lt(others(w, 1)[0] || 'r-dog');
    const phrase = n2 => NUMS[n2 - 1] + ' ' + (n2 === 1 ? word : RDW[word][1]);
    const num2 = pick([1, 2, 3, 4].filter(x => x !== num));
    const cards = shuffle([[word, num, 1], [word, num2, 0], [other, num, 0]]);
    $('#arena').innerHTML = `<div class="readw big">${phrase(num)}</div>`;
    $('#opts').innerHTML = cards.map(([x, k, ok]) => `<button class="opt sent many" data-ok="${ok}" aria-label="obrazek">${RDW[x][0].repeat(k)}</button>`).join('');
    prompt('Read and find! 👀', ['Read and find!'], tok);
    const els = [...document.querySelectorAll('.opt')], target = els.find(e => e.dataset.ok === '1');
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await SP.say(cap(phrase(num)) + '! ' + pick(PRAISE)); },
      async (el, miss) => { SP.stop(); await SP.say(miss >= 2 ? cap(phrase(num)) + '!' : 'No! Read again!', { rate: 0.85 }); },
      target);
  }
});

/* ======================================================================
   ŚWIAT 10: TARGOWISKO — prośby w sklepie, pieniądze, grzeczne słowa
   Sprzedawcą jest zawsze Meowth (Pokémon od monet). Słowa mają przedrostki
   b- (kupowanie), p- (ceny), m- (grzeczne słowa), bo WORD_ISLE jest wspólny.
   ====================================================================== */
const SHOP = { apple: '🍎', banana: '🍌', cake: '🍰', ball: '⚽', kite: '🪁', teddy: '🧸', hat: '🎩', book: '📖', robot: '🤖' };
const KEEPER = DEXN['Meowth'] || 52;
const askFor = x => 'Can I have ' + art(x) + ', please?';
const coinsTxt = n => NUMS[n - 1] + (n === 1 ? ' coin' : ' coins');
const MAN = {
  'm-sorry': { ic: '🙇', a: 'Sorry!', q: 'Ouch! My foot!', fx: '💥', end: "That's OK!" },
  'm-bless': { ic: '🤗', a: 'Bless you!', q: 'Achoo!', fx: '🤧', end: 'Thank you!' },
  'm-excuse': { ic: '🙋', a: 'Excuse me!', q: 'Zzz…', fx: '😴', say: 'Snorlax is in the way!', kA: 'snorlax', end: 'Oh! Sorry!' },
  'm-here': { ic: '🤲', a: 'Here you are!', q: 'Can I have the ball, please?', fx: '⚽', give: true, end: 'Thank you!' },
  'm-welcome': { ic: '😊', a: "You're welcome!", q: 'Thank you!', fx: '🎁', end: '' },
  'm-please': { ic: '🙏', a: 'Yes, please!', q: 'Do you want a cookie?', fx: '🍪', end: 'Here you are!' }
};
Object.keys(SHOP).forEach(x => { DISP['b-' + x] = x; });
for (let n = 1; n <= 10; n++) DISP['p-' + n] = n + ' 🪙';
Object.keys(MAN).forEach(m => { DISP[m] = MAN[m].a; });
const coinHTML = cls => `<span class="coin ${cls || ''}"></span>`;
/* sklep: markiza, półka z rzeczami, lada z Meowthem; obok klient */
function shopHTML(items, kc, o) {
  o = o || {};
  return `<div class="shopwrap"><div class="shop">
    <div class="awning"></div>
    <div class="shelf">${items.map(x => `<button class="shopitem" data-w="${x}" aria-label="${x}"><span class="emo">${SHOP[x]}</span>${o.prices ? `<b class="tag">${o.prices[x]}</b>` : ''}</button>`).join('')}</div>
    <div class="keeper"><span class="sbub" id="kbub"></span><img src="${IMG(KEEPER)}" alt="Meowth"></div>
    <div class="counter">${o.tray ? '<div class="tray" id="tray"></div>' : ''}</div>
  </div>
  ${kc ? `<div class="cust" id="cust"><span class="sbub" id="cbub"></span>${kc === 'kid' ? '<span class="kidhand">🙋</span>' : imgOf(kc)}</div>` : ''}</div>`;
}
function sbub(id, txt) { const b = $('#' + id); if (!b) return; b.textContent = txt; b.classList.remove('on'); void b.offsetWidth; b.classList.add('on'); }
/* rzecz z półki leci do klienta: „Here you are!" — „Thank you!" */
async function handOver(item, tok) {
  const emo = item.querySelector('.emo'), cust = $('#cust');
  sbub('kbub', 'Here you are!'); await SP.say('Here you are!'); if (!alive(tok)) return;
  if (emo && cust) { emo.style.visibility = 'hidden'; await flyFood(emo, cust, emo.textContent); }
  if (cust) { cust.classList.remove('hop'); void cust.offsetWidth; cust.classList.add('hop'); }
  sbub('cbub', 'Thank you!'); await SP.say('Thank you!');
}
/* sceny grzecznych słów: Pokémon A coś mówi/robi, B (dziecko) odpowiada */
function manHTML(m, kA, kB, showA) {
  const M = MAN[m];
  return `<div class="chat manners">
    <div class="cmon a">${M.fx ? `<span class="mfx">${M.fx}</span>` : ''}<span class="bub q">${M.q}</span>${imgOf(kA)}</div>
    <div class="cmon b">${M.give ? '<span class="gift">⚽</span>' : ''}<span class="bub ans" ${showA ? '' : 'style="visibility:hidden"'}>${M.a}</span>${imgOf(kB)}</div></div>`;
}
const manA = m => MAN[m].kA && D.pool[MAN[m].kA] ? MAN[m].kA : pick(D.stars);

Object.assign(TH, {
  shop: {
    async teach(w, i, n, tok) {
      const x = lt(w), kc = pick(D.stars);
      PLHELP = 'Tak po angielsku grzecznie prosi się w sklepie o jakąś rzecz. Posłuchaj i powtórz całe zdanie.';
      await teachCard(i, n, tok, {
        word: x, vis: shopHTML([x], kc), text: askFor(x) + '<br>Here you are! – Thank you!',
        lines: [cap(art(x)) + '!',
          async () => { sbub('cbub', askFor(x)); await SP.say(askFor(x)); await wait(250); },
          async () => { const it = $('.shopitem'); if (it) await handOver(it, tok); await wait(250); }],
        turnShow: askFor(x), turnSay: askFor(x).replace(/\?$/, '')
      });
    }
  },
  money: {
    async teach(w, i, n, tok) {
      const num = +lt(w), x = pick(Object.keys(SHOP));
      PLHELP = 'Coin to po angielsku moneta. Posłuchaj, ile monet kosztuje ta rzecz, i powtórz cenę.';
      await teachCard(i, n, tok, {
        word: `${num} <span class="coin big"></span>`,
        vis: `<div class="moneyvis"><div class="pricecard"><span class="food-big">${SHOP[x]}</span><b class="tag">${num}</b></div><div class="coins">${Array.from({ length: num }, () => coinHTML()).join('')}</div></div>`,
        text: `How much is the ${x}?<br>It is ${coinsTxt(num)}.`,
        lines: [cap(coinsTxt(num)) + '!', 'How much is the ' + x + '?', async () => {
          const cs = [...document.querySelectorAll('.coins .coin')];
          for (let j = 0; j < cs.length; j++) { if (!alive(tok)) return; cs[j].classList.add('counted'); FX.coin(); await SP.say(NUMS[j], { rate: 1.1 }); }
          await SP.say('It is ' + coinsTxt(num) + '.'); await wait(250);
        }],
        turnShow: cap(coinsTxt(num)), turnSay: cap(coinsTxt(num))
      });
    }
  },
  manners: {
    async teach(w, i, n, tok) {
      const M = MAN[w], kA = manA(w), kB = pick(D.stars.filter(k => k !== kA));
      PLHELP = 'Grzeczne słowa po angielsku. Posłuchaj, co mówi jeden Pokémon i co mu odpowiada drugi. Powtórz odpowiedź.';
      await teachCard(i, n, tok, {
        word: M.a, vis: manHTML(w, kA, kB, true), text: '',
        lines: [M.say || M.q, M.a],
        turnShow: M.a, turnSay: M.a.replace(/!$/, '')
      });
    }
  }
});

Object.assign(GAMES, {
  /* dziecko jest sprzedawcą: „Can I have a kite, please?" — dotknij właściwej rzeczy na półce */
  async shopbuy(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Jesteś sprzedawcą! Posłuchaj, o co prosi Pokémon, i dotknij tej rzeczy na półce.';
    const x = lt(w), items = shuffle([x].concat(others(w, 2).map(lt))), kc = pick(D.stars);
    $('#arena').innerHTML = shopHTML(items, kc);
    const ask = askFor(x);
    sbub('cbub', 'Can I have… 👂');
    prompt('What does ' + P(kc).name + ' want? 👂', [ask], tok);
    const els = [...document.querySelectorAll('.shopitem')], target = els.find(e => e.dataset.w === x);
    return choose(els, el => el === target,
      async el => { SP.stop(); FX.good(); el.classList.add('right'); sbub('cbub', ask); await handOver(el, tok); FX.coin(); },
      async el => { SP.stop(); await SP.say('No, that is ' + art(el.dataset.w) + '. ' + ask, { rate: 0.9 }); },
      target);
  },
  /* dziecko jest klientem: wybiera, jak poprosić o rzecz z dymka */
  async shopask(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Teraz Ty robisz zakupy! Popatrz, co chcesz kupić (w chmurce). Dotykaj zdań, żeby je usłyszeć, i wybierz właściwe.';
    const x = lt(w), dis = others(w, 2).map(lt);
    $('#arena').innerHTML = shopHTML(shuffle([x].concat(dis)), 'kid');
    const cb = $('#cbub'); cb.innerHTML = `💭 ${SHOP[x]}`; cb.classList.add('on', 'think');
    sbub('kbub', 'What would you like?');
    const opts = shuffle([[x, true]].concat(dis.map(d => [d, false])));
    $('#opts').innerHTML = opts.map(([o, r]) => `<button class="opt sent" data-r="${r ? 1 : 0}" data-s="${askFor(o)}" aria-label="${askFor(o)}"><i>${SHOP[o]}</i>${askFor(o)}</button>`).join('');
    prompt('“What would you like?”', ['Hello! What would you like?'], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(e.dataset.s); }));
    return choose(els, el => el.dataset.r === '1',
      async el => {
        el.classList.add('right'); FX.good(); await wait(1700); if (!alive(tok)) return;
        sbub('cbub', askFor(x));
        const it = [...document.querySelectorAll('.shopitem')].find(e => e.dataset.w === x);
        if (it) { it.classList.add('right'); await handOver(it, tok); }
        FX.coin();
      },
      async () => { await wait(1700); await SP.say('Hmm? What would you like?', { rate: 0.9 }); },
      els.find(e => e.dataset.r === '1'));
  },
  /* płacenie: dotykaj monet, gra liczy na głos, potem „Pay!" */
  async pay(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Zapłać za zakupy! Dotykaj monet – każda wskakuje na ladę. Gdy będzie ich tyle, ile na cenie, dotknij żółtego przycisku.';
    const num = +lt(w), x = pick(Object.keys(SHOP));
    $('#arena').innerHTML = shopHTML([x], null, { prices: { [x]: num }, tray: true });
    $('#opts').innerHTML = `<div class="purse">${Array.from({ length: 10 }, () => `<button class="coin cbtn" aria-label="moneta"></button>`).join('')}</div>
      <button class="paybtn" id="paybtn" style="visibility:hidden">Pay! ✔</button>`;
    const q = 'The ' + x + ' is ' + coinsTxt(num) + '. Pay ' + coinsTxt(num) + '!';
    prompt(`The ${x} is <em>${num}</em> <span class="coin"></span> Pay!`, [q], tok);
    const tray = $('#tray'), payb = $('#paybtn');
    let cnt = 0, miss = 0, busy = false;
    const reset = () => { cnt = 0; tray.innerHTML = ''; document.querySelectorAll('.cbtn').forEach(c => c.classList.remove('paid')); payb.style.visibility = 'hidden'; };
    const slots = () => { tray.innerHTML = Array.from({ length: Math.max(num, cnt) }, (_, j) => j < cnt ? coinHTML('in') : '<span class="slot"></span>').join(''); };
    return new Promise(res => {
      document.querySelectorAll('.cbtn').forEach(c => c.onclick = async () => {
        if (busy || c.classList.contains('paid') || cnt >= 10) return;
        c.classList.add('paid'); cnt++; FX.coin();
        if (miss >= 2) slots(); else tray.insertAdjacentHTML('beforeend', coinHTML('in'));
        payb.style.visibility = 'visible';
        SP.stop(); SP.say(NUMS[cnt - 1], { rate: 1.1 });
      });
      payb.onclick = async () => {
        if (busy || !cnt) return;
        busy = true; SP.stop();
        if (cnt === num) {
          FX.good(); sparks(center(tray).x, center(tray).y, 12);
          await SP.say(cap(coinsTxt(num)) + '! ' + pick(PRAISE)); if (!alive(tok)) return res(false);
          const it = $('.shopitem'); if (it) { sbub('kbub', 'Thank you!'); await SP.say('Thank you!'); }
          return res(miss === 0);
        }
        miss++; FX.bad(); tray.classList.remove('wrong'); void tray.offsetWidth; tray.classList.add('wrong');
        await SP.say('That is ' + coinsTxt(cnt) + '. ' + q, { rate: 0.9 }); if (!alive(tok)) return res(false);
        reset();
        if (miss >= 3) {                                   // trzecia pomyłka: liczymy razem i idziemy dalej
          await SP.say("Let's count together!");
          const cs = [...document.querySelectorAll('.cbtn')];
          for (let j = 0; j < num; j++) { if (!alive(tok)) return res(false); cs[j].classList.add('paid'); cnt++; slots(); FX.coin(); await SP.say(NUMS[j], { rate: 1.1 }); }
          await SP.say(cap(coinsTxt(num)) + '!'); return res(false);
        }
        if (miss >= 2) slots();
        busy = false;
      };
    });
  },
  /* „How much is the ball?" — znajdź cenę na półce */
  async howmuch(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Ile to kosztuje? Znajdź na półce rzecz, o którą pyta głos, i dotknij jej ceny.';
    const num = +lt(w), items = shuffle(Object.keys(SHOP)).slice(0, 3), x = items[0];
    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(k => k !== num)).slice(0, 2);
    const prices = { [x]: num, [items[1]]: nums[0], [items[2]]: nums[1] };
    $('#arena').innerHTML = shopHTML(shuffle(items), null, { prices });
    const q = 'How much is the ' + x + '?';
    $('#opts').innerHTML = shuffle([num].concat(nums)).map(k => `<button class="opt price" data-n="${k}" aria-label="${coinsTxt(k)}">${k}<span class="coin"></span></button>`).join('');
    prompt(`How much is the ${SHOP[x]}?`, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(coinsTxt(+e.dataset.n)) + '.', { rate: 0.9 }); }));
    return choose(els, el => +el.dataset.n === num,
      async el => {
        el.classList.add('right'); FX.good(); await wait(900);
        const it = [...document.querySelectorAll('.shopitem')].find(e => e.dataset.w === x); if (it) it.classList.add('right');
        await SP.say('Yes! The ' + x + ' is ' + coinsTxt(num) + '.'); FX.coin();
      },
      async () => { await wait(900); await SP.say(q, { rate: 0.9 }); },
      els.find(e => +e.dataset.n === num));
  },
  /* grzeczne słowa: co powie drugi Pokémon? */
  async manners(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Co powinien powiedzieć drugi Pokémon? Dotykaj dymków, żeby usłyszeć zdania, i wybierz grzeczną odpowiedź.';
    const M = MAN[w], kA = manA(w), kB = pick(D.stars.filter(k => k !== kA));
    $('#arena').innerHTML = manHTML(w, kA, kB, false);
    const dis = shuffle(Object.keys(MAN).filter(m => m !== w)).slice(0, 2);
    const opts = shuffle([w].concat(dis));
    $('#opts').innerHTML = opts.map(m => `<button class="opt sent" data-r="${m === w ? 1 : 0}" data-s="${MAN[m].a}" aria-label="${MAN[m].a}"><i>${MAN[m].ic}</i>${MAN[m].a}</button>`).join('');
    prompt(M.say ? M.say + ' ' + M.fx : `“${M.q}”`, [M.say || M.q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(e.dataset.s); }));
    return choose(els, el => el.dataset.r === '1',
      async el => {
        el.classList.add('right'); FX.good(); await wait(1500); if (!alive(tok)) return;
        const ans = $('.bub.ans'); if (ans) ans.style.visibility = 'visible';
        const g = $('.manners .gift'); if (g) { const a = $('.cmon.a'); if (a) await flyFood(g, a, '⚽'); g.remove(); }
        const b = $('.cmon.b'); if (b) { b.classList.remove('hop'); void b.offsetWidth; b.classList.add('hop'); }
        if (M.end) { const q = $('.bub.q'); if (q) q.textContent = M.end; await SP.say(M.end); }
      },
      async () => { await wait(1500); const a = $('.cmon.a'); if (a) { a.classList.remove('wrong'); void a.offsetWidth; a.classList.add('wrong'); } await SP.say('Hmm? ' + (M.say || M.q), { rate: 0.9 }); },
      els.find(e => e.dataset.r === '1'));
  }
});

/* ======================================================================
   ŚWIAT 11: PRZYGODA — kierunki (TPR), porównania „bigger than", zegar
   Id słów z przedrostkami d- (kierunki), c- (porównania), t- (godziny), bo WORD_ISLE jest wspólny.
   ====================================================================== */
const DIRS = { left: ['⬅️', 'Go left!'], right: ['➡️', 'Go right!'], straight: ['⬆️', 'Go straight!'], back: ['⬇️', 'Go back!'] };
const DIR_ORDER = ['straight', 'left', 'right', 'back'];
const LOOT = ['💎', '🎁', '🍎', '⭐', '🗝️', '🍰', '⚽', '🪙'];
const CMP = { bigger: 'smaller', smaller: 'bigger', faster: 'slower', slower: 'faster' };
Object.keys(DIRS).forEach(d => { DISP['d-' + d] = d; });
Object.keys(CMP).forEach(c => { DISP['c-' + c] = c; });
for (let h = 1; h <= 12; h++) DISP['t-' + h] = h + " o'clock";
const oclock = h => NUMS[h - 1] + " o'clock";

/* skrzyżowanie: Pokémon na środku, cztery drogi, na końcach rzeczy do zebrania */
function crossHTML(k, loot) {
  return `<div class="cross">
    <div class="road h"></div><div class="road v"></div>
    ${DIR_ORDER.map(d => `<button class="roadend e-${d}" data-d="${d}" aria-label="${d}"><span class="loot">${loot[d] || ''}</span><span class="arrow">${DIRS[d][0]}</span></button>`).join('')}
    <div class="walker" id="walker">${imgOf(k)}</div>
  </div>`;
}
async function walkTo(d) {
  const w = $('#walker'), end = $('.roadend.e-' + d); if (!w || !end) return;
  const a = center(w), b = center(end);
  w.classList.add('walking'); w.style.transform = `translate(${b.x - a.x}px,${b.y - a.y}px)`;
  if (d === 'left') w.classList.add('faceL');
  FX.whoosh(); await wait(900); w.classList.remove('walking');
  const l = end.querySelector('.loot'); if (l && l.textContent) { l.classList.add('got'); FX.coin(); sparks(b.x, b.y, 10); }
}
/* porównania: pary Pokémonów o wyraźnie różnym wzroście albo szybkości */
function cmpPair(c) {
  if (c === 'faster' || c === 'slower') {
    const f = pick(D.sets.fast), s = pick(D.sets.slow.filter(x => x !== f));
    return c === 'faster' ? [f, s] : [s, f];               // [właściwy, drugi]
  }
  // tylko znane Pokémony: ulubieńcy z D.stars i słynne olbrzymy (dziecko ma je rozpoznać)
  const ks = [...new Set(D.stars.concat(['onix', 'gyarados', 'lapras', 'charizard', 'dragonite', 'wailord', 'steelix', 'snorlax', 'gengar', 'lucario', 'blastoise']))].filter(k => D.pool[k] && P(k).h > 0);
  for (let t = 0; t < 80; t++) {
    const a = pick(ks), b = pick(ks);
    const big = P(a).h >= P(b).h ? a : b, small = big === a ? b : a;
    if (P(big).h >= 2.2 * P(small).h && P(small).h >= 0.2) return c === 'bigger' ? [big, small] : [small, big];
  }
  return c === 'bigger' ? ['snorlax', 'pikachu'] : ['pikachu', 'snorlax'];
}
const thanTxt = (c, a, b) => `${P(a).name} is ${c} than ${P(b).name}.`;
function cmpMonHTML(k, c, other) {
  // wzrost w proporcji (bigger/smaller); szybkość: równe obrazki na bieżni
  let w = 170;
  if (c === 'bigger' || c === 'smaller') { const hm = Math.max(P(k).h, P(other).h); w = Math.max(64, Math.round(230 * Math.pow(P(k).h / hm, 0.75))); }
  return `<button class="mon cmpmon" data-k="${k}" aria-label="${P(k).name}"><img src="${IMG(P(k).id)}" alt="${P(k).name}" style="width:${w}px"><span class="cname">${P(k).name}</span></button>`;
}
/* zegar ze wskazówkami */
function clockHTML(h, cls) {
  return `<div class="clock ${cls || ''}">${Array.from({ length: 12 }, (_, i) => `<span class="cn" style="--a:${(i + 1) * 30}deg">${i + 1}</span>`).join('')}
    <i class="hand hr" style="transform:rotate(${(h % 12) * 30}deg)"></i><i class="hand mn"></i><b class="pin"></b></div>`;
}

Object.assign(TH, {
  way: {
    async teach(w, i, n, tok) {
      const d = lt(w), k = pick(D.stars), loot = { [d]: pick(LOOT) };
      PLHELP = 'Kierunki po angielsku. Posłuchaj, w którą stronę idzie Pokémon, i powtórz polecenie.';
      await teachCard(i, n, tok, {
        word: `${DIRS[d][0]} ${d}`, vis: crossHTML(k, loot), text: DIRS[d][1],
        lines: [cap(d) + '!', async () => { await SP.say(DIRS[d][1]); await walkTo(d); await wait(200); }],
        turnShow: DIRS[d][1], turnSay: DIRS[d][1].replace(/!$/, '')
      });
    }
  },
  compare: {
    async teach(w, i, n, tok) {
      const c = lt(w), [a, b] = cmpPair(c);
      PLHELP = c === 'bigger' || c === 'smaller' ? 'Bigger to większy, smaller to mniejszy. Posłuchaj i powtórz zdanie.' : 'Faster to szybszy, slower to wolniejszy. Posłuchaj i powtórz zdanie.';
      await teachCard(i, n, tok, {
        word: c, vis: `<div class="cmprow">${cmpMonHTML(a, c, b)}${cmpMonHTML(b, c, a)}</div>`, text: thanTxt(c, a, b),
        lines: [cap(c) + '!', async () => { const m = document.querySelector('.cmpmon'); if (m) m.classList.add('pick'); if (c === 'faster' || c === 'slower') race(c === 'faster' ? 0 : 1); await SP.say(thanTxt(c, a, b)); await wait(300); }],
        turnShow: c, turnSay: cap(c)
      });
    }
  },
  clock: {
    async teach(w, i, n, tok) {
      const h = +lt(w);
      PLHELP = "O'clock to pełna godzina. Popatrz na zegar: krótka wskazówka pokazuje godzinę. Posłuchaj i powtórz.";
      await teachCard(i, n, tok, {
        word: `${h} o'clock`, vis: `<div class="clockwrap">${clockHTML(12, 'big spin')}</div>`, text: `It's ${oclock(h)}.`,
        lines: [async () => { const hr = $('.clock .hr'); if (hr) { hr.style.transition = 'transform 1.2s ease-in-out'; void hr.offsetWidth; hr.style.transform = `rotate(${(h % 12) * 30 + (h === 12 ? 360 : 0)}deg)`; } FX.click(); await wait(1300); },
          cap(oclock(h)) + '!', "It's " + oclock(h) + '.'],
        turnShow: oclock(h), turnSay: "It's " + oclock(h)
      });
    }
  }
});
/* wyścig: szybszy Pokémon dobiega pierwszy */
function race(fastIdx) {
  document.querySelectorAll('.cmpmon').forEach((m, j) => {
    m.classList.remove('run'); void m.offsetWidth; m.style.setProperty('--dur', j === fastIdx ? '0.7s' : '2.6s'); m.classList.add('run');
  });
}

Object.assign(GAMES, {
  /* „Go left!" — dotknij drogi, Pokémon idzie */
  async dirgo(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj, w którą stronę ma iść Pokémon, i dotknij tej drogi.';
    const d = lt(w), k = pick(D.stars), loot = {};
    DIR_ORDER.forEach(x => { loot[x] = pick(LOOT); });
    $('#arena').innerHTML = crossHTML(k, loot);
    const q = DIRS[d][1];
    prompt('Where? 👂', [q], tok);
    const els = [...document.querySelectorAll('.roadend')], target = els.find(e => e.dataset.d === d);
    return choose(els, el => el === target,
      async () => { SP.stop(); FX.good(); await walkTo(d); await SP.say('Yes! ' + q); },
      async el => { SP.stop(); await SP.say('That is ' + el.dataset.d + '. ' + q, { rate: 0.9 }); },
      target);
  },
  /* skarb na końcu jednej drogi — dziecko wybiera polecenie dla Pokémona */
  async dirsay(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Skarb leży na końcu jednej drogi. Powiedz Pokémonowi, dokąd iść: dotykaj poleceń, żeby je usłyszeć, i wybierz dobre.';
    const d = lt(w), k = pick(D.stars), dis = shuffle(Object.keys(DIRS).filter(x => x !== d)).slice(0, 2);
    $('#arena').innerHTML = crossHTML(k, { [d]: '🎁' });
    document.querySelectorAll('.roadend').forEach(b => { b.disabled = true; });
    const opts = shuffle([d].concat(dis));
    $('#opts').innerHTML = opts.map(x => `<button class="opt sent" data-d="${x}" data-s="${DIRS[x][1]}" aria-label="${DIRS[x][1]}"><i>${DIRS[x][0]}</i>${DIRS[x][1]}</button>`).join('');
    const q = 'Where is the treasure? Tell ' + P(k).name + '!';
    prompt('Where is the 🎁?', [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(e.dataset.s); }));
    return choose(els, el => el.dataset.d === d,
      async el => { el.classList.add('right'); FX.good(); await wait(1300); if (!alive(tok)) return; await walkTo(d); await SP.say(pick(PRAISE)); },
      async el => { await wait(1300); if (!alive(tok)) return; const x = el.dataset.d; await walkTo(x); await SP.say('Oh no! No treasure there!', { rate: 0.9 }); const ww = $('#walker'); if (ww) { ww.style.transform = ''; ww.classList.remove('faceL'); } },
      els.find(e => e.dataset.d === d));
  },
  /* „Who is bigger, Pikachu or Snorlax?" */
  async cmpwho(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj pytania: kto jest większy, mniejszy, szybszy albo wolniejszy? Dotknij tego Pokémona.';
    const c = lt(w), [a, b] = cmpPair(c), set = shuffle([a, b]);
    $('#arena').innerHTML = `<div class="cmprow ${c === 'faster' || c === 'slower' ? 'track' : ''}">${set.map(k => cmpMonHTML(k, c, k === a ? b : a)).join('')}</div>`;
    const q = `Who is ${c}, ${P(set[0]).name} or ${P(set[1]).name}?`;
    prompt(`Who is <em>${c}</em>?`, [q], tok);
    const els = [...document.querySelectorAll('.cmpmon')], target = els.find(e => e.dataset.k === a);
    return choose(els, el => el === target,
      async el => { SP.stop(); FX.good(); el.classList.add('pick'); if (c === 'faster' || c === 'slower') race(els.indexOf(els.find(e => D.sets.fast.includes(e.dataset.k)))); await SP.say('Yes! ' + thanTxt(c, a, b)); },
      async () => { SP.stop(); await SP.say('No! ' + thanTxt(CMP[c], b, a) + ' ' + q.split(',')[0] + '?', { rate: 0.9 }); },
      target);
  },
  /* „Is Pikachu bigger than Snorlax?" — tak/nie */
  async cmpyes(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj pytania i popatrz na Pokémony. Tak — dotknij 👍. Nie — dotknij 👎.';
    const c = lt(w), [a, b] = cmpPair(c), truth = Math.random() < 0.5, [x, y] = truth ? [a, b] : [b, a];
    $('#arena').innerHTML = `<div class="cmprow ${c === 'faster' || c === 'slower' ? 'track' : ''}">${cmpMonHTML(x, c, y)}${cmpMonHTML(y, c, x)}</div>`;
    document.querySelectorAll('.cmpmon').forEach(m => { m.disabled = true; });
    $('#opts').innerHTML = '<button class="opt yn" data-a="yes" aria-label="yes">👍<small>Yes</small></button><button class="opt yn" data-a="no" aria-label="no">👎<small>No</small></button>';
    const q = `Is ${P(x).name} ${c} than ${P(y).name}?`;
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')], ans = truth ? 'yes' : 'no';
    return choose(els, el => el.dataset.a === ans,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); if (c === 'faster' || c === 'slower') race([...document.querySelectorAll('.cmpmon')].findIndex(e => D.sets.fast.includes(e.dataset.k))); await SP.say((truth ? 'Yes! ' : 'No! ') + thanTxt(c, a, b)); },
      async () => { SP.stop(); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.a === ans));
  },
  /* „It's three o'clock. Find the clock!" */
  async clockpick(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj godziny i dotknij zegara, który ją pokazuje. Krótka wskazówka pokazuje godzinę.';
    const h = +lt(w), hs = shuffle([h].concat(others(w, 2).map(x => +lt(x))));
    $('#arena').innerHTML = `<div class="clockrow">${hs.map(x => `<button class="clockbtn" data-h="${x}" aria-label="zegar">${clockHTML(x)}</button>`).join('')}</div>`;
    const q = "It's " + oclock(h) + '. Find the clock!';
    prompt('Find the clock! 👂', [q], tok);
    const els = [...document.querySelectorAll('.clockbtn')], target = els.find(e => +e.dataset.h === h);
    return choose(els, el => el === target,
      async el => { SP.stop(); FX.good(); el.classList.add('right'); await SP.say("Yes! It's " + oclock(h) + '!'); },
      async el => { SP.stop(); await SP.say("No, it's " + oclock(+el.dataset.h) + '. ' + q, { rate: 0.9 }); },
      target);
  },
  /* „What time is it?" — duży zegar, dziecko wybiera godzinę */
  async clockwhat(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Która godzina? Popatrz na krótką wskazówkę. Dotykaj godzin, żeby je usłyszeć, i wybierz dobrą.';
    const h = +lt(w), hs = shuffle([h].concat(others(w, 2).map(x => +lt(x))));
    $('#arena').innerHTML = `<div class="clockwrap">${clockHTML(h, 'big')}</div>`;
    $('#opts').innerHTML = hs.map(x => `<button class="opt hour" data-h="${x}" aria-label="${oclock(x)}">${x}:00</button>`).join('');
    const q = 'What time is it?';
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(oclock(+e.dataset.h)) + '.', { rate: 0.9 }); }));
    return choose(els, el => +el.dataset.h === h,
      async el => { el.classList.add('right'); FX.good(); await wait(900); await SP.say("Yes! It's " + oclock(h) + '!'); },
      async () => { await wait(900); await SP.say(q, { rate: 0.9 }); },
      els.find(e => +e.dataset.h === h));
  }
});

/* ======================================================================
   ŚWIAT 12: HISTORYJKI — czas przeszły („Yesterday Pikachu jumped."), bajki w przeszłym,
   mówienie do mikrofonu (rozpoznawanie mowy NA MACU: serwer_gry.py /sluch → whisper; nic nie wychodzi do internetu).
   Id słów: y- (czasowniki w przeszłym), v- (słowa do powiedzenia), past1–4 (bajki).
   ====================================================================== */
const PAST = { jump: 'jumped', run: 'ran', sleep: 'slept', fly: 'flew', swim: 'swam', eat: 'ate', dance: 'danced', spin: 'spun' };
Object.keys(PAST).forEach(a => { DISP['y-' + a] = PAST[a]; });
Object.assign(STORIES, {
  past1: { t: "Pikachu's busy day", k: 'pikachu',
    f: [['⏰', 'Yesterday Pikachu woke up early.'], ['🥣', 'Pikachu ate breakfast.'], ['🏫', 'Then Pikachu went to school.'], ['😴', 'At night Pikachu slept.']],
    q: [['What did Pikachu eat?', '🥣', ['🍕', '🍰'], 'Pikachu ate breakfast.'], ['Where did Pikachu go?', '🏫', ['🏖️', '🛒'], 'Pikachu went to school.']] },
  past2: { t: 'Squirtle at the sea', k: 'squirtle',
    f: [['☀️', 'Yesterday it was sunny.'], ['🌊', 'Squirtle swam in the sea.'], ['🦀', 'Squirtle saw a crab.'], ['😊', 'Squirtle was happy.']],
    q: [['What was the weather?', '☀️', ['🌧️', '❄️'], 'It was sunny.'], ['What did Squirtle see?', '🦀', ['🐋', '🦈'], 'Squirtle saw a crab.']] },
  past3: { t: "Eevee's shopping", k: 'eevee',
    f: [['🛒', 'Yesterday Eevee went to the shop.'], ['🍎', 'Eevee bought an apple.'], ['🪙', 'Eevee paid three coins.'], ['🙏', 'Eevee said: Thank you!']],
    q: [['What did Eevee buy?', '🍎', ['🍌', '⚽'], 'Eevee bought an apple.'], ['How many coins did Eevee pay?', '3', ['5', '1'], 'Eevee paid three coins.']] },
  past4: { t: "Snorlax's birthday", k: 'snorlax',
    f: [['🎂', "Yesterday was Snorlax's birthday."], ['🍰', 'Snorlax ate a big cake.'], ['💃', 'Then Snorlax danced.'], ['😴', 'Snorlax was tired and slept.']],
    q: [['What did Snorlax eat?', '🍰', ['🍎', '🍕'], 'Snorlax ate a big cake.'], ['What did Snorlax do at the end?', '😴', ['🏃', '🏊'], 'Snorlax slept at the end.']] }
});
['past1', 'past2', 'past3', 'past4'].forEach(k => { DISP[k] = STORIES[k].t; });
/* słowa do powiedzenia: obrazek, co dziecko mówi, i czego szukamy w rozpoznanym tekście */
const SAY = { hello: ['👋', 'Hello!'], apple: ['🍎', 'Apple!'], red: ['🔴', 'Red!'], dog: ['🐶', 'Dog!'], sun: ['🌞', 'Sun!'], ball: ['⚽', 'Ball!'],
  'thank you': ['🙏', 'Thank you!'], cat: ['🐱', 'Cat!'], pizza: ['🍕', 'I like pizza!'] };
Object.keys(SAY).forEach(v => { DISP['v-' + v] = SAY[v][1]; });

/* zdjęcie „z wczoraj": Pokémon w pętli robi czynność, ramka jak polaroid */
function photoHTML(k, a, cls) {
  return `<button class="photo ${cls || ''}" data-a="${a}" aria-label="zdjęcie"><span class="ptag">📅 Yesterday</span>
    <span class="pact">${ACT[a][0]}</span><div class="mon loop act-${a}">${imgOf(k)}</div></button>`;
}
function wetPhotos() { document.querySelectorAll('.photo .mon.act-swim').forEach(m => wet(m, 0)); }

Object.assign(TH, {
  yesterday: {
    async teach(w, i, n, tok) {
      const a = lt(w), k = pick(D.stars), nm = P(k).name;
      PLHELP = 'Yesterday znaczy wczoraj. Gdy mówimy o tym, co było wczoraj, słowo się zmienia: jumping → jumped. Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: PAST[a], vis: `<div class="photorow">${photoHTML(k, a, 'big')}</div>`,
        text: `Now: ${nm} is ${ACT[a][1]}.<br><b>Yesterday:</b> ${nm} ${PAST[a]}.`,
        lines: [() => { wetPhotos(); }, 'Now ' + nm + ' is ' + ACT[a][1] + '.', 'Yesterday ' + nm + ' ' + PAST[a] + '.', cap(PAST[a]) + '!'],
        turnShow: PAST[a], turnSay: cap(PAST[a])
      });
    }
  },
  storytime: TH.story,
  sayit: {
    async teach(w, i, n, tok) {
      const v = lt(w), k = pick(D.stars);
      PLHELP = 'Na tej wyspie mówisz po angielsku na głos. Posłuchaj słowa i powtórz je głośno i wyraźnie.';
      await teachCard(i, n, tok, {
        word: SAY[v][1], vis: `<span class="big-ic">${SAY[v][0]}</span><div class="mon" id="actmon">${imgOf(k)}</div>`, text: '',
        lines: [SAY[v][1]],
        turnShow: SAY[v][1], turnSay: SAY[v][1].replace(/[!.]$/, '')
      });
    }
  }
});

/* ---------- mikrofon: nagranie 2,5 s → serwer na Macu → tekst ---------- */
const MIC = { ok: () => AUTO && S.settings.mic && navigator.mediaDevices && window.MediaRecorder };
async function recordSay(ms, onStop) {
  const st = await navigator.mediaDevices.getUserMedia({ audio: true });
  try {
    const rec = new MediaRecorder(st), parts = [];
    rec.ondataavailable = e => { if (e.data.size) parts.push(e.data); };
    const done = new Promise(r => { rec.onstop = r; });
    rec.start(); await wait(ms); rec.stop(); await done; if (onStop) onStop();
    const blob = new Blob(parts, { type: rec.mimeType || 'audio/webm' });
    const r = await fetch('/sluch', { method: 'POST', headers: { 'Content-Type': blob.type }, body: blob });
    return r.ok ? (await r.json()).text || '' : '';
  } finally { st.getTracks().forEach(t => t.stop()); }
}
/* łagodne porównanie: słowo w środku wypowiedzi albo podobne (dziecięca wymowa) */
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
function saidOk(heard, target) {
  const nz = s => s.toLowerCase().replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim();
  const h = nz(heard), t = nz(target); if (!h) return false;
  if (h.includes(t)) return true;
  const key = t.split(' ').filter(x => x.length > 2 && !['like'].includes(x)).pop() || t;
  if (h.split(' ').some(x => x === key || (key.length >= 4 && lev(x, key) <= 1))) return true;
  if (lev(h.replace(/ /g, ''), t.replace(/ /g, '')) <= 1) return true;   // „a pole" ≈ „apple"
  return lev(h, t) <= Math.max(1, Math.floor(t.length / 4));
}

Object.assign(GAMES, {
  /* „Yesterday Pikachu slept." — wybierz zdjęcie */
  async pastpick(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj, co Pokémon robił wczoraj, i dotknij właściwego zdjęcia.';
    const a = lt(w), k = pick(D.stars), nm = P(k).name, acts = shuffle([a].concat(others(w, 2).map(lt)));
    $('#arena').innerHTML = `<div class="photorow">${acts.map(x => photoHTML(k, x)).join('')}</div>`; wetPhotos();
    const q = 'Yesterday ' + nm + ' ' + PAST[a] + '.';
    prompt('Yesterday… 👂', [q], tok);
    const els = [...document.querySelectorAll('.photo')], target = els.find(e => e.dataset.a === a);
    return choose(els, el => el === target,
      async el => { SP.stop(); FX.good(); el.classList.add('right'); await SP.say('Yes! ' + q); },
      async el => { SP.stop(); await SP.say('No! In this photo ' + nm + ' ' + PAST[el.dataset.a] + '. ' + q, { rate: 0.9 }); },
      target);
  },
  /* „What did Pikachu do yesterday?" — wybierz zdanie */
  async pastwhat(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Co Pokémon robił wczoraj? Dotykaj zdań, żeby je usłyszeć, i wybierz to, które pasuje do zdjęcia.';
    const a = lt(w), k = pick(D.stars), nm = P(k).name, acts = shuffle([a].concat(others(w, 2).map(lt)));
    $('#arena').innerHTML = `<div class="photorow">${photoHTML(k, a, 'big')}</div>`; wetPhotos();
    document.querySelector('.photo').disabled = true;
    $('#opts').innerHTML = acts.map(x => `<button class="opt sent" data-a="${x}" data-s="${nm} ${PAST[x]}." aria-label="${PAST[x]}"><i>${ACT[x][0]}</i>${nm} ${PAST[x]}.</button>`).join('');
    const q = 'What did ' + nm + ' do yesterday?';
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(e.dataset.s); }));
    return choose(els, el => el.dataset.a === a,
      async el => { el.classList.add('right'); FX.good(); await wait(1300); await SP.say('Yes! Yesterday ' + nm + ' ' + PAST[a] + '!'); },
      async () => { await wait(1300); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.a === a));
  },
  /* mówienie: mikrofon (gdy rodzic włączył) albo „powiedziałem!" */
  async saymic(w, i, n, tok) {
    shell(i, n); bare();
    const v = lt(w), k = pick(D.stars), target = SAY[v][1], mic = MIC.ok();
    PLHELP = mic ? 'Dotknij mikrofonu i powiedz głośno słowo po angielsku. Pokémon posłucha!' : 'Powiedz głośno słowo po angielsku, a potem dotknij zielonego przycisku.';
    $('#arena').innerHTML = `<div class="saybox"><span class="big-ic">${SAY[v][0]}</span><div class="mon" id="actmon">${imgOf(k)}</div></div>`;
    $('#opts').innerHTML = mic ? `<button class="micbtn" id="micbtn" aria-label="mikrofon">🎤<span class="ring"></span></button>`
      : `<button class="saidbtn" id="saidit">✅ I said it!</button>`;
    const q = 'Say: ' + target.replace(/[!.]$/, '') + '!';
    await prompt(`Say: <em>${target}</em>`, [q], tok);
    if (!alive(tok)) return false;
    const mon = $('#actmon');
    if (!mic) {
      await new Promise(r => { $('#saidit').onclick = r; });
      FX.good(); if (mon) actOn(mon, 'jump'); await SP.say(pick(PRAISE)); return true;
    }
    for (let tries = 1; tries <= 3; tries++) {
      const b = $('#micbtn'); if (!b) return false;
      b.disabled = false;
      await new Promise(r => { b.onclick = r; });
      if (!alive(tok)) return false;
      SP.stop(); b.disabled = true; b.classList.add('rec');
      let heard = '';
      try { heard = await recordSay(2600, () => { b.classList.remove('rec'); b.classList.add('think'); }); } catch (e) { heard = ''; }
      b.classList.remove('rec', 'think');
      if (!alive(tok)) return false;
      if (saidOk(heard, target)) {
        FX.good(); sparks(center(b).x, center(b).y, 14); if (mon) actOn(mon, 'jump');
        await SP.say(pick(['Great!', 'Super!', 'Well done!']) + ' ' + target); return tries === 1;
      }
      FX.bad();
      if (tries < 3) await SP.say('Listen: ' + target.replace(/[!.]$/, '') + '. Try again!', { rate: 0.85 });
    }
    await SP.say('Good try! ' + target); return false;
  }
});

/* ======================================================================
   ŚWIAT 13: PODRÓŻE — pojazdy („Pikachu goes by bus."), rodzina („This is my mum."),
   liczba mnoga („one cat → three cats"). Id słów: g- (pojazdy), f- (rodzina), n- (liczba mnoga).
   ====================================================================== */
const GO = { bus: '🚌', train: '🚂', plane: '✈️', boat: '⛵', bike: '🚲', helicopter: '🚁' };
const GOWAY = { bus: 'road', train: 'rails', plane: 'air', boat: 'water', bike: 'road', helicopter: 'air' };
Object.keys(GO).forEach(g => { DISP['g-' + g] = g; });
const FAM = { mum: '👩', dad: '👨', baby: '👶', sister: '👧', brother: '👦', grandma: '👵', grandpa: '👴' };
Object.keys(FAM).forEach(f => { DISP['f-' + f] = f; });
const MANY = { cat: '🐱', dog: '🐶', bird: '🐦', apple: '🍎', ball: '⚽', star: '⭐', car: '🚗', egg: '🥚', duck: '🦆' };
Object.keys(MANY).forEach(x => { DISP['n-' + x] = x + 's'; });
const qty = (x, n) => n === 1 ? 'one ' + x : NUMS[n - 1] + ' ' + x + 's';
const thereQ = (x, n) => n === 1 ? 'Is there one ' + x + '?' : 'Are there ' + qty(x, n) + '?';
const thereIs = (x, n) => (n === 1 ? 'There is ' : 'There are ') + qty(x, n) + '.';

/* pojazd z Pokémonem: droga, tory, niebo albo woda */
function rideHTML(k, g, cls) {
  return `<div class="scene ride way-${GOWAY[g]} ${cls || ''}"><i class="track"></i><i class="cloud c1">☁️</i><i class="cloud c2">☁️</i>
    <div class="veh"><div class="rider">${imgOf(k)}</div><span class="vem">${GO[g]}</span></div></div>`;
}
function drive(root) {
  (root || document).querySelectorAll('.ride .veh').forEach(v => { v.classList.remove('go'); void v.offsetWidth; v.classList.add('go'); });
  FX.whoosh();
}
/* rodzinne zdjęcie: Pokémon („me") i członkowie rodziny */
function famHTML(fs, hi, k, play) {
  return `<div class="famphoto ${play ? 'play' : ''}">${k ? `<div class="fm me"><span class="metag">me</span>${imgOf(k)}</div>` : ''}${fs.map(f =>
    `<button class="scenebtn fm ${f === hi ? 'hi' : ''}" data-w="f-${f}" aria-label="${f}" ${play ? '' : 'disabled'}><span class="fe">${FAM[f]}</span>${play ? '' : `<small>${f}</small>`}</button>`).join('')}</div>`;
}
const knownFam = w => knownWords('family').map(lt);
/* grupka rzeczy do policzenia */
function grpHTML(x, n, cls) {
  return `<div class="scene grp n${n} ${cls || ''}" data-x="${x}" data-n="${n}">${`<span>${MANY[x]}</span>`.repeat(n)}</div>`;
}
const otherN = n => pick([1, 2, 3, 4, 5].filter(m => m !== n));

Object.assign(TH, {
  travel: {
    pic: (w, k, sz) => rideHTML(k, lt(w), sz),
    findQ: w => `Who goes by ${lt(w)}?`,
    ok: (w, nm) => `Yes! ${nm} goes by ${lt(w)}!`, no: (d, w, nm) => `No, ${nm} goes by ${lt(d)}. Who goes by ${lt(w)}?`,
    yn: (w, nm) => `Does ${nm} go by ${lt(w)}?`, yes: (w, nm) => `Yes, it does! ${nm} goes by ${lt(w)}!`,
    nope: (w, s, nm) => `No, it doesn't! ${nm} goes by ${lt(s)}.`,
    pl: ['Posłuchaj, czym jedzie Pokémon, i dotknij właściwego obrazka.'],
    async teach(w, i, n, tok) {
      const g = lt(w), k = pick(D.stars), nm = P(k).name;
      PLHELP = 'Pojazdy po angielsku. „By bus" znaczy „autobusem". Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: `${GO[g]} ${g}`, vis: rideHTML(k, g, 'big'), text: `${nm} goes by ${g}.`,
        lines: [cap(g) + '!', async () => { drive(); await SP.say(nm + ' goes by ' + g + '.'); await wait(300); }],
        turnShow: 'by ' + g, turnSay: 'By ' + g
      });
    }
  },
  family: {
    pic: (w, k, sz) => ecardHTML(FAM[lt(w)], null, sz),
    yn: w => `Is this the ${lt(w)}?`, yes: w => `Yes, it is! This is the ${lt(w)}!`, nope: (w, s) => `No, it isn't! This is the ${lt(s)}.`,
    async teach(w, i, n, tok) {
      const f = lt(w), k = pick(D.stars), fs = [...new Set(knownFam().concat(f))];
      PLHELP = 'Rodzina po angielsku. Pokémon pokazuje swoją rodzinę na zdjęciu. Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: `${FAM[f]} ${f}`, vis: famHTML(fs, f, k), text: `This is my ${f}.`,
        lines: [cap(f) + '!', 'This is my ' + f + '.'],
        turnShow: 'my ' + f, turnSay: 'My ' + f
      });
    }
  },
  many: {
    async teach(w, i, n, tok) {
      const x = lt(w), k = 2 + rnd(4);
      PLHELP = 'Gdy jest więcej niż jedna rzecz, po angielsku dodajemy na końcu „s": one cat, two cats. Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: `${x} → ${x}s`, vis: `<div class="manyrow">${grpHTML(x, 1, 'one')}<b class="arr">➜</b>${grpHTML(x, k)}</div>`,
        text: `One ${x}. ${cap(qty(x, k))}!`,
        lines: ['One ' + x + '.', cap(qty(x, k)) + '!'],
        turnShow: qty(x, k), turnSay: cap(qty(x, k))
      });
    }
  }
});

Object.assign(GAMES, {
  /* „Pikachu goes by train. Find the train!" — dziecko wybiera pojazd, Pokémon odjeżdża */
  async ride(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj, czym pojedzie Pokémon, i dotknij tego pojazdu.';
    const g = lt(w), k = pick(D.stars), nm = P(k).name, opts = shuffle([w].concat(others(w, 2)));
    $('#arena').innerHTML = `<div class="mon solo" id="actmon">${imgOf(k)}</div>`;
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-w="${o}" aria-label="${lt(o)}">${GO[lt(o)]}</button>`).join('');
    const q = `${nm} goes by ${g}. Find the ${g}!`;
    prompt(`${nm} goes by <em>${g}</em>!`, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(art(lt(e.dataset.w))) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.w === w,
      async el => { el.classList.add('right'); FX.good(); await wait(700); $('#arena').innerHTML = rideHTML(k, g, 'big'); drive(); await SP.say(`Yes! ${nm} goes by ${g}!`); await wait(400); },
      async el => { await wait(700); await SP.say(`That is ${art(lt(el.dataset.w))}. Find the ${g}!`, { rate: 0.85 }); },
      els.find(e => e.dataset.w === w));
  },
  /* „How does Pikachu go?" — Pokémon jedzie, dziecko wybiera pojazd */
  async howgo(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Popatrz, czym jedzie Pokémon. Dotykaj znaczków, żeby usłyszeć nazwy, i wybierz dobry.';
    const g = lt(w), k = pick(D.stars), nm = P(k).name, opts = shuffle([w].concat(others(w, 2)));
    $('#arena').innerHTML = rideHTML(k, g, 'big'); drive();
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-w="${o}" aria-label="${lt(o)}">${GO[lt(o)]}</button>`).join('');
    const q = `How does ${nm} go?`;
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say('By ' + lt(e.dataset.w) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.w === w,
      async el => { el.classList.add('right'); FX.good(); await wait(800); drive(); await SP.say(`Yes! ${nm} goes by ${g}!`); },
      async () => { await wait(800); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.w === w));
  },
  /* rodzinne zdjęcie: „Where is the grandma?" */
  async famphoto(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'To zdjęcie rodziny Pokémona. Posłuchaj, kogo szukamy, i dotknij tej osoby.';
    const f = lt(w), k = pick(D.stars);
    let fs = shuffle(knownFam().filter(x => x !== f)).slice(0, 3);
    if (fs.length < 2) fs = shuffle(Object.keys(FAM).filter(x => x !== f)).slice(0, 3);
    fs = shuffle(fs.concat(f));
    $('#arena').innerHTML = famHTML(fs, null, k, true);
    const q = `Where is the ${f}?`;
    prompt(`Where is the <em>${f}</em>?`, [q], tok);
    const els = [...document.querySelectorAll('.fm[data-w]')], target = els.find(e => e.dataset.w === w);
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await SP.say(`Yes! This is the ${f}!`); },
      async el => { SP.stop(); await SP.say(`No, this is the ${lt(el.dataset.w)}. Where is the ${f}?`, { rate: 0.85 }); },
      target);
  },
  /* „Who is this?" — duży obrazek, dziecko wybiera słowo ze słuchu */
  async famwho(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Kto to jest? Dotykaj przycisków, żeby usłyszeć słowa, i wybierz dobre.';
    const f = lt(w), opts = shuffle([f].concat(others(w, 2).map(lt)));
    $('#arena').innerHTML = ecardHTML(FAM[f], null, 'big');
    $('#opts').innerHTML = opts.map(x => `<button class="opt sent" data-f="${x}" aria-label="${x}"><i>🔊</i>the ${x}</button>`).join('');
    const q = 'Who is this?';
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say('The ' + e.dataset.f + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.f === f,
      async el => { el.classList.add('right'); FX.good(); await wait(900); await SP.say(`Yes! This is the ${f}!`); },
      async () => { await wait(900); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.f === f));
  },
  /* „Find three dogs!" — liczba i słowo naraz */
  async manypick(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj, ile i czego szukamy, i dotknij właściwego obrazka. Uważaj: jeden czy wiele?';
    const x = lt(w), k = 1 + rnd(5), y = lt(others(w, 1)[0] || 'n-cat'), m = otherN(k);
    const set = shuffle([[x, k], [x, m], [y === x ? 'dog' : y, k]]);
    $('#arena').innerHTML = `<div class="scenes">${set.map(([a, b]) => `<button class="scenebtn" data-x="${a}" data-n="${b}" aria-label="${qty(a, b)}">${grpHTML(a, b)}</button>`).join('')}</div>`;
    const q = `Find ${qty(x, k)}!`;
    prompt(`Find <em>${qty(x, k)}</em>!`, [q], tok);
    const els = [...document.querySelectorAll('.scenebtn')], target = els.find(e => e.dataset.x === x && +e.dataset.n === k);
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await SP.say(`Yes! ${cap(qty(x, k))}!`); },
      async el => { SP.stop(); await SP.say(`No! ${thereIs(el.dataset.x, +el.dataset.n)} ${q}`, { rate: 0.85 }); },
      target);
  },
  /* „What can you see?" — trzy zdania do wyboru ze słuchu */
  async manysay(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Policz, co widzisz. Dotykaj przycisków, żeby usłyszeć zdania, i wybierz dobre.';
    const x = lt(w), k = 1 + rnd(5), y = lt(others(w, 1)[0] || 'n-dog');
    const opts = shuffle([qty(x, k), qty(x, otherN(k)), qty(y === x ? 'cat' : y, k)]);
    $('#arena').innerHTML = grpHTML(x, k, 'big');
    $('#opts').innerHTML = opts.map(t => `<button class="opt sent" data-t="${t}" aria-label="${t}"><i>🔊</i>${t}</button>`).join('');
    const q = 'What can you see?';
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.t) + '.', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.t === qty(x, k),
      async el => { el.classList.add('right'); FX.good(); await wait(900); await SP.say(`Yes! ${cap(qty(x, k))}!`); },
      async () => { await wait(900); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.t === qty(x, k)));
  },
  /* „Are there three cats?" — tak/nie */
  async manyyes(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj pytania i policz. Tak — dotknij 👍. Nie — dotknij 👎.';
    const x = lt(w), k = 1 + rnd(5), truth = Math.random() < 0.5;
    const [sx, sn] = truth ? [x, k] : (Math.random() < 0.6 ? [x, otherN(k)] : [lt(others(w, 1)[0] || 'n-dog'), k]);
    $('#arena').innerHTML = grpHTML(sx, sn, 'big');
    $('#opts').innerHTML = '<button class="opt yn" data-a="yes" aria-label="yes">👍<small>Yes</small></button><button class="opt yn" data-a="no" aria-label="no">👎<small>No</small></button>';
    const q = thereQ(x, k), ok = sx === x && sn === k, right = ok ? 'yes' : 'no';
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(e.dataset.a === 'yes' ? 'Yes!' : 'No!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.a === right,
      async el => { el.classList.add('right'); FX.good(); await wait(500); await SP.say(ok ? `Yes, there ${k === 1 ? 'is' : 'are'}! ${cap(qty(x, k))}!` : `No! ${thereIs(sx, sn)}`); },
      async () => { await wait(600); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.a === right));
  }
});

/* ======================================================================
   ŚWIAT 14: CUDOWNE WYSPY — gdzie mieszkają Pokémony („Squirtle lives in the sea."),
   hobby („Pikachu likes drawing."), kształty z kolorem i wielkością („a small blue star").
   Id słów: e- (miejsca), h- (hobby), a- (kształty).
   ====================================================================== */
const HAB = { forest: ['🌲', 'in the forest'], sea: ['🌊', 'in the sea'], mountains: ['⛰️', 'in the mountains'],
  volcano: ['🌋', 'near the volcano'], sky: ['☁️', 'in the sky'], snow: ['❄️', 'in the snow'] };
Object.keys(HAB).forEach(h => { DISP['e-' + h] = h; });
const TYPEHAB = { water: 'sea', grass: 'forest', bug: 'forest', rock: 'mountains', ground: 'mountains', fire: 'volcano', flying: 'sky', ice: 'snow' };
const habsOf = k => [...new Set(P(k).types.map(t => TYPEHAB[t]).filter(Boolean))];
/* tylko Pokémony z jednym, oczywistym domem (Charizard: ogień + latanie — odpada) */
const HABMON = {};
(() => {
  const known = [...new Set(D.stars.concat(...Object.values(D.elements), D.flyers))].filter(k => D.pool[k]);
  Object.keys(HAB).forEach(h => {
    let ks = known.filter(k => habsOf(k).length === 1 && habsOf(k)[0] === h);
    if (ks.length < 3) ks = ks.concat(Object.keys(D.pool).filter(k => !ks.includes(k) && habsOf(k).length === 1 && habsOf(k)[0] === h)).slice(0, 6);
    HABMON[h] = ks; MONSX['e-' + h] = ks;
  });
})();
const HABDECO = {
  forest: '<i class="hd t1">🌲</i><i class="hd t2">🌳</i><i class="hd t3">🌲</i>',
  sea: '<i class="hd wave"></i><i class="hd s1">🐚</i>',
  mountains: '<i class="hd m1">⛰️</i><i class="hd m2">🏔️</i>',
  volcano: '<i class="hd v1">🌋</i><i class="hd s1">🔥</i>',
  sky: '<i class="hd c1">☁️</i><i class="hd c2">☁️</i><i class="hd c3">☁️</i>',
  snow: '<i class="hd f1">❄️</i><i class="hd f2">❄️</i><i class="hd s1">⛄</i>'
};
function habHTML(h, k, cls) {
  return `<div class="scene hab hab-${h} ${cls || ''}">${HABDECO[h]}${k ? `<div class="mon">${imgOf(k)}</div>` : ''}</div>`;
}
const HOB = { drawing: ['🎨', 'drawing'], singing: ['🎤', 'singing'], reading: ['📚', 'reading'],
  football: ['⚽', 'playing football'], swimming: ['🏊', 'swimming'], cooking: ['🍳', 'cooking'] };
Object.keys(HOB).forEach(h => { DISP['h-' + h] = h; });
const hob = w => HOB[lt(w)][1];
function hobHTML(k, x, sz) { return `<div class="ecard hob ${sz || ''}"><div class="mon">${imgOf(k)}</div><span class="prop">${HOB[x][0]}</span></div>`; }
const SHP = {
  circle: '<circle cx="50" cy="50" r="42"/>', square: '<rect x="10" y="10" width="80" height="80" rx="6"/>',
  triangle: '<polygon points="50,8 94,88 6,88"/>', star: '<polygon points="50,6 61,38 95,38 67,58 78,92 50,71 22,92 33,58 5,38 39,38"/>',
  heart: '<path d="M50 88C20 66 6 50 6 32C6 18 17 8 30 8C40 8 47 14 50 22C53 14 60 8 70 8C83 8 94 18 94 32C94 50 80 66 50 88Z"/>',
  diamond: '<polygon points="50,5 90,50 50,95 10,50"/>'
};
Object.keys(SHP).forEach(s => { DISP['a-' + s] = s; });
const SHCOL = ['red', 'blue', 'yellow', 'green'];
function shapeSVG(s, c, z) {
  return `<svg class="shp ${z}" viewBox="0 0 100 100" aria-hidden="true"><g fill="${COLHEX[c]}" stroke="#3b3f7a" stroke-width="5" stroke-linejoin="round">${SHP[s]}</g></svg>`;
}
const shBox = (s, c, z, cls) => `<div class="scene shapebox ${cls || ''}">${shapeSVG(s, c, z)}</div>`;
const twoCols = () => shuffle(SHCOL).slice(0, 2);

Object.assign(TH, {
  home: {
    pic: (w, k, sz) => habHTML(lt(w), k, sz),
    findQ: w => `Who lives ${HAB[lt(w)][1]}?`,
    ok: (w, nm) => `Yes! ${nm} lives ${HAB[lt(w)][1]}!`, no: (d, w, nm) => `No, ${nm} lives ${HAB[lt(d)][1]}. Who lives ${HAB[lt(w)][1]}?`,
    yn: (w, nm) => `Does ${nm} live ${HAB[lt(w)][1]}?`, yes: (w, nm) => `Yes, it does! ${nm} lives ${HAB[lt(w)][1]}!`,
    nope: (w, s, nm) => `No, it doesn't! ${nm} lives ${HAB[lt(s)][1]}.`,
    pl: ['Posłuchaj, gdzie mieszka Pokémon, i dotknij właściwego obrazka.'],
    async teach(w, i, n, tok) {
      const h = lt(w), k = pick(HABMON[h]), nm = P(k).name;
      PLHELP = 'Gdzie mieszkają Pokémony? Wodne w morzu, ogniste przy wulkanie, trawiaste w lesie. Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: `${HAB[h][0]} ${h}`, vis: habHTML(h, k, 'big'), text: `${nm} lives ${HAB[h][1]}.`,
        lines: [cap(h) + '!', nm + ' lives ' + HAB[h][1] + '.'],
        turnShow: HAB[h][1], turnSay: cap(HAB[h][1])
      });
    }
  },
  hobby: {
    pic: (w, k, sz) => hobHTML(k, lt(w), sz), ic: w => HOB[lt(w)][0],
    learn: (w, ex) => ({ vis: hobHTML(ex[0], lt(w), 'big'), s: `${P(ex[0]).name} likes ${hob(w)}.`, turn: `I like ${hob(w)}` }),
    findQ: w => `Who likes ${hob(w)}?`, whatQ: (nm, w) => `${nm} likes ${hob(w)}. What does ${nm} like?`,
    optPic: (w, k) => `<div class="mon solo">${imgOf(k)}</div><span class="qmark">💭</span>`,
    ok: (w, nm) => `Yes! ${nm} likes ${hob(w)}!`, no: (d, w, nm) => `No, ${nm} likes ${hob(d)}. Who likes ${hob(w)}?`,
    yn: (w, nm) => `Does ${nm} like ${hob(w)}?`, yes: (w, nm) => `Yes, it does! ${nm} likes ${hob(w)}!`,
    nope: (w, s, nm) => `No, it doesn't! ${nm} likes ${hob(s)}.`,
    pl: ['Posłuchaj, co lubi robić Pokémon, i dotknij właściwego obrazka.', 'Posłuchaj, co lubi Pokémon, i dotknij właściwego znaczka.']
  },
  shapes: {
    async teach(w, i, n, tok) {
      const s = lt(w), [c1, c2] = twoCols();
      PLHELP = 'Kształty po angielsku. Najpierw mówimy, jaki jest — duży czy mały, potem kolor, na końcu kształt: a big red circle. Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: s, vis: `<div class="scene shapebox teach">${shapeSVG(s, c1, 'big')}${shapeSVG(s, c2, 'small')}</div>`,
        text: `A big ${c1} ${s}.<br>A small ${c2} ${s}.`,
        lines: [cap(s) + '!', `A big ${c1} ${s}.`, `A small ${c2} ${s}.`],
        turnShow: `a big ${c1} ${s}`, turnSay: `A big ${c1} ${s}`
      });
    }
  }
});

Object.assign(GAMES, {
  /* „Where does Squirtle live?" — dziecko wybiera dom Pokémona */
  async habgo(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Gdzie mieszka ten Pokémon? Dotykaj znaczków, żeby usłyszeć miejsca, i wybierz dobre.';
    const h = lt(w), k = pick(HABMON[h]), nm = P(k).name, opts = shuffle([w].concat(others(w, 2)));
    $('#arena').innerHTML = `<div class="mon solo" id="actmon">${imgOf(k)}</div>`;
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-w="${o}" aria-label="${lt(o)}">${HAB[lt(o)][0]}</button>`).join('');
    const q = `Where does ${nm} live?`;
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(HAB[lt(e.dataset.w)][1]) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.w === w,
      async el => { el.classList.add('right'); FX.good(); await wait(800); $('#arena').innerHTML = habHTML(h, k, 'big pop'); await SP.say(`Yes! ${nm} lives ${HAB[h][1]}!`); await wait(300); },
      async el => { await wait(800); await SP.say(`No! ${nm} doesn't live ${HAB[lt(el.dataset.w)][1]}. ${q}`, { rate: 0.85 }); },
      els.find(e => e.dataset.w === w));
  },
  /* „Find the star!" — sam kształt */
  async shapefind(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj nazwy kształtu i dotknij go.';
    const s = lt(w), opts = shuffle([s].concat(others(w, 2).map(lt)));
    $('#arena').innerHTML = `<div class="scenes">${opts.map(o => `<button class="scenebtn" data-s="${o}" aria-label="${o}">${shBox(o, pick(SHCOL), 'big')}</button>`).join('')}</div>`;
    const q = `Find the ${s}!`;
    prompt(`Find the <em>${s}</em>!`, [q], tok);
    const els = [...document.querySelectorAll('.scenebtn')], target = els.find(e => e.dataset.s === s);
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await SP.say(`Yes! It is a ${s}!`); },
      async el => { SP.stop(); await SP.say(`No, that is a ${el.dataset.s}. ${q}`, { rate: 0.85 }); },
      target);
  },
  /* „Find the small blue star!" — wielkość + kolor + kształt */
  async descpick(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj uważnie: duży czy mały, jaki kolor i jaki kształt? Dotknij właściwego.';
    const s = lt(w), [c1, c2] = twoCols(), set = shuffle([['big', c1], ['small', c1], ['big', c2], ['small', c2]]), [z, c] = pick(set);
    $('#arena').innerHTML = `<div class="scenes four">${set.map(([a, b]) => `<button class="scenebtn" data-z="${a}" data-c="${b}" aria-label="${a} ${b} ${s}">${shBox(s, b, a)}</button>`).join('')}</div>`;
    const q = `Find the ${z} ${c} ${s}!`;
    prompt(`Find the <em>${z} ${c}</em> ${s}!`, [q], tok);
    const els = [...document.querySelectorAll('.scenebtn')], target = els.find(e => e.dataset.z === z && e.dataset.c === c);
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await SP.say(`Yes! The ${z} ${c} ${s}!`); },
      async el => { SP.stop(); await SP.say(`No, that is the ${el.dataset.z} ${el.dataset.c} ${s}. ${q}`, { rate: 0.85 }); },
      target);
  },
  /* „What is it?" — trzy opisy do wyboru ze słuchu */
  async descsay(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Co to jest? Dotykaj przycisków, żeby usłyszeć opisy, i wybierz dobry.';
    const s = lt(w), [c1, c2] = twoCols(), z = pick(['big', 'small']), zz = z === 'big' ? 'small' : 'big';
    const good = `a ${z} ${c1} ${s}`, opts = shuffle([good, `a ${zz} ${c1} ${s}`, `a ${z} ${c2} ${s}`]);
    $('#arena').innerHTML = shBox(s, c1, z, 'big');
    $('#opts').innerHTML = opts.map(t => `<button class="opt sent" data-t="${t}" aria-label="${t}"><i>🔊</i>${t}</button>`).join('');
    const q = 'What is it?';
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.t) + '.', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.t === good,
      async el => { el.classList.add('right'); FX.good(); await wait(900); await SP.say(`Yes! It is ${good}!`); },
      async () => { await wait(900); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.t === good));
  }
});

/* ---------- trening dnia: mieszanka słów, które czekają na powtórkę ---------- */
const dueWords = () => Object.keys(S.words).filter(w => isDue(w) && WORD_ISLE[w])
  .sort((a, b) => (rec(a).box - rec(b).box) || (rec(a).due - rec(b).due));
const dailyDone = () => S.daily && S.daily.day === today();
async function dailyRun(tok) {
  setWorld(0);
  // przy dużych zaległościach trening dnia jest dłuższy: 12 słów w 14 zadaniach zamiast 8 w 10
  const big = dueWords().length > 40, words = dueWords().slice(0, big ? 12 : 8);
  const ok = await practice(null, words.length >= 3 ? words : shuffle(Object.keys(S.words).filter(w => WORD_ISLE[w])).slice(0, 6), big ? 14 : 10, tok, 'Daily training!');
  if (!alive(tok)) return;
  const d = S.daily || { day: -1, streak: 0 };
  S.daily = { day: today(), streak: d.day === today() - 1 ? d.streak + 1 : d.day === today() ? d.streak : 1 };
  save();
  await bannerScreen('Well done!', 'You got ' + ok + ' stars. ' + (S.daily.streak > 1 ? 'You trained ' + S.daily.streak + ' days in a row!' : 'Come back tomorrow!'), tok, 900);
  if (!alive(tok)) return;
  await wildCatch(D.stars, tok);
}

/* ---------- sceny świata 2 ---------- */
function bare() { const a = $('#arena'); if (a) a.classList.add('bare'); }
function sceneHTML(w, k, size) {
  return `<div class="scene wx-${w} ${size || ''}"><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="ground"></i>
    <div class="mon"><img src="${IMG(P(k).id)}" alt="${P(k).name}"></div></div>`;
}
/* stół i pudełko: on / under / next to — stół, in — pudełko */
function whereHTML(k, pos, size, spots) {
  return `<div class="where ${size || ''}"><i class="floor"></i><i class="wall"></i>
    <div class="tbl"><i class="top"></i><i class="leg l"></i><i class="leg r"></i></div>
    <div class="box"><i class="back"></i><i class="front"></i></div>
    ${spots ? Object.keys(WHERE).map(p => `<button class="spot" data-w="${p}" data-at="${p}" aria-label="${p}"></button>`).join('') : ''}
    <div class="wmon" data-at="${pos}"><img src="${IMG(P(k).id)}" alt="${P(k).name}"></div></div>`;
}
/* jedzenie leci do Pokémona (miss=true: odbija się i spada) */
function flyFood(fromEl, toEl, emoji, miss) {
  const a = center(fromEl), b = center(toEl);
  const f = document.createElement('div'); f.className = 'flyfood'; f.textContent = emoji;
  f.style.left = a.x - 30 + 'px'; f.style.top = a.y - 30 + 'px'; document.body.appendChild(f);
  void f.offsetWidth;
  f.style.transform = `translate(${b.x - a.x}px,${b.y - a.y - 20}px) scale(${miss ? 1 : 0.35})`;
  FX.whoosh();
  return wait(560).then(() => {
    if (miss) { f.style.transition = 'transform .5s ease-in,opacity .5s'; f.style.transform += ' translate(120px,160px) rotate(200deg)'; f.style.opacity = '0'; setTimeout(() => f.remove(), 520); }
    else { f.remove(); FX.pop(); }
  });
}
/* symbole uczuć i czynności wracają w pętli, dopóki zadanie trwa */
function loopFx(els, words, tok) {
  const go1 = () => els.forEach((el, j) => { if (!el.classList.contains('gone')) fxOn(el, words[j]); });
  setTimeout(go1, 300);
  const t = setInterval(() => { if (!alive(tok) || !document.body.contains(els[0])) return clearInterval(t); go1(); }, 2000);
}
/* wykonanie ruchu przez Pokémona (+ dodatki: Zzz, jabłko, bąbelki; pływanie — w wodzie) */
function actOn(mon, w, noFx) {
  Object.keys(ACT).forEach(a => mon.classList.remove('act-' + a));
  void mon.offsetWidth; mon.classList.add('act-' + w);
  if (w === 'swim') wet(mon, 2000);
  if (!noFx) fxOn(mon, w);
  setTimeout(() => mon.classList.remove('act-' + w), 1900);
}
/* woda wokół Pokémona: fale z przodu, Pokémon zanurzony do połowy (ms=0: na stałe) */
function wet(mon, ms) {
  let wt = $('.water', mon);
  if (!wt) { wt = document.createElement('span'); wt.className = 'water'; wt.innerHTML = '<i></i>'; mon.appendChild(wt); }
  wt.classList.remove('out'); mon.classList.add('wet');
  splash(mon);
  clearTimeout(mon._wet);
  if (ms) mon._wet = setTimeout(() => { wt.classList.add('out'); setTimeout(() => { if (wt.classList.contains('out')) { wt.remove(); mon.classList.remove('wet'); } }, 380); }, ms);
}
function splash(mon) {
  const host = mon.closest('.arena,.vis') || mon.parentElement, r = mon.getBoundingClientRect(), hr = host.getBoundingClientRect();
  for (let j = 0; j < 6; j++) {
    const e = document.createElement('span'); e.className = 'drop';
    e.style.left = (r.left - hr.left + r.width * (0.15 + 0.14 * j)) + 'px'; e.style.top = (r.top - hr.top + r.height * 0.55) + 'px';
    e.style.setProperty('--dx', (j - 2.5) * 22 + 'px'); e.style.animationDelay = j * 0.03 + 's';
    host.appendChild(e); setTimeout(() => e.remove(), 900);
  }
}
const FXSYM = { sleep: ['💤', 'zzz', 1], eat: ['🍎', 'apple', 1], swim: ['🫧', 'bubble', 4],
  happy: ['💖', 'heart', 3], sad: ['💧', 'tear', 2], angry: ['💢', 'puff', 2], scared: ['💦', 'sweat', 2],
  tired: ['💤', 'zzz', 1], hungry: ['🍽️', 'puff', 1] };
function fxOn(mon, w) {
  const fx = FXSYM[w]; if (!fx) return;
  const host = mon.closest('.arena,.vis') || mon.parentElement, r = mon.getBoundingClientRect(), hr = host.getBoundingClientRect();
  for (let j = 0; j < fx[2]; j++) {
    const e = document.createElement('span'); e.className = 'fx ' + fx[1]; e.textContent = fx[0];
    const xs = { bubble: 0.2 + 0.2 * j, heart: 0.2 + 0.3 * j, tear: 0.32 + 0.3 * j, sweat: j ? 0.85 : 0.05, puff: j ? 0.8 : 0.1 }[fx[1]];
    e.style.left = (r.left - hr.left + r.width * (xs === undefined ? 0.6 : xs) - 14) + 'px';
    e.style.top = (r.top - hr.top + r.height * (fx[1] === 'bubble' ? 0.5 : fx[1] === 'tear' ? 0.35 : 0.2)) + 'px';
    e.style.animationDelay = j * 0.25 + 's';
    host.appendChild(e); setTimeout(() => e.remove(), 2200);
  }
}

/* ======================================================================
   NAGRODY
   ====================================================================== */
async function bannerScreen(big, small, tok, ms) {
  app.innerHTML = hud() + `<div class="play" style="justify-content:center"><div class="banner">${big}</div>
    ${small ? `<p class="learn sentence" style="max-width:520px">${small}</p>` : ''}</div>`;
  wireHud(); FX.pop();
  await SP.say(big.replace(/!$/, '') + '! ' + (small || ''));
  if (alive(tok)) await wait(ms || 400);
}
/* opis po angielsku — tylko proste zdania ze słówek, które dziecko zna lub zaraz pozna */
function describe(id) {
  const m = DEX[id]; if (!m) return '';
  const k = KEY_OF[id], out = ['This is ' + m.name + '.'];
  const col = k && Object.keys(D.colours).find(c => D.colours[c].includes(k)); if (col) out.push('It is ' + col + '.');
  if (m.h <= 0.4) out.push('It is small.'); else if (m.h >= 2) out.push('It is big.');
  out.push('It is ' + art(m.types[0]) + ' Pokémon.');
  if (k && D.flyers.includes(k)) out.push('It can fly.');
  if (k && D.swimmers.includes(k)) out.push('It can swim.');
  if (m.leg) out.push(m.leg === 2 ? 'It is a mythical Pokémon!' : 'It is a legendary Pokémon!');
  else if (RARE.includes(id)) out.push('It is a very rare Pokémon!');
  else out.push('It lives in ' + REGIONS[m.gen - 1] + '.');
  return out.join(' ');
}
/* albumy: postęp i medale (¼, ½, ¾, cały) */
const albumIds = g => g === 'L' ? LEGEND_IDS : ALBUM[g];
const albumName = g => g === 'L' ? 'Legends' : REGIONS[g - 1];
const albumHave = g => albumIds(g).filter(has).length;
function medal(g) {
  const p = albumHave(g) / albumIds(g).length;
  return p >= 1 ? '🏆' : p >= 0.75 ? '🥇' : p >= 0.5 ? '🥈' : p >= 0.25 ? '🥉' : '';
}
function activeAlbum() {
  // wybrany album; gdy pełny — następny niepełny
  for (let d = 0; d < 9; d++) { const g = (S.album - 1 + d) % 9 + 1; if (albumHave(g) < albumIds(g).length) return g; }
  return S.album;
}
/* Nagroda bez powtórek: Pokémon, którego dziecko jeszcze nie ma.
   Najpierw pasujący do słówek z lekcji (z bieżącego albumu, czasem z innego), potem cały bieżący album. */
function rewardFor(prefer) {
  const g = activeAlbum();
  const fresh = ids => ids.filter(id => DEX[id] && !has(id) && !DEX[id].leg);
  const pref = fresh([...new Set((prefer || []).map(k => P(k) && P(k).id))]);
  const inAlbum = pref.filter(id => DEX[id].gen === g);
  if (inAlbum.length) return pick(inAlbum);
  if (pref.length && Math.random() < 0.3) return pick(pref);
  const a = fresh(albumIds(g)); if (a.length) return pick(a);
  const any = fresh(Object.keys(DEX).map(Number)); if (any.length) return pick(any);
  return pick(Object.keys(DEX).map(Number));
}
/* gdy wszystkie legendy są już w albumie: liga daje bardzo rzadkie, silne Pokémony (pseudolegendy),
   a potem nowego Pokémona z albumu — nigdy powtórki, z kolekcji nic nie ubywa */
const RARE = [149, 248, 373, 376, 445, 635, 706, 784, 887, 998];
const allLegends = () => LEGEND_IDS.every(has);
const nextLegend = () => LEGEND_IDS.find(id => !has(id)) || RARE.find(id => !has(id)) || 0;

/* dziki Pokémon do złapania */
async function wildCatch(prefer, tok, legendId) {
  const id = legendId || rewardFor(prefer), mon = DEX[id];
  const g = mon.leg ? 'L' : mon.gen, before = albumHave(g), isNew = !has(id);
  PLHELP = 'Dotknij Poké Balla, żeby złapać Pokémona!';
  app.innerHTML = hud() + `<div class="play" style="justify-content:center">
    <div class="banner" style="font-size:clamp(28px,5.5vw,46px)">A wild ${mon.name} appeared!</div>
    <div class="wild"><div class="arena ${mon.leg ? 'legend' : ''}" id="arena" style="min-height:260px">
      <button class="mon solo" id="wildmon"><img src="${IMG(id)}" alt="${mon.name}"><span class="shadow"></span></button></div>
      <button class="throw" id="throw" aria-label="Rzuć Poké Ball"></button></div></div>`;
  wireHud();
  FX.pop(); await SP.say('A wild ' + mon.name + ' appeared! Tap the Poké Ball!'); if (!alive(tok)) return;
  await new Promise(res => { $('#throw').onclick = () => { $('#throw').style.visibility = 'hidden'; res(); }; });
  await throwBall($('#wildmon'), true); if (!alive(tok)) return;
  confetti(60); FX.fanfare();
  if (isNew) { S.dex.push(id); S.fresh.push(id); }
  const k = KEY_OF[id]; if (k && !S.caught.includes(k)) S.caught.push(k);
  if (mon.leg && !S.caught.includes('L' + id)) S.caught.push('L' + id);
  save();
  const now = albumHave(g), total = albumIds(g).length;
  const txt = describe(id);
  app.innerHTML = hud() + `<div class="play" style="justify-content:center"><div class="banner">Gotcha!</div>
    <div class="learn cardmon">${isNew ? '<span class="newtag">NEW!</span>' : ''}<img src="${IMG(id)}" alt=""><p class="desc">${txt}</p>
    <div class="albumbar"><span>📕 ${albumName(g)}</span><div class="bar"><i style="width:${before / total * 100}%"></i></div>
      <b id="acount">${before} / ${total}</b><span class="medal">${medal(g)}</span></div>
    <button class="next" id="nx">▶</button></div></div>`;
  wireHud();
  // pasek albumu rośnie na oczach dziecka — widać, że kolekcja się zapełnia
  setTimeout(() => {
    const i = $('.albumbar i'); if (i) i.style.width = now / total * 100 + '%';
    const c = $('#acount'); if (c) c.textContent = now + ' / ' + total;
    const md = $('.albumbar .medal'); if (md) md.textContent = medal(g);
    if (c) { FX.pop(); sparks(center(c).x, center(c).y, 8); }
  }, 900);
  await SP.say('Gotcha! ' + mon.name + ' was caught!'); if (!alive(tok)) return;
  const q = [0.25, 0.5, 0.75, 1].find(p => before < p * total && now >= p * total);
  if (q) {                                      // nowy medal albumu
    confetti(90); FX.fanfare();
    toast(q === 1 ? '🏆 Album ' + albumName(g) + ' jest pełny!' : medal(g) + ' Nowy medal: album ' + albumName(g) + '!', 4000);
    await SP.say(q === 1 ? 'Amazing! The ' + albumName(g) + ' album is full!' : 'You got a new medal for the ' + albumName(g) + ' album!');
    if (!alive(tok)) return;
  } else if (now % 10 === 0) {
    await SP.say('Wow! ' + now + ' Pokémon in the ' + albumName(g) + ' album!'); if (!alive(tok)) return;
  }
  await SP.say(txt);
  await new Promise(res => { $('#nx').onclick = () => { FX.tap(); res(); }; });
  go(showMap);
}
async function badge(I, tok) {
  S.badges.push(I.id); save();
  app.innerHTML = hud() + `<div class="play" style="justify-content:center">
    <div class="banner">You got the ${I.en} Badge!</div>
    <div class="isle w${I.world}" style="width:220px;pointer-events:none"><span class="ic">${I.ic}</span><b>${I.en}</b>
      <span class="badge" style="width:84px;height:84px;font-size:44px">${BADGE(I.id)}</span></div>
    <button class="next" id="nx">▶</button></div>`;
  wireHud(); confetti(110); FX.fanfare();
  await SP.say('Wow! You got the ' + I.en + ' badge! ' + (I.final ? 'You are a ' + I.en + '!' : 'A new island is open!'));
  await new Promise(res => { $('#nx').onclick = () => { FX.tap(); res(); }; });
}
/* Liga Mistrzów (świat 1) i Liga Arcymistrzów (świat 2): mieszanka słów ze świata, 9 z 12 = legenda.
   Legend jest 94, więc każda wygrana daje nową. */
async function championRun(I, tok) {
  const pool = Object.keys(S.words).filter(w => S.words[w].seen > 0 && WORD_ISLE[w] && isleOf(WORD_ISLE[w]).world <= I.world);
  const fb = I.world === 1 ? ['red', 'one', 'big', 'fire', 'jump'] : ['sunny', 'happy', 'apple', 'on'];
  const ok = await practice(I, pool.length >= 4 ? pool : fb, 12, tok, I.en + ' League!');
  if (!alive(tok)) return;
  if (ok >= 9 && !S.badges.includes(I.id)) { await badge(I, tok); if (!alive(tok)) return; }
  if (ok >= 9) await wildCatch([], tok, nextLegend() || undefined);
  else { await bannerScreen('Great battle!', 'You got ' + ok + ' stars. Get 9 to meet ' + (allLegends() ? 'a very rare' : 'a legendary') + ' Pokémon!', tok); go(showMap); }
}

/* ======================================================================
   KOLEKCJA: albumy regionów + legendy
   ====================================================================== */
function showCollection(g) {
  g = g || (S.fresh.length ? (DEX[S.fresh[S.fresh.length - 1]].leg ? 'L' : DEX[S.fresh[S.fresh.length - 1]].gen) : activeAlbum());
  PLHELP = 'To są Twoje albumy. Dotknij regionu, żeby zobaczyć jego Pokémony. Dotknij złapanego Pokémona, a powie Ci po angielsku, jaki jest. Przycisk z tarczą wybiera album, z którego przychodzą nowe Pokémony.';
  const ids = albumIds(g), have = albumHave(g), act = activeAlbum();
  const tabs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'L'].map(a => {
    const n = albumHave(a), t = albumIds(a).length;
    return `<button class="atab ${a === g ? 'on' : ''}" data-a="${a}">
      <b>${a === 'L' ? '⭐ ' : ''}${albumName(a)}${a === act ? ' 🎯' : ''}</b>
      <span class="mini"><i style="width:${n / t * 100}%"></i></span><small>${n}/${t} ${medal(a)}</small></button>`;
  }).join('');
  const fresh = new Set(S.fresh);
  app.innerHTML = hud() + `<div class="head"><h2>📕 My Pokémon</h2><span class="chip" style="font-size:18px">${S.dex.length} / ${D.dex.length}</span></div>
    <div class="teambar"><b>⭐ My team</b>${[0, 1, 2].map(j => S.team[j] ? `<button class="tslot" data-id="${S.team[j]}"><img src="${IMG(S.team[j])}" alt=""><span>${DEX[S.team[j]].name}</span><em>Lv ${TEAMLV(S.team[j])}${evoInfo(S.team[j]) ? ' · ✨' + evoInfo(S.team[j]).lv : ''}</em></button>`
      : '<span class="tslot empty">＋</span>').join('')}<small>Dotknij Pokémona w albumie, żeby dodać go do drużyny.</small></div>
    <div class="atabs">${tabs}</div>
    <div class="albumhead">
      <div class="albumbar big"><span>${albumName(g)}</span><div class="bar"><i style="width:${have / ids.length * 100}%"></i></div><b>${have} / ${ids.length}</b><span class="medal">${medal(g)}</span></div>
      ${g !== 'L' ? (g === act ? '<span class="chip target">🎯 New Pokémon come from here</span>'
        : `<button class="pbtn target" id="setalb">🎯 Catch Pokémon from ${albumName(g)}</button>`) : '<span class="chip target">Win a League to meet a legend!</span>'}
    </div>
    <div class="collection">${ids.map(id => has(id)
      ? `<button class="slot ${fresh.has(id) ? 'isnew' : ''}" data-id="${id}"><img src="${IMG(id)}" alt="" loading="lazy"><span>${DEX[id].name}</span>${fresh.has(id) ? '<em>NEW!</em>' : ''}</button>`
      : `<div class="slot empty"><img src="${IMG(id)}" alt="" loading="lazy"><span>#${String(id).padStart(3, '0')}</span></div>`).join('')}</div>`;
  wireHud();
  // obejrzane = już nie „nowe" (przy następnym wejściu)
  S.fresh = S.fresh.filter(id => !ids.includes(id)); save();
  const at = $('.atab.on'); if (at) at.scrollIntoView({ inline: 'center', block: 'nearest' });
  document.querySelectorAll('.atab').forEach(b => b.onclick = () => {
    FX.tap(); const a = b.dataset.a === 'L' ? 'L' : +b.dataset.a; showCollection(a);
    SP.say(albumName(a) + '!');
  });
  const sa = $('#setalb'); if (sa) sa.onclick = () => { FX.good(); S.album = g; save(); showCollection(g); SP.say('Okay! New Pokémon will come from ' + albumName(g) + '!'); };
  document.querySelectorAll('.slot[data-id], .tslot[data-id]').forEach(b => b.onclick = () => {
    FX.tap();
    const id = +b.dataset.id, mon = DEX[id], txt = describe(id), inT = S.team.includes(id);
    const m = modal(`<div class="cardmon"><img src="${IMG(id)}" alt=""><h3>${mon.name}${inT ? ' · Lv ' + TEAMLV(id) : ''}</h3><p class="desc">${txt}</p>
      ${evoInfo(id) ? `<p class="evohint">✨ ${inT ? 'Ewoluuje na poziomie ' + evoInfo(id).lv : 'Może ewoluować — dodaj do drużyny, ewoluuje na poziomie ' + evoInfo(id).lv}: ${evoInfo(id).to.map(t => DEX[t].name).join(' / ')}</p>` : inT ? '<p class="evohint">To ostatnia forma — już nie ewoluuje.</p>' : ''}
      <div style="display:flex;gap:12px;justify-content:center;align-items:center;margin-top:10px"><button class="say" id="msay">🔊</button>
      <button class="pbtn teambtn" id="mteam">${inT ? '✕ Leave my team' : S.team.length >= 3 ? '⭐ Team is full' : '⭐ Join my team!'}</button></div></div>`);
    $('#msay').onclick = () => { SP.stop(); SP.say(txt); };
    $('#mteam').onclick = () => {
      if (inT) { S.team = S.team.filter(x => x !== id); save(); FX.tap(); }
      else if (S.team.length >= 3) { FX.bad(); SP.stop(); SP.say('Your team is full!'); return; }
      else { S.team.push(id); save(); FX.fanfare(); confetti(40); SP.stop(); SP.say(mon.name + ' joined your team!'); }
      m.remove(); showCollection(g);
    };
    SP.say(txt);
  });
}
function modal(html) {
  const m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div class="sheet"><button class="iconbtn x" aria-label="Zamknij">✕</button>${html}</div>`;
  document.body.appendChild(m);
  const close = () => { SP.stop(); m.remove(); };
  m.onclick = e => { if (e.target === m) close(); };
  $('.x', m).onclick = close;
  return m;
}

/* ======================================================================
   PANEL RODZICA (po polsku)
   ====================================================================== */
/* raport dla rodzica: ostatnie 7 dni + co dziecko zna pewnie, a co mu umyka */
function reportHTML() {
  const t = today(), days = Array.from({ length: 7 }, (_, k) => t - k);
  const L = days.map(d => S.log[d] || [0, 0, 0]);
  const played = L.filter(x => x[0] + x[1] > 0).length, ok = L.reduce((a, x) => a + x[0], 0), bad = L.reduce((a, x) => a + x[1], 0), nw = L.reduce((a, x) => a + x[2], 0);
  const seen = Object.keys(S.words).filter(w => S.words[w].seen > 0 && WORD_ISLE[w]);
  const sure = seen.filter(w => S.words[w].box >= 3), due = seen.filter(isDue);
  const weak = seen.filter(w => S.words[w].seen >= 2).map(w => { const r = S.words[w]; return [w, (r.bad + 1) / (r.ok + r.bad + 2)]; })
    .filter(x => x[1] > 0.25).sort((a, b) => b[1] - a[1]).slice(0, 10).map(x => x[0]);
  const pl = (n, a, b, c) => n + ' ' + (n === 1 ? a : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? b : c);
  const firstLog = Math.min(...Object.keys(S.log).map(Number).concat([t]));
  const bars = days.slice().reverse().map(d => { const x = S.log[d] || [0, 0, 0], n = x[0] + x[1];
    return `<i title="${n}" style="height:${Math.min(100, n / 3)}%"></i>`; }).join('');
  return `<div class="report"><h4>📊 Ostatnie 7 dni</h4>
    ${firstLog > t - 6 ? `<p class="small">Dziennik gry zbieramy od ${new Date(firstLog * 86400000).toLocaleDateString('pl-PL')} — pełny tydzień będzie widać za kilka dni.</p>` : ''}
    <div class="rbars">${bars}</div>
    <ul>
      <li><b>${pl(played, 'dzień', 'dni', 'dni')}</b> z grą, <b>${pl(ok + bad, 'odpowiedź', 'odpowiedzi', 'odpowiedzi')}</b>${ok + bad ? `, z tego dobrych <b>${Math.round(100 * ok / (ok + bad))}%</b>` : ''}</li>
      <li>Nowe słowa: <b>${nw}</b></li>
      <li>Zna pewnie (powtórzone w różne dni): <b>${sure.length}</b> z ${seen.length} słów</li>
      <li>Czeka na powtórkę: <b>${due.length}</b>${due.length > 40 ? ' — trening dnia na mapie nadrobi zaległości' : ''}</li>
    </ul>
    ${weak.length ? `<p><b>Najczęściej się myli:</b> ${weak.map(w => `${disp(w)} <span class="small">(${isleOf(WORD_ISLE[w]).pl})</span>`).join(', ')}.
      Warto przy okazji powiedzieć je razem na głos.</p>` : ''}</div>`;
}
function showParent() {
  const dots = w => { const r = S.words[w]; if (!r || !r.seen) return '<span style="opacity:.4">jeszcze nie</span>';
    return '●'.repeat(r.box) + '○'.repeat(4 - r.box) + (isDue(w) ? ' 🔁' : ''); };
  const voices = SP.list();
  const m = modal(`<div class="parent">
    <h3>👪 Dla rodzica</h3>
    ${reportHTML()}
    <p>Gra uczy angielskiego przez słuchanie i zabawę. Dziecko nie musi umieć czytać — każde zadanie
    zaczyna się od zdania wypowiedzianego po angielsku, a znaczenie wynika z obrazka.</p>
    <h4>Na jakich metodach stoi</h4>
    <ul>
      <li><b>Najpierw słuchanie.</b> Nowe słowo dziecko słyszy w zdaniu, widzi na obrazku i dopiero potem je rozpoznaje — tak uczymy się pierwszego języka.</li>
      <li><b>Słowo, obraz i dźwięk naraz.</b> Pamięć łatwiej zatrzymuje to, co przyszło dwiema drogami.</li>
      <li><b>Ruch.</b> Na wyspie „Actions" dziecko wydaje polecenia („Pikachu, jump!"), a Pokémon je wykonuje.</li>
      <li><b>Małe porcje.</b> Najwyżej cztery nowe słowa na etap.</li>
      <li><b>Powtórki w odstępach.</b> Słowo, które dziecko zna, wraca po 1, 2, 4 i 7 dniach. Znaczek 🔁 na mapie mówi, że coś czeka na powtórkę. Słowo uznajemy za opanowane dopiero po poprawnych odpowiedziach w różne dni.</li>
      <li><b>Bez kar.</b> Nie ma zegara ani tracenia żyć. Zła odpowiedź też uczy („That is blue!"), a po dwóch próbach gra podświetla właściwą.</li>
      <li><b>Bez tłumaczenia słówek.</b> Przycisk PL wyjaśnia po polsku, co trzeba zrobić, ale nigdy nie podaje odpowiedzi.</li>
    </ul>
    <p>Na etapie nauki gra prosi: „Your turn! Say…". Zachęcaj dziecko, żeby mówiło na głos — to najważniejsza część.</p>
    <h4>Zapis wyniku</h4>
    ${AUTOSAVE ? `<p>Wynik zapisuje się sam po każdej odpowiedzi — w przeglądarce i dodatkowo na dysku tego komputera
    (folder <i>pokedex/angielski-zapisy/auto</i>: ostatni stan, kopia z każdego dnia i z każdej godziny gry).
    Gdy przeglądarka zgubi wynik (np. po wyczyszczeniu danych), gra przy starcie sama wczyta go z dysku.
    Na innym urządzeniu albo w innej przeglądarce dziecko ma osobny wynik.</p>`
    : `<p>Wynik zapisuje się sam w tej przeglądarce, na tym urządzeniu. Nie wysyłamy go nigdzie. Wyczyszczenie danych
    przeglądarki albo tryb prywatny usuwa wynik; na innym urządzeniu dziecko zaczyna od nowa.</p>`}
    <h4>Mikrofon</h4>
    ${AUTO ? `<p>Na wyspie „Say it!" dziecko mówi do mikrofonu, a Pokémon „słucha". Mikrofon jest domyślnie <b>wyłączony</b> — włącza go
    rodzic niżej w ustawieniach; wtedy przeglądarka (a za pierwszym razem także system) zapyta o zgodę. Nagranie trwa 2–3 sekundy,
    rozpoznaje je ten komputer i od razu je kasuje — nic nie trafia do internetu. Bez mikrofonu wyspa też działa:
    dziecko mówi na głos i dotyka „I said it!".</p>`
    : `<p>W tej wersji gra nie używa mikrofonu. Na wyspie „Say it!" dziecko mówi na głos i samo dotyka „I said it!".</p>`}
    <h4>Prywatność</h4>
    <p>Bez kont, logowania i reklam. Gra nie zbiera imienia ani żadnych danych o dziecku${AUTO ? '' : '; liczymy tylko anonimowe wejścia na stronę (bez ciasteczek)'}.</p>
    <h4>Postępy (● = pudełko powtórek, 4 = opanowane)</h4>
    <table>${ISLANDS.filter(I => I.stages.length).map(I => `<tr><td colspan="2"><b>${I.ic} ${I.pl}</b></td></tr>` +
      I.stages.flat().map(w => `<tr><td>${disp(w)}</td><td class="dots">${dots(w)}</td></tr>`).join('')).join('')}</table>
    <h4>Głos lektorki</h4>
    <p>Wszystkie zdania gry są <b>nagrane</b> jednym głosem (Zoe, angielski amerykański; pomoc po polsku — Zosia), więc na każdym telefonie,
    tablecie i komputerze dziecko słyszy to samo. Głos wbudowany w urządzenie odzywa się tylko awaryjnie, gdyby nagranie się nie wczytało
    (np. przy słabym internecie) — i tylko jego dotyczy wybór głosu i tempa niżej.</p>
    <p class="small">W tej sesji: ${(n => n + ' ' + (n === 1 ? 'zdanie' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'zdania' : 'zdań'))(SP.stat.rec)} z nagrań${SP.stat.srv ? ', ' + SP.stat.srv + ' z serwera na Macu' : ''}${SP.stat.dev ? ', <b>' + SP.stat.dev + ' głosem urządzenia</b> — jeśli to dużo, nagrania się nie wczytują' : ''}${SP.stat.rec && !SP.stat.dev ? ' ✓' : ''}.</p>
    <h4>Ustawienia</h4>
    <label>Głos zapasowy (urządzenia): <select id="pv">${voices.map(v => `<option value="${v.name}" ${SP.en && v.name === SP.en.name ? 'selected' : ''}>${v.name} (${v.lang})</option>`).join('') || '<option>brak głosów angielskich</option>'}</select></label>
    <label>Tempo głosu zapasowego: <input type="range" id="pr" min="0.6" max="1.1" step="0.05" value="${S.settings.rate}"><span id="prv">${S.settings.rate}</span></label>
    <label><input type="checkbox" id="ppl" ${S.settings.plHelp ? 'checked' : ''}> Przycisk pomocy po polsku</label>
    <label><input type="checkbox" id="psfx" ${S.settings.sfx ? 'checked' : ''}> Efekty dźwiękowe</label>
    ${AUTO ? `<label><input type="checkbox" id="pmic" ${S.settings.mic ? 'checked' : ''}> 🎤 Mówienie do mikrofonu (wyspa „Say it!"). Nagranie rozpoznaje ten Mac i od razu je kasuje — nic nie idzie do internetu. Przeglądarka zapyta raz o zgodę.</label>` : ''}
    <button class="pbtn" id="ptest">🔊 Sprawdź głos</button>
    <button class="pbtn" id="pall">${S.settings.all ? '🔒 Zablokuj wyspy jak w grze' : '🔓 Odblokuj wszystkie wyspy'}</button>
    <button class="pbtn danger" id="preset">🗑 Zacznij od nowa</button>
  </div>`);
  $('#pv', m).onchange = e => { S.settings.voice = e.target.value; save(); SP.pick(); SP.say('Hello! I am your Pokémon teacher.'); };
  $('#pr', m).oninput = e => { S.settings.rate = +e.target.value; $('#prv', m).textContent = e.target.value; save(); };
  $('#ppl', m).onchange = e => { S.settings.plHelp = e.target.checked; save(); plHelp(PLHELP); };
  $('#psfx', m).onchange = e => { S.settings.sfx = e.target.checked; save(); };
  $('#ptest', m).onclick = () => SP.say('Find the red Pokémon! Red!');
  const pm = $('#pmic', m);
  if (pm) pm.onchange = async e => {
    if (!e.target.checked) { S.settings.mic = false; save(); return; }
    try {                                          // pytamy przeglądarkę o zgodę od razu, przy rodzicu
      const st = await navigator.mediaDevices.getUserMedia({ audio: true }); st.getTracks().forEach(t => t.stop());
      S.settings.mic = true; save(); toast('🎤 Mikrofon włączony', 2500);
    } catch (err) { e.target.checked = false; S.settings.mic = false; save(); alert('Przeglądarka nie dała dostępu do mikrofonu. Sprawdź zgodę w przeglądarce i w Ustawieniach systemowych → Prywatność → Mikrofon.'); }
  };
  $('#pall', m).onclick = () => { S.settings.all = !S.settings.all; save(); m.remove(); go(showMap); };
  $('#preset', m).onclick = () => {
    if (confirm('Usunąć cały postęp: gwiazdki, odznaki, złapane Pokémony i historię powtórek?' + (AUTOSAVE ? '\n\nKopia na dysku tego komputera zostanie jako zapas.' : ''))) {
      // pusty stan zamiast usunięcia klucza — inaczej gra wczytałaby wynik z dysku z powrotem
      try { localStorage.setItem(KEY, '{}'); } catch (e) { } location.reload();
    }
  };
}

document.addEventListener('visibilitychange', () => { if (document.hidden) SP.stop(); });
showTitle();
})();
