import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '@modules/user/domain/user.entity';
import { ANNUALLEAVE_REPOSITORY } from '@modules/annual-leave/annual-leave.di-tokens';
import { AnnualLeaveRepositoryPort } from '@modules/annual-leave/domain/port/annual-leave.repository.port';
import { AnnualLeaveEntity } from '@modules/annual-leave/domain/entity/annual-leave.entity';

@Injectable()
export class FindAllByUserIdUseCase {
  constructor(
    @Inject(ANNUALLEAVE_REPOSITORY)
    private readonly annualLeaveRepo: AnnualLeaveRepositoryPort,
  ) {}

  async execute(userId: string): Promise<AnnualLeaveEntity | AnnualLeaveEntity[]> {
    return await this.annualLeaveRepo.findByUserId(userId);
  }
}
