import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type UserSignUpResponseDto } from '~/modules/auth/auth.js';

import { signUp } from './actions.js';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  user: null | UserSignUpResponseDto;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null
};

const { actions, reducer } = createSlice({
  extraReducers(builder) {
    builder
      .addMatcher(isAnyOf(signUp.pending), state => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addMatcher(isAnyOf(signUp.fulfilled), (state, action) => {
        state.user = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addMatcher(isAnyOf(signUp.rejected), state => {
        state.user = null;
        state.dataStatus = DataStatus.REJECTED;
      });
  },
  initialState,
  name: 'auth',
  reducers: {}
});

export { actions, reducer };
