import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#061536", 2: "#0A1D42", 3: "#12295a" },
        sun: { DEFAULT: "#FF8A35", light: "#FFB16A" },
        sky: { brand: "#78A9D2" },
        mist: "#F3F5F8",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "sun-gradient": "linear-gradient(135deg, #FF8A35 0%, #FFB16A 100%)",
      },
      boxShadow: {
        glow: "0 10px 40px -10px rgba(255,138,53,.55)",
        card: "0 1px 2px rgba(6,21,54,.04), 0 12px 32px -12px rgba(6,21,54,.12)",
      },
      keyframes: {
        flow: { "0%": { strokeDashoffset: "24" }, "100%": { strokeDashoffset: "0" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        spinSlow: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        flow: "flow 1.2s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        spinSlow: "spinSlow 60s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
