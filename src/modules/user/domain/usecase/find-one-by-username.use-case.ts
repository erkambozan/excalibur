import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { UserRepositoryPort } from '@modules/user/domain/port/user-repository.port';
import { UserEntity } from '@modules/user/domain/user.entity';

@Injectable()
export class FindOneByUsernameUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(username: string): Promise<UserEntity> {
    return await this.userRepo.findOneByUsername(username);
  }
}
