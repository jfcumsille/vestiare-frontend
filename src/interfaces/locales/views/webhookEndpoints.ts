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
}
