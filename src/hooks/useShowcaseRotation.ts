import { useState, useEffect } from 'react';
import { Profile } from '../types';

export function useShowcaseRotation(profiles: Profile[], intervalMs = 12000, isPaused = false) {
  const [rotatedList, setRotatedList] = useState<Profile[]>(profiles);

  useEffect(() => {
    setRotatedList(profiles);
  }, [profiles]);

  useEffect(() => {
    if (isPaused || rotatedList.length <= 1) return;

    const timer = setInterval(() => {
      setRotatedList((prev) => {
        if (prev.length <= 1) return prev;
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs, isPaused, rotatedList.length]);

  return rotatedList;
}
