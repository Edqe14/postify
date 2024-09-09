import { z } from 'zod';

export const authValidator = z.object({
  username: z.string().max(255),
  password: z.string().min(8),
});
