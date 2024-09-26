import type { PaginationObject } from '@/lib/paginate';
import type { PostQuery } from '../server/post';

export const getPosts = async (page: number) => {
  const response = await fetch(`/api/posts?page=${page}&perPage=20`);
  const json = await response.json();

  return json.data as PaginationObject<Omit<PostQuery, 'content'>[]>;
};

export const getMyPosts = async (page: number) => {
  const response = await fetch(`/api/posts/me?page=${page}&perPage=20`);
  const json = await response.json();

  return json.data as PaginationObject<Omit<PostQuery, 'content'>[]>;
};

export const createPost = async (title: string, content: string) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
};

export const deletePost = async (id: string) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  return response.json();
};

export const updatePost = async (
  id: string,
  title: string,
  content: string
) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });

  return response.json();
};
