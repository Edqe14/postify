import { NextRequest, NextResponse } from 'next/server';
import { errorResponse } from './responses';
import { authenticate, type TokenPayload } from './jwt';

export type Middleware = (
  req: NextRequest
) => Promise<NextResponse | null | undefined | boolean>;

export const compose = (...middlewares: Middleware[]) => {
  return async (req: NextRequest) => {
    for (const middleware of middlewares) {
      const res = await middleware(req);

      if (!(res instanceof NextResponse)) continue;

      return res;
    }
  };
};

export const authorized: Middleware = async (req) => {
  const cookie = req.cookies.get('token');

  if (!cookie) {
    return errorResponse('Unauthorized', 401);
  }

  try {
    const token = await authenticate(cookie.value);

    req.authenticated = token.payload;
  } catch (err) {
    return errorResponse('Unauthorized', 401);
  }
};

/// declare next/server

declare module 'next/server' {
  interface NextRequest {
    authenticated?: TokenPayload;
  }
}
