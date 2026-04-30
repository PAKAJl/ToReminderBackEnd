import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();
export default defineConfig({
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL,
    authToken: process.env.TURSO_AUTH_TOKEN }
});