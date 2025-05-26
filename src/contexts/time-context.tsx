import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

type TimeContextType = {
  timezone: string;
  setTimezone: (tz: string) => void;
};

const TimeContext = createContext<TimeContextType>({
  timezone: 'America/Sao_Paulo',
  setTimezone: () => {},
});

export const useTimeContext = () => useContext(TimeContext);
interface TimeProps { children: React.ReactNode };

export function TimeProvider({ children }: TimeProps) {
  // Get saved timezone from localStorage or use default
  const [timezone, setTimezone] = useState<string>(() => {
    // const savedTimezone = localStorage.getItem('timezone');
    // return savedTimezone || 'America/Sao_Paulo';
    return 'America/Sao_Paulo';
  });

  // Save timezone to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem('timezone', timezone);
  // }, [timezone]);

  const value = {
    timezone,
    setTimezone,
  };

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};
