import { WebhookEndpointsViewLocale } from '@/interfaces/locales/views/webhookEndpoints';

export default <WebhookEndpointsViewLocale>{
  title_one: 'Webhook Endpoint',
  title_other: 'Webhook Endpoints',
  learnMore: 'Aprende más sobre los Webhooks de Fintoc →',
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
    modalTitle: 'Crear Webhook Endpoint',
    events: 'Eventos',
    buttonText: 'Agregar',
    form: {
      url: {
        label: 'URL del Webhook Endpoint',
        placeholder: 'https://tu.backend/webhook',
        hint: 'Si aún no tienes un URL de tu servidor, revisa esta herramienta:',
      },
      description: {
        label: 'Descripción',
        placeholder: 'Descripción opcional...',
      },
      name: {
        label: 'Nombre',
        placeholder: 'Nombre',
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
  },
  emptyView: {
    noWebhookEndpointsFound: 'No tienes Webhooks conectados. Aquí hay un ejemplo de lo que podrías tener:',
    externalFront: 'Frontend externo',
    customerChanges: 'Cliente cambia contraseña del banco',
    yourBackend: 'Tu backend',
  },
};
