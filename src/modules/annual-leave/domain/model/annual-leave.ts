import { z } from 'zod';

export const annualLeaveSchema = z.object({
  id: z.number().optional(),
  userId: z.string(),
  status: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
});

export type AnnualLeaveModel = z.TypeOf<typeof annualLeaveSchema>;

export const tableName = 'annual_leave';
