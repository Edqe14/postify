import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({
  path: '.env.local',
});

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './src/db/drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
