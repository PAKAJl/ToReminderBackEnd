import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').default('todo'),
  priority: text('priority').default('low'),
  date: text('date').default('-'),
  token: text('token').default('test'),
});