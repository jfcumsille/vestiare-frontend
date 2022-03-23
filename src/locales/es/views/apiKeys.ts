import { ApiKeysViewLocale } from '@/interfaces/locales/views/apiKeys';

export default <ApiKeysViewLocale>{
  title: 'API Keys',
  subtitle: 'Prueba la API de Fintoc con credenciales de prueba',
  table: {
    headers: {
      name: 'Nombre',
      token: 'Token',
      created: 'Creado',
      lastUsed: 'Última vez usado',
    },
  },
};
