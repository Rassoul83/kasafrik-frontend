import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ka: {
          gold: "#C8922A",
          "gold-light": "#F5E6C8",
          "gold-dark": "#8A6118",
          night: "#1A1A2E",
          "night-2": "#16213E",
          green: "#4A7C59",
          "green-light": "#D6EDE0",
          red: "#C84B2F",
          "red-light": "#FAE8E3",
          sand: "#F7F2EA",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
