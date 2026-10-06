import { neon } from "@neondatabase/serverless";
import * as fs from "fs";

// Read DATABASE_URL from .env.local
const envFile = fs.readFileSync(".env.local", "utf8");
let dbUrl = "";
for (const line of envFile.split("\n")) {
  if (line.startsWith("DATABASE_URL=")) {
    dbUrl = line.replace("DATABASE_URL=", "").trim().replace(/^["']|["']$/g, "");
    break;
  }
}

if (!dbUrl) {
  console.error("DATABASE_URL not found in .env.local");
  process.exit(1);
}

const sql = neon(dbUrl);

async function setup() {
  console.log("Connecting to Neon Postgres...");
  
  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      company VARCHAR(255),
      project_type VARCHAR(100),
      budget VARCHAR(100),
      timeline VARCHAR(100),
      description TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  console.log("✓ Table 'inquiries' is created / ready.");

  const result = await sql`
    SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
  `;
  console.log("Public tables in database:", result);
}

setup().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
