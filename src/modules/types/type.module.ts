import { Logger, Module, Provider } from '@nestjs/common';
import {
  HIERARCHY_TYPE_REPOSITORY,
  PERMISSION_REPOSITORY,
  ROLE_REPOSITORY,
  WORK_TYPE_REPOSITORY,
} from '@modules/types/types.di-tokens';
import { HierarchyTypeRepository } from '@modules/types/infrastructure/adapter/hierarchy-type.repository';
import { WorkTypeRepository } from '@modules/types/infrastructure/adapter/work-type.repository';
import { HierarchyTypeController } from '@modules/types/domain/commands/controllers/http-rest/hierarchy-type.controller';
import { WorkTypeController } from '@modules/types/domain/commands/controllers/http-rest/work-type.controller';
import { HierarchyTypeMapper } from '@modules/types/hierarchy-type.mapper';
import { WorkTypeMapper } from '@modules/types/work-type.mapper';
import { CreateHierarchyTypeUseCase } from '@modules/types/domain/usecase/create-hierarchy-type.use-case';
import { CreateWorkTypeUseCase } from '@modules/types/domain/usecase/create-work-type.use-case';
import { PermissionRepository } from '@modules/types/infrastructure/adapter/permission.repository';
import { CreatePermissionUseCase } from '@modules/types/domain/usecase/create-permission.use-case';
import { PermissionMapper } from '@modules/types/permission.mapper';
import { RoleRepository } from '@modules/types/infrastructure/adapter/role.repository';
import { CreateRoleUseCase } from '@modules/types/domain/usecase/create-role.use-case';
import { RoleMapper } from '@modules/types/role.mapper';
import { RoleController } from '@modules/types/domain/commands/controllers/http-rest/role.controller';
import { PermissionController } from '@modules/types/domain/commands/controllers/http-rest/permission.controller';
import { FindAllEmployeeUseCase } from '@modules/employee/domain/usecase/find-all-employee.use-case';
import { FindAllRolesUseCase } from '@modules/types/domain/usecase/find-all-roles.use-case';

const httpControllers = [
  HierarchyTypeController,
  WorkTypeController,
  RoleController,
  PermissionController,
];

const providers = [
  { provide: HIERARCHY_TYPE_REPOSITORY, useClass: HierarchyTypeRepository },
  { provide: WORK_TYPE_REPOSITORY, useClass: WorkTypeRepository },
  { provide: PERMISSION_REPOSITORY, useClass: PermissionRepository },
  { provide: ROLE_REPOSITORY, useClass: RoleRepository },
  CreateHierarchyTypeUseCase,
  CreateWorkTypeUseCase,
  CreatePermissionUseCase,
  CreateRoleUseCase,
  FindAllRolesUseCase,
];

const mappers: Provider[] = [
  HierarchyTypeMapper,
  WorkTypeMapper,
  PermissionMapper,
  RoleMapper,
];

@Module({
  imports: [],
  controllers: [...httpControllers],
  providers: [Logger, ...providers, ...mappers],
})
export class TypeModule {}
