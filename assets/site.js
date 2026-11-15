/* Jasperson's Detailing demo v6. Before/after hero, packages on the van doors, maintenance club,
   one-box booking, products in use, auto-scrolling reels, up/down gallery, and an area checker on the map. */
(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const PHONE = "+16026160058";
const IS_LOCAL = ["localhost", "127.0.0.1", ""].includes(location.hostname);
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const money = n => n == null ? "Quote" : "$" + n.toLocaleString("en-US");
const CHECK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="square"><path d="M4 10.5l4 4 8-9"/></svg>';
const HEART = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.1 3.3 4 7.1 4c2.1 0 3.6 1.1 4.9 2.8C13.3 5.1 14.8 4 16.9 4c3.8 0 6.2 4.1 4.7 7.7C19.5 16.4 12 21 12 21z"/></svg>';
const PLAY = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
const REELI = '<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm-3 6v9a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8zm.4-2h3.3l2-2H7a3 3 0 0 0-2.6 2zm5.7 0h3.6l2-2h-3.6zm6 0H20a3 3 0 0 0-2-1.9zM10 10.5v6l5-3z"/></svg>';
const TTI = '<svg viewBox="0 0 24 24"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z"/></svg>';
const PIN = '<svg viewBox="0 0 12 14" aria-hidden="true"><path d="M6 0a5 5 0 0 0-5 5c0 3.6 5 9 5 9s5-5.4 5-9a5 5 0 0 0-5-5zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>';
const ICONS = [
  '<svg viewBox="0 0 96 50"><path d="M6 34v-7c0-2 1-3.2 3-3.7l10.5-3L29 12.2c1.5-1.4 3.4-2.2 5.4-2.2h24c2.2 0 4.2 1 5.6 2.6L72 21l12.4 2.4c2.3.5 3.6 2.4 3.6 4.8V34"/><path d="M27.5 21l7-7H45v7zM50 14h8.4c1 0 2 .5 2.7 1.3L65.5 21H50z"/><circle cx="22" cy="35" r="7"/><circle cx="72" cy="35" r="7"/><circle class="ic-a" cx="22" cy="35" r="2.4"/><circle class="ic-a" cx="72" cy="35" r="2.4"/><path d="M29 35h36M4 34h11M79 34h11"/><path class="ic-f" d="M84 3c.6 3 1.6 4 4.6 4.6-3 .6-4 1.6-4.6 4.6-.6-3-1.6-4-4.6-4.6 3-.6 4-1.6 4.6-4.6z"/></svg>',
  '<svg viewBox="0 0 96 50"><path d="M6 29v-8h34V9h17c2 0 3.6 1 4.6 2.6L68 21h17c2 0 3 1 3 3v5"/><path d="M45 12.5h10.5L61 21H45z"/><path d="M40 21v8M6 29h82"/><path class="ic-a" d="M44 5h16" stroke-width="3.4"/><circle cx="23" cy="37" r="9"/><circle cx="71" cy="37" r="9"/><circle class="ic-a" cx="23" cy="37" r="3.4"/><circle class="ic-a" cx="71" cy="37" r="3.4"/><path d="M23 29v-1M71 29v-1M33 33h28"/></svg>',
  '<svg viewBox="0 0 96 50"><path d="M3 33V12c0-2 1.5-3.5 3.5-3.5H49c3 0 5.4 1.4 7 4L62 23v10"/><path d="M8 14h11v7H8zM24 14h14v6H24zM51 13.5l6.5 9.5H51z"/><circle cx="15" cy="35" r="6"/><circle cx="49" cy="35" r="6"/><path d="M21 34h22M62 31h6"/><path class="ic-a" d="M67 27h27c-1.6 4.2-4.4 7-8.5 7H72z"/><path d="M74 27l4-6h7"/><path d="M68 38h20"/><circle cx="80" cy="41" r="3"/></svg>',
];
const AIC = {
  engine: '<svg viewBox="0 0 24 24"><path d="M3 10h3V8h11l2.5 3H21v5h-1.5L17 19H8l-2-2H3z"/><path d="M9 8V5h5v3M3 12v3"/></svg>',
  under: '<svg viewBox="0 0 24 24"><path d="M3 10h18M5 10l2-4h10l2 4"/><circle cx="7" cy="12" r="1.7"/><circle cx="17" cy="12" r="1.7"/><path d="M7 16v4M12 15v5M17 16v4"/></svg>',
  light: '<svg viewBox="0 0 24 24"><path d="M11 6C7 6 4 8.7 4 12s3 6 7 6h1V6z"/><path d="M15.5 8l5-1.5M15.5 12H21M15.5 16l5 1.5"/></svg>',
  pet: '<svg viewBox="0 0 24 24"><path d="M12 13c-3 0-5.5 3-5.5 5 0 1.5 1.2 2 2.5 2 1.2 0 2-.6 3-.6s1.8.6 3 .6c1.3 0 2.5-.5 2.5-2 0-2-2.5-5-5.5-5z"/><circle cx="6" cy="10" r="1.8"/><circle cx="9.5" cy="5.8" r="1.8"/><circle cx="14.5" cy="5.8" r="1.8"/><circle cx="18" cy="10" r="1.8"/></svg>',
  odor: '<svg viewBox="0 0 24 24"><path d="M3 9h11a3 3 0 1 0-3-3M3 13h15a3 3 0 1 1-3 3M3 17h6"/></svg>',
  glass: '<svg viewBox="0 0 24 24"><path d="M3 17l3-10h12l3 10z"/><path d="M12 9.5c1.5 2 2.4 3.1 2.4 4.2a2.4 2.4 0 0 1-4.8 0c0-1.1.9-2.2 2.4-4.2z"/></svg>',
};
/* ------------------------------------------------------------------ data */
const SIZES = ["Car / small SUV", "Truck / lifted truck", "RV / boat"];
const SIZE_SUB = ["Sedans, coupes, crossovers", "Half-tons, HDs, duallies", "Motorhomes, trailers, boats"];
const PKGS = [
  { id: "wash", n: "Signature Wash", lead: "Keeps a clean vehicle clean", t: "1.5–2 hrs", p: [85, 110, 199], li: ["Wheels, barrels & tires", "Wheel wells degreased", "Snow-foam prewash", "Hand contact wash", "Spot-free rinse", "Touchless blow-dry", "Ceramic spray topper", "Interior vacuum & wipe"] },
  { id: "interior", n: "Interior Deep Clean", lead: "The inside, reset", t: "2.5–3.5 hrs", p: [159, 189, 249], li: ["Deep vacuum, under seats", "Carpets shampooed", "Mats extracted", "Leather conditioned", "Plastics & panels dressed", "Vents & cupholders", "Odor treatment", "Glass inside & out"] },
  { id: "full", n: "Full Detail", lead: "Top to bottom, inside and out", t: "4–6 hrs", hi: "Most common", p: [249, 309, 449], li: ["Full Signature Wash", "Full Interior Deep Clean", "Paint sealant", "Door jambs", "Exterior trim dressed", "Engine bay wipe-down", "Glass inside & out", "Final walk-around"] },
  { id: "ceramic", n: "Ceramic Coating", lead: "Years of protection", t: "1–2 days", p: [899, 1149, null], li: ["Decon wash, iron & clay", "Machine polish", "Ceramic on paint", "Wheel faces coated", "Glass coated", "Trim protected", "Aftercare walkthrough", "First maintenance wash"] },
];
const PLANS = [
  { id: "monthly", n: "Monthly", card: "silver", cardName: "Silver", no: "4058  6160  0058  0112", f: "Weekend trucks & garage cars", per: [109, 135, 219], visits: 1, save: "Full interior pass included",
    li: ["1 visit a month", "Full Signature Wash", "Full interior vacuum & mats", "Plastics cleaned & dressed", "Glass inside & out"], plus: true },
  { id: "weekly", n: "Weekly", card: "red", cardName: "Red", no: "4058  6160  0058  0001", f: "Daily drivers & work trucks", hi: "Best of the best", per: [69, 89, 159], visits: 4, save: "Save 19% per wash",
    li: ["4 Signature Washes a month", "Wheels, wells & tires every visit", "Spot-free rinse & blow-dry", "Ceramic topper every visit", "Interior vacuum & wipe", "Never a dirty week"] },
  { id: "biweekly", n: "Every 2 weeks", card: "black", cardName: "Black", no: "4058  6160  0058  0024", f: "Keeps a coating performing", per: [75, 97, 175], visits: 2, save: "Save 12% per wash",
    li: ["2 Signature Washes a month", "Wheels, wells & tires every visit", "Spot-free rinse & blow-dry", "Ceramic topper every visit", "Interior vacuum & wipe"] },
];
const ADDS = [["Engine bay detail", 75, "engine", "Degreased, rinsed & dressed"], ["Undercarriage & frame", 79, "under", "Frame, axles & wells blasted"], ["Headlight restoration", 79, "light", "Cloudy lenses back to clear"],
  ["Pet hair removal", 49, "pet", "Every seat & carpet fiber"], ["Odor elimination", 59, "odor", "Smoke, pets & spills, gone"], ["Glass coating", 99, "glass", "Rain beads right off"]];
const CLIPS = [
  ["Shine Supply", "Cool Guy wheel cleaner", "Breaks brake dust down in the barrel", "step-wheels"],
  ["Koch-Chemie", "Gentle Snow Foam", "Thick prewash that lifts the grit", "step-foam"],
  ["Shine Supply", "Shift contact wash", "Slick, so the mitt glides", "step-contact"],
  ["Gyeon", "Q²M APC", "Frames, suspension, tires & wells", "step-frame"],
  ["The Rag Co. + Metrovac", "Towels & Air Force blaster", "Touchless dry, plush finish", "step-dry"],
  ["Shine Supply", "Decked Out tire shine", "Rich finish that doesn't sling", "step-dress"],
];
/* [video file, poster, platform, post id, label, count] */
const REELS = [
  ["reel-ferrari", "reel-ferrari", "tt", "7587665369498651935", "Ferrari California", "559"],
  ["feed-DZBt-xSvAdK", "feed-DZBt-xSvAdK", "ig", "DZBt-xSvAdK", "F-250 King Ranch", "17K"],
  ["reel-c8", "reel-c8", "tt", "7562669488194276638", "C8 Corvette", "878"],
  ["feed-DaEgaLtJmOe", "feed-DaEgaLtJmOe", "ig", "DaEgaLtJmOe", "Hand-engraved Super Duty", "16.6K"],
  ["reel-ferrarimacan", "reel-ferrarimacan", "tt", "7628841052408974623", "Ferrari + Porsche Macan", "1.1K"],
  ["feed-DXQIxhmD22d", "feed-DXQIxhmD22d", "ig", "DXQIxhmD22d", "GMT800 Sierra", "10.4K"],
  ["reel-macan", "reel-macan", "tt", "7568339010901347615", "Porsche Macan + C8", "760"],
  ["feed-DflhiuSvHev", "feed-DflhiuSvHev", "ig", "DflhiuSvHev", "Bagged Silverado", "3.7K"],
  ["reel-yenko", "reel-yenko", "tt", "7609793024733891871", "Real Yenko Chevelle", "570"],
  ["feed-DfbH8P5PFOb", "feed-DfbH8P5PFOb", "ig", "DfbH8P5PFOb", "'23 Super Duty", "3.3K"],
  ["reel-ferrarifoam", "reel-ferrarifoam", "tt", "7587590076838792478", "Ferrari in the foam", "601"],
  ["feed-DfiyL-6PHbj", "feed-DfiyL-6PHbj", "ig", "DfiyL-6PHbj", "Ram 2500", "1.9K"],
  ["feed-DfgI_hTvFVa", "feed-DfgI_hTvFVa", "ig", "DfgI_hTvFVa", "F-250 Lariat", "1.4K"],
  ["feed-DfVsCzhvzly", "feed-DfVsCzhvzly", "ig", "DfVsCzhvzly", "F-250 Platinum", "1.2K"],
  ["feed-DfTaAA5vgVZ", "feed-DfTaAA5vgVZ", "ig", "DfTaAA5vgVZ", "F-350 dually", "628"],
  ["feed-Dfdt4u0PXMK", "feed-Dfdt4u0PXMK", "ig", "Dfdt4u0PXMK", "F-450 dually", "229"],
  ["feed-DfYrhRWPUvr", "feed-DfYrhRWPUvr", "ig", "DfYrhRWPUvr", "Ram 2500", "496"],
];
const GAL = [
  ["pf-ferrari", "Ferrari California"], ["pf-kingranch", "King Ranch F-250"], ["gx01", "'23 Super Duty"], ["pf-c8", "C8 Corvette"], ["gx08", "Ferrari + Porsche Macan"], ["pf-dash", "Custom dash & leather"], ["gx11", "Hand-engraved F-150"],
  ["pf-engraved", "Hand-engraved Super Duty"], ["gx03", "F-250 Platinum"], ["pf-macan", "Porsche Macan"], ["gx05", "F-450 dually"], ["pf-yenko", "Yenko Chevelle"], ["gx12", "Ferrari California"], ["pf-wheel", "M wheel, brake dust gone"],
  ["pf-dually", "F-350 dually"], ["gx02", "Ram 2500"], ["pf-camo", "Hand-engraved panels"], ["gx09", "Wheels & tires"], ["pf-platinum", "F-250 Platinum"], ["gx06", "GMT800 Sierra"], ["pf-bagged", "Bagged Silverado"],
  ["gx04", "Ram 2500"], ["pf-sierra", "GMT800 Sierra"], ["gx10", "Paint & glass"], ["pf-denali", "GMC Denali"], ["gx07", "Sierra 1500"], ["pf-silverado", "Silverado"], ["pf-superduty", "'23 Super Duty"],
];
const BASE = [33.792, -112.04];
const CITIES = [
  ["North Phoenix", 33.792, -112.04, true], ["Phoenix", 33.4484, -112.074], ["Scottsdale", 33.4942, -111.9261], ["Paradise Valley", 33.5431, -111.9565],
  ["Tempe", 33.4255, -111.94], ["Mesa", 33.4152, -111.8315], ["Chandler", 33.3062, -111.8413], ["Gilbert", 33.3528, -111.789], ["Ahwatukee", 33.3384, -111.9806],
  ["Queen Creek", 33.2487, -111.6343], ["Glendale", 33.5387, -112.186], ["Peoria", 33.5806, -112.2374], ["Surprise", 33.6292, -112.3679],
  ["Sun City", 33.5975, -112.2718], ["El Mirage", 33.6131, -112.3246], ["Goodyear", 33.4353, -112.3577], ["Avondale", 33.4356, -112.3096],
  ["Litchfield Park", 33.4934, -112.358], ["Laveen", 33.3628, -112.1696], ["Anthem", 33.8673, -112.146], ["New River", 33.9159, -112.1360],
  ["Cave Creek", 33.8334, -111.9507], ["Carefree", 33.8223, -111.9182], ["Fountain Hills", 33.6117, -111.7174],
];
const LEFT = ["Surprise", "Goodyear", "Litchfield Park", "Cave Creek", "Laveen", "New River", "Anthem"];
const QUIET = ["El Mirage", "Sun City"];
const TIMES = ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM"];

/* ------------------------------------------------------------------ state */
const S = { size: 0, svc: null, day: null, time: null, adds: new Set(), month: (() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); })() };
const svcItem = id => PKGS.find(p => p.id === id) || PLANS.find(p => p.id === id);
const isPlan = id => PLANS.some(p => p.id === id);
const svcName = id => { const it = svcItem(id); return it ? (isPlan(id) ? `${it.n} plan` : it.n) : ""; };

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
  const finish = () => { document.body.classList.remove("is-intro"); document.body.classList.add("neon-on"); setTimeout(runFoam, 120); };
  if (!intro || root.classList.contains("no-intro") || REDUCED) { intro && intro.remove(); setTimeout(finish, REDUCED ? 0 : 250); return; }
  document.body.classList.add("is-intro");
  const out = () => { if (intro.classList.contains("is-out")) return; intro.classList.add("is-out"); try { sessionStorage.setItem("jd-intro", "1"); } catch (_) {} setTimeout(finish, 450); setTimeout(() => intro.remove(), 900); };
  setTimeout(out, 1850); intro.addEventListener("click", out);
}
function initNav() {
  const nav = $(".nav");
  new IntersectionObserver(([en]) => nav.classList.toggle("is-hero", en.isIntersecting), { rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) + 40}px 0px 0px 0px`, threshold: 0 }).observe($(".hero__copy"));
  const links = $$(".nav__pill a"), secs = links.map(a => $(a.getAttribute("href"))).filter(Boolean);
  const spy = () => {
    const y = scrollY + innerHeight * .35; let on = null;
    secs.forEach((s, i) => { if (s.offsetTop <= y && s.offsetTop + s.offsetHeight > y) on = i; });
    links.forEach((a, i) => a.classList.toggle("is-on", i === on));
  };
  addEventListener("scroll", () => { cancelAnimationFrame(spy._r); spy._r = requestAnimationFrame(spy); }, { passive: true }); spy();
}
function initHero() { const v = $(".hero__video video"); if (REDUCED) v.pause(); }

/* ------------------------------------------------------------------ packages on the van doors */
function doorCard(p) {
  const pr = p.p[S.size];
  return `<article class="dk${p.hi ? " dk--hi" : ""}">
    ${p.hi ? `<span class="dk__badge">${p.hi}</span>` : ""}
    <div class="dk__top"><div><h3 class="dk__n">${p.n}</h3><p class="dk__t">${p.t} on site</p></div>
    <p class="dk__p${pr == null ? " is-quote" : ""}" data-price="${p.id}">${money(pr)}<small>${SIZES[S.size]}</small></p></div>
    <p class="dk__lead">${p.lead}</p>
    <ul>${p.li.map(l => `<li>${CHECK}<span>${l}</span></li>`).join("")}</ul>
    <button type="button" class="btn ${p.hi ? "btn--red" : "btn--ink"} btn--block" data-book="${p.id}">Book ${p.n}</button></article>`;
}
function renderDoors() {
  $(".van__col--l").innerHTML = doorCard(PKGS[0]) + doorCard(PKGS[1]);
  $(".van__col--r").innerHTML = doorCard(PKGS[2]) + doorCard(PKGS[3]);
}
function initVan() {
  $(".vsize").innerHTML = SIZES.map((s, i) => `<button type="button" role="radio" aria-checked="${i === S.size}" data-size="${i}">${ICONS[i]}<span><b>${s}</b><small>${SIZE_SUB[i]}</small></span></button>`).join("");
  $(".vsize").addEventListener("click", e => { const b = e.target.closest("button"); if (b) setSize(+b.dataset.size); });
  renderDoors();
  new IntersectionObserver(([en], o) => { if (en.isIntersecting) { $(".van").classList.add("is-open"); o.disconnect(); } }, { threshold: .2 }).observe($(".vanbody"));
  $(".extras__list").innerHTML = ADDS.map(([n, p, ic, d]) => `<button type="button" class="addon" data-add="${esc(n)}" aria-pressed="false"><span class="addon__ic">${AIC[ic]}</span><span class="addon__t"><b>${n}</b><small>${d}</small></span><span class="addon__p">+${money(p)}</span><span class="addon__plus" aria-hidden="true"></span></button>`).join("");
  $(".extras__list").addEventListener("click", e => { const b = e.target.closest(".addon"); if (!b) return; toggleAdd(b.dataset.add); toast(S.adds.has(b.dataset.add) ? `${b.dataset.add} added to your booking.` : `${b.dataset.add} removed.`); });
}
function setSize(i) {
  S.size = i;
  $$(".vsize button, .club__sizes button").forEach(b => b.setAttribute("aria-checked", String(+b.dataset.size === i)));
  renderDoors(); renderTiers(); renderBookOpts(); updateSummary();
}

/* ------------------------------------------------------------------ maintenance club */
function renderTiers() {
  $(".tiers").innerHTML = PLANS.map(p => {
    const per = p.per[S.size], mo = per * p.visits;
    return `<article class="tier${p.hi ? " tier--hi" : ""}">
      ${p.hi ? `<span class="tier__flag">${p.hi}</span>` : ""}
      <div class="tier__card tier__card--${p.card}" aria-hidden="true">
        <img class="tc__logo" src="assets/brand/logo-wordmark.png" alt="" width="1025" height="391"><span class="tc__tier">${p.cardName}</span>
        <span class="tc__chip"></span><span class="tc__club">Maintenance club</span>
        <span class="tc__name"><small>Member</small>Your name here</span><span class="tc__plan"><small>Plan</small>${p.n}</span></div>
      <h3 class="tier__n">${p.n}</h3><p class="tier__f">${p.f}</p>
      <p class="tier__p"><b>${money(mo)}</b><span>/ month</span></p>
      <p class="tier__per">${money(per)} per wash <span class="tier__save">${p.save}</span></p>
      <ul>${p.li.map((l, j) => `<li class="${p.plus && j >= 2 ? "is-plus" : ""}">${CHECK}<span>${l}</span></li>`).join("")}</ul>
      <button type="button" class="btn ${p.hi ? "btn--white" : "btn--ghost"} btn--block btn--lg" data-book="${p.id}">Join the ${p.n.toLowerCase()} plan</button></article>`;
  }).join("");
}
function initClub() {
  $(".club__sizes").innerHTML = `<p>Plan prices for</p><div>${SIZES.map((s, i) => `<button type="button" role="radio" aria-checked="${i === S.size}" data-size="${i}">${s}</button>`).join("")}</div>`;
  $(".club__sizes").addEventListener("click", e => { const b = e.target.closest("button"); if (b) setSize(+b.dataset.size); });
  renderTiers();
}

/* ------------------------------------------------------------------ booking: one box */
const bx = $(".bx");
const chip = (name, val, on, inner) => `<label class="chip"><input type="radio" name="${name}" value="${val}" ${on ? "checked" : ""}><span>${inner}</span></label>`;
function toggleAdd(n, on) {
  const want = on === undefined ? !S.adds.has(n) : on;
  want ? S.adds.add(n) : S.adds.delete(n);
  $$(".addon").forEach(b => b.setAttribute("aria-pressed", String(S.adds.has(b.dataset.add))));
  $$('input[name="adds"]').forEach(i => i.checked = S.adds.has(i.value));
  updateSummary();
}
const addTotal = () => ADDS.filter(([n]) => S.adds.has(n)).reduce((t, [, p]) => t + p, 0);
function renderBookOpts() {
  $('[data-name="svc"]').innerHTML = PKGS.map(p => chip("svc", p.id, S.svc === p.id, `<b>${p.n}</b><i>${p.t}</i><em>${money(p.p[S.size])}</em>`)).join("");
  let plan = $(".chips--plan");
  if (!plan) { $('[data-name="svc"]').insertAdjacentHTML("afterend", `<p class="bq__sub">Or join a maintenance plan</p><div class="chips chips--plan"></div>`); plan = $(".chips--plan"); }
  plan.innerHTML = PLANS.map(p => chip("svc", p.id, S.svc === p.id, `<b>${p.n}</b><em>${money(p.per[S.size] * p.visits)}<small style="font:600 12px var(--f-body)">/mo</small></em>`)).join("");
  $('[data-name="size"]').innerHTML = SIZES.map((s, i) => chip("size", i, S.size === i, `<b>${s}</b>`)).join("");
  $('[data-name="adds"]').innerHTML = ADDS.map(([n, p, ic]) => `<label class="chip chip--add"><input type="checkbox" name="adds" value="${esc(n)}" ${S.adds.has(n) ? "checked" : ""}><span>${AIC[ic]}<b>${n}</b><em>+${money(p)}</em></span></label>`).join("");
}
const dayKey = dt => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
function renderCal() {
  const m = S.month, today = new Date(); today.setHours(0, 0, 0, 0);
  $(".cal__month").textContent = m.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const first = new Date(m.getFullYear(), m.getMonth(), 1).getDay(), days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
  let html = Array.from({ length: first }, () => "<i></i>").join("");
  for (let d = 1; d <= days; d++) {
    const dt = new Date(m.getFullYear(), m.getMonth(), d), off = dt <= today || dt.getDay() === 0, key = dayKey(dt);
    html += `<button type="button" data-day="${key}" ${off ? "disabled" : ""} class="${S.day === key ? "is-on" : ""}" aria-label="${dt.toDateString()}">${d}</button>`;
  }
  $(".cal__grid").innerHTML = html;
  const cur = new Date(); $('[data-cal="-1"]').disabled = m.getFullYear() === cur.getFullYear() && m.getMonth() === cur.getMonth();
}
const whenText = () => S.day ? new Date(S.day + "T12:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) + (S.time ? ` · ${S.time}` : "") : "";
function updateSummary() {
  const it = S.svc && svcItem(S.svc), plan = it && isPlan(S.svc);
  const set = (k, v, fb) => { const el = $(`[data-sum="${k}"]`); el.textContent = v || fb; el.classList.toggle("is-set", !!v); };
  set("svc", it ? svcName(S.svc) : "", "Pick one");
  set("size", SIZES[S.size], "—");
  set("adds", S.adds.size ? [...S.adds].join(", ") : "", "None");
  set("when", whenText() + (S.day && !S.time ? " · pick a time" : ""), "Pick a day");
  const base = it ? (plan ? it.per[S.size] * it.visits : it.p[S.size]) : 0;
  $('[data-sum="total"]').innerHTML = base == null ? "Quote" : money(base + addTotal()) + (plan ? ` <small>${S.adds.size ? "first month" : "/mo"}</small>` : "");
  const sd = $(".cal__sel"); if (sd) sd.innerHTML = S.day ? `<b>${new Date(S.day + "T12:00").toLocaleDateString("en-US", { weekday: "long" })}</b><span>${new Date(S.day + "T12:00").toLocaleDateString("en-US", { month: "long", day: "numeric" })}${S.time ? " · " + S.time : " · pick a time"}</span>` : `<b>Pick a day</b><span>Mon–Sat, arrival windows below</span>`;
}
function initBooking() {
  renderBookOpts(); renderCal();
  $('[data-name="time"]').innerHTML = TIMES.map(t => chip("time", t, false, `<b>${t}</b>`)).join("");
  bx.addEventListener("change", e => {
    const t = e.target;
    if (t.name === "svc") S.svc = t.value;
    if (t.name === "size") return setSize(+t.value);
    if (t.name === "time") S.time = t.value;
    if (t.name === "adds") return toggleAdd(t.value, t.checked);
    updateSummary();
  });
  bx.addEventListener("input", e => e.target.classList && e.target.classList.remove("is-bad"));
  $(".cal__grid").addEventListener("click", e => { const b = e.target.closest("button[data-day]"); if (!b) return; S.day = b.dataset.day; renderCal(); updateSummary(); });
  $$(".cal__nav").forEach(b => b.addEventListener("click", () => { S.month = new Date(S.month.getFullYear(), S.month.getMonth() + +b.dataset.cal, 1); renderCal(); }));
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-book]"); if (!b) return;
    S.svc = b.dataset.book; renderBookOpts(); updateSummary();
    $("#book").scrollIntoView({ behavior: "smooth" });
    toast(`${svcName(S.svc)} selected. Now pick a day and time.`);
  });
  bx.addEventListener("submit", e => {
    e.preventDefault();
    const f = bx.elements; let msg = "";
    if (!S.svc) msg = "Pick a package or plan first."; else if (!S.day) msg = "Pick a day on the calendar."; else if (!S.time) msg = "Pick an arrival time.";
    let bad = null;
    [["addr", v => v.trim().length > 4], ["name", v => v.trim().length > 1], ["phone", v => (v.match(/\d/g) || []).length >= 10]].forEach(([n, t]) => { const no = !t(f[n].value); f[n].classList.toggle("is-bad", no); if (no && !bad) bad = f[n]; });
    if (msg) return toast(msg);
    if (bad) { toast("Add your address, name and mobile so Logan can confirm."); return bad.focus(); }
    $(".bx__donesum").innerHTML = [["Package", svcName(S.svc)], ["Vehicle", SIZES[S.size]], ...(S.adds.size ? [["Add-ons", [...S.adds].join(", ")]] : []), ["When", whenText()], ["Where", f.addr.value]].map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("");
    $(".bx__done").hidden = false;
  });
  $(".bx__again").addEventListener("click", () => { $(".bx__done").hidden = true; bx.reset(); S.svc = S.day = S.time = null; S.adds.clear(); toggleAdd("", false); renderBookOpts(); renderCal(); updateSummary(); });
  updateSummary();
}
function summaryText() {
  const f = bx.elements;
  return [`Hey Logan, I booked on your site:`, `Package: ${svcName(S.svc)}`, `Vehicle: ${SIZES[S.size]}`, S.adds.size ? `Add-ons: ${[...S.adds].join(", ")}` : "", `When: ${whenText()}`, `Address: ${f.addr.value}`,
    f.notes.value ? `Notes: ${f.notes.value}` : "", `Name: ${f.name.value}`, `Phone: ${f.phone.value}`].filter(Boolean).join("\n");
}

/* ------------------------------------------------------------------ products */
function initProducts() {
  $(".pclips").innerHTML = CLIPS.map(([brand, name, use, clip]) => `<article class="pclip rv">
      <video muted playsinline loop preload="none" poster="assets/img/${clip}.jpg" data-src="assets/v/${clip}.mp4"></video>
      <span class="pclip__brand">${brand}</span><div class="pclip__body"><b>${name}</b><span>${use}</span></div></article>`).join("")
    + `<article class="pclip pclip--shelf rv"><img src="assets/img/shelf.jpg" alt="Shine Supply gallons lined up in front of the Jasperson's van" loading="lazy">
      <span class="pclip__brand">The lineup</span><div class="pclip__body"><b>On the van, every job</b><span>Gallons, not bottles.</span></div></article>`;
  $$(".pclips video, .feat video").forEach(v => lazyIO.observe(v));
}

/* ------------------------------------------------------------------ reels: auto-scrolling carousel */
function initReels() {
  const run = $(".reelrun"), track = $(".reelrun__track");
  const one = REELS.map(([vid, poster, pf, id, label, n]) => {
    const url = pf === "ig" ? `https://www.instagram.com/reel/${id}/` : `https://www.tiktok.com/@jaspersonsdetailing/video/${id}`;
    return `<a class="reel" href="${url}" target="_blank" rel="noopener" aria-label="${esc(label)} on ${pf === "ig" ? "Instagram" : "TikTok"}">
      <img src="assets/img/${poster}.jpg" alt="" loading="lazy" width="540" height="960"><video muted playsinline loop preload="none" data-reel="assets/v/${vid}.mp4"></video>
      <span class="reel__pf">${pf === "ig" ? REELI : TTI}</span>
      <span class="reel__meta"><b>${esc(label)}</b><span>${pf === "ig" ? HEART : PLAY}${n}</span></span></a>`;
  }).join("");
  track.innerHTML = one + one.replace(/<a class="reel"/g, '<a class="reel" tabindex="-1" aria-hidden="true"');
  run.style.setProperty("--dur", `${REELS.length * 5.5}s`);
  if (REDUCED) return;
  const io = new IntersectionObserver(es => es.forEach(en => {
    const a = en.target, v = a.querySelector("video");
    if (en.isIntersecting) { if (!v.src) v.src = v.dataset.reel; v.play().then(() => a.classList.add("is-play")).catch(() => {}); }
    else { v.pause(); a.classList.remove("is-play"); }
  }), { threshold: .3 });
  $$(".reel", track).forEach(r => io.observe(r));
  run.addEventListener("focusin", () => run.classList.add("is-paused"));
  run.addEventListener("focusout", () => run.classList.remove("is-paused"));
}

