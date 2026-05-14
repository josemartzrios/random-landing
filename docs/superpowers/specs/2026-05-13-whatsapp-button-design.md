# WhatsApp Button Design

**Date:** 2026-05-13
**Status:** Approved

## Summary

Add a visible green WhatsApp button in two places: a floating fixed button (always on screen) and a secondary button inside the CTA final section.

## Requirements

- Phone number: `+52 667 699 8993` → `https://wa.me/526676998993`
- Color: `#25D366` (official WhatsApp green), hover `#1ebe57`
- Icon: official WhatsApp SVG (inline, no external dependency)
- Mobile-first styles

## Components & Files

### New: `src/components/WhatsappFloat.astro`
Fixed floating button, bottom-right corner, `z-index: 300`.

- **Mobile (default):** circle with WhatsApp icon only, `56px × 56px`
- **Desktop (`≥ 481px`):** pill shape, icon + "Escríbenos por WhatsApp"
- Green drop shadow to stay visible over any background section

### Modified: `src/components/CtaFinal.astro`
Add a `btn btn-whatsapp` button below the existing coral CTA button.
- Icon + "Escríbenos por WhatsApp"
- Same `btn-lg` sizing as primary button

### Modified: `src/styles/global.css`
New classes:
- `.btn-whatsapp` — green button variant, follows same `.btn` base
- `.wa-float` — fixed positioning wrapper
- `.wa-float-inner` — flex row (icon + text), responsive visibility

### Modified: `src/pages/index.astro`
Import and render `<WhatsappFloat />` once, outside any section.

## CSS Strategy (mobile-first)

```
.wa-float-text { display: none; }          /* hidden on mobile */
@media (min-width: 481px) {
  .wa-float { border-radius: 999px; ... }  /* pill on desktop */
  .wa-float-text { display: inline; }      /* text visible on desktop */
}
```

## Non-goals

- No animation or pulse effect
- No pre-filled message text in the WhatsApp URL
- No hiding the button on scroll
