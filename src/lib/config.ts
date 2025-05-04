import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  VERCEL_URL: z.string(),
});

export const envConfig = envSchema.parse(process.env);