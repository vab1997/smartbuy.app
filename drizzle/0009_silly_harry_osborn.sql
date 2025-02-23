CREATE INDEX "product_wished_user_idx" ON "product_wished_history" USING btree ("product_wished_id","user_id");--> statement-breakpoint
CREATE INDEX "id_url_idx" ON "product_wished" USING btree ("id","url");--> statement-breakpoint
CREATE INDEX "user_id_url_idx" ON "product_wished" USING btree ("user_id","url");--> statement-breakpoint
CREATE INDEX "id_email_idx" ON "users" USING btree ("id","email");--> statement-breakpoint
ALTER TABLE "product_wished" ADD CONSTRAINT "user_id_url_unique" UNIQUE("user_id","url");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_user_id_clerk_unique" UNIQUE("user_id_clerk");