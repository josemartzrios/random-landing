# Comunicación e Infraestructura — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Centralizar constantes del sitio, corregir el dominio a `optimia.mx`, y crear la página de aviso de privacidad.

**Architecture:** Un archivo `src/config/site.ts` exporta las constantes globales (email, URL de Cal.com, URL base del sitio). Los componentes existentes importan de ahí. La página de aviso de privacidad es una nueva ruta Astro estática que usa el Layout existente.

**Tech Stack:** Astro, TypeScript, CSS variables existentes (global.css)

---

## Mapa de archivos

| Acción | Archivo | Responsabilidad |
|--------|---------|-----------------|
| Crear | `src/config/site.ts` | Constantes globales: email, calUrl, siteUrl |
| Modificar | `src/components/CtaFinal.astro` | Usa `SITE.calUrl` y `SITE.email` |
| Modificar | `src/components/Footer.astro` | Usa `SITE.email`; enlace correcto a `/aviso-de-privacidad` |
| Modificar | `src/layouts/Layout.astro` | Usa `SITE.url` en og:url y structured data |
| Crear | `src/pages/aviso-de-privacidad.astro` | Página estática con contenido LFPDPPP |
| Modificar | `docs/superpowers/specs/2026-05-13-aviso-de-privacidad-design.md` | Corregir dominio `.com` → `.mx` |

---

## Task 1: Crear `src/config/site.ts`

**Files:**
- Create: `src/config/site.ts`

- [ ] **Step 1: Crear el archivo de configuración**

```typescript
export const SITE = {
  url: "https://optimia.mx",
  email: "hola@optimia.mx",
  calUrl: "https://cal.com/optimia/diagnostico",
};
```

> Nota: Actualizar `calUrl` con el URL real una vez creada la cuenta en Cal.com.

- [ ] **Step 2: Verificar que TypeScript no reporta errores**

```bash
npx astro check
```

Expected: sin errores de tipo.

- [ ] **Step 3: Commit**

```bash
git add src/config/site.ts
git commit -m "feat: add centralized site config (email, calUrl, siteUrl)"
```

---

## Task 2: Actualizar `CtaFinal.astro`

**Files:**
- Modify: `src/components/CtaFinal.astro`

- [ ] **Step 1: Reemplazar el contenido del archivo**

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
    <a href={SITE.calUrl} class="btn btn-primary btn-lg" target="_blank" rel="noopener">
      Agendar diagnóstico gratuito →
    </a>
    <p class="text-small">
      O escríbenos: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
    </p>
  </div>
</section>
```

- [ ] **Step 2: Verificar build**

```bash
npx astro check
```

Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/CtaFinal.astro
git commit -m "refactor: use SITE config in CtaFinal"
```

---

## Task 3: Actualizar `Footer.astro`

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Reemplazar el contenido del archivo**

```astro
---
import { SITE } from '../config/site';
---

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <a href="/" class="nav-logo">
        <span class="logo-optim">Optim</span><span class="logo-ia">IA</span>
      </a>
      <p class="text-small">Optimización operativa con Inteligencia Artificial para PyMEs en LATAM.</p>
    </div>

    <div class="footer-links">
      <a href="#como-funciona">Cómo funciona</a>
      <a href="#servicios">Servicios</a>
      <a href="#seguridad">Seguridad</a>
      <a href="#caso">Caso de éxito</a>
      <a href="#contacto">Contacto</a>
    </div>

    <div class="footer-contact">
      <p>{SITE.email}</p>
      <p>Culiacán, Sinaloa, México</p>
    </div>
  </div>

  <div class="footer-bottom">
    <p class="text-small">© 2026 OptimIA</p>
    <p class="text-small"><a href="/aviso-de-privacidad">Aviso de privacidad</a></p>
  </div>
</footer>
```

- [ ] **Step 2: Verificar build**

