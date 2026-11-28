/* FutureTalk v2 — logika aplikacji. Bez zależności. Stan w localStorage (klucz „futuretalk”, zgodny z v1). */
(function () {
'use strict';

/* ================= KONFIGURACJA ================= */
/* Adres workera AI (futureshow-cloudflare/workers/futuretalk-ai, instrukcja w jego README.md).
   Puste = funkcje AI są całkowicie ukryte. Do testów lokalnych: localStorage['futuretalk-ai-dev'] = 'http://127.0.0.1:8787'. */
var AI_ENDPOINT = '';
var CFG = {
  aiEndpoint: AI_ENDPOINT || (function () { try { return localStorage.getItem('futuretalk-ai-dev') || ''; } catch (e) { return ''; } })(),
  studioUrl: 'https://futureshow.pl/',
  cardsNewPerDay: 10,
  intervals: [0, 1, 3, 7, 14, 30]   /* dni do kolejnej powtórki dla pudełek 1–5 */
};

var D = { pl: window.FT_DATA_PL, en: window.FT_DATA_EN };
var SRC = window.FT_SOURCES;
var I = window.ftIcon;

/* ================= TEKSTY INTERFEJSU ================= */
var UI = {
pl: {
  sub:'Trening komunikacji', tab_path:'Ścieżka', tab_train:'Trening', tab_cards:'Fiszki', tab_journal:'Dziennik', tab_progress:'Postęp',
  install:'Zainstaluj', installTip:'Dodaj kurs do ekranu telefonu lub komputera — otwiera się jak aplikacja i działa bez internetu', theme:'Zmień motyw', langTo:'EN', langLabel:'Switch to English',
  heroStart:'Zacznij od wstępu', heroNext:'Następna lekcja', heroDone:'Cały kurs za Tobą',
  heroMsg0:'15 krótkich lekcji po ok. 5 minut. Plansze, pytania i jedno ćwiczenie do zrobienia w prawdziwym życiu.',
  heroMsgN:'Jedna lekcja dziennie wystarczy. Codzienność bije intensywność.',
  heroMsgAll:'Teraz najtrudniejsze: używać tego. Ćwiczenie dnia i powtórki czekają w zakładce Trening.',
  start:'Zaczynamy', cont:'Kontynuuj', redo:'Powtórz lekcję', ofLessons:'lekcji',
  st_streak:'dni serii', st_due:'do powtórki', st_lessons:'lekcje',
  pathEyebrow:'Ścieżka kursu', pathTitle:'Od Arystotelesa po small talk',
  pathLede:'Każda teza ma przypis do badań — albo uczciwą adnotację, że to tylko praktyka trenerska.',
  s_done:'ukończona', s_half:'w trakcie', s_next:'teraz', boards:'plansz',
  todayK:'Ćwiczenie dnia', todayGo:'Przejdź do treningu', todayDone:'Zrobione dziś ✓',
  next:'Dalej', check:'Sprawdź', finish:'Zakończ lekcję', qTag:'Szybkie pytanie', exTag:'Ćwiczenie na dziś', exK:'Do zrobienia dzisiaj',
  rTag:'Złota zasada', good:'Dokładnie tak!', badA:'Nie do końca — zapamiętaj:',
  notePh:'Opcjonalnie: zapisz jedno zdanie — co zamierzasz przećwiczyć albo co już się udało…', noteHint:'Notatka trafi do Dziennika.',
  srcs:'Źródła', practice:'praktyka', close:'Zamknij',
  cover_q:'pytania', cover_ex:'1 ćwiczenie', cover_min:'ok. 5 min',
  doneH:'Lekcja ukończona!', doneQ:'pytania', doneL:'lekcje', doneS:'dni serii', nextLesson:'Następna lekcja', backPath:'Wróć do ścieżki',
  doneTomorrow:'Wróć jutro po następną — codzienność bije intensywność.', doneAll:'Cały kurs za Tobą. Teraz zostaje najtrudniejsze: używać tego.',
  finK:'FutureShow', finH:'Przećwicz to na żywo', finP:'Nagranie na telefonie pokaże Ci, ile mówisz „yyy”. Jak naprawdę wypadasz przed kamerą i przed ludźmi — zobaczysz dopiero w praktyce.', finA:'Poznaj studio',
  cardsEyebrow:'Powtórki', cardsTitle:'Fiszki',
  cardsLede:'Karta, którą umiesz, wraca coraz rzadziej: po 1, 3, 7, 14 i 30 dniach. Rozłożone powtórki to jedna z najlepiej udokumentowanych metod uczenia się.',
  tap:'Dotknij, aby odwrócić', answer:'Odpowiedź', again:'Powtórz', know:'Umiem', dueToday:'do powtórki dziś', isNew:'nowa', preview:'podgląd z linku',
  allDoneH:'Na dziś wszystko powtórzone', allDoneP:'Następna powtórka: ', cram:'Powtórz dodatkowo wszystkie', share:'Kopiuj link do tej fiszki', copied:'Link skopiowany',
  ruleQ:'Złota zasada tej lekcji?', technique:'Technika', unlock:'Ukończ kolejne lekcje, żeby odblokować ich fiszki', noneYet:'Brak zaplanowanych',
  trainEyebrow:'Trening', trainTitle:'Kilka minut dziennie', trainLede:'Kurs uczy zasad. Trening zamienia je w nawyk.',
  drillK:'Ćwiczenie dnia', drillFrom:'z lekcji', drillDone:'Zrobione', drillOther:'Inne ćwiczenie', drillDoneMsg:'Zrobione dziś — jutro czeka nowe.', drillNote:'Jak poszło? (opcjonalnie, trafi do Dziennika)',
  quizK:'Szybki quiz', quizH:'5 pytań z ukończonych lekcji', quizP:'Przypominanie sobie odpowiedzi utrwala wiedzę lepiej niż ponowne czytanie (Roediger i Karpicke, 2006).', quizGo:'Start',
  quizLocked:'Ukończ pierwszą lekcję, żeby odblokować quiz.', quizRes:'Wynik quizu', quizBest:'Twoje odpowiedzi łącznie',
  cardsK:'Fiszki', cardsH:'Do powtórki dziś', cardsGo:'Powtórz teraz', cardsNone:'Na dziś nic — wróć jutro.',
  sparK:'Sparing z AI', sparH:'Przećwicz rozmowę, zanim odbędzie się naprawdę', sparP:'Claude zagra drugą stronę, a na koniec oceni Cię według zasad z lekcji.',
  aiCheck:'Sprawdź z AI', aiWait:'Claude czyta Twój tekst…', aiScore:'Ocena', aiWorks:'Co działa', aiFix:'Do poprawy', aiRew:'Wersja po poprawkach',
  aiErr:'Nie udało się połączyć z AI. Spróbuj później.', aiLimit:'Dzienny limit AI został wykorzystany — wróć jutro.', aiShort:'Napisz co najmniej jedno pełne zdanie.',
  consentH:'Zanim wyślesz', consentP:'Twój tekst trafi przez serwer FutureShow do modelu Claude (Anthropic) wyłącznie po to, by go ocenić. Nie zapisujemy go i nie łączymy z Tobą. Wszystko inne zostaje w Twojej przeglądarce.', consentOk:'Zgadzam się', cancel:'Anuluj',
  sparPh:'Napisz, co odpowiadasz…', send:'Wyślij', sparEnd:'Zakończ i oceń', dictate:'Dyktuj', sparReview:'Ocena rozmowy', sparTip:'Na następny raz', sparTurns:'wymian',
  journalEyebrow:'Dziennik', journalTitle:'Dziennik treningu', journalLede:'Jedno zdanie dziennie utrwala nawyk. Notatki zapisujesz na końcu lekcji i przy ćwiczeniu dnia.',
  journalEmpty:'Jeszcze pusto. Pierwszą notatkę zapiszesz na końcu dowolnej lekcji.', exportTxt:'Eksportuj (.txt)', del:'Usuń notatkę',
  progEyebrow:'Postęp', progTitle:'Twój trening', p_course:'kursu ukończone', p_streak:'dni serii', p_best:'rekord', p_master:'fiszek opanowanych', p_notes:'notatek',
  heatH:'Aktywność — ostatnie 15 tygodni', less:'mniej', more:'więcej',
  secMethod:'Jak działa ten kurs', secSources:'Źródła', secPrivacy:'Prywatność i aplikacja', reset:'Wyczyść cały postęp',
  resetQ:'Na pewno wyczyścić cały postęp, fiszki i dziennik? Tego nie da się cofnąć.',
  bib_b:'Badania naukowe', bib_k:'Książki i przeglądy', bib_p:'Praktyka trenerska (słabo przebadana)', usedIn:'w lekcjach',
  method:'<p><b>Krótko i codziennie.</b> W badaniu Lally i in. (2010) nawyk utrwalał się średnio po ok. 66 dniach — z ogromnym rozrzutem, od 18 do 254. Dlatego seria dni liczy każdą aktywność: lekcję, ćwiczenie dnia, quiz albo 5 fiszek.</p><p><b>Pytania zamiast czytania.</b> Przypominanie sobie odpowiedzi utrwala wiedzę lepiej niż ponowna lektura (Roediger i Karpicke, 2006) — stąd pytania w każdej lekcji i szybki quiz.</p><p><b>Powtórki rozłożone w czasie.</b> Fiszki wracają po 1, 3, 7, 14 i 30 dniach. Nauka rozłożona w czasie wyraźnie wygrywa z wkuwaniem naraz (przegląd Cepedy i in., 2006).</p><p><b>Uczciwe przypisy.</b> Tezy oparte na badaniach mają źródło. Rady trenerskie, których nikt porządnie nie zbadał, są oznaczone jako „praktyka”. W wersji 2 poprawiliśmy m.in. opis badań Gottmana, „kanapki” feedbackowej i badań Vanessy Bohns, a także dodaliśmy to, co nie przetrwało replikacji („poza mocy”).</p>',
  privacy:'<p>Postęp, fiszki i dziennik zapisują się tylko w tej przeglądarce. Nie zakładasz konta i nic nie wysyłamy. Odsłony liczymy anonimowo, bez ciasteczek (GoatCounter).</p><p>Funkcje AI — jeśli są włączone — są opcjonalne: tekst wysyłasz świadomie, po zgodzie, i nie jest przechowywany.</p><p><b>Aplikacja na telefonie:</b> na Androidzie użyj przycisku „Zainstaluj”. Na iPhonie: Udostępnij → „Do ekranu początkowego”. Po instalacji kurs działa też offline.</p>',
  studioK:'Od FutureShow', studioH:'Studio, które zrobiło ten kurs', studioP:'Portale wiedzy, symulatory, gry i aplikacje — wszystko za darmo.', studioA:'Poznaj studio',
  docTitle:'FutureTalk — darmowy kurs charyzmy i komunikacji'
},
en: {
  sub:'Communication training', tab_path:'Path', tab_train:'Practice', tab_cards:'Cards', tab_journal:'Journal', tab_progress:'Progress',
  install:'Install', installTip:'Add the course to your phone or computer home screen — it opens like an app and works offline', theme:'Toggle theme', langTo:'PL', langLabel:'Przełącz na polski',
  heroStart:'Start with the intro', heroNext:'Next lesson', heroDone:'Course complete',
  heroMsg0:'15 short lessons, about 5 minutes each. Slides, questions and one exercise to do in real life.',
  heroMsgN:'One lesson a day is enough. Consistency beats intensity.',
  heroMsgAll:'Now the hard part: using it. Your exercise of the day and reviews are waiting in Practice.',
  start:'Let’s go', cont:'Continue', redo:'Redo lesson', ofLessons:'lessons',
  st_streak:'day streak', st_due:'cards due', st_lessons:'lessons',
  pathEyebrow:'Course path', pathTitle:'From Aristotle to small talk',
  pathLede:'Every claim cites its research — or honestly says it’s only coaching practice.',
  s_done:'done', s_half:'in progress', s_next:'up next', boards:'slides',
  todayK:'Exercise of the day', todayGo:'Go to practice', todayDone:'Done today ✓',
  next:'Next', check:'Check', finish:'Finish lesson', qTag:'Quick question', exTag:'Today’s exercise', exK:'To do today',
  rTag:'Golden rule', good:'Exactly!', badA:'Not quite — remember:',
  notePh:'Optional: write one sentence — what you’ll practise, or what already worked…', noteHint:'Your note goes to the Journal.',
  srcs:'Sources', practice:'practice', close:'Close',
  cover_q:'questions', cover_ex:'1 exercise', cover_min:'about 5 min',
  doneH:'Lesson complete!', doneQ:'questions', doneL:'lessons', doneS:'day streak', nextLesson:'Next lesson', backPath:'Back to path',
  doneTomorrow:'Come back tomorrow for the next one — consistency beats intensity.', doneAll:'The whole course is done. Now the hard part: using it.',
  finK:'FutureShow', finH:'Practise it for real', finP:'A phone recording will show you how often you say “um”. How you really come across on camera and in front of people — you only find out in practice.', finA:'Meet the studio',
  cardsEyebrow:'Review', cardsTitle:'Flashcards',
  cardsLede:'Cards you know come back less and less often: after 1, 3, 7, 14 and 30 days. Spaced review is one of the best-documented ways to learn.',
  tap:'Tap to flip', answer:'Answer', again:'Again', know:'Got it', dueToday:'due today', isNew:'new', preview:'preview from link',
  allDoneH:'All caught up for today', allDoneP:'Next review: ', cram:'Review all anyway', share:'Copy link to this card', copied:'Link copied',
  ruleQ:'This lesson’s golden rule?', technique:'Technique', unlock:'Finish more lessons to unlock their cards', noneYet:'Nothing scheduled',
  trainEyebrow:'Practice', trainTitle:'A few minutes a day', trainLede:'The course teaches the principles. Practice turns them into habits.',
  drillK:'Exercise of the day', drillFrom:'from lesson', drillDone:'Done', drillOther:'Another one', drillDoneMsg:'Done for today — a new one tomorrow.', drillNote:'How did it go? (optional, saved to Journal)',
  quizK:'Quick quiz', quizH:'5 questions from finished lessons', quizP:'Recalling answers makes knowledge stick better than rereading (Roediger & Karpicke, 2006).', quizGo:'Start',
  quizLocked:'Finish your first lesson to unlock the quiz.', quizRes:'Quiz score', quizBest:'Your answers overall',
  cardsK:'Flashcards', cardsH:'Due today', cardsGo:'Review now', cardsNone:'Nothing due — come back tomorrow.',
  sparK:'AI sparring', sparH:'Rehearse a conversation before it happens', sparP:'Claude plays the other side, then scores you against the lesson’s principles.',
  aiCheck:'Check with AI', aiWait:'Claude is reading your text…', aiScore:'Score', aiWorks:'What works', aiFix:'To improve', aiRew:'Improved version',
  aiErr:'Couldn’t reach the AI. Please try again later.', aiLimit:'Today’s AI limit has been used — come back tomorrow.', aiShort:'Write at least one full sentence.',
  consentH:'Before you send', consentP:'Your text goes through the FutureShow server to Claude (Anthropic) only to be assessed. We don’t store it or link it to you. Everything else stays in your browser.', consentOk:'I agree', cancel:'Cancel',
  sparPh:'Type your reply…', send:'Send', sparEnd:'End and score', dictate:'Dictate', sparReview:'Conversation review', sparTip:'Next time', sparTurns:'turns',
  journalEyebrow:'Journal', journalTitle:'Training journal', journalLede:'One sentence a day builds the habit. You write notes at the end of each lesson and with the exercise of the day.',
  journalEmpty:'Nothing here yet. You’ll write your first note at the end of any lesson.', exportTxt:'Export (.txt)', del:'Delete note',
  progEyebrow:'Progress', progTitle:'Your training', p_course:'of the course', p_streak:'day streak', p_best:'best', p_master:'cards mastered', p_notes:'notes',
  heatH:'Activity — last 15 weeks', less:'less', more:'more',
  secMethod:'How this course works', secSources:'Sources', secPrivacy:'Privacy and the app', reset:'Clear all progress',
  resetQ:'Really clear all progress, cards and journal? This can’t be undone.',
  bib_b:'Research', bib_k:'Books and reviews', bib_p:'Coaching practice (poorly researched)', usedIn:'in lessons',
  method:'<p><b>Short and daily.</b> In Lally et al. (2010) habits formed after about 66 days on average — with a huge range, from 18 to 254. That’s why your streak counts any activity: a lesson, the exercise of the day, a quiz or 5 cards.</p><p><b>Questions, not rereading.</b> Recalling answers makes knowledge stick better than rereading (Roediger & Karpicke, 2006) — hence questions in every lesson and the quick quiz.</p><p><b>Spaced review.</b> Cards return after 1, 3, 7, 14 and 30 days. Spaced learning clearly beats cramming (review by Cepeda et al., 2006).</p><p><b>Honest citations.</b> Research-based claims cite their source. Coaching tips nobody has properly tested are marked “practice”. Version 2 corrected, among others, how Gottman’s research, the feedback sandwich and Vanessa Bohns’s work are described, and added what failed to replicate (“power posing”).</p>',
  privacy:'<p>Your progress, cards and journal are saved only in this browser. No account, nothing sent. Page views are counted anonymously, without cookies (GoatCounter).</p><p>AI features — when enabled — are optional: you send text deliberately, after consenting, and it isn’t stored.</p><p><b>On your phone:</b> on Android use the “Install” button. On iPhone: Share → “Add to Home Screen”. Once installed, the course also works offline.</p>',
  studioK:'From FutureShow', studioH:'The studio behind this course', studioP:'Knowledge portals, simulators, games and apps — all free.', studioA:'Meet the studio',
  docTitle:'FutureTalk — a free course in charisma and communication'
}};

/* ================= STAN ================= */
var STORE_KEY = 'futuretalk';
var mem = null;
function load() {
  var s = null;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch (e) { s = mem; }
  s = s || {};
  s.lessons = s.lessons || {};
  s.streak = s.streak || { last: '', count: 0 };
  if (s.streak.best == null) s.streak.best = s.streak.count || 0;
  s.journal = s.journal || [];
  s.cards = s.cards || {};
  s.newDay = s.newDay || { d: '', n: 0 };
  s.drill = s.drill || { d: '', k: '', done: false };
  s.days = s.days || {};
  s.quiz = s.quiz || { ok: 0, all: 0 };
  s.v = 2;
  return s;
}
var state = load();
function save() { mem = state; try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }

function q(id) { return document.getElementById(id); }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function pad(n) { return String(n).padStart(2, '0'); }
function dkey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function today() { return dkey(new Date()); }
function addDays(k, n) { var p = k.split('-'); var d = new Date(+p[0], +p[1] - 1, +p[2]); d.setDate(d.getDate() + n); return dkey(d); }
function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function hashStr(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function track(path) { try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: 'futuretalk/' + path, event: true }); } catch (e) {} }

