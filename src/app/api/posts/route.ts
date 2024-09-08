import { db, schema } from '@/db';
import { authorized, compose } from '@/lib/middleware';
import { paginate } from '@/lib/paginate';
import { successResponse } from '@/lib/responses';
import { eq } from 'drizzle-orm';

export const GET = compose(authorized, async (req) => {
  const page =
    Number.parseInt(req.nextUrl.searchParams.get('page') ?? '0') || 1;
  const perPage =
    Number.parseInt(req.nextUrl.searchParams.get('perPage') ?? '0') || 10;

  const posts = await paginate(
    db
      .select({
        id: schema.posts.id,
        title: schema.posts.title,
        content: schema.posts.content,
        created_at: schema.posts.created_at,
        updated_at: schema.posts.updated_at,
        user: {
          id: schema.users.id,
          username: schema.users.username,
          profile_pict: schema.users.profile_pict,
        },
      })
      .from(schema.posts)
      .innerJoin(schema.users, eq(schema.posts.user_id, schema.users.id)),
    page,
    perPage
  );

  return successResponse('Get posts successfully', posts);
});
