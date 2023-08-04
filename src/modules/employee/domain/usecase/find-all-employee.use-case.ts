import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EMPLOYEE_REPOSITORY } from '@modules/employee/employee.di-tokens';
import { EmployeeRepositoryPort } from '@modules/employee/domain/port/employee.repository.port';
import { EmployeeMapper } from '@modules/employee/employee.mapper';
import { EmployeeResponse } from '@modules/employee/domain/commands/dto/employee.response';

@Injectable()
export class FindAllEmployeeUseCase {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: EmployeeRepositoryPort,
    private readonly employeeMapper: EmployeeMapper,
  ) {}

  async execute(): Promise<EmployeeResponse[]> {
    const employeeEntities = await this.employeeRepository.findAll();
    if (employeeEntities.length === 0)
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);

    const employeeResponse = this.employeeMapper.toResponse(employeeEntities);
    if (Array.isArray(employeeResponse)) return employeeResponse;
  }
}
