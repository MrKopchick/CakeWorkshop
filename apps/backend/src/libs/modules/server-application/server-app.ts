import fastifyStatic from '@fastify/static';
import fastify, {
  type FastifyError,
  type FastifyInstance,
  type FastifyServerOptions
} from 'fastify';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ServerErrorType } from '~/libs/enums/enums.js';
import { type ValidationError } from '~/libs/exceptions/exceptions.js';
import { type ConfigModule } from '~/libs/modules/config/config.js';
import { joinPath } from '~/libs/modules/path/path.js';
import { type ValidationSchema } from '~/libs/types/types.js';

import { type DatabaseModule } from '../database/database.js';
import { type LoggerModule } from '../logger/logger.js';
import { getErrorInfo } from './libs/helpers/helpers.js';
import { type ServerApi } from './libs/types/types.js';

type Constructor = {
  apis: ServerApi[];
  config: ConfigModule;
  database: DatabaseModule;
  logger: LoggerModule;
  options: FastifyServerOptions;
};

class ServerApp {
  #apis: ServerApi[];

  #app: FastifyInstance;

  #config: ConfigModule;

  #database: DatabaseModule;

  #initApp = (options: FastifyServerOptions): FastifyInstance => {
    return fastify(options);
  };

  #initValidationCompiler = (): void => {
    this.app.setValidatorCompiler<ValidationSchema>(({ schema }) => {
      return <T, R = ReturnType<ValidationSchema['validate']>>(data: T): R => {
        return schema.validate(data, {
          abortEarly: false
        }) as R;
      };
    });
  };

  #logger: LoggerModule;

  #registerRoutes = (): void => {
    const routers = this.#apis.flatMap(it => it.routes);

    for (const it of routers) {
      const { url: path, ...parameters } = it;

      this.app.route({
        url: joinPath([this.#config.ENV.APP.API_PATH, path]),
        ...parameters
      });
    }
  };

  #registerServe = async (): Promise<void> => {
    const staticPath = join(
      dirname(fileURLToPath(import.meta.url)),
      '../../../../public'
    );

    await this.#app.register(fastifyStatic, {
      prefix: '/',
      root: staticPath
    });

    this.#app.setNotFoundHandler(async (_request, response) => {
      await response.sendFile('index.html', staticPath);
    });
  };

  public initialize = async (): Promise<typeof this> => {
    this.#initValidationCompiler();
    await this.#registerServe();
    this.#registerRoutes();
    this.#initErrorHandler();

    await this.#database.connect();

    return this;
  };

  public start = async (): never | Promise<void> => {
    try {
      await this.#app.listen({
        host: this.#config.ENV.APP.HOST,
        port: this.#config.ENV.APP.PORT
      });

      this.#logger.info(
        `Application is listening on PORT - ${this.#config.ENV.APP.PORT.toString()}, on ENVIRONMENT - ${
          this.#config.ENV.APP.ENVIRONMENT as string
        }.`
      );
    } catch (error) {
      if (error instanceof Error) {
        this.#logger.error(error.message, {
          cause: error.cause,
          stack: error.stack
        });
      }

      throw error;
    }
  };

  public constructor({ apis, config, database, logger, options }: Constructor) {
    this.#config = config;
    this.#logger = logger;

    this.#app = this.#initApp(options);

    this.#apis = apis;
    this.#database = database;
  }

  #initErrorHandler(): void {
    this.app.setErrorHandler(
      (error: FastifyError | ValidationError, _request, reply) => {
        const { internalMessage, response, status } = getErrorInfo(error);

        this.#logger.error(internalMessage);

        if (response.errorType === ServerErrorType.VALIDATION) {
          for (const detail of response.details) {
            this.#logger.error(
              `[${detail.path.toString()}] — ${detail.message}`
            );
          }
        }

        return reply.status(status).send(response);
      }
    );
  }

  public get app(): FastifyInstance {
    return this.#app;
  }

  public get database(): DatabaseModule {
    return this.#database;
  }
}

export { ServerApp };
