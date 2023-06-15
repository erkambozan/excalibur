import { z } from 'zod';

export const hierarchySchema = z.object({
  id: z.number(),
});

export type HierarchyModel = z.TypeOf<typeof hierarchySchema>;

export const tableName = 'hierarchy';
