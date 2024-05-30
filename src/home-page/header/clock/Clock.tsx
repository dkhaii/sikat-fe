import React from 'react';
import './Clock.css';

// type ClockProps = {
//   time: string;
// };

const Clock = () => {
  return (
    <div className="clock-container">
      <div className="day-container">
        <h2>Wednesday, 07 Maret 2024</h2>
      </div>
      <div className="time-container">
        <h1>10 : 52</h1>
      </div>
      <div className="datatime-container">
        <h6>Last Updated At -- 3m25s</h6>
        <h6>Time Stamp -- 3/28/2024 09:52:00</h6>
      </div>
    </div>
  );
};

export default Clock;
