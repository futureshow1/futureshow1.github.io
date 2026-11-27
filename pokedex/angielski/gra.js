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
  { id: 'sage', ic: '🦉', en: 'Sage', pl: 'Mędrzec', world: 14, stages: [], final: true },
  /* świat 15: zamek — chowany, zagadki, mapa skarbów */
  { id: 'hide', ic: '🙈', en: 'Hide and seek', pl: 'Chowany', world: 15, stages: [['k-behind', 'k-front'], ['k-between', 'k-next']] },
  { id: 'riddle', ic: '🕵️', en: 'Riddles', pl: 'Zagadki', world: 15, stages: [['q-colour', 'q-type'], ['q-size', 'q-move']] },
  { id: 'treasure', ic: '🗺️', en: 'Treasure hunt', pl: 'Skarb', world: 15, stages: [['x-right', 'x-left'], ['x-up', 'x-down']] },
  { id: 'knight', ic: '🛡️', en: 'Knight', pl: 'Rycerz', world: 15, stages: [], final: true },
  /* świat 16: kuchnia — pizza, kawiarnia, gotowanie */
  { id: 'pizza', ic: '🍕', en: 'Pizza chef', pl: 'Pizzeria', world: 16, stages: [['z-cheese', 'z-tomato', 'z-mushroom'], ['z-pepper', 'z-olive', 'z-corn']] },
  { id: 'cafe', ic: '☕', en: 'Café', pl: 'Kawiarnia', world: 16, stages: [['j-milk', 'j-juice', 'j-bread'], ['j-tea', 'j-soup', 'j-sandwich']] },
  { id: 'cook', ic: '🥣', en: 'Cooking', pl: 'Gotujemy', world: 16, stages: [['o-cut', 'o-mix'], ['o-pour', 'o-bake']] },
  { id: 'chef', ic: '🧑‍🍳', en: 'Chef', pl: 'Szef kuchni', world: 16, stages: [], final: true },
  /* świat 17: opieka — Pokémony z drużyny, u lekarza, dziesiątki */
  { id: 'care', ic: '🧼', en: 'Pokémon care', pl: 'Opieka', world: 17, stages: [['u-feed', 'u-wash'], ['u-brush', 'u-hug']] },
  { id: 'doctor', ic: '🩺', en: 'Doctor', pl: 'U lekarza', world: 17, stages: [['i-head', 'i-tummy', 'i-tooth'], ['i-leg', 'i-ear', 'i-cold']] },
  { id: 'tens', ic: '💯', en: 'Big numbers', pl: 'Dziesiątki', world: 17, stages: [['w-30', 'w-40', 'w-50'], ['w-60', 'w-70'], ['w-80', 'w-90', 'w-100']] },
  { id: 'healer', ic: '💖', en: 'Healer', pl: 'Uzdrowiciel', world: 17, stages: [], final: true },
  /* świat 18: festiwal — muzyka, urodziny i miesiące, farby */
  { id: 'music', ic: '🎸', en: 'Music', pl: 'Muzyka', world: 18, stages: [['M-guitar', 'M-piano', 'M-drum'], ['M-trumpet', 'M-violin']] },
  { id: 'party', ic: '🎂', en: 'Birthday', pl: 'Urodziny', world: 18, stages: [['B-january', 'B-february', 'B-march'], ['B-april', 'B-may', 'B-june'], ['B-july', 'B-august', 'B-september'], ['B-october', 'B-november', 'B-december']] },
  { id: 'paint', ic: '🖌️', en: 'Colour mix', pl: 'Mieszanie farb', world: 18, stages: [['C-orange', 'C-green', 'C-purple'], ['C-pink', 'C-grey', 'C-brown']] },
  { id: 'superstar', ic: '💫', en: 'Superstar', pl: 'Gwiazda', world: 18, stages: [], final: true },
  /* świat 19: sport — wyścig, dyscypliny, ruch z piłką */
  { id: 'race', ic: '🥇', en: 'Race day', pl: 'Wyścig', world: 19, stages: [['R-first', 'R-second'], ['R-third', 'R-last']] },
  { id: 'sport', ic: '🏀', en: 'Sports', pl: 'Sporty', world: 19, stages: [['S-tennis', 'S-basketball', 'S-volleyball'], ['S-baseball', 'S-golf', 'S-hockey']] },
  { id: 'moves', ic: '🤾', en: 'Ball games', pl: 'Gry z piłką', world: 19, stages: [['K-kick', 'K-throw'], ['K-catch', 'K-climb']] },
  { id: 'athlete', ic: '🏅', en: 'Athlete', pl: 'Sportowiec', world: 19, stages: [], final: true },
  /* świat 20: tęcza — czytanie zdań, rozmowa o sobie, ubieranie na pogodę */
  { id: 'readsent', ic: '📖', en: 'Read it', pl: 'Czytam zdania', world: 20, stages: [['T-is', 'T-on'], ['T-can', 'T-has']] },
  { id: 'aboutme', ic: '💬', en: 'About me', pl: 'O mnie', world: 20, stages: [['F-colour', 'F-food'], ['F-animal', 'F-season', 'F-pokemon']] },
  { id: 'dress', ic: '🧥', en: 'Dress up', pl: 'Ubierz się', world: 20, stages: [['W-coat', 'W-gloves', 'W-boots'], ['W-sunglasses', 'W-umbrella', 'W-shorts']] },
  { id: 'rainbow', ic: '🌈', en: 'Rainbow Master', pl: 'Mistrz Tęczy', world: 20, stages: [], final: true },
  /* świat 21: miasto — miejsca, pytanie o drogę, wpół do */
  { id: 'places', ic: '🏛️', en: 'In the city', pl: 'W mieście', world: 21, stages: [['P-park', 'P-zoo', 'P-library'], ['P-hospital', 'P-cinema', 'P-station']] },
  { id: 'askway', ic: '🚦', en: 'Ask the way', pl: 'Pytam o drogę', world: 21, stages: [['Y-left', 'Y-right'], ['Y-straight']] },
  { id: 'halfpast', ic: '🕧', en: 'Half past', pl: 'Wpół do', world: 21, stages: [['H-1', 'H-2', 'H-3'], ['H-4', 'H-5', 'H-6'], ['H-7', 'H-8', 'H-9'], ['H-10', 'H-11', 'H-12']] },
  { id: 'guide', ic: '🏙️', en: 'City Guide', pl: 'Przewodnik', world: 21, stages: [], final: true },
  /* świat 22: jutro — plany (going to), prognoza pogody, marzenia */
  { id: 'plans', ic: '📆', en: 'Tomorrow', pl: 'Jutro', world: 22, stages: [['G-swim', 'G-football', 'G-zoo'], ['G-grandma', 'G-read', 'G-bike']] },
  { id: 'forecast', ic: '📺', en: 'Weather news', pl: 'Prognoza', world: 22, stages: [['O-sunny', 'O-rainy', 'O-snowy'], ['O-windy', 'O-cloudy', 'O-stormy']] },
  { id: 'dream', ic: '💭', en: 'Dreams', pl: 'Marzenia', world: 22, stages: [['J-pilot', 'J-vet', 'J-astronaut'], ['J-singer', 'J-footballer', 'J-scientist']] },
  { id: 'dreamer', ic: '🔭', en: 'Dreamer', pl: 'Marzyciel', world: 22, stages: [], final: true },
  /* świat 23: historyjki — własna historyjka, dlaczego, po kolei */
  { id: 'storymaker', ic: '🪄', en: 'Story maker', pl: 'Moja historyjka', world: 23, stages: [['Q-went', 'Q-found'], ['Q-saw', 'Q-met']] },
  { id: 'because', ic: '🤔', en: 'Because', pl: 'Dlaczego', world: 23, stages: [['A-happy', 'A-sad', 'A-scared'], ['A-tired', 'A-hungry', 'A-angry']] },
  { id: 'sequence', ic: '🔢', en: 'First and then', pl: 'Po kolei', world: 23, stages: [['E-morning', 'E-park'], ['E-beach', 'E-night']] },
  { id: 'author', ic: '✍️', en: 'Author', pl: 'Autor', world: 23, stages: [], final: true },
  /* świat 24: rozmowy — krótkie odpowiedzi, rozmowy w kilku krokach, teleturniej */
  { id: 'answers', ic: '🙋', en: 'Short answers', pl: 'Krótkie odpowiedzi', world: 24, stages: [['N-do', 'N-can'], ['N-have', 'N-are']] },
  { id: 'friend', ic: '🤝', en: 'Friends', pl: 'Rozmowy', world: 24, stages: [['U-meet', 'U-phone'], ['U-park', 'U-help']] },
  { id: 'quiz', ic: '🎙️', en: 'Quiz show', pl: 'Teleturniej', world: 24, stages: [['D-colours', 'D-animals'], ['D-numbers', 'D-world']] },
  { id: 'quizchamp', ic: '🏵️', en: 'Quiz Champion', pl: 'Mistrz teleturnieju', world: 24, stages: [], final: true }
];
ISLANDS.forEach(i => { i.world = i.world || 1; });
const WORD_ISLE = {};
ISLANDS.forEach(i => i.stages.flat().forEach(w => { WORD_ISLE[w] = i.id; }));
const isleOf = id => ISLANDS.find(i => i.id === id);
const WORLDS = [[1, 'Sunny Islands'], [2, 'Sky Islands'], [3, 'Jungle Islands'], [4, 'Ocean Islands'],
  [5, 'Town Islands'], [6, 'Snow Islands'], [7, 'Volcano Islands'], [8, 'Space Islands'], [9, 'Letter Islands'], [10, 'Market Islands'], [11, 'Adventure Islands'], [12, 'Story Islands'],
  [13, 'Travel Islands'], [14, 'Wonder Islands'], [15, 'Castle Islands'], [16, 'Kitchen Islands'], [17, 'Care Islands'],
  [18, 'Festival Islands'], [19, 'Sports Islands'], [20, 'Rainbow Islands'], [21, 'City Islands'], [22, 'Tomorrow Islands'],
  [23, 'Story Maker Islands'], [24, 'Talk Islands']];
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
S.log = S.log || {};
S.shiny = S.shiny || [];                    // błyszczące (shiny) — numery z Pokédexu
S.tests = S.tests || {};                    // sprawdziany: świat → najlepszy wynik (z 12)
S.caughtOn = S.caughtOn || {};              // numer → dzień złapania (do podsumowania tygodnia, od 23.11.2026)                        // dzień → [dobre, złe, nowe słowa] — do raportu dla rodzica (od 18.11.2026)
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
  if (r.seen === 1) { L[2]++; r.first = today(); }
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
      <div class="evo"><img id="evoimg" src="${IMGX(id)}" alt=""></div><div id="evochoice" class="options"></div></div>`;
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
    for (const ms of [420, 360, 300, 240, 180, 140, 110, 90]) { im.src = IMGX(im.src.includes(String(id).padStart(3, '0') + '.webp') ? to : id); FX.click(); await wait(ms); }
    im.src = S.shiny.includes(id) ? IMGS(to) : IMG(to); im.classList.remove('evolving'); im.classList.add('evolved');
    confetti(90); FX.fanfare(); sparks(center(im).x, center(im).y, 24);
    S.team[j] = to; S.txp[to] = Math.max(S.txp[to] || 0, S.txp[id] || 0);
    const isNew = !has(to); if (isNew) { S.dex.push(to); S.fresh.push(to); S.caughtOn[to] = today(); }
    if (S.shiny.includes(id) && !S.shiny.includes(to)) S.shiny.push(to);          // błyszczący ewoluuje w błyszczącego
    save();
    $('.banner').textContent = 'Congratulations!';
    $('#evochoice').innerHTML = `<p class="learn sentence">${from} ➜ <b>${DEX[to].name}</b>${isNew ? ' · NEW!' : ''}</p><button class="next" id="nx">▶</button>`;
    await SP.say('Congratulations! ' + from + ' evolved into ' + DEX[to].name + '!'); if (!alive(tok)) return;
    await new Promise(r => { $('#nx').onclick = () => { FX.tap(); r(); }; });
  }
}
function buddyHTML() {
  if (!S.team.length) return '';
  return `<div class="buddies">${S.team.map(id => `<span class="buddy">${imgX(id)}<b>Lv ${TEAMLV(id)}</b></span>`).join('')}</div>`;
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
  demoStar: (x, y) => { LASTPT = { x, y }; flyStar(); }, demoBattle: () => go(() => battleRun(SESSION)),
  demoTest: wn => go(() => worldTestRun(wn, SESSION)), demoWeek: () => go(() => weekRun(SESSION)), demoCard: () => trainerCard(), demoCert: (wn, ok, know, miss) => go(() => certificate(wn, ok, know, miss, SESSION)),
  demoShiny: () => go(() => wildCatch(D.stars, SESSION, 0, true)) };

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
  const bp = battlePool().length, showBattle = S.badges.length >= 6 && bp >= 5, pw = powerN();
  if (S.power === undefined) { S.power = Math.floor(pw / 25) * 25; save(); }
  // zamknięte światy: pokazujemy tylko najbliższy — dalsze to niespodzianka (inaczej mapa przytłacza)
  const shown = WORLDS.filter(([wn]) => wn === 1 || open(wn) || open(wn - 1));
  app.innerHTML = hud(`<button class="iconbtn" data-act="col" aria-label="Moje Pokémony">📕</button>
      <span class="chip">🏅 ${S.badges.length}/${ISLANDS.length}</span>${S.team.length ? `<button class="teamchip" data-act="team" aria-label="Moja drużyna">${S.team.map(id => imgX(id)).join('')}</button>` : ''}${S.daily && S.daily.streak > 1 && S.daily.day >= today() - 1 ? `<span class="chip">🔥 ${S.daily.streak}</span>` : ''}${S.badges.length >= 6 ? `<button class="chip powerchip" data-act="power" aria-label="Słowa opanowane">💪 ${pw}</button>` : ''}<button class="iconbtn" data-act="week" aria-label="Mój tydzień">📰</button><button class="iconbtn" data-act="card" aria-label="Karta trenera">🪪</button>`) +
    (!S.team.length && S.dex.length >= 3 ? `<button class="daily teamcall" data-act="pickteam"><span class="ic">⭐</span><b>Choose your team!</b><small>Wybierz drużynę: do 3 ulubionych Pokémonów, które będą Ci kibicować i rosnąć razem z Tobą</small></button>` : '') +
    (showBattle ? `<button class="daily battle" data-act="battle"><span class="ic">⚔️</span><b>Battle!</b><small>Arena · bitwa z bossem na ${Math.min(10, bp)} słowach do powtórki · wygrana: nowy Pokémon</small></button>` : '') +
    (showDaily ? `<button class="daily" data-act="daily"><span class="ic">🔁</span><b>Daily training</b><small>Trening dnia · ${(n => n + (n >= 2 && n <= 4 ? ' słowa' : ' słów'))(Math.min(dueWords().length > 40 ? 12 : 8, dueWords().length))} do powtórki · nagroda: Pokémon</small></button>` : '') +
    shown.map(([wn, sub]) => `<section class="world world${wn} ${open(wn) ? '' : 'closed'}">
      <h2 class="wtitle" ${wn > 1 ? `data-lock="Get the ${finalOf(wn - 1).en} badge!"` : ''}><span>World ${wn}</span><small>${sub} · Świat ${wn}</small></h2>${testBtn(wn, open(wn))}
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
      SP.say('Wow! A new world is open! World ' + worldWord(newWorld) + '! ' + WORLDS[newWorld - 1][1] + '!');
    }, 500);
  } else if (nextIdx >= 0 && ISLANDS[nextIdx].world > 1) {
    setTimeout(() => { const w = $('.world' + ISLANDS[nextIdx].world); if (w) w.scrollIntoView({ block: 'start' }); }, 60);
  }
  $('[data-act=col]').onclick = () => { FX.tap(); go(showCollection); };
  const tc = $('[data-act=team]'); if (tc) tc.onclick = () => { FX.tap(); go(showCollection); };
  const pt = $('[data-act=pickteam]'); if (pt) pt.onclick = () => { FX.tap(); go(showCollection); SP.say('Choose your team! Tap a Pokémon.'); };
  const db = $('[data-act=daily]'); if (db) db.onclick = () => { FX.tap(); go(() => dailyRun(SESSION)); };
  const bb = $('[data-act=battle]'); if (bb) bb.onclick = () => { FX.tap(); go(() => battleRun(SESSION)); };
  const pc = $('[data-act=power]'); if (pc) pc.onclick = () => {
    FX.tap(); const next = (Math.floor(pw / 25) + 1) * 25;
    toast(`💪 ${pw} — tyle słów znasz już pewnie (dobre odpowiedzi w różne dni). Przy ${next} — nagroda!`, 5200);
    SP.stop(); SP.say(`You know ${pw} words!`);
  };
  document.querySelectorAll('[data-wt]').forEach(b => b.onclick = () => { FX.tap(); go(() => worldTestRun(+b.dataset.wt, SESSION)); });
  const wk = $('[data-act=week]'); if (wk) wk.onclick = () => { FX.tap(); go(() => weekRun(SESSION)); };
  const tcb = $('[data-act=card]'); if (tcb) tcb.onclick = () => { FX.tap(); trainerCard(); };
  // nowy próg siły słów (co 25): świętujemy i dajemy Pokémona
  if (!newWorld && pw >= (S.power || 0) + 25) { S.power = Math.floor(pw / 25) * 25; save(); setTimeout(() => go(() => powerRun(S.power, SESSION)), 400); }
  // raz w tygodniu (pierwsze wejście na mapę w nowym tygodniu): podsumowanie poprzednich siedmiu dni
  else if (!newWorld && S.weekSeen !== weekIdx() && weekStats().played >= 2) { S.weekSeen = weekIdx(); save(); setTimeout(() => go(() => weekRun(SESSION)), 500); }
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
    const ok = await practice(I, words, 8, tok, 'Let\'s play!'); if (!alive(tok)) return;
    S.stage[I.id] = st + 1; save();
    await wildCatch(words.flatMap(monsFor), tok, 0, luckyShiny(ok, 8));
  } else if (!S.badges.includes(I.id) && S.retry && S.retry[I.id]) {
    // po przegranej bitwie: najpierw spokojny trening najsłabszych słów, bitwa dopiero przy następnej wizycie
    const words = weakest(I, 4);
    const ok = await practice(I, words, 8, tok, 'Practice time!'); if (!alive(tok)) return;
    delete S.retry[I.id]; save();
    await wildCatch(words.flatMap(monsFor), tok, 0, luckyShiny(ok, 8));
  } else if (!S.badges.includes(I.id)) {
    const ok = await practice(I, I.stages.flat(), 10, tok, 'Badge battle!'); if (!alive(tok)) return;
    if (ok >= 7) { await badge(I, tok); if (!alive(tok)) return; await wildCatch(I.stages.flat().flatMap(monsFor), tok, 0, ok === 10); }
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
    const ok = await practice(I, words, 8, tok, 'Review time!'); if (!alive(tok)) return;
    await wildCatch(D.stars, tok, 0, luckyShiny(ok, 8));
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
  const err = w => { const r = rec(w); return (r.bad + 1) / (r.ok + r.bad + 2); };
  const due = shuffle(shuffle(pool).sort((a, b) => (rec(a).box - rec(b).box) || (err(b) - err(a))).slice(0, k * 2)).slice(0, k);
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
  shapes: w => rec(w).box >= 1 ? ['descpick', 'descsay', 'descpick'] : ['shapefind', 'shapefind', 'descpick'],
  hide: w => rec(w).box >= 1 ? ['seek', 'pickpic', 'yesno'] : ['seek', 'seek', 'pickpic'],
  riddle: w => rec(w).box >= 1 ? ['riddle', 'riddleyn', 'riddle'] : ['riddle', 'riddle', 'riddleyn'],
  treasure: w => rec(w).box >= 1 ? ['treasure2', 'treasay', 'treasure'] : ['treasure', 'treasure', 'treasay'],
  pizza: w => rec(w).box >= 1 ? ['pizza', 'pizzawhat', 'yesno'] : ['pizza', 'pizza', 'yesno'],
  cafe: w => rec(w).box >= 1 ? ['cafe', 'cafeask', 'cafesay'] : ['cafe', 'cafe', 'cafeask'],
  cook: w => rec(w).box >= 1 ? ['cookorder', 'cookwhat', 'cook'] : ['cook', 'cook', 'cookwhat'],
  care: w => rec(w).box >= 1 ? ['careneed', 'care', 'careneed'] : ['care', 'care', 'careneed'],
  doctor: w => rec(w).box >= 1 ? ['doctor', 'docwho', 'doctor'] : ['doctor', 'doctor', 'docwho'],
  tens: w => rec(w).box >= 1 ? ['tentap', 'tencount', 'yesno'] : ['tencount', 'tencount', 'tentap'],
  music: w => rec(w).box >= 1 ? ['musichear', 'pickpic', 'musicplay'] : ['musicplay', 'musicplay', 'musichear'],
  party: w => rec(w).box >= 1 ? ['bday', 'monthnext', 'monthfind'] : ['monthfind', 'bday', 'monthfind'],
  paint: w => rec(w).box >= 1 ? ['mixmake', 'mix', 'mixmake'] : ['mix', 'mix', 'mixmake'],
  race: w => rec(w).box >= 1 ? ['racewho', 'raceyn', 'racewho'] : ['racewho', 'racewho', 'raceyn'],
  sport: w => rec(w).box >= 1 ? ['pickopt', 'yesno', 'pickpic'] : ['pickpic', 'pickpic', 'pickopt'],
  moves: w => rec(w).box >= 1 ? ['movewho', 'move', 'movewho'] : ['move', 'move', 'movewho'],
  readsent: w => rec(w).box >= 1 ? ['readfind', 'readpic', 'readfind'] : ['readfind', 'readfind', 'readpic'],
  aboutme: w => rec(w).box >= 1 ? ['favq', 'aboutme', 'favq'] : ['aboutme', 'aboutme', 'favq'],
  dress: w => rec(w).box >= 1 ? ['dresswhat', 'dressup', 'dresswhat'] : ['dressup', 'dressup', 'dresswhat'],
  places: w => rec(w).box >= 1 ? ['pickopt', 'yesno', 'pickpic'] : ['pickpic', 'pickpic', 'pickopt'],
  askway: w => rec(w).box >= 1 ? ['asksay', 'askfind', 'asksay'] : ['askfind', 'askfind', 'asksay'],
  halfpast: w => rec(w).box >= 1 ? ['halfwhat', 'halfpick', 'yesno'] : ['halfpick', 'halfpick', 'halfwhat'],
  plans: w => rec(w).box >= 1 ? ['pickopt', 'yesno', 'pickpic'] : ['pickpic', 'pickpic', 'pickopt'],
  forecast: w => rec(w).box >= 1 ? ['fcpack', 'yesno', 'pickpic'] : ['pickpic', 'pickpic', 'fcpack'],
  dream: w => rec(w).box >= 1 ? ['pickopt', 'yesno', 'pickpic'] : ['pickpic', 'pickpic', 'pickopt'],
  storymaker: w => rec(w).box >= 1 ? ['storyask', 'storybuild', 'storyask'] : ['storybuild', 'storybuild', 'storyask'],
  because: w => rec(w).box >= 1 ? ['whyfeel', 'whypick', 'whyfeel'] : ['whypick', 'whypick', 'whyfeel'],
  sequence: w => rec(w).box >= 1 ? ['seqq', 'seqorder', 'seqq'] : ['seqorder', 'seqorder', 'seqq'],
  answers: ['shortans'], friend: ['convo'], quiz: ['quizq'] };
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
  await teamNews(tok);
  return ok;
}
/* awanse drużyny ogłaszamy po lekcji (w trakcie zadania głos jest zajęty), potem ewolucje */
async function teamNews(tok) {
  const up = [...new Set(TEAMUP)]; TEAMUP = [];
  for (const id of up) {
    if (!alive(tok)) break;
    app.innerHTML = hud() + `<div class="play" style="justify-content:center"><div class="banner">Level up!</div>
      <div class="learn cardmon"><img src="${IMG(id)}" alt=""><p class="desc"><b>${DEX[id].name}</b> · Lv ${TEAMLV(id)}</p></div></div>`;
    wireHud(); confetti(50); FX.fanfare();
    await SP.say(DEX[id].name + ' is now level ' + TEAMLV(id) + '!'); await wait(600);
  }
  if (alive(tok)) await evolveTeam(tok);
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

/* ======================================================================
   ŚWIAT 15: ZAMEK — chowany („Pikachu is behind the tree."), zagadki („It is yellow. Who is it?"),
   poszukiwanie skarbu na mapie („Go two steps right!"). Id słów: k- (chowany), q- (zagadki), x- (skarb).
   ====================================================================== */
const POS = { behind: 'behind the tree', front: 'in front of the tree', between: 'between the tree and the rock', next: 'next to the rock' };
const POSW = { behind: 'behind', front: 'in front of', between: 'between', next: 'next to' };
Object.keys(POS).forEach(p => { DISP['k-' + p] = POSW[p]; });
function hideHTML(k, p, cls, spots) {
  return `<div class="scene hide ${cls || ''}"><i class="castle">🏰</i><i class="ground"></i><i class="tree">🌳</i><i class="rock">🪨</i>
    ${(spots || []).map(x => `<button class="hspot at-${x}" data-p="${x}" aria-label="${POSW[x]}"><span>❔</span></button>`).join('')}
    ${k ? `<div class="mon hmon at-${p}">${imgOf(k)}</div>` : ''}</div>`;
}
/* zagadki: tylko cechy, które dziecko zna i które na obrazku są pewne (kolory dobrane ręcznie) */
const RCOL = {};
Object.keys(D.colours).forEach(c => D.colours[c].forEach(k => { if (!RCOL[k] && D.pool[k]) RCOL[k] = c; }));
const RK = Object.keys(RCOL);
const rtype = k => P(k).types.find(t => TYPEIC[t]) || null;
const rsize = k => P(k).h <= 0.5 ? 'small' : P(k).h >= 1.5 ? 'big' : null;
const rmove = k => (D.flyers.includes(k) || P(k).types.includes('flying')) ? 'fly' : (D.swimmers.includes(k) || P(k).types.includes('water')) ? 'swim' : null;
const RQ = { colour: k => RCOL[k], type: rtype, size: rsize, move: rmove };
const RQW = { colour: 'colour', type: 'type', size: 'big or small', move: 'fly or swim' };
Object.keys(RQ).forEach(f => { DISP['q-' + f] = RQW[f]; });
const clueTxt = (f, k, who) => ({ colour: () => `${who} is ${RCOL[k]}.`, type: () => `${who} is ${art(rtype(k))} Pokémon.`,
  size: () => `${who} is ${rsize(k)}.`, move: () => `${who} can ${rmove(k)}.` })[f]();
const clue = (f, k) => clueTxt(f, k, 'It');
/* o podpowiadanym Pokémonie: „Squirtle is blue." / „Bulbasaur can't fly." */
const clueAbout = (f, k, v) => f === 'move' && !rmove(k) ? `${P(k).name} can't ${v}.` : clueTxt(f, k, P(k).name);
function riddleSet(f, n) {
  for (let t = 0; t < 80; t++) {
    const tk = pick(RK.filter(k => RQ[f](k))), v = RQ[f](tk);
    const ds = shuffle(RK.filter(k => k !== tk && P(k).id !== P(tk).id && (f === 'move' ? RQ[f](k) !== v : RQ[f](k) && RQ[f](k) !== v))).slice(0, n - 1);
    if (ds.length < n - 1) continue;
    // druga wskazówka (prawdziwa o szukanym) — najlepiej taka, która pasuje też do kogoś z pozostałych: trzeba słuchać do końca
    const fs = Object.keys(RQ).filter(g => g !== f && RQ[g](tk));
    const shared = fs.filter(g => ds.some(d => RQ[g](d) === RQ[g](tk)));
    const sup = shared.length ? pick(shared) : fs.length ? pick(fs) : null;
    return { tk, ds, v, sup };
  }
  return null;
}
/* mapa skarbów: siatka 5 × 4, Pokémon idzie krok po kroku */
const XDIR = { right: [1, 0, '➡️'], left: [-1, 0, '⬅️'], up: [0, -1, '⬆️'], down: [0, 1, '⬇️'] };
Object.keys(XDIR).forEach(d => { DISP['x-' + d] = d; });
const GW = 5, GH = 4;
const stepTxt = (n, d) => `${NUMS[n - 1]} ${n > 1 ? 'steps' : 'step'} ${d}`;
const goTxt = (n, d) => `Go ${stepTxt(n, d)}!`;
const room = (c, d) => d === 'right' ? GW - 1 - c[0] : d === 'left' ? c[0] : d === 'up' ? c[1] : GH - 1 - c[1];
const stepTo = (c, d, n) => [c[0] + XDIR[d][0] * n, c[1] + XDIR[d][1] * n];
const TDECO = ['🌴', '', '', '🪨', '', '🌴', '', '🐚', '', '', '🌵', ''];
function gridHTML(k, at, x, cls) {
  let cells = '';
  for (let r = 0; r < GH; r++) for (let c = 0; c < GW; c++) cells += `<button class="gcell" data-c="${c}" data-r="${r}" aria-label="${c} ${r}"><i>${TDECO[(c * 7 + r * 3) % TDECO.length]}</i></button>`;
  return `<div class="tmap ${cls || ''}"><div class="grid">${cells}</div>
    ${x ? `<span class="xmark" id="xm" style="--c:${x[0]};--r:${x[1]}">❌</span>` : ''}
    <div class="walker2" id="tw" style="--c:${at[0]};--r:${at[1]}">${imgOf(k)}</div></div>`;
}
/* droga Pokémona: odcinki [[kierunek, kroki], …]; przy chodzeniu liczy kroki na głos */
async function walkGrid(at, segs, tok, count) {
  const t = $('#tw'); if (!t) return at;
  let c = at.slice();
  for (const [d, n] of segs) {
    for (let j = 1; j <= n; j++) {
      if (!alive(tok)) return c;
      c = stepTo(c, d, 1); t.style.setProperty('--c', c[0]); t.style.setProperty('--r', c[1]);
      if (d === 'left') t.classList.add('faceL'); else if (d === 'right') t.classList.remove('faceL');
      FX.tap(); if (count) SP.say(cap(NUMS[j - 1]) + '!', { rate: 1.1 });
      await wait(560);
    }
  }
  return c;
}
async function dig(c) {
  const x = $('#xm'); if (!x) return;
  x.textContent = pick(['🎁', '💎', '👑', '🪙']); x.classList.add('found'); FX.coin(); FX.catch();
  const p = center(x); sparks(p.x, p.y, 16);
}
/* start, z którego da się zrobić ruchy (żeby skarb był na mapie) */
function startFor(segs) {
  for (let t = 0; t < 200; t++) {
    const s = [rnd(GW), rnd(GH)]; let c = s, ok = true;
    for (const [d, n] of segs) { if (room(c, d) < n) { ok = false; break; } c = stepTo(c, d, n); }
    if (ok) return [s, c];
  }
  return null;
}
const perp = d => (d === 'left' || d === 'right') ? ['up', 'down'] : ['left', 'right'];

Object.assign(TH, {
  hide: {
    pic: (w, k, sz) => hideHTML(k, lt(w), sz),
    findQ: w => `Who is ${POS[lt(w)]}?`,
    ok: (w, nm) => `Yes! ${nm} is ${POS[lt(w)]}!`, no: (d, w, nm) => `No, ${nm} is ${POS[lt(d)]}. Who is ${POS[lt(w)]}?`,
    yn: (w, nm) => `Is ${nm} ${POS[lt(w)]}?`, yes: (w, nm) => `Yes, it is! ${nm} is ${POS[lt(w)]}!`,
    nope: (w, s, nm) => `No, it isn't! ${nm} is ${POS[lt(s)]}.`,
    pl: ['Posłuchaj, gdzie jest Pokémon, i dotknij właściwego obrazka.'],
    async teach(w, i, n, tok) {
      const p = lt(w), k = pick(D.stars), nm = P(k).name;
      PLHELP = 'Pokémony bawią się w chowanego przy zamku. Posłuchaj, gdzie jest Pokémon, popatrz na obrazek i powtórz.';
      await teachCard(i, n, tok, {
        word: POSW[p], vis: hideHTML(k, p, 'big'), text: `${nm} is ${POS[p]}.`,
        lines: [cap(POSW[p]) + '!', nm + ' is ' + POS[p] + '.'],
        turnShow: POS[p], turnSay: cap(POS[p])
      });
    }
  },
  riddle: {
    async teach(w, i, n, tok) {
      const f = lt(w), s = riddleSet(f, 1), k = s.tk, nm = P(k).name, fc = clue(f, k);
      PLHELP = 'Zagadka! Pokémon jest ukryty w cieniu. Posłuchaj wskazówki, a potem zobaczysz, kto to. Powtórz wskazówkę na głos.';
      await teachCard(i, n, tok, {
        word: '🕵️ ' + RQW[f], vis: `<div class="mon riddlemon" id="rmon">${imgOf(k)}</div><span class="qmark">❓</span>`,
        text: `${fc} Who is it?`,
        lines: ['Listen!', fc, 'Who is it?', async () => { const m = $('#rmon'); if (m) m.classList.add('reveal'); FX.pop(); await SP.say('It is ' + nm + '!'); await wait(250); }],
        turnShow: fc.replace(/\.$/, ''), turnSay: fc.replace(/\.$/, '')
      });
    }
  },
  treasure: {
    async teach(w, i, n, tok) {
      const d = lt(w), m = 1 + rnd(2), sc = startFor([[d, m]]), k = pick(D.stars);
      PLHELP = 'Mapa skarbów! Pokémon idzie tyle kroków, ile słyszysz, w stronę ze strzałki. Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: `${XDIR[d][2]} ${d}`, vis: gridHTML(k, sc[0], sc[1], 'big'), text: goTxt(m, d),
        lines: [cap(d) + '!', async () => {
          const t = $('#tw'); if (t) { t.style.setProperty('--c', sc[0][0]); t.style.setProperty('--r', sc[0][1]); }
          const x = $('#xm'); if (x) { x.textContent = '❌'; x.classList.remove('found'); }
          await SP.say(goTxt(m, d)); await walkGrid(sc[0], [[d, m]], tok, true); await dig(); await wait(300);
        }],
        turnShow: stepTxt(m, d), turnSay: cap(stepTxt(m, d))
      });
    }
  }
});

