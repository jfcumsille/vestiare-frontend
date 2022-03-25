import { ApiKeysViewLocale } from '@/interfaces/locales/views/apiKeys';

export default <ApiKeysViewLocale>{
  title: 'API Keys',
  subtitle: 'Prueba la API de Fintoc con credenciales de prueba',
  learnMore: 'Aprende más sobre Fintoc API Keys →',
  table: {
    headers: {
      name: 'Nombre',
      token: 'Token',
      created: 'Creado',
    },
    element: {
      publicKey: 'Public Key',
      secretKey: 'Secret Key',
      publicKeyInfo: 'La Public Key es usada para identificar tu cuenta dentro de Fintoc y se necesita para integrar el Widget.',
      secretKeyInfo: 'La Secret Key es usada para autentificar cualquier request que se haga a la API de Fintoc. ',
      rotate: 'Rotar',
      delete: 'Borrar',
      activateSecretKey: 'Activar Secret Key',
    },
  },
  modal: {
    title: 'Rotar API Key',
    warning: 'Rotar esta llave bloquea la actual y genera una nueva. Esto no se puede deshacer.',
    name: 'Nombre',
    token: 'Token',
    created: 'Creado',
    cancel: 'Cancelar',
  },
};
