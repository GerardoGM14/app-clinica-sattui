// Date ranges used by the agenda and the consultorio (local time, weeks start on Monday).

export const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

export const startOfWeek = (date: Date) => {
  const day = startOfDay(date);
  return addDays(day, -((day.getDay() + 6) % 7));
};

export const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);

export const addMonths = (date: Date, months: number) => new Date(date.getFullYear(), date.getMonth() + months, 1);

export const isSameDay = (a: Date, b: Date) => startOfDay(a).getTime() === startOfDay(b).getTime();