Object.assign(GAMES, {
  /* „Look behind the tree!" — Pokémon się schował, dziecko szuka we właściwym miejscu */
  async seek(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Pokémon się schował! Posłuchaj, gdzie szukać, i dotknij tego miejsca.';
    const p = lt(w), k = pick(D.stars), nm = P(k).name;
    let spots = [...new Set(knownWords('hide').map(lt).concat(p))];
    if (spots.length < 3) spots = spots.concat(shuffle(Object.keys(POS).filter(x => !spots.includes(x))).slice(0, 3 - spots.length));
    $('#arena').innerHTML = hideHTML(k, p, 'big seek', spots);
    const q = `Look ${POS[p]}!`;
    prompt(`Look <em>${POS[p]}</em>!`, [`Where is ${nm}?`, q], tok);
    const els = [...document.querySelectorAll('.hspot')], target = els.find(e => e.dataset.p === p);
    return choose(els, el => el === target,
      async el => {
        SP.stop(); el.classList.add('found'); const m = $('.hmon'); if (m) m.classList.add('show');
        FX.good(); const c = center(el); sparks(c.x, c.y, 12); await SP.say(`Found you! ${nm} is ${POS[p]}!`);
      },
      async el => { SP.stop(); el.classList.add('empty'); await SP.say(`Nobody is ${POS[el.dataset.p]}. ${q}`, { rate: 0.85 }); },
      target);
  },
  /* „It is small. It is yellow. Who is it?" — dwie wskazówki, trzy Pokémony */
  async riddle(w, i, n, tok) {
    shell(i, n);
    PLHELP = 'Zagadka! Posłuchaj wszystkich wskazówek i dotknij Pokémona, o którym mówią.';
    const f = lt(w), s = riddleSet(f, 3) || riddleSet('colour', 3), set = shuffle([s.tk].concat(s.ds));
    const sup = s.sup ? clue(s.sup, s.tk) : '', fc = clue(f, s.tk);
    $('#arena').innerHTML = set.map(k => monEl(k)).join('');
    prompt(`🕵️ ${sup} <em>${fc}</em> Who is it?`, ['Listen!'].concat(sup ? [sup] : [], [fc, 'Who is it?']), tok);
    const els = [...document.querySelectorAll('#arena .mon')], target = els[set.indexOf(s.tk)];
    return choose(els, el => el === target,
      async el => { SP.stop(); FX.good(); await throwBall(el); await SP.say(`Yes! It is ${P(s.tk).name}!`); },
      async el => { SP.stop(); const d = el.dataset.k; await SP.say(`No, that is ${P(d).name}. ${clueAbout(f, d, s.v)} ${fc} Who is it?`, { rate: 0.85 }); },
      target);
  },
  /* „It can fly. Is it Squirtle?" — tak/nie */
  async riddleyn(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj wskazówki i popatrz na Pokémona. Pasuje? Tak — 👍. Nie — 👎.';
    const f = lt(w), s = riddleSet(f, 2) || riddleSet('colour', 2), truth = Math.random() < 0.5, k = truth ? s.tk : s.ds[0], nm = P(k).name;
    const fc = clue(f, s.tk);
    $('#arena').innerHTML = `<div class="mon solo">${imgOf(k)}</div>`;
    $('#opts').innerHTML = '<button class="opt yn" data-a="yes" aria-label="yes">👍<small>Yes</small></button><button class="opt yn" data-a="no" aria-label="no">👎<small>No</small></button>';
    const q = `${fc} Is it ${nm}?`, right = truth ? 'yes' : 'no';
    prompt(`🕵️ <em>${fc}</em> Is it ${nm}?`, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(e.dataset.a === 'yes' ? 'Yes!' : 'No!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.a === right,
      async el => { el.classList.add('right'); FX.good(); await wait(500); const m = $('#arena .mon'); if (m) await throwBall(m); await SP.say(truth ? `Yes! It is ${nm}!` : `No! ${clueAbout(f, k, s.v)}`); },
      async () => { await wait(600); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.a === right));
  },
  /* „Go two steps right!" — dziecko dotyka pola, na które dojdzie Pokémon */
  async treasure(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj, ile kroków i w którą stronę ma iść Pokémon. Policz pola i dotknij tego, na którym stanie.';
    const d = lt(w), k = pick(D.stars);
    let steps = 1 + rnd(3), sc = startFor([[d, steps]]); if (!sc) { steps = 1; sc = startFor([[d, 1]]); }
    const [s0, end] = sc;
    $('#arena').innerHTML = gridHTML(k, s0, null, 'big');
    const q = goTxt(steps, d);
    prompt(`Go <em>${stepTxt(steps, d)}</em>!`, [q], tok);
    const els = [...document.querySelectorAll('.gcell')], target = els.find(e => +e.dataset.c === end[0] && +e.dataset.r === end[1]);
    return choose(els, el => el === target,
      async el => {
        SP.stop(); el.classList.add('right'); FX.good();
        el.insertAdjacentHTML('beforeend', '<span class="xmark here" id="xm">❌</span>');
        await walkGrid(s0, [[d, steps]], tok, true); await dig(); await SP.say('Yes! You found the treasure!');
      },
      async el => { SP.stop(); await SP.say(`No! ${q}`, { rate: 0.85 }); },
      target);
  },
  /* dwa ruchy: „Go two steps right. Then go one step up!" */
  async treasure2(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Dwa polecenia! Najpierw jedno, potem drugie. Policz pola i dotknij tego, na którym stanie Pokémon.';
    const d = lt(w), kn = knownWords('treasure').map(lt), p2 = perp(d).filter(x => kn.includes(x)), d2 = pick(p2.length ? p2 : perp(d));
    let segs = [[d, 1 + rnd(2)], [d2, 1 + rnd(2)]], sc = startFor(segs);
    if (!sc) { segs = [[d, 1], [d2, 1]]; sc = startFor(segs); }
    const k = pick(D.stars), [s0, end] = sc;
    $('#arena').innerHTML = gridHTML(k, s0, null, 'big');
    const q = `${goTxt(segs[0][1], segs[0][0])} Then go ${stepTxt(segs[1][1], segs[1][0])}!`;
    prompt(`Go <em>${stepTxt(segs[0][1], segs[0][0])}</em>. Then go <em>${stepTxt(segs[1][1], segs[1][0])}</em>!`, [q], tok);
    const els = [...document.querySelectorAll('.gcell')], target = els.find(e => +e.dataset.c === end[0] && +e.dataset.r === end[1]);
    return choose(els, el => el === target,
      async el => {
        SP.stop(); el.classList.add('right'); FX.good();
        el.insertAdjacentHTML('beforeend', '<span class="xmark here" id="xm">❌</span>');
        await walkGrid(s0, segs, tok, true); await dig(); await SP.say('Yes! You found the treasure!');
      },
      async el => { SP.stop(); await SP.say(`No! ${q}`, { rate: 0.85 }); },
      target);
  },
  /* skarb widać na mapie — dziecko wybiera polecenie, które tam zaprowadzi */
  async treasay(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Skarb jest pod krzyżykiem. Dotykaj przycisków, żeby usłyszeć polecenia, i wybierz to, które zaprowadzi Pokémona do skarbu.';
    const d = lt(w), k = pick(D.stars);
    let steps = 1 + rnd(3), sc = startFor([[d, steps]]); if (!sc) { steps = 1; sc = startFor([[d, 1]]); }
    const [s0, end] = sc;
    const good = goTxt(steps, d), kn = knownWords('treasure').map(lt).filter(x => x !== d);
    const d2 = kn.length ? pick(kn) : pick(Object.keys(XDIR).filter(x => x !== d));
    const opts = shuffle([good, goTxt(pick([1, 2, 3, 4].filter(x => x !== steps)), d), goTxt(steps, d2)]);
    $('#arena').innerHTML = gridHTML(k, s0, end, 'big');
    $('#opts').innerHTML = opts.map(t => `<button class="opt sent" data-t="${t}" aria-label="${t}"><i>🔊</i>${t}</button>`).join('');
    const q = 'How do we get to the treasure?';
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(e.dataset.t, { rate: 0.85 }); }));
    return choose(els, el => el.dataset.t === good,
      async el => { el.classList.add('right'); FX.good(); await wait(700); await walkGrid(s0, [[d, steps]], tok, true); await dig(); await SP.say('Yes! You found the treasure!'); },
      async () => { await wait(800); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.t === good));
  }
});

/* ======================================================================
   ŚWIAT 16: KUCHNIA — pizza („Put three mushrooms on the pizza!"), kawiarnia („I'd like some juice,
   please." / „Would you like…? Yes, please! No, thank you!"), gotowanie („Cut the apple!").
   Id słów: z- (pizza), j- (kawiarnia), o- (gotowanie).
   ====================================================================== */
const TOP = { cheese: ['🧀', 0], tomato: ['🍅', 'tomatoes'], mushroom: ['🍄', 'mushrooms'], pepper: ['🫑', 'peppers'], olive: ['🫒', 'olives'], corn: ['🌽', 0] };
Object.keys(TOP).forEach(x => { DISP['z-' + x] = x; });
const tpl = x => TOP[x][1] || x;
const tq = (x, n) => TOP[x][1] ? (n === 1 ? 'one ' + x : NUMS[n - 1] + ' ' + TOP[x][1]) : 'some ' + x;
const tIs = (x, n) => TOP[x][1] && n !== 1 ? 'are' : 'is';
const tspot = j => { const a = j * 2.4, r = j ? 14 + (j % 3) * 9 : 0; return `left:${50 + r * Math.cos(a)}%;top:${50 + r * Math.sin(a)}%`; };
function pizzaHTML(tops, cls) {
  return `<div class="pizza ${cls || ''}"><div class="pz"><i class="sauce"></i>${tops.map((t, j) => `<span class="tp" style="${tspot(j)}">${TOP[t][0]}</span>`).join('')}</div></div>`;
}
const pizzaOf = (x, n) => Array(TOP[x][1] ? n : 5).fill(x);
const CAFE = { milk: '🥛', juice: '🧃', bread: '🍞', tea: '🍵', soup: '🍲', sandwich: '🥪' };
Object.keys(CAFE).forEach(x => { DISP['j-' + x] = x; });
const some = x => x === 'sandwich' ? 'a sandwich' : 'some ' + x;
const thatIs = x => x === 'sandwich' ? 'a sandwich' : x;
function cafeHTML(k, dish, bub, cls) {
  return `<div class="scene cafe ${cls || ''}"><i class="awning"></i><i class="ctable"></i>
    <div class="mon cmon2" id="actmon">${imgOf(k)}</div>${bub ? `<span class="cbub" id="cbub">${bub}</span>` : ''}
    <span class="ondish" id="ondish">${dish ? CAFE[dish] : ''}</span></div>`;
}
const COOK = { cut: ['🔪', 'cut the apple', 'cutting the apple'], mix: ['🥄', 'mix the eggs', 'mixing the eggs'],
  pour: ['🫗', 'pour the milk', 'pouring the milk'], bake: ['🔥', 'bake the cake', 'baking the cake'] };
Object.keys(COOK).forEach(a => { DISP['o-' + a] = a; });
const STATION = {
  cut: '<span class="ck board"></span><span class="ck half h1">🍎</span><span class="ck half h2">🍎</span><span class="ck tool knife">🔪</span>',
  mix: '<span class="ck bowl">🥣</span><span class="ck egg">🥚</span><span class="ck tool spoon">🥄</span>',
  pour: '<span class="ck bowl">🥣</span><i class="ck stream"></i><span class="ck tool jug">🥛</span>',
  bake: '<span class="ck oven"><i class="glow"></i><span class="cake">🍰</span></span>'
};
function cookHTML(k, a, cls) {
  return `<div class="scene cook ${cls || ''}" data-a="${a || ''}"><i class="wallt"></i><i class="counter"></i>
    <div class="mon chef" id="actmon">${imgOf(k)}</div><div class="station">${a ? STATION[a] : ''}</div></div>`;
}
function doCook(a, root) {
  const s = (root || document).querySelector('.cook'); if (!s) return;
  s.dataset.a = a; $('.station', s).innerHTML = STATION[a];
  s.classList.remove('go'); void s.offsetWidth; s.classList.add('go'); FX.whoosh();
}

Object.assign(TH, {
  pizza: {
    ynPic: (w, s) => pizzaHTML(pizzaOf(lt(s), 3), 'big'),
    yn: w => `${TOP[lt(w)][1] ? 'Are there' : 'Is there any'} ${tpl(lt(w))} on the pizza?`,
    yes: w => `Yes, there ${TOP[lt(w)][1] ? 'are' : 'is'}! ${cap(tpl(lt(w)))}!`,
    nope: (w, s) => `No, there ${TOP[lt(w)][1] ? "aren't" : "isn't"}! There ${TOP[lt(s)][1] ? 'are' : 'is'} ${tpl(lt(s))}.`,
    async teach(w, i, n, tok) {
      const x = lt(w), m = TOP[x][1] ? 2 + rnd(3) : 0;
      PLHELP = 'Pizzeria! Posłuchaj, co kładziemy na pizzę i ile. Potem powtórz.';
      await teachCard(i, n, tok, {
        word: `${TOP[x][0]} ${x}`, vis: pizzaHTML([], 'big'), text: `Put ${tq(x, m)} on the pizza.`,
        lines: [cap(x) + '!', async () => {
          const pz = $('.learn .pz'); if (pz) pz.innerHTML = '<i class="sauce"></i>';
          const arr = pizzaOf(x, m);
          SP.say(`Put ${tq(x, m)} on the pizza.`);
          for (let j = 0; j < arr.length; j++) { if (!alive(tok) || !pz) return; pz.insertAdjacentHTML('beforeend', `<span class="tp" style="${tspot(j)}">${TOP[x][0]}</span>`); FX.pop(); await wait(380); }
          await wait(900);
        }],
        turnShow: tpl(x), turnSay: cap(tpl(x))
      });
    }
  },
  cafe: {
    async teach(w, i, n, tok) {
      const x = lt(w), k = pick(D.eaters), nm = P(k).name;
      PLHELP = 'Kawiarnia! Tak grzecznie zamawiamy po angielsku. Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: `${CAFE[x]} ${x}`, vis: cafeHTML(k, x, `I'd like ${some(x)}, please.`, 'big'), text: `I'd like ${some(x)}, please.`,
        lines: [cap(x) + '!', `I'd like ${some(x)}, please.`],
        turnShow: `${some(x)}, please`, turnSay: `${cap(some(x))}, please`
      });
    }
  },
  cook: {
    async teach(w, i, n, tok) {
      const a = lt(w), k = pick(D.stars), nm = P(k).name;
      PLHELP = 'Gotujemy! Posłuchaj polecenia i popatrz, co robi Pokémon. Potem powtórz.';
      await teachCard(i, n, tok, {
        word: `${COOK[a][0]} ${a}`, vis: cookHTML(k, a, 'big'), text: `${cap(COOK[a][1])}!<br>${nm} is ${COOK[a][2]}.`,
        lines: [cap(a) + '!', async () => { doCook(a); await SP.say(cap(COOK[a][1]) + '!'); await wait(300); }, `${nm} is ${COOK[a][2]}.`],
        turnShow: COOK[a][1], turnSay: cap(COOK[a][1])
      });
    }
  }
});

