import client from '@/api/client';
import { Link } from '@/api/interfaces/links';

export const getLinks = async (
  organization: string,
  params: Record<string, string> = {},
): Promise<Array<Link>> => {
  const response = await client.get(
    '/internal/v1/links/dashboard',
    { params: { currentOrganizationId: organization, ...params } },
  );
  return response.data;
};
