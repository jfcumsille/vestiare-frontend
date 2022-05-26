import { OrganizationViewLocale } from '@/interfaces/locales/views/organization';

export default <OrganizationViewLocale>{
  title: 'Organización',
  table: {
    headers: {
      name: 'Nombre',
      email: 'Email',
      role: 'Rol',
      memberSince: 'Miembro Desde',
      status: 'Estado',
    },
  },
};
