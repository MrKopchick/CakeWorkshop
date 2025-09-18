import { parse, type ParsedQs } from 'qs';

import { config } from '~/libs/modules/config/config.js';
import { database } from '~/libs/modules/database/database.js';
import { authController } from '~/modules/auth/auth.js';

import { logger } from '../logger/logger.js';
import { ServerAppApi } from './server-app-api.js';
import { ServerApp } from './server-app.js';

const serverAppApiV1 = new ServerAppApi({
  routes: [...authController.routes],
  version: 'v1'
});

const serverApp = new ServerApp({
  apis: [serverAppApiV1],
  config,
  database,
  logger,
  options: {
    ignoreTrailingSlash: true,
    logger: {
      transport: {
        target: 'pino-pretty'
      }
    },
    querystringParser: (stringToParse: string): ParsedQs => {
      return parse(stringToParse, { comma: true });
    }
  }
});

export { serverApp, serverAppApiV1 };
export { type ServerApplicationRouteParameters } from './libs/types/types.js';
export { ServerApp } from './server-app.js';
