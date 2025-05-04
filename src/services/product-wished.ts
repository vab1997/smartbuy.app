import db from '@/db';
import {
  productWishedHistoryTable,
  productWishedHistoryUsageTable,
  productWishedTable,
} from '@/db/schema';
import { InsertProductWished } from '@/schema/product-wished';
import { InsertProductWishedHistory } from '@/schema/product-wished-history';
import { InsertProductWishedHistoryUsage } from '@/schema/product-wished-history-usage';
import { count, desc, eq } from 'drizzle-orm';
import { cache } from 'react';

const LIMIT_RESULTS_PER_PAGE = 5;

export const productWishedService = {
  create: async (
    productWishedData: InsertProductWished &
      Omit<InsertProductWishedHistory, 'productWishedId'> &
      Omit<InsertProductWishedHistoryUsage, 'productWishedHistoryId'>
  ) => {
    const [product] = await db
      .insert(productWishedTable)
      .values({
        userId: productWishedData.userId,
        title: productWishedData.title,
        description: productWishedData.description,
        imageUrl: productWishedData.imageUrl,
        url: productWishedData.url,
      })
      .returning();

    const [productWishedHistory] = await db
      .insert(productWishedHistoryTable)
      .values({
        productWishedId: product.id,
        userId: productWishedData.userId,
        currency: productWishedData.currency,
        price: productWishedData.price,
        priceWithoutDiscount: productWishedData.priceWithoutDiscount,
        discount: productWishedData.discount,
        rating: productWishedData.rating,
        reviewsCount: productWishedData.reviewsCount,
        stock: productWishedData.stock,
      })
      .returning();

    await db.insert(productWishedHistoryUsageTable).values({
      productWishedHistoryId: productWishedHistory.id,
      promptTokens: productWishedData.promptTokens,
      completionTokens: productWishedData.completionTokens,
      totalTokens: productWishedData.totalTokens,
      timeTaken: productWishedData.timeTaken,
    });
  },
  getByUserId: async (userId: string, page: number) => {
    const products = await db.query.productWishedTable.findMany({
      where: eq(productWishedTable.userId, userId),
      limit: LIMIT_RESULTS_PER_PAGE,
      offset: (page - 1) * LIMIT_RESULTS_PER_PAGE,
      with: {
        productWishedHistory: {
          orderBy: [desc(productWishedHistoryTable.created_at)],
        },
      },
    });
    return products;
  },
  getTotalPages: async (userId: string) => {
    const totalPages = await db
      .select({ count: count() })
      .from(productWishedTable)
      .where(eq(productWishedTable.userId, userId));
    return Math.ceil(totalPages[0].count / LIMIT_RESULTS_PER_PAGE);
  },
  getById: async (id: string) => {
    const product = await db.query.productWishedTable.findFirst({
      where: eq(productWishedTable.id, id),
      with: {
        productWishedHistory: {
          orderBy: [desc(productWishedHistoryTable.created_at)]
        },
      },
    });
    return product;
  },
  remove: async (id: string) => {
    return await db
      .delete(productWishedTable)
      .where(eq(productWishedTable.id, id))
      .returning();
  },
  getAll: async () => {
    return await db
      .select({
        id: productWishedTable.id,
        url: productWishedTable.url,
        userId: productWishedTable.userId,
      })
      .from(productWishedTable);
  },
  createProductWishedHistoryAndUsage: async (
    productWishedHistoryData: InsertProductWishedHistory &
      Omit<InsertProductWishedHistoryUsage, 'productWishedHistoryId'>
  ) => {
    const [productWishedHistory] = await db
      .insert(productWishedHistoryTable)
      .values(productWishedHistoryData)
      .returning();
    await db.insert(productWishedHistoryUsageTable).values({
      productWishedHistoryId: productWishedHistory.id,
      promptTokens: productWishedHistoryData.promptTokens,
      completionTokens: productWishedHistoryData.completionTokens,
      totalTokens: productWishedHistoryData.totalTokens,
      timeTaken: productWishedHistoryData.timeTaken,
    });
    return productWishedHistory.id;
  },
};
