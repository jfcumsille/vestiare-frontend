import client from '@/api/client';
import { OrganizationFull } from '@/interfaces/entities/organization';
import { Json } from '@/interfaces/utilities/json';

export const BASE_PATH = '/internal/v1/dashboard/organizations';

export const get = async (): Promise<OrganizationFull> => {
  const response = await client.get(BASE_PATH);
  return response.data;
};

export const update = async (
  organizationId: string,
  data: Json,
): Promise<OrganizationFull> => {
  const response = await client.put(`${BASE_PATH}/${organizationId}`, {
    organizationData: data,
  });
  return response.data;
};
