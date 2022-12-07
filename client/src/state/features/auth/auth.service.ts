import api from '../../api';
import jwt_decode from 'jwt-decode';

import {
  JwtDecodedUser,
  DisplayUser,
  Jwt,
  AuthUser,
  RegisterUser,
} from './models';

const createNewUser = async (
  newUser: RegisterUser,
): Promise<DisplayUser | null> => {
  const response = await api.post('/auth/register/', newUser);
  return response.data;
};

const authService = {
  createNewUser,
};

export default authService;
