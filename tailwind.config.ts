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
                            primary: "#E11D48",
                            secondary: "#0F172A",
                            accent: "#38BDF8",
                            background: "#F8FAFC",
                            surface: "#FFFFFF",
                  },
                  fontFamily: {
                            unbounded: ["var(--font-unbounded)", "sans-serif"],
                            manrope: ["var(--font-manrope)", "sans-serif"],
                            mono: ["var(--font-jetbrains)", "monospace"],
                  },
          },
    },
    plugins: [],
};

export default config;
