import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import { CountryCode, APIModule, HolderType } from '@/interfaces/utilities/enums';
import { mockCrypto } from '@/utils/tests/crypto';
import CreateLinkModal from '@/views/links/components/CreateLinkModal.vue';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const getWrapper = (props: Record<string, unknown>) => {
  const wrapper = mount(CreateLinkModal, {
    global: {
      plugins: [testingPinia, router],
    },
    props,
  });
  return wrapper;
};

describe('CreateLinkModal', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
  });

  const productAvailabilityTest = {
    cl: {
      Banking: [HolderType.Individual, HolderType.Business],
    },
    mx: {
      Banking: [HolderType.Individual],
    },
  };

  const productAvailabilityLive = {
    cl: {
      Banking: [HolderType.Individual, HolderType.Business],
      Fiscal: [HolderType.Individual, HolderType.Business],
    },
    mx: {
      Banking: [HolderType.Individual],
      Fiscal: [HolderType.Business],
    },
  };

  const countryCodes = [CountryCode.CL, CountryCode.MX];

  describe('when mode is live', () => {
    const props = {
      live: true,
      widgetOpened: false,
    };
    countryCodes.forEach((countryCode) => {
      const apiModules = productAvailabilityLive[countryCode];
      it(`renders correct API options when country is ${countryCode}`, async () => {
        const wrapper = getWrapper(props);
        wrapper.vm.selectedCountry = countryCode;
        Object.keys(apiModules).forEach((key) => {
          expect(wrapper.vm.APIModules).toContain(key);
        });
      });

      it(`renders correct holderType options when country is ${countryCode} and apiModule is Banking,`, async () => {
        const holderTypes = productAvailabilityLive[countryCode].Banking;
        const wrapper = getWrapper(props);
        wrapper.vm.selectedCountry = countryCode;
        wrapper.vm.selectedAPIModule = APIModule.Banking;
        holderTypes.forEach((holderType) => {
          expect(wrapper.vm.holderTypes).toContain(holderType);
        });
      });

      it(`renders correct holderType options when country is ${countryCode} and apiModule is Fiscal,`, async () => {
        const holderTypes = productAvailabilityLive[CountryCode.CL].Fiscal;
        const wrapper = getWrapper(props);
        wrapper.vm.selectedCountry = CountryCode.CL;
        wrapper.vm.selectedAPIModule = APIModule.Fiscal;
        holderTypes.forEach((holderType) => {
          expect(wrapper.vm.holderTypes).toContain(holderType);
        });
      });
    });
  });

  describe('when mode is test', () => {
    const props = {
      live: false,
      widgetOpened: false,
    };
    countryCodes.forEach((countryCode) => {
      const apiModules = productAvailabilityTest[countryCode];
      it(`renders correct API options when country is ${countryCode}`, async () => {
        const wrapper = getWrapper(props);
        wrapper.vm.selectedCountry = countryCode;
        Object.keys(apiModules).forEach((key) => {
          expect(wrapper.vm.APIModules).toContain(key);
        });
      });

      it(`renders correct holderType options when country is ${countryCode} and apiModule is Banking,`, async () => {
        const holderTypes = productAvailabilityTest[countryCode].Banking;
        const wrapper = getWrapper(props);
        wrapper.vm.selectedCountry = countryCode;
        wrapper.vm.selectedAPIModule = APIModule.Banking;
        holderTypes.forEach((holderType) => {
          expect(wrapper.vm.holderTypes).toContain(holderType);
        });
      });
    });
  });
});
