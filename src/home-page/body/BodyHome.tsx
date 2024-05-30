import React from 'react';
import FingerPrintTable from './fingerprint-table/FingerPrintTable';
import './BodyHome.css';

const BodyHome = () => {
  return (
    <div className="bodyhome-container">
      <div className="bodyhome-crewpit-container">
        <FingerPrintTable label="Hatari" />
        <FingerPrintTable label="Bintang" />
        <FingerPrintTable label="Jupiter" />
      </div>
      <div className="bodyhome-stdday-mcu-container">
        <FingerPrintTable label="Specialist" />
        <FingerPrintTable label="MCU" />
      </div>
    </div>
  );
};

export default BodyHome;
