export interface OrganizationViewLocale {
  title: string,
  settings: {
    settings: string,
    settingsSubLabel: string,
    name: string
    nameSubLabel: string,
    organizationRutRfc: string,
    requestChange: string,
    billingEmail: string,
    billingSubLabel: string,
    billingPlaceholder: string,
    technicalEmail: string,
    technicalSubLabel: string,
    technicalPlaceholder: string,
    countryAPI: string,
    defaultCountryApi: string,
    defaultCountryApiSubLabel: string,
    apiVersion: string,
    apiVersionSubLabel1: string,
    apiVersionSubLabel2: string,
    validations: {
      invalidEmail: string,
    },
  }
  plan: {
    title: string,
    currently: string,
    trial: string,
    trialSubtitle1: string,
    trialSubtitle2: string,
    paid: string,
    paidSubtitle1: string,
    paidSubtitle2: string,
    free: string,
    freeSubtitle1: string,
    freeSubtitle2: string,
    callToAction: string,
  },
  products: {
    title: string,
    subtitle: string,
    bankingAPI: string,
    fiscalAPI: string,
    callToAction: string,
  },
  members: {
    title: string,
    name: string,
    email: string,
    organizationRole: string,
    permissions: string,
    memberSince: string,
    status: string,
    searchPlaceholder: string,
    inviteMemberButton: string,
    financeManagement: string,
    developer: string,
    operations: string,
    other: string,
    accepted: string,
    rejected: string,
    invitationSent: string,
    admin: string,
    member: string,
    delete: string,
    newMember: {
      title: string,
      invitationSent: string,
      subtitle: string,
      emailLabel: string,
      emailPlaceholder: string,
      invalidEmail: string,
      roleLabel: string,
      cancel: string,
      sendInvitation: string,
      yourInvitationFor: string,
      hasBeenSent: string,
      inviteStatus: string,
      backToTeam: string,
      inviteAnother: string,
    },
  },
}
