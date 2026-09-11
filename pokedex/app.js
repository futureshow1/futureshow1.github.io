/* POKÉPEDIA — logika aplikacji */
(function(){
const $=id=>document.getElementById(id);
const C=window.CONTENT, MON=window.POKEMON, BASE=window.BASECARDS, REC=window.RECENTCARDS, FILL=window.FILLCARDS||[];
let lang=localStorage.getItem('pp-lang')||'pl';
let cardTab='base', modernSet='all';
const startHash=location.hash;

/* ---------- udostępnianie: #pokemon=<numer>, #karta=<id>, #dzial=<sekcja> ---------- */
const SHARE={pl:{btn:'🔗 Kopiuj link',ok:'✓ Skopiowano'},en:{btn:'🔗 Copy link',ok:'✓ Copied'}};
function setHash(h){try{history.replaceState(null,'',h||location.pathname+location.search)}catch(e){}}
function shareBtn(cel){
 const box=$('modal-box'); if(!box) return;
 const b=document.createElement('button');
 b.className='mshare';
 b.textContent=SHARE[lang].btn;
 b.onclick=()=>{
  const link=location.origin+location.pathname+cel;
  const ok=()=>{b.textContent=SHARE[lang].ok;setTimeout(()=>{b.textContent=SHARE[lang].btn},2000)};
  if(navigator.clipboard) navigator.clipboard.writeText(link).then(ok,()=>prompt(SHARE[lang].btn,link));
  else prompt(SHARE[lang].btn,link);
 };
 box.appendChild(b);
}

/* ---------- słownik UI ---------- */
const UI={
 nav:{start:{pl:'Start',en:'Home'},dex:{pl:'Pokédex',en:'Pokédex'},cards:{pl:'Karty',en:'Cards'},
      history:{pl:'Historia',en:'History'},anime:{pl:'Anime i filmy',en:'Anime & Movies'},play:{pl:'Gry i zabawy',en:'Games & Play'}},
 hero:{
  title:{pl:'Wielka Baza Wiedzy o Pokémonach',en:'The Great Pokémon Knowledge Base'},
  sub:{pl:'Poznaj wszystkie {MON} Pokémonów ze wszystkich 9 generacji, obejrzyj {CARDS_PL_PHRASE} — od kultowego Base Set z 1999 roku po najnowsze sety, w które gra się dzisiaj — i dowiedz się wszystkiego: skąd wzięły się Pokémony, jak się je łapie i jak grać w karciankę.',
       en:'Meet all {MON} Pokémon from all 9 generations, browse {CARDS} real cards — from the iconic 1999 Base Set to the newest sets played today — and learn everything: where Pokémon came from, how to catch them, and how to play the TCG.'},
  stats:[
   {n:'{MON}',pl:'Pokémonów — komplet',en:'Pokémon — the complete set'},
   {n:'{CARDS}',pl:'kart do obejrzenia',en:'cards to browse'},
   {n:'9',pl:'generacji (1996–2026)',en:'generations (1996–2026)'},
   {n:'24',pl:'filmy kinowe',en:'theatrical movies'}],
  cta:[{pl:'Otwórz Pokédex →',en:'Open the Pokédex →',sec:'dex'},
       {pl:'Zobacz karty',en:'Browse cards',sec:'cards',alt:1}],
  blurbs:[
   {em:'📕',sec:'dex',pl:['Pokédex','Wszystkie {MON} Pokémonów: zdjęcia, opisy, statystyki, ewolucje i to, jak łatwo je złapać.'],
    en:['Pokédex','All {MON} Pokémon: pictures, descriptions, stats, evolutions and how easy they are to catch.']},
   {em:'🃏',sec:'cards',pl:['Karty','Base Set 1999 i najnowsze sety 2025–26, z rankingiem rzadkości od białych kruków po zwykłe kółka.'],
    en:['Cards','The 1999 Base Set and the newest 2025–26 sets, with a rarity ranking from grails to commons.']},
   {em:'📜',sec:'history',pl:['Historia','Od łapania owadów przez małego Satoshiego Tajiriego do najbardziej dochodowej marki świata.'],
    en:['History','From young Satoshi Tajiri catching bugs to the world\'s biggest entertainment franchise.']},
   {em:'📺',sec:'anime',pl:['Anime i filmy','Wszystkie serie — od Asha i Pikachu po Horizons — plus 24 filmy kinowe.'],
    en:['Anime & Movies','Every series — from Ash and Pikachu to Horizons — plus 24 movies.']},
   {em:'🎲',sec:'play',pl:['Gry i zabawy','Jak grać w karciankę, Pokémon GO, tazosy, liga, turnieje i zabawy podwórkowe.'],
    en:['Games & Play','How to play the TCG, Pokémon GO, pogs, leagues, tournaments and playground games.']},
   {em:'🎯',sec:'play',pl:['Jak łapać Pokémony','Osłabić, uśpić, rzucić odpowiedniego Balla — cała sztuka łapania wyjaśniona.'],
    en:['How to catch Pokémon','Weaken, put to sleep, throw the right Ball — the art of catching explained.']}]
 },
 dex:{
  title:{pl:'Pokédex',en:'Pokédex'},
  desc:{pl:'Komplet — wszystkie {MON} Pokémonów z dziewięciu generacji, od Bulbasaura z Kanto po Pecharunta z Paldei. Filtruj po generacji i typie albo szukaj po nazwie; kliknij Pokémona, aby zobaczyć pełny opis, statystyki, ewolucje, łatwość złapania — i jego karty.',
        en:'The complete National Pokédex — all {MON} Pokémon across nine generations, from Kanto\'s Bulbasaur to Paldea\'s Pecharunt. Filter by generation and type or search by name; click any Pokémon for its full profile, stats, evolutions, catch ease — and its cards.'},
  search:{pl:'Szukaj po nazwie lub numerze…',en:'Search by name or number…'},
  allGens:{pl:'Wszystkie generacje',en:'All generations'},
  gen:{pl:'Generacja',en:'Generation'},
  allTypes:{pl:'Wszystkie typy',en:'All types'},
  sort:{num:{pl:'Sortuj: numer',en:'Sort: number'},name:{pl:'Sortuj: nazwa',en:'Sort: name'},
        total:{pl:'Sortuj: najsilniejsze',en:'Sort: strongest'},catch:{pl:'Sortuj: najłatwiej złapać',en:'Sort: easiest to catch'},
        rare:{pl:'Sortuj: najtrudniej złapać',en:'Sort: hardest to catch'}},
  found:{pl:'Znaleziono',en:'Found'},
  legendary:{pl:'LEGENDA',en:'LEGENDARY'},mythical:{pl:'MITYCZNY',en:'MYTHICAL'},
  height:{pl:'Wzrost',en:'Height'},weight:{pl:'Waga',en:'Weight'},
  stats:{pl:'Statystyki bazowe',en:'Base stats'},
  statNames:{hp:'HP',attack:{pl:'Atak',en:'Attack'},defense:{pl:'Obrona',en:'Defense'},
   'special-attack':{pl:'Atak spec.',en:'Sp. Atk'},'special-defense':{pl:'Obrona spec.',en:'Sp. Def'},speed:{pl:'Szybkość',en:'Speed'}},
  total:{pl:'Suma',en:'Total'},
  catchEase:{pl:'Łatwość złapania',en:'Catch ease'},
  catchLv:[{pl:'ekstremalnie trudny',en:'extremely hard'},{pl:'bardzo trudny',en:'very hard'},
           {pl:'trudny',en:'hard'},{pl:'średni',en:'medium'},{pl:'łatwy',en:'easy'},{pl:'bardzo łatwy',en:'very easy'}],
  evo:{pl:'Linia ewolucji',en:'Evolution line'},
  hisCards:{pl:'Karty tego Pokémona w naszej kolekcji',en:'This Pokémon\'s cards in our collection'}
 },
 cards:{
  title:{pl:'Karty Pokémon TCG',en:'Pokémon TCG Cards'},
  desc:{pl:'Dwie epoki karcianki: kultowy Base Set z 1999 roku (całe 102 karty!) oraz 488 kart z najnowszych setów 2025–2026, w które grają dzisiejsi gracze. Karty ułożone od najrzadszych do najpospolitszych. Kliknij kartę, aby ją powiększyć i przeczytać ataki.',
        en:'Two eras of the TCG: the iconic 1999 Base Set (all 102 cards!) and 488 cards from the newest 2025–2026 sets today\'s players use. Cards are ordered rarest to most common. Click a card to enlarge it and read its attacks.'},
  tabs:{anatomy:{pl:'🔎 Jak czytać kartę',en:'🔎 How to read a card'},base:{pl:'Base Set (1999)',en:'Base Set (1999)'},modern:{pl:'Współczesne (2025–26)',en:'Modern (2025–26)'},
        rarity:{pl:'Ranking rzadkości',en:'Rarity ranking'}},
  baseNote:{pl:'<b>Base Set</b> — pierwszy zachodni set kart Pokémon (styczeń 1999, Wizards of the Coast). 102 karty, z których zaczęła się cała karciana mania. Najcenniejsza: holograficzny <b>Charizard 4/102</b> — egzemplarze z 1. edycji osiągają dziś ceny domów.',
            en:'<b>Base Set</b> — the first Western Pokémon card set (January 1999, Wizards of the Coast). The 102 cards that started the entire craze. Crown jewel: the holographic <b>Charizard 4/102</b> — 1st Edition copies now sell for house money.'},
  modernNote:{pl:'Najnowsze sety, w które gra się <b>teraz</b>: <b>Pitch Black</b> (lipiec 2026) i <b>Mega Evolution</b> (wrzesień 2025) z obecnej ery Mega, oraz <b>Prismatic Evolutions</b> (styczeń 2025) — słynny „set Eevee", rozchwytywany przez kolekcjonerów. Inne sety z ostatnich 2 lat: Destined Rivals, Journey Together, Surging Sparks, Stellar Crown, Twilight Masquerade, Black Bolt / White Flare, Phantasmal Flames, Ascended Heroes, Perfect Order, Chaos Rising.',
              en:'The sets played <b>right now</b>: <b>Pitch Black</b> (July 2026) and <b>Mega Evolution</b> (September 2025) from the current Mega era, plus <b>Prismatic Evolutions</b> (January 2025) — the famous “Eevee set” collectors chase. Other sets of the last 2 years: Destined Rivals, Journey Together, Surging Sparks, Stellar Crown, Twilight Masquerade, Black Bolt / White Flare, Phantasmal Flames, Ascended Heroes, Perfect Order, Chaos Rising.'},
  allSets:{pl:'Wszystkie 3 sety',en:'All 3 sets'},
  cardsWord:{pl:'kart',en:'cards'},
  hp:'HP',attacks:{pl:'Ataki',en:'Attacks'},ability:{pl:'Zdolność',en:'Ability'},
  cost:{pl:'koszt',en:'cost'},artist:{pl:'Ilustracja',en:'Illustration'},
  rarityWord:{pl:'Rzadkość',en:'Rarity'},set:{pl:'Set',en:'Set'},
  evolvesFrom:{pl:'Ewoluuje z',en:'Evolves from'}
 },
 hist:{
  title:{pl:'Historia Pokémonów',en:'The History of Pokémon'},
  desc:{pl:'Od dziecięcej pasji łapania owadów do marki wartej ponad 100 miliardów dolarów — 30 lat w czternastu krokach.',
        en:'From a childhood passion for bug-catching to a franchise worth over $100 billion — 30 years in fourteen steps.'},
  gens:{pl:'9 generacji — przewodnik',en:'The 9 generations — a guide'},
  pokedexWord:{pl:'nowych Pokémonów',en:'new Pokémon'}
 },
 anime:{
  title:{pl:'Serie anime',en:'The anime series'},
  desc:{pl:'Główny serial trwa nieprzerwanie od 1997 roku — ponad 1300 odcinków. Oto wszystkie jego ery, a niżej serie poboczne i pełna lista filmów kinowych.',
        en:'The main show has run non-stop since 1997 — over 1,300 episodes. Here are all its eras, plus the side series and every movie.'},
  side:{pl:'Serie poboczne i specjalne',en:'Side & special series'},
  movies:{pl:'Filmy kinowe',en:'The movies'}
 },
 play:{
  title:{pl:'Gry i zabawy w prawdziwym świecie',en:'Games & play in the real world'},
  desc:{pl:'Pokémon to nie tylko gry wideo — to przede wszystkim karcianka, turnieje, tazosy, zabawy podwórkowe i łapanie Pokémonów na ulicach w Pokémon GO.',
        en:'Pokémon is not just video games — above all it\'s the card game, tournaments, pogs, playground play, and catching Pokémon in the streets with Pokémon GO.'},
  catch:{pl:'Jak łapie się Pokémony (i co potem)',en:'How Pokémon are caught (and what then)'}
 },
 foot:{pl:'POKÉPEDIA — domowa baza wiedzy. Dane: PokéAPI i Pokémon TCG API. Pokémon © Nintendo / Creatures / GAME FREAK / The Pokémon Company. Projekt niekomercyjny, edukacyjny.',
       en:'POKÉPEDIA — a home knowledge base. Data: PokéAPI & Pokémon TCG API. Pokémon © Nintendo / Creatures / GAME FREAK / The Pokémon Company. A non-commercial, educational project.'}
};
const NUM={MON:()=>MON.length, CARDS:()=>BASE.length+REC.length+FILL.length,
 // „1332 prawdziwe karty" vs „1000 prawdziwych kart" — polska odmiana liczebnika
 CARDS_PL_PHRASE:()=>{const n=BASE.length+REC.length+FILL.length, d=n%10, h=n%100;
  return (d>=2&&d<=4&&!(h>=12&&h<=14))?`${n} prawdziwe karty`:`${n} prawdziwych kart`;}};
const fillNums=s=>typeof s==='string'?s.replace(/\{(MON|CARDS|CARDS_PL_PHRASE)\}/g,(_,k)=>NUM[k]()):s;
const T=o=>fillNums(typeof o==='string'?o:(o[lang]||o.pl||o.en));

/* ---------- rzadkość ---------- */
const RARITY_ORDER=['Mega Hyper Rare','Hyper Rare','Special Illustration Rare','Illustration Rare',
 'Ultra Rare','ACE SPEC Rare','Double Rare','Rare Holo','Rare','Uncommon','Common',''];
const RARITY_PL={'Mega Hyper Rare':'Mega Hyper Rare (złote mega)','Hyper Rare':'Hyper Rare (złota)',
 'Special Illustration Rare':'Special Illustration Rare (SIR)','Illustration Rare':'Illustration Rare (IR)',
 'Ultra Rare':'Ultra Rare (full art)','ACE SPEC Rare':'ACE SPEC (różowa, 1 na talię)',
 'Double Rare':'Double Rare (ex)','Rare Holo':'Rare Holo ★ (błyszcząca)','Rare':'Rare ★','Uncommon':'Uncommon ◆','Common':'Common ●','':'—'};
const RARITY_EN={'Mega Hyper Rare':'Mega Hyper Rare (gold mega)','Hyper Rare':'Hyper Rare (gold)',
 'Special Illustration Rare':'Special Illustration Rare (SIR)','Illustration Rare':'Illustration Rare (IR)',
 'Ultra Rare':'Ultra Rare (full art)','ACE SPEC Rare':'ACE SPEC (pink, 1 per deck)',
 'Double Rare':'Double Rare (ex)','Rare Holo':'Rare Holo ★ (holofoil)','Rare':'Rare ★','Uncommon':'Uncommon ◆','Common':'Common ●','':'—'};
const rarLabel=r=>(lang==='pl'?RARITY_PL:RARITY_EN)[r]||r;
function cardsWord(n){
 if(lang!=='pl')return n===1?'card':'cards';
 if(n===1)return 'karta';
 const d=n%10, h=n%100;
 return (d>=2&&d<=4&&!(h>=12&&h<=14))?'karty':'kart';
}
const rIdx=r=>{const i=RARITY_ORDER.indexOf(r);return i<0?RARITY_ORDER.length:i};

/* ---------- nawigacja ---------- */
let curSec='start';
window.go=function(sec){
 curSec=sec;
 setHash('#dzial='+sec);
 document.querySelectorAll('.sec').forEach(s=>s.classList.remove('on'));
 $('sec-'+sec).classList.add('on');
 document.querySelectorAll('#mainnav button').forEach(b=>b.classList.toggle('on',b.dataset.sec===sec));
 window.scrollTo({top:0});
};
document.querySelectorAll('#mainnav button').forEach(b=>b.onclick=()=>go(b.dataset.sec));

window.setLang=function(l){lang=l;localStorage.setItem('pp-lang',l);renderAll();};

/* ---------- start ---------- */
function renderStart(){
 $('hero-title').textContent=T(UI.hero.title);
 $('hero-sub').textContent=T(UI.hero.sub);
 $('hero-stats').innerHTML=UI.hero.stats.map(s=>`<div class="stat"><b>${fillNums(s.n)}</b><span>${T(s)}</span></div>`).join('');
 $('hero-cta').innerHTML=UI.hero.cta.map(c=>`<button class="${c.alt?'alt':''}" onclick="go('${c.sec}')">${T(c)}</button>`).join('');
 $('start-blurbs').innerHTML=UI.hero.blurbs.map(b=>{const t=b[lang]||b.pl;
  return `<div class="blurb" onclick="go('${b.sec}')"><span class="em">${b.em}</span><h3>${fillNums(t[0])}</h3><p>${fillNums(t[1])}</p></div>`}).join('');
}

/* ---------- pokédex ---------- */
function typeChip(t){const ty=C.types[t]||{pl:t,color:'#888'};
 return `<span class="chip" style="background:${ty.color}">${lang==='pl'?ty.pl:t.charAt(0).toUpperCase()+t.slice(1)}</span>`}

function renderDexControls(){
 $('dex-title').textContent=T(UI.dex.title);
 $('dex-desc').textContent=T(UI.dex.desc);
 $('f-search').placeholder=T(UI.dex.search);
 const g=$('f-gen');g.innerHTML=`<option value="">${T(UI.dex.allGens)}</option>`+
  [1,2,3,4,5,6,7,8,9].map(n=>`<option value="${n}">${T(UI.dex.gen)} ${n}</option>`).join('');
 const t=$('f-type');t.innerHTML=`<option value="">${T(UI.dex.allTypes)}</option>`+
  Object.keys(C.types).sort((a,b)=>(lang==='pl'?C.types[a].pl:a).localeCompare(lang==='pl'?C.types[b].pl:b,'pl'))
  .map(k=>`<option value="${k}">${lang==='pl'?C.types[k].pl:k.charAt(0).toUpperCase()+k.slice(1)}</option>`).join('');
 const s=$('f-sort');s.innerHTML=['num','name','total','catch','rare'].map(k=>`<option value="${k}">${T(UI.dex.sort[k])}</option>`).join('');
}
function renderDex(){
 const q=$('f-search').value.trim().toLowerCase(), gen=$('f-gen').value, typ=$('f-type').value, sort=$('f-sort').value;
 let list=MON.filter(m=>
  (!q||m.name.includes(q)||String(m.id)===q.replace(/^#/,''))&&
  (!gen||m.gen===+gen)&&(!typ||m.types.includes(typ)));
 if(sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name));
 else if(sort==='total')list.sort((a,b)=>b.total-a.total);
 else if(sort==='catch')list.sort((a,b)=>b.capture_rate-a.capture_rate);
 else if(sort==='rare')list.sort((a,b)=>a.capture_rate-b.capture_rate);
 else list.sort((a,b)=>a.id-b.id);
 $('dex-count').textContent=`${T(UI.dex.found)}: ${list.length}`;
 $('dex-grid').innerHTML=list.map(m=>`
  <div class="mon" onclick="openMon(${m.id})">
   <span class="num">#${String(m.id).padStart(3,'0')}</span>
   <span class="gentag">G${m.gen}</span>
   ${m.is_legendary?'<span class="leg" title="'+T(UI.dex.legendary)+'">👑</span>':m.is_mythical?'<span class="leg" title="'+T(UI.dex.mythical)+'">✨</span>':''}
   <img loading="lazy" src="images/pokemon/${String(m.id).padStart(3,'0')}.webp" alt="${m.name}">
   <h4>${m.name}</h4>
   <div class="chips">${m.types.map(typeChip).join('')}</div>
  </div>`).join('');
}
['f-search','f-gen','f-type','f-sort'].forEach(id=>$(id).addEventListener('input',renderDex));

const monById=Object.fromEntries(MON.map(m=>[m.name,m]));
const monByNum=Object.fromEntries(MON.map(m=>[m.id,m]));

window.openMon=function(id){
 const m=monByNum[id];if(!m)return;
 const sn=UI.dex.statNames;
 const desc=lang==='pl'?(m.desc_pl||m.flavor_en):m.flavor_en;
 const genus=lang==='pl'?(m.genus_pl||m.genus):m.genus;
 const cr=m.capture_rate, pct=Math.round(cr/255*100);
 const lvl=UI.dex.catchLv[cr<10?0:cr<45?1:cr<90?2:cr<150?3:cr<220?4:5];
 const statOrder=['hp','attack','defense','special-attack','special-defense','speed'];
 const statColor=v=>v>=110?'#4caf50':v>=75?'#ffcb05':v>=50?'#ff9800':'#ee1515';
 const evoH=m.evolution&&m.evolution.length>1?`
  <div><h4 style="margin-top:16px;color:var(--dim);font-size:14px">${T(UI.dex.evo)}</h4>
  <div class="evo">${m.evolution.map((n,i)=>{
    const e=monById[n];
    const node=e?`<img src="images/pokemon/${String(e.id).padStart(3,'0')}.webp" title="${n}" onclick="openMon(${e.id})">`
               :`<span class="txt">${n}</span>`;
    return (i?'<span class="arr">→</span>':'')+node;}).join('')}</div></div>`:'';
 const myCards=[...BASE.map(c=>({...c,img:`images/cards/base1-${c.number}.webp`})),
                ...REC.map(c=>({...c,img:`images/cards/${c.set}-${String(c.number).replace(/[^A-Za-z0-9]/g,'')}.webp`})),
                ...FILL.map(c=>({...c,img:`images/cards/fill-${c.id}.webp`}))]
   .filter(c=>c.nationalDex===m.id).slice(0,8);
 const cardsH=myCards.length?`<div class="mcards"><h4>${T(UI.dex.hisCards)}:</h4>
   <div class="row">${myCards.map(c=>`<img loading="lazy" src="${c.img}" title="${c.name} — ${c.rarity}" onclick="openCard('${c.id}')">`).join('')}</div></div>`:'';
 $('modal-box').innerHTML=`
  <button class="mclose" onclick="closeModal()">✕</button>
  <div class="mflex">
   <div class="mimg"><img src="images/pokemon/${String(m.id).padStart(3,'0')}.webp" alt="${m.name}"></div>
   <div class="minfo">
    <div class="num">#${String(m.id).padStart(3,'0')} · ${T(UI.dex.gen)} ${m.gen}</div>
    <h2>${m.name}${m.is_legendary?`<span class="badge">👑 ${T(UI.dex.legendary)}</span>`:''}${m.is_mythical?`<span class="badge">✨ ${T(UI.dex.mythical)}</span>`:''}</h2>
    <div class="genus">${genus}</div>
    <div class="chips" style="justify-content:flex-start">${m.types.map(typeChip).join('')}</div>
    <p class="mdesc">${desc}</p>
    <div class="mmeta"><span>📏 ${T(UI.dex.height)}: <b>${m.height_m} m</b></span><span>⚖️ ${T(UI.dex.weight)}: <b>${m.weight_kg} kg</b></span></div>
    <h4 style="color:var(--dim);font-size:14px;margin-bottom:4px">${T(UI.dex.stats)} · ${T(UI.dex.total)}: ${m.total}</h4>
    ${statOrder.map(k=>{const v=m.stats[k];return `
      <div class="statbar"><span>${T(sn[k])}</span><b>${v}</b>
      <div class="bar"><div class="fill" style="width:${Math.min(v/160*100,100)}%;background:${statColor(v)}"></div></div></div>`}).join('')}
    <div class="catchbar"><div class="lab">🎯 ${T(UI.dex.catchEase)}: <b>${T(lvl)}</b> (${cr}/255)</div>
     <div class="bar" style="height:12px;border:2px solid var(--outline);border-radius:7px;background:#e3ecf7;overflow:hidden">
      <div style="height:100%;width:${Math.max(pct,3)}%;background:linear-gradient(90deg,#ee1515,#ffcb05,#4caf50);border-radius:5px"></div></div></div>
    ${evoH}${cardsH}
   </div></div>`;
 $('modal').classList.add('on');
 setHash('#pokemon='+m.id);
 shareBtn('#pokemon='+m.id);
};

/* ---------- karty ---------- */
function cardImg(c){
 if(c.fill)return `images/cards/fill-${c.id}.webp`;
 return c.set?`images/cards/${c.set}-${String(c.number).replace(/[^A-Za-z0-9]/g,'')}.webp`:`images/cards/base1-${c.number}.webp`;
}
const allCards=Object.fromEntries([...BASE,...REC,...FILL].map(c=>[c.id,c]));

function renderCards(){
 $('cards-title').textContent=T(UI.cards.title);
 $('cards-desc').textContent=T(UI.cards.desc);
 document.querySelectorAll('#card-tabs button').forEach(b=>{
  b.textContent=T(UI.cards.tabs[b.dataset.tab]);
  b.classList.toggle('on',b.dataset.tab===cardTab);
  b.onclick=()=>{cardTab=b.dataset.tab;renderCards();};});
 const body=$('cards-body');
 if(cardTab==='rarity'){body.innerHTML=rarityGuideHTML();return;}
 if(cardTab==='anatomy'){body.innerHTML=anatomyHTML();wireAnatomy();return;}
 let cards, note;
 if(cardTab==='base'){cards=BASE;note=T(UI.cards.baseNote);}
 else{
  note=T(UI.cards.modernNote);
  cards=modernSet==='all'?REC:REC.filter(c=>c.set===modernSet);
 }
 const groups={};
 cards.forEach(c=>{(groups[c.rarity]=groups[c.rarity]||[]).push(c)});
 const keys=Object.keys(groups).sort((a,b)=>rIdx(a)-rIdx(b));
 const setNames={me5:'Pitch Black (VII 2026)',me1:'Mega Evolution (IX 2025)','sv8pt5':'Prismatic Evolutions (I 2025)'};
 const pick=cardTab==='modern'?`<div class="setpick">
   <button class="${modernSet==='all'?'on':''}" onclick="setModern('all')">${T(UI.cards.allSets)}</button>
   ${['me5','me1','sv8pt5'].map(s=>`<button class="${modernSet===s?'on':''}" onclick="setModern('${s}')">${setNames[s]}</button>`).join('')}
  </div>`:'';
 body.innerHTML=`<div class="setsnote">${note}</div>${pick}`+
  keys.map(k=>`
   <div class="rarhead"><h3>${rarLabel(k)}</h3><span>${groups[k].length} ${cardsWord(groups[k].length)}</span></div>
   <div class="cardgrid">${groups[k].map(c=>`
     <div class="tcg" onclick="openCard('${c.id}')">
      <img loading="lazy" src="${cardImg(c)}" alt="${c.name}">
      <p>${c.name}</p>
     </div>`).join('')}</div>`).join('');
}
window.setModern=function(s){modernSet=s;renderCards();};

/* tłumaczenia treści kart: w PL pokazujemy polską wersję, a pod spodem oryginał
   (karty fizycznie są po angielsku, więc dziecko musi móc porównać z kartą w ręku) */
const TR=window.CARDS_PL||{};
const tr=t=>TR[t]||null;
const trName=(pref,n)=>TR[pref+'::'+n]||null;
function bi(en, pl, cls){          // dwujęzyczny blok tekstu
 if(lang!=='pl'||!pl||pl===en) return `<p class="${cls||''}">${en}</p>`;
 return `<p class="${cls||''}">${pl}</p><p class="orig">${en}</p>`;
}
const label=(dict,v)=>lang==='pl'?((C.cardLabels[dict]||{})[v]||v):v;

window.openCard=function(id){
 const c=allCards[id];if(!c)return;
 const hires=`https://images.pokemontcg.io/${c.set||'base1'}/${c.number}_hires.png`;
 const local=cardImg(c);
 const nameOf=(pref,n)=>{const p=trName(pref,n);return lang==='pl'&&p&&p!==n?`${n} <span class="nmpl">(${p})</span>`:n;};
 const abil=(c.abilities||[]).map(a=>`<div class="atk"><span class="nm">💠 ${T(UI.cards.ability)}: ${nameOf('ABL',a.name)}</span>${bi(a.text,tr(a.text))}</div>`).join('');
 const atks=(c.attacks||[]).map(a=>`<div class="atk"><span class="nm">${nameOf('ATK',a.name)}</span><span class="dmg">${a.damage||''}</span>
   ${a.cost&&a.cost.length?`<div class="cost">${T(UI.cards.cost)}: ${a.cost.map(e=>label('energy',e)).join(' · ')}</div>`:''}
   ${a.text?bi(a.text,tr(a.text)):''}</div>`).join('');
 const subs=(c.subtypes||[]).map(s=>label('subtype',s)).join(', ');
 $('modal-box').innerHTML=`
  <button class="mclose" onclick="closeModal()">✕</button>
  <div class="cardm">
   <div class="big"><img id="cardbig" src="${local}" alt="${c.name}"></div>
   <div class="det">
    <h2>${c.name}${c.hp?` <span class="badge">${c.hp} ${UI.cards.hp}</span>`:''}</h2>
    <div class="sub">${c.setName||'Base Set (1999)'} · #${c.number} · ${label('supertype',c.supertype)}${subs?' — '+subs:''}</div>
    <p><b>${T(UI.cards.rarityWord)}:</b> <span class="rar">${rarLabel(c.rarity)}</span></p>
    ${c.evolvesFrom?`<p><b>${T(UI.cards.evolvesFrom)}:</b> ${c.evolvesFrom}</p>`:''}
    ${abil}${atks}
    ${c.flavor?bi(c.flavor,tr(c.flavor),'flav'):''}
    ${c.artist?`<p style="margin-top:10px;color:var(--dim);font-size:13.5px">🖌 ${T(UI.cards.artist)}: <b>${c.artist}</b></p>`:''}
   </div></div>`;
 $('modal').classList.add('on');
 setHash('#karta='+c.id);
 shareBtn('#karta='+c.id);
 // hires tylko gdy CDN naprawdę ją ma (404 zwraca rewers karty, który <img> i tak by wyświetlił)
 fetch(hires,{method:'HEAD'}).then(r=>{
  if(r.ok){const i=$('cardbig');if(i)i.src=hires;}
 }).catch(()=>{});
};

/* ---------- anatomia karty: mapa objaśnień ----------
   Karta i wszystkie znaczniki żyją w jednym SVG w układzie pikseli karty, więc całość
   skaluje się bez przeliczania. Numery stoją na bocznych szynach (nie zasłaniają karty),
   rozsunięte tak, żeby się nie nachodziły; linia prowadzi do najbliższego punktu obszaru. */
function anatomyLayout(A){
 const PAD_X=112, PAD_T=34, PAD_B=56, GAP=58, R=24;
 const place=side=>{
  const items=A.spots.filter(s=>s.side===side).map(s=>{
   const ys=s.rects.map(r=>(r[1]+r[3])/2); return {s,y:ys.reduce((a,b)=>a+b)/ys.length};
  }).sort((a,b)=>a.y-b.y);
  const minY=-PAD_T+R+4, maxY=A.h+PAD_B-R-4;
  items.forEach((it,i)=>{ if(i&&it.y<items[i-1].y+GAP) it.y=items[i-1].y+GAP; if(it.y<minY) it.y=minY; });
  for(let i=items.length-1;i>=0;i--){ const lim=i===items.length-1?maxY:items[i+1].y-GAP; if(items[i].y>lim) items[i].y=lim; }
  const px=side==='L'?-PAD_X/2:A.w+PAD_X/2;
  return items.map(it=>{
   // punkt docelowy: najbliższy obszar w pionie, krawędź zwrócona do szyny
   const r=it.s.rects.slice().sort((a,b)=>Math.abs((a[1]+a[3])/2-it.y)-Math.abs((b[1]+b[3])/2-it.y))[0];
   const tx=side==='L'?r[0]:r[2], ty=Math.max(r[1],Math.min(r[3],it.y));
   return {s:it.s, px, py:it.y, tx, ty, lx:side==='L'?px+R:px-R};
  });
 };
 return {PAD_X,PAD_T,PAD_B,R,pins:[...place('L'),...place('R')]};
}
function anatomyHTML(){
 const A=C.cardAnatomy, L=anatomyLayout(A);
 const col=Object.fromEntries(A.groups.map(g=>[g.id,g.color]));
 const vb=`${-L.PAD_X} ${-L.PAD_T} ${A.w+2*L.PAD_X} ${A.h+L.PAD_T+L.PAD_B}`;
 const rects=A.spots.map(s=>s.rects.map(r=>
  `<rect class="anat-rect" data-n="${s.n}" style="--gc:${col[s.g]}" x="${r[0]-6}" y="${r[1]-6}" width="${r[2]-r[0]+12}" height="${r[3]-r[1]+12}" rx="10"/>`).join('')).join('');
 const lines=L.pins.map(p=>`<line class="anat-line" data-n="${p.s.n}" style="--gc:${col[p.s.g]}" x1="${p.lx}" y1="${p.py}" x2="${p.tx}" y2="${p.ty}"/>
   <circle class="anat-dot" data-n="${p.s.n}" style="--gc:${col[p.s.g]}" cx="${p.tx}" cy="${p.ty}" r="6"/>`).join('');
 const pins=L.pins.map(p=>`<g class="anat-pin" data-n="${p.s.n}" style="--gc:${col[p.s.g]}" tabindex="0" role="button" aria-label="${p.s.n}. ${T(p.s.title)}">
   <circle cx="${p.px}" cy="${p.py}" r="${L.R}"/><text x="${p.px}" y="${p.py}">${p.s.n}</text></g>`).join('');
 const svg=`<svg class="anat-svg" viewBox="${vb}" role="img" aria-label="${T(A.caption)}">
  <defs>
   <clipPath id="anatClip"><rect x="0" y="0" width="${A.w}" height="${A.h}" rx="34"/></clipPath>
   <mask id="anatMask"><rect x="0" y="0" width="${A.w}" height="${A.h}" fill="white"/><g id="anatHoles"></g></mask>
  </defs>
  <image href="${A.img}" x="0" y="0" width="${A.w}" height="${A.h}" clip-path="url(#anatClip)"/>
  <rect class="anat-dim" x="0" y="0" width="${A.w}" height="${A.h}" rx="34" mask="url(#anatMask)"/>
  <g>${rects}</g><g>${lines}</g><g>${pins}</g>
 </svg>`;
 const list=A.groups.map(g=>`<h3 class="anat-gh" style="--gc:${g.color}">${T(g.title)}</h3>
  <ol>${A.spots.filter(s=>s.g===g.id).map(s=>`<li class="anat-item" data-n="${s.n}" style="--gc:${g.color}" tabindex="0">
   <span class="anat-num">${s.n}</span><div><b>${T(s.title)}</b><p>${T(s.text)}</p></div></li>`).join('')}</ol>`).join('');
 const notes=A.notes.map(n=>`<div class="anat-note"><b>${T(n.title)}</b><p>${T(n.text)}</p></div>`).join('');
 return `<div class="anat">
  <div class="setsnote">${T(A.intro)}<br><span class="anat-hint">👆 ${T(A.hint)}</span></div>
  <div class="anat-grid">
   <div class="anat-cardcol">${svg}
    <p class="anat-cap">${T(A.caption)} · <a href="${A.img}" target="_blank" rel="noopener">${T(A.full)}</a></p></div>
   <div class="anat-list">${list}</div>
  </div>
  <div class="anat-notes">${notes}</div>
 </div>`;
}
function wireAnatomy(){
 const root=document.querySelector('.anat'); if(!root) return;
 // przyklejona karta ma stać tuż pod paskiem menu, który na wąskich ekranach zawija się w dwa wiersze
 const hdr=()=>{const t=$('topbar'); if(t) document.documentElement.style.setProperty('--hdr',t.offsetHeight+'px');};
 hdr(); if(!window.__anatHdr){window.__anatHdr=1; window.addEventListener('resize',hdr);}
 const A=C.cardAnatomy; let locked=null;
 const set=n=>{
  root.querySelectorAll('[data-n]').forEach(el=>el.classList.toggle('on', n!==null && +el.dataset.n===n));
  root.classList.toggle('active', n!==null);
  const s=A.spots.find(x=>x.n===n);
  root.querySelector('#anatHoles').innerHTML=s?s.rects.map(r=>
   `<rect x="${r[0]-6}" y="${r[1]-6}" width="${r[2]-r[0]+12}" height="${r[3]-r[1]+12}" rx="10" fill="black"/>`).join(''):'';
 };
 root.querySelectorAll('.anat-rect,.anat-pin,.anat-item').forEach(el=>{
  const n=+el.dataset.n;
  el.addEventListener('mouseenter',()=>{ if(locked===null) set(n); });
  el.addEventListener('mouseleave',()=>{ if(locked===null) set(null); });
  el.addEventListener('click',()=>{
   locked=locked===n?null:n; set(locked);
   if(locked!==null && !el.classList.contains('anat-item')){
    const li=root.querySelector(`.anat-item[data-n="${n}"]`);
    if(li) li.scrollIntoView({block:'nearest',behavior:'smooth'});
   }
  });
  el.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); el.dispatchEvent(new Event('click')); } });
 });
}

