import type { ReactNode } from 'react';

/** Page title (with an optional gold highlight, as in the landing) and actions on the right. */
export function PageHeader({ title, highlight, eyebrow, children }: { title: string; highlight?: string; eyebrow?: string; children?: ReactNode }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        {eyebrow && <p className="text-caption-1 font-medium text-gold">{eyebrow}</p>}
        <h1 className="text-2xl font-semibold text-fg-1 md:text-title-2">
          {title} {highlight && <span className="text-gold">{highlight}</span>}
        </h1>
      </div>
      {children && <div className="flex flex-wrap items-center gap-3">{children}</div>}
    </header>
  );
}
