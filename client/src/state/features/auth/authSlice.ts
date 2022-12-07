import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncState } from '../../async-state.interface';
import authService from './auth.service';

import { DisplayUser, RegisterUser, Jwt, AuthUser } from './models';

// Get data from local storage

const userFromLocalStorage: string | null = localStorage.getItem('user');
const user: DisplayUser | null = !!userFromLocalStorage
  ? JSON.parse(userFromLocalStorage)
  : null;

const jwtFromLocalStorage: string | null = localStorage.getItem('jwt');
const jwt = !!jwtFromLocalStorage ? JSON.parse(jwtFromLocalStorage) : null;

interface AuthState extends AsyncState {
  user?: DisplayUser | null;
  jwt?: Jwt;
  isAuthenticated?: boolean;
}

const initialState: AuthState = {
  user: user,
  jwt: jwt,
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const registerUser = createAsyncThunk(
  'auth/regsiter',
  async (user: RegisterUser, thunkAPI) => {
    try {
      return await authService.createNewUser(user);
    } catch (err) {
      return thunkAPI.rejectWithValue('Unable to register user.');
      console.log(err);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAsyncState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      });
  },
});

export const { resetAsyncState } = authSlice.actions;
export default authSlice.reducer;
