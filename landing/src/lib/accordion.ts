// Smooth open/close for <details data-accordion> items (see components/ui/AccordionItem.astro).
// Items sharing a data-accordion-group behave as an exclusive accordion: opening one closes the others.
// The native `name` attribute is not used because it closes the other item instantly, without animation.
import { animateHeight } from './motion';

const DURATION_MS = 300;

const contentOf = (item: HTMLDetailsElement) => item.querySelector<HTMLElement>('[data-accordion-content]')!;
const isClosing = (item: HTMLDetailsElement) => item.dataset.closing !== undefined;

function open(item: HTMLDetailsElement) {
  const content = contentOf(item);
  // When reopening an item that is still folding up, continue from its current height.
  const from = item.open ? content.offsetHeight : 0;
  delete item.dataset.closing;
  item.open = true;
  animateHeight(content, from, content.scrollHeight, undefined, DURATION_MS);
}

function close(item: HTMLDetailsElement) {
  const content = contentOf(item);
  // data-closing turns the chevron back right away while the content folds up.
  item.dataset.closing = '';
  animateHeight(content, content.offsetHeight, 0, () => {
    item.open = false;
    delete item.dataset.closing;
  }, DURATION_MS);
}

export function initAccordions() {
  document.querySelectorAll<HTMLDetailsElement>('details[data-accordion]').forEach((item) => {
    item.querySelector('summary')!.addEventListener('click', (event) => {
      event.preventDefault();

      if (item.open && !isClosing(item)) {
        close(item);
        return;
      }
      const group = item.dataset.accordionGroup;
      if (group) {
        document
          .querySelectorAll<HTMLDetailsElement>(`details[data-accordion-group="${group}"][open]`)
          .forEach((other) => other !== item && !isClosing(other) && close(other));
      }
      open(item);
    });
  });
}
