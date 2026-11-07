import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, CalendarBlank, CaretLeft, CaretRight, PencilSimple, Plus } from '@phosphor-icons/react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Button, buttonClasses } from '@/components/ui/Button';
import { EmptyState, Spinner } from '@/components/ui/Feedback';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useDoctorScope, useProfile } from '@/features/auth/AuthProvider';
import { addDays, addMonths, isSameDay, startOfDay, startOfMonth, startOfWeek } from '@/lib/dates';
import { formatLongDate, formatTime, toDateInput } from '@/lib/format';
import { useLiveData } from '@/lib/useLiveData';
import type { Appointment } from '@/types';
import { watchAppointments } from './api';
import { AppointmentForm } from './AppointmentForm';
import { MonthCalendar } from './MonthCalendar';

const weekdayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export function AgendaPage() {
  const profile = useProfile();
  const doctorId = useDoctorScope();
  const [selected, setSelected] = useState(() => startOfDay(new Date()));
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  // undefined: closed, null: new appointment, Appointment: editing.
  const [editing, setEditing] = useState<Appointment | null | undefined>(undefined);

  const weekStart = startOfWeek(selected);
  const week = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // One live query for the visible month feeds the calendar dots, the week strip and the day list.
  const rangeStart = new Date(Math.min(startOfMonth(month).getTime(), weekStart.getTime()));
  const rangeEnd = new Date(Math.max(addMonths(month, 1).getTime(), addDays(weekStart, 7).getTime()));
  const { data: appointments = [], loading } = useLiveData(watchAppointments(rangeStart, rangeEnd, doctorId), [
    rangeStart.getTime(),
    rangeEnd.getTime(),
    doctorId,
  ]);

  const counts = useMemo(() => {
    const result: Record<string, number> = {};
    for (const a of appointments) if (a.status !== 'cancelada') result[toDateInput(a.start)] = (result[toDateInput(a.start)] ?? 0) + 1;
    return result;
  }, [appointments]);

  const dayAppointments = appointments.filter((a) => isSameDay(a.start, selected));

  const selectDay = (day: Date) => {
    setSelected(startOfDay(day));
    setMonth(startOfMonth(day));
  };

  return (
    <main className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader title="Agenda">
        <Button size="sm" icon={Plus} onClick={() => setEditing(null)}>
          Nueva cita
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Semana anterior" onClick={() => selectDay(addDays(selected, -7))} className="grid size-10 shrink-0 place-items-center rounded-full border border-stroke-strong text-fg-3 hover:text-primary">
              <CaretLeft size={18} />
            </button>
            <ul className="grid flex-1 grid-cols-7 gap-1.5 sm:gap-2">
              {week.map((day, i) => {
                const count = counts[toDateInput(day)] ?? 0;
                const active = isSameDay(day, selected);
                return (
                  <li key={day.toISOString()}>
                    <button
                      type="button"
                      onClick={() => selectDay(day)}
                      aria-pressed={active}
                      className={`flex w-full flex-col items-center gap-0.5 rounded-2xl py-2.5 transition-colors ${active ? 'bg-primary text-white' : 'bg-surface-muted text-fg-3 hover:bg-primary-tint'}`}
                    >
                      <span className="text-xs">{weekdayLabels[i]}</span>
                      <span className="text-subtitle-1 font-semibold">{day.getDate()}</span>
                      <span className={`text-[11px] ${active ? 'text-white/80' : 'text-fg-4'}`}>{count ? `${count} cita${count > 1 ? 's' : ''}` : '—'}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <button type="button" aria-label="Semana siguiente" onClick={() => selectDay(addDays(selected, 7))} className="grid size-10 shrink-0 place-items-center rounded-full border border-stroke-strong text-fg-3 hover:text-primary">
              <CaretRight size={18} />
            </button>
          </div>

          <h2 className="text-body-2 font-semibold text-fg-1">{formatLongDate(selected)}</h2>

          {loading ? (
            <Spinner />
          ) : dayAppointments.length === 0 ? (
            <EmptyState icon={CalendarBlank} title="No hay citas este día">
              Usa "Nueva cita" para agendar una.
            </EmptyState>
          ) : (
            <ul className="flex flex-col gap-3">
              {dayAppointments.map((appointment) => (
                <li key={appointment.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-stroke p-4">
                  <span className="flex w-14 flex-col">
                    <span className="text-body-1 font-semibold text-primary-deep">{formatTime(appointment.start)}</span>
                    <span className="text-xs text-fg-4">{formatTime(appointment.end)}</span>
                  </span>
                  <Avatar name={appointment.patientName} />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-body-1 font-semibold text-fg-1">{appointment.patientName}</span>
                    <span className="truncate text-caption-1 text-fg-4">
                      {appointment.reason}
                      {profile.role === 'admin' && ` · ${appointment.doctorName}`}
                    </span>
                  </span>
                  <StatusBadge status={appointment.status} />
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" icon={PencilSimple} onClick={() => setEditing(appointment)}>
                      Editar
                    </Button>
                    <Link to={`/consultorio?fecha=${toDateInput(appointment.start)}&cita=${appointment.id}`} className={buttonClasses({ variant: 'outline', size: 'sm' })}>
                      Abrir
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="self-start">
          <MonthCalendar month={month} selected={selected} counts={counts} onSelect={selectDay} onMonthChange={setMonth} />
        </div>
      </div>

      <Modal open={editing !== undefined} title={editing ? 'Editar cita' : 'Nueva cita'} onClose={() => setEditing(undefined)}>
        <AppointmentForm appointment={editing ?? undefined} day={selected} onDone={() => setEditing(undefined)} />
      </Modal>
    </main>
  );
}
