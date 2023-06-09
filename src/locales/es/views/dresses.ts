import { DressesViewLocale } from '@/interfaces/locales/views/dresses';

export default <DressesViewLocale>{
  title_one: 'Vestido',
  title_other: 'Vestidos',
  learnMore: 'Aprende más sobre los Vestidos de Vestiare →',
  createDressModal: {
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
  newDressModal: {
    title: 'Link creado exitosamente!',
    warning: 'Este Link Token será mostrado <b>solamente una vez</b>, por lo que debes asegurarte de copiarlo y guardarlo.',
    danger: 'Algo salió mal. Por favor solicita un nuevo Link Token abajo, sin necesidad de volver a empezar el proceso.',
    subtitle: 'Puedes usar este Link Token para realizar requests a la API de Fintoc.',
    learnMore: 'Aprende más →',
    loading: 'Cargando link token...',
    retryButton: 'Solicitar',
  },
  deleteDressModal: {
    title: 'Eliminar link',
    confirmation: 'Eliminar Link',
    warning: 'Esta acción no se puede deshacer.',
    text: `
      ¿Estás seguro de que quieres borrar este Link? El usuario tendrá que ingresar sus credenciales
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
    filters: {
      searchBarPlaceholder: 'Buscar por ID de usuario',
      public: {
        label: 'Público',
        labelType: 'Tipos',
        options: {
          valid: 'Público',
          invalid: 'Privado',
        },
      },
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
