// Admin only: list the team and register new staff accounts (through the createStaffUser function).
import { useState, type FormEvent } from 'react';
import { FirebaseError } from 'firebase/app';
import { Plus, UserPlus } from '@phosphor-icons/react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Feedback';
import { FormError, SelectField, TextField } from '@/components/ui/Field';
import { Modal } from '@/components/ui/Modal';
import { specialtyLabels } from '@/lib/format';
import type { Role, SpecialtyId } from '@/types';
import { createStaffUser } from './createStaff';
import { useStaff } from './useStaff';

export function StaffPage() {
  const { staff, loading } = useStaff();
  const [open, setOpen] = useState(false);

  return (
    <main className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader title="Equipo" highlight="médico">
        <Button size="sm" icon={Plus} onClick={() => setOpen(true)}>
          Nuevo miembro
        </Button>
      </PageHeader>

      {loading ? (
        <Spinner />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {staff.map((member) => (
            <li key={member.uid} className="flex items-center gap-4 rounded-2xl border border-stroke p-5">
              <Avatar name={member.name} specialty={member.specialty} />
              <div className="flex min-w-0 flex-col">
                <p className="truncate text-body-1 font-semibold text-fg-1">{member.name}</p>
                <p className="truncate text-caption-1 text-fg-4">{member.email}</p>
                <p className="text-xs font-medium text-primary-soft">
                  {member.role === 'admin' ? 'Administrador' : member.specialty ? specialtyLabels[member.specialty] : 'Médico'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal open={open} title="Nuevo miembro del equipo" onClose={() => setOpen(false)}>
        <StaffForm onDone={() => setOpen(false)} />
      </Modal>
    </main>
  );
}

const errorMessages: Record<string, string> = {
  'functions/already-exists': 'Ya existe una cuenta con ese correo.',
  'functions/invalid-argument': 'Revisa los datos: el correo debe ser válido y la contraseña tener al menos 8 caracteres.',
  'functions/permission-denied': 'Solo un administrador puede registrar miembros.',
};

function StaffForm({ onDone }: { onDone: () => void }) {
  const [role, setRole] = useState<Role>('doctor');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(null);
    setSaving(true);
    try {
      await createStaffUser({
        name: String(form.get('name')).trim(),
        email: String(form.get('email')).trim(),
        password: String(form.get('password')),
        role,
        specialty: role === 'doctor' ? (String(form.get('specialty')) as SpecialtyId) : undefined,
      });
      onDone();
    } catch (err) {
      const code = err instanceof FirebaseError ? err.code : '';
      setError(errorMessages[code] ?? 'No se pudo crear la cuenta. Inténtalo de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <TextField label="Nombre completo" name="name" placeholder="Dra. Nombre Apellido" required className="sm:col-span-2" />
      <TextField label="Correo" name="email" type="email" required className="sm:col-span-2" />
      <TextField label="Contraseña inicial" name="password" type="password" minLength={8} required />
      <SelectField label="Rol" name="role" value={role} onChange={(event) => setRole(event.target.value as Role)}>
        <option value="doctor">Médico</option>
        <option value="admin">Administrador</option>
      </SelectField>
      {role === 'doctor' && (
        <SelectField label="Especialidad" name="specialty" className="sm:col-span-2">
          {Object.entries(specialtyLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>
      )}
      <div className="flex flex-col gap-3 sm:col-span-2">
        <FormError message={error} />
        <Button type="submit" icon={UserPlus} disabled={saving} className="self-end">
          {saving ? 'Creando…' : 'Crear cuenta'}
        </Button>
      </div>
    </form>
  );
}
