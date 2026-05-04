/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.{html,js}', '!./node_modules/**', '!./dist/**'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: '#5C0A14',
          'burgundy-deep': '#3D060E',
          crimson: '#8B1423',
          rose: '#A61F35',
          cream: '#FAF7F2',
          ink: '#0D0A0B',
          muted: '#6B5E61',
          metallic: {
            DEFAULT: '#C9A962',
            light: '#E8D5A3',
            dark: '#8B7355',
          },
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 18px 40px -12px rgba(60, 10, 20, 0.35)',
        glow: '0 0 40px rgba(201, 169, 98, 0.25)',
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(201, 169, 98, 0.35), transparent 55%), radial-gradient(ellipse 80% 60% at 100% 50%, rgba(139, 20, 35, 0.4), transparent), linear-gradient(165deg, #3D060E 0%, #5C0A14 45%, #1a0508 100%)',
        'can-shine':
          'linear-gradient(105deg, rgba(255,255,255,0.15) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.08) 100%)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
}