/* ================= JĘZYK ================= */
var LANG = (function () {
  var m = /[?&]lang=(pl|en)/.exec(location.search);
  if (m) return m[1];
  if (state.lang) return state.lang;
  return /^pl\b/i.test(navigator.language || 'pl') ? 'pl' : 'en';
})();
function t(k) { return UI[LANG][k] != null ? UI[LANG][k] : (UI.pl[k] || k); }
function DATA() { return D[LANG]; }
function L() { return DATA().lessons; }
function lessonById(id) { var a = L(); for (var i = 0; i < a.length; i++) if (a[i].id === id) return i; return -1; }

/* ================= POSTĘP ================= */
function lst(id) { return state.lessons[id] || { step: 0, done: false }; }
function doneCount() { return L().filter(function (l) { return lst(l.id).done; }).length; }
function nextIdx() { var a = L(); for (var i = 0; i < a.length; i++) if (!lst(a[i].id).done) return i; return -1; }
function activity(n) {
  var k = today();
  state.days[k] = (state.days[k] || 0) + (n || 1);
  if (state.streak.last !== k) {
    state.streak.count = state.streak.last === addDays(k, -1) ? state.streak.count + 1 : 1;
    state.streak.last = k;
    if (state.streak.count > (state.streak.best || 0)) state.streak.best = state.streak.count;
  }
  save();
}
function liveStreak() { var k = today(); return (state.streak.last === k || state.streak.last === addDays(k, -1)) ? state.streak.count : 0; }

