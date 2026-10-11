#!/usr/bin/env python3
"""Składa data.js z: results/wolnelektury.json, tools/curated_yt.json, results/verify_meta.jsonl (albumy Topic),
results/yt_playlists.json (kolejność albumów), tools/curated_links.json (pozycje spoza YouTube: Polskie Radio,
archive.org, LibriVox, Storynory…) i results/agent_*.jsonl (surowe wyniki researchu, filtrowane przez tools/agent_pick.json)."""
import json, re, glob, os, datetime, hashlib, collections
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
R = lambda *p: os.path.join(ROOT, *p)
def load(p, default=None):
    try: return json.load(open(R(p), encoding="utf-8"))
    except FileNotFoundError: return default
def jsonl(p):
    try: return [json.loads(l) for l in open(R(p), encoding="utf-8") if l.strip()]
    except FileNotFoundError: return []

SECTIONS = load("tools/sections.json")
items = []
def hid(s): return hashlib.md5(s.encode()).hexdigest()[:10]
def hms(s):
    if not s: return None
    p = [int(x) for x in str(s).split(":")]
    return p[0]*3600+p[1]*60+p[2] if len(p)==3 else p[0]*60+p[1] if len(p)==2 else p[0]

# ---------- YouTube metadata index ----------
ytmeta = {}
for f in ["results/yt_scan.json"]:
    for x in load(f, []): ytmeta[x["id"]] = {"duration": x.get("duration"), "views": x.get("views"), "title": x.get("title"), "channel": x.get("channel")}
for k, v in (load("results/yt_channels.json", {}) or {}).items():
    for x in v["videos"]: ytmeta.setdefault(x["id"], {}).update({"duration": x.get("duration"), "title": x.get("title"), "channel": v["channel"]})
_pl = load("results/yt_playlists.json", {}) or {}
for grp in list(_pl.get("playlists", {}).values()) + list(_pl.get("channels", {}).values()):
    for x in grp["videos"]:
        if x.get("duration"): ytmeta.setdefault(x["id"], {}).setdefault("duration", x["duration"])
        if x.get("title"): ytmeta.setdefault(x["id"], {}).setdefault("title", x["title"])
for f in glob.glob(R("results/*meta*.jsonl")):
    for x in jsonl(os.path.relpath(f, ROOT)):
        if x.get("id") and not x.get("err"): ytmeta.setdefault(x["id"], {}).update(x)
def ytdur(ids): return int(sum((ytmeta.get(i, {}).get("duration") or 0) for i in ids)) or None

EMBED = load("results/embed_test.json", {}) or {}
BAD = {i for i, v in EMBED.items() if v != "ok"}
def yt_item(e):
    ids = [i for i in e["ids"] if i not in BAD]
    if not ids: print("  pominięto (zablokowane):", e["title"]); return None
    d = dict(e); d.pop("ids")
    dropped = len(e["ids"]) - len(ids)
    if dropped: d["note"] = ((d.get("note") or "") + f" Pominięto {dropped} części dostępnych tylko w YouTube Music Premium.").strip()
    d.update({"id": "yt-" + ids[0], "lang": e.get("lang", "pl"), "url": e.get("url") or f"https://www.youtube.com/watch?v={ids[0]}",
              "cover": f"https://i.ytimg.com/vi/{ids[0]}/hqdefault.jpg", "duration": e.get("duration") or ytdur(ids), "parts": len(ids),
              "play": {"kind": "yt", "src": ids[0], "ids": ids, "names": [re.sub(r"\s*[|(].*$", "", (ytmeta.get(i, {}).get("title") or "")).strip()[:70] for i in ids]}})
    d.setdefault("official", True)
    return d

# ---------- 1. Bajka Muzyczna / Topic (Polskie Nagrania, Wielka Kolekcja Bajek) ----------
meta = {x["id"]: x for x in jsonl("results/verify_meta.jsonl") if not x.get("err")}
order = []
for p, v in (load("results/yt_playlists.json", {}) or {}).get("playlists", {}).items():
    for x in v["videos"]: order.append(x["id"])
for ch in (load("results/yt_playlists.json", {}) or {}).get("channels", {}).values():
    for x in ch["videos"]: order.append(x["id"])
