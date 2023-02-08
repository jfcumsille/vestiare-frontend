import { PaymentStatus } from '@/interfaces/utilities/enums';
import { Account } from '../entities/account';

export interface FilterOption<T> {
  name: string,
  value: T,
  checked: boolean,
}

export interface Filter<T> {
  label: string,
  values: Array<FilterOption<T>>,
  open: boolean,
}
export interface PaymentIntentFilter {
  status?: Array<PaymentStatus>,
  senderAccount?: Account,
  since?: string,
  until?: string,
  id?: string,
}

export interface LinkFilter {
  active?: Array<boolean>,
  preventRefresh?: Array<boolean>,
  rut?: string,
}
