/* eslint-disable import/no-extraneous-dependencies */
// IMPORTANT: bank images should follow 5:1 (w:h) ratio.
import bancoChileLogo from 'chilean-bank-images/banco-chile/big.png';
import bancoChileBusinessLogo from 'chilean-bank-images/banco-chile/business-big.png';
import bancoChileSmallLogo from 'chilean-bank-images/banco-chile/small.png';

import santanderLogo from 'chilean-bank-images/santander/big.png';
import santanderSmallLogo from 'chilean-bank-images/santander/small.png';

import bciLogo from 'chilean-bank-images/bci/big.png';
import bciSmallLogo from 'chilean-bank-images/bci/small.png';

import bci360Logo from 'chilean-bank-images/bci360/big.png';
import bci360SmallLogo from 'chilean-bank-images/bci360/small.png';

import bancoEstadoLogo from 'chilean-bank-images/banco-estado/big.png';
import bancoEstadoSmallLogo from 'chilean-bank-images/banco-estado/small.png';

import itauLogo from 'chilean-bank-images/itau/big.png';
import itauSmallLogo from 'chilean-bank-images/itau/small.png';

import scotiabankLogo from 'chilean-bank-images/scotiabank/big.png';
import scotiabankSmallLogo from 'chilean-bank-images/scotiabank/small.png';

import biceLogo from 'chilean-bank-images/bice/big.png';
import biceSmallLogo from 'chilean-bank-images/bice/small.png';

import securityLogo from 'chilean-bank-images/banco-security/big.png';
import securitySmallLogo from 'chilean-bank-images/banco-security/small.png';

import siiLogo from 'chilean-fiscal-images/sii.svg';

// Pending images.
import falabellaLogo from 'chilean-bank-images/banco-falabella/falabella-complete.png';
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
      individual: { subscription: true, movements: false },
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
      individual: { subscription: false, movements: false },
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
      individual: { subscription: true, movements: false },
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
      individual: { subscription: true, movements: false },
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
