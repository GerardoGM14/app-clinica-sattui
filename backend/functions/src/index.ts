// Cloud Functions for the panel. Deployed with `npm run deploy:backend` from the repo root.
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { setGlobalOptions } from 'firebase-functions/v2';
import { HttpsError, onCall } from 'firebase-functions/v2/https';

initializeApp();
// Same region the panel calls (frontend/src/lib/firebase.ts).
setGlobalOptions({ region: 'us-central1', maxInstances: 10 });

const roles = ['admin', 'doctor'] as const;
const specialties = ['ginecologia', 'otorrinolaringologia'] as const;

interface NewStaff {
  name: string;
  email: string;
  password: string;
  role: (typeof roles)[number];
  specialty?: (typeof specialties)[number];
}

/**
 * Creates a staff account (Firebase Auth user + users/{uid} profile). Admins only:
 * users/{uid} cannot be written from the client (backend/firestore.rules).
 */
export const createStaffUser = onCall<NewStaff>(async (request) => {
  const callerId = request.auth?.uid;
  if (!callerId) throw new HttpsError('unauthenticated', 'Inicia sesión para continuar.');

  const db = getFirestore();
  const caller = await db.doc(`users/${callerId}`).get();
  if (caller.get('role') !== 'admin') throw new HttpsError('permission-denied', 'Solo un administrador puede registrar miembros.');

  const { name, email, password, role, specialty } = request.data ?? {};
  const validEmail = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validPassword = typeof password === 'string' && password.length >= 8;
  const validRole = roles.includes(role);
  const validSpecialty = role !== 'doctor' || specialties.includes(specialty as NewStaff['specialty'] & string);
  if (typeof name !== 'string' || !name.trim() || !validEmail || !validPassword || !validRole || !validSpecialty) {
    throw new HttpsError('invalid-argument', 'Datos incompletos o inválidos.');
  }

  try {
    const user = await getAuth().createUser({ email, password, displayName: name.trim() });
    await db.doc(`users/${user.uid}`).set({
      name: name.trim(),
      email,
      role,
      ...(role === 'doctor' ? { specialty } : {}),
    });
    return { uid: user.uid };
  } catch (error) {
    if ((error as { code?: string }).code === 'auth/email-already-exists') {
      throw new HttpsError('already-exists', 'Ya existe una cuenta con ese correo.');
    }
    throw error;
  }
});
