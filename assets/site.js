/* Jasperson's Detailing demo v4. Hyer-style layout: hero, services carousel, pricing, why, Instagram,
   brands, service-area map, gallery. One estimate dialog serves every CTA. */
(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const PHONE = "+16026160058";
const IS_LOCAL = ["localhost", "127.0.0.1", ""].includes(location.hostname);
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const CHECK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"><path d="M4 10.5l4 4 8-9"/></svg>';
const HEART = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.1 3.3 4 7.1 4c2.1 0 3.6 1.1 4.9 2.8C13.3 5.1 14.8 4 16.9 4c3.8 0 6.2 4.1 4.7 7.7C19.5 16.4 12 21 12 21z"/></svg>';
const IGI = '<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 7.3A4.7 4.7 0 1 0 16.7 12 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm6-7.9a1.1 1.1 0 1 1-1.1-1.1A1.1 1.1 0 0 1 18 7.1zM21.9 8.2a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0-3.8-1.5C15.1 2.8 8.9 2.8 7.4 2.9a5.4 5.4 0 0 0-3.8 1.5A5.4 5.4 0 0 0 2.1 8.2c-.1 1.5-.1 7.7 0 9.2a5.4 5.4 0 0 0 1.5 3.8 5.4 5.4 0 0 0 3.8 1.5c1.5.1 7.7.1 9.2 0a5.4 5.4 0 0 0 3.8-1.5 5.4 5.4 0 0 0 1.5-3.8c.1-1.5.1-7.7 0-9.2z"/></svg>';

/* ------------------------------------------------------------------ data */
const SERVICES = [
  { id: "Full Detail", img: "svc-full", t: "Full Detail", d: "Every exterior and interior step, plus a real paint sealant.", li: ["Hand wash + paint sealant", "Carpets shampooed & extracted", "Leather & plastics dressed"], from: "$249" },
  { id: "Hand Wash", img: "svc2-wash", t: "Signature Hand Wash", d: "Snow foam, hand wash, spot-free rinse and a ceramic topper.", li: ["Wheels, barrels & wells", "Touchless blow-dry", "Quick interior vacuum"], from: "$85" },
  { id: "Interior Shampoo", img: "svc2-interior", t: "Interior Deep Clean", d: "Shampoo and extraction that takes the inside back to day one.", li: ["Carpets & mats extracted", "Vents, seams & cupholders", "Odor neutralized"], from: "$159" },
  { id: "Leather", img: "svc2-leather", t: "Leather Clean & Condition", d: "Cleaned first, then conditioned so it doesn't crack in the Arizona heat.", li: ["Seats & bolsters", "Steering wheel & armrests", "Non-greasy finish"], from: "$69" },
  { id: "Engine Bay", img: "svc2-engine", t: "Engine Bay Detail", d: "Degreased, rinsed safely and dressed. The first thing a buyer looks at.", li: ["Degrease & safe rinse", "Plastics & hoses dressed", "Great before a sale"], from: "$75" },
  { id: "Undercarriage & Frame", img: "chassis", t: "Undercarriage & Frame", d: "On a lifted truck, everything behind the wheel is on display.", li: ["Frame rails & crossmembers", "Coilovers & control arms", "Inner fender liners"], from: "$79" },
  { id: "Hand Wash", img: "svc2-wheels", t: "Wheels, Tires & Wells", d: "Brake dust broken down and brushed out of the barrel, not wiped off the face.", li: ["Barrels & backs of spokes", "Wells degreased", "Tires dressed, no sling"], from: "Included", inc: true },
  { id: "Ceramic Coating", img: "svc-ceramic", t: "Ceramic Coating", d: "Decon, machine polish, then a hard ceramic layer that sheds water and dust.", li: ["Decon & machine polish", "Paint, wheels & glass coated", "Easier washes for years"], from: "$899" },
  { id: "Maintenance Plan", img: "svc2-plans", t: "Maintenance Plans", d: "Keep it right. Same day, same window, the full process every visit.", li: ["Weekly, 2-week or monthly", "Locked-in schedule", "Keeps coatings performing"], from: "$69/visit" },
  { id: "Fleet / Commercial", img: "svc2-fleet", t: "Fleet & Commercial", d: "Work trucks, semis and company fleets, on site and on a schedule.", li: ["Work trucks & semis", "Dump trucks & equipment", "Recurring fleet schedules"], from: "Custom quote", inc: true },
  { id: "Classic / Bike / Toy", img: "svc2-classic", t: "Classics, Bikes & Toys", d: "Muscle cars, motorcycles, side-by-sides and sand rails.", li: ["Classic & muscle cars", "Motorcycles", "Side-by-sides & sand rails"], from: "Custom quote", inc: true },
];
const SIZES = ["Car / small SUV", "Truck / 3-row SUV", "Lifted / HD / dually"];
const PKGS = [
  { n: "Signature Wash", svc: "Hand Wash", t: "1.5–2 hrs", p: [85, 110, 135], li: ["Wheels, barrels & tires", "Wheel wells degreased", "Snow-foam prewash", "Hand contact wash", "Spot-free rinse + blow-dry", "Ceramic spray topper", "Tires dressed", "Quick interior vacuum & wipe"] },
  { n: "Interior Deep Clean", svc: "Interior Shampoo", t: "2.5–3.5 hrs", p: [159, 189, 219], li: ["Deep vacuum, under & between seats", "Carpets & mats shampooed + extracted", "Leather cleaned & conditioned", "Plastics & door panels dressed", "Vents, seams & cupholders", "Door jambs", "Odor treatment", "Glass inside & out"] },
  { n: "Full Detail", svc: "Full Detail", t: "4–6 hrs", hi: "Most complete", p: [249, 309, 379], li: ["The full Signature Wash exterior", "The full Interior Deep Clean", "Paint sealant for longer protection", "Exterior trim dressed", "Glass inside & out", "Final walk-around with you"] },
  { n: "Ceramic Coating", svc: "Ceramic Coating", t: "1–2 days", p: [899, 1149, 1399], li: ["Decontamination wash, iron & clay", "Machine polish for gloss & depth", "Ceramic coating on paint", "Wheel faces & glass coated", "Aftercare walkthrough"] },
];
const PLANS = [["Weekly", "Daily drivers & work trucks", 69], ["Every 2 weeks", "Coated paint & weekend trucks", 75], ["Monthly", "Full wash + interior pass", 109]];
const ADDS = [["Engine bay detail", 75], ["Undercarriage & frame", 79], ["Headlight restoration", 79], ["Leather conditioning", 69], ["Odor elimination", 59], ["Pet hair removal", 49], ["Glass coating", 99]];
const RIBBON = ["Full details", "Interior shampoo", "Engine bays", "Undercarriage & frame", "Ceramic coating", "Leather conditioning", "Wheels & tires", "Fleets & semis", "We come to you"];
const REELS = [
  ["DZBt-xSvAdK", "F-250 King Ranch", "17K"], ["DaEgaLtJmOe", "Hand-engraved Super Duty", "16.6K"], ["DXQIxhmD22d", "GMT800 Sierra", "10.4K"],
  ["DflhiuSvHev", "Bagged Silverado", "3.7K"], ["DfbH8P5PFOb", "'23 Super Duty", "3.3K"], ["DfiyL-6PHbj", "Ram 2500", "1.9K"],
  ["DfgI_hTvFVa", "F-250 Lariat", "1.4K"], ["DfVsCzhvzly", "F-250 Platinum", "1.2K"], ["DfTaAA5vgVZ", "F-350 dually", "628"],
  ["DfYrhRWPUvr", "Ram 2500", "496"], ["Dfdt4u0PXMK", "F-450 dually", "229"], ["DfoG9MJPrvT", "Sierra 1500", "45"],
];
const CITIES = [ // name, lat, lng (base = home base)
  ["North Phoenix", 33.792, -112.04, true], ["Phoenix", 33.4484, -112.074], ["Scottsdale", 33.4942, -111.9261],
  ["Tempe", 33.4255, -111.94], ["Mesa", 33.4152, -111.8315], ["Chandler", 33.3062, -111.8413], ["Gilbert", 33.3528, -111.789],
  ["Glendale", 33.5387, -112.186], ["Peoria", 33.5806, -112.2374], ["Surprise", 33.6292, -112.3679],
  ["Anthem", 33.8673, -112.146], ["Cave Creek", 33.8334, -111.9507], ["Paradise Valley", 33.5431, -111.9565], ["Fountain Hills", 33.6117, -111.7174],
];
const TRUCKS = ["Hand-engraved Super Duty", "F-350 dually", "F-250 Platinum", "Bagged Silverado", "'23 Super Duty", "Ram 2500"];
const SCENE = 3.2;
const EST_SERVICES = ["Full Detail", "Hand Wash", "Interior Shampoo", "Leather", "Engine Bay", "Undercarriage & Frame", "Ceramic Coating", "Maintenance Plan", "Fleet / Commercial", "Classic / Bike / Toy", "Not sure yet"];
const EST_VEH = ["Car", "SUV", "Truck", "Lifted / HD / Dually", "Other"];

/* ------------------------------------------------------------------ utils */
function toast(m) { const t = $(".toast"); t.textContent = m; t.classList.add("is-on"); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("is-on"), 3600); }
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="sms:"], a[href^="tel:"]'); if (!a) return;
  const body = a.hasAttribute("data-sms-summary") ? summaryText() : "";
  if (IS_LOCAL) { e.preventDefault(); toast(a.href.startsWith("sms:") ? "Demo: this opens a text to 602-616-0058 with the details filled in." : "Demo: this calls 602-616-0058."); return; }
  if (body) { e.preventDefault(); location.href = `sms:${PHONE}?&body=${encodeURIComponent(body)}`; }
});

