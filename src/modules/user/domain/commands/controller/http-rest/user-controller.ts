import { Controller, HttpStatus, Post, Body } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { CreateUserUseCase } from '@modules/user/domain/usecases/create-user.use-case';
import { IdResponse } from '@libs/api/id.response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRequestDto } from '@modules/user/domain/commands/dto/user-request';
import { Public } from '@modules/auth/decorator';

@Controller(routesV1.version)
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Public()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Post(routesV1.user.create)
  async create(@Body() userRequest: UserRequestDto): Promise<any> {
    await this.createUserUseCase.execute({ ...userRequest });

    // return match(result, {
    //   Ok: (id: string) => new IdResponse(id),
    //   Err: (error: Error) => {
    //     throw error;
    //   },
    // });
  }
}
