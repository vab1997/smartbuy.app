import { z } from "zod";

export const ProductInfoSchema = z.object({
  name: z.string().describe('The complete name or title of the product as it appears on the website or store. This should be the full product name including any relevant specifications or variations.'),
  price: z.string().describe('The current selling price of the product. This should be the final price that customers will pay, including any active discounts or promotions.'),
  priceWithoutDiscount: z.string()
    .optional()
    .transform((val) => val === "null" ? null : val)
    .describe('The original price of the product before any discounts were applied. This is useful for showing price comparisons and savings. If no discount is applied, this should be null.'),
  discount: z.string()
    .transform(Number)
    .optional()
    .describe('The percentage or amount of discount applied to the product. This should be a numerical value representing the discount percentage (e.g., 20 for 20% off) or the actual discount amount.'),
  currency: z.string().describe('The currency symbol or code used for the product price (e.g., $, €, £, USD, EUR). This helps identify the correct currency format and symbol for display.'),
  rating: z.string()
    .transform(Number)
    .optional()
    .describe('The average customer rating for the product, typically on a scale of 1-5 or 1-10. This represents the overall customer satisfaction score based on reviews.'),
  reviews: z.string()
    .transform(Number)
    .optional()
    .describe('The total number of customer reviews or ratings received for the product. This indicates the volume of customer feedback available.'),
  description: z.string().describe('A detailed description of the product including its features, specifications, materials, dimensions, and any other relevant information that helps customers understand what they are purchasing.'),
  img: z.string().describe('The URL or path to the main product image. This should be a high-quality image that clearly shows the product. The URL should be complete and accessible.'),
  stock: z.string().describe('The current inventory level or availability status of the product. This can be a specific number of units available or a status like "In Stock", "Out of Stock", or "Low Stock".'),
});

export type ProductInfoType = z.infer<typeof ProductInfoSchema>;
