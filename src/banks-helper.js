/* eslint-disable import/no-extraneous-dependencies */
// IMPORTANT: bank images should follow 5:1 (w:h) ratio.
import bancoChileLogo from 'chilean-bank-images/banco-chile/big.png';
import bancoChileSmallLogo from 'chilean-bank-images/banco-chile/small.png';

import santanderLogo from 'chilean-bank-images/santander/big.png';
import santanderSmallLogo from 'chilean-bank-images/santander/small.png';

import bciLogo from 'chilean-bank-images/bci/big.png';
import bciSmallLogo from 'chilean-bank-images/bci/small.png';

import bancoEstadoLogo from 'chilean-bank-images/banco-estado/big.png';
import bancoEstadoSmallLogo from 'chilean-bank-images/banco-estado/small.png';

import itauLogo from 'chilean-bank-images/itau/itau.png';

// Pending images.
import falabellaLogo from 'chilean-bank-images/banco-falabella/falabella-complete.png';
import scotiabankLogo from 'chilean-bank-images/scotiabank/scotiabank-complete.png';
import securityLogo from 'chilean-bank-images/banco-security/security-complete.png';
/* eslint-enable import/no-extraneous-dependencies */

const availableBanks = [
  {
    code: 'cl_banco_de_chile',
    label: 'Banco de Chile',
    logo: bancoChileLogo,
    smallLogo: bancoChileSmallLogo,
    holderTypes: { business: true, individual: true },
  },
  {
    code: 'cl_banco_santander',
    label: 'Banco Santander',
    logo: santanderLogo,
    smallLogo: santanderSmallLogo,
    holderTypes: { business: true, individual: true },
  },
  {
    code: 'cl_banco_bci',
    label: 'Banco BCI',
    logo: bciLogo,
    smallLogo: bciSmallLogo,
    holderTypes: { business: false, individual: false },
  },
  {
    code: 'cl_banco_estado',
    label: 'Banco Estado',
    logo: bancoEstadoLogo,
    smallLogo: bancoEstadoSmallLogo,
    holderTypes: { business: false, individual: false },
  },
  {
    code: 'cl_banco_itau',
    label: 'Banco Itaú',
    logo: itauLogo,
    smallLogo: itauLogo,
    holderTypes: { business: false, individual: false },
  },
  {
    code: 'cl_banco_falabella',
    label: 'Banco Falabella',
    logo: falabellaLogo,
    holderTypes: { business: false, individual: false },
  },
  {
    code: 'cl_banco_scotiabank',
    label: 'Banco Scotiabank',
    logo: scotiabankLogo,
    holderTypes: { business: false, individual: false },
  },
  {
    code: 'cl_banco_security',
    label: 'Banco Security',
    logo: securityLogo,
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
