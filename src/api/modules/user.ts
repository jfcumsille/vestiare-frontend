import client from '@/api/client';
import { User } from '@/interfaces/entities/user';
import { SignUpOptions } from '@/interfaces/options/account';

export const BASE_PATH = '/internal/v1/user';

export const get = async (): Promise<User> => {
  const response = await client.get(BASE_PATH);
  return response.data;
};

export const create = async ({
  id, email, name, lastName, company, country,
}: SignUpOptions): Promise<User> => {
  const response = await client.post(BASE_PATH, {
    id, email, name, lastName, company, country,
  });
  return response.data;
};

export const sendResetPasswordEmail = async (email: string) => {
  await client.post(`${BASE_PATH}/password`, { email });
};