/* ------------------------------------------------------------------ intro + neon */
function initIntro() {
  const intro = $(".intro"), root = document.documentElement;
  const finish = () => { document.body.classList.remove("is-intro"); document.body.classList.add("neon-on"); };
  if (!intro || root.classList.contains("no-intro") || REDUCED) { intro && intro.remove(); setTimeout(finish, REDUCED ? 0 : 250); return; }
  document.body.classList.add("is-intro");
  const out = () => { if (intro.classList.contains("is-out")) return; intro.classList.add("is-out"); try { sessionStorage.setItem("jd-intro", "1"); } catch (_) {} setTimeout(finish, 450); setTimeout(() => intro.remove(), 900); };
  setTimeout(out, 1850); intro.addEventListener("click", out);
}

/* ------------------------------------------------------------------ hero: grouped-by-truck reels */
function initHero() {
  const cols = $$(".hero__col"), mob = $(".hero__mob"), label = $(".hero__truck"), small = matchMedia("(max-width: 760px)");
  let last = -1;
  const setLabel = i => { if (i === last) return; last = i; label.textContent = TRUCKS[i]; label.classList.remove("is-swap"); void label.offsetWidth; label.classList.add("is-swap"); };
  const tick = () => {
    const v = small.matches ? mob : cols[0], per = small.matches ? SCENE * 3 * (1.45 / SCENE) : SCENE;
    if (v && v.readyState >= 1) setLabel(Math.floor(v.currentTime / per) % TRUCKS.length);
    requestAnimationFrame(tick);
  };
  const sync = () => {
    if (small.matches) { if (!mob.src) mob.src = mob.dataset.src; mob.play().catch(() => {}); cols.forEach(v => v.pause()); }
    else { mob.pause(); cols.forEach(v => { v.currentTime = cols[0].currentTime; v.play().catch(() => {}); }); }
  };
  // keep the three columns locked together so every cut lands on the same truck
  cols[0].addEventListener("seeked", () => cols.slice(1).forEach(v => { v.currentTime = cols[0].currentTime; }));
  setInterval(() => { if (small.matches) return; const t = cols[0].currentTime; cols.slice(1).forEach(v => { if (Math.abs(v.currentTime - t) > .15) v.currentTime = t; }); }, 1500);
  small.addEventListener("change", sync); sync(); tick();
  if (REDUCED) { cols.forEach(v => v.pause()); mob.pause(); }
}

