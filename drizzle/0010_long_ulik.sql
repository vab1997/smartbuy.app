CREATE TABLE "product_wished_history_usage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_wished_history_id" uuid NOT NULL,
	"prompt_tokens" integer,
	"completion_tokens" integer,
	"total_tokens" integer,
	"time_taken" numeric(5, 3),
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_wished_history_usage" ADD CONSTRAINT "product_wished_history_usage_product_wished_history_id_product_wished_history_id_fk" FOREIGN KEY ("product_wished_history_id") REFERENCES "public"."product_wished_history"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "product_wished_history_usage_idx" ON "product_wished_history_usage" USING btree ("product_wished_history_id","product_wished_history_id");