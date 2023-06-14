import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { routesV1 } from '@config/app.routes';
import { LoginDto } from '@modules/auth/domain/commands/dto/login.request.dto';
import { Public } from '@modules/auth/decorator';

@Controller(routesV1.version)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post(routesV1.auth.login)
  signIn(@Body() login: LoginDto): Promise<any> {
    return this.authService.signIn(login.userName, login.password);
  }
}
