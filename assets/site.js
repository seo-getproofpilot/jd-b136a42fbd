/* Jasperson's Detailing demo v2. One state object drives the hero booking card and the
   service menu (one-time details + maintenance plans), so a pick in either place shows in both. */
(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const PHONE = "+16026160058";
const IS_LOCAL = ["localhost", "127.0.0.1", ""].includes(location.hostname);
const money = n => "$" + n.toLocaleString("en-US");

/* ------------------------------------------------------------------ data */
const SIZES = { car: "Car", suv: "SUV / half-ton", hd: "HD truck", rig: "Lifted / dually" };
const WASH = [
  ["Wheels, barrels & tires", "Faces, barrels, lugs and the backs of spokes brushed clean."],
  ["Wheel wells & sidewalls", "Degreased and rinsed so the brown comes off the rubber."],
  ["Snow-foam prewash", "Lifts grit off the paint before anything touches it."],
  ["Hand contact wash", "Panel by panel with clean microfiber."],
  ["Spot-free rinse", "Deionized water from the van's own tank."],
  ["Touchless blow-dry", "Mirrors, badges, grille and lugs blown out so nothing drips."],
  ["Towel finish", "Plush microfiber on the flat panels."],
  ["Ceramic spray topper", "Slick, glossy layer on paint and glass."],
  ["Tires dressed", "Even, rich finish that doesn't sling."],
];
const INSIDE_QUICK = [
  ["Vacuum", "Carpets, mats and seats."],
  ["Wipe-down", "Dash, console, door panels and steering wheel."],
  ["Glass inside & out", "Streak-free."],
];
const INSIDE_FULL = [
  ["Deep vacuum", "Carpet, seats, under and between the seats, rails, trunk or cab floor."],
  ["Carpets & mats shampooed", "Scrubbed and extracted. All-weather mats scrubbed and dressed."],
  ["Leather cleaned & conditioned", "Cleaned first, then conditioned."],
  ["Plastics, vinyl & door panels", "Cleaned and dressed with a factory, non-greasy finish."],
  ["Vents, seams & cupholders", "Brushed out. The spots that collect Phoenix dust."],
  ["Door jambs", "Wiped and dressed."],
  ["Odor treatment", "Neutralized, not perfumed over."],
  ["Glass inside & out", "Streak-free, including the top edge of the windows."],
];
const ONCE = [
  { id: "wash", name: "Signature Wash", short: "The full exterior process plus a quick interior.", time: "1.5–2", unit: "hrs",
    price: { car: 85, suv: 100, hd: 115, rig: 135 }, groups: [["Exterior", WASH], ["Interior", INSIDE_QUICK]] },
  { id: "interior", name: "Interior Reset", short: "Inside only, taken back to day one.", time: "2.5–3.5", unit: "hrs",
    price: { car: 159, suv: 179, hd: 199, rig: 219 }, groups: [["Interior", INSIDE_FULL]] },
  { id: "full", name: "Full Detail", short: "Every exterior and interior step, plus paint sealant.", time: "4–6", unit: "hrs",
    price: { car: 249, suv: 289, hd: 329, rig: 379 },
    groups: [["Exterior", [...WASH.slice(0, 7), ["Paint sealant", "A real sealant layer for longer protection."], WASH[8]]], ["Interior", INSIDE_FULL]] },
  { id: "ceramic", name: "Ceramic Coating", short: "Correct the paint, then lock it in.", time: "1–2", unit: "days",
    price: { car: 899, suv: 1099, hd: 1249, rig: 1399 },
    groups: [
      ["Prep", [["Decontamination wash", "The full wash process plus iron remover and clay."], ["Panel wipe", "Strips oils so the coating bonds to bare paint."]]],
      ["Correction", [["Machine polish", "Removes swirls and haze. Heavier correction quoted on sight."]]],
      ["Protection", [["Ceramic coating on paint", "Hard, slick, UV-resistant layer."], ["Wheel faces coated", "Brake dust wipes off instead of baking on."], ["Glass coated", "Water sheets off the windshield."], ["Aftercare", "How to wash it, and a plan to keep it performing."]]],
    ] },
];
const PLAN_PERKS = [["Same day, same window", "Your spot is held on the schedule every visit."], ["Every visit is the full process", "No shortcut washes on plan visits."]];
const PLANS = [
  { id: "weekly", name: "Weekly", short: "For daily drivers and work trucks that never get a break.", time: "1.5–2", unit: "hrs", per: "/ visit",
    price: { car: 69, suv: 80, hd: 92, rig: 109 }, groups: [["Every visit", WASH], ["Inside, every visit", INSIDE_QUICK], ["Plan", PLAN_PERKS]] },
  { id: "biweekly", name: "Every 2 weeks", short: "The sweet spot for coated paint and weekend trucks.", time: "1.5–2", unit: "hrs", per: "/ visit",
    price: { car: 75, suv: 88, hd: 101, rig: 119 }, groups: [["Every visit", WASH], ["Inside, every visit", INSIDE_QUICK], ["Plan", PLAN_PERKS]] },
  { id: "monthly", name: "Monthly", short: "A deeper visit once a month: full wash plus a real interior pass.", time: "2–3", unit: "hrs", per: "/ visit",
    price: { car: 109, suv: 125, hd: 139, rig: 159 },
    groups: [["Every visit", WASH], ["Inside, every visit", [["Full vacuum", "Carpet, seats, under the seats and mats."], ["Plastics cleaned & dressed", "Dash, console and door panels."], ["Glass inside & out", "Streak-free."]]], ["Plan", PLAN_PERKS]] },
];
const ADDONS = [
  { id: "frame", name: "Frame & suspension clean", price: 79 },
  { id: "headlights", name: "Headlight restoration", price: 79 },
  { id: "engine", name: "Engine bay", price: 69 },
  { id: "odor", name: "Odor elimination", price: 59 },
  { id: "glasscoat", name: "Glass coating", price: 99 },
  { id: "pet", name: "Pet hair", price: 49 },
];
const CHAPTERS = [ // social reel, from assets/v/hero.json
  { key: "before", start: 0, end: 2.5, n: "Before", t: "Rolled in like this" },
  { key: "wheels", start: 2.5, end: 10.3, n: "Wheels", t: "Cool Guy on the wheels, Gyeon APC on the rubber" },
  { key: "foam", start: 10.3, end: 13.1, n: "Foam", t: "Snow-foam prewash" },
  { key: "contact", start: 13.1, end: 15.7, n: "Wash", t: "Hand contact wash" },
  { key: "rinse", start: 15.7, end: 18.5, n: "Rinse", t: "Spot-free water from the van" },
  { key: "dry", start: 18.5, end: 22.7, n: "Dry", t: "Blown out, towel finished, glass done" },
  { key: "dress", start: 22.7, end: 25.5, n: "Dress", t: "Decked Out on the tires" },
  { key: "reveal", start: 25.5, end: 30.3, n: "Done", t: "King Ranch F-250, ready to roll" },
];
const FEED = [
  ["DZBt-xSvAdK", 17020, "F-250 King Ranch"], ["DaEgaLtJmOe", 16580, "Hand-engraved Super Duty"],
  ["DXQIxhmD22d", 10439, "GMT800 Sierra"], ["DflhiuSvHev", 3750, "Bagged Silverado"],
  ["DfbH8P5PFOb", 3305, "'23 Super Duty"], ["DfiyL-6PHbj", 1913, "Ram 2500"],
  ["DfTaAA5vgVZ", 628, "F-350 dually"], ["Dfdt4u0PXMK", 229, "F-450 dually"],
];
const ICONS = {
  check: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"><path d="M4 10.5l4 4 8-9"/></svg>',
  plus: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M8 2v12M2 8h12"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.1 3.3 4 7.1 4c2.1 0 3.6 1.1 4.9 2.8C13.3 5.1 14.8 4 16.9 4c3.8 0 6.2 4.1 4.7 7.7C19.5 16.4 12 21 12 21z"/></svg>',
  car: '<svg viewBox="0 0 96 34" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M6 25h-2v-6l8-2 12-8h26l14 8 18 3 4 5h-4"/><path d="M30 25h34"/><circle cx="21" cy="25" r="6"/><circle cx="73" cy="25" r="6"/></svg>',
  suv: '<svg viewBox="0 0 96 34" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M7 25H4V13l6-7h44l12 9 20 2 5 3v5h-4"/><path d="M31 25h33"/><circle cx="21" cy="25" r="6.5"/><circle cx="74" cy="25" r="6.5"/></svg>',
  hd: '<svg viewBox="0 0 96 34" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M7 25H3V14h30V5h22l10 9h24l4 4v7h-4"/><path d="M32 25h31"/><circle cx="20" cy="25" r="7"/><circle cx="75" cy="25" r="7"/></svg>',
  rig: '<svg viewBox="0 0 96 38" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M7 22H3V11h30V2h22l10 9h24l4 4v7h-4"/><path d="M33 22h28"/><circle cx="20" cy="27" r="9"/><circle cx="75" cy="27" r="9"/></svg>',
};

/* ------------------------------------------------------------------ state */
const S = { mode: "plan", plan: "biweekly", pkg: "full", size: null, addons: new Set(), menuMode: "once", menuId: "full" };
const list = mode => mode === "plan" ? PLANS : ONCE;
const item = (mode, id) => list(mode).find(p => p.id === id);
const addonsTotal = () => ADDONS.filter(a => S.addons.has(a.id)).reduce((t, a) => t + a.price, 0);
const escapeHtml = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function toast(msg) {
  const t = $(".toast"); t.textContent = msg; t.classList.add("is-on");
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("is-on"), 3600);
}
/* demo guard: on a local preview never hand tel:/sms: to the OS */
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="sms:"], a[href^="tel:"]');
  if (!a) return;
  const body = a.dataset.sms || (a.hasAttribute("data-sms-summary") ? summaryText() : "");
  if (IS_LOCAL) { e.preventDefault(); toast(a.href.startsWith("sms:") ? "Demo: this opens a text to 602-616-0058 with the details filled in." : "Demo: this calls 602-616-0058."); return; }
  if (body) { e.preventDefault(); location.href = `sms:${PHONE}?&body=${encodeURIComponent(body)}`; }
});

