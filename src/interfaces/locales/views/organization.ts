export interface OrganizationViewLocale {
  title: string,
  settings: {
    name: string
    nameSubLabel: string,
    organizationRutRfc: string,
    billingEmail: string,
    billingSubLabel: string,
    technicalEmail: string,
    technicalSubLabel: string,
    defaultCountryApi: string,
    defaultCountryApiSubLabel: string,
    apiVersion: string,
    apiVersionSubLabel1: string,
    apiVersionSubLabel2: string,
  }
  products: {
    title: string,
    subtitle: string,
    bankingAPI: string,
    fiscalAPI: string,
    callToAction: string,
  },
}
