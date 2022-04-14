import { WebhookEndpointsViewLocale } from '@/interfaces/locales/views/webhookEndpoints';

export default <WebhookEndpointsViewLocale>{
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
    noWebhookEndpointsFound: 'No se encontraron Webhook Endpoints!',
  },
  details: 'Detalles',
  testWebhook: {
    modalTitle: 'Enviar Webhook de prueba',
    buttonText: 'Enviar Webhook de prueba',
  },
  creation: {
    modalTitle: 'Crear Webhook Endpoint',
    events: 'Eventos',
    buttonText: 'Crear Webhook Endpoint',
    form: {
      url: {
        label: 'URL del Webhook Endpoint',
        placeholder: 'https://tu.backend/webhook',
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
};
