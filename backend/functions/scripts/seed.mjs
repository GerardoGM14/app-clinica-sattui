// Fills the local Firebase emulators with sample staff, patients and appointments (all fictional).
// Run from the repo root with `npm run seed` while `npm run emulators` is running.
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// Safety: never write sample data to the real project. `--emulators` points at the ports in firebase.json.
if (process.argv.includes('--emulators')) {
  process.env.FIRESTORE_EMULATOR_HOST ??= '127.0.0.1:8080';
  process.env.FIREBASE_AUTH_EMULATOR_HOST ??= '127.0.0.1:9099';
}
if (!process.env.FIRESTORE_EMULATOR_HOST || !process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  console.error('Seed aborted: it only runs against the emulators (use --emulators).');
  process.exit(1);
}

initializeApp({ projectId: process.env.GCLOUD_PROJECT ?? 'app-clinica-sattui' });
const auth = getAuth();
const db = getFirestore();

const PASSWORD = 'panel1234';
const staff = [
  { email: 'admin@sattui.test', name: 'Secretaría', role: 'admin' },
  { email: 'flavio@sattui.test', name: 'Dr. Flavio Sattui', role: 'doctor', specialty: 'ginecologia' },
  { email: 'nickole@sattui.test', name: 'Dra. Nickole Gonzales Villela', role: 'doctor', specialty: 'otorrinolaringologia' },
];

const uids = {};
for (const member of staff) {
  const { email, name, ...profile } = member;
  let user;
  try {
    user = await auth.getUserByEmail(email);
  } catch {
    user = await auth.createUser({ email, password: PASSWORD, displayName: name });
  }
  uids[email] = user.uid;
  await db.doc(`users/${user.uid}`).set({ name, email, ...profile });
}

const flavio = uids['flavio@sattui.test'];
const nickole = uids['nickole@sattui.test'];
const doctorNames = { [flavio]: 'Dr. Flavio Sattui', [nickole]: 'Dra. Nickole Gonzales Villela' };

const patients = [
  { key: 'maria', name: 'María Fernández', birthDate: '1994-03-12', phone: '900000001', specialty: 'ginecologia', doctorId: flavio, allergies: '', summary: 'Embarazo de 28 semanas sin complicaciones.' },
  { key: 'andrea', name: 'Andrea Paredes', birthDate: '1999-07-02', phone: '900000003', specialty: 'ginecologia', doctorId: flavio, allergies: '', summary: 'Ciclos irregulares desde hace seis meses.' },
  { key: 'valeria', name: 'Valeria Gutiérrez', birthDate: '1992-11-20', phone: '900000005', specialty: 'ginecologia', doctorId: flavio, allergies: '', summary: 'Un año buscando embarazo.' },
  { key: 'rosa', name: 'Rosa Quispe', birthDate: '1974-01-30', phone: '900000007', specialty: 'ginecologia', doctorId: flavio, allergies: 'Sulfas', summary: 'Climaterio con sofocos frecuentes.' },
  { key: 'carlos', name: 'Carlos Ramírez', birthDate: '1980-05-09', phone: '900000002', specialty: 'otorrinolaringologia', doctorId: nickole, allergies: 'Penicilina', summary: 'Vértigo al girar la cabeza.' },
  { key: 'lucia', name: 'Lucía Mendoza', birthDate: '1988-09-14', phone: '900000004', specialty: 'otorrinolaringologia', doctorId: nickole, allergies: '', summary: 'Sinusitis crónica en tratamiento.' },
];

const patientIds = {};
for (const { key, ...patient } of patients) {
  const ref = db.doc(`patients/seed-${key}`);
  await ref.set({ ...patient, email: '', createdAt: Timestamp.now() });
  patientIds[key] = ref.id;
}

// Appointments relative to today, so the consultorio always has a queue.
const at = (dayOffset, time) => {
  const [h, m] = time.split(':').map(Number);
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(h, m, 0, 0);
  return date;
};
const byKey = Object.fromEntries(patients.map((p) => [p.key, p]));
const appointments = [
  ['rosa', 0, '09:00', 'atendida', 'Control de climaterio'],
  ['maria', 0, '10:30', 'en-sala', 'Control prenatal'],
  ['andrea', 0, '11:30', 'confirmada', 'Alteraciones menstruales'],
  ['valeria', 0, '15:00', 'confirmada', 'Consulta de fertilidad'],
  ['carlos', 0, '16:00', 'pendiente', 'Vértigo recurrente'],
  ['lucia', 1, '09:30', 'confirmada', 'Control de sinusitis'],
  ['maria', 7, '10:00', 'pendiente', 'Control prenatal'],
];

for (const [i, [key, day, time, status, reason]] of appointments.entries()) {
  const patient = byKey[key];
  const start = at(day, time);
  await db.doc(`appointments/seed-${i}`).set({
    patientId: patientIds[key],
    patientName: patient.name,
    patientPhone: patient.phone,
    doctorId: patient.doctorId,
    doctorName: doctorNames[patient.doctorId],
    start: Timestamp.fromDate(start),
    end: Timestamp.fromDate(new Date(start.getTime() + 45 * 60000)),
    status,
    reason,
    meetingUrl: key === 'maria' && day === 0 ? 'https://meet.google.com/abc-defg-hij' : '',
    createdAt: Timestamp.now(),
  });
}

await db.doc(`patients/${patientIds.maria}/notes/seed-1`).set({
  text: 'Control prenatal: presión y peso dentro de lo esperado. Se solicita ecografía morfológica.',
  authorId: flavio,
  authorName: 'Dr. Flavio Sattui',
  appointmentId: null,
  createdAt: Timestamp.fromDate(at(-28, '10:00')),
});

console.log(`Seed listo. Usuarios (contraseña "${PASSWORD}"):`);
for (const member of staff) console.log(`  ${member.email}  ·  ${member.name}`);
process.exit(0);
