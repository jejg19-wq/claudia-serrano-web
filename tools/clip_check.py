"""Detecta letras recortadas o que no caben: texto que se sale de su caja, que queda cortado por un contenedor
con overflow oculto o que se sale de la pantalla. Todas las páginas, varios tamaños, español e inglés."""
import sys
from playwright.sync_api import sync_playwright
ORIGIN = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8765"
PAGES = ["index.html", "agendar.html", "academia.html", "tienda.html", "portal/index.html"]
JS = r"""() => {
  const out = [], vw = document.documentElement.clientWidth;
  const clipAncestors = el => { const list = []; let p = el.parentElement; while (p && p !== document.body) { const cs = getComputedStyle(p);
      if (/(hidden|clip|auto|scroll)/.test(cs.overflowX + cs.overflowY) && !p.classList.contains('ribbon') && !p.classList.contains('ribbon__track')) list.push(p); p = p.parentElement; } return list; };
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) {
    const t = n.nodeValue.trim(); if (!t) continue;
    const el = n.parentElement; if (!el || el.closest('.skip,script,style,noscript,[hidden],.ribbon,.menu:not([open]) .menu__panel,.reel__ring,dialog:not([open]),.drawer:not(.is-open)')) continue;
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue;
    const r = document.createRange(); r.selectNodeContents(n); const rects = [...r.getClientRects()].filter(b => b.width > 1);
    if (!rects.length) continue;
    const box = rects.reduce((a, b) => ({ left: Math.min(a.left, b.left), right: Math.max(a.right, b.right), top: Math.min(a.top, b.top), bottom: Math.max(a.bottom, b.bottom) }), { left: 1e9, right: -1e9, top: 1e9, bottom: -1e9 });
    let why = '';
    if (box.right > vw + 1 || box.left < -1) why = 'fuera de pantalla';
    for (const a of clipAncestors(el)) { const ar = a.getBoundingClientRect();
      const tol = 1.5; if (box.left < ar.left - tol || box.right > ar.right + tol || box.top < ar.top - tol || box.bottom > ar.bottom + tol) { why = 'cortado por ' + (a.className || a.tagName).toString().split(' ')[0]; break; } }
    if (!why && el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflowX !== 'visible' && cs.textOverflow !== 'ellipsis') why = 'no cabe';
    if (why) out.push(why + ': «' + t.slice(0, 40) + '»');
  }
  return [...new Set(out)].slice(0, 12);
}"""
with sync_playwright() as p:
    setups = [("iPhone SE", p.webkit, p.devices["iPhone SE"]), ("iPhone 15", p.webkit, p.devices["iPhone 15"]), ("Pixel 7", p.chromium, p.devices["Pixel 7"]), ("PC 1440", p.chromium, {"viewport": {"width": 1440, "height": 900}})]
    total = 0
    for loc in ("es-US", "en-US"):
        for label, eng, opts in setups:
            b = eng.launch(); ctx = b.new_context(reduced_motion="reduce", locale=loc, **opts); pg = ctx.new_page()
            for name in PAGES:
                pg.goto(f"{ORIGIN}/{name}", wait_until="load"); pg.wait_for_timeout(900)
                if name == "portal/index.html":
                    found = pg.evaluate(JS); pg.click("#demo"); pg.wait_for_timeout(500)
                    for tab in ("clases", "sesiones", "citas", "certificado", "guias"):
                        pg.click(f"[data-tab='{tab}']"); pg.wait_for_timeout(150); found += pg.evaluate(JS)
                    pg.evaluate("localStorage.clear()")
                else:
                    found = pg.evaluate(JS)
                found = sorted(set(found))
                total += len(found)
                if found: print(f"{loc[:2]} · {label} · {name}: " + " | ".join(found))
            b.close()
    print("TOTAL problemas:", total)