Object.assign(GAMES, {
  /* „Put two mushrooms on the pizza!" — dotykaj składników, potem ✓ */
  async pizza(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Jesteś kucharzem! Posłuchaj, co i ile położyć na pizzy. Dotykaj składników, a potem naciśnij zielony ✓.';
    const x = lt(w), cnt = TOP[x][1] ? 1 + rnd(4) : 0, k = pick(D.eaters), nm = P(k).name;
    const opts = shuffle([x].concat(others(w, 2).map(lt))), placed = [];
    $('#arena').innerHTML = `<div class="pzwrap">${pizzaHTML([], 'big')}<div class="mon pzmon" id="actmon">${imgOf(k)}</div></div>`;
    $('#opts').innerHTML = opts.map(o => `<button class="opt topbtn" data-x="${o}" aria-label="${o}">${TOP[o][0]}</button>`).join('') +
      '<button class="opt donebtn" id="donebtn" aria-label="ready">✅</button>';
    const q = `Put ${tq(x, cnt)} on the pizza!`;
    prompt(`Put <em>${tq(x, cnt)}</em> on the pizza!`, [q], tok);
    let miss = 0, busy = false;
    const redraw = () => { const pz = $('.pz'); if (pz) pz.innerHTML = '<i class="sauce"></i>' + placed.map((t, j) => `<span class="tp" style="${tspot(j)}">${TOP[t][0]}</span>`).join(''); };
    const tops = [...document.querySelectorAll('.topbtn')], done = $('#donebtn');
    const hint = () => {
      document.querySelectorAll('#opts .hint').forEach(e => e.classList.remove('hint'));
      if (placed.some(t => t !== x)) { placed.length = 0; redraw(); }
      const have = placed.length, need = cnt ? cnt - have : (have ? 0 : 1);
      if (need < 0) { placed.length = 0; redraw(); }
      (need !== 0 ? tops.find(b => b.dataset.x === x) : done).classList.add('hint');
    };
    return new Promise(res => {
      tops.forEach(b => b.onclick = () => {
        if (busy || placed.length >= 12) return;
        placed.push(b.dataset.x); redraw(); FX.pop();
        const c = placed.filter(t => t === b.dataset.x).length;
        SP.stop(); SP.say(TOP[b.dataset.x][1] ? cap(NUMS[c - 1]) + '!' : cap(b.dataset.x) + '!', { rate: 0.95 });
        if (miss >= 2) hint();
      });
      done.onclick = async () => {
        if (busy) return; busy = true; SP.stop();
        const have = placed.filter(t => t === x).length, other = placed.length - have;
        if (other === 0 && (cnt ? have === cnt : have >= 1)) {
          tops.concat(done).forEach(e => { e.onclick = null; }); done.classList.add('right'); FX.good();
          const m = $('#actmon'); if (m) actOn(m, 'eat', true);
          await SP.say(`Yes! ${cap(tq(x, cnt))}! Yummy!`);
          return res(miss === 0);
        }
        miss++; FX.bad(); done.classList.remove('wrong'); void done.offsetWidth; done.classList.add('wrong');
        placed.length = 0; redraw();
        await SP.say(`Oops! Let's try again. ${q}`, { rate: 0.85 });
        busy = false; if (miss >= 2) hint();
      };
    });
  },
  /* „What is on the pizza?" — trzy odpowiedzi do wyboru ze słuchu */
  async pizzawhat(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Popatrz na pizzę. Dotykaj przycisków, żeby usłyszeć, co na niej jest, i wybierz dobry.';
    const x = lt(w), c = 1 + rnd(4), y = lt(others(w, 1)[0] || 'z-cheese') === x ? (x === 'cheese' ? 'tomato' : 'cheese') : lt(others(w, 1)[0] || 'z-cheese');
    const good = tq(x, c), alt = TOP[x][1] ? tq(x, pick([1, 2, 3, 4].filter(m => m !== c))) : tq(y, 2);
    const opts = [...new Set([good, alt, tq(y, c)])];
    if (opts.length < 3) opts.push(tq(y === 'corn' ? 'olive' : 'corn', 3));
    $('#arena').innerHTML = pizzaHTML(pizzaOf(x, c), 'big');
    $('#opts').innerHTML = shuffle(opts).map(t => `<button class="opt sent" data-t="${t}" aria-label="${t}"><i>🔊</i>${t}</button>`).join('');
    const q = 'What is on the pizza?';
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.t) + '.', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.t === good,
      async el => { el.classList.add('right'); FX.good(); await wait(800); await SP.say(`Yes! There ${tIs(x, c)} ${good} on the pizza!`); },
      async () => { await wait(800); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.t === good));
  },
  /* klient w kawiarni: „I'd like some juice, please." — dziecko podaje */
  async cafe(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Jesteś kelnerem! Posłuchaj, co zamawia Pokémon, i dotknij tego na ladzie.';
    const x = lt(w), k = pick(D.eaters), nm = P(k).name, opts = shuffle([x].concat(others(w, 2).map(lt)));
    const say = `I'd like ${some(x)}, please.`;
    $('#arena').innerHTML = cafeHTML(k, null, say, 'big');
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-x="${o}" aria-label="${o}">${CAFE[o]}</button>`).join('');
    prompt(`I'd like <em>${some(x)}</em>, please.`, [say], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.x) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.x === x,
      async el => {
        el.classList.add('right'); FX.good(); await flyFood(el, $('#ondish'), CAFE[x]);
        const d = $('#ondish'); if (d) d.textContent = CAFE[x];
        const m = $('#actmon'); if (m) m.classList.add('loop', 'feel-happy');
        await SP.say(`Here you are! ${cap(some(x))}.`); await SP.say('Thank you!');
      },
      async el => { await wait(500); await SP.say(`No, that is ${thatIs(el.dataset.x)}. ${say}`, { rate: 0.85 }); },
      els.find(e => e.dataset.x === x));
  },
  /* kelner pyta: „Would you like some milk?" — dziecko odpowiada zgodnie z tym, na co ma ochotę (dymek) */
  async cafeask(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Kelner pyta, czy coś podać. Popatrz w dymek — na to masz ochotę. Jeśli pyta o to samo, odpowiedz „Yes, please!", a jeśli o coś innego — „No, thank you!".';
    const x = lt(w), alt = lt(others(w, 1)[0] || 'j-tea') === x ? (x === 'tea' ? 'milk' : 'tea') : lt(others(w, 1)[0] || 'j-tea');
    const truth = Math.random() < 0.5, asked = truth ? x : alt, k = pick(D.stars), nm = P(k).name;
    $('#arena').innerHTML = `<div class="cafeask"><div class="mon waiter">${imgOf(k)}<span class="cbub">Would you like ${some(asked)}?</span></div>
      <div class="kid"><span class="think">💭<b>${CAFE[x]}</b></span><span class="kidme">🧒</span></div></div>`;
    $('#opts').innerHTML = shuffle(['Yes, please!', 'No, thank you!']).map(t => `<button class="opt sent" data-t="${t}" aria-label="${t}"><i>${t[0] === 'Y' ? '🙂' : '🙅'}</i>${t}</button>`).join('');
    const q = `Would you like ${some(asked)}?`, good = truth ? 'Yes, please!' : 'No, thank you!';
    prompt(`Would you like <em>${some(asked)}</em>?`, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(e.dataset.t, { rate: 0.85 }); }));
    return choose(els, el => el.dataset.t === good,
      async el => {
        el.classList.add('right'); FX.good(); await wait(600);
        if (truth) { await SP.say(`Here you are! ${cap(some(x))}.`); }
        else { await SP.say(`Okay! Would you like ${some(x)}?`); await SP.say('Yes, please!'); await SP.say(`Here you are! ${cap(some(x))}.`); }
      },
      async () => { await wait(700); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.t === good));
  },
  /* „What does Pikachu say?" — Pokémon ma ochotę na coś (dymek), dziecko wybiera zdanie */
  async cafesay(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Popatrz, na co ma ochotę Pokémon. Dotykaj przycisków, żeby usłyszeć zdania, i wybierz to, które powie Pokémon.';
    const x = lt(w), k = pick(D.eaters), nm = P(k).name, ox = others(w, 2).map(lt);
    while (ox.length < 2) ox.push(pick(Object.keys(CAFE).filter(c => c !== x && !ox.includes(c))));
    const sent = c => `I'd like ${some(c)}, please.`, good = sent(x);
    $('#arena').innerHTML = cafeHTML(k, null, `💭 ${CAFE[x]}`, 'big');
    $('#opts').innerHTML = shuffle([x].concat(ox)).map(c => `<button class="opt sent" data-t="${sent(c)}" aria-label="${c}"><i>🔊</i>${sent(c)}</button>`).join('');
    const q = `What does ${nm} say?`;
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(e.dataset.t, { rate: 0.85 }); }));
    return choose(els, el => el.dataset.t === good,
      async el => { el.classList.add('right'); FX.good(); const d = $('#ondish'); if (d) d.textContent = CAFE[x]; await wait(600); await SP.say(good); await SP.say(`Here you are! ${cap(some(x))}.`); },
      async () => { await wait(800); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.t === good));
  },
  /* „Pikachu, cut the apple!" — TPR w kuchni */
  async cook(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj polecenia i dotknij narzędzia — Pokémon zrobi to w kuchni.';
    const a = lt(w), k = pick(D.stars), nm = P(k).name, opts = shuffle([a].concat(others(w, 2).map(lt)));
    $('#arena').innerHTML = cookHTML(k, null, 'big');
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-a="${o}" aria-label="${o}">${COOK[o][0]}</button>`).join('');
    const q = `${nm}, ${COOK[a][1]}!`;
    prompt(`${nm}, <em>${COOK[a][1]}</em>!`, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.a) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.a === a,
      async el => { el.classList.add('right'); FX.good(); doCook(a); await wait(900); await SP.say(`Yes! ${nm} is ${COOK[a][2]}!`); },
      async el => { doCook(el.dataset.a); await wait(900); await SP.say(`No, ${nm} is ${COOK[el.dataset.a][2]}. ${cap(COOK[a][1])}!`, { rate: 0.85 }); },
      els.find(e => e.dataset.a === a));
  },
  /* „What is Pikachu doing?" — scena gra, dziecko wybiera zdanie */
  async cookwhat(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Popatrz, co robi Pokémon w kuchni. Dotykaj przycisków, żeby usłyszeć zdania, i wybierz dobre.';
    const a = lt(w), k = pick(D.stars), nm = P(k).name, ox = others(w, 2).map(lt);
    while (ox.length < 2) ox.push(pick(Object.keys(COOK).filter(c => c !== a && !ox.includes(c))));
    $('#arena').innerHTML = cookHTML(k, a, 'big loop');
    doCook(a);
    $('#opts').innerHTML = shuffle([a].concat(ox)).map(c => `<button class="opt sent" data-a="${c}" aria-label="${c}"><i>${COOK[c][0]}</i>${COOK[c][2]}</button>`).join('');
    const q = `What is ${nm} doing?`;
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(COOK[e.dataset.a][2]) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.a === a,
      async el => { el.classList.add('right'); FX.good(); await wait(800); await SP.say(`Yes! ${nm} is ${COOK[a][2]}!`); },
      async () => { await wait(800); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.a === a));
  },
  /* przepis: „First, cut the apple. Then, bake the cake!" — dwa narzędzia po kolei */
  async cookorder(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Przepis ma dwa kroki! Posłuchaj, co najpierw, a co potem, i dotknij narzędzi po kolei.';
    const a = lt(w), kn = others(w, 3).map(lt), b = kn.length ? pick(kn) : pick(Object.keys(COOK).filter(c => c !== a));
    const order = Math.random() < 0.5 ? [a, b] : [b, a], k = pick(D.stars), nm = P(k).name;
    const opts = shuffle([...new Set([a, b].concat(kn))].slice(0, 3));
    if (opts.length < 3) opts.push(...Object.keys(COOK).filter(c => !opts.includes(c)).slice(0, 3 - opts.length));
    $('#arena').innerHTML = cookHTML(k, null, 'big');
    $('#opts').innerHTML = shuffle(opts).map(o => `<button class="opt" data-a="${o}" aria-label="${o}">${COOK[o][0]}</button>`).join('');
    const q = `First, ${COOK[order[0]][1]}. Then, ${COOK[order[1]][1]}!`;
    prompt(`First, <em>${COOK[order[0]][1]}</em>. Then, <em>${COOK[order[1]][1]}</em>!`, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.a) + '!', { rate: 0.85 }); }));
    let step = 0, miss = 0, busy = false;
    return new Promise(res => {
      els.forEach(el => el.onclick = async () => {
        if (busy) return; busy = true;
        if (el.dataset.a === order[step]) {
          el.classList.add('right'); el.classList.remove('hint'); FX.good(); doCook(order[step]); await wait(900);
          step++;
          if (step === 2) { els.forEach(e => { e.onclick = null; }); await SP.say(`Yes! First ${COOK[order[0]][1]}, then ${COOK[order[1]][1]}!`); return res(miss === 0); }
          if (miss >= 2) { els.forEach(e => e.classList.remove('hint')); els.find(e => e.dataset.a === order[1]).classList.add('hint'); }
          await SP.say('Then?'); busy = false; return;
        }
        miss++; FX.bad(); el.classList.remove('wrong'); void el.offsetWidth; el.classList.add('wrong');
        await SP.say(q, { rate: 0.85 }); busy = false;
        if (miss >= 2) { els.forEach(e => e.classList.remove('hint')); els.find(e => e.dataset.a === order[step]).classList.add('hint'); }
      });
    });
  }
});

/* ======================================================================
   ŚWIAT 17: OPIEKA — dbamy o Pokémony z drużyny („Wash Tyranitar!"), u lekarza („What's the matter?
   My head hurts."), dziesiątki 30–100 („Seventy Poké Balls!"). Id słów: u- (opieka), i- (lekarz), w- (dziesiątki).
   ====================================================================== */
const CARE = { feed: ['🥣', 'hungry', nm => 'Yummy! Thank you!'], wash: ['🧽', 'dirty', nm => `Now ${nm} is clean!`],
  brush: ['🪮', 'messy', nm => `Now ${nm} is beautiful!`], hug: ['🤗', 'sad', nm => `Now ${nm} is happy!`] };
Object.keys(CARE).forEach(a => { DISP['u-' + a] = a; });
const NEEDDECO = {
  hungry: '<span class="nd bub">🍽️</span>', dirty: '<i class="nd mud m1"></i><i class="nd mud m2"></i><i class="nd mud m3"></i>',
  messy: '<span class="nd leaf l1">🍂</span><span class="nd leaf l2">🍃</span><span class="nd leaf l3">🍂</span>', sad: '<span class="nd bub">😢</span><span class="nd tear">💧</span>'
};
/* Pokémony do opieki: najchętniej z drużyny dziecka */
const petId = () => S.team.length ? pick(S.team) : P(pick(D.stars)).id;
const imgD = id => `<img src="${IMG(id)}" alt="${DEX[id].name}">`;
function careHTML(id, need, cls) {
  return `<div class="scene care ${cls || ''}"><i class="rug"></i><i class="window">🪟</i>
    <div class="mon cpet ${need ? 'need-' + need : ''}" id="actmon">${imgD(id)}${need ? NEEDDECO[need] : ''}</div><span class="ctool" id="ctool"></span></div>`;
}
async function careAct(a) {
  const m = $('#actmon'), t = $('#ctool'); if (!m) return;
  if (t) { t.textContent = CARE[a][0]; t.className = 'ctool on t-' + a; }
  if (a === 'feed') { m.classList.add('act-eat'); fxOn(m, 'eat'); }
  else if (a === 'wash') { fxOn(m, 'swim'); setTimeout(() => fxOn(m, 'swim'), 500); FX.noise && FX.play(f => f.noise(0, 0.6, 2500, 800, 0.15)); }
  else if (a === 'brush') { sparks(center(m).x, center(m).y, 8); }
  else if (a === 'hug') { m.classList.add('squish'); fxOn(m, 'happy'); }
  FX.pop(); await wait(1300);
  m.querySelectorAll('.nd').forEach(e => e.remove());
  m.className = 'mon cpet loop feel-happy'; if (t) t.className = 'ctool';
}
const SICK = { head: ['🤕', 'My head hurts.'], tummy: ['🤢', 'My tummy hurts.'], tooth: ['🦷', 'My tooth hurts.'],
  leg: ['🦵', 'My leg hurts.'], ear: ['👂', 'My ear hurts.'], cold: ['🤧', "I've got a cold."] };
Object.keys(SICK).forEach(x => { DISP['i-' + x] = SICK[x][1].replace(/\.$/, '').toLowerCase().replace(/^i've/, "I've"); });
const NURSE = DEXN['Chansey'] || 113;
const whoSays = x => `Who says: ${SICK[x][1].replace(/\.$/, '')}?`;
function patientHTML(k, x, cls, btn) {
  const inner = `<div class="bed"><i class="blanket"></i></div><div class="mon patient">${imgOf(k)}<span class="sym s-${x}">${SICK[x][0]}</span></div>`;
  return btn ? `<button class="scenebtn" data-w="i-${x}" data-k="${k}" aria-label="${x}"><div class="scene clinic ${cls || ''}">${inner}</div></button>`
    : `<div class="scene clinic ${cls || ''}"><span class="nurse"><img src="${IMG(NURSE)}" alt=""></span>${inner}<span class="heal" id="heal"></span></div>`;
}
const TENS = { 30: 'thirty', 40: 'forty', 50: 'fifty', 60: 'sixty', 70: 'seventy', 80: 'eighty', 90: 'ninety', 100: 'a hundred' };
Object.keys(TENS).forEach(t => { DISP['w-' + t] = TENS[t]; });
const tenN = w => +lt(w);
const tenWord = m => m === 10 ? 'ten' : m === 20 ? 'twenty' : TENS[m];
function cratesHTML(n, cls) {
  return `<div class="crates ${cls || ''}">${Array.from({ length: n / 10 }, (_, j) => `<span class="crate" style="animation-delay:${j * 0.05}s">${'<i></i>'.repeat(10)}</span>`).join('')}</div>`;
}
async function countTens(n, tok) {
  const cs = [...document.querySelectorAll('.crate')];
  for (let j = 0; j < cs.length; j++) { if (!alive(tok)) return; cs[j].classList.add('counted'); FX.pop(); await SP.say(cap(tenWord((j + 1) * 10)) + '!', { rate: 1.1 }); }
}

Object.assign(TH, {
  care: {
    async teach(w, i, n, tok) {
      const a = lt(w), id = petId(), nm = DEX[id].name;
      PLHELP = 'Opiekujemy się Pokémonami z drużyny! Posłuchaj, co robimy, i powtórz.';
      await teachCard(i, n, tok, {
        word: `${CARE[a][0]} ${a}`, vis: careHTML(id, CARE[a][1], 'big'), text: `${nm} is ${CARE[a][1]}.<br>${cap(a)} ${nm}!`,
        lines: [cap(a) + '!', `${nm} is ${CARE[a][1]}.`, async () => { await SP.say(`${cap(a)} ${nm}!`); await careAct(a); await SP.say(CARE[a][2](nm)); }],
        turnShow: `${a} ${nm}`, turnSay: `${cap(a)} ${nm}`
      });
    }
  },
  doctor: {
    async teach(w, i, n, tok) {
      const x = lt(w), k = pick(D.stars);
      PLHELP = 'U lekarza. Siostra pyta: „What\'s the matter?", a Pokémon mówi, co mu dolega. Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: `${SICK[x][0]} ${x}`, vis: patientHTML(k, x, 'big'), text: `What's the matter?<br>${SICK[x][1]}`,
        lines: [cap(x) + '!', "What's the matter?", SICK[x][1]],
        turnShow: SICK[x][1].replace(/\.$/, ''), turnSay: SICK[x][1].replace(/\.$/, '')
      });
    }
  },
  tens: {
    ynPic: (w, s) => cratesHTML(tenN(s), 'big'),
    yn: w => `Are there ${TENS[tenN(w)]} Poké Balls?`, yes: w => `Yes, there are! ${cap(TENS[tenN(w)])} Poké Balls!`,
    nope: (w, s) => `No, there aren't! There are ${TENS[tenN(s)]}.`,
    async teach(w, i, n, tok) {
      const m = tenN(w);
      PLHELP = 'W każdej skrzynce jest dziesięć Poké Balli. Liczymy skrzynkami po dziesięć. Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: `${m}`, vis: cratesHTML(m, 'big'), text: `${cap(TENS[m])} Poké Balls.`,
        lines: [cap(TENS[m]) + '!', async () => { document.querySelectorAll('.crate').forEach(c => c.classList.remove('counted')); await countTens(m, tok); }, `${cap(TENS[m])} Poké Balls.`],
        turnShow: TENS[m], turnSay: cap(TENS[m])
      });
    }
  }
});