/* ------------------------------------------------------------------ hero */
function initHero() {
  const mob = $(".hero__mob");
  const small = matchMedia("(max-width: 760px)");
  const cols = $$(".hero__col");
  const sync = () => {
    if (small.matches) { if (!mob.src) mob.src = mob.dataset.src; mob.play().catch(() => {}); cols.forEach(v => v.pause()); }
    else { mob.pause(); cols.forEach(v => v.play().catch(() => {})); }
  };
  // stagger the three columns so their cuts never land together
  cols.forEach((v, i) => v.addEventListener("loadedmetadata", () => { v.currentTime = i * 0.8; }, { once: true }));
  small.addEventListener("change", sync); sync();
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { cols.forEach(v => v.pause()); mob.pause(); }
}

/* ------------------------------------------------------------------ booking card */
const form = $(".book__form");
function renderVehicleIcons() { $$(".vopt__ico").forEach(el => el.innerHTML = ICONS[el.dataset.ico]); }

function updateEstimate() {
  const k = $(".book__estk"), v = $(".book__estv");
  const it = S.mode === "plan" ? item("plan", S.plan) : item("once", S.pkg);
  if (!S.size) { k.textContent = it.name; v.innerHTML = `From ${money(it.price.car)}` + (S.mode === "plan" ? "<small>/ visit</small>" : ""); return; }
  k.textContent = `${it.name}, ${SIZES[S.size]}`;
  v.innerHTML = money(it.price[S.size]) + (S.mode === "plan" ? "<small>/ visit</small>" : "");
}

