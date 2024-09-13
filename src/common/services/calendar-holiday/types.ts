export type CalendarHoliday = {
  id?: number;
  date: Date;
  name: string;
};

export type CalendarHolidayRequest = {
  id?: number;
  date: string;
  name: string;
};
