import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import {
  describe, it, expect, beforeEach,
} from 'vitest';
import InstitutionLogo from '@/components/InstitutionLogo.vue';
import SatIcon from '@/assets/svg/institutions/fiscal/SatIcon.vue';
import SiiIcon from '@/assets/svg/institutions/fiscal/SiiIcon.vue';
import AztecaIcon from '@/assets/svg/institutions/banks/AztecaIcon.vue';
import BanamexIcon from '@/assets/svg/institutions/banks/BanamexIcon.vue';
import BanorteIcon from '@/assets/svg/institutions/banks/BanorteIcon.vue';
import BbvaIcon from '@/assets/svg/institutions/banks/BbvaIcon.vue';
import Bci360Icon from '@/assets/svg/institutions/banks/Bci360Icon.vue';
import BciIcon from '@/assets/svg/institutions/banks/BciIcon.vue';
import BiceIcon from '@/assets/svg/institutions/banks/BiceIcon.vue';
import BancoChileIcon from '@/assets/svg/institutions/banks/BancoChileIcon.vue';
import EstadoIcon from '@/assets/svg/institutions/banks/EstadoIcon.vue';
import FalabellaIcon from '@/assets/svg/institutions/banks/FalabellaIcon.vue';
import HeyBancoIcon from '@/assets/svg/institutions/banks/HeyBancoIcon.vue';
import HsbcIcon from '@/assets/svg/institutions/banks/HsbcIcon.vue';
import ItauIcon from '@/assets/svg/institutions/banks/ItauIcon.vue';
import RipleyIcon from '@/assets/svg/institutions/banks/RipleyIcon.vue';
import SantanderIcon from '@/assets/svg/institutions/banks/SantanderIcon.vue';
import ScotiabankIcon from '@/assets/svg/institutions/banks/ScotiabankIcon.vue';
import SecurityIcon from '@/assets/svg/institutions/banks/SecurityIcon.vue';
import DefaultBankIcon from '@/assets/svg/institutions/banks/DefaultBankIcon.vue';

describe('InstitutionLogo', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('when "cl_banco_bci" is selected', () => {
    it('returns BciIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'cl_banco_bci' },
      });
      expect(wrapper.findComponent(BciIcon).exists()).toBe(true);
    });
  });

  describe('when "cl_banco_bci_360" is selected', () => {
    it('returns Bci360Icon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'cl_banco_bci_360' },
      });
      expect(wrapper.findComponent(Bci360Icon).exists()).toBe(true);
    });
  });

  describe('when "cl_banco_bice" is selected', () => {
    it('returns BiceIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'cl_banco_bice' },
      });
      expect(wrapper.findComponent(BiceIcon).exists()).toBe(true);
    });
  });

  describe('when "cl_banco_de_chile" is selected', () => {
    it('returns BancoChileIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'cl_banco_de_chile' },
      });
      expect(wrapper.findComponent(BancoChileIcon).exists()).toBe(true);
    });
  });

  describe('when "cl_banco_estado" is selected', () => {
    it('returns EstadoIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'cl_banco_estado' },
      });
      expect(wrapper.findComponent(EstadoIcon).exists()).toBe(true);
    });
  });

  describe('when "cl_banco_falabella" is selected', () => {
    it('returns FalabellaIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'cl_banco_falabella' },
      });
      expect(wrapper.findComponent(FalabellaIcon).exists()).toBe(true);
    });
  });

  describe('when "cl_banco_itau" is selected', () => {
    it('returns ItauIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'cl_banco_itau' },
      });
      expect(wrapper.findComponent(ItauIcon).exists()).toBe(true);
    });
  });

  describe('when "cl_banco_ripley" is selected', () => {
    it('returns RipleyIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'cl_banco_ripley' },
      });
      expect(wrapper.findComponent(RipleyIcon).exists()).toBe(true);
    });
  });

  describe('when "cl_banco_santander" is selected', () => {
    it('returns SantanderIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'cl_banco_santander' },
      });
      expect(wrapper.findComponent(SantanderIcon).exists()).toBe(true);
    });
  });

  describe('when "cl_banco_scotiabank" is selected', () => {
    it('returns ScotiabankIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'cl_banco_scotiabank' },
      });
      expect(wrapper.findComponent(ScotiabankIcon).exists()).toBe(true);
    });
  });

  describe('when "cl_banco_security" is selected', () => {
    it('returns SecurityIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'cl_banco_security' },
      });
      expect(wrapper.findComponent(SecurityIcon).exists()).toBe(true);
    });
  });

  describe('when "mx_banco_banamex" is selected', () => {
    it('returns BanamexIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'mx_banco_banamex' },
      });
      expect(wrapper.findComponent(BanamexIcon).exists()).toBe(true);
    });
  });

  describe('when "mx_banco_bbva" is selected', () => {
    it('returns BbvaIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'mx_banco_bbva' },
      });
      expect(wrapper.findComponent(BbvaIcon).exists()).toBe(true);
    });
  });

  describe('when "mx_hey_banco" is selected', () => {
    it('returns HeyBancoIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'mx_hey_banco' },
      });
      expect(wrapper.findComponent(HeyBancoIcon).exists()).toBe(true);
    });
  });

  describe('when "mx_banco_santander" is selected', () => {
    it('returns SantanderIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'mx_banco_santander' },
      });
      expect(wrapper.findComponent(SantanderIcon).exists()).toBe(true);
    });
  });

  describe('when "mx_banco_azteca" is selected', () => {
    it('returns AztecaIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'mx_banco_azteca' },
      });
      expect(wrapper.findComponent(AztecaIcon).exists()).toBe(true);
    });
  });

  describe('when "mx_banco_banorte" is selected', () => {
    it('returns BanorteIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'mx_banco_banorte' },
      });
      expect(wrapper.findComponent(BanorteIcon).exists()).toBe(true);
    });
  });

  describe('when "mx_banco_hsbc" is selected', () => {
    it('returns HsbcIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'mx_banco_hsbc' },
      });
      expect(wrapper.findComponent(HsbcIcon).exists()).toBe(true);
    });
  });

  describe('when "cl_fiscal_sii" is selected', () => {
    it('returns SiiIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'cl_fiscal_sii' },
      });
      expect(wrapper.findComponent(SiiIcon).exists()).toBe(true);
    });
  });

  describe('when "mx_fiscal_sat" is selected', () => {
    it('returns SatIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'mx_fiscal_sat' },
      });
      expect(wrapper.findComponent(SatIcon).exists()).toBe(true);
    });
  });

  describe('when some random code is selected', () => {
    it('returns DefaultBankIcon', () => {
      const wrapper = mount(InstitutionLogo, {
        props: { institutionId: 'some_random_code' },
      });
      expect(wrapper.findComponent(DefaultBankIcon).exists()).toBe(true);
    });
  });
});
