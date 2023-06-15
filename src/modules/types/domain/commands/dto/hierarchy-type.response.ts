import { ResponseBase } from '@libs/api/response.base';
import { ApiProperty } from '@nestjs/swagger';

export class HierarchyTypeResponse extends ResponseBase {
  @ApiProperty({
    example: 'main',
    description: "Name of hierarchy type other types can be ['sub', 'unit']",
  })
  name: string;
}
