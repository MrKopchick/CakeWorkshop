import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto
} from '~/modules/auth/auth.js';

import { ActionType } from './common.js';

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (request, { extra: { authApi } }) => {
  return await authApi.signUp(request);
});

export { signUp };
