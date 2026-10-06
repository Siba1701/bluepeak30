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
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) DEFAULT 'New',
      payment_status VARCHAR(50) DEFAULT 'Unpaid',
      total_amount NUMERIC(10, 2) DEFAULT 0,
      paid_amount NUMERIC(10, 2) DEFAULT 0,
      start_date DATE,
      deadline_date DATE,
      progress_percentage INTEGER DEFAULT 0,
      admin_notes TEXT
    );
  `;

  // Safely add any new columns to existing table if table was created previously
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'New';`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'Unpaid';`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS total_amount NUMERIC(10, 2) DEFAULT 0;`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS paid_amount NUMERIC(10, 2) DEFAULT 0;`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS start_date DATE;`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS deadline_date DATE;`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS progress_percentage INTEGER DEFAULT 0;`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS admin_notes TEXT;`;

  console.log("✓ Table 'inquiries' is created & migrated with progress/payment tracking columns.");

  const result = await sql`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'inquiries' 
    ORDER BY ordinal_position;
  `;
  console.log("Columns in inquiries table:", result);
}

setup().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
