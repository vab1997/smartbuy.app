import { z } from "zod";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { productWishedHistoryUsageTable } from "@/db/schema";

export const insertProductWishedHistoryUsageSchema = createInsertSchema(productWishedHistoryUsageTable);

export type InsertProductWishedHistoryUsage = z.infer<typeof insertProductWishedHistoryUsageSchema>;
