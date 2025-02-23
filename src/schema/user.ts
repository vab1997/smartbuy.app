import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { usersTable } from '../db/schema';

export const userSelectSchema = createSelectSchema(usersTable);
export const userInsertSchema = createInsertSchema(usersTable);

const userUpdateSchema = createUpdateSchema(usersTable);

export type UserSelect = typeof userSelectSchema;
export type UserInsert = typeof userInsertSchema;
export type UserUpdate = typeof userUpdateSchema;
