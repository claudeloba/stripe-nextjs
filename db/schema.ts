import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  uuid,
  text,
  integer,
  boolean,
  bigint,
  timestamp,
  unique,
  primaryKey,
  foreignKey,
  varchar,
} from "drizzle-orm/pg-core";

export const stripeCustomers = pgTable("stripe_customers", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id").notNull(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  totalDownloads: integer("total_downloads").default(0),
  planActive: boolean("plan_active").notNull().default(false),
  planExpires: bigint("plan_expires", { mode: "number" }),
  subscriptionId: text("subscription_id"),
});

export const downloads = pgTable("downloads", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id").notNull(),
  ts: timestamp("ts").default(sql`now()`),
  image: text("image"),
});
