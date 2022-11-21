import { PaymentStatus } from '@/interfaces/utilities/enums';
import { Account } from '../entities/account';

export interface Filter<T> {
  name: string,
  value: T,
  checked: boolean,
}
export interface PaymentIntentFilter {
  status?: Array<PaymentStatus>,
  senderAccount?: Account,
}

export interface LinkFilter {
  active?: Array<boolean>,
  preventRefresh?: Array<boolean>,
  rut?: string,
}
