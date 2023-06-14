import { Module } from '@nestjs/common';
import { AuthController } from '@modules/auth/domain/commands/controller/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { jwtConstants } from '@modules/auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { FindOneByUsernameUseCase } from '@modules/user/domain/usecases/find-one-by-username.use-case';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserRepository } from '@modules/user/infrastructure/adapter/user-repository-db';
import { UserMapper } from '@modules/user/user.mapper';
import { AuthGuard } from '@modules/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    { provide: USER_REPOSITORY, useClass: UserRepository },
    AuthService,
    FindOneByUsernameUseCase,
    UserMapper,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