/* ================= CYTOWANIA ================= */
function surnames(a) {
  if (/\//.test(a) || !/,/.test(a)) return { names: [a.split(' / ')[LANG === 'en' ? 1 : 0] || a], etal: false };
  var etal = /i in\.$/.test(a);
  var names = a.replace(/\s*i in\.$/, '').split(/,\s*(?:[A-ZÀ-Ž]\.\s?)+,?\s*/).map(function (x) { return x.trim(); }).filter(Boolean);
  return { names: names, etal: etal };
}
function cite(k) {
  var s = SRC[k]; if (!s) return '';
  var n = surnames(s.a), and = LANG === 'en' ? ' & ' : ' i ', al = LANG === 'en' ? ' et al.' : ' i in.';
  var who = (n.etal || n.names.length > 2) ? n.names[0] + al : n.names.join(and);
  return who + (typeof s.y === 'number' ? ', ' + s.y : '');
}
function srcHref(s) { return s.doi ? 'https://doi.org/' + s.doi : (s.u || ''); }
function srcLine(keys) {
  if (!keys || !keys.length) return '';
  return '<div class="srcs">' + I('doc', 16) + '<div><b>' + t('srcs') + ':</b> ' + keys.map(function (k) {
    var s = SRC[k]; if (!s) return '';
    var h = srcHref(s), c = esc(cite(k));
    return (h ? '<a href="' + h + '" target="_blank" rel="noopener">' + c + '</a>' : c) + (s.k === 'p' ? '<span class="pr">' + t('practice') + '</span>' : '');
  }).join(' · ') + '</div></div>';
}

/* ================= GRAFIKA: OKŁADKI ================= */
function cover(l, idx) {
  var seed = hashStr(l.id), r = function (n) { seed = (Math.imul(seed, 1103515245) + 12345) >>> 0; return seed % n; };
  var W = 640, H = 300, s = '', i;
  var motif = l.hue;
  if (motif === 0) { for (i = 0; i < 9; i++) s += '<circle cx="' + (520 + r(60)) + '" cy="' + (40 + r(40)) + '" r="' + (40 + i * 34) + '" fill="none" stroke="#fff" stroke-opacity="' + (0.26 - i * 0.025) + '" stroke-width="2"/>'; }
  else if (motif === 1) { for (var y = 0; y < 8; y++) for (var x = 0; x < 16; x++) { var rr = 1.5 + ((x * 7 + y * 3 + r(5)) % 6); s += '<circle cx="' + (250 + x * 26) + '" cy="' + (18 + y * 26) + '" r="' + rr + '" fill="#fff" fill-opacity=".22"/>'; } }
  else if (motif === 2) { for (i = 0; i < 12; i++) { var yy = 20 + i * 22; s += '<path d="M220 ' + yy + ' Q 330 ' + (yy - 30 - r(20)) + ' 440 ' + yy + ' T 660 ' + yy + '" fill="none" stroke="#fff" stroke-opacity=".2" stroke-width="2"/>'; } }
  else if (motif === 3) { for (i = 0; i < 8; i++) s += '<path d="M' + (480 - i * 6) + ' ' + (300) + ' A ' + (60 + i * 30) + ' ' + (60 + i * 30) + ' 0 0 1 ' + (480 + 120 + i * 54) + ' 300" fill="none" stroke="#fff" stroke-opacity="' + (0.28 - i * 0.03) + '" stroke-width="3"/>'; }
  else { for (i = 0; i < 18; i++) { var sz = 14 + r(30); s += '<rect x="' + (240 + r(380)) + '" y="' + (r(260)) + '" width="' + sz + '" height="' + sz + '" rx="' + (sz / 3.5) + '" fill="#fff" fill-opacity="' + (0.08 + r(14) / 100) + '" transform="rotate(' + r(40) + ' ' + (300 + r(300)) + ' ' + r(300) + ')"/>'; } }
  var big = (window.FT_ICONS[l.icon] || '');
  return '<svg class="art" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMinYMid slice" role="img" aria-label="' + esc(l.t) + '"><defs><linearGradient id="cg' + idx + '" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient></defs>' +
    '<rect width="' + W + '" height="' + H + '" fill="currentColor"/><rect width="' + W + '" height="' + H + '" fill="url(#cg' + idx + ')"/>' + s +
    '<g transform="translate(46 40) scale(4.6)" fill="none" stroke="#fff" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" opacity=".95">' + big + '</g>' +
    '</svg><span class="cnum">' + pad(idx) + '</span>';
}

/* ================= NAWIGACJA ================= */
var current = 'path';
function show(name) {
  current = name;
  document.querySelectorAll('.screen').forEach(function (s) { s.classList.toggle('active', s.id === 'screen-' + name); });
  document.querySelectorAll('nav.tabs button').forEach(function (b) { b.classList.toggle('active', b.dataset.tab === name); });
  var r = { path: renderPath, train: renderTrain, cards: renderCards, journal: renderJournal, progress: renderProgress }[name];
  if (r) r();
  window.scrollTo(0, 0);
}
function setHash(h) { try { history.replaceState(null, '', h || location.pathname + location.search); } catch (e) {} }

/* ================= ŚCIEŻKA ================= */
function renderPath() {
  var a = L(), done = doneCount(), ni = nextIdx(), total = a.length;
  var R = 50, C = 2 * Math.PI * R, pct = done / total;
  var nl = ni >= 0 ? a[ni] : null, started = nl && lst(nl.id).step > 0;
  var heroH = done === 0 ? t('heroStart') : (ni < 0 ? t('heroDone') : t('heroNext') + ': ' + nl.t);
  var heroP = done === 0 ? t('heroMsg0') : (ni < 0 ? t('heroMsgAll') : t('heroMsgN'));
  var due = dueCards().length;
  var dr = drillToday();
  var html = '<div class="layout"><aside>' +
    '<div class="card hero"><div class="ring"><svg viewBox="0 0 120 120"><circle class="track" cx="60" cy="60" r="' + R + '" fill="none" stroke-width="11"/>' +
    '<circle class="fill" cx="60" cy="60" r="' + R + '" fill="none" stroke-width="11" stroke-linecap="round" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + (C * (1 - pct)).toFixed(1) + '"/></svg>' +
    '<div class="num"><div><b>' + done + '/' + total + '</b><small>' + t('ofLessons') + '</small></div></div></div>' +
    '<div><h3>' + esc(heroH) + '</h3><p>' + esc(heroP) + '</p>' +
    (ni >= 0 ? '<button class="btn go" id="herogo">' + (started ? t('cont') : t('start')) + ' ' + I('arrow', 18) + '</button>' : '<button class="btn go" data-go="train">' + t('tab_train') + ' ' + I('arrow', 18) + '</button>') +
    '</div></div>' +
    '<div class="statrow"><div class="card mini"><b>' + I('fire', 20) + liveStreak() + '</b><span>' + t('st_streak') + '</span></div>' +
    '<div class="card mini"><b>' + due + '</b><span>' + t('st_due') + '</span></div>' +
    '<div class="card mini"><b>' + done + '</b><span>' + t('st_lessons') + '</span></div></div>' +
    (dr ? '<div class="card today hue-' + dr.lesson.hue + (state.drill.done && state.drill.d === today() ? ' donep' : '') + '"><div class="tico">' + I('dumbbell', 24) + '</div><div><div class="k">' + t('todayK') + '</div><p>' + esc(dr.text) + '</p>' +
      (state.drill.done && state.drill.d === today() ? '<span class="okline">' + I('check', 18) + t('todayDone') + '</span>' : '<button class="btn small ghost" data-go="train">' + t('todayGo') + '</button>') + '</div></div>' : '') +
    '</aside><div>' +
    '<span class="eyebrow">' + t('pathEyebrow') + '</span><h2 class="screenh">' + t('pathTitle') + '</h2><p class="lede">' + t('pathLede') + '</p>' +
    '<div class="pathwrap" id="pathwrap"><svg class="pathsvg" id="pathsvg"></svg>';
  a.forEach(function (l, i) {
    var s = lst(l.id), cls = s.done ? 'done' : (i === ni ? 'next' : (s.step > 0 ? 'half' : ''));
    var lab = s.done ? t('s_done') : (i === ni ? t('s_next') : (s.step > 0 ? t('s_half') : l.n));
    html += '<button class="pnode hue-' + l.hue + ' ' + cls + '" data-i="' + i + '"><span class="bub">' + I(l.icon, 40) +
      (s.done ? '<span class="badge">' + I('check', 16) + '</span>' : '') + '</span>' +
      '<span class="lbl"><span>' + esc(s.done || i === ni || s.step > 0 ? l.n + ' · ' + lab : l.n) + '</span><b>' + esc(l.t) + '</b></span></button>';
  });
  html += '</div>' + studioCard() + '</div></div>';
  q('screen-path').innerHTML = html;
  var hg = q('herogo'); if (hg) hg.onclick = function () { openLesson(ni); };
  q('screen-path').querySelectorAll('.pnode').forEach(function (b) { b.onclick = function () { openLesson(+b.dataset.i); }; });
  bindGo(q('screen-path'));
  layoutPath();
}
function layoutPath() {
  var wrap = q('pathwrap'), svg = q('pathsvg'); if (!wrap || !svg) return;
  var nodes = wrap.querySelectorAll('.pnode'); if (!nodes.length) return;
  var W = wrap.clientWidth, nw = nodes[0].offsetWidth, amp = Math.max(0, Math.min(150, (W - nw) / 2 - 4));
  var pattern = [0, 1, 0, -1];
  nodes.forEach(function (n, i) { n.style.transform = 'translateX(' + Math.round(pattern[i % 4] * amp) + 'px)'; });
  var wr = wrap.getBoundingClientRect(), pts = [];
  nodes.forEach(function (n) { var b = n.querySelector('.bub').getBoundingClientRect(); pts.push([b.left - wr.left + b.width / 2, b.top - wr.top + b.height / 2]); });
  var d1 = '', d2 = '', ni = nextIdx(); if (ni < 0) ni = pts.length - 1;
  for (var i = 0; i < pts.length; i++) {
    var p = pts[i], seg;
    if (i === 0) { d1 = 'M' + p[0] + ' ' + p[1]; continue; }
    var o = pts[i - 1], my = (o[1] + p[1]) / 2;
    seg = ' C ' + o[0] + ' ' + my + ' ' + p[0] + ' ' + my + ' ' + p[0] + ' ' + p[1];
    d1 += seg; if (i <= ni) d2 += (d2 ? '' : 'M' + pts[0][0] + ' ' + pts[0][1]) + seg;
  }
  svg.setAttribute('viewBox', '0 0 ' + wr.width + ' ' + wr.height);
  svg.innerHTML = '<path d="' + d1 + '"/>' + (d2 ? '<path class="done" d="' + d2 + '"/>' : '');
}
function studioCard() {
  return '<div class="card studio"><div class="k">' + t('studioK') + '</div><h3>' + t('studioH') + '</h3><p>' + t('studioP') + '</p>' +
    '<a class="btn small" href="' + CFG.studioUrl + '" target="_blank" rel="noopener">' + t('studioA') + ' ' + I('arrow', 16) + '</a></div>';
}
function bindGo(root) { root.querySelectorAll('[data-go]').forEach(function (b) { b.onclick = function () { show(b.dataset.go); setHash('#' + b.dataset.go); }; }); }

/* ================= ODTWARZACZ LEKCJI ================= */
var player = q('player'), stepbox = q('stepbox'), footbox = q('footbox');
var P = null; /* { mode:'lesson'|'quiz'|'spar', i, step, ok, all, ... } */
function openPlayer(hue) { player.className = 'player hue-' + hue; player.hidden = false; document.body.style.overflow = 'hidden'; document.body.classList.add('inplayer'); }
function closePlayer() {
  if (P && P.mode === 'lesson') { var l = L()[P.i], s = lst(l.id); if (!s.done) { s.step = Math.max(0, P.step); state.lessons[l.id] = s; save(); } }
  P = null; player.hidden = true; document.body.style.overflow = ''; document.body.classList.remove('inplayer'); setHash(''); show(current);
}
q('pclose').onclick = closePlayer;
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !player.hidden && q('modal').hidden) closePlayer(); });
function bar(frac, label) { q('pfill').style.width = Math.round(frac * 100) + '%'; q('pcount').textContent = label || ''; }
function foot(btns) {
  footbox.innerHTML = '';
  btns.forEach(function (b) {
    var el = document.createElement('button');
    el.className = 'btn wide' + (b.ghost ? ' ghost' : '');
    el.innerHTML = b.html || esc(b.label);
    if (b.disabled) el.disabled = true;
    el.onclick = b.fn; if (b.id) el.id = b.id;
    footbox.appendChild(el);
  });
  return footbox.lastChild;
}
function scrollTopMain() { document.querySelector('.pmain').scrollTop = 0; }

