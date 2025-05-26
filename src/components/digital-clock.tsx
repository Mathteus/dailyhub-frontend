import type React from 'react';
import { useState, useEffect } from 'react';
import { useTimeContext } from '../contexts/time-context';
import { Clock } from 'lucide-react';

interface DigitalClockProps {
  size?: number;
}

export function DigitalClock({ size = 120 }: DigitalClockProps) {
  const [time, setTime] = useState<string>('');
  const { timezone } = useTimeContext();
  const [responsiveSize, setResponsiveSize] = useState(size);
  
  useEffect(() => {
    // Calculate responsive size based on viewport width
    const calculateSize = () => {
      const newSize = Math.min(size, Math.floor(window.innerWidth / 8));
      setResponsiveSize(newSize);
    };
    
    // Calculate on mount
    calculateSize();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateSize);
    return () => window.removeEventListener('resize', calculateSize);
  }, [size]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format the time according to the selected timezone
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: timezone
      };
      
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    // Update immediately
    updateTime();
    
    // Update every second
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, [timezone]);

  const fontSize = Math.max(14, Math.floor(responsiveSize / 4));

  return (
    <div 
      className="px-8 flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        width: responsiveSize, 
        height: responsiveSize 
      }}
    >
      <Clock className="text-white mb-1" size={responsiveSize * 0.3} />
      <span 
        className="text-white font-bold text-center mx-4" 
        style={{ fontSize: `${fontSize}px` }}
      >
        {time}
      </span>
    </div>
  );
};
