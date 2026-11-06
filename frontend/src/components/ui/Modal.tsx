// Native <dialog> modal: Esc and the ✕ button close it; the page stays locked behind (styles/index.css).
import { useEffect, useRef, type ReactNode } from 'react';
import { X } from '@phosphor-icons/react';

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, title, onClose, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-2xl bg-surface p-0 text-fg-2"
    >
      {open && (
        <div className="flex max-h-[85dvh] flex-col">
          <header className="flex items-center justify-between gap-4 border-b border-stroke px-6 py-4">
            <h2 className="text-subtitle-1 font-semibold text-fg-1">{title}</h2>
            <button type="button" onClick={onClose} aria-label="Cerrar" className="grid size-10 place-items-center rounded-full bg-neutral-6 text-fg-3 hover:bg-stroke-strong">
              <X size={20} />
            </button>
          </header>
          <div className="overflow-y-auto px-6 py-5">{children}</div>
        </div>
      )}
    </dialog>
  );
}
