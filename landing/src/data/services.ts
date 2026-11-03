import type { SpecialtyId } from './specialties';

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

export const services: Record<SpecialtyId, Service[]> = {
  ginecologia: [
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
  ],
  // Images go in src/assets/images/services/otorrinolaringologia/ (blank until uploaded).
  otorrinolaringologia: [
    {
      title: 'Salud del oído',
      description:
        'Evaluación del dolor de oído, infecciones y secreciones, y extracción de tapones de cerumen según tu caso.',
      image: 'services/otorrinolaringologia/salud-oido.png',
      imageAlt: 'Médico revisando el oído de un paciente',
    },
    {
      title: 'Audición y zumbidos',
      description:
        'Diagnóstico de la disminución de la audición y del tinnitus, con audiometría y timpanometría.',
      image: 'services/otorrinolaringologia/audicion-zumbidos.png',
      imageAlt: 'Paciente con audífonos durante una prueba de audición',
    },
    {
      title: 'Vértigo y equilibrio',
      description:
        'Evaluación de mareos, vértigo y trastornos del equilibrio para identificar su causa.',
      image: 'services/otorrinolaringologia/vertigo-equilibrio.png',
      imageAlt: 'Persona mareada sosteniendo su cabeza',
    },
    {
      title: 'Rinitis y sinusitis',
      description:
        'Diagnóstico y manejo de la congestión, la secreción nasal y las molestias que se repiten.',
      image: 'services/otorrinolaringologia/rinitis-sinusitis.png',
      imageAlt: 'Persona con congestión nasal sosteniendo un pañuelo',
    },
    {
      title: 'Obstrucción nasal y ronquidos',
      description:
        'Evaluación de la desviación del tabique, los ronquidos y la sospecha de apnea del sueño.',
      image: 'services/otorrinolaringologia/obstruccion-ronquidos.png',
      imageAlt: 'Persona roncando mientras duerme',
    },
    {
      title: 'Garganta y voz',
      description:
        'Evaluación de la ronquera, los cambios en la voz, la amigdalitis y la dificultad para tragar.',
      image: 'services/otorrinolaringologia/garganta-voz.png',
      imageAlt: 'Persona tocándose la garganta al hablar',
    },
    {
      title: 'Otorrinolaringología pediátrica',
      description:
        'Atención de otitis recurrentes, adenoides, amígdalas y respiración bucal en niños.',
      image: 'services/otorrinolaringologia/pediatria.png',
      imageAlt: 'Médico revisando el oído de un niño',
    },
    {
      title: 'Nasofibrolaringoscopia',
      description:
        'Exploración con cámara de la nariz, la garganta y las cuerdas vocales para un diagnóstico preciso.',
      image: 'services/otorrinolaringologia/nasofibrolaringoscopia.png',
      imageAlt: 'Especialista realizando una exploración con endoscopio',
    },
  ],
};
