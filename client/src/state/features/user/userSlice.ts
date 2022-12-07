import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncState } from '../../async-state.interface';
import userService from './user.service';

import { DisplayUser } from './display-user.interface';

interface UserState extends AsyncState {
  user?: DisplayUser | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getMyInformation = createAsyncThunk('user/me', async () => {
  return await userService.getMyInformation();
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getMyInformation.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
