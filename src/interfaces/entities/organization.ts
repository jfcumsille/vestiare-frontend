import { OrganizationProduct } from './organizationProduct';

export interface Organization {
  id: string
  name: string
  refreshIntervalSec: number
  countryCode: string
  rut?: string
  billingEmail?: string
  technicalEmail?: string
  isPayingCustomer?: boolean
  freeTrialExpirationDate?: string
  refreshPolicies?: Array<string>
  organizationProducts?: Array<OrganizationProduct>
}
