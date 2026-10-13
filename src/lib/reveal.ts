// Scroll-reveal animations.
// Usage:
//   <div data-reveal>                         → fades in moving up (default)
//   <div data-reveal="left">                  → also "right", "fade", "zoom"
//   <ul data-reveal-stagger>                  → when the list first enters the screen, its
//                                               [data-reveal] children appear one after another
//   <ul data-reveal-stagger data-reveal-items> → same, for every direct child (no attribute needed
//                                               on each one; used by the carousels)
// A stagger group is watched as a whole, so items scrolled out of a carousel still animate
// together with the visible ones the first time the section is reached.
// The hidden/visible styles live in src/styles/global.css.

const STAGGER_STEP_MS = 120;
const STAGGER_MAX_MS = 600;

const itemsOf = (group: Element): HTMLElement[] =>
  group.hasAttribute('data-reveal-items')
    ? (Array.from(group.children) as HTMLElement[])
    : Array.from(group.querySelectorAll<HTMLElement>(':scope > [data-reveal], :scope > * > [data-reveal]'));

export function initReveal() {
  const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal-stagger]'));
  const groupedItems = new Set<HTMLElement>();

  groups.forEach((group) => {
    itemsOf(group).forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${Math.min(i * STAGGER_STEP_MS, STAGGER_MAX_MS)}ms`);
      groupedItems.add(el);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        const toReveal = target.hasAttribute('data-reveal-stagger') ? itemsOf(target) : [target];
        toReveal.forEach((el) => el.classList.add('is-revealed'));
        observer.unobserve(target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  );

  groups.forEach((group) => observer.observe(group));
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (!groupedItems.has(el)) observer.observe(el);
  });
}
