import { RepositoryPort } from '@libs/ddd/repository.port';
import { AnnualLeaveEntity } from '@modules/annual-leave/domain/entity/annual-leave.entity';

export interface AnnualLeaveRepositoryPort
  extends RepositoryPort<AnnualLeaveEntity> {
  findByUserId(
    userId: string,
  ): Promise<AnnualLeaveEntity[] | AnnualLeaveEntity>;
}
