export interface LinksViewLocale {
  title: string,
  learnMore: string,
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
      password: string,
      active: string,
    },
    filters: {
      searchBarPlaceholder: string,
      active: {
        label: string,
        options: {
          valid: string,
          invalid: string
        },
      },
      password: {
        label: string,
        options: {
          valid: string,
          invalid: string
        },
      },
    },
    buttons: {
      remove: string,
    },
    badges: {
      validPassword: string,
      invalidPassword: string,
    },
    noLinksFound: string,
  },
  refreshWarningModal: {
    title: string,
    warning: string,
    text: string,
    confirmation: string,
  }
}
