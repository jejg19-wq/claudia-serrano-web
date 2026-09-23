"""Recorridos completos: reservar una cita → verla en el portal; inscribirse en la academia; carrito; portal demo con video."""
import sys, os
from playwright.sync_api import sync_playwright
ORIGIN = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8765"
OUT = os.path.join(os.path.dirname(__file__), "capturas"); os.makedirs(OUT, exist_ok=True)
def run(label, engine, opts):
    b = engine.launch(); ctx = b.new_context(reduced_motion="no-preference", **opts); pg = ctx.new_page()
    errs = []; pg.on("pageerror", lambda e: errs.append(str(e)[:160]))
    r = {}
    # 1) Agenda
    pg.goto(f"{ORIGIN}/agendar.html?s=fullglam", wait_until="load"); pg.wait_for_timeout(1200)
    r["servicio preseleccionado"] = pg.evaluate("document.querySelector('.opt.is-on') ? document.querySelector('.opt.is-on').dataset.id : null")
    pg.click("[data-panel='1'] [data-next]"); pg.wait_for_timeout(700)
    pg.click(".day:not([disabled])"); pg.wait_for_timeout(300)
    pg.click(".slot:not([disabled])"); pg.wait_for_timeout(300)
    pg.click("[data-panel='2'] [data-next]"); pg.wait_for_timeout(700)
    pg.fill("#f-name", "Ana Prueba"); pg.fill("#f-phone", "2105551234")
    pg.click("#form button[type=submit]"); pg.wait_for_timeout(700)
    r["total en pago"] = pg.inner_text("#pay-total")
    pg.click("#pay"); pg.wait_for_timeout(2200)
    r["confirmación visible"] = pg.is_visible("[data-panel='5']")
    pg.screenshot(path=os.path.join(OUT, f"flow-{label}-1-confirmada.jpg"), type="jpeg", quality=70)
    # 2) Portal: entra directo y muestra la cita
    pg.click("text=Ver en mi portal"); pg.wait_for_timeout(2500)
    r["portal abierto"] = pg.is_visible("#app")
    r["citas en portal"] = pg.evaluate("document.querySelectorAll('#bookings .card').length")
    pg.screenshot(path=os.path.join(OUT, f"flow-{label}-2-portal-citas.jpg"), type="jpeg", quality=70)
    pg.click("[data-tab='clases']"); pg.wait_for_timeout(800)
    pg.click(".lesson[data-i='2']"); pg.wait_for_timeout(2500)
    r["video"] = pg.evaluate("(() => { const v = document.getElementById('player'); return { src: v.currentSrc.split('/').pop(), estado: v.readyState, error: v.error ? v.error.code : null }; })()")
    pg.click("#mark"); pg.wait_for_timeout(400)
    r["progreso"] = pg.inner_text("#progress-text")
    pg.evaluate("scrollTo(0,0)"); pg.wait_for_timeout(300)
    pg.screenshot(path=os.path.join(OUT, f"flow-{label}-3-portal-clases.jpg"), type="jpeg", quality=70)
    pg.click("[data-tab='sesiones']"); pg.wait_for_timeout(600)
    pg.click("#s-days .chip"); pg.click("#s-slots .slot"); pg.click("#s-book"); pg.wait_for_timeout(500)
    r["sesiones 1:1"] = pg.evaluate("document.querySelectorAll('#s-list .session').length")
    # 3) Tienda y carrito
    pg.goto(f"{ORIGIN}/tienda.html", wait_until="load"); pg.wait_for_timeout(1500)
    r["productos"] = pg.evaluate("document.querySelectorAll('#grid .pcard').length")
    pg.click("#grid .pcard__add"); pg.wait_for_timeout(300); pg.click("#grid .pcard:nth-child(3) .pcard__add"); pg.wait_for_timeout(300)
    pg.click("[data-filter='Ojos']"); pg.wait_for_timeout(700)
    r["filtro ojos"] = pg.evaluate("document.querySelectorAll('#grid .pcard:not([hidden])').length")
    pg.click(".header [data-cart-open]"); pg.wait_for_timeout(900)
    r["carrito"] = pg.inner_text("#cart-total")
    pg.screenshot(path=os.path.join(OUT, f"flow-{label}-4-carrito.jpg"), type="jpeg", quality=70)
    # 4) Academia: inscripción
    ctx.clear_cookies()
    pg.goto(f"{ORIGIN}/academia.html", wait_until="load"); pg.wait_for_timeout(1500)
    pg.click("[data-enroll='p3']"); pg.wait_for_timeout(500)
    pg.fill("#e-name", "Luisa Alumna"); pg.fill("#e-phone", "2105559876"); pg.click("#enroll-form [type=submit]"); pg.wait_for_timeout(3500)
    r["tras inscribirse"] = pg.url.split('/')[-1]
    r["paquete en portal"] = pg.inner_text("#pkg-label") if pg.is_visible("#pkg-label") else None
    print(label, r, "errores:", errs or "ninguno")
    b.close()
with sync_playwright() as p:
    run("iphone", p.webkit, dict(**p.devices["iPhone 15"]))
    run("pc", p.chromium, dict(viewport={"width": 1440, "height": 900}))