rank = {i: n for n, i in reversed(list(enumerate(order)))}
albums = collections.OrderedDict()
for i in sorted(meta, key=lambda i: rank.get(i, 9999)):
    m = meta[i]
    if m.get("channel") not in ("Bajka Muzyczna - Topic", "Anna Dymna - Topic", "Wiktor Zborowski - Topic"): continue
    alb = m.get("album") or m.get("title")
    if "Wielka Kolekcja Bajek" in (alb or ""): alb = "Wielka Kolekcja Bajek — " + m["channel"].replace(" - Topic", "")
    albums.setdefault((m["channel"], alb), []).append(i)
ALBUM_INFO = load("tools/albums.json", {})
ROMAN = {"I":1,"II":2,"III":3,"IV":4,"V":5,"VI":6}
def partno(i):
    t = meta.get(i, {}).get("title") or ""
    m = re.search(r"(?:cz\.?|część|part|сz\.?)\s*(\d+|[IV]+)", t, re.I)
    if not m: return None
    v = m.group(1); return int(v) if v.isdigit() else ROMAN.get(v.upper())
for (ch, alb), ids in albums.items():
    if all(partno(i) is not None for i in ids): ids = sorted(ids, key=partno)
    info = ALBUM_INFO.get(alb, {})
    if info.get("skip"): continue
    src = "Polskie Nagrania (YouTube)" if ch.startswith("Bajka") else f"{ch.replace(' - Topic','')} (YouTube)"
    it_ = yt_item({"section": info.get("section", "bajki-grajki"), "title": info.get("title", alb), "author": info.get("author"),
        "source": src, "type": info.get("type", "sluchowisko"), "age": info.get("age", "4-9"), "year": info.get("year"),
        "performers": info.get("performers"), "director": info.get("director"), "note": info.get("note"), "ids": ids})
    if it_: items.append(it_)
# Koziołek Matołek i Praprasłoń — z kanału Topic, znane ID
for e in load("tools/albums_extra.json", []):
    it_ = yt_item(e)
    if it_: items.append(it_)

# ---------- 2. Kuratorowane serie z YouTube ----------
for f in ["tools/curated_yt.json", "tools/curated_yt2.json", "tools/curated_yt3.json", "tools/curated_uk.json"]:
    for e in load(f, []):
        it_ = yt_item(e)
        if it_: items.append(it_)

# ---------- 3. Wolne Lektury ----------
WL_SKIP = {"Doktor Jekyll i pan Hyde", "Historia kolorów"}
WL_SECTION = load("tools/wl_sections.json", {})
wl = load("results/wolnelektury.json", [])
parents = collections.OrderedDict()
for b in wl:
    if b["title"] in WL_SKIP: continue
    if b.get("parent") and b["parent"] != "Baśnie":
        parents.setdefault(b["parent"], []).append(b); continue
    g = (b.get("genres") or [""])[0]
    sec = WL_SECTION.get(b["title"]) or ("wl-basnie" if g in ("Baśń", "Bajka ludowa", "Legenda", "Bajka") and (b.get("audio_length") or "0").count(":") < 2 else
          "wl-wiersze" if g == "Wiersz" else "wl-powiesci")
    items.append({"id": "wl-" + hid(b["url"]), "section": sec, "title": b["title"], "author": b["author"], "source": "Wolne Lektury",
        "type": "wiersz" if g == "Wiersz" else "czytanie", "lang": "pl", "url": b["url"], "cover": b.get("cover_thumb") or b.get("cover"), "coverBook": True,
        "duration": hms(b.get("audio_length")), "parts": len(b["mp3_tracks"]), "performers": ", ".join(b.get("artists") or []) or None,
        "director": ", ".join(b.get("directors") or []) or None, "year": None, "age": None,
        "note": (f"{g}. " if g else "") + ("Przekład: " + ", ".join(b["translators"]) + ". " if b.get("translators") else "") + "Domena publiczna / wolna licencja, czyta lektor.",
        "play": {"kind": "mp3", "src": b["mp3_tracks"][0]["url"], "tracks": [{"name": re.sub(r"^.*?, ", "", t["name"] or b["title"]), "url": t["url"]} for t in b["mp3_tracks"]]}})
