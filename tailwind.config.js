module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        'primary-main': '#3753FF',
        'primary-main-hover': '#384AC8',
        'primary-surface': '#F2F4FF',
        'primary-border': '#A5B0FF',
        'heading-txt-color': '#060235',
        'body-txt-color': '#4A4672',
        'sec-cap-txt-color': '#656289',
        'placeholder-txt-color': '#7D7A9B',
        'disable-txt-color': '#B6B5C2',
        'bg-gray-100': '#F5F5F8',
        'bg-gray-200': '#EEEEF2',
        'bg-gray-300': '#E2E1E9',
      },
      maxWidth: {
        '10px': '10px',
      },
      minWidth: {
        '10px': '10px',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
    },
  },
  plugins: [],
};
