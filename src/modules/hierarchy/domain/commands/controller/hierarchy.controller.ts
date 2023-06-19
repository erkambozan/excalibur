import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateHierarchyProps } from '@modules/hierarchy/domain/hierarchy';
import { routesV1 } from '@config/app.routes';
import { CreateHierarchyUseCase } from '@modules/hierarchy/domain/usecase/create-hierarchy.use-case';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from '@libs/api/id.response.dto';

@Controller(routesV1.version)
export class HierarchyController {
  constructor(
    private readonly createHierarchyUseCase: CreateHierarchyUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a hierarchy' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Post(routesV1.hierarchy.create)
  async createHierarchy(@Body() create: CreateHierarchyProps): Promise<void> {
    await this.createHierarchyUseCase.execute(create);
  }
}
