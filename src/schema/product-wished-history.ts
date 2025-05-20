import { z } from "zod";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { productWishedHistoryTable } from "../db/schema";

// Create Zod schemas from Drizzle table
export const insertProductWishedHistorySchema = createInsertSchema(productWishedHistoryTable);

// Type inference
export type InsertProductWishedHistory = z.infer<typeof insertProductWishedHistorySchema>;
