import type { SpecialtyId } from './specialties';

export interface Testimonial {
  name: string;
  /** Short context shown under the name, e.g. the reason for the visit. */
  detail: string;
  specialty: SpecialtyId;
  /** 1–5 stars. */
  rating: number;
  text: string;
}

export const testimonialsSection = {
  title: 'Lo que dicen nuestros pacientes',
  highlight: 'nuestros pacientes',
  subtitle: 'Experiencias reales de personas que confiaron en nosotros para cuidar su salud.',
};

// TODO: placeholder testimonials; replace with real ones (with the patients' consent).
export const testimonials: Testimonial[] = [
  {
    name: 'María F.',
    detail: 'Control de embarazo',
    specialty: 'ginecologia',
    rating: 5,
    text: 'El doctor me explicó cada resultado con mucha paciencia. Me sentí acompañada durante todo mi embarazo, incluso a la distancia.',
  },
  {
    name: 'Carlos R.',
    detail: 'Vértigo',
    specialty: 'otorrinolaringologia',
    rating: 5,
    text: 'Llevaba meses con mareos y nadie me daba una respuesta clara. En una sola consulta entendí qué tenía y qué pasos seguir.',
  },
  {
    name: 'Andrea P.',
    detail: 'Alteraciones menstruales',
    specialty: 'ginecologia',
    rating: 5,
    text: 'La consulta virtual fue muy cómoda y puntual. Resolví todas mis dudas sin salir de casa.',
  },
  {
    name: 'Lucía M.',
    detail: 'Sinusitis',
    specialty: 'otorrinolaringologia',
    rating: 5,
    text: 'Muy amable y clara. Me indicó los exámenes que necesitaba y ahora por fin respiro bien.',
  },
  {
    name: 'Valeria G.',
    detail: 'Dudas sobre fertilidad',
    specialty: 'ginecologia',
    rating: 5,
    text: 'Encontré la orientación que buscaba sobre fertilidad. Me trataron con mucho respeto y sin apuros, y salí con un plan claro.',
  },
  {
    name: 'Jorge L.',
    detail: 'Consulta para mi hijo',
    specialty: 'otorrinolaringologia',
    rating: 5,
    text: 'Mi hijo tenía otitis a cada rato. La doctora nos explicó todo con calma y desde entonces está mucho mejor.',
  },
];
