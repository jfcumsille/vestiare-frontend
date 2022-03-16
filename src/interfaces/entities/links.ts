import { Nullable } from '@/interfaces/common';
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
  email: string
  lastTimeRefreshed: Nullable<string>
}

export interface CompleteLink extends Link {
  accountsCount: number
  linkToken: string
}
