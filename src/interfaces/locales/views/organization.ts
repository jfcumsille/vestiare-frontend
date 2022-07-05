export interface OrganizationViewLocale {
  title: string,
  settings: {
    name: string
    nameSubLabel: string,
    organizationRutRfc: string,
    requestChange: string,
    billingEmail: string,
    billingSubLabel: string,
    technicalEmail: string,
    technicalSubLabel: string,
    defaultCountryApi: string,
    defaultCountryApiSubLabel: string,
    apiVersion: string,
    apiVersionSubLabel1: string,
    apiVersionSubLabel2: string,
    validations: {
      invalidEmail: string,
    },
  }
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
    memberSince: string,
  },
}
