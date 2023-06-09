import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import { Link } from '@/interfaces/entities/links';
import { CountryCode, Mode } from '@/interfaces/utilities/enums';
import {
  MODAL_VIEWED,
  MODAL_CLOSED,
  LINK_ACTIVE_CHANGED,
  LINK_DELETED,
  LINK_REFRESHED,
} from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import { mockCrypto } from '@/utils/tests/crypto';
import LinksTableRow from '@/views/links/components/LinksTableRow.vue';
import AlertModal from '@/components/AlertModal.vue';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const link: Link = {
    id: 'id',
    active: true,
    createdAt: '1',
    holderId: 'holderId',
    holderName: 'name',
    holderType: 'individual',
    institution: {
      id: 'id',
      country: CountryCode.CL,
      name: 'cl_banco_estado',
    },
    mode: Mode.Test,
    preventRefresh: true,
    username: 'username',
    lastTimeRefreshed: 'x',
    accountsCount: 1,
  };
  const wrapper = mount(LinksTableRow, {
    global: {
      plugins: [testingPinia, router],
    },
    props: { link },
  });
  return wrapper;
};

describe('LinksTableRow', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock, analyticsTrackMock);
  });

  describe('when delete link alert modal is opened', () => {
    it('tracks \'Modal Viewed\' with analytics', async () => {
      const wrapper = getWrapper();

      const removeLinkButton = wrapper.find('[data-test="remove-link-button"]');
      expect(removeLinkButton.exists()).toBe(true);
      await removeLinkButton.trigger('click');

      const deleteLinkModal = wrapper.findComponent(AlertModal);
      expect(deleteLinkModal.exists()).toBe(true);

      const properties = { action: 'delete', location: 'links' };
      expectToTrackWithAnalytics(analyticsTrackMock, MODAL_VIEWED, properties);
    });
  });

  describe('when delete link alert modal is closed', () => {
    it('tracks \'Modal Viewed\' with analytics', async () => {
      const wrapper = getWrapper();

      const removeLinkButton = wrapper.find('[data-test="remove-link-button"]');
      expect(removeLinkButton.exists()).toBe(true);
      await removeLinkButton.trigger('click');

      const deleteLinkModal = wrapper.findComponent(AlertModal);
      expect(deleteLinkModal.exists()).toBe(true);
      deleteLinkModal.vm.$emit('close');

      const properties = { action: 'delete', location: 'links' };
      expectToTrackWithAnalytics(analyticsTrackMock, MODAL_CLOSED, properties);
    });
  });

  describe('when Delete Link is confirmed', () => {
    it('tracks \'Link Deleted\' with analytics', async () => {
      const wrapper = getWrapper();

      const removeLinkButton = wrapper.find('[data-test="remove-link-button"]');
      expect(removeLinkButton.exists()).toBe(true);
      await removeLinkButton.trigger('click');

      const deleteLinkModal = wrapper.findComponent(AlertModal);
      expect(deleteLinkModal.exists()).toBe(true);
      wrapper.vm.remove();
      await wrapper.vm.$forceUpdate();

      const properties = { id: 'id', origin: 'dashboard' };
      expectToTrackWithAnalytics(analyticsTrackMock, LINK_DELETED, properties);
    });
  });

  describe('when Link active is toggled', () => {
    it('tracks \'Link Active Changed\' with analytics', async () => {
      const wrapper = getWrapper();

      const linkActiveToggle = wrapper.find('[data-test="link-active-toggle"]');
      expect(linkActiveToggle.exists()).toBe(true);
      await linkActiveToggle.trigger('click');

      const properties = { id: 'id', active: true };
      expectToTrackWithAnalytics(analyticsTrackMock, LINK_ACTIVE_CHANGED, properties);
    });
  });

  describe('when refresh link is clicked', () => {
    it('opens modal and tracks \'Modal Viewed\' with analytics', async () => {
      const wrapper = getWrapper();

      const badge = wrapper.find('[data-test="credentials-validity-badge"]');
      expect(badge.exists()).toBe(true);
      await badge.trigger('click');

      const refreshLinkModal = wrapper.findComponent(AlertModal);
      expect(refreshLinkModal.exists()).toBe(true);

      const properties = { action: 'refresh', location: 'links' };
      expectToTrackWithAnalytics(analyticsTrackMock, MODAL_VIEWED, properties);
    });
  });

  describe('when refresh link modal is closed', () => {
    it('closes modal and tracks \'Modal Viewed\' with analytics', async () => {
      const wrapper = getWrapper();

      const badge = wrapper.find('[data-test="credentials-validity-badge"]');
      expect(badge.exists()).toBe(true);
      await badge.trigger('click');

      const refreshLinkModal = wrapper.findComponent(AlertModal);
      expect(refreshLinkModal.exists()).toBe(true);
      refreshLinkModal.vm.$emit('close');
      await wrapper.vm.$forceUpdate();

      const properties = { action: 'refresh', location: 'links' };
      expectToTrackWithAnalytics(analyticsTrackMock, MODAL_CLOSED, properties);
    });
  });

  describe('when refresh link is confirmed', () => {
    it('tracks \'Link Refreshed\' with analytics', async () => {
      const wrapper = getWrapper();

      const badge = wrapper.find('[data-test="credentials-validity-badge"]');
      expect(badge.exists()).toBe(true);
      await badge.trigger('click');

      const refreshLinkModal = wrapper.findComponent(AlertModal);
      expect(refreshLinkModal.exists()).toBe(true);
      wrapper.vm.refresh();
      await wrapper.vm.$forceUpdate();

      const properties = { id: 'id', origin: 'dashboard' };
      expectToTrackWithAnalytics(analyticsTrackMock, LINK_REFRESHED, properties);
    });
  });
});
