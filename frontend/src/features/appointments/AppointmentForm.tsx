import { useState, type FormEvent } from 'react';
import { FloppyDisk } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { FormError, SelectField, TextField } from '@/components/ui/Field';
import { useDoctorScope } from '@/features/auth/AuthProvider';
import { watchPatients } from '@/features/patients/api';
import { useStaff } from '@/features/staff/useStaff';
import { fromDateInput, statusLabels, toDateInput, toTimeInput } from '@/lib/format';
import { useLiveData } from '@/lib/useLiveData';
import type { Appointment, AppointmentStatus } from '@/types';
import { createAppointment, updateAppointment, type AppointmentInput } from './api';

interface Props {
  /** Edits this appointment; omit to create a new one. */
  appointment?: Appointment;
  /** Day preselected when creating. */
  day?: Date;
  onDone: () => void;
}

const durations = [30, 45, 60];

export function AppointmentForm({ appointment, day = new Date(), onDone }: Props) {
  const doctorId = useDoctorScope();
  const { nameOf } = useStaff();
  const { data: patients = [] } = useLiveData(watchPatients(doctorId), [doctorId]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const initialDuration = appointment ? Math.round((appointment.end.getTime() - appointment.start.getTime()) / 60000) : 45;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const patient = patients.find((p) => p.id === form.get('patientId'));
    if (!patient) {
      setError('Selecciona un paciente.');
      return;
    }
    const start = fromDateInput(String(form.get('date')), String(form.get('time')));
    const end = new Date(start.getTime() + Number(form.get('duration')) * 60000);
    const input: AppointmentInput = {
      patientId: patient.id,
      patientName: patient.name,
      patientPhone: patient.phone,
      // The appointment belongs to the patient's treating doctor.
      doctorId: patient.doctorId,
      doctorName: nameOf(patient.doctorId),
      start,
      end,
      status: String(form.get('status')) as AppointmentStatus,
      reason: String(form.get('reason')).trim(),
      meetingUrl: String(form.get('meetingUrl')).trim(),
    };

    setError(null);
    setSaving(true);
    try {
      if (appointment) await updateAppointment(appointment.id, input);
      else await createAppointment(input);
      onDone();
    } catch (err) {
      console.error(err);
      setError('No se pudo guardar la cita. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <SelectField label="Paciente" name="patientId" defaultValue={appointment?.patientId ?? ''} required className="sm:col-span-2">
        <option value="">Selecciona un paciente</option>
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.name}
          </option>
        ))}
      </SelectField>
      <TextField label="Fecha" name="date" type="date" defaultValue={toDateInput(appointment?.start ?? day)} required />
      <TextField label="Hora" name="time" type="time" step={300} defaultValue={appointment ? toTimeInput(appointment.start) : '09:00'} required />
      <SelectField label="Duración" name="duration" defaultValue={initialDuration}>
        {durations.map((minutes) => (
          <option key={minutes} value={minutes}>
            {minutes} minutos
          </option>
        ))}
      </SelectField>
      <SelectField label="Estado" name="status" defaultValue={appointment?.status ?? 'pendiente'}>
        {Object.entries(statusLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </SelectField>
      <TextField label="Motivo de consulta" name="reason" defaultValue={appointment?.reason} required className="sm:col-span-2" />
      <TextField
        label="Enlace de la videollamada (opcional)"
        name="meetingUrl"
        type="url"
        placeholder="https://…"
        defaultValue={appointment?.meetingUrl}
        className="sm:col-span-2"
      />
      <div className="flex flex-col gap-3 sm:col-span-2">
        <FormError message={error} />
        <Button type="submit" icon={FloppyDisk} disabled={saving} className="self-end">
          {saving ? 'Guardando…' : appointment ? 'Guardar cambios' : 'Agendar cita'}
        </Button>
      </div>
    </form>
  );
}
