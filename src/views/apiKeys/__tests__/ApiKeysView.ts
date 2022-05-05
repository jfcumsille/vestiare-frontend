import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount, VueWrapper } from '@vue/test-utils';
import router from '@/router/index';
import { setupLocales } from '@/locales';
import { useAPIKeysStore } from '@/stores/apiKeys';
import { useConfigStore } from '@/stores/config';
import { Mode } from '@/interfaces/utilities/enums';
import { API_KEY_CREATED, API_KEY_DELETED, API_KEYS_VIEWED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import { mockCrypto } from '@/utils/tests/crypto';
import ApiKeysTableRow from '@/views/apiKeys/components/ApiKeysTableRow.vue';
import ApiKeysView from '@/views/apiKeys/ApiKeysView.vue';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(ApiKeysView, {
    global: {
      plugins: [testingPinia, router],
    },
  });
  return wrapper;
};

const checkIfApiKeyTableElementContainsText = async (
  apiKeyTableElement: VueWrapper<InstanceType<typeof ApiKeysTableRow>>,
  text: string,
) => {
  const apiKeyEyeToggle = apiKeyTableElement.find('[data-test="eye-toggle"]');
  expect(apiKeyEyeToggle.exists()).toBe(true);
  await apiKeyEyeToggle.trigger('click');
  const testKeyToken = apiKeyTableElement.find('[data-test="api-key-token"]');
  expect(testKeyToken.text()).toContain(text);
};

