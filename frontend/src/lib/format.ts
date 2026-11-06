// Formatting helpers for dates, names and links (Peru locale).
import type { AppointmentStatus, SpecialtyId } from '@/types';

const locale = 'es-PE';

export const specialtyLabels: Record<SpecialtyId, string> = {
  ginecologia: 'Ginecología y Obstetricia',
  otorrinolaringologia: 'Otorrinolaringología',
};

export const statusLabels: Record<AppointmentStatus, string> = {
  pendiente: 'Pendiente',
  confirmada: 'Confirmada',
  'en-sala': 'En sala',
  atendida: 'Atendida',
  cancelada: 'Cancelada',
};

export const formatTime = (date: Date) => date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false });

/** "viernes, 6 de noviembre" */
export const formatLongDate = (date: Date) => {
  const text = date.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' });
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatShortDate = (date: Date) => date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });

export const formatMonth = (date: Date) => {
  const text = date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/** Age in years from a YYYY-MM-DD birth date. */
export const ageFrom = (birthDate: string) => {
  if (!birthDate) return null;
  const birth = new Date(`${birthDate}T00:00:00`);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  if (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())) age--;
  return age;
};

/** WhatsApp chat with the patient (Peruvian numbers get the 51 prefix), message ready to send. */
export const whatsappTo = (phone: string, message: string) => {
  const digits = phone.replace(/\D/g, '');
  const number = digits.length === 9 ? `51${digits}` : digits;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

/** YYYY-MM-DD in local time, for <input type="date"> and URLs. */
export const toDateInput = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

/** HH:MM in local time, for <input type="time">. */
export const toTimeInput = (date: Date) => formatTime(date);

export const fromDateInput = (value: string, time = '00:00') => new Date(`${value}T${time}:00`);
