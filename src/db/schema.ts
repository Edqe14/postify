import { relations, sql } from 'drizzle-orm';
import {
  date,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username').unique().notNull(),
  password: varchar('password').notNull(),
  profile_pict: varchar('profile_pict'),
  created_at: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'date', withTimezone: true })
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  user_id: serial('user_id').references(() => users.id),
  title: varchar('title').notNull(),
  content: text('content').notNull(),
  created_at: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'date', withTimezone: true })
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const postRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.user_id],
    references: [users.id],
  }),
}));
