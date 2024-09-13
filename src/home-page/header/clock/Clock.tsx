import React from 'react';
import './Clock.css';

const Clock = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-GB', options);
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours} : ${minutes}`;
  };

  return (
    <div className="clock-container">
      <div className="day-container">
        <h2>{formatDate(time)}</h2>
      </div>
      <div className="time-container">
        <h1>{formatTime(time)}</h1>
      </div>
    </div>
  );
};

export default Clock;
