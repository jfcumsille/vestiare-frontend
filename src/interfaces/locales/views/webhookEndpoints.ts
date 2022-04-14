export interface WebhookEndpointsViewLocale {
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
    noWebhookEndpointsFound: string,
  },
  details: string,
  testWebhook: {
    modalTitle: string,
    buttonText: string,
  },
  creation: {
    modalTitle: string,
    events: string,
    buttonText: string,
    form: {
      url: {
        label: string,
        placeholder: string,
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
}