for par, bs in parents.items():
    first = bs[0]; tracks = [{"name": b["title"], "url": b["mp3_tracks"][0]["url"]} for b in bs if b["mp3_tracks"]]
    g = (first.get("genres") or [""])[0]
    items.append({"id": "wl-" + hid(par + first["author"]), "section": "wl-wiersze" if g in ("Bajka", "Wiersz", "Przypowieść") else "wl-basnie", "title": par, "author": first["author"],
        "source": "Wolne Lektury", "type": "wiersz" if g in ("Bajka", "Wiersz", "Przypowieść") else "czytanie", "lang": "pl",
        "url": "https://wolnelektury.pl/katalog/autor/" + re.sub(r"[^a-z0-9]+", "-", first["author"].lower().replace("ł", "l").replace("ś", "s").replace("ę", "e").replace("ą", "a").replace("ż", "z").replace("ź", "z").replace("ć", "c").replace("ń", "n").replace("ó", "o")).strip("-") + "/",
        "cover": first.get("cover_thumb") or first.get("cover"), "coverBook": True, "duration": sum(hms(b.get("audio_length")) or 0 for b in bs) or None,
        "parts": len(tracks), "performers": ", ".join(sorted({a for b in bs for a in (b.get("artists") or [])})) or None, "director": None, "year": None, "age": None,
        "note": f"{len(tracks)} nagrań ze zbioru. Domena publiczna, czyta lektor.", "play": {"kind": "mp3", "src": tracks[0]["url"], "tracks": tracks}})

# ---------- 4. Pozycje spoza YouTube i wyniki agentów ----------
def link_item(e, prefix):
    u = e["url"]; play = None
    m = re.search(r"(?:youtube\.com/watch\?v=|youtu\.be/)([\w-]{11})", u)
    pl = re.search(r"[?&]list=([\w-]+)", u)
    if e.get("embed"): play = {"kind": "embed", "src": e["embed"], "height": 400}
    elif m: play = {"kind": "yt", "src": m.group(1), "ids": [m.group(1)]}
    elif pl: play = {"kind": "yt", "src": None, "list": pl.group(1)}
    elif e.get("mp3"): play = {"kind": "mp3", "src": e["mp3"], "tracks": e.get("tracks")}
    elif re.match(r"https?://archive\.org/details/([^/?#]+)", u): play = {"kind": "embed", "src": "https://archive.org/embed/" + re.match(r"https?://archive\.org/details/([^/?#]+)", u).group(1) + "?playlist=1", "height": 360}
    cover = e.get("cover") or (f"https://i.ytimg.com/vi/{m.group(1)}/hqdefault.jpg" if m else None)
    return {"id": prefix + hid(u), "section": e["section"], "title": e["title"], "title_en": e.get("title_en"), "author": e.get("author"), "source": e["source"],
        "type": e.get("type", "sluchowisko"), "lang": e.get("lang", "pl"), "url": u, "cover": cover, "duration": e.get("duration") if isinstance(e.get("duration"), int) else hms(e.get("duration")),
        "parts": e.get("parts") or (len(play["ids"]) if play and play.get("ids") else None), "performers": e.get("performers"), "director": e.get("director"), "year": e.get("year"), "age": e.get("age"), "note": e.get("note"), "note_en": e.get("note_en"), "official": e.get("official", True), "play": play}
for f in ["tools/curated_links.json", "tools/curated_world.json", "tools/curated_pr.json", "tools/curated_uk_links.json"]:
    for e in load(f, []): items.append(link_item(e, "ln-"))

# ---------- dedup + sanity ----------
seen = set(); out = []
for it in items:
    key = it["url"].rstrip("/")
    if key in seen: continue
    seen.add(key); out.append(it)
secids = {s["id"] for s in SECTIONS}
bad = [it["title"] for it in out if it["section"] not in secids]
assert not bad, f"nieznane sekcje: {bad}"
sec_order = {s["id"]: n for n, s in enumerate(SECTIONS)}
out.sort(key=lambda it: sec_order[it["section"]])
SOURCES = load("tools/sources.json", [])
today = datetime.date.today().isoformat()
with open(R("data.js"), "w", encoding="utf-8") as f:
    f.write(f"// Wygenerowane {today} przez tools/build_data.py — {len(out)} pozycji, {len(SECTIONS)} rozdziałów.\n")
    f.write("window.GENERATED = " + json.dumps(today) + ";\n")
    f.write("window.SECTIONS = " + json.dumps(SECTIONS, ensure_ascii=False, indent=1) + ";\n")
    f.write("window.SOURCES = " + json.dumps(SOURCES, ensure_ascii=False, indent=1) + ";\n")
    f.write("window.ITEMS = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
cnt = collections.Counter(it["section"] for it in out)
for s in SECTIONS: print(f"{cnt[s['id']]:4d}  {s['title']}")
print(len(out), "pozycji;", round(sum(it.get("duration") or 0 for it in out)/3600), "godzin;", len({it['source'] for it in out}), "źródeł")
