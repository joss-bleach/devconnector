import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncState } from '../../async-state.interface';
import authService from './auth.service';

import { RegisterUser, Jwt, AuthUser, JwtDecodedUser } from './models';

// Get data from local storage

const userFromLocalStorage: string | null = localStorage.getItem('user');
const user: JwtDecodedUser | null = !!userFromLocalStorage
  ? JSON.parse(userFromLocalStorage)
  : null;

const jwtFromLocalStorage: string | null = localStorage.getItem('jwt');
const jwt = !!jwtFromLocalStorage ? JSON.parse(jwtFromLocalStorage) : null;

interface AuthState extends AsyncState {
  user?: JwtDecodedUser | null;
  jwt?: Jwt;
  isAuthenticated?: boolean;
}

const initialState: AuthState = {
  user: user,
  jwt: jwt,
  isAuthenticated: jwt ? true : false,
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
    }
  },
);

export const authenticateUser = createAsyncThunk(
  '/auth/authenticate',
  async (user: AuthUser, thunkAPI) => {
    try {
      return await authService.authenticateUser(user);
    } catch (err) {
      return thunkAPI.rejectWithValue('Invalid email/password combination.');
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
      })
      .addCase(authenticateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.jwt = action.payload.jwt;
        state.user = action.payload.user;
      })
      .addCase(authenticateUser.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { resetAsyncState } = authSlice.actions;
export default authSlice.reducer;
