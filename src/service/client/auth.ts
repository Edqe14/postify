import { z } from 'zod';
import type { authValidator } from '../server/auth';
import type { TokenPayload } from '@/lib/jwt';

export const login = async (data: z.infer<typeof authValidator>) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const json = response.json();

  return json;
};

export const getMe = async () => {
  const response = await fetch('/api/auth/me');
  const json = await response.json();

  return json.data as TokenPayload;
};
