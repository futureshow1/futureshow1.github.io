import json, urllib.request, time, sys
def get(u):
    with urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent':'Mozilla/5.0'}), timeout=30) as r: return json.load(r)
d = json.load(open("results/wolnelektury.json"))
for i,x in enumerate(d):
    slug = x['url'].rstrip('/').split('/')[-1]
    try: b = get(f"https://wolnelektury.pl/api/books/{slug}/")
    except Exception as e: print("ERR", slug, e, file=sys.stderr); continue
    x['audio_length'] = b.get('audio_length'); x['language'] = b.get('language')
    x['genres'] = [g['name'] for g in b.get('genres',[])]; x['kinds'] = [g['name'] for g in b.get('kinds',[])]; x['epochs'] = [g['name'] for g in b.get('epochs',[])]
    x['cover_thumb'] = b.get('cover_thumb'); x['translators'] = [t['name'] for t in b.get('translators',[])]
    x['mp3_tracks'] = [{"name": m.get('name'), "url": m['url']} for m in b.get('media',[]) if m.get('type')=='mp3']
    x['parent'] = (b.get('parent') or {}).get('title') if b.get('parent') else None
    time.sleep(0.12)
json.dump(d, open("results/wolnelektury.json","w"), ensure_ascii=False, indent=1)
import collections
print(collections.Counter(g for x in d for g in x['genres']).most_common(25))
print(collections.Counter(x['language'] for x in d))
print([ (x['title'], x['audio_length']) for x in d[:5]])
print(sum(1 for x in d if x['parent']), 'with parent')
