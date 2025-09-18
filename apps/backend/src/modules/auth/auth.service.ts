import { type UserService } from '../user/user.js';
import {
  type AuthService,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto
} from './libs/types/types.js';

type Constructor = {
  userService: UserService;
};

class Auth implements AuthService {
  #userService: UserService;

  public register = async (
    userRequestDto: UserSignUpRequestDto
  ): Promise<UserSignUpResponseDto> => {
    return await this.#userService.create(userRequestDto);
  };

  public constructor({ userService }: Constructor) {
    this.#userService = userService;
  }
}

export { Auth };
