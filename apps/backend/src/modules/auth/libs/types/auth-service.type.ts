import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto
} from './types.js';

type AuthService = {
  register(_user: UserSignUpRequestDto): Promise<UserSignUpResponseDto>;
};

export { type AuthService };
