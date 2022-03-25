import { Mode } from '@/interfaces/utilities/enums';

export interface APIKey {
  id: string
  token: string
  isPublic: boolean
  mode: Mode
}
