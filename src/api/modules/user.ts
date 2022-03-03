import client from '@/api/client';
import { User } from '@/interfaces/entities/user';

export const get = async (userId: string): Promise<User> => {
  const response = await client.get(`/internal/v1/users/${userId}`);
  return response.data;
};
