import { Crew } from '../../types/Crew';
import { WorkShift } from '../../types/WorkShift';

export type ShiftRoster = {
  id?: number;
  crewID: number;
  date: Date;
  shiftTypeID: number;
  shiftCount: number;
  crew: Crew;
  workShift: WorkShift;
};

export type ShiftRosterSteadyDay = {
  id?: number;
  crewID: number;
  date: Date;
  shiftTypeID: number;
  crew: Crew;
  workShift: WorkShift;
};
