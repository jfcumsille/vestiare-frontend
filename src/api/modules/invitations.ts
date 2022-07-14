import client from '@/api/client';
import { OrganizationUserInvitation } from '@/interfaces/entities/organizationUser';

export const BASE_PATH = '/internal/v1/dashboard/invitations';

export const get = async (token: string): Promise<OrganizationUserInvitation> => {
  const response = await client.get(`${BASE_PATH}/${token}`);
  return response.data;
};

export const accept = async (token: string): Promise<OrganizationUserInvitation> => {
  const response = await client.get(`${BASE_PATH}/${token}/accept`);
  return response.data;
};

export const decline = async (token: string): Promise<OrganizationUserInvitation> => {
  const response = await client.get(`${BASE_PATH}/${token}/decline`);
  return response.data;
};

export const resend = async (token: string): Promise<OrganizationUserInvitation> => {
  const response = await client.get(`${BASE_PATH}/${token}/resend`);
  return response.data;
};
