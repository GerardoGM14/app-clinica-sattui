// Animated modal dialogs (see components/ui/Dialog.astro).
// Open with any element carrying data-dialog-open="<dialog id>". Closes with the ✕ button
// ([data-dialog-close]), the Esc key or a click on the backdrop.
import { prefersReducedMotion } from './motion';

const DURATION_MS = 220;
const HIDDEN = { opacity: 0, transform: 'translateY(16px) scale(0.98)' };
const SHOWN = { opacity: 1, transform: 'none' };

function open(dialog: HTMLDialogElement) {
  if (dialog.open) return;
  dialog.showModal();
  if (prefersReducedMotion()) return;
  dialog.animate([HIDDEN, SHOWN], { duration: DURATION_MS, easing: 'ease-out' });
  dialog.animate([{ opacity: 0 }, { opacity: 1 }], { duration: DURATION_MS, pseudoElement: '::backdrop' });
}

async function close(dialog: HTMLDialogElement) {
  if (!dialog.open || dialog.dataset.closing !== undefined) return;
  if (!prefersReducedMotion()) {
    dialog.dataset.closing = '';
    const options = { duration: DURATION_MS, easing: 'ease-in', fill: 'forwards' } as const;
    const box = dialog.animate([SHOWN, HIDDEN], options);
    const backdrop = dialog.animate([{ opacity: 1 }, { opacity: 0 }], { ...options, pseudoElement: '::backdrop' });
    await box.finished;
    dialog.close();
    // Release the held end state only after closing, so the dialog never flashes back.
    box.cancel();
    backdrop.cancel();
    delete dialog.dataset.closing;
    return;
  }
  dialog.close();
}

export function initDialogs() {
  document.querySelectorAll<HTMLElement>('[data-dialog-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const dialog = document.getElementById(trigger.dataset.dialogOpen!);
      if (dialog instanceof HTMLDialogElement) open(dialog);
    });
  });

  document.querySelectorAll<HTMLDialogElement>('dialog[data-dialog]').forEach((dialog) => {
    // Esc: run our closing animation instead of the instant native close.
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      close(dialog);
    });
    // A click whose target is the <dialog> itself landed on the backdrop.
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) close(dialog);
    });
    dialog.querySelectorAll('[data-dialog-close]').forEach((button) => button.addEventListener('click', () => close(dialog)));
  });
}
