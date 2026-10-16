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

export const concerns: Concern[] = [
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
];
