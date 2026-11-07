import { useState, type FormEvent } from 'react';
import { FloppyDisk } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { FormError, SelectField, TextAreaField, TextField } from '@/components/ui/Field';
import { useProfile } from '@/features/auth/AuthProvider';
import { useStaff } from '@/features/staff/useStaff';
import { specialtyLabels } from '@/lib/format';
import type { Patient, SpecialtyId } from '@/types';
import { createPatient, updatePatient, type PatientInput } from './api';

interface Props {
  /** Edits this patient; omit to create a new one. */
  patient?: Patient;
  onDone: () => void;
}

export function PatientForm({ patient, onDone }: Props) {
  const profile = useProfile();
  const { doctors } = useStaff();
  const isAdmin = profile.role === 'admin';
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const doctorId = isAdmin ? String(form.get('doctorId')) : profile.uid;
    const doctor = doctors.find((d) => d.uid === doctorId);
    const input: PatientInput = {
      name: String(form.get('name')).trim(),
      birthDate: String(form.get('birthDate')),
      phone: String(form.get('phone')).trim(),
      email: String(form.get('email')).trim(),
      // A patient follows the specialty of their treating doctor.
      specialty: (doctor?.specialty ?? profile.specialty ?? 'ginecologia') as SpecialtyId,
      doctorId,
      allergies: String(form.get('allergies')).trim(),
      summary: String(form.get('summary')).trim(),
    };

    setError(null);
    setSaving(true);
    try {
      if (patient) await updatePatient(patient.id, input);
      else await createPatient(input);
      onDone();
    } catch (err) {
      console.error(err);
      setError('No se pudo guardar el paciente. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <TextField label="Nombre completo" name="name" defaultValue={patient?.name} required className="sm:col-span-2" />
      <TextField label="Fecha de nacimiento" name="birthDate" type="date" defaultValue={patient?.birthDate} />
      <TextField label="Celular" name="phone" type="tel" placeholder="9XX XXX XXX" defaultValue={patient?.phone} required />
      <TextField label="Correo" name="email" type="email" defaultValue={patient?.email} className="sm:col-span-2" />
      {isAdmin && (
        <SelectField label="Médico tratante" name="doctorId" defaultValue={patient?.doctorId} required className="sm:col-span-2">
          <option value="">Selecciona un médico</option>
          {doctors.map((doctor) => (
            <option key={doctor.uid} value={doctor.uid}>
              {doctor.name} · {doctor.specialty ? specialtyLabels[doctor.specialty] : ''}
            </option>
          ))}
        </SelectField>
      )}
      <TextField label="Alergias" name="allergies" placeholder="Ninguna conocida" defaultValue={patient?.allergies} className="sm:col-span-2" />
      <TextAreaField label="Antecedentes" name="summary" rows={3} defaultValue={patient?.summary} className="sm:col-span-2" />
      <div className="flex flex-col gap-3 sm:col-span-2">
        <FormError message={error} />
        <Button type="submit" icon={FloppyDisk} disabled={saving} className="self-end">
          {saving ? 'Guardando…' : patient ? 'Guardar cambios' : 'Registrar paciente'}
        </Button>
      </div>
    </form>
  );
}
