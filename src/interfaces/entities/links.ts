import { IInstitution } from './institutions';

export interface ILink {
  id: string
  active: boolean
  createdAt: string
  holderId: string
  holderName: string
  holderType: string
  institution: IInstitution
  lastTimeRefreshed?: string
  linkToken?: string
  mode: string
  preventRefresh: boolean
  username: string
}

export type CompleteLink = ILink
