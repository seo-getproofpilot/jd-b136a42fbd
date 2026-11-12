/* Jasperson's Detailing demo v3. One state object drives the hero booking card and the pricing
   ticket, so a pick in either place shows in both. */
(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const PHONE = "+16026160058";
const IS_LOCAL = ["localhost", "127.0.0.1", ""].includes(location.hostname);
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const money = n => "$" + n.toLocaleString("en-US");
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ------------------------------------------------------------------ data */
const SIZES = { car: "Car", suv: "SUV / half-ton", hd: "HD truck", rig: "Lifted / dually" };
const WASH = ["Wheels, barrels & tires", "Wheel wells & sidewalls", "Snow-foam prewash", "Hand contact wash", "Spot-free rinse", "Touchless blow-dry", "Towel finish", "Ceramic spray topper", "Tires dressed"];
const IN_QUICK = ["Vacuum: carpets, mats, seats", "Dash, console & door panels", "Glass inside & out"];
const IN_FULL = ["Deep vacuum, under & between seats", "Carpets & mats shampooed + extracted", "Leather cleaned & conditioned", "Plastics, vinyl & door panels dressed", "Vents, seams & cupholders", "Door jambs", "Odor treatment", "Glass inside & out"];
const ONCE = [
  { id: "wash", name: "Signature Wash", img: "svc-wash", time: "1.5–2 hrs", price: { car: 85, suv: 100, hd: 115, rig: 135 }, groups: [["Exterior", WASH], ["Interior", IN_QUICK]] },
  { id: "interior", name: "Interior Reset", img: "svc-interior", time: "2.5–3.5 hrs", price: { car: 159, suv: 179, hd: 199, rig: 219 }, groups: [["Interior", IN_FULL]] },
  { id: "full", name: "Full Detail", img: "svc-full", time: "4–6 hrs", price: { car: 249, suv: 289, hd: 329, rig: 379 },
    groups: [["Exterior", [...WASH.slice(0, 7), "Paint sealant", WASH[8]]], ["Interior", IN_FULL]] },
  { id: "ceramic", name: "Ceramic Coating", img: "svc-ceramic", time: "1–2 days", price: { car: 899, suv: 1099, hd: 1249, rig: 1399 },
    groups: [["Prep", ["Full decontamination wash", "Iron remover & clay", "Panel wipe"]], ["Correction", ["Machine polish: swirls & haze"]], ["Protection", ["Ceramic coating on paint", "Wheel faces coated", "Glass coated", "Aftercare walkthrough"]]] },
];
const PERKS = ["Same day & arrival window", "Full process every visit"];
const PLANS = [
  { id: "weekly", name: "Weekly", img: "hero-a", time: "1.5–2 hrs", per: true, price: { car: 69, suv: 80, hd: 92, rig: 109 }, groups: [["Every visit", WASH], ["Inside", IN_QUICK], ["Plan", PERKS]] },
  { id: "biweekly", name: "Every 2 weeks", img: "hero-c", time: "1.5–2 hrs", per: true, price: { car: 75, suv: 88, hd: 101, rig: 119 }, groups: [["Every visit", WASH], ["Inside", IN_QUICK], ["Plan", PERKS]] },
  { id: "monthly", name: "Monthly", img: "hero-b", time: "2–3 hrs", per: true, price: { car: 109, suv: 125, hd: 139, rig: 159 }, groups: [["Every visit", WASH], ["Inside", ["Full vacuum + mats", "Plastics cleaned & dressed", "Glass inside & out"]], ["Plan", PERKS]] },
];
const ADDONS = [
  { id: "frame", name: "Frame & suspension", price: 79 }, { id: "headlights", name: "Headlight restoration", price: 79 },
  { id: "engine", name: "Engine bay", price: 69 }, { id: "odor", name: "Odor elimination", price: 59 },
  { id: "glasscoat", name: "Glass coating", price: 99 }, { id: "pet", name: "Pet hair", price: 49 },
];
const STEPS = [
  { k: "wheels", t: "Wheels, barrels & tires first", b: "Brake dust gets broken down and brushed out of the barrel and the back of the spokes, not just wiped off the face.", p: "Cool Guy by Shine Supply" },
  { k: "frame", t: "Wells, frame & suspension", b: "On a lifted truck, everything behind the wheel is on display. Liners, coilovers and frame rails get degreased like they're paint.", p: "Gyeon APC" },
  { k: "foam", t: "Snow-foam prewash", b: "Thick foam sits and lifts the grit before a mitt ever touches the paint. Less dirt dragged around means fewer swirls.", p: "KCx Gs" },
  { k: "contact", t: "Hand contact wash", b: "Panel by panel with clean microfiber and a slick wash so the mitt glides instead of grabbing.", p: "Shift by Shine Supply" },
  { k: "rinse", t: "Spot-free rinse", b: "The rinse comes from our own deionized tank instead of your hose, so it dries clean in full sun.", p: "Deionized water" },
  { k: "dry", t: "Blow-dry, then towel", b: "Air pushes water out of mirrors, badges, grilles and lug nuts so nothing drips later. Plush towels finish the flat panels.", p: "Metrovac + The Rag Company" },
  { k: "glass", t: "Glass & ceramic topper", b: "Streak-free glass and a ceramic spray sealant on the paint for gloss that sheds the next dust storm.", p: "Tech's Choice ceramic spray" },
  { k: "dress", t: "Tires dressed right", b: "A rich, even finish that doesn't sling down the side of your truck on the first drive.", p: "Decked Out by Shine Supply" },
];
const POSTS = [
  { pf: "tt", id: "7703404338487495967", n: "107K", unit: "views", cap: "" },
  { pf: "ig", id: "DZBt-xSvAdK", n: "17K", unit: "likes", cap: "F-250 King Ranch" },
  { pf: "tt", id: "7597636074151726367", n: "52.5K", unit: "views", cap: "Detailing hot takes" },
  { pf: "ig", id: "DaEgaLtJmOe", n: "16.6K", unit: "likes", cap: "Hand-engraved Super Duty, camo interior" },
  { pf: "tt", id: "7568345590157954335", n: "41.5K", unit: "views", cap: "Still should book with me tho" },
  { pf: "ig", id: "DXQIxhmD22d", n: "10.4K", unit: "likes", cap: "GMT800 Sierra" },
  { pf: "tt", id: "7566819629520194830", n: "40K", unit: "views", cap: "" },
  { pf: "ig", id: "DflhiuSvHev", n: "3.7K", unit: "likes", cap: "Bagged Silverado, inside and out" },
];
const PF = {
  tt: { name: "TikTok", url: id => `https://www.tiktok.com/@jaspersonsdetailing/video/${id}`, img: id => `assets/img/tt-${id}.jpg`,
        icon: '<svg viewBox="0 0 24 24"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z"/></svg>' },
  ig: { name: "Instagram", url: id => `https://www.instagram.com/reel/${id}/`, img: id => `assets/img/feed-${id}.jpg`,
        icon: '<svg viewBox="0 0 24 24"><path d="M12 7.3A4.7 4.7 0 1 0 16.7 12 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm6-7.9a1.1 1.1 0 1 1-1.1-1.1A1.1 1.1 0 0 1 18 7.1zM21.9 8.2a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0-3.8-1.5C15.1 2.8 8.9 2.8 7.4 2.9a5.4 5.4 0 0 0-3.8 1.5A5.4 5.4 0 0 0 2.1 8.2c-.1 1.5-.1 7.7 0 9.2a5.4 5.4 0 0 0 1.5 3.8 5.4 5.4 0 0 0 3.8 1.5c1.5.1 7.7.1 9.2 0a5.4 5.4 0 0 0 3.8-1.5 5.4 5.4 0 0 0 1.5-3.8c.1-1.5.1-7.7 0-9.2z"/></svg>' },
};
const EYE = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
const HEART = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.1 3.3 4 7.1 4c2.1 0 3.6 1.1 4.9 2.8C13.3 5.1 14.8 4 16.9 4c3.8 0 6.2 4.1 4.7 7.7C19.5 16.4 12 21 12 21z"/></svg>';

/* ------------------------------------------------------------------ state */
const S = { mode: "plan", plan: "biweekly", pkg: "full", size: null, addons: new Set(), tMode: "once", tId: "full" };
const list = m => m === "plan" ? PLANS : ONCE;
const item = (m, id) => list(m).find(p => p.id === id);
const addTotal = () => ADDONS.filter(a => S.addons.has(a.id)).reduce((t, a) => t + a.price, 0);

function toast(msg) {
  const t = $(".toast"); t.textContent = msg; t.classList.add("is-on");
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("is-on"), 3600);
}
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="sms:"], a[href^="tel:"]');
  if (!a) return;
  const body = a.dataset.sms || (a.hasAttribute("data-sms-summary") ? summaryText() : "");
  if (IS_LOCAL) { e.preventDefault(); toast(a.href.startsWith("sms:") ? "Demo: this opens a text to 602-616-0058 with the details filled in." : "Demo: this calls 602-616-0058."); return; }
  if (body) { e.preventDefault(); location.href = `sms:${PHONE}?&body=${encodeURIComponent(body)}`; }
});

