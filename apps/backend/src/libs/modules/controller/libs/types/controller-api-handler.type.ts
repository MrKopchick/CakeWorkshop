import { type ControllerAPIHandlerOptions } from './controller-api-handler-options.type.js';
import { type ControllerAPIHandlerResponse } from './controller-api-handler-response.type.js';

type ControllerAPIHandler = (
  options: ControllerAPIHandlerOptions
) => ControllerAPIHandlerResponse | Promise<ControllerAPIHandlerResponse>;

export { type ControllerAPIHandler };
