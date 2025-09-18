import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    API_PATH: string;
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    HOST: string;
    PORT: number;
  };
  DB: {
    CLIENT: string;
    DATABASE: string;
    DEBUG: boolean;
    HOST: string;
    PASSWORD: string;
    POOL_MAX: number;
    POOL_MIN: number;
    PORT: number;
    TEST_DATABASE: string;
    USERNAME: string;
  };
};

export { type EnvironmentSchema };
