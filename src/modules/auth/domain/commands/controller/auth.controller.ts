import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { routesV1 } from '@config/app.routes';
import { LoginDto } from '@modules/auth/domain/commands/dto/login.request.dto';
import { Public } from '@modules/auth/decorator';
import { LoginResponseDto } from '@modules/auth/domain/commands/dto/login.response.dto';

@Controller(routesV1.version)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post(routesV1.auth.login)
  async signIn(@Body() login: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.signIn(login.userName, login.password);
  }
}
