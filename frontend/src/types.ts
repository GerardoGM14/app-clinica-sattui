// Data model shared by the panel. Mirrors the Firestore collections described in backend/README.md.

export type Role = 'admin' | 'doctor';
export type SpecialtyId = 'ginecologia' | 'otorrinolaringologia';

/** users/{uid}: staff who can sign in to the panel. */
export interface StaffProfile {
  uid: string;
  name: string;
  email: string;
  role: Role;
  /** Only for doctors. */
  specialty?: SpecialtyId;
}

/** patients/{id} */
export interface Patient {
  id: string;
  name: string;
  /** YYYY-MM-DD */
  birthDate: string;
  phone: string;
  email: string;
  specialty: SpecialtyId;
  /** uid of the treating doctor; defines who can see the patient. */
  doctorId: string;
  allergies: string;
  /** Short background shown at the top of the chart. */
  summary: string;
  createdAt: Date;
}

export type AppointmentStatus = 'pendiente' | 'confirmada' | 'en-sala' | 'atendida' | 'cancelada';

/** appointments/{id} */
export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  start: Date;
  end: Date;
  status: AppointmentStatus;
  reason: string;
  /** Video call link shared with the patient. */
  meetingUrl: string;
  createdAt: Date;
}

/** patients/{id}/notes/{noteId}: append-only clinical notes. */
export interface ClinicalNote {
  id: string;
  text: string;
  authorId: string;
  authorName: string;
  appointmentId: string | null;
  createdAt: Date;
}
