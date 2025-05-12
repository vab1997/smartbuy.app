import { z } from "zod";

export const ProductInfoSchema = z.object({
  name: z.string(),
  price: z.string(),
  priceWithoutDiscount: z.string()
    .optional()
    .transform((val) => val === "null" ? null : val),
  discount: z.string().transform(Number).optional(),
  currency: z.string(),
  rating: z.string().transform(Number).optional(),
  reviews: z.string().transform(Number).optional(),
  description: z.string(),
  img: z.string(),
  stock: z.string(),
});

export type ProductInfoType = z.infer<typeof ProductInfoSchema>;
