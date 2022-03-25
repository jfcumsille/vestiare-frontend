import client from '@/api/client';
import { User } from '@/interfaces/entities/user';
import { SignUpOptions } from '@/interfaces/options/account';

export const BASE_PATH = '/internal/v1/users';

export const get = async (userId: string): Promise<User> => {
  const response = await client.get(`${BASE_PATH}/${userId}`);
  return response.data;
};

export const create = async ({
  email, password, token, name, lastName, company, country,
}: SignUpOptions): Promise<User> => {
  const response = await client.post(BASE_PATH, {
    email, password, token, name, lastName, company, country,
  });
  return response.data;
};

export const sendConfirmationEmail = async (email: string) => {
  await client.post(`${BASE_PATH}/confirmation`, { email });
};

export const sendResetPasswordEmail = async (email: string) => {
  await client.post(`${BASE_PATH}/password`, { email });
};
