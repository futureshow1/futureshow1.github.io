import json, urllib.request, sys, time
def get(u):
    with urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent':'Mozilla/5.0'}), timeout=30) as r:
        return json.load(r)
audio = {b['href']: b for b in get("https://wolnelektury.pl/api/audiobooks/?format=json")}
cols = ["basnie-bajki-bajeczki","literatura-dla-dzieci-i-mlodziezy-2","poczytaj-mi-ksiazki-dla-dzieci","wiersze-dla-dzieci"]
genres = ["bajka","bajka-ludowa","basn","powiesc-dla-dzieci-i-mlodziezy"]
cand = {}
for c in cols:
    d = get(f"https://wolnelektury.pl/api/collections/{c}/")
    for b in d.get('books', []):
        if b['href'] in audio: cand.setdefault(b['href'], set()).add(c)
for g in genres:
    for b in get(f"https://wolnelektury.pl/api/genres/{g}/books/"):
        if b['href'] in audio: cand.setdefault(b['href'], set()).add('genre:'+g)
print(len(cand), file=sys.stderr)
out = []
for i,(href,tags) in enumerate(cand.items()):
    try: b = get(href)
    except Exception as e: print('ERR', href, e, file=sys.stderr); continue
    mp3 = [m for m in b.get('media', []) if m.get('type')=='mp3']
    out.append({"title": b['title'], "author": ", ".join(a['name'] for a in b.get('authors',[])) or audio[href].get('author'),
        "url": b['url'], "genre": b.get('genre'), "kind": b.get('kind'), "epoch": b.get('epoch'),
        "cover": b.get('cover_thumb') or audio[href].get('simple_thumb'), "tags": sorted(tags),
        "mp3": [m['url'] for m in mp3], "mp3_count": len(mp3), "mp3_names": [m.get('name') for m in mp3][:3],
        "artists": sorted({(m.get('artist') or '') for m in mp3} - {''}), "directors": sorted({(m.get('director') or '') for m in mp3} - {''}),
        "children": [c['title'] for c in b.get('children',[])]})
    time.sleep(0.15)
json.dump(out, open("results/wolnelektury.json","w"), ensure_ascii=False, indent=1)
print(len(out), file=sys.stderr)
