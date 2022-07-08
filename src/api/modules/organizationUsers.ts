import client from '@/api/client';
import { OrganizationUser } from '@/interfaces/entities/organizationUser';
import { OrganizationUserCreationOptions } from '@/interfaces/options/organizationUser';

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

export const remove = async (organizationUserId: string) => client.delete(`${BASE_PATH}/${organizationUserId}`);
