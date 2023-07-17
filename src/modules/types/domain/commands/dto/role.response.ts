import { ResponseBase } from '@libs/api/response.base';
import { ApiProperty } from '@nestjs/swagger';

export class RoleResponse extends ResponseBase {
  @ApiProperty({
    example: 'rool',
    description: "name of role can be ['manager', 'employee']",
  })
  name: string;
}
