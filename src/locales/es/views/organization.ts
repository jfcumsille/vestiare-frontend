import { OrganizationViewLocale } from '@/interfaces/locales/views/organization';

export default <OrganizationViewLocale>{
  title: 'Organización',
  settings: {
    settings: 'Configuraciones',
    settingsSubLabel: 'Las configuraciones generales de tu organización.',
    name: 'Nombre',
    nameSubLabel: 'El nombre que se mostrará en tu widget.',
    organizationRutRfc: 'RUT/RFC de la organización',
    requestChange: 'Solicitar Cambio',
    upgradeToRequestChange: 'Actualizar plan para cambiar',
    billingEmail: 'Correo electrónico de facturas.',
    billingSubLabel: 'Para recibir facturas de Fintoc.',
    billingPlaceholder: 'Agrega un correo para facturas',
    technicalEmail: 'Correo electrónico técnico',
    technicalSubLabel: 'Para reportes de interrupciones de servicio.',
    technicalPlaceholder: 'Agrega un correo técnico',
    countryAPI: 'País API',
    defaultCountryApi: 'País API por defecto',
    defaultCountryApiSubLabel: 'País por defecto si no se especifica otro.',
    apiVersion: 'Versión API',
    apiVersionSubLabel1: 'Aprende más sobre versiones →',
    apiVersionSubLabel2: 'Tu versión será establecida cuando realices tu primera llamada a la API.',
    validations: {
      invalidEmail: 'Por favor ingresa un correo válido',
    },
  },
  plan: {
    title: 'Plan',
    currently: 'Actualmente estás en el plan',
    trial: 'de Prueba.',
    trialSubtitle1: 'Serás cambiado al plan Gratis el',
    trialSubtitle2: 'Puedes conectar una cantidad ilimitada de cuentas en modo Test y en modo Live durante el periodo de prueba. Después solo tendrás acceso a 5 Links individuales activos en modo Live.',
    paid: 'Pagado',
    paidSubtitle1: 'con',
    paidSubtitle2: 'productos contratados.',
    free: 'Gratis.',
    freeSubtitle1: '',
    freeSubtitle2: 'Solamente tienes acceso a 5 Links activos en modo Live.',
    callToAction: 'Contactar a ventas para actualizar tu plan →',
  },
  products: {
    title: 'Productos',
    subtitle: 'Estos son los productos disponibles para esta organización',
    bankingAPI: 'API Bancaria',
    fiscalAPI: 'API Fiscal',
    callToAction: 'Pregunta por otros productos y casos de uso →',
  },
  members: {
    title: 'Equipo',
    name: 'Nombre',
    email: 'Email',
    organizationRole: 'Rol',
    permissions: 'Permisos',
    memberSince: 'Miembro Desde',
    status: 'Estado',
    searchPlaceholder: 'ej: Paula',
    inviteMemberButton: 'Invitar miembro',
    financeManagement: 'Finanzas',
    developer: 'Desarrollador',
    operations: 'Operaciones',
    other: 'Otro',
    accepted: 'Aceptado',
    rejected: 'Rechazado',
    invitationSent: 'Invitación Enviada',
    admin: 'Admin',
    member: 'Miembro',
    delete: 'Eliminar',
    newMember: {
      title: 'Invitación a un nuevo miembro',
      invitationSent: 'Invitación enviada',
      subtitle: 'Agrega a un miembro o admin a tu organización a través de un email de invitación. Ellos completarán otra información necesaria.',
      emailLabel: 'Correo',
      emailPlaceholder: 'ejemplo@fintoc.com',
      invalidEmail: 'Correo inválido',
      roleLabel: 'Permisos',
      cancel: 'Cancelar',
      sendInvitation: 'Enviar invitación',
      yourInvitationFor: 'Tu invitación a',
      hasBeenSent: 'ha sido enviada',
      inviteStatus: 'El estado de tu invitación se mostrará en la tabla de equipo.',
      backToTeam: 'Volver a equipo',
      inviteAnother: 'Invitar a otro',
    },
    deleteMember: {
      title: 'Eliminar usuario de tu organización',
      confirmation: 'Eliminar usuario',
      warning: 'Si eliminas un usuario, deberás invitarlo nuevamente.',
      text1: '¿Estás seguro de que quieres eliminar',
      text2: 'de tu organización?',
    },
  },
};
