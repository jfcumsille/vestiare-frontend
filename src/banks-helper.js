/* eslint-disable import/no-extraneous-dependencies */
// IMPORTANT: bank images should follow 5:1 (w:h) ratio.
import bancoChileLogo from './assets/images/banks/chile/banco-chile/big.png';
import bancoChileBusinessLogo from './assets/images/banks/chile/banco-chile/business-big.png';
import bancoChileSmallLogo from './assets/images/banks/chile/banco-chile/small.png';

import santanderLogo from './assets/images/banks/chile/santander/big.png';
import santanderSmallLogo from './assets/images/banks/chile/santander/small.png';

import bciLogo from './assets/images/banks/chile/bci/big.png';
import bciSmallLogo from './assets/images/banks/chile/bci/small.png';

import bci360Logo from './assets/images/banks/chile/bci360/big.png';
import bci360SmallLogo from './assets/images/banks/chile/bci360/small.png';

import bancoEstadoLogo from './assets/images/banks/chile/banco-estado/big.png';
import bancoEstadoSmallLogo from './assets/images/banks/chile/banco-estado/small.png';

import itauLogo from './assets/images/banks/chile/itau/big.png';
import itauSmallLogo from './assets/images/banks/chile/itau/small.png';

import scotiabankLogo from './assets/images/banks/chile/scotiabank/big.png';
import scotiabankSmallLogo from './assets/images/banks/chile/scotiabank/small.png';

import biceLogo from './assets/images/banks/chile/bice/big.png';
import biceSmallLogo from './assets/images/banks/chile/bice/small.png';

import securityLogo from './assets/images/banks/chile/banco-security/big.png';
import securitySmallLogo from './assets/images/banks/chile/banco-security/small.png';

import siiLogo from './assets/images/fiscal/chile/sii.svg';

import banamexLogo from './assets/images/banks/mexico/banamex/banamex.svg';
import bbvaLogo from './assets/images/banks/mexico/bbva/bbva.svg';
import hscbLogo from './assets/images/banks/mexico/hsbc/hsbc.svg';
import aztecaLogo from './assets/images/banks/mexico/azteca/azteca.svg';
import heyBancoLogo from './assets/images/banks/mexico/hey_banco/hey_banco.svg';
import santanderMxLogo from './assets/images/banks/mexico/santander/small.png';


import satLogo from './assets/images/fiscal/mexico/sat.svg';

// Pending images.
import falabellaLogo from './assets/images/banks/chile/banco-falabella/falabella-complete.png';
/* eslint-enable import/no-extraneous-dependencies */

