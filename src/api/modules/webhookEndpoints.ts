import client from '@/api/client';
import { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import { WebhookEndpointSecret } from '@/interfaces/responses/webhookEndpoints';

export const list = async (): Promise<WebhookEndpoint[]> => {
  const livePromise = client.get('/internal/v1/webhook_endpoints', {
    params: { mode: 'live' },
  });
  const testPromise = client.get('/internal/v1/webhook_endpoints', {
    params: { mode: 'test' },
  });
  const responses = await Promise.all([livePromise, testPromise]);
  return [].concat(...responses.map((response) => response.data));
};

export const update = async (
  webhookEndpointId: string,
  mode: string,
  requestBody: Record<string, boolean>,
): Promise<WebhookEndpoint> => {
  const response = await client.put(
    `/internal/v1/webhook_endpoints/${webhookEndpointId}`,
    requestBody,
    { params: { mode } },
  );
  return response.data;
};

export const remove = async (webhookEndpointId: string, mode: string) => {
  client.delete(`/internal/v1/webhook_endpoints/${webhookEndpointId}`, {
    params: { mode },
  });
};

export const getSecret = async (
  webhookEndpointId: string,
  mode: string,
): Promise<WebhookEndpointSecret> => {
  const response = await client.get(
    `/internal/v1/webhook_endpoints/${webhookEndpointId}/secret`,
    { params: { mode } },
  );
  return response.data;
};