Object.assign(GAMES, {
  /* „Pikachu is dirty. Wash Pikachu!" — dziecko wybiera, jak się zaopiekować */
  async care(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj, czego potrzebuje Pokémon, i dotknij właściwej rzeczy.';
    const a = lt(w), id = petId(), nm = DEX[id].name, opts = shuffle([a].concat(others(w, 2).map(lt)));
    $('#arena').innerHTML = careHTML(id, CARE[a][1], 'big');
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-a="${o}" aria-label="${o}">${CARE[o][0]}</button>`).join('');
    const q = `${cap(a)} ${nm}!`;
    prompt(`${nm} is ${CARE[a][1]}. <em>${cap(a)}</em> ${nm}!`, [`${nm} is ${CARE[a][1]}.`, q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.a) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.a === a,
      async el => { el.classList.add('right'); FX.good(); await careAct(a); await SP.say(CARE[a][2](nm)); },
      async () => { await wait(600); await SP.say(`${nm} is ${CARE[a][1]}. ${q}`, { rate: 0.85 }); },
      els.find(e => e.dataset.a === a));
  },
  /* „Look at Pikachu! What can you do?" — obrazek pokazuje potrzebę, dziecko wybiera zdanie */
  async careneed(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Popatrz na Pokémona: czego mu trzeba? Dotykaj przycisków, żeby usłyszeć zdania, i wybierz dobre.';
    const a = lt(w), id = petId(), nm = DEX[id].name, ox = others(w, 2).map(lt);
    while (ox.length < 2) ox.push(pick(Object.keys(CARE).filter(c => c !== a && !ox.includes(c))));
    $('#arena').innerHTML = careHTML(id, CARE[a][1], 'big');
    $('#opts').innerHTML = shuffle([a].concat(ox)).map(c => `<button class="opt sent" data-a="${c}" aria-label="${c}"><i>${CARE[c][0]}</i>${cap(c)} ${nm}!</button>`).join('');
    const q = `Look at ${nm}! What can you do?`;
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(`${cap(e.dataset.a)} ${nm}!`, { rate: 0.85 }); }));
    return choose(els, el => el.dataset.a === a,
      async el => { el.classList.add('right'); FX.good(); await careAct(a); await SP.say(CARE[a][2](nm)); },
      async () => { await wait(800); await SP.say(`No! ${nm} is ${CARE[a][1]}.`, { rate: 0.9 }); },
      els.find(e => e.dataset.a === a));
  },
  /* „What's the matter?" — dziecko wybiera, co powie chory Pokémon */
  async doctor(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Siostra pyta chorego Pokémona, co mu jest. Popatrz na obrazek, dotykaj przycisków, żeby usłyszeć zdania, i wybierz to, co powie Pokémon.';
    const x = lt(w), k = pick(D.stars), nm = P(k).name, ox = others(w, 2).map(lt);
    while (ox.length < 2) ox.push(pick(Object.keys(SICK).filter(c => c !== x && !ox.includes(c))));
    $('#arena').innerHTML = patientHTML(k, x, 'big');
    $('#opts').innerHTML = shuffle([x].concat(ox)).map(c => `<button class="opt sent" data-x="${c}" aria-label="${c}"><i>🔊</i>${SICK[c][1]}</button>`).join('');
    const q = "What's the matter?";
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(SICK[e.dataset.x][1], { rate: 0.85 }); }));
    return choose(els, el => el.dataset.x === x,
      async el => {
        el.classList.add('right'); FX.good(); await wait(500); await SP.say(SICK[x][1]);
        const h = $('#heal'); if (h) { h.textContent = '🩹'; h.classList.add('on'); } const m = $('.clinic .patient'); if (m) { m.classList.add('loop', 'feel-happy'); fxOn(m, 'happy'); }
        await SP.say('Here you are! Get well soon!');
      },
      async () => { await wait(800); await SP.say(`Look at ${nm}! ${q}`, { rate: 0.9 }); },
      els.find(e => e.dataset.x === x));
  },
  /* „Who says: My tooth hurts?" — trzech pacjentów */
  async docwho(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Trzech chorych Pokémonów. Posłuchaj zdania i dotknij tego, który tak powie.';
    const x = lt(w), ox = others(w, 2).map(lt);
    while (ox.length < 2) ox.push(pick(Object.keys(SICK).filter(c => c !== x && !ox.includes(c))));
    const xs = shuffle([x].concat(ox)), ks = shuffle(D.stars).slice(0, 3);
    $('#arena').innerHTML = `<div class="scenes">${xs.map((c, j) => patientHTML(ks[j], c, 'small', true)).join('')}</div>`;
    const q = whoSays(x);
    prompt(`Who says: <em>${SICK[x][1].replace(/\.$/, '')}</em>?`, [q], tok);
    const els = [...document.querySelectorAll('.scenebtn')], target = els.find(e => e.dataset.w === 'i-' + x);
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await SP.say(`Yes! ${P(el.dataset.k).name} says: ${SICK[x][1]}`); },
      async el => { SP.stop(); await SP.say(`No, ${P(el.dataset.k).name} says: ${SICK[lt(el.dataset.w)][1]} ${q}`, { rate: 0.85 }); },
      target);
  },
  /* „How many Poké Balls?" — skrzynki po dziesięć */
  async tencount(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'W każdej skrzynce jest dziesięć Poké Balli. Policz skrzynki dziesiątkami i dotknij właściwej liczby.';
    const m = tenN(w), kn = knownWords('tens').map(tenN).filter(x => x !== m);
    const pool = kn.length >= 2 ? kn : Object.keys(TENS).map(Number).filter(x => x !== m && Math.abs(x - m) <= 30);
    const opts = shuffle([m].concat(shuffle(pool).slice(0, 2)));
    $('#arena').innerHTML = cratesHTML(m, 'big');
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-n="${o}" aria-label="${TENS[o]}">${o}</button>`).join('');
    const q = 'How many Poké Balls?';
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(TENS[e.dataset.n]) + '!', { rate: 0.85 }); }));
    return choose(els, el => +el.dataset.n === m,
      async el => { el.classList.add('right'); FX.good(); await wait(500); await countTens(m, tok); await SP.say(`${cap(TENS[m])} Poké Balls! ${pick(PRAISE)}`); },
      async () => { await wait(700); await SP.say('Count the boxes! Ten, twenty… How many Poké Balls?', { rate: 0.9 }); },
      els.find(e => +e.dataset.n === m));
  },
  /* „Tap number seventy!" */
  async tentap(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj liczby po angielsku i dotknij właściwej.';
    const m = tenN(w), kn = knownWords('tens').map(tenN).filter(x => x !== m);
    const pool = kn.length >= 3 ? kn : Object.keys(TENS).map(Number).filter(x => x !== m);
    const opts = shuffle([m].concat(shuffle(pool).slice(0, 3)));
    $('#arena').innerHTML = monEl(pick(D.stars), 'solo');
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-n="${o}" aria-label="${TENS[o]}">${o}</button>`).join('');
    prompt(`Tap number <em>${TENS[m]}</em>!`, [`Tap number ${TENS[m]}!`, cap(TENS[m]) + '!'], tok);
    const els = [...document.querySelectorAll('.opt')];
    return choose(els, el => +el.dataset.n === m,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await throwBall($('#arena .mon')); await SP.say(`${cap(TENS[m])}! ${pick(PRAISE)}`); },
      async el => { SP.stop(); await SP.say(`That is ${TENS[el.dataset.n]}. Tap ${TENS[m]}!`, { rate: 0.85 }); },
      els.find(e => +e.dataset.n === m));
  }
});

/* ======================================================================
   ŚWIAT 18: FESTIWAL — instrumenty z prawdziwym dźwiękiem („Pikachu plays the guitar."), urodziny
   i miesiące („My birthday is in May."), mieszanie farb („Red and yellow make orange.").
   Id słów: M- (muzyka), B- (miesiące), C- (farby).
   ====================================================================== */
const INST = { guitar: '🎸', piano: '🎹', drum: '🥁', trumpet: '🎺', violin: '🎻' };
Object.keys(INST).forEach(x => { DISP['M-' + x] = x; });
/* instrumenty syntezowane w Web Audio — to treść zadania, więc grają także przy wyłączonych efektach */
function playInst(x) {
  try {
    const c = FX.init(); if (!c) return;
    const o = FX.out, t0 = c.currentTime + 0.02;
    const note = (f, at, dur, type, opt) => {
      opt = opt || {};
      const osc = c.createOscillator(), g = c.createGain(); let node = osc;
      osc.type = type; osc.frequency.setValueAtTime(f, t0 + at);
      if (opt.vib) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = opt.vib; lg.gain.value = f * 0.012; l.connect(lg); lg.connect(osc.frequency); l.start(t0 + at); l.stop(t0 + at + dur + 0.1); }
      if (opt.lp) { const fl = c.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.setValueAtTime(opt.lp, t0 + at); if (opt.lpTo) fl.frequency.exponentialRampToValueAtTime(opt.lpTo, t0 + at + dur); osc.connect(fl); node = fl; }
      const att = opt.att || 0.01, v = opt.vol || 0.25;
      g.gain.setValueAtTime(0.0001, t0 + at); g.gain.exponentialRampToValueAtTime(v, t0 + at + att);
      if (opt.hold) g.gain.setValueAtTime(v, t0 + at + dur * 0.8);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + dur);
      node.connect(g); g.connect(o); osc.start(t0 + at); osc.stop(t0 + at + dur + 0.05);
    };
    const tune = [523, 659, 784, 659, 523];
    if (x === 'piano') tune.forEach((f, j) => { note(f, j * 0.28, 0.9, 'triangle', { vol: 0.3 }); note(f * 2, j * 0.28, 0.5, 'sine', { vol: 0.06 }); });
    else if (x === 'guitar') [196, 247, 294, 392, 294].forEach((f, j) => note(f, j * 0.26, 0.8, 'sawtooth', { vol: 0.22, lp: 3200, lpTo: 400 }));
    else if (x === 'trumpet') [392, 523, 659, 784].forEach((f, j) => note(f, j * 0.3, j === 3 ? 0.7 : 0.26, 'sawtooth', { vol: 0.16, lp: 2000, att: 0.04, hold: true, vib: j === 3 ? 5 : 0 }));
    else if (x === 'violin') [440, 494, 523, 587].forEach((f, j) => note(f, j * 0.42, 0.55, 'sawtooth', { vol: 0.12, lp: 2600, att: 0.14, hold: true, vib: 6 }));
    else if (x === 'drum') [0, 0.28, 0.56, 0.7, 0.98].forEach((at, j) => {
      if (j === 1 || j === 4) { const len = Math.floor(c.sampleRate * 0.18), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
        for (let q = 0; q < len; q++) d[q] = (Math.random() * 2 - 1) * (1 - q / len);
        const s = c.createBufferSource(), g = c.createGain(); s.buffer = buf; g.gain.value = 0.35; s.connect(g); g.connect(o); s.start(t0 + at); }
      else { const osc = c.createOscillator(), g = c.createGain(); osc.frequency.setValueAtTime(150, t0 + at); osc.frequency.exponentialRampToValueAtTime(45, t0 + at + 0.25);
        g.gain.setValueAtTime(0.6, t0 + at); g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + 0.3); osc.connect(g); g.connect(o); osc.start(t0 + at); osc.stop(t0 + at + 0.35); }
    });
  } catch (e) { }
}
function bandHTML(k, x, cls) {
  return `<div class="scene stage ${cls || ''}"><i class="spot1"></i><i class="spot2"></i><i class="notes">🎵</i>
    <div class="mon player" id="actmon">${imgOf(k)}</div><span class="instr" id="instr">${x ? INST[x] : ''}</span></div>`;
}
async function perform(x) {
  const s = $('.stage'), m = $('#actmon'), ins = $('#instr');
  if (ins) { ins.textContent = INST[x]; ins.classList.remove('pop'); void ins.offsetWidth; ins.classList.add('pop'); }
  if (s) { s.classList.remove('live'); void s.offsetWidth; s.classList.add('live'); }
  if (m) actOn(m, 'dance', true);
  playInst(x); await wait(1500);
}
const MON = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const MONEM = ['⛄', '💝', '🌱', '🌷', '🌼', '🍓', '☀️', '🍉', '🍎', '🎃', '🍂', '🎄'];
MON.forEach(m => { DISP['B-' + m] = cap(m); });
const mN = w => cap(lt(w));
const monthCard = (m, cls, btn) => { const j = MON.indexOf(m);
  return `<${btn ? 'button' : 'span'} class="mcard ${cls || ''}" ${btn ? `data-w="B-${m}" aria-label="${cap(m)}"` : ''} style="--h:${(j * 30 + 200) % 360}"><i>${MONEM[j]}</i><b>${cap(m)}</b></${btn ? 'button' : 'span'}>`; };
function partyHTML(k, m, cls) {
  return `<div class="scene party ${cls || ''}"><i class="balloons">🎈🎈</i><i class="garland"></i>
    <div class="mon pguest" id="actmon">${imgOf(k)}<span class="phat">🎉</span></div><span class="pcake">🎂</span>${m ? monthCard(m, 'onwall') : ''}</div>`;
}
const MIX = { orange: ['red', 'yellow'], green: ['blue', 'yellow'], purple: ['red', 'blue'], pink: ['red', 'white'], grey: ['black', 'white'], brown: ['red', 'green'] };
Object.keys(MIX).forEach(c => { DISP['C-' + c] = c; });
const mixOf = (a, b) => Object.keys(MIX).find(c => a !== b && MIX[c].includes(a) && MIX[c].includes(b));
const makeTxt = c => `${cap(MIX[c][0])} and ${MIX[c][1]} make ${c}.`;
function paintHTML(a, b, res, cls) {
  return `<div class="scene paint ${cls || ''}"><i class="easel"></i>
    <span class="pot p1" style="--pc:${COLHEX[a]}"><i></i></span><span class="pot p2" style="--pc:${COLHEX[b]}"><i></i></span>
    <span class="bowl2" id="bowl" style="--pc:${res ? COLHEX[res] : '#f4f1ea'}">${res ? '' : '❔'}</span><span class="pmon" id="pmon"></span></div>`;
}
async function pour(root) { const s = (root || document).querySelector('.paint'); if (!s) return; s.classList.remove('pouring'); void s.offsetWidth; s.classList.add('pouring'); FX.whoosh(); await wait(1300); }
function fillBowl(c) { const b = $('#bowl'); if (b) { b.style.setProperty('--pc', COLHEX[c]); b.textContent = ''; b.classList.add('done'); } }
function showColMon(c) { const ks = D.colours[c]; const p = $('#pmon'); if (!ks || !p) return null; const k = pick(ks); p.innerHTML = imgOf(k); p.classList.add('on'); return P(k).name; }

Object.assign(TH, {
  music: {
    pic: (w, k, sz) => `<div class="ecard ${sz || ''}"><div class="mon">${imgOf(k)}</div><span class="prop">${INST[lt(w)]}</span></div>`, ic: w => INST[lt(w)],
    findQ: w => `Who plays the ${lt(w)}?`,
    ok: (w, nm) => `Yes! ${nm} plays the ${lt(w)}!`, no: (d, w, nm) => `No, ${nm} plays the ${lt(d)}. Who plays the ${lt(w)}?`,
    pl: ['Posłuchaj, na czym gra Pokémon, i dotknij właściwego obrazka.'],
    async teach(w, i, n, tok) {
      const x = lt(w), k = pick(D.stars), nm = P(k).name;
      PLHELP = 'Instrumenty! Posłuchaj, jak brzmi instrument i jak się nazywa po angielsku. Potem powtórz.';
      await teachCard(i, n, tok, {
        word: `${INST[x]} ${x}`, vis: bandHTML(k, x, 'big'), text: `${nm} plays the ${x}.`,
        lines: [cap(x) + '!', async () => { await perform(x); }, `${nm} plays the ${x}.`],
        turnShow: 'the ' + x, turnSay: 'The ' + x
      });
    }
  },
  party: {
    async teach(w, i, n, tok) {
      const m = lt(w), k = pick(D.stars), nm = P(k).name;
      PLHELP = 'Urodziny! Miesiące po angielsku piszemy wielką literą. Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: `${MONEM[MON.indexOf(m)]} ${cap(m)}`, vis: partyHTML(k, m, 'big'), text: `My birthday is in ${cap(m)}.`,
        lines: [cap(m) + '!', `My birthday is in ${cap(m)}.`, async () => { confetti(30); FX.fanfare(); await SP.say('Happy birthday!'); }],
        turnShow: 'in ' + cap(m), turnSay: 'In ' + cap(m)
      });
    }
  },
  paint: {
    async teach(w, i, n, tok) {
      const c = lt(w), [a, b] = MIX[c];
      PLHELP = 'Mieszamy farby! Posłuchaj, jakie dwa kolory dają nowy kolor, i powtórz.';
      await teachCard(i, n, tok, {
        word: c, vis: paintHTML(a, b, null, 'big'), text: makeTxt(c),
        lines: [cap(c) + '!', async () => {
          const bw = $('#bowl'); if (bw) { bw.style.setProperty('--pc', '#f4f1ea'); bw.classList.remove('done'); }
          await pour(); fillBowl(c); const nm = showColMon(c); FX.pop(); await SP.say(makeTxt(c)); if (nm) await SP.say(`Look! ${nm} is ${c}!`);
        }],
        turnShow: `${a} and ${b} make ${c}`, turnSay: `${cap(a)} and ${b} make ${c}`
      });
    }
  }
});

Object.assign(GAMES, {
  /* „Listen! Which instrument is it?" — słychać instrument, dziecko wybiera */
  async musichear(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj dźwięku. Jaki to instrument? Dotykaj znaczków — każdy gra i mówi swoją nazwę.';
    const x = lt(w), k = pick(D.stars), opts = shuffle([x].concat(others(w, 2).map(lt)));
    $('#arena').innerHTML = bandHTML(k, null, 'big');
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-x="${o}" aria-label="${o}">${INST[o]}</button>`).join('');
    const q = 'Listen! Which instrument is it?';
    $('#again').onclick = () => { FX.tap(); SP.stop(); playInst(x); };
    $('#txt').innerHTML = '🎵 Listen! Which instrument is it?';
    (async () => { await SP.say(q); if (alive(tok)) { await wait(200); playInst(x); } })();
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say('The ' + e.dataset.x + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.x === x,
      async el => { el.classList.add('right'); FX.good(); await wait(600); await perform(x); await SP.say(`Yes! It is the ${x}!`); },
      async el => { await wait(700); playInst(el.dataset.x); await wait(1600); await SP.say(`That is the ${el.dataset.x}. Listen again!`, { rate: 0.85 }); await wait(200); playInst(x); },
      els.find(e => e.dataset.x === x));
  },
  /* „Pikachu, play the drum!" — TPR na scenie */
  async musicplay(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj, na czym ma zagrać Pokémon, i dotknij tego instrumentu.';
    const x = lt(w), k = pick(D.stars), nm = P(k).name, opts = shuffle([x].concat(others(w, 2).map(lt)));
    $('#arena').innerHTML = bandHTML(k, null, 'big');
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-x="${o}" aria-label="${o}">${INST[o]}</button>`).join('');
    const q = `${nm}, play the ${x}!`;
    prompt(`${nm}, play the <em>${x}</em>!`, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    return choose(els, el => el.dataset.x === x,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await perform(x); await SP.say(`Yes! ${nm} plays the ${x}!`); },
      async el => { SP.stop(); await perform(el.dataset.x); await SP.say(`No, that is the ${el.dataset.x}. ${q}`, { rate: 0.85 }); },
      els.find(e => e.dataset.x === x));
  },
  /* „Find May!" — kartki z kalendarza */
  async monthfind(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj nazwy miesiąca i dotknij właściwej kartki z kalendarza.';
    const m = lt(w), kn = others(w, 3).map(lt), j = MON.indexOf(m);
    let pool = kn.length >= 2 ? kn : kn.concat([MON[(j + 1) % 12], MON[(j + 11) % 12]].filter(x => !kn.includes(x)));
    const opts = shuffle([m].concat(shuffle(pool).slice(0, 3)));
    $('#arena').innerHTML = `<div class="months">${opts.map(o => monthCard(o, '', true)).join('')}</div>`;
    const q = `Find ${cap(m)}!`;
    prompt(`Find <em>${cap(m)}</em>!`, [q], tok);
    const els = [...document.querySelectorAll('.mcard')], target = els.find(e => e.dataset.w === w);
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); sparks(center(el).x, center(el).y, 10); await SP.say(`Yes! ${cap(m)}!`); },
      async el => { SP.stop(); await SP.say(`That is ${mN(el.dataset.w)}. Find ${cap(m)}!`, { rate: 0.85 }); },
      target);
  },
  /* „What comes after April?" */
  async monthnext(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Jaki miesiąc jest po tym miesiącu? Dotykaj kartek — każda mówi swoją nazwę — i wybierz dobrą.';
    const m = lt(w), j = MON.indexOf(m), prev = MON[(j + 11) % 12];
    const kn = others(w, 3).map(lt).filter(x => x !== prev);
    const pool = kn.length >= 2 ? kn : kn.concat([MON[(j + 1) % 12], MON[(j + 2) % 12]].filter(x => !kn.includes(x)));
    const opts = shuffle([m].concat(shuffle(pool).slice(0, 2)));
    $('#arena').innerHTML = `<div class="months">${monthCard(prev, 'prev')}<b class="arr">➜</b><span class="mcard blank"><i>❔</i></span></div>`;
    $('#opts').innerHTML = opts.map(o => monthCard(o, 'mopt', true)).join('');
    const q = `What comes after ${cap(prev)}?`;
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('#opts .mcard')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(mN(e.dataset.w) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.w === w,
      async el => { el.classList.add('right'); FX.good(); const b = $('.mcard.blank'); if (b) b.outerHTML = monthCard(m); await wait(500); await SP.say(`Yes! After ${cap(prev)} comes ${cap(m)}!`); },
      async () => { await wait(700); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.w === w));
  },
  /* „When is your birthday, Pikachu?" — „My birthday is in May!" — „When is the party?" */
  async bday(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj, kiedy Pokémon ma urodziny, i dotknij tego miesiąca.';
    const m = lt(w), k = pick(D.stars), nm = P(k).name, kn = others(w, 2).map(lt), j = MON.indexOf(m);
    const pool = kn.length >= 2 ? kn : kn.concat([MON[(j + 1) % 12], MON[(j + 6) % 12]].filter(x => !kn.includes(x)));
    const opts = shuffle([m].concat(pool.slice(0, 2)));
    $('#arena').innerHTML = partyHTML(k, null, 'big');
    $('#opts').innerHTML = opts.map(o => monthCard(o, 'mopt', true)).join('');
    const q = 'When is the party?';
    prompt(`🎂 My birthday is in <em>${cap(m)}</em>!`, [`When is your birthday, ${nm}?`, `My birthday is in ${cap(m)}!`, q], tok);
    const els = [...document.querySelectorAll('#opts .mcard')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(mN(e.dataset.w) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.w === w,
      async el => { el.classList.add('right'); FX.good(); confetti(40); FX.fanfare(); await wait(400); await SP.say(`Yes! The party is in ${cap(m)}! Happy birthday, ${nm}!`); },
      async () => { await wait(700); await SP.say(`My birthday is in ${cap(m)}! ${q}`, { rate: 0.9 }); },
      els.find(e => e.dataset.w === w));
  },
  /* „Red and yellow make…?" — farby się mieszają, dziecko wybiera kolor */
  async mix(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Dwie farby wlewają się do miski. Jaki kolor wyjdzie? Dotknij kółka — usłyszysz nazwę koloru.';
    const c = lt(w), [a, b] = MIX[c], kn = others(w, 2).map(lt);
    const pool = kn.length >= 2 ? kn : kn.concat(Object.keys(MIX).filter(x => x !== c && !kn.includes(x)));
    const opts = shuffle([c].concat(shuffle(pool).slice(0, 2)));
    $('#arena').innerHTML = paintHTML(a, b, null, 'big');
    $('#opts').innerHTML = opts.map(o => `<button class="opt swatch" data-c="${o}" style="background:${COLHEX[o]}" aria-label="${o}"></button>`).join('');
    const q = `${cap(a)} and ${b} make…?`;
    prompt(`${cap(a)} and ${b} make… ❔`, [q], tok);
    pour();
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.c) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.c === c,
      async el => { el.classList.add('right'); FX.good(); fillBowl(c); sparks(center($('#bowl')).x, center($('#bowl')).y, 12); await wait(500);
        await SP.say(`Yes! ${makeTxt(c)}`); const nm = showColMon(c); if (nm) await SP.say(`Look! ${nm} is ${c}!`); },
      async () => { await wait(700); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.c === c));
  },
  /* „Make green!" — dziecko samo wybiera dwie farby */
  async mixmake(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj, jaki kolor zrobić, i dotknij dwóch farb, które go dają.';
    const c = lt(w), base = ['red', 'yellow', 'blue', 'white', 'black', 'green'].filter(x => x !== c);
    $('#arena').innerHTML = paintHTML('white', 'white', null, 'big blankpots');
    $('#opts').innerHTML = shuffle(base).map(o => `<button class="opt potbtn" data-c="${o}" aria-label="${o}"><span class="potic" style="--pc:${COLHEX[o]}"></span></button>`).join('');
    const q = `Make ${c}!`;
    prompt(`Make <em>${c}</em>!`, [q], tok);
    const els = [...document.querySelectorAll('.potbtn')];
    let first = null, miss = 0, busy = false;
    const setPot = (j, col) => { const p = $('.paint .p' + j); if (p) p.style.setProperty('--pc', COLHEX[col]); };
    const hint = () => { els.forEach(e => e.classList.remove('hint')); MIX[c].forEach(col => { const e = els.find(x => x.dataset.c === col); if (e && !e.classList.contains('used')) e.classList.add('hint'); }); };
    return new Promise(res => {
      els.forEach(el => el.onclick = async () => {
        if (busy) return;
        const col = el.dataset.c; SP.stop(); SP.say(cap(col) + '!', { rate: 0.9 }); FX.pop();
        if (!first) { first = col; el.classList.add('used'); setPot(1, col); if (miss >= 2) hint(); return; }
        if (col === first) return;
        busy = true; setPot(2, col); el.classList.add('used');
        const r = mixOf(first, col); await pour();
        if (r === c) {
          els.forEach(e => { e.onclick = null; e.classList.remove('hint'); }); fillBowl(c); FX.good();
          await SP.say(`Yes! ${makeTxt(c)}`); const nm = showColMon(c); if (nm) await SP.say(`Look! ${nm} is ${c}!`);
          return res(miss === 0);
        }
        miss++; FX.bad();
        if (r) { fillBowl(r); await SP.say(`${cap(first)} and ${col} make ${r}. ${q}`, { rate: 0.85 }); }
        else { const b = $('#bowl'); if (b) { b.style.setProperty('--pc', '#8a7a6a'); b.textContent = ''; } await SP.say(`Oops! That is not ${c}. ${q}`, { rate: 0.85 }); }
        first = null; els.forEach(e => e.classList.remove('used')); setPot(1, 'white'); setPot(2, 'white');
        const b = $('#bowl'); if (b) { b.style.setProperty('--pc', '#f4f1ea'); b.textContent = '❔'; b.classList.remove('done'); }
        busy = false; if (miss >= 2) hint();
      });
    });
  }
});

/* ======================================================================
   ŚWIAT 19: SPORT — wyścig i miejsca na podium („Pikachu is second!"), dyscypliny („Pikachu plays
   tennis."), ruch z piłką („Pikachu, kick the ball!"). Id słów: R- (miejsca), S- (sporty), K- (ruchy).
   ====================================================================== */
const ORD = ['first', 'second', 'third', 'last'];
const MEDAL = ['🥇', '🥈', '🥉', '🐢'];
ORD.forEach(o => { DISP['R-' + o] = o; });
const ordOf = w => ORD.indexOf(lt(w));
function raceHTML(ks, cls) {
  // ks[j] = Pokémon na miejscu j; tory w losowej kolejności
  const lanes = shuffle([0, 1, 2, 3]);
  return `<div class="scene race4 ${cls || ''}"><i class="finish"></i>${lanes.map((pl, j) =>
    `<div class="lane" style="--j:${j}"><span class="runner" style="--d:${1.1 + pl * 0.45}s">${imgOf(ks[pl])}</span></div>`).join('')}</div>`;
}
function podiumHTML(ks, cls, hi) {
  return `<div class="scene podium ${cls || ''}"><i class="flag">🏁</i>${ks.map((k, j) =>
    `<button class="pbox pl${j} ${hi === j ? 'hi' : ''}" data-j="${j}" data-k="${k}" aria-label="${P(k).name}"><span class="pm">${imgOf(k)}</span><b>${MEDAL[j]}</b><i class="step">${j < 3 ? j + 1 : ''}</i></button>`).join('')}</div>`;
}
async function runRace(ks, tok, cls) {
  $('#arena').innerHTML = raceHTML(ks, 'big');
  FX.whoosh(); await wait(2700); if (!alive(tok)) return;
  $('#arena').innerHTML = podiumHTML(ks, 'big ' + (cls || '')); FX.fanfare();
}
const SPORT = { tennis: '🎾', basketball: '🏀', volleyball: '🏐', baseball: '⚾', golf: '⛳', hockey: '🏒' };
Object.keys(SPORT).forEach(s => { DISP['S-' + s] = s; });
function sportHTML(k, s, cls) {
  return `<div class="scene sport sp-${s} ${cls || ''}"><i class="court"></i><i class="net"></i><span class="sball">${SPORT[s]}</span><div class="mon">${imgOf(k)}</div></div>`;
}
const MOVE = { kick: ['🦵', 'kick the ball', 'kicking the ball'], throw: ['🤾', 'throw the ball', 'throwing the ball'],
  catch: ['🧤', 'catch the ball', 'catching the ball'], climb: ['🧗', 'climb the tree', 'climbing the tree'] };
Object.keys(MOVE).forEach(a => { DISP['K-' + a] = a; });
function moveHTML(k, a, cls) {
  return `<div class="scene mv ${cls || ''}" data-a="${a || ''}"><i class="ground"></i><i class="mtree">🌳</i><div class="mon mvmon">${imgOf(k)}</div><span class="mball">⚽</span></div>`;
}
function doMove(a, root) {
  const s = (root || document).querySelector('.mv'); if (!s) return;
  s.dataset.a = a; s.classList.remove('go'); void s.offsetWidth; s.classList.add('go'); FX.whoosh();
}

Object.assign(TH, {
  race: {
    async teach(w, i, n, tok) {
      const j = ordOf(w), ks = shuffle(D.stars).slice(0, 4), nm = P(ks[j]).name;
      PLHELP = 'Wyścig Pokémonów! Kto jest pierwszy, drugi, trzeci, a kto ostatni? Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: `${MEDAL[j]} ${ORD[j]}`, vis: podiumHTML(ks, 'big', j), text: `${nm} is ${ORD[j]}!`,
        lines: [cap(ORD[j]) + '!', `${nm} is ${ORD[j]}!`],
        turnShow: ORD[j], turnSay: cap(ORD[j])
      });
    }
  },
  sport: {
    pic: (w, k, sz) => sportHTML(k, lt(w), sz), ic: w => SPORT[lt(w)],
    learn: (w, ex) => ({ vis: sportHTML(ex[0], lt(w), 'big'), s: `${P(ex[0]).name} plays ${lt(w)}.`, turn: `I play ${lt(w)}` }),
    findQ: w => `Who plays ${lt(w)}?`, whatQ: nm => `What does ${nm} play?`,
    ok: (w, nm) => `Yes! ${nm} plays ${lt(w)}!`, no: (d, w, nm) => `No, ${nm} plays ${lt(d)}. Who plays ${lt(w)}?`,
    yn: (w, nm) => `Does ${nm} play ${lt(w)}?`, yes: (w, nm) => `Yes, it does! ${nm} plays ${lt(w)}!`,
    nope: (w, s, nm) => `No, it doesn't! ${nm} plays ${lt(s)}.`,
    pl: ['Posłuchaj, w co gra Pokémon, i dotknij właściwego obrazka.', 'W co gra Pokémon? Dotknij znaczka — usłyszysz nazwę sportu.']
  },
  moves: {
    async teach(w, i, n, tok) {
      const a = lt(w), k = pick(D.stars), nm = P(k).name;
      PLHELP = 'Ruch z piłką! Posłuchaj polecenia i popatrz, co robi Pokémon. Potem powtórz.';
      await teachCard(i, n, tok, {
        word: `${MOVE[a][0]} ${a}`, vis: moveHTML(k, a, 'big'), text: `${cap(MOVE[a][1])}!<br>${nm} is ${MOVE[a][2]}.`,
        lines: [cap(a) + '!', async () => { doMove(a); await SP.say(cap(MOVE[a][1]) + '!'); await wait(500); }, `${nm} is ${MOVE[a][2]}.`],
        turnShow: MOVE[a][1], turnSay: cap(MOVE[a][1])
      });
    }
  }
});

