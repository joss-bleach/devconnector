import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';
import profileReducer from './features/profile/profileSlice';

import setAuthorisationToken from './setAuthorisationToken';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    profile: profileReducer,
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
    setAuthorisationToken(currentState.auth.jwt?.token as string);
    return;
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
