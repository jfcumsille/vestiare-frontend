import { FormsLocale } from '@/interfaces/locales/forms';

export default <FormsLocale>{
  userData: {
    labels: {
      email: 'Email',
      password: 'Password',
      name: 'First Name',
      lastName: 'Last Name',
      company: 'Company',
      country: 'Country',
    },
    placeholders: {
      email: 'jon.snow@fintoc.com',
      password: 'winteriscoming',
      name: 'Jon',
      lastName: 'Snow',
      company: 'Fintoc',
      country: 'Chile',
    },
    hints: {
      email: 'Invalid Email',
      password: 'Choose a stronger password.',
      validPassword: 'Your password is strong.',
      name: 'Required',
      lastname: 'Required',
    },
  },
};