/* ------------------------------------------------------------------ gallery: up/down columns + lightbox */
function initGallery() {
  const n = 4, cols = Array.from({ length: n }, () => []);
  GAL.forEach((g, i) => cols[i % n].push([g, i]));
  const tile = ([[k, label], i], dup) => `<button type="button" class="gtile" data-i="${i}"${dup ? ' tabindex="-1" aria-hidden="true"' : ""}><img src="assets/img/${k}.jpg" alt="${dup ? "" : esc(label)}" loading="lazy" width="640" height="800"><span>${esc(label)}</span></button>`;
  $(".cols").innerHTML = cols.map((c, j) => `<div class="col"><div class="col__track" style="--dur:${52 + j * 7}s">${c.map(t => tile(t)).join("")}${c.map(t => tile(t, 1)).join("")}</div></div>`).join("");
  document.body.insertAdjacentHTML("beforeend", `<div class="lb" hidden role="dialog" aria-label="Photo viewer"><button type="button" class="lb__nav lb__nav--l" aria-label="Previous">‹</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="lb__nav lb__nav--r" aria-label="Next">›</button><button type="button" class="lb__x" aria-label="Close">✕</button></div>`);
  const lb = $(".lb"), img = $("img", lb), cap = $("figcaption", lb); let at = 0;
  const show = i => { at = (i + GAL.length) % GAL.length; img.src = `assets/img/${GAL[at][0]}.jpg`; img.alt = GAL[at][1]; cap.textContent = GAL[at][1]; };
  $(".cols").addEventListener("click", e => { const t = e.target.closest(".gtile"); if (!t) return; show(+t.dataset.i); lb.hidden = false; });
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
  list.innerHTML = CITIES.map(([n, , , base], i) => `<li${base ? ' class="is-base"' : ""}><button type="button" data-i="${i}" title="Mobile detailing in ${n}">${PIN}${n}</button></li>`).join("");
  if (!window.L) return;
  map = L.map("map", { zoomControl: true, scrollWheelZoom: false, attributionControl: true });
  const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/";
  L.tileLayer(ESRI + "World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", { maxZoom: 16, attribution: "Tiles &copy; Esri, HERE, Garmin, &copy; OpenStreetMap contributors" }).addTo(map);
  const markers = CITIES.map(([n, lat, lng, base]) => L.marker([lat, lng], { icon: L.divIcon({ className: "", html: `<span class="pin${base ? " pin--base" : ""}"><i></i></span>`, iconSize: [22, 22], iconAnchor: [11, 11] }), title: n })
    .addTo(map).bindTooltip(base ? `${n} · home base` : n, { className: "city-lbl" + (base ? " is-base" : ""), direction: LEFT.includes(n) ? "left" : "right", offset: [LEFT.includes(n) ? -10 : 10, 0], permanent: !QUIET.includes(n) }));
  const fit = () => { const b = L.latLngBounds(CITIES.map(c => [c[1], c[2]])); const panel = innerWidth > 760 ? Math.min(620, innerWidth * .4) : 0; map.fitBounds(b, { paddingTopLeft: [panel + 40 + (panel ? Math.min(140, Math.max(24, innerWidth * .07)) : 0), 80], paddingBottomRight: [90, 80] }); };
  initHopper(markers);
  fit(); addEventListener("resize", () => { clearTimeout(fit._t); fit._t = setTimeout(fit, 200); });
  list.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return; const i = +b.dataset.i;
    $$("button", list).forEach(x => x.classList.toggle("is-on", x === b));
    map.flyTo([CITIES[i][1], CITIES[i][2]], 12, { duration: .8 });
    if (innerWidth <= 760) $("#map").scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
function initHopper(markers) {
  if (REDUCED) return;
  const left = CITIES.map((_, i) => i), order = [0]; left.splice(0, 1);
  while (left.length) { const c = CITIES[order[order.length - 1]]; let bi = 0, bd = 1e9; left.forEach((j, k) => { const d = miles([c[1], c[2]], [CITIES[j][1], CITIES[j][2]]); if (d < bd) { bd = d; bi = k; } }); order.push(left.splice(bi, 1)[0]); }
  const hop = L.marker([CITIES[0][1], CITIES[0][2]], { icon: L.divIcon({ className: "", html: '<span class="hop"><span class="hop__b"><img src="assets/brand/logo-1080.jpg" alt=""></span><i class="hop__sh"></i></span>', iconSize: [48, 48], iconAnchor: [24, 44] }), zIndexOffset: 1000, interactive: false, keyboard: false }).addTo(map);
  const el = () => hop.getElement() && hop.getElement().querySelector(".hop__b");
  let k = 0, visible = false;
  new IntersectionObserver(([en]) => visible = en.isIntersecting).observe($("#map"));
  const step = () => {
    if (!visible || document.hidden) return setTimeout(step, 600);
    const a = CITIES[order[k]], b = CITIES[order[(k + 1) % order.length]], t0 = performance.now(), dur = 1000;
    const frame = now => {
      const t = Math.min(1, (now - t0) / dur), e = t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      hop.setLatLng([a[1] + (b[1] - a[1]) * e, a[2] + (b[2] - a[2]) * e]);
      const b2 = el(); if (b2) b2.style.transform = `translateY(${-Math.sin(Math.PI * t) * 46}px)`;
      if (t < 1) return requestAnimationFrame(frame);
      k = (k + 1) % order.length;
      const pin = markers[order[k]].getElement(); if (pin) { pin.classList.remove("is-land"); void pin.offsetWidth; pin.classList.add("is-land"); }
      setTimeout(step, 700);
    };
    requestAnimationFrame(frame);
  };
  setTimeout(step, 900);
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
      youMarker = L.marker([hit[0], hit[1]], { icon: L.divIcon({ className: "", html: '<span class="pin pin--you"><i></i></span>', iconSize: [22, 22], iconAnchor: [11, 11] }) }).addTo(map).bindTooltip("You", { className: "city-lbl", direction: "right", offset: [10, 0], permanent: true });
      map.flyTo([hit[0], hit[1]], 11, { duration: .9 });
    }
    if (d <= 35) show("is-yes", `<b>Yes, we come to you.</b>${place} is about ${Math.round(d)} miles from home base. <a href="#book">Book an appointment</a>`);
    else if (d <= 60) show("is-maybe", `<b>Probably. Let's confirm.</b>${place} is about ${Math.round(d)} miles out. <a href="sms:${PHONE}" data-sms="Hey Logan, do you come out to ${place}?">Text Logan to check</a>`);
    else show("is-no", `<b>That's outside our usual area.</b>${place} is about ${Math.round(d)} miles away. Send Logan a message and he'll see what he can do. <a href="sms:${PHONE}" data-sms="Hey Logan, any chance you'd come out to ${place}?">Message Logan</a>`);
  });
}

