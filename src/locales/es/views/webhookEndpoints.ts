import { WebhookEndpointsViewLocale } from '@/interfaces/locales/views/webhookEndpoints';

export default <WebhookEndpointsViewLocale>{
  title_one: 'Webhook Endpoint',
  title_other: 'Webhook Endpoints',
  learnMore: 'Aprende más →',
  subtitle: `
    Un webhook es el mecanismo que nos permite notificar a tu servidor sobre una acción específica ocurrida en Fintoc y
    generar una reacción en tu aplicación para que esta se encuentre sincronizada con el estado actual de Fintoc.
  `,
  whatisAWebhookEndpoint: '¿Qué es un Webhook Endpoint?',
  table: {
    headers: {
      url: 'URL',
      mode: 'Modo',
      webhookEndpointSecret: 'Secreto del Webhook Endpoint',
      types: 'Tipos de evento',
      name: 'Nombre',
      description: 'Descripción',
      subscribedEventsAmount: 'Nº Eventos Suscritos',
      active: 'Activo',
    },
    buttons: {
      remove: 'Borrar',
      revealWebhookEndpointSecret: 'Revelar',
    },
  },
  details: 'Detalles',
  testWebhook: {
    modalTitle: 'Enviar Webhook de prueba',
    buttonText: 'Enviar Webhook de prueba',
    event: 'Evento',
  },
  creation: {
    modalTitle: 'Crear tu',
    events: 'Eventos',
    buttonText: 'Crear',
    form: {
      url: {
        label: 'URL del Webhook Endpoint',
        placeholder: 'Pega la URL https de tu backend aquí',
        hint: 'Si aún no tienes un URL de tu servidor, revisa esta herramienta:',
      },
      description: {
        label: 'Descripción',
        placeholder: 'Descripción opcional...',
      },
      name: {
        label: 'Nombre',
        placeholder: 'Webhooks para Servidor 1',
      },
    },
    validations: {
      url: {
        emptyUrl: 'La URL no puede estar vacía',
        invalidUrl: 'URL inválida',
      },
      events: {
        requireEvent: 'Al menos un evento debe ser seleccionado',
      },
      name: {
        required: 'Obligatorio',
      },
    },
    checkBox: {
      viewEvents: 'Ver Eventos por Tipo de Recurso',
      learnMore: 'aprende más sobre eventos acá →',
      checkAll: 'Selecciona los eventos por los que te gustaría ser notificado:',
      selectAll: 'Seleccionar todos los eventos',
      chosenEvents: 'Eventos elegidos:',
      onlyAvailable: 'Solo disponible en',
      descriptions: {
        'link.credentials_changed': 'Se envía cuando las credenciales correspondientes del Link cambian y el Link necesita ser conectado nuevamente. Se envía para el producto de Movements, Subscriptions e Invoices.',
        'link.refresh_intent.succeeded': 'Se envía cuando un Link ha sido actualizado completamente. Por ahora, solo se envía para el producto de invoices.',
        'link.refresh_intent.failed': 'Se envía cuando no pudimos actualizar todos los movimientos de un Link. Por ahora, solo se envía para el producto de invoices.',
        'subscription_intent.succeeded': 'Se envía cuando un subscription intent es validado como existoso. El subscription_intent incluye el objeto de subscription resultante.',
        'subscription_intent.failed': 'Se envía cuando un subscription intent falla debido a un problema con el banco o Fintoc.',
        'subscription_intent.rejected': 'Se envía cuando un subscription intent es rechazado por el usuario. Esto puede ocurrir cuando el usuario rechaza un paso de autenticación segundo factor o si es ingresado incorrectamente.',
        'subscription.activated': 'Se envía cuando el banco ha confirmado que la suscripción está lista para aceptar cobros.',
        'subscription.canceled': 'Se envía cuando el banco le informa a Fintoc que la suscripción ha sido cancelada.',
        'charge.succeeded': 'Se envía cuando un cobro es validado como exitoso.',
        'charge.failed': 'Se envía cuando un cobro falla debido a fondos insuficientes, la cantidad cobrada es mayor al monto autorizado, o el usuario ha deshabilitado la autorización.',
        'payment_intent.succeeded': 'Se envía cuando la transferencia finaliza exitosamente.',
        'payment_intent.failed': 'Se envía cuando la transferencia falla.',
        'payment_intent.rejected': 'Se envía cuando la transferencia falla debido al banco rechazándola.',
        'account.refresh_intent.succeeded': 'Se envía cuando un Account es actualizado con los últimos movimientos dipsonibles del banco.',
        'account.refresh_intent.failed': 'Se envía cuando una actualización de los movimientos de un Account específico falla.',
        'account.refresh_intent.rejected': 'Se envía cuando una actualización de los movimientos de un Account falla porque las credenciales del Link son inválidas.',
        'account.refresh_intent.movements_removed': 'Se envía cuando el banco del Link elimina movimientos de la cartola.',
      },
    },
  },
  emptyView: {
    noWebhookEndpointsFound: 'No tienes Webhooks conectados. Aquí hay un ejemplo de lo que podrías tener:',
    externalFront: 'Frontend externo',
    customerChanges: 'Cliente cambia contraseña del banco',
    yourBackend: 'Tu backend',
  },
};