```bash
npx astro check
```

Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "refactor: use SITE config in Footer, fix privacy notice link"
```

---

## Task 4: Actualizar `Layout.astro`

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Agregar import y reemplazar URLs hardcodeadas**

Cambiar el frontmatter y el head del archivo para usar `SITE.url`:

```astro
---
import '../styles/global.css';
import { SITE } from '../config/site';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'OptimIA — Optimizamos tu operación con IA',
  description = 'Consultoría de optimización operativa con Inteligencia Artificial para PyMEs en LATAM. Diagnóstico gratuito. Documentación, datos, atención al cliente. Datos seguros. Revisión humana.',
} = Astro.props;
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="generator" content={Astro.generator} />

    <!-- SEO -->
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:url" content={SITE.url} />
    <meta property="og:type" content="website" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Instrument+Sans:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <!-- Structured data -->
    <script type="application/ld+json" set:html={JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "OptimIA",
      "url": SITE.url,
      "description": "Consultoría de optimización operativa con IA para PyMEs en LATAM",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Culiacán",
        "addressRegion": "Sinaloa",
        "addressCountry": "MX"
      }
    })} />
  </head>
  <body>
    <slot />
    <script>
      import '../scripts/animations.js';
    </script>
  </body>
</html>
```

- [ ] **Step 2: Verificar build**

```bash
npx astro check
```

Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "refactor: use SITE.url in Layout og:url and structured data"
```

---

## Task 5: Crear `src/pages/aviso-de-privacidad.astro`

**Files:**
- Create: `src/pages/aviso-de-privacidad.astro`

- [ ] **Step 1: Crear la página**

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import { SITE } from '../config/site';
---

<Layout
  title="Aviso de Privacidad — OptimIA"
  description="Aviso de privacidad de OptimIA conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)."
>
  <Nav />
  <main class="privacy-page">
    <div class="privacy-container">
      <a href="/" class="privacy-back text-small">← Volver al inicio</a>

      <article class="privacy-content">
        <h1 class="privacy-title">Aviso de Privacidad</h1>
        <p class="privacy-meta text-small">Última actualización: 13 de mayo de 2026</p>

        <section class="privacy-section">
          <h2>1. Identidad del Responsable</h2>
          <p>
            El responsable del tratamiento de sus datos personales es <strong>OptimIA</strong>,
            con domicilio en Culiacán, Sinaloa, México. Para cualquier asunto relacionado con
            este aviso puede contactarnos en:
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </section>

        <section class="privacy-section">
          <h2>2. Datos personales que se recaban</h2>
          <p>
            Recabamos los datos que usted nos proporciona voluntariamente al escribirnos
            por correo electrónico o al agendar una sesión a través de Cal.com:
          </p>
          <ul>
            <li>Nombre</li>
            <li>Correo electrónico</li>
            <li>Nombre de empresa (opcional, vía Cal.com)</li>
            <li>Número de teléfono (opcional, vía Cal.com)</li>
          </ul>
          <p>No recabamos datos personales sensibles.</p>
        </section>

        <section class="privacy-section">
          <h2>3. Finalidades del tratamiento</h2>
          <p><strong>Primarias</strong> (necesarias para atender su solicitud):</p>
          <ul>
            <li>Responder su solicitud de contacto.</li>
            <li>Agendar y coordinar la sesión de diagnóstico gratuita.</li>
          </ul>
          <p><strong>Secundarias</strong> (opcionales):</p>
          <ul>
            <li>Enviarle información sobre los servicios y novedades de OptimIA.</li>
          </ul>
          <p>
            Puede oponerse a las finalidades secundarias en cualquier momento
            escribiéndonos a <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </section>

        <section class="privacy-section">
          <h2>4. Transferencias de datos</h2>
          <p>
            Sus datos son tratados por los siguientes encargados, exclusivamente bajo
            instrucciones de OptimIA y sin fines propios:
          </p>
          <ul>
            <li><strong>Cal.com</strong> (cal.com) — plataforma de agendamiento de sesiones.</li>
            <li><strong>Resend</strong> (resend.com) — plataforma de envío de correos electrónicos.</li>
          </ul>
          <p>No realizamos transferencias de datos a terceros con fines propios.</p>
        </section>

        <section class="privacy-section">
          <h2>5. Derechos ARCO</h2>
          <p>
            Usted tiene derecho a <strong>Acceder, Rectificar, Cancelar u Oponerse</strong>
            al tratamiento de sus datos personales. Para ejercer cualquiera de estos derechos,
            envíe un correo a <a href={`mailto:${SITE.email}`}>{SITE.email}</a> indicando:
          </p>
          <ul>
            <li>Su nombre completo.</li>
            <li>El derecho que desea ejercer y los datos a los que se refiere.</li>
          </ul>
          <p>Responderemos su solicitud en un plazo máximo de <strong>20 días hábiles</strong>.</p>
        </section>

        <section class="privacy-section">
          <h2>6. Cambios al aviso de privacidad</h2>
          <p>
            Cualquier modificación a este aviso se publicará en esta misma página.
            Le recomendamos revisarla periódicamente.
          </p>
        </section>
      </article>
    </div>
  </main>
  <Footer />
