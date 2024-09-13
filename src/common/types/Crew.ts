import {
  Employee,
  // EmployeePartial
} from '../services/employee/types';

export type Crew = {
  id: number;
  name: string;
  employees?: Partial<Employee>[];
};
