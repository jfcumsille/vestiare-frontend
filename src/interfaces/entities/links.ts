import { Institution } from './institutions';

export interface Link {
  id: string
  active: boolean
  createdAt: string
  holderId: string
  holderName: string
  holderType: string
  institution: Institution
  lastTimeRefreshed?: string
  linkToken?: string
  mode: string
  preventRefresh: boolean
  username: string
}

export type CompleteLink = ILink
