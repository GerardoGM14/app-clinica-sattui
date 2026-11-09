// Creates staff accounts through the createStaffUser Cloud Function (backend/functions/src/index.ts).
// Kept apart from api.ts so only the Equipo screen downloads the Functions SDK.
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';
import { app, useEmulators } from '@/lib/firebase';
import type { Role, SpecialtyId } from '@/types';

// Same region as the Cloud Functions.
const functions = getFunctions(app, 'us-central1');
if (useEmulators) connectFunctionsEmulator(functions, '127.0.0.1', 5001);

export interface NewStaff {
  name: string;
  email: string;
  password: string;
  role: Role;
  specialty?: SpecialtyId;
}

export const createStaffUser = httpsCallable<NewStaff, { uid: string }>(functions, 'createStaffUser');
