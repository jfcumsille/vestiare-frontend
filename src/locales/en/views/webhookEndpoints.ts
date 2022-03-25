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
  testWebhook: {
    modalTitle: 'Send Test Webhook',
    buttonText: 'Send Test Webhook',
  },
  creation: {
    modalTitle: 'Create Webhook Endpoint',
    events: 'Events',
    buttonText: 'Create Webhook Endpoint',
    form: {
      url: {
        label: 'Webhook Endpoint URL',
        placeholder: 'https://your.backend/webhook',
      },
      description: {
        label: 'Description',
        placeholder: 'Optional description...',
      },
    },
    validations: {
      url: {
        invalidUrl: 'Invalid URL',
      },
      events: {
        requireEvent: 'At least one event is required to be selected',
      },
    },
  },
};
