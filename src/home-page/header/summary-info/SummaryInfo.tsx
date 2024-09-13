import React from 'react';
import './SummaryInfo.css';
import SummaryInfoCard from './summary-info-card/SummaryInfoCard';
import { useGetRosterPerDay } from '../../../common/services/shift-roster/useGetRosterPerDay';
import { ShiftRoster } from '../../../common/services/shift-roster/types';
import { useGetDayShiftFingerData } from '../../../common/services/finger-presence/useGetDayShiftFingerData';
import { useGetNightShiftFingerData } from '../../../common/services/finger-presence/useGetNightShiftFingerData';
import { Employee } from '../../../common/services/employee/types';
import { FingerData } from '../../../common/services/finger-presence/types';
import {
  CheckSquareTwoTone,
  CloseSquareTwoTone,
  WarningTwoTone,
} from '@ant-design/icons';

const SummaryInfo = () => {
  const { data: rosterData } = useGetRosterPerDay();
  const { data: dayShiftFingerData } = useGetDayShiftFingerData();
  const { data: nightShiftFingerData } = useGetNightShiftFingerData();

  const [totalCrew, setTotalCrew] = React.useState(0);
  const [present, setPresent] = React.useState(0);
  const [late, setLate] = React.useState(0);
  const [absent, setAbsent] = React.useState(0);

  const updateShiftType = (shiftRoster: ShiftRoster[]) => {
    const currentDate = new Date();
    const isDayShift =
      currentDate.getHours() >= 7 && currentDate.getHours() < 19;
    return isDayShift
      ? shiftRoster.filter(
          (shift) => shift.workShift.name.toLowerCase() === 'day'
        )
      : shiftRoster.filter(
          (shift) => shift.workShift.name.toLowerCase() === 'night'
        );
  };

  const calculateCrewStats = React.useCallback(
    (shiftRoster: ShiftRoster[]) => {
      const currentShift = updateShiftType(shiftRoster);
      // console.log('currentShift: ', currentShift);

      const total = currentShift.reduce(
        (acc, shift) => acc + (shift.crew.employees?.length || 0),
        0
      );
      const employeesOnly = currentShift.flatMap(
        (shift) => shift.crew.employees || []
      );
      // const total = employeesOnly.length;
      const currentDate = new Date();
      const isDayShift =
        currentDate.getHours() >= 7 && currentDate.getHours() < 19;

      const fingerData = isDayShift ? dayShiftFingerData : nightShiftFingerData;

      const updateEmployeesWithFingerData = (
        employees: Partial<Employee>[]
      ) => {
        return employees.map((emp) => {
          const matchingFingerData = fingerData?.find(
            (fd) => fd.fsCardNo === emp.id
          );
          return matchingFingerData
            ? ({
                fsCardNo: matchingFingerData.fsCardNo,
                fsName: matchingFingerData.fsName,
                ftTime: matchingFingerData.ftTime,
                fsLocation: matchingFingerData.fsLocation,
                fcDirFlag: matchingFingerData.fcDirFlag,
                isLate: matchingFingerData.isLate,
                position: matchingFingerData.position,
                crew: matchingFingerData.crew,
                pit: matchingFingerData.pit,
                absent: false,
              } as FingerData)
            : ({
                fsCardNo: emp.id,
                fsName: emp.name,
                ftTime: new Date(),
                fsLocation: '',
                fcDirFlag: '',
                position: emp.position,
                crew: emp.crew,
                pit: emp.pit,
                absent: true,
              } as FingerData);
        });
      };

      const updatedEmployeesOnly = updateEmployeesWithFingerData(employeesOnly);
      // console.log('updatedEmployeesOnly: ', updatedEmployeesOnly);

      // const operatorFingerData = fingerData?.filter(
      //   (fp) => fp.pit?.id && fp.crew?.id
      // );
      // console.log('operatorFingerData: ', operatorFingerData);

      // const presentCount = operatorFingerData?.length || 0;
      const presentCount = updatedEmployeesOnly?.filter(
        (fp) => fp.absent === false && fp.isLate === false
      );
      // console.log('presentCount: ', presentCount?.length);

      const absentCount = updatedEmployeesOnly?.filter(
        (fp) => fp.absent === true
      );
      // console.log('absentCount: ', absentCount);

      // const absentCount = absent?.length;
      const lateCount = updatedEmployeesOnly?.filter(
        (fp) => fp.isLate === true
      );

      setTotalCrew(total);
      setPresent(presentCount?.length || 0);
      setAbsent(absentCount?.length || 0);
      setLate(lateCount.length);
    },
    [dayShiftFingerData, nightShiftFingerData]
  );

  React.useEffect(() => {
    if (rosterData) {
      calculateCrewStats(rosterData);
    }
  }, [rosterData, calculateCrewStats]);

  return (
    <>
      <div className="crew-sumary-title">
        <h1>CREW SUMMARY</h1>
      </div>
      <div className="summaryinfo-container">
        <div className="legend-info-lateness">
          <SummaryInfoCard total={totalCrew} label="Total Personel" />
          <div className="legend-info-lateness-present">
            <SummaryInfoCard total={present} label="Present" />
            <CheckSquareTwoTone
              twoToneColor={'#14A44D'}
              style={{ fontSize: '1.3rem' }}
            />
          </div>
          <div className="legend-info-lateness-late">
            <SummaryInfoCard total={late} label="Late" />
            <WarningTwoTone
              twoToneColor={'#E4A11B'}
              style={{ fontSize: '1.3rem' }}
            />
          </div>
          <div className="legend-info-lateness-absent">
            <SummaryInfoCard total={absent} label="Absent" />
            <CloseSquareTwoTone
              twoToneColor={'#DC4C64'}
              style={{ fontSize: '1.3rem' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryInfo;
