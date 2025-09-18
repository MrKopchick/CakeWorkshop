import convict, { type Config as LibraryConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '~/libs/enums/enums.js';

import { type LoggerModule } from '../logger/logger.js';
import {
  type ConfigModule,
  type EnvironmentSchema
} from './libs/types/types.js';

type Constructor = { logger: LoggerModule };

class Config implements ConfigModule {
  #ENV: EnvironmentSchema;
  #logger: LoggerModule;

  public constructor({ logger }: Constructor) {
    config();

    this.#logger = logger;
    this.#envSchema.load({});
    this.#envSchema.validate({
      allowed: 'strict',
      output: message => {
        this.#logger.info(message);
      }
    });
    this.#ENV = this.#envSchema.getProperties();
  }

  get #envSchema(): LibraryConfig<EnvironmentSchema> {
    return convict<EnvironmentSchema>({
      APP: {
        API_PATH: '/api',
        ENVIRONMENT: {
          default: null,
          doc: 'Application environment',
          env: 'NODE_ENV',
          format: Object.values(AppEnvironment)
        },
        HOST: {
          default: null,
          doc: 'Host for incoming connections',
          env: 'APP_HOST',
          format: String
        },
        PORT: {
          default: null,
          doc: 'Port for incoming connections',
          env: 'APP_PORT',
          format: Number
        }
      },
      DB: {
        CLIENT: {
          default: null,
          doc: 'Database connection client',
          env: 'DB_CLIENT',
          format: String
        },
        DATABASE: {
          default: null,
          doc: 'Database name',
          env: 'DB_NAME',
          format: String
        },
        DEBUG: {
          default: false,
          doc: 'Debug mode',
          format: Boolean
        },
        HOST: {
          default: null,
          doc: 'Database connection host',
          env: 'DB_HOST',
          format: String
        },
        PASSWORD: {
          default: null,
          doc: 'Database connection password',
          env: 'DB_PASSWORD',
          format: String
        },
        POOL_MAX: {
          default: null,
          doc: 'Database pool max count',
          env: 'DB_POOL_MAX',
          format: Number
        },
        POOL_MIN: {
          default: null,
          doc: 'Database pool min count',
          env: 'DB_POOL_MIN',
          format: Number
        },
        PORT: {
          default: null,
          doc: 'Database connection port',
          env: 'DB_PORT',
          format: Number
        },
        TEST_DATABASE: {
          default: null,
          doc: 'Test database name',
          env: 'TEST_DB_NAME',
          format: String
        },
        USERNAME: {
          default: null,
          doc: 'Database connection username',
          env: 'DB_USERNAME',
          format: String
        }
      }
    });
  }

  public get ENV(): EnvironmentSchema {
    return this.#ENV;
  }
}

export { Config };
