import { z } from 'zod';

export const hierarchyTypeSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type HierarchyTypeModel = z.TypeOf<typeof hierarchyTypeSchema>;

export const tableName = 'hierarchy_type';
