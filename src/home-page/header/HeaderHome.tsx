import React from 'react';
import Clock from './clock/Clock';
import './Header.css';
import ShiftInfo from './shift-info/ShiftInfo';
import SummaryInfo from './summary-info/SummaryInfo';

const HeaderHome = () => {
  return (
    <section className="homepage-header-container">
      <div>
        <ShiftInfo />
      </div>
      <div className="clock-container">
        <Clock />
      </div>
      <div className='crew-summary-container'>
        <SummaryInfo />
      </div>
    </section>
  );
};

export default HeaderHome;
