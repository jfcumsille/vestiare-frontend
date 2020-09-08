/* eslint-disable import/no-extraneous-dependencies */
// IMPORTANT: bank images should follow 5:1 (w:h) ratio.
import bancoChileLogo from 'chilean-bank-images/banco-chile/big.png';
import bancoChileBusinessLogo from 'chilean-bank-images/banco-chile/business-big.png';
import bancoChileSmallLogo from 'chilean-bank-images/banco-chile/small.png';

import santanderLogo from 'chilean-bank-images/santander/big.png';
import santanderSmallLogo from 'chilean-bank-images/santander/small.png';

import bciLogo from 'chilean-bank-images/bci/big.png';
import bciSmallLogo from 'chilean-bank-images/bci/small.png';

import bancoEstadoLogo from 'chilean-bank-images/banco-estado/big.png';
import bancoEstadoSmallLogo from 'chilean-bank-images/banco-estado/small.png';

import itauLogo from 'chilean-bank-images/itau/big.png';

import scotiabankLogo from 'chilean-bank-images/scotiabank/big.png';

import biceLogo from 'chilean-bank-images/bice/big.png';


// Pending images.
import falabellaLogo from 'chilean-bank-images/banco-falabella/falabella-complete.png';
import securityLogo from 'chilean-bank-images/banco-security/security-complete.png';
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
    holderTypes: { business: true, individual: true },
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
    holderTypes: { business: true, individual: true },
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
    holderTypes: { business: true, individual: true },
  },
  {
    code: 'cl_banco_bice',
    label: 'BICE',
    logo: {
      individual: biceLogo,
      business: biceLogo,
    },
    smallLogo: biceLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    holderTypes: { business: true, individual: false },
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
    holderTypes: { business: true, individual: false },
  },
  {
    code: 'cl_banco_itau',
    label: 'Banco Itaú',
    logo: {
      individual: itauLogo,
      business: itauLogo,
    },
    smallLogo: itauLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    holderTypes: { business: true, individual: true },
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
    holderTypes: { business: false, individual: false },
  },
  {
    code: 'cl_banco_scotiabank',
    label: 'Banco Scotiabank',
    logo: {
      individual: scotiabankLogo,
      business: scotiabankLogo,
    },
    smallLogo: scotiabankLogo,
    specialIndication: {
      business: null,
      individual: null,
    },
    holderTypes: { business: true, individual: true },
  },
  {
    code: 'cl_banco_security',
    label: 'Banco Security',
    logo: {
      individual: securityLogo,
      business: securityLogo,
    },
    specialIndication: {
      business: null,
      individual: null,
    },
    holderTypes: { business: false, individual: false },
  },
];

function findBankByCode(code) {
  return availableBanks.find((bank) => bank.code === code);
}

export {
  availableBanks,
  findBankByCode,
};
