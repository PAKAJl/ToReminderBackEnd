import { db } from "../db/index.js";
import { projects } from "../db/schema.js";
import { eq, and } from "drizzle-orm";
import { randomBytes } from "node:crypto";

export const projectService = {
  async getNameByToken(token) {
    const result = await db
      .select({ name: projects.name }) // Выбираем только поле title (которое в БД 'name')
      .from(projects)
      .where(eq(projects.token, token))
      .get(); // Возвращает объект { name: "..." } или undefined, если ничего не найдено

    return result;
  },

  async create(data) {
    const projectToken = randomBytes(32).toString("hex");
    return await db
      .insert(projects)
      .values({
        name: data.name,
        token: projectToken,
      })
      .returning();
  },

  async delete(token) {
    return await db
      .delete(projects)
      .where(eq(projects.token, token))
      .returning();
  },

  async nameUpdate(token, name) {
    console.log(token + " " + name);
    return await db
      .update(projects)
      .set({ name: name })
      .where(eq(projects.token, token))
      .returning();
  },
};
