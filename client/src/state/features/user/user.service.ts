import api from '../../api';
import { DisplayUser } from './display-user.interface';

const getMyInformation = async (): Promise<DisplayUser | null> => {
  const response = await api.get('/user/me');
  return response.data;
};

const userService = {
  getMyInformation,
};

export default userService;
