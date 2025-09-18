import { configureStore } from '@reduxjs/toolkit';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type ConfigModule } from '~/libs/modules/config/config.js';
import { authApi, authReducer } from '~/modules/auth/auth.js';
import { storageApi } from '~/modules/storage/storage.js';

import {
  type ExtraArguments,
  type StoreInstance,
  type StoreModule
} from './libs/types/types.js';

class Store implements StoreModule {
  #instance: StoreInstance;

  public constructor(config: ConfigModule) {
    this.#instance = configureStore({
      devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
      middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
          thunk: {
            extraArgument: this.extraArguments
          }
        });
      },
      reducer: {
        auth: authReducer
      }
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      storageApi
    };
  }

  public get instance(): StoreInstance {
    return this.#instance;
  }
}

export { Store };
