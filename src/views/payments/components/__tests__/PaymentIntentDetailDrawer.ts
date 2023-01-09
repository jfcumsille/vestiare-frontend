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
      const fintocErrorReason = 'fintoc-error-reason';
      fakePaymentIntent.fintocErrorReason = fintocErrorReason;
      const wrapper = getWrapper(fakePaymentIntent);
      const errorReason = wrapper.find('[data-test="fintoc-error-reason"]');
      expect(errorReason.exists()).toBe(true);
      expect(errorReason.text()).toEqual(fintocErrorReason);
    });
  });
});
