import {
  describe, it, expect, beforeEach, vi,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount, VueWrapper } from '@vue/test-utils';
import router from '@/router/index';
import { setupLocales } from '@/locales';
import { Mode } from '@/interfaces/utilities/enums';
import { API_KEY_CREATED, API_KEY_DELETED, API_KEYS_VIEWED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import ApiKeysTableElement from '@/views/apiKeys/components/ApiKeysTableElement.vue';
import ApiKeysView from '@/views/apiKeys/ApiKeysView.vue';

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(ApiKeysView, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
        router,
      ],
    },
  });
  return wrapper;
};

const checkIfApiKeyTableElementContainsText = async (
  apiKeyTableElement: VueWrapper<InstanceType<typeof ApiKeysTableElement>>,
  text: string,
) => {
  const apiKeyEyeToggle = apiKeyTableElement.find('[data-test="eye-toggle"]');
  expect(apiKeyEyeToggle.exists()).toBe(true);
  await apiKeyEyeToggle.trigger('click');
  const testKeyToken = apiKeyTableElement.find('[data-test="api-key-token"]');
  expect(testKeyToken.text()).toContain(text);
};

describe('ApiKeysView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
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
    let wrapper: VueWrapper<InstanceType<typeof ApiKeysView>>;
    beforeEach(() => {
      wrapper = getWrapper();
      wrapper.vm.apiKeysStore.loading = false;
      wrapper.vm.apiKeysStore.apiKeys = [
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
      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableElement);
      expect(apiKeyTableElements.length).toBe(2);
      apiKeyTableElements.forEach((apiKeyTableElement) => {
        checkIfApiKeyTableElementContainsText(apiKeyTableElement, '_live_');
      });
    });

    it('should show test keys when mode is test', async () => {
      const modeToggle = wrapper.find('[data-test="mode-toggle"]');
      expect(modeToggle.exists()).toBe(true);
      await modeToggle.trigger('click');
      await wrapper.vm.$forceUpdate();
      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableElement);
      expect(apiKeyTableElements.length).toBe(2);
      apiKeyTableElements.forEach((apiKeyTableElement) => {
        checkIfApiKeyTableElementContainsText(apiKeyTableElement, '_test_');
      });
    });

    it('should change opacity for test when mode toggle is pressed', async () => {
      const modeToggle = wrapper.find('[data-test="mode-toggle"]');
      const testText = wrapper.find('[data-test="mode-test"]');
      const liveText = wrapper.find('[data-test="mode-live"]');
      expect(modeToggle.exists()).toBe(true);
      expect(testText.exists()).toBe(true);
      expect(liveText.exists()).toBe(true);

      expect(liveText.classes().some((cls) => cls.includes('opacity-25'))).toBe(false);
      expect(testText.classes().some((cls) => cls.includes('opacity-25'))).toBe(true);

      await modeToggle.trigger('click');

      expect(liveText.classes().some((cls) => cls.includes('opacity-25'))).toBe(true);
      expect(testText.classes().some((cls) => cls.includes('opacity-25'))).toBe(false);
    });

    it('should show keys hidden, and after toggle eye icon, show keys', async () => {
      const apiKeyTableElement = wrapper.findComponent(ApiKeysTableElement);
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
      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableElement);
      apiKeyTableElements.forEach((apiKeyTableElement) => {
        expect(apiKeyTableElement.text()).not.toContain('Activate Secret Key');
      });
    });

    it('tracks \'API Key Deleted\' with analytics when key is deleted', async () => {
      wrapper.vm.mode = Mode.Live;
      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableElement);
      const moreOptionsButton = apiKeyTableElements[1].find('[data-test="more-options-button"]');
      expect(moreOptionsButton.exists()).toBe(true);
      await moreOptionsButton.trigger('click');

      const deleteKeyButton = apiKeyTableElements[1].find('[data-test="delete-key-button"]');
      expect(deleteKeyButton.exists()).toBe(true);
      await deleteKeyButton.trigger('click');

      await wrapper.vm.$forceUpdate();

      expectToTrackWithAnalytics(analyticsTrackMock, API_KEY_DELETED, { id: 'secret_live_key_2', mode: 'live', is_public: 'false' });
    });
  });

  describe('when user has 1 live key and 2 test keys', () => {
    let wrapper: VueWrapper<InstanceType<typeof ApiKeysView>>;
    beforeEach(() => {
      wrapper = getWrapper();
      wrapper.vm.apiKeysStore.loading = false;
      wrapper.vm.apiKeysStore.apiKeys = [
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
      await wrapper.vm.$forceUpdate();
      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableElement);
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
      const modeToggle = wrapper.find('[data-test="mode-toggle"]');
      expect(modeToggle.exists()).toBe(true);
      await modeToggle.trigger('click');
      await wrapper.vm.$forceUpdate();
      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableElement);
      expect(apiKeyTableElements.length).toBe(2);
      apiKeyTableElements.forEach((apiKeyTableElement) => {
        checkIfApiKeyTableElementContainsText(apiKeyTableElement, '_test_');
      });
    });

    it('should change opacity for test when mode toggle is pressed', async () => {
      const modeToggle = wrapper.find('[data-test="mode-toggle"]');
      const testText = wrapper.find('[data-test="mode-test"]');
      const liveText = wrapper.find('[data-test="mode-live"]');
      expect(modeToggle.exists()).toBe(true);
      expect(testText.exists()).toBe(true);
      expect(liveText.exists()).toBe(true);

      expect(liveText.classes().some((cls) => cls.includes('opacity-25'))).toBe(false);
      expect(testText.classes().some((cls) => cls.includes('opacity-25'))).toBe(true);

      await modeToggle.trigger('click');

      expect(liveText.classes().some((cls) => cls.includes('opacity-25'))).toBe(true);
      expect(testText.classes().some((cls) => cls.includes('opacity-25'))).toBe(false);
    });

    it('should show keys hidden, and after toggle eye icon, show keys', async () => {
      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableElement);
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
      const apiKeyTableElements = wrapper.findAllComponents(ApiKeysTableElement);
      expect(apiKeyTableElements[1].text()).toContain('Activate Secret Key');
      const activateKeyButton = apiKeyTableElements[1].find('[data-test="activate-key-button"]');
      expect(activateKeyButton.exists()).toBe(true);
      await activateKeyButton.trigger('click');
      await wrapper.vm.$forceUpdate();
      expectToTrackWithAnalytics(analyticsTrackMock, API_KEY_CREATED, { mode: 'live', is_public: 'false' });
    });
  });
});
