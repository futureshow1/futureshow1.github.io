import json, subprocess, sys
chans = {"bajka_muzyczna":"https://www.youtube.com/channel/UCbiL0CBWHGEf2v70pewtpeg","jungowska":"https://www.youtube.com/channel/UCUXGa201NI6NgvI0zjNBICA/videos",
 "siedmiorog":"https://www.youtube.com/channel/UCBBNmoRfkrfHHMaXwrMMahQ/videos","minimini":"https://www.youtube.com/channel/UCkfu4V9H38WsRr67Yb8I0SA/search?query=słuchowisko",
 "soundsitive":"https://www.youtube.com/channel/UCFe9I0rspyRZheM8ndcjIuQ/videos","estrada":"https://www.youtube.com/channel/UCbnbuUUq8dDuN-rlvZ76XaQ/videos",
 "bajkowisko":"https://www.youtube.com/@Bajkowisko/videos","audioteka":"https://www.youtube.com/channel/UCVjI9qa2ETvjiXPggoKJFsA/videos","empikgo":"https://www.youtube.com/channel/UCS324MkW7mNjFqyFE_n313A/videos",
 "polskieradio_dzieciom":"https://www.youtube.com/@PolskieRadioDzieciom/videos","teatrpr":"https://www.youtube.com/@TeatrPolskiegoRadia/videos"}
out = {}
for k,u in chans.items():
    try:
        r = subprocess.run(["yt-dlp","--flat-playlist","-J","--playlist-end","400","--extractor-args","youtube:player_client=web_safari",u],capture_output=True,text=True,timeout=300)
        d = json.loads(r.stdout)
        ents = []
        def walk(e):
            for x in (e.get("entries") or []):
                if x and x.get("entries"): walk(x)
                elif x and x.get("id"): ents.append({"id":x["id"],"title":x.get("title"),"duration":x.get("duration"),"views":x.get("view_count"),"channel":x.get("channel") or d.get("channel") or d.get("title")})
        walk(d)
        out[k] = {"channel": d.get("channel") or d.get("title"), "channel_url": u, "videos": ents}
        print(k, len(ents), file=sys.stderr)
    except Exception as e:
        print("ERR",k,e, r.stderr[-300:] if 'r' in dir() else '', file=sys.stderr)
json.dump(out, open("results/yt_channels.json","w"), ensure_ascii=False, indent=1)
