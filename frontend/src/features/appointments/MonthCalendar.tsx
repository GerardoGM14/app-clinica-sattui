import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { addDays, addMonths, isSameDay, startOfMonth, startOfWeek } from '@/lib/dates';
import { formatMonth, toDateInput } from '@/lib/format';

interface Props {
  month: Date;
  selected: Date;
  /** Appointments per day, keyed by YYYY-MM-DD. */
  counts: Record<string, number>;
  onSelect: (day: Date) => void;
  onMonthChange: (month: Date) => void;
}

const weekdays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export function MonthCalendar({ month, selected, counts, onSelect, onMonthChange }: Props) {
  const first = startOfMonth(month);
  const gridStart = startOfWeek(first);
  const days = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
  const today = new Date();

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-stroke bg-surface p-4">
      <div className="flex items-center justify-between">
        <p className="text-body-1 font-semibold text-fg-1">{formatMonth(first)}</p>
        <div className="flex gap-1">
          <button type="button" aria-label="Mes anterior" onClick={() => onMonthChange(addMonths(first, -1))} className="grid size-8 place-items-center rounded-full text-fg-3 hover:bg-surface-muted">
            <CaretLeft size={16} />
          </button>
          <button type="button" aria-label="Mes siguiente" onClick={() => onMonthChange(addMonths(first, 1))} className="grid size-8 place-items-center rounded-full text-fg-3 hover:bg-surface-muted">
            <CaretRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-medium text-fg-4">
        {weekdays.map((day, i) => (
          <span key={i}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day) => {
          const inMonth = day.getMonth() === first.getMonth();
          const isSelected = isSameDay(day, selected);
          const count = counts[toDateInput(day)] ?? 0;
          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelect(day)}
              aria-label={`${day.getDate()}${count ? `, ${count} citas` : ''}`}
              aria-pressed={isSelected}
              className="flex flex-col items-center gap-0.5"
            >
              <span
                className={[
                  'grid size-8 place-items-center rounded-full text-caption-1 transition-colors',
                  isSelected ? 'bg-primary font-semibold text-white' : isSameDay(day, today) ? 'font-semibold text-primary ring-1 ring-primary' : inMonth ? 'text-fg-3 hover:bg-surface-muted' : 'text-neutral-6',
                ].join(' ')}
              >
                {day.getDate()}
              </span>
              <span className={`size-1 rounded-full ${count && inMonth ? 'bg-gold' : 'bg-transparent'}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
