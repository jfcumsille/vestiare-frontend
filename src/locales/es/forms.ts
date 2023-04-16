import { FormsLocale } from '@/interfaces/locales/forms';

export default <FormsLocale>{
  userData: {
    labels: {
      email: 'Email',
      password: 'Contraseña',
      name: 'Nombre',
      lastName: 'Apellido',
      country: 'País',
    },
    placeholders: {
      email: 'jendoe@gmail.com',
      password: 'mypassword',
      name: 'Jen',
      lastName: 'Doe',
      country: 'Chile',
    },
    hints: {
      email: 'Email inválido',
      password: 'Elige una contraseña más segura.',
      validPassword: 'Tu contraseña es segura.',
      name: 'Obligatorio',
      lastname: 'Obligatorio',
    },
  },
};