function rarityGuideHTML(){
 const g=C.rarityGuide;
 return `<div class="setsnote">${T(g.intro)}</div>
  <div class="rarityladder">${g.modern.map((r,i)=>`
   <div class="rung"><div class="rank">${i+1}</div>
    <div><h4>${r.name} <span class="freq">${r.freq}</span></h4><p>${T(r)}</p></div></div>`).join('')}</div>
  <div class="famous"><h3>💎 ${T(g.famous.title)}</h3><ul>
   ${g.famous.items.map(f=>`<li><b>${f.name}</b> — ${T(f)}</li>`).join('')}</ul></div>`;
}

/* ---------- historia ---------- */
function renderHistory(){
 $('hist-title').textContent=T(UI.hist.title);
 $('hist-desc').textContent=T(UI.hist.desc);
 $('timeline').innerHTML=C.history.map(h=>`<div class="tl"><span class="yr">${h.year}</span><p>${T(h)}</p></div>`).join('');
 $('gens-title').textContent=T(UI.hist.gens);
 $('gens-grid').innerHTML=C.generations.map(g=>`
  <div class="genc"><div class="top"><h3>${T(UI.dex.gen)} ${g.gen} — ${g.region}</h3><span>${g.years}</span></div>
   <div class="meta">${g.games} · ${g.count} ${T(UI.hist.pokedexWord)}</div><p>${T(g)}</p></div>`).join('');
}

