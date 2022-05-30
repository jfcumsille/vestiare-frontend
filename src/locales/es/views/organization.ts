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
  products: {
    title: 'Productos',
    subtitle: 'Estos son los productos disponibles para esta organización',
    bankingAPI: 'API Bancaria',
    fiscalAPI: 'API Fiscal',
    callToAction: 'Pregunta por otros productos y casos de uso →',
  },
};
