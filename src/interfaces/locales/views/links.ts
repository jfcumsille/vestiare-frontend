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
  createLinkModal: {
    create: string,
    subtitleTest: string,
    learnMoreTest: string,
    subtitleLive: string,
    learnMoreLive: string,
    country: string,
    chooseCountry: string,
    api: string,
    chooseApi: string,
    holderType: string,
    chooseHolderType: string,
  },
  newLinkModal: {
    title: string,
    warning: string,
    subtitle: string,
    learnMore: string,
    loading: string,
  },
  deleteLinkModal: {
    title: string,
    confirmation: string,
    warning: string,
    text: string,
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
