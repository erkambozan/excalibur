export interface UserProps {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  role: UserRoles;
}

export enum UserRoles {
  admin = 'admin',
  company = 'company',
  moderator = 'moderator',
  employee = 'employee',
  user = 'user',
}

export interface CreateUserProps {
  email: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRoles;
}
