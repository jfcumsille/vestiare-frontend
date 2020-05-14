import bancoChileLogo from 'chilean-bank-images/banco-chile/banco-chile-complete.png';
import santanderLogo from 'chilean-bank-images/santander/santander-complete.png';
import bciLogo from 'chilean-bank-images/bci/bci-complete.png';
import itauLogo from 'chilean-bank-images/itau/itau.png';
import bancoEstadoLogo from 'chilean-bank-images/banco-estado/banco-estado-complete.png';
import falabellaLogo from 'chilean-bank-images/banco-falabella/falabella-complete.png';
import scotiabankLogo from 'chilean-bank-images/scotiabank/scotiabank-complete.png';
import securityLogo from 'chilean-bank-images/banco-security/security-complete.png';


const availableBanks = [
  {
    code: 'cl_banco_de_chile',
    label: 'Banco de Chile',
    logo: bancoChileLogo,
    holderTypes: { business: true, individual: true },
  },
  {
    code: 'cl_banco_santander',
    label: 'Banco Santander',
    logo: santanderLogo,
    holderTypes: { business: true, individual: false },
  },
  {
    code: 'cl_banco_estado',
    label: 'Banco Estado',
    logo: bancoEstadoLogo,
    holderTypes: { business: false, individual: false },
  },
  {
    code: 'cl_banco_bci',
    label: 'Banco BCI',
    logo: bciLogo,
    holderTypes: { business: true, individual: true },
  },
  {
    code: 'cl_banco_itau',
    label: 'Banco Itaú',
    logo: itauLogo,
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

export default availableBanks;
