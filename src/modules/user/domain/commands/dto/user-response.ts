import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';

export class UserResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'john-doe@gmail.com',
    description: "User's email address",
  })
  email: string;
}
