/* ==========================================================================
   Site logic. You shouldn't need to edit this to change content —
   that all lives in content.js. Sections:
     1. Fill text from content.js
     2. Placeholder artwork generator
     3. Gallery, filters, 3D tilt cards, lightbox
     3b. Displays list + 2D project slideshow
     4. 3D hero: rotating artwork carousel (three.js)
   ========================================================================== */

/* ---------- 1. Fill text ---------- */
const getPath = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
const $ = (sel, root = document) => root.querySelector(sel);

document.title = SITE.pageTitle;
document.querySelectorAll("[data-text]").forEach(el => {
  const v = getPath(SITE, el.dataset.text);
  if (v != null) el.textContent = v;
});

$("#navLinks").innerHTML = SITE.nav.map(n => `<a href="${n.href}">${n.label}</a>`).join("");

// discipline strip: the list is repeated so it can loop forever, drifts by itself, and can be dragged or scrolled
(function strip() {
  const el = $(".marquee"), track = $("#marquee"), COPIES = 6;
  const set = SITE.marquee.map(t => `<span class="marquee__item"><b>${t}</b><i>✦</i></span>`).join("");
  track.innerHTML = set.repeat(COPIES);
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let S = 0, pos = 0, hover = false, drag = false, lastX = 0, touching = false;
  const measure = () => { S = track.scrollWidth / COPIES; if (!pos) { pos = S; el.scrollLeft = pos; } };
  addEventListener("load", measure); addEventListener("resize", measure); measure();
  el.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") hover = true; });
  el.addEventListener("pointerleave", () => { hover = false; });
  el.addEventListener("pointerdown", e => { if (e.pointerType === "mouse") { drag = true; lastX = e.clientX; el.classList.add("is-drag"); } });
  addEventListener("pointermove", e => { if (drag) { el.scrollLeft -= e.clientX - lastX; lastX = e.clientX; } });
  addEventListener("pointerup", () => { drag = false; el.classList.remove("is-drag"); });
  el.addEventListener("touchstart", () => { touching = true; }, { passive: true });
  el.addEventListener("touchend", () => { touching = false; }, { passive: true });
  let visible = true;
  new IntersectionObserver(e => { visible = e[0].isIntersecting; }).observe(el);
  (function tick() {
    requestAnimationFrame(tick);
    if (!visible || !S) return;
    if (hover || drag || touching) pos = el.scrollLeft; else { pos += still ? 0.3 : 0.7; el.scrollLeft = pos; }   // gentler drift if the OS asks for reduced motion
    if (pos >= 2 * S) { pos -= S; el.scrollLeft = pos; }       // keep the position inside the middle copies
    else if (pos < S) { pos += S; el.scrollLeft = pos; }
  })();
})();

$("#aboutParas").innerHTML = SITE.about.paragraphs.map(p => `<p>${p}</p>`).join("");
$("#facts").innerHTML = SITE.about.facts.map(f => `<div><dt>${f.label}</dt><dd>${f.value}</dd></div>`).join("");
const emailEl = $("#email");
emailEl.textContent = SITE.contact.email;
emailEl.href = "mailto:" + SITE.contact.email;
$("#socials").innerHTML = SITE.contact.socials.map(s => `<a href="${s.href}" target="_blank" rel="noopener">${s.label}</a>`).join("");

/* ---------- 2. Placeholder artwork ---------- */
function rng(seed) {                       // small seeded random so each piece looks the same every load
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const hash = s => [...s].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7);

