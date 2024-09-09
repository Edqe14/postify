import type { PaginationObject } from '@/lib/paginate';
import type { PostQuery } from '../server/post';

export const getPosts = async (page: number) => {
  const response = await fetch(`/api/posts?page=${page}&perPage=20`);
  const json = await response.json();

  return json.data as PaginationObject<PostQuery[]>;
};
