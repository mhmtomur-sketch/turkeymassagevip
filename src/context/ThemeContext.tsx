import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemePalette {
  name: string;
  primary: string;
  secondary: string;
  glow: string;
  border: string;
}

export const THEME_PALETTES: ThemePalette[] = [
  { name: 'Cyan Neon', primary: '#06b6d4', secondary: '#3b82f6', glow: 'rgba(6, 182, 212, 0.35)', border: 'rgba(6, 182, 212, 0.4)' },
  { name: 'Turkuaz Gold', primary: '#14b8a6', secondary: '#f59e0b', glow: 'rgba(20, 184, 166, 0.35)', border: 'rgba(20, 184, 166, 0.4)' },
  { name: 'Emerald Mint', primary: '#10b981', secondary: '#06b6d4', glow: 'rgba(16, 185, 129, 0.35)', border: 'rgba(16, 185, 129, 0.4)' },
  { name: 'Royal Gold', primary: '#eab308', secondary: '#f97316', glow: 'rgba(234, 179, 8, 0.35)', border: 'rgba(234, 179, 8, 0.4)' },
  { name: 'Sunset Amber', primary: '#f59e0b', secondary: '#ef4444', glow: 'rgba(245, 158, 11, 0.35)', border: 'rgba(245, 158, 11, 0.4)' },
  { name: 'Coral Rose', primary: '#f43f5e', secondary: '#fb7185', glow: 'rgba(244, 63, 94, 0.35)', border: 'rgba(244, 63, 94, 0.4)' },
  { name: 'Fuchsia Violet', primary: '#d946ef', secondary: '#8b5cf6', glow: 'rgba(217, 70, 239, 0.35)', border: 'rgba(217, 70, 239, 0.4)' },
  { name: 'Royal Purple', primary: '#8b5cf6', secondary: '#ec4899', glow: 'rgba(139, 92, 246, 0.35)', border: 'rgba(139, 92, 246, 0.4)' },
  { name: 'Electric Indigo', primary: '#6366f1', secondary: '#a855f7', glow: 'rgba(99, 102, 241, 0.35)', border: 'rgba(99, 102, 241, 0.4)' },
  { name: 'Deep Sapphire', primary: '#3b82f6', secondary: '#06b6d4', glow: 'rgba(59, 130, 246, 0.35)', border: 'rgba(59, 130, 246, 0.4)' }
];

interface ThemeContextType {
  currentPalette: ThemePalette;
  paletteIndex: number;
  setAutoCycle: (val: boolean) => void;
  autoCycle: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  currentPalette: THEME_PALETTES[0],
  paletteIndex: 0,
  setAutoCycle: () => {},
  autoCycle: true
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [autoCycle, setAutoCycle] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !autoCycle) return;

    const interval = setInterval(() => {
      setPaletteIndex((prev) => (prev + 1) % THEME_PALETTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoCycle]);

  const currentPalette = THEME_PALETTES[paletteIndex];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-primary', currentPalette.primary);
    root.style.setProperty('--accent-secondary', currentPalette.secondary);
    root.style.setProperty('--accent-glow', currentPalette.glow);
    root.style.setProperty('--accent-border', currentPalette.border);
  }, [currentPalette]);

  return (
    <ThemeContext.Provider value={{ currentPalette, paletteIndex, setAutoCycle, autoCycle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
