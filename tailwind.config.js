module.exports = {
  purge: [
    './assets/style.css',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './services/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    screens: {
      // Constants taken from UI constants.
      // Think of them as 'beyond this breakpoint' when using
      // mobile:my-class, for example.
      // -> @media (min-width: {}px) { ... }
      mobile: '500px',
      tablet: '715px',
      desktop: '1100px',
      xl: '1280px',
      huge: '1920px',
    },
    fontFamily: {
      prompt: ['Prompt'],
      sans: ['WorkSans'],
    },
    fontSize: {
      '2xs': ['.50rem'],
      xs: ['.75rem'],
      sm: ['.875rem'],
      tiny: ['.875rem'],
      base: ['1rem'],
      lg: ['1.125rem'],
      xl: ['1.25rem'],
      '2xl': ['1.5rem'],
      '3xl': ['1.875rem'],
      '4xl': ['2.25rem'],
      '5xl': ['3rem'],
      '6xl': ['4rem'],
      '7xl': ['5rem'],
      '8xl': ['6rem'],
      '9xl': ['7rem'],
    },
    extend: {
      backgroundImage: {
        hero: "url('/hero.svg')",
      },
      colors: {
        primary: '#1F1C47',
        secondary: '#12C7BA',
        alt: '#DBF7F5',
        hyper: '#E5FF85',
        blush: '#FF7A87',
        blue: '#3F4BF5',
        purple: '#654192',
      },
      display: ['huge', 'desktop', 'tablet', 'mobile'],
      backgroundOpacity: {
        10: '0.1',
      },
      animation: {
        float: 'float 9s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translateY(33.3334%)',
            animationTimingFunction: 'linear',
          },
          '25%, 75%': {
            transform: 'translateY(16.6667%)',
            animationTimingFunction: 'linear',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'linear',
          },
        },
      },
      width: {
        68: '17rem',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
      fontWeight: ['last'],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
