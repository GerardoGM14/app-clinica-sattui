// Small animation helpers shared by interactive components.

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The height animation currently running on each element, so a new one can take over mid-way.
const running = new WeakMap<HTMLElement, Animation>();

/** Stops an element's running height animation, leaving it at its natural height. */
export function stopHeightAnimation(el: HTMLElement) {
  running.get(el)?.cancel();
}

/**
 * Smoothly animates an element's height between two pixel values.
 * The end height is held until `onDone` has applied the final DOM state (e.g. closing a
 * <details>), so the element never flashes back to its full size for a frame.
 */
export function animateHeight(el: HTMLElement, from: number, to: number, onDone?: () => void, duration = 350) {
  stopHeightAnimation(el);
  if (from === to || prefersReducedMotion()) {
    onDone?.();
    return;
  }

  el.style.overflow = 'hidden';
  const animation = el.animate([{ height: `${from}px` }, { height: `${to}px` }], {
    duration,
    easing: 'ease-in-out',
    fill: 'forwards',
  });
  running.set(el, animation);

  animation.onfinish = () => {
    onDone?.();
    animation.cancel();
  };
  // Runs on finish and when a newer animation takes over; only the latest one cleans up.
  animation.oncancel = () => {
    if (running.get(el) !== animation) return;
    running.delete(el);
    el.style.overflow = '';
  };
}

/** Runs a DOM change that alters an element's height, animating from the old height to the new one. */
export function withHeightTransition(el: HTMLElement, change: () => void, duration?: number) {
  const from = el.offsetHeight; // current on-screen height, even mid-animation
  stopHeightAnimation(el);
  change();
  animateHeight(el, from, el.offsetHeight, undefined, duration);
}
