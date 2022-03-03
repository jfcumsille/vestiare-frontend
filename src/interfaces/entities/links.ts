import { Institution } from './institutions';

export interface Link {
  id: string
  active: boolean
  createdAt: string
  holderId: string
  holderName: string
  holderType: string
  institution: Institution
  mode: 'live' | 'test'
  preventRefresh: boolean
  username: string
  lastTimeRefreshed: string | null
}

export interface CompleteLink extends Link {
  accountsCount: number
  linkToken: string
}
