import { z } from 'zod';

export const permissionSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PermissionModel = z.TypeOf<typeof permissionSchema>;

export const tableName = 'permissions';
