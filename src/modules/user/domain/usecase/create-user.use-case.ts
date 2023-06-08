import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../user.di-tokens';
import { CreateUserProps } from '@modules/user/domain/user-types';
import { UserRepositoryPort } from '@modules/user/domain/port/user-repository';
import { UserEntity } from '@modules/user/domain/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(props: CreateUserProps): Promise<UserEntity> {
    const user = UserEntity.create(props);
    await this.userRepo.insert(user);
    return user;
  }
}
