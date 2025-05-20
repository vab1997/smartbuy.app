import 'dotenv/config'
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  VERCEL_URL: z.string(),
  RESEND_API_KEY: z.string(),
  CRON_SECRET: z.string(),
  FIRECRAWL_API_KEY: z.string(),
});

export const envConfig = envSchema.parse(process.env);