function placeholderCanvas(key, palette, aspect = 0.8, w = 720) {
  const h = Math.round(w / aspect), c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d"), r = rng(hash(key));
  g.fillStyle = palette[0]; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 7; i++) {            // soft overlapping colour blobs
    const x = r() * w, y = r() * h, rad = (0.25 + r() * 0.5) * Math.max(w, h);
    const col = palette[1 + Math.floor(r() * (palette.length - 1))];
    const gr = g.createRadialGradient(x, y, 0, x, y, rad);
    gr.addColorStop(0, col + "ee"); gr.addColorStop(1, col + "00");
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
  }
  g.globalAlpha = 0.5; g.strokeStyle = palette[palette.length - 1]; g.lineWidth = 2;  // a few loose brush arcs
  for (let i = 0; i < 4; i++) { g.beginPath(); g.arc(r() * w, r() * h, 60 + r() * w * 0.4, r() * 6, r() * 6 + 2); g.stroke(); }
  g.globalAlpha = 0.06;                     // grain
  for (let i = 0; i < 2600; i++) { g.fillStyle = r() > 0.5 ? "#000" : "#fff"; g.fillRect(r() * w, r() * h, 2, 2); }
  g.globalAlpha = 0.55; g.fillStyle = "#fff";
  g.font = `${Math.round(w / 38)}px "DM Mono", monospace`; g.textAlign = "center";
  g.fillText("YOUR ARTWORK HERE", w / 2, h - w / 18);
  return c;
}

const RATIOS = [0.8, 1.25, 1, 0.75, 1.1, 0.85, 0.8, 1.2, 0.9];   // varied shapes so the grid looks like a real gallery
const artworks = SITE.artworks.map((a, i) => {
  const aspect = a.w && a.h ? a.w / a.h : RATIOS[i % RATIOS.length];
  const canvas = a.image ? null : placeholderCanvas(a.title + i, a.palette || ["#d8d4c8", "#6b6b66", "#1f1f1f", "#efece4"], aspect);
  const src = a.image || canvas.toDataURL("image/jpeg", 0.88);
  return { ...a, aspect, canvas, src, thumbSrc: a.thumb || src, isVideo: a.type === "video" };
});

/* ---------- 3. Gallery ---------- */
const grid = $("#grid");
grid.innerHTML = artworks.map((a, i) => `
  <figure class="card" data-i="${i}" data-cat="${a.category}" tabindex="0">
    <div class="tilt">
      <img src="${a.thumbSrc}" alt="${a.title}" loading="lazy" decoding="async" style="aspect-ratio:${a.aspect.toFixed(4)}">
      ${a.isVideo ? '<span class="card__play" aria-hidden="true">▶</span>' : ""}
      <span class="tilt__glare"></span>
    </div>
    <figcaption class="card__cap">
      <div><h3>${a.title}</h3><p>${[a.category, a.medium].filter((t, k, arr) => t && arr.findIndex(u => u && u.toLowerCase() === t.toLowerCase()) === k).join(" · ")}</p></div><span>${a.year || ""}</span>
    </figcaption>
  </figure>`).join("");

// 3D tilt on hover (mouse only)
function attachTilt(box, max = 10) {
  const el = $(".tilt", box) || box;
  box.addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return;
    const r = box.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.classList.add("is-active");
    el.style.setProperty("--rx", ((0.5 - py) * max * 2).toFixed(2) + "deg");
    el.style.setProperty("--ry", ((px - 0.5) * max * 2).toFixed(2) + "deg");
    el.style.setProperty("--s", 1.03);
    el.style.setProperty("--gx", px * 100 + "%"); el.style.setProperty("--gy", py * 100 + "%");
  });
  box.addEventListener("pointerleave", () => {
    el.classList.remove("is-active");
    ["--rx", "--ry", "--s"].forEach(p => el.style.removeProperty(p));
  });
}
grid.querySelectorAll(".card").forEach(c => attachTilt(c));
attachTilt($(".about__portrait"), 7);

// portrait
const portraitEl = $("#portrait");
portraitEl.src = SITE.about.portrait ||
  placeholderCanvas("portrait", ["#e8b4a0", "#2f3e5c", "#c9573e", "#f2e3c6"], 0.8, 640).toDataURL("image/jpeg", 0.88);

