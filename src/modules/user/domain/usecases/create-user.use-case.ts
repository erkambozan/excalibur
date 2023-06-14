import { Inject, Injectable } from '@nestjs/common';
import { CreateUserProps } from '@modules/user/domain/user-types';
import { UserRepositoryPort } from '@modules/user/domain/port/user-repository';
import { UserEntity } from '@modules/user/domain/user.entity';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(props: CreateUserProps): Promise<UserEntity | Error> {
    props.password = await this.hashPassword(props.password);
    const user = UserEntity.create(props);
    const isExist = await this.userRepo.findOneByUsername(props.userName);
    if (isExist) {
      return new Error(`User with username ${props.userName} already exists`);
    }
    const result = await this.userRepo.insert(user);
    return result == true ? user : undefined;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
