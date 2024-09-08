import { db } from '@/db';
import { authorized, compose } from '@/lib/middleware';
import { errorResponse, successResponse } from '@/lib/responses';

export const GET = compose(authorized, async (req) => {
  const dbUser = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, req.authenticated!.id),
  });

  if (!dbUser) {
    return errorResponse('User not found', 404);
  }

  return successResponse('Get user successful', req.authenticated);
});
