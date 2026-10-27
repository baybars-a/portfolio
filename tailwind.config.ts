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
          faint: '#8c7c66',  // hints — 4.9:1 on #0a0a0a (AA); use dim on the brown contact panel
          green: '#6dff8c',  // phosphor green for terminal semantics
        },
      },
      fontFamily: {
        mono: ['"VT323"', 'ui-monospace', 'monospace'],
        // Body copy stays readable; VT323 is for headings and terminal accents.
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
