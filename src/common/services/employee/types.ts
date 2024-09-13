import { Base } from '../../types/Base';
import { Crew } from '../../types/Crew';
import { Pit } from '../../types/Pit';
import { Position } from '../../types/Position';
import { LeavePlan } from '../leave-plan/types';

export type Employee = {
  id: string;
  name: string;
  profilePicture?: string;
  dateOfBirth: Date;
  dateOfHire: Date;
  positionID: number;
  crewID?: number;
  pitID?: number;
  baseID?: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  position: Position;
  crew?: Crew;
  pit?: Pit;
  base?: Base;
  leavePlan?: LeavePlan[];
};

export type EmployeePartial = {
  id: string;
  name: string;
  position: Position;
  base?: Base;
  pit?: Pit;
};

export type AddEmployeeFormProps = {
  id: string;
  name: string;
  profilePicture?: File;
  dateOfBirth: string;
  dateOfHire: string;
  positionID: string;
  crewID?: string;
  pitID?: string;
  baseID?: string;
};

export type CombinedAddNewEmployeeRequest = {
  empDto: AddEmployeeFormProps;
  effectiveDate: string;
};

export type AddNewEmployeeRequest = {
  id: string;
  name: string;
  profilePicture?: File;
  dateOfBirth: string;
  dateOfHire: string;
  positionID: string;
  crewID?: string;
  pitID?: string;
  baseID?: string;
};

export type EditEmployeeFormProps = {
  name?: string;
  profilePicture?: File;
  dateOfBirth?: string;
  dateOfHire?: string;
  positionID?: number;
  crewID?: number;
  pitID?: number;
  baseID?: number;
};
