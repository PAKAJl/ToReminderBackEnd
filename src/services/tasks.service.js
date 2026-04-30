
import { db } from '../db/index.js';
import { tasks } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const taskService = {
  async getAll() {
    return await db.select().from(tasks).all();
  },

  async create(data) {
    return await db.insert(tasks).values(data).returning();
  },

  async toggleComplete(id, status) {
    return await db.update(tasks)
      .set({ isCompleted: status })
      .where(eq(tasks.id, id))
      .returning();
  }
};