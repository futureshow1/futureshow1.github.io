# SŁUCHOWISKA DLA DZIECI

Baza darmowych, legalnie dostępnych słuchowisk, bajek audio i audiobooków dla dzieci — jednoplikowy portal
(`index.html` + `data.js`) w stylu rodziny FutureShow (Dobranocki, Kino nieme, Historia animacji).

**Stan 2026-10-11:** 439 pozycji, ok. 716 godzin, 70 źródeł, 14 rozdziałów. Podgląd lokalny: port 8179
(`python3 -m http.server 8179`).

## Funkcje
- **Odtwarzacz w karcie:** MP3 z Wolnych Lektur gra bezpośrednio (`<audio>` z listą części, kolejne części
  automatycznie), YouTube przez `youtube-nocookie.com` (serie wieloodcinkowe jako playlista z listy ID),
  archive.org przez wbudowany odtwarzacz; podcasty i strony nadawców otwierają się w nowej karcie.
- **Pasek „teraz gra”** przyklejony u góry: play/pauza, pasek przewijania z czasem, głośność z wyciszeniem (MP3 i YouTube przez `enablejsapi`, głośność pamiętana w localStorage), poprzedni/następny utwór,
  skok do karty, zamknięcie; odtwarzacz przeżywa filtrowanie i wyszukiwanie (parkowany w ukrytym kontenerze).
- **Zgaszony ekran:** MP3 grają po zablokowaniu telefonu i mają Media Session (ekran blokady: tytuł, okładka, pauza,
  następny/poprzedni, ±15 s); filtr „gra przy zgaszonym ekranie” i plakietka na kartach. Osadzenia YouTube zatrzymują się
  po zgaszeniu ekranu — ograniczenie YouTube, niezależne od Premium.
- **Priorytet dla odtwarzania na stronie:** w każdym rozdziale najpierw MP3, potem YouTube/archive.org, linki zewnętrzne
  na końcu (przycisk „Słuchaj w serwisie”, karta przygaszona); filtr „▶ gra na stronie”.
- Wyszukiwarka, filtry (język, typ: słuchowisko / audiobook / wiersze / podcast / kolekcja, źródło),
  spis rozdziałów ze scroll-spy, PL/EN, tryb ciemny/jasny.
- Pozycje z kanałów nieoficjalnych (archiwalne wrzutki winyli Polskich Nagrań) mają plakietkę
  „kanał nieoficjalny” i pole `official: false`.

## Rozdziały
1. Polskie Radio: Teatr Polskiego Radia i Radio Dzieciom
2. Bajki muzyczne Polskich Nagrań (Bajki-Grajki) — oficjalne albumy z kanału „Bajka Muzyczna – Topic” + archiwum doremisie tv
3. Teatry lalkowe i instytucje: słuchowiska online (Estrada Poznańska, OTLiA Opole, WTL Wrocław, Ateneum, Maska, MŁYN, Fundacja Teatr Wyobraźni…)
4. Współczesne słuchowiska i bajki na dobranoc (Soundsitive Kids, MiniMini+, Projekt Muzyka, Bajkowisko…)
5. Audiobooki czytane przez aktorów (Jungowska, Fronczewski, Siedmioróg)
6. Wydawcy audiobooków: darmowe pełne nagrania (Audioteka, Empik Go, Nasza Księgarnia)
7. Podcasty z bajkami
8–10. Wolne Lektury: baśnie i legendy / powieści / wiersze (355 audiobooków z API)
11. English: dramatized classics and radio plays (LibriVox dramatic readings)
12. English: golden age of children's radio (Internet Archive)
13. English: audiobooks, Storynory and podcasts
14. Inne języki: niemiecki (Ohrka, Kakadu, Ohrenbär), czeski (Rádio Junior), ukraiński (Suspilne Kazky, Lirnyk Saszko, RDC, Lwowski Teatr Lalek, UIK)

## Pipeline danych (`tools/`)
```
wl_fetch.py / wl_enrich.py   # Wolne Lektury: kolekcje dla dzieci + gatunki → results/wolnelektury.json (mp3, lektor, czas)
yt_scan.py / yt_channels.py  # yt-dlp: skan zapytań + zrzuty oficjalnych kanałów → results/yt_*.json
yt_playlists.py / yt_meta.py # playlisty albumów + weryfikacja kanału/albumu/czasu każdego ID (--ignore-no-formats-error!)
embedtest.html               # test w przeglądarce (IFrame API): które ID z kanałów Topic faktycznie grają → results/embed_test.json
extract_agent.py             # wyciąga JSONL z transkryptów agentów researchu → results/agent_*.jsonl
world_items.py               # agent_world.jsonl → tools/curated_world.json (sekcje EN/DE/CS/RU, osadzenia archive.org)
curated_yt*.json             # ręcznie kuratorowane serie z YouTube (lista ID = kolejność odtwarzania)
curated_links.json / curated_pr.json  # podcasty, Polskie Radio, strony nadawców
albums.json / albums_extra.json / sections.json / sources.json / wl_sections.json
build_data.py                # składa wszystko → data.js
```
Odświeżenie: `python3 -I tools/build_data.py`.

## Uwagi
- yt-dlp 2026.03 przy filmach bez formatów wymaga `--ignore-no-formats-error --extractor-args "youtube:player_client=web_safari"`.
- Kanał „Bajka Muzyczna – Topic” to automatyczna dystrybucja Warner Music Poland — oficjalna; doremisie tv to archiwum fanowskie.
- Część utworów z kanałów Topic (zwłaszcza Wielka Kolekcja Bajek Zborowskiego) jest tylko dla YouTube Music Premium (błąd osadzenia 150) — `build_data.py` wycina ID z `results/embed_test.json` ≠ ok; yt-dlp tego nie wykrywa, trzeba testować w przeglądarce.
- Osadzenie serii: `embed/<A>?playlist=A,B,C` — pierwszy ID MUSI być też w `playlist=`, inaczej YouTube pomija go i startuje od drugiego.
- Archiwum audycji Polskiego Radia Dzieciom (polskieradio.pl/dzieci/audycje/…) wystawia bezpośrednie MP3 na static.prsa.pl (CORS *) — grają w karcie; podcasty polskieradio.pl/podcasty tylko jako linki.
- Osadzenie archive.org: `https://archive.org/embed/<id>?playlist=1` (z `&` zamiast `?` nie działa).
