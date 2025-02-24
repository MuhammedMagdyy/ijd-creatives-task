import { z } from 'zod';

export const orderDetailsSchema = z.object({
  details: z
    .string()
    .min(1, 'Order details must be at least 1 character long')
    .trim(),
  price: z.number().positive().int(),
});

export const orderPatchSchema = z.object({
  details: z.string().trim().optional(),
  price: z.number().optional(),
});
