import { Controller, HttpStatus, Post } from "@nestjs/common";
import { routesV1 } from '@config/app.routes';
import { CreateUserUseCase } from '@modules/user/domain/usecase/create-user.use-case';
import { IdResponse } from '@libs/api/id.response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller(routesV1.version)
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Post(routesV1.user.create)
  async create(): Promise<void> {
    await this.createUserUseCase.execute({ email: 'test' });

    // return match(result, {
    //   Ok: (id: string) => new IdResponse(id),
    //   Err: (error: Error) => {
    //     throw error;
    //   },
    // });
  }
}
