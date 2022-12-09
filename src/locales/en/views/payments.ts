import { PaymentsViewLocale } from '@/interfaces/locales/views/payments';

export default <PaymentsViewLocale>{
  title_one: 'Payment Intent',
  title_other: 'Payment Intents',
  subtitle: 'Only finalized Payment Intents with associated sender information are shown. This does not include Payment Intents that are in progress or from users that did not enter their credentials.',
  urls: {
    whatAre: 'What are Payment Intents?',
  },
  detailDrawer: {
    title: 'Payment Intent - Detail',
    fintocID: 'Fintoc ID',
    senderBankID: 'Sender Bank Payment ID',
    creationDate: 'Creation Date',
    creationTime: 'Creation Time',
    timezone: 'Time Zone',
    utcTimestamp: 'UTC Timestamp',
    senderName: 'Sender Name',
    senderRut: 'Sender RUT',
    senderHolderId: 'Sender Holder ID',
    senderBank: 'Sender Bank',
    senderAccount: 'Sender Account',
    recipientName: 'Recipient Name',
    recipientRut: 'Recipient RUT',
    recipientBank: 'Recipient Bank',
    recipientAccount: 'Recipient Account',
    accountType: 'Account Type',
    amount: 'Amount',
    currency: 'Currency',
    status: 'Status',
  },
  table: {
    empty: {
      title: {
        hasFilters: 'You have no Payment Intents that fit this filtering criteria. Please try other filters in order to see data here.',
        test: 'Our transfer API allows your users to transfer or cash in funds between bank accounts from within your application. This will be done with a payment_intent which you will be able to visualize here.',
        live: 'In order to see data here please make your first Payment Intent.',
      },
      learnHow: 'Learn how →',
      learnMore: 'Learn more →',
    },
    headers: {
      fintocId: 'Fintoc ID',
      creationDate: 'Creation date',
      sender: 'Sender',
      senderAccount: 'Sender Account',
      amount: 'Amount',
      status: 'Status',
    },
    filters: {
      status: {
        title: 'Status includes:',
        label: 'Status',
        options: {
          succeeded: 'Succeeded',
          rejected: 'Rejected',
          failed: 'Failed',
        },
      },
      creationDate: {
        title: 'Date is between:',
        subtitle: '*Date and time is in your local timezone.',
        label: 'Date',
      },
    },
  },
};
