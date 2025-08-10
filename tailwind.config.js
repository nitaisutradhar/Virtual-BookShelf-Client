/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  // DaisyUI থিম কনফিগারেশন
  daisyui: {
    themes: [
      {
        virtualbookshelf: { // আপনার লাইট থিম
          "primary": "#0F172A",
          "primary-content": "#F1F5F9", // primary রঙের উপর টেক্সটের রঙ
          "secondary": "#06B6D4",
          "accent": "#F97316",
          "neutral": "#1E293B",
          "base-100": "#F1F5F9",
          "base-content": "#1E293B", // ডিফল্ট টেক্সটের রঙ
          "base-200": "#E2E8F0",
          "base-300": "#000",
          "info": "#38BDF8",
          "success": "#22C55E",
          "warning": "#FACC15",
          "error": "#EF4444",
        },
      },
      {
        virtualbookshelf_dark: { // আমাদের নতুন ডার্ক থিম
          "primary": "#E2E8F0",
          "primary-content": "#0F172A", // primary রঙের উপর টেক্সটের রঙ
          "secondary": "#06B6D4",
          "accent": "#F97316",
          "neutral": "#E2E8F0",
          "base-100": "#0F172A",
          "base-content": "#E2E8F0", // ডিফল্ট টেক্সটের রঙ
          "base-200": "#1E293B",
          "base-300": "#fff",
          "info": "#38BDF8",
          "success": "#22C55E",
          "warning": "#FACC15",
          "error": "#EF4444",
        },
      },
    ],
  },
}
