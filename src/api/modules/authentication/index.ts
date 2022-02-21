import client from '@/api/client';
import { LogInResponse } from './interfaces';

export const logIn = async (
  { email, password, token }: { email: string, password: string, token: string, },
): Promise<LogInResponse> => {
  const response = await client.post('/internal/v1/sessions', { email, password, token });
  return response.data;
};
