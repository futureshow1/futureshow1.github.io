// Buduje wspólny indeks Pagefind dla całego Streamu: 6 portali streamingowych (data.js) + karty hubu (P w index.html).
// Portale renderują treść z JS, więc crawler Pagefind nic by nie zobaczył — dlatego rekordy dodajemy wprost (addCustomRecord).
// Uruchom: cd futureshow/tools/search && node build_search.mjs   → zapisuje ../../pagefind/
import * as pagefind from "pagefind";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, "../..");          // futureshow/
const SRC = path.resolve(SITE, "..");              // inne projekty/
const read = p => readFileSync(p, "utf8");
const jsonArray = (js, startRe) => { const i = js.search(startRe); const a = js.indexOf("[", i); let d = 0; for (let j = a; j < js.length; j++) { if (js[j] === "[") d++; else if (js[j] === "]" && --d === 0) return JSON.parse(js.slice(a, j + 1)); } };

const PORTALS = [
  { dir: "kino-nieme",            url: "https://futureshow.pl/kino-nieme/",        name: "Kino nieme",          name_en: "Silent Cinema",       hash: "#film=",    typ: "film" },
  { dir: "historia-animacji",     url: "https://futureshow.pl/historia-animacji/", name: "Historia animacji",   name_en: "Animation: A History", hash: "#film=",   typ: "film" },
  { dir: "awangarda-kino-portal", url: "https://futureshow.pl/kino-awangardy/",    name: "Kino awangardy",      name_en: "Avant-garde Cinema",  hash: "#film=",    typ: "film" },
  { dir: "dobranocki",            url: "https://futureshow.pl/dobranocki/",        name: "Dobranocki",          name_en: "Bedtime Legends",     hash: "#odcinek=", typ: "dobranocka" },
];
const { index } = await pagefind.createIndex({ keepIndexUrl: true });
let n = 0;
const add = async r => { const res = await index.addCustomRecord({ language: "pl", ...r }); if (res.errors?.length) console.error(res.errors); else n++; };
const clean = s => (s || "").toString().replace(/\s+/g, " ").trim();

for (const p of PORTALS) {
  const films = jsonArray(read(path.join(SRC, p.dir, "data.js")), /window\.FILMS\s*=/);
  for (const f of films) {
    const title = clean(f.film) + (f.year ? ` (${f.year})` : "");
    await add({
      url: p.url + p.hash + encodeURIComponent(f.id),
      content: [f.film, f.artist, f.section, f.year, f.note, f.country, f.type === "fragment" ? "fragment" : f.type === "documentary" ? "dokument documentary" : ""].map(clean).filter(Boolean).join(". "),
      meta: { title, portal: p.name, portal_en: p.name_en, creator: clean(f.artist), section: clean(f.section), year: String(f.year || ""), image: f.thumbnail || "", url_en: p.url + "en/" + p.hash + encodeURIComponent(f.id) },
      filters: { portal: [p.name], typ: [p.typ] },
      sort: { year: String(f.year || 9999) },
    });
  }
  console.error(p.dir, films.length);
}

// Polski Jazz
{
  const js = read(path.join(SRC, "polski-jazz", "data.js"));
  const albums = jsonArray(js, /const ALBUMS\s*=/);
  for (const a of albums) {
    await add({
      url: "https://futureshow.pl/polski-jazz/#a-" + a.k,
      content: [a.a, a.t, a.y, a.vol, a.label, a.desc, a.desc_en].map(clean).filter(Boolean).join(". "),
      meta: { title: `${clean(a.a)} — ${clean(a.t)} (${a.y})`, portal: "Polski Jazz", portal_en: "Polish Jazz", creator: clean(a.a), section: clean(a.vol || ""), year: String(a.y || ""), image: a.cover ? `https://futureshow.pl/polski-jazz/covers/${a.k}.jpg` : "", url_en: "https://futureshow.pl/polski-jazz/?lang=en#a-" + a.k },
      filters: { portal: ["Polski Jazz"], typ: ["płyta"] }, sort: { year: String(a.y || 9999) },
    });
  }
  console.error("polski-jazz", albums.length);
}

// Słuchowiska
{
  const js = read(path.join(SRC, "sluchowiska-dla-dzieci", "data.js"));
  const secs = Object.fromEntries(jsonArray(js, /window\.SECTIONS\s*=/).map(s => [s.id, s]));
  const items = jsonArray(js, /window\.ITEMS\s*=/);
  for (const i of items) {
    const sec = secs[i.section] || {};
    await add({
      url: "https://futureshow.pl/sluchowiska/#" + encodeURIComponent(i.section || ""),
      content: [i.title, i.title_en, i.author, i.director, Array.isArray(i.performers) ? i.performers.join(", ") : (i.performers || ""), sec.title, i.note, i.note_en, i.age ? `wiek ${i.age}` : "", i.lang].map(clean).filter(Boolean).join(". "),
      meta: { title: clean(i.title) + (i.year ? ` (${i.year})` : ""), portal: "Słuchowiska dla dzieci", portal_en: "Audio stories for children", creator: clean(i.author), section: clean(sec.title || ""), year: String(i.year || ""), image: i.cover || "", url_en: "https://futureshow.pl/sluchowiska/en/#" + encodeURIComponent(i.section || "") },
      filters: { portal: ["Słuchowiska"], typ: ["audio"] }, sort: { year: String(i.year || 9999) },
    });
  }
  console.error("sluchowiska", items.length);
}

// Karty hubu (projekty)
{
  const html = read(path.join(SITE, "index.html"));
  const a = html.indexOf("const P = {"); const b = html.indexOf("\n};", a);
  const BASE = "https://futureshow.pl/";
  const P = new Function("BASE", html.slice(a, b + 3).replace("const P = ", "return ") )(BASE);
  const ASSET = "https://futureshow.pl/stream/assets/";
  let k = 0;
  for (const [key, p] of Object.entries(P)) {
    if (!p.link || key.startsWith("v_") || ["zem","emfazy","aferymock","matrycamock"].includes(key)) continue;
    await add({
      url: p.link,
      content: [p.t, p.t_en, p.kick?.pl, p.kick?.en, p.d?.pl, p.d?.en, (p.stats || []).join(", ")].map(clean).filter(Boolean).join(". "),
      meta: { title: clean(p.t), portal: "Projekty FutureShow", portal_en: "FutureShow projects", creator: "", section: clean(p.kick?.pl || ""), year: String(p.year || ""), image: ASSET + key + "-p.jpg", url_en: p.link_en || p.link },
      filters: { portal: ["Projekty"], typ: ["projekt"] }, sort: { year: String(p.year || 9999) },
    });
    k++;
  }
  console.error("hub", k);
}

const out = path.join(SITE, "pagefind");
const w = await index.writeFiles({ outputPath: out });
if (w.errors?.length) console.error(w.errors);
await pagefind.close();
console.error(`OK: ${n} rekordów → ${out}`);
