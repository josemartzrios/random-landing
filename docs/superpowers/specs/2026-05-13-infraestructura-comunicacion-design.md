# Infraestructura de Comunicación — OptimIA

**Fecha:** 2026-05-13  
**Estado:** Aprobado

---

## Contexto

OptimIA tiene el dominio `optimia.mx` registrado en Cloudflare. La landing page actual usa `hola@optimia.com` (incorrecto) y un URL placeholder de Cal.com. Este spec cubre la configuración de infraestructura gratuita y los cambios de código necesarios para que el dominio de correo y el CTA de agendamiento funcionen correctamente.

---

## Alcance

### Infraestructura (sin código)
1. Activar Cloudflare Email Routing para `hola@optimia.mx` → Gmail personal
2. Crear cuenta Cal.com free tier y configurar event type de diagnóstico

### Código
1. Crear `src/config/site.ts` con constantes centralizadas
2. Actualizar componentes que tienen email y URL de Cal.com hardcodeados
3. Corregir el spec del aviso de privacidad (`optimia.com` → `optimia.mx`)

---

## Guía de infraestructura

### Cloudflare Email Routing

1. Cloudflare Dashboard → `optimia.mx` → **Email → Email Routing**
2. Activar Email Routing (Cloudflare agrega registros MX y SPF automáticamente)
3. Crear regla de enrutamiento:
   - **De:** `hola@optimia.mx`
   - **A:** Gmail personal (`josemartzrios14@gmail.com`)
4. Verificar la dirección Gmail (Cloudflare envía correo de confirmación)

> Una vez activo, cualquier correo enviado a `hola@optimia.mx` llega a la bandeja de Gmail personal.

### Cal.com free tier

1. Crear cuenta en cal.com usando `josemartzrios14@gmail.com` (mismo Gmail que Cloudflare Email Routing)
2. Crear event type:
   - **Nombre:** Diagnóstico gratuito
   - **Duración:** 30 minutos
3. Conectar Google Calendar para disponibilidad y creación automática de eventos
4. Copiar el URL del event type (ej. `https://cal.com/optimia/diagnostico`)
5. Actualizar `SITE.calUrl` en `src/config/site.ts` con el URL real

> Usar el mismo Gmail para Cal.com y Cloudflare Email Routing concentra notificaciones de agenda y correos directos en una sola bandeja.

---

## Diseño técnico

### `src/config/site.ts` (archivo nuevo)

```ts
export const SITE = {
  email: "hola@optimia.mx",
  calUrl: "https://cal.com/optimia/diagnostico", // actualizar con URL real tras crear cuenta
};
```

### Componentes a actualizar

| Archivo | Campo | Cambio |
|---------|-------|--------|
| `src/components/CtaFinal.astro` | `href` botón CTA | `SITE.calUrl` |
| `src/components/CtaFinal.astro` | enlace email | `SITE.email` |
| `src/components/Footer.astro` | email visible | `SITE.email` |
| `src/components/Footer.astro` | enlace aviso privacidad | `href="/aviso-de-privacidad"` |
| `src/pages/aviso-de-privacidad.astro` | email Responsable y ARCO | `SITE.email` |

### Aviso de privacidad spec

Reemplazar todas las instancias de `hola@optimia.com` → `hola@optimia.mx` en:
- `docs/superpowers/specs/2026-05-13-aviso-de-privacidad-design.md`

---

## Fuera de alcance
- Configurar Resend (no es necesario para recibir/reenviar correos)
- Variables de entorno para `calUrl` (URL pública, no sensible, misma en dev y prod)
- Envío de confirmaciones automáticas desde hola@optimia.mx (no hay formulario propio)
