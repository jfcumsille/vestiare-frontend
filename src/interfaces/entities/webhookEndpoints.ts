import { Mode } from '@/interfaces/utilities/enums';

export interface WebhookEndpoint {
  id: string
  description?: string
  enabledEvents: Array<string>
  mode: Mode
  secret: string
  status: string
  url: string
  name: string
}
