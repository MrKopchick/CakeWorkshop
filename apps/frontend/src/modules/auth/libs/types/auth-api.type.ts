import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto
} from './types.js';

type AuthApi = {
  signUp(payload: UserSignUpRequestDto): Promise<UserSignUpResponseDto>;
};

export { type AuthApi };