// filters
const cats = [SITE.work.allLabel, ...(SITE.work.categoryOrder || [...new Set(artworks.map(a => a.category))])];
const filtersEl = $("#filters");
filtersEl.innerHTML = cats.map((c, i) => `<button class="${i ? "" : "is-active"}" data-c="${c}">${c}</button>`).join("");
let activeCat = SITE.work.allLabel;
const PAGE = SITE.work.pageSize || 12;
let shown = PAGE;
const moreBox = $("#more"), moreBtn = $("#moreBtn"), moreCount = $("#moreCount");
moreBtn.textContent = SITE.work.moreLabel || "Show more";
function applyFilter() {                         // category filter + "show more" paging
  const all = [...grid.querySelectorAll(".card")].filter(c => activeCat === SITE.work.allLabel || c.dataset.cat === activeCat);
  grid.querySelectorAll(".card").forEach(c => c.classList.add("is-hidden"));
  all.slice(0, shown).forEach(c => c.classList.remove("is-hidden"));
  moreBox.hidden = all.length <= shown;
  moreCount.textContent = `Showing ${Math.min(shown, all.length)} of ${all.length}`;
}
filtersEl.addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  activeCat = b.dataset.c; shown = PAGE;
  filtersEl.querySelectorAll("button").forEach(x => x.classList.toggle("is-active", x === b));
  applyFilter();
});
moreBtn.addEventListener("click", () => { shown += PAGE; applyFilter(); });
applyFilter();
const visibleIdx = () => [...grid.querySelectorAll(".card:not(.is-hidden)")].map(c => +c.dataset.i);

// lightbox
const lb = $("#lightbox");
let lbPos = 0, lbList = [];
function showLb() {
  const a = artworks[lbList[lbPos]];
  const vid = $("#lbVideo"), img = $("#lbImg");
  vid.pause(); vid.removeAttribute("src");
  if (a.isVideo) {
    img.hidden = true; vid.hidden = false;
    vid.poster = a.src; vid.src = a.video; vid.muted = true; vid.play().catch(() => {});
  } else {
    vid.hidden = true; img.hidden = false; img.src = a.src; img.alt = a.title;
  }
  $("#lbTitle").textContent = a.title;
  $("#lbMeta").textContent = [a.medium, a.year, a.size].filter(Boolean).join(" · ");
  $("#lbDesc").textContent = a.description || "";
}
function openLb(i) { lbList = visibleIdx(); if (!lbList.includes(i)) lbList = artworks.map((_, k) => k); lbPos = Math.max(0, lbList.indexOf(i)); showLb(); lb.hidden = false; document.body.style.overflow = "hidden"; }
function closeLb() { lb.hidden = true; $("#lbVideo").pause(); document.body.style.overflow = ""; }
function stepLb(d) { lbPos = (lbPos + d + lbList.length) % lbList.length; showLb(); }
grid.addEventListener("click", e => { const c = e.target.closest(".card"); if (c) openLb(+c.dataset.i); });
grid.addEventListener("keydown", e => { if (e.key === "Enter") { const c = e.target.closest(".card"); if (c) openLb(+c.dataset.i); } });
$("#lbClose").onclick = closeLb;
$("#lbPrev").onclick = () => stepLb(-1);
$("#lbNext").onclick = () => stepLb(1);
lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") stepLb(-1);
  if (e.key === "ArrowRight") stepLb(1);
});

/* ---------- 3b. Displays + Thesis lists and the 2D project slideshow ---------- */
const creditOf = cfg => cfg.collab || cfg.credit;                  // displays use `collab`, thesis uses `credit`
const creditLine = cfg => `${creditOf(cfg).label} <b>${creditOf(cfg).name}</b>`;
const creditFull = cfg => `${creditLine(cfg)}${creditOf(cfg).note ? ` — <span>${creditOf(cfg).note}</span>` : ""}`;

function renderRows(ul, cfg) {
  ul.innerHTML = cfg.projects.map((p, i) => `
    <li class="dp reveal" data-p="${i}" tabindex="0" role="button" aria-label="Open ${p.title} slideshow">
      <span class="dp__y">${p.tag || p.year || ""}</span>
      <span class="dp__main"><span class="dp__t">${p.title}</span><span class="dp__c">${creditLine(cfg)}</span></span>
      <span class="dp__thumbs" aria-hidden="true">${p.slides.slice(0, 3).map(sl => `<img src="${sl.thumb || sl.image}" alt="" loading="lazy" decoding="async">`).join("")}</span>
      <span class="dp__go">${p.slides.length} ${p.slides.length === 1 ? "slide" : "slides"} <i aria-hidden="true">↗</i></span>
    </li>`).join("");
}

