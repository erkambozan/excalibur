import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from '@libs/api/id.response.dto';
import { RoleRequestDto } from '@modules/types/domain/commands/dto/role.request';
import { CreateRoleUseCase } from '@modules/types/domain/usecase/create-role.use-case';

@Controller(routesV1.version)
export class RoleController {
  constructor(private readonly createRoleUseCase: CreateRoleUseCase) {}

  @ApiOperation({ summary: 'Create a role' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Post(routesV1.role.create)
  async create(@Body() requestDto: RoleRequestDto): Promise<any> {
    console.log('requestDto', requestDto);
    await this.createRoleUseCase.execute({ ...requestDto });
  }
}
