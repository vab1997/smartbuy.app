import { z } from "zod";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { productWishedHistoryTable } from "../db/schema";

// Create Zod schemas from Drizzle table
export const insertProductWishedHistorySchema = createInsertSchema(productWishedHistoryTable);
export const selectProductWishedHistorySchema = createSelectSchema(productWishedHistoryTable);
export const updateProductWishedHistorySchema = createUpdateSchema(productWishedHistoryTable);

// Type inference
export type InsertProductWishedHistory = z.infer<typeof insertProductWishedHistorySchema>;
export type SelectProductWishedHistory = z.infer<typeof selectProductWishedHistorySchema>;
export type UpdateProductWishedHistory = z.infer<typeof updateProductWishedHistorySchema>;
