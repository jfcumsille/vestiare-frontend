import client from '@/api/client';
import { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import { WebhookEndpointCreationOptions } from '@/interfaces/options/webhookEndpoints';
import { WebhookEndpointSecret } from '@/interfaces/responses/webhookEndpoints';
import { Mode } from '@/interfaces/utilities/enums';
import { Json } from '@/interfaces/utilities/json';

export const BASE_PATH = '/internal/v1/webhook_endpoints';

export const list = async (): Promise<WebhookEndpoint[]> => {
  const livePromise = client.get(BASE_PATH, {
    params: { mode: Mode.Live },
  });
  const testPromise = client.get(BASE_PATH, {
    params: { mode: Mode.Test },
  });
  const responses = await Promise.all([livePromise, testPromise]);
  return [].concat(...responses.map((response) => response.data));
};

export const create = async (
  requestBody: WebhookEndpointCreationOptions,
  mode: Mode,
): Promise<WebhookEndpoint> => {
  const response = await client.post(BASE_PATH, requestBody, { params: { mode } });
  return response.data;
};

export const update = async (
  webhookEndpointId: string,
  mode: Mode,
  requestBody: Record<string, boolean>,
): Promise<WebhookEndpoint> => {
  const response = await client.put(
    `${BASE_PATH}/${webhookEndpointId}`,
    requestBody,
    { params: { mode } },
  );
  return response.data;
};

export const remove = async (webhookEndpointId: string, mode: string) => {
  client.delete(`${BASE_PATH}/${webhookEndpointId}`, {
    params: { mode },
  });
};

export const getSecret = async (
  webhookEndpointId: string,
  mode: Mode,
): Promise<WebhookEndpointSecret> => {
  const response = await client.get(
    `${BASE_PATH}/${webhookEndpointId}/secret`,
    { params: { mode } },
  );
  return response.data;
};

export const sendTestWebhook = async (
  webhookEndpointId: string,
  event: string,
): Promise<Json> => {
  const response = await client.post(
    `${BASE_PATH}/${webhookEndpointId}/test`,
    { event },
    { params: { mode: Mode.Test } },
  );
  return response.data;
};
