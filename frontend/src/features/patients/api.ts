// Firestore access for patients/{id}.
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { fromDoc } from '@/lib/firestore';
import type { Watcher } from '@/lib/useLiveData';
import type { Patient } from '@/types';

export type PatientInput = Omit<Patient, 'id' | 'createdAt'>;

const patients = collection(db, 'patients');

/** All patients for an admin, or only the doctor's own (`doctorId`), sorted by name. */
export const watchPatients =
  (doctorId?: string): Watcher<Patient[]> =>
  (onData, onError) => {
    const q = doctorId ? query(patients, where('doctorId', '==', doctorId), orderBy('name')) : query(patients, orderBy('name'));
    return onSnapshot(q, (snap) => onData(snap.docs.map((d) => fromDoc<Patient>(d))), onError);
  };

export const watchPatient =
  (id: string): Watcher<Patient | null> =>
  (onData, onError) =>
    onSnapshot(doc(patients, id), (snap) => onData(snap.exists() ? fromDoc<Patient>(snap) : null), onError);

export const createPatient = (input: PatientInput) => addDoc(patients, { ...input, createdAt: serverTimestamp() });

export const updatePatient = (id: string, input: Partial<PatientInput>) => updateDoc(doc(patients, id), input);
