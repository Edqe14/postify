import { db } from '@/db';
import { authenticate } from '@/lib/jwt';

export const getMe = async (token?: string) => {
  if (!token) return null;

  const userToken = await authenticate(token).catch(() => null);

  if (!userToken) return null;

  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, userToken.payload.id),
    columns: {
      password: false,
    },
  });

  return user;
};
