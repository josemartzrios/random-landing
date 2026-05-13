# Aviso de Privacidad — OptimIA

**Fecha:** 2026-05-13  
**Estado:** Aprobado

---

## Contexto

OptimIA es una consultoría de optimización operativa con IA para PyMEs en LATAM, con sede en Culiacán, Sinaloa, México. La landing page actualmente no tiene formularios propios; la única captación de datos ocurre cuando un usuario escribe voluntariamente a hola@optimia.com. Resend se usa como plataforma de envío de correos transaccionales/respuestas.

La empresa no está formalmente constituida, por lo que el responsable se identifica como "OptimIA".

---

## Alcance

- **Página nueva:** `src/pages/aviso-de-privacidad.astro`
- **Actualización:** `src/components/Footer.astro` — cambiar `href="#"` → `href="/aviso-de-privacidad"`
- **Marco legal:** LFPDPPP (Ley Federal de Protección de Datos Personales en Posesión de los Particulares)
- **Sin formularios propios, sin analytics, sin cookies de rastreo**

---

## Contenido del aviso

### 1. Identidad del Responsable
- **Nombre:** OptimIA
- **Correo:** hola@optimia.com
- **Domicilio:** Culiacán, Sinaloa, México

### 2. Datos personales que se recaban
Solo los que el usuario proporciona voluntariamente al escribir a hola@optimia.com:
- Nombre
- Correo electrónico

No se recaban datos sensibles.

### 3. Finalidades del tratamiento
**Primarias (necesarias para atender tu solicitud):**
- Responder la solicitud de contacto
- Agendar y coordinar la sesión de diagnóstico gratuita

**Secundarias (opcionales):**
- Enviar información sobre servicios y novedades de OptimIA

El titular puede oponerse a las finalidades secundarias en cualquier momento escribiendo a hola@optimia.com.

### 4. Transferencias de datos
Los datos son tratados por **Resend** (resend.com) exclusivamente como encargado del envío de correos electrónicos. Resend actúa bajo instrucciones de OptimIA y no es responsable independiente de los datos. No se realizan transferencias a terceros con fines propios.

### 5. Derechos ARCO
El titular puede ejercer sus derechos de **Acceso, Rectificación, Cancelación y Oposición** enviando un correo a hola@optimia.com con:
- Nombre completo
- Descripción del derecho que desea ejercer

OptimIA responderá en un plazo máximo de **20 días hábiles**.

### 6. Cambios al aviso
Cualquier modificación se publicará en esta misma página. Se recomienda revisarla periódicamente.

### 7. Vigencia
Última actualización: **13 de mayo de 2026**

---

## Diseño técnico

### Archivo: `src/pages/aviso-de-privacidad.astro`
- Extiende `Layout.astro` existente
- Una sección `<article>` con clase prose, usando variables CSS del sitio (`--font-body`, `--color-navy`, `--color-slate`, etc.)
- Sin JavaScript ni animaciones GSAP — página estática
- Breadcrumb mínimo: enlace "← Volver al inicio" al inicio de la página

### Estilo
- Ancho máximo: `720px` centrado (lectura cómoda)
- Tipografía: `--font-body` para el cuerpo, `--font-display` para el `<h1>`
- Color de encabezados de sección: `--color-navy`
- Sin componentes nuevos — CSS inline o clase utilitaria en `global.css`

### Footer
- `src/components/Footer.astro`: cambiar `href="#"` → `href="/aviso-de-privacidad"`

---

## Fuera de alcance (por ahora)
- Cláusula GDPR (no hay audiencia UE identificada)
- Banner de cookies (no hay cookies de rastreo)
- Formulario de ejercicio de derechos ARCO embebido
- Mención a Cal.com (el enlace es placeholder, se actualizará cuando se active)
