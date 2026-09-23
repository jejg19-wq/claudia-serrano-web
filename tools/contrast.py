"""Busca textos con poco contraste real (color del texto vs. fondo efectivo) en todas las páginas."""
from playwright.sync_api import sync_playwright
JS = r"""() => {
  const rgb = c => c.match(/[\d.]+/g).map(Number);
  const lumRGB = ([r,g,b]) => { const f = v => { v/=255; return v<=.03928? v/12.92 : Math.pow((v+.055)/1.055, 2.4); }; return .2126*f(r)+.7152*f(g)+.0722*f(b); };
  const bgOf = el => { while (el) { const cs = getComputedStyle(el); const m = cs.backgroundColor.match(/[\d.]+/g); if (m && (m.length < 4 || +m[3] > .5)) return cs.backgroundColor; if (cs.backgroundImage !== 'none' || el.tagName === 'IMG') return null; el = el.parentElement; } return 'rgb(245,245,245)'; };
  const out = [];
  document.querySelectorAll('p, h1, h2, h3, li, span, a, b').forEach(e => {
    if (!e.childNodes.length || ![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) return;
    const r = e.getBoundingClientRect(); if (!r.width) return;
    const bg = bgOf(e); if (!bg) return;
    const cs = getComputedStyle(e); const f = rgb(cs.color), B = rgb(bg); const a = f.length > 3 ? f[3] : 1;
    const mix = [0,1,2].map(i => f[i]*a + B[i]*(1-a)); const L1 = lumRGB(mix), L2 = lumRGB(B);
    const ratio = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
    const big = parseFloat(cs.fontSize) >= 24;
    if (ratio < (big ? 3 : 4.5)) out.push(e.textContent.trim().slice(0, 40) + ' → ' + ratio.toFixed(2));
  });
  return [...new Set(out)].slice(0, 12);
}"""
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_context(reduced_motion="reduce", viewport={"width": 1440, "height": 900}).new_page()
    for name in ["index.html", "agendar.html", "academia.html", "tienda.html", "portal/index.html"]:
        pg.goto(f"http://localhost:8765/{name}", wait_until="load"); pg.wait_for_timeout(800)
        print(name, pg.evaluate(JS) or "ok")
    b.close()
