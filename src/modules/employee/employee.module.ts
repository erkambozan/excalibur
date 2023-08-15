import { Logger, Module, Provider } from '@nestjs/common';
import { EmployeeController } from '@modules/employee/domain/commands/controller/employee.controller';
import { EmployeeRepository } from '@modules/employee/infrastructure/adapters/employee.repository';
import { CreateEmployeeUseCase } from '@modules/employee/domain/usecase/create-employee.use-case';
import { EmployeeMapper } from '@modules/employee/employee.mapper';
import { EMPLOYEE_REPOSITORY } from '@modules/employee/employee.di-tokens';
import { FindAllEmployeeUseCase } from '@modules/employee/domain/usecase/find-all-employee.use-case';
import { RemoveEmployeeUseCase } from '@modules/employee/domain/usecase/remove-employee.use-case';

const controllers = [EmployeeController];

const repositories: Provider[] = [
  { provide: EMPLOYEE_REPOSITORY, useClass: EmployeeRepository },
  CreateEmployeeUseCase,
  FindAllEmployeeUseCase,
  RemoveEmployeeUseCase,
];

const mappers: Provider[] = [EmployeeMapper];

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [Logger, ...repositories, ...mappers],
})
export class EmployeeModule {}
