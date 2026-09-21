/* Na wszelki wypadek — poradnik bezpieczeństwa w telefonie (faza testowa).
   Jedno źródło treści: ./data/poradnik-pl.json (kopia dane/poradnik-pl.json, patrz sync.sh). Bez builda, bez serwera, bez kont.
   Stan (profil, odhaczenia, plan) tylko w localStorage tego urządzenia. Ikony: Tabler Icons (MIT), sprite ./icons.svg. */
(() => {
  'use strict';
  const APP = { name: 'Na wszelki wypadek', version: '0.3.0', dataUrl: './data/poradnik-pl.json', iconsUrl: './icons.svg', pdf: 'https://www.gov.pl/web/poradnikbezpieczenstwa' };
  const STORE_PREFIX = 'nww:';
  // Bramka wersji testowej (zasłona przed przypadkowym wejściem, nie zabezpieczenie): SHA-256 hasła, zapamiętane w tym telefonie.
  const GATE = { hash: '37617acb853dbcc2c41c582625c955902c90d8dc91dcf2e25de5bac55b83a9ae', key: 'gate', skipHosts: ['localhost', '127.0.0.1'] };

  // ---------- narzędzia ----------
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ic = (n, cls = '') => `<svg class="ic ${cls}" aria-hidden="true" focusable="false"><use href="#i-${n}"></use></svg>`;
  // odmiana liczebnika: odm(5, ['zadanie', 'zadania', 'zadań']) → "5 zadań"
  function odm(n, [j, m, w]) {
    n = Math.abs(n); const r = n % 10, r100 = n % 100;
    if (n === 1) return `${n} ${j}`;
    if (r >= 2 && r <= 4 && !(r100 >= 12 && r100 <= 14)) return `${n} ${m}`;
    return `${n} ${w}`;
  }
  const CYKL = { 'miesiąc': 'co miesiąc', 'kwartał': 'co kwartał', 'pół roku': 'co pół roku', 'rok': 'co rok', '10 lat': 'co 10 lat' };
  const CYKL_DNI = { 'miesiąc': 30, 'kwartał': 91, 'pół roku': 182, 'rok': 365, '10 lat': 3650 };
  let zapisDziala = true;
  function brakZapisu() {
    if (!zapisDziala) return;
    zapisDziala = false;
    const p = document.createElement('p'); p.className = 'card warn wrap no-print'; p.setAttribute('role', 'alert');
    p.textContent = 'Nie udało się zapisać danych w pamięci telefonu (np. tryb prywatny albo pełna pamięć). To, co wpiszesz, zniknie po zamknięciu aplikacji. Wydrukuj plan albo zapisz kopię do pliku (Więcej → O aplikacji).';
    document.querySelector('main')?.before(p);
  }
  const store = {
    get(k, def) { try { const v = localStorage.getItem(STORE_PREFIX + k); return v ? JSON.parse(v) : def; } catch { return def; } },
    set(k, v) { try { localStorage.setItem(STORE_PREFIX + k, JSON.stringify(v)); return true; } catch { brakZapisu(); return false; } },
    clear() { try { Object.keys(localStorage).filter(k => k.startsWith(STORE_PREFIX) && k !== STORE_PREFIX + GATE.key).forEach(k => localStorage.removeItem(k)); } catch { } }
  };
  const telHref = nr => 'tel:' + String(nr).replace(/\s+/g, '');
  const fmtDate = iso => { try { return new Date(iso).toLocaleDateString('pl-PL'); } catch { return ''; } };
  const strona = n => n ? `<span class="src">s. ${esc(n)}</span>` : '';
  const url = u => /^https?:\/\//.test(u) ? u : 'https://' + u;
  async function sha256(s) { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }

  // ---------- profil domu ----------
  const PROFIL = [
    { k: 'rodzic', q: 'W domu są dzieci' },
    { k: 'opiekun', q: 'Opiekuję się seniorem lub osobą, która potrzebuje szczególnej pomocy' },
    { k: 'właściciel zwierzęcia', q: 'Mam zwierzę domowe' },
    { k: 'rolnik', q: 'Mam zwierzęta gospodarskie lub gospodarstwo' },
    { k: 'kierowca', q: 'Korzystam z samochodu' },
    { k: 'uczeń', q: 'Uczę się lub studiuję' },
    { k: 'pracownik', q: 'Pracuję' },
    { k: 'pracodawca', q: 'Zatrudniam ludzi' },
    { k: 'rezerwista', q: 'Mam kartę mobilizacyjną lub jestem żołnierzem rezerwy' },
  ];

  // ---------- stan ----------
  let D = null;
  let profil = store.get('profil', null);              // null = nieustawiony (pokazujemy wszystko)
  let pokazWszystkie = store.get('pokazWszystkie', false);
  let zrobione = store.get('zrobione', {});             // id → data ISO
  let plan = store.get('plan', {});                     // idFormularza → { klucz → wartość }
  let komunikatO = '';                                  // jednorazowy komunikat na ekranie „O aplikacji”
  const app = document.getElementById('app');
  const statusEl = document.getElementById('status');
  function oglos(msg) { if (!statusEl) return; statusEl.textContent = ''; setTimeout(() => { statusEl.textContent = msg; }, 30); }

  const pasuje = z => !profil || z.dla === 'wszyscy' || !!profil[z.dla];
  const widoczne = z => pokazWszystkie || pasuje(z);
  const ODHACZALNE = z => z.typ !== 'reakcja';                                   // „reakcja” to instrukcja na czas zdarzenia, nie zadanie
  const ZAWCZASU = z => z.typ === 'jednorazowe' || z.typ === 'cykliczne';        // zadania do zrobienia przed zdarzeniem
  function stan(z) {
    const t = zrobione[z.id]; if (!t) return { done: false };
    const dni = CYKL_DNI[z.cykl]; const wiek = (Date.now() - new Date(t).getTime()) / 864e5;
    return { done: true, data: t, powtorz: !!dni && wiek > dni };
  }
  const modul = id => D.moduly.find(m => m.id === id);
  const modFaza = f => D.moduly.filter(m => m.faza === f);
  // Ekran Przygotowanie: rozdziały przygotowawcze w całości + zadania „zawczasu” z rozdziałów o reagowaniu
  function modulyPrzygotowania() {
    const przyg = modFaza('przygotowanie');
    const zReag = modFaza('reagowanie').map(m => ({ ...m, zadania: m.zadania.filter(ZAWCZASU), pochodny: true })).filter(m => m.zadania.length);
    return [...przyg, ...zReag];
  }
  const zadaniaDoZrobienia = () => [...modulyPrzygotowania(), modul('plan')].filter(Boolean).flatMap(m => m.zadania).filter(z => widoczne(z) && ODHACZALNE(z));
  const zrobioneZ = zs => zs.filter(z => { const s = stan(z); return s.done && !s.powtorz; }).length;
  const ikonaMod = m => ic(m.id, 'mod');

  // ---------- routing ----------
  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    const [tab, id] = h.split('/');
    return { tab: tab || 'przygotowanie', id: id || null };
  }
  function render(opts = {}) {
    if (!D) return;
    const { tab, id } = route();
    const otwarte = opts.keep ? [...app.querySelectorAll('details.mod[open]')].map(d => d.id) : [];
    const y = window.scrollY;
    const fokus = opts.keep ? document.activeElement?.dataset?.task : null;
    const views = { przygotowanie: vPrzygotowanie, reagowanie: () => vReagowanie(id), plan: vPlan, wiecej: () => vWiecej(id) };
    const view = views[tab] ? tab : 'przygotowanie';
    app.innerHTML = views[view]();
    document.querySelectorAll('.tabs a').forEach(a => { if (a.dataset.tab === view) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    if (opts.keep) {
      otwarte.forEach(i => document.getElementById(i)?.setAttribute('open', ''));
      window.scrollTo(0, y);
      if (fokus) app.querySelector(`input[data-task="${CSS.escape(fokus)}"]`)?.focus();
      return;
    }
    const cel = (view === 'przygotowanie' && id) ? document.getElementById('mod-' + id) : null;
    if (cel) { cel.open = true; cel.scrollIntoView(); } else window.scrollTo(0, 0);
  }

  // ---------- widok: Przygotowanie ----------
  const badgeDla = z => z.dla && z.dla !== 'wszyscy' ? `<span class="badge info">${esc(z.dla)}</span>` : '';
  function taskLi(z) {
    if (!widoczne(z)) return '';
    const meta = [];
    if (z.typ === 'cykliczne' && z.cykl) meta.push(`<span class="badge">przypomnienie: ${esc(CYKL[z.cykl] || z.cykl)}</span>`);
    else if (z.typ === 'wiedza') meta.push(`<span class="badge info">warto wiedzieć</span>`);
    else if (z.typ === 'reakcja') meta.push(`<span class="badge info">w sytuacji zagrożenia</span>`);
    meta.push(badgeDla(z));
    if (!ODHACZALNE(z)) {
      meta.push(strona(z.strona));
      return `<li><div class="task info"><span class="ico" aria-hidden="true">›</span><span class="txt">${esc(z.tekst)}<span class="meta">${meta.join('')}</span></span></div></li>`;
    }
    const s = stan(z);
    const cls = ['task', s.done ? 'done' : '', s.powtorz ? 'repeat' : ''].join(' ');
    if (s.powtorz) meta.push(`<span class="badge warn">do powtórzenia (zrobione ${fmtDate(s.data)})</span>`);
    else if (s.done) meta.push(`<span class="muted">zrobione ${fmtDate(s.data)}</span>`);
    meta.push(strona(z.strona));
    return `<li><label class="${cls}"><input type="checkbox" data-task="${esc(z.id)}" ${s.done && !s.powtorz ? 'checked' : ''} aria-describedby="m-${esc(z.id)}"><span class="txt">${esc(z.tekst)}<span class="meta" id="m-${esc(z.id)}">${meta.join('')}</span></span></label></li>`;
  }
  function modDetails(m, open) {
    const zs = m.zadania.filter(widoczne);
    const doZrob = zs.filter(ODHACZALNE);
    const done = zrobioneZ(doZrob);
    const licznik = doZrob.length ? `${done} z ${odm(doZrob.length, ['zadania', 'zadań', 'zadań'])}` : odm(zs.length, ['informacja', 'informacje', 'informacji']);
    const body = zs.length ? `<ul class="tasks">${zs.map(taskLi).join('')}</ul>` : `<p class="muted">Brak zadań dla Twojego profilu.</p>`;
    const extra = [];
    if (m.zasada) extra.push(`<p class="small"><b>Zasada:</b> ${esc(m.zasada)}</p>`);
    if (!m.pochodny && m.fakty?.length) extra.push(`<h3>Warto wiedzieć</h3><ul class="small">${m.fakty.map(f => `<li>${esc(f)}</li>`).join('')}</ul>`);
    if (m.pochodny) extra.push(`<p class="small"><a href="#/reagowanie/${esc(m.id)}">Co robić w sytuacji zagrożenia: ${esc(m.tytul)}</a></p>`);
    return `<details class="mod" ${open ? 'open' : ''} id="mod-${esc(m.id)}"><summary>${ikonaMod(m)}<span><span class="t">${esc(m.tytul)}</span><br><span class="c">${licznik} · s. ${esc(m.strony)}</span></span></summary><div class="body">${body}${extra.join('')}</div></details>`;
  }
  function vPrzygotowanie() {
    const mods = modulyPrzygotowania();
    const planMod = modul('plan');
    const all = zadaniaDoZrobienia();
    const done = zrobioneZ(all);
    const pct = all.length ? Math.round(done / all.length * 100) : 0;
    const ma = m => m.zadania.some(widoczne);
    const glowne = mods.filter(m => !m.pochodny && ma(m));
    const pochodne = mods.filter(m => m.pochodny && ma(m));
    const ukryte = mods.filter(m => !ma(m));
    const profilCard = profil
      ? `<p class="small muted">Zadania dobrane do Twojego profilu domu. <a href="#/wiecej/profil">Zmień profil</a></p>`
      : `<div class="card warn"><p><b>Ustaw profil domu</b>, żeby widzieć tylko zadania, które Cię dotyczą (dzieci, zwierzęta, auto, praca…). Teraz widzisz wszystkie.</p><a class="btn primary" href="#/wiecej/profil">${ic('user')} Ustaw profil</a></div>`;
    const ukryteTxt = ukryte.length
      ? `<p class="small muted">${ukryte.length === 1 ? 'Pominięty rozdział, który nie dotyczy' : 'Pominięte rozdziały, które nie dotyczą'} Twojego profilu: ${ukryte.map(m => esc(m.tytul)).join(', ')}. <a href="#/wiecej/profil">Zmień profil lub pokaż wszystko</a></p>`
      : (pokazWszystkie && profil ? `<p class="small muted">Pokazujesz wszystkie zadania, także spoza profilu. <a href="#/wiecej/profil">Zmień</a></p>` : '');
    return `
      <section class="card accent"><p class="motto">${esc(D.motto?.tekst || '')}</p>${strona(D.motto?.strona)}</section>
      <section class="card">
        <p><b>Zrobione ${done} z ${odm(all.length, ['zadania', 'zadań', 'zadań'])}</b> <span class="muted">(${pct}%)</span></p>
        <div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Postęp przygotowań"><span style="width:${pct}%"></span></div>
        ${profilCard}
      </section>
      <h2>Przygotowanie</h2>
      <p class="muted small">Odhaczaj to, co naprawdę zrobione. Pozycje „warto wiedzieć” odhacz, gdy je przeczytasz. Terminy „przypomnienie: co kwartał” itp. to nasza podpowiedź, nie zalecenie poradnika; po tym czasie zadanie wraca do zrobienia.</p>
      ${glowne.map(m => modDetails(m, false)).join('')}
      ${ukryteTxt}
      ${pochodne.length ? `<h2>${ic('zawczasu')} Zanim coś się stanie</h2><p class="muted small">Zadania z rozdziałów o reagowaniu, które robi się zawczasu.</p>${pochodne.map(m => modDetails(m, false)).join('')}` : ''}
      ${planMod ? `<h2>${ic('plan')} Plan na kryzys</h2>${modDetails(planMod, false)}<p class="small"><a class="btn block" href="#/plan">${ic('tab-plan')} Wypełnij plan na kryzys</a></p>` : ''}`;
  }

  // ---------- widok: Reagowanie ----------
  function vReagowanie(id) {
    if (id) return vReagowanieModul(id);
    const s = D.sygnaly_alarmowe;
    const mods = modFaza('reagowanie');
    return `
      <section class="card alarm-hero">
        <a class="btn primary big" href="${telHref('112')}">${ic('phone')} Zadzwoń: 112</a>
        <p class="small muted">Jeśli nie możesz zadzwonić, wezwij pomoc przez aplikację Alarm112. <a href="#/wiecej/telefony">Wszystkie telefony</a></p>
      </section>
      <section class="card">
        <h2 class="h-card">${ic('siren')} Sygnały alarmowe ${strona(s.strona)}</h2>
        <div class="sig"><div><b>Ogłoszenie alarmu</b>${esc(s.ogloszenie)}</div><div><b>Odwołanie alarmu</b>${esc(s.odwolanie)}</div></div>
        <p class="small"><b>Gdy usłyszysz sygnał alarmowy:</b> ${esc(s.po_uslyszeniu)}.</p>
        ${s.kanaly?.length ? `<p class="small"><b>Ostrzeżenie może dotrzeć przez:</b> ${s.kanaly.map(k => esc(k)).join(', ')}.</p>` : ''}
      </section>
      <h2>Co robić, gdy…</h2>
      <div class="grid">${mods.map(m => `<a class="btn" href="#/reagowanie/${esc(m.id)}">${ic(m.id, 'big')}<span>${esc(m.tytul)}</span></a>`).join('')}</div>`;
  }
  function vReagowanieModul(id) {
    const m = modul(id);
    if (!m || m.faza !== 'reagowanie') return `<p class="empty">Nie ma takiego rozdziału.</p><a class="back" href="#/reagowanie">‹ Reagowanie</a>`;
    const li = z => `<li>${esc(z.tekst)} ${badgeDla(z)}${strona(z.strona)}</li>`;
    const steps = m.zadania.filter(z => !ZAWCZASU(z)).map(li).join('');
    const zawczasu = m.zadania.filter(ZAWCZASU);
    const parts = [`<a class="back" href="#/reagowanie">‹ Reagowanie</a><h2 class="h-tight">${ic(m.id)} ${esc(m.tytul)} <span class="src">s. ${esc(m.strony)}</span></h2>`];
    if (m.zasada) parts.push(`<p><b>${esc(m.zasada)}</b></p>`);
    parts.push(`<ol class="steps">${steps}</ol>`);
    if (id === 'ewakuacja') {
      const dodatkowe = modFaza('przygotowanie').flatMap(x => x.zadania.filter(z => z.typ === 'reakcja' && widoczne(z)));
      if (dodatkowe.length) parts.push(`<div class="card"><h3 class="h-card">Jeśli opiekujesz się kimś albo masz zwierzęta</h3><ul>${dodatkowe.map(li).join('')}</ul></div>`);
    }
    if (m.tabela_gaszenia) {
      const nazwy = { materialy_stale: 'Materiały stałe (drewno, papier, tkanina)', ciecze: 'Ciecze i materiały topiące się (benzyna, farba)', gazy: 'Gazy (metan, propan)', metale: 'Metale', tluszcze_oleje: 'Tłuszcze i oleje (olej na patelni)' };
      parts.push(`<div class="card"><h3 class="h-card">Czym gasić</h3><table class="tbl"><thead><tr><th>Co się pali</th><th>Czym gasić</th></tr></thead><tbody>${Object.entries(m.tabela_gaszenia).map(([k, v]) => `<tr><td>${esc(nazwy[k] || k)}</td><td>${esc(v)}</td></tr>`).join('')}</tbody></table></div>`);
    }
    if (m.fakty?.length) parts.push(`<div class="card"><h3 class="h-card">Pamiętaj</h3><ul>${m.fakty.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>`);
    if (m.zrodla_info?.length) parts.push(`<div class="card"><h3 class="h-card">Gdzie sprawdzać</h3><ul>${m.zrodla_info.map(u => /\s/.test(u) ? `<li>${esc(u)}</li>` : `<li><a href="${esc(url(u))}" rel="noopener">${esc(u)}</a></li>`).join('')}</ul></div>`);
    if (zawczasu.length) parts.push(`<div class="card"><h3 class="h-card">${ic('zawczasu')} Przygotuj się zawczasu</h3><ul>${zawczasu.map(li).join('')}</ul><p class="small"><a href="#/przygotowanie/${esc(id)}">Odhacz w Przygotowaniu</a></p></div>`);
    if (id === 'pomoc' || id === 'powietrze' || id === 'schronienie') parts.push(`<p class="small"><a class="btn block" href="${telHref('112')}">${ic('phone')} Zadzwoń: 112</a></p>`);
    return parts.join('');
  }

  // ---------- widok: Plan na kryzys ----------
  const ROWS = { 'plan.kontakty': 6, 'plan.spotkania': 3, 'plan.zdrowie': 4, 'plan.rzeczy': 8, 'plan.telefony': 8 };
  const WIERSZ = { 'plan.kontakty': 'kontakt', 'plan.spotkania': 'miejsce', 'plan.zdrowie': 'osoba', 'plan.rzeczy': 'rzecz', 'plan.telefony': 'pozycja' };
  function typPola(p) {
    if (/telefon/i.test(p)) return 'type="tel" inputmode="tel" autocomplete="off"';
    if (/e-?mail/i.test(p)) return 'type="email" inputmode="email" autocomplete="off"';
    return 'type="text" autocomplete="off"';
  }
  function formBlock(f) {
    const dane = plan[f.id] || {};
    const warianty = f.warianty?.length ? f.warianty.map(w => w.replace(/\s*×\d+$/, '')) : [''];
    const rows = ROWS[f.id] || 4;
    const cols = f.pola.length >= 4 ? 'cols-4' : f.pola.length === 2 ? 'cols-2' : '';
    const grupa = (w, wi) => `${w ? `<h3>${esc(w)}</h3>` : ''}${Array.from({ length: rows }, (_, r) => `<div class="row ${cols}">${f.pola.map(p => {
      const key = `${wi}|${r}|${p}`; const opis = `${p}, ${w ? w + ', ' : ''}${WIERSZ[f.id] || 'wiersz'} ${r + 1}`;
      return `<label>${esc(p)}<input ${typPola(p)} data-plan="${esc(f.id)}" data-key="${esc(key)}" value="${esc(dane[key] || '')}" aria-label="${esc(opis)}"></label>`;
    }).join('')}</div>`).join('')}`;
    return `<section class="card form"><h3 class="h-card">${esc(f.tytul)}</h3>${f.podpowiedz ? `<p class="small muted">Np. ${esc(f.podpowiedz)}</p>` : ''}${warianty.map(grupa).join('')}</section>`;
  }
  function vPlan() {
    const m = modul('plan');
    return `
      <h2>${ic('plan')} Plan na kryzys <span class="src">s. ${esc(m.strony)}</span></h2>
      <p>Ustal dane kontaktowe oraz miejsca i terminy spotkań – w okolicy i poza miejscowością zamieszkania. To ważne na wypadek rozdzielenia i braku łączności. Wypełnij, wydrukuj, daj domownikom.</p>
      <div class="btn-row no-print"><button class="btn primary" type="button" data-action="print">${ic('print')} Drukuj plan</button><a class="btn" href="#/przygotowanie/plan">${ic('check')} Zadania z planu</a></div>
      ${m.formularze.map(formBlock).join('')}
      <section class="card"><h3 class="h-card">Dekalog bezpieczeństwa ${strona(D.dekalog_strona)}</h3><ol>${D.dekalog.map(x => `<li>${esc(x)}</li>`).join('')}</ol></section>
      <p class="small muted no-print">Dane planu są zapisane tylko w tym telefonie (nie wysyłamy ich nigdzie). Kopię do pliku zrobisz w: Więcej → O aplikacji.</p>`;
  }

  // ---------- widok: Więcej ----------
  function vWiecej(id) {
    if (id === 'profil') return vProfil();
    if (id === 'telefony') return vTelefony();
    if (id === 'o') return vO();
    const n = zadaniaDoZrobienia().length;
    return `
      <h2>Więcej</h2>
      <div class="link-row">
        <a class="btn" href="#/wiecej/profil"><span class="lbl">${ic('user')} Profil domu</span><span class="muted small">${profil ? odm(n, ['zadanie', 'zadania', 'zadań']) + ' do zrobienia' : 'nieustawiony'}</span></a>
        <a class="btn" href="#/wiecej/telefony"><span class="lbl">${ic('phone')} Telefony alarmowe i wsparcia</span></a>
        <a class="btn" href="#/wiecej/o"><span class="lbl">${ic('info')} O aplikacji i źródle</span></a>
        <a class="btn" href="${APP.pdf}" rel="noopener"><span class="lbl">${ic('book')} Poradnik w PDF (gov.pl)</span>${ic('external')}</a>
      </div>`;
  }
  function vProfil() {
    const p = profil || {};
    return `
      <a class="back" href="#/wiecej">‹ Więcej</a>
      <h2 class="h-tight">${ic('user')} Profil domu</h2>
      <p>Zaznacz, co dotyczy Twojego domu. Aplikacja pokaże tylko zadania dla Ciebie; zadania dla wszystkich są zawsze widoczne. Zmiany zapisują się od razu.</p>
      <section class="card">${PROFIL.map(x => `<label class="choice"><input type="checkbox" data-profil="${esc(x.k)}" ${p[x.k] ? 'checked' : ''}><span>${esc(x.q)}</span></label>`).join('')}</section>
      <section class="card"><label class="choice"><input type="checkbox" data-pokaz-wszystkie ${pokazWszystkie ? 'checked' : ''}><span>Pokaż też zadania, które mnie nie dotyczą (cały poradnik)</span></label></section>
      <p class="small muted">${profil ? 'Profil zapisany w tym telefonie.' : 'Profil jeszcze nieustawiony: bez zaznaczeń zobaczysz tylko zadania dla wszystkich.'}</p>
      <div class="btn-row"><a class="btn primary" href="#/przygotowanie">${ic('check')} Gotowe, do zadań</a></div>`;
  }
  function telRow(t, big) {
    if (t.www) return `<a class="tel" href="${esc(url(t.www))}" rel="noopener"><span class="nr">${esc(t.www)}</span><span class="desc">${esc(t.opis)}</span></a>`;
    const sms = t.nr === '8080';
    return `<a class="tel" href="${sms ? 'sms:8080' : telHref(t.nr)}"><span class="nr ${big ? 'big' : ''}">${ic(sms ? 'sms' : 'phone', 'sm')}${esc(t.nr)}</span><span class="desc">${esc(t.opis)}</span></a>`;
  }
  function vTelefony() {
    const T = D.telefony;
    return `
      <a class="back" href="#/wiecej">‹ Więcej</a>
      <h2 class="h-tight">${ic('phone')} Telefony ${strona(T.strona)}</h2>
      <section class="card"><h3 class="h-card">Alarmowe</h3>${T.alarmowe.map(t => telRow(t, true)).join('')}</section>
      <section class="card"><h3 class="h-card">Jak wezwać pomoc</h3><ol>${T.jak_wezwac_pomoc.map(x => `<li>${esc(x)}</li>`).join('')}</ol></section>
      <section class="card"><h3 class="h-card">Gdzie szukać wsparcia</h3>${T.wsparcie.map(t => telRow(t)).join('')}</section>
      <section class="card"><h3 class="h-card">Pogotowia i służby</h3>${T.pogotowia.map(t => telRow(t)).join('')}</section>
      <section class="card"><h3 class="h-card">Oszustwa i cyberzagrożenia ${strona(T.cyber[0]?.strona)}</h3>${T.cyber.map(t => telRow(t)).join('')}</section>`;
  }
  function vO() {
    const meta = D._meta || {};
    const info = komunikatO; komunikatO = '';
    return `
      <a class="back" href="#/wiecej">‹ Więcej</a>
      <h2 class="h-tight">${ic('info')} O aplikacji</h2>
      <section class="card">
        <p><b>To nie jest aplikacja rządowa.</b> To niezależna, testowa wersja, która przenosi treść oficjalnego poradnika do telefonu: zadania do odhaczenia, instrukcje na wypadek zagrożenia i plan na kryzys do wypełnienia.</p>
        <p><b>Źródło treści:</b> ${esc(meta.zrodlo || 'Poradnik bezpieczeństwa, MSWiA/MON/RCB 2025')}. Numery stron odsyłają do wydania drukowanego. PDF: <a href="${APP.pdf}" rel="noopener">gov.pl/web/poradnikbezpieczenstwa</a>.</p>
        <p class="small muted">Zadania są skrócone w stosunku do poradnika, ale ich znaczenie jest takie samo. W razie wątpliwości obowiązuje tekst poradnika.</p>
        <p class="small muted">Wersja aplikacji ${esc(APP.version)}.${meta.sprawdzono ? ` Treść sprawdzona z wydaniem drukowanym: ${esc(meta.sprawdzono)}.` : ''} Ikony: <a href="https://tabler.io/icons" rel="noopener">Tabler Icons</a> (licencja MIT).</p>
      </section>
      <section class="card">
        <h3 class="h-card">Prywatność i kopia</h3>
        <p class="small">Profil, odhaczenia i plan są zapisane wyłącznie w tym telefonie (pamięć przeglądarki). Aplikacja nie ma konta, serwera ani analityki i niczego nie wysyła. Telefon może usunąć te dane po dłuższej przerwie, jeśli aplikacja nie jest dodana do ekranu początkowego, dlatego warto mieć kopię w pliku.</p>
        ${info ? `<p class="small" role="status"><b>${esc(info)}</b></p>` : ''}
        <div class="btn-row">
          <button class="btn" type="button" data-action="kopia-zapisz">${ic('download')} Zapisz kopię do pliku</button>
          <label class="btn">${ic('upload')}<span>Wczytaj kopię z pliku</span><input type="file" accept="application/json,.json" data-kopia class="sr-only"></label>
        </div>
        <p><button class="btn" type="button" data-action="wyczysc">${ic('trash')} Wyczyść moje dane w tej aplikacji</button></p>
      </section>
      <section class="card">
        <h3 class="h-card">Bez internetu</h3>
        <p class="small">Po pierwszym otwarciu aplikacja działa offline. Dodaj ją do ekranu początkowego (Udostępnij → Do ekranu początkowego / Zainstaluj aplikację), a będzie pod ręką jak zwykła aplikacja.</p>
      </section>`;
  }

  // ---------- bramka wersji testowej ----------
  function bramkaOtwarta() { return GATE.skipHosts.includes(location.hostname) || store.get(GATE.key, '') === GATE.hash; }
  function vBramka(blad) {
    document.body.classList.add('locked');
    return `
      <section class="card gate">
        <h2 class="h-card">Wersja testowa</h2>
        <p>Ta wersja jest dostępna dla zaproszonych osób. Wpisz hasło, które dostałeś od autora.</p>
        <form data-gate>
          <label>Hasło<input type="password" name="pw" autocomplete="current-password" required autofocus></label>
          ${blad ? `<p class="small" role="alert"><b>${esc(blad)}</b></p>` : ''}
          <p><button class="btn primary block" type="submit">Wejdź</button></p>
        </form>
        <p class="small muted">Hasło zapamiętamy w tym telefonie. Aplikacja niczego nie wysyła; hasło sprawdzamy lokalnie.</p>
      </section>`;
  }

  // ---------- kopia zapasowa (plik na urządzeniu, bez serwera) ----------
  function kopiaZapisz() {
    const dane = { _app: 'na-wszelki-wypadek', _wersja: 1, _data: new Date().toISOString(), profil, pokazWszystkie, zrobione, plan };
    const blob = new Blob([JSON.stringify(dane, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `na-wszelki-wypadek-kopia-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    oglos('Kopia zapisana do pliku');
  }
  function kopiaWczytaj(file) {
    file.text().then(t => {
      const j = JSON.parse(t); if (j._app !== 'na-wszelki-wypadek') throw new Error('zły plik');
      profil = j.profil ?? null; pokazWszystkie = !!j.pokazWszystkie; zrobione = j.zrobione || {}; plan = j.plan || {};
      store.set('profil', profil); store.set('pokazWszystkie', pokazWszystkie); store.set('zrobione', zrobione); store.set('plan', plan);
      komunikatO = 'Wczytano kopię: profil, odhaczone zadania i plan.'; render(); oglos('Wczytano kopię');
    }).catch(() => { komunikatO = 'To nie jest plik kopii z tej aplikacji.'; render(); });
  }

  // ---------- zdarzenia ----------
  app.addEventListener('change', e => {
    const t = e.target;
    if (t.matches('input[data-task]')) {
      const id = t.dataset.task;
      if (t.checked) zrobione[id] = new Date().toISOString(); else delete zrobione[id];
      store.set('zrobione', zrobione);
      render({ keep: true });
      oglos(t.checked ? 'Zapisano jako zrobione' : 'Cofnięto');
    } else if (t.matches('input[data-profil]')) {
      profil = profil || {};
      if (t.checked) profil[t.dataset.profil] = true; else delete profil[t.dataset.profil];
      store.set('profil', profil);
      oglos('Profil zapisany');
    } else if (t.matches('input[data-pokaz-wszystkie]')) {
      pokazWszystkie = t.checked; store.set('pokazWszystkie', pokazWszystkie); oglos(pokazWszystkie ? 'Pokazujesz wszystkie zadania' : 'Pokazujesz zadania dla Twojego profilu');
    } else if (t.matches('input[data-kopia]') && t.files?.[0]) {
      kopiaWczytaj(t.files[0]);
    }
  });
  app.addEventListener('input', e => {
    const t = e.target;
    if (t.matches('input[data-plan]')) { const f = t.dataset.plan; plan[f] = plan[f] || {}; plan[f][t.dataset.key] = t.value; store.set('plan', plan); }
  });
  app.addEventListener('click', e => {
    const b = e.target.closest('[data-action]'); if (!b) return;
    const a = b.dataset.action;
    if (a === 'print') window.print();
    if (a === 'retry') start();
    if (a === 'kopia-zapisz') kopiaZapisz();
    if (a === 'wyczysc' && confirm('Usunąć profil, odhaczone zadania i plan z tego telefonu? Tego nie da się cofnąć.')) {
      store.clear(); profil = null; pokazWszystkie = false; zrobione = {}; plan = {};
      komunikatO = 'Usunięto profil, odhaczone zadania i plan z tego telefonu.'; render(); oglos('Dane usunięte');
    }
  });
  app.addEventListener('submit', async e => {
    const f = e.target.closest('form[data-gate]'); if (!f) return;
    e.preventDefault();
    if (!crypto?.subtle) { app.innerHTML = vBramka('Otwórz aplikację przez bezpieczne połączenie (https), żeby wpisać hasło.'); return; }
    const h = await sha256(f.pw.value.trim());
    if (h === GATE.hash) { store.set(GATE.key, h); document.body.classList.remove('locked'); start(); }
    else { app.innerHTML = vBramka('Nieprawidłowe hasło.'); f.pw?.focus(); }
  });
  window.addEventListener('hashchange', () => { if (!location.hash || location.hash.startsWith('#/')) render(); });
  document.querySelector('.skip')?.addEventListener('click', e => { e.preventDefault(); app.focus(); });

  // ---------- start ----------
  let ikonyP = null;   // jedno pobranie sprite'a, nawet gdy start() woła równolegle
  function wczytajIkony() {
    if (!ikonyP) ikonyP = fetch(APP.iconsUrl).then(r => r.ok ? r.text() : '').then(t => {
      if (!t || document.getElementById('nww-icons')) return;
      const d = document.createElement('div'); d.id = 'nww-icons'; d.innerHTML = t; document.body.prepend(d);
    }).catch(() => { });
    return ikonyP;
  }
  function start() {
    if (!bramkaOtwarta()) { app.innerHTML = vBramka(''); app.querySelector('input[name=pw]')?.focus(); return; }
    document.body.classList.remove('locked');
    app.innerHTML = `<p class="muted">Wczytywanie poradnika…</p>`;
    Promise.all([
      fetch(APP.dataUrl, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }),
      wczytajIkony(),
    ]).then(([j]) => { D = j; render(); })
      .catch(err => {
        console.error('Nie udało się wczytać', APP.dataUrl, err);
        app.innerHTML = `<div class="empty"><p>Nie udało się otworzyć treści poradnika.${location.protocol === 'file:' ? ' Aplikację trzeba otworzyć z serwera (adres http), nie z pliku.' : ''} Twój profil, odhaczone zadania i plan są zapisane w telefonie.</p><p><button class="btn primary" type="button" data-action="retry">Spróbuj ponownie</button></p><p class="small">Poradnik w PDF: <a href="${APP.pdf}" rel="noopener">gov.pl/web/poradnikbezpieczenstwa</a></p></div>`;
      });
  }
  wczytajIkony();
  start();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').then(() => {
    if (!navigator.serviceWorker.controller) return;     // pierwsze uruchomienie: nie ma starszej wersji
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (document.getElementById('update')) return;
      const d = document.createElement('div'); d.id = 'update'; d.className = 'update no-print'; d.setAttribute('role', 'status');
      d.innerHTML = `<span>Nowa wersja aplikacji jest gotowa.</span><button class="btn" type="button">Odśwież</button>`;
      d.querySelector('button').addEventListener('click', () => location.reload());
      document.body.appendChild(d);
    });
  }).catch(() => { });
})();
