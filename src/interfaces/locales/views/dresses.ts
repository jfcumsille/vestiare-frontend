export interface DressesViewLocale {
  title_one: string,
  title_other: string,
  learnMore: string,
  createDressModal: {
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
  newDressModal: {
    title: string,
    warning: string,
    danger: string,
    subtitle: string,
    learnMore: string,
    loading: string,
    retryButton: string,
  },
  deleteDressModal: {
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
      public: {
        label: string,
        labelType: string,
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
