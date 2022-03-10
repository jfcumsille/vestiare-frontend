module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    maxWidth: {
      '10px': '10px',
      '400px': '400px',
    },
    minWidth: {
      '10px': '10px',
      '400px': '400px',
    },
    extend: {
      colors: {
        'primary-main': '#3753FF',
        'primary-main-hover': '#384AC8',
        'txt-heading': '#060235',
        'txt-body': '#4A4672',
        'txt-sec-cap': '#656289',
        'txt-placeholder': '#7D7A9B',
        'txt-disable': '#B6B5C2',
        'bg-gray-100': '#F5F5F8',
        'bg-gray-200': '#EEEEF2',
        'bg-gray-300': '#E2E1E9',
      },
    },
  },
  plugins: [],
};
