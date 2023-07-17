import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { FindOneByUsernameUseCase } from '@modules/user/domain/usecase/find-one-by-username.use-case';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@libs/exceptions';
import { LoginResponseDto } from '@modules/auth/domain/commands/dto/login.response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(FindOneByUsernameUseCase)
    private readonly findOneByUserNameUseCase: FindOneByUsernameUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(userName: string, password: string): Promise<LoginResponseDto> {
    const user = await this.findOneByUserNameUseCase.execute(userName);

    if (!user) throw new NotFoundException();

    const match = await bcrypt.compare(password, user.getProps().password);
    if (!match) throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.getProps().userName };
    const accessToken = await this.jwtService.signAsync(payload);
    const response = new LoginResponseDto();
    response.access_token = accessToken;
    return response;
  }
}
