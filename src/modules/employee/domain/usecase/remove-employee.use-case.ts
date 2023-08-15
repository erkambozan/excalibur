import { Inject, Injectable } from '@nestjs/common';
import { EMPLOYEE_REPOSITORY } from '@modules/employee/employee.di-tokens';
import { EmployeeRepositoryPort } from '@modules/employee/domain/port/employee.repository.port';

@Injectable()
export class RemoveEmployeeUseCase {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: EmployeeRepositoryPort,
  ) {}

  async execute(id: number): Promise<void> {
    return await this.employeeRepository.removeByNumberId(id);
  }
}
