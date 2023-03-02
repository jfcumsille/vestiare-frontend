import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import router from '@/router';
import { mockCrypto } from '@/utils/tests/crypto';
import { setupLocales } from '@/locales';
import { usePaymentsStore } from '@/stores/payments';
import CheckIcon from '@/assets/svg/CheckIcon.vue';
import i18next from 'i18next';
import PaymentsExportDrawer from '../PaymentsExportDrawer.vue';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const getWrapper = () => {
  const wrapper = mount(PaymentsExportDrawer, {
    global: {
      plugins: [testingPinia, router],
    },
    props: { open: true },
  });
  return wrapper;
};

describe('PaymentsExportDrawer', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
  });

  describe('when exportReady is true', async () => {
    it('shows correct spanish texts', async () => {
      const paymentsStore = usePaymentsStore();
      paymentsStore.exportReady = true;
      paymentsStore.exportTimeout = false;
      await i18next.changeLanguage('es');
      const wrapper = getWrapper();

      const checkIcon = wrapper.findComponent(CheckIcon);
      expect(checkIcon.exists()).toBe(true);

      const title = wrapper.find('[data-test="title"]');
      expect(title.exists()).toBe(true);
      expect(title.text()).toMatch('Tu archivo está listo.');

      const subtitle = wrapper.find('[data-test="subtitle"]');
      expect(subtitle.exists()).toBe(true);
      expect(subtitle.text()).toMatch('Si no puedes ver tu archivo puedes intentar descargarlo de nuevo.');

      const subtitle2 = wrapper.find('[data-test="subtitle2"]');
      expect(subtitle2.exists()).toBe(false);
    });

    it('shows correct english texts', async () => {
      const paymentsStore = usePaymentsStore();
      paymentsStore.exportReady = true;
      paymentsStore.exportTimeout = false;
      await i18next.changeLanguage('en');
      const wrapper = getWrapper();

      const checkIcon = wrapper.findComponent(CheckIcon);
      expect(checkIcon.exists()).toBe(true);

      const title = wrapper.find('[data-test="title"]');
      expect(title.exists()).toBe(true);
      expect(title.text()).toMatch('Your export is ready.');

      const subtitle = wrapper.find('[data-test="subtitle"]');
      expect(subtitle.exists()).toBe(true);
      expect(subtitle.text()).toMatch('If you don\'t see your file you can try downloading it again.');

      const subtitle2 = wrapper.find('[data-test="subtitle2"]');
      expect(subtitle2.exists()).toBe(false);
    });
  });

  describe('when exportTimeout is true', async () => {
    it('shows correct spanish texts', async () => {
      const paymentsStore = usePaymentsStore();
      paymentsStore.exportReady = false;
      paymentsStore.exportTimeout = true;
      await i18next.changeLanguage('es');
      const wrapper = getWrapper();

      const checkIcon = wrapper.findComponent(CheckIcon);
      expect(checkIcon.exists()).toBe(true);

      const title = wrapper.find('[data-test="title"]');
      expect(title.exists()).toBe(true);
      expect(title.text()).toMatch('Tu descarga está siendo enviada a tu correo electrónico.');

      const subtitle = wrapper.find('[data-test="subtitle"]');
      expect(subtitle.exists()).toBe(true);
      expect(subtitle.text()).toMatch('Por favor permite de 5 a 10 minutos para que el correo electrónico te llegue.');

      const subtitle2 = wrapper.find('[data-test="subtitle2"]');
      expect(subtitle2.exists()).toBe(true);
      expect(subtitle2.text()).toMatch('Si no has recibido nada después de 20 minutos, por favor intenta de nuevo.');
    });

    it('shows correct english texts', async () => {
      const paymentsStore = usePaymentsStore();
      paymentsStore.exportReady = false;
      paymentsStore.exportTimeout = true;
      await i18next.changeLanguage('en');
      const wrapper = getWrapper();

      const checkIcon = wrapper.findComponent(CheckIcon);
      expect(checkIcon.exists()).toBe(true);

      const title = wrapper.find('[data-test="title"]');
      expect(title.exists()).toBe(true);
      expect(title.text()).toMatch('Your download is being sent to your email.');

      const subtitle = wrapper.find('[data-test="subtitle"]');
      expect(subtitle.exists()).toBe(true);
      expect(subtitle.text()).toMatch('Please allow for 5-10 minutes for the email to reach you.');

      const subtitle2 = wrapper.find('[data-test="subtitle2"]');
      expect(subtitle2.exists()).toBe(true);
      expect(subtitle2.text()).toMatch('If you have not received anything after 20 minutes please try again.');
    });
  });
});
