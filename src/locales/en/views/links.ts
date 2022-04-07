import { LinksViewLocale } from '@/interfaces/locales/views/links';

export default <LinksViewLocale>{
  filters: {
    searchBarPlaceholder: 'Search for a user ID',
    active: {
      label: 'Active',
      options: {
        all: 'All',
        valid: 'Active',
        invalid: 'Inactive',
      },
    },
    password: {
      label: 'Password',
      options: {
        all: 'All',
        valid: 'Valid',
        invalid: 'Invalid',
      },
    },
  },
  createLinkModal: {
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
  newLinkModal: {
    title: 'Link created succesfully!',
    warning: 'This Link Token will only be showed once, so make sure to copy and save it.',
    subtitle: 'You can use this Link Token to make requests to the Fintoc API.',
    learnMore: 'Learn more about requests you can make →',
    loading: 'loading Link Token...',
  },
  deleteLinkModal: {
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
      active: 'Active',
    },
    buttons: {
      remove: 'Remove',
    },
    noLinksFound: 'No Links found!',
  },
};
