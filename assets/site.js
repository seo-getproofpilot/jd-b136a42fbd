/* Jasperson's Detailing demo. One state object drives the hero booking card,
   the itemized service menu, add-ons and plans. */
(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const PHONE = "+16026160058";
const IS_LOCAL = ["localhost", "127.0.0.1", ""].includes(location.hostname);

/* ------------------------------------------------------------------ data */
const SIZES = { car: "Car or coupe", suv: "SUV or half-ton", hd: "HD truck", rig: "Lifted or dually" };
const P = { // product credits, from his own "preferred products" post
  wheel: "Cool Guy by Shine Supply", apc: "Gyeon APC", pre: "KCx Gs", wash: "Shift by Shine Supply",
  seal: "KCx S0.03 / PW", blow: "Metrovac Air Force blaster", towel: "The Rag Company",
  spray: "Tech's Choice ceramic spray", tire: "Decked Out by Shine Supply", di: "Deionized water, 000 TDS",
};
const EXT_WASH = [
  ["Wheels, barrels & tires", "Faces, barrels, lug nuts and the backs of spokes brushed clean.", P.wheel],
  ["Wheel wells & tire sidewalls", "Degreased and rinsed so the brown comes off the rubber.", P.apc],
  ["Snow-foam prewash", "Lifts grit off the paint before anything touches it.", P.pre],
  ["Hand contact wash", "Panel by panel with clean microfiber.", P.wash],
  ["Spot-free rinse", "From the van's own tank. Dries clean in full sun.", P.di],
  ["Touchless blow-dry", "Mirrors, badges, grille and lugs blown out so nothing drips.", P.blow],
  ["Towel finish", "Plush microfiber on the flat panels.", P.towel],
  ["Ceramic spray topper", "Slick, glossy layer on paint and glass.", P.spray],
  ["Tires dressed", "Even, rich finish that doesn't sling.", P.tire],
];
const INT_FULL = [
  ["Deep vacuum", "Carpet, seats, under and between the seats, seat rails, trunk or cab floor.", ""],
  ["Carpets & mats shampooed", "Scrubbed and extracted. All-weather mats scrubbed and dressed.", ""],
  ["Leather cleaned & conditioned", "Seats and bolsters cleaned first, then conditioned.", ""],
  ["Plastics, vinyl & door panels", "Cleaned and dressed with a factory, non-greasy finish.", ""],
  ["Vents, seams & cupholders", "Brushed out. The spots that collect Phoenix dust.", ""],
  ["Door jambs", "Wiped and dressed so the first thing you see is clean.", ""],
  ["Odor treatment", "Neutralized, not perfumed over.", ""],
  ["Glass inside & out", "Streak-free, including the top edge of the windows.", ""],
];
const PKGS = [
  { id: "maintenance", name: "Maintenance Wash", short: "The full exterior process plus a quick interior.",
    for: "For keeping a clean truck clean. Every step of the exterior process, plus a vacuum and wipe-down inside.",
    time: "1.5–2 hrs", price: { car: 85, suv: 100, hd: 115, rig: 135 },
    groups: [
      ["Exterior", EXT_WASH],
      ["Interior", [
        ["Vacuum", "Carpets, mats and seats.", ""],
        ["Wipe-down", "Dash, console, door panels and steering wheel.", ""],
        ["Glass inside & out", "Streak-free.", ""],
      ]],
    ] },
  { id: "interior", name: "Interior Reset", short: "Inside only, top to bottom.",
    for: "Kids, dogs, job sites, road trips. The inside gets taken back to day one.",
    time: "2.5–3.5 hrs", price: { car: 159, suv: 179, hd: 199, rig: 219 },
    groups: [["Interior", INT_FULL]] },
  { id: "full", name: "Full Detail", short: "Inside and out. The complete reset.",
    for: "The whole vehicle. Every exterior step, every interior step, and a longer-lasting paint sealant.",
    time: "4–6 hrs", price: { car: 249, suv: 289, hd: 329, rig: 379 },
    groups: [
      ["Exterior", [...EXT_WASH.slice(0, 7), ["Paint sealant", "A real sealant layer, not a spray, for longer protection.", P.seal], EXT_WASH[8]]],
      ["Interior", INT_FULL],
    ] },
  { id: "rig", name: "The Rig", short: "Full detail plus everything underneath.", badge: "Built for trucks",
    for: "For lifted trucks, HDs and duallies where the frame and suspension are part of the look. A Full Detail plus the parts a car wash never reaches.",
    time: "6–8 hrs", price: { car: null, suv: 449, hd: 499, rig: 549 },
    groups: [
      ["Underneath", [
        ["Frame rails & crossmembers", "Degreased and rinsed, not just hosed off.", P.apc],
        ["Coilovers, control arms & shocks", "Cleaned and dressed so the suspension shows.", P.apc],
        ["Inner fender liners", "Scrubbed and dressed back to black.", ""],
        ["Wheel barrels & inner duals", "Every wheel, including the inside dual on a dually.", P.wheel],
        ["Mud-terrain tires", "Scrubbed until the foam runs white, then dressed.", P.tire],
      ]],
      ["Exterior", [
        ["Everything in the Full Detail", "Foam, contact wash, spot-free rinse, blow-dry, sealant.", ""],
        ["Bed, tailgate & steps", "Bed cleaned out, liner and running boards dressed.", ""],
        ["Trim & plastics restored", "Faded black trim brought back.", ""],
      ]],
      ["Interior", [["The full interior reset", "Everything in the Interior Reset.", ""]]],
    ] },
  { id: "ceramic", name: "Ceramic Coating", short: "Correct the paint, then lock it in.",
    for: "For a vehicle that lives outside in this sun. Paint gets decontaminated and polished, then coated. Maintained, it lasts.",
    time: "1–2 days", price: { car: 899, suv: 1099, hd: 1249, rig: 1399 },
    groups: [
      ["Prep", [
        ["Decontamination wash", "The full wash process, plus iron remover and clay to pull out bonded grit.", ""],
        ["Panel wipe", "Strips oils so the coating bonds to bare paint.", ""],
      ]],
      ["Correction", [
        ["Machine polish", "Removes swirls and haze to bring back depth. Heavier correction quoted on sight.", ""],
      ]],
      ["Protection", [
        ["Ceramic coating on paint", "Hard, slick, UV-resistant layer that makes every wash easier.", ""],
        ["Wheel faces coated", "Brake dust wipes off instead of baking on.", ""],
        ["Glass coated", "Water sheets off the windshield.", ""],
        ["Aftercare walkthrough", "How to wash it, and a maintenance plan to keep it performing.", ""],
      ]],
    ] },
];
const ADDONS = [
  { id: "headlights", name: "Headlight restoration", price: 79 },
  { id: "engine", name: "Engine bay detail", price: 69 },
  { id: "odor", name: "Odor elimination", price: 59 },
  { id: "glasscoat", name: "Glass coating", price: 99 },
  { id: "pet", name: "Pet hair removal", price: 49 },
  { id: "trim", name: "Trim restoration", price: 59 },
];
const CHAPTERS = [ // from assets/v/hero.json
  { key: "before", start: 0, end: 2.5, n: "Before", t: "Rolled in like this" },
  { key: "wheels", start: 2.5, end: 10.3, n: "01 Wheels", t: "Cool Guy on the wheels, Gyeon APC on the rubber" },
  { key: "foam", start: 10.3, end: 13.1, n: "02 Foam", t: "Snow-foam prewash with KCx Gs" },
  { key: "contact", start: 13.1, end: 15.7, n: "03 Wash", t: "Hand contact wash with Shift" },
  { key: "rinse", start: 15.7, end: 18.5, n: "04 Rinse", t: "Zero-TDS water from the van" },
  { key: "dry", start: 18.5, end: 22.7, n: "05 Dry", t: "Blown out, towel finished, glass done" },
  { key: "dress", start: 22.7, end: 25.5, n: "06 Dress", t: "Decked Out on the tires" },
  { key: "reveal", start: 25.5, end: 30.3, n: "Done", t: "King Ranch F-250, ready to roll" },
];
const FEED = [
  ["DZBt-xSvAdK", 17020, "F-250 King Ranch"], ["DaEgaLtJmOe", 16580, "Hand-engraved Super Duty"],
  ["DXQIxhmD22d", 10439, "GMT800 Sierra"], ["DflhiuSvHev", 3750, "Bagged Silverado"],
  ["DfbH8P5PFOb", 3305, "'23 Super Duty"], ["DfiyL-6PHbj", 1913, "Ram 2500"],
  ["DfgI_hTvFVa", 1395, "F-250 Lariat"], ["DfVsCzhvzly", 1221, "F-250 Platinum"],
  ["DfTaAA5vgVZ", 628, "F-350 dually"], ["DfYrhRWPUvr", 496, "Ram 2500"],
  ["Dfdt4u0PXMK", 229, "F-450 dually"], ["DfoG9MJPrvT", 45, "Sierra 1500"],
];

const ICONS = {
  check: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"><path d="M4 10.5l4 4 8-9"/></svg>',
  plus: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M8 2v12M2 8h12"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.1 3.3 4 7.1 4c2.1 0 3.6 1.1 4.9 2.8C13.3 5.1 14.8 4 16.9 4c3.8 0 6.2 4.1 4.7 7.7C19.5 16.4 12 21 12 21z"/></svg>',
  // side-profile vehicles, one stroke language
  car: '<svg viewBox="0 0 96 34" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M6 25h-2v-6l8-2 12-8h26l14 8 18 3 4 5v0h-4"/><path d="M30 25h34"/><circle cx="21" cy="25" r="6"/><circle cx="73" cy="25" r="6"/><path d="M26 17h36"/></svg>',
  suv: '<svg viewBox="0 0 96 34" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M7 25H4V13l6-7h44l12 9 20 2 5 3v5h-4"/><path d="M31 25h33"/><circle cx="21" cy="25" r="6.5"/><circle cx="74" cy="25" r="6.5"/><path d="M10 15h48"/></svg>',
  hd: '<svg viewBox="0 0 96 34" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M7 25H3V14h30V5h22l10 9h24l4 4v7h-4"/><path d="M32 25h31"/><circle cx="20" cy="25" r="7"/><circle cx="75" cy="25" r="7"/><path d="M33 14h32"/></svg>',
  rig: '<svg viewBox="0 0 96 38" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M7 22H3V11h30V2h22l10 9h24l4 4v7h-4"/><path d="M33 22h28"/><circle cx="20" cy="27" r="9"/><circle cx="75" cy="27" r="9"/><path d="M20 22v-3M75 22v-3M33 11h32"/></svg>',
};

/* ------------------------------------------------------------------ state */
const S = { size: null, pkg: null, day: null, win: null, addons: new Set(), plan: null, step: 1 };
const money = n => "$" + n.toLocaleString("en-US");
const pkgById = id => PKGS.find(p => p.id === id);
const priceFor = (pkg, size) => (pkg && pkg.price[size || "car"]) ?? null;
const addonsTotal = () => ADDONS.filter(a => S.addons.has(a.id)).reduce((t, a) => t + a.price, 0);

function toast(msg) {
  const t = $(".toast"); t.textContent = msg; t.classList.add("is-on");
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("is-on"), 3600);
}

