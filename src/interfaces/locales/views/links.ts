export interface LinksViewLocale {
  filters: {
    searchBarPlaceholder: string,
    active: {
      label: string,
      options: {
        all: string,
        valid: string,
        invalid: string
      },
    },
    password: {
      label: string,
      options: {
        all: string,
        valid: string,
        invalid: string
      },
    },
  },
  creation: {
    createAction: string,
    individualBankingLink: string,
    businessBankingLink: string,
    individualFiscalLink: string,
    businessFiscalLink: string,
  },
  table: {
    headers: {
      user: string,
      business: string,
      institution: string,
      lastRefreshed: string,
      active: string,
    },
    buttons: {
      remove: string,
    },
    noLinksFound: string,
  },
}
