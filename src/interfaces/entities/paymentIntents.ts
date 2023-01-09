import { Nullable } from '@/interfaces/common';
import { PaymentStatus } from '@/interfaces/utilities/enums';
import { Account } from './account';

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  createdAt: string
  recipientAccount: Account,
  referenceId: string
  senderAccount: Nullable<Account>
  status: PaymentStatus
  fintocErrorReason: Nullable<string>
}
