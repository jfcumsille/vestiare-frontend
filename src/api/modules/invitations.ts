import client from '@/api/client';
import { OrganizationUser } from '@/interfaces/entities/organizationUser';

export const BASE_PATH = '/internal/v1/dashboard/invitations';

export const get = async (token: string): Promise<OrganizationUser> => {
  const response = await client.get(`${BASE_PATH}/${token}`);
  return response.data;
};
