import { Logger, Module, Provider } from '@nestjs/common';
import { ANNUALLEAVE_REPOSITORY } from '@modules/annual-leave/annual-leave.di-tokens';
import { AnnualLeaveController } from '@modules/annual-leave/domain/commands/controller/annual-leave.controller';
import { AnnualLeaveRepository } from '@modules/annual-leave/infrastructure/adapters/annual-leave.repository';
import { CreateAnnualLeaveUseCase } from '@modules/annual-leave/domain/usecase/create-annual-leave.use-case';
import { ListAnnualLeaveUseCase } from '@modules/annual-leave/domain/usecase/list-annual-leave.use-case';
import { FindAllByUserIdUseCase } from '@modules/annual-leave/domain/usecase/find-all-by-user-id-annual-leave.use-case';
import { AnnualLeaveMapper } from '@modules/annual-leave/annual-leave.mapper';

const controllers = [AnnualLeaveController];

const repositories: Provider[] = [
  { provide: ANNUALLEAVE_REPOSITORY, useClass: AnnualLeaveRepository },
  CreateAnnualLeaveUseCase,
  ListAnnualLeaveUseCase,
  FindAllByUserIdUseCase,
];

const mappers: Provider[] = [AnnualLeaveMapper];

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [Logger, ...repositories, ...mappers],
})
export class AnnualLeaveModule {}
