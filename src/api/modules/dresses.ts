import client from '@/api/client';
import { Dress } from '@/interfaces/entities/dresses';
import { Json } from '@/interfaces/utilities/json';

export const BASE_PATH = '/internal/v1/links/dashboard';

export const list = async (
  params: Json = {},
): Promise<{total: number, dresses: Array<Dress>}> => {
  const response = await client.get(BASE_PATH, { params });
  const total = response.headers['x-total-count'];
  return { total: total ? Number(total) : 0, dresses: response.data };
};

export const update = async (
  dressId: string,
  data: Json,
): Promise<Dress> => {
  const response = await client.put(`${BASE_PATH}/${dressId}`, {
    linkData: data,
  });
  return response.data;
};

export const remove = async (dressId: string) => client.delete(`${BASE_PATH}/${dressId}`);
