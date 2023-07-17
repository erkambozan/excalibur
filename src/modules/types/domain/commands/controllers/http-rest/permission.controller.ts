import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from '@libs/api/id.response.dto';
import { PermissionRequestDto } from '@modules/types/domain/commands/dto/permission.request';
import { CreatePermissionUseCase } from '@modules/types/domain/usecase/create-permission.use-case';

@Controller(routesV1.version)
export class PermissionController {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a permission' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Post(routesV1.permission.create)
  async create(@Body() requestDto: PermissionRequestDto): Promise<any> {
    await this.createPermissionUseCase.execute({ ...requestDto });
  }
}
