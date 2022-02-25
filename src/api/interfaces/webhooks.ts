export interface Webhook {
  id: string
  description?: string
  enabledEvents: Array<string>
  mode: string
  secret: string
  status: string
  url: string
}
