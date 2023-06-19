import { z } from 'zod';

export const hierarchySchema = z.object({
  id: z.number().optional(),
  parentId: z.number(),
  name: z.string(),
  type: z.string(),
  parentPath: z.string().optional(),
  path: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
});

export type HierarchyModel = z.TypeOf<typeof hierarchySchema>;

export const tableName = 'hierarchy';
