import { neon } from "@neondatabase/serverless";

// Neon PostgreSQL serverless client
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && process.env.NODE_ENV === "development") {
  console.warn("DATABASE_URL is not set. Please ensure .env.local has DATABASE_URL.");
}

export const sql = neon(databaseUrl || "");
