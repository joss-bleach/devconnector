import api from '../../api';
import jwt_decode from 'jwt-decode';

import { JwtDecodedUser, Jwt, AuthUser, RegisterUser } from './models';
import { DisplayUser } from '../user/display-user.interface';

const createNewUser = async (
  newUser: RegisterUser,
): Promise<DisplayUser | null> => {
  const response = await api.post('/auth/register/', newUser);
  return response.data;
};

const authenticateUser = async (
  user: AuthUser,
): Promise<{ jwt: Jwt; user: JwtDecodedUser | null }> => {
  const response = await api.post('/auth/authenticate', user);
  if (response.data) {
    const decodedJwt: JwtDecodedUser = jwt_decode(response.data.token);
    return {
      jwt: response.data,
      user: decodedJwt,
    };
  }
  return {
    jwt: response.data,
    user: null,
  };
};

const authService = {
  createNewUser,
  authenticateUser,
};

export default authService;
