import { db, schema } from '@/db';
import { authorized, compose } from '@/lib/middleware';
import { errorResponse, successResponse } from '@/lib/responses';
import { idEncoder } from '@/lib/utils';
import { postValidator } from '@/service/server/post';
import { eq } from 'drizzle-orm';

export const GET = compose(authorized, async (req, params) => {
  const slug = params.slug as string;
  const [id] = idEncoder.decode(slug);

  if (!id) {
    return errorResponse('Unknown post', 404);
  }

  const post = await db.query.posts.findFirst({
    where: (post, { eq }) => eq(post.id, id),
    columns: {
      user_id: false,
    },
    with: {
      user: {
        columns: {
          username: true,
          profile_pict: true,
        },
      },
    },
  });

  if (!post) {
    return errorResponse('Unknown post', 404);
  }

  const masked = {
    ...post,
    id,
  };

  return successResponse('Get post successful', masked);
});

export const PUT = compose(authorized, async (req, params) => {
  const slug = params.slug as string;
  const [id] = idEncoder.decode(slug);

  if (!id) {
    return errorResponse('Unknown post', 404);
  }

  const post = await db.query.posts.findFirst({
    where: (post, { eq }) => eq(post.id, id),
    columns: {
      id: true,
      user_id: true,
    },
  });

  if (!post) {
    return errorResponse('Unknown post', 404);
  }

  if (post.user_id !== req.authenticated!.id) {
    return errorResponse('Unauthorized action', 403);
  }

  try {
    const body = await req.json();
    const validated = await postValidator.partial().safeParseAsync(body);

    if (!validated.success) {
      return errorResponse(validated.error.flatten(), 422);
    }

    const [post] = await db
      .update(schema.posts)
      .set(validated.data)
      .where(eq(schema.posts.id, id))
      .returning();

    const masked = {
      ...post,
      id: slug,
      user_id: idEncoder.encode([post.user_id]),
    };

    return successResponse('Update post successful', masked);
  } catch (err) {
    return errorResponse('Invalid request');
  }
});

export const DELETE = compose(authorized, async (req, params) => {
  const slug = params.slug as string;
  const [id] = idEncoder.decode(slug);

  if (!id) {
    return errorResponse('Unknown post', 404);
  }

  const post = await db.query.posts.findFirst({
    where: (post, { eq }) => eq(post.id, id),
    columns: {
      id: true,
      user_id: true,
    },
  });

  if (!post) {
    return errorResponse('Unknown post', 404);
  }

  if (post.user_id !== req.authenticated!.id) {
    return errorResponse('Unauthorized action', 403);
  }

  await db.delete(schema.posts).where(eq(schema.posts.id, id));

  return successResponse('Delete post successful');
});
