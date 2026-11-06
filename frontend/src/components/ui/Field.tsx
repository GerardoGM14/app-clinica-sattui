// Labeled form controls with the panel's look.
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

const control =
  'w-full rounded-xl border border-stroke bg-surface px-4 text-caption-1 text-fg-2 outline-none transition-colors placeholder:text-fg-4 focus:border-primary focus:ring-2 focus:ring-primary/15';

function Label({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-caption-1 font-medium text-fg-3">{label}</span>
      {children}
    </label>
  );
}

export function TextField({ label, className, ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Label label={label} className={className}>
      <input className={`${control} h-11`} {...props} />
    </Label>
  );
}

export function SelectField({ label, className, children, ...props }: { label: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Label label={label} className={className}>
      <select className={`${control} h-11`} {...props}>
        {children}
      </select>
    </Label>
  );
}

export function TextAreaField({ label, className, ...props }: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Label label={label} className={className}>
      <textarea className={`${control} resize-none py-3`} {...props} />
    </Label>
  );
}

/** Error line under a form. */
export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return <p className="rounded-xl bg-red-50 px-4 py-3 text-caption-1 text-red-700">{message}</p>;
}
