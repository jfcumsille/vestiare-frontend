export interface ApiKeysViewLocale {
  title: string,
  subtitle: string,
  table: {
    headers: {
      name: string,
      token: string,
      created: string,
      lastUsed: string,
    },
  },
}
