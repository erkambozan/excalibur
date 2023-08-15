import { Inject, Injectable } from '@nestjs/common';
import { ANNUALLEAVE_REPOSITORY } from '@modules/annual-leave/annual-leave.di-tokens';
import { AnnualLeaveRepositoryPort } from '@modules/annual-leave/domain/port/annual-leave.repository.port';
import { CreateAnnualLeaveProps } from '@modules/annual-leave/domain/annual-leave';
import { AnnualLeaveEntity } from '@modules/annual-leave/domain/entity/annual-leave.entity';

@Injectable()
export class CreateAnnualLeaveUseCase {
  constructor(
    @Inject(ANNUALLEAVE_REPOSITORY)
    private readonly annualLeaveRepo: AnnualLeaveRepositoryPort,
  ) {}

  async execute(
    props: CreateAnnualLeaveProps,
  ): Promise<AnnualLeaveEntity[] | AnnualLeaveEntity | Error> {
    const annualLeave = AnnualLeaveEntity.create(props);
    const result = await this.annualLeaveRepo.insert(annualLeave);
    return result ?? undefined;
  }
}
