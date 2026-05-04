import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          DEFAULT: "#F2A7B0",
          light: "#FAD4D9",
          dark: "#E08090",
        },
        "rose-gold": {
          DEFAULT: "#C9927A",
          light: "#E0B8A8",
          dark: "#A87060",
        },
        ivory: {
          DEFAULT: "#FDFAF7",
        },
        cream: {
          DEFAULT: "#F5EDE3",
        },
        "dusty-rose": {
          DEFAULT: "#D4A5A5",
        },
        charcoal: {
          DEFAULT: "#3D3235",
        },
        "soft-black": {
          DEFAULT: "#1A1215",
        },
        warm: {
          50: "#FDFAF7",
          100: "#F5EDE3",
          200: "#EDD9C8",
          300: "#E0C4AD",
          400: "#CEAA92",
          500: "#C9927A",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-md": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.2" }],
      },
      borderRadius: {
        brand: "2px",
      },
      boxShadow: {
        "brand-sm": "0 2px 12px rgba(60, 40, 40, 0.08)",
        brand: "0 4px 24px rgba(60, 40, 40, 0.10)",
        "brand-lg": "0 8px 40px rgba(60, 40, 40, 0.12)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
