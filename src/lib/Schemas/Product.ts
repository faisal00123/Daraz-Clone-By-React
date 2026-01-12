import { z } from 'zod';
export type DarazProduct = z.infer<typeof ProductsType>;
export type DarazProducts = DarazProduct[];
export const ProductsType = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
});
