import { WebhookEndpointsViewLocale } from '@/interfaces/locales/views/webhookEndpoints';

export default <WebhookEndpointsViewLocale>{
  title_one: 'Webhook Endpoint',
  title_other: 'Webhook Endpoints',
  learnMore: 'Learn more →',
  subtitle: `
    A webhook is a mechanism that allows us to notify your server about a specific action that took place on
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
  },
  details: 'Details',
  testWebhook: {
    modalTitle: 'Send Test Webhook',
    buttonText: 'Send Test Webhook',
    event: 'Event',
  },
  creation: {
    modalTitle: 'Create your',
    events: 'Events',
    buttonText: 'Create',
    form: {
      url: {
        label: 'Webhook Endpoint URL',
        placeholder: 'Paste https URL of your backend here',
        hint: 'If you don´t have a server URL yet, try out this tool:',
      },
      description: {
        label: 'Description',
        placeholder: 'Optional description...',
      },
      name: {
        label: 'Name',
        placeholder: 'Webhooks to Server 1',
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
    checkBox: {
      viewEvents: 'View Events by Resource type',
      learnMore: 'learn more about events here →',
      checkAll: 'Check all events you would like to be notified about:',
      selectAll: 'Select all events',
      chosenEvents: 'Chosen events:',
      onlyAvailable: 'Only available in',
      descriptions: {
        'link.credentials_changed': 'Triggers when the credentials corresponding to a Link change and the Link needs to be reconnected. Sent for the following products: movements, subscriptions and invoices.',
        'link.refresh_intent.succeeded': 'Triggers when a Link has been completely updated. For now, it is only triggered for electronic invoices.',
        'link.refresh_intent.failed': 'Triggers when we weren\'t able to update all of the movements of a Link. For now, it is only triggered for electronic invoices.',
        'subscription_intent.succeeded': 'Triggers when a subscription intent is validated as successful. The subscription_intent includes the resulting subscription object.',
        'subscription_intent.failed': 'Triggers when a subscription intent fails due to a problem with the bank or Fintoc.',
        'subscription_intent.rejected': 'Triggers when a subscription intent is rejected by the user. This may happen when the user rejects the MFA step or if it is entered incorrectly.',
        'subscription.activated': 'Triggers when the bank has confirmed that the subscription is ready to accept charges.',
        'subscription.canceled': 'Triggers when the bank informs Fintoc that the subscription has been canceled.',
        'charge.succeeded': 'Triggers when a charge is validated as successful.',
        'charge.failed': 'Triggers when a charge fails due to insufficient funds, the charged amount being higher than the authorized amount, or the user disabling the authorization.',
        'payment_intent.succeeded': 'Triggers when a transfer finishes successfully.',
        'payment_intent.failed': 'Triggers when a transfer fails.',
        'payment_intent.rejected': 'Triggers when a transfer fails due to the bank rejecting it.',
        'account.refresh_intent.succeeded': 'Triggers when an Account is updated with the latest available movements from the bank.',
        'account.refresh_intent.failed': 'Triggers when an update of the movements of a specific Account fails.',
        'account.refresh_intent.rejected': 'Triggers when an update of the movements of a specific Account fails because the Link credentials are invalid.',
        'account.refresh_intent.movements_removed': 'Triggers when the Link\'s bank removes movements from the bank statement.',
      },
    },
  },
  emptyView: {
    noWebhookEndpointsFound: 'You have no Webhooks connected. Here is an example of what you could have:',
    externalFront: 'External Front',
    customerChanges: 'Customer resets bank password',
    yourBackend: 'Your backend',
  },
};
