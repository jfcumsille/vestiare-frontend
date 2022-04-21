import client from '@/api/client';
import { User } from '@/interfaces/entities/user';
import { SignUpOptions } from '@/interfaces/options/account';

export const BASE_PATH = '/internal/v1/user';

export const get = async (): Promise<User> => {
  const response = await client.get(BASE_PATH);
  return response.data;
};

export const create = async ({
  email, password, name, lastName, company, country,
}: SignUpOptions): Promise<User> => {
  const response = await client.post(BASE_PATH, {
    email, password, name, lastName, company, country,
  });
  return response.data;
};

export const sendConfirmationEmail = async (email: string) => {
  await client.post(`${BASE_PATH}/confirmation`, { email });
};

export const sendResetPasswordEmail = async (email: string) => {
  await client.post(`${BASE_PATH}/password`, { email });
};
