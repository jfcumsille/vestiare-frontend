import client from '@/api/client';
import { User } from '@/interfaces/entities/user';

export const BASE_PATH = '/internal/v1/users';

export const get = async (userId: string): Promise<User> => {
  const response = await client.get(`${BASE_PATH}/${userId}`);
  return response.data;
};
