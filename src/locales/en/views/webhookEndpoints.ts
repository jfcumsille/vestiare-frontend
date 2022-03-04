import { WebhookEndpointsViewLocale } from '@/interfaces/locales/views/webhookEndpoints';

export default <WebhookEndpointsViewLocale>{
  table: {
    headers: {
      url: 'URL',
      mode: 'Mode',
      webhookEndpointSecret: 'Webhook Endpoint Secret',
      types: 'Event types',
      description: 'Description',
      subscribedEventsAmount: '# Subscribed Events',
      active: 'Active',
    },
    buttons: {
      remove: 'Remove',
      revealWebhookEndpointSecret: 'Reveal',
    },
    noWebhookEndpointsFound: 'No Webhook Endpoints found!',
  },
  details: 'Details',
};
