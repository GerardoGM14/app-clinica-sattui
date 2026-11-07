// Firestore access for appointments/{id}.
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, Timestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { fromDoc } from '@/lib/firestore';
import type { Watcher } from '@/lib/useLiveData';
import type { Appointment } from '@/types';

export type AppointmentInput = Omit<Appointment, 'id' | 'createdAt'>;

const appointments = collection(db, 'appointments');

/** Appointments starting in [from, to), optionally only one doctor's, sorted by time. */
export const watchAppointments =
  (from: Date, to: Date, doctorId?: string): Watcher<Appointment[]> =>
  (onData, onError) => {
    const filters = [where('start', '>=', Timestamp.fromDate(from)), where('start', '<', Timestamp.fromDate(to))];
    if (doctorId) filters.unshift(where('doctorId', '==', doctorId));
    const q = query(appointments, ...filters, orderBy('start'));
    return onSnapshot(q, (snap) => onData(snap.docs.map((d) => fromDoc<Appointment>(d))), onError);
  };

export const createAppointment = (input: AppointmentInput) =>
  addDoc(appointments, {
    ...input,
    start: Timestamp.fromDate(input.start),
    end: Timestamp.fromDate(input.end),
    createdAt: serverTimestamp(),
  });

export const updateAppointment = (id: string, changes: Partial<AppointmentInput>) => {
  const data: Record<string, unknown> = { ...changes };
  if (changes.start) data.start = Timestamp.fromDate(changes.start);
  if (changes.end) data.end = Timestamp.fromDate(changes.end);
  return updateDoc(doc(appointments, id), data);
};