Object.assign(GAMES, {
  /* wyścig, potem podium: „Who is second?" */
  async racewho(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Popatrz na wyścig i na podium. Posłuchaj, o które miejsce pytamy, i dotknij tego Pokémona.';
    const j = ordOf(w), ks = shuffle(D.stars).slice(0, 4);
    const q = `Who is ${ORD[j]}?`;
    $('#txt').innerHTML = '🏁 Ready, steady, go!'; SP.say('Ready, steady, go!');
    await runRace(ks, tok); if (!alive(tok)) return false;
    prompt(`Who is <em>${ORD[j]}</em>?`, [q], tok);
    const els = [...document.querySelectorAll('.pbox')], target = els[j];
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await SP.say(`Yes! ${P(ks[j]).name} is ${ORD[j]}!`); },
      async el => { SP.stop(); await SP.say(`No, ${P(el.dataset.k).name} is ${ORD[+el.dataset.j]}. ${q}`, { rate: 0.85 }); },
      target);
  },
  /* „Is Pikachu first?" — tak/nie przy podium */
  async raceyn(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Popatrz na Pokémona ze strzałką. Czy zajął to miejsce? Tak — 👍. Nie — 👎.';
    const j = ordOf(w), ks = shuffle(D.stars).slice(0, 4), truth = Math.random() < 0.5;
    const h = truth ? j : pick([0, 1, 2, 3].filter(x => x !== j)), nm = P(ks[h]).name;
    $('#arena').innerHTML = podiumHTML(ks, 'big', h);
    $('#opts').innerHTML = '<button class="opt yn" data-a="yes" aria-label="yes">👍<small>Yes</small></button><button class="opt yn" data-a="no" aria-label="no">👎<small>No</small></button>';
    const q = `Is ${nm} ${ORD[j]}?`, right = truth ? 'yes' : 'no';
    prompt(`Is ${nm} <em>${ORD[j]}</em>?`, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(e.dataset.a === 'yes' ? 'Yes!' : 'No!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.a === right,
      async el => { el.classList.add('right'); FX.good(); await wait(500); await SP.say(truth ? `Yes, it is! ${nm} is ${ORD[j]}!` : `No, it isn't! ${nm} is ${ORD[h]}.`); },
      async () => { await wait(600); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.a === right));
  },
  /* „Pikachu, kick the ball!" — TPR na boisku */
  async move(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj polecenia i dotknij ruchu, który ma zrobić Pokémon.';
    const a = lt(w), k = pick(D.stars), nm = P(k).name, opts = shuffle([a].concat(others(w, 2).map(lt)));
    $('#arena').innerHTML = moveHTML(k, null, 'big');
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-a="${o}" aria-label="${o}">${MOVE[o][0]}</button>`).join('');
    const q = `${nm}, ${MOVE[a][1]}!`;
    prompt(`${nm}, <em>${MOVE[a][1]}</em>!`, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.a) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.a === a,
      async el => { el.classList.add('right'); FX.good(); doMove(a); await wait(1200); await SP.say(`Yes! ${nm} is ${MOVE[a][2]}!`); },
      async el => { doMove(el.dataset.a); await wait(1200); await SP.say(`No, ${nm} is ${MOVE[el.dataset.a][2]}. ${cap(MOVE[a][1])}!`, { rate: 0.85 }); },
      els.find(e => e.dataset.a === a));
  },
  /* „Who is climbing the tree?" — trzy sceny w ruchu */
  async movewho(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Trzy Pokémony robią różne rzeczy. Posłuchaj pytania i dotknij właściwego.';
    const a = lt(w), ox = others(w, 2).map(lt);
    while (ox.length < 2) ox.push(pick(Object.keys(MOVE).filter(c => c !== a && !ox.includes(c))));
    const as = shuffle([a].concat(ox)), ks = shuffle(D.stars).slice(0, 3);
    $('#arena').innerHTML = `<div class="scenes">${as.map((x, j) => `<button class="scenebtn" data-a="${x}" data-k="${ks[j]}" aria-label="${x}">${moveHTML(ks[j], x, 'small loop go')}</button>`).join('')}</div>`;
    const q = `Who is ${MOVE[a][2]}?`;
    prompt(`Who is <em>${MOVE[a][2]}</em>?`, [q], tok);
    const els = [...document.querySelectorAll('.scenebtn')], target = els.find(e => e.dataset.a === a);
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await SP.say(`Yes! ${P(el.dataset.k).name} is ${MOVE[a][2]}!`); },
      async el => { SP.stop(); await SP.say(`No, ${P(el.dataset.k).name} is ${MOVE[el.dataset.a][2]}. ${q}`, { rate: 0.85 }); },
      target);
  }
});

/* ======================================================================
   ŚWIAT 20: TĘCZA — czytanie całych zdań („The dog has got a ball."), rozmowa o sobie („What's your
   favourite colour? My favourite colour is blue."), ubieranie się na pogodę („It is snowy. Put on
   your gloves!"). Id słów: T- (zdania), F- (o mnie), W- (ubrania na pogodę).
   ====================================================================== */
const RA = { cat: '🐱', dog: '🐶', fish: '🐟', bird: '🐦', frog: '🐸', duck: '🦆' };
const CANDO = { fly: ['bird', 'duck'], swim: ['fish', 'duck', 'frog'], jump: ['frog', 'cat'], run: ['dog', 'cat'] };
const HASI = { ball: '⚽', hat: '🎩', cake: '🍰', kite: '🪁' };
const BOXAT = { in: 'in the box', on: 'on the box', under: 'under the box', next: 'next to the box' };
const RSW = { is: 'big or small', on: 'in, on, under', can: 'can', has: 'has got' };
Object.keys(RSW).forEach(x => { DISP['T-' + x] = RSW[x]; });
const raHTML = (a, cls, extra) => `<div class="rcard ${cls || ''}">${extra || ''}<span class="ra">${RA[a]}</span></div>`;
/* każdy wzór zdania: tekst + trzy obrazki (jeden pasuje) */
const RS = {
  is: () => { const a = pick(Object.keys(RA)), z = pick(['big', 'small']), zz = z === 'big' ? 'small' : 'big', b = pick(Object.keys(RA).filter(x => x !== a));
    const t = (x, y) => `The ${x} is ${y}.`;
    return { txt: t(a, z), opts: [[t(a, z), raHTML(a, 'z-' + z)], [t(a, zz), raHTML(a, 'z-' + zz)], [t(b, z), raHTML(b, 'z-' + z)]] }; },
  on: () => { const a = pick(Object.keys(RA)), ps = shuffle(Object.keys(BOXAT)).slice(0, 3);
    const t = p => `The ${a} is ${BOXAT[p]}.`;
    return { txt: t(ps[0]), opts: ps.map(p => [t(p), raHTML(a, 'rbox at-' + p, '<i class="bx"></i>')]) }; },
  can: () => { const v = pick(Object.keys(CANDO)), a = pick(CANDO[v]);
    const v2 = pick(Object.keys(CANDO).filter(x => x !== v && CANDO[x].includes(a)) .concat(Object.keys(CANDO).filter(x => x !== v)).slice(0, 1));
    const b = pick(CANDO[v].filter(x => x !== a).concat(Object.keys(RA).filter(x => x !== a && !CANDO[v].includes(x))).slice(0, 1));
    const t = (x, y) => `The ${x} can ${y}.`;
    const opt = (x, y) => [t(x, y), raHTML(x, 'do-' + y, y === 'fly' ? '<i class="sky">☁️</i>' : y === 'swim' ? '<i class="pool"></i>' : y === 'run' ? '<i class="dash">💨</i>' : '<i class="hop">⤴️</i>')];
    return { txt: t(a, v), opts: [opt(a, v), opt(a, v2), opt(b, v)] }; },
  has: () => { const a = pick(Object.keys(RA)), it = pick(Object.keys(HASI)), it2 = pick(Object.keys(HASI).filter(x => x !== it)), b = pick(Object.keys(RA).filter(x => x !== a));
    const t = (x, y) => `The ${x} has got a ${y}.`;
    const opt = (x, y) => [t(x, y), raHTML(x, 'has', `<span class="hi2">${HASI[y]}</span>`)];
    return { txt: t(a, it), opts: [opt(a, it), opt(a, it2), opt(b, it)] }; }
};
const FAV = {
  colour: { q: "What's your favourite colour?", s: x => `My favourite colour is ${x}.`, items: () => shuffle(['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'black']).slice(0, 6),
    html: x => `<span class="favsw" style="background:${COLHEX[x]}"></span>` },
  food: { q: "What's your favourite food?", s: x => `My favourite food is ${FOODPL[x]}.`, items: () => shuffle(Object.keys(FOOD)).slice(0, 6), html: x => FOOD[x] },
  animal: { q: "What's your favourite animal?", s: x => `My favourite animal is the ${x}.`, items: () => shuffle(Object.keys(ANIMAL)).slice(0, 6), html: x => ANIMAL[x] },
  season: { q: "What's your favourite season?", s: x => `My favourite season is ${x}.`, items: () => Object.keys(SEASON), html: x => SEASON[x] },
  pokemon: { q: "What's your favourite Pokémon?", s: x => `My favourite Pokémon is ${DEX[x].name}.`,
    items: () => [...new Set(S.team.concat(shuffle(D.stars).map(k => P(k).id)))].slice(0, 6), html: x => `<img src="${IMG(x)}" alt="">` }
};
Object.keys(FAV).forEach(f => { DISP['F-' + f] = 'favourite ' + f; });
const WEARX = { coat: ['🧥', 'Put on your coat!', ['snowy', 'windy']], gloves: ['🧤', 'Put on your gloves!', ['snowy']],
  boots: ['🥾', 'Put on your boots!', ['rainy', 'snowy']], sunglasses: ['🕶️', 'Put on your sunglasses!', ['sunny']],
  umbrella: ['☂️', 'Take your umbrella!', ['rainy']], shorts: ['🩳', 'Put on your shorts!', ['sunny']] };
Object.keys(WEARX).forEach(x => { DISP['W-' + x] = x; });
function dressHTML(wx, k, x, cls) {
  return `<div class="dresswrap ${cls || ''}">${sceneHTML(wx, k, 'big')}<span class="worn ${x ? 'on' : ''}" id="worn">${x ? WEARX[x][0] : ''}</span></div>`;
}

Object.assign(TH, {
  readsent: {
    async teach(w, i, n, tok) {
      const g = RS[lt(w)](), o = g.opts[0];
      PLHELP = 'Czytamy całe zdania! Popatrz na słowa, posłuchaj i przeczytaj na głos.';
      await teachCard(i, n, tok, {
        word: '📖 Read!', vis: o[1].replace('rcard', 'rcard big'), text: `<span class="readme">${g.txt}</span>`,
        lines: ['Read!', g.txt],
        turnShow: g.txt.replace(/\.$/, ''), turnSay: g.txt.replace(/\.$/, '')
      });
    }
  },
  aboutme: {
    async teach(w, i, n, tok) {
      const f = lt(w), F = FAV[f], items = F.items(), x = items[0], k = pick(D.stars), nm = P(k).name;
      PLHELP = 'Rozmowa o Tobie! Pokémon pyta, co lubisz najbardziej. Posłuchaj pytania i odpowiedzi, a potem powiedz o sobie.';
      await teachCard(i, n, tok, {
        word: '💬 ' + f, vis: `<div class="mon">${imgOf(k)}</div><span class="favbig">${F.html(x)}</span>`,
        text: `${F.q}<br>${F.s(x)}`,
        lines: [F.q, F.s(x)],
        turnShow: F.s(x).replace(/\.$/, ''), turnSay: F.s(x).replace(/\.$/, '')
      });
    }
  },
  dress: {
    async teach(w, i, n, tok) {
      const x = lt(w), wx = pick(WEARX[x][2]), k = pick(D.stars);
      PLHELP = 'Ubieramy się na pogodę! Posłuchaj, jaka jest pogoda i co trzeba założyć, i powtórz.';
      await teachCard(i, n, tok, {
        word: `${WEARX[x][0]} ${x}`, vis: dressHTML(wx, k, x), text: `It is ${wx}. ${WEARX[x][1]}`,
        lines: [cap(x) + '!', `It is ${wx}.`, WEARX[x][1]],
        turnShow: WEARX[x][1].replace(/!$/, ''), turnSay: WEARX[x][1].replace(/!$/, '')
      });
    }
  }
});

Object.assign(GAMES, {
  /* zdanie bez głosu — dziecko czyta i wybiera obrazek */
  async readfind(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Przeczytaj zdanie i dotknij obrazka, który do niego pasuje. Jeśli trudno — po pomyłce głos przeczyta zdanie.';
    const g = RS[lt(w)](), opts = shuffle(g.opts);
    $('#arena').innerHTML = `<div class="scenes">${opts.map(([t, h]) => `<button class="scenebtn readbtn" data-t="${t}" aria-label="picture">${h}</button>`).join('')}</div>`;
    prompt(`<span class="readme">${g.txt}</span>`, ['Read and find!'], tok);
    const els = [...document.querySelectorAll('.scenebtn')], target = els.find(e => e.dataset.t === g.txt);
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await SP.say('Yes! ' + g.txt); },
      async (el, miss) => { SP.stop(); await SP.say(miss >= 2 ? 'Listen: ' + g.txt : 'No! Read again!', { rate: 0.85 }); },
      target);
  },
  /* obrazek — dziecko czyta trzy zdania i wybiera pasujące */
  async readpic(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Popatrz na obrazek i przeczytaj zdania. Dotknij zdania, które pasuje do obrazka.';
    const g = RS[lt(w)](), [good, h] = g.opts[0];
    $('#arena').innerHTML = h.replace('rcard', 'rcard big');
    $('#opts').innerHTML = shuffle(g.opts.map(o => o[0])).map(t => `<button class="opt sent readopt" data-t="${t}" aria-label="sentence">${t}</button>`).join('');
    prompt('📖 Read and choose!', ['Read and choose!'], tok);
    const els = [...document.querySelectorAll('.opt')];
    return choose(els, el => el.dataset.t === good,
      async el => { el.classList.add('right'); FX.good(); await wait(500); await SP.say('Yes! ' + good); },
      async el => { await wait(500); await SP.say('No. That says: ' + el.dataset.t, { rate: 0.85 }); },
      els.find(e => e.dataset.t === good));
  },
  /* rozmowa: najpierw dziecko mówi o sobie (każda odpowiedź dobra), potem słucha Pokémona i szuka jego odpowiedzi */
  async aboutme(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Pokémon pyta, co lubisz najbardziej. Dotknij tego, co Ty lubisz — tu każda odpowiedź jest dobra — i powiedz zdanie na głos. Potem posłuchaj Pokémona.';
    const f = lt(w), F = FAV[f], items = F.items(), k = pick(D.stars), nm = P(k).name;
    $('#arena').innerHTML = `<div class="favchat"><div class="mon">${imgOf(k)}</div><span class="cbub" id="favbub">${F.q}</span></div>`;
    $('#opts').innerHTML = items.map(x => `<button class="opt favopt" data-x="${x}" aria-label="${x}">${F.html(x)}</button>`).join('');
    prompt(F.q, [F.q], tok);
    let els = [...document.querySelectorAll('.opt')];
    const mine = await new Promise(res => els.forEach(el => el.onclick = () => { els.forEach(e => { e.onclick = null; }); res(el); }));
    if (!alive(tok)) return false;
    SP.stop(); mine.classList.add('right'); FX.good();
    const x = mine.dataset.x, my = F.s(f === 'pokemon' ? +x : x);
    $('#txt').innerHTML = `🎤 Your turn! Say: <em>${my.replace(/\.$/, '')}</em>`;
    await SP.say('Your turn! Say: ' + my.replace(/\.$/, '') + '!'); if (!alive(tok)) return false;
    await yourTurn(my.replace(/\.$/, ''), tok); if (!alive(tok)) return false;
    // teraz odpowiedź Pokémona — to jest sprawdzane
    const theirs = pick(items.filter(y => y !== x)), their = F.s(f === 'pokemon' ? +theirs : theirs);
    const b = $('#favbub'); if (b) b.textContent = their;
    els.forEach(e => e.classList.remove('right'));
    const q = `${their} Can you find it?`;
    prompt(`${nm}: <em>${their}</em>`, [q], tok);
    return choose(els, el => el.dataset.x === String(theirs),
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await SP.say(`Yes! ${their}`); },
      async () => { SP.stop(); await wait(400); await SP.say(q, { rate: 0.85 }); },
      els.find(e => e.dataset.x === String(theirs)));
  },
  /* tylko słuchanie: „Hello! I am Pikachu. My favourite season is winter! Can you find it?" */
  async favq(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Pokémon mówi, co lubi najbardziej. Posłuchaj i dotknij tego.';
    const f = lt(w), F = FAV[f], items = F.items().slice(0, 4), k = pick(D.stars), nm = P(k).name, x = pick(items), their = F.s(f === 'pokemon' ? +x : x);
    $('#arena').innerHTML = `<div class="favchat"><div class="mon">${imgOf(k)}</div><span class="cbub">💬</span></div>`;
    $('#opts').innerHTML = items.map(y => `<button class="opt favopt" data-x="${y}" aria-label="${y}">${F.html(y)}</button>`).join('');
    const q = `${their} Can you find it?`;
    prompt(`${nm}: 💬 ❔`, [`Hello! I am ${nm}.`, q], tok);
    const els = [...document.querySelectorAll('.opt')];
    return choose(els, el => el.dataset.x === String(x),
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await SP.say(`Yes! ${their}`); },
      async () => { SP.stop(); await wait(400); await SP.say(q, { rate: 0.85 }); },
      els.find(e => e.dataset.x === String(x)));
  },
  /* „It is snowy. Put on your gloves!" — dziecko ubiera Pokémona */
  async dressup(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj, jaka jest pogoda i co założyć, i dotknij tej rzeczy.';
    const x = lt(w), wx = pick(WEARX[x][2]), k = pick(D.stars), nm = P(k).name, opts = shuffle([x].concat(others(w, 2).map(lt)));
    $('#arena').innerHTML = dressHTML(wx, k, null);
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-x="${o}" aria-label="${o}">${WEARX[o][0]}</button>`).join('');
    const q = WEARX[x][1];
    prompt(`It is ${wx}. <em>${q}</em>`, [`It is ${wx}.`, q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.x) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.x === x,
      async el => { el.classList.add('right'); FX.good(); const wn = $('#worn'); await flyFood(el, wn, WEARX[x][0]); if (wn) { wn.textContent = WEARX[x][0]; wn.classList.add('on'); } await SP.say(`Yes! ${nm} is ready!`); },
      async () => { await wait(600); await SP.say(`No! ${q}`, { rate: 0.85 }); },
      els.find(e => e.dataset.x === x));
  },
  /* „It is sunny! What do you need?" — dziecko samo dobiera rzecz do pogody */
  async dresswhat(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Popatrz na pogodę. Co trzeba założyć albo zabrać? Dotykaj znaczków — usłyszysz nazwy — i wybierz to, co pasuje.';
    const x = lt(w), wx = pick(WEARX[x][2]), k = pick(D.stars), nm = P(k).name;
    const bad = shuffle(Object.keys(WEARX).filter(y => !WEARX[y][2].includes(wx))).slice(0, 2), opts = shuffle([x].concat(bad));
    $('#arena').innerHTML = dressHTML(wx, k, null);
    $('#opts').innerHTML = opts.map(o => `<button class="opt" data-x="${o}" aria-label="${o}">${WEARX[o][0]}</button>`).join('');
    const q = `It is ${wx}! What do you need?`;
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.x) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.x === x,
      async el => { el.classList.add('right'); FX.good(); const wn = $('#worn'); await flyFood(el, wn, WEARX[x][0]); if (wn) { wn.textContent = WEARX[x][0]; wn.classList.add('on'); } await SP.say(`Yes! ${WEARX[x][1]}`); },
      async () => { await wait(600); await SP.say(`No! It is ${wx}. What do you need?`, { rate: 0.85 }); },
      els.find(e => e.dataset.x === x));
  }
});

