import { OrganizationViewLocale } from '@/interfaces/locales/views/organization';

export default <OrganizationViewLocale>{
  title: 'Organization',
  teamTitle: 'Team',
  table: {
    headers: {
      name: 'Name',
      email: 'Email',
      role: 'Role',
      memberSince: 'Member Since',
      status: 'Status',
    },
    badges: {
      adminAccepted: 'Admin Accepted',
      userAccepted: 'User Accepted',
      invitationSent: 'Invitation Sent',
      userRejected: 'User Rejected',
    },
  },
  products: {
    title: 'Products',
    subtitle: 'These are the products currently available for this Organization.',
    bankingAPI: 'Banking API',
    fiscalAPI: 'Fiscal API',
    callToAction: 'Ask about other products and use cases →',
  },
};
