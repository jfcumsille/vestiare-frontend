import client from '@/api/client';
import { User } from '@/interfaces/entities/user';
import { LogInOptions } from '@/interfaces/options/account';

export const BASE_PATH = '/internal/v1/sessions';

export const create = async ({ email, password, token }: LogInOptions): Promise<User> => {
  const response = await client.post(BASE_PATH, { email, password, token });
  return response.data;
};