/* ------------------------------------------------------------------ reveal + mobile bar */
function initReveal() {
  $$(".sec-head, .feat, .bw, .igx").forEach(el => el.classList.add("rv"));
  const FIC = { spray: '<svg viewBox="0 0 24 24"><path d="M3 15h7l2-2h4"/><path d="M16 13l5-4M16 13h5M16 13l5 4"/><path d="M6 15v5h3v-5"/></svg>', truck: '<svg viewBox="0 0 24 24"><path d="M2 16V7h11v9M13 10h4.5l3.5 3.5V16h-2M6 16h7"/><circle cx="6" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>', bolt: '<svg viewBox="0 0 24 24"><path d="M13 2L5 14h6l-1 8 8-12h-6z"/></svg>', hand: '<svg viewBox="0 0 24 24"><path d="M14.5 4.5a4.5 4.5 0 0 0-5.6 5.6L3 16l4 4 5.9-5.9a4.5 4.5 0 0 0 5.6-5.6l-2.8 2.8-2.6-.6-.6-2.6z"/></svg>' };
  document.querySelectorAll(".facts li").forEach(li => { li.querySelector("i").innerHTML = FIC[li.dataset.ic] || ""; });
  const facts = $(".facts"); if (facts) new IntersectionObserver(([en], o) => { if (en.isIntersecting) { facts.classList.add("is-in"); o.disconnect(); } }, { threshold: .3 }).observe(facts);
  if (REDUCED) { $$(".rv").forEach(el => el.classList.add("is-in")); return; }
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
  $$(".rv:not(.is-in)").forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });
}
function initMbar() { const bar = $(".mbar"); const tog = () => bar.classList.toggle("is-on", scrollY > innerHeight * .7); addEventListener("scroll", tog, { passive: true }); }


