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
  createLinkModal: {
    create: 'Crear',
    subtitleTest: 'Crea un Link con credenciales de prueba para obtener información de cuentas bancarias o fiscales desde el sandbox.',
    learnMoreTest: 'Aprende más sobre credenciales de pruebas que puedes utilizar →',
    subtitleLive: 'Crea un Link with credentials reales para obtener información de cualquier cuenta bancaria o fiscal.',
    learnMoreLive: 'Aprende más sobre Links →',
    country: 'País',
    chooseCountry: 'Elegir país…',
    api: 'API',
    chooseApi: 'Elegir API…',
    holderType: 'Tipo de cuenta',
    chooseHolderType: 'Elegir tipo de cuenta…',
  },
  newLinkModal: {
    title: 'Link creado exitosamente!',
    warning: 'Este Link Token será mostrado solamente una vez, por lo que debes asegurarte de copiarlo y guardarlo.',
    subtitle: 'Puedes usar este Link Token para realizar requests a la API de Fintoc.',
    learnMore: 'Aprende más sobre requests que puedes realizar →',
    loading: 'cargando Link Token...',
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
