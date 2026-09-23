import sys
from playwright.sync_api import sync_playwright
ORIGIN = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8765"
with sync_playwright() as p:
    for label, eng, opts in (("iPhone", p.webkit, p.devices["iPhone 15"]), ("PC", p.chromium, {"viewport": {"width": 1440, "height": 900}})):
        b = eng.launch(); pg = b.new_context(locale="es-US", **opts).new_page()
        res = []
        for name in ("index.html", "agendar.html", "academia.html", "tienda.html", "portal/index.html"):
            pg.goto(f"{ORIGIN}/{name}", wait_until="load"); pg.wait_for_timeout(700)
            before = pg.evaluate("document.querySelector('h1, h2').textContent.trim().slice(0,30)")
            btn = pg.locator("[data-lang-toggle]:visible").first
            with pg.expect_navigation(): btn.click()
            pg.wait_for_timeout(900)
            after = pg.evaluate("({lang: document.documentElement.lang, h: document.querySelector('h1, h2').textContent.trim().slice(0,30), btn: document.querySelector('[data-lang-toggle]').textContent})")
            res.append(f"{name}: «{before}» → «{after['h']}» (lang={after['lang']}, botón={after['btn']})")
            with pg.expect_navigation(): pg.locator("[data-lang-toggle]:visible").first.click()   # volver a español
            pg.wait_for_timeout(500)
        print(label); print("  " + "\n  ".join(res))
        b.close()
