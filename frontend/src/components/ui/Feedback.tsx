// Loading and empty states.
import type { ReactNode } from 'react';
import type { Icon } from '@phosphor-icons/react';

export function Spinner({ label = 'Cargando…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-caption-1 text-fg-4" role="status">
      <span className="size-5 animate-spin rounded-full border-2 border-primary-line border-t-primary" />
      {label}
    </div>
  );
}

export function EmptyState({ icon: IconComponent, title, children }: { icon: Icon; title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-stroke-strong px-6 py-12 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-primary-tint text-primary">
        <IconComponent size={28} />
      </span>
      <p className="text-body-1 font-semibold text-fg-1">{title}</p>
      {children && <div className="max-w-sm text-caption-1 text-fg-4">{children}</div>}
    </div>
  );
}
