import json, re, collections
rows = [json.loads(l) for l in open("results/agent_pr.jsonl", encoding="utf-8")]
rows = [r for r in rows if r.get("lang") == "pl" and "ninateka" not in r["url"]]
# serie z mp3 → jedna karta z listą utworów
SERIES = [
 (r"^Przygody Przyjaciół, odc\. (\d+): (.*)", "Przygody Przyjaciół", {"author":"Polskie Radio Dzieciom","age":"5-10","year":2017,"note":"Serial słuchowiskowy Polskiego Radia Dzieciom w 32 odcinkach (2017): Miś Michaś, Smok Adaś i przyjaciele.","url":"https://www.polskieradio.pl/dzieci/audycje/sluchowisko-przygody-przyjaciol-audycja-archiwalna,5995"}),
 (r"^Kajtuś Czarodziej, odc\. (\d+)", "Kajtuś Czarodziej", {"author":"Janusz Korczak / adapt. Hanna Bielawska","age":"6-12","year":1993,"director":"Janusz Kukuła","note":"Słuchowisko Teatru Polskiego Radia z 1993 r. w 12 odcinkach — z archiwum audycji Polskiego Radia Dzieciom.","url":"https://www.polskieradio.pl/dzieci/audycje/sluchowisko-audycja-archiwalna,4473"}),
 (r"^Pinokio, cz\. (\d+)", "Pinokio", {"author":"Carlo Collodi / adapt. Hanna Bielawska","age":"5-10","year":2001,"note":"Słuchowisko Teatru Polskiego Radia z 2001 r. w 13 częściach.","url":"https://www.polskieradio.pl/dzieci/audycje/sluchowisko-audycja-archiwalna,4473"}),
 (r"^Przygoda Niepyłki i Apolinki, cz\. (\d+)", "Przygoda Niepyłki i Apolinki", {"author":"Polskie Radio Dzieciom","age":"4-8","year":2020,"note":"Serial w 5 częściach (grudzień 2020).","url":"https://www.polskieradio.pl/dzieci/audycje/sluchowisko-audycja-archiwalna,4473"}),
 (r"^Przygoda wielka Rysia Pędzelka, odc\. (\d+)", "Przygoda wielka Rysia Pędzelka", {"author":"Polskie Radio Dzieciom z Bieszczadzkim Parkiem Narodowym","age":"4-9","year":2019,"note":"„Dzikie słuchowisko” w 5 odcinkach — ryś z Bieszczadów.","url":"https://www.polskieradio.pl/dzieci/audycje/sluchowisko-audycja-archiwalna,4473"}),
 (r"^Wakacje z duchami: „(.*)”", "Wakacje z duchami", {"author":"Polskie Radio Dzieciom","age":"7-12","year":2026,"note":"Wakacyjny cykl 2026 o legendach i wierzeniach — tu 4 z 27 odcinków.","url":"https://www.polskieradio.pl/dzieci/audycje/wakacje-z-duchami,11897","type":"czytanie"}),
]
SERIES_PAGE = [  # serie podcastowe (bez mp3) → jedna karta-link
 (r"^Historia zaklęta w koronie\. Piastowie – (\d+) – (.*)", "Historia zaklęta w koronie. Piastowie", {"author":"Polskie Radio Dzieciom","age":"8-13","year":2025,"note":"Fabularyzowany cykl historyczny w 6 odcinkach, nominacja Podcast Roku 2026.","url":"https://www.polskieradio.pl/podcasty/historia-zakleta-w-koronie-piastowie"}),
 (r"^Miś i Smok\. Strażnicy Bajek – (\d+) – (.*)", "Miś i Smok. Strażnicy Bajek", {"author":"Polskie Radio Dzieciom wg baśni klasycznych","age":"3-8","year":2025,"note":"10 odcinków: Miś Michaś i Smok Adaś w baśniach Andersena, Grimm, Perraulta i Makuszyńskiego.","url":"https://www.polskieradio.pl/podcasty/mis-i-smok-straznicy-bajek"}),
 (r"^Opowieści gołębicy Guidonii – (\d+) – (.*)", "Opowieści gołębicy Guidonii", {"author":"Polskie Radio Dzieciom","age":"5-10","year":2024,"note":"Fabularyzowany cykl 8 odcinków — baśnie świata.","url":"https://www.polskieradio.pl/podcasty/opowiesci-golebicy-guidonii"}),
 (r"^Wehikuł czasu Smoka i Misia – (\d+) – (.*)", "Wehikuł czasu Smoka i Misia", {"author":"Polskie Radio Dzieciom","age":"5-10","year":2024,"note":"14 odcinków podróży w czasie: piramidy, wikingowie, Mieszko, żubry.","url":"https://www.polskieradio.pl/podcasty/wehikul-czasu-smoka-i-misia"}),
 (r"^Zaczarowany ogródek Smoka i Misia – (\d+) – (.*)", "Zaczarowany ogródek Smoka i Misia", {"author":"Polskie Radio Dzieciom","age":"4-9","year":2025,"note":"10 odcinków o ogrodzie i przyrodzie.","url":"https://www.polskieradio.pl/podcasty/zaczarowany-ogrodek-smoka-i-misia"}),
 (r"^Opowieści ludów świata – (\d+) – (.*)", "Opowieści ludów świata", {"author":"baśnie ludowe w opracowaniu Polskiego Radia Dzieciom","age":"5-11","year":2023,"note":"57 odcinków baśni i legend z całego świata, z udźwiękowieniem i muzyką.","url":"https://www.polskieradio.pl/podcasty/opowiesci-ludow-swiata","type":"czytanie"}),
 (r"^(Czy ptaki mają|Jak zabawki z choinki|Magiczna kukułka|Muminki odkrywają|O istocie świąt|Pierniczkowe)", "Wigilijne historie sprzed lat", {"author":"Polskie Radio Dzieciom (archiwum)","age":"4-10","year":2025,"note":"6 archiwalnych bożonarodzeniowych audycji fabularnych.","url":"https://www.polskieradio.pl/podcasty/wigilijne-historie-sprzed-lat"}),
 (r"^Wakacje z duchami", None, {}),
]
BAJKI_DZIECI = {"author":"opowiadają dzieci z przedszkoli i szkół","age":"3-8","year":2020,"note":"Cykl 15 odcinków: baśnie klasyczne opowiadane przez dzieci, udźwiękowione przez Polskie Radio Dzieciom.","url":"https://www.polskieradio.pl/podcasty/bajki-opowiadane-przez-dzieci","type":"czytanie"}
groups = collections.OrderedDict(); singles = []
for r in rows:
    done = False
    for pat, name, meta in SERIES:
        m = re.match(pat, r["title"])
        if m and r["url"].endswith(".mp3"):
            g = groups.setdefault(name, {"meta": meta, "tracks": []}); g["tracks"].append({"name": m.group(2) if m.lastindex and m.lastindex >= 2 else r["title"], "url": r["url"]}); done = True; break
    if done: continue
    for pat, name, meta in SERIES_PAGE:
        m = re.match(pat, r["title"])
        if m:
            if name: g = groups.setdefault(name, {"meta": meta, "tracks": [], "eps": []}); g["eps"].append(r["title"])
            done = True; break
    if done: continue
    if "Bajki opowiadane przez dzieci" in r.get("source", ""):
        g = groups.setdefault("Bajki opowiadane przez dzieci", {"meta": BAJKI_DZIECI, "tracks": [], "eps": []}); g["eps"].append(r["title"]); continue
    if "Seniorzy czytają" in r.get("source", ""):
        g = groups.setdefault("Seniorzy czytają dzieciom", {"meta": {"author":"Radio Kraków — seniorzy z krakowskiego Centrum Aktywności Seniorów","age":"4-12","year":2021,"note":"21 nagrań akcji Radia Kraków: seniorzy czytają baśnie i fragmenty lektur. Tu 18 z nich.","url":"https://www.radiokrakow.pl/nasze-akcje/seniorzyczytaja-dzieciom","type":"czytanie","source":"Radio Kraków"}, "tracks": []})
        g["tracks"].append({"name": r["title"] + " — " + (re.search(r"Czyta ([^;]+)", r.get("note","")) or [None, ""])[1], "url": r["url"]}); continue
    if "Książka do poduszki" in r.get("source", "") or "Jedynka dzieciom" in r.get("source", ""):
        g = groups.setdefault("Książka do poduszki / Jedynka dzieciom — czytania", {"meta": {"author":"Saint-Exupéry, Romaniuk, Samojlik, Wierzbicka, Kasprzak","age":"5-12","year":2021,"note":"Pierwsze odcinki czytań z archiwum Polskiego Radia Dzieciom i Jedynki; pozostałe części na stronie cyklu.","url":"https://www.polskieradio.pl/dzieci/audycje/ksiazka-do-poduszki-audycja-archiwalna,8290","type":"czytanie"}, "tracks": []})
        g["tracks"].append({"name": r["title"] + " — " + r["author"], "url": r["url"]}); continue
    singles.append(r)
