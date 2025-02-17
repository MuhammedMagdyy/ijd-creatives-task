import { z } from 'zod';

export const paginationSchema = z.object({
  pageSize: z.coerce.number().default(10),
  pageNumber: z.coerce.number().default(1),
});
