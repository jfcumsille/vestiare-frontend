import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import NavBar from '../NavBar.vue';

jest.mock('vue-router', () => ({
  useRoute: jest.fn(() => ({ name: '/' })),
  createRouter: jest.fn(() => ({ history: '', routes: '' })),
}));

const getWrapper = (isLoggedIn: boolean) => {
  const wrapper = mount(NavBar, {
    props: {
      isLoggedIn,
    },
  });
  return wrapper;
};

describe('NavBar', () => {
  beforeAll(() => {
    setupLocales();
  });
  describe('when logged in', () => {
    it('shows internal nav bar links', () => {
      const wrapper = getWrapper(true);
      const navBarInternalLinks = wrapper.find('[data-test="navBarInternalLinks"]');
      expect(navBarInternalLinks.exists()).toBe(true);
      const navBarPublicLinks = wrapper.find('[data-test="navBarPublicLinks"]');
      expect(navBarPublicLinks.exists()).toBe(false);
    });
    it('redirects to \'/\' when clicking the fintoc logo', () => {
      const wrapper = getWrapper(true);
      const fintocLogo = wrapper.find('[data-test="fintocLogo"]');
      expect(fintocLogo.exists()).toBe(true);
      expect(fintocLogo.attributes('href')).toEqual('/');
    });
  });

  describe('when not logged in', () => {
    it('shows public nav bar links', () => {
      const wrapper = getWrapper(false);
      const navBarPublicLinks = wrapper.find('[data-test="navBarPublicLinks"]');
      expect(navBarPublicLinks.exists()).toBe(true);
      const navBarInternalLinks = wrapper.find('[data-test="navBarInternalLinks"]');
      expect(navBarInternalLinks.exists()).toBe(false);
    });
    it('fintoc logo redirects to fintoc.com', () => {
      const wrapper = getWrapper(false);
      const fintocLogo = wrapper.find('[data-test="fintocLogo"]');
      expect(fintocLogo.exists()).toBe(true);
      expect(fintocLogo.attributes('href')).toEqual('https://fintoc.com');
    });
  });
});
