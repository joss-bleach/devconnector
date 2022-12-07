import api from '../../api';
import { DisplayProfile } from './models/display-profile.interface';

const getMyProfile = async (): Promise<DisplayProfile | null> => {
  const response = await api.get('/profile/me');
  return response.data;
};

const profileService = {
  getMyProfile,
};

export default profileService;