</Layout>

<style>
  .privacy-page {
    padding: 8rem 1.5rem 6rem;
    min-height: 100svh;
  }

  .privacy-container {
    max-width: 720px;
    margin: 0 auto;
  }

  .privacy-back {
    display: inline-block;
    color: var(--color-slate);
    text-decoration: none;
    margin-bottom: 2.5rem;
    transition: color 0.2s ease;
  }
  .privacy-back:hover { color: var(--color-navy); }

  .privacy-title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(1.75rem, 3.5vw, 2.5rem);
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--color-navy);
    margin-bottom: 0.5rem;
  }

  .privacy-meta {
    color: var(--color-muted);
    margin-bottom: 3rem;
  }

  .privacy-section {
    margin-bottom: 2.5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid var(--color-border);
  }
  .privacy-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  .privacy-section h2 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.125rem;
    color: var(--color-navy);
    margin-bottom: 1rem;
  }

  .privacy-section p {
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.7;
    color: var(--color-body-text);
    margin-bottom: 0.75rem;
  }
  .privacy-section p:last-child { margin-bottom: 0; }

  .privacy-section ul {
    margin: 0.75rem 0 0.75rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .privacy-section li {
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-body-text);
  }

  .privacy-section a {
    color: var(--color-coral);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .privacy-section a:hover { color: var(--color-navy); }
</style>
```

- [ ] **Step 2: Verificar que la ruta existe en el build**

```bash
npx astro build
```

Expected: build exitoso, `dist/aviso-de-privacidad/index.html` generado.

- [ ] **Step 3: Revisar visualmente en dev server**

```bash
npm run dev
```

Navegar a `http://localhost:4321/aviso-de-privacidad` y verificar:
- El texto del aviso es legible y bien formateado
- El enlace "← Volver al inicio" regresa a `/`
- El Nav y Footer se muestran correctamente
- El email aparece como enlace clickable

- [ ] **Step 4: Commit**

```bash
git add src/pages/aviso-de-privacidad.astro
git commit -m "feat: add aviso de privacidad page (LFPDPPP)"
```

---

## Task 6: Corregir dominio en el spec del aviso de privacidad

**Files:**
- Modify: `docs/superpowers/specs/2026-05-13-aviso-de-privacidad-design.md`

- [ ] **Step 1: Reemplazar todas las instancias de `optimia.com` por `optimia.mx`**

Buscar y reemplazar en el archivo:
- `hola@optimia.com` → `hola@optimia.mx`
- `hola@optimia.com` en la sección de Contexto → `hola@optimia.mx`

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/specs/2026-05-13-aviso-de-privacidad-design.md
git commit -m "docs: fix domain in privacy spec (optimia.com → optimia.mx)"
```

---

## Infraestructura (manual — sin código)

Estos pasos los realiza el operador en los paneles externos. No generan commits.

### Cloudflare Email Routing

- [ ] Ir a Cloudflare Dashboard → `optimia.mx` → **Email → Email Routing**
- [ ] Activar Email Routing (Cloudflare agrega MX y SPF automáticamente)
- [ ] Crear regla: `hola@optimia.mx` → `josemartzrios14@gmail.com`
- [ ] Verificar la dirección Gmail en el correo de confirmación de Cloudflare

### Cal.com

- [ ] Crear cuenta en [cal.com](https://cal.com) con `josemartzrios14@gmail.com`
- [ ] Crear event type: **Diagnóstico gratuito · 30 min**
- [ ] Conectar Google Calendar
- [ ] Copiar el URL del event type
- [ ] Actualizar `calUrl` en `src/config/site.ts` y hacer commit:

```bash
git add src/config/site.ts
git commit -m "chore: update Cal.com URL to production event"
```
