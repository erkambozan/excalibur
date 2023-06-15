import { ResponseBase } from '@libs/api/response.base';
import { ApiProperty } from '@nestjs/swagger';

export class WorkTypeResponse extends ResponseBase {
  @ApiProperty({
    example: 'worker',
    description: "Name of work type other types can be ['manager', 'driver']",
  })
  name: string;
}
