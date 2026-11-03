// Accessible tabs (see components/ui/Tabs.astro): click or ←/→ keys to switch,
// with a short fade-in of the selected panel.
import { prefersReducedMotion } from './motion';

export function initTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));

    const select = (selected: HTMLButtonElement, moveFocus = false) => {
      tabs.forEach((tab) => {
        const isSelected = tab === selected;
        const panel = document.getElementById(tab.getAttribute('aria-controls')!)!;
        tab.setAttribute('aria-selected', String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;

        if (isSelected && panel.hidden) {
          panel.hidden = false;
          panel.scrollTop = 0;
          if (!prefersReducedMotion()) {
            panel.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], {
              duration: 250,
              easing: 'ease-out',
            });
          }
        } else if (!isSelected) {
          panel.hidden = true;
        }
      });
      if (moveFocus) selected.focus();
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        const step = event.key === 'ArrowRight' ? 1 : -1;
        select(tabs[(i + step + tabs.length) % tabs.length], true);
      });
    });
  });
}
