import {
  type FastifyReply,
  type FastifyRequest,
  type preHandlerHookHandler,
  type RouteGenericInterface
} from 'fastify';

import { type HTTPMethod } from '~/libs/modules/http/http.js';
import { type ValidationSchema, type ValueOf } from '~/libs/types/types.js';

type ServerApplicationRouteParameters = {
  handler: <T extends RouteGenericInterface>(
    _request: FastifyRequest<T>,
    _reply: FastifyReply
  ) => Promise<unknown>;
  method: ValueOf<typeof HTTPMethod>;
  preHandler?: preHandlerHookHandler;
  url: string;
  validation?: {
    body?: ValidationSchema;
  };
};

export { type ServerApplicationRouteParameters };
