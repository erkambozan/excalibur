import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateHierarchyProps } from '@modules/hierarchy/domain/hierarchy';
import { routesV1 } from '@config/app.routes';
import { CreateHierarchyUseCase } from '@modules/hierarchy/domain/usecase/create-hierarchy.use-case';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from '@libs/api/id.response.dto';
import { ListHierarchyUseCase } from '@modules/hierarchy/domain/usecase/list-hierarchy.use-case';
import { HierarchyResponse } from '@modules/hierarchy/domain/commands/dto/hierarchy.response';
import { HierarchyMapper } from '@modules/hierarchy/hierarchy.mapper';
import { RemoveHierarchyUseCase } from '@modules/hierarchy/domain/usecase/remove-hierarchy.use-case';

@Controller(routesV1.version)
export class HierarchyController {
  constructor(
    private readonly createHierarchyUseCase: CreateHierarchyUseCase,
    private readonly listHierarchyUseCase: ListHierarchyUseCase,
    private readonly removeHierarchyUseCase: RemoveHierarchyUseCase,
    private readonly mapper: HierarchyMapper,
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

  @ApiOperation({ summary: 'List the hierarchies' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Get(routesV1.hierarchy.list)
  async listHierarchy(): Promise<HierarchyResponse[] | HierarchyResponse> {
    const entity = await this.listHierarchyUseCase.execute();
    return this.mapper.toResponse(entity);
  }

  @ApiOperation({ summary: 'Remove the hierarchy' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Delete(routesV1.hierarchy.remove)
  async removeHierarchy(@Param('id') hierarchyId: number): Promise<void> {
    await this.removeHierarchyUseCase.execute(hierarchyId);
  }
}
