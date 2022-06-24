import { FormsLocale } from '@/interfaces/locales/forms';

export default <FormsLocale>{
  userData: {
    labels: {
      email: 'Email',
      password: 'Contraseña',
      name: 'Nombre',
      lastName: 'Apellido',
      company: 'Empresa',
      country: 'País',
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
      email: 'Email inválido',
      password: 'Elige una contraseña más segura.',
      name: 'Obligatorio',
      lastname: 'Obligatorio',
    },
  },
};
