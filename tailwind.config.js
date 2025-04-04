/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "50%": { transform: "translateY(-50px) scale(1.2)", opacity: "0.8" },
          "100%": { transform: "translateY(-100px) scale(1)", opacity: "0" },
        },
      },
      animation: {
        "float-up": "float 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
    },
  },
  plugins: [],
};
