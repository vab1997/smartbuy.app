ALTER TABLE "product_wished_history" RENAME COLUMN "total" TO "price";--> statement-breakpoint
ALTER TABLE "product_wished_history" ADD COLUMN "price_without_discount" numeric(18, 4);