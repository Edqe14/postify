import { db, schema } from '@/db';
import { errorResponse, successResponse } from '@/lib/responses';
import { authValidator } from '@/service/server/auth';
import { hash } from 'argon2';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validated = await authValidator.safeParseAsync(body);

    if (!validated.success) {
      return errorResponse(validated.error.flatten(), 422);
    }

    const existing = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.username, validated.data.username),
      columns: {
        id: true,
      },
    });

    if (existing) {
      return errorResponse('User already exists', 409);
    }

    const passwordHash = await hash(validated.data.password);

    await db.insert(schema.users).values({
      username: validated.data.username,
      password: passwordHash,
    });

    return successResponse('User registered');
  } catch (error) {
    return errorResponse('Invalid request');
  }
};
