import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import { mockCrypto } from '@/utils/tests/crypto';
import PlanSection from '@/views/organization/components/PlanSection.vue';
import router from '@/router/index';
import { useOrganizationStore } from '@/stores/organization';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const getWrapper = () => {
  const wrapper = mount(PlanSection, {
    global: {
      plugins: [testingPinia, router],
    },
  });
  return wrapper;
};

const DAY_IN_MILLISECONDS = 86400000;
const dummyOrganization = {
  id: 'org_id',
  name: 'name',
  countryCode: 'cl',
  rut: '197413611',
  billingMail: 'email@gmail.com',
  technicalEmail: 'email@gmail.com',
  freeTrialExpirationDate: '0',
  isPayingCustomer: false,
  refreshPolicies: [],
  organizationProducts: [],
  apiVersion: null,
};

describe('PlanSection', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
  });

  describe('when Plan is Trial', () => {
    it('renders correct texts', () => {
      const orgStore = useOrganizationStore();
      const fiveDaysAfterNow = new Date(Date.now() + 5 * DAY_IN_MILLISECONDS);
      dummyOrganization.freeTrialExpirationDate = fiveDaysAfterNow.toString();
      orgStore.organization = dummyOrganization;
      orgStore.loading = false;

      const wrapper = getWrapper();
      const subtitle1 = wrapper.find('[data-test="plan-subtitle1"]');
      const subtitle2 = wrapper.find('[data-test="plan-subtitle2"]');
      expect(subtitle1.exists()).toBe(true);
      expect(subtitle1.text()).toContain('You are currently on Trial plan. You will be downgraded to Free plan on');
      expect(subtitle2.text()).toContain('You can connect unlimited accounts in Test and Live mode in Trial, afterwards you will only be left with 5 active individual Links in Live mode.');
    });
  });

  describe('when Plan is Paid', () => {
    it('renders correct texts', () => {
      const orgStore = useOrganizationStore();
      dummyOrganization.isPayingCustomer = true;
      orgStore.organization = dummyOrganization;
      orgStore.loading = false;

      const wrapper = getWrapper();
      const subtitle1 = wrapper.find('[data-test="plan-subtitle1"]');
      const subtitle2 = wrapper.find('[data-test="plan-subtitle2"]');
      expect(subtitle1.exists()).toBe(true);
      expect(subtitle1.text()).toContain('You are currently on Paid plan with');
      expect(subtitle1.text()).toContain('products hired.');
      expect(subtitle2.text()).toMatch('');
    });
  });

  describe('when Plan is Free', () => {
    it('renders correct texts', () => {
      const orgStore = useOrganizationStore();
      const twoDaysBeforeNow = new Date(Date.now() - 1 * DAY_IN_MILLISECONDS);
      dummyOrganization.freeTrialExpirationDate = twoDaysBeforeNow.toString();
      dummyOrganization.isPayingCustomer = false;
      orgStore.organization = dummyOrganization;
      orgStore.loading = false;

      const wrapper = getWrapper();
      const subtitle1 = wrapper.find('[data-test="plan-subtitle1"]');
      const subtitle2 = wrapper.find('[data-test="plan-subtitle2"]');
      expect(subtitle1.exists()).toBe(true);
      expect(subtitle2.exists()).toBe(true);
      expect(subtitle1.text()).toMatch('You are currently on Free plan.');
      expect(subtitle2.text()).toMatch('You only have access to 5 active Links in Live mode.');
    });
  });

  describe('when organization from store is null', () => {
    it('renders correct texts', () => {
      const orgStore = useOrganizationStore();
      orgStore.loading = false;
      orgStore.organization = null;

      const wrapper = getWrapper();
      const subtitle1 = wrapper.find('[data-test="plan-subtitle1"]');
      const subtitle2 = wrapper.find('[data-test="plan-subtitle2"]');
      expect(subtitle1.exists()).toBe(true);
      expect(subtitle2.exists()).toBe(true);
      expect(subtitle1.text()).toMatch('You are currently on Free plan.');
      expect(subtitle2.text()).toMatch('You only have access to 5 active Links in Live mode.');
    });
  });
});
