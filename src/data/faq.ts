export interface FaqItem {
  question: string;
  answer: string;
}

export const faqSection = {
  title: 'Resolvemos tus dudas.',
  highlight: 'tus dudas.',
  subtitle: 'Encuentra información útil sobre la atención virtual, las citas y los medios de pago.',
  image: {
    src: 'faq/faq-couple.png',
    alt: 'Pareja sonriendo frente a una laptop durante una consulta virtual',
  },
};

// Answers are drafts written for the site; review them with the doctor before publishing.
export const faqItems: FaqItem[] = [
  {
    question: '¿Cómo puedo agendar una consulta?',
    answer:
      'Escríbenos por WhatsApp desde cualquiera de los botones "Agendar consulta". Te indicaremos los horarios disponibles, confirmaremos la fecha y hora de tu cita y te enviaremos las indicaciones de pago.',
  },
  {
    question: '¿Cómo se realiza la consulta virtual?',
    answer:
      'La consulta se realiza por videollamada. Una vez confirmada tu cita, recibirás el enlace y las indicaciones para conectarte desde tu celular o computadora el día de la atención.',
  },
  {
    question: '¿Qué métodos de pago están disponibles?',
    answer:
      'Puedes pagar mediante Yape, Plin o transferencia bancaria. Luego de realizar el pago, envía el comprobante por WhatsApp para confirmar tu cita.',
  },
  {
    question: '¿Qué debo tener preparado para mi consulta?',
    answer:
      'Busca un lugar privado y con buena conexión a internet. Ten a la mano tus exámenes o ecografías previas, la lista de medicamentos que tomas y la fecha de tu última menstruación.',
  },
  {
    question: '¿Puedo consultar por cualquier molestia ginecológica?',
    answer:
      'Sí, puedes consultar por la mayoría de molestias ginecológicas y obstétricas. Si tu caso requiere un examen físico o pruebas adicionales, te indicaremos los pasos para una evaluación presencial. Ante sangrado abundante, dolor intenso o fiebre, acude a un servicio de emergencia.',
  },
  {
    // TODO: add the real price, or keep this answer if it is shared only by WhatsApp.
    question: '¿Cuánto cuesta la consulta?',
    answer: 'Te informaremos el costo de la consulta al coordinar tu cita por WhatsApp, según el tipo de atención que necesites.',
  },
];