/* ------------------------------------------------------------------ intro + neon */
function initIntro() {
  const intro = $(".intro"), root = document.documentElement;
  const finish = () => { document.body.classList.remove("is-intro"); document.body.classList.add("neon-on"); };
  if (root.classList.contains("no-intro") || REDUCED) { intro.remove(); setTimeout(finish, REDUCED ? 0 : 250); return; }
  document.body.classList.add("is-intro");
  const out = () => {
    if (intro.classList.contains("is-out")) return;
    intro.classList.add("is-out"); try { sessionStorage.setItem("jd-intro", "1"); } catch (_) {}
    setTimeout(finish, 450); setTimeout(() => intro.remove(), 900);
  };
  setTimeout(out, 1850); intro.addEventListener("click", out);
}

/* ------------------------------------------------------------------ hero videos */
function initHero() {
  const mob = $(".hero__mob"), cols = $$(".hero__col"), small = matchMedia("(max-width: 760px)");
  cols.forEach((v, i) => v.addEventListener("loadedmetadata", () => { v.currentTime = i * 0.8; }, { once: true }));
  const sync = () => {
    if (small.matches) { if (!mob.src) mob.src = mob.dataset.src; mob.play().catch(() => {}); cols.forEach(v => v.pause()); }
    else { mob.pause(); cols.forEach(v => v.play().catch(() => {})); }
  };
  small.addEventListener("change", sync); sync();
  if (REDUCED) { cols.forEach(v => v.pause()); mob.pause(); }
}

