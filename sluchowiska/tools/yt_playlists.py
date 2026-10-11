import json, subprocess, sys
pls = ["PL73DdwzTctMr3UEYGNozaJIU8MT96hp2H","PLAypxzmTECsst50ITRT9n68G_l29U0QVi","PLCoPMdevokxdLaes9bkcsJqTxzatqiKe-","PLGGZZ8ZTwmkWAPCch068Kvfu54cDRnM_7",
"PLOqZg-m3ha6-AyQqdAmPVFeQRdBO4MJxb","PLVUjIZ__vGl0aYoSkVa7KdGOpI6xr2Omg","PLVdlQ_wRDQwm45pXVaQHwnc7XB57Ws9Ej","PLjBlukzpPrhXBO1J679j2dGAkaaMqiBF0",
"PLkl5Z1laQh-SGjHQvgoSpsmSOwkOYoONw","PLxBTsZ-Fcg_Qs8ngRNKImoDPzb6TskWTh","PLE4FpqVp-A-pcNYis4S-i2vGEUJy7jyaj","PLk0BCOoOlK0WaeQcJ22xfU8CchncXFPmS",
"PLdQGNccsj4-7kf3gXZFWd7CU6iiBi8aHm","PLVAA6ukztaDS9bsl9z8cXgn7t8XWWDWAO","PLKIJEOImn8JmZTDsIKAwgNulntIBcObRm","PLdSxj9FNA1z0jZCSbIcSJNSNALIhoPGyc"]
chans = {"bajkigrajki":"https://www.youtube.com/channel/UCI5RvCm3eK86G8zq65CCcvw/videos","dymna_topic":"https://www.youtube.com/channel/UCib0I78q_m8TUYPU7r-rtPg","zborowski_topic":"https://www.youtube.com/channel/UCqT2TCkHwiQyzuscIOT0c4g"}
def dump(u):
    r = subprocess.run(["yt-dlp","--flat-playlist","-J","--playlist-end","300","--extractor-args","youtube:player_client=web_safari",u],capture_output=True,text=True,timeout=300)
    d = json.loads(r.stdout); ents=[]
    def walk(e):
        for x in (e.get("entries") or []):
            if x and x.get("entries"): walk(x)
            elif x and x.get("id"): ents.append({"id":x["id"],"title":x.get("title"),"duration":x.get("duration"),"channel":x.get("channel") or x.get("uploader"),"channel_id":x.get("channel_id")})
    walk(d); return d.get("title"), ents
out = {"playlists":{}, "channels":{}}
for p in pls:
    try: t,e = dump(f"https://www.youtube.com/playlist?list={p}"); out["playlists"][p]={"title":t,"videos":e}; print(p,t,len(e),file=sys.stderr)
    except Exception as ex: print("ERR",p,ex,file=sys.stderr)
for k,u in chans.items():
    try: t,e = dump(u); out["channels"][k]={"title":t,"url":u,"videos":e}; print(k,t,len(e),file=sys.stderr)
    except Exception as ex: print("ERR",k,ex,file=sys.stderr)
json.dump(out, open("results/yt_playlists.json","w"), ensure_ascii=False, indent=1)