/* demo guard: never hand tel:/sms: to the OS on a local preview */
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="sms:"], a[href^="tel:"]');
  if (!a) return;
  const body = a.dataset.sms || (a.hasAttribute("data-sms-summary") ? summaryText() : "");
  const href = a.href.startsWith("sms:") ? `sms:${PHONE}${body ? "?&body=" + encodeURIComponent(body) : ""}` : a.href;
  if (IS_LOCAL) { e.preventDefault(); toast(a.href.startsWith("sms:") ? "Demo: this opens a text to 602-616-0058 with the details filled in." : "Demo: this calls 602-616-0058."); return; }
  if (body) { e.preventDefault(); location.href = href; }
});

/* ------------------------------------------------------------------ hero reel */
function initReel() {
  const v = $(".reel__video"), bars = $(".reel__bars"), cap = $(".reel__cap"), rail = $$(".rail li");
  const capN = $(".reel__capn"), capT = $(".reel__capt"), tog = $(".reel__toggle");
  const total = CHAPTERS.at(-1).end;
  bars.innerHTML = CHAPTERS.map(c => `<span style="--w:${(c.end - c.start).toFixed(2)}"><i></i></span>`).join("");
  const fills = $$("i", bars);
  let cur = -1;

  const canvas = $(".hero__ambient"), ctx = canvas.getContext("2d", { alpha: false });
  canvas.width = 48; canvas.height = 27;
  let lastAmb = 0;

  function frame(now) {
    const t = v.currentTime % total;
    const i = CHAPTERS.findIndex(c => t >= c.start && t < c.end);
    CHAPTERS.forEach((c, k) => {
      const p = k < i ? 1 : k > i ? 0 : (t - c.start) / (c.end - c.start);
      fills[k].style.setProperty("--p", p.toFixed(3));
    });
    if (i !== cur && i >= 0) {
      cur = i; const c = CHAPTERS[i];
      capN.textContent = c.n; capT.textContent = c.t;
      rail.forEach(li => li.classList.toggle("is-on", li.dataset.ch === c.key));
    }
    rail.forEach(li => {
      const c = CHAPTERS.find(c => c.key === li.dataset.ch);
      const p = t < c.start ? 0 : t >= c.end ? 1 : (t - c.start) / (c.end - c.start);
      li.style.setProperty("--p", li.classList.contains("is-on") ? p.toFixed(3) : 0);
    });
    if (now - lastAmb > 120 && v.readyState >= 2 && getComputedStyle(canvas).display !== "none") {
      // vertical video drawn wide: center crop into a 16:9 canvas, then CSS blur
      const vw = v.videoWidth, vh = v.videoHeight, sh = vw * 9 / 16;
      try { ctx.drawImage(v, 0, (vh - sh) / 2, vw, sh, 0, 0, 48, 27); } catch (_) {}
      lastAmb = now;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  rail.forEach(li => li.addEventListener("click", () => {
    const c = CHAPTERS.find(c => c.key === li.dataset.ch);
    v.currentTime = c.start + 0.05; v.play().catch(() => {}); tog.dataset.state = "play";
  }));
  tog.addEventListener("click", () => {
    if (v.paused) { v.play(); tog.dataset.state = "play"; tog.setAttribute("aria-label", "Pause video"); }
    else { v.pause(); tog.dataset.state = "pause"; tog.setAttribute("aria-label", "Play video"); }
  });
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { v.pause(); tog.dataset.state = "pause"; }
  v.play().catch(() => {});
}

/* ------------------------------------------------------------------ booking */
const form = $(".book__form"), card = $(".book");
const nextBtn = $(".book__next"), backBtn = $(".book__back");

function renderVehicleIcons() { $$(".vopt__ico").forEach(el => el.innerHTML = ICONS[el.dataset.ico]); }

function renderPkgList() {
  $(".plist").innerHTML = PKGS.map(p => {
    const pr = priceFor(p, S.size), off = pr == null;
    return `<label class="pkg"><input type="radio" name="pkg" value="${p.id}" ${S.pkg === p.id ? "checked" : ""} ${off ? "disabled" : ""}>
      <span class="pkg__n">${p.name}</span><span class="pkg__p">${off ? "Trucks" : money(pr)}</span>
      <span class="pkg__d">${off ? "Built for SUVs and trucks." : p.short} <em>${p.time}</em></span></label>`;
  }).join("");
}

function renderDays() {
  const out = []; const d = new Date(); d.setHours(0, 0, 0, 0);
  for (let i = 1; out.length < 12; i++) {
    const x = new Date(d); x.setDate(d.getDate() + i);
    const key = x.toISOString().slice(0, 10);
    out.push(`<label class="day"><input type="radio" name="day" value="${key}" ${S.day === key ? "checked" : ""}>
      <span class="day__w">${x.toLocaleDateString("en-US", { weekday: "short" })}</span>
      <span class="day__d">${x.getDate()}</span>
      <span class="day__m">${x.toLocaleDateString("en-US", { month: "short" })}</span></label>`);
  }
  $(".days").innerHTML = out.join("");
}

function canNext() {
  if (S.step === 1) return !!S.size;
  if (S.step === 2) return !!S.pkg && priceFor(pkgById(S.pkg), S.size) != null;
  if (S.step === 3) return !!S.day && !!S.win;
  if (S.step === 4) return ["addr", "name", "phone"].every(n => form.elements[n].value.trim().length > 1) && /\d{3}.*\d{3}.*\d{4}|\d{10}/.test(form.elements.phone.value);
  return false;
}

function updateTotal() {
  const pkg = pkgById(S.pkg); const base = priceFor(pkg, S.size);
  const el = $(".book__totv"), k = $(".book__totk");
  if (base == null) {
    if (S.size) { const min = Math.min(...PKGS.map(p => priceFor(p, S.size)).filter(n => n != null)); el.textContent = money(min); k.textContent = "Details from"; }
    else { el.textContent = "—"; k.textContent = "Starting at"; }
    return;
  }
  el.textContent = money(base + addonsTotal());
  k.textContent = S.addons.size ? `${pkg.name} + ${S.addons.size} add-on${S.addons.size > 1 ? "s" : ""}` : pkg.name;
}

function goStep(n, focus = true) {
  S.step = n;
  $$(".bstep").forEach(f => f.classList.toggle("is-on", +f.dataset.step === n));
  $$(".book__steps li").forEach((li, i) => { li.classList.toggle("is-on", i + 1 === n); li.classList.toggle("is-done", i + 1 < n); });
  card.classList.toggle("is-done", n === 5);
  backBtn.hidden = n === 1 || n === 5;
  nextBtn.textContent = n === 4 ? "Request this time" : "Next";
  if (n === 2) renderPkgList();
  if (n === 3) renderDays();
  if (n === 5) renderSummary();
  nextBtn.disabled = !canNext();
  if (focus) { const f = $(`.bstep[data-step="${n}"]`); const first = f.querySelector("input:not([disabled]), [tabindex]"); first && first.focus({ preventScroll: true }); }
}

function summaryText() {
  const pkg = pkgById(S.pkg); const add = ADDONS.filter(a => S.addons.has(a.id)).map(a => a.name);
  const day = S.day ? new Date(S.day + "T12:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }) : "";
  const f = form.elements;
  return [`Hey Jasperson's, I'd like to book a detail.`,
    `Vehicle: ${SIZES[S.size] || ""}${f.veh.value ? " (" + f.veh.value + ")" : ""}`,
    `Detail: ${pkg ? pkg.name : ""}${add.length ? " + " + add.join(", ") : ""}${S.plan ? " (" + S.plan + " plan)" : ""}`,
    `When: ${day}, ${S.win || ""}`, `Where: ${f.addr.value}`, `Name: ${f.name.value}`, `Phone: ${f.phone.value}`].join("\n");
}

function renderSummary() {
  const pkg = pkgById(S.pkg); const add = ADDONS.filter(a => S.addons.has(a.id)).map(a => a.name);
  const day = new Date(S.day + "T12:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  const rows = [["Vehicle", SIZES[S.size] + (form.elements.veh.value ? `, ${form.elements.veh.value}` : "")],
    ["Detail", pkg.name + (add.length ? ` + ${add.join(", ")}` : "") + (S.plan ? ` (${S.plan} plan)` : "")],
    ["When", `${day}, ${S.win}`], ["Where", form.elements.addr.value],
    ["Estimate", money(priceFor(pkg, S.size) + addonsTotal())]];
  $(".bdone__sum").innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${escapeHtml(v)}</dd>`).join("");
}
const escapeHtml = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

form.addEventListener("change", e => {
  const { name, value } = e.target;
  if (name === "size") { setSize(value); }
  if (name === "pkg") { S.pkg = value; syncMenuToPkg(); }
  if (name === "day") S.day = value;
  if (name === "win") S.win = value;
  updateTotal(); nextBtn.disabled = !canNext();
  // auto-advance on the tap-only steps
  if ((name === "size" && S.step === 1) || (name === "pkg" && S.step === 2) || (name === "win" && S.day && S.step === 3)) setTimeout(() => { if (canNext()) goStep(S.step + 1); }, 240);
});
form.addEventListener("input", () => { nextBtn.disabled = !canNext(); });
nextBtn.addEventListener("click", () => {
  if (S.step === 4 && !canNext()) return;
  if (canNext()) goStep(S.step + 1);
});
backBtn.addEventListener("click", () => goStep(Math.max(1, S.step - 1)));
$("[data-restart]").addEventListener("click", () => {
  S.size = S.pkg = S.day = S.win = S.plan = null; S.addons.clear(); form.reset(); renderAddons(); syncSizer(); updateTotal(); goStep(1);
});
$('[data-goto="services"]').addEventListener("click", () => $("#services").scrollIntoView({ behavior: "smooth" }));

/* ------------------------------------------------------------------ service menu */
let menuPkg = "full";
function setSize(size) {
  S.size = size;
  const r = form.querySelector(`input[name=size][value="${size}"]`); if (r) r.checked = true;
  if (S.pkg && priceFor(pkgById(S.pkg), size) == null) S.pkg = null;
  syncSizer(); renderTabs(); renderPanel(); renderPkgList(); renderPlans(); updateTotal();
  nextBtn.disabled = !canNext();
}
function syncSizer() { $$(".sizer button").forEach(b => b.setAttribute("aria-checked", String(b.dataset.size === (S.size || "car")))); }
function syncMenuToPkg() { if (S.pkg) { menuPkg = S.pkg; renderTabs(); renderPanel(); } }

function renderTabs() {
  const size = S.size || "car";
  $(".menu__tabs").innerHTML = PKGS.map(p => {
    const pr = priceFor(p, size);
    return `<button class="mtab" role="tab" type="button" id="tab-${p.id}" aria-controls="panel" aria-selected="${p.id === menuPkg}" data-id="${p.id}" tabindex="${p.id === menuPkg ? 0 : -1}">
      <span class="mtab__n">${p.name}</span><span class="mtab__p">${pr == null ? "SUV+" : money(pr)}</span>
      <span class="mtab__d">${p.short}</span>${p.badge ? `<span class="mtab__badge">${p.badge}</span>` : ""}</button>`;
  }).join("") + `<figure class="mtab__fig"><img src="assets/img/reveal.jpg" alt="Black and tan King Ranch F-250 after a full wash" loading="lazy" width="720" height="1280"><figcaption>King Ranch F-250, out the other side.</figcaption></figure>`;
  const tabs = $(".menu__tabs"), sel = $(".mtab[aria-selected=true]", tabs);
  if (sel && tabs.scrollWidth > tabs.clientWidth) tabs.scrollLeft = sel.offsetLeft - 8;
}

function renderPanel() {
  const p = pkgById(menuPkg), size = S.size || "car", pr = priceFor(p, size);
  const count = p.groups.reduce((n, g) => n + g[1].length, 0);
  const panel = $(".menu__panel"); panel.id = "panel"; panel.setAttribute("aria-labelledby", "tab-" + p.id);
  panel.innerHTML = `
    <div class="mp__top">
      <div><h3 class="mp__name">${p.name}</h3><p class="mp__for">${p.for}</p></div>
      <dl class="mp__meta">
        <div><dt>${SIZES[size]}</dt><dd>${pr == null ? "—" : money(pr)}</dd></div>
        <div><dt>Time on site</dt><dd>${p.time.replace(/ (hrs|days)$/, "")} <small>${(p.time.match(/(hrs|days)$/) || [""])[0]}</small></dd></div>
        <div><dt>Steps</dt><dd>${count}</dd></div>
      </dl>
    </div>
    ${pr == null ? `<p class="mp__inc"><b>Built for trucks.</b> Pick SUV, HD or lifted above to see pricing.</p>` : ""}
    <div class="mp__groups">${p.groups.map(([g, items]) => `
      <div class="mp__g"><h4>${g}</h4><ul>${items.map(([t, d, prod]) => `
        <li>${ICONS.check}<div><b>${t}</b><span>${d}</span>${prod ? `<em>${prod}</em>` : ""}</div></li>`).join("")}</ul></div>`).join("")}
    </div>
    <div class="mp__foot">
      <button type="button" class="btn btn--red" data-book-pkg="${p.id}" ${pr == null ? "disabled" : ""}>Book the ${p.name}</button>
      <p class="mp__note">Arrives with its own water and power.</p>
    </div>`;
}

$(".menu__tabs").addEventListener("click", e => {
  const b = e.target.closest(".mtab"); if (!b) return;
  menuPkg = b.dataset.id; renderTabs(); renderPanel(); $(`#tab-${menuPkg}`).focus();
});
$(".menu__tabs").addEventListener("keydown", e => {
  if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
  e.preventDefault(); const i = PKGS.findIndex(p => p.id === menuPkg);
  const d = ["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : -1;
  menuPkg = PKGS[(i + d + PKGS.length) % PKGS.length].id; renderTabs(); renderPanel(); $(`#tab-${menuPkg}`).focus();
});
$(".sizer").addEventListener("click", e => { const b = e.target.closest("button"); if (b) setSize(b.dataset.size); });

function bookPackage(id, size) {
  if (size) setSize(size);
  if (!S.size) setSize(pkgById(id).price.car == null ? "hd" : "car");
  S.pkg = id; menuPkg = id; renderTabs(); renderPanel(); updateTotal();
  goStep(3, false);
  $("#book").scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => { const f = $('.bstep[data-step="3"] input'); f && f.focus({ preventScroll: true }); }, 600);
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-book-pkg]"); if (b) bookPackage(b.dataset.bookPkg);
  const r = e.target.closest("[data-pick]");
  if (r) { if (r.dataset.pickSize) setSize(r.dataset.pickSize); menuPkg = r.dataset.pick; renderTabs(); renderPanel(); $("#services").scrollIntoView({ behavior: "smooth" }); }
  const pl = e.target.closest("[data-plan-book]");
  if (pl) { S.plan = pl.dataset.planBook; bookPackage("maintenance"); toast(`${S.plan} plan added. Pick your first day.`); }
});

