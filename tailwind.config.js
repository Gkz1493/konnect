/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0D0C1D",
        ink2: "#141326",
        ink3: "#1C1A35",
        ink4: "#252344",
        ink5: "#2E2B55",
        p: "#6C63FF",
        p2: "#A99DFF",
        rose: "#E879A0",
        rose2: "#F9A8D4",
        teal: "#2DD4BF",
        gold: "#F59E0B",
        green: "#4ADE80",
        red: "#F87171",
        sky: "#38BDF8",
        t: "#F0EEFF",
        t2: "#9D98C8",
        t3: "#5A5688",
        t4: "#3A3660",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      backgroundImage: {
        grad: "linear-gradient(135deg, #6C63FF 0%, #E879A0 100%)",
        grad2: "linear-gradient(135deg, #6C63FF 0%, #2DD4BF 100%)",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,.4)",
        activecard: "0 0 28px rgba(108,99,255,.15), inset 0 0 0 2px #6C63FF",
        glow: "0 0 20px rgba(108,99,255,.4)",
        roseglow: "0 0 28px rgba(232,121,160,.2), inset 0 0 0 2px #F472B6",
      },
    },
  },
  plugins: [],
};
