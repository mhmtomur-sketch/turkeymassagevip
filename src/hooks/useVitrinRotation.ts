import { useState, useEffect } from 'react';
import { Profile } from '../types';

export function useVitrinRotation(
  profiles: Profile[],
  intervalSeconds = 12,
  isPaused = false
) {
  const [rotatedList, setRotatedList] = useState<Profile[]>(profiles);
  const [shiftCount, setShiftCount] = useState(0);

  useEffect(() => {
    setRotatedList(profiles);
  }, [profiles]);

  useEffect(() => {
    if (isPaused || profiles.length <= 1 || intervalSeconds <= 0) return;

    const timer = setInterval(() => {
      setShiftCount((prev) => prev + 1);
      setRotatedList((current) => {
        if (current.length <= 1) return current;
        const first = current[0];
        return [...current.slice(1), first];
      });
    }, intervalSeconds * 1000);

    return () => clearInterval(timer);
  }, [isPaused, profiles.length, intervalSeconds]);

  return {
    rotatedList,
    shiftCount,
  };
}
