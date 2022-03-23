export interface ApiKeysViewLocale {
  title: string,
  subtitle: string,
  learnMore: string,
  table: {
    headers: {
      name: string,
      token: string,
      created: string,
    },
    element: {
      publicKey: string,
      secretKey: string,
      rotate: string,
      delete: string,
      activateSecretKey: string,
    },
  },
  modal: {
    title: string,
    warning: string,
    name: string,
    token: string,
    created: string,
    cancel: string,
  },
}
