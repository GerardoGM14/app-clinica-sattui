import type { SpecialtyId } from './specialties';

export interface Concern {
  title: string;
  description: string;
  image: string;
}

export const concernsSection = {
  title: '¿Hay algo de tu salud que te preocupa?',
  highlight: 'te preocupa?',
  subtitle: 'Conoce algunos motivos de consulta y encuentra orientación para dar el siguiente paso.',
};

export const concerns: Record<SpecialtyId, Concern[]> = {
  ginecologia: [
    {
      title: 'Molestias ginecológicas',
      description: '¿Sientes dolor pélvico, molestias íntimas o cambios que te preocupan? Conversemos sobre tus síntomas.',
      image: 'concerns/molestias-ginecologicas.png',
    },
    {
      title: 'Alteraciones menstruales',
      description: '¿Notas irregularidades o sangrados inusuales? Te ayudamos a conocer los pasos a seguir.',
      image: 'concerns/alteraciones-menstruales.png',
    },
    {
      title: 'Cambios hormonales',
      description: 'Comprende los cambios de tu cuerpo y encuentra orientación para manejar sus síntomas.',
      image: 'concerns/cambios-hormonales.png',
    },
    {
      title: 'Dudas sobre fertilidad',
      description: '¿Estás buscando un embarazo? Resuelve tus dudas y conoce más sobre tu salud reproductiva.',
      image: 'concerns/dudas-fertilidad.png',
    },
    {
      title: 'Acompañamiento durante el embarazo',
      description: 'Recibe orientación médica para resolver tus dudas y cuidar de tu salud durante esta etapa.',
      image: 'concerns/acompanamiento-embarazo.png',
    },
  ],
  // Images go in src/assets/images/concerns/otorrinolaringologia/ (blank until uploaded).
  otorrinolaringologia: [
    {
      title: 'Dolor o infección de oído',
      description: '¿Sientes dolor, presión o secreción en el oído? Conversemos sobre tus síntomas.',
      image: 'concerns/otorrinolaringologia/dolor-oido.png',
    },
    {
      title: 'Pérdida de audición y zumbidos',
      description: '¿Notas que escuchas menos o percibes un zumbido constante? Te ayudamos a conocer los pasos a seguir.',
      image: 'concerns/otorrinolaringologia/perdida-audicion.png',
    },
    {
      title: 'Mareos y vértigo',
      description: '¿Sientes que todo gira o pierdes el equilibrio? Recibe orientación para identificar la causa.',
      image: 'concerns/otorrinolaringologia/mareos-vertigo.png',
    },
    {
      title: 'Nariz tapada y sinusitis',
      description: '¿Te cuesta respirar por la nariz o tienes congestión frecuente? Encuentra orientación para aliviarlo.',
      image: 'concerns/otorrinolaringologia/nariz-sinusitis.png',
    },
    {
      title: 'Ronquera y molestias de garganta',
      description: '¿Tu voz cambió o el dolor al tragar se repite? Resuelve tus dudas y conoce su posible origen.',
      image: 'concerns/otorrinolaringologia/ronquera-garganta.png',
    },
  ],
};
