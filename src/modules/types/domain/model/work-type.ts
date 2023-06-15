import { z } from 'zod';

export const workTypeSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
});

export type WorkTypeModel = z.TypeOf<typeof workTypeSchema>;

export const tableName = 'work_type';
