import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

/**
 * RealTimeClock Component
 * Fulfills SRS Requirement: "Display the current date and time using JavaScript."
 * Updates every second using a standard setInterval timer.
 */
export default function RealTimeClock() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Set up a timer to update the clock every 1 second (1000ms)
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // Format date and time in a clean, human-readable format
  const formattedDate = currentDateTime.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const formattedTime = currentDateTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="live-clock-badge" title="Live System Time">
      <Clock size={13} style={{ color: '#818cf8' }} />
      <span>{formattedDate} • {formattedTime}</span>
    </div>
  );
}