/* ------------------------------------------------------------------ booking card */
const form = $(".book__form");
const chosen = () => S.mode === "plan" ? item("plan", S.plan) : item("once", S.pkg);
function updateEst() {
  const it = chosen(), k = $(".book__estk"), v = $(".book__estv"), per = S.mode === "plan" ? "<small>/visit</small>" : "";
  k.textContent = S.size ? `${it.name}, ${SIZES[S.size]}` : it.name;
  v.innerHTML = (S.size ? money(it.price[S.size]) : `From ${money(it.price.car)}`) + per;
}
function setMode(m) {
  S.mode = m; form.querySelector(`input[name=mode][value=${m}]`).checked = true;
  $$(".opts[data-for]").forEach(c => c.hidden = c.dataset.for !== m); updateEst();
}
function setSize(sz) {
  S.size = sz; const r = form.querySelector(`input[name=size][value="${sz}"]`); if (r) r.checked = true;
  $$(".sizer button").forEach(b => b.setAttribute("aria-checked", String(b.dataset.size === sz)));
  updateEst(); renderTicket();
}
form.addEventListener("change", e => {
  const { name, value } = e.target;
  if (name === "mode") setMode(value);
  if (name === "plan") { S.plan = value; updateEst(); }
  if (name === "pkg") { S.pkg = value; updateEst(); }
  if (name === "size") setSize(value);
  if (["name", "phone", "addr"].includes(name)) e.target.classList.remove("is-bad");
});
function summaryText() {
  const it = chosen(), f = form.elements, add = ADDONS.filter(a => S.addons.has(a.id)).map(a => a.name);
  return [`Hey Jasperson's, I'd like to get on the schedule.`,
    `Looking for: ${S.mode === "plan" ? it.name + " recurring wash" : it.name}${add.length ? " + " + add.join(", ") : ""}`,
    `Vehicle: ${SIZES[S.size] || ""}`, `Where: ${f.addr.value}`, `Name: ${f.name.value}`, `Phone: ${f.phone.value}`].join("\n");
}
form.addEventListener("submit", e => {
  e.preventDefault();
  const f = form.elements; let ok = true;
  [["name", v => v.trim().length > 1], ["phone", v => (v.match(/\d/g) || []).length >= 10], ["addr", v => v.trim().length > 2]].forEach(([n, t]) => {
    const bad = !t(f[n].value); f[n].classList.toggle("is-bad", bad); if (bad) ok = false;
  });
  if (!S.size) { ok = false; toast("Pick what you're driving so the price is right."); }
  if (!ok) { const b = form.querySelector(".is-bad"); b && b.focus(); return; }
  const it = chosen(), add = ADDONS.filter(a => S.addons.has(a.id)).map(a => a.name);
  const rows = [["For", S.mode === "plan" ? `${it.name} recurring wash` : it.name], ["Vehicle", SIZES[S.size]],
    ...(add.length ? [["Add-ons", add.join(", ")]] : []), ["Where", f.addr.value],
    ["Estimate", money(it.price[S.size] + addTotal()) + (S.mode === "plan" ? " per visit" : "")]];
  $(".bdone__sum").innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("");
  const d = $(".bdone"); d.hidden = false; d.focus();
});
$("[data-restart]").addEventListener("click", () => {
  $(".bdone").hidden = true; form.reset(); S.size = null; S.plan = "biweekly"; S.pkg = "full"; S.addons.clear();
  setMode("plan"); renderTicket();
});

