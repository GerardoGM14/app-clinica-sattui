// Global site content. Keep copy here instead of hard-coding it in components.
import type { IconName } from '@components/ui/icons';

export const site = {
  name: 'Dr. Flavio Sattui',
  tagline: 'Atención Médica Especializada',
  description:
    'Orientación médica virtual en ginecología y obstetricia. Resuelve tus dudas y recibe atención profesional según tus necesidades.',
  lang: 'es',
};

// TODO: confirm the real number; this is the one shown in the Figma design.
export const contact = {
  phone: '+51 689 548 648',
  phoneHref: 'tel:+51689548648',
  whatsappNumber: '51689548648',
};

/** WhatsApp chat link, optionally with a prefilled message. */
export const whatsappLink = (message = 'Hola, quisiera agendar una consulta.') =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

// Shared image paths (files live in /public/images and are uploaded separately).
export const images = {
  logoMark: '/images/brand/logo-mark.svg',
};

export interface NavLink {
  label: string;
  href: string;
}

// One-page navigation: each href points to a section id. Shared by Header and Footer.
export const navLinks: NavLink[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Staff médico', href: '#staff-medico' },
  { label: '¿Por qué elegirnos?', href: '#por-que-elegirnos' },
  { label: 'Cómo agendar', href: '#como-agendar' },
  { label: 'Preguntas frecuentes', href: '#preguntas-frecuentes' },
  { label: 'Contáctanos', href: '#contacto' },
];

export interface SocialLink {
  label: string;
  icon: IconName;
  href: string;
}

// TODO: replace with the real profile URLs.
export const socialLinks: SocialLink[] = [
  { label: 'Facebook', icon: 'facebook-logo', href: 'https://www.facebook.com/' },
  { label: 'Instagram', icon: 'instagram-logo', href: 'https://www.instagram.com/' },
  { label: 'TikTok', icon: 'tiktok-logo', href: 'https://www.tiktok.com/' },
];

export const footer = {
  // TODO: the design uses placeholder (lorem ipsum) text here; confirm the final copy.
  description:
    'Orientación médica virtual en ginecología y obstetricia para acompañarte en cada etapa de tu salud.',
  copyright: `© ${new Date().getFullYear()} ${site.name} ${site.tagline}. Todos los derechos reservados.`,
  credit: {
    prefix: 'Website by',
    name: 'Trigra',
    logo: '/images/brand/logo-trigra-footer.png',
    url: 'https://trigra.com.pe',
  },
};
