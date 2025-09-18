import { type UserSignUpRequestDto } from '../auth/libs/types/types.js';
import { type User as TUser, type UserService } from './libs/types/types.js';
import { type User as UserRepository } from './user.repository.js';

type Constructor = Record<'userRepository', UserRepository>;

class User implements UserService {
  #userRepository: UserRepository;

  public constructor({ userRepository }: Constructor) {
    this.#userRepository = userRepository;
  }

  public create(payload: UserSignUpRequestDto): Promise<TUser> {
    return this.#userRepository.create(payload);
  }
}

export { User };
