import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { getAndIncrementVisitorCount } from '../utils/storage';

/**
 * VisitorCounter Component
 * Fulfills SRS Requirement: "Visitor Counter: The visitor counter is simulated using JavaScript and Local Storage."
 */
export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(12480);

  useEffect(() => {
    // Read count and increment from localStorage
    const count = getAndIncrementVisitorCount();
    setVisitorCount(count);
  }, []);

  return (
    <div className="visitor-counter-badge" title="Total Simulated Unique Portal Visits">
      <span className="live-indicator"></span>
      <Users size={13} style={{ color: 'var(--primary)' }} />
      <span>{visitorCount.toLocaleString()} Visits</span>
    </div>
  );
}