/* ------------------------------------------------------------------ pricing ticket */
function renderTicket() {
  const size = S.size || "car", items = list(S.tMode);
  if (!items.find(p => p.id === S.tId)) S.tId = S.tMode === "plan" ? "biweekly" : "full";
  $(".plist").innerHTML = items.map(p => `<button type="button" class="pitem" role="radio" aria-checked="${p.id === S.tId}" data-id="${p.id}">
    <img src="assets/img/${p.img}.jpg" alt="" width="64" height="64" loading="lazy">
    <span><span class="pitem__n">${p.name}</span><span class="pitem__t">${p.time}</span></span>
    <span class="pitem__p">${money(p.price[size])}</span></button>`).join("");
  const p = item(S.tMode, S.tId);
  let n = 0;
  $(".ticket__lines").innerHTML = p.groups.map(([g, rows]) => `<div class="tgroup"><h4>${g}</h4>${rows.map(r =>
    `<div class="tline"><i>${String(++n).padStart(2, "0")}</i><span>${r}</span><b>incl.</b></div>`).join("")}</div>`).join("");
  $(".t-name").textContent = p.name;
  $(".t-for").textContent = `${S.tMode === "plan" ? "Maintenance plan" : "One-time detail"} · ${SIZES[size]}`;
  $(".t-time").textContent = p.time;
  $(".t-total").innerHTML = money(p.price[size] + addTotal()) + (p.per ? "<small>/visit</small>" : "");
  $(".t-book").textContent = `Book ${p.name}`;
}
function renderAdds() {
  $(".adds").innerHTML = ADDONS.map(a => `<label class="add"><input type="checkbox" value="${a.id}" ${S.addons.has(a.id) ? "checked" : ""}>${a.name} <i>+${money(a.price)}</i></label>`).join("");
}
$(".adds").addEventListener("change", e => { const v = e.target.value; e.target.checked ? S.addons.add(v) : S.addons.delete(v); renderTicket(); });
$(".mode").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return; S.tMode = b.dataset.mode;
  $$(".mode button").forEach(x => x.setAttribute("aria-selected", String(x === b))); renderTicket();
});
$(".plist").addEventListener("click", e => { const b = e.target.closest(".pitem"); if (b) { S.tId = b.dataset.id; renderTicket(); } });
$(".sizer").addEventListener("click", e => { const b = e.target.closest("button"); if (b) setSize(b.dataset.size); });
$(".t-book").addEventListener("click", () => bookFrom(S.tMode, S.tId));
function bookFrom(mode, id) {
  setMode(mode);
  if (mode === "plan") { S.plan = id; form.querySelector(`input[name=plan][value=${id}]`).checked = true; }
  else { S.pkg = id; form.querySelector(`input[name=pkg][value=${id}]`).checked = true; }
  if (!S.size) setSize("car"); updateEst();
  $("#book").scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => form.elements.name.focus({ preventScroll: true }), 650);
}
/* service cards jump to the ticket with that service loaded */
document.addEventListener("click", e => {
  const b = e.target.closest("[data-show]"); if (!b) return;
  const [m, id] = b.dataset.show.split(":"); S.tMode = m; S.tId = id;
  $$(".mode button").forEach(x => x.setAttribute("aria-selected", String(x.dataset.mode === m)));
  renderTicket(); $("#pricing").scrollIntoView({ behavior: "smooth" });
});

