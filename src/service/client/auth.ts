import { z } from 'zod';
import type { authValidator } from '../server/auth';

export const login = async (data: z.infer<typeof authValidator>) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const json = response.json();
  console.log(json);

  return json;
};
