import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from '@libs/api/id.response.dto';
import { CreateHierarchyTypeUseCase } from '@modules/types/domain/usecase/create-hierarchy-type.use-case';
import { HierarchyTypeRequestDto } from '@modules/types/domain/commands/dto/hierarchy-type.request';

@Controller(routesV1.version)
export class HierarchyTypeController {
  constructor(
    private readonly createHierarchyTypeUseCase: CreateHierarchyTypeUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a work type' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Post('/types/hierarchy/create')
  async create(@Body() requestDto: HierarchyTypeRequestDto): Promise<any> {
    await this.createHierarchyTypeUseCase.execute({ ...requestDto });
  }
}