/* add-ons */
function renderAddons() {
  $(".addons__list").innerHTML = ADDONS.map(a => `<button type="button" class="addon" data-id="${a.id}" aria-pressed="${S.addons.has(a.id)}">${ICONS.plus}${a.name}<i>+${money(a.price)}</i></button>`).join("");
}
$(".addons__list").addEventListener("click", e => {
  const b = e.target.closest(".addon"); if (!b) return;
  S.addons.has(b.dataset.id) ? S.addons.delete(b.dataset.id) : S.addons.add(b.dataset.id);
  b.setAttribute("aria-pressed", String(S.addons.has(b.dataset.id))); updateTotal();
});

/* plans follow the size too */
function renderPlans() {
  const base = priceFor(pkgById("maintenance"), S.size || "car");
  const bi = $('[data-plan="biweekly"]'), mo = $('[data-plan="monthly"]');
  if (bi) bi.textContent = money(Math.round(base * 0.88));
  if (mo) mo.textContent = money(Math.round(base * 1.06));
}

/* ------------------------------------------------------------------ process */
function initProcess() {
  const steps = $$(".step"), vid = $(".phone__v"), num = $(".phone__n");
  const mobile = matchMedia("(max-width: 900px)");
  let curKey = "wheels";
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      steps.forEach(s => s.classList.toggle("is-on", s === en.target));
      const k = en.target.dataset.v;
      if (k !== curKey && !mobile.matches) {
        curKey = k; vid.style.opacity = 0;
        setTimeout(() => { vid.poster = `assets/img/step-${k}.jpg`; vid.src = `assets/v/step-${k}.mp4`; vid.play().catch(() => {}); vid.style.opacity = 1; }, 180);
        num.textContent = en.target.querySelector(".step__n").textContent;
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  steps.forEach(s => io.observe(s));
  steps[0].classList.add("is-on");

  // mobile: each step carries its own clip
  steps.forEach(s => {
    const k = s.dataset.v, box = document.createElement("div");
    box.className = "step__vid";
    box.innerHTML = `<video muted playsinline loop preload="none" poster="assets/img/step-${k}.jpg" data-src="assets/v/step-${k}.mp4"></video>`;
    s.querySelector("h3").after(box);
  });
}

/* lazy autoplay for any video with data-src, pause when off screen */
function initLazyVideo() {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    const v = en.target;
    if (en.isIntersecting) { if (!v.src && v.dataset.src) v.src = v.dataset.src; v.play().catch(() => {}); }
    else if (!v.paused) v.pause();
  }), { rootMargin: "120px 0px" });
  $$("video[data-src]").forEach(v => io.observe(v));
}

