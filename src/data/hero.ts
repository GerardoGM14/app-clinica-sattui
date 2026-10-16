import { whatsappLink } from './site';

export const hero = {
  eyebrow: 'Ginecología y Obstetricia - Consultas virtuales',
  title: 'Tu salud merece atención y orientación especializada.',
  description:
    'Encuentra orientación médica en ginecología y obstetricia, resuelve tus dudas y recibe atención profesional según tus necesidades.',
  primaryCta: { label: 'Agendar consulta', href: whatsappLink() },
  secondaryCta: { label: 'Nuestros Servicios', href: '#servicios' },
  image: {
    src: 'hero/hero-patient.png',
    alt: 'Paciente embarazada en una consulta virtual desde su laptop',
  },
  decoration: '/images/hero/hero-decoration.svg',
  highlights: [
    { icon: '/images/icons/personalized-care.svg', label: 'Atención personalizada' },
    { icon: '/images/icons/clear-guidance.svg', label: 'Orientación clara' },
  ],
};
