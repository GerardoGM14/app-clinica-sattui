import { useMemo, useState } from 'react';
import { MagnifyingGlass, PencilSimple, Plus, Users } from '@phosphor-icons/react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { EmptyState, Spinner } from '@/components/ui/Feedback';
import { Modal } from '@/components/ui/Modal';
import { useDoctorScope, useProfile } from '@/features/auth/AuthProvider';
import { useStaff } from '@/features/staff/useStaff';
import { ageFrom, specialtyLabels } from '@/lib/format';
import { useLiveData } from '@/lib/useLiveData';
import type { Patient } from '@/types';
import { watchPatients } from './api';
import { PatientForm } from './PatientForm';

export function PatientsPage() {
  const profile = useProfile();
  const doctorId = useDoctorScope();
  const { nameOf } = useStaff();
  const { data: patients = [], loading, error } = useLiveData(watchPatients(doctorId), [doctorId]);
  const [search, setSearch] = useState('');
  // undefined: closed, null: new patient, Patient: editing.
  const [editing, setEditing] = useState<Patient | null | undefined>(undefined);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? patients.filter((p) => `${p.name} ${p.phone}`.toLowerCase().includes(q)) : patients;
  }, [patients, search]);

  return (
    <main className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader title="Mis" highlight="pacientes">
        <label className="flex h-11 w-full items-center gap-2 rounded-full border border-stroke bg-surface px-4 text-fg-4 sm:w-72">
          <MagnifyingGlass size={18} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nombre o celular"
            aria-label="Buscar paciente"
            className="w-full bg-transparent text-caption-1 text-fg-2 outline-none"
          />
        </label>
        <Button size="sm" icon={Plus} className="h-11" onClick={() => setEditing(null)}>
          Nuevo paciente
        </Button>
      </PageHeader>

      {loading ? (
        <Spinner />
      ) : error ? (
        <EmptyState icon={Users} title="No se pudieron cargar los pacientes">
          Revisa tu conexión y vuelve a intentarlo.
        </EmptyState>
      ) : visible.length === 0 ? (
        <EmptyState icon={Users} title={search ? 'Sin resultados' : 'Aún no hay pacientes'}>
          {search ? 'Prueba con otro nombre o número.' : 'Registra a tu primer paciente con el botón "Nuevo paciente".'}
        </EmptyState>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-stroke bg-surface">
          <table className="w-full min-w-[760px] text-left text-caption-1">
            <thead className="border-b border-stroke bg-surface-subtle text-xs text-fg-4">
              <tr>
                <th className="px-4 py-3 font-medium">Paciente</th>
                <th className="px-4 py-3 font-medium">Especialidad</th>
                {profile.role === 'admin' && <th className="px-4 py-3 font-medium">Médico</th>}
                <th className="px-4 py-3 font-medium">Alergias</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {visible.map((patient) => {
                const age = ageFrom(patient.birthDate);
                return (
                  <tr key={patient.id} className="border-b border-stroke last:border-b-0 hover:bg-primary-wash">
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-3">
                        <Avatar name={patient.name} specialty={patient.specialty} size="sm" />
                        <span className="flex flex-col">
                          <span className="font-semibold text-fg-1">{patient.name}</span>
                          <span className="text-xs text-fg-4">
                            {age !== null && `${age} años · `}
                            {patient.phone}
                          </span>
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-fg-3">{specialtyLabels[patient.specialty]}</td>
                    {profile.role === 'admin' && <td className="px-4 py-3 text-fg-3">{nameOf(patient.doctorId)}</td>}
                    <td className="px-4 py-3 text-fg-3">{patient.allergies || 'Ninguna conocida'}</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost" icon={PencilSimple} onClick={() => setEditing(patient)}>
                        Editar
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={editing !== undefined} title={editing ? 'Editar paciente' : 'Nuevo paciente'} onClose={() => setEditing(undefined)}>
        <PatientForm patient={editing ?? undefined} onDone={() => setEditing(undefined)} />
      </Modal>
    </main>
  );
}
