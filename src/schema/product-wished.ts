import { z } from "zod";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { productWishedTable } from "../db/schema";

// Create Zod schemas from Drizzle table
export const insertProductWishedSchema = createInsertSchema(productWishedTable);
export const selectProductWishedSchema = createSelectSchema(productWishedTable);
export const updateProductWishedSchema = createUpdateSchema(productWishedTable);

// Type inference
export type InsertProductWished = z.infer<typeof insertProductWishedSchema>;
export type SelectProductWished = z.infer<typeof selectProductWishedSchema>;
export type UpdateProductWished = z.infer<typeof updateProductWishedSchema>;
