import { Nullable } from '@/interfaces/common';
import { PaymentStatus } from '@/interfaces/utilities/enums';
import { Institution } from './institutions';

export interface PaymentIntent {
  id: string
  amount: number
  amountCurrency: string
  createdAt: string
  recipientHolderName: string
  recipientHolderId: string
  recipientAccountNumber: number
  recipientAccountType: string
  recipientBankId: string
  referenceId: string
  senderAccount: Nullable<Account>
  status: PaymentStatus
}
