import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import { ORGANIZATION_VIEWED, ORG_SETTINGS_CHANGE_REQUESTED, ORG_SETTINGS_EDITED } from '@/constants/analyticsEvents';
import { expectToTrackWithAnalytics, mockPageAndTrackAnalytics } from '@/utils/tests/analytics';
import { mockCrypto } from '@/utils/tests/crypto';
import OrganizationView from '@/views/organization/OrganizationView.vue';
import router from '@/router/index';
import { useOrganizationStore } from '@/stores/organization';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const analyticsPageMock = vi.fn();
const analyticsTrackMock = vi.fn();

const getWrapper = () => {
  const wrapper = mount(OrganizationView, {
    global: {
      plugins: [testingPinia, router],
    },
  });
  return wrapper;
};

const dummyOrganization = {
  id: 'org_id',
  name: 'name',
  countryCode: 'cl',
  rut: '197413611',
  billingMail: 'email@gmail.com',
  technicalEmail: 'email@gmail.com',
  freeTrialExpirationDate: '',
  isPayingCustomer: false,
  refreshPolicies: [],
  organizationProducts: [],
  apiVersion: null,
};

describe('OrganizationView', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
    mockPageAndTrackAnalytics(analyticsPageMock, analyticsTrackMock);
  });

  describe('when OrganizationView is mounted', () => {
    it('tracks OrganizationView page view with analytics', () => {
      const wrapper = getWrapper();
      const organizationView = wrapper.find('[data-test="organization-view"]');
      expect(organizationView.exists()).toBe(true);
      expectToTrackWithAnalytics(analyticsPageMock, ORGANIZATION_VIEWED, { origin: 'dashboard' });
    });
  });

  describe('when OrganizationView is not in edit mode', () => {
    it('only allow user to see org info', () => {
      const orgStore = useOrganizationStore();
      orgStore.organization = dummyOrganization;
      orgStore.loading = false;
      const wrapper = getWrapper();

      const editButton = wrapper.find('[data-test="edit-button"]');
      const cancelButton = wrapper.find('[data-test="cancel-button"]');

      const requestChangeName = wrapper.find('[data-test="request-change-name"]');
      const requestChangeRut = wrapper.find('[data-test="request-change-rut"]');

      const billingLabel = wrapper.find('[data-test="billing-label"]');
      const billingInput = wrapper.find('[data-test="billing-input"]');

      const technicalLabel = wrapper.find('[data-test="technical-label"]');
      const technicalInput = wrapper.find('[data-test="technical-input"]');

      const countryLabel = wrapper.find('[data-test="country-label"]');
      const countryDropdown = wrapper.find('[data-test="country-dropdown"]');

      expect(editButton.exists()).toBe(true);
      expect(cancelButton.exists()).toBe(false);
      expect(requestChangeName.exists()).toBe(false);
      expect(requestChangeRut.exists()).toBe(false);
      expect(billingLabel.exists()).toBe(true);
      expect(billingInput.exists()).toBe(false);
      expect(technicalLabel.exists()).toBe(true);
      expect(technicalInput.exists()).toBe(false);
      expect(countryLabel.exists()).toBe(true);
      expect(countryDropdown.exists()).toBe(false);
    });
  });

  describe('when OrganizationView is in edit mode', () => {
    it('only allow user to edit org info', async () => {
      const orgStore = useOrganizationStore();
      orgStore.organization = dummyOrganization;
      orgStore.loading = false;
      const wrapper = getWrapper();

      const editButton = wrapper.find('[data-test="edit-button"]');

      expect(editButton.exists()).toBe(true);
      await editButton.trigger('click');
      await wrapper.vm.$forceUpdate();

      const cancelButton = wrapper.find('[data-test="cancel-button"]');
      const requestChangeName = wrapper.find('[data-test="request-change-name"]');
      const requestChangeRut = wrapper.find('[data-test="request-change-rut"]');
      const billingLabel = wrapper.find('[data-test="billing-label"]');
      const billingInput = wrapper.find('[data-test="billing-input"]');
      const technicalLabel = wrapper.find('[data-test="technical-label"]');
      const technicalInput = wrapper.find('[data-test="technical-input"]');
      const countryLabel = wrapper.find('[data-test="country-label"]');
      const countryDropdown = wrapper.find('[data-test="country-dropdown"]');
      expect(cancelButton.exists()).toBe(true);
      expect(requestChangeName.exists()).toBe(true);
      expect(requestChangeRut.exists()).toBe(true);
      expect(billingLabel.exists()).toBe(false);
      expect(billingInput.exists()).toBe(true);
      expect(technicalLabel.exists()).toBe(false);
      expect(technicalInput.exists()).toBe(true);
      expect(countryLabel.exists()).toBe(false);
      expect(countryDropdown.exists()).toBe(true);
    });
  });

  describe('when request change for name is clicked', () => {
    it('tracks \'Org Settings Change Requested\' with analytics, key: name', async () => {
      const orgStore = useOrganizationStore();
      orgStore.organization = dummyOrganization;
      orgStore.loading = false;
      const wrapper = getWrapper();

      const editButton = wrapper.find('[data-test="edit-button"]');

      expect(editButton.exists()).toBe(true);
      await editButton.trigger('click');
      await wrapper.vm.$forceUpdate();

      const requestChangeName = wrapper.find('[data-test="request-change-name"]');
      expect(requestChangeName.exists()).toBe(true);
      await requestChangeName.trigger('click');
      expectToTrackWithAnalytics(analyticsTrackMock, ORG_SETTINGS_CHANGE_REQUESTED, { key: 'name' });
    });
  });

  describe('when request change for rut is clicked', () => {
    it('tracks \'Org Settings Change Requested\' with analytics, key: rut', async () => {
      const orgStore = useOrganizationStore();
      orgStore.organization = dummyOrganization;
      orgStore.loading = false;
      const wrapper = getWrapper();

      const editButton = wrapper.find('[data-test="edit-button"]');
      expect(editButton.exists()).toBe(true);
      await editButton.trigger('click');
      await wrapper.vm.$forceUpdate();

      const requestChangeRut = wrapper.find('[data-test="request-change-rut"]');
      expect(requestChangeRut.exists()).toBe(true);
      await requestChangeRut.trigger('click');
      expectToTrackWithAnalytics(analyticsTrackMock, ORG_SETTINGS_CHANGE_REQUESTED, { key: 'rut' });
    });
  });

  describe('when user saves edit organization settings', () => {
    it('tracks \'Org Settings Edited\' with analytics', async () => {
      const orgStore = useOrganizationStore();
      orgStore.organization = dummyOrganization;
      orgStore.loading = false;
      const wrapper = getWrapper();

      const editButton = wrapper.find('[data-test="edit-button"]');
      expect(editButton.exists()).toBe(true);
      await editButton.trigger('click');
      await wrapper.vm.$forceUpdate();

      wrapper.vm.billingEmail = 'billing@gmail.com';
      await wrapper.vm.$forceUpdate();

      const saveButton = wrapper.find('[data-test="save-button"]');
      expect(saveButton.exists()).toBe(true);
      await saveButton.trigger('click');
      await wrapper.vm.$forceUpdate();
      expectToTrackWithAnalytics(analyticsTrackMock, ORG_SETTINGS_EDITED);
    });
  });
});
