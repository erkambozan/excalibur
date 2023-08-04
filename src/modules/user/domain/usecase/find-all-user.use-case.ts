import { UserRepositoryPort } from '@modules/user/domain/port/user-repository.port';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserMapper } from '@modules/user/user.mapper';
import { UserResponse } from '@modules/user/domain/commands/dto/user-response';

@Injectable()
export class FindAllUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepositoryPort,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(): Promise<UserResponse[]> {
    const usersEntities = await this.userRepo.findAll();
    if (usersEntities.length === 0)
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);

    const userResponse = this.userMapper.toResponse(usersEntities);
    if (Array.isArray(userResponse)) return userResponse;
  }
}
