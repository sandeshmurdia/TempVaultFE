import React, { useState, useEffect } from 'react';

export function ReverseTimer({ milliseconds }) {
  const [remainingTime, setRemainingTime] = useState(milliseconds);

  useEffect(() => {
    let interval = progress;
    if (remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(remainingTime / 3600000);
  const minutes = Math.floor((remainingTime % 3600000) / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);
  const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const progress = (remainingTime / milliseconds) * 100;

  

  const progressBarStyles = {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '5px',
    background: 'linear-gradient(87.96deg, #9f25ff 6.22%, #2548ff 104.21%)',
    width: `${progress}%`,
    transition: 'width 0.5s linear',
  };

  return (
    <div>      
      <div className="progress-bar" style={progressBarStyles}></div>
      {remainingTime > 0 ? `: ${timeStr}` : ': 00:00:00'}
    </div>
  );
}
