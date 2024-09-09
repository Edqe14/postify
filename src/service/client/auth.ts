import { z } from 'zod';
import type { authValidator } from '../server/auth';
import type { TokenPayload } from '@/lib/jwt';

export const login = async (data: z.infer<typeof authValidator>) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error);
  }

  return json;
};

export const register = async (data: z.infer<typeof authValidator>) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error);
  }

  return json;
};

export const getMe = async () => {
  const response = await fetch('/api/auth/me');
  const json = await response.json();

  return json.data as TokenPayload;
};

export const logout = async () => {
  await fetch('/api/auth/logout');
};
