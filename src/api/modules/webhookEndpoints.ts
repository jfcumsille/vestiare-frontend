import client from '@/api/client';
import { WebhookEndpoint } from '@/api/interfaces/webhookEndpoints';

export const list = async (organization: string, mode: string): Promise<WebhookEndpoint[]> => {
  const params = { currentOrganizationId: organization, mode };
  const response = await client.get('/internal/v1/webhook_endpoints', { params });
  return response.data;
};

export const update = async (
  organization: string,
  webhookEndpointId: string,
  mode: string,
  requestBody: Record<string, boolean>,
): Promise<WebhookEndpoint> => {
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
