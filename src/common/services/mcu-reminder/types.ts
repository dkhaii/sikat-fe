import { Employee } from '../employee/types';

export type McuReminder = {
  id: number;
  empID: string;
  date: Date;
  isProceed: boolean;
  employee?: Partial<Employee>;
};

export type McuReminderDto = {
  empID: string;
  date: string;
};

export type EditMcuReminderDto = {
  date: string;
};
