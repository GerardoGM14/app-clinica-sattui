import type { IconName } from '@components/ui/icons';

export interface BookingStep {
  title: string;
  description: string;
}

export interface PaymentMethod {
  label: string;
  /** Brand logo image, or a generic icon when there is no logo. */
  logo?: string;
  icon?: IconName;
}

export const bookingSection = {
  title: 'Agenda tu consulta en pocos pasos',
  highlight: 'pocos pasos',
  subtitle: 'Coordina tu consulta virtual en unos sencillos pasos.',
  ctaLabel: 'Agendar consulta',
  image: {
    src: 'booking/booking-patient.png',
    alt: 'Paciente embarazada sonriendo mientras revisa su celular',
  },
  decoration: '/images/booking/booking-decoration.svg',
};

export const bookingSteps: BookingStep[] = [
  {
    title: 'Escríbenos por WhatsApp',
    description: 'Contáctanos para solicitar información y coordinar tu cita médica.',
  },
  {
    title: 'Coordina tu consulta',
    description: 'Indica tu disponibilidad y confirma la fecha y hora de tu atención virtual.',
  },
  {
    title: 'Realiza el pago',
    description: 'Utiliza uno de los medios de pago disponibles y envía el comprobante según las indicaciones recibidas.',
  },
  {
    title: 'Recibe los datos de tu consulta',
    description: 'Una vez confirmada tu cita, recibe las indicaciones para conectarte a tu consulta virtual.',
  },
];

export const paymentInfo = {
  title: 'Métodos de pago',
  description: 'Puedes realizar el pago mediante los siguientes medios habilitados.',
  methods: [
    { label: 'Yape', logo: '/images/payments/yape.png' },
    { label: 'Plin', logo: '/images/payments/plin.png' },
    { label: 'Transferencia', icon: 'bank' },
  ] satisfies PaymentMethod[],
};
