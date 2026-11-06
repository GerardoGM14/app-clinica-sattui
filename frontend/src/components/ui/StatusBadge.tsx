import { statusLabels } from '@/lib/format';
import type { AppointmentStatus } from '@/types';

const tones: Record<AppointmentStatus, string> = {
  pendiente: 'bg-gold/15 text-gold-muted',
  confirmada: 'bg-primary-tint text-primary-deep',
  'en-sala': 'bg-primary text-white',
  atendida: 'bg-surface-strong text-fg-4',
  cancelada: 'bg-red-50 text-red-700 line-through',
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span className={`inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium whitespace-nowrap ${tones[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
