import { WebhookEndpointsViewLocale } from '@/interfaces/locales/views/webhookEndpoints';

export default <WebhookEndpointsViewLocale>{
  table: {
    headers: {
      url: 'URL',
      description: 'Descripción',
      subscribedEventsAmount: '# Eventos Subscritos',
      active: 'Activo',
    },
    buttons: {
      remove: 'Borrar',
    },
    noWebhookEndpointsFound: 'No se encontraron Webhook Endpoints!',
  },
};
