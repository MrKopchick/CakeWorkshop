import { type APIPath } from '~/libs/enums/enums.js';
import {
  Controller,
  type ControllerAPIHandler,
  type ControllerAPIHandlerOptions,
  type ControllerAPIHandlerResponse
} from '~/libs/modules/controller/controller.js';
import { HTTPCode, HTTPMethod } from '~/libs/modules/http/http.js';
import { type LoggerModule } from '~/libs/modules/logger/logger.js';
import { type ValueOf } from '~/libs/types/types.js';

import { AuthApiPath } from './libs/enums/enums.js';
import {
  type AuthController,
  type AuthService,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto
} from './libs/types/types.js';
import { signUpValidationSchema } from './libs/validation-schemas/validation-schemas.js';

type Constructor = {
  apiPath: ValueOf<typeof APIPath>;
  authService: AuthService;
  logger: LoggerModule;
};

class Auth extends Controller implements AuthController {
  #authService: AuthService;

  public register = async (
    options: ControllerAPIHandlerOptions<{
      body: UserSignUpRequestDto;
    }>
  ): Promise<ControllerAPIHandlerResponse<UserSignUpResponseDto>> => {
    return {
      payload: await this.#authService.register(options.body),
      status: HTTPCode.CREATED
    };
  };

  public constructor({ apiPath, authService, logger }: Constructor) {
    super({ apiPath, logger });
    this.#authService = authService;

    this.addRoute({
      handler: this.register as ControllerAPIHandler,
      method: HTTPMethod.POST,
      schema: {
        body: signUpValidationSchema
      },
      url: AuthApiPath.SIGN_UP
    });
  }
}

export { Auth };
