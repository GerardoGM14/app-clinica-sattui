import { useState, type FormEvent } from 'react';
import { LockSimple, NotePencil } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Feedback';
import { useProfile } from '@/features/auth/AuthProvider';
import { formatShortDate, formatTime } from '@/lib/format';
import { useLiveData } from '@/lib/useLiveData';
import { addNote, watchNotes } from './notesApi';

interface Props {
  patientId: string;
  appointmentId: string;
}

/** Append-only clinical notes. Only the treating doctor can read or write them (backend/firestore.rules). */
export function ClinicalNotes({ patientId, appointmentId }: Props) {
  const profile = useProfile();
  const canRead = profile.role === 'doctor';
  const { data: notes = [], loading } = useLiveData(canRead ? watchNotes(patientId) : null, [patientId, canRead]);
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!text.trim()) return;
    setSaving(true);
    try {
      await addNote(patientId, { text: text.trim(), authorId: profile.uid, authorName: profile.name, appointmentId });
      setText('');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-stroke p-5">
      <h3 className="flex items-center gap-2 text-body-1 font-semibold text-fg-1">
        <NotePencil size={20} className="text-primary-soft" />
        Notas clínicas
      </h3>

      {!canRead ? (
        <p className="flex items-center gap-2 rounded-xl bg-surface-muted p-4 text-caption-1 text-fg-4">
          <LockSimple size={18} />
          Las notas clínicas solo las ve el médico tratante.
        </p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={4}
              placeholder="Escribe las notas de esta consulta…"
              aria-label="Nueva nota clínica"
              className="w-full resize-none rounded-xl bg-surface-muted p-3 text-caption-1 text-fg-2 outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button type="submit" size="sm" disabled={saving || !text.trim()} className="self-end">
              {saving ? 'Guardando…' : 'Guardar nota'}
            </Button>
          </form>

          {loading ? (
            <Spinner />
          ) : notes.length === 0 ? (
            <p className="text-caption-1 text-fg-4">Todavía no hay notas para este paciente.</p>
          ) : (
            <ol className="flex flex-col gap-4 border-l-2 border-primary-line pl-4">
              {notes.map((note) => (
                <li key={note.id} className="relative flex flex-col gap-0.5">
                  <span className="absolute top-1 -left-[23px] size-3 rounded-full border-2 border-surface bg-gold" />
                  <span className="text-xs font-medium text-gold">
                    {note.createdAt ? `${formatShortDate(note.createdAt)} · ${formatTime(note.createdAt)}` : 'Guardando…'}
                  </span>
                  <span className="text-caption-1 whitespace-pre-line text-fg-3">{note.text}</span>
                </li>
              ))}
            </ol>
          )}
        </>
      )}
    </section>
  );
}
