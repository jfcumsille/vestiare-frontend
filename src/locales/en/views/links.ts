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
  creation: {
    createAction: 'Create',
    individualBankingLink: 'individual banking Link',
    businessBankingLink: 'business banking Link',
    individualFiscalLink: 'individual fiscal Link',
    businessFiscalLink: 'business fiscal Link',
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