out = []
def src_of(r): 
    s = r.get("source", "")
    if "Teatr Polskiego Radia" in s: return "Teatr Polskiego Radia"
    if "RDC" in s: return "Radio RDC"
    if "Radio Kraków" in s: return "Radio Kraków"
    if "Jedynka" in s: return "Polskie Radio Jedynka"
    if "Polskie Radio – podcast" in s: return "Polskie Radio (podcasty)"
    if "YouTube" in s: return "Polskie Radio (YouTube)"
    return "Polskie Radio Dzieciom"
for name, g in groups.items():
    m = g["meta"]; e = {"section":"polskie-radio","title":name,"author":m.get("author"),"source":m.get("source","Polskie Radio Dzieciom"),"type":m.get("type","sluchowisko"),"age":m.get("age"),"year":m.get("year"),"director":m.get("director"),"note":m.get("note"),"url":m["url"]}
    if g["tracks"]: e["mp3"] = g["tracks"][0]["url"]; e["tracks"] = g["tracks"]; e["parts"] = len(g["tracks"])
    else: e["parts"] = len(g["eps"]); e["note"] = (e["note"] or "") + " Odcinki: " + "; ".join(x.split(" – ")[-1] for x in g["eps"][:10]) + "."
    out.append(e)
eko = [r for r in singles if r["title"].startswith("EKO UFO")]
if eko:
    out.append({"section":"polskie-radio","title":"EKO UFO","author":"Polskie Radio Dzieciom / Teatr Polskiego Radia","source":"Polskie Radio Dzieciom","type":"sluchowisko","age":"5-10","year":2023,"director":"Adam Wojtyszko","parts":3,"url":eko[0]["url"],"note":"Trzyczęściowe słuchowisko o kosmicznej przygodzie dziewczynki i Astrusia; obsada: Sara Lityńska, Joanna Pach-Żbikowska, Magdalena Dębicka, Krzysztof Szczepaniak. Części 2 i 3 w podcaście RADIO BAJKI."})
for r in singles:
    if "Casting na mumię" in r["title"] or r["title"].startswith("EKO UFO"): continue
    if r["title"] in ("Przygoda Niepyłki i Apolinki [całość]", "Przygoda wielka Rysia Pędzelka [całość]", "Podróżniczek i gniazdo lodowego władcy [całość]"): continue
    e = {"section":"polskie-radio","title":re.sub(r"\s*\[całość\]","",r["title"]),"author":r.get("author"),"source":src_of(r),"type":"sluchowisko" if r.get("type")=="sluchowisko" else "czytanie" if r.get("type")=="czytanie" else "podcast","age":r.get("age"),"year":r.get("year"),"note":r.get("note"),"url":r["url"],"duration":r.get("duration")}
    if r["url"].endswith(".mp3"): e["mp3"] = r["url"]
    out.append(e)
json.dump(out, open("tools/curated_pr.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(out)); [print(" ", e["title"][:60], "|", e["source"], "|", e.get("parts",""), "|", "mp3" if e.get("mp3") else "link") for e in out]
