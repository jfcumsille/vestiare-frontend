import { PaymentsViewLocale } from '@/interfaces/locales/views/payments';

export default <PaymentsViewLocale>{
  title_one: 'Payment Intent',
  title_other: 'Payment Intents',
  urls: {
    whatAre: '¿Qué son los Payment Intent?',
  },
  table: {
    headers: {
      fintocId: 'ID Fintoc',
      bankId: 'ID Banco',
      creationDate: 'Fecha creación',
      sender: 'Emisor',
      senderAccount: 'Cuenta Emisor',
      amount: 'Monto',
      status: 'Status',
    },
  },
};
