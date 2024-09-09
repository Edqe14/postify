import { authenticate } from '@/lib/jwt';

export const getMe = async (token?: string) => {
  if (!token) return null;

  const userToken = await authenticate(token).catch(() => null);

  return userToken;
};
