import { Module, Provider } from '@nestjs/common';
import { EMPLOYEE_REPOSITORY } from '@modules/employee/employee.di-tokens';
import { EmployeeRepository } from '@modules/employee/infrastructure/adapters/employee.repository';
import { CreateEmployeeUseCase } from '@modules/employee/domain/usecase/create-employee.use-case';
import { EmployeeController } from '@modules/employee/domain/commands/controller/employee.controller';
import { EmployeeMapper } from '@modules/employee/employee.mapper';

const providers = [
  {
    provide: EMPLOYEE_REPOSITORY,
    useClass: EmployeeRepository,
  },
  CreateEmployeeUseCase,
];

const mappers: Provider[] = [EmployeeMapper];

const controllers = [EmployeeController];

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [...providers, ...mappers],
})
export class EmployeeModule {}
