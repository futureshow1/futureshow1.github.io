import json, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
ids = [l.strip() for l in open(sys.argv[1]) if l.strip()]
def meta(i):
    try:
        r = subprocess.run(["yt-dlp","-J","--no-download","--ignore-no-formats-error","--no-update","--extractor-args","youtube:player_client=web_safari",f"https://www.youtube.com/watch?v={i}"],capture_output=True,text=True,timeout=120)
        d = json.loads(r.stdout)
        return {k: d.get(k) for k in ["id","title","channel","channel_id","duration","album","artist","track","release_year","upload_date","view_count","playable_in_embed","availability"]}
    except Exception as e:
        return {"id": i, "err": str(e)[:100]}
with ThreadPoolExecutor(8) as ex:
    rows = list(ex.map(meta, ids))
with open(sys.argv[2], "w") as f:
    for r in rows: f.write(json.dumps(r, ensure_ascii=False) + "\n")
import collections
print(len(rows), "errors:", sum(1 for r in rows if r.get("err")))
print(collections.Counter(r.get('channel') for r in rows).most_common())
print(collections.Counter(r.get('album') for r in rows).most_common(40))
