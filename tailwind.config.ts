import type { Config } from "tailwindcss";
import * as colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-bg":
          "linear-gradient(135deg, #1A202C 30%, #2D3748 60%, #4A5568)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
        },
        ".scroll-snap-none": {
          scrollSnapType: "none",
        },
        ".scroll-snap-x": {
          scrollSnapType: "x mandatory",
        },
        ".scroll-snap-y": {
          scrollSnapType: "y mandatory",
        },
        ".scroll-snap-both": {
          scrollSnapType: "both mandatory",
        },
        ".snap-start": {
          scrollSnapAlign: "start",
        },
        ".snap-end": {
          scrollSnapAlign: "end",
        },
        ".snap-center": {
          scrollSnapAlign: "center",
        },
        ".snap-none": {
          scrollSnapAlign: "none",
        },
      });
    },
  ],
};
export default config;
