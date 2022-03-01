import { Institution } from './institutions';

export interface Link {
  id: string
  active: boolean
  createdAt: string
  holderId: string
  holderName: string
  holderType: string
  institution: Institution
  mode: string
  preventRefresh: boolean
  username: string
  lastTimeRefreshed: string | null
  accountsCount?: number
  linkToken?: string
}
