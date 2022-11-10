import { PaymentsViewLocale } from '@/interfaces/locales/views/payments';

export default <PaymentsViewLocale>{
  title_one: 'Pago',
  title_other: 'Pagos',
  table: {
    headers: {
      fintocId: 'ID Fintoc',
      bankId: 'ID Banco',
      creationDate: 'Fecha creación',
      sender: 'Sender',
      senderAccount: 'Sender Account',
      amount: 'Monto',
      status: 'Status',
    },
  },
};
