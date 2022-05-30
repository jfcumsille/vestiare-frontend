import client from '@/api/client';
import { Organization } from '@/interfaces/entities/organization';

export const BASE_PATH = '/internal/v1/dashboard/organizations';

export const get = async (): Promise<Organization> => {
  const response = await client.get(BASE_PATH);
  return response.data;
};
