import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import {
  type ConfigModule,
  type EnvironmentSchema
} from './libs/types/types.js';

class Config implements ConfigModule {
  #ENV: EnvironmentSchema;

  public constructor() {
    this.#ENV = this.envSchema;
  }

  private get envSchema(): EnvironmentSchema {
    return {
      API: {
        PATH: import.meta.env['VITE_API_PATH'] as string,
        SERVER: import.meta.env['VITE_API_SERVER'] as string,
        SOCKET_PATH: import.meta.env['VITE_SOCKET_PATH'] as string,
        SOCKET_SERVER: import.meta.env['VITE_SOCKET_SERVER'] as string
      },
      APP: {
        ENVIRONMENT: import.meta.env['VITE_APP_NODE_ENV'] as ValueOf<
          typeof AppEnvironment
        >,
        HOST: import.meta.env['VITE_APP_HOST'] as string,
        PORT: Number(import.meta.env['VITE_APP_PORT'])
      }
    };
  }

  public get ENV(): EnvironmentSchema {
    return this.#ENV;
  }
}

export { Config };
