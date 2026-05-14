# WhatsApp Button Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a floating WhatsApp button (circle on mobile, pill on desktop) and a green WhatsApp button in the CTA section.

**Architecture:** New `WhatsappFloat.astro` component holds the fixed button. CSS classes `btn-whatsapp`, `wa-float`, and `cta-actions` are added to `global.css` mobile-first. `CtaFinal.astro` gets a second button and a `cta-actions` wrapper. `index.astro` renders `<WhatsappFloat />` once outside `<main>`.

**Tech Stack:** Astro, vanilla CSS (mobile-first), inline SVG.

> **Note on testing:** This project has no automated test setup. Testing steps are manual browser checks — run `npm run dev` and verify in the browser.

---

## File Map

| Action | File |
|--------|------|
| Modify | `src/styles/global.css` |
| Create | `src/components/WhatsappFloat.astro` |
| Modify | `src/components/CtaFinal.astro` |
| Modify | `src/pages/index.astro` |

---

### Task 1: Add CSS classes to global.css

**Files:**
- Modify: `src/styles/global.css` (append after the `/* ─── Footer ─── */` block, before `/* ─── Decorative ─── */`)

- [ ] **Step 1: Add the WhatsApp CSS block**

Open `src/styles/global.css` and append the following block after the `/* ─── Footer ─── */` section and before `/* ─── Decorative background elements ─── */`:

```css
/* ─── WhatsApp ──────────────────────────────────────────────────────── */
.btn-whatsapp {
  background: #25D366;
  color: #ffffff;
  box-shadow: 0 2px 12px rgba(37, 211, 102, 0.3);
}
.btn-whatsapp:hover {
  background: #1ebe57;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  transform: translateY(-1px);
}

.cta-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
  margin-bottom: 0;
}

/* Floating button — mobile first: circle */
.wa-float {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 300;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #25D366;
  color: #ffffff;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.45);
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}
.wa-float:hover {
  background: #1ebe57;
  box-shadow: 0 6px 28px rgba(37, 211, 102, 0.55);
  transform: translateY(-2px);
}

.wa-float-text { display: none; }

/* Desktop: expand to pill with text */
@media (min-width: 481px) {
  .wa-float {
    width: auto;
    height: auto;
    border-radius: 999px;
    padding: 0.75rem 1.25rem;
    gap: 0.5rem;
  }
  .wa-float-text {
    display: inline;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 0.9375rem;
    white-space: nowrap;
  }
}
```

- [ ] **Step 2: Verify dev server has no CSS errors**

Run: `npm run dev`
Expected: server starts without errors, no CSS parse warnings in the terminal.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "style: add WhatsApp button and floating pill CSS classes"
```

---

### Task 2: Create WhatsappFloat.astro

**Files:**
- Create: `src/components/WhatsappFloat.astro`

- [ ] **Step 1: Create the file with this exact content**

```astro
---
import { SITE } from '../config/site';
---

<a
  href={SITE.whatsappUrl}
  class="wa-float"
  target="_blank"
  rel="noopener"
  aria-label="Escríbenos por WhatsApp"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  <span class="wa-float-text">Escríbenos por WhatsApp</span>
</a>
```

- [ ] **Step 2: Verify the component compiles**

Run: `npm run dev` (if not already running)
Expected: no Astro compilation errors in terminal.

- [ ] **Step 3: Commit**

```bash
git add src/components/WhatsappFloat.astro
git commit -m "feat: add WhatsappFloat component"
```

---

### Task 3: Update CtaFinal.astro

**Files:**
- Modify: `src/components/CtaFinal.astro`

Replace the entire file content with:

- [ ] **Step 1: Rewrite CtaFinal.astro**

```astro
---
import { SITE } from '../config/site';
---

<section class="section-cta" id="contacto">
  <div class="cta-card">
    <h2 class="text-h2">¿Listo para optimizar tu operación?</h2>
    <p class="text-body">
      Agenda una sesión de diagnóstico gratuita de 30 minutos.
      Sin compromiso. Te decimos exactamente dónde estás perdiendo tiempo y dinero.
    </p>
    <div class="cta-actions">
      <a href={SITE.calUrl} class="btn btn-primary btn-lg" target="_blank" rel="noopener">
        Agendar diagnóstico gratuito →
      </a>
      <a href={SITE.whatsappUrl} class="btn btn-whatsapp btn-lg" target="_blank" rel="noopener">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Escríbenos por WhatsApp
      </a>
    </div>
    <p class="text-small">
      O por email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
    </p>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:4321/#contacto`.
Expected:
- Two stacked buttons: coral "Agendar diagnóstico gratuito →" and green "Escríbenos por WhatsApp" with WhatsApp icon
- Email link below as small text
- Both buttons full-width on mobile (≤ 480px)

- [ ] **Step 3: Commit**

```bash
git add src/components/CtaFinal.astro
git commit -m "feat: add WhatsApp button to CTA section"
```

---

### Task 4: Register WhatsappFloat in index.astro

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add import and render WhatsappFloat**

Replace the entire file content with:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Problema from '../components/Problema.astro';
import Metodo from '../components/Metodo.astro';
import Servicios from '../components/Servicios.astro';
import Seguridad from '../components/Seguridad.astro';
import RevisionHumana from '../components/RevisionHumana.astro';
import CasoSyquex from '../components/CasoSyquex.astro';
import CtaFinal from '../components/CtaFinal.astro';
import Footer from '../components/Footer.astro';
import WhatsappFloat from '../components/WhatsappFloat.astro';
---

<Layout>
  <Nav />
  <main>
    <Hero />
    <Problema />
    <Metodo />
    <Servicios />
    <Seguridad />
    <RevisionHumana />
    <CasoSyquex />
    <CtaFinal />
  </main>
  <Footer />
  <WhatsappFloat />
</Layout>
```

- [ ] **Step 2: Verify floating button in browser**

Navigate to `http://localhost:4321/` and scroll through the page.
Expected:
- **Mobile (≤ 480px):** green circle icon fixed bottom-right, stays visible while scrolling
- **Desktop (≥ 481px):** green pill "Escríbenos por WhatsApp" fixed bottom-right, stays visible while scrolling
- Clicking either button opens `https://wa.me/526676998993` in a new tab

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: render WhatsappFloat on all pages"
```
