import client from '@/api/client';
import { User } from '@/interfaces/entities/user';
import { LogInOptions, SignUpOptions } from '@/interfaces/options/account';

export const BASE_USERS_PATH = '/internal/v1/users';
export const BASE_SESSIONS_PATH = '/internal/v1/sessions';

export const logIn = async ({ email, password, token }: LogInOptions): Promise<User> => {
  const response = await client.post(BASE_SESSIONS_PATH, { email, password, token });
  return response.data;
};

export const signUp = async ({
  email, password, token, name, lastName, company, country,
}: SignUpOptions): Promise<User> => {
  const response = await client.post(BASE_USERS_PATH, {
    email, password, token, name, lastName, company, country,
  });
  return response.data;
};

export const sendConfirmationEmail = async (email: string) => {
  await client.post(`${BASE_USERS_PATH}/confirmation`, { email });
};

export const sendResetPasswordEmail = async (email: string) => {
  await client.post(`${BASE_USERS_PATH}/password`, { email });
};