const deck = (function makeDeck() {
  const el = $("#deck"), track = $("#deckTrack"), view = $("#deckView"), dots = $("#deckDots");
  let cfg = null, proj = null, pos = 0, lastFocus = null;

  const media = k => track.children[k] && track.children[k].querySelector("img, video");
  const loadNear = i => [i - 1, i, i + 1].forEach(k => {          // only fetch the slides around the current one
    const m = media(k);
    if (m && !m.getAttribute("src")) m.src = m.dataset.src;
  });
  function show(i) {
    pos = (i + proj.slides.length) % proj.slides.length;
    const sl = proj.slides[pos];
    track.style.transform = `translateX(${-pos * 100}%)`;
    loadNear(pos);
    track.querySelectorAll("video").forEach(v => v.pause());     // only the current slide's video plays
    const cur = media(pos);
    if (cur && cur.tagName === "VIDEO") { cur.muted = true; cur.play().catch(() => {}); }
    $("#deckCount").textContent = `${String(pos + 1).padStart(2, "0")} / ${String(proj.slides.length).padStart(2, "0")}`;
    dots.querySelectorAll("button").forEach((d, k) => d.classList.toggle("is-on", k === pos));
    $("#deckNote").textContent = sl.note || proj.notes || "";
  }
  function open(c, i) {
    cfg = c; proj = cfg.projects[i]; lastFocus = document.activeElement;
    track.innerHTML = proj.slides.map(sl => `<div class="deck__slide">${sl.video
      ? `<video data-src="${sl.video}" poster="${sl.image}" controls playsinline loop muted preload="none"></video>`
      : `<img data-src="${sl.image}" alt="${sl.title || proj.title}" decoding="async">`}</div>`).join("");
    dots.innerHTML = proj.slides.map((_, k) => `<button type="button" aria-label="Go to slide ${k + 1}"></button>`).join("");
    $("#deckCollab").innerHTML = creditLine(cfg);
    $("#deckTitle").textContent = proj.title;
    $("#deckMeta").textContent = [proj.role, proj.year].filter(Boolean).join(" · ");
    $("#deckSummary").textContent = proj.summary || "";
    el.hidden = false; document.body.style.overflow = "hidden";
    track.style.transition = "none"; show(0); void track.offsetWidth; track.style.transition = "";
    $("#deckClose").focus();
  }
  function close() {
    track.querySelectorAll("video").forEach(v => v.pause());
    el.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus();
  }

  $("#deckClose").onclick = close;
  $("#deckPrev").onclick = () => show(pos - 1);
  $("#deckNext").onclick = () => show(pos + 1);
  dots.addEventListener("click", e => { const b = e.target.closest("button"); if (b) show([...dots.children].indexOf(b)); });
  el.addEventListener("click", e => { if (e.target === el) close(); });
  document.addEventListener("keydown", e => {
    if (el.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(pos - 1);
    if (e.key === "ArrowRight") show(pos + 1);
  });
  let sx = null;                                                    // drag / swipe the slides
  view.addEventListener("pointerdown", e => { if (!e.target.closest("video")) sx = e.clientX; });
  addEventListener("pointerup", e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) show(pos + (dx < 0 ? 1 : -1)); });
  return { open };
})();

function bindRows(ul, cfg) {                                        // click / Enter on a row opens its slideshow
  ul.addEventListener("click", e => { const li = e.target.closest(".dp"); if (li) deck.open(cfg, +li.dataset.p); });
  ul.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { const li = e.target.closest(".dp"); if (li) { e.preventDefault(); deck.open(cfg, +li.dataset.p); } } });
}

// Displays (client work)
$("#displaysCredit").innerHTML = creditFull(SITE.displays);
renderRows($("#displayList"), SITE.displays);
bindRows($("#displayList"), SITE.displays);

