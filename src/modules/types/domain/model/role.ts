import { z } from 'zod';

export const roleSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type RoleModel = z.TypeOf<typeof roleSchema>;

export const tableName = 'roles';
