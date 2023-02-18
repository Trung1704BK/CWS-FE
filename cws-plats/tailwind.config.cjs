/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: "576px",
      },
      animation: {
        "from-bottom": "from-bottom 0.4s ease",
        "opacity-1": "opacity-1 0.3s ease-out",
        "width-0": "width-0 0.1s ease-out forwards",
      },
      keyframes: {
        "from-bottom": {
          "0%": {
            transform: "translateY(100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        "opacity-1": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "width-0": {
          "0%": {
            width: "100%",
          },
          "100%": {
            width: "0%",
          },
        },
      },
      spacing: {
        15: "3.75rem",
      },
      maxWidth: {
        "8xl": "90rem",
      },
      screens: {
        "galaxy-fold": "281px",
      },
    },
    fontFamily: {
      "apple-system": ["-apple-system", "BlinkMacSystemFont"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
