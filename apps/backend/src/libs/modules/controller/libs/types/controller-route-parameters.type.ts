import { type HTTPMethod } from '~/libs/modules/http/http.js';
import { type ValidationSchema, type ValueOf } from '~/libs/types/types.js';

import { type ControllerAPIHandler } from './controller-api-handler.type.js';

type ControllerRouteParameters = {
  handler: ControllerAPIHandler;
  method: ValueOf<typeof HTTPMethod>;
  schema?: {
    body?: ValidationSchema;
    params?: ValidationSchema;
    query?: ValidationSchema;
  };
  url: string;
};

export { type ControllerRouteParameters };
