// Staff profiles (users/{uid}), read-only from the panel. Accounts are created in createStaff.ts.
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Watcher } from '@/lib/useLiveData';
import type { StaffProfile } from '@/types';

export const watchStaff: Watcher<StaffProfile[]> = (onData, onError) =>
  onSnapshot(
    query(collection(db, 'users'), orderBy('name')),
    (snap) => onData(snap.docs.map((d) => ({ ...(d.data() as Omit<StaffProfile, 'uid'>), uid: d.id }))),
    onError,
  );