const availableBanks = [
  {
    code: 'cl_banco_de_chile',
    label: 'Banco de Chile',
    logo: {
      individual: bancoChileLogo,
      business: bancoChileBusinessLogo,
    },
    smallLogo: bancoChileSmallLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: true },
      individual: { subscription: true, movements: true },
    },
  },
  {
    code: 'cl_fiscal_sii',
    label: 'Servicio de Impuestos Internos',
    logo: {
      individual: siiLogo,
      business: siiLogo,
    },
    smallLogo: siiLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: false },
      individual: { subscription: false, movements: false },
    },
  },
  {
    code: 'cl_banco_santander',
    label: 'Banco Santander',
    logo: {
      individual: santanderLogo,
      business: santanderLogo,
    },
    smallLogo: santanderSmallLogo,
    specialIndication: {
      business: 'El usuario debe tener permisos para ver el saldo, cartola provisoria y movimientos históricos',
    },
    isAvailable: {
      business: { subscription: false, movements: true },
      individual: { subscription: false, movements: true },
    },
  },
  {
    code: 'cl_banco_bci',
    label: 'Banco BCI',
    logo: {
      individual: bciLogo,
      business: bciLogo,
    },
    smallLogo: bciSmallLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: true },
      individual: { subscription: true, movements: true },
    },
  },
  {
    code: 'cl_banco_bci_360',
    label: 'Banco BCI 360',
    logo: {
      individual: bci360Logo,
      business: bci360Logo,
    },
    smallLogo: bci360SmallLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: true },
      individual: { subscription: false, movements: false },
    },
  },
  {
    code: 'cl_banco_bice',
    label: 'BICE',
    logo: {
      individual: biceLogo,
      business: biceLogo,
    },
    smallLogo: biceSmallLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: true },
      individual: { subscription: false, movements: true },
    },
  },
  {
    code: 'cl_banco_estado',
    label: 'Banco Estado',
    logo: {
      individual: bancoEstadoLogo,
      business: bancoEstadoLogo,
    },
    smallLogo: bancoEstadoSmallLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: true },
      individual: { subscription: false, movements: true },
    },
  },
  {
    code: 'cl_banco_itau',
    label: 'Banco Itaú',
    logo: {
      individual: itauLogo,
      business: itauLogo,
    },
    smallLogo: itauSmallLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: true },
      individual: { subscription: true, movements: true },
    },
  },
  {
    code: 'cl_banco_falabella',
    label: 'Banco Falabella',
    logo: {
      individual: falabellaLogo,
      business: falabellaLogo,
    },
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: false },
      individual: { subscription: false, movements: false },
    },
  },
  {
    code: 'cl_banco_scotiabank',
    label: 'Banco Scotiabank',
    logo: {
      individual: scotiabankLogo,
      business: scotiabankLogo,
    },
    smallLogo: scotiabankSmallLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: true },
      individual: { subscription: true, movements: true },
    },
  },
  {
    code: 'cl_banco_security',
    label: 'Banco Security',
    logo: {
      individual: securityLogo,
      business: securityLogo,
    },
    smallLogo: securitySmallLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: true },
      individual: { subscription: false, movements: true },
    },
  },
  {
    code: 'mx_banco_banamex',
    label: 'Banco Banamex',
    logo: {
      individual: banamexLogo,
      business: banamexLogo,
    },
    smallLogo: banamexLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: false },
      individual: { subscription: false, movements: false },
    },
  },
  {
    code: 'mx_banco_bbva',
    label: 'Banco BBVA',
    logo: {
      individual: bbvaLogo,
      business: bbvaLogo,
    },
    smallLogo: bbvaLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: false },
      individual: { subscription: false, movements: false },
    },
  },
  {
    code: 'mx_banco_hsbc',
    label: 'Banco HSBC',
    logo: {
      individual: hscbLogo,
      business: hscbLogo,
    },
    smallLogo: hscbLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: false },
      individual: { subscription: false, movements: false },
    },
  },
  {
    code: 'mx_banco_azteca',
    label: 'Banco Azteca',
    logo: {
      individual: aztecaLogo,
      business: aztecaLogo,
    },
    smallLogo: aztecaLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: false },
      individual: { subscription: false, movements: false },
    },
  },
  {
    code: 'mx_banco_santander',
    label: 'Banco Santander',
    logo: {
      individual: santanderMxLogo,
      business: santanderMxLogo,
    },
    smallLogo: santanderMxLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: false },
      individual: { subscription: false, movements: false },
    },
  },
  {
    code: 'mx_hey_banco',
    label: 'Hey Banco',
    logo: {
      individual: heyBancoLogo,
      business: heyBancoLogo,
    },
    smallLogo: heyBancoLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: false },
      individual: { subscription: false, movements: false },
    },
  },
  {
    code: 'mx_fiscal_sat',
    label: 'Servicio de Impuestos Internos',
    logo: {
      individual: satLogo,
      business: satLogo,
    },
    smallLogo: satLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    isAvailable: {
      business: { subscription: false, movements: false },
      individual: { subscription: false, movements: false },
    },
  },
];

function findBankByCode(code) {
  return availableBanks.find((bank) => bank.code === code);
}

export {
  availableBanks,
  findBankByCode,
};
