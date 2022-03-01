import client from '@/api/client';
import { IUser } from '@/interfaces/entities/user';
import { ILogInOptions } from '@/interfaces/options/logIn';

export const logIn = async ({ email, password, token }: ILogInOptions): Promise<IUser> => {
  const response = await client.post('/internal/v1/sessions', { email, password, token });
  return response.data;
};
