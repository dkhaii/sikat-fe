import React from 'react';
import './FingerPrintTable.css';

type FingerPrintTableProps = {
  label: string;
};

const FingerPrintTable = ({ label }: FingerPrintTableProps) => {
  return (
    <div className="fingerprint-table-container">
      <div className="fptable-label-container">
        <h1>{label}</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th>Badge</th>
            <th>Name</th>
            <th>Position</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>17303</th>
            <th className="fptable-name-text">Heru Siswanto</th>
            <th>Supervisor</th>
            <th>Present</th>
          </tr>
          <tr>
            <th>17303</th>
            <th className="fptable-name-text">Heru Siswanto</th>
            <th>Supervisor</th>
            <th>Present</th>
          </tr>
          <tr>
            <th>17303</th>
            <th className="fptable-name-text">Heru Siswanto</th>
            <th>Supervisor</th>
            <th>Present</th>
          </tr>
          <tr>
            <th>17303</th>
            <th className="fptable-name-text">Heru Siswanto</th>
            <th>Supervisor</th>
            <th>Present</th>
          </tr>
          <tr>
            <th>17303</th>
            <th className="fptable-name-text">Heru Siswanto</th>
            <th>Supervisor</th>
            <th>Present</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FingerPrintTable;
