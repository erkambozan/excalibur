import { UserRoles } from '@modules/user/domain/user-types';

export class UserRequestDto {
  email: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRoles;
}
