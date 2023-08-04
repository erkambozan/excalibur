import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';

export class UserResponse extends ResponseBase {
  @ApiProperty({
    example: 'john-doe@gmail.com',
    description: "User's email address",
  })
  email: string;

  @ApiProperty({
    example: 'John',
    description: "User's first name",
  })
  firstName: string;

  @ApiProperty({
    example: 'John',
    description: "User's last name",
  })
  lastName: string;
  @ApiProperty({
    example: 'john_doe',
    description: "User's user name",
  })
  userName: string;
}
