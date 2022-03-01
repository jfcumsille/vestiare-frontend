import client from '@/api/client';
import { ILink, CompleteLink } from '@/interfaces/entities/links';
import { IJSON } from '@/interfaces/utilities/json';

export const list = async (
  organization: string,
  params: IJSON = {},
): Promise<Array<ILink>> => {
  const response = await client.get(
    '/internal/v1/links/dashboard',
    { params: { currentOrganizationId: organization, ...params } },
  );
  return response.data;
};

export const update = async (
  organization: string,
  linkId: string,
  data: IJSON,
): Promise<ILink> => {
  const response = await client.put(
    `/internal/v1/links/dashboard/${linkId}`,
    { linkData: data },
    { params: { currentOrganizationId: organization } },
  );
  return response.data;
};

export const remove = async (organization: string, linkId: string) => {
  client.delete(
    `/internal/v1/links/dashboard/${linkId}`,
    { params: { currentOrganizationId: organization } },
  );
};

export const regenerate = async (linkId: string): Promise<CompleteLink> => {
  const response = await client.post(`/internal/v1/links/dashboard/${linkId}/regenerate_link_token`);
  return response.data;
};
