import client from '@/api/client';
import { OrganizationUser } from '@/interfaces/entities/organizationUser';

export const BASE_PATH = '/internal/v1/dashboard/organization_users';

export const get = async (): Promise<Array<OrganizationUser>> => {
  const response = await client.get(BASE_PATH);
  return response.data;
};
