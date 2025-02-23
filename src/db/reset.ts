import { drizzle } from "drizzle-orm/neon-http";
import config from "@/lib/config";
import { sql } from "drizzle-orm";

async function main() {
  const db = drizzle(config.DATABASE_URL!)
  try {
    console.log('🎲 resetting the database...')
    await db.execute(sql`DROP SCHEMA IF EXISTS public, drizzle CASCADE`)
    await db.execute(sql`CREATE SCHEMA public`)
    console.log('✅ Database reset successfully')
  } catch (error) {
    console.error('❌ Error to reset:', error)
  }
}

main();