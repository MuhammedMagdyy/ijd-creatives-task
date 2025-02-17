import { z } from 'zod';

export const createOrder = z.object({
  details: z.string().trim(),
  price: z.number(),
});
