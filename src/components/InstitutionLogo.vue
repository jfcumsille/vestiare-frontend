<script setup lang="ts">
import { computed, ComponentPublicInstance } from 'vue';
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

const props = defineProps<{
  institutionId: string,
}>();

const institutionIcons = {
  cl_fiscal_sii: SiiIcon,
  mx_fiscal_sat: SatIcon,
  cl_banco_bci: BciIcon,
  cl_banco_bci_360: Bci360Icon,
  cl_banco_bice: BiceIcon,
  cl_banco_de_chile: BancoChileIcon,
  cl_banco_estado: EstadoIcon,
  cl_banco_falabella: FalabellaIcon,
  cl_banco_itau: ItauIcon,
  cl_banco_ripley: RipleyIcon,
  cl_banco_santander: SantanderIcon,
  cl_banco_scotiabank: ScotiabankIcon,
  cl_banco_security: SecurityIcon,
  mx_banco_banamex: BanamexIcon,
  mx_banco_bbva: BbvaIcon,
  mx_hey_banco: HeyBancoIcon,
  mx_banco_azteca: AztecaIcon,
  mx_banco_santander: SantanderIcon,
  mx_banco_hsbc: HsbcIcon,
  mx_banco_banorte: BanorteIcon,
} as Record<string, ComponentPublicInstance>;

const currentComponent = computed((): ComponentPublicInstance => {
  if (props.institutionId in institutionIcons) {
    return institutionIcons[props.institutionId];
  }
  return DefaultBankIcon;
});
</script>

<template>
  <div>
    <component
      :is="currentComponent"
      v-bind="$attrs"
    />
  </div>
</template>
