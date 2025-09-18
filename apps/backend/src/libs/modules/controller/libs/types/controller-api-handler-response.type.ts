import { type HTTPCode } from '~/libs/modules/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';

type ControllerAPIHandlerResponse<T = unknown> = {
  payload: T;
  status: ValueOf<typeof HTTPCode>;
};

export { type ControllerAPIHandlerResponse };
