import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { useUserStore } from '@/stores/user';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import NavBar from '@/components/layout/NavBar.vue';

const getWrapper = () => {
  const wrapper = mount(NavBar, {
    global: {
      plugins: [router],
    },
  });
  return wrapper;
};
describe('NavBar', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    setupLocales();
  });

  describe('when logged in', () => {
    let userStore;
    beforeEach(() => {
      userStore = useUserStore();
      userStore.auth.id = 'id';
      userStore.auth.email = 'email';
      userStore.auth.authenticationToken = 'authToken';
    });
    it('shows internal nav bar links', () => {
      const wrapper = getWrapper();
      const navBarInternalLinks = wrapper.find('[data-test="navBarInternalLinks"]');
      expect(navBarInternalLinks.exists()).toBe(true);
      const navBarPublicLinks = wrapper.find('[data-test="navBarPublicLinks"]');
      expect(navBarPublicLinks.exists()).toBe(false);
    });
    it('redirects to \'/\' when clicking the fintoc logo', () => {
      const wrapper = getWrapper();
      const fintocLogo = wrapper.find('[data-test="fintocLogo"]');
      expect(fintocLogo.exists()).toBe(true);
      expect(fintocLogo.attributes('href')).toEqual('/');
    });
  });

  describe('when not logged in', () => {
    let userStore;
    beforeEach(() => {
      userStore = useUserStore();
      userStore.auth.id = '';
      userStore.auth.email = '';
      userStore.auth.authenticationToken = '';
    });
    it('shows public nav bar links', () => {
      const wrapper = getWrapper();
      const navBarPublicLinks = wrapper.find('[data-test="navBarPublicLinks"]');
      expect(navBarPublicLinks.exists()).toBe(true);
      const navBarInternalLinks = wrapper.find('[data-test="navBarInternalLinks"]');
      expect(navBarInternalLinks.exists()).toBe(false);
    });
    it('fintoc logo redirects to fintoc.com', () => {
      const wrapper = getWrapper();
      const fintocLogo = wrapper.find('[data-test="fintocLogo"]');
      expect(fintocLogo.exists()).toBe(true);
      expect(fintocLogo.attributes('href')).toEqual('https://fintoc.com');
    });
  });
});
