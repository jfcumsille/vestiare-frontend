export interface WebhookEndpointsViewLocale {
  title_one: string,
  title_other: string,
  learnMore: string,
  subtitle: string,
  whatisAWebhookEndpoint: string,
  table: {
    headers: {
      url: string,
      mode: string,
      webhookEndpointSecret: string,
      types: string,
      description: string,
      subscribedEventsAmount: string,
      active: string,
    },
    buttons: {
      remove: string,
      revealWebhookEndpointSecret: string,
    },
  },
  details: string,
  testWebhook: {
    modalTitle: string,
    buttonText: string,
    event: string,
  },
  creation: {
    modalTitle: string,
    events: string,
    buttonText: string,
    form: {
      url: {
        label: string,
        placeholder: string,
        hint: string,
      },
      description: {
        label: string,
        placeholder: string
      }
    },
    validations: {
      url: {
        emptyUrl: string,
        invalidUrl: string,
      },
      events: {
        requireEvent: string,
      },
    },
    checkBox: {
      viewEvents: string,
      learnMore: string,
      checkAll: string,
      selectAll: string,
      chosenEvents: string,
      onlyAvailable: string,
      descriptions: {
        'link.credentials_changed': string,
        'link.refresh_intent.succeeded': string,
        'link.refresh_intent.failed': string,
        'subscription_intent.succeeded': string,
        'subscription_intent.failed': string,
        'subscription_intent.rejected': string,
        'subscription.activated': string,
        'subscription.canceled': string,
        'charge.succeeded': string,
        'charge.failed': string,
        'payment_intent.succeeded': string,
        'payment_intent.failed': string,
        'payment_intent.rejected': string,
        'account.refresh_intent.succeeded': string,
        'account.refresh_intent.failed': string,
        'account.refresh_intent.rejected': string,
        'account.refresh_intent.movements_removed': string,
      },
    },
  },
  emptyView: {
    noWebhookEndpointsFound: string,
    externalFront: string,
    customerChanges: string,
    yourBackend: string,
  }
}
