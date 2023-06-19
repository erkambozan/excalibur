import { Module, Provider } from '@nestjs/common';
import { HierarchyRepository } from '@modules/hierarchy/infrastructure/adapters/hierarchy.repository';
import { HierarchyMapper } from '@modules/hierarchy/hierarchy.mapper';
import { HierarchyController } from '@modules/hierarchy/domain/commands/controller/hierarchy.controller';
import { HIERARCHY_REPOSITORY } from '@modules/hierarchy/hierarchy.di-tokens';
import { CreateHierarchyUseCase } from '@modules/hierarchy/domain/usecase/create-hierarchy.use-case';

const providers = [
  {
    provide: HIERARCHY_REPOSITORY,
    useClass: HierarchyRepository,
  },
  CreateHierarchyUseCase,
];

const mappers: Provider[] = [HierarchyMapper];

const controllers = [HierarchyController];

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [...providers, ...mappers],
})
export class HierarchyModule {}