function openLesson(i) {
  var l = L()[i]; if (!l) return;
  var s = lst(l.id);
  P = { mode: 'lesson', i: i, step: s.done ? -1 : (s.step > 0 ? s.step : -1), ok: 0, all: 0 };
  openPlayer(l.hue); setHash('#lekcja=' + l.id); track('lekcja/' + l.id);
  renderStep();
}
function lessonHead(l) {
  return '<div class="stepchip"><span class="sq">' + I(l.icon, 20) + '</span>' + esc(l.n) + ' · ' + esc(l.t) + '</div>';
}
function renderStep() {
  var l = L()[P.i], n = l.steps.length;
  scrollTopMain();
  bar(Math.max(0, P.step) / (n + 1), P.step < 0 ? '' : (P.step + 1) + '/' + n);
  if (P.step < 0) {
    var nq = l.steps.filter(function (s) { return s.t === 'q'; }).length, ni = l.steps.filter(function (s) { return s.t === 'i'; }).length;
    stepbox.innerHTML = '<div class="cover hue-' + l.hue + '" style="color:var(--hc)">' + cover(l, P.i) +
      '<div class="ctext"><small>' + esc(l.n) + '</small><h2>' + esc(l.t) + '</h2></div></div>' +
      '<div class="cmeta"><span>' + ni + ' ' + t('boards') + '</span><span>' + nq + ' ' + t('cover_q') + '</span><span>' + t('cover_ex') + '</span><span>' + t('cover_min') + '</span></div>';
    foot([{ html: (lst(l.id).done ? t('redo') : t('start')) + ' ' + I('arrow', 18), fn: function () { P.step = 0; renderStep(); } }]).focus();
    return;
  }
  if (P.step >= n) { renderDone(); return; }
  var s = l.steps[P.step];
  if (s.t === 'i') {
    stepbox.innerHTML = lessonHead(l) + (s.h ? '<h2 class="steph">' + s.h + '</h2>' : '') + '<div class="stepx">' + s.x + '</div>' + srcLine(s.src);
    foot([{ label: t('next'), fn: advance }]).focus();
    return;
  }
  if (s.t === 'q') { renderQuestion(s, l, advance); return; }
  if (s.t === 'ex') {
    stepbox.innerHTML = lessonHead(l) + '<div class="excard"><span class="el">' + I('dumbbell', 16) + t('exK') + '</span>' + s.x + '</div>' +
      '<textarea class="jnote" id="jnote" rows="3" placeholder="' + esc(t('notePh')) + '"></textarea>' +
      '<p class="jhint">' + t('noteHint') + '</p>' + dictateBtn('jnote') + aiCheckBox(l);
    bindDictate(); bindAiCheck(l);
    foot([{ label: t('next'), fn: function () {
      var v = q('jnote').value.trim();
      if (v) { state.journal.unshift({ d: today(), t: l.t, lid: l.id, k: 'ex', x: v }); save(); }
      advance();
    } }]);
    return;
  }
  stepbox.innerHTML = lessonHead(l) + '<div class="stepchip" style="margin-top:1rem">' + I('spark', 18) + t('rTag') + '</div><div class="rulecard">' + esc(l.rule) + '</div>';
  foot([{ label: t('finish'), fn: advance }]).focus();
}
function advance() {
  P.step++;
  if (P.mode === 'lesson') { var l = L()[P.i], s = lst(l.id); if (!s.done) { s.step = P.step; state.lessons[l.id] = s; save(); } }
  renderStep();
}
function renderQuestion(s, l, onNext) {
  var order = shuffle(s.o.map(function (_, i) { return i; }));
  stepbox.innerHTML = (l ? lessonHead(l) : '') + '<div class="stepchip">' + '<span class="sq">' + I('quiz', 20) + '</span>' + t('qTag') + '</div>' +
    '<h2 class="steph">' + esc(s.q) + '</h2><div id="optbox"></div>';
  var box = q('optbox'), picked = -1, done = false, btns = [];
  order.forEach(function (oi, pos) {
    var b = document.createElement('button');
    b.className = 'qopt'; b.innerHTML = '<span class="lt">' + 'ABCD'[pos] + '</span><span>' + esc(s.o[oi]) + '</span>';
    b.onclick = function () { if (done) return; picked = oi; btns.forEach(function (x) { x.el.classList.toggle('sel', x.oi === oi); }); chk.disabled = false; };
    box.appendChild(b); btns.push({ el: b, oi: oi });
  });
  var chk = foot([{ label: t('check'), disabled: true, fn: function () {
    if (done || picked < 0) return; done = true;
    var good = picked === s.c; P.all++; if (good) P.ok++;
    state.quiz.all++; if (good) state.quiz.ok++; save();
    btns.forEach(function (x) { x.el.disabled = true; x.el.classList.remove('sel'); if (x.oi === s.c) x.el.classList.add('good'); else if (x.oi === picked) x.el.classList.add('badpick'); });
    footbox.innerHTML = '<div class="fb ' + (good ? 'ok' : 'err') + '"><b>' + (good ? t('good') : t('badA')) + '</b>' + esc(s.fb) + '</div>';
    var nb = document.createElement('button'); nb.className = 'btn wide'; nb.textContent = t('next'); nb.onclick = onNext; footbox.appendChild(nb); nb.focus();
  } }]);
}
function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var c = document.createElement('div'); c.className = 'confetti';
  var cols = ['var(--h0)', 'var(--h1)', 'var(--h2)', 'var(--h3)', 'var(--h4)'];
  for (var i = 0; i < 70; i++) { var e = document.createElement('i'); e.style.left = Math.random() * 100 + '%'; e.style.background = cols[i % 5]; e.style.animationDuration = (1.6 + Math.random() * 1.8) + 's'; e.style.animationDelay = (Math.random() * .4) + 's'; c.appendChild(e); }
  document.body.appendChild(c); setTimeout(function () { c.remove(); }, 4200);
}
function renderDone() {
  var l = L()[P.i], s = lst(l.id), first = !s.done;
  s.done = true; s.step = 0; state.lessons[l.id] = s; activity(2); save();
  if (first) track('ukonczona/' + l.id);
  bar(1, '');
  var all = doneCount() === L().length, ni = nextIdx();
  stepbox.innerHTML = '<div class="donewrap"><div class="medal">' + I(l.icon, 60) + '</div><h2>' + t('doneH') + '</h2><p>' + esc(l.n + ' · ' + l.t) + '</p>' +
    '<div class="donestats">' + (P.all ? '<div class="card mini"><b>' + P.ok + '/' + P.all + '</b><span>' + t('doneQ') + '</span></div>' : '') +
    '<div class="card mini"><b>' + doneCount() + '/' + L().length + '</b><span>' + t('doneL') + '</span></div>' +
    '<div class="card mini"><b>' + I('fire', 20) + liveStreak() + '</b><span>' + t('doneS') + '</span></div></div>' +
    (all ? '<p>' + t('doneAll') + '</p><div class="ctablock"><div class="k">' + t('finK') + '</div><h3>' + t('finH') + '</h3><p>' + t('finP') + '</p><a class="btn small" href="' + CFG.studioUrl + '" target="_blank" rel="noopener">' + t('finA') + '</a></div>'
      : (first ? '<p>' + t('doneTomorrow') + '</p>' : '')) + '</div>';
  var btns = [];
  if (ni >= 0) btns.push({ html: t('nextLesson') + ' ' + I('arrow', 18), fn: function () { openLesson(ni); } });
  btns.push({ label: t('backPath'), ghost: ni >= 0, fn: closePlayer });
  foot(btns);
  if (first) confetti();
}

