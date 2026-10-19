// Content for the "¿Qué podrían indicar tus síntomas?" questionnaire.
// Scoring rules live in src/lib/quiz/evaluate.ts.

export const quizIntro = {
  title: '¿Qué podrían indicar tus síntomas?',
  highlight: 'indicar tus síntomas?',
  description:
    'Responde 6 preguntas breves para conocer qué podría estar relacionado con tus molestias y recibir una orientación inicial sobre tu salud íntima.',
  badges: ['6 Preguntas', 'Solo 3 minutos', 'Respuestas anónimas'],
  ctaLabel: 'Iniciar cuestionario',
  disclaimer:
    '*Este cuestionario es orientativo y no sustituye una evaluación médica ni permite establecer un diagnóstico.',
  icon: '/images/icons/quiz-questions.svg',
  background: 'quiz/quiz-background.png',
};

export interface QuizOption {
  letter: string;
  label: string;
  score: number;
}

// Every question uses the same frequency scale, as in the design.
export const quizOptions: QuizOption[] = [
  { letter: 'A', label: 'Sí, frecuentemente', score: 3 },
  { letter: 'B', label: 'A veces', score: 2 },
  { letter: 'C', label: 'Rara vez', score: 1 },
  { letter: 'D', label: 'No', score: 0 },
];

export type QuestionId = 'itching' | 'odor' | 'discharge' | 'painfulUrination' | 'pelvicPain' | 'bleeding';

export interface QuizQuestion {
  id: QuestionId;
  text: string;
}

export const quizQuestions: QuizQuestion[] = [
  { id: 'itching', text: '¿Sientes picazón, ardor o irritación en tu zona íntima?' },
  { id: 'odor', text: '¿Has percibido un olor vaginal más fuerte o diferente al habitual?' },
  { id: 'discharge', text: '¿Has notado cambios en tu flujo vaginal, como color, cantidad o textura?' },
  { id: 'painfulUrination', text: '¿Sientes dolor o ardor al orinar o durante las relaciones sexuales?' },
  { id: 'pelvicPain', text: '¿Tienes dolor pélvico o en la parte baja del abdomen?' },
  { id: 'bleeding', text: '¿Has tenido sangrados fuera de tu periodo menstrual?' },
];

export type ResultId = 'priority' | 'pain' | 'flora' | 'irritation' | 'noAlerts';

export interface QuizAction {
  /** "avoid" shows a gold ✕, "do" shows a blue ✓. */
  type: 'avoid' | 'do';
  text: string;
}

export interface QuizResult {
  title: string;
  description: string;
  actions: QuizAction[];
}

export const quizResultsIntro = {
  badge: 'Tu Resultado',
  actionsTitle: '¿Qué puedes hacer ahora?',
  includeAnswersLabel: 'Quiero incluir mis respuestas del cuestionario en el mensaje para agendar consulta',
  ctaLabel: 'Agendar consulta',
  restartLabel: 'Reiniciar Cuestionario',
  icon: '/images/icons/quiz-result.svg',
};

export const quizResults: Record<ResultId, QuizResult> = {
  priority: {
    title: 'Tus síntomas necesitan atención pronto',
    description:
      'Tus respuestas indican sangrados fuera de tu periodo o un dolor pélvico frecuente. Estos síntomas pueden tener distintas causas y es importante que un especialista los evalúe a la brevedad.',
    actions: [
      { type: 'avoid', text: 'No esperes a que los síntomas desaparezcan por sí solos.' },
      { type: 'avoid', text: 'No te automediques ni uses tratamientos sin indicación médica.' },
      { type: 'do', text: 'Si tienes sangrado abundante, dolor intenso o fiebre, acude a un servicio de emergencia.' },
      { type: 'do', text: 'Agenda una consulta para recibir orientación y saber si necesitas una evaluación presencial.' },
    ],
  },
  pain: {
    title: 'Conviene evaluar el dolor que sientes',
    description:
      'Tus respuestas indican dolor o ardor al orinar, durante las relaciones o en la zona pélvica. Esto podría relacionarse con una infección urinaria, una inflamación o irritación de la zona íntima.',
    actions: [
      { type: 'avoid', text: 'Evita retener la orina por periodos largos.' },
      { type: 'avoid', text: 'No te automediques ni uses tratamientos sin indicación médica.' },
      { type: 'do', text: 'Agenda una consulta virtual para recibir orientación y saber si necesitas exámenes.' },
    ],
  },
  flora: {
    title: 'Podría haber un desequilibrio en tu flora íntima',
    description:
      'Tus respuestas indican cambios en el olor o en el flujo vaginal. Esto podría relacionarse con un desequilibrio de la flora vaginal o con una infección que conviene identificar.',
    actions: [
      { type: 'avoid', text: 'Evita las duchas vaginales y los productos perfumados en tu zona íntima.' },
      { type: 'avoid', text: 'No te automediques ni uses tratamientos sin indicación médica.' },
      { type: 'do', text: 'Agenda una consulta virtual para recibir orientación y saber si necesitas una evaluación presencial.' },
    ],
  },
  // This copy is the example shown in the Figma design.
  irritation: {
    title: 'Hay una molestia que conviene revisar',
    description:
      'Tus respuestas indican picazón o irritación íntima sin otros síntomas destacados. Esto podría relacionarse con una infección por hongos, productos irritantes o cambios hormonales.',
    actions: [
      { type: 'avoid', text: 'Evita usar jabones perfumados u otros productos irritantes en tu zona íntima.' },
      { type: 'avoid', text: 'No te automediques ni uses tratamientos sin indicación médica.' },
      { type: 'do', text: 'Agenda una consulta virtual para recibir orientación y saber si necesitas una evaluación presencial.' },
    ],
  },
  noAlerts: {
    title: 'No se identifican señales de alerta',
    description:
      'Tus respuestas no muestran síntomas frecuentes. Aun así, los controles ginecológicos periódicos son la mejor forma de cuidar tu salud íntima.',
    actions: [
      { type: 'avoid', text: 'No dejes pasar molestias nuevas o que se repitan con el tiempo.' },
      { type: 'do', text: 'Mantén tus controles ginecológicos al día.' },
      { type: 'do', text: 'Si tienes alguna duda, agenda una consulta virtual y conversemos.' },
    ],
  },
};