/* ---------- anime ---------- */
/* w PL: polski tytuł dystrybucyjny na pierwszym planie, oryginał pod spodem
   (tam gdzie polskiego tytułu nie było — zostaje sam oryginał) */
function titleOf(o){
 return (lang==='pl'&&o.titlePl)
  ? `${o.titlePl} <span class="torig">${o.title}</span>`
  : o.title;
}
function renderAnime(){
 $('anime-title').textContent=T(UI.anime.title);
 $('anime-desc').textContent=T(UI.anime.desc);
 $('anime-list').innerHTML=C.anime.map(a=>`
  <div class="animec"><div class="top"><h3>${titleOf(a)}</h3><span class="yrs">${a.years}</span><span class="rg">${a.region||''}</span></div>
   <p>${T(a)}</p></div>`).join('');
 $('side-title').textContent=T(UI.anime.side);
 $('side-list').innerHTML=C.sideSeries.map(s=>`
  <div class="sidec"><h4>${titleOf(s)} <span class="yrs">${s.year}</span></h4><p>${T(s)}</p></div>`).join('');
 $('movies-title').textContent=T(UI.anime.movies);
 $('movies-list').innerHTML=`<table class="movtable">${C.movies.map(m=>`
  <tr><td class="n">${m.n}</td><td class="y">${m.year}</td><td class="t">${titleOf(m)}</td><td class="d">${T(m)}</td></tr>`).join('')}</table>`;
}


