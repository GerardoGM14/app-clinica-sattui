// Pill button with the landing's variants (landing/src/components/ui/Button.astro).
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import type { Icon } from '@phosphor-icons/react';

type Variant = 'primary' | 'outline' | 'gold' | 'ghost' | 'danger' | 'outline-light';
type Size = 'sm' | 'md';

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
  gold: 'bg-gold text-white hover:brightness-110',
  ghost: 'text-fg-3 hover:bg-primary/5 hover:text-primary',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  'outline-light': 'border border-white text-white hover:bg-white hover:text-primary',
};

const sizes: Record<Size, { button: string; icon: number }> = {
  sm: { button: 'h-10 gap-2 px-5 text-action-sm', icon: 18 },
  md: { button: 'h-12 gap-3 px-6 text-action', icon: 20 },
};

interface Common {
  variant?: Variant;
  size?: Size;
  icon?: Icon;
}

export function buttonClasses({ variant = 'primary', size = 'md' }: Common, className = '') {
  return [
    'inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50',
    variants[variant],
    sizes[size].button,
    className,
  ].join(' ');
}

export function Button({ variant, size = 'md', icon: IconComponent, className, children, type = 'button', ...props }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses({ variant, size }, className)} {...props}>
      {IconComponent && <IconComponent size={sizes[size].icon} />}
      {children}
    </button>
  );
}

export function ButtonLink({ variant, size = 'md', icon: IconComponent, className, children, ...props }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClasses({ variant, size }, className)} {...props}>
      {IconComponent && <IconComponent size={sizes[size].icon} />}
      {children}
    </a>
  );
}