/* ------------------------------------------------------------------ services carousel */
function initServices() {
  const sc = $(".scroller");
  sc.innerHTML = SERVICES.map(s => `<article class="scard rv">
      <div class="scard__img"><img src="assets/img/${s.img}.jpg" alt="" loading="lazy" width="600" height="750"></div>
      <div class="scard__body"><h3>${s.t}</h3><p>${s.d}</p><ul>${s.li.map(l => `<li>${l}</li>`).join("")}</ul>
        <div class="scard__foot"><span class="scard__from">${s.inc ? "" : "From"}<b>${s.from}</b></span>
        <button type="button" class="scard__go" data-estimate="${esc(s.id)}">Get estimate</button></div></div></article>`).join("");
  $$("[data-scroll]").forEach(b => b.addEventListener("click", () => sc.scrollBy({ left: +b.dataset.scroll * (sc.clientWidth * .8), behavior: "smooth" })));
  $(".ribbon__track").innerHTML = [...RIBBON, ...RIBBON].map(r => `<span>${r}</span>`).join("");
}

/* ------------------------------------------------------------------ pricing */
function initPricing() {
  $(".pkgs").innerHTML = PKGS.map(p => `<article class="pkg rv${p.hi ? " pkg--hi" : ""}">
      <div class="pkg__head">${p.hi ? `<p class="pkg__k">${p.hi}</p>` : ""}<h3 class="pkg__n">${p.n}</h3><p class="pkg__t">${p.t} on site</p></div>
      <ul>${p.li.map(l => `<li>${CHECK}<span>${l}</span></li>`).join("")}</ul>
      <dl class="pkg__prices">${SIZES.map((s, i) => `<div><dt>${s}</dt><dd>$${p.p[i].toLocaleString()}</dd></div>`).join("")}</dl>
      <button type="button" class="btn ${p.hi ? "btn--red" : "btn--ghost"}" data-estimate="${esc(p.svc)}">Book now</button></article>`).join("");
  $(".plans__list").innerHTML = PLANS.map(([n, d, pr]) => `<button type="button" class="plan" data-estimate="Maintenance Plan"><span><b>${n}</b><span>${d}</span></span><i>$${pr}<small>/visit</small></i></button>`).join("");
  $(".adds__list").innerHTML = ADDS.map(([n, p]) => `<li>${n}<b>+$${p}</b></li>`).join("");
}

