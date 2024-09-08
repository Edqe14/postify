import { schema } from '@/db';
import { JWTPayload, jwtVerify, SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.APP_SECRET);

export const generateUserToken = (user: typeof schema.users.$inferSelect) => {
  return new SignJWT({
    id: user.id,
    username: user.username,
    profile_pict: user.profile_pict,
    created_at: user.created_at,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(secret);
};

export type TokenPayload = JWTPayload & {
  id: number;
  username: string;
  profile_pict: string;
  created_at: string;
};

export const authenticate = (token: string) => {
  return jwtVerify<TokenPayload>(token, secret);
};
