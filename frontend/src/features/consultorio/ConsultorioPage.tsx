// Variant 3 main screen: the day's queue on the left, the selected consultation beside it.
// The day and appointment live in the URL (?fecha=YYYY-MM-DD&cita=id), so the agenda can link here.
import { useSearchParams } from 'react-router';
import { VideoCamera } from '@phosphor-icons/react';
import { EmptyState, Spinner } from '@/components/ui/Feedback';
import { useDoctorScope } from '@/features/auth/AuthProvider';
import { watchAppointments } from '@/features/appointments/api';
import { addDays, startOfDay } from '@/lib/dates';
import { fromDateInput, toDateInput } from '@/lib/format';
import { useLiveData } from '@/lib/useLiveData';
import { ConsultationWorkspace } from './ConsultationWorkspace';
import { PatientQueue } from './PatientQueue';

export function ConsultorioPage() {
  const doctorId = useDoctorScope();
  const [params, setParams] = useSearchParams();
  const day = params.get('fecha') ? fromDateInput(params.get('fecha')!) : startOfDay(new Date());

  const { data: appointments = [], loading } = useLiveData(watchAppointments(day, addDays(day, 1), doctorId), [day.getTime(), doctorId]);

  // Without an explicit choice, open whoever is waiting, else the next one not yet attended.
  const selected =
    appointments.find((a) => a.id === params.get('cita')) ??
    appointments.find((a) => a.status === 'en-sala') ??
    appointments.find((a) => a.status !== 'atendida' && a.status !== 'cancelada') ??
    appointments[0];

  const update = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    setParams(next);
  };

  return (
    <main className="grid min-h-dvh grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)]">
      <PatientQueue
        day={day}
        appointments={appointments}
        selectedId={selected?.id}
        onSelect={(id) => update({ cita: id })}
        onDayChange={(next) => update({ fecha: toDateInput(next), cita: null })}
      />

      {loading ? (
        <Spinner />
      ) : selected ? (
        <ConsultationWorkspace key={selected.id} appointment={selected} />
      ) : (
        <div className="p-4 sm:p-6 lg:p-8">
          <EmptyState icon={VideoCamera} title="Sin consultas para este día">
            Agenda citas desde la sección Agenda y aparecerán aquí en orden.
          </EmptyState>
        </div>
      )}
    </main>
  );
}
