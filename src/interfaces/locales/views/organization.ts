export interface OrganizationViewLocale {
  title: string,
  table: {
    headers: {
      name: string,
      email: string
      role: string,
      memberSince: string,
      status: string,
    },
  },
  products: {
    title: string,
    subtitle: string,
    bankingAPI: string,
    fiscalAPI: string,
    callToAction: string,
  },
}
