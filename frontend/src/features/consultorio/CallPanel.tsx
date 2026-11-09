// Video call card: opens the call and shares its link with the patient.
// For now the link is pasted by hand; once the video provider is chosen, a Cloud Function
// will fill appointment.meetingUrl automatically when the appointment is created.
import { useEffect, useState } from 'react';
import { Check, Copy, FloppyDisk, Link as LinkIcon, VideoCamera, WhatsappLogo } from '@phosphor-icons/react';
import { Avatar } from '@/components/ui/Avatar';
import { Button, ButtonLink } from '@/components/ui/Button';
import { updateAppointment } from '@/features/appointments/api';
import { formatTime, whatsappTo } from '@/lib/format';
import type { Appointment } from '@/types';

export function CallPanel({ appointment }: { appointment: Appointment }) {
  const [link, setLink] = useState(appointment.meetingUrl);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => setLink(appointment.meetingUrl), [appointment.id, appointment.meetingUrl]);

  const hasLink = Boolean(appointment.meetingUrl);
  const dirty = link.trim() !== appointment.meetingUrl;
  const firstName = appointment.patientName.split(' ')[0];
  const message = `Hola, ${firstName}. Este es el enlace de tu teleconsulta de hoy a las ${formatTime(appointment.start)}: ${appointment.meetingUrl}`;

  const save = async () => {
    setSaving(true);
    try {
      await updateAppointment(appointment.id, { meetingUrl: link.trim() });
    } finally {
      setSaving(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(appointment.meetingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-ink p-6 text-center">
        <span className="inline-flex h-8 items-center gap-2 self-start rounded-full bg-white/15 px-3 text-caption-1 font-medium text-white">
          <span className={`size-2 rounded-full ${appointment.status === 'en-sala' ? 'bg-gold' : 'bg-white/50'}`} />
          {appointment.status === 'en-sala' ? 'Paciente en sala de espera' : `Cita a las ${formatTime(appointment.start)}`}
        </span>
        <Avatar name={appointment.patientName} size="lg" />
        <p className="text-body-1 font-medium text-white">{appointment.patientName}</p>
        {hasLink ? (
          <ButtonLink href={appointment.meetingUrl} target="_blank" rel="noopener" variant="gold" icon={VideoCamera} className="w-full">
            Abrir videollamada
          </ButtonLink>
        ) : (
          <p className="text-caption-1 text-white/70">Agrega el enlace de la videollamada para iniciarla y enviarla al paciente.</p>
        )}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-stroke bg-surface p-4">
        <p className="flex items-center gap-2 text-caption-1 font-semibold text-fg-1">
          <LinkIcon size={18} className="text-primary-soft" />
          Enlace para {firstName}
        </p>
        <div className="flex gap-2">
          <input
            type="url"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            placeholder="Pega aquí el enlace de la videollamada"
            aria-label="Enlace de la videollamada"
            className="h-10 min-w-0 flex-1 rounded-lg bg-surface-muted px-3 text-caption-1 text-fg-2 outline-none focus:ring-2 focus:ring-primary/20"
          />
          {dirty && (
            <Button size="sm" icon={FloppyDisk} onClick={save} disabled={saving}>
              Guardar
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" icon={copied ? Check : Copy} onClick={copy} disabled={!hasLink}>
            {copied ? '¡Copiado!' : 'Copiar'}
          </Button>
          <ButtonLink
            size="sm"
            variant="gold"
            icon={WhatsappLogo}
            href={hasLink ? whatsappTo(appointment.patientPhone, message) : undefined}
            target="_blank"
            rel="noopener"
            aria-disabled={!hasLink}
            className={hasLink ? '' : 'pointer-events-none opacity-50'}
          >
            WhatsApp
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
