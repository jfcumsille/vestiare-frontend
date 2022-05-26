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
};