describe('ApiKeysView', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock, analyticsTrackMock);
  });

  describe('when ApiKeysView is mounted', () => {
    it('tracks ApiKeysView page view with analytics', () => {
      const wrapper = getWrapper();
      const apiKeysView = wrapper.find('[data-test="api-keys-view"]');
      expect(apiKeysView.exists()).toBe(true);
      expectToTrackWithAnalytics(analyticsPageMock, API_KEYS_VIEWED);
    });
  });

  describe('when user has 2 live keys and 2 test keys', () => {
    let apiKeysStore;
    beforeEach(() => {
      const configStore = useConfigStore();
      configStore.mode = Mode.Live;

      apiKeysStore = useAPIKeysStore();
      apiKeysStore.loading = false;
      apiKeysStore.apiKeys = [
        {
          id: 'public_live_key_1',
          token: 'pk_live_XXX',
          isPublic: true,
          mode: Mode.Live,
          createdAt: '2022-03-25T15:33:06.611Z',
        },
        {
          id: 'secret_live_key_2',
          token: 'sk_live_XXX',
          isPublic: false,
          mode: Mode.Live,
          createdAt: '2022-03-25T15:33:06.611Z',
        },
        {
          id: 'public_test_key_3',
          token: 'pk_test_XXX',
          isPublic: true,
          mode: Mode.Test,
          createdAt: '2022-03-25T15:33:06.611Z',
        },
        {
          id: 'secret_test_key_4',
          token: 'sk_test_XXX',
          isPublic: false,
          mode: Mode.Test,
          createdAt: '2022-03-25T15:33:06.611Z',
        },
      ];
    });
    it('should show live keys when mode is live', async () => {
      const wrapper = getWrapper();
      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableRow);
      expect(apiKeyTableElements.length).toBe(2);
      apiKeyTableElements.forEach((apiKeyTableElement) => {
        checkIfApiKeyTableElementContainsText(apiKeyTableElement, '_live_');
      });
    });

    it('should show test keys when mode is test', async () => {
      const configStore = useConfigStore();
      configStore.mode = Mode.Test;

      const wrapper = getWrapper();

      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableRow);
      expect(apiKeyTableElements.length).toBe(2);
      apiKeyTableElements.forEach((apiKeyTableElement) => {
        checkIfApiKeyTableElementContainsText(apiKeyTableElement, '_test_');
      });
    });

    it('should show keys hidden, and after toggle eye icon, show keys', async () => {
      const wrapper = getWrapper();

      const apiKeyTableElement = wrapper.findComponent(ApiKeysTableRow);
      expect(apiKeyTableElement.exists()).toBe(true);

      const liveKeyToken = apiKeyTableElement.find('[data-test="api-key-token"]');
      expect(liveKeyToken.exists()).toBe(true);
      expect(liveKeyToken.text()).toContain('•••••••••••••••••••••••');

      const apiKeyEyeToggle = apiKeyTableElement.find('[data-test="eye-toggle"]');
      expect(apiKeyEyeToggle.exists()).toBe(true);
      await apiKeyEyeToggle.trigger('click');

      expect(liveKeyToken.text()).toContain('_live_');
    });

    it('should not show Activate Secret Key', async () => {
      const wrapper = getWrapper();

      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableRow);
      apiKeyTableElements.forEach((apiKeyTableElement) => {
        expect(apiKeyTableElement.text()).not.toContain('Activate Secret Key');
      });
    });

    it('tracks \'API Key Deleted\' with analytics when key is deleted', async () => {
      const wrapper = getWrapper();

      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableRow);
      const moreOptionsButton = apiKeyTableElements[1].find('[data-test="more-options-button"]');
      expect(moreOptionsButton.exists()).toBe(true);
      await moreOptionsButton.trigger('click');

      const deleteKeyButton = apiKeyTableElements[1].find('[data-test="delete-key-button"]');
      expect(deleteKeyButton.exists()).toBe(true);
      await deleteKeyButton.trigger('click');

      expectToTrackWithAnalytics(analyticsTrackMock, API_KEY_DELETED, { id: 'secret_live_key_2', mode: 'live', is_public: 'false' });
    });
  });

  describe('when user has 1 live key and 2 test keys', () => {
    let apiKeysStore;
    beforeEach(() => {
      const configStore = useConfigStore();
      configStore.mode = Mode.Live;

      apiKeysStore = useAPIKeysStore();
      apiKeysStore.loading = false;
      apiKeysStore.apiKeys = [
        {
          id: 'public_live_key_1',
          token: 'pk_live_XXX',
          isPublic: true,
          mode: Mode.Live,
          createdAt: '2022-03-25T15:33:06.611Z',
        },
        {
          id: 'public_test_key_3',
          token: 'pk_test_XXX',
          isPublic: true,
          mode: Mode.Test,
          createdAt: '2022-03-25T15:33:06.611Z',
        },
        {
          id: 'secret_test_key_4',
          token: 'sk_test_XXX',
          isPublic: false,
          mode: Mode.Test,
          createdAt: '2022-03-25T15:33:06.611Z',
        },
      ];
    });
    it('should show public live key when mode is live and activate secret key', async () => {
      const wrapper = getWrapper();

      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableRow);
      expect(apiKeyTableElements.length).toBe(2);

      const apiKeyEyeToggle = apiKeyTableElements[0].find('[data-test="eye-toggle"]');
      expect(apiKeyEyeToggle.exists()).toBe(true);
      await apiKeyEyeToggle.trigger('click');
      const liveKeyToken = apiKeyTableElements[0].find('[data-test="api-key-token"]');
      expect(liveKeyToken.text()).toContain('pk_live_');
      const activateSecretKey = apiKeyTableElements[1].text();
      expect(activateSecretKey).toContain('Activate Secret Key');
    });

    it('should show test keys when mode is test', async () => {
      const configStore = useConfigStore();
      configStore.mode = Mode.Test;

      const wrapper = getWrapper();

      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableRow);
      expect(apiKeyTableElements.length).toBe(2);
      apiKeyTableElements.forEach((apiKeyTableElement) => {
        checkIfApiKeyTableElementContainsText(apiKeyTableElement, '_test_');
      });
    });

    it('should show keys hidden, and after toggle eye icon, show keys', async () => {
      const wrapper = getWrapper();

      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableRow);
      expect(apiKeyTableElements[1].text()).toContain('Activate Secret Key');

      const liveKeyToken = apiKeyTableElements[0].find('[data-test="api-key-token"]');
      expect(liveKeyToken.exists()).toBe(true);
      expect(liveKeyToken.text()).toContain('•••••••••••••••••••••••');

      const apiKeyEyeToggle = apiKeyTableElements[0].find('[data-test="eye-toggle"]');
      expect(apiKeyEyeToggle.exists()).toBe(true);
      await apiKeyEyeToggle.trigger('click');

      expect(liveKeyToken.text()).toContain('_live_');
    });

    it('tracks \'API Key Created\' with analytics when key is created', async () => {
      const wrapper = getWrapper();

      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableRow);
      expect(apiKeyTableElements[1].text()).toContain('Activate Secret Key');
      const activateKeyButton = apiKeyTableElements[1].find('[data-test="activate-key-button"]');
      expect(activateKeyButton.exists()).toBe(true);
      await activateKeyButton.trigger('click');

      expectToTrackWithAnalytics(analyticsTrackMock, API_KEY_CREATED, { mode: 'live', is_public: 'false' });
    });
  });
});
