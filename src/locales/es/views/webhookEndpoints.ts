import { WebhookEndpointsViewLocale } from '@/interfaces/locales/views/webhookEndpoints';

export default <WebhookEndpointsViewLocale>{
  table: {
    headers: {
      url: 'URL',
      mode: 'Modo',
      webhookEndpointSecret: 'Secreto del Webhook Endpoint',
      types: 'Tipos de evento',
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
};
