/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090e',
          900: '#0b0f19',
          850: '#101626',
          800: '#151d32',
          700: '#1c2642',
          600: '#27355a',
        },
        accent: {
          primary: 'var(--accent-primary, #06b6d4)',
          secondary: 'var(--accent-secondary, #3b82f6)',
          glow: 'var(--accent-glow, rgba(6, 182, 212, 0.4))',
        },
        vip: {
          diamond: '#38bdf8',
          premium: '#ec4899',
          gold: '#eab308',
          silver: '#94a3b8',
        }
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '4/5': '4 / 5',
        'portrait': '3 / 4',
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px var(--accent-glow, rgba(6, 182, 212, 0.3))',
        'glow-md': '0 0 25px -5px var(--accent-glow, rgba(6, 182, 212, 0.4))',
        'glow-lg': '0 0 40px -10px var(--accent-glow, rgba(6, 182, 212, 0.5))',
        'diamond-glow': '0 0 30px -5px rgba(56, 189, 248, 0.5)',
        'premium-glow': '0 0 30px -5px rgba(236, 72, 153, 0.5)',
        'gold-glow': '0 0 30px -5px rgba(234, 179, 8, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
