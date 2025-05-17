import { envConfig } from '@/lib/config'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: envConfig.DATABASE_URL,
})

const db = drizzle(pool)

async function main() {
  console.log('Migrating database...')
  await migrate(db, { migrationsFolder: 'drizzle', migrationsSchema: 'public' })
  console.log('Database migrated')
  await pool.end()
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})