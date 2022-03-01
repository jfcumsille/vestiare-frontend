import client from '@/api/client';
import { User } from '@/interfaces/entities/user';

export const logIn = async (
  { email, password, token }: { email: string, password: string, token: string },
): Promise<User> => {
  const response = await client.post('/internal/v1/sessions', { email, password, token });
  return response.data;
};
