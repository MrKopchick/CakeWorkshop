import {
  type configureStore,
  type ThunkMiddleware,
  type Tuple,
  type UnknownAction
} from '@reduxjs/toolkit';

import { type authApi, type authReducer } from '~/modules/auth/auth.js';
import { type storageApi } from '~/modules/storage/storage.js';

type ExtraArguments = {
  authApi: typeof authApi;
  storageApi: typeof storageApi;
};

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
};

type StoreInstance = ReturnType<
  typeof configureStore<
    RootReducer,
    UnknownAction,
    Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
  >
>;

type StoreModule = {
  extraArguments: ExtraArguments;
};

export { type ExtraArguments, type StoreInstance, type StoreModule };
