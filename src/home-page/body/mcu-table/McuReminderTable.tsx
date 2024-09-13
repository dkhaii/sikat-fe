// import React from 'react';
import './McuReminderTable.css';
import { McuReminder } from '../../../common/services/mcu-reminder/types';
import {
  formatDateNormalHelper,
} from '../../../common/services/helper';

type McuReminderTableProps = {
  label: string;
  mcuReminder?: McuReminder[];
};

const McuReminderTable = ({ label, mcuReminder }: McuReminderTableProps) => {
  // console.log('finger data: ', mcuReminder);

  return (
    <div className="mcu-table-container">
      <div className="mcutable-label-container">
        <h1>{label}</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th>Badge</th>
            <th>Name</th>
            <th>Position</th>
            <th>Crew</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {mcuReminder?.map((mcu) => (
            <tr key={mcu.empID}>
              <th>{mcu.empID}</th>
              <th className="mcutable-name-text">{mcu.employee?.name}</th>
              <th>{mcu.employee?.position?.name.toUpperCase()}</th>
              <th>{mcu.employee?.crew?.name.toUpperCase()}</th>
              <th>{formatDateNormalHelper(mcu.date.toString(), 'long')}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default McuReminderTable;
