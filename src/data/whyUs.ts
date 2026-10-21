export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export const whyUsSection = {
  title: '¿Por qué elegirnos? Conoce nuestro enfoque de atención',
  highlight: 'enfoque de atención',
  subtitle: 'Recibe orientación médica especializada y una atención virtual adaptada a tus necesidades.',
};

// The first two icons are shared with the Hero highlights.
export const features: Feature[] = [
  {
    icon: '/images/icons/personalized-care.svg',
    title: 'Atención personalizada',
    description: 'Cada consulta se adapta a tus síntomas, antecedentes y necesidades particulares.',
  },
  {
    icon: '/images/icons/clear-guidance.svg',
    title: 'Comunicación clara',
    description: 'Recibe explicaciones sencillas para comprender mejor tu salud y resolver tus dudas.',
  },
  {
    icon: '/images/icons/flexibility.svg',
    title: 'Comodidad y flexibilidad',
    description: 'Coordina tu consulta virtual sin desplazarte y desde el lugar donde te encuentres.',
  },
  {
    icon: '/images/icons/medical-support.svg',
    title: 'Acompañamiento médico',
    description: 'Recibe orientación sobre las alternativas de atención y los pasos a seguir según tu caso.',
  },
];
