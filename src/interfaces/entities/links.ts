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
  email: string
  lastTimeRefreshed: Nullable<string>
}

export interface CompleteLink extends Link {
  accountsCount: number
  linkToken: string
}
