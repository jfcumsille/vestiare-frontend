import { ApiKeysViewLocale } from '@/interfaces/locales/views/apiKeys';

export default <ApiKeysViewLocale>{
  title: 'API Keys',
  subtitle: 'Try the Fintoc API with',
  learnMore: 'Learn more about Fintoc API Keys →',
  table: {
    headers: {
      name: 'Name',
      token: 'Token',
      created: 'Created',
    },
    element: {
      publicKey: 'Public Key',
      secretKey: 'Secret Key',
      publicKeyInfo: 'The Public Key is used to identify your account inside Fintoc and is needed for integrating the Widget.',
      secretKeyInfo: 'The Secret Key is used to authenticate any request made to the Fintoc API.',
      rotate: 'Rotate',
      delete: 'Delete',
      activateSecretKey: 'Activate Secret Key',
    },
  },
  modal: {
    title: 'Rotate API Key',
    warning: 'Rotating this key will block the current one and generate a new one. This cannot be undone.',
    name: 'Name',
    token: 'Token',
    created: 'Created',
    cancel: 'Cancel',
  },
};
