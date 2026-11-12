/* ==========================================================================
   Opening animation: her name is sketched in pencil on a dotted sketchbook page.
     1. construction guide lines (baseline, x-height, ascender) draw in
     2. each letter is traced, left to right, with a slightly wobbly "boiling" line
     3. pencil hatching sweeps across the letters
     4. the name inks in and a hand-drawn underline scribbles beneath it
   Text comes from SITE.hero.nameLine1 / nameLine2; on/off, label and pencil
   colour are in content.js (SITE.loader). Plain 2D canvas — no libraries needed.
   ========================================================================== */
(function loader() {
  const root = document.getElementById("loader");
  const cfg = (typeof SITE !== "undefined" && SITE.loader) || {};
  const open = instant => {
    document.body.classList.remove("loading");
    if (!root) return;
    if (instant) { root.remove(); return; }
    root.classList.add("is-done");                       // page slides up
    setTimeout(() => root.remove(), 1500);
  };
  if (!root || cfg.enabled === false) return open(true);
  const safety = setTimeout(() => open(true), 14000);    // never leave the visitor stuck behind it

  try {
    const canvas = document.getElementById("loaderCanvas"), ctx = canvas.getContext("2d");
    document.getElementById("loaderLabel").textContent = cfg.label || "Loading";
    const pctEl = document.getElementById("loaderPct");

    const css = getComputedStyle(document.documentElement);
    const PENCIL = cfg.pencil || "#2b2a28";
    const INK = css.getPropertyValue("--ink").trim() || "#1d1a17";
    const ACCENT = css.getPropertyValue("--accent").trim() || "#c9573e";
    const FAM = '"Fraunces", Georgia, serif';
    const WORDS = [SITE.hero.nameLine1, SITE.hero.nameLine2];
    const STYLES = ["300", "italic 300"];
    const COLORS = [INK, ACCENT];

    // timeline (seconds)
    const T_GUIDES = 0.7, T_TRACE = 0.35, T_STAGGER = 0.24, T_LETTER = 1.0;
    const T_HATCH = [1.0, 3.4], T_FILL = [3.3, 4.0], T_SCRIBBLE = [3.2, 3.9], T_END = 4.3;

    let W = 0, H = 0, dpr = 1, fs = 200, x0 = 0, yb = 0, glyphs = [], hatch = null, scribbleY = 0, nameEnd = 0;

    const clamp = x => Math.max(0, Math.min(1, x));
    const ease = x => x * x * (3 - 2 * x);
    const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

    function layout() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // size the name so it spans ~78% of the screen
      const measure = s => {
        const w = WORDS.map((t, i) => { ctx.font = `${STYLES[i]} ${s}px ${FAM}`; return ctx.measureText(t).width; });
        return [w[0], w[1], s * 0.24];
      };
      fs = 240;
      let [a, b, gap] = measure(fs);
      fs *= Math.min(1, (W * 0.78) / (a + b + gap));
      fs = Math.min(fs, H * 0.34);
      [a, b, gap] = measure(fs);
      x0 = (W - (a + b + gap)) / 2; nameEnd = x0 + a + b + gap;
      yb = H / 2 + fs * 0.22; scribbleY = yb + fs * 0.3;

      // per-letter positions (prefix widths keep the kerning)
      glyphs = [];
      let startX = x0;
      WORDS.forEach((word, wi) => {
        ctx.font = `${STYLES[wi]} ${fs}px ${FAM}`;
        [...word].forEach((ch, i) => glyphs.push({ ch, wi, x: startX + ctx.measureText(word.slice(0, i)).width }));
        startX += (wi ? b : a) + gap;
      });
      glyphs.forEach((g, i) => { g.t0 = T_TRACE + i * T_STAGGER; });
      buildHatch();
    }

    // pencil hatching, masked to the letter shapes (built once, revealed progressively)
    function buildHatch() {
      hatch = document.createElement("canvas"); hatch.width = W * dpr; hatch.height = H * dpr;
      const h = hatch.getContext("2d"); h.setTransform(dpr, 0, 0, dpr, 0, 0);
      h.strokeStyle = PENCIL; h.lineWidth = Math.max(1, fs * 0.006); h.globalAlpha = 0.55;
      const step = Math.max(5, fs * 0.04);
      h.beginPath();
      for (let x = -H; x < W + H; x += step) { h.moveTo(x + (hash(x) - 0.5) * 1.5, H); h.lineTo(x + H * 0.7, 0); }   // main diagonal
      h.stroke();
      h.globalAlpha = 0.32; h.beginPath();
      for (let x = -H; x < W + H; x += step * 1.9) { h.moveTo(x, 0); h.lineTo(x + H * 0.55, H); }                    // cross hatch
      h.stroke();
      // mask: all letters drawn once on a separate canvas, then applied in one go (destination-in erases outside the shape)
      const mask = document.createElement("canvas"); mask.width = W * dpr; mask.height = H * dpr;
      const m = mask.getContext("2d"); m.setTransform(dpr, 0, 0, dpr, 0, 0); m.fillStyle = "#000";
      glyphs.forEach(g => { m.font = `${STYLES[g.wi]} ${fs}px ${FAM}`; m.fillText(g.ch, g.x, yb); });
      h.globalAlpha = 1; h.globalCompositeOperation = "destination-in"; h.setTransform(1, 0, 0, 1, 0, 0);
      h.drawImage(mask, 0, 0);
    }

    /* ----- drawing helpers ----- */
    const box = (t, [a, b]) => clamp((t - a) / (b - a));

    function drawGuides(t, boil) {
      const p = ease(clamp(t / T_GUIDES)), left = Math.max(14, x0 - fs * 0.45), right = Math.min(W - 14, nameEnd + fs * 0.45);   // keep the labels on screen
      const lines = [["ascender", yb - fs * 0.74], ["x-height", yb - fs * 0.48], ["baseline", yb], ["descender", yb + fs * 0.22]];
      ctx.save(); ctx.lineWidth = 0.9; ctx.strokeStyle = PENCIL; ctx.fillStyle = PENCIL;
      ctx.font = '10px "DM Mono", monospace'; ctx.textBaseline = "bottom";
      lines.forEach(([label, y], i) => {
        const jy = (hash(boil * 7 + i) - 0.5) * 1.2, end = left + (right - left) * clamp(p * 1.3 - i * 0.08);
        ctx.globalAlpha = i === 2 ? 0.42 : 0.24;
        ctx.setLineDash(i === 2 ? [] : [7, 6]);
        ctx.beginPath(); ctx.moveTo(left, y + jy); ctx.lineTo(end, y + jy); ctx.stroke();
        ctx.setLineDash([]); ctx.globalAlpha = 0.45 * p;
        ctx.fillText(label.toUpperCase(), left, y - 4);
      });
      // corner crosshair marks
      ctx.globalAlpha = 0.5 * p; ctx.lineWidth = 1;
      [[left, yb - fs * 0.74], [right, yb - fs * 0.74], [left, yb + fs * 0.22], [right, yb + fs * 0.22]].forEach(([x, y]) => {
        ctx.beginPath(); ctx.moveTo(x - 9, y); ctx.lineTo(x + 9, y); ctx.moveTo(x, y - 9); ctx.lineTo(x, y + 9); ctx.stroke();
      });
      ctx.restore();
    }

    function drawHatch(t, fillA) {
      const p = box(t, T_HATCH); if (p <= 0) return;
      const edge = -fs + (W + 2 * fs) * ease(p), slant = fs * 0.9;            // slanted sweeping edge
      ctx.save(); ctx.globalAlpha = 1 - 0.75 * fillA;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(edge + slant, 0); ctx.lineTo(edge - slant, H); ctx.lineTo(0, H); ctx.closePath(); ctx.clip();
      ctx.drawImage(hatch, 0, 0, W, H);
      ctx.restore();
    }

    function drawFill(fillA) {
      if (fillA <= 0) return;
      ctx.save(); ctx.globalAlpha = fillA;
      glyphs.forEach(g => { ctx.font = `${STYLES[g.wi]} ${fs}px ${FAM}`; ctx.fillStyle = COLORS[g.wi]; ctx.fillText(g.ch, g.x, yb); });
      ctx.restore();
    }

    function drawOutlines(t, boil, fillA) {
      ctx.save(); ctx.lineJoin = "round"; ctx.lineCap = "round";
      glyphs.forEach((g, i) => {
        const q = ease(clamp((t - g.t0) / T_LETTER)); if (q <= 0) return;
        ctx.font = `${STYLES[g.wi]} ${fs}px ${FAM}`;
        ctx.setLineDash([q * fs * 7, 100000]);                              // reveals the contour progressively
        for (let pass = 0; pass < 2; pass++) {                              // two slightly offset passes = hand-drawn doubled line
          const jx = (hash(boil * 3 + i * 5 + pass * 11) - 0.5) * fs * 0.012 * (pass + 1);
          const jy = (hash(boil * 5 + i * 3 + pass * 7) - 0.5) * fs * 0.012 * (pass + 1);
          ctx.globalAlpha = (pass ? 0.4 : 0.9) * (1 - 0.85 * fillA);
          ctx.strokeStyle = pass ? PENCIL : g.wi ? ACCENT : PENCIL;
          ctx.lineWidth = Math.max(1, fs * (pass ? 0.005 : 0.008));
          ctx.save(); ctx.translate(jx, jy); ctx.strokeText(g.ch, g.x, yb); ctx.restore();
        }
      });
      ctx.restore();
    }

    function drawScribble(t) {
      const p = box(t, T_SCRIBBLE); if (p <= 0) return;
      const len = nameEnd - x0, n = 14;
      ctx.save(); ctx.strokeStyle = ACCENT; ctx.lineWidth = Math.max(1.6, fs * 0.012); ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath(); ctx.moveTo(x0, scribbleY);
      for (let i = 1; i <= n; i++) {                                         // loose wavy underline
        const x = x0 + (len * i) / n, y = scribbleY + (i % 2 ? -1 : 1) * fs * 0.03 + (hash(i) - 0.5) * fs * 0.025;
        ctx.quadraticCurveTo(x - len / n / 2, y + (i % 2 ? -1 : 1) * fs * 0.02, x, y);
      }
      ctx.setLineDash([len * 1.4 * ease(p), 100000]); ctx.stroke();
      ctx.restore();
    }

    /* ----- run ----- */
    let t0 = null, closing = false, loaded = document.readyState === "complete";
    addEventListener("load", () => { loaded = true; });
    addEventListener("resize", () => { if (t0 !== null && innerWidth > 50 && innerHeight > 50) layout(); });

    Promise.race([
      Promise.all([document.fonts.load('300 200px "Fraunces"'), document.fonts.load('italic 300 200px "Fraunces"'), document.fonts.load('10px "DM Mono"')]),
      new Promise(res => setTimeout(res, 2500)),
    ]).catch(() => {}).then(function start() {
      if (innerWidth < 50 || innerHeight < 50) return setTimeout(start, 100);   // tab opened in the background: wait for a real size
      layout(); t0 = performance.now();
    });

    (function tick() {
      if (!document.body.contains(root)) { clearTimeout(safety); return; }
      requestAnimationFrame(tick);
      if (t0 === null) return;
      const t = (performance.now() - t0) / 1000, boil = Math.floor(t * 9);   // line "boils" ~9 times a second
      const fillA = ease(box(t, T_FILL));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      drawGuides(t, boil);
      drawHatch(t, fillA);
      drawFill(fillA);
      drawOutlines(t, boil, fillA);
      drawScribble(t);
      pctEl.textContent = Math.round(Math.min(t / T_END, loaded ? 1 : 0.99) * 100) + "%";
      if (!closing && t > T_END && loaded) { closing = true; open(false); }
    })();
  } catch (err) {
    console.warn("Loader skipped:", err);
    clearTimeout(safety);
    open(true);
  }
})();
