import json, sys, re
src, dst = sys.argv[1], sys.argv[2]
texts = []
for line in open(src, encoding="utf-8"):
    try: m = json.loads(line)
    except Exception: continue
    def walk(o):
        if isinstance(o, dict):
            if o.get("type") == "text" and isinstance(o.get("text"), str): texts.append(o["text"])
            for v in o.values(): walk(v)
        elif isinstance(o, list):
            for v in o: walk(v)
    walk(m)
rows = []
for t in texts:
    for l in t.splitlines():
        l = l.strip()
        if l.startswith("{") and l.endswith("}"):
            try: rows.append(json.loads(l))
            except Exception: pass
seen = set(); out = []
for r in rows:
    if r.get("url") and r["url"] not in seen: seen.add(r["url"]); out.append(r)
with open(dst, "w", encoding="utf-8") as f:
    for r in out: f.write(json.dumps(r, ensure_ascii=False) + "\n")
print(len(out), "rows ->", dst)
