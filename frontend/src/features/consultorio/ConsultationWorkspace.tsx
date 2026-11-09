// Everything about the selected appointment on one screen: patient header, chart, notes and video call.
import { CheckCircle, DoorOpen } from '@phosphor-icons/react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Feedback';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { updateAppointment } from '@/features/appointments/api';
import { watchPatient } from '@/features/patients/api';
import { ageFrom, specialtyLabels } from '@/lib/format';
import { useLiveData } from '@/lib/useLiveData';
import type { Appointment } from '@/types';
import { CallPanel } from './CallPanel';
import { ClinicalNotes } from './ClinicalNotes';

export function ConsultationWorkspace({ appointment }: { appointment: Appointment }) {
  const { data: patient, loading } = useLiveData(watchPatient(appointment.patientId), [appointment.patientId]);

  if (loading) return <Spinner />;

  const age = patient ? ageFrom(patient.birthDate) : null;
  const done = appointment.status === 'atendida' || appointment.status === 'cancelada';

  return (
    <div className="flex min-w-0 flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-blush p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <Avatar name={appointment.patientName} specialty={patient?.specialty} size="lg" className="bg-surface" />
          <div className="flex flex-col gap-1">
            <h2 className="text-subtitle-1 font-semibold text-fg-1 sm:text-title-2">{appointment.patientName}</h2>
            <p className="flex flex-wrap items-center gap-2 text-caption-1 text-fg-3">
              {age !== null && <span>{age} años ·</span>}
              <span>{appointment.reason}</span>
              <StatusBadge status={appointment.status} />
            </p>
          </div>
        </div>
        {!done && (
          <div className="flex flex-wrap gap-2">
            {appointment.status !== 'en-sala' && (
              <Button size="sm" variant="outline" icon={DoorOpen} onClick={() => updateAppointment(appointment.id, { status: 'en-sala' })}>
                Paciente en sala
              </Button>
            )}
            <Button size="sm" icon={CheckCircle} onClick={() => updateAppointment(appointment.id, { status: 'atendida' })}>
              Marcar como atendida
            </Button>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col gap-6">
          <dl className="grid gap-4 rounded-2xl border border-stroke p-5 text-caption-1 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <dt className="text-fg-4">Especialidad</dt>
              <dd className="font-medium text-fg-1">{patient ? specialtyLabels[patient.specialty] : '—'}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-fg-4">Médico</dt>
              <dd className="font-medium text-fg-1">{appointment.doctorName}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-fg-4">Alergias</dt>
              <dd className="font-medium text-fg-1">{patient?.allergies || 'Ninguna conocida'}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-fg-4">Celular</dt>
              <dd className="font-medium text-fg-1">{appointment.patientPhone}</dd>
            </div>
            {patient?.summary && (
              <div className="flex flex-col gap-1 sm:col-span-2">
                <dt className="text-fg-4">Antecedentes</dt>
                <dd className="text-fg-2">{patient.summary}</dd>
              </div>
            )}
          </dl>

          <ClinicalNotes patientId={appointment.patientId} appointmentId={appointment.id} />
        </div>

        <CallPanel appointment={appointment} />
      </div>
    </div>
  );
}
