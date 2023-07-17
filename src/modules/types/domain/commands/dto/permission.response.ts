import { ResponseBase } from '@libs/api/response.base';
import { ApiProperty } from '@nestjs/swagger';

export class PermissionResponse extends ResponseBase {
  @ApiProperty({
    example: 'permission',
    description: "name of permission can be ['ViewUsers', 'CreateUsers']",
  })
  name: string;
}
