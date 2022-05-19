import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { useUserStore } from '@/stores/user';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import { mockCrypto } from '@/utils/tests/crypto';
import NavBar from '@/components/layout/NavBar/NavBar.vue';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const getWrapper = () => {
  const wrapper = mount(NavBar, {
    global: {
      plugins: [testingPinia, router],
    },
  });
  return wrapper;
};

describe('NavBar', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
  });

  describe('when logged in', () => {
    let userStore;
    beforeEach(() => {
      userStore = useUserStore();

      userStore.user = {
        id: 'userId',
        email: 'email',
        name: 'userName',
        lastName: 'last-name',
        organizations: [{ id: 'orgId', name: 'orgName', refreshIntervalSec: 18000 }],
        defaultOrganizationId: 'orgId',
      };
    });

    it('shows internal nav bar links', () => {
      const wrapper = getWrapper();
      const navBarInternalLinks = wrapper.find('[data-test="nav-bar-internal-links"]');
      expect(navBarInternalLinks.exists()).toBe(true);
      const navBarPublicLinks = wrapper.find('[data-test="nav-bar-public-links"]');
      expect(navBarPublicLinks.exists()).toBe(false);
    });

    it('redirects to \'/\' when clicking the fintoc logo', () => {
      const wrapper = getWrapper();
      const fintocLogo = wrapper.find('[data-test="fintoc-logo"]');
      expect(fintocLogo.exists()).toBe(true);
      expect(fintocLogo.attributes('href')).toEqual(undefined);
    });

    it.fails('shows organization settings link', () => {
      // Code for this is commented, should fix when the code gets re-added
      const wrapper = getWrapper();
      const navBarInternalLinks = wrapper.find('[data-test="nav-bar-internal-links"]');
      expect(navBarInternalLinks.exists()).toBe(true);
      const organizationSettingsLink = wrapper.find('[data-test="nav-bar-organization-settings-link"]');
      expect(organizationSettingsLink.exists()).toBe(true);
    });

    it('shows profile settings link', () => {
      const wrapper = getWrapper();
      const navBarInternalLinks = wrapper.find('[data-test="nav-bar-internal-links"]');
      expect(navBarInternalLinks.exists()).toBe(true);
      const profileSettingsLink = wrapper.find('[data-test="nav-bar-profile-settings-link"]');
      expect(profileSettingsLink.exists()).toBe(true);
    });
  });

  describe('when not logged in', () => {
    let userStore;
    beforeEach(() => {
      userStore = useUserStore();

      userStore.user = null;
    });
    it('shows public nav bar links', () => {
      const wrapper = getWrapper();
      const navBarPublicLinks = wrapper.find('[data-test="nav-bar-public-links"]');
      expect(navBarPublicLinks.exists()).toBe(true);
      const navBarInternalLinks = wrapper.find('[data-test="nav-bar-internal-links"]');
      expect(navBarInternalLinks.exists()).toBe(false);
    });
    it('fintoc logo redirects to fintoc.com', () => {
      const wrapper = getWrapper();
      const fintocLogo = wrapper.find('[data-test="fintoc-logo"]');
      expect(fintocLogo.exists()).toBe(true);
      expect(fintocLogo.attributes('href')).toEqual('https://fintoc.com');
    });
    it('shows organization settings link', () => {
      const wrapper = getWrapper();
      const organizationSettingsLink = wrapper.find('[data-test="nav-bar-organization-settings-link"]');
      expect(organizationSettingsLink.exists()).toBe(false);
    });
    it('shows profile settings link', () => {
      const wrapper = getWrapper();
      const profileSettingsLink = wrapper.find('[data-test="nav-bar-profile-settings-link"]');
      expect(profileSettingsLink.exists()).toBe(false);
    });
  });
});
