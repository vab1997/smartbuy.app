import { envConfig } from '@/lib/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@/db/schema';

if (!envConfig.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({
  connectionString: envConfig.DATABASE_URL,
});

const db = drizzle(pool, { schema });

export default db;