/* ------------------------------------------------------------------ process stage */
function initProcess() {
  const sec = $(".proc"), amb = $(".proc__amb"), vid = $(".proc__vid"), now = $(".proc__now");
  const num = $(".proc__num"), title = $(".proc__title"), body = $(".proc__body"), prod = $(".proc__prod b");
  const ladder = $(".proc__ladder"); let cur = 0;
  ladder.innerHTML = STEPS.map((s, i) => `<li data-i="${i}"><b>${String(i + 1).padStart(2, "0")}</b>${s.t}</li>`).join("");
  const lis = $$("li", ladder);
  const show = i => {
    if (i === cur && vid.dataset.k) return;
    cur = i; const s = STEPS[i];
    num.textContent = String(i + 1).padStart(2, "0"); title.textContent = s.t; body.textContent = s.b; prod.textContent = s.p;
    now.classList.remove("is-swap"); void now.offsetWidth; now.classList.add("is-swap");
    vid.style.opacity = .2;
    setTimeout(() => { vid.dataset.k = s.k; vid.poster = `assets/img/step-${s.k}.jpg`; vid.src = `assets/v/step-${s.k}.mp4`; vid.play().catch(() => {}); vid.style.opacity = 1;
      amb.src = vid.src; amb.play().catch(() => {}); }, 140);
    lis.forEach((li, k) => { li.classList.toggle("is-on", k === i); li.classList.toggle("is-done", k < i); });
  };
  const wide = matchMedia("(min-width: 981px)");
  const onScroll = () => {
    if (!wide.matches) return;
    const r = sec.getBoundingClientRect(), span = sec.offsetHeight - innerHeight;
    const p = Math.min(.9999, Math.max(0, -r.top / span));
    show(Math.floor(p * STEPS.length));
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  vid.dataset.k = ""; show(0);
  lis.forEach(li => li.addEventListener("click", () => {
    const i = +li.dataset.i, span = sec.offsetHeight - innerHeight;
    scrollTo({ top: sec.offsetTop + (i + .5) / STEPS.length * span - 10, behavior: "smooth" });
  }));
  // mobile cards
  $(".proc__cards").innerHTML = STEPS.map((s, i) => `<article class="pcard2"><video muted playsinline loop preload="none" poster="assets/img/step-${s.k}.jpg" data-src="assets/v/step-${s.k}.mp4"></video>
    <div><span class="pc__n">${String(i + 1).padStart(2, "0")}</span><h3>${s.t}</h3><p>${s.b}</p><span class="pc__p">${s.p}</span></div></article>`).join("");
  $(".proc__cards").removeAttribute("aria-hidden");
}

/* ------------------------------------------------------------------ social posts */
function initPosts() {
  $(".posts").innerHTML = POSTS.map(p => {
    const f = PF[p.pf];
    return `<a class="post" href="${f.url(p.id)}" target="_blank" rel="noopener" aria-label="Watch on ${f.name}${p.cap ? ": " + esc(p.cap) : ""}, ${p.n} ${p.unit}">
      <img src="${f.img(p.id)}" alt="" loading="lazy" width="432" height="768">
      <span class="post__pf">${f.icon}${f.name}</span>
      <span class="post__meta"><span class="post__count">${p.unit === "views" ? EYE : HEART}${p.n} <small style="font:600 12px var(--f-body);color:#bdb9b3">${p.unit}</small></span>${p.cap ? `<p class="post__cap">${esc(p.cap)}</p>` : ""}</span>
      <span class="post__watch"><span>Watch on ${f.name} ↗</span></span></a>`;
  }).join("");
}

/* lazy autoplay for every video with data-src (mobile hero handled above) */
function initLazy() {
  const io = new IntersectionObserver(es => es.forEach(en => {
    const v = en.target;
    if (en.isIntersecting) { if (!v.src && v.dataset.src) v.src = v.dataset.src; v.play().catch(() => {}); }
    else if (!v.paused) v.pause();
  }), { rootMargin: "150px 0px" });
  $$("video[data-src]").forEach(v => { if (!v.classList.contains("hero__mob")) io.observe(v); });
}
function initMbar() {
  const bar = $(".mbar"), book = $("#book"); let vis = false;
  const tog = () => bar.classList.toggle("is-on", scrollY > innerHeight * .8 && !vis);
  new IntersectionObserver(es => es.forEach(en => { vis = en.isIntersecting; tog(); })).observe(book);
  addEventListener("scroll", tog, { passive: true });
}

/* ------------------------------------------------------------------ boot */
$(".t-no").textContent = "JD-" + String(new Date().getMonth() + 1).padStart(2, "0") + String(new Date().getDate()).padStart(2, "0");
initIntro(); initHero(); setMode("plan"); renderAdds(); renderTicket(); initProcess(); initPosts(); initLazy(); initMbar();
})();
