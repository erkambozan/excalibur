import { z } from 'zod';
import { UserRoles } from '@modules/user/domain/user-types';

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  userName: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  role: z.nativeEnum(UserRoles),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type UserModel = z.TypeOf<typeof userSchema>;

export const tableName = 'users';