/* ------------------------------------------------------------------ feed */
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
  const stop = t => { const v = t.querySelector("video"); v.pause(); t.classList.remove("is-play"); };
  const hover = matchMedia("(hover: hover)").matches;
  if (hover) tiles.forEach(t => { t.addEventListener("mouseenter", () => play(t)); t.addEventListener("mouseleave", () => stop(t)); t.addEventListener("focus", () => play(t)); t.addEventListener("blur", () => stop(t)); });
  else {
    // touch: play whichever tiles sit in the middle of the screen
    const io = new IntersectionObserver(es => es.forEach(en => en.isIntersecting ? play(en.target) : stop(en.target)), { rootMargin: "-30% 0px -30% 0px" });
    tiles.forEach(t => io.observe(t));
  }
}

/* ------------------------------------------------------------------ mobile bar */
function initMbar() {
  const bar = $(".mbar"), book = $("#book");
  let bookVisible = false;
  new IntersectionObserver(es => es.forEach(en => { bookVisible = en.isIntersecting; toggle(); })).observe(book);
  const toggle = () => bar.classList.toggle("is-on", scrollY > innerHeight * .8 && !bookVisible);
  addEventListener("scroll", toggle, { passive: true });
}

/* ------------------------------------------------------------------ boot */
renderVehicleIcons(); renderTabs(); renderPanel(); renderAddons(); renderPlans(); syncSizer(); updateTotal(); goStep(1, false);
initReel(); initProcess(); initLazyVideo(); initFeed(); initMbar();
})();
