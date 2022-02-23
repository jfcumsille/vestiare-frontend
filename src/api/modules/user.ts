import client from '@/api/client';
import { User } from '@/api/interfaces/user';

export const getUser = async ({ userId }: { userId: string }): Promise<User> => {
  const response = await client.get(`/internal/v1/users/${userId}`);
  return response.data;
};
