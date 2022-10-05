import { Mode } from '@/interfaces/utilities/enums';

export interface WebhookEndpoint {
  id: string
  name: string
  description?: string
  enabledEvents: Array<string>
  mode: Mode
  secret: string
  status: string
  url: string
}

export interface WebhookEvent {
  name: string
  checked: boolean
}
