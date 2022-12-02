import { PaymentsViewLocale } from '@/interfaces/locales/views/payments';

export default <PaymentsViewLocale>{
  title_one: 'Payment Intent',
  title_other: 'Payment Intents',
  subtitle: 'Solo los Payment Intents finalizados con información de la cuenta origen asociada serán mostrados. Esto no incluye Payment Intents que están in_progress o de usuarios que no han ingresado sus credenciales.',
  urls: {
    whatAre: '¿Qué son los Payment Intent?',
  },
  table: {
    empty: {
      title: {
        hasFilters: 'No tiene Payment Intents que se ajustan a este criterio de filtrado. Prueba otros filtros para ver datos aquí.',
        test: 'Nuestra API de transferencias permite que tus usuarios puedan transferir o hacer cash-in entre cuentas bancarias desde tu aplicación. Esto será realizado con un Payment Intent que podrás visualizar acá.',
        live: 'Para ver datos en esta tabla por favor realiza tu primer Payment Intent.',
      },
      learnHow: 'Aprende cómo →',
      learnMore: 'Aprende más →',
    },
    headers: {
      fintocId: 'ID Fintoc',
      creationDate: 'Fecha creación',
      sender: 'Origen',
      senderAccount: 'Cuenta Origen',
      amount: 'Monto',
      status: 'Status',
    },
    filters: {
      title: 'Status incluye:',
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
