import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "24px",
        mobile: "50px",
        laptop: "70px",
      },
    },
    extend: {
      colors: {
        green: "#687973",
        brown: "#2D241B",

        white: {
          DEFAULT: "#D5D5D5",
          medium: "#C3C3C3",
          dark: "#B2B2B2",
        },

        beige: {
          DEFAULT: "#E1C3B8",
          medium: "#CDAFA5",
          dark: "#BB9D93",
        },

        wine: {
          DEFAULT: "#500D19",
          medium: "#601E26",
          light: "#713135",
        },
      },
    },
  },
  plugins: [],
};
export default config;
