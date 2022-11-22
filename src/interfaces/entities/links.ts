import { Nullable } from '@/interfaces/common';
import { Mode } from '@/interfaces/utilities/enums';
import { Institution } from './institutions';

export interface Link {
  id: string
  active: boolean
  createdAt: string
  holderId: string
  holderName: string
  holderType: string
  institution: Institution
  mode: Mode
  preventRefresh: boolean
  username: string
  lastTimeRefreshed: Nullable<string>
  accountsCount: number
}

export interface CompleteLink extends Link {
  linkToken: string
}
