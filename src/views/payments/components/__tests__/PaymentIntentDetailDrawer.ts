import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { PaymentIntent } from '@/interfaces/entities/paymentIntents';
import { Account } from '@/interfaces/entities/account';
import { CountryCode, PaymentStatus } from '@/interfaces/utilities/enums';
import router from '@/router';
import { mockCrypto } from '@/utils/tests/crypto';
import { setupLocales } from '@/locales';
import { DOCS_PAYMENTS_ERROR_REASONS } from '@/constants/urls';
import PaymentIntentDetailDrawer from '../PaymentIntentDetailDrawer.vue';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const fakeAccount: Account = {
  holderId: '111111111',
  holderName: 'Example Name',
  number: '11111111',
  type: 'checking_account',
  institution: {
    id: 'cl_example_bank',
    country: CountryCode.CL,
    name: 'Example Bank',
  },
};
const fakePaymentIntent: PaymentIntent = {
  id: 'pi_123456789',
  amount: 100000,
  currency: 'CLP',
  createdAt: '2022-01-01T18:00:00Z',
  recipientAccount: fakeAccount,
  referenceId: 'id',
  senderAccount: fakeAccount,
  status: PaymentStatus.Succeeded,
  fintocErrorReason: null,
  metadata: {},
};

const getWrapper = (paymentIntent: PaymentIntent) => {
  const wrapper = mount(PaymentIntentDetailDrawer, {
    global: {
      plugins: [testingPinia, router],
    },
    props: { paymentIntent, open: true },
  });
  return wrapper;
};

describe('PaymentIntentDetailDrawer', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
  });

  describe('when fintoc error reason is null', () => {
    it('does not show reason div', () => {
      const wrapper = getWrapper(fakePaymentIntent);
      const errorReason = wrapper.find('[data-test="fintoc-error-reason"]');
      expect(errorReason.exists()).toBe(false);
    });
  });
  describe('when fintoc error reason is set', () => {
    it('shows reason div', async () => {
      const fintocErrorReason = 'fintoc_error_reason';
      fakePaymentIntent.fintocErrorReason = fintocErrorReason;
      const wrapper = getWrapper(fakePaymentIntent);
      const errorReason = wrapper.find('[data-test="fintoc-error-reason"] a');
      expect(errorReason.exists()).toBe(true);
      expect(errorReason.text()).toEqual(`${fintocErrorReason} →`);
      expect(errorReason.attributes('href')).toEqual(DOCS_PAYMENTS_ERROR_REASONS);
    });
  });

  describe('when metadata object is empty', () => {
    it('shouldn\'t show metadata section', async () => {
      fakePaymentIntent.metadata = {};
      const wrapper = getWrapper(fakePaymentIntent);
      const metadataDiv = wrapper.find('[data-test="metadata"]');
      expect(metadataDiv.exists()).toBe(false);
    });
  });

  describe('when metadata object is not empty', () => {
    it('should show metadata section', async () => {
      const metadata = {
        key1: 'value1',
        key2: 1234,
        key3: true,
      };
      fakePaymentIntent.metadata = metadata;
      const wrapper = getWrapper(fakePaymentIntent);
      const metadataDiv = wrapper.find('[data-test="metadata"]');
      expect(metadataDiv.exists()).toBe(true);
    });
  });
});
