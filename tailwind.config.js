/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Dashboard cards build color classes at runtime (`bg-${color}-600`), so Tailwind must keep them.
  safelist: [
    {
      pattern: /^(bg|from|to|border|text)-(purple|blue|green|orange|pink|teal|red|yellow)-(50|100|200|600)$/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