/* ======================================================================
   ARENA: bitwa z bossem na powtórkach. Pytania to słowa, które czekają na powtórkę — najpierw
   te z najniższych pudełek i te, w których dziecko najczęściej się myli. Przed bitwą „Remember?":
   karty nauki dwóch najsłabszych słów (najpierw przypomnienie, potem sprawdzanie). Pomyłka nie
   zabiera nic — słowo wraca później w tej samej bitwie. Wygrana: boss dołącza do kolekcji.
   ====================================================================== */
const errRate = w => { const r = rec(w); return (r.bad + 1) / (r.ok + r.bad + 2); };
function battlePool() {
  return Object.keys(S.words).filter(w => isDue(w) && WORD_ISLE[w])
    .sort((a, b) => (rec(a).box - rec(b).box) || (errRate(b) - errRate(a)) || (rec(a).due - rec(b).due));
}
const BOSSHP = /[?&]test\b/.test(location.search) && /[?&]boss=(\d+)/.test(location.search) ? +RegExp.$1 : 8;   // ?test&boss=1 — próba wygranej w teście
const TYPEFX = { fire: '🔥', water: '💧', grass: '🍃', electric: '⚡', ice: '❄️', rock: '🪨', ghost: '👻', dragon: '🐉', psychic: '🔮',
  fighting: '👊', poison: '☠️', ground: '💥', flying: '🌪️', bug: '🐛', steel: '⚙️', fairy: '✨', dark: '🌑', normal: '⭐' };
function bossPick() {
  const g = activeAlbum(), free = id => DEX[id] && !has(id) && !DEX[id].leg;
  const all = Object.keys(DEX).map(Number);
  const a = all.filter(id => free(id) && DEX[id].gen === g && DEX[id].h >= 1.3);
  if (a.length) return pick(a);
  const b = all.filter(id => free(id) && DEX[id].h >= 1.3); if (b.length) return pick(b);
  return rewardFor([]);
}
function arenaHTML(boss, hp, team, msg) {
  return hud(`<span class="chip">⚔️ Arena</span>`) + `<div class="play"><div class="prompt"><div class="txt" id="txt">${msg || ''}</div></div>
    <div class="arenabox">
      <div class="bossside"><div class="hpbar"><b>${DEX[boss].name}</b><span class="hp"><i style="width:${hp / BOSSHP * 100}%"></i></span></div>
        <div class="boss" id="boss"><img src="${IMG(boss)}" alt=""></div></div>
      <div class="teamside">${team.map((id, j) => `<div class="fighter" data-j="${j}"><img src="${IMG(id)}" alt=""><small>${DEX[id].name}</small></div>`).join('')}</div>
    </div></div>`;
}
async function arenaHit(boss, team, ok, hp, turn, tok) {
  app.innerHTML = arenaHTML(boss, ok ? hp + 1 : hp, team, ok ? '💥' : '🛡️');
  wireHud();
  const bossEl = $('#boss'), fs = [...document.querySelectorAll('.fighter')];
  if (ok) {
    const j = turn % fs.length, id = team[j], f = fs[j], fx = TYPEFX[DEX[id].types[0]] || '⭐';
    f.classList.add('attack'); $('#txt').textContent = `Go, ${DEX[id].name}!`;
    SP.say(`Go, ${DEX[id].name}!`);
    await wait(300);
    for (let s = 0; s < 3; s++) { const e = document.createElement('div'); e.className = 'flyfood'; e.textContent = fx; const a = center(f), b = center(bossEl);
      e.style.left = a.x - 30 + 'px'; e.style.top = a.y - 30 + 'px'; document.body.appendChild(e); void e.offsetWidth;
      e.style.transform = `translate(${b.x - a.x + (s - 1) * 30}px,${b.y - a.y}px) scale(1.2)`; setTimeout(() => e.remove(), 600); await wait(90); }
    await wait(450); FX.play(f2 => { f2.noise(0, 0.3, 1800, 300, 0.4); f2.tone(160, 0, 0.25, { type: 'square', to: 60, vol: 0.12 }); });
    bossEl.classList.add('hit'); sparks(center(bossEl).x, center(bossEl).y, 10);
    const bar = $('.hp i'); if (bar) bar.style.width = hp / BOSSHP * 100 + '%';
    await wait(700);
  } else {
    $('#txt').textContent = 'Watch out!'; SP.say('Watch out!');
    bossEl.classList.add('lunge'); await wait(450);
    fs.forEach(f => f.classList.add('shake')); FX.bad(); await wait(700);
  }
}
async function battleRun(tok) {
  setWorld('arena');
  const pool = battlePool(), words = pool.slice(0, 10), boss = bossPick(), team = S.team.length ? S.team.slice() : [25];
  if (words.length < 3) { go(showMap); return; }
  PLHELP = 'Arena! Każda dobra odpowiedź to atak Twojej drużyny. Pokonaj bossa, a dołączy do Twojej kolekcji. Pytania to słowa, które warto powtórzyć.';
  app.innerHTML = arenaHTML(boss, BOSSHP, team, `A wild ${DEX[boss].name} wants to battle!`); wireHud();
  FX.fanfare(); const be = $('#boss'); if (be) be.classList.add('enter');
  await SP.say(`A wild ${DEX[boss].name} wants to battle! Answer the questions to win!`); if (!alive(tok)) return;
  await wait(400);
  // najpierw przypomnienie dwóch najtrudniejszych słów
  const hard = words.slice().sort((a, b) => errRate(b) - errRate(a)).slice(0, 2);
  await bannerScreen('Let\'s remember!', '', tok, 600); if (!alive(tok)) return;
  for (const w of hard) { await learn(isleOf(WORD_ISLE[w]), [w], tok); if (!alive(tok)) return; }
  let hp = BOSSHP, turn = 0, misses = 0;
  const q = shuffle(words), back = new Set();
  while (hp > 0 && q.length && turn < 16) {
    const w = q.shift();
    let games = GAMESET[WORD_ISLE[w]]; if (typeof games === 'function') games = games(w);
    const r = await GAMES[pick(games)](w, BOSSHP - hp, BOSSHP, tok);
    if (!alive(tok)) return;
    grade(w, r);
    if (r) { const lv = level(); S.stars++; save(); flyStar(); if (level() > lv) await levelUp(tok); hp--; }
    if (!r) misses++;
    if (!r && !back.has(w)) { back.add(w); q.splice(Math.min(2, q.length), 0, w); }   // pomyłka: słowo wraca za chwilę
    await wait(300); if (!alive(tok)) return;
    await arenaHit(boss, team, r, hp, turn, tok); if (!alive(tok)) return;
    turn++;
    if (!q.length && hp > 0 && turn < 16) q.push(...shuffle(battlePool().filter(x => !words.includes(x))).slice(0, hp), ...shuffle(words).slice(0, Math.max(0, hp - 2)));
  }
  await teamNews(tok); if (!alive(tok)) return;
  if (hp <= 0) {
    app.innerHTML = arenaHTML(boss, 0, team, 'You won!'); wireHud();
    const b = $('#boss'); if (b) b.classList.add('faint'); confetti(90); FX.fanfare();
    await SP.say(`You won! ${DEX[boss].name} wants to join you!`); if (!alive(tok)) return;
    await wait(500);
    await wildCatch([], tok, boss, misses === 0);
  } else {
    await bannerScreen('Great battle!', `${DEX[boss].name} ran away. Let's practise and battle again!`, tok);
    go(showMap);
  }
}
/* licznik słów opanowanych na pewno (dobre odpowiedzi w różne dni) — co 25 słów nagroda */
const powerN = () => Object.keys(S.words).filter(w => WORD_ISLE[w] && mastered(w)).length;
async function powerRun(n, tok) {
  setWorld(0);
  PLHELP = 'Brawo! Tyle słów znasz już naprawdę dobrze — odpowiadałeś na nie dobrze w różne dni. Co 25 takich słów jest nagroda.';
  app.innerHTML = hud() + `<div class="play" style="justify-content:center"><div class="banner">💪 Word power!</div>
    <div class="powerbig"><b>${n}</b><small>words</small></div></div>`;
  wireHud(); confetti(100); FX.fanfare();
  await SP.say(`Amazing! You know ${n} words!`); if (!alive(tok)) return;
  await wait(600);
  await wildCatch(D.stars, tok);
}

/* ======================================================================
   BŁYSZCZĄCE POKÉMONY (shiny): oficjalne grafiki z PokéAPI w images/shiny (fetch_shiny.py).
   Pewny błyszczący: bezbłędna bitwa o odznakę (10/10), liga (12/12), sprawdzian (12/12), Arena bez pomyłki.
   Bezbłędna zwykła lekcja albo trening dnia: 1 szansa na 5. Gdy grafiki brak — zwykła + złota poświata.
   ====================================================================== */
const IMGS = id => '../images/shiny/' + String(id).padStart(3, '0') + '.webp';
const IMGX = id => S.shiny.includes(id) ? IMGS(id) : IMG(id);
const imgX = (id, lazy) => `<img src="${IMGX(id)}" alt="${DEX[id] ? DEX[id].name : ''}" ${lazy ? 'loading="lazy"' : ''} onerror="this.onerror=null;this.src='${IMG(id)}'">`;
const imgS = id => `<img src="${IMGS(id)}" alt="${DEX[id].name}" onerror="this.onerror=null;this.src='${IMG(id)}'">`;
const luckyShiny = (ok, n) => ok === n && Math.random() < 0.2;

/* ======================================================================
   SPRAWDZIAN ŚWIATA: 12 pytań ze wszystkich wysp świata po równo (bez wplatanych powtórek),
   na koniec świadectwo — co dziecko zna, co warto powtórzyć — i od razu trening pomyłek.
   12/12 = złoty puchar przy świecie na mapie + błyszczący Pokémon; 9+ za pierwszym razem = Pokémon.
   ====================================================================== */
const TESTN = 12;
function testWords(wn) {
  const isles = ISLANDS.filter(I => I.world === wn && !I.final && I.stages.length);
  const lists = isles.map(I => { const all = I.stages.flat(), seen = all.filter(w => S.words[w] && S.words[w].seen > 0); return shuffle(seen.length >= 2 ? seen : all); });
  const out = [];
  for (let r = 0; out.length < TESTN && lists.some(l => l.length); r++) { const l = lists[r % lists.length]; if (l.length) out.push(l.shift()); }
  const all = isles.flatMap(I => I.stages.flat());
  while (out.length < TESTN) out.push(pick(all));
  const q = shuffle(out);
  for (let i = 1; i < q.length; i++) if (q[i] === q[i - 1]) { const j = q.findIndex((x, k) => k > i && x !== q[i]); if (j > 0) [q[i], q[j]] = [q[j], q[i]]; }
  return q;
}
const testMedal = n => n >= TESTN ? '🏆' : n >= 10 ? '🥇' : n >= 7 ? '🥈' : n > 0 ? '🥉' : '';
function testBtn(wn, isOpen) {
  const done = S.settings.all || S.badges.includes(finalOf(wn).id), best = S.tests[wn] || 0;
  if (!isOpen || !done) return '';
  return `<button class="wtest ${best >= TESTN ? 'gold' : ''}" data-wt="${wn}" aria-label="Sprawdzian">📝 Test${best ? ` <b>${testMedal(best)} ${best}/${TESTN}</b>` : ''}</button>`;
}
async function worldTestRun(wn, tok) {
  setWorld(wn);
  PLHELP = 'Sprawdzian! Dwanaście pytań ze wszystkich wysp tego świata. Na końcu dostaniesz świadectwo: co już umiesz, a co warto powtórzyć.';
  await bannerScreen('Test time!', `World ${worldWord(wn)}: ${WORLDS[wn - 1][1]}. Twelve questions. Good luck!`, tok, 500);
  if (!alive(tok)) return;
  const q = testWords(wn), res = [];
  for (let i = 0; i < q.length; i++) {
    const w = q[i]; let games = GAMESET[WORD_ISLE[w]]; if (typeof games === 'function') games = games(w);
    const r = await GAMES[pick(games)](w, i, q.length, tok); if (!alive(tok)) return;
    grade(w, r); res.push([w, r]);
    if (r) { const lv = level(); S.stars++; save(); flyStar(); cheer(); if (level() > lv) await levelUp(tok); }
    await wait(350);
  }
  await teamNews(tok); if (!alive(tok)) return;
  const ok = res.filter(x => x[1]).length, prev = S.tests[wn] || 0;
  if (ok > prev) { S.tests[wn] = ok; save(); }
  const miss = [...new Set(res.filter(x => !x[1]).map(x => x[0]))], know = [...new Set(res.filter(x => x[1]).map(x => x[0]))].filter(w => !miss.includes(w));
  const choice = await certificate(wn, ok, know, miss, tok); if (!alive(tok)) return;
  if (choice === 'practise') { await practice(null, miss, 8, tok, 'Practice time!'); if (!alive(tok)) return; }
  if (ok >= TESTN && prev < TESTN) { await wildCatch(D.stars, tok, 0, true); return; }
  if (ok >= 9 && prev < 9) { await wildCatch(D.stars, tok); return; }
  go(showMap);
}
/* świadectwo: wynik, medal, słowa „umiem" i „do powtórki" */
async function certificate(wn, ok, know, miss, tok) {
  const chip = w => `<span class="wchip">${disp(w)}</span>`;
  const praise = ok >= TESTN ? 'Perfect! You are a gold trainer!' : ok >= 10 ? 'Excellent!' : ok >= 7 ? 'Well done!' : 'Good try! Let\'s practise!';
  PLHELP = 'Twoje świadectwo! Zielone słowa już umiesz. Słowa do powtórki możesz od razu poćwiczyć przyciskiem 🔁.';
  app.innerHTML = hud() + `<div class="play" style="justify-content:center"><div class="cert ${ok >= TESTN ? 'gold' : ''}">
    <div class="certhead">🎓 Certificate</div>
    <div class="certworld">World ${wn} · ${WORLDS[wn - 1][1]}</div>
    <div class="certscore"><span class="cmedal">${testMedal(ok)}</span><b>${ok}</b><small>/ ${TESTN}</small></div>
    <div class="certstars">${'⭐'.repeat(Math.round(ok / 4))}${'☆'.repeat(3 - Math.round(ok / 4))}</div>
    ${know.length ? `<div class="certrow ok"><b>✅ I know</b>${know.map(chip).join('')}</div>` : ''}
    ${miss.length ? `<div class="certrow miss"><b>🔁 Practise</b>${miss.map(chip).join('')}</div>` : ''}
    <div class="certbtns">${miss.length ? '<button class="pbtn" id="cpr">🔁 Practise</button>' : ''}<button class="next" id="nx">▶</button></div>
  </div></div>`;
  wireHud(); confetti(ok >= TESTN ? 120 : ok >= 7 ? 60 : 20); FX.fanfare();
  const sayIt = () => SP.say(`Certificate! You got ${ok} out of ${TESTN}! ${praise}`);
  sayIt();
  return new Promise(res => {
    $('#nx').onclick = () => { FX.tap(); SP.stop(); res('next'); };
    const p = $('#cpr'); if (p) p.onclick = () => { FX.tap(); SP.stop(); res('practise'); };
  });
}

/* ======================================================================
   MÓJ TYDZIEŃ: podsumowanie ostatnich 7 dni po angielsku (dla dziecka; dla rodzica jest raport w panelu).
   Pokazuje się samo raz w tygodniu przy pierwszym wejściu na mapę, a zawsze — przyciskiem 📰.
   ====================================================================== */
const weekIdx = () => Math.floor((today() + 3) / 7);      // tygodnie od poniedziałku
function weekStats() {
  const t = today(), days = Array.from({ length: 7 }, (_, k) => t - k), L = days.map(d => S.log[d] || [0, 0, 0]);
  const played = L.filter(x => x[0] + x[1] > 0).length, answers = L.reduce((a, x) => a + x[0] + x[1], 0), good = L.reduce((a, x) => a + x[0], 0);
  const words = Object.keys(S.words).filter(w => WORD_ISLE[w] && S.words[w].first >= t - 6);
  const newW = Math.max(words.length, L.reduce((a, x) => a + x[2], 0));
  const mons = Object.keys(S.caughtOn).map(Number).filter(id => S.caughtOn[id] >= t - 6);
  return { played, answers, good, words, newW, mons, power: powerN(), streak: S.daily && S.daily.day >= t - 1 ? S.daily.streak : 0 };
}
async function weekRun(tok) {
  setWorld(0);
  const w = weekStats();
  PLHELP = 'To Twój tydzień w grze: ile dni grałeś, ile było odpowiedzi, ile nowych słów i Pokémonów.';
  const tile = (ic, n, t) => `<div class="wtile"><i>${ic}</i><b>${n}</b><small>${t}</small></div>`;
  app.innerHTML = hud() + `<div class="play" style="justify-content:flex-start"><div class="week">
    <div class="weekhead">📰 My week</div>
    <div class="wtiles">${tile('📅', w.played, w.played === 1 ? 'day' : 'days')}${tile('✅', w.answers, 'answers')}${tile('🆕', w.newW, 'new words')}
      ${w.mons.length ? tile('📕', w.mons.length, 'new Pokémon') : ''}${tile('💪', w.power, 'words I know')}${w.streak > 1 ? tile('🔥', w.streak, 'days in a row') : ''}</div>
    ${w.words.length ? `<div class="certrow ok"><b>🆕 New words</b>${shuffle(w.words).slice(0, 18).map(x => `<span class="wchip">${disp(x)}</span>`).join('')}</div>` : ''}
    ${w.mons.length ? `<div class="wmons">${w.mons.slice(-12).map(id => `<span>${imgX(id)}</span>`).join('')}</div>` : ''}
    ${S.team.length ? `<div class="wteam">${S.team.map(id => `<span>${imgX(id)}<b>Lv ${TEAMLV(id)}</b></span>`).join('')}</div>` : ''}
    <button class="next" id="nx">▶</button></div></div>`;
  wireHud(); confetti(50); FX.fanfare();
  const lines = ['Your week, trainer!', `You played ${w.played} ${w.played === 1 ? 'day' : 'days'} this week.`, `You answered ${w.answers} questions.`];
  if (w.newW) lines.push(`You learned ${w.newW} new ${w.newW === 1 ? 'word' : 'words'}.`);
  if (w.mons.length) lines.push(`You caught ${w.mons.length} new Pokémon.`);
  lines.push(`You know ${w.power} words!`, 'Great job! See you next week!');
  (async () => { for (const l of lines) { if (!alive(tok)) return; await SP.say(l); await wait(200); } })();
  await new Promise(res => { $('#nx').onclick = () => { FX.tap(); SP.stop(); res(); }; });
  go(showMap);
}

/* ======================================================================
   KARTA TRENERA: wszystko, co dziecko zebrało, w jednym miejscu
   ====================================================================== */
function trainerCard() {
  const legends = LEGEND_IDS.filter(has).length, gold = Object.values(S.tests).filter(x => x >= TESTN).length;
  const streak = S.daily && S.daily.day >= today() - 1 ? S.daily.streak : 0;
  const li = (ic, n, t) => `<li><i>${ic}</i><b>${n}</b><small>${t}</small></li>`;
  modal(`<div class="tcard">
    <div class="tchead"><span>🪪 Trainer card</span><b>Lv ${level()}</b></div>
    <div class="tcbody"><div class="tcteam">${(S.team.length ? S.team : [25]).map(id => `<span>${imgX(id)}<small>${DEX[id].name}${S.team.length ? ' · Lv ' + TEAMLV(id) : ''}</small></span>`).join('')}</div>
    <ul class="tcstats">${li('⭐', S.stars, 'stars')}${li('🏅', S.badges.length + '/' + ISLANDS.length, 'badges')}${li('🏆', gold, 'gold tests')}${li('💪', powerN(), 'words I know')}
      ${li('📕', S.dex.length + '/' + D.dex.length, 'Pokémon')}${li('✨', S.shiny.length, 'shiny')}${li('🌠', legends, 'legends')}${li('🔥', streak, 'days in a row')}</ul></div>
    <div class="tcbadges">${S.badges.map(b => isleOf(b) ? `<span title="${isleOf(b).en}">${BADGE(b)}</span>` : '').join('')}</div>
    ${S.shiny.length ? `<div class="tcshiny"><b>✨ Shiny</b>${S.shiny.map(id => `<span>${imgS(id)}</span>`).join('')}</div>` : ''}
  </div>`);
  SP.stop(); SP.say('This is your trainer card!');
}

/* ======================================================================
   ŚWIAT 21: MIASTO — miejsca („Pikachu is at the zoo."), pytanie o drogę („Excuse me, where is the
   library? Turn left."), wpół do („It's half past three."). Id słów: P- (miejsca), Y- (droga), H- (wpół do).
   ====================================================================== */
const PLACE = { park: '🏞️', zoo: '🦁', library: '📚', hospital: '🏥', cinema: '🎬', station: '🚉' };
Object.keys(PLACE).forEach(x => { DISP['P-' + x] = x; });
function placeHTML(x, k, cls) {
  return `<div class="ecard place pl-${x} ${cls || ''}"><span class="emo">${PLACE[x]}</span>${k ? `<div class="mon">${imgOf(k)}</div>` : ''}</div>`;
}
const WAY = { left: 'Turn left.', right: 'Turn right.', straight: 'Go straight on.' };
Object.keys(WAY).forEach(d => { DISP['Y-' + d] = WAY[d].replace(/\.$/, '').toLowerCase(); });
/* skrzyżowanie z budynkami na końcach dróg (crossHTML ze świata 11) */
function townHTML(k, ends, hide) {
  const loot = {}; Object.keys(ends).forEach(d => { loot[d] = hide ? '❔' : PLACE[ends[d]]; });
  return crossHTML(k, loot).replace('class="cross"', 'class="cross town"');
}
function townEnds(d, x) {
  const others = shuffle(Object.keys(PLACE).filter(p => p !== x)), ends = {};
  Object.keys(WAY).forEach(e => { ends[e] = e === d ? x : others.pop(); });
  return ends;
}
const halfTxt = h => 'half past ' + NUMS[h - 1];
Array.from({ length: 12 }, (_, i) => i + 1).forEach(h => { DISP['H-' + h] = halfTxt(h); });
function clock2HTML(h, half, cls) {
  return `<div class="clock ${cls || ''}">${Array.from({ length: 12 }, (_, i) => `<span class="cn" style="--a:${(i + 1) * 30}deg">${i + 1}</span>`).join('')}
    <i class="hand hr" style="transform:rotate(${(h % 12) * 30 + (half ? 15 : 0)}deg)"></i><i class="hand mn" style="transform:rotate(${half ? 180 : 0}deg)"></i><b class="pin"></b></div>`;
}
const timeTxt = (h, half) => half ? halfTxt(h) : oclock(h);

Object.assign(TH, {
  places: {
    pic: (w, k, sz) => placeHTML(lt(w), k, sz), ic: w => PLACE[lt(w)],
    learn: (w, ex) => ({ vis: placeHTML(lt(w), ex[0], 'big'), s: `${P(ex[0]).name} is at the ${lt(w)}.`, turn: `at the ${lt(w)}` }),
    findQ: w => `Who is at the ${lt(w)}?`, whatQ: nm => `Where is ${nm}?`,
    ok: (w, nm) => `Yes! ${nm} is at the ${lt(w)}!`, no: (d, w, nm) => `No, ${nm} is at the ${lt(d)}. Who is at the ${lt(w)}?`,
    yn: (w, nm) => `Is ${nm} at the ${lt(w)}?`, yes: (w, nm) => `Yes, it is! ${nm} is at the ${lt(w)}!`,
    nope: (w, s, nm) => `No, it isn't! ${nm} is at the ${lt(s)}.`,
    pl: ['Posłuchaj, gdzie jest Pokémon, i dotknij właściwego miejsca w mieście.', 'Gdzie jest Pokémon? Dotknij znaczka — usłyszysz nazwę miejsca.']
  },
  askway: {
    async teach(w, i, n, tok) {
      const d = lt(w), x = pick(Object.keys(PLACE)), k = pick(D.stars), ends = townEnds(d, x);
      PLHELP = 'Pytamy o drogę! Pokémon pyta, gdzie jest jakieś miejsce, a my mu odpowiadamy. Posłuchaj i powtórz odpowiedź.';
      await teachCard(i, n, tok, {
        word: `${DIRS[d][0]} ${DISP[w]}`, vis: townHTML(k, ends), text: `Excuse me, where is the ${x}?<br>${WAY[d]}`,
        lines: [`Excuse me, where is the ${x}?`, async () => { await SP.say(WAY[d]); await walkTo(d); await wait(200); }],
        turnShow: WAY[d].replace(/\.$/, ''), turnSay: WAY[d].replace(/\.$/, '')
      });
    }
  },
  halfpast: {
    ynPic: (w, s) => clock2HTML(+lt(s), true, 'big'),
    yn: w => `Is it ${halfTxt(+lt(w))}?`, yes: w => `Yes, it is! It's ${halfTxt(+lt(w))}!`, nope: (w, s) => `No, it isn't! It's ${halfTxt(+lt(s))}.`,
    async teach(w, i, n, tok) {
      const h = +lt(w);
      PLHELP = 'Wpół do! Gdy duża wskazówka pokazuje na dół, na szóstkę, mówimy „half past" — pół godziny po. Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: `🕧 ${halfTxt(h)}`, vis: `<div class="clockrow">${clock2HTML(h, false)}<b class="arr">➜</b>${clock2HTML(h, true, 'big')}</div>`,
        text: `${cap(oclock(h))}… It's ${halfTxt(h)}.`,
        lines: [`It's ${oclock(h)}.`, `It's ${halfTxt(h)}.`],
        turnShow: halfTxt(h), turnSay: cap(halfTxt(h))
      });
    }
  }
});

