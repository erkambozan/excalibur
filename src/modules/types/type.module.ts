import { Logger, Module, Provider } from '@nestjs/common';
import {
  HIERARCHY_TYPE_REPOSITORY,
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

const httpControllers = [HierarchyTypeController, WorkTypeController];

const providers = [
  { provide: HIERARCHY_TYPE_REPOSITORY, useClass: HierarchyTypeRepository },
  { provide: WORK_TYPE_REPOSITORY, useClass: WorkTypeRepository },
  CreateHierarchyTypeUseCase,
  CreateWorkTypeUseCase,
];

const mappers: Provider[] = [HierarchyTypeMapper, WorkTypeMapper];

@Module({
  imports: [],
  controllers: [...httpControllers],
  providers: [Logger, ...providers, ...mappers],
})
export class TypeModule {}
