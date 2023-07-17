import { Inject, Injectable } from '@nestjs/common';
import { ConflictException } from '@libs/exceptions';
import { PermissionRepositoryPort } from '@modules/types/domain/port/permission.repository.port';
import { PermissionEntity } from '@modules/types/domain/entity/permission.entity';
import { CreatePermissionProps } from '@modules/types/domain/permission';
import { PERMISSION_REPOSITORY } from '@modules/types/types.di-tokens';

@Injectable()
export class CreatePermissionUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepositoryPort,
  ) {}

  async execute(
    props: CreatePermissionProps,
  ): Promise<PermissionEntity[] | PermissionEntity | Error> {
    const permission = PermissionEntity.create(props);
    const isExist = await this.permissionRepository.findByName(props.name);
    if (isExist) {
      throw new ConflictException(
        `Permission with name ${props.name} already exists`,
      );
    }
    return await this.permissionRepository.insert(permission);
  }
}