/* ================= FISZKI (powtórki rozłożone w czasie) ================= */
function allCards() {
  var out = [];
  L().forEach(function (l) {
    var lab = l.n + ' · ' + l.t, open = lst(l.id).done;
    out.push({ fid: l.id, l: lab, hue: l.hue, icon: l.icon, q: t('ruleQ'), a: l.rule, open: open });
    l.cards.forEach(function (c, j) { out.push({ fid: l.id + 'c' + (j + 1), l: lab, hue: l.hue, icon: l.icon, q: c.q, a: c.a, open: open }); });
  });
  DATA().extraCards.forEach(function (c, i) { out.push({ fid: 't' + (i + 1), l: t('technique'), hue: 0, icon: 'spark', q: c.q, a: c.a, open: true }); });
  return out;
}
function cardById(fid) { var a = allCards(); for (var i = 0; i < a.length; i++) if (a[i].fid === fid) return a[i]; return null; }
function dueCards() {
  var k = today(), due = [], fresh = [];
  if (state.newDay.d !== k) { state.newDay = { d: k, n: 0 }; }
  allCards().forEach(function (c) {
    if (!c.open) return;
    var cs = state.cards[c.fid];
    if (cs) { if (cs.d <= k) due.push(c); } else fresh.push(c);
  });
  due.sort(function (a, b) { return state.cards[a.fid].d < state.cards[b.fid].d ? -1 : 1; });
  var room = Math.max(0, CFG.cardsNewPerDay - state.newDay.n);
  return due.concat(fresh.slice(0, room));
}
var deck = null, cram = false, flipped = false, previewFid = null;
function buildDeck() { deck = cram ? shuffle(allCards().filter(function (c) { return c.open; })) : dueCards(); }
function nextReview() {
  var m = null; Object.keys(state.cards).forEach(function (k) { var d = state.cards[k].d; if (d > today() && (!m || d < m)) m = d; }); return m;
}
function fmtDate(k) { var p = k.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString(LANG === 'pl' ? 'pl-PL' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' }); }
function renderCards() {
  if (!deck) buildDeck();
  if (previewFid) { var pc = cardById(previewFid); if (pc) { deck = deck.filter(function (c) { return c.fid !== pc.fid; }); deck.unshift(pc); pc.preview = true; } previewFid = null; }
  var all = allCards(), open = all.filter(function (c) { return c.open; }).length;
  var html = '<div class="narrow"><span class="eyebrow">' + t('cardsEyebrow') + '</span><h2 class="screenh">' + t('cardsTitle') + '</h2><p class="lede">' + t('cardsLede') + '</p>';
  if (!deck.length) {
    var nr = nextReview();
    html += '<div class="card emptybox"><div class="big">' + I('check', 40) + '</div><h3>' + t('allDoneH') + '</h3><p>' + (nr ? t('allDoneP') + fmtDate(nr) : t('noneYet')) + '</p>' +
      '<button class="btn ghost" id="cramb">' + t('cram') + '</button></div>';
  } else {
    var c = deck[0], cs = state.cards[c.fid], bx = cs ? cs.b : 0, dots = '';
    for (var i = 1; i <= 5; i++) dots += '<i class="' + (i <= bx ? 'on' : '') + '"></i>';
    html += '<div class="cardmeta"><span>' + (cram ? '∞' : deck.length + ' · ' + t('dueToday')) + (c.preview ? ' · ' + t('preview') : (!cs ? ' · ' + t('isNew') : '')) + '</span><span class="boxes" title="' + bx + '/5">' + dots + '</span></div>' +
      '<div class="cardstage"><button class="fcard hue-' + c.hue + '" id="fcard" aria-live="polite">' +
      '<span class="face"><span class="wm">' + I(c.icon, 170) + '</span><span class="fl">' + esc(c.l) + '</span><span class="ft">' + esc(c.q) + '</span><span class="tap">' + t('tap') + '</span></span>' +
      '<span class="face backface"><span class="wm">' + I(c.icon, 170) + '</span><span class="fl">' + t('answer') + '</span><span class="ft">' + esc(c.a) + '</span></span></button></div>' +
      '<div class="cardbtns"><button id="againb">' + t('again') + '</button><button class="know" id="knowb">' + t('know') + '</button></div>' +
      '<div class="cardsub"><button class="linkbtn" id="shareb">' + I('link', 15) + t('share') + '</button></div>';
  }
  if (open < all.length) html += '<p class="lede" style="text-align:center;font-size:.85rem">' + t('unlock') + ' (' + open + '/' + all.length + ').</p>';
  html += '</div>';
  q('screen-cards').innerHTML = html;
  flipped = false;
  if (q('cramb')) q('cramb').onclick = function () { cram = true; buildDeck(); renderCards(); };
  if (!deck.length) { updateBadges(); return; }
  var c0 = deck[0];
  setHash('#fiszka=' + c0.fid);
  var fc = q('fcard'); fc.onclick = function () { flipped = !flipped; fc.classList.toggle('flipped', flipped); };
  q('againb').onclick = function () { answerCard(c0, false); };
  q('knowb').onclick = function () { answerCard(c0, true); };
  q('shareb').onclick = function () { copyText(location.origin + location.pathname + '#fiszka=' + c0.fid); };
  updateBadges();
}
function answerCard(c, know) {
  var k = today(), cs = state.cards[c.fid];
  deck.shift();
  if (!cram && !c.preview) {
    if (!cs) { state.newDay.n++; cs = { b: 0, d: k }; }
    if (know) { cs.b = Math.min(5, cs.b + 1); cs.d = addDays(k, CFG.intervals[cs.b]); }
    else { cs.b = 1; cs.d = k; deck.splice(Math.min(deck.length, 2 + Math.floor(Math.random() * 3)), 0, c); }
    state.cards[c.fid] = cs;
  } else if (!know) { deck.splice(Math.min(deck.length, 3), 0, c); }
  delete c.preview;
  state.reviewed = state.reviewed && state.reviewed.d === k ? { d: k, n: state.reviewed.n + 1 } : { d: k, n: 1 };
  if (state.reviewed.n === 5) activity(1); else { state.days[k] = (state.days[k] || 0); save(); }
  renderCards();
}
function copyText(s) {
  var ok = function () { toast(t('copied')); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(s).then(ok, function () { prompt('', s); });
  else prompt('', s);
}
var toastT;
function toast(msg) { var el = q('toast'); el.textContent = msg; el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove('on'); }, 1800); }

/* ================= TRENING ================= */
function drillPool() {
  var a = L(), pool = [];
  a.forEach(function (l) { if (lst(l.id).done) l.drills.forEach(function (d, j) { pool.push({ lesson: l, j: j, text: d, key: l.id + ':' + j }); }); });
  if (!pool.length) [a[0], a[1]].forEach(function (l) { l.drills.forEach(function (d, j) { pool.push({ lesson: l, j: j, text: d, key: l.id + ':' + j }); }); });
  return pool;
}
function drillToday() {
  var pool = drillPool(), k = today(), found = null;
  if (state.drill.d === k && state.drill.k) pool.forEach(function (p) { if (p.key === state.drill.k) found = p; });
  if (found) return found;
  var p = pool[hashStr(k) % pool.length];
  if (state.drill.d !== k) { state.drill = { d: k, k: p.key, done: false }; save(); }
  else { state.drill.k = p.key; save(); }
  return p;
}
function renderTrain() {
  var dr = drillToday(), isDone = state.drill.done && state.drill.d === today();
  var done = doneCount(), due = dueCards().length;
  var html = '<span class="eyebrow">' + t('trainEyebrow') + '</span><h2 class="screenh">' + t('trainTitle') + '</h2><p class="lede">' + t('trainLede') + '</p><div class="tgrid">' +
    '<div class="card tcard drill span hue-' + dr.lesson.hue + '"><span class="wm">' + I(dr.lesson.icon, 200) + '</span><div class="k">' + I('dumbbell', 16) + t('drillK') + '</div>' +
    '<h3>' + esc(dr.text) + '</h3><p>' + t('drillFrom') + ': ' + esc(dr.lesson.n + ' · ' + dr.lesson.t) + '</p>' +
    (isDone ? '<span class="okline">' + I('check', 18) + t('drillDoneMsg') + '</span>'
      : '<textarea class="jnote" id="drillnote" rows="2" placeholder="' + esc(t('drillNote')) + '"></textarea><div class="row" style="margin-top:.7rem"><button class="btn" id="drilldone">' + I('check', 18) + t('drillDone') + '</button><button class="btn ghost" id="drillother">' + t('drillOther') + '</button></div>') +
    '</div>' +
    '<div class="card tcard hue-3"><div class="k">' + I('quiz', 16) + t('quizK') + '</div><h3>' + t('quizH') + '</h3><p>' + t('quizP') + '</p>' +
    (done ? '<div class="row"><button class="btn" id="quizgo">' + t('quizGo') + ' ' + I('arrow', 18) + '</button>' + (state.quiz.all ? '<span style="color:var(--ink-soft);font-size:.85rem">' + t('quizBest') + ': ' + Math.round(100 * state.quiz.ok / state.quiz.all) + '%</span>' : '') + '</div>' : '<p><i>' + t('quizLocked') + '</i></p>') + '</div>' +
    '<div class="card tcard hue-0"><div class="k">' + I('cards', 16) + t('cardsK') + '</div><h3>' + t('cardsH') + ': ' + due + '</h3><p>' + t('cardsLede').split('.')[0] + '.</p>' +
    (due ? '<button class="btn" data-go="cards">' + t('cardsGo') + ' ' + I('arrow', 18) + '</button>' : '<p><i>' + t('cardsNone') + '</i></p>') + '</div>';
  if (AI.on) {
    html += '<div class="card tcard span hue-4"><div class="k">' + I('chat', 16) + t('sparK') + '</div><h3>' + t('sparH') + '</h3><p>' + t('sparP') + '</p><div class="scen">';
    DATA().scenarios.forEach(function (sc) {
      var li = lessonById(sc.lesson), l = L()[li];
      html += '<button class="hue-' + l.hue + '" data-scen="' + sc.id + '"><span class="sq">' + I(l.icon, 20) + '</span><span><b>' + esc(sc.t) + '</b><span>' + esc(sc.d) + '</span></span></button>';
    });
    html += '</div></div>';
  }
  html += '</div>';
  q('screen-train').innerHTML = html;
  bindGo(q('screen-train'));
  if (q('drilldone')) q('drilldone').onclick = function () {
    var v = q('drillnote').value.trim();
    if (v) state.journal.unshift({ d: today(), t: dr.text, lid: dr.lesson.id, k: 'drill', x: v });
    state.drill.done = true; activity(1); save(); track('cwiczenie-dnia'); toast('✓'); renderTrain(); updateBadges();
  };
  if (q('drillother')) q('drillother').onclick = function () {
    var pool = drillPool(), i = 0; pool.forEach(function (p, j) { if (p.key === state.drill.k) i = j; });
    state.drill.k = pool[(i + 1) % pool.length].key; save(); renderTrain();
  };
  if (q('quizgo')) q('quizgo').onclick = startQuiz;
  q('screen-train').querySelectorAll('[data-scen]').forEach(function (b) { b.onclick = function () { openSpar(b.dataset.scen); }; });
}
function startQuiz() {
  var pool = [];
  L().forEach(function (l) { if (lst(l.id).done) l.steps.forEach(function (s) { if (s.t === 'q') pool.push({ s: s, l: l }); }); });
  if (!pool.length) return;
  var items = shuffle(pool).slice(0, 5);
  P = { mode: 'quiz', items: items, k: 0, ok: 0, all: 0 };
  openPlayer(3); track('quiz');
  quizStep();
}
function quizStep() {
  scrollTopMain();
  var n = P.items.length;
  bar(P.k / n, (Math.min(P.k + 1, n)) + '/' + n);
  if (P.k >= n) {
    activity(1);
    var pct = Math.round(100 * P.ok / P.all);
    stepbox.innerHTML = '<div class="donewrap"><div class="medal" style="background:var(--h3)">' + I('quiz', 60) + '</div><h2>' + t('quizRes') + '</h2>' +
      '<div class="donestats"><div class="card mini"><b>' + P.ok + '/' + P.all + '</b><span>' + t('doneQ') + '</span></div><div class="card mini"><b>' + pct + '%</b><span>' + t('quizBest') + '</span></div></div></div>';
    if (pct === 100) confetti();
    foot([{ label: t('quizGo') + ' ↻', fn: startQuiz }, { label: t('close'), ghost: true, fn: closePlayer }]);
    return;
  }
  var it = P.items[P.k];
  player.className = 'player hue-' + it.l.hue;
  renderQuestion(it.s, it.l, function () { P.k++; quizStep(); });
}

/* ================= DZIENNIK ================= */
function renderJournal() {
  var html = '<div class="narrow"><span class="eyebrow">' + t('journalEyebrow') + '</span><h2 class="screenh">' + t('journalTitle') + '</h2><p class="lede">' + t('journalLede') + '</p>';
  if (!state.journal.length) html += '<div class="card emptybox"><div class="big">' + I('pen', 36) + '</div><p>' + t('journalEmpty') + '</p></div>';
  else {
    html += '<p><button class="btn small ghost" id="jexp">' + I('download', 16) + t('exportTxt') + '</button></p><ul id="jlist">';
    state.journal.forEach(function (e, i) {
      var li = lessonById(e.lid), hue = li >= 0 ? L()[li].hue : 0;
      html += '<li class="card jentry hue-' + hue + '"><div class="jm"><span>' + esc(e.d) + ' · ' + esc(e.t) + '</span><button class="jdel" data-i="' + i + '" aria-label="' + t('del') + '">' + I('trash', 16) + '</button></div><div class="tx">' + esc(e.x) + '</div></li>';
    });
    html += '</ul>';
  }
  html += '</div>';
  q('screen-journal').innerHTML = html;
  q('screen-journal').querySelectorAll('.jdel').forEach(function (b) { b.onclick = function () { state.journal.splice(+b.dataset.i, 1); save(); renderJournal(); }; });
  if (q('jexp')) q('jexp').onclick = function () {
    var txt = 'FutureTalk — ' + t('journalTitle') + '\n\n' + state.journal.map(function (e) { return e.d + ' · ' + e.t + '\n' + e.x + '\n'; }).join('\n');
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], { type: 'text/plain;charset=utf-8' })); a.download = 'futuretalk-dziennik-' + today() + '.txt';
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };
}