// Thesis (Hareafter)
if (SITE.thesis) {
  $("#thesisCredit").innerHTML = creditFull(SITE.thesis);
  renderRows($("#thesisList"), SITE.thesis);
  bindRows($("#thesisList"), SITE.thesis);
  if (SITE.thesis.cover) {
    $("#thesisCoverImg").src = SITE.thesis.cover;
    $("#thesisCover").hidden = false;
    attachTilt($("#thesisCover"), 7);
  }
} else {
  $("#thesis").remove();
}

// nav background + scroll reveals
const nav = $("#nav");
addEventListener("scroll", () => nav.classList.toggle("is-stuck", scrollY > 40), { passive: true });
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 3) * 80 + "ms"; io.observe(el); });


/* ---------- 4. 3D hero: rotating artwork carousel ---------- */
(function hero3D() {
  const canvas = $("#heroCanvas"), heroEl = $("#hero");
  if (typeof THREE === "undefined") return;           // offline / CDN blocked: hero just shows text
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); } catch (e) { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;

  const scene = new THREE.Scene();
  const paper = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue("--bg").trim() || "#f4efe6");
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 80);
  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const sun = new THREE.DirectionalLight(0xffffff, 0.7); sun.position.set(3, 6, 8); scene.add(sun);
  const world = new THREE.Group(); scene.add(world);

  // soft drop-shadow texture shared by all frames
  const sh = document.createElement("canvas"); sh.width = sh.height = 128;
  const sg = sh.getContext("2d"), grad = sg.createRadialGradient(64, 64, 8, 64, 64, 64);
  grad.addColorStop(0, "rgba(29,26,23,.4)"); grad.addColorStop(1, "rgba(29,26,23,0)");
  sg.fillStyle = grad; sg.fillRect(0, 0, 128, 128);
  const shadowTex = new THREE.CanvasTexture(sh);

  const frameMat = new THREE.MeshStandardMaterial({ color: THEME_3D.frameColor, roughness: 0.55, metalness: 0.1 });
  const matMat = new THREE.MeshStandardMaterial({ color: THEME_3D.matColor, roughness: 0.95 });
  const unit = new THREE.BoxGeometry(1, 1, 1), plane = new THREE.PlaneGeometry(1, 1);

  const BASE_H = THEME_3D.frameHeight, GAP = THEME_3D.gap, CAM_DIST = 12;
  const items = [], pickable = [];
  let R = 6;

  function fit(f) {                                 // size one frame to its picture's shape
    const w = BASE_H * f.aspect, h = BASE_H;
    f.frame.scale.set(w + 0.34, h + 0.34, 0.14);
    f.mat.scale.set(w + 0.16, h + 0.16, 1);
    f.art.scale.set(w, h, 1);
    f.matB.scale.copy(f.mat.scale); f.artB.scale.copy(f.art.scale);
    f.shadow.scale.set((w + 0.34) * 1.5, (h + 0.34) * 1.5, 1);
  }

  // lay the frames edge to edge around a circle, whatever shape each picture is
  function layout() {
    const widths = items.map(f => BASE_H * f.aspect + 0.34 + GAP);
    const total = widths.reduce((a, b) => a + b, 0);
    R = total / (2 * Math.PI);
    let run = 0;
    items.forEach((f, i) => {
      const a = (run + widths[i] / 2) / R; run += widths[i];
      f.g.position.set(Math.sin(a) * R, 0, Math.cos(a) * R);
      f.g.rotation.y = a;
    });
    placeCamera();
  }
  function placeCamera() {
    const aspect = camera.aspect, fov = THREE.MathUtils.degToRad(camera.fov / 2);
    const needForWidth = (R * 1.1) / (Math.tan(fov) * aspect);        // keep the whole ring on narrow screens
    const dist = Math.max(R + CAM_DIST, needForWidth);
    camera.position.set(0, 2.8, dist);
    scene.fog = new THREE.Fog(paper, dist - 1, dist + R * 2.2);       // far side fades into the paper colour
  }

  let heroSet = artworks.map((a, i) => ({ a, i })).filter(x => x.a.featured && !x.a.isVideo);
  if (!heroSet.length) heroSet = artworks.map((a, i) => ({ a, i })).filter(x => !x.a.isVideo).slice(0, 9);
  heroSet.forEach(({ a, i }) => {
    const g = new THREE.Group();
    const f = {
      g, idx: i, aspect: a.aspect, phase: i * 1.3,
      frame: new THREE.Mesh(unit, frameMat),
      mat: new THREE.Mesh(plane, matMat),
      art: new THREE.Mesh(plane, new THREE.MeshBasicMaterial({ color: 0xffffff })),
      matB: new THREE.Mesh(plane, matMat),
      artB: new THREE.Mesh(plane, new THREE.MeshBasicMaterial({ color: 0xffffff })),
      shadow: new THREE.Mesh(plane, new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })),
    };
    f.mat.position.z = 0.071; f.art.position.z = 0.078; f.shadow.position.set(0.2, -0.3, -0.4);
    f.matB.position.z = -0.071; f.artB.position.z = -0.078; f.matB.rotation.y = f.artB.rotation.y = Math.PI;   // same art on the back, so the far side of the ring isn't blank
    f.artB.material = f.art.material;
    [f.frame, f.mat, f.art, f.matB, f.artB].forEach(m => { m.userData.item = f; pickable.push(m); });
    g.add(f.shadow, f.frame, f.mat, f.art, f.matB, f.artB); world.add(g); items.push(f);

    const apply = (tex, aspect) => {
      tex.encoding = THREE.sRGBEncoding; tex.anisotropy = 4;
      f.art.material.map = tex; f.art.material.needsUpdate = true; f.aspect = aspect; fit(f); layout();
    };
    fit(f);
    if (a.canvas) apply(new THREE.CanvasTexture(a.canvas), a.aspect);
    else new THREE.TextureLoader().load(a.thumbSrc, t => apply(t, t.image.width / t.image.height),
      undefined, () => apply(new THREE.CanvasTexture(placeholderCanvas(a.title, a.palette || ["#d8d4c8", "#6b6b66", "#1f1f1f", "#efece4"], a.aspect)), a.aspect));
  });
  layout();

  /* interaction: drag to spin, click a frame to open it, gentle mouse parallax */
  let rot = 0, vel = 0, dragging = false, downX = 0, downY = 0, lastX = 0, moved = 0, mx = 0, my = 0, tx = 0, ty = 0;
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const ignore = e => e.target.closest("a, button");

  heroEl.addEventListener("pointerdown", e => {
    if (ignore(e)) return;
    dragging = true; downX = lastX = e.clientX; downY = e.clientY; moved = 0;
  });
  addEventListener("pointermove", e => {
    tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5;
    if (!dragging) return;
    const d = (e.clientX - lastX) * 0.006; lastX = e.clientX;
    rot += d; vel = d * 60; moved += Math.abs(d);
  });
  addEventListener("pointerup", e => {
    if (!dragging) return; dragging = false;
    if (Math.abs(e.clientX - downX) + Math.abs(e.clientY - downY) > 8) return;      // it was a drag, not a click
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(pickable)[0];
    if (hit) openLb(hit.object.userData.item.idx);
  });

  let visible = true;
  function resize() {
    const w = heroEl.clientWidth, h = heroEl.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix(); placeCamera();
  }
  addEventListener("resize", resize); resize();
  new IntersectionObserver(e => { visible = e[0].isIntersecting; }).observe(heroEl);

  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clock = new THREE.Clock();
  (function tick() {
    requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
    if (!visible) return;
    if (!dragging) { rot += (THEME_3D.spin * (still ? 0.4 : 1) + vel) * dt; vel *= 0.95; }
    mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
    const sc = Math.min(scrollY, innerHeight);
    world.rotation.y = rot + sc * 0.002;
    world.position.y = -0.65 + sc * 0.004;
    camera.position.y = 2.8 - my * 1.2; camera.position.x = mx * 1.2;
    camera.lookAt(0, 0.2, 0);
    items.forEach(f => { f.g.position.y = Math.sin(t * 0.8 + f.phase) * 0.1; });
    renderer.render(scene, camera);
  })();
})();
