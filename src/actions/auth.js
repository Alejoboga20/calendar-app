import { fetchWithoutToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const response = await fetchWithoutToken(
      'auth',
      { email, password },
      'POST'
    );

    const body = await response.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      const { uid, name } = body;

      dispatch(login({ uid, name }));
    }
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user
});
