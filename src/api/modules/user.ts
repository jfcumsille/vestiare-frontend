import client from '@/api/client';
import { IUser } from '@/interfaces/entities/user';

export const get = async (userId: string): Promise<IUser> => {
  const response = await client.get(`/internal/v1/users/${userId}`);
  return response.data;
};
