import React, { useState, useEffect } from 'react';

export function ReverseTimer({ milliseconds }) {
  const [remainingTime, setRemainingTime] = useState(milliseconds);

  useEffect(() => {
    let interval = null;
    if (remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prevRemainingTime => prevRemainingTime - 1000);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [remainingTime]);

  const hours = Math.floor(remainingTime / 3600000);
  const minutes = Math.floor((remainingTime % 3600000) / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);
  const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div>
      {remainingTime > 0 ? `: ${timeStr}` : ': 00:00:00'}
    </div>
  );
}
