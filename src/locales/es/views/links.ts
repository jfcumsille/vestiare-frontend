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
};
