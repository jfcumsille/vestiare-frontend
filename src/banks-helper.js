import santanderLogo from './assets/images/santander-complete.png';
import bancoChileLogo from './assets/images/banco-chile-complete.png';
import bciLogo from './assets/images/bci-complete.png';
import itauLogo from './assets/images/itau.png';
import bancoEstadoLogo from './assets/images/banco-estado-complete.png';
import falabellaLogo from './assets/images/falabella-complete.png';
import scotiabankLogo from './assets/images/scotiabank-complete.png';
import securityLogo from './assets/images/security-complete.png';


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
