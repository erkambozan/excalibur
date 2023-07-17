import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { IdResponse } from '@libs/api/id.response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '@modules/auth/decorator';
import { EmployeeRequestDto } from '@modules/employee/domain/commands/dto/employee.request';
import { CreateEmployeeUseCase } from '@modules/employee/domain/usecase/create-employee.use-case';

@Controller(routesV1.version)
export class EmployeeController {
  constructor(private readonly createEmployeeUseCase: CreateEmployeeUseCase) {}

  @Public()
  @ApiOperation({ summary: 'Create an employee' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Post(routesV1.employee.create)
  async create(@Body() employeeRequest: EmployeeRequestDto): Promise<any> {
    await this.createEmployeeUseCase.execute({ ...employeeRequest });

    // return match(result, {
    //   Ok: (id: string) => new IdResponse(id),
    //   Err: (error: Error) => {
    //     throw error;
    //   },
    // });
  }
}