/* blok „Jak wyjaśnić dziecku" — prosta wersja zasad dla dorosłego, który uczy dziecko */
function kidBox(g){
 if(!g.kid) return '';
 const k=g.kid, tips=k.tips?(k.tips[lang]||k.tips.pl):[];
 const pairs=[];
 for(let i=0;i<tips.length;i+=2) pairs.push([tips[i],tips[i+1]]);
 return `<div class="kidbox">
   <h4>👶 ${T(k.title)}</h4>
   <p class="kidintro">${T(k.intro)}</p>
   <ol class="kidsteps">${k.steps.map(st=>{const t=st[lang]||st.pl;
     return `<li><b>${t[0]}</b><span>${t[1]}</span></li>`;}).join('')}</ol>
   ${pairs.length?`<div class="kidtips">${pairs.map(([h,t])=>`<div><b>${h}</b><p>${t}</p></div>`).join('')}</div>`:''}
  </div>`;
}

/* ---------- gry ---------- */
function renderPlay(){
 $('play-title').textContent=T(UI.play.title);
 $('play-desc').textContent=T(UI.play.desc);
 $('play-list').innerHTML=C.realGames.map(g=>`
  <div class="playc"><h3><span class="em">${g.icon}</span>${T(g.title)}</h3><p>${T(g)}</p>${kidBox(g)}</div>`).join('');
 $('catch-title').textContent=T(UI.play.catch);
 $('catch-list').innerHTML=C.catching[lang].map(c=>`
  <div class="catchc"><h4>${c[0]}</h4><p>${c[1]}</p></div>`).join('');
}

