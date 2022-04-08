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
  deleteLinkModal: {
    title: 'Eliminar link',
    confirmation: 'Eliminar Link',
    warning: 'Esta acción no se puede deshacer.',
    text: `
      ¿Estás seguro que quieres borrar este Link? El usuario tendrá que ingresar sus credenciales
      de la institución financiera para conectar su cuenta nuevamente.
    `,
  },
  table: {
    headers: {
      user: 'Usuario',
      business: 'Empresa',
      institution: 'Institución',
      lastRefreshed: 'Última Actualización',
      password: 'Contraseña',
      active: 'Activo',
    },
    buttons: {
      remove: 'Borrar',
    },
    badges: {
      validPassword: 'válida',
      invalidPassword: 'inválida',
    },
    noLinksFound: 'No se encontraron Links!',
  },
  refreshWarningModal: {
    title: 'Seguir Actualizando Link',
    warning: 'Si las credenciales son inválidas, actualizar el Link podría bloquear la cuenta de tu usuario',
    text: `
      La última vez que usamos este Link para actualizar sus datos,
      la entidad financiera falló, informándonos que las credenciales
      entregadas eran inválidas. Por esta razón dejamos de actualizar
      los movimientos de este Link, para evitar bloquear la cuenta
      de tu usuario. Si crees que las credenciales no han cambiado,
      podemos seguir actualizando el Link.
    `,
    confirmation: 'Seguir Actualizando',
  },
};
