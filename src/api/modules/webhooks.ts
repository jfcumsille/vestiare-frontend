import client from '@/api/client';
import { Webhook } from '../interfaces/webhooks';

export const list = async (organization: string, mode: string): Promise<Webhook[]> => {
  const params = { currentOrganizationId: organization, mode };
  const response = await client.get('/internal/v1/webhook_endpoints', { params });
  return response.data;
};

export const update = async (
  organization: string,
  webhookEndpointId: string,
  mode: string,
  requestBody: Record<string, boolean>,
): Promise<Webhook> => {
  const response = await client.put(
    `/internal/v1/webhook_endpoints/${webhookEndpointId}`,
    requestBody,
    { params: { currentOrganizationId: organization, mode } },
  );
  return response.data;
};

export const remove = async (organization: string, webhookEndpointId: string, mode: string) => {
  client.delete(
    `/internal/v1/webhook_endpoints/${webhookEndpointId}`,
    { params: { currentOrganizationId: organization, mode } },
  );
};
