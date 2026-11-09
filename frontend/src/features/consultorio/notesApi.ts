// Firestore access for patients/{id}/notes: clinical notes, append-only (see backend/firestore.rules).
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { fromDoc } from '@/lib/firestore';
import type { Watcher } from '@/lib/useLiveData';
import type { ClinicalNote } from '@/types';

const notesOf = (patientId: string) => collection(db, 'patients', patientId, 'notes');

export const watchNotes =
  (patientId: string): Watcher<ClinicalNote[]> =>
  (onData, onError) =>
    onSnapshot(
      query(notesOf(patientId), orderBy('createdAt', 'desc')),
      (snap) => onData(snap.docs.map((d) => fromDoc<ClinicalNote>(d))),
      onError,
    );

export const addNote = (patientId: string, note: Omit<ClinicalNote, 'id' | 'createdAt'>) =>
  addDoc(notesOf(patientId), { ...note, createdAt: serverTimestamp() });
