import json, subprocess, sys
queries = ["słuchowisko dla dzieci", "słuchowisko bajka Polskie Radio Dzieciom", "Bajki-Grajki słuchowisko", "Teatr Polskiego Radia słuchowisko dla dzieci",
 "Polskie Nagrania bajka słuchowisko", "Akademia Pana Kleksa słuchowisko", "Koziołek Matołek słuchowisko", "Kubuś Puchatek słuchowisko polskie",
 "Dzieci z Bullerbyn słuchowisko", "Baśnie Andersena słuchowisko", "Pchła Szachrajka słuchowisko", "słuchowisko dla dzieci teatr 2020",
 "bajka muzyczna słuchowisko Polskie Nagrania", "O krasnoludkach i sierotce Marysi słuchowisko", "Mikołajek słuchowisko", "Plastusiowy pamiętnik słuchowisko",
 "Muminki słuchowisko", "Pippi słuchowisko", "Przygody Tomka Sawyera słuchowisko", "Bajkowa Jedynka słuchowisko", "Polskie Radio Dzieciom bajka na dobranoc",
 "Teatr Groteska słuchowisko", "słuchowisko dla dzieci audiobook pełna wersja", "Jan Brzechwa słuchowisko", "Julian Tuwim słuchowisko dla dzieci",
 "Hobbit słuchowisko Polskie Radio", "Opowieści z Narnii słuchowisko", "Mały Książę słuchowisko", "Pinokio słuchowisko", "Alicja w Krainie Czarów słuchowisko"]
seen = {}
for q in queries:
    try:
        r = subprocess.run(["yt-dlp","--flat-playlist","-J","--extractor-args","youtube:player_client=web_safari",f"ytsearch40:{q}"],capture_output=True,text=True,timeout=180)
        d = json.loads(r.stdout)
    except Exception as e:
        print("ERR",q,e,file=sys.stderr); continue
    for e in d.get("entries") or []:
        if not e or not e.get("id"): continue
        x = seen.setdefault(e["id"], {"id":e["id"],"title":e.get("title"),"channel":e.get("channel") or e.get("uploader"),"channel_id":e.get("channel_id"),
            "duration":e.get("duration"),"views":e.get("view_count"),"url":f"https://www.youtube.com/watch?v={e['id']}","queries":[]})
        x["queries"].append(q)
    print(q, len(d.get("entries") or []), file=sys.stderr)
json.dump(list(seen.values()), open("results/yt_scan.json","w"), ensure_ascii=False, indent=1)
print(len(seen), file=sys.stderr)
