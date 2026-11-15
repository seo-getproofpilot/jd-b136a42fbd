/* Jasperson's Detailing demo v5. Before/after hero, packages on the van doors, maintenance club,
   booking with a real calendar, products in use, big reels, portfolio, and an area checker on the map. */
(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const PHONE = "+16026160058";
const IS_LOCAL = ["localhost", "127.0.0.1", ""].includes(location.hostname);
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const money = n => "$" + n.toLocaleString("en-US");
const CHECK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"><path d="M4 10.5l4 4 8-9"/></svg>';
const HEART = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.1 3.3 4 7.1 4c2.1 0 3.6 1.1 4.9 2.8C13.3 5.1 14.8 4 16.9 4c3.8 0 6.2 4.1 4.7 7.7C19.5 16.4 12 21 12 21z"/></svg>';
const EYE = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
const IGI = '<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 7.3A4.7 4.7 0 1 0 16.7 12 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm6-7.9a1.1 1.1 0 1 1-1.1-1.1A1.1 1.1 0 0 1 18 7.1zM21.9 8.2a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0-3.8-1.5C15.1 2.8 8.9 2.8 7.4 2.9a5.4 5.4 0 0 0-3.8 1.5A5.4 5.4 0 0 0 2.1 8.2c-.1 1.5-.1 7.7 0 9.2a5.4 5.4 0 0 0 1.5 3.8 5.4 5.4 0 0 0 3.8 1.5c1.5.1 7.7.1 9.2 0a5.4 5.4 0 0 0 3.8-1.5 5.4 5.4 0 0 0 1.5-3.8c.1-1.5.1-7.7 0-9.2z"/></svg>';
const TTI = '<svg viewBox="0 0 24 24"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z"/></svg>';

/* ------------------------------------------------------------------ data */
const SIZES = ["Car / small SUV", "Truck / 3-row SUV", "Lifted / HD / dually"];
const PKGS = [
  { id: "wash", n: "Signature Wash", t: "1.5–2 hrs", p: [85, 110, 135], li: ["Wheels, barrels & tires", "Wheel wells degreased", "Snow-foam prewash", "Hand contact wash", "Spot-free rinse", "Touchless blow-dry", "Ceramic spray topper", "Interior vacuum & wipe"] },
  { id: "interior", n: "Interior Deep Clean", t: "2.5–3.5 hrs", p: [159, 189, 219], li: ["Deep vacuum, under seats", "Carpets shampooed", "Mats extracted", "Leather conditioned", "Plastics & panels dressed", "Vents & cupholders", "Odor treatment", "Glass inside & out"] },
  { id: "full", n: "Full Detail", t: "4–6 hrs", hi: "Most complete", p: [249, 309, 379], li: ["Full Signature Wash", "Full Interior Deep Clean", "Paint sealant", "Door jambs", "Exterior trim dressed", "Engine bay wipe-down", "Glass inside & out", "Final walk-around"] },
  { id: "ceramic", n: "Ceramic Coating", t: "1–2 days", p: [899, 1149, 1399], li: ["Decon wash, iron & clay", "Machine polish", "Ceramic on paint", "Wheel faces coated", "Glass coated", "Trim protected", "Aftercare walkthrough", "First maintenance wash"] },
];
const PLANS = [
  { id: "weekly", n: "Weekly", f: "Daily drivers & work trucks", per: [69, 89, 109], visits: 4, save: "Save 19% per wash",
    li: ["4 Signature Washes a month", "Wheels, wells & tires every visit", "Spot-free rinse & blow-dry", "Ceramic topper every visit", "Interior vacuum & wipe"] },
  { id: "biweekly", n: "Every 2 weeks", f: "The one most people pick", hi: "Most popular", per: [75, 97, 119], visits: 2, save: "Save 12% per wash",
    li: ["2 Signature Washes a month", "Wheels, wells & tires every visit", "Spot-free rinse & blow-dry", "Ceramic topper every visit", "Interior vacuum & wipe", "Keeps a coating performing"] },
  { id: "monthly", n: "Monthly", f: "Weekend trucks & garage cars", per: [109, 135, 159], visits: 1, save: "Full interior pass included",
    li: ["1 visit a month", "Full Signature Wash", "Full interior vacuum & mats", "Plastics cleaned & dressed", "Glass inside & out"], plus: true },
];
const ADDS = [["Engine bay detail", 75], ["Undercarriage & frame", 79], ["Headlight restoration", 79], ["Pet hair removal", 49], ["Odor elimination", 59], ["Glass coating", 99]];
const MARKS = [
  ["Ferrari California", "In the foam", 0], ["Ferrari California", "Finished", 3.6], ["King Ranch F-250", "In the foam", 7.8], ["King Ranch F-250", "Finished", 11.2],
  ["Silverado", "In the foam", 15.6], ["Silverado", "Finished", 19.2], ["GMT800 Sierra", "In the foam", 23.2], ["GMT800 Sierra", "Finished", 26.8],
  ["GMC Denali", "In the foam", 31.0], ["GMC Denali", "Finished", 34.6]];
const HERO_DUR = 39.0;
const CLIPS = [
  ["Shine Supply", "Cool Guy wheel cleaner", "Breaks brake dust down in the barrel", "step-wheels"],
  ["Koch-Chemie", "Gentle Snow Foam", "Thick prewash that lifts the grit", "step-foam"],
  ["Shine Supply", "Shift contact wash", "Slick, so the mitt glides", "step-contact"],
  ["Gyeon", "Q²M APC", "Frames, suspension, tires & wells", "step-frame"],
  ["The Rag Co. + Metrovac", "Towels & Air Force blaster", "Touchless dry, plush finish", "step-dry"],
  ["Shine Supply", "Decked Out tire shine", "Rich finish that doesn't sling", "step-dress"],
];
const REELS = [
  ["ferrari", "tt", "7587665369498651935", "Ferrari California", "559"], ["engraved", "ig", "DaEgaLtJmOe", "Hand-engraved Super Duty", "16.6K"],
  ["c8", "tt", "7562669488194276638", "C8 Corvette", "878"], ["kingranch", "ig", "DZBt-xSvAdK", "F-250 King Ranch", "17K"],
  ["macan", "tt", "7568339010901347615", "Porsche Macan + C8", "760"], ["bagged", "ig", "DflhiuSvHev", "Bagged Silverado", "3.7K"],
  ["yenko", "tt", "7609793024733891871", "Real Yenko Chevelle", "570"], ["dually", "ig", "DfTaAA5vgVZ", "F-350 dually", "628"],
  ["ferrarifoam", "tt", "7587590076838792478", "Ferrari in the foam", "601"], ["platinum", "ig", "DfVsCzhvzly", "F-250 Platinum", "1.2K"],
];
const PORT = [
  ["ferrari", "Cars", "Ferrari California", "tall"], ["kingranch", "Trucks", "King Ranch F-250", ""], ["c8", "Cars", "C8 Corvette", ""],
  ["engraved", "Trucks", "Hand-engraved Super Duty", "tall"], ["dash", "Interiors", "Custom dash & leather", ""], ["macan", "Cars", "Porsche Macan", ""],
  ["dually", "Trucks", "F-350 dually", "tall"], ["yenko", "Cars", "Yenko Chevelle", ""], ["camo", "Details", "Hand-engraved panels", ""],
  ["platinum", "Trucks", "F-250 Platinum", ""], ["wheel", "Details", "M wheel, brake dust gone", "tall"], ["bagged", "Trucks", "Bagged Silverado", ""],
  ["sierra", "Trucks", "GMT800 Sierra", ""], ["denali", "Trucks", "GMC Denali", ""], ["silverado", "Trucks", "Silverado", ""], ["superduty", "Trucks", "'23 Super Duty", ""],
];
const BASE = [33.792, -112.04];
const CITIES = [
  ["North Phoenix", 33.792, -112.04, true], ["Phoenix", 33.4484, -112.074], ["Scottsdale", 33.4942, -111.9261], ["Paradise Valley", 33.5431, -111.9565],
  ["Tempe", 33.4255, -111.94], ["Mesa", 33.4152, -111.8315], ["Chandler", 33.3062, -111.8413], ["Gilbert", 33.3528, -111.789], ["Ahwatukee", 33.3384, -111.9806],
  ["Queen Creek", 33.2487, -111.6343], ["Glendale", 33.5387, -112.186], ["Peoria", 33.5806, -112.2374], ["Surprise", 33.6292, -112.3679],
  ["Sun City", 33.5975, -112.2718], ["El Mirage", 33.6131, -112.3246], ["Goodyear", 33.4353, -112.3577], ["Avondale", 33.4356, -112.3496],
  ["Litchfield Park", 33.4934, -112.358], ["Laveen", 33.3628, -112.1696], ["Anthem", 33.8673, -112.146], ["New River", 33.9159, -112.1360],
  ["Cave Creek", 33.8334, -111.9507], ["Carefree", 33.8223, -111.9182], ["Fountain Hills", 33.6117, -111.7174],
];
const TIMES = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

/* ------------------------------------------------------------------ state */
const S = { size: 0, svc: null, day: null, time: null, adds: new Set(), month: (() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); })() };
const svcItem = id => PKGS.find(p => p.id === id) || PLANS.find(p => p.id === id);

