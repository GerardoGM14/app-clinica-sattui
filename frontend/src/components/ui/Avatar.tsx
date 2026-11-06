import { initials } from '@/lib/format';
import type { SpecialtyId } from '@/types';

const sizes = { sm: 'size-9 text-caption-1', md: 'size-11 text-body-1', lg: 'size-16 text-subtitle-1' };

/** Initials avatar; the tone tells the specialty apart (blue: gynecology, gold: ENT). */
export function Avatar({ name, specialty, size = 'md', className = '' }: { name: string; specialty?: SpecialtyId; size?: keyof typeof sizes; className?: string }) {
  const tone = specialty === 'otorrinolaringologia' ? 'bg-gold/15 text-gold-muted' : 'bg-primary-tint text-primary';
  return (
    <span className={`grid shrink-0 place-items-center rounded-full font-semibold ${sizes[size]} ${tone} ${className}`} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
