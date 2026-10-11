import json, re
SKIP = ["Audible Stories", "Jennings", "BBC Transcription", "Lux Radio Theater", "Jamming on the Job", "BBC School Radio", "Детское радио – круглосуточный"]
TYPE = {"drama": "sluchowisko", "reading": "czytanie", "podcast": "podcast", "collection": "kolekcja"}
out = []
import os
for l in [x for f in ["results/agent_world.jsonl", "results/agent_uk.jsonl"] if os.path.exists(f) for x in open(f, encoding="utf-8")]:
    r = json.loads(l)
    if any(s in r["title"] for s in SKIP): continue
    if r.get("lang") == "ru": continue
    lang = r.get("lang", "en"); src = r.get("source", ""); typ = TYPE.get(r.get("type"), "czytanie")
    if lang != "en": sec = "world"
    elif "Internet Archive" in src: sec = "en-otr"
    elif typ == "sluchowisko" and ("LibriVox" in src or "archive.org" in src): sec = "en-drama"
    elif typ == "sluchowisko" and src in ("WBUR / podcast", "podcast", "BBC"): sec = "en-drama"
    else: sec = "en-stories"
    note = r.get("note") or ""
    m = re.search(r"https?://archive\.org/details/([\w.-]+)", r["url"]) or re.search(r"https?://archive\.org/details/([\w.-]+)", note)
    e = {"section": sec, "title": r["title"], "author": r.get("author"), "source": src.replace(" / archive.org", "").replace("Internet Archive (Old Time Radio)", "Internet Archive"),
         "type": typ, "lang": lang, "url": r["url"], "age": r.get("age"), "year": r.get("year"), "duration": r.get("duration") if r.get("duration") and ":" in str(r.get("duration")) else None,
         "official": r.get("official", True), "note": re.sub(r"\s*;?\s*mirror https?://\S+", "", note).strip(" ;") or None}
    if m:
        e["embed"] = f"https://archive.org/embed/{m.group(1)}?playlist=1"; e["cover"] = f"https://archive.org/services/img/{m.group(1)}"
    ym = re.search(r"(?:v=|youtu\.be/)([\w-]{11})", r["url"])
    if ym: e["cover"] = f"https://i.ytimg.com/vi/{ym.group(1)}/hqdefault.jpg"
    out.append(e)
json.dump(out, open("tools/curated_world.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
import collections; print(len(out), collections.Counter(e["section"] for e in out))
