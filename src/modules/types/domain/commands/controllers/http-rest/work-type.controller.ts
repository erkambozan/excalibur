import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from '@libs/api/id.response.dto';
import { CreateWorkTypeUseCase } from '@modules/types/domain/usecase/create-work-type.use-case';
import { WorkTypeRequestDto } from '@modules/types/domain/commands/dto/work-type.request';

@Controller(routesV1.version)
export class WorkTypeController {
  constructor(private readonly createWorkTypeUseCase: CreateWorkTypeUseCase) {}

  @ApiOperation({ summary: 'Create a work type' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Post(routesV1.type.work.create)
  async create(@Body() requestDto: WorkTypeRequestDto): Promise<any> {
    await this.createWorkTypeUseCase.execute({ ...requestDto });
  }
}
