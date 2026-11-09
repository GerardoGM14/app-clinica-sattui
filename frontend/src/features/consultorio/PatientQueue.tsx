import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Avatar } from '@/components/ui/Avatar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { addDays, isSameDay } from '@/lib/dates';
import { formatLongDate, formatTime } from '@/lib/format';
import type { Appointment } from '@/types';

interface Props {
  day: Date;
  appointments: Appointment[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onDayChange: (day: Date) => void;
}

/** The day's patients in order; choosing one opens their chart beside it. */
export function PatientQueue({ day, appointments, selectedId, onSelect, onDayChange }: Props) {
  const isToday = isSameDay(day, new Date());

  return (
    <div className="flex flex-col gap-4 bg-primary-tint p-4 lg:sticky lg:top-0 lg:h-dvh lg:overflow-y-auto lg:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-caption-1 font-medium text-gold">{formatLongDate(day)}</p>
          <h1 className="text-subtitle-1 font-semibold text-fg-1">{isToday ? 'Pacientes de hoy' : 'Pacientes del día'}</h1>
        </div>
        <div className="flex gap-1">
          <button type="button" aria-label="Día anterior" onClick={() => onDayChange(addDays(day, -1))} className="grid size-8 place-items-center rounded-full bg-surface/70 text-fg-3 hover:bg-surface">
            <CaretLeft size={16} />
          </button>
          <button type="button" aria-label="Día siguiente" onClick={() => onDayChange(addDays(day, 1))} className="grid size-8 place-items-center rounded-full bg-surface/70 text-fg-3 hover:bg-surface">
            <CaretRight size={16} />
          </button>
        </div>
      </div>
      {!isToday && (
        <button type="button" onClick={() => onDayChange(new Date())} className="self-start text-caption-1 font-medium text-primary underline-offset-4 hover:underline">
          Volver a hoy
        </button>
      )}

      {appointments.length === 0 ? (
        <p className="rounded-2xl bg-surface/70 p-4 text-caption-1 text-fg-4">No hay citas para este día.</p>
      ) : (
        <ul className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:overflow-visible">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="shrink-0 max-lg:w-60">
              <button
                type="button"
                onClick={() => onSelect(appointment.id)}
                aria-pressed={appointment.id === selectedId}
                className="flex w-full items-center gap-3 rounded-2xl border border-transparent bg-surface/70 p-3 text-left transition hover:bg-surface aria-pressed:border-primary aria-pressed:bg-surface aria-pressed:shadow-md"
              >
                <Avatar name={appointment.patientName} size="sm" />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="truncate text-caption-1 font-semibold text-fg-1">{appointment.patientName}</span>
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-primary-deep">{formatTime(appointment.start)}</span>
                    <StatusBadge status={appointment.status} />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
