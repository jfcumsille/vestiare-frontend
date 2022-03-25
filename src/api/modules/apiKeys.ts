import client from '@/api/client';
import { APIKey } from '@/interfaces/entities/apiKeys';
import { API_KEYS_BASE_PATH } from '@/constants/api';

export const list = async (): Promise<Array<APIKey>> => {
  const response = await client.get(API_KEYS_BASE_PATH);
  return response.data;
};

export const create = async (): Promise<void> => {
  await client.post(API_KEYS_BASE_PATH);
};

export const destroy = async (
  keyId: string,
): Promise<void> => {
  await client.delete(`${API_KEYS_BASE_PATH}/${keyId}`);
};
