/* FutureTalk — treść kursu PL (wersja 2, z przypisami).
   Typy kroków: i = plansza, q = pytanie, ex = ćwiczenie, r = złota zasada.
   src: klucze z sources.js. cards: dodatkowe fiszki. drills: mikroćwiczenia na „ćwiczenie dnia”. */
window.FT_DATA_PL = {
lessons: [
{ id:'l0', icon:'pillars', hue:0, n:'Wstęp', t:'Trzy filary przekonywania',
  rule:'Charyzma to dawkowanie trzech filarów naraz: wiarygodności, emocji i logiki.',
  steps:[
  { t:'i', h:'Dlaczego jednych się słucha, a innych nie?', x:'<p>Ponad 2300 lat temu Arystoteles opisał w „Retoryce” <em>trzy środki przekonywania</em>. Ten podział do dziś porządkuje myślenie o perswazji — od sceny TED po rozmowę przy kawie.</p>', src:['aryst'] },
  { t:'i', h:'Ethos — wiarygodność', x:'<p>Słuchacz pyta w głowie: „czy mogę ci ufać?”</p><p>Budujesz go spójnością słów i czynów, spokojem i… przyznawaniem się do niewiedzy.</p>' },
  { t:'i', h:'Pathos — emocje', x:'<p>Słuchacz pyta: „czy mnie to obchodzi?”</p><p>Budujesz go <em>historiami i konkretem</em> — nie abstrakcją.</p>' },
  { t:'i', h:'Logos — logika', x:'<p>Słuchacz pyta: „czy to ma sens?”</p><p>Budujesz go strukturą: teza → argument → przykład.</p>' },
  { t:'q', q:'Na którym filarze ludzie najczęściej opierają się w pojedynkę — i dziwią się, że nikt ich nie słucha?', o:['Ethos (wiarygodność)','Logos (sama logika)','Pathos (emocje)'], c:1, fb:'W pracy najczęściej przegrywa sam logos: fakty i dane bez zaufania i bez powodu, żeby się przejąć.' },
  { t:'q', q:'„Czy mogę ci ufać?” to pytanie o który filar?', o:['Ethos','Logos','Pathos'], c:0, fb:'Ethos to wiarygodność — fundament, bez którego pathos i logos nie działają.' },
  { t:'q', q:'Czym najskuteczniej budujesz pathos?', o:['Historią i konkretem','Podniesionym głosem','Większą liczbą danych'], c:0, fb:'Emocje budzi scena, którą słuchacz widzi oczami wyobraźni — nie przymiotniki.' },
  { t:'ex', x:'Przypomnij sobie osobę, której zawsze chętnie słuchasz. Który filar ma najsilniejszy? A którego najbardziej brakuje Tobie?' },
  { t:'r' }],
  cards:[
  { q:'Trzy filary przekonywania według Arystotelesa?', a:'Ethos (wiarygodność), pathos (emocje), logos (logika).' },
  { q:'Jak buduje się ethos?', a:'Spójnością słów i czynów, spokojem i przyznawaniem się do niewiedzy.' }],
  drills:[
  'Przed jutrzejszą rozmową zapisz po jednym zdaniu na każdy filar: czym zbudujesz zaufanie, co poruszy rozmówcę, jaki argument go przekona.',
  'Obejrzyj 3 minuty dowolnego wystąpienia i nazwij, który filar w nim dominuje.',
  'Powiedz dziś jedno „nie wiem, sprawdzę” zamiast zgadywania — to czysty ethos.']
},
{ id:'l1', icon:'smile', hue:1, n:'Lekcja 1', t:'Pierwsze wrażenie',
  rule:'Najpierw pokaż, że jesteś po ich stronie, dopiero potem — że jesteś dobry w tym, co robisz.',
  steps:[
  { t:'i', h:'Ocena zapada błyskawicznie', x:'<p>W eksperymencie Willis i Todorova wystarczyło <em>100 milisekund</em> patrzenia na twarz, by ludzie ocenili, czy ktoś budzi zaufanie — a dłuższy czas niewiele tę ocenę zmieniał.</p><p>Jedna wyraźna cecha „rozlewa się” potem na inne. To <em>efekt halo</em>.</p>', src:['willis','thorndike'] },
  { t:'i', h:'Ciepło przed kompetencją', x:'<p>Badania nad dwoma wymiarami ocen społecznych (Susan Fiske, Amy Cuddy; w Polsce Bogdan Wojciszke) pokazują, że najpierw ustalamy <em>ciepło</em> — „czy masz wobec mnie dobre zamiary?” — a dopiero potem <em>kompetencję</em>: „czy potrafisz je zrealizować?”.</p><p>Większość ludzi zaczyna od popisu kompetencji — i przegrywa start.</p>', src:['fiske','wojciszke'] },
  { t:'q', q:'Co ludzie oceniają w Tobie najpierw?', o:['Kompetencję','Status','Ciepło'], c:2, fb:'Najpierw „czy jesteś po mojej stronie?”, dopiero potem „czy jesteś dobry?”.' },
  { t:'i', h:'Uśmiech w odpowiedzi', x:'<p>Spójrz na osobę, przez pół sekundy „rozpoznaj ją” — dopiero wtedy się uśmiechnij.</p><p>Uśmiech, który pojawia się w reakcji na kogoś, wygląda na adresowany do niego. Przyklejony z góry — jak maska. To rada trenerska, nie wynik eksperymentu, ale łatwo ją sprawdzić na sobie.</p>', src:['lowndes'] },
  { t:'i', h:'Imię — raz, naturalnie', x:'<p>„Miło mi, Jan” — a potem <em>raz</em> użyj imienia rozmówcy w naturalnym zdaniu.</p><p>Częściej? Brzmisz jak telemarketing.</p>' },
  { t:'i', h:'Pytaj pierwszy — i pogłębiaj', x:'<p>W badaniu zespołu z Harvardu (Huang i in., 2017) osoby, które zadawały więcej pytań, były bardziej lubiane — także na szybkich randkach.</p><p>Najmocniej działały <em>pytania pogłębiające</em>: te, które nawiązują do tego, co rozmówca przed chwilą powiedział.</p>', src:['huang'] },
  { t:'q', q:'Jakie pytania najbardziej zwiększają sympatię rozmówcy?', o:['Pogłębiające — nawiązujące do tego, co właśnie powiedział','Dowolne, byle było ich dużo','Pytania o pracę i zarobki'], c:0, fb:'Pytanie pogłębiające dowodzi, że słuchasz. To ono robiło różnicę w badaniu Huang i in.' },
  { t:'i', h:'Lubią cię bardziej, niż myślisz', x:'<p>Po rozmowie z nieznajomym systematycznie <em>zaniżamy</em>, jak bardzo rozmówca nas polubił. Badacze nazwali to „luką sympatii” (Boothby i in., 2018).</p><p>Wniosek praktyczny: pierwsze wrażenie zwykle wychodzi Ci lepiej, niż podpowiada lęk.</p>', src:['boothby'] },
  { t:'q', q:'Czym jest „luka sympatii”?', o:['Zaniżamy, jak bardzo rozmówca nas polubił','Zawyżamy własny urok','Lubimy tylko podobnych do siebie'], c:0, fb:'Po rozmowie zwykle oceniamy się surowiej niż rozmówca. Warto o tym pamiętać przed kolejną.' },
  { t:'ex', x:'Przy trzech najbliższych powitaniach zastosuj sekwencję: kontakt wzrokowy → pół sekundy → uśmiech → pytanie o drugą osobę.' },
  { t:'r' }],
  cards:[
  { q:'Jak szybko powstaje pierwsza ocena, czy ktoś budzi zaufanie?', a:'Już po ok. 100 milisekund patrzenia na twarz (Willis i Todorov, 2006).' },
  { q:'Dwa wymiary, w których oceniamy ludzi?', a:'Ciepło (dobre zamiary) i kompetencja (umiejętność ich realizacji). Ciepło najpierw.' },
  { q:'Czym jest „luka sympatii”?', a:'Po rozmowie zaniżamy, jak bardzo rozmówca nas polubił (Boothby i in., 2018).' }],
  drills:[
  'Zadaj dziś trzy pytania pogłębiające — każde nawiązujące do ostatniego zdania rozmówcy.',
  'Przy jednym powitaniu: kontakt wzrokowy, pół sekundy, uśmiech, pytanie o drugą osobę.',
  'Na najbliższym spotkaniu zacznij od zdania o rozmówcy, zanim powiesz cokolwiek o sobie.']
},
{ id:'l2', icon:'mic', hue:2, n:'Lekcja 2', t:'Buduj zaufanie głosem',
  rule:'Nie musisz mówić głośniej ani mądrzej. Wystarczy wolniej, niżej i z ciszą w miejscu „yyy”.',
  steps:[
  { t:'i', h:'Twój instrument', x:'<p>Głos to instrument, na którym większość ludzi nigdy świadomie nie grała.</p><p>Najwięcej zmieniają trzy parametry: <em>tempo, pauza, intonacja</em>.</p>' },
  { t:'i', h:'Tempo', x:'<p>Stres zwykle przyspiesza mowę.</p><p>Zwolnienie w kluczowym momencie mówi: „nie boję się, że mi przerwiesz”.</p>' },
  { t:'i', h:'Pauza i „yyy”', x:'<p>Pauza <em>przed</em> ważnym zdaniem buduje napięcie. Pauza <em>po</em> — daje mu wybrzmieć.</p><p>Pojedyncze „yyy” to nie grzech: słuchacze traktują je jako sygnał, że za chwilę padnie coś trudniejszego (Clark i Fox Tree, 2002). Szkodzi <em>nadmiar</em>. Cisza w tym samym miejscu brzmi jak kontrola.</p>', src:['clark'] },
  { t:'q', q:'Czym najlepiej zastąpić nawykowe „yyy”?', o:['Szybszym mówieniem','Słowem „prawda?”','Ciszą'], c:2, fb:'Cisza daje Ci czas na myśl, tak jak „yyy” — ale brzmi jak kontrola, nie jak zagubienie.' },
  { t:'i', h:'Intonacja opadająca', x:'<p>Kończenie twierdzeń tonem w górę (jak pytanie?) wielu słuchaczy odbiera jak prośbę o aprobatę.</p><p>Kończ twierdzenia tonem lekko <em>w dół</em>. To jedna z najprostszych zmian, jakie istnieją.</p>' },
  { t:'i', h:'Niżej, nie głośniej', x:'<p>W eksperymentach Klofstada i współpracowników ludzie częściej wybierali na liderów osoby o <em>niższym</em> głosie — dotyczyło to zarówno mężczyzn, jak i kobiet.</p><p>Nie chodzi o udawanie basu. Mów z dolnej części <em>własnej</em> skali — tam, gdzie głos brzmi, gdy jesteś zrelaksowany.</p>', src:['klofstad'] },
  { t:'i', h:'Głos nocnego radia', x:'<p>Były negocjator FBI Chris Voss poleca w napiętych chwilach „głos DJ-a nocnego radia”: spokojny, niski, wolny.</p><p>To rada praktyka, nie wynik badań — ale dobrze współgra z tym, że ludzie <em>dostrajają się</em> do emocji rozmówcy.</p>', src:['voss'] },
  { t:'q', q:'Co sygnalizuje kończenie twierdzeń intonacją w górę?', o:['Entuzjazm','Niepewność i prośbę o aprobatę','Pewność siebie'], c:1, fb:'Ton w górę zamienia twierdzenie w pytanie — a Ciebie w kogoś, kto prosi o zgodę.' },
  { t:'q', q:'Jaki głos częściej kojarzy się z przywództwem?', o:['Wyższy i szybszy','Niższy, z dolnej części własnej skali','Głośniejszy'], c:1, fb:'Tak wyszło w badaniach Klofstada i in. (2012) — u kobiet i u mężczyzn.' },
  { t:'ex', x:'Nagraj 60 sekund opowiadania o swoim dniu. Policz „yyy” i zdania kończone w górę. Nagraj drugą wersję — z ciszą zamiast „yyy” — i porównaj.' },
  { t:'r' }],
  cards:[
  { q:'Trzy parametry głosu, które zmieniają najwięcej?', a:'Tempo, pauza, intonacja.' },
  { q:'Czy pojedyncze „yyy” szkodzi?', a:'Nie — słuchacze traktują je jako sygnał namysłu (Clark i Fox Tree, 2002). Szkodzi nadmiar.' },
  { q:'Gdzie stawiać pauzę?', a:'Przed ważnym zdaniem (napięcie) i po nim (żeby wybrzmiało).' }],
  drills:[
  'Przeczytaj na głos jeden akapit dwa razy: szybko i z pauzą przed najważniejszym zdaniem. Nagraj obie wersje.',
  'W jednej rozmowie kończ twierdzenia tonem w dół. Zauważ, ile razy ton chciał uciec w górę.',
  'Nagraj 30 sekund i policz „yyy”. Jutro spróbuj o połowę mniej — ciszą, nie przyspieszaniem.']
},
{ id:'l3', icon:'summit', hue:3, n:'Lekcja 3', t:'Pewność siebie wygrywa',
  rule:'Nie czekaj, aż poczujesz pewność, żeby działać. Działaj — pewność przychodzi po, nie przed.',
  steps:[
  { t:'i', h:'Pewność to w dużej mierze stan', x:'<p>Część pewności siebie to cecha. Ale w konkretnej chwili decyduje o niej przede wszystkim <em>stan</em>: to, co robisz z oddechem, ciałem i uwagą.</p><p>A stan da się wywołać.</p>' },
  { t:'i', h:'Trema i ekscytacja są blisko', x:'<p>Fizjologicznie wyglądają podobnie: szybsze serce, adrenalina, płytszy oddech.</p><p>Dużą część różnicy robi <em>interpretacja</em>, którą nadaje im Twój mózg.</p>' },
  { t:'i', h:'Przełącz etykietę', x:'<p>W eksperymentach Alison Wood Brooks (Harvard, 2014) osoby, które przed śpiewaniem, przemową albo zadaniem matematycznym mówiły sobie <em>„jestem podekscytowany”</em>, wypadały lepiej niż te, które próbowały się uspokoić.</p>', src:['brooks'] },
  { t:'q', q:'Co działa lepiej przed stresującym wystąpieniem?', o:['„Jestem podekscytowany”','„Muszę się uspokoić”','Niemyślenie o stresie'], c:0, fb:'Walka z pobudzeniem zwykle przegrywa. Zmiana jego znaczenia — działa.' },
  { t:'i', h:'Pierwsze 30 sekund na pamięć', x:'<p>Lęk jest największy na starcie. Znaj pierwsze 2–3 zdania <em>co do słowa</em> — szczyt stresu przejedziesz na autopilocie.</p><p>Reszty nie ucz się na pamięć. Tylko otwarcia.</p>' },
  { t:'i', h:'Oddech z długim wydechem', x:'<p>Wdech 4 sekundy, wydech 6. Wolny oddech z wydłużonym wydechem wiąże się z przewagą układu przywspółczulnego — „hamulca” stresu (przegląd Zaccaro i in., 2018).</p><p>W badaniu Balbana i in. (2023) już 5 minut dziennie oddychania z długim wydechem poprawiało nastrój. Działa też w trakcie rozmowy — nikt nie zauważy.</p>', src:['zaccaro','balban'] },
  { t:'i', h:'A „poza mocy”?', x:'<p>Słynne „power posing” — dwie minuty w pozie Supermana — miało podnosić testosteron i skłonność do ryzyka. Duża replikacja tego nie potwierdziła (Ranehill i in., 2015).</p><p>Wyprostowana postawa może poprawić <em>samopoczucie</em> — ale nie traktuj jej jak magicznej pigułki.</p>', src:['ranehill'] },
  { t:'q', q:'Którą część wystąpienia warto znać na pamięć co do słowa?', o:['Całość','Pierwsze 30 sekund','Samo zakończenie'], c:1, fb:'Automatyczne otwarcie przenosi Cię przez szczyt lęku. Dalej ciało samo się uspokaja.' },
  { t:'q', q:'Co pokazała duża replikacja badań nad „pozą mocy”?', o:['Brak wpływu na hormony i skłonność do ryzyka','Wyraźny wzrost testosteronu','Że poza szkodzi'], c:0, fb:'Efekt hormonalny się nie powtórzył. Zostaje co najwyżej lepsze samopoczucie.' },
  { t:'ex', x:'Przed następną stresującą rozmową: 3 cykle oddechu 4/6, potem powiedz sobie „to ekscytacja, nie strach”. Wejdź z gotowym pierwszym zdaniem.' },
  { t:'r' }],
  cards:[
  { q:'Co powiedzieć sobie przed stresującym wystąpieniem?', a:'„Jestem podekscytowany” — przeramowanie działa lepiej niż uspokajanie się (Brooks, 2014).' },
  { q:'Co zapamiętać co do słowa przed wystąpieniem?', a:'Tylko pierwsze 2–3 zdania. Reszty nie.' },
  { q:'Czy „poza mocy” podnosi testosteron?', a:'Duża replikacja tego nie potwierdziła (Ranehill i in., 2015).' }],
  drills:[
  'Zrób teraz 5 cykli oddechu 4/6 i zauważ, co dzieje się z barkami.',
  'Napisz i powiedz na głos pierwsze dwa zdania najbliższej ważnej rozmowy. Trzy razy.',
  'Przy najbliższym stresie powiedz w myślach „to ekscytacja” i zanotuj, co się zmieniło.']
},
{ id:'l4', icon:'bubble', hue:4, n:'Lekcja 4', t:'Zabieraj głos w każdym pomieszczeniu',
  rule:'Teza najpierw. Jeśli zaczynasz od tła, ludzie przestają słuchać, zanim dojdziesz do sedna.',
  steps:[
  { t:'i', h:'Kształt, nie częstotliwość', x:'<p>Ludzie nie pamiętają, jak często mówisz. Pamiętają, czy to, co mówisz, <em>ma kształt</em>.</p><p>Jedna dobra wypowiedź na godzinę bije dziesięć chaotycznych.</p>' },
  { t:'i', h:'Struktura PREP', x:'<ul><li><em>P</em>oint — teza w jednym zdaniu</li><li><em>R</em>eason — powód</li><li><em>E</em>xample — konkretny przykład</li><li><em>P</em>oint — teza jeszcze raz</li></ul><p>To popularny szkielet z treningów wystąpień — prosty, bo ma tylko cztery ruchy.</p>' },
  { t:'i', h:'PREP w praktyce', x:'<div class="quote"><p>„Przesuńmy termin. <em>(P)</em></p><p>Testy wykryły błąd, którego nie zdążymy naprawić. <em>(R)</em></p><p>Wczoraj taki sam błąd kosztował nas dwa dni. <em>(E)</em></p><p>Dlatego proponuję piątek zamiast środy.” <em>(P)</em></p></div>' },
  { t:'q', q:'Od czego zaczyna się wypowiedź w strukturze PREP?', o:['Od kontekstu i tła','Od anegdoty','Od tezy'], c:2, fb:'Najlepiej zapamiętujemy początek i koniec (efekt pierwszeństwa i świeżości). PREP stawia tezę w obu miejscach.' },
  { t:'i', h:'Początek i koniec', x:'<p>Z listy słów najlepiej pamiętamy pierwsze i ostatnie — to <em>efekt pierwszeństwa i świeżości</em>, opisany już w latach 60. (Murdock, 1962).</p><p>W wypowiedzi działa podobnie: środek ginie najszybciej. Dlatego teza na start i na koniec.</p>', src:['murdock'] },
  { t:'i', h:'Wejście przez nawiązanie', x:'<p>Gdy wszyscy mówią naraz, zacznij od nawiązania: „Dokładnie o tym, co powiedziała Kasia…”</p><p><em>Rzadko kto przerywa komuś, kto właśnie go docenił.</em></p>' },
  { t:'i', h:'Ciało robi miejsce', x:'<p>Podnieś dłoń na wysokość klatki piersiowej (nie jak w szkole!) i weź wyraźny wdech — ludzie zwykle robią Ci miejsce.</p><p>Pierwsze zdanie powiedz odrobinę głośniej, potem wróć do normy.</p>' },
  { t:'q', q:'Jak najłatwiej wejść do dyskusji, gdy wszyscy mówią?', o:['Nawiązać do słów przedmówcy','Mówić głośniej niż wszyscy','Czekać, aż zapadnie cisza'], c:0, fb:'Nawiązanie to docenienie — rozbraja opór, zanim powiesz swoje.' },
  { t:'q', q:'Dlaczego teza pojawia się w PREP dwa razy?', o:['Bo zapamiętujemy głównie początek i koniec','Żeby wypowiedź była dłuższa','Z grzeczności'], c:0, fb:'Środek wypowiedzi ginie najszybciej. Teza na krańcach — zostaje.' },
  { t:'ex', x:'Na najbliższym spotkaniu sformułuj jedną wypowiedź dokładnie w strukturze PREP. Zapisz ją wcześniej w 4 linijkach, jeśli trzeba.' },
  { t:'r' }],
  cards:[
  { q:'Efekt pierwszeństwa i świeżości?', a:'Najlepiej pamiętamy początek i koniec listy albo wypowiedzi (Murdock, 1962).' },
  { q:'Jak wejść do dyskusji, gdy wszyscy mówią naraz?', a:'Nawiązaniem do przedmówcy: „Dokładnie o tym, co powiedziała Kasia…”, plus otwarta dłoń i wdech.' }],
  drills:[
  'Napisz w 4 linijkach PREP na temat: jedna rzecz, którą warto zmienić w Twojej pracy.',
  'W najbliższej wiadomości (mail, komunikator) postaw tezę w pierwszym zdaniu.',
  'Na spotkaniu wejdź raz z nawiązaniem do przedmówcy, zanim powiesz swoje.']
},
{ id:'l5', icon:'book', hue:0, n:'Lekcja 5', t:'Sekrety storytellingu',
  rule:'Nie ma nudnych tematów — są historie bez komplikacji. Zawsze zaczynaj od problemu.',
  steps:[
  { t:'i', h:'Historia trzyma pamięć', x:'<p>W klasycznym eksperymencie Bowera i Clarka (1969) ludzie, którzy łączyli listę słów w opowieść, pamiętali ich <em>wielokrotnie więcej</em> niż ci, którzy uczyli się ich na pamięć.</p><p>Dane przekonują umysł. Historia sprawia, że je zapamięta.</p>', src:['bower'] },
  { t:'i', h:'Szkielet każdej historii', x:'<ol><li><em>Sytuacja</em> — kto, gdzie, kiedy (1 zdanie)</li><li><em>Komplikacja</em> — coś idzie nie tak</li><li><em>Zwrot</em> — decyzja lub odkrycie</li><li><em>Puenta</em> — co z tego wynika</li></ol>' },
  { t:'i', h:'Przykład w 4 zdaniach', x:'<div class="quote"><p>„We wtorek, 5 minut przed prezentacją dla zarządu… <em>(sytuacja)</em></p><p>…padł mi laptop. <em>(komplikacja)</em></p><p>Wziąłem flipchart i narysowałem całość ręcznie. <em>(zwrot)</em></p><p>Najlepiej odebrana prezentacja w roku — bo patrzyłem na ludzi, nie na slajdy.” <em>(puenta)</em></p></div>' },
  { t:'q', q:'Co jest silnikiem każdej dobrej historii?', o:['Szczęśliwe zakończenie','Komplikacja — coś idzie nie tak','Duża liczba szczegółów'], c:1, fb:'Bez problemu nie ma opowieści. Nuda to historia, w której wszystko poszło gładko.' },
  { t:'i', h:'Konkret, nie abstrakcja', x:'<p>Nie „miałem trudny okres”, tylko <em>„przez trzy tygodnie jadłem obiady o 23:00”</em>.</p><p>Jeden konkretny szczegół sprawia, że słuchacz <em>widzi</em> scenę.</p>' },
  { t:'i', h:'Dwie zasady wykonania', x:'<p>W kulminacji przejdź na czas teraźniejszy: „I nagle wstaje, patrzy na mnie i mówi…” — to wciąga do środka sceny.</p><p>I pilnuj czasu: dobra praktyka to około <em>90 sekund</em>. Anegdota to pocisk, nie serial.</p>' },
  { t:'q', q:'Ile mniej więcej powinna trwać anegdota w rozmowie?', o:['Około 90 sekund','Około 5 minut','Nie ma limitu, byle była ciekawa'], c:0, fb:'Krótka historia zostawia niedosyt. Długa — zabiera rozmowie tlen.' },
  { t:'q', q:'W eksperymencie Bowera i Clarka osoby, które łączyły słowa w historię…', o:['pamiętały ich wielokrotnie więcej','pamiętały tyle samo','myliły kolejność'], c:0, fb:'Opowieść to rusztowanie dla pamięci. Dlatego dane warto „opakować” w scenę.' },
  { t:'ex', x:'Wybierz jedno wydarzenie z ostatniego tygodnia i ułóż z niego historię w 4 zdaniach — po jednym na każdy element szkieletu. Opowiedz ją dziś komuś.' },
  { t:'r' }],
  cards:[
  { q:'Jak zamienić abstrakcję w konkret?', a:'Zamiast „trudny okres” — „przez trzy tygodnie jadłem obiady o 23:00”.' },
  { q:'Jaki czas wybrać w kulminacji historii?', a:'Teraźniejszy: „I nagle wstaje i mówi…” — wciąga do sceny.' }],
  drills:[
  'Opowiedz komuś dziś historię w 4 zdaniach: sytuacja, komplikacja, zwrot, puenta.',
  'Zamień w swojej notatce jedno abstrakcyjne zdanie na scenę z liczbą, godziną albo miejscem.',
  'Zmierz stoperem swoją najczęściej opowiadaną anegdotę. Przytnij do 90 sekund.']
},
{ id:'l6', icon:'figure', hue:1, n:'Lekcja 6', t:'Mowa ciała',
  rule:'Nie graj mowy ciała. Usuń bariery i zwolnij ruchy — reszta wyniknie ze spokoju.',
  steps:[
  { t:'i', h:'Najpierw obalmy mit', x:'<p>„93% komunikacji to mowa ciała”? Nieprawda. Albert Mehrabian badał w 1967 roku bardzo wąską sytuację: przekazywanie <em>uczuć</em> pojedynczymi słowami, gdy ton głosu i mina <em>przeczyły</em> słowom. Sam autor przestrzega przed uogólnianiem.</p><p>Ciało nie zastąpi słów. Ale wpływa na to, czy słowom się <em>wierzy</em>.</p>', src:['mehrabian'] },
  { t:'q', q:'Mit „93% komunikacji to mowa ciała” jest błędny, bo badania dotyczyły…', o:['tylko wystąpień publicznych','tylko przekazywania uczuć przy sprzecznych sygnałach','zupełnie czegoś innego'], c:1, fb:'Mehrabian badał, komu wierzymy, gdy słowa i ton się kłócą — nie ile „procent” znaczy ciało.' },
  { t:'i', h:'Zero barier', x:'<p>Telefon, kubek, skrzyżowane ręce, torba na kolanach — to, co stoi <em>między Tobą a rozmówcą</em>, łatwo odebrać jako dystans.</p><p>Odsłoń tułów. To prosta zmiana, którą widać od razu.</p>' },
  { t:'i', h:'Stopy i inne „sygnały”', x:'<p>Były agent FBI Joe Navarro spopularyzował tezę, że ludzie kierują stopy tam, gdzie chcą iść. To obserwacja praktyka, <em>słabo przebadana</em>.</p><p>Traktuj takie sygnały jak wskazówkę do sprawdzenia — nie jak dowód.</p>', src:['navarro'] },
  { t:'q', q:'Jak traktować popularne „sygnały” w rodzaju stóp skierowanych do wyjścia?', o:['Jako wskazówkę do sprawdzenia, nie dowód','Jako pewny znak','Jako coś bez żadnego znaczenia'], c:0, fb:'Pojedynczy sygnał może znaczyć wiele rzeczy. Sprawdzasz go pytaniem, nie wyrokiem.' },
  { t:'i', h:'Dłonie na wierzchu', x:'<p>Gestykuluj na wysokości tułowia: dłonie widoczne, otwarte, rysujące to, o czym mówisz.</p><p>Gesty pomagają też <em>Tobie</em> — ułatwiają znalezienie słów (Krauss, 1998). Nie trzymaj rąk w kieszeniach na siłę.</p>', src:['krauss'] },
  { t:'i', h:'Wzrok: patrz, gdy słuchasz', x:'<p>W klasycznych obserwacjach Argyle’a i Cooka ludzie patrzyli na rozmówcę przez ok. 60% rozmowy — <em>wyraźnie częściej, gdy słuchali</em>, niż gdy mówili.</p><p>Patrz, gdy słuchasz. Odrywaj wzrok naturalnie, gdy szukasz słów. Wolne, pojedyncze kiwnięcie mówi więcej niż szybkie potakiwanie.</p>', src:['argyle'] },
  { t:'q', q:'Kiedy naturalnie patrzymy na rozmówcę częściej?', o:['Gdy słuchamy','Gdy mówimy','Zawsze tak samo'], c:0, fb:'Gdy mówimy, wzrok ucieka, bo szukamy słów. Gdy słuchamy — wraca do rozmówcy.' },
  { t:'ex', x:'Przez jeden dzień pilnuj tylko jednej rzeczy: nic między Tobą a rozmówcą (odłóż telefon, opuść ręce). Jedna zmiana naraz — tak buduje się nawyk.' },
  { t:'r' }],
  cards:[
  { q:'Skąd się wziął mit „93% to mowa ciała”?', a:'Z uogólnienia badań Mehrabiana (1967) nad przekazywaniem uczuć przy sprzecznych sygnałach.' },
  { q:'Jak gesty pomagają mówiącemu?', a:'Ułatwiają znajdowanie słów (Krauss, 1998).' },
  { q:'Kiedy patrzymy na rozmówcę częściej?', a:'Gdy słuchamy (Argyle i Cook, 1976).' }],
  drills:[
  'Przez jeden dzień: nic między Tobą a rozmówcą — odłóż telefon, opuść kubek.',
  'W jednej rozmowie patrz na rozmówcę, kiedy słuchasz, i odrywaj wzrok, kiedy szukasz słów.',
  'Opowiedz coś z dłońmi na wierzchu, rysując gestem to, o czym mówisz.']
},
{ id:'l7', icon:'eye', hue:2, n:'Lekcja 7', t:'Czytaj ludzi jak profesjonalista',
  rule:'Sygnał niewerbalny to nie odpowiedź — to wskazówka, gdzie zadać pytanie.',
  steps:[
  { t:'i', h:'Nie czytaj pojedynczych gestów', x:'<p>„Skrzyżowane ręce = obrona”? To poziom poradników z lotniska.</p><p>Uważni obserwatorzy patrzą na <em>zmiany względem linii bazowej</em> — tego, jak ktoś zachowuje się zwykle.</p>' },
  { t:'i', h:'Krok 1: kalibracja', x:'<p>Jak ta osoba zachowuje się, gdy jest swobodna? Jak szybko mówi, ile gestykuluje, gdzie patrzy?</p><p>Pierwsze minuty rozmowy służą <em>kalibracji</em>, nie ocenie.</p>' },
  { t:'i', h:'Krok 2: odchylenia', x:'<p>Znaczenie ma zmiana: gaduła nagle milknie przy jednym temacie, spokojna osoba zaczyna bawić się długopisem.</p><p>Nie wiesz jeszcze <em>co</em> to znaczy — wiesz <em>gdzie dopytać</em>.</p>' },
  { t:'q', q:'Na co patrzą uważni obserwatorzy zamiast na pojedyncze gesty?', o:['Na kierunek patrzenia','Na zmiany względem linii bazowej','Na skrzyżowane ręce'], c:1, fb:'Gest znaczy coś dopiero na tle tego, jak ktoś zachowuje się normalnie.' },
  { t:'i', h:'Krok 3: kilka sygnałów naraz', x:'<p>Skrzyżowane ręce mogą znaczyć „zimno mi”.</p><p>Ale skrzyżowane ręce + odsunięty tułów + krótkie odpowiedzi — to już spójny obraz wycofania. Zasada praktyków: szukaj <em>kilku sygnałów naraz</em>, nie jednego.</p>' },
  { t:'i', h:'Twarz nie mówi „dlaczego”', x:'<p>Paul Ekman spopularyzował badania nad mimiką. Ale obszerny przegląd Lisy Feldman Barrett i współpracowników (2019) pokazał, że z samej twarzy <em>nie da się pewnie odczytać</em>, co ktoś czuje — mina zależy od kontekstu, kultury i człowieka.</p><p>Odchylenie od normy to zaproszenie do pytania, nie do wyroku.</p>', src:['ekman','barrett'] },
  { t:'i', h:'Kłamstwa nie widać', x:'<p>Metaanaliza Bonda i DePaulo (2006), obejmująca ponad 200 badań: ludzie rozpoznają kłamstwo z trafnością ok. <em>54%</em> — niewiele lepiej niż rzut monetą.</p><p>Dlatego zawodowcy nie „czytają kłamstw”. <em>Zadają lepsze pytania.</em></p>', src:['bond'] },
  { t:'q', q:'Jak dobrze ludzie rozpoznają kłamstwo?', o:['Ok. 54% — niewiele lepiej niż przypadek','Ok. 90%','Doświadczeni prawie bezbłędnie'], c:0, fb:'Tak wyszło w metaanalizie Bonda i DePaulo. „Wykrywacze kłamstw” z poradników to mit.' },
  { t:'q', q:'Co możesz wiedzieć, widząc nagłą zmianę w zachowaniu rozmówcy?', o:['Że warto o coś dopytać','Dokładnie, co czuje','Że kłamie'], c:0, fb:'Zmiana mówi „tu coś jest”. Co — powie Ci dopiero rozmówca.' },
  { t:'ex', x:'W jednej rozmowie przez 2 minuty kalibruj linię bazową rozmówcy. Zauważ jedno odchylenie i zamiast interpretować — dopytaj: „Widzę, że przy tym temacie się zatrzymałeś. Co o tym myślisz?”' },
  { t:'r' }],
  cards:[
  { q:'Czym jest linia bazowa rozmówcy?', a:'To, jak zachowuje się, gdy jest swobodny: tempo mowy, gesty, wzrok. Znaczenie mają odchylenia od niej.' },
  { q:'Z jaką trafnością ludzie rozpoznają kłamstwo?', a:'Ok. 54% — niewiele ponad przypadek (Bond i DePaulo, 2006).' },
  { q:'Czy z mimiki da się pewnie odczytać emocję?', a:'Nie — mina zależy od kontekstu i człowieka (Barrett i in., 2019).' }],
  drills:[
  'W jednej rozmowie przez 2 minuty tylko obserwuj: tempo mowy, gesty, kierunek wzroku rozmówcy.',
  'Gdy zauważysz zmianę w zachowaniu rozmówcy, zadaj pytanie zamiast interpretować.',
  'Złap się dziś na jednym „on na pewno myśli, że…” i zamień je na pytanie.']
},
{ id:'l8', icon:'target', hue:3, n:'Lekcja 8', t:'Trudny feedback w 40 sekund',
  rule:'Opisuj to, co zarejestrowałaby kamera — nigdy to, co „wiesz” o czyichś intencjach.',
  steps:[
  { t:'i', h:'Dlaczego feedback rani?', x:'<p>Bo atakuje tożsamość: „jesteś niesolidny”.</p><p>Działa, gdy opisuje <em>zachowanie i jego skutek</em> — nie człowieka.</p>' },
  { t:'i', h:'Model SBI', x:'<ul><li><em>S</em>ytuacja — konkretna: kiedy i gdzie</li><li><em>B</em> (zachowanie) — to, co widziała kamera</li><li><em>I</em> (wpływ) — co to spowodowało</li></ul><p>Na końcu: pytanie o rozwiązanie. Model rozwinęło Center for Creative Leadership.</p>', src:['ccl'] },
  { t:'i', h:'Zobacz różnicę', x:'<div class="quote"><p><span class="bad">„Jesteś wiecznie nieprzygotowany i przez ciebie wyszliśmy na amatorów.”</span></p><p>„Na wczorajszym spotkaniu nie miałeś liczb, o które prosiłem w piątek. Klient spytał, czy panujemy nad projektem — musiałem improwizować. Jak to zabezpieczymy na przyszły raz?”</p></div>' },
  { t:'q', q:'Co opisuje „zachowanie” w modelu SBI?', o:['To, co zarejestrowałaby kamera','Intencje rozmówcy','Cechy jego charakteru'], c:0, fb:'„Nie przysłałeś raportu” — tak. „Olałeś temat” — nie. Kamera nie widzi intencji.' },
  { t:'i', h:'Słowa-zapalniki', x:'<p>„Zawsze” i „nigdy” natychmiast uruchamiają obronę — bo wystarczy jeden kontrprzykład, by je obalić.</p><p>Mów o <em>jednym, konkretnym zdarzeniu</em>.</p>' },
  { t:'i', h:'Kanapka — ostrożnie', x:'<p>Pochwała–krytyka–pochwała? Dowody są skromniejsze, niż sugerują poradniki — w obie strony. W kontrolowanym eksperymencie Procházki i in. (2020) „kanapka” nawet nieco poprawiła wyniki — choć tylko w pisemnym feedbacku do zadań z matematyki.</p><p>Realne ryzyko jest inne: pochwała rytualna, oderwana od faktów, uczy ludzi, że <em>zwiastuje cios</em>, i przestają wierzyć w obie (argument m.in. Adama Granta). Chwal więc konkretnie i szczerze — nie jako opakowanie.</p>', src:['prochazka','grant'] },
  { t:'q', q:'Co wiadomo o „kanapce” feedbackowej?', o:['Dowody są skromne — ryzykiem jest pusta, rytualna pochwała','Udowodniono, że zawsze szkodzi','Udowodniono, że zawsze działa'], c:0, fb:'Jeden eksperyment pokazał nawet lekką korzyść. Kłopot zaczyna się, gdy pochwała jest tylko opakowaniem.' },
  { t:'q', q:'Dlaczego „zawsze” i „nigdy” szkodzą w feedbacku?', o:['Jeden kontrprzykład obala całość i uruchamia obronę','Są zbyt formalne','Nie szkodzą'], c:0, fb:'Rozmowa zamienia się w spór o wyjątki, zamiast o rozwiązanie.' },
  { t:'ex', x:'Przypomnij sobie feedback, który odkładasz. Zapisz go w trzech zdaniach SBI + pytanie o rozwiązanie. Zwykle okazuje się łatwiejszy, niż się wydawał.' },
  { t:'r' }],
  cards:[
  { q:'Test kamery w feedbacku?', a:'Opisuj tylko to, co zarejestrowałaby kamera. Intencji kamera nie widzi.' },
  { q:'Co z „kanapką” feedbackową?', a:'Dowody skromne. Pochwała tak — ale konkretna i szczera, nie jako opakowanie krytyki.' }],
  drills:[
  'Zapisz jeden zaległy feedback w trzech zdaniach SBI i dodaj pytanie o rozwiązanie.',
  'Pochwal dziś kogoś modelem SBI: konkretna sytuacja, zachowanie, wpływ.',
  'Wyłap w swoich słowach jedno „zawsze” albo „nigdy” i zamień je na konkretne zdarzenie.']
},
{ id:'l9', icon:'shield', hue:4, n:'Lekcja 9', t:'Trudni ludzie — z głową',
  rule:'Nie da się jednocześnie krzyczeć i czuć się wysłuchanym. Daj drugie — zniknie pierwsze.',
  steps:[
  { t:'i', h:'Najpierw temperatura, potem logika', x:'<p>Silny stres osłabia pracę kory przedczołowej, która odpowiada za rozważne myślenie (Arnsten, 2009). Z osobą wzburzoną nie wygrasz więc argumentami.</p><p>Najpierw obniż temperaturę. Potem rozmawiaj.</p>', src:['arnsten'] },
  { t:'i', h:'Etykietowanie emocji', x:'<p>Nazwij na głos to, co widzisz: <em>„Widzę, że to cię naprawdę zdenerwowało.”</em></p><p>W badaniu Liebermana i współpracowników (2007) nazywanie emocji słowami wiązało się ze spadkiem aktywności ciała migdałowatego. Chris Voss, były negocjator FBI, uczynił z „etykietowania” podstawę swojej metody.</p><p>Uwaga: „widzę, że…”, nie „rozumiem cię”.</p>', src:['lieberman','voss'] },
  { t:'q', q:'Dlaczego etykietowanie emocji uspokaja rozmówcę?', o:['Zawstydza go','Odwraca jego uwagę','Nazwanie emocji wiąże się z niższym pobudzeniem'], c:2, fb:'Nazwana emocja traci część mocy. A rozmówca czuje się wreszcie zauważony.' },
  { t:'i', h:'Pytanie zamiast tarczy', x:'<p>Na atak nie odpowiadaj obroną — to eskaluje.</p><p>Zapytaj spokojnie o konkret: <em>„Co dokładnie powinno się wydarzyć, żebyś uznał, że to naprawione?”</em></p><p>Pytanie przełącza z trybu ataku w tryb myślenia.</p>' },
  { t:'i', h:'Szara skała', x:'<p>Wobec kogoś, kto prowokuje dla samej reakcji: odpowiadaj krótko, neutralnie, <em>nudno</em>. „Możliwe.” „Rozumiem, że tak to widzisz.”</p><p>To technika z poradnictwa, nie z badań — przydaje się wobec prowokacji, nie wobec zwykłej złości kogoś, kto ma problem.</p>' },
  { t:'q', q:'Na czym polega technika „szarej skały”?', o:['Na krótkich, neutralnych, nudnych odpowiedziach','Na ostrej ripoście','Na całkowitym ignorowaniu rozmówcy'], c:0, fb:'Nie ignorujesz — odpowiadasz. Ale nie dajesz ani iskry emocji do podpalenia.' },
  { t:'q', q:'Co silny stres robi z myśleniem rozmówcy?', o:['Osłabia rozważne myślenie','Wyostrza logikę','Nic nie zmienia'], c:0, fb:'Dlatego najpierw temperatura, potem argumenty.' },
  { t:'ex', x:'Gdy ktoś podniesie głos, zamiast się bronić powiedz jedno zdanie etykietujące: „Widzę, że to cię mocno poruszyło”. Obserwuj, co dzieje się z temperaturą rozmowy.' },
  { t:'r' }],
  cards:[
  { q:'Pytanie, które przełącza atak w myślenie?', a:'„Co dokładnie powinno się wydarzyć, żebyś uznał, że to naprawione?”' },
  { q:'Etykietowanie: „widzę, że…” czy „rozumiem cię”?', a:'„Widzę, że…” — opisuje, a nie przypisuje sobie zrozumienia.' }],
  drills:[
  'Dziś raz nazwij czyjąś emocję: „Widzę, że to cię zirytowało”. Zobacz, co się stanie.',
  'Przygotuj jedno pytanie na wypadek ataku: „Co musiałoby się wydarzyć, żebyś uznał, że to naprawione?”',
  'Przy pierwszej irytacji w rozmowie zrób jeden długi wydech, zanim odpowiesz.']
},
{ id:'l10', icon:'stop', hue:0, n:'Lekcja 10', t:'Mów „nie” i bądź lubiany',
  rule:'Szybkie, ciepłe „nie” buduje więcej szacunku niż powolne, wymęczone „tak”.',
  steps:[
  { t:'i', h:'Odmawianie jest trudne — i to normalne', x:'<p>Vanessa Bohns z Cornell pokazała, że powiedzenie „nie” jest dla ludzi <em>dużo trudniejsze</em>, niż sądzą proszący. Z niezręczności zgadzamy się na rzeczy, których nie chcemy.</p><p>To nie słabość charakteru, tylko presja sytuacji. Dlatego warto mieć <em>gotową formułę</em> — zanim padnie prośba.</p>', src:['bohns'] },
  { t:'i', h:'Formuła', x:'<p><em>Uznanie + „nie” + alternatywa</em> (jeśli szczera):</p><div class="quote"><p><span class="bad">„No nie wiem… może… odezwę się.” (i tydzień ciszy)</span></p><p>„Cieszę się, że o mnie pomyślałeś. Nie wezmę tego — mam pełny tydzień i zrobiłbym to słabo. Mogę polecić Ci Marka, siedzi w temacie.”</p></div>' },
  { t:'q', q:'Ile powodów warto podać przy odmowie?', o:['Im więcej, tym lepiej','Jeden','Żadnego — nigdy się nie tłumaczyć'], c:1, fb:'Każdy dodatkowy powód to zaproszenie do negocjacji („a gdyby przesunąć termin?”).' },
  { t:'i', h:'Nie przepraszaj za bardzo', x:'<p>„Przykro mi” — wystarczy.</p><p>„Strasznie, strasznie przepraszam, jestem okropny” — zmuszasz rozmówcę, żeby pocieszał <em>Ciebie</em>.</p>' },
  { t:'i', h:'Zdarta płyta', x:'<p>Ktoś naciska? Powtórz <em>to samo zdanie</em>, spokojnie, tymi samymi słowami. Bez nowych argumentów.</p><p>To technika z klasycznego treningu asertywności (Manuel J. Smith, 1975). Zwykle dwa–trzy powtórzenia kończą temat.</p>', src:['smith'] },
  { t:'q', q:'Na czym polega „zdarta płyta”?', o:['Na spokojnym powtarzaniu tego samego zdania','Na podnoszeniu głosu','Na wymyślaniu nowych argumentów'], c:0, fb:'Nowe argumenty = nowe pole do dyskusji. To samo zdanie = koniec dyskusji.' },
  { t:'q', q:'Co pokazują badania Vanessy Bohns?', o:['Odmawianie jest trudniejsze, niż sądzą proszący','Ludzie łatwo odmawiają','Odmowa zawsze psuje relację'], c:0, fb:'Presja sytuacji jest silna — dlatego formuła przygotowana zawczasu tak pomaga.' },
  { t:'ex', x:'Odmów dziś jednej małej rzeczy, na którą normalnie zgodziłbyś się z grzeczności. Użyj formuły: uznanie + jedno zdanie + ewentualna alternatywa.' },
  { t:'r' }],
  cards:[
  { q:'Formuła ciepłej odmowy?', a:'Uznanie + „nie” z jednym powodem + szczera alternatywa (jeśli jest).' },
  { q:'Co robić, gdy ktoś naciska po odmowie?', a:'„Zdarta płyta”: spokojnie powtórz to samo zdanie, bez nowych argumentów.' }],
  drills:[
  'Odmów dziś jednej małej rzeczy formułą: uznanie + jedno zdanie + ewentualna alternatywa.',
  'Napisz swoje gotowe zdanie odmowy i powiedz je na głos 3 razy.',
  'Zauważ dziś jedno automatyczne „tak” i zapisz, co chciałeś powiedzieć naprawdę.']
},
{ id:'l11', icon:'scissors', hue:1, n:'Lekcja 11', t:'Przerywaj płynnie',
  rule:'Ludzie nie mają żalu, że im przerwano — mają żal, że ich nie usłyszano. Przerywaj parafrazą.',
  steps:[
  { t:'i', h:'Przerwać, nie odbierając twarzy', x:'<p>Czasem trzeba przerwać: gadule, dygresji, spotkaniu, które płonie.</p><p>Sztuka polega na tym, by przerwać <em>osobie</em>, nie odbierając jej twarzy.</p>' },
  { t:'i', h:'Wejście przez imię', x:'<p>Własne imię łatwo przebija się przez szum. W klasycznym badaniu Moraya (1959) część ludzi słyszała je nawet w nagraniu, którego mieli <em>nie słuchać</em>.</p><p><em>„Marku —”</em> (pauza) <em>„— chcę się upewnić, że zdążymy z drugim tematem.”</em></p>', src:['moray'] },
  { t:'i', h:'Wejście przez parafrazę', x:'<div class="quote"><p>„Czyli kluczowe jest, żeby klient zobaczył to przed piątkiem — złapałem. Żeby to się udało, przejdźmy teraz do budżetu.”</p></div><p>Pierwszym zdaniem oddajesz to, co powiedział rozmówca. Czuje się wysłuchany — więc <em>nie walczy o głos</em>.</p>' },
  { t:'q', q:'Dlaczego przerywanie przez parafrazę nie obraża?', o:['Bo zaskakuje rozmówcę','Bo brzmi oficjalnie','Bo rozmówca czuje się wysłuchany'], c:2, fb:'Oddajesz mu jego myśl — więc nie musi jej bronić ani powtarzać.' },
  { t:'i', h:'Wejście przez metakomunikat', x:'<p>Mów o rozmowie zamiast o temacie:</p><p><em>„Zatrzymam nas na chwilę — mamy 10 minut, a dwa punkty przed nami. Ten wątek dokończmy mailowo.”</em></p>' },
  { t:'i', h:'Gest', x:'<p>Uniesiona dłoń <em>otwartą stroną</em> do rozmówcy (nie palec!), lekkie pochylenie, wdech.</p><p>Większość ludzi oddaje głos, zanim skończysz pierwsze słowo.</p>' },
  { t:'q', q:'Jaki gest pomaga płynnie przejąć głos?', o:['Uniesiona otwarta dłoń i wdech','Wskazanie palcem','Skrzyżowanie rąk'], c:0, fb:'Otwarta dłoń prosi o miejsce. Palec — oskarża.' },
  { t:'q', q:'Wejście przez metakomunikat to…', o:['mówienie o samej rozmowie: czasie, celu, porządku','nagła zmiana tematu','podniesienie głosu'], c:0, fb:'O czas i cel spotkania trudno się kłócić — dlatego metakomunikat działa.' },
  { t:'ex', x:'Przećwicz wejście przez parafrazę w luźnej rozmowie: przerwij komuś życzliwie, zaczynając od streszczenia jego myśli. Zauważ, że nikt się nie obraża.' },
  { t:'r' }],
  cards:[
  { q:'Trzy sposoby na płynne przerwanie?', a:'Imię + pauza, parafraza myśli rozmówcy, metakomunikat o czasie i celu.' },
  { q:'Przykład metakomunikatu?', a:'„Zatrzymam nas na chwilę — mamy 10 minut, a dwa punkty przed nami.”' }],
  drills:[
  'W luźnej rozmowie przerwij raz parafrazą: „Czyli chodzi o… — złapałem. Przejdźmy do…”',
  'Na najbliższym spotkaniu użyj metakomunikatu o czasie: „Mamy 10 minut i dwa punkty”.',
  'Zanim przerwiesz, zrób wdech i unieś otwartą dłoń. Sprawdź, jak szybko dostaniesz głos.']
},
{ id:'l12', icon:'flame', hue:2, n:'Lekcja 12', t:'Rozładuj każdy konflikt',
  rule:'W konflikcie wygrywa ten, kto pierwszy przestanie walczyć o rację i zapyta o potrzebę.',
  steps:[
  { t:'i', h:'Laboratorium konfliktu', x:'<p>John Gottman obserwował setki par w laboratorium i opisał zachowania, które częściej występowały u par, które później się rozstały.</p><p>Uwaga na słynne „ponad 90% trafności”: te liczby pochodziły z modeli dopasowanych do tych samych par po fakcie. Sprawdzone na nowych danych, przewidywania rozstań okazały się dużo słabsze (Heyman i Smith Slep, 2001). Traktuj tę wiedzę jak <em>mapę zagrożeń</em>, nie wyrocznię.</p>', src:['gottman92','heyman'] },
  { t:'i', h:'Miękki start', x:'<p>W badaniach Gottmana sposób, w jaki zaczynała się kłótnia, wiązał się z tym, jak się kończyła (Carrère i Gottman, 1999). Ostry start („ty znowu…”) rzadko kończy się dobrze.</p><div class="quote"><p><span class="bad">„Czemu znowu mnie pominąłeś?”</span></p><p>„Zmartwiłem się, kiedy zobaczyłem tego maila.”</p></div>', src:['carrere'] },
  { t:'q', q:'Miękki start trudnej rozmowy zaczyna się od…', o:['komunikatu „ja” i konkretu','wyliczenia win rozmówcy','żartu na rozluźnienie'], c:0, fb:'„Ja + konkret + uczucie” nie atakuje — więc nie uruchamia obrony.' },
  { t:'i', h:'Jeźdźcy 1 i 2', x:'<p><em>Krytyka osoby</em> („jesteś egoistą”) — mów o zdarzeniu, nie o człowieku.</p><p><em>Pogarda</em> (sarkazm, przewracanie oczami, wyższość) — w obserwacjach Gottmana najmocniej związana z rozpadem relacji. Zero tolerancji u siebie.</p>' },
  { t:'i', h:'Jeźdźcy 3 i 4', x:'<p><em>Defensywność</em> („a bo ty…”) — zamiast tego weź odpowiedzialność za choćby 5%: „Masz rację, powiedziałem o tym za późno”. To rozbraja.</p><p><em>Mur milczenia</em> — powiedz wprost: „Potrzebuję 20 minut przerwy, wrócę i dokończymy”. I wróć.</p>' },
  { t:'q', q:'Które zachowanie Gottman uznał za najgroźniejsze?', o:['Krytykę','Pogardę (sarkazm, wyższość)','Milczenie'], c:1, fb:'Pogarda komunikuje: „jesteś pode mną”. Z tego poziomu nie da się już rozmawiać.' },
  { t:'i', h:'Interes pod stanowiskiem', x:'<p>Stanowiska („chcę X!”) bywają nie do pogodzenia. Interesy pod nimi — znacznie częściej da się połączyć. To klasyczne rozróżnienie z „Dochodząc do TAK” Fishera i Ury’ego.</p><p>Pytanie-klucz: <em>„Co jest dla ciebie w tym najważniejsze?”</em></p>', src:['fisher'] },
  { t:'q', q:'Jak traktować słynne „90% trafności” Gottmana?', o:['Ostrożnie — to dopasowanie po fakcie; na nowych danych trafność spada','Jako pewną prognozę','Jako mit bez żadnych podstaw'], c:0, fb:'Same obserwacje są cenne. Liczba „90%” — mocno na wyrost.' },
  { t:'ex', x:'Przypomnij sobie ostatnie spięcie. Zapisz swoje pierwsze zdanie — i przepisz je na miękki start („ja” + konkret + uczucie). Miej tę wersję gotową na następny raz.' },
  { t:'r' }],
  cards:[
  { q:'Miękki start rozmowy — wzór?', a:'„Ja” + konkret + uczucie: „Zmartwiłem się, kiedy zobaczyłem tego maila.”' },
  { q:'Stanowisko a interes?', a:'Stanowisko to „chcę X”, interes to „dlaczego tego chcę”. Interesy łatwiej połączyć (Fisher i Ury).' },
  { q:'Skąd się wzięło „90% trafności” Gottmana?', a:'Z modeli dopasowanych po fakcie do tych samych par. Na nowych danych wyniki były dużo słabsze.' }],
  drills:[
  'Zapisz pierwsze zdanie ostatniego spięcia i przepisz je na miękki start: „ja” + konkret + uczucie.',
  'W najbliższej różnicy zdań zapytaj: „Co jest dla ciebie w tym najważniejsze?”',
  'Weź odpowiedzialność za choćby 5% problemu w jednej rozmowie: „Masz rację, powiedziałem o tym za późno”.']
},
{ id:'l13', icon:'ear', hue:3, n:'Lekcja 13', t:'Słuchaj jak lider',
  rule:'Mów tak, żeby Cię słuchano — ale słuchaj tak, żeby ludzie chcieli wracać.',
  steps:[
  { t:'i', h:'Paradoks charyzmy', x:'<p>Słynna anegdota z XIX-wiecznej Anglii: po kolacji z Gladstone’em pewna dama uznała go za najmądrzejszego człowieka w kraju. Po kolacji z Disraelim — uznała za najmądrzejszą <em>siebie</em>.</p><p>Najbardziej charyzmatyczni to często ci, przy których <em>Ty</em> czujesz się błyskotliwy.</p>' },
  { t:'i', h:'Looping', x:'<ol><li>Słuchaj do końca — nie układaj odpowiedzi w głowie</li><li>Sparafrazuj sedno: „Czyli najbardziej martwi cię, że…”</li><li>Sprawdź: „Dobrze złapałem?” — i wysłuchaj poprawki</li></ol><p>Technikę spopularyzowała Amanda Ripley w „High Conflict”. Badania Guya Itzchakova i Avrahama Klugera pokazują, że uważne słuchanie <em>zmniejsza defensywność</em> rozmówcy.</p>', src:['ripley','itzchakov'] },
  { t:'q', q:'Looping to…', o:['seria szybkich pytań','kiwanie głową w trakcie słuchania','parafraza + sprawdzenie „dobrze złapałem?”'], c:2, fb:'Ludzie, którzy czują się dobrze wysłuchani, bronią się mniej — nawet gdy się z nimi nie zgadzasz.' },
  { t:'i', h:'Nie graj w ping-ponga', x:'<p>„Co było w tym najtrudniejsze?” zamiast „A u mnie…”.</p><p>Rozmowa to nie <em>ping-pong anegdot</em> — pytanie pogłębiające bije własną historię.</p>' },
  { t:'i', h:'Dwie sekundy ciszy', x:'<p>Wytrzymaj 2 sekundy po tym, jak ktoś skończy mówić.</p><p>Praktycy (terapeuci, dziennikarze) zauważają, że wtedy często pada najważniejsze zdanie — to, którego rozmówca <em>nie planował</em> powiedzieć.</p>' },
  { t:'q', q:'Co często dzieje się po 2 sekundach ciszy, gdy ktoś skończy mówić?', o:['Pada ważne, nieplanowane zdanie','Rozmowa naturalnie się kończy','Rozmówca czuje się urażony'], c:0, fb:'Cisza to zaproszenie. Kto ją wytrzyma, słyszy rzeczy, których inni nie usłyszą.' },
  { t:'i', h:'Wracaj do szczegółów', x:'<p>„Jak poszedł ten egzamin córki, o którym mówiłaś?”</p><p>Jedno takie pytanie <em>tydzień później</em> buduje więcej relacji niż godzina small talku.</p>' },
  { t:'q', q:'Co według badań robi uważne słuchanie z rozmówcą?', o:['Zmniejsza jego defensywność','Sprawia, że mówi krócej','Nic mierzalnego'], c:0, fb:'Tak wychodzi w badaniach Itzchakova i Klugera nad słuchaniem wysokiej jakości.' },
  { t:'ex', x:'W jednej rozmowie: zanim powiesz cokolwiek od siebie, najpierw sparafrazuj i zadaj jedno pytanie pogłębiające. Cała rozmowa, bez wyjątków.' },
  { t:'r' }],
  cards:[
  { q:'Rozmowa jak ping-pong anegdot — co zamiast?', a:'Pytanie pogłębiające: „Co było w tym najtrudniejsze?” zamiast „A u mnie…”.' },
  { q:'Co daje wracanie do szczegółów po tygodniu?', a:'Dowód, że słuchałeś. Buduje więcej relacji niż godzina small talku.' }],
  drills:[
  'W jednej rozmowie: zanim odpowiesz, sparafrazuj i zapytaj „dobrze złapałem?”.',
  'Zadaj dziś jedno pytanie o szczegół, o którym ktoś mówił tydzień temu.',
  'Wytrzymaj 2 sekundy ciszy po tym, jak ktoś skończy mówić. Trzy razy w ciągu dnia.']
},
{ id:'l14', icon:'cup', hue:4, n:'Bonus', t:'Mistrzostwo small talku',
  rule:'Nie musisz być interesujący. Wystarczy, że będziesz zainteresowany.',
  steps:[
  { t:'i', h:'Po co w ogóle small talk?', x:'<p>To nie „gadanie o pogodzie” — to <em>rytuał kalibracji</em>: dwoje ludzi sprawdza, czy rozmowa jest bezpieczna.</p><p>I jest przyjemniejszy, niż się spodziewamy: w badaniu Epleya i Schroeder (2014) pasażerowie poproszeni o rozmowę ze współpasażerem mieli <em>lepszą</em> podróż niż ci, którzy siedzieli w ciszy — choć przewidywali odwrotnie.</p>', src:['epley'] },
  { t:'i', h:'Metoda ARE', x:'<ol><li><em>Anchor</em> — zaczep o wspólny kontekst: „Ta kolejka chyba nigdy się nie skończy”</li><li><em>Reveal</em> — ujawnij coś o sobie: „Przyjechałem głównie dla wykładu o negocjacjach”</li><li><em>Encourage</em> — otwarte pytanie: „A co ciebie tu ściągnęło?”</li></ol><p>Metodę opisała Carol Fleming.</p>', src:['fleming'] },
  { t:'q', q:'Prawidłowa kolejność w metodzie ARE:', o:['zachęta → kotwica → ujawnienie','kotwica → ujawnienie → zachęta','ujawnienie → zachęta → kotwica'], c:1, fb:'Ujawnienie czegoś o sobie zaprasza do wzajemności — dopiero po nim pytanie nie brzmi jak przesłuchanie.' },
  { t:'i', h:'Drabina pytań', x:'<p>Fakty → doświadczenia → opinie → wartości. Nie skacz od razu na górę:</p><div class="quote"><p>„Czym się zajmujesz?” <em>(fakt)</em> → „Co cię do tego przyciągnęło?” <em>(doświadczenie)</em> → „Co w tym jest najlepsze, a czego ludzie nie widzą?” <em>(opinia)</em></p></div><p>…i nagle rozmawiacie naprawdę.</p>' },
  { t:'q', q:'Drabina pytań prowadzi od…', o:['faktów, przez doświadczenia i opinie, do wartości','wartości do faktów','opinii do faktów'], c:0, fb:'Każdy szczebel pogłębia zaufanie. Pytanie o wartości na starcie brzmi jak przesłuchanie.' },
  { t:'i', h:'Wyjście z klasą', x:'<p>Docenienie + powód + przyszłość:</p><p><em>„Świetnie się rozmawiało — muszę złapać organizatora, zanim zniknie. Znajdę cię na LinkedIn?”</em></p><p>Bez udawania telefonu, bez rozpływania się w tłumie.</p>' },
  { t:'q', q:'Co pokazało badanie Epleya i Schroeder o rozmowach w podróży?', o:['Rozmowa z nieznajomym była przyjemniejsza, niż ludzie przewidywali','Ludzie woleli ciszę','Rozmowa męczyła'], c:0, fb:'Przeceniamy niezręczność i nie doceniamy przyjemności. Warto zaczepić.' },
  { t:'ex', x:'Zainicjuj dziś jedną krótką rozmowę metodą ARE (kolejka, winda, kuchnia w pracy). Cel minimum: kotwica + ujawnienie + jedno otwarte pytanie.' },
  { t:'r' }],
  cards:[
  { q:'Drabina pytań — cztery szczeble?', a:'Fakty → doświadczenia → opinie → wartości.' },
  { q:'Jak wyjść z rozmowy z klasą?', a:'Docenienie + powód + przyszłość: „Świetnie się rozmawiało — muszę złapać organizatora. Znajdę cię na LinkedIn?”' }],
  drills:[
  'Zainicjuj jedną krótką rozmowę metodą ARE: kotwica, ujawnienie, otwarte pytanie.',
  'Wejdź w jednej rozmowie o szczebel wyżej na drabinie pytań: od faktu do doświadczenia.',
  'Zakończ jedną rozmowę formułą: docenienie + powód + przyszłość.']
}
],

extraCards: [
{ l:'Technika', q:'Jak zbudować wypowiedź, która ma kształt? (4 kroki)', a:'PREP: Point (teza) → Reason (powód) → Example (konkret) → Point (teza jeszcze raz).' },
{ l:'Technika', q:'Szkielet każdej dobrej historii?', a:'Sytuacja → Komplikacja → Zwrot → Puenta. Silnikiem jest komplikacja — bez problemu nie ma opowieści.' },
{ l:'Technika', q:'Jak dać trudny feedback bez ranienia?', a:'SBI: Sytuacja (konkretna) → Zachowanie (to, co widziała kamera) → Wpływ (skutek) + pytanie o rozwiązanie.' },
{ l:'Technika', q:'Jak zacząć small talk z nieznajomym?', a:'ARE: Anchor (skomentuj wspólny kontekst) → Reveal (ujawnij coś o sobie) → Encourage (otwarte pytanie).' },
{ l:'Technika', q:'Jak uspokoić wzburzonego rozmówcę jednym zdaniem?', a:'Etykietowanie: nazwij jego emocję. „Widzę, że to cię naprawdę zdenerwowało.” Nazywanie emocji wiąże się z niższym pobudzeniem (Lieberman i in., 2007).' },
{ l:'Technika', q:'Jak słuchać, żeby budować zaufanie? (3 kroki)', a:'Looping: wysłuchaj do końca → sparafrazuj sedno → sprawdź „dobrze złapałem?”. Dopiero potem mów swoje.' },
{ l:'Technika', q:'Czterej jeźdźcy Gottmana — czego nie robić w konflikcie?', a:'Krytyka osoby, pogarda, defensywność, mur milczenia. Pogarda jest najgroźniejsza.' },
{ l:'Technika', q:'Oddech, który wycisza stres w trakcie rozmowy?', a:'Wydech dłuższy niż wdech: 4 sekundy wdechu, 6 wydechu.' }
],

/* Scenariusze sparingu z AI — persona i kryteria oceny żyją po stronie serwera (worker). */
scenarios: [
{ id:'klient',      lesson:'l9',  t:'Wzburzony klient', d:'Paczka nie dotarła po raz trzeci. Klient dzwoni zdenerwowany. Obniż temperaturę i ustal konkret.' },
{ id:'szef',        lesson:'l11', t:'Szef, który się rozgadał', d:'Spotkanie ma 15 minut, szef od 8 minut opowiada o konferencji. Przerwij płynnie i wróć do agendy.' },
{ id:'feedback',    lesson:'l8',  t:'Spóźnione raporty', d:'Kolega z zespołu trzeci raz oddaje raport po terminie. Daj mu feedback modelem SBI.' },
{ id:'odmowa',      lesson:'l10', t:'Przeprowadzka w sobotę', d:'Znajomy prosi o pomoc przy przeprowadzce w sobotę. Nie możesz i nie chcesz. Odmów ciepło.' },
{ id:'konferencja', lesson:'l14', t:'Kawa na konferencji', d:'Stoisz przy kawie obok nieznajomej osoby. Zacznij rozmowę metodą ARE i przejdź wyżej na drabinie pytań.' },
{ id:'konflikt',    lesson:'l12', t:'Kto zmywa?', d:'Współlokator znowu zostawił stos naczyń. Zacznij miękko i dojdź do interesów, nie stanowisk.' },
{ id:'rekrutacja',  lesson:'l1',  t:'Pierwsze 2 minuty rekrutacji', d:'Wchodzisz na rozmowę o pracę. Zbuduj ciepło, zanim pokażesz kompetencje.' },
{ id:'zebranie',    lesson:'l4',  t:'Wszyscy mówią naraz', d:'Na zebraniu trwa chaos, a Ty masz pomysł. Wejdź do rozmowy i powiedz go w strukturze PREP.' }
]
};