/* ------------------------------------------------------------------ utils */
function toast(m) { const t = $(".toast"); t.textContent = m; t.classList.add("is-on"); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("is-on"), 3800); }
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="sms:"], a[href^="tel:"]'); if (!a) return;
  const body = a.dataset.sms || (a.hasAttribute("data-sms-summary") ? summaryText() : "");
  if (IS_LOCAL) { e.preventDefault(); toast(a.href.startsWith("sms:") ? "Demo: this opens a text to 602-616-0058 with the details filled in." : "Demo: this calls 602-616-0058."); return; }
  if (body) { e.preventDefault(); location.href = `sms:${PHONE}?&body=${encodeURIComponent(body)}`; }
});
const lazyIO = new IntersectionObserver(es => es.forEach(en => {
  const v = en.target;
  if (en.isIntersecting && !REDUCED) { if (!v.src && v.dataset.src) v.src = v.dataset.src; v.play().catch(() => {}); }
  else if (!v.paused) v.pause();
}), { rootMargin: "120px 0px" });

/* ------------------------------------------------------------------ intro, nav, hero */
function initIntro() {
  const intro = $(".intro"), root = document.documentElement;
  const finish = () => { document.body.classList.remove("is-intro"); document.body.classList.add("neon-on"); };
  if (!intro || root.classList.contains("no-intro") || REDUCED) { intro && intro.remove(); setTimeout(finish, REDUCED ? 0 : 250); return; }
  document.body.classList.add("is-intro");
  const out = () => { if (intro.classList.contains("is-out")) return; intro.classList.add("is-out"); try { sessionStorage.setItem("jd-intro", "1"); } catch (_) {} setTimeout(finish, 450); setTimeout(() => intro.remove(), 900); };
  setTimeout(out, 1850); intro.addEventListener("click", out);
}
function initNav() {
  const nav = $(".nav"), hero = $(".hero");
  new IntersectionObserver(([en]) => nav.classList.toggle("is-hero", en.isIntersecting), { rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) + 40}px 0px 0px 0px`, threshold: 0 }).observe(hero.querySelector(".hero__copy"));
}
function initHero() {
  const v = $(".hero__video video"), stage = $(".hero__stage"), k = $(".hero__stagek"), veh = $(".hero__veh"), dots = $(".hero__dots");
  dots.innerHTML = MARKS.map((m, i) => `<li style="--w:${((MARKS[i + 1] ? MARKS[i + 1][2] : HERO_DUR) - m[2]).toFixed(1)}"><i></i></li>`).join("");
  const lis = $$("li", dots); let cur = -1;
  (function tick() {
    const t = v.currentTime % HERO_DUR;
    let i = MARKS.length - 1; while (i > 0 && t < MARKS[i][2]) i--;
    if (i !== cur) {
      cur = i; const [name, st] = MARKS[i];
      k.textContent = st; veh.textContent = name; stage.classList.toggle("is-done", st === "Finished");
      stage.classList.remove("is-swap"); void stage.offsetWidth; stage.classList.add("is-swap");
    }
    lis.forEach((li, j) => {
      const s = MARKS[j][2], e = MARKS[j + 1] ? MARKS[j + 1][2] : HERO_DUR;
      li.style.setProperty("--p", t >= e ? 1 : t <= s ? 0 : ((t - s) / (e - s)).toFixed(3));
      li.classList.toggle("is-done", MARKS[j][1] === "Finished");
    });
    requestAnimationFrame(tick);
  })();
  if (REDUCED) v.pause();
}

/* ------------------------------------------------------------------ packages on the van doors */
function pkCard(p) {
  return `<article class="pk${p.hi ? " pk--hi" : ""}">
    ${p.hi ? `<span class="pk__badge">${p.hi}</span>` : ""}
    <div class="pk__top"><div><h3 class="pk__n">${p.n}</h3><p class="pk__t">${p.t} on site</p></div>
    <p class="pk__p" data-price="${p.id}">${money(p.p[S.size])}<small>${SIZES[S.size]}</small></p></div>
    <ul>${p.li.map(l => `<li>${l}</li>`).join("")}</ul>
    <button type="button" class="btn ${p.hi ? "btn--red" : "btn--ghost"}" data-book="${p.id}">Book ${p.n}</button></article>`;
}
function renderDoors() {
  $(".door--l .door__face").innerHTML = `<div class="door__win"></div>${pkCard(PKGS[0])}${pkCard(PKGS[1])}`;
  $(".door--r .door__face").innerHTML = `<div class="door__win"></div>${pkCard(PKGS[2])}${pkCard(PKGS[3])}`;
}
function initVan() {
  renderDoors();
  $(".extras__list").innerHTML = ADDS.map(([n, p]) => `<li>${n}<b>+${money(p)}</b></li>`).join("");
  const van = $(".van");
  new IntersectionObserver(([en]) => { if (en.isIntersecting) van.classList.add("is-open"); }, { threshold: .25 }).observe($(".van__stage"));
  $$(".van video[data-src]").forEach(v => lazyIO.observe(v));
  $(".sizes__opts").addEventListener("click", e => { const b = e.target.closest("button"); if (b) setSize(+b.dataset.size); });
}
function setSize(i) {
  S.size = i;
  $$(".sizes__opts button, .club__sizes button").forEach(b => b.setAttribute("aria-checked", String(+b.dataset.size === i)));
  PKGS.forEach(p => $$(`[data-price="${p.id}"]`).forEach(el => el.innerHTML = `${money(p.p[i])}<small>${SIZES[i]}</small>`));
  renderTiers(); renderBookOpts(); updateSummary();
}

/* ------------------------------------------------------------------ maintenance club */
function renderTiers() {
  $(".tiers").innerHTML = PLANS.map(p => {
    const per = p.per[S.size], mo = per * p.visits;
    return `<article class="tier${p.hi ? " tier--hi" : ""}">
      ${p.hi ? `<span class="tier__flag">${p.hi}</span>` : ""}
      <h3 class="tier__n">${p.n}</h3><p class="tier__f">${p.f}</p>
      <p class="tier__p"><b>${money(mo)}</b><span>/ month</span></p>
      <p class="tier__per">${money(per)} per wash <span class="tier__save">${p.save}</span></p>
      <ul>${p.li.map((l, j) => `<li class="${p.plus && j >= 2 ? "is-plus" : ""}">${CHECK}<span>${l}</span></li>`).join("")}</ul>
      <button type="button" class="btn ${p.hi ? "btn--red" : "btn--ghost"} btn--block btn--lg" data-book="${p.id}">Join the club</button></article>`;
  }).join("");
}
function initClub() {
  const sw = document.createElement("div"); sw.className = "sizes";
  sw.innerHTML = `<p class="sizes__k">Prices for</p><div class="sizes__opts club__sizes" role="radiogroup" aria-label="Vehicle size">${SIZES.map((s, i) => `<button type="button" role="radio" aria-checked="${i === S.size}" data-size="${i}">${s}</button>`).join("")}</div>`;
  $(".tiers").before(sw);
  sw.addEventListener("click", e => { const b = e.target.closest("button"); if (b) setSize(+b.dataset.size); });
  renderTiers();
}

/* ------------------------------------------------------------------ booking */
const bk = $(".bk");
function renderBookOpts() {
  const sel = S.svc;
  $('[data-name="svc"]').innerHTML = [...PKGS.map(p => [p.id, p.n, p.t, money(p.p[S.size]), ""]), ...PLANS.map(p => [p.id, `${p.n} plan`, `${p.visits}× a month`, `${money(p.per[S.size] * p.visits)}/mo`, " opt--plan"])]
    .map(([id, n, t, pr, cls]) => `<label class="opt${cls}"><input type="radio" name="svc" value="${id}" ${sel === id ? "checked" : ""}><span><b>${n}</b><i>${t}</i><em>${pr}</em></span></label>`).join("");
  $('[data-name="size"]').innerHTML = SIZES.map((s, i) => `<label class="opt"><input type="radio" name="size" value="${i}" ${S.size === i ? "checked" : ""}><span><b>${s}</b></span></label>`).join("");
}
function renderCal() {
  const m = S.month, today = new Date(); today.setHours(0, 0, 0, 0);
  $(".cal__month").textContent = m.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const first = new Date(m.getFullYear(), m.getMonth(), 1).getDay(), days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
  let html = Array.from({ length: first }, () => "<i></i>").join("");
  for (let d = 1; d <= days; d++) {
    const dt = new Date(m.getFullYear(), m.getMonth(), d), past = dt <= today;
    const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    html += `<button type="button" data-day="${key}" ${past ? "disabled" : ""} class="${S.day === key ? "is-on" : ""}">${d}</button>`;
  }
  $(".cal__grid").innerHTML = html;
  const cur = new Date(); $('[data-cal="-1"]').disabled = m.getFullYear() === cur.getFullYear() && m.getMonth() === cur.getMonth();
}
function updateSummary() {
  const it = S.svc && svcItem(S.svc), isPlan = it && PLANS.includes(it);
  $('[data-sum="svc"]').textContent = it ? (isPlan ? `${it.n} plan` : it.n) : "Pick a package";
  $('[data-sum="size"]').textContent = SIZES[S.size];
  $('[data-sum="day"]').textContent = S.day ? new Date(S.day + "T12:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "—";
  $('[data-sum="time"]').textContent = S.time || "—";
  const base = it ? (isPlan ? it.per[S.size] : it.p[S.size]) : 0;
  const add = ADDS.filter(([n]) => S.adds.has(n)).reduce((t, [, p]) => t + p, 0);
  $('[data-sum="total"]').innerHTML = money(base + add) + (isPlan ? '<small style="font:600 13px var(--f-body);color:#a4a09a"> first visit</small>' : "");
}
function initBooking() {
  renderBookOpts(); renderCal();
  $(".slots").innerHTML = TIMES.map(t => `<label class="opt"><input type="radio" name="time" value="${t}"><span><b>${t}</b></span></label>`).join("");
  $(".bk__addlist").innerHTML = ADDS.map(([n, p]) => `<label><input type="checkbox" value="${esc(n)}">${n}<i>+${money(p)}</i></label>`).join("");
  bk.addEventListener("change", e => {
    const t = e.target;
    if (t.name === "svc") S.svc = t.value;
    if (t.name === "size") setSize(+t.value);
    if (t.name === "time") S.time = t.value;
    if (t.closest(".bk__addlist")) t.checked ? S.adds.add(t.value) : S.adds.delete(t.value);
    updateSummary();
  });
  bk.addEventListener("input", e => e.target.classList && e.target.classList.remove("is-bad"));
  $(".cal__grid").addEventListener("click", e => { const b = e.target.closest("button[data-day]"); if (!b) return; S.day = b.dataset.day; renderCal(); updateSummary(); });
  $$(".cal__nav").forEach(b => b.addEventListener("click", () => { S.month = new Date(S.month.getFullYear(), S.month.getMonth() + +b.dataset.cal, 1); renderCal(); }));
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-book]"); if (!b) return;
    S.svc = b.dataset.book; renderBookOpts(); updateSummary();
    $("#book").scrollIntoView({ behavior: "smooth" });
    toast(`${svcItem(S.svc).n}${PLANS.some(p => p.id === S.svc) ? " plan" : ""} selected. Pick a day and time.`);
  });
  bk.addEventListener("submit", e => {
    e.preventDefault();
    const f = bk.elements; let ok = true, msg = "";
    [["addr", v => v.trim().length > 4], ["name", v => v.trim().length > 1], ["phone", v => (v.match(/\d/g) || []).length >= 10]].forEach(([n, t]) => { const bad = !t(f[n].value); f[n].classList.toggle("is-bad", bad); if (bad) ok = false; });
    if (!S.svc) msg = "Pick a package or plan first."; else if (!S.day) msg = "Pick a day on the calendar."; else if (!S.time) msg = "Pick an arrival time.";
    if (msg) { ok = false; toast(msg); }
    if (!ok) { const b = bk.querySelector(".is-bad"); b && b.focus(); return; }
    $(".bk__done").hidden = false;
  });
  $(".bk__again").addEventListener("click", () => { $(".bk__done").hidden = true; bk.reset(); S.svc = S.day = S.time = null; S.adds.clear(); renderBookOpts(); renderCal(); updateSummary(); });
  updateSummary();
}
function summaryText() {
  const f = bk.elements, it = S.svc && svcItem(S.svc);
  return [`Hey Logan, I booked on your site:`, `Service: ${it ? it.n : ""}${PLANS.some(p => p.id === S.svc) ? " plan" : ""}`, `Vehicle: ${SIZES[S.size]}${f.veh.value ? ", " + f.veh.value : ""}`,
    `When: ${$('[data-sum="day"]').textContent} at ${S.time || ""}`, S.adds.size ? `Add-ons: ${[...S.adds].join(", ")}` : "", `Address: ${f.addr.value}`,
    f.notes.value ? `Notes: ${f.notes.value}` : "", `Name: ${f.name.value}`, `Phone: ${f.phone.value}`].filter(Boolean).join("\n");
}

/* ------------------------------------------------------------------ products, reels, portfolio */
function initProducts() {
  $(".pclips").innerHTML = CLIPS.map(([brand, name, use, clip]) => `<article class="pclip rv">
      <video muted playsinline loop preload="none" poster="assets/img/${clip}.jpg" data-src="assets/v/${clip}.mp4"></video>
      <span class="pclip__brand">${brand}</span><div class="pclip__body"><b>${name}</b><span>${use}</span></div></article>`).join("")
    + `<article class="pclip pclip--shelf rv"><img src="assets/img/shelf.jpg" alt="Shine Supply gallons lined up in front of the Jasperson's van" loading="lazy">
      <span class="pclip__brand">The lineup</span><div class="pclip__body"><b>On the van, every job</b><span>Gallons, not bottles.</span></div></article>`;
  $$(".pclips video, .feat video").forEach(v => lazyIO.observe(v));
}
function initReels() {
  const box = $(".reels");
  box.innerHTML = REELS.map(([key, pf, id, label, n]) => {
    const url = pf === "ig" ? `https://www.instagram.com/reel/${id}/` : `https://www.tiktok.com/@jaspersonsdetailing/video/${id}`;
    return `<a class="reel" href="${url}" target="_blank" rel="noopener" aria-label="${esc(label)} on ${pf === "ig" ? "Instagram" : "TikTok"}">
      <img src="assets/img/reel-${key}.jpg" alt="" loading="lazy" width="540" height="960"><video muted playsinline loop preload="none" data-reel="assets/v/reel-${key}.mp4"></video>
      <span class="reel__pf">${pf === "ig" ? IGI : TTI}${pf === "ig" ? "Instagram" : "TikTok"}</span>
      <span class="reel__meta"><b>${esc(label)}</b><span>${pf === "ig" ? HEART : EYE}${n} ${pf === "ig" ? "likes" : "views"}</span></span></a>`;
  }).join("");
  const io = new IntersectionObserver(es => es.forEach(en => {
    const a = en.target, v = a.querySelector("video");
    if (en.isIntersecting && !REDUCED) { if (!v.src) v.src = v.dataset.reel; v.play().then(() => a.classList.add("is-play")).catch(() => {}); }
    else { v.pause(); a.classList.remove("is-play"); }
  }), { threshold: .55 });
  $$(".reel", box).forEach(r => io.observe(r));
  $$("[data-rscroll]").forEach(b => b.addEventListener("click", () => box.scrollBy({ left: +b.dataset.rscroll * box.clientWidth * .7, behavior: "smooth" })));
}
function initPortfolio() {
  const cats = ["All", "Trucks", "Cars", "Interiors", "Details"];
  $(".pf__tabs").innerHTML = cats.map((c, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-cat="${c}">${c}</button>`).join("");
  const grid = $(".pf__grid");
  const render = cat => {
    const items = PORT.filter(p => cat === "All" || p[1] === cat || (cat === "Interiors" && p[1] === "Interiors"));
    grid.innerHTML = items.map(([k, c, label, shape], i) => `<button type="button" class="ptile rv is-in${cat === "All" && shape ? " is-" + shape : ""}" data-i="${PORT.findIndex(p => p[0] === k)}">
      <img src="assets/img/pf-${k}.jpg" alt="${esc(label)}" loading="lazy" width="880" height="1100"><span><i>${c}</i><b>${esc(label)}</b></span></button>`).join("");
  };
  render("All");
  $(".pf__tabs").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; $$(".pf__tabs button").forEach(x => x.setAttribute("aria-selected", String(x === b))); render(b.dataset.cat); });
  const lb = $(".lb"), img = $("img", lb), cap = $("figcaption", lb); let at = 0;
  const show = i => { at = (i + PORT.length) % PORT.length; img.src = `assets/img/pf-${PORT[at][0]}.jpg`; img.alt = PORT[at][2]; cap.textContent = PORT[at][2]; };
  grid.addEventListener("click", e => { const t = e.target.closest(".ptile"); if (!t) return; show(+t.dataset.i); lb.hidden = false; });
  $(".lb__x").addEventListener("click", () => lb.hidden = true);
  $(".lb__nav--l").addEventListener("click", () => show(at - 1));
  $(".lb__nav--r").addEventListener("click", () => show(at + 1));
  lb.addEventListener("click", e => { if (e.target === lb) lb.hidden = true; });
  document.addEventListener("keydown", e => { if (lb.hidden) return; if (e.key === "Escape") lb.hidden = true; if (e.key === "ArrowLeft") show(at - 1); if (e.key === "ArrowRight") show(at + 1); });
}

/* ------------------------------------------------------------------ map + area check */
let map, youMarker;
function miles(a, b) { const R = 3958.8, t = x => x * Math.PI / 180; const dLat = t(b[0] - a[0]), dLng = t(b[1] - a[1]); const h = Math.sin(dLat / 2) ** 2 + Math.cos(t(a[0])) * Math.cos(t(b[0])) * Math.sin(dLng / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); }
function initMap() {
  const list = $(".cities");
  list.innerHTML = CITIES.map(([n], i) => `<li><button type="button" data-i="${i}">${n}</button></li>`).join("");
  if (!window.L) return;
  map = L.map("map", { zoomControl: true, scrollWheelZoom: false, attributionControl: true });
  const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/";
  L.tileLayer(ESRI + "World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", { maxZoom: 16, attribution: "Tiles &copy; Esri, HERE, Garmin, &copy; OpenStreetMap contributors" }).addTo(map);
  L.tileLayer(ESRI + "World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}", { maxZoom: 16, opacity: .8 }).addTo(map);
  L.circle(BASE, { radius: 35 * 1609, color: "#ff3b52", weight: 1.5, opacity: .6, fillColor: "#ff2a48", fillOpacity: .05, dashArray: "5 7" }).addTo(map);
  const markers = CITIES.map(([n, lat, lng, base]) => L.marker([lat, lng], { icon: L.divIcon({ className: "", html: `<span class="pin${base ? " pin--base" : ""}"><i></i></span>`, iconSize: [22, 22], iconAnchor: [11, 11] }), title: n })
    .addTo(map).bindTooltip(base ? `${n} (home base)` : n, { className: "city-tip", direction: "top", offset: [0, -10] }));
  const fit = () => { const b = L.latLngBounds(CITIES.map(c => [c[1], c[2]])); const panel = innerWidth > 760 ? Math.min(560, innerWidth * .42) : 0; map.fitBounds(b, { paddingTopLeft: [panel + 30, 60], paddingBottomRight: [40, 60] }); };
  fit(); addEventListener("resize", () => { clearTimeout(fit._t); fit._t = setTimeout(fit, 200); });
  list.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return; const i = +b.dataset.i;
    $$("button", list).forEach(x => x.classList.toggle("is-on", x === b));
    map.flyTo([CITIES[i][1], CITIES[i][2]], 12, { duration: .8 }); markers[i].openTooltip();
  });
}
function initCheck() {
  const form = $(".check"), out = $(".check__out");
  const show = (cls, html) => { out.className = "check__out " + cls; out.innerHTML = html; out.hidden = false; };
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const q = form.elements.q.value.trim(); if (q.length < 3) { form.elements.q.focus(); return; }
    show("", "Checking…");
    let hit = null;
    try {
      const query = /arizona|\baz\b/i.test(q) ? q : `${q}, Arizona`;
      const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&q=${encodeURIComponent(query)}`, { headers: { "Accept-Language": "en" } });
      const j = await r.json(); if (j[0]) hit = [+j[0].lat, +j[0].lon, j[0].display_name.split(",").slice(0, 2).join(",")];
    } catch (_) {}
    if (!hit) {
      const zip = q.match(/\b8(5[0-3])\d\d\b/);
      if (zip) { show("is-yes", `<b>Yes, we come to you.</b>That ZIP is in the Valley. <a href="#book">Book an appointment</a>`); return; }
      show("is-maybe", `<b>Couldn't find that address.</b>Text it to Logan and he'll let you know. <a href="sms:${PHONE}" data-sms="Hey Logan, do you come out to ${esc(q)}?">Text Logan</a>`); return;
    }
    const d = miles(BASE, hit), place = esc(hit[2]);
    if (map) {
      youMarker && youMarker.remove();
      youMarker = L.marker([hit[0], hit[1]], { icon: L.divIcon({ className: "", html: '<span class="pin pin--you"><i></i></span>', iconSize: [22, 22], iconAnchor: [11, 11] }) }).addTo(map).bindTooltip("You", { className: "city-tip", direction: "top", offset: [0, -10], permanent: true });
      map.flyTo([hit[0], hit[1]], 11, { duration: .9 });
    }
    if (d <= 35) show("is-yes", `<b>Yes, we come to you.</b>${place} is about ${Math.round(d)} miles from home base. <a href="#book">Book an appointment</a>`);
    else if (d <= 60) show("is-maybe", `<b>Probably. Let's confirm.</b>${place} is about ${Math.round(d)} miles out. <a href="sms:${PHONE}" data-sms="Hey Logan, do you come out to ${place}?">Text Logan to check</a>`);
    else show("is-no", `<b>That's outside our usual area.</b>${place} is about ${Math.round(d)} miles away. Send Logan a message and he'll see what he can do. <a href="sms:${PHONE}" data-sms="Hey Logan, any chance you'd come out to ${place}?">Message Logan</a>`);
  });
}

/* ------------------------------------------------------------------ reveal + mobile bar */
function initReveal() {
  $$(".sec-head, .tier, .bk__step, .feat, .bw, .igp").forEach(el => el.classList.add("rv"));
  if (REDUCED) { $$(".rv").forEach(el => el.classList.add("is-in")); return; }
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
  $$(".rv:not(.is-in)").forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });
}
function initMbar() { const bar = $(".mbar"); const tog = () => bar.classList.toggle("is-on", scrollY > innerHeight * .7); addEventListener("scroll", tog, { passive: true }); }

/* ------------------------------------------------------------------ boot */
initIntro(); initNav(); initHero(); initVan(); initClub(); initBooking(); initProducts(); initReels(); initPortfolio(); initMap(); initCheck(); initReveal(); initMbar();
})();
