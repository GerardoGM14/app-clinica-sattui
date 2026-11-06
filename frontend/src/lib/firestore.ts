// Small helpers to read Firestore documents into the plain types of src/types.ts.
import { Timestamp, type DocumentData, type QueryDocumentSnapshot, type DocumentSnapshot } from 'firebase/firestore';

/** Converts every Timestamp field of a document into a Date. */
export function fromDoc<T>(snapshot: QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>): T {
  const data = snapshot.data() ?? {};
  const converted: Record<string, unknown> = { id: snapshot.id };
  for (const [key, value] of Object.entries(data)) {
    converted[key] = value instanceof Timestamp ? value.toDate() : value;
  }
  return converted as T;
}
