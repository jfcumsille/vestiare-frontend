import { LinksViewLocale } from '@/interfaces/locales/views/links';

export default <LinksViewLocale>{
  filters: {
    searchBarPlaceholder: 'Buscar por ID de usuario',
    active: {
      label: 'Activo',
      options: {
        all: 'Todos',
        valid: 'Activo',
        invalid: 'Inactivo',
      },
    },
    password: {
      label: 'Contraseña',
      options: {
        all: 'Todos',
        valid: 'Válido',
        invalid: 'Inválido',
      },
    },
  },
  creation: {
    createAction: 'Crear',
    individualBankingLink: 'Link bancario individual',
    businessBankingLink: 'Link bancario de empresa',
    individualFiscalLink: 'Link fiscal individual',
    businessFiscalLink: 'Link fiscal de empresa',
  },
  table: {
    headers: {
      user: 'Usuario',
      business: 'Empresa',
      institution: 'Institución',
      lastRefreshed: 'Última Actualización',
      active: 'Activo',
    },
    buttons: {
      remove: 'Borrar',
    },
    noLinksFound: 'No se encontraron Links!',
  },
};