/* ================= POSTĘP ================= */
function renderProgress() {
  var a = L(), done = doneCount();
  var mastered = Object.keys(state.cards).filter(function (k) { return state.cards[k].b >= 3; }).length;
  var html = '<span class="eyebrow">' + t('progEyebrow') + '</span><h2 class="screenh">' + t('progTitle') + '</h2>' +
    '<div class="stats"><div class="card mini"><b>' + Math.round(100 * done / a.length) + '%</b><span>' + t('p_course') + '</span></div>' +
    '<div class="card mini"><b>' + I('fire', 20) + liveStreak() + '</b><span>' + t('p_streak') + ' · ' + t('p_best') + ' ' + (state.streak.best || 0) + '</span></div>' +
    '<div class="card mini"><b>' + mastered + '</b><span>' + t('p_master') + '</span></div>' +
    '<div class="card mini"><b>' + state.journal.length + '</b><span>' + t('p_notes') + '</span></div></div>';
  /* mapa aktywności: 15 tygodni, kolumny = tygodnie od poniedziałku */
  var end = new Date(), dow = (end.getDay() + 6) % 7, start = new Date(end); start.setDate(end.getDate() - dow - 14 * 7);
  var cells = '', k0 = today();
  for (var w = 0; w < 15; w++) for (var d = 0; d < 7; d++) {
    var dt = new Date(start); dt.setDate(start.getDate() + w * 7 + d); var k = dkey(dt);
    if (k > k0) { cells += '<i style="visibility:hidden"></i>'; continue; }
    var v = state.days[k] || 0, lv = v >= 4 ? 3 : v >= 2 ? 2 : v >= 1 ? 1 : 0;
    cells += '<i class="' + (lv ? 'l' + lv : '') + (k === k0 ? ' now' : '') + '" title="' + k + ': ' + v + '"></i>';
  }
  html += '<div class="card heat"><h3>' + t('heatH') + '</h3><div class="heatgrid">' + cells + '</div><div class="heatleg"><span>' + t('less') + '</span><span>' + t('more') + '</span></div></div>';
  html += '<ul class="plist">';
  a.forEach(function (l, i) {
    var s = lst(l.id), cls = s.done ? 'full' : s.step > 0 ? 'half' : '';
    html += '<li class="hue-' + l.hue + ' ' + cls + '"><button data-i="' + i + '"><span class="sq">' + I(l.icon, 18) + '</span><span>' + esc(l.t) + '</span></button><span class="pstate">' + (s.done ? t('s_done') : s.step > 0 ? t('s_half') : '—') + '</span></li>';
  });
  html += '</ul>';
  html += '<details class="card sec"><summary>' + I('spark', 20) + t('secMethod') + '</summary><div class="body">' + t('method') + '</div></details>';
  html += '<details class="card sec" id="bibsec"><summary>' + I('doc', 20) + t('secSources') + ' (' + Object.keys(SRC).length + ')</summary><div class="body">' + bibliography() + '</div></details>';
  html += '<details class="card sec"><summary>' + I('shield', 20) + t('secPrivacy') + '</summary><div class="body">' + t('privacy') + '</div></details>';
  html += studioCard() + '<button class="danger" id="resetb">' + t('reset') + '</button>';
  q('screen-progress').innerHTML = html;
  q('screen-progress').querySelectorAll('.plist button').forEach(function (b) { b.onclick = function () { openLesson(+b.dataset.i); }; });
  q('resetb').onclick = function () {
    if (!confirm(t('resetQ'))) return;
    var lang = state.lang, theme = state.theme;
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    mem = null; state = load(); state.lang = lang; state.theme = theme; save(); deck = null; renderProgress(); updateBadges();
  };
}
function bibliography() {
  var used = {};
  L().forEach(function (l) { l.steps.forEach(function (s) { (s.src || []).forEach(function (k) { (used[k] = used[k] || []).indexOf(l.n) < 0 && used[k].push(l.n); }); }); });
  var groups = { b: [], k: [], p: [] };
  Object.keys(SRC).forEach(function (k) { groups[SRC[k].k].push(k); });
  var out = '';
  ['b', 'k', 'p'].forEach(function (g) {
    groups[g].sort(function (x, y) { return SRC[x].a.localeCompare(SRC[y].a); });
    out += '<div class="bibh">' + t('bib_' + g) + '</div><ul class="bib">';
    groups[g].forEach(function (k) {
      var s = SRC[k], h = srcHref(s);
      out += '<li><span class="kk ' + g + '">' + (g === 'b' ? 'B' : g === 'k' ? 'K' : 'P') + '</span>' + esc(s.a) + ' (' + esc(s.y) + '). ' +
        (h ? '<a href="' + h + '" target="_blank" rel="noopener">' + esc(s.t) + '</a>' : esc(s.t)) + '. <i>' + esc(s.w) + '</i>' +
        (used[k] ? ' — ' + t('usedIn') + ': ' + esc(used[k].join(', ')) : '') + '</li>';
    });
    out += '</ul>';
  });
  return out;
}

