import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;
const client = globalThis.dbClient ?? postgres(connectionString);

export const db =
  globalThis.db ??
  drizzle(client, {
    schema,
    logger: process.env.NODE_ENV === 'development',
  });

if (process.env.NODE_ENV === 'development') {
  globalThis.dbClient = client;
  globalThis.db = db;
}

declare const globalThis: {
  dbClient: ReturnType<typeof postgres>;
  db: ReturnType<typeof drizzle<typeof schema>>;
} & typeof global;

export { schema };