/* ---------- modal ---------- */
window.closeModal=function(){
 $('modal').classList.remove('on');
 if(/^#(pokemon|karta)=/.test(location.hash)) setHash(curSec?'#dzial='+curSec:'');
};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

/* ---------- render all ---------- */
function renderAll(){
 document.querySelectorAll('#mainnav button').forEach(b=>b.textContent=T(UI.nav[b.dataset.sec]));
 $('btn-pl').classList.toggle('on',lang==='pl');
 $('btn-en').classList.toggle('on',lang==='en');
 document.documentElement.lang=lang;
 $('foot-note').textContent=T(UI.foot);
 renderStart();renderDexControls();renderDex();renderCards();renderHistory();renderAnime();renderPlay();
}
renderAll();
go('start');

function openFromHash(h){
 h=h||location.hash;
 let m;
 if((m=h.match(/^#pokemon=(\d+)$/))){ go('dex'); openMon(+m[1]); }
 else if((m=h.match(/^#karta=(.+)$/))){ go('cards'); openCard(decodeURIComponent(m[1])); }
 else if((m=h.match(/^#dzial=([a-z]+)$/))){ if($('sec-'+m[1])) go(m[1]); }
}
addEventListener('hashchange',()=>openFromHash());
openFromHash(startHash);
})();
