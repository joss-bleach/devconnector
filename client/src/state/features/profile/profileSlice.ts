import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncState } from '../../async-state.interface';
import profileService from './profileService';
import { DisplayProfile } from './models/display-profile.interface';

interface ProfileState extends AsyncState {
  profile?: DisplayProfile | null;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getMyProfile = createAsyncThunk('profile/me', async () => {
  return await profileService.getMyProfile();
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getMyProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default profileSlice.reducer;
