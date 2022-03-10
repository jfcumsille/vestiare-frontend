import client from '@/api/client';
import { Link, CompleteLink } from '@/interfaces/entities/links';
import { Json } from '@/interfaces/utilities/json';

export const list = async (
  params: Json = {},
): Promise<Array<Link>> => {
  const response = await client.get('/internal/v1/links/dashboard', { params });
  return response.data;
};

export const update = async (
  linkId: string,
  data: Json,
): Promise<Link> => {
  const response = await client.put(`/internal/v1/links/dashboard/${linkId}`, {
    linkData: data,
  });
  return response.data;
};

export const remove = async (linkId: string) => {
  client.delete(`/internal/v1/links/dashboard/${linkId}`);
};

export const regenerate = async (linkId: string): Promise<CompleteLink> => {
  const response = await client.post(`/internal/v1/links/dashboard/${linkId}/regenerate_link_token`);
  return response.data;
};