/* ------------------------------------------------------------------ instagram reels */
function initReels() {
  const box = $(".reels");
  box.innerHTML = REELS.map(([id, label, likes]) => `<a class="reel" href="https://www.instagram.com/reel/${id}/" target="_blank" rel="noopener" aria-label="${esc(label)} on Instagram, ${likes} likes">
      <img src="assets/img/feed-${id}.jpg" alt="" loading="lazy" width="432" height="768">
      <video muted playsinline loop preload="none" data-reel="assets/v/feed-${id}.mp4"></video>
      ${IGI.replace("<svg", '<svg class="reel__ico"')}
      <span class="reel__meta"><b>${esc(label)}</b><span>${HEART}${likes}</span></span></a>`).join("");
  // muted autoplay for whichever reels are on screen
  const io = new IntersectionObserver(es => es.forEach(en => {
    const a = en.target, v = a.querySelector("video");
    if (en.isIntersecting && !REDUCED) { if (!v.src) v.src = v.dataset.reel; v.play().then(() => a.classList.add("is-play")).catch(() => {}); }
    else { v.pause(); a.classList.remove("is-play"); }
  }), { threshold: .6 });
  $$(".reel", box).forEach(r => io.observe(r));
  $$("[data-rscroll]").forEach(b => b.addEventListener("click", () => box.scrollBy({ left: +b.dataset.rscroll * box.clientWidth * .8, behavior: "smooth" })));
}

/* ------------------------------------------------------------------ service-area map */
function initMap() {
  const list = $(".cities");
  list.innerHTML = CITIES.map(([n], i) => `<li><button type="button" data-i="${i}">${n}</button></li>`).join("");
  $(".areas__collage").innerHTML = ["gal-00", "svc-full", "gal-06", "svc2-fleet", "gal-03", "trailer", "svc2-plans", "gal-07", "svc2-classic", "gal-01", "van-rear", "svc2-wheels", "gal-08", "svc-wash", "gal-04", "svc2-engine", "gal-10", "rig-front"]
    .map(n => `<img src="assets/img/${n}.jpg" alt="" loading="lazy">`).join("");
  if (!window.L) { $("#map").innerHTML = '<p style="padding:20px;color:#a4a09a">Map loads online.</p>'; return; }
  const map = L.map("map", { zoomControl: true, scrollWheelZoom: false, attributionControl: true }).setView([33.56, -112.0], 10);
  const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/";
  L.tileLayer(ESRI + "World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", { maxZoom: 16, attribution: "Tiles &copy; Esri, HERE, Garmin, &copy; OpenStreetMap contributors" }).addTo(map);
  L.tileLayer(ESRI + "World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}", { maxZoom: 16, opacity: .8 }).addTo(map);
  // soft service radius around the Valley
  L.circle([33.55, -112.02], { radius: 34000, color: "#ff3b52", weight: 1, opacity: .5, fillColor: "#ff2a48", fillOpacity: .035, dashArray: "4 6" }).addTo(map);
  const markers = CITIES.map(([n, lat, lng, base]) => L.marker([lat, lng], {
    icon: L.divIcon({ className: "", html: `<span class="pin${base ? " pin--base" : ""}"><i></i></span>`, iconSize: [22, 22], iconAnchor: [11, 11] }),
    title: n }).addTo(map).bindTooltip(base ? `${n} (home base)` : n, { className: "city-tip", direction: "top", offset: [0, -8] }));
  map.fitBounds(L.latLngBounds(CITIES.map(c => [c[1], c[2]])).pad(.12));
  list.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return; const i = +b.dataset.i;
    $$("button", list).forEach(x => x.classList.toggle("is-on", x === b));
    $$(".pin").forEach(p => p.classList.remove("is-on"));
    map.flyTo([CITIES[i][1], CITIES[i][2]], 12, { duration: .8 });
    markers[i].openTooltip(); const el = markers[i].getElement(); el && el.querySelector(".pin").classList.add("is-on");
  });
}

