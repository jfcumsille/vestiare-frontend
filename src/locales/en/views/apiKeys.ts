import { ApiKeysViewLocale } from '@/interfaces/locales/views/apiKeys';

export default <ApiKeysViewLocale>{
  title: 'API Keys',
  subtitle: 'Try the Fintoc API with test credentials',
  table: {
    headers: {
      name: 'Name',
      token: 'Token',
      created: 'Created',
      lastUsed: 'Last Used',
    },
    element: {
      publicKey: 'Public Key',
      secretKey: 'Secret Key',
    },
  },
};
