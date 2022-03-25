import client from '@/api/client';
import { APIKey } from '@/interfaces/entities/apiKeys';

export const BASE_PATH = '/v1/api_keys';

export const list = async (): Promise<Array<APIKey>> => {
  const response = await client.get(BASE_PATH);
  return response.data;
};

export const create = async (): Promise<void> => {
  await client.post(BASE_PATH);
};

export const destroy = async (
  keyId: string,
): Promise<void> => {
  await client.delete(`${BASE_PATH}/${keyId}`);
};
