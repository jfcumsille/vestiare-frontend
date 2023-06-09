import { DressesViewLocale } from '@/interfaces/locales/views/dresses';

export default <DressesViewLocale>{
  title_one: 'Dress',
  title_other: 'Dresses',
  learnMore: 'Learn more about Fintoc Links →',
  createDressModal: {
    create: 'Create',
    subtitleTest: 'Create a Link with test credentials to get information about bank or fiscal accounts from the sandbox.',
    learnMoreTest: 'Learn more about test credentials you can use →',
    subtitleLive: 'Create a Link with real credentials to get information about any bank or fiscal accounts.',
    learnMoreLive: 'Learn more about Links →',
    country: 'Country',
    chooseCountry: 'Choose country…',
    api: 'API',
    chooseApi: 'Choose API…',
    holderType: 'Account type',
    chooseHolderType: 'Choose account type…',
  },
  newDressModal: {
    title: 'Link created succesfully!',
    warning: 'This Link Token will <b>only be showed once</b>, so make sure to copy and save it.',
    danger: 'Something went wrong. Please request a new Link Token below, no need to restart the process.',
    subtitle: 'You can use this Link Token to make requests to the Fintoc API.',
    learnMore: 'Learn more →',
    loading: 'Loading link token...',
    retryButton: 'Request',
  },
  deleteDressModal: {
    title: 'Delete Link',
    confirmation: 'Delete Link',
    warning: 'If you delete a Link, it cannot be undone.',
    text: `
      Are you sure you want to delete this link? The user will have to reconnect their account to create it again.
    `,
  },
  table: {
    headers: {
      user: 'User',
      business: 'Business',
      institution: 'Institution',
      lastRefreshed: 'Last Refreshed',
      password: 'Password',
      active: 'Active',
    },
    filters: {
      searchBarPlaceholder: 'Search for a user ID',
      public: {
        label: 'Public',
        labelType: 'Types',
        options: {
          valid: 'Public',
          invalid: 'Private',
        },
      },
    },
    buttons: {
      remove: 'Remove',
    },
    badges: {
      validPassword: 'valid',
      invalidPassword: 'invalid',
    },
    noLinksFound: 'No Links found!',
  },
  refreshWarningModal: {
    title: 'Resume Link Refreshing',
    warning: 'If the credentials are invalid, refreshing the Link might block your user\'s account',
    text: `
      Last time we used this Link to update its data,
      the finantial entity failed, informing us that the credentials
      were invalid. Due to this we stopped refreshing the movements
      of this Link to avoid blocking your user's account. If
      you believe your user's credentials haven't changed, we can
      resume refreshing the Link.
    `,
    confirmation: 'Resume Refreshing',
  },
};
