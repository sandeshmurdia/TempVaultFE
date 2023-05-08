import { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ initialValue, lastValue, duration }) => {
  const [value, setValue] = useState(initialValue);
  const startTime = useRef(null);

  useEffect(() => {
    const step = (currentTime) => {
      if (!startTime.current) {
        startTime.current = currentTime;
      }

      const progress = Math.min((currentTime - startTime.current) / duration, 1);
      setValue(Math.floor(progress * (lastValue - initialValue) + initialValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        window.cancelAnimationFrame(window.requestAnimationFrame(step));
      }
    };

    window.requestAnimationFrame(step);
  }, [initialValue, lastValue, duration]);

  return <span>{value}</span>;
};

export default AnimatedCounter;
