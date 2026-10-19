export interface Service {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const servicesSection = {
  title: 'Atención especializada para tu salud.',
  highlight: 'especializada',
  subtitle:
    'Recibe atención médica virtual y orientación especializada para cuidar tu salud, resolver tus dudas y conocer las opciones de atención según tus necesidades.',
};

export const services: Service[] = [
  {
    title: 'Ecografías especializadas',
    description:
      'Comprende mejor los resultados de tus ecografías genéticas, morfológicas y Doppler con orientación médica.',
    image: 'services/ecografias-especializadas.png',
    imageAlt: 'Doctora revisando una ecografía en el monitor',
  },
  {
    title: 'Fertilidad y medicina fetal',
    description:
      'Recibe acompañamiento especializado para resolver tus dudas sobre fertilidad y cuidados durante el embarazo.',
    image: 'services/fertilidad-medicina-fetal.png',
    imageAlt: 'Pareja sonriente mostrando una prueba de embarazo',
  },
  {
    title: 'Prevención y evaluación de precáncer',
    description: 'Conoce las medidas de prevención y los cuidados necesarios para proteger tu salud ginecológica.',
    image: 'services/prevencion-precancer.png',
    imageAlt: 'Modelo anatómico de útero junto a un lazo de prevención',
  },
  {
    title: 'Climaterio y menopausia',
    description:
      'Afronta los cambios de esta etapa con información clara sobre sus síntomas y las opciones para aliviarlos.',
    image: 'services/climaterio-menopausia.png',
    imageAlt: 'Mujer adulta en una consulta virtual desde su laptop',
  },
  {
    title: 'Infecciones recurrentes',
    description:
      'Encuentra orientación para comprender las infecciones que reaparecen y conocer las alternativas para tratarlas.',
    image: 'services/infecciones-recurrentes.png',
    imageAlt: 'Mujer con molestias abdominales frente a su laptop',
  },
  {
    title: 'Sangrado vaginal',
    description:
      'Conoce las posibles causas del sangrado vaginal anormal y descubre qué pasos seguir para evaluarlo.',
    image: 'services/sangrado-vaginal.png',
    imageAlt: 'Mujer sentada junto a un calendario menstrual',
  },
  {
    title: 'Atención de endometriosis',
    description:
      'Conoce más sobre la endometriosis, sus síntomas y las alternativas médicas para mejorar tu bienestar.',
    image: 'services/endometriosis.png',
    imageAlt: 'Mujer sosteniendo un modelo anatómico de útero',
  },
  {
    title: 'Síndrome Ovárico Metabólico Poliendocrino (SOMP)',
    description:
      'Conoce sus efectos en tu salud hormonal y las alternativas para controlar sus síntomas.',
    image: 'services/somp.png',
    imageAlt: 'Mujer sosteniendo un modelo anatómico del sistema reproductor',
  },
];
