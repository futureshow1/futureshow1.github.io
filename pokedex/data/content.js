// POKÉDEX — treści autorskie (PL/EN): historia, generacje, anime, filmy, gry, rzadkość kart
window.CONTENT = {

// ---------- GENERACJE ----------
generations: [
 {gen:1, region:"Kanto", years:"1996–1999", count:151, games:"Red / Green / Blue / Yellow (Game Boy)",
  pl:"Początek wszystkiego. 151 Pokémonów, które wywołały światową Pokémanię. Rywalizacja Red kontra Blue, profesor Oak i wybór pierwszego startera: Bulbasaur, Charmander czy Squirtle.",
  en:"Where it all began. The 151 Pokémon that sparked worldwide Pokémania. Red versus Blue, Professor Oak, and the very first starter choice: Bulbasaur, Charmander or Squirtle."},
 {gen:2, region:"Johto", years:"1999–2002", count:100, games:"Gold / Silver / Crystal (Game Boy Color)",
  pl:"Dzień i noc, rasy Pokémonów rozmnażane z jaj, dwa nowe typy (Stalowy i Mroczny), legendy Lugia i Ho-Oh. Po pokonaniu ligi Johto można wrócić do całego Kanto — do dziś uznawane za jedne z najlepszych gier serii.",
  en:"Day and night cycles, breeding and eggs, two new types (Steel and Dark), the legends Lugia and Ho-Oh. After beating Johto you could revisit all of Kanto — still considered some of the best games in the series."},
 {gen:3, region:"Hoenn", years:"2002–2006", count:135, games:"Ruby / Sapphire / Emerald (GBA)",
  pl:"Tropikalny region, sekretne bazy, konkursy piękności Pokémonów i mit o walce morza (Kyogre) z lądem (Groudon), którą przerywa Rayquaza. Nowy silnik gry — zerwanie kompatybilności ze starszymi generacjami.",
  en:"A tropical region, secret bases, Pokémon Contests, and the myth of sea (Kyogre) versus land (Groudon) settled by Rayquaza. A brand-new engine that broke compatibility with older generations."},
 {gen:4, region:"Sinnoh", years:"2006–2010", count:107, games:"Diamond / Pearl / Platinum (Nintendo DS)",
  pl:"Mitologia stworzenia świata: Arceus, Dialga (czas), Palkia (przestrzeń) i Giratina. Pierwsza wymiana Pokémonów przez internet — Global Trade Station.",
  en:"A creation mythology: Arceus, Dialga (time), Palkia (space) and Giratina. The first online trading via the Global Trade Station."},
 {gen:5, region:"Unova", years:"2010–2013", count:156, games:"Black / White / B2W2 (DS)",
  pl:"Region wzorowany na Nowym Jorku i najodważniejsza fabuła w serii: Zespół Plasma pyta, czy trzymanie Pokémonów w Poké Ballach jest w porządku. Rekordowe 156 zupełnie nowych Pokémonów.",
  en:"A region modelled on New York and the boldest story in the series: Team Plasma asks whether keeping Pokémon in Poké Balls is right at all. A record 156 brand-new Pokémon."},
 {gen:6, region:"Kalos", years:"2013–2016", count:72, games:"X / Y, OR/AS (3DS)",
  pl:"Pełne 3D, typ Wróżka i Mega Ewolucje — chwilowe przemiany w potężniejsze formy. Region inspirowany Francją, z wieżą à la Eiffla w Lumiose City.",
  en:"Full 3D, the Fairy type and Mega Evolutions — temporary transformations into far stronger forms. A region inspired by France, Eiffel-style tower included."},
 {gen:7, region:"Alola", years:"2016–2019", count:88, games:"Sun / Moon, US/UM (3DS)",
  pl:"Hawajski archipelag, w którym zamiast sal gimnastycznych są próby wyspiarskie. Regionalne formy starych Pokémonów (np. lodowy Vulpix) i Ultra Bestie z innego wymiaru.",
  en:"A Hawaiian archipelago that swaps gyms for island trials. Regional forms of old Pokémon (like Ice-type Vulpix) and the extradimensional Ultra Beasts."},
 {gen:8, region:"Galar", years:"2019–2022", count:96, games:"Sword / Shield (Switch), Legends: Arceus",
  pl:"Brytyjski region, w którym walki Pokémonów to sport narodowy na stadionach — z gigantycznymi formami Dynamax. Legends: Arceus (2022) po raz pierwszy pokazało otwarty, pradawny świat łapania Pokémonów.",
  en:"A British-flavoured region where Pokémon battles are stadium sport, complete with giant Dynamax forms. Legends: Arceus (2022) then reinvented catching in an open, ancient world."},
 {gen:9, region:"Paldea", years:"2022–", count:120, games:"Scarlet / Violet (Switch), Legends: Z-A (2025)",
  pl:"Iberyjski region z w pełni otwartym światem i trzema równoległymi historiami. Zjawisko Terastal zmienia typ Pokémona w kryształowej formie. Najnowsza generacja — to jej Pokémony trafiają dziś na karty.",
  en:"An Iberian open-world region with three parallel storylines. The Terastal phenomenon crystallises a Pokémon and can change its type. The newest generation — these are the Pokémon on today's cards."}
],

// ---------- HISTORIA ----------
history: [
 {year:"lata 80.", pl:"Chłopiec Satoshi Tajiri łapie owady i kijanki na przedmieściach Tokio. Gdy pola zamieniają się w bloki, postanawia ocalić tę radość w formie gry.", en:"Young Satoshi Tajiri collects bugs and tadpoles in suburban Tokyo. As the fields turn into apartment blocks, he decides to preserve that joy as a game."},
 {year:"1989", pl:"Tajiri zakłada studio Game Freak (wcześniej fanzin o grach pisany z Kenem Sugimorim — późniejszym rysownikiem wszystkich Pokémonów).", en:"Tajiri founds Game Freak (previously a fanzine he wrote with Ken Sugimori — the future illustrator of every Pokémon)."},
 {year:"1990–95", pl:"Sześć lat pracy nad „Capsule Monsters”. Pomysł-klucz: kabel link Game Boya służy nie do walki, lecz do WYMIANY stworków między graczami. Projekt ratuje m.in. Shigeru Miyamoto (twórca Mario).", en:"Six years of work on 'Capsule Monsters'. The key idea: the Game Boy link cable is for TRADING creatures, not just battling. Shigeru Miyamoto (of Mario fame) helps keep the project alive."},
 {year:"27 II 1996", pl:"Pocket Monsters Red i Green wychodzą w Japonii na Game Boya. Plotka o ukrytym Mew (dodanym potajemnie przez programistę Shigekiego Morimoto) napędza szkolną legendę i sprzedaż.", en:"Pocket Monsters Red and Green launch in Japan on Game Boy. The rumour of hidden Mew (secretly added by programmer Shigeki Morimoto) fuels playground legend and sales."},
 {year:"X 1996", pl:"W Japonii debiutuje karcianka Pokémon Trading Card Game — jeszcze przed anime. Ilustracje m.in. Mitsuhiro Arity (słynny Charizard).", en:"The Pokémon Trading Card Game debuts in Japan — before the anime. Illustrations include Mitsuhiro Arita's famous Charizard."},
 {year:"1997", pl:"Start anime z Ashem Ketchumem i Pikachu. Pikachu — z drugoplanowego stworka — staje się twarzą całej marki.", en:"The anime begins with Ash Ketchum and Pikachu. Pikachu leaps from side-creature to the face of the whole brand."},
 {year:"1998", pl:"Pokémon Red i Blue podbijają Amerykę. Powstaje The Pokémon Company. Zaczyna się światowa Pokémania.", en:"Pokémon Red and Blue conquer America. The Pokémon Company is founded. Worldwide Pokémania begins."},
 {year:"1999", pl:"Wizards of the Coast wydaje karciankę po angielsku — Base Set ze 102 kartami (cała galeria niżej). Karta Charizarda z 1. edycji stanie się po latach warta setki tysięcy dolarów.", en:"Wizards of the Coast publishes the TCG in English — the 102-card Base Set (full gallery below). Its 1st Edition Charizard will one day sell for hundreds of thousands of dollars."},
 {year:"~2000", pl:"Pokémania dociera do Polski: anime na Polsacie, karty, a w paczkach chipsów — słynne pokemonowe tazosy, wymieniane i „zbijane” na każdym podwórku.", en:"Pokémania reaches Poland: the anime on TV, cards, and the famous Pokémon 'tazos' (pogs) in crisp packets, traded and flipped in every schoolyard."},
 {year:"2006–2013", pl:"Ery Diamond/Pearl i Black/White. Karcianka i gry rosną spokojnie; w 2009 Arceus zamyka mitologię stworzenia.", en:"The Diamond/Pearl and Black/White eras. Games and cards grow steadily; in 2009 Arceus completes the creation mythology."},
 {year:"VII 2016", pl:"Pokémon GO. Miliony ludzi wychodzą na ulice łapać Pokémony w rozszerzonej rzeczywistości — największe letnie szaleństwo dekady i powrót marki do masowej wyobraźni.", en:"Pokémon GO. Millions take to the streets to catch Pokémon in augmented reality — the craze of the decade and the brand's return to mass imagination."},
 {year:"2019–2021", pl:"Film aktorski Detektyw Pikachu; Sword/Shield na Switchu. W pandemii boom kolekcjonerski: stare karty biją rekordy cen (Pikachu Illustrator — 5,3 mln dolarów).", en:"The live-action Detective Pikachu; Sword/Shield on Switch. A pandemic collecting boom sends vintage cards to record prices (Pikachu Illustrator — $5.3M)."},
 {year:"2022–2023", pl:"Scarlet/Violet otwierają Gen 9. Ash po 25 latach zostaje wreszcie mistrzem świata i odchodzi z anime; zastępują go Liko i Roy w serii Horizons.", en:"Scarlet/Violet open Gen 9. After 25 years Ash finally becomes World Champion and bows out; Liko and Roy take over in Horizons."},
 {year:"2024–2026", pl:"Karcianka przeżywa drugi złoty wiek (set Prismatic Evolutions wyprzedawany na pniu, aplikacja TCG Pocket). Od 2025 era kart Mega Evolution — najnowszy set to Pitch Black (VII 2026). Pokémon pozostaje najbardziej dochodową marką rozrywkową świata.", en:"The TCG enjoys a second golden age (Prismatic Evolutions selling out instantly, the TCG Pocket app). Since 2025, the Mega Evolution card era — newest set: Pitch Black (July 2026). Pokémon remains the world's highest-grossing entertainment franchise."}
],

// ---------- SERIE ANIME ----------
anime: [
 {title:"Pokémon: Indigo League + Orange Islands + Johto", titlePl:"Liga Indigo", years:"1997–2002", seasons:"sezony 1–5", region:"Kanto / Johto",
  pl:"Oryginalna seria: 10-letni Ash Ketchum wyrusza z niepokornym Pikachu, poznaje Misty i Brocka, a Zespół R (Jessie, James i gadający Meowth) nieudolnie poluje na Pikachu w każdym odcinku. To ją pamięta pokolenie Polsatu.", en:"The original series: 10-year-old Ash sets out with a stubborn Pikachu, meets Misty and Brock, while Team Rocket bungles a Pikachu heist every single episode. The series a whole generation grew up on."},
 {title:"Pokémon: Advanced Generation", years:"2002–2006", seasons:"sezony 6–9", region:"Hoenn",
  pl:"Ash w Hoenn z nową towarzyszką May, która zamiast walk wybiera konkursy piękności Pokémonów — nowy wątek serii.", en:"Ash in Hoenn with newcomer May, who picks Pokémon Contests over battles — a fresh thread for the show."},
 {title:"Pokémon: Diamond & Pearl", titlePl:"Diament i perła / Diament i perła: Wymiar walki / Diament i perła: Galaktyczne bitwy / Diament i perła: Gwiazdy Ligi Sinnoh", years:"2006–2010", seasons:"sezony 10–13", region:"Sinnoh",
  pl:"Podróż przez Sinnoh z Dawn. Rywal Paul — najzimniejszy przeciwnik Asha — i wątek legend czasu i przestrzeni.", en:"Sinnoh with Dawn. Rival Paul — Ash's coldest opponent — and the legends of time and space."},
 {title:"Pokémon: Black & White", titlePl:"Czerń i biel / Czerń i biel: Ścieżki przeznaczenia / Czerń i biel: Przygody w Unovie", years:"2010–2013", seasons:"sezony 14–16", region:"Unova",
  pl:"Ash w Unovie z Iris i Cilanem. Seria „miękkiego restartu” — Ash znów uczy się wszystkiego od nowa.", en:"Ash in Unova with Iris and Cilan. A soft-reboot season — Ash learns everything anew."},
 {title:"Pokémon the Series: XY", titlePl:"Seria XY / Seria XY: Przygody w Kalos / Seria XYZ", years:"2013–2016", seasons:"sezony 17–19", region:"Kalos",
  pl:"Uznawana przez fanów za najlepiej animowaną i najpoważniejszą serię: Ash-Greninja, Serena i finał ligi, w którym Ash o włos przegrywa.", en:"Widely called the best-animated, most serious series: Ash-Greninja, Serena, and a league final Ash loses by a hair."},
 {title:"Pokémon the Series: Sun & Moon", titlePl:"Słońce i księżyc / Słońce i księżyc: Ultra przygody / Słońce i księżyc: Ultra legendy", years:"2016–2019", seasons:"sezony 20–22", region:"Alola",
  pl:"Ash idzie do szkoły na Alola. Luźniejsza kreska i humor — i pierwsze w historii zwycięstwo Asha w lidze!", en:"Ash goes to school in Alola. A looser art style, more comedy — and Ash's first-ever league win!"},
 {title:"Pokémon Journeys", titlePl:"Podróże / Podróże mistrzów / Najwspanialsze podróże", years:"2019–2023", seasons:"sezony 23–25", region:"wszystkie regiony",
  pl:"Ash i Goh podróżują po całym świecie Pokémonów. Finał ćwierćwiecza: Ash pokonuje Leona i zostaje Mistrzem Świata, po czym żegna się z serialem.", en:"Ash and Goh travel the entire Pokémon world. The finale of an era: Ash beats Leon, becomes World Champion, and says goodbye."},
 {title:"Pokémon Horizons", titlePl:"Horyzonty / Horyzonty: Sezon 2 – W poszukowaniu Laquy / Horyzonty: Sezon 3 – Wschodząca nadzieja", years:"2023–", seasons:"trwa", region:"Paldea i inne",
  pl:"Pierwsza seria bez Asha: Liko z tajemniczym wisiorkiem, Roy i drużyna sterowca Brave Asagi. To ją oglądają dzisiejsze dzieci — z Pokémonami Gen 9 z aktualnych kart.", en:"The first series without Ash: Liko and her mysterious pendant, Roy, and the airship crew of the Brave Asagi. This is what kids watch today — starring the Gen 9 Pokémon from current cards."}
],

// ---------- SERIE POZA GŁÓWNYM ANIME ----------
sideSeries: [
 {title:"Pokémon Origins", year:"2013", pl:"4-odcinkowa wierna adaptacja gier Red/Green — z Redem zamiast Asha. Dla fanów „tak powinno wyglądać anime”.", en:"A 4-episode faithful adaptation of Red/Green — Red instead of Ash. For many fans, 'the anime done right'."},
 {title:"Pokémon Generations", year:"2016", pl:"18 krótkich odcinków na YouTube pokazujących kultowe sceny z gier wszystkich generacji.", en:"18 YouTube shorts recreating iconic moments from the games across all generations."},
 {title:"Pokémon: Twilight Wings", year:"2020", pl:"Poetycki miniserial z regionu Galar — 8 odcinków o zwykłych mieszkańcach, nie o trenerach-mistrzach.", en:"A poetic Galar miniseries — 8 episodes about ordinary people rather than champion trainers."},
 {title:"Pokémon Evolutions", year:"2021", pl:"8 odcinków na 25-lecie marki — po jednym na każdy region, od Galar wstecz do Kanto.", en:"8 episodes for the 25th anniversary — one per region, from Galar back to Kanto."},
 {title:"Pokémon: Hisuian Snow", year:"2022", pl:"3 melancholijne odcinki towarzyszące grze Legends: Arceus — czasy, gdy ludzie bali się Pokémonów.", en:"3 melancholy episodes tied to Legends: Arceus — an age when people still feared Pokémon."},
 {title:"Pokémon: Paldean Winds", year:"2023", pl:"Miniserial o uczniach akademii z Paldei, równoległy do gier Scarlet/Violet.", en:"A miniseries about Paldea's academy students, parallel to Scarlet/Violet."},
 {title:"Pokémon Concierge", titlePl:"Konsjerżka Pokémonów", year:"2023 / 2025", region:"Netflix",
  pl:"Poklatkowy (stop-motion!) serial Netflixa o resorcie wakacyjnym dla Pokémonów. Zachwycił świat — filcowe Pokémony i ciepła, dorosła opowieść o odpoczynku.", en:"Netflix's stop-motion series about a holiday resort for Pokémon. Felt-craft Pokémon and a warm, grown-up story about rest — an instant charmer."},
 {title:"Pokémon Chronicles", year:"2002–2004", pl:"Odcinki poboczne o bohaterach drugiego planu: Misty w Cerulean, Zespół R, brat Asha… bez samego Asha.", en:"Side stories about the supporting cast: Misty back in Cerulean, Team Rocket and more — no Ash required."}
],

// ---------- FILMY KINOWE ----------
movies: [
 {n:1, year:1998, title:"Mewtwo Strikes Back", titlePl:"Pokémon: Film pierwszy – Zemsta Mewtwo", pl:"Klon Mew pyta, czy kopia może być kimś więcej. Największy hit kinowy serii — i najsłynniejsza scena: Ash skamieniały między Mew a Mewtwo.", en:"Mew's clone asks whether a copy can be more. The series' biggest theatrical hit — with the famous petrified-Ash scene."},
 {n:2, year:1999, title:"The Power of One", titlePl:"Pokémon 2: Uwierz w swoją siłę", pl:"Lugia i trzy legendarne ptaki. „Świat ocali wybrany trener” — oczywiście Ash.", en:"Lugia and the three legendary birds. 'The chosen trainer shall save the world' — Ash, naturally."},
 {n:3, year:2000, title:"Spell of the Unown", titlePl:"Pokémon 3: Zaklęcie Unown", pl:"Entei zrodzony z tęsknoty dziewczynki. Najbardziej „psychologiczny” z wczesnych filmów.", en:"An Entei born of a lonely girl's longing. The most psychological of the early films."},
 {n:4, year:2001, title:"Celebi: Voice of the Forest", titlePl:"Pokémon 4: Głos lasu", pl:"Podróż w czasie z Celebi — Ash spotyka chłopca, który okaże się… profesorem Oakiem.", en:"Time travel with Celebi — Ash befriends a boy who turns out to be young Professor Oak."},
 {n:5, year:2002, title:"Pokémon Heroes: Latios and Latias", titlePl:"Pokémon 5: Bohaterowie", pl:"Wenecka Alto Mare i para legendarnych smoków-opiekunów miasta.", en:"Venice-like Alto Mare and its guardian dragon duo, Latios and Latias."},
 {n:6, year:2003, title:"Jirachi Wish Maker", titlePl:"Pokémon: Jirachi – Spełnione marzenia", pl:"Jirachi budzi się raz na tysiąc lat, by spełniać życzenia.", en:"Jirachi wakes once a millennium to grant wishes."},
 {n:7, year:2004, title:"Destiny Deoxys", titlePl:"Pokémon: Cel Deoxys", pl:"Kosmiczny Deoxys kontra Rayquaza nad futurystycznym miastem.", en:"Space virus Deoxys versus Rayquaza over a futuristic city."},
 {n:8, year:2005, title:"Lucario and the Mystery of Mew", titlePl:"Pokémon: Lucario i tajemnica Mew", pl:"Rycerska legenda o Lucario i zdradzie sprzed wieków. Fanowski faworyt.", en:"A chivalric tale of Lucario and an ancient betrayal. A fan favourite."},
 {n:9, year:2006, title:"Pokémon Ranger and the Temple of the Sea", titlePl:"Pokémon Ranger i Świątynia Morza", pl:"Manaphy, świątynia na dnie morza i pożegnanie, przy którym płakały pokolenia.", en:"Manaphy, an undersea temple, and a farewell that made generations cry."},
 {n:10, year:2007, title:"The Rise of Darkrai", titlePl:"Pokémon 10: Wzejście Darkraia", pl:"Darkrai broni miasta przed starciem Dialgi i Palkii. Początek trylogii Sinnoh.", en:"Darkrai defends a town caught between Dialga and Palkia. The Sinnoh trilogy begins."},
 {n:11, year:2008, title:"Giratina and the Sky Warrior", titlePl:"Pokémon: Giratina i Strażnik Nieba", pl:"Świat Odwrócony Giratiny i malutki Shaymin.", en:"Giratina's Reverse World and tiny Shaymin."},
 {n:12, year:2009, title:"Arceus and the Jewel of Life", titlePl:"Pokémon: Arceus i Klejnot Życia", pl:"Stwórca Pokémonów wraca upomnieć się o dawny dług ludzkości.", en:"The creator of Pokémon returns to collect an ancient debt."},
 {n:13, year:2010, title:"Zoroark: Master of Illusions", titlePl:"Pokémon: Zoroark, mistrz iluzji", pl:"Mistrz iluzji i wielka mistyfikacja w mieście koron.", en:"The master of illusions and a grand deception."},
 {n:14, year:2011, title:"Black: Victini & Reshiram / White: Victini & Zekrom", titlePl:"Pokémon: Czerń – Victini i Reshiram / Pokémon: Biel – Victini i Zekrom", pl:"Jedyny film wydany w dwóch lustrzanych wersjach — jak same gry.", en:"The only film released in two mirrored versions — just like the games."},
 {n:15, year:2012, title:"Kyurem vs. the Sword of Justice", titlePl:"Pokémon: Kyurem kontra Miecz Sprawiedliwości", pl:"Keldeo staje do próby odwagi przeciw lodowemu Kyuremowi.", en:"Keldeo faces a trial of courage against icy Kyurem."},
 {n:16, year:2013, title:"Genesect and the Legend Awakened", titlePl:"Pokémon: Genesect i objawiona legenda", pl:"Mewtwo (nowe!) kontra prehistoryczne Genesecty w wielkim mieście.", en:"A new Mewtwo versus the prehistoric Genesect swarm."},
 {n:17, year:2014, title:"Diancie and the Cocoon of Destruction", titlePl:"Pokémon: Diancie i Kokon Zniszczenia", pl:"Księżniczka-diament szuka mocy, by ocalić swoje królestwo.", en:"A diamond princess seeks the power to save her realm."},
 {n:18, year:2015, title:"Hoopa and the Clash of Ages", titlePl:"Pokémon: Hoopa i starcie wszech czasów", pl:"Dżin Hoopa przyzywa przez pierścienie legendy wszystkich er do jednej bitwy.", en:"Hoopa's rings summon legends of every era into one battle."},
 {n:19, year:2016, title:"Volcanion and the Mechanical Marvel", titlePl:"Pokémon: Volcanion i mechaniczny zachwyt", pl:"Parowy Volcanion i mechaniczna Magearna.", en:"Steam-powered Volcanion and the clockwork Magearna."},
 {n:20, year:2017, title:"I Choose You!", titlePl:"Pokémon: Wybieram cię!", pl:"Alternatywne opowiedzenie początku przygody Asha i Pikachu — na 20-lecie anime.", en:"A retelling of Ash and Pikachu's first days — for the anime's 20th anniversary."},
 {n:21, year:2018, title:"The Power of Us", titlePl:"Pokémon: Siła jest w nas", pl:"Zwykli mieszkańcy miasteczka i festiwal wiatru — film o wspólnocie.", en:"Ordinary townsfolk and a wind festival — a film about community."},
 {n:22, year:2019, title:"Mewtwo Strikes Back — Evolution", titlePl:"Pokémon: Zemsta Mewtwo – Ewolucja", pl:"Remake pierwszego filmu w pełnym 3D.", en:"A full-CG remake of the first movie."},
 {n:23, year:2020, title:"Secrets of the Jungle", titlePl:"Pokémon: Sekrety dżungli", pl:"Chłopiec wychowany przez Pokémony — pokémonowy Księga dżungli. Ostatni jak dotąd film anime.", en:"A boy raised by Pokémon — a Pokémon Jungle Book. The last anime film to date."},
 {n:"★", year:2019, title:"Detective Pikachu", titlePl:"Pokémon Detektyw Pikachu", pl:"Ryan Reynolds jako mówiący Pikachu w filmie aktorskim — pierwszy hollywoodzki hit na podstawie gry wideo. Sequel w produkcji.", en:"Ryan Reynolds voices a talking Pikachu in live action — the first true Hollywood video-game hit. A sequel is in the works."}
],

// ---------- GRY I ZABAWY W RZECZYWISTOŚCI ----------
realGames: [
 {icon:"🃏", title:{pl:"Karcianka Pokémon TCG — jak się gra", en:"Pokémon TCG — how to play"},
  pl:"To pełnoprawna gra strategiczna, nie tylko kolekcja. Każdy gracz ma talię dokładnie 60 kart: Pokémony, karty Energii (paliwo ataków) i karty Trenera (jednorazowe zagrania). Na starcie losujesz 7 kart i odkładasz 6 kart Nagrody. Wystawiasz jednego Pokémona Aktywnego i do 5 na Ławce. W turze możesz dołożyć 1 Energię, zagrać Trenerów, ewoluować Pokémony i zaatakować — koszt ataku opłacasz doczepionymi Energiami. Gdy pokonasz Pokémona przeciwnika, bierzesz kartę Nagrody. Wygrywa ten, kto pierwszy zbierze wszystkie 6 Nagród (albo gdy rywal nie ma już Pokémonów). Ważne pojęcia: Słabość (podwójne obrażenia), Odporność, koszt Odwrotu, Zdolności. Format Standard = tylko najnowsze sety (obecnie era Scarlet/Violet i Mega Evolution) — dlatego dzieci grają kartami z ostatnich 2 lat, a stare karty służą do kolekcjonowania.",
  en:"A full strategy game, not just a collection. Each player runs a deck of exactly 60 cards: Pokémon, Energy (fuel for attacks) and Trainer cards (one-shot effects). You draw 7, set aside 6 Prize cards, put one Active Pokémon up front and up to 5 on the Bench. Each turn: attach 1 Energy, play Trainers, evolve, then attack — paying the attack's Energy cost. Knock out an opposing Pokémon and you take a Prize. First to claim all 6 Prizes wins (or when the opponent has no Pokémon left). Key ideas: Weakness (double damage), Resistance, Retreat cost, Abilities. The Standard format allows only recent sets (currently the Scarlet/Violet and Mega Evolution eras) — that's why kids play with cards from the last two years while vintage cards are for collecting."
,
  kid:{
   title:{pl:"Jak wyjaśnić to dziecku", en:"How to explain it to a child"},
   intro:{pl:"Najprościej przez mecz: to nie jest zbieranie obrazków, tylko rozgrywka dwóch drużyn. Pięć zdań, które wystarczą, żeby usiąść i zagrać:",
          en:"The shortcut is a football match: this isn't collecting pictures, it's two teams playing. Five sentences are enough to sit down and start:"},
   steps:[
    {pl:["Talia to twoja drużyna","Masz 60 kart, ale grasz tylko tymi, które wyjdą ci na rękę. Jeden Pokémon stoi na boisku (Aktywny), reszta czeka na ławce rezerwowych — dokładnie jak w piłce."],
     en:["Your deck is your team","You have 60 cards but you only play the ones you draw. One Pokémon stands on the pitch (the Active one), the rest wait on the bench — exactly like football."]},
    {pl:["Energia to jedzenie","Pokémon nie zaatakuje, dopóki nie dostanie energii — kładziesz mu ją na kartę, po jednej na turę. Silniejszy atak wymaga większej porcji, więc czasem trzeba poczekać dwie–trzy tury."],
     en:["Energy is food","A Pokémon can't attack until it's fed — you place Energy on its card, one per turn. Stronger attacks need bigger portions, so sometimes you wait two or three turns."]},
    {pl:["Ewolucja to dorastanie","Kartę Charmandera przykrywasz kartą Charmeleona, a potem Charizarda — ten sam Pokémon, tylko starszy i mocniejszy. Wszystko, co miał (energie, obrażenia), zostaje."],
     en:["Evolving is growing up","You cover your Charmander card with Charmeleon, then Charizard — the same Pokémon, just older and stronger. Everything it had (Energy, damage) stays with it."]},
    {pl:["Atak to odejmowanie","Atak ma liczbę — tyle obrażeń dostaje przeciwnik. Gdy uzbiera ich tyle, ile ma HP, jego Pokémon pada. Świetna okazja do liczenia na głos: „ma 120 HP, dostał 70, ile mu zostało?”."],
     en:["Attacking is subtraction","Each attack has a number — that's the damage it deals. When the damage adds up to the Pokémon's HP, it faints. A perfect excuse to count out loud: “it has 120 HP, it took 70, how much is left?”"]},
    {pl:["Wygrywa ten, kto zbierze 6 nagród","Za każdego pokonanego Pokémona bierzesz jedną ze swoich sześciu odłożonych kart Nagrody. Sześć nagród i koniec gry — to cała meta wyścigu."],
     en:["First to six Prizes wins","Every Pokémon you knock out lets you take one of your six face-down Prize cards. Six of them and the game is over — that's the whole finish line."]}
   ],
   tips:{pl:["Pierwsza gra bez wyjątków","Odpuśćcie na start Słabość, Odporność i koszt Odwrotu — dołóżcie je w drugiej albo trzeciej partii. Reguły na karcie zawsze mają pierwszeństwo przed ogólnymi: jeśli karta mówi co innego, wygrywa karta.","Gotowy zestaw na początek","Najłatwiej zacząć od talii startowej (np. Battle Academy albo dowolnej gotowej talii z pudełka) — są ułożone tak, żeby dwie osoby mogły grać od razu, bez budowania własnej talii.","Skąd wziąć kartę po polsku","Kart Pokémon nie wydaje się po polsku — dziecko trzyma w ręku kartę angielską. W tym portalu każda karta ma polski przekład, a pod spodem oryginał; można czytać oba i przy okazji uczyć się angielskiego."],
         en:["First game without the exceptions","Skip Weakness, Resistance and Retreat cost in game one — add them in game two or three. And remember: whatever a card says beats the general rules.","Start from a ready-made deck","The easiest start is a preconstructed deck (Battle Academy or any boxed deck) — they're built so two people can play straight away, with no deck-building.","Where's the Polish card?","Pokémon cards aren't printed in Polish, so a Polish child holds an English card. Every card here comes with a Polish translation and the original underneath — read both and pick up some English along the way."]}
  }},
 {icon:"🏆", title:{pl:"Turnieje i Liga Pokémon", en:"Tournaments & Pokémon League"},
  pl:"W sklepach z grami działają lokalne Ligi Pokémon — cotygodniowe, luźne spotkania, na których można nauczyć się grać, pograć i dostać karty promocyjne. Wyżej są turnieje Challenge i Cup, mistrzostwa regionalne i międzynarodowe, a na szczycie Mistrzostwa Świata (Worlds) — z osobnymi kategoriami wiekowymi dla dzieci. W Polsce ligi znajdziesz w większych miastach w sklepach z planszówkami i kartami.",
  en:"Local game stores run Pokémon Leagues — casual weekly meetups to learn, play and earn promo cards. Above that: Challenges, Cups, Regional and International Championships, and at the top the World Championships — with separate age divisions for kids. Most larger cities have a league at a board-game or card store."},
 {icon:"📦", title:{pl:"Kolekcjonowanie kart", en:"Card collecting"},
  pl:"Karty kupuje się w boosterach (10 losowych kart), Elite Trainer Boxach i puszkach. Kolekcjonerzy trzymają cenne karty w koszulkach (sleeves) i segregatorach, a najcenniejsze wysyłają do oceny stanu (grading, np. PSA 1–10 — karta w PSA 10 bywa warta wielokrotnie więcej). Zasada nr 1 wymiany: wymieniaj się uczciwie i sprawdzaj ceny razem, np. na Cardmarket. Zasada nr 2: karta zniszczona traci większość wartości — dlatego kolekcjonerzy nie grają oryginałami rzadkich kart, tylko ich tańszymi wersjami.",
  en:"Cards come in boosters (10 random cards), Elite Trainer Boxes and tins. Collectors sleeve their cards, keep binders, and send the best ones for grading (e.g. PSA 1–10 — a PSA 10 can be worth many times more). Trading rule #1: trade fairly and check prices together (e.g. on Cardmarket). Rule #2: condition is everything — which is why collectors play with cheap copies and vault the rare ones."},
 {icon:"📱", title:{pl:"Pokémon GO — łapanie w prawdziwym świecie", en:"Pokémon GO — catching in the real world"},
  pl:"Gra AR na telefon (od 2016): Pokémony pojawiają się na mapie prawdziwego świata, a łapie się je rzutem Poké Balla na ekranie — pomagają jagody i rzuty podkręcone. PokéStopy to prawdziwe pomniki i miejsca, w Gymach walczy się o prestiż drużyny (czerwoni Valor, niebiescy Mystic, żółci Instinct), a na Raidy — wspólne walki z legendarnymi Pokémonami — gracze umawiają się jak na mecze. Community Day raz w miesiącu wyciąga tysiące ludzi do parków. To najbliższe prawdziwemu „łapaniu Pokémonów”, jakie wymyślono.",
  en:"The AR phone game (since 2016): Pokémon appear on a real-world map and you catch them by flicking a Poké Ball — berries and curveballs help. PokéStops are real landmarks, Gyms host team battles (red Valor, blue Mystic, yellow Instinct), and Raids — group fights against legendaries — bring players together like pickup matches. Monthly Community Days fill parks with thousands of players. The closest thing to really catching Pokémon."},
 {icon:"🟡", title:{pl:"Tazosy, zabawy podwórkowe i szkolne", en:"Tazos & playground games"},
  pl:"W Polsce ok. 2000 roku w paczkach chipsów były pokemonowe tazosy — okrągłe żetony, które się kolekcjonowało, wymieniało i „zbijało” (uderzasz swoim w stos przeciwnika; co się odwróci, jest twoje). Klasyczne zabawy kartami bez zasad turniejowych: porównywanie HP i ataków („moja bije twoją”), wymiany na przerwie, quizy „co to za Pokémon?” (jak w anime), rysowanie i odgadywanie sylwetek. Do dziś działa też zbieranie figurek, pluszaków i naklejek — a od 2024 cyfrowe kolekcjonowanie w aplikacji TCG Pocket.",
  en:"Around 2000, Polish crisp packets carried Pokémon tazos — round caps you collected, traded and 'slammed' (flip your opponent's stack; whatever lands face-up is yours). Classic schoolyard card play needs no tournament rules: comparing HP and attacks ('mine beats yours'), break-time trading, 'Who's that Pokémon?' quizzes like in the anime, drawing-and-guessing silhouettes. Figures, plushes and stickers never went away — and since 2024 there's digital collecting in the TCG Pocket app."},
 {icon:"🎲", title:{pl:"Inne gry: planszówki, Unite, Sleep i spółka", en:"More games: board games, Unite, Sleep & co."},
  pl:"Pokémon Monopoly i pokémonowe szachy, gra zręcznościowa Pokémon Battle Academy (oficjalny zestaw do nauki karcianki dla początkujących — dobry start!), drużynowa gra online Pokémon Unite, aplikacja Pokémon Sleep (Pokémony „łapie się”… śpiąc), Pokémon Quest, Café ReMix. A dla najmłodszych — po prostu odgrywanie ról: jeden jest trenerem, drugi Pokémonem, i już.",
  en:"Pokémon Monopoly and chess sets, Battle Academy (the official learn-to-play TCG box — a great start!), the team game Pokémon Unite, the Pokémon Sleep app (you 'catch' Pokémon by sleeping), Pokémon Quest, Café ReMix. And for the youngest — plain role-play: one kid is the trainer, the other the Pokémon. Done."}
],

// ---------- JAK SIĘ ŁAPIE POKÉMONY (w grach) ----------
catching: {
 pl: [
  ["Osłab, nie pokonuj", "W grach wideo dzikiego Pokémona najpierw osłabiasz w walce (najlepiej do czerwonego paska HP) — ale nie możesz go pokonać, bo ucieknie lub padnie. Sztuka polega na zatrzymaniu się o krok od zwycięstwa."],
  ["Statusy pomagają", "Uśpiony lub zamrożony Pokémon jest dwa razy łatwiejszy do złapania; paraliż, trucizna i poparzenie też pomagają."],
  ["Dobierz Balla", "Poké Ball to podstawa, Great Ball i Ultra Ball są skuteczniejsze. Są też specjalistyczne: Net Ball (wodne i robaki), Dusk Ball (noc i jaskinie), Quick Ball (pierwsza tura), Timer Ball (długie walki) i legendarny Master Ball — łapie WSZYSTKO bez pudła, ale w grze jest zwykle tylko jeden."],
  ["Każdy gatunek ma współczynnik łowności", "Od 3 (legendy — ekstremalnie trudne) do 255 (Caterpie, Pidgey — wchodzą niemal same). W katalogu wyżej każdy Pokémon ma pasek „łatwość złapania” — to prawdziwa statystyka z gier."],
  ["A potem?", "Złapane Pokémony trenujesz w walkach (zdobywają poziomy i ewoluują), wymieniasz z innymi graczami (niektóre ewoluują TYLKO przez wymianę — np. Machoke, Kadabra), hodujesz z jaj, a od Gen 3 możesz też brać udział w konkursach piękności. Cel klasyczny: skompletować cały Pokédex — „Gotta Catch 'Em All”."]
 ],
 en: [
  ["Weaken, don't defeat", "In the video games you first weaken a wild Pokémon (ideally into red HP) — but you can't knock it out, or it's gone. The art is stopping one step short of victory."],
  ["Status helps", "A sleeping or frozen Pokémon is twice as easy to catch; paralysis, poison and burn help too."],
  ["Pick your Ball", "Poké Ball is basic; Great and Ultra Balls work better. Specialists exist: Net Ball (Water/Bug), Dusk Ball (night and caves), Quick Ball (first turn), Timer Ball (long fights) — and the Master Ball, which never fails but you usually get just one."],
  ["Every species has a catch rate", "From 3 (legendaries — brutally hard) to 255 (Caterpie, Pidgey — they practically walk in). Every Pokémon in the catalog above shows its real in-game 'catch ease' bar."],
  ["Then what?", "You train your catches in battles (levels and evolution), trade with other players (some species evolve ONLY by trading — Machoke, Kadabra), breed eggs, and from Gen 3 on enter Contests. The classic goal: complete the Pokédex — Gotta Catch 'Em All."]
 ]
},

// ---------- RANKING RZADKOŚCI KART ----------
rarityGuide: {
 intro: {pl:"Rzadkość karty poznasz po symbolu w rogu: ● Common (pospolita), ◆ Uncommon (niezbyt pospolita), ★ Rare (rzadka). Wszystko powyżej zwykłej gwiazdki to karty specjalne — od najrzadszych do najpospolitszych:", en:"A card's rarity is printed in the corner: ● Common, ◆ Uncommon, ★ Rare. Everything above a plain star is a chase card — here, from rarest to most common:"},
 modern: [
  {name:"Mega Hyper Rare", freq:"nowość ery Mega (2025–26)", pl:"Złote karty Mega-ewolucji z aktualnych setów — najrzadsze trafienia współczesnych boosterów.", en:"Gold Mega Evolution cards from current sets — the rarest pulls in today's boosters."},
  {name:"Hyper Rare / Gold", freq:"≈1 na 200+ boosterów", pl:"Złote karty. Absolutny szczyt współczesnej piramidy.", en:"Gold cards. The very top of the modern pyramid."},
  {name:"Special Illustration Rare (SIR)", freq:"bardzo rzadkie", pl:"Pełnoformatowe, malarskie ilustracje kart ex i Trenerów — dziś to na nie polują wszyscy.", en:"Full-art painterly ex and Trainer cards — today's most hunted pulls."},
  {name:"Illustration Rare (IR)", freq:"rzadkie", pl:"Artystyczne wersje zwykłych Pokémonów, często sceny z ich życia.", en:"Artful takes on regular Pokémon, often little scenes from their lives."},
  {name:"Ultra Rare (full art ex)", freq:"rzadkie", pl:"Pełnoformatowe karty ex i wsparcia.", en:"Full-art ex and Supporter cards."},
  {name:"Double Rare (ex)", freq:"kilka na box", pl:"Zwykłe karty ex — mocne w grze, łatwiejsze do trafienia.", en:"Standard ex cards — strong in play, easier to pull."},
  {name:"Rare Holo ★", freq:"≈1 na booster (dawniej)", pl:"Klasyczna błyszcząca karta z gwiazdką — król rzadkości w czasach Base Set.", en:"The classic holofoil star — king of rarity back in Base Set days."},
  {name:"Rare ★", freq:"częste", pl:"Gwiazdka bez holo.", en:"A star without the shine."},
  {name:"Uncommon ◆", freq:"3 na booster", pl:"Romb.", en:"The diamond."},
  {name:"Common ●", freq:"większość talii", pl:"Kółko — fundament każdej talii i pierwszych wymian.", en:"The circle — the backbone of every deck and first trade."}
 ],
 famous: {
  title:{pl:"Najsłynniejsze białe kruki", en:"Legendary grails"},
  items:[
   {name:"Pikachu Illustrator (1998)", pl:"nagroda w konkursie rysunkowym, ~40 egzemplarzy; egzemplarz Logana Paula: 5,3 mln $ — najdroższa karta świata", en:"a drawing-contest prize, ~40 copies; Logan Paul's copy: $5.3M — the priciest card on Earth"},
   {name:"Charizard Base Set 1st Edition (1999)", pl:"święty Graal zwykłych śmiertelników; w stanie PSA 10 — setki tysięcy dolarów", en:"the everyman's holy grail; six figures in PSA 10"},
   {name:"Trophy Kangaskhan, No. 1–3 Trainer", pl:"karty-trofea z japońskich turniejów lat 90.", en:"trophy cards from 1990s Japanese tournaments"},
   {name:"Moonbreon (Umbreon VMAX alt art, 2021)", pl:"najsłynniejsza droga karta ery współczesnej", en:"the most famous modern-era chase card"}
  ]
 }
},

// ---------- ETYKIETY KART (PL) ----------
cardLabels: {
 supertype: {"Pokémon":"Pokémon", "Trainer":"Trener", "Energy":"Energia"},
 subtype: {
  "Basic":"Podstawowy", "Stage 1":"Etap 1", "Stage 2":"Etap 2", "MEGA":"MEGA",
  "ex":"ex", "V":"V", "VMAX":"VMAX", "VSTAR":"VSTAR", "Tera":"Tera",
  "Ancient":"Pradawny", "Future":"Przyszły", "Rapid Strike":"Szybkie Ciosy",
  "Item":"Przedmiot", "Supporter":"Wsparcie", "Stadium":"Stadion",
  "Pokémon Tool":"Narzędzie", "Special":"Specjalna", "ACE SPEC":"ACE SPEC"
 },
 energy: {
  "Fire":"Ognista", "Water":"Wodna", "Grass":"Trawiasta", "Lightning":"Elektryczna",
  "Psychic":"Psychiczna", "Fighting":"Walcząca", "Darkness":"Mroczna",
  "Metal":"Metalowa", "Colorless":"Bezbarwna", "Fairy":"Wróżkowa",
  "Dragon":"Smocza", "Free":"bez kosztu"
 }
},

// ---------- TYPY ----------
types: {
 normal:{pl:"Normalny",color:"#A8A878"}, fire:{pl:"Ogień",color:"#F08030"}, water:{pl:"Woda",color:"#6890F0"},
 electric:{pl:"Elektryczny",color:"#F8D030"}, grass:{pl:"Trawa",color:"#78C850"}, ice:{pl:"Lód",color:"#98D8D8"},
 fighting:{pl:"Walczący",color:"#C03028"}, poison:{pl:"Trujący",color:"#A040A0"}, ground:{pl:"Ziemny",color:"#E0C068"},
 flying:{pl:"Latający",color:"#A890F0"}, psychic:{pl:"Psychiczny",color:"#F85888"}, bug:{pl:"Robak",color:"#A8B820"},
 rock:{pl:"Skalny",color:"#B8A038"}, ghost:{pl:"Duch",color:"#705898"}, dragon:{pl:"Smok",color:"#7038F8"},
 dark:{pl:"Mroczny",color:"#705848"}, steel:{pl:"Stalowy",color:"#B8B8D0"}, fairy:{pl:"Wróżka",color:"#EE99AC"}
}
};
