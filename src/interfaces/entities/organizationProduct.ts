import { HolderType } from '@/interfaces/utilities/enums';

export interface OrganizationProduct {
  product: string
  holderType: HolderType
  enabled: boolean
}
