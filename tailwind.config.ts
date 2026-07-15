import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: '#ff8100',
        // CRT palette — warm tones only; no pure whites or cool grays.
        crt: {
          bright: '#f2e8d8', // headings ("white" on a warm tube)
          text: '#c9b8a2',   // body text
          dim: '#9b8b76',    // secondary text, icons
          faint: '#6b5d4b',  // hints, numbers, disabled
          green: '#6dff8c',  // phosphor green for terminal semantics
        },
      },
      fontFamily: {
        mono: ['"VT323"', 'ui-monospace', 'monospace'],
        sans: ['"VT323"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        grid: {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.6s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.6s ease-out forwards',
        grid: 'grid 15s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
