import { db } from '@/db';
import { idEncoder } from '@/lib/utils';
import { z } from 'zod';

export type PostQuery = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
    profile_pict: string;
  };
};

export const postValidator = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(3),
});

export const getPost = async (id: string) => {
  const [dId] = idEncoder.decode(id);
  if (!dId) return null;

  return await db.query.posts.findFirst({
    where: (post, { eq }) => eq(post.id, dId),
    with: {
      user: true,
    },
  });
};
