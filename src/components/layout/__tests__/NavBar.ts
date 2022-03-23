import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { useUserStore } from '@/stores/user';
import { setupLocales } from '@/locales';
import NavBar from '../NavBar.vue';

describe('NavBar', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    setupLocales();
  });

  /*
  describe('when logged in', () => {
    it('shows internal nav bar links', () => {
      const userStore = useUserStore();
      userStore.auth.id = 'id';
      userStore.auth.email = 'email';
      userStore.auth.authenticationToken = 'authToken';
      const wrapper = mount(NavBar);
      const navBarInternalLinks = wrapper.find('[data-test="navBarInternalLinks"]');
      expect(navBarInternalLinks.exists()).toBe(true);
      const navBarPublicLinks = wrapper.find('[data-test="navBarPublicLinks"]');
      expect(navBarPublicLinks.exists()).toBe(false);
    });
    it('redirects to \'/\' when clicking the fintoc logo', () => {
      const userStore = useUserStore();
      userStore.auth.id = 'id';
      userStore.auth.email = 'email';
      userStore.auth.authenticationToken = 'authToken';
      const wrapper = mount(NavBar);
      const fintocLogo = wrapper.find('[data-test="fintocLogo"]');
      expect(fintocLogo.exists()).toBe(true);
      expect(fintocLogo.attributes('href')).toEqual('/');
    });
  });
  */

  describe('when not logged in', () => {
    it('shows public nav bar links', () => {
      const userStore = useUserStore();
      userStore.auth.id = '';
      userStore.auth.email = '';
      userStore.auth.authenticationToken = '';
      const wrapper = mount(NavBar);
      const navBarPublicLinks = wrapper.find('[data-test="navBarPublicLinks"]');
      expect(navBarPublicLinks.exists()).toBe(true);
      const navBarInternalLinks = wrapper.find('[data-test="navBarInternalLinks"]');
      expect(navBarInternalLinks.exists()).toBe(false);
    });
    it('fintoc logo redirects to fintoc.com', () => {
      const userStore = useUserStore();
      userStore.auth.id = '';
      userStore.auth.email = '';
      userStore.auth.authenticationToken = '';
      const wrapper = mount(NavBar);
      const fintocLogo = wrapper.find('[data-test="fintocLogo"]');
      expect(fintocLogo.exists()).toBe(true);
      expect(fintocLogo.attributes('href')).toEqual('https://fintoc.com');
    });
  });
});
