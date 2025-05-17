CREATE TABLE "product_wished_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_wished_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"currency" varchar(5),
	"price" numeric(18, 4),
	"price_without_discount" numeric(18, 4),
	"discount" integer,
	"rating" numeric(3, 2),
	"reviews_count" integer,
	"stock" varchar(255),
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
CREATE TABLE "product_wished" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"image_url" text,
	"url" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_id_url_unique" UNIQUE("user_id","url")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(50),
	"last_name" varchar(50),
	"email" varchar(100) NOT NULL,
	"image_url" text,
	"user_id_clerk" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_user_id_clerk_unique" UNIQUE("user_id_clerk")
);
--> statement-breakpoint
ALTER TABLE "product_wished_history" ADD CONSTRAINT "product_wished_history_product_wished_id_product_wished_id_fk" FOREIGN KEY ("product_wished_id") REFERENCES "public"."product_wished"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_wished_history" ADD CONSTRAINT "product_wished_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_wished_history_usage" ADD CONSTRAINT "product_wished_history_usage_product_wished_history_id_product_wished_history_id_fk" FOREIGN KEY ("product_wished_history_id") REFERENCES "public"."product_wished_history"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_wished" ADD CONSTRAINT "product_wished_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "product_wished_user_idx" ON "product_wished_history" USING btree ("product_wished_id","user_id");--> statement-breakpoint
CREATE INDEX "product_wished_history_product_wished_id_idx" ON "product_wished_history" USING btree ("product_wished_id");--> statement-breakpoint
CREATE INDEX "product_wished_history_user_id_idx" ON "product_wished_history" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "product_wished_history_price_idx" ON "product_wished_history" USING btree ("price");--> statement-breakpoint
CREATE INDEX "product_wished_history_rating_idx" ON "product_wished_history" USING btree ("rating");--> statement-breakpoint
CREATE INDEX "product_wished_history_created_at_idx" ON "product_wished_history" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "product_wished_history_updated_at_idx" ON "product_wished_history" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "product_wished_history_usage_idx" ON "product_wished_history_usage" USING btree ("product_wished_history_id");--> statement-breakpoint
CREATE INDEX "product_wished_history_usage_total_tokens_idx" ON "product_wished_history_usage" USING btree ("total_tokens");--> statement-breakpoint
CREATE INDEX "product_wished_history_usage_time_taken_idx" ON "product_wished_history_usage" USING btree ("time_taken");--> statement-breakpoint
CREATE INDEX "product_wished_history_usage_created_at_idx" ON "product_wished_history_usage" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "product_wished_history_usage_updated_at_idx" ON "product_wished_history_usage" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "id_url_idx" ON "product_wished" USING btree ("id","url");--> statement-breakpoint
CREATE INDEX "user_id_url_idx" ON "product_wished" USING btree ("user_id","url");--> statement-breakpoint
CREATE INDEX "product_wished_user_id_idx" ON "product_wished" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "product_wished_title_idx" ON "product_wished" USING btree ("title");--> statement-breakpoint
CREATE INDEX "product_wished_created_at_idx" ON "product_wished" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "product_wished_updated_at_idx" ON "product_wished" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "id_email_idx" ON "users" USING btree ("id","email");--> statement-breakpoint
CREATE INDEX "user_id_clerk_idx" ON "users" USING btree ("user_id_clerk");--> statement-breakpoint
CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");