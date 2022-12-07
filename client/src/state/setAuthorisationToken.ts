import api from './api';

const setAuthorisationToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('jwt', JSON.stringify(token));
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('jwt');
  }
};

export default setAuthorisationToken;
