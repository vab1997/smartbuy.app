import { z } from "zod";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { productWishedHistoryUsageTable } from "@/db/schema";

export const insertProductWishedHistoryUsageSchema = createInsertSchema(productWishedHistoryUsageTable);
export const selectProductWishedHistoryUsageSchema = createSelectSchema(productWishedHistoryUsageTable);
export const updateProductWishedHistoryUsageSchema = createUpdateSchema(productWishedHistoryUsageTable);

export type InsertProductWishedHistoryUsage = z.infer<typeof insertProductWishedHistoryUsageSchema>;
export type SelectProductWishedHistoryUsage = z.infer<typeof selectProductWishedHistoryUsageSchema>;
export type UpdateProductWishedHistoryUsage = z.infer<typeof updateProductWishedHistoryUsageSchema>;
