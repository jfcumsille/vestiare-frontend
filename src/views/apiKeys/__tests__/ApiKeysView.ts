import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { useAPIKeysStore } from '@/stores/apiKeys';
import { setupLocales } from '@/locales';
import ApiKeysTableElement from '@/views/apiKeys/components/ApiKeysTableElement.vue';
import ApiKeysView from '../ApiKeysView.vue';

describe('NavBar', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    setupLocales();
  });

  describe('when user has 2 live keys and 2 test keys', () => {
    let apiKeysStore;
    beforeEach(() => {
      apiKeysStore = useAPIKeysStore();
      apiKeysStore.loading = false;
      apiKeysStore.apiKeys = [
        {
          id: '1',
          token: 'pk_live_XXX',
          isPublic: true,
          mode: 'live',
        },
        {
          id: '2',
          token: 'sk_live_XXX',
          isPublic: false,
          mode: 'live',
        },
        {
          id: '3',
          token: 'pk_test_XXX',
          isPublic: true,
          mode: 'test',
        },
        {
          id: '4',
          token: 'sk_test_XXX',
          isPublic: false,
          mode: 'test',
        },
      ];
    });
    it('should show live keys when mode is live', async () => {
      const wrapper = mount(ApiKeysView);
      const modeToggle = wrapper.find('[data-test="mode-toggle"]');
      expect(modeToggle.exists()).toBe(true);

      const apiKeyTableElement = wrapper.findComponent(ApiKeysTableElement);
      expect(apiKeyTableElement.exists()).toBe(true);

      const apiKeyEyeToggle = apiKeyTableElement.find('[data-test="eye-toggle"]');
      expect(apiKeyEyeToggle.exists()).toBe(true);
      await apiKeyEyeToggle.trigger('click');

      const liveKeyToken = apiKeyTableElement.find('[data-test="api-key-token"]');
      expect(liveKeyToken.exists()).toBe(true);
      expect(liveKeyToken.text()).toContain('_live_');
    });

    it('should show test keys when mode is test', async () => {
      const wrapper = mount(ApiKeysView);
      const modeToggle = wrapper.find('[data-test="mode-toggle"]');
      expect(modeToggle.exists()).toBe(true);
      await modeToggle.trigger('click');

      const apiKeyTableElement = wrapper.findComponent(ApiKeysTableElement);
      expect(apiKeyTableElement.exists()).toBe(true);

      const apiKeyEyeToggle = apiKeyTableElement.find('[data-test="eye-toggle"]');
      expect(apiKeyEyeToggle.exists()).toBe(true);
      await apiKeyEyeToggle.trigger('click');

      const testKeyToken = apiKeyTableElement.find('[data-test="api-key-token"]');
      expect(testKeyToken.exists()).toBe(true);
      expect(testKeyToken.text()).toContain('_test_');
    });

    it('should change opacity for test when mode toggle is pressed', async () => {
      const wrapper = mount(ApiKeysView);
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
      const wrapper = mount(ApiKeysView);
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
      const wrapper = mount(ApiKeysView);
      const apiKeyTableElement = wrapper.findComponent(ApiKeysTableElement);
      expect(apiKeyTableElement.text()).not.toContain('Activate Secret Key');
    });
  });

  describe('when user has 1 live key and 2 test keys', () => {
    let apiKeysStore;
    beforeEach(() => {
      apiKeysStore = useAPIKeysStore();
      apiKeysStore.loading = false;
      apiKeysStore.apiKeys = [
        {
          id: '1',
          token: 'pk_live_XXX',
          isPublic: true,
          mode: 'live',
        },
        {
          id: '3',
          token: 'pk_test_XXX',
          isPublic: true,
          mode: 'test',
        },
        {
          id: '4',
          token: 'sk_test_XXX',
          isPublic: false,
          mode: 'test',
        },
      ];
    });
    it('should show live keys when mode is live', async () => {
      const wrapper = mount(ApiKeysView);
      const modeToggle = wrapper.find('[data-test="mode-toggle"]');
      expect(modeToggle.exists()).toBe(true);

      const apiKeyTableElement = wrapper.findComponent(ApiKeysTableElement);
      expect(apiKeyTableElement.exists()).toBe(true);

      const apiKeyEyeToggle = apiKeyTableElement.find('[data-test="eye-toggle"]');
      expect(apiKeyEyeToggle.exists()).toBe(true);
      await apiKeyEyeToggle.trigger('click');

      const liveKeyToken = apiKeyTableElement.find('[data-test="api-key-token"]');
      expect(liveKeyToken.exists()).toBe(true);
      expect(liveKeyToken.text()).toContain('_live_');
    });

    it('should show test keys when mode is test', async () => {
      const wrapper = mount(ApiKeysView);
      const modeToggle = wrapper.find('[data-test="mode-toggle"]');
      expect(modeToggle.exists()).toBe(true);
      await modeToggle.trigger('click');

      const apiKeyTableElement = wrapper.findComponent(ApiKeysTableElement);
      expect(apiKeyTableElement.exists()).toBe(true);

      const apiKeyEyeToggle = apiKeyTableElement.find('[data-test="eye-toggle"]');
      expect(apiKeyEyeToggle.exists()).toBe(true);
      await apiKeyEyeToggle.trigger('click');

      const testKeyToken = apiKeyTableElement.find('[data-test="api-key-token"]');
      expect(testKeyToken.exists()).toBe(true);
      expect(testKeyToken.text()).toContain('_test_');
    });

    it('should change opacity for test when mode toggle is pressed', async () => {
      const wrapper = mount(ApiKeysView);
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

    it('should show Activate Secret Key', async () => {
      const wrapper = mount(ApiKeysView);
      const apiKeyTableElement = wrapper.findComponent(ApiKeysTableElement);
      expect(apiKeyTableElement.text()).toContain('Activate Secret Key');
    });

    it('should show keys hidden, and after toggle eye icon, show keys', async () => {
      const wrapper = mount(ApiKeysView);
      const apiKeyTableElement = wrapper.findComponent(ApiKeysTableElement);
      expect(apiKeyTableElement.text()).toContain('Activate Secret Key');

      const liveKeyToken = apiKeyTableElement.find('[data-test="api-key-token"]');
      expect(liveKeyToken.exists()).toBe(true);
      expect(liveKeyToken.text()).toContain('•••••••••••••••••••••••');

      const apiKeyEyeToggle = apiKeyTableElement.find('[data-test="eye-toggle"]');
      expect(apiKeyEyeToggle.exists()).toBe(true);
      await apiKeyEyeToggle.trigger('click');

      expect(liveKeyToken.text()).toContain('_live_');
    });
  });
});
