import { FormsLocale } from '@/interfaces/locales/forms';

export default <FormsLocale>{
  userData: {
    labels: {
      email: 'Email',
      password: 'Password',
      name: 'First Name',
      lastName: 'Last Name',
      country: 'Country',
    },
    placeholders: {
      email: 'jen.doe@gmail.com',
      password: 'mypassword',
      name: 'Jen',
      lastName: 'Doe',
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