Object.assign(GAMES, {
  /* Pokémon pyta o drogę, my słyszymy odpowiedź — dotknij drogi (budynki ukryte, liczy się kierunek) */
  async askfind(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Pokémon pyta o drogę. Posłuchaj odpowiedzi: w lewo, w prawo czy prosto? Dotknij tej drogi.';
    const d = lt(w), x = pick(Object.keys(PLACE)), k = pick(D.stars), ends = townEnds(d, x);
    $('#arena').innerHTML = townHTML(k, ends, true);
    prompt(`Where is the ${x}? <em>${WAY[d]}</em>`, [`Excuse me, where is the ${x}?`, WAY[d]], tok);
    const els = [...document.querySelectorAll('.roadend')].filter(e => WAY[e.dataset.d]), target = els.find(e => e.dataset.d === d);
    document.querySelectorAll('.roadend.e-back').forEach(e => { e.disabled = true; e.style.visibility = 'hidden'; });
    return choose(els, el => el === target,
      async () => { SP.stop(); FX.good(); await walkTo(d); const l = $('.roadend.e-' + d + ' .loot'); if (l) l.textContent = PLACE[x]; await SP.say(`Here is the ${x}! Thank you!`); },
      async el => { SP.stop(); const l = el.querySelector('.loot'); if (l) l.textContent = PLACE[ends[el.dataset.d]]; await SP.say(`No, that is the ${ends[el.dataset.d]}. ${WAY[d]}`, { rate: 0.9 }); },
      target);
  },
  /* „Excuse me, where is the library?" — dziecko wybiera odpowiedź */
  async asksay(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Pokémon pyta, jak dojść do miejsca. Popatrz na mapę, dotykaj przycisków, żeby usłyszeć odpowiedzi, i wybierz dobrą.';
    const d = lt(w), x = pick(Object.keys(PLACE)), k = pick(D.stars), ends = townEnds(d, x);
    $('#arena').innerHTML = townHTML(k, ends);
    document.querySelectorAll('.roadend').forEach(e => { e.disabled = true; if (e.dataset.d === 'back') e.style.visibility = 'hidden'; });
    $('#opts').innerHTML = shuffle(Object.keys(WAY)).map(e => `<button class="opt sent" data-d="${e}" aria-label="${e}"><i>${DIRS[e][0]}</i>${WAY[e]}</button>`).join('');
    const q = `Excuse me, where is the ${x}?`;
    prompt(`Excuse me, where is the <em>${x}</em> ${PLACE[x]}?`, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(WAY[e.dataset.d], { rate: 0.85 }); }));
    return choose(els, el => el.dataset.d === d,
      async el => { el.classList.add('right'); FX.good(); await wait(600); await walkTo(d); await SP.say('Thank you!'); },
      async () => { await wait(700); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.d === d));
  },
  /* „It's half past three. Find the clock!" */
  async halfpick(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj godziny i dotknij zegara, który ją pokazuje. Uważaj: „half past" — duża wskazówka na dole.';
    const h = +lt(w), h2 = +lt(others(w, 1)[0] || 'H-' + (h % 12 + 1));
    const set = shuffle([[h, true], [h, false], [h2 === h ? h % 12 + 1 : h2, true]]);
    $('#arena').innerHTML = `<div class="clockrow">${set.map(([x, hf]) => `<button class="clockbtn" data-h="${x}" data-f="${hf ? 1 : 0}" aria-label="zegar">${clock2HTML(x, hf)}</button>`).join('')}</div>`;
    const q = `It's ${halfTxt(h)}. Find the clock!`;
    prompt('Find the clock! 👂', [q], tok);
    const els = [...document.querySelectorAll('.clockbtn')], target = els.find(e => +e.dataset.h === h && e.dataset.f === '1');
    return choose(els, el => el === target,
      async el => { SP.stop(); FX.good(); el.classList.add('right'); await SP.say(`Yes! It's ${halfTxt(h)}!`); },
      async el => { SP.stop(); await SP.say(`No, it's ${timeTxt(+el.dataset.h, el.dataset.f === '1')}. ${q}`, { rate: 0.9 }); },
      target);
  },
  /* „What time is it?" — duży zegar, trzy odpowiedzi ze słuchu */
  async halfwhat(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Która godzina? Dotykaj przycisków, żeby usłyszeć odpowiedzi, i wybierz dobrą.';
    const h = +lt(w), good = halfTxt(h), opts = shuffle([good, oclock(h), halfTxt(h % 12 + 1)]);
    $('#arena').innerHTML = clock2HTML(h, true, 'big');
    $('#opts').innerHTML = opts.map(t => `<button class="opt sent" data-t="${t}" aria-label="${t}"><i>🔊</i>${t}</button>`).join('');
    const q = 'What time is it?';
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(`It's ${e.dataset.t}.`, { rate: 0.85 }); }));
    return choose(els, el => el.dataset.t === good,
      async el => { el.classList.add('right'); FX.good(); await wait(700); await SP.say(`Yes! It's ${good}!`); },
      async () => { await wait(700); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.t === good));
  }
});

/* ======================================================================
   ŚWIAT 22: JUTRO — plany („Tomorrow Pikachu is going to ride a bike."), prognoza pogody („Tomorrow it is
   going to be rainy."), marzenia („Pikachu wants to be a pilot."). Id słów: G- (plany), O- (prognoza), J- (marzenia).
   ====================================================================== */
const PLAN = { swim: ['🏊', 'swim'], football: ['⚽', 'play football'], zoo: ['🦁', 'go to the zoo'], grandma: ['👵', 'visit grandma'], read: ['📖', 'read a book'], bike: ['🚲', 'ride a bike'] };
Object.keys(PLAN).forEach(x => { DISP['G-' + x] = PLAN[x][1]; });
const plan = w => PLAN[lt(w)][1];
function planHTML(k, x, sz) { return `<div class="ecard plan ${sz || ''}"><div class="mon">${imgOf(k)}</div><span class="prop think2">${PLAN[x][0]}</span></div>`; }
const FCW = ['sunny', 'rainy', 'snowy', 'windy', 'cloudy', 'stormy'];
FCW.forEach(x => { DISP['O-' + x] = x; });
const fcTxt = x => `Tomorrow it is going to be ${x}.`;
function tvHTML(x, k, cls) {
  return `<div class="tv ${cls || ''}"><div class="tvscreen">${sceneHTML(x, k, '')}<span class="tvtag">TOMORROW</span></div><i class="tvleg l"></i><i class="tvleg r"></i></div>`;
}
const fcNeed = x => Object.keys(WEARX).filter(y => WEARX[y][2].includes(x));
const DREAM = { pilot: '✈️', vet: '🐾', astronaut: '🚀', singer: '🎤', footballer: '⚽', scientist: '🔬' };
Object.keys(DREAM).forEach(x => { DISP['J-' + x] = x; });

Object.assign(TH, {
  plans: {
    pic: (w, k, sz) => planHTML(k, lt(w), sz), ic: w => PLAN[lt(w)][0],
    learn: (w, ex) => ({ vis: planHTML(ex[0], lt(w), 'big'), s: `Tomorrow ${P(ex[0]).name} is going to ${plan(w)}.`, turn: `I'm going to ${plan(w)}` }),
    findQ: w => `Who is going to ${plan(w)}?`, whatQ: nm => `What is ${nm} going to do?`,
    optPic: (w, k) => planHTML(k, lt(w), 'big'),
    ok: (w, nm) => `Yes! ${nm} is going to ${plan(w)}!`, no: (d, w, nm) => `No, ${nm} is going to ${plan(d)}. Who is going to ${plan(w)}?`,
    yn: (w, nm) => `Is ${nm} going to ${plan(w)}?`, yes: (w, nm) => `Yes, it is! ${nm} is going to ${plan(w)}!`,
    nope: (w, s, nm) => `No, it isn't! ${nm} is going to ${plan(s)}.`,
    pl: ['Posłuchaj, co Pokémon zrobi jutro, i dotknij właściwego obrazka. Dymek pokazuje plan.', 'Co Pokémon zrobi jutro? Dotknij znaczka — usłyszysz, co to.']
  },
  forecast: {
    pic: (w, k, sz) => tvHTML(lt(w), k, sz),
    findQ: w => `Tomorrow it is going to be ${lt(w)}. Find the TV!`,
    ok: w => `Yes! Tomorrow it is going to be ${lt(w)}!`, no: (d, w) => `No, that is ${lt(d)}. Find ${lt(w)}!`,
    yn: w => `Is it going to be ${lt(w)} tomorrow?`, yes: w => `Yes, it is! It is going to be ${lt(w)}!`, nope: (w, s) => `No, it isn't! It is going to be ${lt(s)}.`,
    pl: ['To prognoza pogody na jutro. Posłuchaj, jaka będzie pogoda, i dotknij właściwego telewizora.'],
    async teach(w, i, n, tok) {
      const x = lt(w), k = pick(D.stars);
      PLHELP = 'Prognoza pogody na jutro! „Going to" znaczy, że coś dopiero będzie. Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: `${WX[x]} ${x}`, vis: tvHTML(x, k, 'big'), text: fcTxt(x),
        lines: [cap(x) + '!', fcTxt(x)],
        turnShow: `it is going to be ${x}`, turnSay: `It is going to be ${x}`
      });
    }
  },
  dream: cardTheme(DREAM, {
    a: art, pic: (w, k, sz) => `<div class="ecard ${sz || ''}"><div class="mon">${imgOf(k)}</div><span class="prop">${DREAM[lt(w)]}</span></div>`,
    ic: w => DREAM[lt(w)],
    learn: (w, ex) => ({ vis: `<div class="ecard big"><div class="mon">${imgOf(ex[0])}</div><span class="prop">${DREAM[lt(w)]}</span></div>`,
      s: `${P(ex[0]).name} wants to be ${art(lt(w))}.`, turn: `I want to be ${art(lt(w))}` }),
    findQ: w => `Who wants to be ${art(lt(w))}?`, whatQ: nm => `What does ${nm} want to be?`,
    ok: (w, nm) => `Yes! ${nm} wants to be ${art(lt(w))}!`, no: (d, w, nm) => `No, ${nm} wants to be ${art(lt(d))}. Who wants to be ${art(lt(w))}?`,
    yn: (w, nm) => `Does ${nm} want to be ${art(lt(w))}?`, yes: (w, nm) => `Yes, it does! ${nm} wants to be ${art(lt(w))}!`,
    nope: (w, s, nm) => `No, it doesn't! ${nm} wants to be ${art(lt(s))}.`,
    pl: ['Posłuchaj, kim chce zostać Pokémon, i dotknij właściwego obrazka.', 'Kim chce zostać Pokémon? Dotknij znaczka — usłyszysz nazwę zawodu.']
  })
});

Object.assign(GAMES, {
  /* „Tomorrow it is going to be rainy. What do you need?" — prognoza + rzeczy ze świata 20 */
  async fcpack(w, i, n, tok) {
    const x = lt(w), need = fcNeed(x);
    if (!need.length) return GAMES.yesno(w, i, n, tok);
    shell(i, n); bare();
    PLHELP = 'Posłuchaj prognozy na jutro i wybierz, co trzeba zabrać albo założyć.';
    const good = pick(need), bad = shuffle(Object.keys(WEARX).filter(y => !WEARX[y][2].includes(x))).slice(0, 2), k = pick(D.stars);
    $('#arena').innerHTML = tvHTML(x, k, 'big');
    $('#opts').innerHTML = shuffle([good].concat(bad)).map(o => `<button class="opt" data-x="${o}" aria-label="${o}">${WEARX[o][0]}</button>`).join('');
    const q = `${fcTxt(x)} What do you need?`;
    prompt(`Tomorrow it is going to be <em>${x}</em>. What do you need?`, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.x) + '!', { rate: 0.85 }); }));
    return choose(els, el => need.includes(el.dataset.x),
      async el => { el.classList.add('right'); FX.good(); await wait(600); await SP.say(`Yes! ${WEARX[el.dataset.x][1]}`); },
      async () => { await wait(600); await SP.say(q, { rate: 0.9 }); },
      els.find(e => need.includes(e.dataset.x)));
  }
});

/* ======================================================================
   ŚWIAT 23: HISTORYJKI — dziecko samo układa historyjkę („Pikachu went to the forest. Pikachu found
   a treasure."), dlaczego? („Pikachu is sad because it lost its balloon."), kolejność („First…, then…,
   finally…"). Id słów: Q- (czas przeszły w historyjce), A- (because), E- (kolejność).
   ====================================================================== */
const SPLACE = { forest: '🌲', beach: '🏖️', castle: '🏰', mountains: '⛰️', city: '🏙️' };
const SFIND = { 'a treasure': '💎', 'a cake': '🍰', 'a key': '🗝️', 'a crown': '👑', 'a ball': '⚽' };
const SSAW = { 'a dragon': '🐉', 'a whale': '🐋', 'a rainbow': '🌈', 'a ghost': '👻', 'a rocket': '🚀' };
const SVERB = { went: 'went', found: 'found', saw: 'saw', met: 'met' };
Object.keys(SVERB).forEach(v => { DISP['Q-' + v] = v; });
/* zdanie i pytanie dla każdego czasownika */
const storyLine = (v, h, x) => ({ went: `${h} went to the ${x}.`, found: `${h} found ${x}.`, saw: `${h} saw ${x}.`, met: `${h} met ${x}.` })[v];
const storyQ = (v, h) => ({ went: `Where did ${h} go?`, found: `What did ${h} find?`, saw: `What did ${h} see?`, met: `Who did ${h} meet?` })[v];
const storyAns = (v, x) => ({ went: `To the ${x}!`, found: cap(x) + '!', saw: cap(x) + '!', met: x + '!' })[v];
function storyChoices(v) {
  if (v === 'went') return shuffle(Object.keys(SPLACE)).slice(0, 3).map(x => [x, SPLACE[x]]);
  if (v === 'found') return shuffle(Object.keys(SFIND)).slice(0, 3).map(x => [x, SFIND[x]]);
  if (v === 'saw') return shuffle(Object.keys(SSAW)).slice(0, 3).map(x => [x, SSAW[x]]);
  return shuffle(D.stars).slice(0, 3).map(k => [P(k).name, imgOf(k)]);
}
function storyStrip(hk, panels) {
  return `<div class="strip">${panels.map((p, j) => `<div class="spanel" style="animation-delay:${j * 0.15}s"><div class="mon">${imgOf(hk)}</div><span class="sp">${p}</span></div>`).join('')}</div>`;
}
const CAUSE = { happy: ['🎁', 'it has got a present'], sad: ['🎈', 'it lost its balloon'], scared: ['⛈️', 'there is a storm'],
  tired: ['🌙', 'it is very late'], hungry: ['🍽️', 'there is no food'], angry: ['🧱', 'its tower fell down'] };
Object.keys(CAUSE).forEach(f => { DISP['A-' + f] = f + ' because…'; });
const becTxt = (nm, f) => `${nm} is ${f} because ${CAUSE[f][1]}.`;
const causeCard = (f, btn) => btn ? `<button class="scenebtn cause" data-f="${f}" aria-label="${f}"><div class="ecard"><span class="emo">${CAUSE[f][0]}</span></div></button>`
  : `<div class="ecard cause"><span class="emo">${CAUSE[f][0]}</span></div>`;
const SEQ = {
  morning: [['woke up', '⏰'], ['ate breakfast', '🥣'], ['went to school', '🏫']],
  park: [['went to the park', '🏞️'], ['played football', '⚽'], ['ate an ice cream', '🍦']],
  beach: [['went to the beach', '🏖️'], ['swam in the sea', '🌊'], ['built a sandcastle', '🏰']],
  night: [['ate dinner', '🍝'], ['read a book', '📖'], ['went to bed', '🛏️']]
};
Object.keys(SEQ).forEach(s => { DISP['E-' + s] = s + ' story'; });
const SEQW = ['First', 'Then', 'Finally'];
const seqTxt = (nm, s) => SEQ[s].map((x, j) => `${SEQW[j]}, ${nm} ${x[0]}.`).join(' ');

Object.assign(TH, {
  storymaker: {
    async teach(w, i, n, tok) {
      const v = lt(w), hk = pick(D.stars), h = P(hk).name, [x, em] = storyChoices(v)[0];
      PLHELP = 'Historyjki opowiadamy w czasie przeszłym: went, found, saw, met. Posłuchaj i powtórz.';
      const line = storyLine(v, h, x);
      await teachCard(i, n, tok, {
        word: v, vis: storyStrip(hk, [em]), text: line,
        lines: [cap(v) + '!', line, storyQ(v, h), storyAns(v, x)],
        turnShow: line.replace(/\.$/, ''), turnSay: line.replace(/\.$/, '')
      });
    }
  },
  because: {
    async teach(w, i, n, tok) {
      const f = lt(w), k = pick(D.stars), nm = P(k).name;
      PLHELP = '„Because" mówi, dlaczego tak jest. Posłuchaj, dlaczego Pokémon tak się czuje, i powtórz.';
      await teachCard(i, n, tok, {
        word: `${FEEL[f]} because`, vis: feelPic(k, f) + causeCard(f), text: becTxt(nm, f),
        lines: [`Why is ${nm} ${f}?`, becTxt(nm, f)],
        turnShow: 'because ' + CAUSE[f][1], turnSay: 'Because ' + CAUSE[f][1]
      });
    }
  },
  sequence: {
    async teach(w, i, n, tok) {
      const s = lt(w), k = pick(D.stars), nm = P(k).name;
      PLHELP = 'Historyjka po kolei: first — najpierw, then — potem, finally — na końcu. Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: '1️⃣2️⃣3️⃣', vis: `<div class="seqrow">${SEQ[s].map((x, j) => `<div class="seqcard"><b>${j + 1}</b><span>${x[1]}</span></div>`).join('')}</div>`,
        text: seqTxt(nm, s).replace(/\. /g, '.<br>'),
        lines: SEQ[s].map((x, j) => `${SEQW[j]}, ${nm} ${x[0]}.`),
        turnShow: `first, then, finally`, turnSay: `First, then, finally`
      });
    }
  }
});

Object.assign(GAMES, {
  /* dziecko układa historyjkę (bohater + jedna rzecz), gra ją opowiada, potem pytanie o tę rzecz */
  async storybuild(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Ułóż własną historyjkę! Najpierw wybierz bohatera, potem to, co mu się przydarzyło. Na końcu posłuchaj i odpowiedz na pytanie.';
    const v = lt(w), heroes = [...new Set(S.team.filter(id => KEY_OF[id]).map(id => KEY_OF[id]).concat(shuffle(D.stars)))].slice(0, 3);
    $('#arena').innerHTML = `<div class="buildstory"><span class="bsq">🦸 Who?</span></div>`;
    $('#opts').innerHTML = heroes.map(k => `<button class="opt favopt" data-k="${k}" aria-label="${P(k).name}">${imgOf(k)}</button>`).join('');
    prompt('Who is in your story?', ['Who is in your story?'], tok);
    let els = [...document.querySelectorAll('.opt')];
    const hk = await new Promise(res => els.forEach(el => el.onclick = () => { els.forEach(e => { e.onclick = null; }); FX.good(); res(el.dataset.k); }));
    if (!alive(tok)) return false;
    const h = P(hk).name, ch = storyChoices(v).filter(c => c[0] !== h);
    const ask = { went: `Where did ${h} go?`, found: `What did ${h} find?`, saw: `What did ${h} see?`, met: `Who did ${h} meet?` }[v];
    $('#opts').innerHTML = ch.map(([x, em]) => `<button class="opt favopt" data-x="${x}" aria-label="${x}">${em}</button>`).join('');
    prompt(`You choose! ${ask}`, ['You choose! ' + ask], tok);
    els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(storyAns(v, e.dataset.x), { rate: 0.9 }); }));
    const x = await new Promise(res => els.forEach(el => el.onclick = () => { els.forEach(e => { e.onclick = null; }); FX.good(); res(el.dataset.x); }));
    if (!alive(tok)) return false;
    // opowiadamy całą historyjkę z wyborem dziecka
    const em = (ch.find(c => c[0] === x) || [x, '✨'])[1], place = v === 'went' ? x : pick(Object.keys(SPLACE));
    const lines = ['Once upon a time…', storyLine('went', h, place)].concat(v === 'went' ? [] : [storyLine(v, h, x)], [`${h} was very happy. The end!`]);
    $('#arena').innerHTML = storyStrip(hk, [SPLACE[place]].concat(v === 'went' ? [] : [em], ['😊']));
    $('#opts').innerHTML = '';
    $('#txt').innerHTML = '📖 ' + lines.join(' ');
    for (const l of lines) { if (!alive(tok)) return false; await SP.say(l); await wait(250); }
    // pytanie do własnej historyjki
    const opts = shuffle(ch.map(c => c[0]));
    $('#opts').innerHTML = opts.map(o => `<button class="opt favopt" data-x="${o}" aria-label="${o}">${ch.find(c => c[0] === o)[1]}</button>`).join('');
    const q = storyQ(v, h);
    prompt(q, [q], tok);
    els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(storyAns(v, e.dataset.x), { rate: 0.9 }); }));
    return choose(els, el => el.dataset.x === x,
      async el => { el.classList.add('right'); FX.good(); await wait(500); await SP.say('Yes! ' + storyLine(v === 'went' ? 'went' : v, h, x)); },
      async () => { await wait(600); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.x === x));
  },
  /* gotowa historyjka do posłuchania + pytanie */
  async storyask(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj historyjki i odpowiedz na pytanie. Dotykaj obrazków, żeby usłyszeć odpowiedzi.';
    const v = lt(w), hk = pick(D.stars), h = P(hk).name, ch = storyChoices(v).filter(c => c[0] !== h), [x, em] = ch[0];
    const place = v === 'went' ? x : pick(Object.keys(SPLACE));
    const lines = [storyLine('went', h, place)].concat(v === 'went' ? [] : [storyLine(v, h, x)]);
    $('#arena').innerHTML = storyStrip(hk, [SPLACE[place]].concat(v === 'went' ? [] : ['❔']));
    $('#opts').innerHTML = shuffle(ch).map(([o, e]) => `<button class="opt favopt" data-x="${o}" aria-label="${o}">${e}</button>`).join('');
    const q = storyQ(v, h);
    prompt(`📖 ${q}`, lines.concat([q]), tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(storyAns(v, e.dataset.x), { rate: 0.9 }); }));
    return choose(els, el => el.dataset.x === x,
      async el => { el.classList.add('right'); FX.good(); const sp = [...document.querySelectorAll('.spanel .sp')].pop(); if (sp && v !== 'went') sp.innerHTML = em; await wait(500); await SP.say('Yes! ' + storyLine(v, h, x)); },
      async () => { await wait(600); await SP.say(lines.join(' ') + ' ' + q, { rate: 0.9 }); },
      els.find(e => e.dataset.x === x));
  },
  /* „Pikachu is sad. Why?" — trzy obrazki z przyczynami */
  async whypick(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Dlaczego Pokémon tak się czuje? Dotknij obrazka z przyczyną.';
    const f = lt(w), k = pick(D.stars), nm = P(k).name, fs = shuffle([f].concat(others(w, 2).map(lt)));
    $('#arena').innerHTML = `<div class="whyrow"><div class="whymon">${feelPic(k, f)}</div><div class="scenes">${fs.map(x => causeCard(x, true)).join('')}</div></div>`;
    const q = `${nm} is ${f}. Why?`;
    prompt(`${nm} is <em>${f}</em>. Why?`, [q], tok);
    const els = [...document.querySelectorAll('.scenebtn.cause')], target = els.find(e => e.dataset.f === f);
    loopFx([$('#actmon')], [f], tok);
    return choose(els, el => el === target,
      async el => { SP.stop(); el.classList.add('right'); FX.good(); await SP.say('Yes! ' + becTxt(nm, f)); },
      async el => { SP.stop(); await SP.say(`No. ${cap(CAUSE[el.dataset.f][1])}. ${q}`, { rate: 0.85 }); },
      target);
  },
  /* „There is a storm. How does Pikachu feel?" — przyczyna → uczucie */
  async whyfeel(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Popatrz, co się stało. Jak czuje się Pokémon? Dotknij buźki — usłyszysz słowo.';
    const f = lt(w), k = pick(D.stars), nm = P(k).name, fs = shuffle([f].concat(others(w, 2).map(lt)));
    $('#arena').innerHTML = `<div class="whyrow"><div class="mon solo">${imgOf(k)}</div>${causeCard(f)}</div>`;
    $('#opts').innerHTML = fs.map(x => `<button class="opt" data-f="${x}" aria-label="${x}">${FEEL[x]}</button>`).join('');
    const q = `${cap(CAUSE[f][1])}. How does ${nm} feel?`;
    prompt(q, [q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(e.dataset.f) + '!', { rate: 0.85 }); }));
    return choose(els, el => el.dataset.f === f,
      async el => { el.classList.add('right'); FX.good(); await wait(500); await SP.say('Yes! ' + becTxt(nm, f)); },
      async () => { await wait(600); await SP.say(q, { rate: 0.9 }); },
      els.find(e => e.dataset.f === f));
  },
  /* historyjka po kolei: dotknij obrazków w kolejności first → then → finally */
  async seqorder(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj historyjki i dotknij obrazków po kolei: najpierw, potem, na końcu.';
    const s = lt(w), k = pick(D.stars), nm = P(k).name, idx = shuffle([0, 1, 2]);
    $('#arena').innerHTML = `<div class="seqrow">${idx.map(j => `<button class="scenebtn seqcard" data-j="${j}" aria-label="${SEQ[s][j][0]}"><b></b><span>${SEQ[s][j][1]}</span></button>`).join('')}</div>`;
    const q = seqTxt(nm, s);
    prompt('🔢 First, then, finally!', SEQ[s].map((x, j) => `${SEQW[j]}, ${nm} ${x[0]}.`), tok);
    $('#again').onclick = () => { FX.tap(); SP.stop(); SP.say(q); };
    const els = [...document.querySelectorAll('.seqcard')];
    let step = 0, miss = 0, busy = false;
    return new Promise(res => {
      els.forEach(el => el.onclick = async () => {
        if (busy || el.classList.contains('used')) return; busy = true;
        if (+el.dataset.j === step) {
          el.classList.add('used', 'right'); el.classList.remove('hint'); $('b', el).textContent = step + 1; FX.good();
          await SP.say(`${SEQW[step]}, ${nm} ${SEQ[s][step][0]}.`); step++;
          if (step === 3) { await SP.say(pick(PRAISE)); return res(miss === 0); }
          if (miss >= 2) els.find(e => +e.dataset.j === step).classList.add('hint');
          busy = false; return;
        }
        miss++; FX.bad(); el.classList.remove('wrong'); void el.offsetWidth; el.classList.add('wrong');
        await SP.say(`${SEQW[step]}, ${nm} ${SEQ[s][step][0]}.`, { rate: 0.85 }); busy = false;
        if (miss >= 2) { els.forEach(e => e.classList.remove('hint')); els.find(e => +e.dataset.j === step).classList.add('hint'); }
      });
    });
  },
  /* „What did Pikachu do first?" */
  async seqq(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Posłuchaj historyjki. Potem pytanie: co Pokémon zrobił najpierw, potem albo na końcu? Dotykaj obrazków, żeby usłyszeć odpowiedzi.';
    const s = lt(w), k = pick(D.stars), nm = P(k).name, j = rnd(3), wq = ['first', 'then', 'at the end'][j];
    $('#arena').innerHTML = `<div class="mon solo">${imgOf(k)}</div>`;
    $('#opts').innerHTML = shuffle([0, 1, 2]).map(x => `<button class="opt favopt" data-j="${x}" aria-label="${SEQ[s][x][0]}">${SEQ[s][x][1]}</button>`).join('');
    const q = `What did ${nm} do ${wq}?`;
    prompt(`📖 ${q}`, [seqTxt(nm, s), q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(cap(SEQ[s][+e.dataset.j][0]) + '!', { rate: 0.9 }); }));
    return choose(els, el => +el.dataset.j === j,
      async el => { el.classList.add('right'); FX.good(); await wait(500); await SP.say(`Yes! ${SEQW[j]}, ${nm} ${SEQ[s][j][0]}.`); },
      async () => { await wait(600); await SP.say(seqTxt(nm, s) + ' ' + q, { rate: 0.9 }); },
      els.find(e => +e.dataset.j === j));
  }
});

