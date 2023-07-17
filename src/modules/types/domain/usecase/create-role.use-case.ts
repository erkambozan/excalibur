import { Inject, Injectable } from '@nestjs/common';
import { ConflictException } from '@libs/exceptions';
import { RoleEntity } from '@modules/types/domain/entity/role.entity';
import { CreateRoleProps } from '@modules/types/domain/role';
import { RoleRepositoryPort } from '@modules/types/domain/port/role.repository.port';
import { ROLE_REPOSITORY } from '@modules/types/types.di-tokens';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepositoryPort,
  ) {}

  async execute(
    props: CreateRoleProps,
  ): Promise<RoleEntity[] | RoleEntity | Error> {
    const role = RoleEntity.create(props);
    const isExist = await this.roleRepository.findByName(props.name);
    if (isExist) {
      throw new ConflictException(
        `Role with name ${props.name} already exists`,
      );
    }
    return await this.roleRepository.insert(role);
  }
}
