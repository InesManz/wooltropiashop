/** @type {import('tailwindcss').Config} */
// Tokens de marca portados desde el DESIGN.md / code.html original de Wooltropia.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Superficies (paleta terracota calida)
        background: '#fff8f6',
        surface: '#fff8f6',
        'surface-bright': '#fff8f6',
        'surface-dim': '#e7d6d2',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#fff1ed',
        'surface-container': '#fceae5',
        'surface-container-high': '#f6e5e0',
        'surface-container-highest': '#f0dfda',
        'surface-variant': '#f0dfda',
        // Texto
        'on-background': '#221a17',
        'on-surface': '#221a17',
        'on-surface-variant': '#55433d',
        'inverse-surface': '#382e2b',
        'inverse-on-surface': '#ffede8',
        // Marca
        primary: '#954427',
        'on-primary': '#ffffff',
        'primary-container': '#b45c3d',
        'on-primary-container': '#fffcff',
        'inverse-primary': '#ffb59c',
        secondary: '#7c5800',
        'on-secondary': '#ffffff',
        'secondary-container': '#ffc654',
        'on-secondary-container': '#735200',
        'secondary-fixed': '#ffdea6',
        'on-secondary-fixed': '#271900',
        'secondary-fixed-dim': '#f6bd4c',
        tertiary: '#7d4d6a',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#986584',
        'on-tertiary-container': '#fffcff',
        // Bordes / estados
        outline: '#88726c',
        'outline-variant': '#dbc1b9',
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      maxWidth: {
        content: '80rem', // 1280px
      },
      boxShadow: {
        ambient: '0 10px 30px rgba(0,0,0,0.05)',
        lift: '0 15px 35px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
