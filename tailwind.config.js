/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "color-scheme": "dark",
          "primary": "#e779c1",
          "secondary": "#58c7f3",
          "accent": "#f3cc30",
          "neutral": "#4F21AA",
          "neutral-content": "#f9f7fd",
          "base-100": "#1a103d",
          "base-content": "#f9f7fd",
          "info": "#53c0f3",
          "info-content": "#201047",
          "success": "#71ead2",
          "success-content": "#201047",
          "warning": "#f3cc30",
          "warning-content": "#201047",
          "error": "#e24056",
          "error-content": "#f9f7fd",
        },
      },
    ],
  },
};
