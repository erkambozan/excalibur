import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from '@libs/api/id.response.dto';
import { RoleRequestDto } from '@modules/types/domain/commands/dto/role.request';
import { CreateRoleUseCase } from '@modules/types/domain/usecase/create-role.use-case';
import { RoleResponse } from '@modules/types/domain/commands/dto/role.response';
import { FindAllRolesUseCase } from '@modules/types/domain/usecase/find-all-roles.use-case';
import { Public } from '@src/modules/auth/decorator';

@Controller(routesV1.version)
export class RoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly findAllRoleUseCase: FindAllRolesUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a role' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Public()
  @Post(routesV1.role.create)
  async create(@Body() requestDto: RoleRequestDto): Promise<any> {
    console.log('requestDto', requestDto);
    await this.createRoleUseCase.execute({ ...requestDto });
  }

  @ApiOperation({ summary: 'List roles' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RoleResponse,
  })
  @Post(routesV1.role.list)
  async findAllRoles(@Body() requestDto: RoleRequestDto): Promise<any> {
    console.log('requestDto', requestDto);
    await this.findAllRoleUseCase.execute();
  }
}