/* ======================================================================
   ŚWIAT 24: ROZMOWY — krótkie odpowiedzi („Do you like apples? Yes, I do."), rozmowa w kilku krokach
   (nowy kolega, telefon, boisko, pomoc), teleturniej z pytaniami o świat. Id słów: N- (odpowiedzi), U- (rozmowy), D- (quiz).
   ====================================================================== */
const SHORT = { do: ['Yes, I do.', "No, I don't."], can: ['Yes, I can.', "No, I can't."], have: ['Yes, I have.', "No, I haven't."], are: ['Yes, I am.', "No, I'm not."] };
Object.keys(SHORT).forEach(x => { DISP['N-' + x] = SHORT[x][0].replace(/\.$/, '') + ' / ' + SHORT[x][1].replace(/\.$/, ''); });
/* pytanie + obrazek, który mówi, jaka jest prawda */
function shortQ(x, k, yes) {
  const nm = P(k).name;
  if (x === 'do') { const f = pick(Object.keys(FOOD)); return { q: `${nm}, do you like ${FOODPL[f]}?`, vis: monPlus(k, FOOD[f] + (yes ? '😋' : '🤢'), yes ? 'loop feel-happy' : 'loop feel-angry') }; }
  if (x === 'can') { const v = pick(['fly', 'swim']), ks = v === 'fly' ? D.flyers : D.swimmers; const kk = yes ? pick(ks) : pick(D.stars.filter(s => !ks.includes(s) && !P(s).types.includes(v === 'fly' ? 'flying' : 'water')));
    return { q: `${P(kk).name}, can you ${v}?`, vis: `<div class="mon solo">${imgOf(kk)}</div><span class="qmark">${v === 'fly' ? '🪽' : '🌊'}</span>`, k: kk }; }
  if (x === 'have') { const t = pick(Object.keys(TOY)); return { q: `${nm}, have you got ${art(t)}?`, vis: yes ? monPlus(k, TOY[t]) : `<div class="mon solo">${imgOf(k)}</div><span class="qmark">${TOY[t]}❌</span>` }; }
  const f = pick(['happy', 'sad', 'tired', 'hungry']), g = yes ? f : pick(['happy', 'sad', 'tired', 'hungry'].filter(z => z !== f));
  return { q: `${nm}, are you ${f}?`, vis: feelPic(k, g) };
}
const CONVO = {
  meet: [["Hi! I'm Pikachu. What's your name?", "Hi! I'm Eevee."], ['How old are you?', "I'm seven."], ['Do you want to play?', "Yes, let's play!"]],
  phone: [['Hello! How are you?', "I'm fine, thank you!"], ['Do you want to come to the park?', 'Yes, please! What time?'], ["At three o'clock.", 'Okay! See you!']],
  park: [["Let's play football!", 'Good idea!'], ['Can you kick the ball?', 'Yes, I can!'], ["I'm tired. Let's go home.", 'Okay. Goodbye!']],
  help: [["Oh no! I can't find my ball.", "Don't worry! I can help you."], ['Is it under the table?', "No, it isn't. It's in the box!"], ['Thank you!', "You're welcome!"]]
};
Object.keys(CONVO).forEach(x => { DISP['U-' + x] = { meet: 'new friend', phone: 'phone call', park: 'at the park', help: 'helping' }[x]; });
const CONVO_ALL = [].concat(...Object.values(CONVO).map(c => c.map(t => t[1])));
const QUIZ = {
  colours: [['What colour is the sky?', 'blue'], ['What colour is grass?', 'green'], ['What colour is a banana?', 'yellow'], ['What colour is snow?', 'white'],
    ['What colour is a tomato?', 'red'], ['What colour is Pikachu?', 'yellow'], ['What colour is an orange?', 'orange'], ['What colour is the night sky?', 'black']],
  animals: [['Which animal says moo?', '🐮', 'a cow'], ['Which animal says woof?', '🐶', 'a dog'], ['Which animal has got a long neck?', '🦒', 'a giraffe'],
    ['Which animal is very big and grey?', '🐘', 'an elephant'], ['Which animal can fly?', '🐦', 'a bird'], ['Which animal lives in the sea?', '🐟', 'a fish'], ['Which animal says meow?', '🐱', 'a cat']],
  numbers: [['How many legs has a dog got?', 4], ['How many eyes have you got?', 2], ['How many days are in a week?', 7], ['How many fingers are on one hand?', 5],
    ['What is two plus three?', 5], ['What is ten minus four?', 6], ['How many wheels has a bike got?', 2], ['What is five plus five?', 10]],
  world: [['Where do fish live?', '🌊', 'in the sea'], ['When do we sleep?', '🌙', 'at night'], ['What do we use to write?', '✏️', 'a pencil'], ['What do cows give us?', '🥛', 'milk'],
    ['Which season is very cold?', '⛄', 'winter'], ['What do bees make?', '🍯', 'honey'], ['What do we wear on our feet?', '👟', 'shoes']]
};
Object.keys(QUIZ).forEach(x => { DISP['D-' + x] = x + ' quiz'; });
const HOST = DEXN['Mr. Mime'] || 122;
function quizHTML(q) {
  return `<div class="quiz"><i class="qlights"></i><span class="host"><img src="${IMG(HOST)}" alt=""></span><div class="qcard">${q}</div><span class="buzz">🔴</span></div>`;
}
function applause() { FX.play(f => { for (let j = 0; j < 12; j++) f.noise(j * 0.06, 0.12, 2500 + Math.random() * 2000, 1200, 0.18); }); }

Object.assign(TH, {
  answers: {
    async teach(w, i, n, tok) {
      const x = lt(w), k = pick(D.stars), a = shortQ(x, k, true), b = shortQ(x, a.k || k, false);
      PLHELP = 'Krótkie odpowiedzi po angielsku: na „Do you…?" mówimy „Yes, I do", na „Can you…?" — „Yes, I can". Posłuchaj i powtórz.';
      await teachCard(i, n, tok, {
        word: x + '?', vis: a.vis, text: `${a.q}<br>${SHORT[x][0]}<br><br>${SHORT[x][1]}`,
        lines: [a.q, SHORT[x][0], SHORT[x][1]],
        turnShow: SHORT[x][0].replace(/\.$/, ''), turnSay: SHORT[x][0].replace(/\.$/, '')
      });
    }
  },
  friend: {
    async teach(w, i, n, tok) {
      const kA = pick(D.stars), kB = pick(D.stars.filter(x => x !== kA)), c = CONVO[lt(w)].map(t => t.map(z => z.replace(/Pikachu|Eevee/g, m => m === 'Pikachu' ? P(kA).name : P(kB).name)));
      PLHELP = 'Rozmowa w kilku krokach. Posłuchaj całej rozmowy, a potem powtórz odpowiedzi.';
      await teachCard(i, n, tok, {
        word: '💬 ' + DISP[w], vis: `<div class="convo">${c.map(t => `<span class="cb a">${t[0]}</span><span class="cb b">${t[1]}</span>`).join('')}</div>`,
        text: '', lines: [].concat(...c),
        turnShow: c[0][1].replace(/[.!]$/, ''), turnSay: c[0][1].replace(/[.!]$/, '')
      });
    }
  },
  quiz: {
    async teach(w, i, n, tok) {
      const x = lt(w), [q, a, b] = QUIZ[x][0], ans = typeof a === 'number' ? NUMS[a - 1] : b || a;
      PLHELP = 'Teleturniej! Prowadzący zadaje pytania o świat po angielsku. Posłuchaj pytania i odpowiedzi.';
      await teachCard(i, n, tok, {
        word: '🎤 Quiz!', vis: quizHTML(q), text: `${q}<br>${cap(String(ans))}!`,
        lines: ['Quiz time!', q, cap(String(ans)) + '!'],
        turnShow: String(ans), turnSay: cap(String(ans))
      });
    }
  }
});

Object.assign(GAMES, {
  /* „Pikachu, do you like apples?" — dziecko odpowiada za Pokémona krótką odpowiedzią */
  async shortans(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Odpowiedz za Pokémona! Popatrz na obrazek: tak czy nie? I uważaj na słówko: do, can, have albo am.';
    const x = lt(w), yes = Math.random() < 0.5, k = pick(D.stars), s = shortQ(x, k, yes), good = SHORT[x][yes ? 0 : 1];
    const other = pick(Object.keys(SHORT).filter(y => y !== x));
    const opts = shuffle([good, SHORT[x][yes ? 1 : 0], SHORT[other][yes ? 0 : 1]]);
    $('#arena').innerHTML = s.vis;
    $('#opts').innerHTML = opts.map(t => `<button class="opt sent" data-t="${t}" aria-label="${t}"><i>🔊</i>${t}</button>`).join('');
    prompt(s.q, [s.q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(e.dataset.t, { rate: 0.85 }); }));
    return choose(els, el => el.dataset.t === good,
      async el => { el.classList.add('right'); FX.good(); await wait(500); await SP.say(good + ' ' + pick(PRAISE)); },
      async () => { await wait(600); await SP.say(s.q, { rate: 0.9 }); },
      els.find(e => e.dataset.t === good));
  },
  /* rozmowa w trzech krokach — dziecko wybiera każdą odpowiedź; dobrze = wszystkie za pierwszym razem */
  async convo(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Rozmowa! Pokémon coś mówi, a Ty wybierasz odpowiedź. Dotykaj przycisków, żeby je usłyszeć. Są trzy kroki.';
    const kA = pick(D.stars), kB = S.team.length && KEY_OF[S.team[0]] && KEY_OF[S.team[0]] !== kA ? KEY_OF[S.team[0]] : pick(D.stars.filter(x => x !== kA));
    const fixT = t => t.replace(/Pikachu|Eevee/g, m => m === 'Pikachu' ? P(kA).name : P(kB).name), c = CONVO[lt(w)].map(t => t.map(fixT));
    $('#arena').innerHTML = `<div class="convo play2"><div class="cside a">${imgOf(kA)}</div><div class="clog" id="clog"></div><div class="cside b">${imgOf(kB)}</div></div>`;
    let miss = 0;
    for (const [q, a] of c) {
      if (!alive(tok)) return false;
      const log = $('#clog'); log.insertAdjacentHTML('beforeend', `<span class="cb a">${q}</span>`); log.scrollTop = 1e6;
      const wrong = shuffle(CONVO_ALL.map(fixT).filter(t => t !== a && !c.some(z => z[1] === t))).slice(0, 2);
      $('#opts').innerHTML = shuffle([a].concat(wrong)).map(t => `<button class="opt sent" data-t="${t}" aria-label="${t}"><i>🔊</i>${t}</button>`).join('');
      prompt(q, [q], tok);
      const els = [...document.querySelectorAll('.opt')];
      els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(e.dataset.t, { rate: 0.85 }); }));
      const ok = await choose(els, el => el.dataset.t === a,
        async el => { el.classList.add('right'); FX.good(); log.insertAdjacentHTML('beforeend', `<span class="cb b">${a}</span>`); log.scrollTop = 1e6; await wait(400); await SP.say(a); },
        async () => { await wait(600); await SP.say(q, { rate: 0.9 }); },
        els.find(e => e.dataset.t === a));
      if (!ok) miss++;
    }
    if (alive(tok)) { cheer(); await SP.say(pick(PRAISE)); }
    return miss === 0;
  },
  /* teleturniej: pytanie o świat, cztery odpowiedzi */
  async quizq(w, i, n, tok) {
    shell(i, n); bare();
    PLHELP = 'Teleturniej! Posłuchaj pytania i dotknij odpowiedzi. Każdy przycisk mówi swoją nazwę.';
    const x = lt(w), item = pick(QUIZ[x]), [q, a, b] = item;
    let opts, key, say, show;
    if (x === 'colours') { key = a; opts = shuffle([a].concat(shuffle(Object.keys(COLHEX).filter(c => c !== a && c !== 'grey')).slice(0, 3)));
      show = o => `<span class="favsw" style="background:${COLHEX[o]}"></span>`; say = o => cap(o) + '!'; }
    else if (x === 'numbers') { key = String(a); opts = shuffle([a].concat(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(m => m !== a)).slice(0, 3))).map(String);
      show = o => o; say = o => cap(NUMS[+o - 1]) + '!'; }
    else { const pool = QUIZ[x].filter(z => z[1] !== a); key = a; opts = shuffle([a].concat(shuffle(pool).slice(0, 3).map(z => z[1])));
      show = o => o; say = o => cap((QUIZ[x].find(z => z[1] === o) || [0, 0, o])[2]) + '!'; }
    $('#arena').innerHTML = quizHTML(q);
    $('#opts').innerHTML = opts.map(o => `<button class="opt favopt" data-o="${o}" aria-label="answer">${show(o)}</button>`).join('');
    prompt('🎤 ' + q, ['Quiz time!', q], tok);
    const els = [...document.querySelectorAll('.opt')];
    els.forEach(e => e.addEventListener('pointerdown', () => { SP.stop(); SP.say(say(e.dataset.o), { rate: 0.9 }); }));
    const ans = x === 'colours' ? a : x === 'numbers' ? NUMS[a - 1] : b;
    return choose(els, el => el.dataset.o === key,
      async el => { el.classList.add('right'); FX.good(); applause(); const qz = $('.quiz'); if (qz) qz.classList.add('win'); await wait(500); await SP.say(`Correct! ${cap(String(ans))}!`); },
      async () => { await wait(500); await SP.say(`Oh no! Try again! ${q}`, { rate: 0.9 }); },
      els.find(e => e.dataset.o === key));
  }
});

/* słowo-liczba numeru świata (światy 21+ — „twenty-one") */
const worldWord = n => n <= 20 ? NUMS[n - 1] : 'twenty-' + NUMS[n - 21];

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
  await wildCatch(D.stars, tok, 0, luckyShiny(ok, big ? 14 : 10));
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
  if (S.shiny.includes(id)) out.push('It is a shiny Pokémon!');
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
async function wildCatch(prefer, tok, legendId, shiny) {
  const id = legendId || rewardFor(prefer), mon = DEX[id], sh = !!shiny;
  const g = mon.leg ? 'L' : mon.gen, before = albumHave(g), isNew = !has(id);
  PLHELP = 'Dotknij Poké Balla, żeby złapać Pokémona!';
  app.innerHTML = hud() + `<div class="play" style="justify-content:center">
    <div class="banner" style="font-size:clamp(28px,5.5vw,46px)">${sh ? '✨ A shiny' : 'A wild'} ${mon.name} appeared!</div>
    <div class="wild"><div class="arena ${mon.leg ? 'legend' : ''} ${sh ? 'shinybg' : ''}" id="arena" style="min-height:260px">
      <button class="mon solo ${sh ? 'shinymon' : ''}" id="wildmon">${sh ? imgS(id) : `<img src="${IMG(id)}" alt="${mon.name}">`}<span class="shadow"></span></button></div>
      <button class="throw" id="throw" aria-label="Rzuć Poké Ball"></button></div></div>`;
  wireHud();
  FX.pop(); if (sh) { FX.fanfare(); sparks(innerWidth / 2, innerHeight / 2, 20); }
  await SP.say((sh ? 'A shiny ' : 'A wild ') + mon.name + ' appeared! Tap the Poké Ball!'); if (!alive(tok)) return;
  await new Promise(res => { $('#throw').onclick = () => { $('#throw').style.visibility = 'hidden'; res(); }; });
  await throwBall($('#wildmon'), true); if (!alive(tok)) return;
  confetti(60); FX.fanfare();
  if (isNew) { S.dex.push(id); S.fresh.push(id); S.caughtOn[id] = today(); }
  if (sh && !S.shiny.includes(id)) S.shiny.push(id);
  const k = KEY_OF[id]; if (k && !S.caught.includes(k)) S.caught.push(k);
  if (mon.leg && !S.caught.includes('L' + id)) S.caught.push('L' + id);
  save();
  const now = albumHave(g), total = albumIds(g).length;
  const txt = describe(id);
  app.innerHTML = hud() + `<div class="play" style="justify-content:center"><div class="banner">Gotcha!</div>
    <div class="learn cardmon ${sh ? 'shinycard' : ''}">${isNew ? '<span class="newtag">NEW!</span>' : ''}${sh ? '<span class="newtag shinytag">✨ SHINY</span>' : ''}${imgX(id)}<p class="desc">${txt}</p>
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
  if (sh) { await SP.say('Wow! A shiny Pokémon! It is very rare!'); if (!alive(tok)) return; }
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
  await SP.say('Wow! You got the ' + I.en + ' badge! ' + (I.final ? 'You are ' + art(I.en) + '!' : 'A new island is open!'));
  await new Promise(res => { $('#nx').onclick = () => { FX.tap(); res(); }; });
}
/* Liga Mistrzów (świat 1) i Liga Arcymistrzów (świat 2): mieszanka słów ze świata, 9 z 12 = legenda.
   Legend jest 94, więc każda wygrana daje nową. */
async function championRun(I, tok) {
  const pool = Object.keys(S.words).filter(w => S.words[w].seen > 0 && WORD_ISLE[w] && isleOf(WORD_ISLE[w]).world <= I.world);
  const fb = I.world === 1 ? ['red', 'one', 'big', 'fire', 'jump'] : ['sunny', 'happy', 'apple', 'on'];
  let words = pool.length >= 4 ? pool : fb;
  if (I.world >= 15) {
    // od świata 15 liga to także powtórka: obok słów ze świata — słowa, które czekają i sprawiają kłopot
    const own = pool.filter(w => isleOf(WORD_ISLE[w]).world === I.world), rev = battlePool().filter(w => !own.includes(w)).slice(0, Math.max(4, own.length));
    if (own.length >= 4) words = own.concat(rev);
  }
  const ok = await practice(I, words, 12, tok, I.en + ' League!');
  if (!alive(tok)) return;
  if (ok >= 9 && !S.badges.includes(I.id)) { await badge(I, tok); if (!alive(tok)) return; }
  if (ok >= 9) await wildCatch([], tok, nextLegend() || undefined, ok === 12);
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
    <div class="teambar"><b>⭐ My team</b>${[0, 1, 2].map(j => S.team[j] ? `<button class="tslot" data-id="${S.team[j]}">${imgX(S.team[j])}<span>${DEX[S.team[j]].name}</span><em>Lv ${TEAMLV(S.team[j])}${evoInfo(S.team[j]) ? ' · ✨' + evoInfo(S.team[j]).lv : ''}</em></button>`
      : '<span class="tslot empty">＋</span>').join('')}<small>Dotknij Pokémona w albumie, żeby dodać go do drużyny.</small></div>
    <div class="atabs">${tabs}</div>
    <div class="albumhead">
      <div class="albumbar big"><span>${albumName(g)}</span><div class="bar"><i style="width:${have / ids.length * 100}%"></i></div><b>${have} / ${ids.length}</b><span class="medal">${medal(g)}</span></div>
      ${g !== 'L' ? (g === act ? '<span class="chip target">🎯 New Pokémon come from here</span>'
        : `<button class="pbtn target" id="setalb">🎯 Catch Pokémon from ${albumName(g)}</button>`) : '<span class="chip target">Win a League to meet a legend!</span>'}
    </div>
    <div class="collection">${ids.map(id => has(id)
      ? `<button class="slot ${fresh.has(id) ? 'isnew' : ''} ${S.shiny.includes(id) ? 'isshiny' : ''}" data-id="${id}">${imgX(id, 'lazy')}<span>${DEX[id].name}</span>${fresh.has(id) ? '<em>NEW!</em>' : S.shiny.includes(id) ? '<em class="sh">✨</em>' : ''}</button>`
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
    const m = modal(`<div class="cardmon ${S.shiny.includes(id) ? 'shinycard' : ''}">${imgX(id)}<h3>${mon.name}${inT ? ' · Lv ' + TEAMLV(id) : ''}</h3><p class="desc">${txt}</p>
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
