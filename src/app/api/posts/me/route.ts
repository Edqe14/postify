import { db, schema } from '@/db';
import { authorized, compose } from '@/lib/middleware';
import { paginate } from '@/lib/paginate';
import { successResponse } from '@/lib/responses';
import { idEncoder, inOption, parseNumber } from '@/lib/utils';
import { PostQuery } from '@/service/server/post';
import { desc, eq } from 'drizzle-orm';

export const GET = compose(authorized, async (req) => {
  const page = parseNumber(req.nextUrl.searchParams.get('page'), 1);
  const perPage = inOption(
    parseNumber(req.nextUrl.searchParams.get('perPage'), 10),
    [10, 20, 50]
  );

  const posts = await paginate<Omit<PostQuery, 'content'>>(
    db
      .select({
        id: schema.posts.id,
        title: schema.posts.title,
        createdAt: schema.posts.created_at,
        updatedAt: schema.posts.updated_at,
        user: {
          username: schema.users.username,
          profile_pict: schema.users.profile_pict,
        },
      })
      .from(schema.posts)
      .where(eq(schema.posts.user_id, req.authenticated!.id))
      .innerJoin(schema.users, eq(schema.posts.user_id, schema.users.id))
      .orderBy(desc(schema.posts.created_at)),
    page,
    perPage
  );

  posts.data.forEach((post) => {
    post.id = idEncoder.encode([post.id as unknown as number]);
  });

  return successResponse('Get posts successful', posts);
});
