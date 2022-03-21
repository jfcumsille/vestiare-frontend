import { mount } from '@vue/test-utils';
import i18next from 'i18next';
import NavBar from '../NavBar.vue';
import en from '../../../locales/en';
import es from '../../../locales/es';

jest.mock('vue-router', () => ({
  useRoute: jest.fn(() => ({ name: '/' })),
  createRouter: jest.fn(() => ({ history: '', routes: '' })),
}));

i18next.init({
  lng: 'en',
  resources: {
    en,
    es,
  },
});

describe('NavBar', () => {
  describe('if logged in', () => {
    const wrapper = mount(NavBar, {
      props: {
        isLoggedIn: true,
      },
    });
    it('show internal nav bar links', () => {
      const navBarInternalLinks = wrapper.find('[data-test="navBarInternalLinks"]');
      expect(navBarInternalLinks.exists()).toBe(true);
      const navBarPublicLinks = wrapper.find('[data-test="navBarPublicLinks"]');
      expect(navBarPublicLinks.exists()).toBe(false);
    });
    it('fintoc logo redirect to /', () => {
      const fintocLogo = wrapper.find('[data-test="fintocLogo"]');
      expect(fintocLogo.exists()).toBe(true);
      expect(fintocLogo.attributes('href')).toEqual('/');
    });
  });

  describe('if not logged in', () => {
    const wrapper = mount(NavBar, {
      props: {
        isLoggedIn: false,
      },
    });
    it('show public nav bar links', () => {
      const navBarPublicLinks = wrapper.find('[data-test="navBarPublicLinks"]');
      expect(navBarPublicLinks.exists()).toBe(true);
      const navBarInternalLinks = wrapper.find('[data-test="navBarInternalLinks"]');
      expect(navBarInternalLinks.exists()).toBe(false);
    });
    it('fintoc logo redirect to fintoc.com', () => {
      const fintocLogo = wrapper.find('[data-test="fintocLogo"]');
      expect(fintocLogo.exists()).toBe(true);
      expect(fintocLogo.attributes('href')).toEqual('https://fintoc.com');
    });
  });
});