/* ================= AI (opcjonalne) ================= */
var AI = { on: false };
function aiInit() {
  if (!CFG.aiEndpoint || !window.fetch) return;
  fetch(CFG.aiEndpoint + '/health').then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
    if (j && j.ok) { AI.on = true; if (current === 'train') renderTrain(); }
  }).catch(function () {});
}
function aiPost(path, body) {
  return fetch(CFG.aiEndpoint + path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
    .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok) { var e = new Error(j.error || 'http'); e.code = r.status; throw e; } return j; }); });
}
function aiErrMsg(e) { return e && e.code === 429 ? t('aiLimit') : t('aiErr'); }
function withConsent(fn) {
  if (state.aiConsent) return fn();
  var m = q('modal');
  m.querySelector('.box').innerHTML = '<h3>' + t('consentH') + '</h3><p>' + t('consentP') + '</p><div class="row"><button class="btn ghost" id="mno">' + t('cancel') + '</button><button class="btn" id="myes">' + t('consentOk') + '</button></div>';
  m.hidden = false; q('myes').focus();
  q('mno').onclick = function () { m.hidden = true; };
  q('myes').onclick = function () { m.hidden = true; state.aiConsent = true; save(); fn(); };
}
function aiCheckBox(l) {
  if (!AI.on) return '';
  return '<div class="aibox"><div class="head">' + I('spark', 18) + 'Claude · ' + t('aiCheck') + '</div><div id="aires"></div><button class="btn small" id="aibtn" style="margin-top:.7rem">' + t('aiCheck') + '</button></div>';
}
function bindAiCheck(l) {
  var b = q('aibtn'); if (!b) return;
  b.onclick = function () {
    var txt = q('jnote').value.trim(), out = q('aires');
    if (txt.length < 15) { out.innerHTML = '<p class="jhint">' + t('aiShort') + '</p>'; return; }
    withConsent(function () {
      b.disabled = true; out.innerHTML = '<div class="aiwait"><i></i><i></i><i></i>' + t('aiWait') + '</div>';
      aiPost('/check', { lang: LANG, lesson: l.id, text: txt.slice(0, 1500) }).then(function (j) {
        var sc = Math.max(0, Math.min(5, j.score | 0)), dots = '';
        for (var i = 1; i <= 5; i++) dots += '<i class="' + (i <= sc ? 'on' : '') + '"></i>';
        out.innerHTML = '<div class="aires"><h4>' + t('aiScore') + ' ' + sc + '/5</h4><div class="score">' + dots + '</div>' +
          (j.works && j.works.length ? '<h4>' + t('aiWorks') + '</h4><ul>' + j.works.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '') +
          (j.fix && j.fix.length ? '<h4>' + t('aiFix') + '</h4><ul>' + j.fix.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '') +
          (j.rewrite ? '<h4>' + t('aiRew') + '</h4><div class="rew">' + esc(j.rewrite) + '</div>' : '') + '</div>';
        track('ai/check');
      }).catch(function (e) { out.innerHTML = '<p class="jhint">' + aiErrMsg(e) + '</p>'; }).then(function () { b.disabled = false; });
    });
  };
}
function openSpar(id) {
  var sc = null; DATA().scenarios.forEach(function (s) { if (s.id === id) sc = s; });
  if (!sc) return;
  var l = L()[lessonById(sc.lesson)];
  withConsent(function () {
    P = { mode: 'spar', sc: sc, l: l, msgs: [], busy: false };
    openPlayer(l.hue); track('ai/spar/' + id);
    sparRender(); sparSend(null);
  });
}
function sparRender() {
  var turns = P.msgs.filter(function (m) { return m.role === 'user'; }).length;
  bar(Math.min(1, turns / 8), turns + ' ' + t('sparTurns'));
  stepbox.innerHTML = '<div class="stepchip"><span class="sq">' + I('chat', 20) + '</span>' + t('sparK') + '</div><h2 class="steph">' + esc(P.sc.t) + '</h2><p class="lede">' + esc(P.sc.d) + '</p>' +
    '<div class="chatlog">' + P.msgs.map(function (m) { return '<div class="msg ' + (m.role === 'user' ? 'me' : 'them') + '">' + esc(m.content) + '</div>'; }).join('') +
    (P.busy ? '<div class="aiwait"><i></i><i></i><i></i></div>' : '') + '</div>' + (P.review || '');
  if (P.review) { foot([{ label: t('close'), fn: closePlayer }]); return; }
  footbox.innerHTML = '<div class="chatin"><textarea class="jnote" id="sparin" rows="2" placeholder="' + esc(t('sparPh')) + '"></textarea><button class="btn" id="sparsend" aria-label="' + t('send') + '">' + I('arrow', 20) + '</button></div>' +
    '<div style="display:flex;gap:.5rem">' + dictateBtn('sparin') + '<button class="btn small ghost" id="sparend"' + (turns < 2 ? ' disabled' : '') + '>' + t('sparEnd') + '</button></div>';
  bindDictate();
  var inp = q('sparin');
  q('sparsend').onclick = function () { var v = inp.value.trim(); if (v && !P.busy) sparSend(v.slice(0, 600)); };
  inp.onkeydown = function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); q('sparsend').click(); } };
  q('sparend').onclick = sparReview;
  var cl = document.querySelector('.pmain'); cl.scrollTop = cl.scrollHeight;
  if (!P.busy) inp.focus();
}
function sparSend(text) {
  if (text) P.msgs.push({ role: 'user', content: text });
  P.busy = true; sparRender();
  aiPost('/spar', { lang: LANG, scenario: P.sc.id, messages: P.msgs.slice(-20) }).then(function (j) {
    if (!P || P.mode !== 'spar') return;
    P.msgs.push({ role: 'assistant', content: j.reply || '…' });
    P.busy = false; sparRender();
    if (P.msgs.filter(function (m) { return m.role === 'user'; }).length >= 8) sparReview();
  }).catch(function (e) { if (!P) return; P.busy = false; P.msgs.push({ role: 'assistant', content: '⚠ ' + aiErrMsg(e) }); sparRender(); });
}
function sparReview() {
  P.busy = true; sparRender();
  aiPost('/spar/review', { lang: LANG, scenario: P.sc.id, messages: P.msgs.filter(function (m) { return m.content.charAt(0) !== '⚠'; }).slice(-20) }).then(function (j) {
    var sc = Math.max(0, Math.min(5, j.score | 0)), dots = '';
    for (var i = 1; i <= 5; i++) dots += '<i class="' + (i <= sc ? 'on' : '') + '"></i>';
    P.review = '<div class="aibox"><div class="head">' + I('spark', 18) + t('sparReview') + '</div><div class="aires"><h4>' + t('aiScore') + ' ' + sc + '/5</h4><div class="score">' + dots + '</div>' +
      (j.strengths || []).map(function (x) { return '<p>✓ ' + esc(x) + '</p>'; }).join('') +
      ((j.improve || []).length ? '<h4>' + t('aiFix') + '</h4><ul>' + j.improve.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '') +
      (j.tip ? '<h4>' + t('sparTip') + '</h4><div class="rew">' + esc(j.tip) + '</div>' : '') + '</div></div>';
    P.busy = false; activity(1); sparRender();
  }).catch(function (e) { P.busy = false; P.review = '<p class="jhint">' + aiErrMsg(e) + '</p>'; sparRender(); });
}

