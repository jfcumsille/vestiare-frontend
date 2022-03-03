import client from '@/api/client';
import { User } from '@/interfaces/entities/user';
import { LogInOptions } from '@/interfaces/options/logIn';

export const logIn = async ({ email, password, token }: LogInOptions): Promise<User> => {
  const response = await client.post('/internal/v1/sessions', { email, password, token });
  return response.data;
};
