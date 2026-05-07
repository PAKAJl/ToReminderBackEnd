import { db } from "../db/index.js";
import { tasks } from "../db/schema.js";
import { eq, and } from "drizzle-orm";

export const taskService = {
  async getAll() {
    return await db.select().from(tasks).all();
  },

  async getAllByToken(token) {
    console.log(token)
    return await db
      .select()
      .from(tasks)
      .where(eq(tasks.token, token)) // Добавляем условие фильтрации;
  },

  async create(data) {
    return await db.insert(tasks).values(data).returning();
  },

  async delete(id, token) {
    return await db.delete(tasks).where(and(eq(tasks.id, id), eq(tasks.token, token))).returning();
  },

  async toggleComplete(id, status) {
    return await db
      .update(tasks)
      .set({ isCompleted: status })
      .where(eq(tasks.id, id))
      .returning();
  },
};
