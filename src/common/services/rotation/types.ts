import { Base } from '../../types/Base';
import { Crew } from '../../types/Crew';
import { Pit } from '../../types/Pit';
import { Position } from '../../types/Position';

export type Rotation = {
  employeeID: string;
  effectiveDate?: Date;
  endDate?: Date;
  positionID?: number;
  crewID?: number;
  pitID?: number;
  baseID?: number;
  position?: Position;
  crew?: Crew;
  pit?: Pit;
  base?: Base;
};

export type CreateRotationRequest = {
  employeeID: string;
  effectiveDate?: string;
  // endDate?: string;
  positionID?: number;
  crewID?: number;
  pitID?: number;
  baseID?: number;
};
