import client from '@/api/client';
import { Link, CompleteLink } from '@/interfaces/entities/links';
import { Json } from '@/interfaces/utilities/json';

export const BASE_PATH = '/internal/v1/links/dashboard';

export const list = async (
  params: Json = {},
): Promise<{total: number, links: Array<Link>}> => {
  const response = await client.get(BASE_PATH, { params });
  const total = response.headers['x-total-count'];
  return { total: total ? Number(total) : 0, links: response.data };
};

export const update = async (
  linkId: string,
  data: Json,
): Promise<Link> => {
  const response = await client.put(`${BASE_PATH}/${linkId}`, {
    linkData: data,
  });
  return response.data;
};

export const remove = async (linkId: string) => client.delete(`${BASE_PATH}/${linkId}`);

export const regenerate = async (linkId: string): Promise<CompleteLink> => {
  const response = await client.post(`${BASE_PATH}/${linkId}/regenerate_link_token`);
  return response.data;
};
