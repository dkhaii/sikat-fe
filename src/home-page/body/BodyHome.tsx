import React from 'react';
import FingerPrintTable from './fingerprint-table/FingerPrintTable';
import './BodyHome.css';
import { useGetDayShiftFingerData } from '../../common/services/finger-presence/useGetDayShiftFingerData';
import { useGetNightShiftFingerData } from '../../common/services/finger-presence/useGetNightShiftFingerData';
import { useGetMcuReminder } from '../../common/services/mcu-reminder/useGetMcuReminder';
import McuReminderTable from './mcu-table/McuReminderTable';
import { useGetRosterPerDay } from '../../common/services/shift-roster/useGetRosterPerDay';
import { ShiftRoster } from '../../common/services/shift-roster/types';
import { FingerData } from '../../common/services/finger-presence/types';
import { Employee } from '../../common/services/employee/types';
import { useGetSteadyDayRosterPerDay } from '../../common/services/shift-roster/useGetSteadyDayRosterPerDay';

const BodyHome = () => {
  const [shiftType, setShiftType] = React.useState<string>('');
  const { data: rosterData } = useGetRosterPerDay();
  const { data: rosterSteadyDayData } = useGetSteadyDayRosterPerDay();
  const { data: dayShiftFingerData } = useGetDayShiftFingerData();
  const { data: nightShiftFingerData } = useGetNightShiftFingerData();
  const { data: mcuReminderData } = useGetMcuReminder();

  const updateShiftType = () => {
    const currentDate = new Date();
    const isDayShift =
      currentDate.getHours() >= 7 && currentDate.getHours() < 19;
    const newShiftType = isDayShift ? 'day' : 'night';
    setShiftType(newShiftType);
  };

  const getShiftEmployeeDatas = (shiftRoster: ShiftRoster[]) => {
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

  const shiftEmployeeDatas = getShiftEmployeeDatas(rosterData || []);
  // console.log('getShiftEmployeeDatas: ', shiftEmployeeDatas);

  const employeesOnly = shiftEmployeeDatas.flatMap(
    (shift) => shift.crew.employees || []
  );
  // console.log('getShiftEmployeeDatas setelah di map: ', employeesOnly);

  React.useEffect(() => {
    updateShiftType();
    const interval = setInterval(async () => {
      updateShiftType();
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearInterval(interval);
  }, [shiftType]);

  const fingerData =
    shiftType === 'day' ? dayShiftFingerData : nightShiftFingerData;
  // console.log('fingerData body home: ', fingerData);

  const updateEmployeesWithFingerData = (employees: Partial<Employee>[]) => {
    const updatedData = employees.map((emp) => {
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
            position: matchingFingerData.position,
            crew: matchingFingerData.crew,
            pit: matchingFingerData.pit,
            absent: false,
            isLate: matchingFingerData.isLate,
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
            isLate: false,
          } as FingerData);
    });

    // Sort data so absent employees appear at the bottom
    return updatedData.sort((a, b) => {
      if (a.absent && !b.absent) return 1;
      if (!a.absent && b.absent) return -1;
      return 0;
    });
  };

  const updatedEmployeesOnly = updateEmployeesWithFingerData(employeesOnly);
  // console.log('updatedEmployeesOnly: ', updatedEmployeesOnly);

  const updateSteadyDayEmployeesWithFingerData = (
    employees: Partial<Employee>[]
  ) => {
    const updatedData = employees.map((emp) => {
      const matchingFingerData = dayShiftFingerData?.find(
        (fd) => fd.fsCardNo === emp.id
      );
      return matchingFingerData
        ? ({
            fsCardNo: matchingFingerData.fsCardNo,
            fsName: matchingFingerData.fsName,
            ftTime: matchingFingerData.ftTime,
            fsLocation: matchingFingerData.fsLocation,
            fcDirFlag: matchingFingerData.fcDirFlag,
            position: matchingFingerData.position,
            crew: matchingFingerData.crew,
            pit: matchingFingerData.pit,
            absent: false,
            isLate: matchingFingerData.isLate,
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
            isLate: false,
          } as FingerData);
    });

    // Sort data so absent employees appear at the bottom
    return updatedData.sort((a, b) => {
      if (a.absent && !b.absent) return 1;
      if (!a.absent && b.absent) return -1;
      return 0;
    });
  };

  const steadyDayEmployeesOnly = rosterSteadyDayData?.flatMap(
    (shift) => shift.crew.employees || []
  );

  const updatedSteadyDayEmployees = updateSteadyDayEmployeesWithFingerData(
    steadyDayEmployeesOnly || []
  );
  // console.log('updatedSteadyDayEmployees: ', updatedSteadyDayEmployees);

  const hatariData = updatedEmployeesOnly?.filter((fp) => fp.pit?.id === 2);
  // console.log('hatariData: ', hatariData);

  const bintangData = updatedEmployeesOnly?.filter((fp) => fp.pit?.id === 1);
  // console.log('bintangData: ', bintangData);

  const jupiterData = updatedEmployeesOnly?.filter((fp) => fp.pit?.id === 3);
  // console.log('jupiterData: ', jupiterData);

  const m2Data = updatedEmployeesOnly?.filter((fp) => fp.pit?.id === 4);
  // console.log('m2Data: ', m2Data);

  const steadyDay = updatedSteadyDayEmployees?.filter(
    (fp) => fp.crew?.id === 4
  );
  // console.log('steadyday: ', steadyDay);

  const sortedMCUDatas = (mcuReminderData || []).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="bodyhome-container">
      <div className="bodyhome-crewpit-container">
        <FingerPrintTable label="Hatari" fingerData={hatariData} />
        <FingerPrintTable label="Bintang" fingerData={bintangData} />
        <FingerPrintTable label="Jupiter" fingerData={jupiterData} />
      </div>
      <div className="bodyhome-stdday-mcu-container">
        <FingerPrintTable label="Floating" fingerData={m2Data} />
        <FingerPrintTable
          label="Steady Day"
          fingerData={shiftType === 'day' ? steadyDay : []}
        />
        <McuReminderTable label="MCU" mcuReminder={sortedMCUDatas || []} />
      </div>
    </div>
  );
};

export default BodyHome;