/* ------------------------------------------------------------------ hero foam: sprayed on, then drips off */
function runFoam() {
  const hero = $(".hero"); if (!hero || REDUCED) return;
  const cv = document.createElement("canvas"); cv.className = "foam"; cv.setAttribute("aria-hidden", "true");
  hero.appendChild(cv);
  const dpr = Math.min(devicePixelRatio || 1, 2), W = hero.clientWidth, H = Math.min(hero.clientHeight, innerHeight * 1.05);
  cv.width = W * dpr; cv.height = H * dpr; cv.style.height = H + "px";
  const g = cv.getContext("2d"); g.scale(dpr, dpr);
  const mobile = W < 760, scale = mobile ? .7 : 1;

  /* one foam-blob sprite: soft white puff with a few bubble rims */
  const sprite = (tint) => {
    const s = document.createElement("canvas"), n = 128; s.width = s.height = n; const c = s.getContext("2d");
    const grd = c.createRadialGradient(n * .45, n * .42, n * .05, n / 2, n / 2, n / 2);
    grd.addColorStop(0, tint ? "rgba(255,236,240,1)" : "rgba(255,255,255,1)");
    grd.addColorStop(.62, tint ? "rgba(255,214,222,.95)" : "rgba(246,248,250,.95)");
    grd.addColorStop(1, "rgba(235,238,242,0)");
    c.fillStyle = grd; c.beginPath(); c.arc(n / 2, n / 2, n / 2, 0, 7); c.fill();
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * 7, r = Math.random() * n * .3, br = 3 + Math.random() * 9;
      c.strokeStyle = "rgba(190,198,208,.55)"; c.lineWidth = 1.2;
      c.beginPath(); c.arc(n / 2 + Math.cos(a) * r, n / 2 + Math.sin(a) * r, br, 0, 7); c.stroke();
      c.fillStyle = "rgba(255,255,255,.9)"; c.beginPath(); c.arc(n / 2 + Math.cos(a) * r - br * .35, n / 2 + Math.sin(a) * r - br * .35, br * .3, 0, 7); c.fill();
    }
    return s;
  };
  const SPR = [sprite(false), sprite(false), sprite(true)];

  /* timeline (ms) */
  const SPRAY = 1250, HOLD = 450, DRIP0 = SPRAY + HOLD, END = 3900;
  /* the spray sweeps in three diagonal passes, like a foam cannon working across a panel */
  const path = t => { const pass = Math.min(2, Math.floor(t * 3)), u = t * 3 - pass, y = H * (.18 + pass * .3), x = pass % 2 ? W * (1.02 - u * 1.04) : W * (-.02 + u * 1.04); return [x, y + Math.sin(u * 9) * 18]; };
  const SRC = [W * .92, -60];
  const colSpeed = Array.from({ length: Math.ceil(W / 34) + 1 }, () => .55 + Math.random() * .9);
  const blobs = [], mist = [];
  let last = 0; const t0 = performance.now();

  let emitted = 0; const STEPS = 84;
  const emit = (now, t) => {
    const [nx, ny] = path(t), count = mobile ? 12 : 20;
    for (let i = 0; i < count; i++) {
      const tx = nx + (Math.random() - .5) * 240 * scale, ty = ny + (Math.random() - .5) * 200 * scale;
      blobs.push({ sx: SRC[0], sy: SRC[1], x: tx, y: ty, r: (22 + Math.random() * 46) * scale, born: now, fly: 90 + Math.random() * 90,
        spr: SPR[Math.random() < .14 ? 2 : (Math.random() < .5 ? 0 : 1)], rot: Math.random() * 6.28,
        drip: DRIP0 + Math.random() * 450 + (1 - ty / H) * 250, vy: 0, dy: 0, sp: colSpeed[Math.max(0, Math.min(colSpeed.length - 1, Math.floor(tx / 34)))], streak: Math.random() < .12 });
    }
    for (let i = 0; i < 6; i++) mist.push({ x: SRC[0], y: SRC[1], tx: nx + (Math.random() - .5) * 320, ty: ny + (Math.random() - .5) * 260, born: now, life: 260 + Math.random() * 200 });
  };

  const frame = now => {
    const el = now - t0, dt = Math.min(40, now - (last || now)); last = now;
    const due = Math.min(STEPS, Math.floor(el / SPRAY * STEPS));
    while (emitted < due) { emitted++; emit(now - (due - emitted) * (SPRAY / STEPS) * 0, emitted / STEPS); }
    g.clearRect(0, 0, W, H);
    /* mist: fine droplets streaking from the cannon */
    g.fillStyle = "rgba(255,255,255,.7)";
    for (let i = mist.length - 1; i >= 0; i--) {
      const m = mist[i], u = (now - m.born) / m.life; if (u >= 1) { mist.splice(i, 1); continue; }
      const x = m.x + (m.tx - m.x) * u, y = m.y + (m.ty - m.y) * u; g.globalAlpha = 1 - u; g.fillRect(x, y, 2.2, 2.2);
    }
    let alive = 0;
    for (const b of blobs) {
      const age = now - b.born, flyU = Math.min(1, age / b.fly);
      let x = b.sx + (b.x - b.sx) * flyU, y = b.sy + (b.y - b.sy) * flyU, r = b.r * (.35 + .65 * flyU), a = 1, stretch = 1;
      if (flyU >= 1) {
        const settle = Math.min(1, (age - b.fly) / 220); r = b.r * (1 + .12 * settle);
        if (el > b.drip) {
          b.vy += 1.15 * b.sp * dt / 16; b.dy += b.vy * dt / 16;
          y = b.y + b.dy; stretch = 1 + Math.min(1.6, b.vy / 9);
          a = Math.max(0, 1 - b.dy / (H * .55 + b.r));
          if (b.streak && a > 0) { g.globalAlpha = a * .35; g.fillStyle = "#f4f6f8"; g.fillRect(x - r * .18, b.y, r * .36, b.dy); }
        }
      }
      if (a <= 0.01 || y - r > H) continue;
      alive++;
      g.globalAlpha = a * (flyU < 1 ? .85 : .96);
      g.save(); g.translate(x, y); g.rotate(b.rot); g.scale(1 / Math.sqrt(stretch), stretch);
      g.drawImage(b.spr, -r, -r, r * 2, r * 2); g.restore();
    }
    g.globalAlpha = 1;
    if (el < END && (alive || el < DRIP0)) requestAnimationFrame(frame);
    else cv.remove();
  };
  requestAnimationFrame(frame);
}

/* ------------------------------------------------------------------ boot */
initIntro(); initNav(); initHero(); initVan(); initClub(); initBooking(); initProducts(); initReels(); initGallery(); initMap(); initCheck(); initReveal(); initMbar();
})();
