export interface PaymentsViewLocale {
  title_one: string,
  title_other: string,
  subtitle: string,
  urls: {
    whatAre: string,
  },
  table: {
    empty: {
      title: {
        hasFilters: string,
        test: string,
        live: string,
      },
      learnHow: string,
      learnMore: string,
    },
    headers: {
      fintocId: string,
      creationDate: string,
      sender: string,
      senderAccount: string,
      amount: string,
      status: string,
    },
    filters: {
      status: {
        title: string,
        label: string,
        options: {
          succeeded: string,
          rejected: string,
          failed: string,
        },
      },
      creationDate: {
        title: string,
        subtitle: string,
        label: string,
      },
    },
  },
}
