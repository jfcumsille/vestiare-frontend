import { OrganizationViewLocale } from '@/interfaces/locales/views/organization';

export default <OrganizationViewLocale>{
  title: 'Organización',
  settings: {
    name: 'Nombre',
    nameSubLabel: 'El nombre que se mostrará en tu widget.',
    organizationRutRfc: 'RUT/RFC de la organización',
    requestChange: 'Solicitar Cambio',
    billingEmail: 'Correo electrónico de facturas.',
    billingSubLabel: 'Para recibir facturas de Fintoc.',
    technicalEmail: 'Correo electrónico técnico',
    technicalSubLabel: 'Para reportes de interrupciones de servicio.',
    defaultCountryApi: 'País API por defecto',
    defaultCountryApiSubLabel: 'País por defecto si no se especifica otro.',
    apiVersion: 'Versión API',
    apiVersionSubLabel1: 'Aprende más sobre versiones →',
    apiVersionSubLabel2: 'Tu versión será seteada cuando realices tu primera llamada a la API.',
    validations: {
      invalidEmail: 'Por favor ingresa un correo válido',
    },
  },
  products: {
    title: 'Productos',
    subtitle: 'Estos son los productos disponibles para esta organización',
    bankingAPI: 'API Bancaria',
    fiscalAPI: 'API Fiscal',
    callToAction: 'Pregunta por otros productos y casos de uso →',
  },
  members: {
    title: 'Equipo',
    name: 'Nombre',
    email: 'Email',
    memberSince: 'Miembro Desde',
  },
};
