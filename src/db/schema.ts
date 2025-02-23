import { relations, sql } from 'drizzle-orm';
import {
  index,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

const timestamps = {
  updated_at: timestamp('updated_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
};

export const usersTable = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  firstName: varchar('first_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }),
  email: varchar('email', { length: 100 }).notNull().unique(),
  imageUrl: text('image_url'),
  userIdClerk: text('user_id_clerk').notNull().unique(),
  ...timestamps,
}, (table) => ({
  idEmailIdx: index('id_email_idx').on(table.id, table.email),
}));

export const productWishedTable = pgTable(
  'product_wished',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: uuid('user_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    imageUrl: text('image_url'),
    url: text('url').notNull(),
    ...timestamps,
  },
  (table) => ({
    idUrlIdx: index('id_url_idx').on(table.id, table.url),
    userIdUrlIdx: index('user_id_url_idx').on(table.userId, table.url),
    userIdUrlUnique: unique('user_id_url_unique').on(table.userId, table.url),
  })
);

export const productWishedHistoryTable = pgTable(
  'product_wished_history',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    productWishedId: uuid('product_wished_id')
      .references(() => productWishedTable.id, { onDelete: 'cascade' })
      .notNull(),
    userId: uuid('user_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    currency: varchar('currency', { length: 5 }),
    price: numeric('price', { precision: 18, scale: 4 }),
    priceWithoutDiscount: numeric('price_without_discount', {
      precision: 18,
      scale: 4,
    }),
    discount: integer('discount'),
    rating: numeric('rating', { precision: 3, scale: 2 }),
    reviewsCount: integer('reviews_count'),
    stock: varchar('stock', { length: 255 }),
    ...timestamps,
  },
  (table) => ({
    productWishedUserIdx: index('product_wished_user_idx').on(table.productWishedId, table.userId),
  })
);

export const productWishedHistoryUsageTable = pgTable(
  'product_wished_history_usage',
  {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    productWishedHistoryId: uuid('product_wished_history_id')
      .references(() => productWishedHistoryTable.id, { onDelete: 'cascade' })
      .notNull(),
    promptTokens: integer('prompt_tokens'),
    completionTokens: integer('completion_tokens'),
    totalTokens: integer('total_tokens'),
    timeTaken: numeric('time_taken', { precision: 5, scale: 3 }),
    ...timestamps,
  },
  (table) => ({
    productWishedHistoryUsageIdx: index('product_wished_history_usage_idx').on(table.productWishedHistoryId, table.productWishedHistoryId),
  })
);

export const usersRelations = relations(usersTable, ({ many }) => ({
  productWished: many(productWishedTable),
  productWishedHistory: many(productWishedHistoryTable),
}));

export const productWishedRelations = relations(
  productWishedTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [productWishedTable.userId],
      references: [usersTable.id],
    }),
    productWishedHistory: many(productWishedHistoryTable),
  })
);

export const productWishedHistoryRelations = relations(
  productWishedHistoryTable,
  ({ one }) => ({
    productWished: one(productWishedTable, {
      fields: [productWishedHistoryTable.productWishedId],
      references: [productWishedTable.id],
    }),
    user: one(usersTable, {
      fields: [productWishedHistoryTable.userId],
      references: [usersTable.id],
    })
  })
);

export const productWishedHistoryUsageRelations = relations(
  productWishedHistoryUsageTable,
  ({ one }) => ({
    productWishedHistory: one(productWishedHistoryTable, {
      fields: [productWishedHistoryUsageTable.productWishedHistoryId],
      references: [productWishedHistoryTable.id],
    })
  })
);
