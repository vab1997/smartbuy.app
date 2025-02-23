import config from '@/lib/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '@/db/schema';

if (!config.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const sql = neon(config.DATABASE_URL);
const db = drizzle({ client: sql, schema });

export default db;