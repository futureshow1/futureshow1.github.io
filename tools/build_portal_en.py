#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Indeksowalna wersja angielska portali streamingowych: <portal>/en/index.html.
Portale mają już pełny przełącznik PL/EN w JS (I18N, langBtn); ten skrypt:
  1) w źródłowym index.html dopisuje hreflang i każe przyciskowi języka przechodzić między / i /en/,
  2) generuje en/index.html: lang="en", angielskie <title>/description/og, canonical na /en/,
     ścieżki względne → ../, domyślny język EN niezależnie od localStorage.
Uruchamiać po każdej zmianie index.html portalu:  python3 tools/build_portal_en.py [nazwa ...]
"""
import re, os, sys
BASE = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # inne projekty/

PORTALS = {
 "kino-nieme": dict(url="https://futureshow.pl/kino-nieme/",
   title="SILENT CINEMA — a history of silent film 1895–1930: 828 films online",
   desc="The whole history of silent cinema in 828 films legally available online — 30 chapters from Lumière and Méliès, through Griffith, Chaplin, Keaton, Murnau and Eisenstein, to Dreyer and Ozu, plus Polish silent film. Chapter intros grounded in film scholarship. Free, no ads, no accounts.",
   og_title="SILENT CINEMA — 828 films, 30 chapters, 1895 → 1930",
   og_desc="The whole history of silent cinema, watchable: Lumière, Méliès, Griffith, Chaplin, Keaton, Murnau, Eisenstein, Dreyer, Ozu — and Polish silent film."),
 "historia-animacji": dict(url="https://futureshow.pl/historia-animacji/",
   title="ANIMATION: A HISTORY — the whole history of animated film: 430 films online",
   desc="The world history of animation in 430 films available on YouTube — 30 chapters from optical toys (1833) and Gertie the Dinosaur, through Disney, the Polish School and Norstein, to Pixar and the internet generation. Chapter structure after Bendazzi, Furniss, Sitkiewicz and Giżycki. Free, no ads.",
   og_title="ANIMATION: A HISTORY — 430 films, 30 chapters, 1833 → today",
   og_desc="The world history of animated film, watchable: from Plateau and Starewicz, through Disney and the Polish School, to Pixar and the internet generation."),
 "awangarda-kino-portal": dict(url="https://futureshow.pl/kino-awangardy/",
   title="AVANT-GARDE CINEMA — 564 experimental and avant-garde films online",
   desc="564 avant-garde and experimental films online in 30 chapters — from the Dadaists and Surrealists, through Maya Deren and Fluxus, the Polish Workshop of the Film Form and Central European animation, to post-internet art. Watch in place, free, no ads.",
   og_title="AVANT-GARDE CINEMA — 564 films, 119 artists, 30 chapters",
   og_desc="A century of experimental cinema — Dadaists, Maya Deren, Fluxus, post-internet art. 564 films from YouTube, watched in place."),
 "dobranocki": dict(url="https://futureshow.pl/dobranocki/",
   title="BEDTIME LEGENDS 1980–2000 — classic Polish and European bedtime cartoons: 326 episodes",
   desc="The cartoons that put Poland to bed for two decades — 326 verified episodes of 53 shows from YouTube, to watch in sequence or one at a time: Bolek & Lolek, Reksio, Teddy Bear Uszatek, the Mole, Nu Pogodi, the Smurfs, Gummi Bears, Moomins. Free, no ads, no accounts.",
   og_title="BEDTIME LEGENDS — 326 episodes, 53 shows, 1980–2000",
   og_desc="The cartoons that put Poland to bed: Bolek & Lolek, Reksio, Uszatek, the Mole, Nu Pogodi, the Smurfs and the Moomins. Every show is a ready playlist."),
 "sluchowiska-dla-dzieci": dict(url="https://futureshow.pl/sluchowiska/",
   title="AUDIO STORIES FOR CHILDREN — 450 free radio plays, audiobooks and bedtime stories",
   desc="Hundreds of hours of free audio stories for children: Polish Radio theatre, musical fairy tales from Polskie Nagrania vinyls, tales read by actors, puppet theatres, Wolne Lektury, LibriVox and old American radio — in Polish, English, Ukrainian, German and Czech. Plays on the page, also with the screen off.",
   og_title="AUDIO STORIES FOR CHILDREN — 450 recordings, 750 hours",
   og_desc="Free radio plays, audiobooks and bedtime stories for children in five languages. Plays on the page, also with the screen off."),
}
REL = ["data.js", "favicon.svg", "favicon-32.png", "apple-touch-icon.png", "zrodla.html", "maraton.html", "og-image.png", "poster.svg"]

def patch_source(s, url):
    """hreflang + przełącznik nawigujący między / i /en/ (tylko raz)."""
    if 'hreflang="en"' not in s:
        hl = f'<link rel="alternate" hreflang="pl" href="{url}"><link rel="alternate" hreflang="en" href="{url}en/"><link rel="alternate" hreflang="x-default" href="{url}">'
        m = re.search(r'<link rel="canonical"[^>]*>', s)
        s = s[:m.end()] + hl + s[m.end():] if m else s.replace("</head>", hl + "\n</head>", 1)
    if "FS_EN_NAV" not in s:
        key = re.search(r"localStorage\.getItem\('(\w+-lang)'\)", s)
        key = key.group(1) if key else "lang"
        nav = ("lang = lang === 'pl' ? 'en' : 'pl';"
               f" /*FS_EN_NAV*/ if(lang==='en'&&!/\\/en\\/?$/.test(location.pathname)){{try{{localStorage.setItem('{key}','en')}}catch(e){{}}location.href='en/'+location.hash;return;}}"
               f" if(lang==='pl'&&/\\/en\\/?$/.test(location.pathname)){{try{{localStorage.setItem('{key}','pl')}}catch(e){{}}location.href='../'+location.hash;return;}}")
        assert "lang = lang === 'pl' ? 'en' : 'pl';" in s, "nie znaleziono przełącznika"
        s = s.replace("lang = lang === 'pl' ? 'en' : 'pl';", nav, 1)
    return s

def build_en(s, cfg):
    url = cfg["url"]
    def sub(pat, rep, flags=0):
        nonlocal s
        s2 = re.sub(pat, rep, s, count=1, flags=flags)
        if s2 == s: print("   ! brak:", pat[:60], file=sys.stderr)
        s = s2
    sub(r'<html lang="pl">', '<html lang="en">')
    sub(r'<title>.*?</title>', '<title>' + cfg["title"].replace("&", "&amp;") + '</title>', re.S)
    sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="' + cfg["desc"].replace('"', "&quot;") + '">')
    if 'og:title' in s:
        sub(r'<meta property="og:title" content="[^"]*">', '<meta property="og:title" content="' + cfg["og_title"] + '">')
        sub(r'<meta property="og:description" content="[^"]*">', '<meta property="og:description" content="' + cfg["og_desc"].replace('"', "&quot;") + '">')
        sub(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{url}en/">')
    sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url}en/">')
    for f in REL:
        s = s.replace(f'src="{f}"', f'src="../{f}"').replace(f'href="{f}"', f'href="../{f}"')
    # domyślnie EN, niezależnie od localStorage
    s = re.sub(r"localStorage\.getItem\(['\"]\w+-lang['\"]\)\s*\|\|\s*['\"]pl['\"]", "'en'", s)
    s = s.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n<!-- generated by futureshow/tools/build_portal_en.py from ../index.html — do not edit by hand -->", 1)
    left = re.findall(r'(?:src|href)="(?!https?:|//|mailto:|data:|#|/|\.\./|\$)[^"]+"', s)
    if left: print("   ! pozostałe ścieżki względne:", left, file=sys.stderr)
    return s

for name in (sys.argv[1:] or PORTALS):
    cfg = PORTALS[name]; d = os.path.join(BASE, name); p = os.path.join(d, "index.html")
    s = open(p, encoding="utf-8").read()
    s = patch_source(s, cfg["url"]); open(p, "w", encoding="utf-8").write(s)
    os.makedirs(os.path.join(d, "en"), exist_ok=True)
    open(os.path.join(d, "en", "index.html"), "w", encoding="utf-8").write(build_en(s, cfg))
    print(name, "→ en/index.html")
