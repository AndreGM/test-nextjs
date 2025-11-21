import {z} from 'zod';
export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.url(),

});
export const productsSchema = z.array(productSchema);
export type Product = z.infer<typeof productSchema>;
export type Products = z.infer<typeof productsSchema>;