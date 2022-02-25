import client from '@/api/client';
import { Link } from '@/api/interfaces/links';

export const list = async (
  organization: string,
  params: Record<string, string> = {},
): Promise<Array<Link>> => {
  const response = await client.get(
    '/internal/v1/links/dashboard',
    { params: { currentOrganizationId: organization, ...params } },
  );
  return response.data;
};

export const update = async (
  organization: string,
  linkId: string,
  data: Record<string, string | boolean>,
): Promise<Link> => {
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
