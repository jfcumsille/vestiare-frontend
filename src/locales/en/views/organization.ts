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
    upgradeToRequestChange: 'Upgrade to request change',
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
  plan: {
    title: 'Plan',
    currently: 'You are currently on',
    trial: 'Trial',
    trialSubtitle1: 'plan. You will be downgraded to Free plan on',
    trialSubtitle2: 'You can connect unlimited accounts in Test and Live mode in Trial, afterwards you will only be left with 5 active individual Links in Live mode.',
    paid: 'Paid',
    paidSubtitle1: 'plan with',
    paidSubtitle2: 'products hired.',
    free: 'Free',
    freeSubtitle1: 'plan.',
    freeSubtitle2: 'You only have access to 5 active Links in Live mode.',
    callToAction: 'Contact sales to upgrade →',
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
    organizationRole: 'Organization Role',
    permissions: 'Permissions',
    memberSince: 'Member Since',
    status: 'Status',
    searchPlaceholder: 'ex: Paula',
    inviteMemberButton: 'Invite Member',
    financeManagement: 'Finance',
    developer: 'Developer',
    operations: 'Operations',
    other: 'Other',
    accepted: 'User Accepted',
    rejected: 'Rejected',
    invitationSent: 'Invitation Sent',
    admin: 'Admin',
    member: 'Member',
    delete: 'Delete',
    newMember: {
      title: 'New member invitation',
      invitationSent: 'Invitation Sent',
      subtitle: 'Add a member or admin to your Organization through an email invitation. They will add all other necessary information.',
      emailLabel: 'Email',
      emailPlaceholder: 'example@fintoc.com',
      invalidEmail: 'Invalid Email',
      roleLabel: 'Permissions Role',
      cancel: 'Cancel',
      sendInvitation: 'Send Invitation',
      yourInvitationFor: 'Your invitation for',
      hasBeenSent: 'has been sent',
      inviteStatus: 'The status of your invite will be shown in your Team.',
      backToTeam: 'Back to Team',
      inviteAnother: 'Invite another',
    },
    deleteMember: {
      title: 'Remove user from organization',
      confirmation: 'Remove user',
      warning: 'If you remove a user, you will have to re-invite them.',
      text1: 'Are you sure you want to remove',
      text2: 'from your organization?',
    },
  },
};
