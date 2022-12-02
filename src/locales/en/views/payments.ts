import { PaymentsViewLocale } from '@/interfaces/locales/views/payments';

export default <PaymentsViewLocale>{
  title_one: 'Payment Intent',
  title_other: 'Payment Intents',
  subtitle: 'Only finalized Payment Intents with associated sender information are shown. This does not include Payment Intents that are in progress or from users that did not enter their credentials.',
  urls: {
    whatAre: 'What are Payment Intents?',
  },
  table: {
    empty: {
      title: {
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
      title: 'Status includes:',
      status: {
        label: 'Status',
        options: {
          succeeded: 'Succeeded',
          rejected: 'Rejected',
          failed: 'Failed',
        },
      },
    },
  },
};
