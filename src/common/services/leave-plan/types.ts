import { LeaveStatus } from '../../types/LeaveStatus';
import { Employee } from '../employee/types';

export type LeavePlan = {
  id?: number;
  employeeID: string;
  startDate: Date;
  endDate: Date;
  leaveStatusID: number;
  isApproved?: boolean;
  formCuti?: string;
  createdAt: Date;
  updatedAt: Date;
  leaveStatus?: LeaveStatus;
  employee?: Partial<Employee>;
};

export type CreateLeavePlanRequest = {
  employeeID: string;
  startDate: string;
  endDate: string;
  leaveStatusID: string;
  formCuti?: File;
};
