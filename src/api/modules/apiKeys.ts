import client from '@/api/client';
import { APIKey } from '@/interfaces/entities/apiKeys';

export const list = async (
  organization: string,
  params: Record<string, string> = {},
): Promise<Array<APIKey>> => {
  const response = await client.get(
    '/v1/api_keys',
    { params: { currentOrganizationId: organization, ...params } },
  );
  return response.data;
};
