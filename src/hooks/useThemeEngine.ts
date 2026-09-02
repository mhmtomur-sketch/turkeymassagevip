import { useEffect, useState } from 'react';

export interface ThemeColor {
  name: string;
  primary: string;
  secondary: string;
  glow: string;
}

export const THEME_SPECTRUM: ThemeColor[] = [
  { name: 'Cyan / Turkuaz', primary: '#06b6d4', secondary: '#3b82f6', glow: 'rgba(6, 182, 212, 0.45)' },
  { name: 'Turkuaz / Mint', primary: '#14b8a6', secondary: '#06b6d4', glow: 'rgba(20, 184, 166, 0.45)' },
  { name: 'Mavi / İndigo', primary: '#3b82f6', secondary: '#6366f1', glow: 'rgba(59, 130, 246, 0.45)' },
  { name: 'Mor / Ametist', primary: '#8b5cf6', secondary: '#d946ef', glow: 'rgba(139, 92, 246, 0.45)' },
  { name: 'Fuşya / Pembe', primary: '#d946ef', secondary: '#ec4899', glow: 'rgba(217, 70, 239, 0.45)' },
  { name: 'Lüks Pembe', primary: '#ec4899', secondary: '#f43f5e', glow: 'rgba(236, 72, 153, 0.45)' },
  { name: 'Yakut Kırmızı', primary: '#ef4444', secondary: '#f97316', glow: 'rgba(239, 68, 68, 0.45)' },
  { name: 'Turuncu / Amber', primary: '#f97316', secondary: '#f59e0b', glow: 'rgba(249, 115, 22, 0.45)' },
  { name: 'Altın Amber', primary: '#f59e0b', secondary: '#eab308', glow: 'rgba(245, 158, 11, 0.45)' },
  { name: 'Vip Sarı Altın', primary: '#eab308', secondary: '#84cc16', glow: 'rgba(234, 179, 8, 0.45)' },
  { name: 'Lime / Neon Yeşil', primary: '#84cc16', secondary: '#10b981', glow: 'rgba(132, 204, 22, 0.45)' },
  { name: 'Zümrüt Yeşil', primary: '#10b981', secondary: '#06b6d4', glow: 'rgba(16, 185, 129, 0.45)' },
  { name: 'Taze Mint', primary: '#2dd4bf', secondary: '#38bdf8', glow: 'rgba(45, 212, 191, 0.45)' },
  { name: 'Kraliyet İndigo', primary: '#6366f1', secondary: '#8b5cf6', glow: 'rgba(99, 102, 241, 0.45)' },
];

export function useThemeEngine(intervalSeconds = 5) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const currentColor = THEME_SPECTRUM[currentIndex];
    const root = document.documentElement;
    root.style.setProperty('--accent-primary', currentColor.primary);
    root.style.setProperty('--accent-secondary', currentColor.secondary);
    root.style.setProperty('--accent-glow', currentColor.glow);
  }, [currentIndex]);

  useEffect(() => {
    if (!isEnabled) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % THEME_SPECTRUM.length);
    }, intervalSeconds * 1000);

    return () => clearInterval(timer);
  }, [isEnabled, intervalSeconds]);

  return {
    currentColor: THEME_SPECTRUM[currentIndex],
    currentIndex,
    isEnabled,
    setIsEnabled,
    setColorByIndex: (index: number) => setCurrentIndex(index % THEME_SPECTRUM.length),
  };
}
