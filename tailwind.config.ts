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
      },
      fontFamily: {
        mono: ['"VT323"', '"Space Mono"', 'monospace'],
        sans: ['"VT323"', 'Inter', 'system-ui', 'sans-serif'],
        bluescreen: ['"BlueScreen"', 'cursive'],
        marques: ['"MarquesRoundedDisco"', 'cursive'],
        ostro: ['"FS Ostro Display VF Regular"', 'serif'],
        sekuya: ['"Sekuya"', 'system-ui'],
        cree: ['"BJ Cree"', 'serif'],
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
