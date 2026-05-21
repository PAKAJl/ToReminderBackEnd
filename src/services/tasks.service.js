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
    console.log(data)
    return await db.insert(tasks).values(data).returning();
  },

  async delete(id, token) {
    return await db.delete(tasks).where(and(eq(tasks.id, id), eq(tasks.token, token))).returning();
  },

  async update(id,token, data) {
    return await db
      .update(tasks)
      .set({ title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,})
      .where(and(eq(tasks.id, id), eq(tasks.token, token)))
      .returning();
  },
};


