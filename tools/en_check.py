"""Modo inglés: lista textos visibles que siguen en español en cada página (incluido el portal por dentro)."""
import re
from playwright.sync_api import sync_playwright
SP = re.compile(r"[áéíóúñ¿¡]|\b(de|del|la|el|los|las|tu|tus|mi|mis|y|para|con|una|un|que|en|clases?|cita|citas|reserva|horas?|desde|sesiones?|lección)\b", re.I)
OK = {"Claudia Serrano", "San Antonio, TX", "Makeup Studio & Academy", "Makeup Class 1:1", "Bride Makeup & Hair", "Full Glam Signature Look", "Hollywood Waves", "quinceañeras", "Quinceañera"}
JS = """() => { const out = []; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) { const p = n.parentElement; if (!p || ['SCRIPT','STYLE','NOSCRIPT'].includes(p.tagName)) continue;
    const r = p.getBoundingClientRect(); const cs = getComputedStyle(p); if (!r.width || cs.visibility === 'hidden' || p.closest('[hidden]')) continue;
    const k = n.nodeValue.replace(/\s+/g, ' ').trim(); if (k) out.push(k); } return [...new Set(out)]; }"""
with sync_playwright() as p:
    b = p.chromium.launch(); ctx = b.new_context(locale="en-US", viewport={"width": 1440, "height": 900}); pg = ctx.new_page()
    for name, after in (("index.html", None), ("agendar.html", "flow"), ("academia.html", None), ("tienda.html", None), ("portal/index.html", "demo")):
        pg.goto(f"http://localhost:8765/{name}", wait_until="load"); pg.wait_for_timeout(1500)
        texts = pg.evaluate(JS)
        if after == "flow":
            pg.click(".opt"); pg.click("[data-panel='1'] [data-next]"); pg.wait_for_timeout(300); pg.click(".day:not([disabled])"); pg.wait_for_timeout(200)
            texts += pg.evaluate(JS)
        if after == "demo":
            pg.click("#demo"); pg.wait_for_timeout(800)
            for tab in ("clases", "sesiones", "citas", "certificado", "guias"):
                pg.click(f"[data-tab='{tab}']"); pg.wait_for_timeout(200)
                if tab == "sesiones": pg.click("#s-days .chip"); pg.wait_for_timeout(100)
                texts += pg.evaluate(JS)
        left = sorted({t for t in texts if SP.search(t) and t not in OK and not any(t == o for o in OK)})
        print(f"== {name} ({pg.evaluate('document.documentElement.lang')}): {len(left)} en español")
        for t in left: print("   ", t[:110])
    b.close()
