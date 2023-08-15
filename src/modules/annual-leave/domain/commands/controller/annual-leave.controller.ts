import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { IdResponse } from '@libs/api/id.response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnnualLeaveRequest } from '@modules/annual-leave/domain/commands/dto/annual-leave.request';
import { AnnualLeaveResponse } from '@modules/annual-leave/domain/commands/dto/annual-leave.response';
import { CreateAnnualLeaveUseCase } from '@modules/annual-leave/domain/usecase/create-annual-leave.use-case';
import { ListAnnualLeaveUseCase } from '@modules/annual-leave/domain/usecase/list-annual-leave.use-case';
import { FindAllByUserIdUseCase } from '@modules/annual-leave/domain/usecase/find-all-by-user-id-annual-leave.use-case';

@Controller(routesV1.version)
export class AnnualLeaveController {
  constructor(
    private readonly createAnnualLeaveUseCase: CreateAnnualLeaveUseCase,
    private readonly findAllAnnualLeaveUseCase: ListAnnualLeaveUseCase,
    private readonly findAllByUserIdAnnualLeaveUseCase: FindAllByUserIdUseCase,
  ) {}

  @ApiOperation({ summary: 'Create an annual leave' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Post(routesV1.annualLeave.create)
  async create(@Body() annualLeaveRequest: AnnualLeaveRequest): Promise<any> {
    await this.createAnnualLeaveUseCase.execute({ ...annualLeaveRequest });

    // return match(result, {
    //   Ok: (id: string) => new IdResponse(id),
    //   Err: (error: Error) => {
    //     throw error;
    //   },
    // });
  }

  @ApiOperation({ summary: 'Create an annual leave' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Get(routesV1.annualLeave.list)
  async findAll(): Promise<AnnualLeaveResponse[] | AnnualLeaveResponse> {
    return await this.findAllAnnualLeaveUseCase.execute();
  }
}
