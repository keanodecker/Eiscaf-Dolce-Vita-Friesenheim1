import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        weiss: "#FFFFFF",
        mint: "#6FCFB5",
        "mint-soft": "#E8F6F1",
        rot: "#E63946",
        "rot-soft": "#FCE4E6",
        "creme-soft": "#FAF7F2",
        schokolade: "#2B2118",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        "soft-out": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
