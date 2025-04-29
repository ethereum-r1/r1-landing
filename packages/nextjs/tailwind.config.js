/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"],
  // DaisyUI theme colors
  daisyui: {
    defaultTheme: "dark",
    themes: [
      {
        dark: {
          primary: "#FFFFFF",
          "primary-content": "#000000",
          secondary: "#333333",
          "secondary-content": "#FFFFFF",
          accent: "#1A1A1A",
          "accent-content": "#FFFFFF",
          neutral: "#F0F0F0",
          "neutral-content": "#000000",
          "base-100": "#000000",
          "base-200": "#0A0A0A",
          "base-300": "#1A1A1A",
          "base-content": "#FFFFFF",
          info: "#333333",
          success: "#A0A0A0",
          warning: "#505050",
          error: "#FF5252",

          "--rounded-btn": "0.25rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "oklch(var(--p))",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
      {
        light: {
          primary: "#000000",
          "primary-content": "#FFFFFF",
          secondary: "#F0F0F0",
          "secondary-content": "#000000",
          accent: "#E0E0E0",
          "accent-content": "#000000",
          neutral: "#333333",
          "neutral-content": "#FFFFFF",
          "base-100": "#FFFFFF",
          "base-200": "#F5F5F5",
          "base-300": "#E0E0E0",
          "base-content": "#333333",
          info: "#D0D0D0",
          success: "#A0A0A0",
          warning: "#C0C0C0",
          error: "#B00020",

          "--rounded-btn": "0.25rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
