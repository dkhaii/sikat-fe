import { Crew } from '../../types/Crew';
import { Pit } from '../../types/Pit';
import { Position } from '../../types/Position';

export type FingerPresence = {
  id?: number;
  fsCardNo: string;
  fsName: string;
  ftTime: Date;
  fsLocation: string;
  fcDirFlag: string;
  isProceed?: boolean;
};

export type FingerData = {
  id?: number;
  fsCardNo: string;
  fsName: string;
  ftTime: Date;
  fsLocation: string;
  fcDirFlag: string;
  isProceed?: boolean;
  isLate?: boolean;
  position: Position;
  crew?: Crew;
  pit?: Pit;
  absent?: boolean;
};

export interface FingerDataExtended extends FingerData {
  status: number;
}

export type FingerDataInitial = {
  id: string;
  name: string;
  status: string;
  isLate: boolean;
  pit?: Pit;
  crew: Crew;
  position: Position;
};

export type CombinedFingerData = {
  fsCardNo: string;
  fsName: string;
  ftTime: Date;
  fsLocation: string;
  fcDirFlag: string;
  pit: Pit;
  crew: Crew;
  position: Position;
  status: string;
};
