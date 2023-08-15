import { Inject, Injectable } from '@nestjs/common';
import { EmployeeRepositoryPort } from '@modules/employee/domain/port/employee.repository.port';
import { EmployeeEntity } from '@modules/employee/domain/entity/employee.entity';
import { CreateEmployeeProps } from '@modules/employee/domain/employee';
import { EMPLOYEE_REPOSITORY } from '@modules/employee/employee.di-tokens';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: EmployeeRepositoryPort,
  ) {}

  async execute(
    props: CreateEmployeeProps,
  ): Promise<EmployeeEntity[] | EmployeeEntity> {
    const entity = EmployeeEntity.create(props);
    return await this.employeeRepository.insert(entity);
  }
}
