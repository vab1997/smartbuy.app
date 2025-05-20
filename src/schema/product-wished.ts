import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { productWishedTable } from "../db/schema";

// Create Zod schemas from Drizzle table
export const insertProductWishedSchema = createInsertSchema(productWishedTable);

// Type inference
export type InsertProductWished = z.infer<typeof insertProductWishedSchema>;
