export interface WebhookEndpointsViewLocale {
  title: string,
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
  },
  emptyView: {
    noWebhookEndpointsFound: string,
    externalFront: string,
    customerChanges: string,
    yourBackend: string,
  }
}
