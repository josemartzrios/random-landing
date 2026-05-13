import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function splitWords(element) {
  const text = element.textContent ?? '';
  element.innerHTML = text
    .split(' ')
    .map(word => `<span class="word" style="display:inline-block">${word}&nbsp;</span>`)
    .join('');
  return element.querySelectorAll('.word');
}

function initNav() {
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: self => {
      document.getElementById('nav')?.classList.toggle('nav-solid', self.scroll() > 80);
    },
  });
}

function initHero() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  const words = splitWords(heroTitle);

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero-label', { y: -20, opacity: 0, duration: 0.5 })
    .from(words, { y: 60, opacity: 0, rotateX: -30, stagger: 0.07, duration: 0.5 })
    .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.5 }, '-=0.2')
    .from('.hero-visual .metric', {
      x: () => gsap.utils.random(-50, 50),
      y: () => gsap.utils.random(-30, 30),
      opacity: 0,
      scale: 0.75,
      stagger: 0.1,
      duration: 0.5,
    }, '-=0.3')
    .to('.hero-visual .metric', {
      x: 0, y: 0, scale: 1,
      stagger: 0.06,
      duration: 0.7,
      ease: 'power2.inOut',
    })
    .to('.progress-bar', {
      width: '94%',
      duration: 1.0,
      ease: 'power4.out',
    }, '-=0.5')
    .from('.hero-cta-group', { y: 30, opacity: 0, duration: 0.5 }, '-=0.4')
    .from('.hero-pillar', { y: 20, opacity: 0, stagger: 0.12, duration: 0.4 }, '-=0.2');
}

function initScrollReveals() {
  // Problem cards
  gsap.utils.toArray('.problem-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      y: 60,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.08,
      ease: 'power2.out',
    });
  });

  // Service cards
  gsap.utils.toArray('.servicio-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      y: 50,
      opacity: 0,
      duration: 0.55,
      delay: i * 0.08,
      ease: 'power2.out',
    });
  });

  // Timeline steps
  gsap.utils.toArray('.timeline-step').forEach((step, i) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      x: -40,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.05,
      ease: 'power2.out',
    });
  });

  // Section headers
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  });
}

function initTimeline() {
  gsap.to('#timeline-progress', {
    height: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: true,
    },
  });
}

function initSeguridad() {
  // Tag pop-in
  gsap.from('.seg-tag', {
    scrollTrigger: {
      trigger: '.seguridad-tags',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    scale: 0,
    opacity: 0,
    stagger: 0.08,
    duration: 0.4,
    ease: 'back.out(2)',
  });

  // Cards reveal
  gsap.utils.toArray('.seguridad-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
      y: 60,
      opacity: 0,
      scale: 0.95,
      duration: 0.7,
      delay: i * 0.15,
      ease: 'back.out(1.2)',
    });
  });
}

function initRevisionHumana() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.revision-flow',
      start: 'top 72%',
      toggleActions: 'play none none none',
    },
  });

  tl.from('.revision-step--ai', { x: -80, opacity: 0, duration: 0.5, ease: 'power2.out' })
    .from('.revision-connector:nth-of-type(1) .connector-arrow', {
      scaleX: 0, transformOrigin: 'left center', duration: 0.3,
    })
    .from('.revision-step--human', {
      y: 40, opacity: 0, scale: 0.9, duration: 0.6, ease: 'back.out(1.5)',
    })
    .from('.revision-connector:nth-of-type(2) .connector-arrow', {
      scaleX: 0, transformOrigin: 'left center', duration: 0.3,
    })
    .from('.revision-step--approved', {
      scale: 0.8, opacity: 0, duration: 0.5, ease: 'elastic.out(1, 0.6)',
    });

  gsap.from('.trust-item', {
    scrollTrigger: {
      trigger: '.revision-trust',
      start: 'top 88%',
      toggleActions: 'play none none none',
    },
    y: 20,
    opacity: 0,
    stagger: 0.15,
    duration: 0.4,
    ease: 'power2.out',
  });
}

function initCasoSyquex() {
  let hasRun = false;

  ScrollTrigger.create({
    trigger: '.caso-grid',
    start: 'top 72%',
    onEnter: () => {
      if (hasRun) return;
      hasRun = true;

      const beforeEl = document.getElementById('counter-before');
      const afterEl  = document.getElementById('counter-after');

      if (beforeEl) {
        gsap.to(beforeEl, {
          innerHTML: 20,
          duration: 1.8,
          snap: { innerHTML: 1 },
          ease: 'power2.inOut',
        });
      }
      if (afterEl) {
        gsap.to(afterEl, {
          innerHTML: 45,
          duration: 1.8,
          snap: { innerHTML: 1 },
          ease: 'power2.inOut',
        });
      }
    },
  });

  gsap.from('.caso-pillar', {
    scrollTrigger: {
      trigger: '.caso-pillars',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    y: 30,
    opacity: 0,
    stagger: 0.15,
    duration: 0.5,
    ease: 'power2.out',
  });

  gsap.from('.caso-badge', {
    scrollTrigger: {
      trigger: '.caso-details',
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
    scale: 0,
    opacity: 0,
    stagger: 0.08,
    duration: 0.35,
    ease: 'back.out(2)',
  });
}

function initCtaSection() {
  gsap.from('.cta-card', {
    scrollTrigger: {
      trigger: '.section-cta',
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
    y: 50,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
  });
}

// Boot after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

function boot() {
  initNav();
  initHero();
  initScrollReveals();
  initTimeline();
  initSeguridad();
  initRevisionHumana();
  initCasoSyquex();
  initCtaSection();
}
