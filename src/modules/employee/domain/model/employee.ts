import { z } from 'zod';

export const employeeSchema = z.object({
  id: z.number().optional(),
  hierarchyId: z.number().optional(),
  hierarchyPath: z.string().optional(),
  userId: z.string(),
  workType: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
});

export type EmployeeModel = z.TypeOf<typeof employeeSchema>;

export const tableName = 'employee';
