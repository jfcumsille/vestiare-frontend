export interface WebhookEndpoint {
  id: string
  description?: string
  enabledEvents: Array<string>
  mode: 'live' | 'test'
  secret: string
  status: string
  url: string
}