/* ------------------------------------------------------------------ gallery */
function initGallery() {
  $(".gal__grid").innerHTML = Array.from({ length: 12 }, (_, k) => `<a class="gtile rv" href="https://www.instagram.com/jaspersonsdetailing/" target="_blank" rel="noopener" aria-label="See more on Instagram">
    <img src="assets/img/gal-${String(k).padStart(2, "0")}.jpg" alt="" loading="lazy" width="520" height="650"><span>${IGI}</span></a>`).join("");
}

/* ------------------------------------------------------------------ estimate dialog */
const dlg = $(".est"), form = $(".est__form");
function initEstimate() {
  $('.pills[data-name="services"]').innerHTML = EST_SERVICES.map(s => `<label><input type="checkbox" name="services" value="${esc(s)}"><span>${s}</span></label>`).join("");
  $('.pills[data-name="vehicle"]').innerHTML = EST_VEH.map(s => `<label><input type="radio" name="vehicle" value="${esc(s)}"><span>${s}</span></label>`).join("");
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-estimate]"); if (!b) return;
    const pre = b.dataset.estimate;
    if (pre) $$('input[name="services"]', form).forEach(i => { if (i.value === pre) i.checked = true; });
    $(".est__done").hidden = true;
    dlg.showModal();
  });
  $$("[data-close]", dlg).forEach(b => b.addEventListener("click", () => dlg.close()));
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  form.addEventListener("submit", e => {
    e.preventDefault();
    const f = form.elements; let ok = true;
    [["name", v => v.trim().length > 1], ["phone", v => (v.match(/\d/g) || []).length >= 10], ["addr", v => v.trim().length > 2]].forEach(([n, t]) => {
      const bad = !t(f[n].value); f[n].classList.toggle("is-bad", bad); if (bad) ok = false;
    });
    const svcs = $$('input[name="services"]:checked', form).map(i => i.value);
    const veh = (form.querySelector('input[name="vehicle"]:checked') || {}).value;
    if (!svcs.length) { ok = false; toast("Pick at least one service (or 'Not sure yet')."); }
    if (!ok) { const b = form.querySelector(".is-bad"); b && b.focus(); return; }
    const rows = [["Services", svcs.join(", ")], ["Vehicle", [veh, f.veh.value].filter(Boolean).join(", ") || "Not given"], ["Where", f.addr.value], ...(f.date.value ? [["Preferred day", new Date(f.date.value + "T12:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })]] : [])];
    $(".est__sum").innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("");
    $(".est__done").hidden = false;
  });
  form.addEventListener("input", e => e.target.classList && e.target.classList.remove("is-bad"));
}
function summaryText() {
  const f = form.elements, svcs = $$('input[name="services"]:checked', form).map(i => i.value), veh = (form.querySelector('input[name="vehicle"]:checked') || {}).value;
  return [`Hey Jasperson's, I'd like a free estimate.`, `Services: ${svcs.join(", ")}`, `Vehicle: ${[veh, f.veh.value].filter(Boolean).join(", ")}`,
    `Where: ${f.addr.value}`, f.date.value ? `Preferred day: ${f.date.value}` : "", f.notes.value ? `Notes: ${f.notes.value}` : "", `Name: ${f.name.value}`, `Phone: ${f.phone.value}`].filter(Boolean).join("\n");
}

/* ------------------------------------------------------------------ reveal + mobile bar */
function initReveal() {
  $$(".sec-head, .reasons li, .igp, .logo-tile, .kit, .brands__shelf, .map-wrap, .cities, .plans, .faq__list").forEach(el => el.classList.add("rv"));
  if (REDUCED) { $$(".rv").forEach(el => el.classList.add("is-in")); return; }
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
  $$(".rv").forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });
}
function initMbar() {
  const bar = $(".mbar"); const tog = () => bar.classList.toggle("is-on", scrollY > innerHeight * .7); addEventListener("scroll", tog, { passive: true });
}

/* ------------------------------------------------------------------ boot */
initIntro(); initHero(); initServices(); initPricing(); initReels(); initMap(); initGallery(); initEstimate(); initReveal(); initMbar();
})();
