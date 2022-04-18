import { WebhookEndpointsViewLocale } from '@/interfaces/locales/views/webhookEndpoints';

export default <WebhookEndpointsViewLocale>{
  title: 'Webhook Endpoints',
  learnMore: 'Learn more →',
  subtitle: `
    A webhook is a mechanism that allows us to notify to your server about a specific action that took place on
    Fintoc's side so that your application can react to it, maintaining a "synchronized state" with Fintoc.
  `,
  whatisAWebhookEndpoint: 'What is a Webhook Endpoint?',
  table: {
    headers: {
      url: 'URL',
      mode: 'Mode',
      webhookEndpointSecret: 'Webhook Endpoint Secret',
      types: 'Event types',
      name: 'Name',
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
    buttonText: 'Add',
    form: {
      url: {
        label: 'Webhook Endpoint URL',
        placeholder: 'https://your.backend/webhook',
      },
      description: {
        label: 'Description',
        placeholder: 'Optional description...',
      },
      name: {
        label: 'Name',
        placeholder: 'Name',
      },
    },
    validations: {
      url: {
        emptyUrl: 'No empty URL',
        invalidUrl: 'Invalid URL',
      },
      events: {
        requireEvent: 'At least one event is required to be selected',
      },
      name: {
        required: 'Required',
      },
    },
  },
};
