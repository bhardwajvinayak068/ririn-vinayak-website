import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FDFBF7",
        ink: "#23181C",
        gold: {
          light: "#FDF3C7",
          DEFAULT: "#D4AF37",
          dark: "#996515",
          foil: "#F59E0B",
        },
        kesar: {
          light: "#FDE68A",
          DEFAULT: "#F59E0B",
          dark: "#D97706",
        },
        darbar: {
          night: "#120A0D",
          dark: "#1A1014",
          card: "#22161B",
        },
        sindoor: "#781D26",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        sanskrit: ["var(--font-rozha)", "serif"],
        cinzel: ["var(--font-cinzel)", "serif"],
      },
      letterSpacing: {
        widest2: "0.3em",
        widest3: "0.4em",
      },
      keyframes: {
        "gold-shimmer": {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
      },
      animation: {
        "gold-shimmer": "gold-shimmer 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
