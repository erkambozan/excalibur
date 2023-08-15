import { Inject, Injectable } from '@nestjs/common';
import { ANNUALLEAVE_REPOSITORY } from '@modules/annual-leave/annual-leave.di-tokens';
import { AnnualLeaveRepositoryPort } from '@modules/annual-leave/domain/port/annual-leave.repository.port';
import { AnnualLeaveEntity } from '@modules/annual-leave/domain/entity/annual-leave.entity';
import { AnnualLeaveMapper } from '@modules/annual-leave/annual-leave.mapper';
import { AnnualLeaveResponse } from '@modules/annual-leave/domain/commands/dto/annual-leave.response';

@Injectable()
export class ListAnnualLeaveUseCase {
  constructor(
    @Inject(ANNUALLEAVE_REPOSITORY)
    private readonly annualLeaveRepo: AnnualLeaveRepositoryPort,
    private readonly mapper: AnnualLeaveMapper,
  ) {}

  async execute(): Promise<AnnualLeaveResponse[] | AnnualLeaveResponse> {
    const data = await this.annualLeaveRepo.findAll();
    return this.mapper.toResponse(data);
  }
}
