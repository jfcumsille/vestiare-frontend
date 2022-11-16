import { Nullable } from '@/interfaces/common';
import { PaymentStatus } from '@/interfaces/utilities/enums';
import { Institution } from './institutions';

export interface Account {
  holderId: string
  holderName: string
  number: string
  type: string
  institution: Institution
}
export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  createdAt: string
  recipientAccount: Account,
  referenceId: string
  senderAccount: Nullable<Account>
  status: PaymentStatus
}
