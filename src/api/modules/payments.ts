import client from '@/api/client';
import { PaymentIntent } from '@/interfaces/entities/paymentIntents';
import { Json } from '@/interfaces/utilities/json';

export const BASE_PATH = '/internal/v1/dashboard/payment_intents';

export const list = async (
  params: Json = {},
): Promise<{total: number, paymentIntents: Array<PaymentIntent>}> => {
  const response = await client.get(BASE_PATH, { params });
  const total = response.headers['x-total-count'];
  return { total: total ? Number(total) : 0, paymentIntents: response.data };
};

export const exportPaymentIntents = async (params: Json = {}) => {
  const response = await client.get(`${BASE_PATH}/export_csv_url`, { params });
  return response.data;
};
