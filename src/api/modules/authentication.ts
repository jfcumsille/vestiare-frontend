import client from '@/api/client';
import { User } from '@/interfaces/entities/user';
import { LogInOptions, SignUpOptions } from '@/interfaces/options/account';

export const logIn = async ({ email, password, token }: LogInOptions): Promise<User> => {
  const response = await client.post('/internal/v1/sessions', { email, password, token });
  return response.data;
};

export const signUp = async ({
  email, password, token, name, lastName, company, country,
}: SignUpOptions): Promise<User> => {
  const response = await client.post('/internal/v1/users', {
    email, password, token, name, lastName, company, country,
  });
  return response.data;
};

export const sendConfirmationEmail = async (email: string) => {
  await client.post('/internal/v1/users/confirmation', { email });
};
