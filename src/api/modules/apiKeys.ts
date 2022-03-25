import client from '@/api/client';
import { APIKey } from '@/interfaces/entities/apiKeys';

export const list = async (): Promise<Array<APIKey>> => {
  const response = await client.get('/v1/api_keys');
  return response.data;
};

export const create = async (): Promise<void> => {
  await client.post('/v1/api_keys');
};

export const destroy = async (
  keyId: string,
): Promise<void> => {
  await client.delete(`/v1/api_keys/${keyId}`);
};
