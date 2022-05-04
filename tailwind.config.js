module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      screens: {
        xs: '300px',
      },
      colors: {
        // Text
        'heading-color': '#060235',
        'body-color': '#4A4672',
        'secondary-color': '#656289',
        'placeholder-color': '#9390B4',
        'disabled-color': '#B6B5C2',
        // Background
        'dark-color': '#060235',
        'border-color': '#C5C4D3',
        'divider-color': '#E2E1E9',
        'light-gray': '#F0F0F3',
        'light-blue': '#F4F6FF',
        // Primary
        'primary-main': '#3753FF',
        'primary-surface': '#F4F6FF',
        'primary-border': '#BCC6FF',
        'primary-hover': '#2E45D4',
        'primary-pressed': '#1B2980',
        'primary-focus': '#D7DDFF',
        'primary-gradient': '#5480FF',
        // Success
        'success-main': '#33D098',
        'success-surface': '#E0F8F0',
        'success-border': '#99E7CB',
        'success-hover': '#2AAD7F',
        'success-pressed': '#19684C',
        'success-focus': '#BBEFDD',
        // Danger
        'danger-main': '#DD1C36',
        'danger-surface': '#FADDE1',
        'danger-border': '#F4B3BC',
        'danger-hover': '#C8142C',
        'danger-pressed': '#931324',
        'danger-focus': '#F4B3BC',
        // Warning
        'warning-main': '#EA780E',
        'warning-surface': '#FFF2E7',
        'warning-border': '#FFCA99',
        'warning-hover': '#D6761D',
        'warning-pressed': '#BE5C00',
        'warning-focus': '#FBE4CF',
      },
      maxWidth: {
        2.5: '0.625rem',
        xxs: '16rem',
      },
      minWidth: {
        2.5: '0.625rem',
        '16px': '16px',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
      },
      minHeight: {
        2.5: '0.625rem',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
      borderWidth: {
        1: '1px',
        1.5: '1.5px',
      },
      height: {
        4.5: '18px',
        7.5: '30px',
        12.5: '50px',
      },
      width: {
        4.5: '18px',
        7.5: '30px',
        12.5: '50px',
      },
      fontSize: {
        '2xs': '11px',
        '3xs': '8px',
      },
      padding: {
        11.5: '46px',
      },
    },
  },
  plugins: [],
};
