import client from '@/api/client';
import { OrganizationUser } from '@/interfaces/entities/organizationUser';
import { OrganizationUserCreationOptions } from '@/interfaces/options/organizationUser';
import { Json } from '@/interfaces/utilities/json';

export const BASE_PATH = '/internal/v1/dashboard/organization_users';

export const get = async (): Promise<Array<OrganizationUser>> => {
  const response = await client.get(BASE_PATH);
  return response.data;
};

export const create = async (
  requestBody: OrganizationUserCreationOptions,
): Promise<OrganizationUser> => {
  const response = await client.post(BASE_PATH, requestBody);
  return response.data;
};

export const update = async (
  organizationUserId: string,
  data: Json,
): Promise<OrganizationUser> => {
  const response = await client.put(`${BASE_PATH}/${organizationUserId}`, {
    userData: data,
  });
  return response.data;
};
export const remove = async (organizationUserId: string) => client.delete(`${BASE_PATH}/${organizationUserId}`);
