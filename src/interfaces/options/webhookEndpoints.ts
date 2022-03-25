export interface WebhookEndpointCreationOptions {
  url: string
  enabledEvents: Array<string>
  description?: string
}
