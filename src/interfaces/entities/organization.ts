import { Nullable } from '@/interfaces/common';
import { OrganizationProduct } from './organizationProduct';

export interface Organization {
  id: string
  name: string
  countryCode: string
  rut: Nullable<string>
  billingMail: Nullable<string>
}

export interface OrganizationFull extends Organization {
  freeTrialExpirationDate: string
  isPayingCustomer: boolean
  refreshPolicies: Array<string>
  organizationProducts: Array<OrganizationProduct>
  technicalEmail: Nullable<string>
  apiVersion: Nullable<string>
}
