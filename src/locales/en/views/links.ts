import { LinksViewLocale } from '@/interfaces/locales/views/links';

export default <LinksViewLocale>{
  filters: {
    searchBarPlaceholder: 'Search for a user ID',
    active: {
      label: 'Active',
      options: {
        all: 'All',
        active: 'Active',
        inactive: 'Inactive',
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
};