/* ================= DYKTOWANIE (Web Speech API, bez serwera) ================= */
var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
function dictateBtn(target) {
  if (!SR) return '';
  return '<button type="button" class="btn small ghost dictate" data-target="' + target + '">' + I('mic', 16) + t('dictate') + '</button>';
}
function bindDictate() {
  document.querySelectorAll('.dictate').forEach(function (b) {
    b.onclick = function () {
      var ta = q(b.dataset.target); if (!ta) return;
      var rec = new SR(); rec.lang = LANG === 'pl' ? 'pl-PL' : 'en-GB'; rec.interimResults = false; rec.maxAlternatives = 1;
      b.disabled = true; b.classList.add('on');
      rec.onresult = function (e) { var s = e.results[0][0].transcript; ta.value = (ta.value ? ta.value.trim() + ' ' : '') + s; };
      rec.onend = function () { b.disabled = false; b.classList.remove('on'); };
      rec.onerror = rec.onend;
      try { rec.start(); } catch (e) { rec.onend(); }
    };
  });
}

/* ================= POWŁOKA: język, motyw, instalacja, odznaki ================= */
function updateBadges() {
  var n = dueCards().length, dot = q('dot-cards');
  if (dot) { dot.textContent = n > 99 ? '99+' : n; dot.hidden = !n; }
}
function applyLang() {
  document.documentElement.lang = LANG;
  document.title = t('docTitle');
  document.querySelectorAll('[data-t]').forEach(function (el) { el.textContent = t(el.dataset.t); });
  var lb = q('langbtn'); lb.textContent = t('langTo'); lb.setAttribute('aria-label', t('langLabel')); lb.title = t('langLabel');
  q('themebtn').setAttribute('aria-label', t('theme'));
  q('installbtn').title = t('installTip');
  q('pclose').setAttribute('aria-label', t('close'));
}
function effectiveDark() { return state.theme ? state.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; }
function applyTheme() {
  if (state.theme) document.documentElement.setAttribute('data-theme', state.theme); else document.documentElement.removeAttribute('data-theme');
  q('themebtn').innerHTML = I(effectiveDark() ? 'sun' : 'moon', 18);
  var m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = effectiveDark() ? '#121614' : '#1F6B5E';
}
q('langbtn').onclick = function () { LANG = LANG === 'pl' ? 'en' : 'pl'; state.lang = LANG; save(); deck = null; applyLang(); show(current); track('jezyk/' + LANG); };
q('themebtn').onclick = function () { state.theme = effectiveDark() ? 'light' : 'dark'; save(); applyTheme(); if (current === 'path') layoutPath(); };
var installEvt = null;
window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); installEvt = e; q('installbtn').hidden = false; });
q('installbtn').onclick = function () { if (!installEvt) return; installEvt.prompt(); installEvt.userChoice.then(function () { installEvt = null; q('installbtn').hidden = true; track('instalacja'); }); };
document.querySelectorAll('nav.tabs button').forEach(function (b) { b.onclick = function () { if (b.dataset.tab === 'cards') { cram = false; deck = null; } show(b.dataset.tab); setHash(b.dataset.tab === 'path' ? '' : '#' + b.dataset.tab); }; });
window.addEventListener('scroll', function () { q('appbar').classList.toggle('scrolled', scrollY > 4); }, { passive: true });
var rz; window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { if (current === 'path') layoutPath(); }, 120); });

/* ================= LINKI: #lekcja=, #fiszka=, #trening… ================= */
var TABS = { trening: 'train', practice: 'train', fiszki: 'cards', cards: 'cards', dziennik: 'journal', journal: 'journal', postep: 'progress', progress: 'progress', train: 'train' };
function fromHash() {
  var h = decodeURIComponent(location.hash || '');
  if (h.indexOf('#fiszka=') === 0) { previewFid = h.slice(8); cram = false; deck = null; if (!player.hidden) { P = null; player.hidden = true; document.body.style.overflow = ''; document.body.classList.remove('inplayer'); } show('cards'); return; }
  if (h.indexOf('#lekcja=') === 0) { var i = lessonById(h.slice(8)); if (i >= 0) { show('path'); openLesson(i); } return; }
  var tb = TABS[h.slice(1)]; if (tb) show(tb);
}
window.addEventListener('hashchange', function () { if (player.hidden || location.hash.indexOf('#lekcja=') === 0 || location.hash.indexOf('#fiszka=') === 0) fromHash(); });

/* ================= START ================= */
applyLang(); applyTheme();
show('path'); fromHash(); updateBadges(); aiInit();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (current === 'path') layoutPath(); });
if ('serviceWorker' in navigator && /^https:|^http:\/\/(localhost|127\.0\.0\.1)/.test(location.href)) {
  window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
}
window.FT = { state: function () { return state; }, show: show, openLesson: openLesson, cfg: CFG };
})();
