import { OrganizationViewLocale } from '@/interfaces/locales/views/organization';

export default <OrganizationViewLocale>{
  title: 'Organization',
  settings: {
    settings: 'Settings',
    settingsSubLabel: 'Your general organization settings.',
    name: 'Name',
    nameSubLabel: 'As it will appear on your widget.',
    organizationRutRfc: 'Organization RUT/RFC',
    requestChange: 'Request Change',
    billingEmail: 'Billing Email',
    billingSubLabel: 'For Fintoc receipts.',
    billingPlaceholder: 'Add a billing email',
    technicalEmail: 'Technical Email',
    technicalSubLabel: 'For reports about service interruptions.',
    technicalPlaceholder: 'Add a technical email',
    countryAPI: 'Country API',
    defaultCountryApi: 'API Default Country',
    defaultCountryApiSubLabel: 'Default country if not specified.',
    apiVersion: 'API Version',
    apiVersionSubLabel1: 'Learn more about versions →',
    apiVersionSubLabel2: 'Your version will be set once you make your first API call.',
    validations: {
      invalidEmail: 'Please enter a valid email',
    },
  },
  products: {
    title: 'Products',
    subtitle: 'These are the products currently available for this Organization.',
    bankingAPI: 'Banking API',
    fiscalAPI: 'Fiscal API',
    callToAction: 'Ask about other products and use cases →',
  },
  members: {
    title: 'Team',
    name: 'Name',
    email: 'Email',
    memberSince: 'Member Since',
  },
};
