import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          yellow: "#ffec3d",
          gold: "#ffd600",
          "light-yellow": "#ffface",
          black: "#000000",
          white: "#FFFFFF",
          gray: "#111111",
          "gray-mid": "#1a1a1a",
        },
      },
      fontFamily: {
        display: ["var(--font-plus-jakarta)", "sans-serif"],
        body: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 20px #ffec3d44, 0 0 60px #ffec3d22, 0 0 100px #ffec3d11",
          },
          "50%": {
            boxShadow:
              "0 0 40px #ffec3d88, 0 0 100px #ffec3d44, 0 0 160px #ffec3d22",
          },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0px) rotateX(0deg)" },
          "50%": { transform: "translateY(-12px) rotateX(2deg)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(400%)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float-y": "float-y 4s ease-in-out infinite",
        "scan-line": "scan-line 3s linear infinite",
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
