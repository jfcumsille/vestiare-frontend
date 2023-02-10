export interface PaymentsViewLocale {
  title_one: string,
  title_other: string,
  subtitle: string,
  urls: {
    whatAre: string,
  },
  detailDrawer: {
    title: string,
    fintocID: string,
    senderBankID: string,
    creationDate: string,
    creationTime: string,
    timezone: string,
    utcTimestamp: string,
    senderName: string,
    senderRut: string,
    senderHolderId: string,
    senderBank: string,
    senderAccount: string,
    recipientName: string,
    recipientRut: string,
    recipientHolderId: string,
    recipientBank: string,
    recipientAccount: string,
    accountType: string,
    amount: string,
    currency: string,
    status: string,
    metadata: string,
    noMetadata: string,
    howToUse: string,
  },
  exportDrawer: {
    title: string,
    format: string,
    download: string,
    downloadBegun: string,
    transactions: string,
    selectFormat: string,
    filters: string,
    dateBetween: string,
    noDateFilter: string,
    timesIn: string,
    and: string,
    statusIncludes: string,
    noStatusFilter: string,
    columns: string,
    default: string,
    exportReady: string,
    downloadAgain: string,
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
        labelType: string,
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
      fintocID: {
        title: string,
        label: string,
        hint: string,
      },
      senderHolderID: {
        title: string,
        label: string,
      },
    },
  },
}
