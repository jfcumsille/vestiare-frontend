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
  LINK_CREATED,
  LINKS_VIEWED,
} from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import { mockCrypto } from '@/utils/tests/crypto';
import LinksView from '@/views/links/LinksView.vue';
import CreateLinkModal from '@/views/links/components/CreateLinkModal.vue';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(LinksView, {
    global: {
      plugins: [testingPinia, router],
    },
  });
  return wrapper;
};

describe('LinksView', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock, analyticsTrackMock);
  });

  describe('when LinksView is mounted', () => {
    it('tracks LinksView page view with analytics', () => {
      const wrapper = getWrapper();
      const linksView = wrapper.find('[data-test="links-view"]');
      expect(linksView.exists()).toBe(true);
      expectToTrackWithAnalytics(analyticsPageMock, LINKS_VIEWED, { origin: 'dashboard' });
    });
  });

  describe('when create link modal is opened', () => {
    it('tracks \'Modal Viewed\' with analytics', async () => {
      const wrapper = getWrapper();

      const createButton = wrapper.find('[data-test="create-link-button"]');
      expect(createButton.exists()).toBe(true);
      await createButton.trigger('click');
      const properties = { action: 'create', location: 'links' };
      expectToTrackWithAnalytics(analyticsTrackMock, MODAL_VIEWED, properties);
    });
  });

  describe('when create link modal is closed', () => {
    it('tracks \'Modal Viewed\' with analytics', async () => {
      const wrapper = getWrapper();

      const createButton = wrapper.find('[data-test="create-link-button"]');
      expect(createButton.exists()).toBe(true);
      await createButton.trigger('click');

      const createModal = wrapper.findComponent(CreateLinkModal);
      expect(createModal.exists()).toBe(true);
      createModal.vm.$emit('close');

      const properties = { action: 'create', location: 'links' };
      expectToTrackWithAnalytics(analyticsTrackMock, MODAL_CLOSED, properties);
    });
  });

  describe('when link is created', () => {
    it('tracks \'Link Created\' with analytics', async () => {
      const wrapper = getWrapper();

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
        preventRefresh: false,
        username: 'username',
        lastTimeRefreshed: 'x',
        accountsCount: 1,
      };

      wrapper.vm.setLink(link, 'MOVEMENTS');

      const properties = {
        mode: 'test',
        link_id: 'id',
        institution_id: 'id',
        holder_type: 'individual',
        holder_id: 'holderId',
        username: 'username',
        created_at: '1',
        product: 'MOVEMENTS',
        origin: 'dashboard',
      };
      expectToTrackWithAnalytics(analyticsTrackMock, LINK_CREATED, properties);
    });
  });
});
