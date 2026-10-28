export interface Education {
  title: string;
  /** Institution and dates. */
  subtitle: string;
}

export interface Doctor {
  /** Unique slug; identifies the doctor's profile modal. */
  id: string;
  name: string;
  specialty: string;
  cmp: string;
  rne: string;
  /** Photo for the staff card (path inside src/assets/images). */
  photo: string;
  /** Portrait for the profile modal. Falls back to `photo` while the file is missing. */
  profilePhoto?: string;
  bio: string;
  expertise: string[];
  education: Education[];
}

export const staffSection = {
  title: 'Nuestro staff médico',
  highlight: 'staff médico',
  subtitle: 'Conoce a los profesionales que ponen su experiencia y conocimiento al servicio de tu salud',
};

export const profileTabs = [
  { id: 'perfil', label: 'Perfil profesional' },
  { id: 'formacion', label: 'Formación académica' },
];

const drSattui: Doctor = {
  id: 'flavio-sattui',
  name: 'Dr. Flavio Sattui',
  specialty: 'Especialista en Ginecología y Obstetricia.',
  cmp: '84928',
  rne: '51134',
  photo: 'staff/flavio-sattui.png',
  profilePhoto: 'staff/flavio-sattui-profile.png',
  bio: 'Médico especialista en Ginecología y Obstetricia, con formación avanzada en Medicina Fetal y Reproducción Humana. Cuenta con experiencia clínica y quirúrgica en el manejo de embarazos de alto riesgo y diversas patologías ginecológicas.',
  expertise: ['Medicina Fetal', 'Cirugía Ginecológica', 'Endometriosis', 'Fertilidad y Reproducción Humana'],
  education: [
    {
      title: 'Especialización en Ginecología y Obstetricia',
      subtitle: 'Universidad Nacional de la Amazonía Peruana.',
    },
    { title: 'Máster Propio en Reproducción Humana', subtitle: 'Universitat de València, España.' },
    {
      title: 'Maestría en Medicina con mención en Ginecología y Obstetricia',
      subtitle: 'Universidad de San Martín de Porres.',
    },
    {
      title: 'Fellowship en Medicina Fetal',
      subtitle: 'Instituto Peruano de Medicina y Cirugía Fetal (USMP).',
    },
  ],
};

// Add the rest of the team here; the carousel arrows appear once the cards no longer fit.
export const staff: Doctor[] = [drSattui];

/** Each doctor once, so every profile modal is rendered a single time. */
export const uniqueDoctors = [...new Map(staff.map((doctor) => [doctor.id, doctor])).values()];

export const profileDialogId = (doctor: Doctor) => `perfil-${doctor.id}`;
