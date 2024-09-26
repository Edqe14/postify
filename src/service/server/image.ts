'use server';

import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

export const uploadImage = async (data: FormData) => {
  const file = data.get('file') as File | null;

  if (!file) throw new Error('No file provided');
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File size too large');
  }

  if (file.type.split('/')[0] !== 'image') {
    throw new Error('Invalid file type');
  }

  const res = await utapi.uploadFiles(file);
  if (res.error) {
    throw new Error(res.error.message);
  }

  return res;
};
