import { ROLE_REPOSITORY } from '@modules/types/types.di-tokens';
import { RoleRepositoryPort } from '@modules/types/domain/port/role.repository.port';
import { RoleMapper } from '@modules/types/role.mapper';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RoleResponse } from '@modules/types/domain/commands/dto/role.response';

@Injectable()
export class FindAllRolesUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepositoryPort,
    private readonly roleMapper: RoleMapper,
  ) {}

  async execute(): Promise<RoleResponse[]> {
    const rolesEntities = await this.roleRepository.findAll();
    if (rolesEntities.length === 0)
      throw new HttpException('Roles not found', HttpStatus.NOT_FOUND);

    const roleResponse = this.roleMapper.toResponse(rolesEntities);
    if (Array.isArray(roleResponse)) return roleResponse;
  }
}
