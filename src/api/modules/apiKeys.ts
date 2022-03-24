import client from '@/api/client';
import { APIKey } from '@/interfaces/entities/apiKeys';

export const list = async (
  params: Record<string, string> = {},
): Promise<Array<APIKey>> => {
  const response = await client.get('/v1/api_keys', { params });
  return response.data;
};

export const create = async (
  params: Record<string, string> = {},
): Promise<void> => {
  await client.post('/v1/api_keys', { params });
};

export const destroy = async (
  params: Record<string, string> = {},
): Promise<void> => {
  await client.delete(`/v1/api_keys/${params.id}`, { params: { current_organization_id: params.current_organization_id } });
};
