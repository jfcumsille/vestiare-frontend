import { PaymentsViewLocale } from '@/interfaces/locales/views/payments';

export default <PaymentsViewLocale>{
  title_one: 'Payment',
  title_other: 'Payments',
  urls: {
    whatAre: 'What are Payment Intents?',
  },
  table: {
    headers: {
      fintocId: 'Fintoc ID',
      bankId: 'Bank ID',
      creationDate: 'Creation date',
      sender: 'Sender',
      senderAccount: 'Sender Account',
      amount: 'Amount',
      status: 'Status',
    },
  },
};
