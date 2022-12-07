import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';

import setAuthorisationToken from './setAuthorisationToken';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

let currentState = store.getState();
store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();
  if (previousState.auth.jwt !== currentState.auth.jwt) {
    if (currentState.auth.jwt === undefined && currentState.auth.jwt === null) {
      return;
    }
    if (currentState.auth.jwt?.token) {
      setAuthorisationToken(currentState.auth.jwt?.token);
    }
    return;
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
