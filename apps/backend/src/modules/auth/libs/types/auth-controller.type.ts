import {
  type ControllerAPIHandlerOptions,
  type ControllerAPIHandlerResponse
} from '~/libs/modules/controller/controller.js';

import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto
} from './types.js';

type AuthController = {
  register: (
    options: ControllerAPIHandlerOptions<{
      body: UserSignUpRequestDto;
    }>
  ) => Promise<ControllerAPIHandlerResponse<UserSignUpResponseDto>>;
};

export { type AuthController };
