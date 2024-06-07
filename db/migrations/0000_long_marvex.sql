CREATE TABLE IF NOT EXISTS "downloads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"ts" timestamp DEFAULT now(),
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stripe_customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"stripe_customer_id" text NOT NULL,
	"total_downloads" integer DEFAULT 0,
	"plan_active" boolean DEFAULT false NOT NULL,
	"plan_expires" bigint,
	"subscription_id" text,
	CONSTRAINT "stripe_customers_stripe_customer_id_unique" UNIQUE("stripe_customer_id")
);