function setMode(mode) {
  S.mode = mode;
  const r = form.querySelector(`input[name=mode][value=${mode}]`); if (r) r.checked = true;
  $$(".chips[data-for]").forEach(c => c.hidden = c.dataset.for !== mode);
  updateEstimate();
}
function setSize(size) {
  S.size = size;
  const r = form.querySelector(`input[name=size][value="${size}"]`); if (r) r.checked = true;
  $$(".sizer button").forEach(b => b.setAttribute("aria-checked", String(b.dataset.size === size)));
  updateEstimate(); renderMenu();
}

form.addEventListener("change", e => {
  const { name, value } = e.target;
  if (name === "mode") setMode(value);
  if (name === "plan") { S.plan = value; updateEstimate(); }
  if (name === "pkg") { S.pkg = value; updateEstimate(); }
  if (name === "size") setSize(value);
  if (["name", "phone", "addr"].includes(name)) e.target.classList.remove("is-bad");
});

function valid() {
  let ok = true;
  const f = form.elements;
  [["name", v => v.trim().length > 1], ["phone", v => (v.match(/\d/g) || []).length >= 10], ["addr", v => v.trim().length > 2]].forEach(([n, test]) => {
    const bad = !test(f[n].value); f[n].classList.toggle("is-bad", bad); if (bad) ok = false;
  });
  if (!S.size) { ok = false; toast("Pick what you're driving so the price is right."); }
  return ok;
}
function chosen() { return S.mode === "plan" ? item("plan", S.plan) : item("once", S.pkg); }
function summaryText() {
  const it = chosen(), f = form.elements, add = ADDONS.filter(a => S.addons.has(a.id)).map(a => a.name);
  return [`Hey Jasperson's, I'd like to get on the schedule.`,
    `Looking for: ${S.mode === "plan" ? it.name + " recurring wash" : it.name}${add.length ? " + " + add.join(", ") : ""}`,
    `Vehicle: ${SIZES[S.size] || ""}`, `Where: ${f.addr.value}`, `Name: ${f.name.value}`, `Phone: ${f.phone.value}`].join("\n");
}
form.addEventListener("submit", e => {
  e.preventDefault();
  if (!valid()) { const bad = form.querySelector(".is-bad"); bad && bad.focus(); return; }
  const it = chosen(), f = form.elements, add = ADDONS.filter(a => S.addons.has(a.id)).map(a => a.name);
  const price = it.price[S.size] + addonsTotal();
  const rows = [["For", S.mode === "plan" ? `${it.name} recurring wash` : it.name], ["Vehicle", SIZES[S.size]],
    ...(add.length ? [["Add-ons", add.join(", ")]] : []), ["Where", f.addr.value],
    ["Estimate", money(price) + (S.mode === "plan" ? " per visit" : "")]];
  $(".bdone__sum").innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${escapeHtml(v)}</dd>`).join("");
  const done = $(".bdone"); done.hidden = false; done.focus();
});
$("[data-restart]").addEventListener("click", () => { $(".bdone").hidden = true; form.reset(); S.size = null; S.addons.clear(); setMode("plan"); S.plan = "biweekly"; S.pkg = "full"; renderAddons(); updateEstimate(); });

/* ------------------------------------------------------------------ service menu */
function renderMenu() {
  const size = S.size || "car", items = list(S.menuMode);
  if (!items.find(p => p.id === S.menuId)) S.menuId = S.menuMode === "plan" ? "biweekly" : "full";
  const pc = $(".pcards"); pc.style.setProperty("--n", items.length);
  pc.innerHTML = items.map(p => `<button type="button" class="pcard" role="radio" aria-checked="${p.id === S.menuId}" data-id="${p.id}">
      <span class="pcard__n">${p.name}</span>
      <span class="pcard__p">${money(p.price[size])}${p.per ? `<small>${p.per}</small>` : ""}</span>
      <span class="pcard__t">${p.time} ${p.unit} on site</span>
      <span class="pcard__d">${p.short}</span></button>`).join("");

  const p = item(S.menuMode, S.menuId);
  const steps = p.groups.reduce((n, g) => n + g[1].length, 0);
  $(".pdetail__list").innerHTML = p.groups.map(([g, rows]) => `<div class="pg"><h4>${g}</h4><ul>${rows.map(([t, d]) =>
    `<li>${ICONS.check}<div><b>${t}</b><span>${d}</span></div></li>`).join("")}</ul></div>`).join("");
  $(".pdetail__sum").innerHTML = `
    <p class="ps__k">${S.menuMode === "plan" ? "Maintenance plan" : "One-time detail"} for ${SIZES[size]}</p>
    <p class="ps__n">${p.name}</p>
    <p class="ps__for">${p.short}</p>
    <dl class="ps__meta">
      <div><dt>Price</dt><dd>${money(p.price[size])}${p.per ? `<small>${p.per}</small>` : ""}</dd></div>
      <div><dt>On site</dt><dd>${p.time}<small>${p.unit}</small></dd></div>
    </dl>
    <button type="button" class="btn btn--red btn--block" data-book="${S.menuMode}:${p.id}">Book ${p.name}</button>
    <p class="ps__note">${steps} steps. Water and power come with the van.</p>`;
}
$(".mode").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  S.menuMode = b.dataset.mode;
  $$(".mode button").forEach(x => x.setAttribute("aria-selected", String(x === b)));
  renderMenu();
});
$(".sizer").addEventListener("click", e => { const b = e.target.closest("button"); if (b) setSize(b.dataset.size); });
$(".pcards").addEventListener("click", e => { const b = e.target.closest(".pcard"); if (b) { S.menuId = b.dataset.id; renderMenu(); } });
document.addEventListener("click", e => {
  const b = e.target.closest("[data-book]"); if (!b) return;
  const [mode, id] = b.dataset.book.split(":");
  setMode(mode);
  if (mode === "plan") { S.plan = id; form.querySelector(`input[name=plan][value=${id}]`).checked = true; }
  else { S.pkg = id; form.querySelector(`input[name=pkg][value=${id}]`).checked = true; }
  if (!S.size) setSize("car");
  updateEstimate();
  $("#book").scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => form.elements.name.focus({ preventScroll: true }), 650);
});

function renderAddons() {
  $(".addons__list").innerHTML = ADDONS.map(a => `<button type="button" class="addon" data-id="${a.id}" aria-pressed="${S.addons.has(a.id)}">${ICONS.plus}${a.name}<i>+${money(a.price)}</i></button>`).join("");
}
$(".addons__list").addEventListener("click", e => {
  const b = e.target.closest(".addon"); if (!b) return;
  S.addons.has(b.dataset.id) ? S.addons.delete(b.dataset.id) : S.addons.add(b.dataset.id);
  b.setAttribute("aria-pressed", String(S.addons.has(b.dataset.id)));
  toast(S.addons.has(b.dataset.id) ? `${b.firstChild.nextSibling.textContent} added to your request.` : "Removed.");
});

/* ------------------------------------------------------------------ process */
function initProcess() {
  const steps = $$(".step"), vid = $(".phone__v"), num = $(".phone__n");
  const narrow = matchMedia("(max-width: 980px)");
  let cur = "wheels";
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    steps.forEach(s => s.classList.toggle("is-on", s === en.target));
    const k = en.target.dataset.v;
    if (k !== cur && !narrow.matches) {
      cur = k; vid.style.opacity = 0;
      setTimeout(() => { vid.poster = `assets/img/step-${k}.jpg`; vid.src = `assets/v/step-${k}.mp4`; vid.play().catch(() => {}); vid.style.opacity = 1; }, 180);
      num.textContent = en.target.querySelector(".step__n").textContent;
    }
  }), { rootMargin: "-45% 0px -45% 0px" });
  steps.forEach(s => io.observe(s)); steps[0].classList.add("is-on");
  steps.forEach(s => {
    const k = s.dataset.v, box = document.createElement("div"); box.className = "step__vid";
    box.innerHTML = `<video muted playsinline loop preload="none" poster="assets/img/step-${k}.jpg" data-src="assets/v/step-${k}.mp4"></video>`;
    s.querySelector("h3").after(box);
  });
}

/* ------------------------------------------------------------------ social reel */
function initReel() {
  const v = $(".reel__video"), bars = $(".reel__bars"), capN = $(".reel__capn"), capT = $(".reel__capt"), tog = $(".reel__toggle");
  const total = CHAPTERS.at(-1).end;
  bars.innerHTML = CHAPTERS.map(c => `<span style="--w:${(c.end - c.start).toFixed(2)}"><i></i></span>`).join("");
  const fills = $$("i", bars); let cur = -1;
  (function frame() {
    const t = v.currentTime % total, i = CHAPTERS.findIndex(c => t >= c.start && t < c.end);
    CHAPTERS.forEach((c, k) => fills[k].style.setProperty("--p", (k < i ? 1 : k > i ? 0 : (t - c.start) / (c.end - c.start)).toFixed(3)));
    if (i !== cur && i >= 0) { cur = i; capN.textContent = CHAPTERS[i].n; capT.textContent = CHAPTERS[i].t; }
    requestAnimationFrame(frame);
  })();
  tog.addEventListener("click", () => {
    if (v.paused) { v.play(); tog.dataset.state = "play"; tog.setAttribute("aria-label", "Pause video"); }
    else { v.pause(); tog.dataset.state = "pause"; tog.setAttribute("aria-label", "Play video"); }
  });
}

/* lazy autoplay for every video with data-src (except the mobile hero, handled above) */
function initLazyVideo() {
  const io = new IntersectionObserver(es => es.forEach(en => {
    const v = en.target;
    if (en.isIntersecting) { if (!v.src && v.dataset.src) v.src = v.dataset.src; v.play().catch(() => {}); }
    else if (!v.paused) v.pause();
  }), { rootMargin: "150px 0px" });
  $$("video[data-src]").forEach(v => { if (!v.classList.contains("hero__mob")) io.observe(v); });
}

function initFeed() {
  const fmt = n => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "K" : String(n);
  $(".feed__wall").innerHTML = FEED.map(([id, likes, label]) => `
    <a class="tile" href="https://www.instagram.com/reel/${id}/" target="_blank" rel="noopener" aria-label="${label}, ${likes.toLocaleString()} likes on Instagram">
      <img src="assets/img/feed-${id}.jpg" alt="" loading="lazy" width="432" height="768">
      <video muted playsinline loop preload="none" data-feed="assets/v/feed-${id}.mp4"></video>
      <span class="tile__meta"><span class="tile__lab">${label}</span><span class="tile__likes">${ICONS.heart}${fmt(likes)}</span></span>
    </a>`).join("");
  const tiles = $$(".tile");
  const play = t => { const v = t.querySelector("video"); if (!v.src) v.src = v.dataset.feed; v.play().then(() => t.classList.add("is-play")).catch(() => {}); };
  const stop = t => { t.querySelector("video").pause(); t.classList.remove("is-play"); };
  if (matchMedia("(hover: hover)").matches) tiles.forEach(t => { t.addEventListener("mouseenter", () => play(t)); t.addEventListener("mouseleave", () => stop(t)); t.addEventListener("focus", () => play(t)); t.addEventListener("blur", () => stop(t)); });
  else { const io = new IntersectionObserver(es => es.forEach(en => en.isIntersecting ? play(en.target) : stop(en.target)), { rootMargin: "-30% 0px -30% 0px" }); tiles.forEach(t => io.observe(t)); }
}

function initMbar() {
  const bar = $(".mbar"), book = $("#book"); let vis = false;
  const toggle = () => bar.classList.toggle("is-on", scrollY > innerHeight * .8 && !vis);
  new IntersectionObserver(es => es.forEach(en => { vis = en.isIntersecting; toggle(); })).observe(book);
  addEventListener("scroll", toggle, { passive: true });
}

/* ------------------------------------------------------------------ boot */
renderVehicleIcons(); setMode("plan"); renderMenu(); renderAddons(); updateEstimate();
$$(".sizer button")[0].setAttribute("aria-checked", "true");
initHero(); initProcess(); initReel(); initLazyVideo(); initFeed(); initMbar();
})();
