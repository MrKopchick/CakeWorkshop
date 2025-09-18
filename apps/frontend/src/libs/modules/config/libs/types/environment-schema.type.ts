import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  API: {
    PATH: string;
    SERVER: string;
    SOCKET_PATH: string;
    SOCKET_SERVER: string;
  };
  APP: {
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    HOST: string;
    PORT: number;
  };
};

export { type EnvironmentSchema };
