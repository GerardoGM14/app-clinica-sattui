// Medical specialties offered on the site. Sections with content per specialty
// (Concerns, Services) show one tab for each, in this order.
export type SpecialtyId = 'ginecologia' | 'otorrinolaringologia';

export interface Specialty {
  id: SpecialtyId;
  label: string;
}

export const specialties: Specialty[] = [
  { id: 'ginecologia', label: 'Ginecología y Obstetricia' },
  { id: 'otorrinolaringologia', label: 'Otorrinolaringología' },
];
