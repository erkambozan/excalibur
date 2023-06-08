export interface UserProps {
  email: string;
  role: UserRoles;
}

export enum UserRoles {
  admin = 'admin',
  company = 'company',
  moderator = 'moderator',
  employee = 'employee',
}

export interface CreateUserProps {
  email: string;
}
