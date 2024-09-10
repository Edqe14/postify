import { db, schema } from '@/db';
import { authorized, compose } from '@/lib/middleware';
import { errorResponse, successResponse } from '@/lib/responses';
import { authValidator } from '@/service/server/auth';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export const GET = compose(authorized, async (req) => {
  const dbUser = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, req.authenticated!.id),
    columns: {
      password: false,
    },
  });

  if (!dbUser) {
    return errorResponse('User not found', 404);
  }

  return successResponse('Get user successful', dbUser);
});

export const PUT = compose(authorized, async (req) => {
  try {
    const body = await req.json();
    const validated = await authValidator
      .extend({
        profile_pict: z.string(),
      })
      .partial()
      .safeParseAsync(body);

    if (!validated.success) {
      return errorResponse(validated.error.flatten(), 422);
    }

    await db
      .update(schema.users)
      .set(validated.data)
      .where(eq(schema.users.id, req.authenticated!.id));

    return successResponse('User updated');
  } catch {
    return errorResponse('Invalid request', 400);
  }
});
