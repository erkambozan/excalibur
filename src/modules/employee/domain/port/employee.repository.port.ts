import { RepositoryPort } from '@libs/ddd/repository.port';
import { EmployeeEntity } from '@modules/employee/domain/entity/employee.entity';

export interface EmployeeRepositoryPort extends RepositoryPort<EmployeeEntity> {
  findByUserId(userId: string): Promise<EmployeeEntity[] | EmployeeEntity>;
}
