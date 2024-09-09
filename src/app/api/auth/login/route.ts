import { db, schema } from '@/db';
import { generateUserToken } from '@/lib/jwt';
import { errorResponse, successResponse } from '@/lib/responses';
import { authValidator } from '@/service/auth';
import { verify } from 'argon2';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validated = await authValidator.safeParseAsync(body);

    if (validated.error) {
      return errorResponse(validated.error.flatten(), 422);
    }

    const existing = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.username, validated.data.username),
    });

    if (!existing) {
      return errorResponse('User not found', 404);
    }

    if (!(await verify(existing.password, validated.data.password))) {
      return errorResponse('Invalid credentials', 401);
    }

    const token = await generateUserToken(existing);
    const response = successResponse(`Welcome, ${existing.username}`);

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return errorResponse('Invalid request', 400);
  }
};
